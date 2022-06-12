let taskGridInfo = parent.$DS.getCtrl("GRID_任务列表").info;
let selectTask = parent.$grid.getData(taskGridInfo.ds_id)[0];
let checkNodes = [];

//初始化树
function initTreeData_Task(info) {
    debugger
    let listTreeData = $DS.util.childrenToList(info.ds_tree, "children", []);
    let sql = `select * from RURAL_TASK_DETAIL where SUPERTASKID='${selectTask.GUID}'`;

    let res = $DS.selectBySql(VUECFG.appId, sql);
    if (res && !res.isError && res.result.length > 0) {
        res = res.result;
        let resId = res.map(item => item.ADMDIV);
        let endNodeId = [];
        for (let i = 0; i < listTreeData.length; i++) {
            if (listTreeData[i].children) {
                delete listTreeData[i].children;
            }
            if (resId.indexOf(listTreeData[i].GUID) !== -1) {
                listTreeData[i]["disabled"] = true;
                if (listTreeData[i].ENDFLAG == 1) {
                    endNodeId.push(listTreeData[i].GUID);
                }
            }
        }
        info.ds_tree = $DS.util.children(listTreeData, "ID", "PID", "children");
        $tree.setCheckedNodes(info.ds_id, endNodeId);
        let halfKeys = window.top[info.ds_id + "treeRef"].getHalfCheckedKeys() ? window.top[info.ds_id + "treeRef"].getHalfCheckedKeys() : [];
        let checkKeys = window.top[info.ds_id + "treeRef"].getCheckedKeys() ? window.top[info.ds_id + "treeRef"].getCheckedKeys() : [];
        checkNodes = halfKeys.concat(checkKeys);
    }
}


function sureDownTask() {
    debugger
    //修改状态 添加下发时间
    selectTask["TASKSTATUS"] = "1";
    selectTask["TASKDOWNDATE"] = formateDate2String(new Date(), "yyyy-MM-dd HH:mm:ss");
    var saveData = [];
    let treeInfo = $DS.getCtrl("TREE_区划树").info;
    let selectRes = $tree.getCheckedNodes(treeInfo.ds_id);
    let halfRes = window.top[treeInfo.ds_id + "treeRef"].getHalfCheckedNodes();
    selectRes = selectRes.concat(halfRes);
    selectRes = selectRes.filter(item => checkNodes.indexOf(item.GUID) == -1);

    if (selectRes.length == 0) {
        $DS.util.close();
        return;
    }
    for (let i = 0; i < selectRes.length; i++) {
        if (selectRes[i].GUID == $DS.getPms("USER_UPADMDIV")) {
            continue;
        }
        let newItem = {};
        newItem["ADMDIV"] = selectRes[i].GUID;
        newItem["TASKADMDIV"] = selectRes[i].GUID;
        newItem["TASKADMDIVCODE"] = selectRes[i].ITEMCODE;
        newItem["TASKADMDIVNAME"] = selectRes[i].ITEMNAME;
        newItem["SUPERTASKID"] = selectTask.GUID;
        newItem["TASKSTATUS"] = selectTask.TASKSTATUS;
        newItem["TASKMONTH"] = selectTask.TASKMONTH;
        newItem["TASKNO"] = selectTask.TASKNO + "-" + selectRes[i].ITEMCODE;
        newItem["TASKNAME"] = selectTask.TASKNAME;
        newItem["TASKTYPE"] = selectTask.TASKTYPE;
        newItem["STARTDATE"] = selectTask.STARTDATE;
        newItem["ENDDATE"] = selectTask.ENDDATE;
        newItem["BUDGETLEVEL"] = selectTask.BUDGETLEVEL;//任务级次
        newItem["TASKDOWNDATE"] = selectTask["TASKDOWNDATE"];
        newItem["SUPERADMDIV"] = $DS.getPms("USER_admdiv");//selectTask.GUID//;
        saveData.push(newItem);
    }

    var _saveData = {inserted: saveData, deleted: [], updated: []};
    var saveRes = $DS.saveAllTableData("RURAL_TASK_DETAIL", "GUID", _saveData, VUECFG.appId);
    /**var basePath = $DS.util.getProjectName(VUECFG.appId);
     for (let i = 0; i < saveData.length; i++) {
        //var saveRes = $DS.saveTable(VUECFG.appId, "add", saveData, "RURAL_TASK_DETAIL", "GUID")
        var param = {
            type: "add",
            columns: "",
            keyField: "GUID",
            tableName: "RURAL_TASK_DETAIL",
            isRefOrderNum: "1",
            datas: JSON.stringify(saveData[i]),
            dbSource: "",
        }

        var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/saveForm", param);
        if (!result || (result && result.isError)) {
            console.error(result.errMsg);
            console.error(saveData[i]);
        }
    }**/


        //保存任务表
    var taskData = {inserted: [], deleted: [], updated: []};
    if (selectTask.optType == "inserted") {
        taskData.inserted.push(selectTask);
    } else {
        taskData.updated.push(selectTask);
    }
    var saveTaskRes = $DS.saveAllTableData("RURAL_TASK_INFO", "GUID", taskData, VUECFG.appId);
    if (saveRes.isError || saveTaskRes.isError) {
        alert("下达任务失败!");
    } else if (!saveRes.isError && !saveTaskRes.isError) {
        //清除缓存
        $DS.clearTableSCache("RURAL_TASK_INFO,RURAL_TASK_DETAIL,RURAL_V_TASKDETAIL")
        parent.$DS.loadCtrl("GRID_任务列表");
        let detelWin = parent.$tabs.getSubWindow("TABS_区划任务列表", 1);
        detelWin.$DS.loadCtrl("GRID_任务下达表格");
        parent.taskPageInfo.taskTypeObj = {};
        parent.taskPageInfo.taskMonthObj = {};
        alert("下达任务成功!");
    }
}

//清空全选
function clearAll_TASK(){
   let treeInfo = $DS.getCtrl("TREE_区划树").info;
   $tree.setCheckedNodes(treeInfo.ds_id,[]);
}

//全选
function selectAll_TASK() {
    let treeInfo = $DS.getCtrl("TREE_区划树").info;
    $tree.setCheckedNodes(treeInfo.ds_id,[treeInfo.ds_tree[0].ID]);
}