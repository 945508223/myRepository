//加载完成事件调用 新增时设置单位信息 以及各字段默认值
function setAgencyInfoForAdd() {
    debugger
    console.log(tagObj);
    let sheet = spread.getActiveSheet();
    if (speardUtil.getPms('URL_insType') == 'add') {
        let defaultObj = {
            AGENCYCODE: speardUtil.getPms(`URL_AGENCYCODE`),
            AGENCYNAME: speardUtil.getPms(`URL_AGENCYNAME`)
        }
        //获取默认值
        let url = `${getProjectName()}/sysconfig/getBusiTableDefaultVal?tableName=NY_PAYROLL`;
        var result = YCDCommon.Ajax.syncAjax(url);
        if (result.isError) {
            console.error('获取表默认值异常' + result.errMsg);
        } else {
            defaultObj = Object.assign(result.result, defaultObj);
        }
        tags_position[0].forEach(pos => {
            var tag = speardUtil.getTagByIndex(sheet, pos.row, pos.col);
            if (defaultObj.hasOwnProperty(tag.fieldname)) {
                $SH.setValue(sheet, pos.row, pos.col, defaultObj[tag.fieldname]);
            }
        })
    } else {
        //修改状态 根据人员类别 设置人员编制下拉
        for (let pos of tags_position[0]) {
            var tag = speardUtil.getTagByIndex(sheet, pos.row, pos.col);
            if (tag.fieldname == 'PERSONCAT') {
                let catVal = $SH.getValue(sheet, pos.row, pos.col);
                setPersonstaffOptionsByCat(catVal, sheet, true);
                setZW(catVal, sheet, true);
                setOLDOPOSTGRADOptionsByCat(catVal, sheet, true);
                break;
            }
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
        setPersonstaffOptionsByCat(params.args.newValue, params.sheet, false);
        setZW(params.args.newValue, params.sheet,false);
        //根据人员类别设置级别(岗位)工资
        setOLDOPOSTGRADOptionsByCat(params.args.newValue, params.sheet, false, params.row);
    }
    //人员来源修改调整工资变动原因
    else if (params.tag.fieldname == 'PERSONFROM') {
        let val = $SH.getValue(spread.getActiveSheet(), params.row, params.col);
        switch (val) {
            //1 6 试用人员
            case '1':
            case '6':
                setCHANGERESON_('11');
                break;
            // 转业定资
            case '5':
            case '7':
                setCHANGERESON_('12');
                break;
            default:
                setCHANGERESON_('');
                break
        }
    }
    //修改参加工作时间 计算工龄
    else if (params.tag.fieldname == 'CJGZSJ') {
        setWorkYear(params)
    }
}



/**
 * 根据人员类别设置级别(岗位)工资
 */
function setOLDOPOSTGRADOptionsByCat(catVal, sheet, isInit, row) {
    if (!catVal)
        catVal = '1';
    let dataCodeMap = {
        '1': 'ele_13',//行政
        '2': 'ele_3',//事业
    }
    let OLDOPOSTGRADCell = getCellPositionByField('OLDOPOSTGRAD');
    let NEWOPOSTGRADCell = getCellPositionByField(row, 'NEWOPOSTGRAD');
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
function setCHANGERESON_(reson) {
    let sheet = spread.getActiveSheet();
    let pos = tags_position[0].find(pos => {
        var tag = speardUtil.getTagByIndex(sheet, pos.row, pos.col);
        if (tag.fieldname == 'CHANGERESON')
            return pos;
    })

    $SH.setValue(sheet, pos.row, pos.col, reson);
    speardUtil.fireCellChanageEvent(pos.row, pos.col, [{
        row: pos.row,
        col: pos.col
    }])
}


/**
 * 根据人员类别设置人员编制
 */
function setPersonstaffOptionsByCat(catVal, sheet, isInit) {
    if (!catVal)
        catVal = '1';
    let dataCodeMap = {
        '1': 'ELE_8',//行政
        '2': 'ELE_9',//事业
    }

    let personstaffCell = tags_position[0].find(pos => {
        var tag = speardUtil.getTagByIndex(sheet, pos.row, pos.col);
        if (tag.fieldname == 'PERSONSTAFF')
            return pos;
    })
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
    $SH.setLocked(sheet, personstaffCell.row, personstaffCell.col, false)
}


/**
 * 人员类别变动 修改职务级别下拉
 * @param catVal
 * @param sheet
 * @param isInit
 */
function setZW(catVal, sheet, isInit) {
    debugger
    if (!catVal)
        catVal = '1';
    let dataCodeMap = {
        '1': 'ELE_10',//行政引用职务
        '2': 'ELE_2',//事业引用技术等级
    }


    let oldJobLevelPos = getCellPositionByField('OLDJOBLEVEL');
    let newJobLevelPos = getCellPositionByField('NEWJOBLEVEL');
    let oldJob = getCellPositionByField('OLDJOB');
    let newJob = getCellPositionByField('NEWJOB');
    let posArr = [oldJobLevelPos,newJobLevelPos,oldJob,newJob];

    for(let pos of posArr){
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
        $SH.setLocked(sheet, pos.row, pos.col, false)
    }



}


//变更参加工作时间
function setWorkYear(param) {
    //参加工作时间
    let joinWorkDate = $SH.getValue(param.sheet, param.row, param.col);
    if (joinWorkDate && joinWorkDate.split('/') && joinWorkDate.split('/')[0]) {
        let year = speardUtil.getPms('USER_currentyear');
        let workYear = parseInt(year) - parseInt(joinWorkDate.split('/')[0]);
        let pos = getCellPositionByField('WORKDATE');
        $SH.setValue(param.sheet, pos.row, pos.col, workYear);
        speardUtil.fireCellChanageEvent(pos.row, pos.col, [{
            row: pos.row,
            col: pos.col
        }])
    }

}


//根据字段取单元格坐标
function getCellPositionByField(field) {
    let sheet = spread.getActiveSheet();
    let cellPosition = tags_position[0].find(pos => {
        var tag = speardUtil.getTagByIndex(sheet, pos.row, pos.col);
        if (tag.fieldname == field)
            return pos;
    })
    return cellPosition;
}