let checkPageInfo = {
    agencyId: $DS.getPms('URL_agencyId'),
    agencyCode: $DS.getPms('URL_agencyCode'),
    agencyName: $DS.getPms('URL_agencyName'),
    currentMonth: $DS.getPms('URL_currentMonth'),
    year: $DS.getPms('USER_currentyear'),
    popWin: window.top.popWin

}

init_();

function init_() {
    debugger
    //调整过滤条件 过滤调已选的人员
    let pGridInfo = checkPageInfo.popWin.$DS.getCtrl('GRID_明细表格').info;
    if (pGridInfo?.ds_grid?.length > 0) {
        let notInIds = pGridInfo.ds_grid.map(row => `'${row.PERSONID}'`).join(',');
        $DS.getSource('DS_单位人员基本信息').filter += ` and PERSONID not in(${notInIds})`;
    }
}

/**
 * 加载选择人员表格数据前事件 去除已审核的
 * @param info
 */
function beforeLoadGridData(info, data) {
    if (data?.val?.rows?.length > 0) {
        let checkedPeople = `select PERSONID FROM NY_REDUCE_DETAIL WHERE AGENCYID = '${checkPageInfo.agencyId}' AND CURRENTMONTH ='${checkPageInfo.currentMonth}' AND STATUS <>0`;
        let result = $DS.selectBySql(VUECFG.appId, checkedPeople)?.result?.map(item => item.PERSONID);
        if (result?.length > 0) {
            data.val.rows = data.val.rows.filter(item => !result.includes(item.PERSONID))
        }
    }
}


/**
 * 点击保存
 */
function saveBtnClickEvent() {
    debugger
    let reasonInfo = $DS.getCtrl('RADIO_减少原因').info;
    let reason = reasonInfo.ds_radio;
    if (!reason) {
        alert('请选择人员减少原因!');
        return false;
    }
    let reasonText = reasonInfo.ds_options.find(item => item.value == reason).text;
    let gridInfo = $DS.getCtrl('GRID_人员列表').info;
    let checkedNodes = $grid.getCheckedNodes(gridInfo.ds_id);
    if (checkedNodes?.length > 0) {
        let addPersonInfo = getPersonIfoByAddPersons(checkedNodes);
        let insertData = checkedNodes.map(person => {
            let addItem = {};
            addItem.PERSONID = person.PERSONID;//人员唯一标识
            addItem.AGENCYID = checkPageInfo.agencyId;//单位ID
            addItem.YEAR = checkPageInfo.year;
            addItem.AGENCYNAME = checkPageInfo.agencyName;//单位名称
            addItem.AGENCYCODE = checkPageInfo.agencyCode;//单位编码
            addItem.RYJSLX = reason;//人员减少类型
            addItem.CURRENTMONTH = checkPageInfo.currentMonth;//当前月份
            addItem.NAME = person.PERSONNAME;//人员名称
            addItem.IDNO = person.IDNO;//身份证号
            addItem.MONTHWAGE = person.ISXZ == '1' ? (addPersonInfo[person.BDHYGZHJ] || 0) : (person.YGZHJ || 0);//月工资
            addItem.STATUS = '0';
            addItem.REMARK = reasonText;//备注
            addItem.ACTIONMONTH = parseInt(checkPageInfo.currentMonth);//执行月份
            addItem.ADDMONTH = 13 - parseInt(checkPageInfo.currentMonth);//补发月份 12 - 执行月份+1
            addItem.ADDWAGE = parseInt(addItem.ADDMONTH) * parseFloat(addItem.MONTHWAGE) * -1;
            return addItem;
        })

        let result = $DS.saveAllTableData('NY_REDUCE_DETAIL', 'GUID', {inserted: insertData, updated: [], deleted: []})
        if (result.isError) {
            alert('保存失败:' + result.errMsg);
        } else {
            let win = window.top.popWin;
            //刷新表格
            win.$DS.loadCtrl('GRID_明细表格');
            $DS.util.close();
            win.alert('保存成功!');
            setTimeout(() => {
                delete window.top.popWin;
            })
        }
    }
}


//搜索
function searchPeople(val) {
    debugger

    let source = $DS.getSource('DS_单位人员基本信息');
    let filter = "[and] year = '${V.USER_currentyear}' [and] AGENCYCODE = '${V.URL_agencyCode}' [and] TASKMONTH = '${V.URL_currentMonth}'  and PERSONSTATUS in (3,9)";
    if (val != '' && val != null && val != undefined) {
        source.filter = filter + ` and (IDNO like '%${val}%' or PERSONNAME like '%${val}%')`;
    } else {
        source.filter = filter;
    }
    let gridVm = $grid.getGridVmByName('GRID_单位基本工资表');
    gridVm.currentPage = 1;
    $DS.loadCtrl('GRID_人员列表');

}

//取新增人员信息
function getPersonIfoByAddPersons(checkedNodes) {
    debugger
    let addPerson = checkedNodes.filter(item=>item.ISXZ == '1');
    let personObj = {};
    if (addPerson.length > 0) {
        let personids = addPerson.map(item => `'${item.PERSONID}'`)
        let sql = `select * from NY_PAYROLL WHERE PERSONID IN (${personids}) AND CZLX ='1' `
        let result = $DS.selectBySql(VUECFG.appId, sql).result;
        result.forEach(item => {
            personObj[item.PERSONID] = item;
        })
    }

    return personObj;
}