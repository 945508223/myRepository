var topWin = $DS.util.getTopWin("window");
var type = topWin.$DS.getPms("RETURN_REMARK_TYPE");

function init() {

    $DS.getCtrl("BUTTON_确认").info.ds_show = true;
    //$DS.getCtrl("BUTTON_取消").info.ds_show=true;
    if (type == "readOnly") {
        $DS.getCtrl("BUTTON_确认").info.ds_show = false;
        $DS.getCtrl("BUTTON_取消").info.ds_button = "关闭";
    }
    initTaskRemark();
}

init();

//多行文本加载完成事件
function textareaVal_complete(obj) {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var sql = `select RETUENREMARK from RURAL_TASK_DETAIL  where GUID = '${grid_node_val.TASKID}'`;
    var result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        obj.ds_textarea = (result && result.result && result.result[0] && result.result[0].RETUENREMARK) ? result.result[0].RETUENREMARK : "";
    }

    obj.ds_readonly = false;
    if (type == "readOnly") obj.ds_readonly = true;
}


//任务名称标签加载完成事件
function label_admdiv_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    obj.ds_label = `<span style="line-height:1.5rem;font-size:1.5rem">${grid_node_val.TASKNAME || ""}</span>`;
}

//保存按钮点击事件
function btn_save_click() {
    debugger
    let remarkInfo = $DS.getCtrl("TEXTAREA_任务描述").info;
    let curRow = parent.$DS.getPms("SUPERTASKID");
    if (!curRow || (curRow && curRow.length == 0)) {
        $DS.util.close();
        return;
    }
    let pgridId = parent.$DS.getCtrl("GRID_任务列表").info.ds_id;
    //新建任务
    if (!curRow[0].GUID) {
        curRow[0].REMARK = remarkInfo.ds_textarea;
        parent.$grid.setOneRowData(pgridId, curRow[0].index, curRow[0]);
        $DS.util.close();
    } else {
        var res = $DS.setFlagById("RURAL_TASK_INFO", "REMARK", remarkInfo.ds_textarea, curRow[0].GUID, "1", VUECFG.appId);
        if (res.isError) {
            alert(res.errMsg);
            return;
        } else {
            $DS.clearTableSCache("RURAL_TASK_INFO");
            parent.$grid.clearCheckedNode(pgridId);
            parent.$DS.loadCtrl("GRID_任务列表");
            $DS.util.close();
        }
    }

}

function initTaskRemark() {
    debugger
    let curRow = parent.$DS.getPms("SUPERTASKID");
    if (curRow && curRow.length > 0) {
        let remarkInfo = $DS.getCtrl("TEXTAREA_任务描述").info;
        remarkInfo.ds_textarea = curRow[0].REMARK ? curRow[0].REMARK : "";
    }
}