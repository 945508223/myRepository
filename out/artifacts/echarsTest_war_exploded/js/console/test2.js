var myParent = parent.parent.$DS.getPms("myParent");

function init() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    if (grid_node_val.TASKID) {
        $DS.putPms("TASKID", grid_node_val.TASKID);
        topWin.$DS.putPms("TASKID", grid_node_val.TASKID);
    }

    var who = topWin.$DS.getPms("op");
    $DS.putPms("op", who == "fill" ? "fill" : "sum");

    if ($DS.getPms("URL_op")) $DS.putPms("op", $DS.getPms("URL_op"));
    if (($DS.getPms("URL_op") == "fill" && grid_node_val.TASKSTATUS == "22") || (topWin.$DS.getPms("op") == "fill" && grid_node_val.TASKSTATUS == "22")) {
        $DS.putPms("op", "readonly");
    }
    if ($DS.getPms("URL_TASKID")) $DS.putPms("TASKID", $DS.getPms("URL_TASKID"));
}

init();

//校验按钮点击事件
function btn_check_click() {
    //var topWin = $DS.util.getTopWin("window");
    //var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    var result = subWin.checkReport();
    if (result) {
        alert("校验通过");
        if (parent.clear_Cache) parent.clear_Cache();
        if (parent.parent.$DS.getCtrl("GRID_下达区划列表")) parent.parent.$DS.loadCtrl("GRID_下达区划列表");
    }
}

//汇总按钮点击事件
function btn_summary_click() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    var result = subWin.reportSum(grid_node_val.TASKID);
    if (result) {
        alert("汇总成功");
        if ($DS.getCtrl("IFRAME_采集表")) {
            var iframeInfo = $DS.getCtrl("IFRAME_采集表").info;
            var src = $(`#${iframeInfo.ds_id}_iframe`).attr("src");
            $(`#${iframeInfo.ds_id}_iframe`).attr("src", "");
            setTimeout(function () {
                $(`#${iframeInfo.ds_id}_iframe`).attr("src", src);
            }, 50)
        }

    } else {
        alert("汇总失败");
        return;
    }
}

//关闭点击事件
function btn_close_click() {
    window.close();
}

//全屏按钮点击事件
function btn_cesg_click() {
    var topWin = $DS.util.getTopWin("window");
    //topWin.$DS.putPms("isCesg", true);
    // topWin.$DS.showPage("freeFromView.jsp?PAGEID=35D4BFD068404DEDAA1BE8AF5370F212&PAGETITLE=【5-4-1】2021年全省用于农林水方向资金预算投入和支出情况统计表&APPID=BMP", "", "100%", "100%")
    var TASKID = $DS.getPms("TASKID");
    var op = $DS.getPms("op");
    var URL = parent.$tabs.getTabsInfo("TABS_填报采集表",parent.$DS.getCtrl("TABS_填报采集表").info.ds_tabs_editableTabsValue-1).content;
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    window.open(`${basePath}${URL}&TASKID=${TASKID}&op=${op}&$zoom=true&notShow=true`);

}

//全屏按钮加载完成事件
function btn_cesg_complete(obj) {
    debugger
    if ($DS.getPms("URL_notShow")) {
        obj.ds_show = false;
    } else {
        obj.ds_show = true;
    }

}

//关闭按钮加载完成事件
function btn_close_complete(obj) {
    if ($DS.getPms("URL_notShow")) {
        obj.ds_show = true;
    } else {
        obj.ds_show = false;
    }
}

//保存加载完成事件
function btn_save_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var TASKSTATUS = grid_node_val.TASKSTATUS;
    if (TASKSTATUS == "21" || (TASKSTATUS == "20" && grid_node_val.ADMDIV != user_upadmdiv)) {
        obj.ds_show = true;
    } else {
        obj.ds_show = false;
    }
}

//汇总按钮加载完成事件
function btn_summary_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var endFlag = "";
    var taskStatus = "";
    var taskadmdiv = "";
    var ismast = ""
    if (grid_node_val) {
        ismast = grid_node_val.ISMAST || "";
        endFlag = grid_node_val.ENDFLAG || "";
        taskStatus = grid_node_val.TASKSTATUS || "";
        taskadmdiv = grid_node_val.TASKADMDIV || "";
    }
    obj.ds_show = false;
    if (myParent == "isSummary") {
        if (ismast == "0" && endFlag == "0" && (taskStatus == "20" || taskStatus == "11") && taskadmdiv == user_upadmdiv) {
            obj.ds_show = true;
        }
    }
}

//校验按钮加载完成事件
function btn_check_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var endFlag = "";
    var taskStatus = "";
    var taskadmdiv = "";
    var ismast = "";
    var superadmdiv = "";
    if (grid_node_val) {
        ismast = grid_node_val.ISMAST || "";
        endFlag = grid_node_val.ENDFLAG || "";
        taskStatus = grid_node_val.TASKSTATUS || "";
        taskadmdiv = grid_node_val.TASKADMDIV || "";
        superAdmdiv = grid_node_val.SUPERADMDIV || "";
    }
    obj.ds_show = false;
    if (myParent == "isSummary") {
        //不是主任务，不是顶级区划，taskstatus 20 开始汇总 21 开始填报  11 已退回
        //  if (ismast == "0" && superadmdiv != '#' && (taskStatus == "20" || (taskStatus == "21" && grid_node_val.TASKADMDIV == user_upadmdiv) || (taskStatus == "11" && grid_node_val.TASKADMDIV == user_upadmdiv))) {
        //先不做控制，校验按钮一直放开
        if (ismast == "0" ) {

            obj.ds_show = true;
        }
    } else if (myParent == "isFill") {
        if (taskStatus == "20" || taskStatus == "21" || taskStatus == "11") {
            obj.ds_show = true;
        }
    }
}