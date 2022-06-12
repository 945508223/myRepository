debugger
if (parent.$DS.getPms("SUPERTASKID") && parent.$DS.getPms("SUPERTASKID").length > 0) {
    $DS.putPms("SUPERTASKID", parent.$DS.getPms("SUPERTASKID")[0])
}

var type = YCDCommon.Win.getUrlParam("type")
if (type == "stop") {
    let btnRow = $DS.getCtrl("ROW_按钮容器").info;
    let gridInfo = $DS.getCtrl("GRID_任务下达表格").info;
    gridInfo.ds_height = "calc(100% - 5rem)";
    gridInfo.ds_showcheckbox = true;
    btnRow.ds_show = true;
}

/**
 * 终止任务
 */
function stopTaskBySelect() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_任务下达表格").info;
    let selectRow = $grid.getCheckedNodes(gridInfo.ds_id);
    if (selectRow.length == 0) {
        alert("请选择要终止的任务");
        return false;
    }

    let filterSelect = [];
    for (let row of selectRow) {
        if (!row.children) {
            filterSelect.push(row);
        } else if (row.children && row.children.length > 0) {
            let flag = checkedSelect(row.children);
            if (flag == true) {
                filterSelect.push(row);
            }
        }
    }

    function checkedSelect(childrens) {
        let flag = childrens.every(child => child.treegrid_ischecked == true);
        if (flag == false) {
            return false
        } else {
            for (let ccchild of childrens) {
                if (ccchild.children && ccchild.children.length > 0) {
                    flag = checkedSelect(ccchild.children)
                }
            }
        }
        return flag;
    }

    if (filterSelect.length > 0) {
        let result = sql_taskstatus_change("9", filterSelect.map(filterSelect => filterSelect.TASKID))
        if (result && !result.isError) {
           $DS.util.close();
           alert("终止成功");
            let tabInfo = parent.$DS.getCtrl("TABS_区划任务列表").info;
            parent.$tabs.load(tabInfo.ds_id);
        }else {
            alert("终止失败");
            console.error(result.errMsg)
        }
    }

}


/**
 *
 * @param n
 * @returns {*}
 */
//通用修改任务状态方法
function sql_taskstatus_change(n, taskIds) {
    debugger
    var result;
    var strIds = taskIds.map(id=>`'${id}'`);
    //修改单条区划任务状态
    let sql = `update RURAL_TASK_DETAIL set taskstatus = ${n} where GUID in (${strIds.join(",")})`;
    result = $DS.exeSql(sql);
    if (result && !result.isError) {
        //新增历史表
        result = fun_historyDataField_change(strIds.join(","));
    }

    clear_Cache();
    return result;
}


/**
 * 历史记录表增加数据方法
 */
function fun_historyDataField_change(strIds) {
    debugger
    var sql = `select * from RURAL_TASK_DETAIL where GUID in (${strIds})`;
    let result = $DS.selectBySql(VUECFG.appId, sql);
    result = result.result;
    var TB = [];
    for (let i = 0; i < result.length; i++) {
        var insertData = {
            TASKID: result[i].GUID,
            SUPERTASKID: result[i].SUPERTASKID || "",
            TASKSTATUS: result[i].TASKSTATUS || "",
            SUBDEPARTMENT: result[i].SUBDEPARTMENT || "",
            SUBUSER: result[i].SUBUSER || "",
            SUBMANAGER: result[i].SUBMANAGER || "",
            SUBDATE: result[i].SUBDATE ? $DS.util.timeFormate(new Date(strTimeForMT(result[i].SUBDATE)), "yyyy-MM-dd HH:mm:ss") : "",
            SUBADMDIVNAME: result[i].SUBADMDIVNAME || "",
            SUBDEPTMANAGER: result[i].SUBDEPTMANAGER || "",
            SUBREMARK: result[i].SUBREMARK || "",
            SUBREMARKBASE: result[i].SUBREMARKBASE || "",
            SUBREMARKYEAR: result[i].SUBREMARKYEAR || "",
            SUBREMARKOTHER: result[i].SUBREMARKOTHER || "",
            RETUENREMARK: result[i].RETUENREMARK || "",
            CREATE_TIME: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss")
        }
        TB.push(insertData);
    }
    let data = {inserted: TB, updated: [], deleted: []}
    result = $DS.saveAllTableData("RURAL_TASK_HISTORY", "GUID", data, VUECFG.appId);


    return result;
}

/**
 * 清理缓存事件
 */
function clear_Cache() {
    var Path = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(Path + "/sysconfig/frame/clearCache");
    //$DS.clearTableSCache("RURAL_TASK_INFO,RURAL_V_TASKDETAIL,RURAL_TASK_DETAIL,RURAL_V_TASKTREESJ,RURAL_V_TASKTREE,RURAL_V_TASKMONTHINFO");
}

/**
 *
 */
function strTimeForMT(str) {
    const finalTime = str.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', '')
    return new Date(finalTime).toString();
}