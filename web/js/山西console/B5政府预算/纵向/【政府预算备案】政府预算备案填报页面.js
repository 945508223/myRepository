var moniterObj = {}
var myParent = parent.parent.$DS.getPms("myParent");
var rptInfo = {};
const provinceArr = ["2"];//省
const municipalArr = ["3", "4"];//市
const countyArr = ["5", "51", "52", "6"];//县
//全局变量监听事件
Object.defineProperty(moniterObj, 'data', {
    get: function () {

    },
    set: function (newVal) {
        debugger;
        //btn_reAudit_complete();
        btn_loadOtherData_complete();
        btn_check_complete();
        btn_summary_complete();
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
    $DS.putPms("readOnly", "true");
    if (myParent == "isSummary" && (taskStatus == "20" || taskStatus == "112" || taskStatus == "113") && taskadmdiv == user_upadmdiv) {
        $DS.putPms("readOnly", "false");
    } else if (myParent == "isFill") {
        if (taskStatus == "20" || taskStatus == "21" || taskStatus == "112" || taskStatus == "113" || taskStatus == "115")
            $DS.putPms("readOnly", "false");
    }
    let MOF_DIV_CODE = grid_node_val.TASKADMDIVCODE || "";
    var taskLevel = grid_node_val.BUDGETLEVEL || "";
    if (MOF_DIV_CODE) {
        if (provinceArr.indexOf(taskLevel) != -1)//省
            MOF_DIV_CODE = MOF_DIV_CODE.substring(0, 2);
        else if (municipalArr.indexOf(taskLevel) != -1)//市
            MOF_DIV_CODE = MOF_DIV_CODE.substring(0, 4);
        else if (countyArr.indexOf(taskLevel) != -1)//县
            MOF_DIV_CODE = MOF_DIV_CODE.substring(0, 6);
        $DS.putPms("MOF_DIV_CODE", MOF_DIV_CODE);
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
    if (grid_node_val.TASKADMDIVSTRCODE) {
        $DS.putPms("TASKADMDIVSTRCODE", grid_node_val.TASKADMDIVSTRCODE);
    }
    if (grid_node_val.SUPERTASKID)
        $DS.putPms("SUPERTASKID", grid_node_val.SUPERTASKID);
    if (grid_node_val.BUDGETLEVEL)
        $DS.putPms("BUDGETLEVEL", grid_node_val.BUDGETLEVEL);
    if (myParent)
        $DS.putPms("myParent", myParent);

    $DS.putPms("ENDFLAG", grid_node_val.ENDFLAG);
    //设置code 过滤表6-1审核数据
    setCodeByTaskAdmdivCode(grid_node_val);
}


//根据选择的任务 截取code
function setCodeByTaskAdmdivCode(row) {
    debugger
    let code, len;
    if (row.BUDGETLEVEL == '2') {
        code = row.TASKADMDIVCODE.substring(0, 2);
        len = 2;
    }
    //市级非末级
    else if ((row.BUDGETLEVEL == '3' || row.BUDGETLEVEL == '4') && row.ENDFLAG == '0') {
        code = row.TASKADMDIVCODE.substring(0, 4);
        len = 4;
    } else {
        code = row.TASKADMDIVCODE;
        len = 12;
    }
    $DS.putPms('SHOWCODE', code);
    $DS.putPms('SUBLEN', len);
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
    var Path = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(Path + "/sysconfig/frame/clearCache");
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
    //$DS.showPage("freeFromView.jsp?PAGEID=30E18760AA10423E88B17A94BF7DFFF9&PAGETITLE=【B5-4-1-1-1-2】汇总范围选择&APPID=BMP", "汇总范围选择", "80%", "80%");
    let loading_ = new Loading();
    loading_.init({
        target: document.body
    });
    loading_.start();
    setTimeout(function () {
        try {
            var gridInfo = parent.parent.$DS.getCtrl("GRID_下达区划列表").info;
            var arrayVal = gridInfo.ds_grid[0].children || gridInfo.ds_grid[1].children;
            var str = new Array();
            for (let i = 0; i < arrayVal.length; i++) {
                str.push(`'${arrayVal[i]["TASKID"]}'`);
            }
            summaryArray(str.join(","));
            $DS.util.close();
        } catch (e) {
            console.error(e);
        } finally {
            loading_.stop();
        }
    }, 500);
}

//汇总按钮点击事件(被调用)
function btn_summary_click() {
    debugger
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
            $DS.putPms('creatSnap', true);
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
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    var result = subWin.reportSum(grid_node_val.TASKID, str);
    if (result) {
        alert("汇总成功");
        if ($DS.getCtrl("IFRAME_采集表")) {
            var iframeInfo = $DS.getCtrl("IFRAME_采集表").info;
            var src = $(`#${iframeInfo.ds_id}_iframe`).attr("src");
            $(`#${iframeInfo.ds_id}_iframe`).attr("src", "");
            $DS.putPms('creatSnap', true);
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
    var iframeInfo = $DS.getCtrl("IFRAME_采集表").info;
    var URL = $(`#${iframeInfo.ds_id}_iframe`).attr("src");
    window.open(`${URL}&notShow=true`);
}

/**
 * 导入点击事件
 */
function btn_import_click() {

    $DS.util.confirm(window.vm, "注意:请使用导出的模板!", function () {
        debugger
        try {
            let win = $iframe.getSubWindow("IFRAME_采集表");
            win.speardUtil.importDataByExcel = function (json) {
                debugger
                //todo 渲染
                win.spread.suspendPaint();
                $("body").append("<div id='importSS' class='y-hide'></div>");
                var importSp = new win.GC.Spread.Sheets.Workbook($('#importSS')[0], {sheetCount: 1});
                importSp.fromJSON(json);
                let cm = win.spread.commandManager();
                for (let i = 0; i < win.spread.getSheetCount(); i++) {
                    let importSh = importSp.getSheet(i);
                    let sheet = win.spread.getSheet(i);
                    //sheet 不存在或sheet名对应不上跳过
                    if (!importSh || (importSh.Cj != sheet.Cj)) {
                        continue;
                    }
                    let delHideCol = win.speardUtil.getColHideByCondition(i, true);
                    let delHideRow = win.speardUtil.getRowHideByCondition(i, true);
                    //存在删除列 导入获取值时需修改列坐标
                    let delColArr = delHideCol.delMap && Object.keys(delHideCol.delMap).length > 0 ? Object.keys(delHideCol.delMap) : "";
                    ///存在删除行 导入获取值时需修改行坐标
                    let delRowArr = delHideRow.delMap && Object.keys(delHideRow.delMap).length > 0 ? Object.keys(delHideRow.delMap) : "";
                    // 从tag坐标集合中获取单元格, 如果该单元格可编辑则使用坐标取导入的表格中对应的数据
                    outer:for (let position of win.tags_position[0]) {

                        //对删除的行或列跳过
                        if ((delColArr && delColArr.indexOf(position.col) !== -1) || (delRowArr && delRowArr.indexOf(position.row) !== -1)) {
                            continue;
                        }
                        let isLocked = sheet.getRange(position.row, position.col, 1, 1, win.GC.Spread.Sheets.SheetArea.viewport).locked();
                        if (!isLocked) {
                            let importAxisCol = position.col;
                            let importAxisRow = position.row;
                            if (delColArr) {
                                let cnt = delColArr.filter(delcol => delcol < position.col);
                                importAxisCol = parseInt(position.col - cnt.length);
                            }
                            if (delRowArr) {
                                let cnt = delRowArr.filter(delrow => delrow < position.row);
                                importAxisRow = parseInt(position.row - cnt.length);
                            }

                            let newVal = importSh.getValue(importAxisRow, importAxisCol);
                            //如果单元格只能输入数字
                            let tag = win.speardUtil.getTagByIndex(sheet, position.row, position.col);
                            if ((tag.numberType == "float" || tag.numberType == "number") && !win.speardUtil.isNumber(newVal)) {
                                continue;
                            }

                            let oldVal = sheet.getValue(position.row, position.col);
                            newVal = newVal ?? '';
                            oldVal = oldVal ?? '';
                            if (newVal != oldVal) {
                                //sheet.setValue(position.row, position.col, newVal);
                                let row = position.row;
                                let col = position.col;

                                cm.execute({
                                    cmd: "editCell",
                                    row: row,
                                    col: col,
                                    newValue: newVal,
                                    sheetName: sheet.Cj
                                });
                                /* let row = position.row;
                                 let col = position.col;
                                 let tag = win.speardUtil.getTagByIndex(sheet, row, col);
                                  //保存 触发值变更事件
                                  if (win.pageargs && win.pageargs[i] && win.pageargs[i].valueChanged) win.speardUtil.eval(win.pageargs[i].valueChanged, {
                                      sheet,
                                      row,
                                      col,
                                      tag
                                  });*/
                            }
                        }
                    }
                }

                win.$("#importSS").remove();
                delete window.top.importReport_importCfg;
                win.$("#importExcel").val("");
                window.top.IMPORTEXCESTATUS = {STATUS: "END", RESULT: true};
                win.spread.resumePaint();
            }
        } catch (e) {
            win.spread.resumePaint();
        }


        $DS.util.importReportByExcel("IFRAME_采集表", {importData: true});
    }, "已取消导入")
}

//==================================================加载事件==========================================================================
//提取数据日志加载完成事件
function lable_TQSJRZ_complete(obj) {
    obj.ds_show = false;
    //if (rptInfo["XSTQSJ"] == "1" || rptInfo["XSTQSJ"].toString().toLowerCase() == "true")
    //   obj.ds_show = true;
    //提取数据按钮显示,提取数据日志才显示
    let btnOtherisShow = $DS.getCtrl("btn_loadOtherData").info.ds_show;
    obj.ds_show = btnOtherisShow;
}

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
    let userCfgShowBtn = $DS.getPms("URL_showLoadOther");
    //var subWin = $iframe.getSubWindow("IFRAME_采集表");
    if (userCfgShowBtn && myParent == "isFill" && rptInfo["EXTRACTSECU"] && (rptInfo["XSTQSJ"] == "1" || rptInfo["XSTQSJ"].toString().toLowerCase() == "true") && (taskStatus == "20" || taskStatus == "21" || taskStatus == "112" || taskStatus == "113" || taskStatus == "115"))
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
        if (ismast == "0" && endFlag == "0" && taskadmdiv == user_upadmdiv) {
            obj.ds_show = true;
        }
    } else if (myParent == "isFill") {
        if ((taskStatus == "20" || taskStatus == "21" || taskStatus == "112" || taskStatus == "113" || taskStatus == "115") /*&& subWin.checkReport*/) {
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
    let showSumBtn = $DS.getPms("URL_showSumBtn");
    var subWin = $iframe.getSubWindow("IFRAME_采集表");
    obj.ds_show = false;
    if (myParent == "isSummary") {
        if (showSumBtn && subWin.reportSum && ismast == "0" && endFlag == "0" && (taskStatus == "20" || taskStatus == "112" || taskStatus == "113" || taskStatus == "115") && taskadmdiv == user_upadmdiv) {
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
        allHtml += `&nbsp;&nbsp;<span style="line-height:1.5rem;color: #3a8ee6">最新更新时间:${$DS.util.timeFormate(new Date(result.result[0]["TIMEY"]), "yyyy-MM-dd HH:mm:ss")}</span>`;
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
    $DS.loadingFun("doExport_", cfg)

}

//执行导出
function doExport_(cfg) {
    if (myParent == 'isSummary' && cfg.exportSnap == true) {
        $DS.util.exportReportExcel("IFRAME_采集表", {
            backColor: cfg.color == "1" ? true : false,
            changeUnit: cfg.unit,
            exportSnap: cfg.exportSnap
        })
    } else {
        doExportForDelSnap(cfg)
    }
    $DS.delPms("showUnit")
}


//导出单张不携带快照的表
function doExportForDelSnap(cfg) {
    let iframeInfo = $DS.getCtrl('IFRAME_采集表').info;
    let src = $('#' + iframeInfo.ds_id + '_iframe').attr('src');
    $("body").append("<iframe id='exportForSnap' class='y-hide'></iframe>");
    $('#exportForSnap').attr('src', src);
    window.top.exportSingleForSnap = {
        backColor: cfg.color == "1" ? true : false,
        changeUnit: cfg.unit,
        exportSnap: cfg.exportSnap
    };
    let timeKey = setInterval(function () {
        try {
            if (!window.top.exportSingleForSnap) {
                clearInterval(timeKey);
                setTimeout(function () {
                    $('#exportForSnap').remove();
                    delete window.top.exportSingleForSnap;
                    console.log('导出完毕')
                }, 5000)
            }
        } catch (e) {
            clearInterval(timeKey);
            delete window.top.exportSingleForSnap
        }
    })
}


//获得报表属性
function getRptInfo() {
    let sql = "";
    let result;
    let reportid = $DS.getPms("reportid");
    // sql = `select IS_SHOWFORMULA,IS_SHOWEXTRACTDATA from RPT_T_REPORTTEMPLET where GUID = '${reportid}'`;
    // result = $DS.exeSql(sql);
    sql = `select IS_SHOWFORMULA,IS_SHOWEXTRACTDATA,EXTRACTSECU from RPT_T_REPORTTEMPLET where GUID = '${reportid}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        if (!result.result || !result.result[0]) {
            rptInfo["XSGS"] = "";
            rptInfo["XSTQSJ"] = "";
            rptInfo["EXTRACTSECU"] = "";
        } else {
            rptInfo["XSGS"] = result.result[0]["IS_SHOWFORMULA"] ? result.result[0]["IS_SHOWFORMULA"] : "";
            rptInfo["XSTQSJ"] = result.result[0]["IS_SHOWEXTRACTDATA"] ? result.result[0]["IS_SHOWEXTRACTDATA"] : "";
            //---------------------------------------------------------------------
            rptInfo["EXTRACTSECU"] = !result.result[0]["EXTRACTSECU"] ? true : eval($DS.util.replace(result.result[0]["EXTRACTSECU"]));
            //------------------------------------------------------------------
        }
    }
    if (rptInfo["XSGS"] == "1" || rptInfo["XSGS"].toString().toLowerCase() == "true")
        $DS.putPms("XSGS", "true");
}

getRptInfo();