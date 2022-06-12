var topWin = $DS.util.getTopWin("window");
topWin.$DS.putPms("op","sum");
topWin.$DS.putPms("allBtn_notShow","true");
$DS.putPms("myParent","isSummary");

//表格行点击事件
function grid_row_click(val) {
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("task_collect_city", val);
    if(parent.$DS.getCtrl("TABS_报表")){
        parent.$DS.loadCtrl("TABS_报表");
    }else {
        parent.reloadTaskDetails(val);
        //parent.$DS.getCtrl("GRID_已填报单位")
    }

}



//树节点点击事件
function tree_click(val){
    $DS.putPms("SUPERTASKID",val.ID);
    $DS.loadCtrl("GRID_下达区划列表");
}

//-------------

function comp_grid_(info) {
    debugger
    if (info.ds_grid && info.ds_grid.length > 0) {
        let key = info.ds_grid[0].GUID;
        $grid.setCheckedNodes(info.ds_id, key, true);
        if (parent.$DS.getCtrl("TABS_报表")) {
            var topWin = $DS.util.getTopWin("window");
            topWin.$DS.putPms("task_collect_city", info.ds_grid[0]);

            parent.$DS.loadCtrl("TABS_报表");
        } else {
            parent.reloadTaskDetails(val);
        }
    }
}