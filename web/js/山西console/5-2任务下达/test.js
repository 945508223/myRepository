/**
 *
 * @param n
 * @returns {*}
 */
//通用修改任务状态方法
function sql_taskstatus_change(n, isAll, isFill, taskId) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var result
    //修改单条区划任务状态
    if (!isAll) {
        //如果方法参数有值使用参数值,没有则使用当前选中行的TASKID
        taskId = taskId || grid_node_val.TASKID;
        let sql = `update RURAL_TASK_DETAIL set taskstatus = ${n} where GUID = '${taskId}'`;
        result = $DS.exeSql(sql);
        if (result && !result.isError) {
            //新增历史表
            result = fun_historyDataField_change("", "", taskId);
        }
        //修改所有下级任务状态
    } else {
        var TB = []
        for (let i = 0; i < grid_node_val.children.length; i++) {
            if (grid_node_val.children[i]["TASKSTATUS"] != "9") {
                let itemTaskStatus = grid_node_val.children[i]["TASKSTATUS"];
                //如果已经是该状态或者该状态已经是批复自动跳过
                if (itemTaskStatus == n || itemTaskStatus == "5") continue;
                //如果上报按钮调用的该方法(修改的时候自动跳过已经上报到省级的区划)
                if (isFill && (itemTaskStatus == "223" || itemTaskStatus == "42")) continue;
                let obj = {
                    GUID: grid_node_val.children[i]["TASKID"],
                    TASKSTATUS: n
                }
                TB.push(obj);
            }
        }
        //如果是上报按钮调用的该方法
        if (isFill) {
            TB.push({
                GUID: grid_node_val["TASKID"],
                TASKSTATUS: n
            })
        }
        //构建历史表数组参数
        var taskIds = [];
        for (let item of TB) {
            taskIds.push(`'${item["GUID"]}'`);
        }
        let data = {inserted: [], updated: TB, deleted: []}
        result = $DS.saveAllTableData("RURAL_TASK_DETAIL", "GUID", data, VUECFG.appId);
        if (result && !result.isError) {
            //新增历史表
            result = fun_historyDataField_change(true, taskIds);

        }
    }
    grid_node_val["TASKSTATUS"] = n;
    topWin.$DS.putPms("grid_node_val", grid_node_val);
    clear_Cache();
    return result;
}


/**
 * 历史记录表增加数据方法
 */
function fun_historyDataField_change(isAll, array, taskId) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var sql = ""
    if (!isAll) {
        taskId = taskId || grid_node_val.TASKID;
        sql = `select * from RURAL_TASK_DETAIL where GUID = '${taskId}'`;
        var result = $DS.selectBySql(VUECFG.appId, sql);
        result = result.result;
        var insertData = {
            TASKID: taskId,
            SUPERTASKID: result[0].SUPERTASKID || "",
            TASKSTATUS: result[0].TASKSTATUS || "",
            SUBDEPARTMENT: result[0].SUBDEPARTMENT || "",
            SUBUSER: result[0].SUBUSER || "",
            SUBMANAGER: result[0].SUBMANAGER || "",
            SUBDATE: result[0].SUBDATE ? $DS.util.timeFormate(new Date(strTimeForMT(result[0].SUBDATE)), "yyyy-MM-dd HH:mm:ss") : "",
            SUBADMDIVNAME: result[0].SUBADMDIVNAME || "",
            SUBDEPTMANAGER: result[0].SUBDEPTMANAGER || "",
            SUBREMARK: result[0].SUBREMARK || "",
            SUBREMARKBASE: result[0].SUBREMARKBASE || "",
            SUBREMARKYEAR: result[0].SUBREMARKYEAR || "",
            SUBREMARKOTHER: result[0].SUBREMARKOTHER || "",
            RETUENREMARK: result[0].RETUENREMARK || "",
            CREATE_TIME: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss")
        }
        result = $DS.saveTable(VUECFG.appId, "add", insertData, "RURAL_TASK_HISTORY", "GUID");
    } else {
        if (array.length == 0) {
            return {
                isError: false
            }
        }

        var taskIds = array.join(",");

        sql = `select * from RURAL_TASK_DETAIL where GUID in (${taskIds})`;
        result = $DS.selectBySql(VUECFG.appId, sql);
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
    }


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