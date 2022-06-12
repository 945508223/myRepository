var topWin = $DS.util.getTopWin("window");
topWin.$DS.putPms("op","sum");
topWin.$DS.putPms("allBtn_notShow","true");
$DS.putPms("myParent","isSummary");

//表格行点击事件
function grid_row_click(val) {
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("grid_node_val", val);
    var subWin = $iframe.getSubWindow("IFRAME_填报页面网页框");
    subWin.loadCtrl_btn();

}

//树节点点击事件
function tree_click(val){
    $DS.putPms("SUPERTASKID",val.ID);
    $DS.loadCtrl("GRID_下达区划列表");
}

function thsm(){
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("RETURN_REMARK_TYPE","readOnly");
    $DS.showPage("freeFromView.jsp?PAGEID=9504922F12B04387A76882A69361260A&PAGETITLE=【5-3-1-1-1-1】退回说明&APPID=BMP", "退回原因", "65%", "75%");
}