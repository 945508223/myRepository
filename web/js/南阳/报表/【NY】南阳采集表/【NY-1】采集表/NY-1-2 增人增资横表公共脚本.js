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


