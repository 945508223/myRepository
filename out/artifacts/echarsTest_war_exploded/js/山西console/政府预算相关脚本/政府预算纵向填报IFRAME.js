var moniterObj = {}
var myParent = parent.parent.$DS.getPms("myParent");
var rptInfo = {};

//全局变量监听事件
Object.defineProperty(moniterObj, 'data', {
    get: function () {

    },
    set: function (newVal) {
        debugger;
        btn_reAudit_complete();
        btn_loadOtherData_complete();
        btn_check_complete();
        btn_summary_complete();
        if (newVal.substring(0, 4) == "bas6")
            $DS.getCtrl("BUTTON_民生支出").info.ds_show = true;
        else
            $DS.getCtrl("BUTTON_民生支出").info.ds_show = false;
    }
})


function init() {
    debugger
    var thisWin = window;
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    if (grid_node_val) {
        $DS.putPms("TASKID", grid_node_val.TASKID);
        topWin.$DS.putPms("TASKID", grid_node_val.TASKID);
        $DS.putPms("childrenTaskId", grid_node_val.TASKADMDIV);
        $DS.putPms("TASKADMDIV", grid_node_val.ADMDIV);
        $DS.putPms("TASKDIVCODE", grid_node_val.ADMDIVCODE);
    }

    var who = topWin.$DS.getPms("op");
    $DS.putPms("op", who == "fill" ? "fill" : "sum");

    if ($DS.getPms("URL_op")) $DS.putPms("op", $DS.getPms("URL_op"));

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
    if (myParent == "isSummary") {
        //if (ismast == "0" && (taskStatus == "20" || taskStatus == "112") && taskadmdiv == user_upadmdiv) {
        $DS.putPms("readOnly", "true");
        //}
    } else if (myParent == "isFill") {
        if (taskStatus == "20" || taskStatus == "21" || taskStatus == "112" || taskStatus == "113") {

        } else
            $DS.putPms("readOnly", "true");
    }

    let showH = parent.parent.$DS.getPms("showH");
    if (showH)
        $DS.putPms("showH", showH);
    if ($DS.getPms("URL_TASKID")) $DS.putPms("TASKID", $DS.getPms("URL_TASKID"));
    if ($DS.getPms("URL_reportIdY")) $DS.putPms("reportid", $DS.getPms("URL_reportIdY"));
    if (grid_node_val.TASKADMDIVCODE) {
        $DS.putPms("TASKADMDIVCODE", grid_node_val.TASKADMDIVCODE);
        topWin.$DS.putPms("TASKADMDIVCODE", grid_node_val.TASKADMDIVCODE);
    }
    if (grid_node_val.TASKSTATUS)
        $DS.putPms("TASKSTATUS", grid_node_val.TASKSTATUS);
    if (grid_node_val.YEAR)
        $DS.putPms("TASKYEAR", grid_node_val.YEAR);
}


//顶层为任务汇总
function isShowBtn_topHuiZong() {
    var topWin = $DS.util.getTopWin("window");
    let pms = topWin.$DS.getPms("allBtn_notShow");
    if (pms && pms == "true") {
        let btnObj = {
            showBtn: ["btn_loadOtherData", "BUTTON_校验"],
            notShowBtn: ["BUTTON_汇总"]
        };
        for (let key in btnObj) {
            for (let btn of btnObj[key]) {
                if ($DS.getCtrl(btn)) {
                    let btnInfo = $DS.getCtrl(btn).info;
                    btnInfo.ds_show = key == "showBtn" ? true : false;
                    btnInfo.ds_load_success = "";
                }
            }
        }
    }
}

debugger
isShowBtn_topHuiZong();

init();

//其他民生支出项目明细按钮点击事件
function btn_expenditure_click() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val");
    $DS.showPage(`freeFromView.jsp?PAGEID=D73FD104FB664E24BB47816E2AF43999&PAGETITLE=【A5-7-1】其他基本民生支出&APPID=BMP&admdiv=${grid_node_val.TASKADMDIVCODE}`, "其他基本民生支出", "80%", "80%", "", "", topWin);
}

//校验按钮点击事件
function btn_check_click() {
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    var result = subWin.checkReport();
    if (result) {
        alert("校验通过");
        if (parent.clear_Cache) parent.clear_Cache();
        if (parent.parent.$DS.getCtrl("GRID_下达区划列表")) parent.parent.$DS.loadCtrl("GRID_下达区划列表");
    }
}

//加载第三方数据
function btn_loadOtherData_click() {
    $DS.util.confirm(vm, "是否确认重新提取数据,提取数据将覆盖原数据！", function () {

        var subWin = $iframe.getSubWindow("IFRAME_采集表");
        if (!subWin.loadOtherData) {
            alert("提取数据失败!未找到方法");
        }
        var result = subWin.loadOtherData();
        if (result) {
            alert("提取数据成功！");
        }

    }, "已取消", "", "");
}

function btn_reAudit_click() {
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    if (!subWin.checkReport_YL) {
        alert("提取数据失败!未找到方法");
    }
    var result = subWin.checkReport_YL();
    if (result) {
        alert("提取数据成功！");
    }
}

//汇总按钮点击事件(新)
function btn_summary_clickNew() {
    $DS.showPage("freeFromView.jsp?PAGEID=92864BA98169462081E96F3EABB8E38B&PAGETITLE=【5-3-1-1-1-2】汇总范围选择&APPID=BMP", "汇总范围选择", "80%", "80%");
}

//汇总按钮点击事件(被调用)
function btn_summary_click() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    var result = subWin.reportSum(grid_node_val.TASKID);
    //todo 汇总成功添加快照
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

//根据选择的区划进行汇总
function summaryArray(str) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    var result = subWin.reportSumArray(grid_node_val.TASKID, str);
    //todo 汇总成功添加快照
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
    debugger
    var topWin = $DS.util.getTopWin("window");
    //topWin.$DS.putPms("isCesg", true);
    // topWin.$DS.showPage("freeFromView.jsp?PAGEID=35D4BFD068404DEDAA1BE8AF5370F212&PAGETITLE=【5-4-1】2021年全省用于农林水方向资金预算投入和支出情况统计表&APPID=BMP", "", "100%", "100%")
    var TASKID = $DS.getPms("TASKID");
    var op = $DS.getPms("op");
    var URL = parent.$tabs.getTabsInfo("TABS_填报采集表", parent.$DS.getCtrl("TABS_填报采集表").info.ds_tabs_editableTabsValue - 1).content;
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    window.open(`${basePath}${URL}&TASKID=${TASKID}&op=${op}&$zoom=true&notShow=true`);

}


//==================================================加载事件==========================================================================
//其他民生支出项目明细按钮加载完成事件
function btn_expenditure_complete() {
    $DS.getCtrl("BUTTON_民生支出").info.ds_show = true;
}

//iframe加载完成事件
function iframe_compelte(obj) {
    /*var stopV = setInterval(function () {
        if (!$("#" + obj.ds_id).find("iframe")[0].contentWindow) {

        } else {
            debugger
            clearInterval(stopV);
            btn_reAudit_complete();
            btn_loadOtherData_complete();
            btn_loadOtherData_complete();
        }
    }, 100)*/
}

//重新审核按钮加载成功事件
function btn_reAudit_complete() {
    var obj = $DS.getCtrl("BUTTON_重新审核").info;
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
    //var subWin = $iframe.getSubWindow("IFRAME_采集表");
    if (/*subWin.checkReport_YL &&*/ myParent == "isFill")
        obj.ds_show = true;
}

//提取数据加载完成事件
function btn_loadOtherData_complete() {
    var obj = $DS.getCtrl("btn_loadOtherData").info;
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

    //var subWin = $iframe.getSubWindow("IFRAME_采集表");
    if (/*subWin.loadOtherData &&*/(rptInfo["XSTQSJ"] == "1" || rptInfo["XSTQSJ"].toString().toLowerCase() == "true") && myParent == "isFill")
        obj.ds_show = true;
}

//校验按钮加载完成事件
function btn_check_complete() {
    var obj = $DS.getCtrl("BUTTON_校验").info;
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
    /*var subWin = $iframe.getSubWindow("IFRAME_采集表");*/
    obj.ds_show = false;
    if (myParent == "isSummary") {
        //if (ismast == "0" && superadmdiv != '#' && (taskStatus == "20" || (taskStatus == "21" && grid_node_val.TASKADMDIV == user_upadmdiv) || (taskStatus == "11" && grid_node_val.TASKADMDIV == user_upadmdiv)))
        if (ismast == "0"/* && subWin.checkReport*/) {
            obj.ds_show = true;
        }
    } else if (myParent == "isFill") {
        if ((taskStatus == "20" || taskStatus == "21" || taskStatus == "112" || taskStatus == "113") /*&& subWin.checkReport*/) {
            obj.ds_show = true;
        }
    }
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
function btn_summary_complete() {
    var obj = $DS.getCtrl("BUTTON_汇总").info;
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
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    obj.ds_show = false;
    if (myParent == "isSummary") {
        if (subWin.reportSum && ismast == "0" && endFlag == "0" && (taskStatus == "20" || taskStatus == "112" || taskStatus == "113") && taskadmdiv == user_upadmdiv) {
            obj.ds_show = true;
        }
    }
}

//时间标签加载完成事件
function label_time_complete(obj) {
    let allHtml = "";
    let tableName = "";
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    let taskId = $DS.getPms("TASKID");
    let superTaskId = grid_node_val["SUPERTASKID"];
    let rptId = $DS.getPms("URL_reportIdY");
    let sql = `select STORTABLENAME from RPT_T_REPORTTEMPLET where GUID = '${rptId}'`;
    let result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && result.result && result.result[0] && result.result[0]["STORTABLENAME"])
        tableName = result.result[0]["STORTABLENAME"].trim();
    else
        return;
    sql = `select max(UPDATE_TIME) as TIMEY from ${tableName} where TASKID = '${taskId}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && result.result && result.result[0] && result.result[0]["TIMEY"])
        allHtml += `&nbsp;&nbsp;<span style="line-height:1.5rem;color: #3a8ee6">最新更新时间:${$DS.util.timeFormate(new Date(strTimeForMT(result.result[0]["TIMEY"])), "yyyy-MM-dd HH:mm:ss")}</span>`;
    obj.ds_label = allHtml;
    obj.ds_expression = allHtml;
}

//--------------------------------------------------------方法区-------------------------------------------------------------------------
/**
 *格式化数据库字段
 */
function strTimeForMT(str) {
    const finalTime = str.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', '')
    return finalTime.toString();
}

//导出
function batch_export_buildData(cfg) {
    debugger
    $DS.util.exportReportExcel("IFRAME_采集表", {
        backColor: cfg.color == "1" ? true : false,
        changeUnit: cfg.unit == "1" ? true : false
    })

}

//获得报表属性
function getRptInfo() {
    let sql = "";
    let result;
    let reportid = $DS.getPms("reportid");
    // sql = `select IS_SHOWFORMULA,IS_SHOWEXTRACTDATA from RPT_T_REPORTTEMPLET where GUID = '${reportid}'`;
    // result = $DS.exeSql(sql);
    sql = `select IS_SHOWFORMULA,IS_SHOWEXTRACTDATA from RPT_T_REPORTTEMPLET where GUID = '${reportid}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        if (!result.result || !result.result[0]) {
            rptInfo["XSGS"] = "";
            rptInfo["XSTQSJ"] = "";
        } else {
            rptInfo["XSGS"] = result.result[0]["IS_SHOWFORMULA"] ? result.result[0]["IS_SHOWFORMULA"] : "";
            rptInfo["XSTQSJ"] = result.result[0]["IS_SHOWEXTRACTDATA"] ? result.result[0]["IS_SHOWEXTRACTDATA"] : "";
        }
    }
    if (rptInfo["XSGS"] == "1" || rptInfo["XSGS"].toString().toLowerCase() == "true")
        $DS.putPms("XSGS", "true");
}

getRptInfo();