let TaskStatusCode = {};
getParentTaskId()
getTaskStatusCode();

function getParentTaskId() {
    debugger
    let parentPage = $DS.getPms("URL_parent");
    let gridInfo = "";
    if (parentPage == "new") {
        gridInfo = parent.$DS.getCtrl("GRID_区划列表").info;
    } else {
        gridInfo = parent.$DS.getCtrl("GRID_已填报单位").info;
    }

    let row = parent.$grid.getCheckedNodes(gridInfo.ds_id);
    $DS.putPms("C_TASK", row);

}

//设置中文状态 TASKSTATUS
function getTaskStatusCode() {
    let sql = `select ITEMCODE,ITEMNAME from dm_base_codes where BASETYPE='TASKSTATUS'`;
    let res = $DS.selectBySql(VUECFG.appId, sql);
    if (res && res.result) {
        res = res.result;
        for (let row of res) {
            TaskStatusCode[row["ITEMCODE"]] = row["ITEMNAME"];
        }
    }
}

function setTimelineTaskStatusCN() {
    debugger
    let info = $DS.getCtrl("TIMELINE_状态历史").info;
    let newData = $DS.util.clone(info.ds_timeline_data);
    for (let item of newData) {
        item["TASKSTATUSCN"] = TaskStatusCode[item.TASKSTATUS];
    }
    //去除冗余数据
    newData = distinctTimeline(newData);
    info.ds_timeline_data = newData;
}

//去除时间线重复数据
function distinctTimeline(data) {
    debugger
    let status = data[0].TASKSTATUS;
    for (let i = 1; i < data.length; i++) {
        if (data[i].TASKSTATUS == status) {
            data.splice(i, 1);
            i--;
        } else {
            status = data[i].TASKSTATUS;
        }
    }
    return data;
}


//设置节点颜色
function setPointColor(val) {

    if (val.TASKSTATUSCN && val.TASKSTATUSCN.indexOf("退回") != -1) {
        return "rgb(234 140 147)";
    } else {
        return "rgb(11, 189, 135)";
    }
}

//设置节点图标
function setPointIcon(val) {

    if (val.TASKSTATUSCN && val.TASKSTATUSCN.indexOf("退回") != -1) {
        return "el-icon-error";
    } else {
        return "el-icon-success";
    }
}

function setDefuaultCruuentForTimeline(info) {

    if (info.ds_grid && info.ds_grid.length > 0) {
        let key = info.ds_grid[0].TASKID;
        $grid.setCheckedNodes(info.ds_id, key, true);
    }
}