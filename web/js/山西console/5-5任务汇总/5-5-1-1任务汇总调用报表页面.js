/**
 * 页面加载完成修改报表的src
 * @TYPE=REPORT&xxx=xxx
 */
function changeIframeUrl() {
    var iframe=$DS.getCtrl("IFRAME_报表");
    if($DS.getPms("URL_@TYPE")=="REPORT"){
        var url=window.location.href;
        var pms=url.split("@TYPE=REPORT")[1]
        var basePath = $DS.util.getProjectName(VUECFG.appId);
        if(pms){
            iframe.info.ds_iframe_src_input=`${basePath}/report/reportdesigner/lookreport/reportView.jsp?1=1${pms}`;
        }
    }
}
function init() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var task_collect_city = topWin.$DS.getPms("task_collect_city") ? $DS.util.clone(topWin.$DS.getPms("task_collect_city")) : "";
    if (task_collect_city&&task_collect_city.GUID) {
        $DS.putPms("ADMDIV", task_collect_city.GUID);
        topWin.$DS.putPms("ADMDIV", task_collect_city.GUID);
    }
}
init();
//关闭点击事件
function btn_close_click() {
    window.close();
}

//全屏按钮点击事件
//全屏按钮点击事件
function btn_cesg_click() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var TASKADMDIV = $DS.getPms("ADMDIV");
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    window.open(`${basePath}/report/reportdesigner/lookreport/reportView.jsp?reportid=32DA91C82FC2458096D9C25CAB2E1A30&$zoom=true&admdiv=${TASKADMDIV}`);

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
