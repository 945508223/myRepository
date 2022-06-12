function getTopWinPms_init() {
    debugger
    // let topWin = $DS.util.getTopWin();
    let pms = window.top["KMBM"];
    $DS.putPms("KMBM", pms)

}

getTopWinPms_init()

//关闭点击事件
function btn_close_click() {
    window.close();
}

//全屏按钮点击事件
function btn_cesg_click() {
    var topWin = $DS.util.getTopWin("window");
    //topWin.$DS.putPms("isCesg", true);
    // topWin.$DS.showPage("freeFromView.jsp?PAGEID=35D4BFD068404DEDAA1BE8AF5370F212&PAGETITLE=【5-4-1】2021年全省用于农林水方向资金预算投入和支出情况统计表&APPID=BMP", "", "100%", "100%")
    var TASKID = $DS.getPms("THIS_TASKID");
    var op = $DS.getPms("op");
    var URL = parent.$tabs.getTabsInfo("TABS_报表", parent.$DS.getCtrl("TABS_报表").info.ds_tabs_editableTabsValue - 1).content;
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

//刷新
function btn_refresh() {
    var sqls = new Array();
    sqls.push("BEGIN DBMS_MVIEW.REFRESH (list => 'TASK_V_SB2022_T56',Method =>'COMPLETE',refresh_after_errors => True); end;");
    result = $DS.exeSqls(sqls.join(";"));
    if (result.isError) {
        alert("刷新失败！");
        return false;
    } else {
        $DS.clearTableSCache("TASK_V_SB2022_T56");
        window.location.reload();
        //alert("刷新操作成功！");
    }

}

function runReloadReportByTree() {
    debugger
    let tree = parent.$DS.getCtrl("TREE_三保科目").info;
    let treeData = parent.$tree.getCheckedNodes(tree.ds_id);
    let itemcodes = treeData.map(item => {
        return `'${item.ITEMCODE}'`
    });
    let itemcodesStr = itemcodes.join(",");

    let itemcodesStr_ = '';
    if(treeData&&treeData.length>0){
        for (let i = 1; i < itemcodesStr.length - 1; i++) {
            itemcodesStr_ += itemcodesStr[i];
        }
    }else {
        itemcodesStr_ = itemcodesStr;
    }
    $DS.putPms("KMBM", itemcodesStr_);
    let iframe = $DS.getCtrl("IFRAME_采集表").info;
    let src = iframe.ds_iframe_src_input;
    iframe.ds_iframe_src_input = "";
    setTimeout(function () {
        iframe.ds_iframe_src_input = src;
    })
}
