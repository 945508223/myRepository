
//==============================================================================快照===========================================================================================

/**
 * 保存快照
 */
function saveRptSnapshot() {
    debugger
    //获取汇总后sheet页信息
    let sheetInfo = speardUtil.getSheetJsonAndTag(spread, 0);
    if (!sheetInfo || !sheetInfo.JSON) {
        console.error("获取快照信息失败");
        return false;
    }
    sheetInfo.JSON.name = "原始汇总快照";

    let taskId = speardUtil.getPms('URL_TASKID');
    let rpttId = speardUtil.getPms('URL_reportid');
    if (!taskId || !rpttId) {
        console.error("保存快照失败,未获取到ID信息");
        return false;
    }
    let delSql = `delete from PM_GOV_SNAP where TASKID ='${taskId}' and REPORTID = '${rpttId}'`;
    let delRes = speardUtil.exeSql(delSql);
    if (!delRes || delRes.isError) {
        console.error(delRes.errMsg ? delRes.errMsg : "删除旧快照失败");
        return false;
    }
    var param = {
        type: 'add',
        columns: "",
        keyField: "TASKID",
        tableName: "PM_GOV_SNAP",
        datas: JSON.stringify(
            {
                TASKID: taskId,
                REPORTID: rpttId,
                CUSERID: speardUtil.getPms("USER_mid"),
                CUSERNAME: speardUtil.getPms("USER_UserName"),
                VERSION: "1",
                //RPTBODY: JSON.stringify(sheetInfo)
            }),
    }

    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/sysconfig/frame/saveForm", param);
    if (!result || result.isError) {
        console.error(result.errMsg ? result.errMsg : "保存快照失败");
        return false;
    }
    //保存大字段

    let result2 = YCDCommon.Ajax.syncAjax(getProjectName() + "/sysconfig/frame/setClob", {
        tableName:"PM_GOV_SNAP",
        keyFieldName:"TASKID",
        keyVal:taskId,
        clobFieldName:"RPTBODY",
        content:JSON.stringify(sheetInfo),
        whereStr: `1=1 AND TASKID ='${taskId}' and REPORTID = '${rpttId}'`
    });
    if (!result2 || result2.isError) {
        console.error(result2.errMsg ? result2.errMsg : "保存快照失败");
        return false;
    }
    //保存成功加载快照
    return setRptSnapshot(sheetInfo);

}



//加载汇总快照
function initRptSnapshot() {
    debugger
    let taskId = speardUtil.getPms('URL_TASKID');
    let rpttId = speardUtil.getPms('URL_reportid');
    if (!taskId || !rpttId) {
        console.error("保存快照失败,未获取到ID信息");
        return false;
    }
    var param = {
        keyFieldName: "TASKID",
        keyVal: taskId,
        tableName: "PM_GOV_SNAP",
        clobFieldName: "RPTBODY",
        whereStr: ` TASKID = '${taskId}' AND REPORTID = '${rpttId}'`
    }

    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/sysconfig/frame/getClob", param);
    if (!result || result.isError) {
        console.error(result.errMsg ? result.errMsg : "初始化快照失败,获取快照信息失败");
        return false;
    } else if (result.result) {
        return setRptSnapshot(result.result);
    }

    return true;
}

//设置报表快照
function setRptSnapshot(sheetInfo) {
    if (spread.getSheetCount() == 1) {
        spread.addSheet(1, new GC.Spread.Sheets.Worksheet("原始汇总快照"));
    }
    let snapSheet = spread.getSheet(1);
    let res = speardUtil.importSheet(spread, sheetInfo, 1, true);
    //设置只读
    if (sheetInfo.TAG) {
        for (let axis in sheetInfo.TAG) {
            if (sheetInfo.TAG[axis].substring(0, 1) == "{") {
                let row = axis.split(",")[0];
                let col = axis.split(",")[1];
                $SH.setLocked(snapSheet, row, col, true);
            }
        }
    }
    return res;
}