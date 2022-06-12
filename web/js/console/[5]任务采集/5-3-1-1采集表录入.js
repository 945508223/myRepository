var topWin = $DS.util.getTopWin("window");
var myParent = parent.$DS.getPms("myParent");

//汇总按钮点击事件
function btn_summary_click() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var index = thisTabIndex();
    var subWin1 = $tabs.getSubWindow("TABS_填报采集表", index);
    if (subWin1 === subWin1.window) {
        try {
            var subWin = subWin1.$iframe.getSubWindow("IFRAME_采集表");
        } catch (e) {
            alert("请点击您要汇总的表页签");
        }

        var result = subWin.reportSum(grid_node_val.TASKID);
        if (result) {
            subWin1.$DS.loadCtrl("IFRAME_采集表")
        } else {
            alert("汇总失败");
            return;
        }
    } else {
        alert("请点击统计表页签");
    }


    /*   if (grid_node_val.children) {
           for (let i = 0; i < grid_node_val.children.length; i++) {
               if (grid_node_val.children[i]["TASKSTATUS"] != "22") {
                   alert("部分下级未上报,请确认");
                   return;
                   if (grid_node_val.children.children) {
                       for (let j = 0; j < grid_node_val.children.children.length; j++) {
                           if (grid_node_val.children.children[j]["TASKSTATUS"] != "22") {
                               alert("部分下级未上报,请确认");
                               return;
                           }
                       }
                   }
               }
           }
       }*/

    var result = sql_taskstatus_change("20");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    $DS.clearTableSCache("RURAL_TASK_DETAIL,RURAL_V_TASKDETAIL");
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    loadCtrl_btn();
}

//保存按钮点击事件
function btn_save_click() {
    var subWin1 = $tabs.getSubWindow("TABS_填报采集表", 1);
    if (subWin1 === subWin1.window) {
        var result = subWin1.page_save();
    } else {
        alert("请先点击填报信息页签");
    }
    //保存填报说明
    var index = $DS.getCtrl("TABS_填报采集表").info.ds_tabs_editableTabs.length;
    if (index) {
        var win = $tabs.getSubWindow("TABS_填报采集表", index);
        if (win === win.window && win.page_save) {
            var res = win.page_save();
        }
    }

}

function btn_success_clickNew() {
    alert("是否确认数据填报已完成，填报已完成将不可以修改数据", "btn_success_click");
}

//已完成按钮点击事件(被调用)
function btn_success_click() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var result = sql_taskstatus_change("5");
    if (result && !result.isError) {
        var sql = `update RURAL_TASK_INFO set taskstatus = '5' where GUID = '${grid_node_val.SUPERTASKID}'`;
        result = $DS.exeSql(sql);
        if (result && !result.isError) {
            alert("执行成功");
            $DS.clearTableSCache("RURAL_TASK_DETAIL,RURAL_V_TASKDETAIL");
            if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
            loadCtrl_btn();
        } else {
            alert("执行失败" + result.errMsg);
        }
    } else {
        alert("执行失败" + result.errMsg);
    }
}

//填报按钮点击事件
function btn_fill_click() {
    var result = sql_taskstatus_change("21");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    $DS.clearTableSCache("RURAL_TASK_DETAIL,RURAL_V_TASKDETAIL");
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    loadCtrl_btn();
}

function btn_submit_clickNew() {
    alert("是否确认进行数据上报，数据上报后将不可以修改！", "btn_submit_click");
}

//上报按钮点击事件(被调用)
function btn_submit_click() {
    var result = sql_taskstatus_change("22");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var udpatedVal = [{GUID: grid_node_val.TASKID, TASKUPDATE: $DS.util.timeFormate(new Date(), "yyyy-MM-dd hh:mm:ss")}]
    var data = {inserted: [], updated: udpatedVal, deleted: []}
    result = $DS.saveAllTableData("RURAL_TASK_DETAIL", "GUID", data, VUECFG.appId);
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }

    var subWin1 = $tabs.getSubWindow("TABS_填报采集表", 1);
    if (subWin1 === subWin1.window) {
        var result = subWin1.page_save("notShow");

    } else {
        alert("请先点击填报信息页签");
    }

    $DS.clearTableSCache("RURAL_TASK_DETAIL,RURAL_V_TASKDETAIL");
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    loadCtrl_btn();
}

//------------------------------------方法区-----------------------------------------------------------
//返回当前tabs页的激活页签index
function thisTabIndex() {
    var tabs = $DS.getCtrl("TABS_填报采集表");
    var index = tabs.info.ds_tabs_editableTabsValue;
    return index;
}

//通用修改方法
function sql_taskstatus_change(n) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var sql = `update RURAL_TASK_DETAIL set taskstatus = ${n} where GUID = '${grid_node_val.TASKID}'`;
    var result = $DS.exeSql(sql);
    if (result && !result.isError) {
        grid_node_val["TASKSTATUS"] = n;
        topWin.$DS.putPms("grid_node_val", grid_node_val);
    }
    $DS.clearTableSCache("RURAL_V_TASKDETAIL,RURAL_TASK_DETAIL");
    return result;
}

//刷新控件方法
function loadCtrl_btn() {
    var allBtn_name = ["BUTTON_汇总", "BUTTON_填报", "BUTTON_保存", "BUTTON_送审", "BUTTON_已完成", "TABS_填报采集表"];
    for (let i = 0; i < allBtn_name.length; i++) {
        if ($DS.getCtrl(allBtn_name[i])) $DS.loadCtrl(allBtn_name[i]);
    }
    var subWin = $tabs.getSubWindow("TABS_填报采集表", 1);
    if (subWin === subWin.window) {
        // if (subWin.$DS.getCtrl("BUTTON_保存")) subWin.$DS.loadCtrl("BUTTON_保存");
        subWin.init();
    }
    var subWin1 = $tabs.getSubWindow("TABS_填报采集表", 2);
    if (subWin1 === subWin1.window) {
        // if (subWin1.$DS.getCtrl("BUTTON_保存")) subWin1.$DS.loadCtrl("BUTTON_保存");
    }


}

//动态tabs页方法
function tabsUpdateData() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val");
    var tabs = $DS.getCtrl("TABS_填报采集表");
    var tabData = tabs.info.ds_tabs;
    var tabCfg = tabs.info.ds_tabs_editableTabs;
    var newData = [];
    if (grid_node_val) {
        var TASKTYPE = grid_node_val.TASKTYPE;
        var sql = `select * from RURAL_TASK_TYPEMODEL where typeid = '${TASKTYPE}'`;
        var data = $DS.selectBySql(VUECFG.appId, sql).result;

        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj.tabIndex = (i + 2).toString();
            obj.text = "";
            obj.name = i + 1;
            obj.iconClass = "el-icon-finished";
            obj.title = data[i].MODELNAME;
            obj.lazy = true;
            obj.content = $DS.util.replace("/freeForm/freeFromView.jsp?" +
                "PAGEID=" + data[i].MODELID + "&PAGETITLE=" + data[i].MODELNAME + "&APPID=" + VUECFG.appId + "&$zoom=true");

            newData.push(obj);
        }
    }
    var eternalVal = {};
    eternalVal.tabIndex = "1";
    eternalVal.text = "";
    eternalVal.title = "填报信息";
    eternalVal.name = "1";
    eternalVal.lazy = true;
    eternalVal.iconClass = "el-icon-info";
    eternalVal.content = $DS.util.replace("/freeForm/freeFromView.jsp?PAGEID=D55EDA246F7B47429182DC710B37C776&PAGETITLE=【5-3-1-1-1】填报信息&APPID=BMP&$zoom=true");
    newData.unshift(eternalVal);
    //插入5-3-1-1-2填报分析说明
    newData.push({
        tabIndex: newData.length + 1 + "",
        text: "分析说明",
        title: "分析说明",
        name: newData.length + 1 + "",
        lazy: true,
        content: $DS.util.replace("/freeForm/freeFromView.jsp?PAGEID=29AC5BF0A5264412BF069FF4521A7FDC&PAGETITLE=【5-3-1-1-2】填报分析说明&APPID=BMP")
    });

    tabs.info.ds_tabs_editableTabs = newData;
}

//=======================================================勿念==============================================================================


//汇总加载完成事件
function btn_summary_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var endFlag = "";
    var taskStatus = "";
    var taskadmdiv = "";
    if (grid_node_val) {
        endFlag = grid_node_val.ENDFLAG;
        taskStatus = grid_node_val.TASKSTATUS;
        taskadmdiv = grid_node_val.TASKADMDIV;
    }


    if (endFlag != "0" || taskStatus == "5" || taskStatus == "22" || taskadmdiv != user_upadmdiv || myParent == "isFill") {
        obj.ds_show = false;
    } else {
        obj.ds_show = true;
    }
}

//填报加载完成事件
function btn_fill_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_admdiv = $DS.getPms("USER_admdiv");
    var endFlag = "";
    var taskStatus = "";
    var taskadmdiv = "";
    if (grid_node_val) {
        endFlag = grid_node_val.ENDFLAG;
        taskStatus = grid_node_val.TASKSTATUS;
        taskadmdiv = grid_node_val.TASKADMDIV;
    }
    if ((endFlag == "1" && taskStatus == "1") && myParent == "isFill" && taskadmdiv == user_admdiv) {
        obj.ds_show = true;
    } else {
        obj.ds_show = false;
    }
}

//上报加载完成事件
function btn_submit_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var endFlag = "";
    var taskStatus = "";
    if (grid_node_val) {
        endFlag = grid_node_val.ENDFLAG;
        taskStatus = grid_node_val.TASKSTATUS;
    }
    if (endFlag == "0" && taskStatus == "1") {
        obj.ds_show = false;
    } else if (endFlag == "1" && taskStatus == "1") {
        obj.ds_show = false;
    } else if (taskStatus == "21"/* || (taskStatus == "20" && grid_node_val.ADMDIV != user_upadmdiv))*/ && myParent != "isSummary") {
        obj.ds_show = true;
    } else {
        obj.ds_show = false;
    }
}

//已完成按钮加载完成事件
function btn_success_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var endFlag = "";
    var taskStatus = "";
    if (grid_node_val) {
        endFlag = grid_node_val.ENDFLAG;
        taskStatus = grid_node_val.TASKSTATUS;
    }
    if (grid_node_val.ADMDIV == user_upadmdiv && taskStatus == "20") {
        obj.ds_show = true;
    } else {
        obj.ds_show = false;
    }
}

//保存按钮加载完成事件
function btn_save_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var endFlag = "";
    var taskStatus = "";
    if (grid_node_val) {
        endFlag = grid_node_val.ENDFLAG;
        taskStatus = grid_node_val.TASKSTATUS;
    }
    if (taskStatus == "1" || taskStatus == "22" || taskStatus == "20" || myParent == "isSummary") {
        obj.ds_show = false;
    } else {
        obj.ds_show = true;
    }

}