/**
 * 值变更 保存信息
 */
function updatePersonInfoForAddPerson(params) {
    debugger
    try {
        if (!params["tag"]) return;
        var sheet = params["sheet"];
        var row = params["row"];
        var col = params["col"];
        var tag = params["tag"];
        //当前cell的值
        var newVal = $SH.getValue(sheet, row, col);
        var fieldName = tag.fieldname;
        var tablename = tag.tablename;
        if (!fieldName || !tablename) return;
        let isString = (tag["numberType"] == "string" && tag.isDateSelector != 'TRUE') ? true : false;
        //保存
        let guidCol = getGuidColNum_();
        let guid = $SH.getValue(sheet, row, guidCol);
        let saveResult;
        //日期选择列
        if (tag.isDateSelector == 'TRUE') {
            //特殊处理执行月份 当工资变动原因为35时 补发月份为5
            let CHANGERESON = getCellPositonInRow(row, 'CHANGERESON');
            if (fieldName == 'GZBDZXQSYF' && CHANGERESON != '35') {
                changeBFYS(newVal, tablename, guid);
            }
            if (fieldName == 'LEVELUPASSESSYEAR' || fieldName == 'PROMOTEDASSESSYEAR') {
                newVal = `to_date('${newVal}/${speardUtil.getPms('URL_month')}', 'yyyy/MM')`;
            } else {
                newVal = `to_date('${newVal}', 'yyyy/MM')`;
            }
        }
        saveResult = pubSave_(tablename, "GUID", guid, fieldName, newVal, isString);
        if ((saveResult) && (saveResult.isError))
            alert(saveResult.errMsg);

        //级联变化
        changePersonstaffOptions(params);
    } catch (err) {
        alert(err);
    }

}


function pubSave_(tablename, keyFiled, keyVal, fieldName, fieldValue, isString) {

    fieldValue = isString ? `'${fieldValue}'` : fieldValue;
    let sql = `update ${tablename} set ${fieldName} = ${fieldValue} where ${keyFiled}='${keyVal}'`;
    //执行sql
    let result = speardUtil.exeSql(sql);
    return result
}

/**
 *
 * 执行月份变更 计算补发月份
 */
function changeBFYS(newVal, tablename, guid, BFNum) {

    if (!BFNum) {
        let actionMonth = newVal.split('/')[1];
        BFYF = 13 - parseInt(actionMonth);
    }

    pubSave_(tablename, 'GUID', guid, 'BFYF', BFNum, true);
}

function getGuidColNum_() {
    let sheet = spread.getActiveSheet();
    let colcount = $SH.getColumnCount(sheet);
    for (let i = 0; i < colcount; i++) {
        let tag = speardUtil.getTagByIndex(sheet, pageInfo_Add.startRow, i);
        if (tag?.fieldname == 'GUID') {
            return i;
        }
    }
}


/**
 * 值变更事件 设置存在级联关系的单元格值
 * 1 人员类别变更 修改人员编制下拉 , 修改职务技术等级
 * 2 人员来源变更 修改工资变动原因
 * 3 参加工作时间变更 修改工龄
 */
function changePersonstaffOptions(params) {
    debugger

    let zwjsdjFields = ['OLDJOB', 'NEWJOB'];
    let newValue = params.sheet.getValue(params.row, params.col)
    //原 现 职务技术等级与 变动前后 职务技术等级保持一致
    if (zwjsdjFields.includes(params.tag.fieldname)) {
        changeJob_(params)
    } else if (params.tag.fieldname == 'PERSONCAT') {
        setPersonstaffOptionsByCat(params.args.newValue, params.sheet, false, params.row);
        setZW(params.args.newValue, params.sheet, false, params.row);
        setOLDOPOSTGRADOptionsByCat(params.args.newValue, params.sheet, false, params.row);
    }
    //人员来源修改调整工资变动原因
    else if (params.tag.fieldname == 'PERSONFROM') {
        let val = $SH.getValue(spread.getActiveSheet(), params.row, params.col);
        switch (val) {
            //1 6 试用人员
            case '1':
            case '6':
                setCHANGERESON_('11', params.row);
                break;
            // 转业定资
            case '5':
            case '7':
                setCHANGERESON_('12', params.row);
                break;
            default:
                setCHANGERESON_('', params.row);
                break
        }
    }
    //修改参加工作时间 计算工龄
    else if (params.tag.fieldname == 'CJGZSJ') {
        setWorkYear(params)
    } else if (params.tag.fieldname == 'CHANGERESON' && newValue == '35') {
        //补发月份 当工资变动原因为 调整标准 35时 补发月份为5
        let guidCol = getGuidColNum_();
        let guid = $SH.getValue(params.sheet, params.row, guidCol);
        changeBFYS('', params["tag"].tablename, guid, 5);
    }
}

//原 现 职务技术等级与 变动前后 职务技术等级保持一致
function changeJob_(params) {
    debugger
    let changeField;
    let changeVal = params.args.newValue;
    let row = params.row;
    changeField = params.tag.fieldname == 'OLDJOB' ? 'OLDJOBLEVEL' : 'NEWJOBLEVEL';
    let pos = getCellPositonInRow(row, changeField);
    $SH.setValue(params.sheet, pos.row, pos.col, changeVal);
    speardUtil.fireCellChanageEvent(pos.row, pos.col, [{
        row: pos.row,
        col: pos.col
    }])
}

/**
 * 人员类别变动 修改职务级别下拉
 * @param catVal
 * @param sheet
 * @param isInit
 */
function setZW(catVal, sheet, isInit, row) {
    debugger
    if (!catVal)
        catVal = '1';
    let dataCodeMap = {
        '1': 'ELE_10',//行政引用职务
        '2': 'ELE_11',//事业引用技术等级
    }


    let oldJobLevelPos = getCellPositonInRow(row, 'OLDJOBLEVEL');
    let newJobLevelPos = getCellPositonInRow(row, 'NEWJOBLEVEL');
    let oldJob = getCellPositonInRow(row, 'OLDJOB');
    let newJob = getCellPositonInRow(row, 'NEWJOB');
    let posArr = [oldJobLevelPos, newJobLevelPos, oldJob, newJob];

    for (let pos of posArr) {
        var tagval = speardUtil.getTagByIndex(sheet, pos.row, pos.col);
        tagval.selectDbCode = dataCodeMap[catVal];
        tagval.cellprotected = 'FALSE';
        tagval.isSelectCol = 'TRUE';
        $SH.setTag(sheet, pos.row, pos.col, JSON.stringify(tagval));
        //人员类别变更时 清除原值
        if (!isInit) {
            $SH.setValue(sheet, pos.row, pos.col, '');
        }

        //删除旧缓存引用
        delete window.top?.comboBoxOption?.[sheet.Cj]?.[tagval.fieldname];
        let options = speardUtil.getComboBoxOption(tagval, sheet, false, {
            value: "value",
            text: "text"
        });
        $SH.setComboBoxCell(options, pos.row, pos.col, sheet);
        $SH.setLocked(sheet, pos.row, pos.col, false);
        speardUtil.fireCellChanageEvent(pos.row, pos.col, [{
            row: pos.row,
            col: pos.col
        }])
    }
}


/**
 * 根据人员类别设置人员编制
 */
function setPersonstaffOptionsByCat(catVal, sheet, isInit, row) {
    if (!catVal)
        catVal = '1';
    let dataCodeMap = {
        '1': 'ELE_8',//行政
        '2': 'ELE_9',//事业
    }
    let personstaffCell = getCellPositonInRow(row, 'PERSONSTAFF');
    var tagval = speardUtil.getTagByIndex(sheet, personstaffCell.row, personstaffCell.col);
    tagval.selectDbCode = dataCodeMap[catVal];
    tagval.cellprotected = 'FALSE';
    tagval.isSelectCol = 'TRUE';
    $SH.setTag(sheet, personstaffCell.row, personstaffCell.col, JSON.stringify(tagval));
    //人员类别变更时 清除原值
    if (!isInit) {
        $SH.setValue(sheet, personstaffCell.row, personstaffCell.col, '');
    }

    //删除旧缓存引用
    delete window.top?.comboBoxOption?.[sheet.Cj]?.[tagval.fieldname];
    let options = speardUtil.getComboBoxOption(tagval, sheet, false, {
        value: "value",
        text: "text"
    });
    $SH.setComboBoxCell(options, personstaffCell.row, personstaffCell.col, sheet);
    $SH.setLocked(sheet, personstaffCell.row, personstaffCell.col, false);
    speardUtil.fireCellChanageEvent(personstaffCell.row, personstaffCell.col, [{
        row: personstaffCell.row,
        col: personstaffCell.col
    }])
}


/**
 * 根据人员类别设置级别(岗位)工资
 */
function setOLDOPOSTGRADOptionsByCat(catVal, sheet, isInit, row) {
    if (!catVal)
        catVal = '1';
    let dataCodeMap = {
        '1': 'ele_15',//行政
        '2': 'ele_13',//事业
    }
    let OLDOPOSTGRADCell = getCellPositonInRow(row, 'OLDOPOSTGRAD');
    let NEWOPOSTGRADCell = getCellPositonInRow(row, 'NEWOPOSTGRAD');
    let arr = [OLDOPOSTGRADCell, NEWOPOSTGRADCell]
    for (let cellPos of arr) {
        var tagval = speardUtil.getTagByIndex(sheet, cellPos.row, cellPos.col);
        tagval.selectDbCode = dataCodeMap[catVal];
        tagval.cellprotected = 'FALSE';
        tagval.isSelectCol = 'TRUE';
        $SH.setTag(sheet, cellPos.row, cellPos.col, JSON.stringify(tagval));
        //人员类别变更时 清除原值
        if (!isInit) {
            $SH.setValue(sheet, cellPos.row, cellPos.col, '');
        }

        //删除旧缓存引用
        delete window.top?.comboBoxOption?.[sheet.Cj]?.[tagval.fieldname];
        let options = speardUtil.getComboBoxOption(tagval, sheet, false, {
            value: "value",
            text: "text"
        });
        $SH.setComboBoxCell(options, cellPos.row, cellPos.col, sheet);
        $SH.setLocked(sheet, cellPos.row, cellPos.col, false);
        speardUtil.fireCellChanageEvent(cellPos.row, cellPos.col, [{
            row: cellPos.row,
            col: cellPos.col
        }])
    }

}


//人员来源修改调整工资变动原因
function setCHANGERESON_(reson, row) {
    let sheet = spread.getActiveSheet();
    let pos = getCellPositonInRow(row, 'CHANGERESON');
    $SH.setValue(sheet, pos.row, pos.col, reson);
    speardUtil.fireCellChanageEvent(pos.row, pos.col, [{
        row: pos.row,
        col: pos.col
    }])
}


function setWorkYear(param) {
    //参加工作时间
    let joinWorkDate = $SH.getValue(param.sheet, param.row, param.col);
    if (joinWorkDate && joinWorkDate.split('/') && joinWorkDate.split('/')[0]) {
        let year = speardUtil.getPms('USER_currentyear');
        let workYear = parseInt(year) - parseInt(joinWorkDate.split('/')[0]);
        let pos = getCellPositonInRow(param.row, 'WORKDATE');
        $SH.setValue(param.sheet, pos.row, pos.col, workYear);
        speardUtil.fireCellChanageEvent(pos.row, pos.col, [{
            row: pos.row,
            col: pos.col
        }])
    }
}

/**
 * 单行内找字段位置
 * @param row
 * @param field
 */
function getCellPositonInRow(row, field) {
    let sheet = spread.getActiveSheet();
    var colcount = $SH.getColumnCount(sheet);
    for (let col = 0; col < colcount; col++) {
        var tag = speardUtil.getTagByIndex(sheet, row, col);
        if (tag.fieldname == field)
            return {row, col};
    }

}

//判断是否和合并单元格
function isCellinSpan(sheet, row, col) {
    var ranges = sheet.getSpans(new GC.Spread.Sheets.Range(row, col, 1, 1));
    if (ranges.length) {
        return true;
    }
    return false;
}


//导入
function importData__addPerson() {
    debugger
    window.top.importReport_importCfg = {
        //解析excl成功回调
        canleLoading: true,
        success: function (json) {
            debugger
            $("#importExcel").val("");
            let loading_ = new Loading();
            loading_.init({
                target: parent.document.body
            });
            loading_.start();
            try {
                let month = speardUtil.getPms('URL_month');
                let saveDatas = [];//最终要保存的数据
                let errorData = {
                    NOIDNO: [],//未填写身份号的
                    NOPERSON: [],//系统中不存在的人 即 人员信息表中以及人员新增中不存在的人
                };//有问题的数据
                $("body").append("<div id='importSS' class='y-hide'></div>");
                var importSp = new GC.Spread.Sheets.Workbook($('#importSS')[0], {sheetCount: 1});
                importSp.fromJSON(json);
                let importSheet = importSp.getSheet(0);
                let sheet = spread.getSheet(0);
                let delHideCol = speardUtil.getColHideByCondition(0, true);
                //删除的列
                let delColArr = delHideCol.delMap && Object.keys(delHideCol.delMap).length > 0 ? Object.keys(delHideCol.delMap) : "";
                //隐藏列
                let hideColArr = delHideCol.hideMap && Object.keys(delHideCol.hideMap).length > 0 ? Object.keys(delHideCol.hideMap) : "";
                //从第二行开始解析数据
                outer:for (let row = pageInfo_Add.startRow; row < importSheet.getRowCount(); row++) {
                    let saveItem = {};
                    let saveflag = false;   //整行中都没有数据的不导入 判断标志
                    //遍历导入sheet的每一行 以及可编辑的tag 构建保存的数据
                    for (let col in temporary.$EDITDATA[0].TAG) {
                        let tag = temporary.$EDITDATA[0].TAG[col];

                        //该列删除或隐藏且不是主键时则跳过 导入可编辑的数据 ,导出时不删除的列数据 并根据规则生成主键
                        if ((!hideColArr || !hideColArr.includes(col))
                            && (!delColArr || !delColArr.includes(col))
                            && (tag.cellprotected == 'FALSE' || tag.fieldname == 'OUTUNITNAME')) {
                            let importAxisCol = col;
                            //该列前有删除的列 则修改坐标 从导入sheet中获取数据
                            if (delColArr) {
                                let cnt = delColArr.filter(delcol => delcol < parseInt(col));
                                importAxisCol = parseInt(col - cnt.length);
                            }
                            let isspan = isCellinSpan(importSheet, row, importAxisCol);
                            //如果是合并单元格不做处理
                            if (isspan) continue outer;
                            let value = $SH.getValue(importSheet, row, importAxisCol);
                            if (value !== null && value !== undefined) saveflag = true;
                            //TODO 格式化数据 日期 小数 字符串
                            // 根据执行月份 计算补发月份
                            if (tag.fieldname == 'GZBDZXQSYF' && value) {
                                let actionMonth = value.split('/')[1];
                                let BFYF = 13 - parseInt(actionMonth);
                                saveItem.BFYF = BFYF;
                            }
                            if (value) {
                                value = formatImportData(value, tag, saveItem);
                            }

                            saveItem[tag.fieldname] = value;
                        }
                    }

                    //身份证号不存在 不导入
                    if ((!saveItem.IDNO || (saveItem.IDNO + '').length != '18' || !saveItem.PERSONNAME) && saveflag) {
                        errorData.NOIDNO.push(row + 1);
                        continue outer;
                    }
                    //值全为空 不做导入
                    if (saveflag && saveItem.PERSONNAME && saveItem.IDNO) {
                        //添加默认值
                        if (temporary.$EDITDATA[0].defaultValObj) {
                            for (let field in temporary.$EDITDATA[0].defaultValObj) {
                                let str = temporary.$EDITDATA[0].defaultValObj[field];
                                saveItem[field] = speardUtil.replace(str);
                            }
                        }
                        saveItem.PERSONID = speardUtil.getUUID().replaceAll('-', '').toUpperCase();
                        if (saveItem.CHANGERESON && saveItem.CHANGERESON == '35') {
                            saveItem.BFYF = 5;
                        }
                        saveDatas.push(saveItem);
                    }
                }
                console.log(saveDatas);

                let result = inbatchesSaveData_('NY_PAYROLL', 'GUID', {
                    inserted: saveDatas,
                    updated: [],
                    deleted: []
                }, errorData);
                if (result) {
                    if (errorData.NOIDNO.length > 0 || errorData.NOPERSON.length > 0) {
                        let errIDNO = errorData.NOIDNO.join(',');
                        let errPerson = errorData.NOPERSON.join(',');
                        let msg = `${errIDNO ? errIDNO + '行姓名或身份证号未填写。' : ''} ${errPerson ? errPerson + '未录入系统中。' : ''}`;
                        parent.$DS.util.confirm(parent.window.vm, msg, function () {
                            parent.$DS.loadCtrl('IFRAME_列表');
                        }, msg, '', function () {
                            parent.$DS.loadCtrl('IFRAME_列表');
                        })
                    } else {
                        alert('导入成功');
                        parent.$DS.loadCtrl('IFRAME_列表');
                    }

                }
            } catch (e) {
                alert('导入失败');
                console.error(e);
            } finally {
                loading_.stop();
                window.top.importReport_importCfg = null;
                $('#importSS').remove();
            }
        }
    }
    $('#importExcel').click();
}


/**
 * 格式化
 * @param val
 * @param tag
 */
function formatImportData(val, tag, saveItem) {
    if (tag.numberType == 'number') {
        val = parseInt(val);
    } else if (tag.numberType == 'float') {
        val = parseFloat(val);
    } else if (tag.numberType == 'string') {
        val = (val + '').trim();
    }
    //引用数据
    if (tag.isSelectCol == 'TRUE') {
        let unions = getAll_ELEUNION(tag, saveItem);
        val = (val + '').trim();
        val = val + '';
        val = unions.find(item => {
            let cnName = item.ELE_CODE.split('-').length == 2 ? item.ELE_CODE.split('-')[1] : item.ELE_NAME;
            //中文名称
            if (cnName == val) {
                return item;
            }
            if (item.ELE_CODE == val) {
                return item;
            }
            //编码-中文名
            if (val.split('-').length == 2 && (val.split('-')[1] == cnName || val.split('-')[0] == item.ELE_CODE)) {
                return item;
            }

        })?.ELE_CODE || '';
    }
    //日期
    else if (tag.isDateSelector == 'TRUE') {
        try {
            val = formateTime(new Date(val), 'yyyy/MM');
            val += '/01 00:00:00'
            /* if (tag.fieldname == 'LEVELUPASSESSYEAR' || tag.fieldname == 'PROMOTEDASSESSYEAR') {
                 val = `${val}/${speardUtil.getPms('URL_month')} 01 00:00:00`;
             } else {
                 val = `${val} 01 00:00:00`;
             }*/
        } catch (e) {
            console.error(e + '获取日期异常');
            console.error(tag)
        }

    }
    return val;
}


/**
 * 分批此执行保存
 * @param tableName
 * @param keyField
 * @param data {inserted:[],updated:[],deleted:[]}
 */
function inbatchesSaveData_(tableName, keyField, data, errorData) {
    //先执行删除
    let orderArr = ['deleted', 'updated', 'inserted'];
    //toto 如果是人员调入 获取 年中追加 根据身份证获取 人员唯一标识
    data = getPersonid__(data, errorData);
    data = computed_sum_(data);
    orderArr.forEach(key => {
        let saveData = {deleted: [], updated: [], inserted: []};
        let cnt = 0;
        while (data[key].length > 0) {
            saveData[key] = data[key].splice(0, 200);
            let result = saveAllTableData(tableName, keyField, saveData);
            if (result.isError) {
                console.error(`分批次导入失败:${key}-第${cnt}批`);
                alert("导入失败,请检查数据是否有误");
                return false;
            }
            cnt++;
        }
    })
    return true;
}

//取引用
function getAll_ELEUNION(tag, saveItem) {
    if (!window.top.allUnion) {
        window.top.allUnion = {};
    }
    let fieldname = tag.fieldname;
    let jobFields = ['OLDJOBLEVEL', 'NEWJOBLEVEL', 'OLDJOB', 'NEWJOB'];
    let OPOSTGRADFields = ['NEWOPOSTGRAD', 'OLDOPOSTGRAD'];
    //根据人员类别 使用不同引用
    if (jobFields.includes(fieldname))
        return getJobOptions(tag, saveItem);
    if (OPOSTGRADFields.includes(fieldname)) {
        return getOPOSTGRADOptions(tag, saveItem);
    }

    if (window.top.allUnion[fieldname]) {
        return window.top.allUnion[fieldname]
    }
    let sheet = spread.getSheet(0);
    let options = speardUtil.getComboBoxOption(tag, sheet, null, {value: 'ELE_CODE', text: 'ELE_NAME'});
    window.top.allUnion[fieldname] = options;

    return window.top.allUnion[fieldname];
}

//取工作级别相关引用
function getJobOptions(tag, saveItem) {

    //行政人员 相关引用
    if (saveItem.PERSONCAT == '1') {
        if (window.top.allUnion.XZJOB) {
            return window.top.allUnion.XZJOB
        } else {
            let sqlXZ = `SELECT  ELE_CODE , ELE_CODE||'-'||ELE_NAME AS ELE_NAME FROM ELE_UNION WHERE  ELE_CATALOG_ID IN('ZW','ZJ','JSDJ') ORDER BY ELE_CODE`
            window.top.allUnion.XZJOB = speardUtil.selectBySql(sqlXZ).result;
            return window.top.allUnion.XZJOB;
        }
    } else if (saveItem.PERSONCAT == '2') {
        if (window.top.allUnion.SYJOB) {
            return window.top.allUnion.SYJOB
        } else {
            let sqlSY = `SELECT  ELE_CODE ,ELE_CODE||'-'||ELE_NAME AS ELE_NAME FROM ELE_UNION WHERE  ELE_CATALOG_ID IN('JSDJ','ZWSY') ORDER BY ELE_CODE`
            window.top.allUnion.SYJOB = speardUtil.selectBySql(sqlSY).result;
            return window.top.allUnion.SYJOB;
        }
    } else {
        return []
    }
}

//取级别(岗位)档次
function getOPOSTGRADOptions(tag, saveItem) {
//行政人员 相关引用
    if (saveItem.PERSONCAT == '1') {
        if (window.top.allUnion.XZGZJB) {
            return window.top.allUnion.XZGZJB
        } else {
            let sqlXZ = `SELECT  ELE_CODE ,ELE_CODE||'-'||ELE_NAME AS ELE_NAME FROM ELE_UNION WHERE  ELE_CATALOG_ID IN('GZJB','GWGZJB') ORDER BY ELE_CODE`
            window.top.allUnion.XZGZJB = speardUtil.selectBySql(sqlXZ).result;
            return window.top.allUnion.XZGZJB;
        }
    } else if (saveItem.PERSONCAT == '2') {
        if (window.top.allUnion.SYGZJB) {
            return window.top.allUnion.SYGZJB
        } else {
            let sqlSY = `SELECT  ELE_CODE ,ELE_CODE||'-'||ELE_NAME AS ELE_NAME FROM ELE_UNION WHERE  ELE_CATALOG_ID='GWGZJB' ORDER BY ELE_CODE`
            window.top.allUnion.SYGZJB = speardUtil.selectBySql(sqlSY).result;
            return window.top.allUnion.SYGZJB;
        }
    } else {
        return []
    }
}


/**
 *
 * @param data
 * @private
 */
function getPersonid__(data, errorData) {
    let czlx = speardUtil.getPms('URL_CZLX');
    let agecnyid = speardUtil.getPms('URL_agencyid');
    let year = speardUtil.getPms('USER_currentyear');
    if (czlx != '1') {
        let IDNOs = data.inserted.map(item => `'${item.IDNO}'`);
        if (IDNOs && IDNOs.length > 0) {
            let sql1 = `SELECT PERSONID,IDNO FROM NY_PERSONINFO WHERE IDNO IN(${IDNOs.join(',')})`;
            let sql2 = `SELECT PERSONID,IDNO FROM NY_PAYROLL WHERE CZLX = '1' AND STATUS = '2' AND AGENCYID = '${agecnyid}' AND YEAR='${year}'`;
            let persons2 = speardUtil.selectBySql(sql2).result;
            let person1 = speardUtil.selectBySql(sql1).result;
            let persons = person1.concat(persons2);
            let no_idObj = {};
            persons.forEach(item => no_idObj[item.IDNO] = item.PERSONID);
            for (let i = 0; i < data.inserted.length; i++) {
                let item = data.inserted[i];
                if (no_idObj[item.IDNO]) {
                    item.PERSONID = no_idObj[item.IDNO]
                } else {
                    errorData.NOPERSON.push(item.PERSONNAME);
                    data.inserted.splice(i, 1);
                    i--;
                }
            }
        }
    }
    //新增人员 GUID = PERSONID
    else {
        data.inserted.forEach(item => {
            let id = getGUID_Y_();
            item.GUID = id;
            item.PERSONID = id;
        })
    }
    return data;
}

/**
 * 计算变动前后合计
 * @param data
 * @private
 */
function computed_sum_(data) {
    debugger
    let SUMOBJ = {
        //变动前合计字段
        BDQYGZHJ: ["OLDJOBLEVELWAGE", "OLDJOBPOSTWAGE", "OLDPERIODWAGE", "BDQJHTGBF", "BDQJHLJT", "BDQBLDFLXBT", "BDQGZXJT", "BDQSHXBT", "BDQDFJCJXBT", "BDQBLGZ", "BDQNZGWSF", "BDQTSGWJT", "BDQJXJT", "BDQQTXMDJBT", "BDQTGBLCGBF"],
        //变动后合计字段
        BDHYGZHJ: ["NEWJOBLEVELWAGE", "NEWJOBPOSTWAGE", "NEWPERIODWAGE", "BDHJHTGBF", "BDHJHLJT", "BDHBLDFLXBT", "BDHGZXJT", "BDHSHXBT", "BDHDFJCJXBT", "BDHBLGZ", "BDHNZGWSF", "BDHTSGWJT", "BDHJXJT", "BDHQTXMDJBT", "BDHTGBLCGBF"],
        //离休
        ZJDLXF: ["ZJDLXF"]
    }

    for (let row of data.inserted) {
        for (let type in SUMOBJ) {
            let fields = SUMOBJ[type];
            row[type] = 0;
            fields.forEach(field => {
                if (!row[field]) {
                    row[field] = 0;
                }
                row[type] += row[field];
            })
        }
    }

    return data;
}


//随机32位码
function getGUID_Y_() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid.replaceAll("-", "").toUpperCase();
}