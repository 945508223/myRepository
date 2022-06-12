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
            //特殊处理执行月份
            if (fieldName == 'GZBDZXQSYF') {
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
function changeBFYS(newVal, tablename, guid) {

    let currentMonth = speardUtil.getPms("URL_month");
    // newVal = newVal.replace('从', '').replace('年', '/');
    //newVal = newVal.split('月')[0];
    let actionMonth = newVal.split('/')[1];
    let BFYF = 13 - parseInt(actionMonth);
    pubSave_(tablename, 'GUID', guid, 'BFYF', BFYF, true);
}

function getGuidColNum_() {
    let sheet = spread.getActiveSheet();
    let colcount = $SH.getColumnCount(sheet);
    for (let i = 0; i < colcount; i++) {
        let tag = speardUtil.getTagByIndex(sheet, 2, i);
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
    if (params.tag.fieldname == 'PERSONCAT') {
        setPersonstaffOptionsByCat(params.args.newValue, params.sheet, false, params.row);
        setZW(params.args.newValue, params.sheet, false, params.row);
    }
    //人员来源修改调整工资变动原因
    else if (params.tag.fieldname == 'PERSONFROM') {
        let val = $SH.getValue(spread.getActiveSheet(), params.row, params.col);
        switch (val) {
            //1 6 试用人员
            case '1':
            case '6':
                setCHANGERESON_('试用人员', params.row);
                break;
            // 转业定资
            case '5':
            case '7':
                setCHANGERESON_('转业定资', params.row);
                break;
            default:
                setCHANGERESON_('', params.row);
                break
        }
    }
    //修改参加工作时间 计算工龄
    else if (params.tag.fieldname == 'CJGZSJ') {
        setWorkYear(params)
    }
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
    let posArr = [oldJobLevelPos, newJobLevelPos];

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
                let errorData = [];//有问题的数据
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
                outer:for (let row = 2; row < importSheet.getRowCount(); row++) {
                    let saveItem = {};
                    let saveflag = false;   //整行中都没有数据的不导入 判断标志
                    //遍历导入sheet的每一行 以及可编辑的tag 构建保存的数据
                    for (let col in temporary.$EDITDATA[0].TAG) {
                        let tag = temporary.$EDITDATA[0].TAG[col];
                        //该列删除或隐藏且不是主键时则跳过 导入可编辑的数据 ,导出时不删除的列数据 并根据规则生成主键
                        if ((!hideColArr || !hideColArr.includes(col))
                            && (!delColArr || !delColArr.includes(col))
                            && (tag.cellprotected == 'FALSE'||tag.fieldname=='OUTUNITNAME')) {
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
                                value = formatImportData(value, tag);
                            }
                            saveItem[tag.fieldname] = value;
                        }
                    }

                    //身份证号不存在 不导入
                    if (!saveItem.IDNO) {
                        errorData.push(saveItem.PERSONNAME);
                    }
                    //值全为空 不做导入
                    if (saveflag && saveItem.PERSONNAME) {
                        //添加默认值
                        if (temporary.$EDITDATA[0].defaultValObj) {
                            for (let field in temporary.$EDITDATA[0].defaultValObj) {
                                let str = temporary.$EDITDATA[0].defaultValObj[field];
                                saveItem[field] = speardUtil.replace(str);
                            }
                        }
                        saveItem.PERSONID = speardUtil.getUUID().replaceAll('-', '').toUpperCase();
                        saveDatas.push(saveItem);
                    }
                }
                console.log(saveDatas);
                let result = inbatchesSaveData_('NY_PAYROLL', 'GUID', {inserted: saveDatas, updated: [], deleted: []})
                if (result) {
                    parent.$DS.loadCtrl('IFRAME_列表');
                    if (errorData.length > 0) {
                        alert(`${errorData.join('，')} 身份证号未填写,未执行导入`);
                    } else {
                        alert('导入成功')
                    }
                }
                /*  for(let row of saveDatas){
                      var param = {
                          type: 'add',
                          columns: "",
                          keyField: 'GUID',
                          tableName:'NY_PAYROLL' ,
                          datas: JSON.stringify(row),
                      }

                      var basePath = getProjectName();
                      var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/saveForm", param);
                  }*/
                /*if (result.isError) {
                    //parent.$DS.loadCtrl('IFRAME_列表');
                    alert('失败'+result.errMsg)
                }*/

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
function formatImportData(val, tag) {
    console.log(tag)
    if (tag.numberType == 'number') {
        val = parseInt(val);
    } else if (tag.numberType == 'float') {
        val = parseFloat(val);
    } else if (tag.numberType == 'string') {
        val = val.trim();
    }
    //引用数据
    if (tag.isSelectCol == 'TRUE') {
        let unions = getAll_ELEUNION();
        val = unions.find(item => item.ELE_NAME==val)?.ELE_CODE || '';
    }
    //日期
    else if (tag.isDateSelector == 'TRUE') {
        if (tag.fieldname == 'LEVELUPASSESSYEAR' || tag.fieldname == 'PROMOTEDASSESSYEAR') {
            val = `${val}/${speardUtil.getPms('URL_month')} 01 00:00:00`;
        } else {
            val = `${val} 01 00:00:00`;
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
function inbatchesSaveData_(tableName, keyField, data) {
    //先执行删除
    let orderArr = ['deleted', 'updated', 'inserted'];
    //toto 如果是人员调入 获取 年中追加 根据身份证获取 人员唯一标识
    data = getPersonid__(data);
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
function getAll_ELEUNION() {
    if (window.top.allUnion) {
        return window.top.allUnion;
    }

    let sql = `SELECT ELE_CODE, ELE_NAME,ELE_CATALOG_ID FROM ELE_UNION WHERE ELE_CATALOG_ID IN ('RYLB','ZZRYLY','RYBZ','JSDJ','MZ','XLLB','XB','BYYX','XL','ZW','JSDJ','GWGZJB')`
    window.top.allUnion = speardUtil.selectBySql(sql).result;
    return window.top.allUnion;
}

/**
 *
 * @param data
 * @private
 */
function getPersonid__(data) {
    let czlx = speardUtil.getPms('URL_CZLX');
    if (czlx == '2' || czlx == '3') {
        let IDNOs = data.inserted.map(item => `'${item.IDNO}'`);
        let sql = `SELECT PERSONID,IDNO FROM NY_PERSONINFO WHERE IDNO IN(${IDNOs.join(',')})`;
        let persons = speardUtil.selectBySql(sql).result;
        let no_idObj = {};
        persons.forEach(item=>no_idObj[item.IDNO]=item.PERSONID);
        data.inserted.forEach(item=>{
            item.PERSONID = no_idObj[item.IDNO]
        })
    }
    return data;
}




//比较字符串 数组相似度
function compareSimilarity(x, y) {
    if (Object.prototype.toString.call(x) == "[object String]") {
        x = x.split("");
    }
    if (Object.prototype.toString.call(y) == "[object String]") {
        y = y.split("");
    }
    var z = 0;
    var s = x.length + y.length;

    x.sort();
    y.sort();
    var a = x.shift();
    var b = y.shift();

    while (a !== undefined && b !== undefined) {
        if (a === b) {
            z++;
            a = x.shift();
            b = y.shift();
        } else if (a < b) {
            a = x.shift();
        } else if (a > b) {
            b = y.shift();
        }
    }
    return z / s * 200;
}