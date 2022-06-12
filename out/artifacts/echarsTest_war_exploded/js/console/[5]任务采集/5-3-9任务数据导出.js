var topWin = $DS.util.getTopWin("window");
topWin.$DS.putPms("op", "sum");
$DS.putPms("myParent", "isSummary");

//表格行点击事件
function grid_row_click(val) {
    debugger
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("grid_node_val", val);
    $DS.putPms("P_TASK", val);
    //刷新iframe
    // $DS.loadCtrl("IFRAME_填报页面网页框");
    var iframeInfo = $DS.getCtrl("IFRAME_填报页面网页框").info;
    var src = $(`#${iframeInfo.ds_id}_iframe`).attr("src");
    $(`#${iframeInfo.ds_id}_iframe`).attr("src","");
    setTimeout(function () {
        $(`#${iframeInfo.ds_id}_iframe`).attr("src",src);
    },50)

}

//树节点点击事件
function tree_click(val) {
    $DS.putPms("SUPERTASKID", val.ID);
    $DS.loadCtrl("GRID_下达区划列表");
}

//iframe加载完成事件
function iframe_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val");

    if (grid_node_val) {
        var TASKTYPE = grid_node_val.TASKTYPE;
        var sql = `select * from RURAL_TASK_TYPEMODEL where typeid = '${TASKTYPE}'`;
        var data = $DS.selectBySql(VUECFG.appId, sql).result;
        obj.ds_iframe_src = $DS.util.replace("/freeForm/freeFromView.jsp?" +
            "PAGEID=" + data[1].MODELID + "&PAGETITLE=" + data[1].MODELNAME + "&APPID=" + VUECFG.appId + "&$zoom=true");
    }

}