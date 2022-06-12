let pageInfo = {
    TASKID: '',//任务id
    gridId: '',//表格控件id
    oldCheckedCodes: [],//初始化选中时勾选的科目编码
    saveTableName: '',//保存报表数据的表名
    rptWin: '',//父页面报表页面的win
    savePms: {},//保存时需要保存的通用参数
};

/**
 * 初始化 选中
 * @private
 */
function init_() {
    debugger
    //  TODO 通过报表页面 获取已经勾选的表数据 并记录
    pageInfo.rptWin = parent.$iframe.getSubWindow('IFRAME_采集表');
    pageInfo.TASKID = pageInfo.rptWin.speardUtil.getPms('TASKID');
    let TASKDATA = pageInfo.rptWin.pageParams["TASKDATA"];
    pageInfo.savePms = {
        TASKID: pageInfo.TASKID,
        ADMDIV: TASKDATA["ADMDIV"],
        MOF_DIV_CODE: TASKDATA["MOF_DIV_CODE"],
        AGENCY_ID: TASKDATA["AGENCYID"],
        AGENCY_CODE: TASKDATA["AGENCY_CODE"],
        CREATE_USER: pageInfo.rptWin.speardUtil.getPms("USER_MID"),
        year: pageInfo.rptWin.speardUtil.getPms("URL_YEAR"),
        UPDATE_TIME: "sysdate",//更新时间
        CREATE_TIME: "sysdate",//创建时间
    };


    pageInfo.saveTableName = getSaveTableName_();
    let sql = `select ITEMCODE from ${pageInfo.saveTableName} where TASKID = '${pageInfo.TASKID}'`;
    let result = $DS.selectBySql(VUECFG.appId, sql);
    if (result.isError) {
        console.error(result.errMsg);
        alert('加载科目失败!');
        return;
    } else if (result?.result?.length > 0) {
        //记录
        pageInfo.oldCheckedCodes = result.result.map(item => item.ITEMCODE);
    }

}

init_();


/**
 * 表格加载完成事件勾选表格
 * @param info
 */
function gridCompleteCheckedRow(info) {
    debugger
    console.log(window.top.comboBoxOption);
    let sheet = pageInfo.rptWin.spread.getActiveSheet();
    //取编码单元格tag
    let tag;
    let gridData = [];
    for (let item of pageInfo.rptWin.tagObj.vexpand) {
        for (let tagItem of item) {
            if (tagItem.fieldname == 'ITEMCODE') {
                tag = tagItem.tagval;
                break;
            }
        }
    }
    try {
        gridData = pageInfo.rptWin.speardUtil.getComboBoxOption(tag, sheet, true);
    } catch (e) {
        console.error(e)
    }

    info.ds_grid = gridData;
    pageInfo.gridId = info.ds_id;

    if (pageInfo.oldCheckedCodes.length > 0) {
        let key = setInterval(() => {
            try {
                if (Object.keys($grid.getElGridVmById(info.ds_id)).length > 0) {
                    clearInterval(key);
                    $grid.setCheckedNodes(info.ds_id, pageInfo.oldCheckedCodes, true, true);
                }
            } catch (e) {
                clearInterval(key);
                alert('设置科目失败!');
                console.error(e);
            }
        }, 500)
    }
}

/**
 *
 * @private
 */
function saveCheckCode_() {
    debugger
    // 对比刚开页面时勾选的数据 做 insert update delete
    let saveData = {inserted: [], updated: [], deleted: []};
    let newCheckedRows = $grid.getCheckedNodes(pageInfo.gridId);
    let newCheckedCodes = [];
    //原先未勾选 现在勾选 新增
    for (let row of newCheckedRows) {
        newCheckedCodes.push(row.ITEMCODE);
        if (!pageInfo.oldCheckedCodes.includes(row.ITEMCODE)) {
            let insertItem = {};
            insertItem.LEVELS = row.LEVELS;
            insertItem.ITEMNAME = row.ITEMNAME;
            insertItem.ITEMCODE = row.ITEMCODE;
            insertItem.BGTPRO_ID = pageInfo.rptWin.speardUtil.editGrid.creatKeyField({ITEMCODE: row.ITEMCODE})?.BGTPRO_ID;
            insertItem = $.extend(insertItem, pageInfo.savePms);
            saveData.inserted.push(insertItem);
        }
    }
    //原先勾选 现在未勾选 删除
    for (let code of pageInfo.oldCheckedCodes) {
        if (!newCheckedCodes.includes(code)) {
            saveData.deleted.push({ITEMCODE: code, TASKID: pageInfo.TASKID});
        }
    }
    let result = $DS.saveAllTableData(pageInfo.saveTableName, 'ITEMCODE', saveData, VUECFG.appId);
    if (result.isError) {
        alert('保存失败!');
        console.error(result.errMsg);
    } else {
        $DS.util.close();
        pageInfo.rptWin.location.reload(false);
    }
}


function getSaveTableName_() {

    let reportId = pageInfo.rptWin.speardUtil.getPms('URL_reportid');
    let sql = `select STORTABLENAME  from RPT_T_REPORTTEMPLET where GUID='${reportId}'`;
    let result = pageInfo.rptWin.speardUtil.selectBySql(sql);
    if (result.isError) {
        console.error(result.errMsg);
        return false;
    } else {
        return result.result[0].STORTABLENAME;
    }
}
