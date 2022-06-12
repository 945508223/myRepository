var topWin = $DS.util.getTopWin("window");
var myParent = parent.$DS.getPms("myParent");//isFill填报打开,isSummary汇总打开
var checkRptId = new Array();
$DS.putPms("myParent", myParent);
const provinceArr = ["2"];//省
const municipalArr = ["3", "4"];//市
const countyArr = ["5", "51", "52", "6"];//县

//初始化
function init() {
    /*debugger
    let sysYear = $DS.getPms("USER_CURRENTYEAR");
    let admdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
    if (admdivLevel == "3" || admdivLevel == "4")
        $DS.putPms("USER_ADMDIVLEVEL", "3");
    else if (admdivLevel == "5" || admdivLevel == "51" || admdivLevel == "52")
        $DS.putPms("USER_ADMDIVLEVEL", "4");*/
}

init();
init_rptListByRole("1A89130F109D4D0B859B3F9C2375FB88");

/**
 * 批量提取数据点击事件
 */
function batchEtlRpt() {
    debugger
    let tabCfg = $DS.util.clone($DS.getCtrl('TABS_填报采集表').info.ds_tabs_editableTabs);
    window.top['etlRptData'] = tabCfg.filter(item => {
        item.ID = item.tabIndex;
        item.NAME = item.title;
        return item
    });
    $DS.showPage(`${$DS.util.getProjectName(VUECFG.appId)}/freeForm/freeFromView.jsp?PAGEID=8AAB5C1C487B45E99300CD10F8C39A4B&PAGETITLE=【Z1-B-1】批量提取数据&APPID=BMP`, '选择批量提取数据的报表', '50%', '75%')
}

/**
 * 批量校验点击事件
 */
function batchRegRpt() {
    debugger
    let tabCfg = $DS.util.clone($DS.getCtrl('TABS_填报采集表').info.ds_tabs_editableTabs);
    window.top['regRptData'] = tabCfg.filter(item => {
        item.ID = item.tabIndex;
        item.NAME = item.title;
        return item
    });
    $DS.showPage(`${$DS.util.getProjectName(VUECFG.appId)}/freeForm/freeFromView.jsp?PAGEID=39CD2A4443B3406CA388B47A143684A5&PAGETITLE=【Z1-C-1】批量校验&APPID=BMP`, '选择批量校验的报表', '50%', '75%')
}

function isShowAllBtn() {
    let isShow = topWin.$DS.getPms("allBtn_notShow");
    if (isShow && isShow == "true") {
        let btnArr = [
            "BUTTON_驳回原因",
            "BUTTON_保存",
            "BUTTON_已完成",
            "BUTTON_填报",
            "BUTTON_审核通过",
            "BUTTON_汇总",
            "BUTTON_送审",
            "BUTTON_强制上报",
            "BUTTON_退回"
        ];
        for (let btn of btnArr) {
            let btnInfo = $DS.getCtrl(btn).info;
            btnInfo.ds_load_success = "";
            btnInfo.ds_show = false;
        }
    }
}

isShowAllBtn();

//查看批复按钮点击事件
function btn_seeReply_click() {
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("REPLY_TYPE", "readOnly");
    $DS.showPage("freeFromView.jsp?PAGEID=9695D40721C9443DA0E4A14836677110&PAGETITLE=【5-3-1-1-1-3】批复说明&APPID=BMP", "批复说明", "90%", "90%");
}

//批复按钮点击事件
function btn_reply_click() {
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("REPLY_TYPE", "write");
    $DS.showPage("freeFromView.jsp?PAGEID=9695D40721C9443DA0E4A14836677110&PAGETITLE=【5-3-1-1-1-3】批复说明&APPID=BMP", "批复说明", "90%", "90%");
}

//批复按钮点击事件(被调用)
function btn_reply_clickCall() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var result = sql_taskstatus_change("5");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    //判断现有表格的末级区划是否已经全部批复,如果全部批复,修改全省状态为已完成
    try {
        if (checkAppCompleted("5", grid_node_val.TASKID))
            fun_AllProStatusAndHistory_change("8");
    } catch (err) {
        console.log(err);
    }
    //清楚缓存
    clear_Cache();
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    alert("执行成功!");
    loadCtrl_btn();
    //批复发消息
    var res = sendUserMsgForPiFu();
    if (res.isError) {
        console.log(res.errMsg)
    }
}

//驳回说明按钮点击事件
function btn_viewDes_click() {
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("RETURN_REMARK_TYPE", "readOnly");
    //$DS.showPage("freeFromView.jsp?PAGEID=9504922F12B04387A76882A69361260A&PAGETITLE=【5-3-1-1-1-1】退回说明&APPID=BMP", "退回原因", "75%", "75%");
    $DS.showPage("freeFromView.jsp?PAGEID=9504922F12B04387A76882A69361260A&PAGETITLE=【A5-3-1-1-1-1】退回说明&APPID=BMP", "退回原因", "75%", "75%");
}

//开始汇总按钮点击事件
function btn_summary_click() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var result = sql_taskstatus_change("20");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    //清楚缓存
    clear_Cache();
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    loadCtrl_btn();
}

//保存按钮点击事件
function btn_save_click(notShow) {
    var subWin1 = $tabs.getSubWindow("TABS_填报采集表", 1);
    if (subWin1 === subWin1.window) {
        var result = subWin1.page_save("notShow");
        if (!result || result.isError) {
            alert("保存失败" + result.errMsg);
            return;
        }
    } else {
        alert("请先点击填报信息页签");
    }
    //保存填报说明
    var index = $DS.getCtrl("TABS_填报采集表").info.ds_tabs_editableTabs.length;
    if (index) {
        var win = $tabs.getSubWindow("TABS_填报采集表", index);
        if (win === win.window && win.page_save) {
            result = win.page_save("notShow");
            if (!result || result.isError) {
                alert("保存失败" + result.errMsg);
                return;
            }
        }
    }
    if (!notShow)
        $DS.util.alert("保存成功!");
    clear_Cache();
}

//审核通过按钮点击事件
function btn_complete_clickNew(obj) {
    var topWin = $DS.util.getTopWin("window");
    if (obj.ds_button == "全部通过") {
        if (!isAllSubmit("22", true)) {
            alert("操作失败，请检查所有下级单位是否已全部上报!");
            return;
        }
    }
    $DS.util.confirm(vm, "是否确认任务审核通过!", function () {
        btn_complete_click(obj);
    }, "已取消", "", "", topWin.vm);
}

function btn_complete_click(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var endFlag = grid_node_val.ENDFLAG || "";
    var result;
    var status_ = $DS.getPms("USER_ADMDIVLEVEL");
    var updatedVal = ""
    //如果是市级是43,省级是42
    if (municipalArr.indexOf(status_) != -1) updatedVal = "43";//市
    else if (provinceArr.indexOf(status_) != -1) updatedVal = "42";//省
    else if (countyArr.indexOf(status_) != -1) updatedVal = "45";//县
    if (obj.ds_button == "全部通过") {
        result = sql_taskstatus_change(updatedVal, true);
    } else if (obj.ds_button == "审核通过") {
        let taskStatus = getTaskStatusByTaskId(grid_node_val.TASKID);
        if (taskStatus != "22" && taskStatus != "223" && taskStatus != "225") {
            alert("该数据未上报!");
            return;
        }
        if (provinceArr.indexOf(status_) != -1) {//如果操作用户是省级
            //修改本节点的任务状态
            result = sql_taskstatus_change(updatedVal);
            //修改下级的任务状态
            result = sql_taskstatus_change(updatedVal, true);
        } else
            result = sql_taskstatus_change(updatedVal);
    }
    if (result && !result.isError) {
        alert("执行成功");


        //审核通过修改消息状态
        doMsgBySendADMDIV(grid_node_val.TASKADMDIV, "RPT_UP_" + grid_node_val.SUPERTASKID);
        //审核通过发送消息
        debugger
        var msg = `审核通过发送消息成功!`;
        var res = sendUserMsgForShengHe();
        if (res.isError) {
            console.log(res.errMsg)
        }
        console.log(msg)


        clear_Cache();
        if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
        loadCtrl_btn();
    } else {
        alert("执行失败" + result.errMsg);
    }
}

function btn_success_clickNew() {
    var topWin = $DS.util.getTopWin("window");
    //校验按钮逻辑
    var result = isAllSubmit("42");
    if (!result) {
        alert("操作失败，请检查所有下级单位是否已全部审核通过！");
        return;
    }
    $DS.util.confirm(vm, "是否确认操作数据填报已完成,操作已完成后数据填报任务将结束，填报任务结束！", function () {
        btn_success_click();
    }, "已取消", "", "", topWin.vm);
}

//已完成按钮点击事件(被调用)
function btn_success_click() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));

    result = fun_AllProStatusAndHistory_change("5");
    if (!result && result.isError) {
        alert("执行失败!" + result.errMsg);
        return
    }
    result = fun_dateField_change("TASKFINISHDATE");
    if (!result && result.isError) {
        alert("执行失败!" + result.errMsg);
        return
    }
    alert("执行成功!");
    clear_Cache();
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    loadCtrl_btn();
}

//填报按钮点击事件
function btn_fill_click() {
    var result = sql_taskstatus_change("21");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    result = fun_dateField_change("SUBDATE");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }

    clear_Cache();
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    loadCtrl_btn();
}

//强制上报点击事件
function btn_superSubmit_clickNew() {
    var topWin = $DS.util.getTopWin("window");
    $DS.util.confirm(vm, "是否确认进行强制上报,这将无视所有校验!", function () {
        btn_superSubmit_lick();
    }, "已取消", "", "", topWin.vm);
}

//强制上报按钮点击事件(被调用)
function btn_superSubmit_lick() {
    btn_submit_inCall("qiangzhi");
}

function btn_submit_clickNew() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var taskStatus = grid_node_val.TASKSTATUS || "";
    var userAdmdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
    if (myParent == "isSummary") {
        let status = "";
        //市
        if (municipalArr.indexOf(userAdmdivLevel) != -1) status = "43";
        else if (countyArr.indexOf(userAdmdivLevel) != -1) status = "45";
        if (!isAllSubmit(status, "", true)) {
            alert("请检查下级单位是否审核通过");
            return;
        }
    }
    $DS.util.confirm(vm, "是否确认进行数据上报，操作数据上报后，将不可以进行修改！", function () {
        btn_submit_click();
    }, "已取消", "", "", topWin.vm);
}

//上报按钮点击事件(被调用)
function btn_submit_click() {
    debugger
    var userLevel = $DS.getPms("USER_ADMDIVLEVEL");
    //执行保存
    btn_save_click("notShow");
    //校验是否填写了填表人手机号
    if (!checkIsSubUserTel()) {
        $DS.getCtrl("TABS_填报采集表").info.ds_tabs_editableTabsValue = "1";
        return;
    }
    //表是否校验通过
    // if (myParent == "isSummary" && countyArr.indexOf(userLevel) != -1) {

    //} else {
    if (!isNotCheck())
        return;
    // }
    btn_submit_inCall();
}

//上报按钮点击事件中内部调用的方法
function btn_submit_inCall(type) {
    var result;
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var endFlag = grid_node_val.ENDFLAG || "";
    var taskStatus = grid_node_val.TASKSTATUS || "";
    var status_ = $DS.getPms("USER_ADMDIVLEVEL");
    //汇总页面
    if (myParent == "isSummary") {
        //用户为市级
        if (municipalArr.indexOf(status_) != -1)
            result = sql_taskstatus_change("223", true, true);
        //用户为县级时
        else if (countyArr.indexOf(status_) != -1)
            result = sql_taskstatus_change("22", true, true);
    } else {
        //省
        if (provinceArr.indexOf(status_) != -1)
            result = sql_taskstatus_change("223");
        //市
        else if (municipalArr.indexOf(status_) != -1)
            result = sql_taskstatus_change("22");
        //县
        else {
            let userUpAdmdiv = $DS.getPms("USER_UPADMDIV");
            //查询上级区划是市还是县
            let admdivLevel = $DS.selectBySql(VUECFG.appId, `SELECT * FROM FW_T_ADMINDIV where guid = (select superguid from FW_T_ADMINDIV where guid = '${grid_node_val["TASKADMDIV"]}')`).result[0]["MOF_DIV_TYPE"];
            //侯马经济开发区直接上报到市
            if (grid_node_val.TASKADMDIVCODE == '141081701')
                result = sql_taskstatus_change("22");
            //如果上级区划是市,那上报给市
            else if (municipalArr.indexOf(admdivLevel) != -1)
                result = sql_taskstatus_change("22");
            //如果上级区划是县,上报给县
            else if (countyArr.indexOf(admdivLevel) != -1)
                result = sql_taskstatus_change("225");
        }
    }
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    result = fun_dateField_change("TASKUPDATE");
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    }
    try {
        //发送上报消息
        var msg = `上报成功!`;
        if (type != "qiangzhi") {
            var res = sendUserMsgForReport();
            if (res.isError) {
                console.log(res.errMsg)
            }
        }
        debugger
        //更改下发消息的状态
        var TASKADMDIV = grid_node_val.TASKADMDIV
        var SUPERTASKID = grid_node_val.SUPERTASKID
        var sql = `select * from SSO_T_USERMSG where BKEYVALUE = '${SUPERTASKID}' AND RECEIVEADMDIV = '${TASKADMDIV}' `
        var params = {
            dbSource: "portal",
            sql: sql,
        }
        var url = getProjectName(VUECFG.appId) + "/frame/selectBySql";
        var result = YCDCommon.Ajax.syncAjax(url, params);
        //根据消息分组 更改退回消息的状态
        doMsg("RPT_RETURN_" + grid_node_val.SUPERTASKID);  //上报 更新退回消息状态
        doMsg(result.result[0].MSGGROUP)       //上报 更新下达任务消息状态
        var sql = `select * FROM fw_t_admindiv where GUID = '${result.result[0].RECEIVEADMDIV}'`
        var params = {dbSource: "portal", sql: sql,}
        var url = getProjectName(VUECFG.appId) + "/frame/selectBySql";
        var res = YCDCommon.Ajax.syncAjax(url, params);
        if (res.result[0].ITEMNAME.indexOf('本级') != -1) {
            //是本级，更改 市本级和市级消息状态
            sql = `select * from SSO_T_USERMSG where BKEYVALUE = '${SUPERTASKID}' AND RECEIVEADMDIV = '${res.result[0].SUPERGUID}' `
            var params = {
                dbSource: "portal",
                sql: sql,
            }
            var url = getProjectName(VUECFG.appId) + "/frame/selectBySql";
            var result = YCDCommon.Ajax.syncAjax(url, params);
            doMsg(result.result[0].MSGGROUP)       //上报 更新下达任务消息状态   市级和市本级 消息 同时清掉
        }
    } catch (e) {
        console.log(e);
    } finally {
        alert(msg);
        clear_Cache();
        if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
        loadCtrl_btn();
    }
}


/**
 * 批复发消息
 * @returns {*}
 */
function sendUserMsgForPiFu() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var SUPERTASKID = grid_node_val.SUPERTASKID;
    var REPLYDESC = $DS.getPms("REPLYDESC");
    var result = $DS.massage.sendUserMsg(VUECFG.appId, {
        msgTitle: `[已批复]` + grid_node_val.TASKNAME,//消息标题>任务名称
        msgType: "TMSG",//消息类型
        msgContent: REPLYDESC,//消息内容
        //msgStatus: "0",//消息状态
        msgGroup: SUPERTASKID,//消息分组
        appId: VUECFG.appId,//appId
        receiveMenuId: "006006001",//消息接收菜单 数据编制
        receiveADMDIV: grid_node_val.TASKADMDIV,//消息接收区划
        receiveUserType: "1",//接收用户类型
        //url: "27A1E9FC727C4DCDA0D99E134C217613,FB16EE42DFF1424EA06D796E766E8931",//三保预算审核,数据编制
        bKeyValue: grid_node_val.TASKID,//业务ID
        bType: "BMP_GOV",//消息业务类型
        //sendUserId: $DS.getPms("USER_MID"),//消息发送人
        //sendADMDIV: $DS.getPms("USER_agency"),//消息发送人所在单位
        //saveType: "add"//保存类型
    }, `发送批复通知到【${grid_node_val.TASKADMDIVNAME}】失败!`)
    return result;
}

/**
 * 上报发消息
 * @return {*}
 */
function sendUserMsgForReport() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var RPT_UP_SUPERTASKID = grid_node_val ? grid_node_val.SUPERTASKID : "";

    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var upRes = getUpDiv()
    if (upRes.isError) {
        return upRes;
    } else {
        upRes = upRes.result;
    }
    //判断是否是 市级 上报 省级  若是，区划向上找 两级
    if ($DS.getPms("USER_CURRENTYEAR") == '2021')
        upRes = $DS.getPms("USER_admdivlevel").indexOf("4") == 0 ? getSecondAdmdiv(upRes[0].SUPERGUID) : upRes
    var menuId = ($DS.getPms("USER_admdivlevel").indexOf("4") != 0) ? "006003003" : "006003003";//县5全市数据审核 市4全省数据审核
    var menuGuid = ($DS.getPms("USER_admdivlevel").indexOf("4") != 0) ? "F28DE3A8041E476696F9C4F60DEA300D" : "F28DE3A8041E476696F9C4F60DEA300D";//县5全市数据审核 市4全省数据审核
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    debugger
    var RPT_UP_SUPERTASKID = grid_node_val.SUPERTASKID;
    RPT_UP_SUPERTASKID = "RPT_UP_" + RPT_UP_SUPERTASKID
    var result = $DS.massage.sendUserMsg(VUECFG.appId, {
        //msgTitle: `[已上报]` + grid_node_val.TASKNAME + `：上报单位:【${$DS.getPms("USER_agencyName")}】`,//消息标题>任务名称
        msgTitle: `[${$DS.getPms("USER_agencyName")}已上报]` + grid_node_val.TASKNAME,     //消息标题  [郊区已上报]任务名称
        //msgTitle:`[${$DS.getPms("USER_agencyName")}已上报]${grid_node_val.TASKNAME}`,     //消息标题  [郊区已上报]任务名称
        msgType: "BMSG",//消息类型
        msgContent: grid_node_val.REMARK,//消息内容
        //msgStatus: "0",//消息状态
        //msgGroup: $DS.util.getGuid(),//消息分组
        msgGroup: RPT_UP_SUPERTASKID,
        appId: VUECFG.appId,//appId
        receiveMenuId: menuId,//消息接收菜单 县5全市数据审核 市4全省数据审核
        receiveADMDIV: upRes[0].SUPERGUID,//消息接收区划
        receiveUserType: "1",//接收用户类型
        url: "F4C9F8FFC8A141798DA4EF4B3342DC10," + menuGuid,//三保预算审核,数据编制
        bKeyValue: grid_node_val.TASKID,//业务ID
        bType: "BMP_GOV",//消息业务类型
        //sendUserId: $DS.getPms("USER_MID"),//消息发送人
        //sendADMDIV: $DS.getPms("USER_agency"),//消息发送人所在单位
        //saveType: "add"//保存类型,

    }, `发送待办通知到上级单位失败!`)
    return result;
}

/**
 * 退回发消息
 * @return {*}
 */
function sendUserMsgForTuiHui() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var SUPERTASKID = "RPT_RETURN_" + grid_node_val.SUPERTASKID;
    var textareaVal = $DS.getPms("textareaVal");
    var result = $DS.massage.sendUserMsg(VUECFG.appId, {
        msgTitle: `[已退回]` + grid_node_val.TASKNAME + `：请及时处理!`,//消息标题>任务名称
        msgType: "BMSG",//消息类型
        msgContent: grid_node_val.REMARK,//消息内容
        //msgStatus: "0",//消息状态
        msgGroup: SUPERTASKID,//消息分组
        appId: VUECFG.appId,//appId
        receiveMenuId: "006006001",//消息接收菜单 预算汇总上报
        receiveADMDIV: grid_node_val.TASKADMDIV,//消息接收区划
        receiveUserType: "1",//接收用户类型
        url: "F4C9F8FFC8A141798DA4EF4B3342DC10,F28DE3A8041E428896F9C4F60DEA300D",//全省预算,预算汇总上报
        bKeyValue: grid_node_val.TASKID,//业务ID
        bType: "BMP_GOV",//消息业务类型
        //sendUserId: $DS.getPms("USER_MID"),//消息发送人
        //sendADMDIV: $DS.getPms("USER_agency"),//消息发送人所在单位
        //saveType: "add"//保存类型
    }, `发送退回通知到【${grid_node_val.TASKADMDIVNAME}】失败!`)
    return result;
}

//审核通过发送消息
function sendUserMsgForShengHe() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var SUPERTASKID = "RPT_" + grid_node_val.SUPERTASKID;
    var result = $DS.massage.sendUserMsg(VUECFG.appId, {
        msgTitle: `[已审核通过]` + grid_node_val.TASKNAME,//消息标题>任务名称
        msgType: "TMSG",//消息类型
        msgContent: grid_node_val.TASKNAME + `已通过审核`,//消息内容
        //msgStatus: "0",//消息状态
        //msgGroup: SUPERTASKID,//消息分组
        appId: VUECFG.appId,//appId
        receiveMenuId: "005005001",//消息接收菜单 数据编制
        receiveADMDIV: grid_node_val.TASKADMDIV,//消息接收区划
        receiveUserType: "1",//接收用户类型
        //url: "A37D367E6DBD4272A3B6FC0FFAF7B181,BF7069E5889F4E07A7D7972465E1F50F",//三保预算审核,数据编制
        bKeyValue: grid_node_val.TASKID,//业务ID
        bType: "BMP_GOV",//消息业务类型
        //sendUserId: $DS.getPms("USER_MID"),//消息发送人
        //sendADMDIV: $DS.getPms("USER_agency"),//消息发送人所在单位
        //saveType: "add"//保存类型
    }, `发送退回通知到【${grid_node_val.TASKADMDIVNAME}】失败!`)
    return result;
}


//市上报省 找两级admdiv
function getSecondAdmdiv(admdiv) {
    debugger
    // if($DS.getPms("USER_CURRENTYEAR") == '2022'){
    //     var sql = `select superguid from SSO_V_PUBADMDIV a  where  a.GUID ='${$DS.getPms("USER_UPADMDIV")}'`
    //     var res = $DS.selectBySql(VUECFG.appId, sql, "发送通知失败!查询上级区划异常!")
    // }else{
    // }
    var sql = `select superguid from fw_t_admindiv a  where  a.GUID ='${admdiv}'`
    var res = $DS.selectBySql(VUECFG.appId, sql, "发送通知失败!查询上级区划异常!")
    return res.result;
}

/**
 * 获取上级区划
 * @return {*}
 */
function getUpDiv() {
    var sql = `select superguid from fw_t_admindiv a  where  a.GUID ='${$DS.getPms("USER_admdiv")}'`
    var res = $DS.selectBySql(VUECFG.appId, sql, "发送通知失败!查询上级区划异常!")
    return res;
}

function btn_return_clickNew() {
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("RETURN_REMARK_TYPE", "update");
    $DS.showPage("freeFromView.jsp?PAGEID=9504922F12B04387A76882A69361260A&PAGETITLE=【5-3-1-1-1-1】退回说明&APPID=BMP", "退回原因", "75%", "75%");
}

//退回按钮点击事件(被调用)
function btn_return_click() {
    var result;
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var endFlag = "";//判断数据是否末级
    if (grid_node_val) {
        endFlag = grid_node_val.ENDFLAG || "";
    }
    var status_ = $DS.getPms("USER_ADMDIVLEVEL");//判断用户级次
    var updatedVal = ""//需要修改的数据
    if (municipalArr.indexOf(status_) != -1) updatedVal = "113";//市
    else if (provinceArr.indexOf(status_) != -1) updatedVal = "112";//省
    else if (countyArr.indexOf(status_) != -1) updatedVal = "115";//县
    result = sql_taskstatus_change(updatedVal);
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    } else {
        var superInfo = getSuperTaskStatus(grid_node_val.SUPERTASKID, grid_node_val.SUPERADMDIV);
        var superTaskStatus = superInfo.superTaskStatus;
        var superTaskId = superInfo.taskId;
        var superBudgetLevel = superInfo.budgetLevel;
        //级联退回
        //省
        if (provinceArr.indexOf(status_) != -1 && endFlag != "0" && superTaskStatus != "112" && grid_node_val.BUDGETLEVEL != "2") {
            result = sql_taskstatus_change(updatedVal, "", "", superTaskId);
            if (!result || result.isError) {
                alert("执行失败!" + result.errMsg);
                return;
            }
        }
        //市
        else if (municipalArr.indexOf(status_) != -1 && endFlag != "0" && superTaskStatus != "113" && municipalArr.indexOf(grid_node_val.BUDGETLEVEL) == -1) {
            result = sql_taskstatus_change(updatedVal, "", "", superTaskId);
            if (!result || result.isError) {
                alert("执行失败!" + result.errMsg);
                return;
            }
        }
        //调用更新消息状态方法
        debugger
        doMsgBySendADMDIV(grid_node_val.TASKADMDIV, "RPT_UP_" + grid_node_val.SUPERTASKID)
        //发送退回消息
        var msg = `退回成功!`;
        var res = sendUserMsgForTuiHui();
        if (res.isError) {
            msg = `${msg}【${res.errMsg}】`
        }
        alert(msg);
        if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
        clear_Cache();
        loadCtrl_btn();
    }
}


//更新消息状态方法    根据消息分组，将未办理的消息置为已办理
function doMsg(msgGroup) {
    debugger
    var params = {
        appId: VUECFG.appId,
        msgGroup: msgGroup,
        bType: "BMP_GOV",
    }
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    var url = basePath + "/usermsg/doMsg";
    var result = YCDCommon.Ajax.syncAjax(url, params)
    if (result != null && result.isError) {
        console.log("修改状态失败！原因：" + result.errMsg);
    }
    console.log("更新消息状态成功！！")
}

//更新消息状态方法   根据发送者行政区划+MsgGroup 修改消息状态为已办理 2
function doMsgBySendADMDIV(sendADMDIV, RPT_SUPERTASKID) {
    debugger
    // if($DS.getPms("USER_CURRENTYEAR") == '2022'){
    //     var sql = `select superguid from SSO_V_PUBADMDIV a  where  a.GUID ='${sendADMDIV}'`
    //     var res = $DS.selectBySql(VUECFG.appId, sql, "发送通知失败!查询上级区划异常!")
    //     sendADMDIV = res.result[0].SUPERGUID
    // }
    var params = {
        appId: VUECFG.appId,
        msgGroup: RPT_SUPERTASKID,
        sendADMDIV: sendADMDIV,
        bType: "BMP_GOV",
    }
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    var url = basePath + "/usermsg/doMsgBySendADMDIV";
    var result = YCDCommon.Ajax.syncAjax(url, params)
    if (result != null && result.isError) {
        console.log("修改状态失败！原因：" + result.errMsg);
    }
    console.log("更新消息状态成功！！")
}


function btn_allReturn_clickNew() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var status_ = $DS.getPms("USER_ADMDIVLEVEL");
    var updatedVal = ""
    //校验按钮规则
    for (let i = 0; i < grid_node_val.children.length; i++) {
        let taskStatus = grid_node_val.children[i]["TASKSTATUS"];
        if (taskStatus != "22" && taskStatus != "223" && taskStatus != "43" && taskStatus != "42" && taskStatus != "112" && taskStatus != "113" && taskStatus != "9") {
            alert("操作失败，请检查所有下级单位是否已全部上报！");
            return false;
        }
    }
    $DS.util.confirm(vm, "是否确认全部退回！", function () {
        btn_allReturn_click();
    }, "已取消", "", "", topWin.vm);
}

//全部退回按钮点击时间(被调用)
function btn_allReturn_click() {
    var result;
    var status_ = $DS.getPms("USER_ADMDIVLEVEL");
    var updatedVal = ""
    if (municipalArr.indexOf(status_) != -1) updatedVal = "113";//市
    else if (provinceArr.indexOf(status_) != -1) updatedVal = "112";//省
    result = sql_taskstatus_change(updatedVal, true);
    if (!result || result.isError) {
        alert("执行失败!" + result.errMsg);
        return;
    } else {
        alert("退回成功");
        if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
        clear_Cache();
        loadCtrl_btn();
    }
}


//撤销批复按钮点击事件
function btn_termination_click() {
    //let taskStatus = getLastStatus();
    var result = sql_taskstatus_change("223");
    if (!result || result.isError) {
        alert("执行失败!");
        return;
    }
    clear_Cache();
    if (parent.$DS.getCtrl("GRID_下达区划列表")) parent.$DS.loadCtrl("GRID_下达区划列表");
    alert("执行成功!")
    loadCtrl_btn();
}

//--------------------------------------------------方法区----------------------------------------------------------------------------------------------------------
//校验全省末级是否已全部符合某状态(根据表格现有的数据)(除了本任务)
function checkAppCompleted(n, taskid) {
    let gridInfo = parent.$DS.getCtrl("GRID_下达区划列表").info;
    let gridVal = gridInfo.ds_grid;
    gridVal = $DS.util.childrenToList(gridVal, "children", []);
    for (let i = 0; i < gridVal.length; i++) {
        if (gridVal[i]["ENDFLAG"] == "1" && gridVal[i]["TASKID"] != taskid && gridVal[i]["TASKSTATUS"] != n && gridVal[i]["TASKSTATUS"] != "9")
            return false;
    }
    return true;
}

/**
 * 校验该数据是否填写了填表人手机号
 * @returns {boolean}
 */
function checkIsSubUserTel() {
    let topWin = $DS.util.getTopWin("window");
    let grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    let sql = `select SUBUSERTEL from RURAL_TASK_DETAIL where GUID = '${grid_node_val.TASKID}'`;
    let result = $DS.selectBySql(VUECFG.appId, sql);
    if (!result || result.isError) {
        console.log("查询填表人手机号失败!");
        return false;
    }
    if (!result.result[0] || !result.result[0]["SUBUSERTEL"]) {
        alert("填报人联系方式未填写!");
        return false;
    } else {
        return true;
    }

}

/**
 * 校验该数据是否填写了填表人手机号
 * @returns {boolean}
 */
function checkIsNotSubUserTel() {
    let topWin = $DS.util.getTopWin("window");
    let grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    let sql = `select SUBUSERTEL from RURAL_TASK_DETAIL where GUID = '${grid_node_val.TASKID}'`;
    let result = $DS.selectBySql(VUECFG.appId, sql);
    if (!result || result.isError) {
        console.log("查询填表人手机号失败!");
        return false;
    }
    if (!result.result[0] || !result.result[0]["SUBUSERTEL"]) {
        alert("未填写填表人手机号!");
        return false;
    } else {
        return true;
    }

}

/**
 * 获得上级区划的任务状态
 * @param superTaskId
 * @param superTaskAdmdiv
 * @returns {string}
 */
function getSuperTaskStatus(superTaskId, superAdmdiv) {
    var sql = `select GUID, TASKSTATUS,BUDGETLEVEL from RURAL_TASK_DETAIL WHERE TASKADMDIV = '${superAdmdiv}' AND SUPERTASKID='${superTaskId}'`;
    var result = $DS.selectBySql(VUECFG.appId, sql);
    var finalVal = {
        superTaskStatus: result.result[0] && result.result[0].TASKSTATUS ? result.result[0].TASKSTATUS : "",
        taskId: result.result[0] && result.result[0].GUID ? result.result[0].GUID : "",
        budgetLevel: result.result[0] && result.result[0].BUDGETLEVEL ? result.result[0].BUDGETLEVEL : ""
    }

    return finalVal;
}

/**
 * 验证数据是否通过校验
 * @returns {boolean}
 */
function isNotCheck(notShow) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var sql = `select GUID,TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME from RURAL_TASK_RPTCHKDETAIL where TASKID = '${grid_node_val.TASKID}'`;
    var result = $DS.selectBySql(VUECFG.appId, sql);
    var taskType = grid_node_val.TASKTYPE;
    var checkStatus = result && result.result && result.result.length > 0 ? result.result : "";
    if (!checkStatus/* && myParent == "isFill"*/) {
        alert("未校验或校验未通过,不允许上报!");
        return false;
    }
    /*if (!checkStatus && myParent != "isFill")
        return true;*/
    let checkArr = new Array;
    if (checkRptId.length != checkStatus.length/* && myParent == "isFill"*/) {
        let checkOnIds = checkStatus.map(item => item["RPTGUID"]);
        checkRptId.forEach(item => {
            if (checkOnIds.indexOf(item) == -1)
                checkArr.push(`'${item}'`);
        })
        let sql = `select MODELNAME from RURAL_TASK_TYPEMODEL where MODELID in (${checkArr.join(",")}) and TYPEID ='${taskType}'  order by ORDERNO`;
        result = $DS.selectBySql(VUECFG.appId, sql);
        let rptNames = result.result.map(item => item["MODELNAME"]);
        alert(`【${rptNames.join(",")}】未校验!,不允许上报!`);
        return false;
    }
    checkStatus.map(item => {
        if (item["CHKSTATUS"] == "0")
            checkArr.push(`'${item["RPTGUID"]}'`);
    })
    if (/*myParent == "isFill" && */checkArr.length > 0) {
        let sql = `select MODELNAME from RURAL_TASK_TYPEMODEL where MODELID in (${checkArr.join(",")}) and TYPEID ='${taskType}'  order by ORDERNO`;
        result = $DS.selectBySql(VUECFG.appId, sql);
        let rptNames = result.result.map(item => item["MODELNAME"]);
        alert(`【${rptNames.join(",")}】校验未通过!,不允许上报!`);
        return false;
    }
    return true;
}

/**
 * 两条SQL验证方法
 * @returns {boolean}
 */
function checkBySql() {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var reportid = grid_node_val.TASKID;
    var sql = `select count(1) N  from TASK_R1_REPORTDATAS where reportid = '${reportid}'`;
    var result = $DS.selectBySql(VUECFG.appId, sql);
    var _2021Num = result && result.result && result.result[0] && result.result[0].N ? result.result[0].N : -1;
    sql = `select count(1) N from  TASK_R1_REPORTDATAS2020 where reportid = '${reportid}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    var _2020Num = result && result.result && result.result[0] && result.result[0].N ? result.result[0].N : -1;
    if (_2020Num > 0 && _2021Num > 0) {
        return true;
    } else {

        alert("数据未填写,上报失败!");
        return false;
    }
}

/**
 *
 * @param GUID
 * @returns {string}
 */
//根据TASKID获得该数据的任务状态
function getTaskStatusByTaskId(taskId) {
    var sql = `select TASKSTATUS from RURAL_TASK_DETAIL where GUID = '${taskId}'`;
    var result = $DS.selectBySql(VUECFG.appId, sql);
    var taskStatus = result.result[0] && result.result[0].TASKSTATUS ? result.result[0].TASKSTATUS : "";
    return taskStatus;
}

/**
 *
 * @returns {string}
 */
//返回当前tabs页的激活页签index
function thisTabIndex() {
    var tabs = $DS.getCtrl("TABS_填报采集表");
    var index = tabs.info.ds_tabs_editableTabsValue;
    return index;
}

/**
 * 清理缓存事件
 */
function clear_Cache() {
    var Path = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(Path + "/sysconfig/frame/clearCache");
    //$DS.clearTableSCache("RURAL_TASK_INFO,RURAL_V_TASKDETAIL,RURAL_TASK_DETAIL,RURAL_V_TASKTREESJ,RURAL_V_TASKTREE,RURAL_V_TASKMONTHINFO");
}

/**
 * 判断下级是否已经全部上报
 * @returns {boolean}
 */
function isAllSubmit(n, isAllSuces, isFill) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    for (let i = 0; i < grid_node_val.children.length; i++) {
        //不算终止的数据
        var taskStatus = grid_node_val.children[i]["TASKSTATUS"];
        if (taskStatus != n && taskStatus != "9") {
            //如果是全部通过调用该方法,子任务状态是通过的不需要校验   市级上报也不需要校验    任务状态是批复的不需要校验
            if (isAllSuces && (taskStatus == "42" || taskStatus == "43" || taskStatus == "223" || taskStatus == "113" || taskStatus == "5")) {
                continue;
            } else if (isFill && (taskStatus == "223" || taskStatus == "5" || taskStatus == "42")) {
                continue;
            } else {
                return false;
            }
        }
    }
    return true;
}

/**
 * 修改全省任务状态   添加数据到历史记录表
 * @param n
 * @returns {{isError}|*}
 */
function fun_AllProStatusAndHistory_change(n) {
    var result;
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    //修改全省任务状态
    let sql = `update RURAL_TASK_DETAIL set TASKSTATUS = '${n}' where SUPERTASKID = '${grid_node_val.SUPERTASKID}'`;
    result = $DS.exeSql(sql);
    if (!result || result.isError) {
        return result;
    }
    //修改任务主表任务状态
    sql = `update RURAL_TASK_INFO set TASKSTATUS = '${n}' where GUID = ${grid_node_val.SUPERTASKID}`;
    result = $DS.exeSql(sql);
    if (!result || result.isError) {
        return result;
    }
    //增加历史表数据
    sql = `select * from RURAL_TASK_DETAIL where SUPERTASKID = '${grid_node_val.SUPERTASKID}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    result = result.result;
    var TB = [];
    for (let i = 0; i < result.length; i++) {
        var insertData = {
            TASKID: result[i].GUID,
            SUPERTASKID: result[i].SUPERTASKID || "",
            TASKSTATUS: result[i].TASKSTATUS || "",
            SUBDEPARTMENT: result[i].SUBDEPARTMENT || "",
            SUBUSER: result[i].SUBUSER || "",
            SUBMANAGER: result[i].SUBMANAGER || "",
            SUBDATE: result[i].SUBDATE ? $DS.util.timeFormate(new Date(strTimeForMT(result[i].SUBDATE)), "yyyy-MM-dd HH:mm:ss") : "",
            SUBADMDIVNAME: result[i].SUBADMDIVNAME || "",
            SUBDEPTMANAGER: result[i].SUBDEPTMANAGER || "",
            SUBREMARK: result[i].SUBREMARK || "",
            SUBREMARKBASE: result[i].SUBREMARKBASE || "",
            SUBREMARKYEAR: result[i].SUBREMARKYEAR || "",
            SUBREMARKOTHER: result[i].SUBREMARKOTHER || "",
            RETUENREMARK: result[i].RETUENREMARK || "",
            CREATE_TIME: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss")
        }
        TB.push(insertData);
    }
    let data = {inserted: TB, updated: [], deleted: []}
    result = $DS.saveAllTableData("RURAL_TASK_HISTORY", "GUID", data, VUECFG.appId);
    return result;

}

/**
 * 历史记录表增加数据方法
 */
function fun_historyDataField_change(isAll, array, taskId) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var sql = ""
    if (!isAll) {
        taskId = taskId || grid_node_val.TASKID;
        sql = `select * from RURAL_TASK_DETAIL where GUID = '${taskId}'`;
        var result = $DS.selectBySql(VUECFG.appId, sql);
        result = result.result;
        var insertData = {
            TASKID: taskId,
            SUPERTASKID: result[0].SUPERTASKID || "",
            TASKSTATUS: result[0].TASKSTATUS || "",
            SUBDEPARTMENT: result[0].SUBDEPARTMENT || "",
            SUBUSER: result[0].SUBUSER || "",
            SUBMANAGER: result[0].SUBMANAGER || "",
            SUBDATE: result[0].SUBDATE ? $DS.util.timeFormate(new Date(strTimeForMT(result[0].SUBDATE)), "yyyy-MM-dd HH:mm:ss") : "",
            SUBADMDIVNAME: result[0].SUBADMDIVNAME || "",
            SUBDEPTMANAGER: result[0].SUBDEPTMANAGER || "",
            SUBREMARK: result[0].SUBREMARK || "",
            SUBREMARKBASE: result[0].SUBREMARKBASE || "",
            SUBREMARKYEAR: result[0].SUBREMARKYEAR || "",
            SUBREMARKOTHER: result[0].SUBREMARKOTHER || "",
            RETUENREMARK: result[0].RETUENREMARK || "",
            CREATE_TIME: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss")
        }
        result = $DS.saveTable(VUECFG.appId, "add", insertData, "RURAL_TASK_HISTORY", "GUID");
    } else {
        if (array.length == 0) {
            return {
                isError: false
            }
        }

        var taskIds = array.join(",");

        sql = `select * from RURAL_TASK_DETAIL where GUID in (${taskIds})`;
        result = $DS.selectBySql(VUECFG.appId, sql);
        result = result.result;
        var TB = [];
        for (let i = 0; i < result.length; i++) {
            var insertData = {
                TASKID: result[i].GUID,
                SUPERTASKID: result[i].SUPERTASKID || "",
                TASKSTATUS: result[i].TASKSTATUS || "",
                SUBDEPARTMENT: result[i].SUBDEPARTMENT || "",
                SUBUSER: result[i].SUBUSER || "",
                SUBMANAGER: result[i].SUBMANAGER || "",
                SUBDATE: result[i].SUBDATE ? $DS.util.timeFormate(new Date(strTimeForMT(result[i].SUBDATE)), "yyyy-MM-dd HH:mm:ss") : "",
                SUBADMDIVNAME: result[i].SUBADMDIVNAME || "",
                SUBDEPTMANAGER: result[i].SUBDEPTMANAGER || "",
                SUBREMARK: result[i].SUBREMARK || "",
                SUBREMARKBASE: result[i].SUBREMARKBASE || "",
                SUBREMARKYEAR: result[i].SUBREMARKYEAR || "",
                SUBREMARKOTHER: result[i].SUBREMARKOTHER || "",
                RETUENREMARK: result[i].RETUENREMARK || "",
                CREATE_TIME: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss")
            }
            TB.push(insertData);
        }
        let data = {inserted: TB, updated: [], deleted: []}
        result = $DS.saveAllTableData("RURAL_TASK_HISTORY", "GUID", data, VUECFG.appId);
    }


    return result;
}

/**
 *
 */
function strTimeForMT(str) {
    const finalTime = str.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', '')
    return new Date(finalTime).toString();
}

/**
 *
 * @param fieldName
 * @returns {null|undefined}
 */
//通用修改各个日期字段方法
function fun_dateField_change(fieldName) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var udpatedVal = [{
        GUID: grid_node_val.TASKID,
        [fieldName]: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss")
    }]
    var data = {inserted: [], updated: udpatedVal, deleted: []}
    var result = $DS.saveAllTableData("RURAL_TASK_DETAIL", "GUID", data, VUECFG.appId);
    return result
}

/**
 *
 * @param n
 * @returns {*}
 */
//通用修改任务状态方法
function sql_taskstatus_change(n, isAll, isFill, taskId) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = $DS.util.clone(topWin.$DS.getPms("grid_node_val"));
    var result
    //修改单条区划任务状态
    if (!isAll) {
        //如果方法参数有值使用参数值,没有则使用当前选中行的TASKID
        taskId = taskId || grid_node_val.TASKID;
        let sql = `update RURAL_TASK_DETAIL set taskstatus = ${n} where GUID = '${taskId}'`;
        result = $DS.exeSql(sql);
        if (result && !result.isError) {
            //新增历史表
            result = fun_historyDataField_change("", "", taskId);
        }
        //修改所有下级任务状态
    } else {
        var TB = []
        for (let i = 0; i < grid_node_val.children.length; i++) {
            if (grid_node_val.children[i]["TASKSTATUS"] != "9") {
                let itemTaskStatus = grid_node_val.children[i]["TASKSTATUS"];
                //如果已经是该状态或者该状态已经是批复自动跳过
                if (itemTaskStatus == n || itemTaskStatus == "5") continue;
                //如果上报按钮调用的该方法(修改的时候自动跳过已经上报到省级的区划)
                if (isFill && (itemTaskStatus == "223" || itemTaskStatus == "42")) continue;
                let obj = {
                    GUID: grid_node_val.children[i]["TASKID"],
                    TASKSTATUS: n
                }
                TB.push(obj);
            }
        }
        //如果是上报按钮调用的该方法
        if (isFill) {
            TB.push({
                GUID: grid_node_val["TASKID"],
                TASKSTATUS: n
            })
        }
        //构建历史表数组参数
        var taskIds = [];
        for (let item of TB) {
            taskIds.push(`'${item["GUID"]}'`);
        }
        let data = {inserted: [], updated: TB, deleted: []}
        result = $DS.saveAllTableData("RURAL_TASK_DETAIL", "GUID", data, VUECFG.appId);
        if (result && !result.isError) {
            //新增历史表
            result = fun_historyDataField_change(true, taskIds);

        }
    }
    grid_node_val["TASKSTATUS"] = n;
    topWin.$DS.putPms("grid_node_val", grid_node_val);
    clear_Cache();
    return result;
}

//----------------------------------------------------------------------------------------------------------------
/**
 * 刷新控件方法
 */
function loadCtrl_btn() {
    debugger
    var allBtn_name = ["BUTTON_上报", "BUTTON_汇总", "BUTTON_退回", "BUTTON_填报", "BUTTON_保存", "BUTTON_送审", "BUTTON_已完成", "LABEL_任务名称",
        "TABS_填报采集表", "BUTTON_强制上报", "BUTTON_驳回原因", "BUTTON_审核通过", "BUTTON_全部退回", "BUTTON_终止", "BUTTON_批复", "BUTTON_查看批复意见", "BUTTON_撤销批复", "BUTTON_批量提取数据", "BUTTON_批量校验"];
    for (let i = 0; i < allBtn_name.length; i++) {
        if ($DS.getCtrl(allBtn_name[i])) $DS.loadCtrl(allBtn_name[i]);
    }
}

//------------------------------------------------------------------------------------------------------------
/**
 * 动态tabs页方法
 */
function tabsUpdateData() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val");
    var tabs = $DS.getCtrl("TABS_填报采集表");
    var tabData = tabs.info.ds_tabs;
    var tabCfg = tabs.info.ds_tabs_editableTabs;
    var newData = [];
    var index = 0;
    checkRptId = [];
    if (grid_node_val) {
        var TASKTYPE = grid_node_val.TASKTYPE;
        var sql = `select * from RURAL_TASK_TYPEMODEL where typeid = '${TASKTYPE}' and STATUS in('1','9') and year='${$DS.getPms("USER_CURRENTYEAR")}' order by ORDERNO`;
        var data = $DS.selectBySql(VUECFG.appId, sql).result;

        for (let i = 0; i < data.length; i++) {
            let obj = {};
            let modelType = data[i].MODELTYPE;
            //如果数据是页面类型
            if (modelType == "P") {
                obj.tabIndex = (newData.length + 2) + "";
                obj.text = "";
                obj.name = newData.length + 1;
                obj.iconClass = "el-icon-finished";
                obj.title = data[i].MODELNAME;
                obj.lazy = true;
                obj.content = $DS.util.replace("/freeForm/freeFromView.jsp?" +
                    "PAGEID=" + data[i].MODELID + "&PAGETITLE=" + data[i].MODELNAME + "&APPID=" + VUECFG.appId + "&$zoom=true");
                //如果数据是报表类型的父级
                newData.push(obj);
            } else if (modelType == "PT") {
                sql = `select * from RURAL_TASK_TYPEMODEL where SUPERGUID='${data[i].GUID}' and status in ('1','9') and YEAR = '${$DS.getPms("USER_CURRENTYEAR")}' order by ORDERNO`;
                var childData = $DS.selectBySql(VUECFG.appId, sql).result;
                for (let j = 0; j < childData.length; j++) {
                    let rptVisible = JGTabsCfg4User(childData[j].MODELID);
                    if (rptVisible.VISIBLE) {
                        let obj = {};
                        obj.tabIndex = (newData.length + 2) + "";
                        obj.text = "";
                        obj.name = newData.length + 1;
                        obj.iconClass = "el-icon-finished";
                        obj.title = childData[j].MODELNAME;
                        obj.lazy = true;
                        obj.content = $DS.util.replace("/freeForm/freeFromView.jsp?" +
                            "PAGEID=" + data[i].MODELID + "&PAGETITLE=" + data[i].MODELNAME + "&APPID=" + VUECFG.appId + "&$zoom=true" + "&reportIdY=" + childData[j].MODELID + "&showLoadOther=" + rptVisible.EXTRACT + "&showSumBtn=" + rptVisible.COLLECT);
                        newData.push(obj);
                        checkRptId.push(childData[j].MODELID);
                    }
                }
            }
        }
    }
    var eternalVal = {};
    eternalVal.tabIndex = "1";
    eternalVal.text = "";
    eternalVal.title = "填报封面";
    eternalVal.name = "1";
    eternalVal.lazy = true;
    eternalVal.iconClass = "el-icon-info";
    eternalVal.content = $DS.util.replace("/freeForm/freeFromView.jsp?PAGEID=2993A540AF6A40889742121E1C8E31F0&PAGETITLE=【B5-4-1-1-1】填报信息填写&APPID=BMP");
    newData.unshift(eternalVal);

    tabs.info.ds_tabs_editableTabs = newData;
}

/**
 * 根据用户角色加工tabs页数据
 * @param rptGuids   报表guid
 * @constructor
 */
function JGTabsCfg4User(rptGuid) {
    debugger
    let tb = new Object();
    //                        是否汇总   是否提取数据   是否显示
    let KG = new Array("COLLECT", "EXTRACT", "VISIBLE");
    //用户角色注册到资源权限的报表ID
    let userInfo = pageInfo_YL || {};
    if (!userInfo[rptGuid]) {
        KG.map(item => {
            tb[item] = true;
        })
    } else {
        userInfo[rptGuid].map(item => {
            if (KG.indexOf(item["ITEMCODE"]) != -1)
                tb[item["ITEMCODE"]] = true;
        })
    }
    return tb;
}

//=========================================================勿念===================================================================
//批量校验按钮加载完成事件
function btn_allCheckData_complete(obj) {
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
        if (ismast == "0" && endFlag == "0" && taskadmdiv == user_upadmdiv) {
            obj.ds_show = true;
        }
    } else if (myParent == "isFill") {
        if ((taskStatus == "20" || taskStatus == "21" || taskStatus == "112" || taskStatus == "113")) {
            obj.ds_show = true;
        }
    }
}

//批量提取数据加载完成事件
function btn_allLoadOtherData_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var endFlag = "";
    var taskStatus = "";
    if (grid_node_val) {
        taskStatus = grid_node_val.TASKSTATUS || "";
        endFlag = grid_node_val.ENDFLAG || "";
    }
    obj.ds_show = false;
    if (myParent == "isFill") {
        if (taskStatus == "21" || taskStatus == "112" || taskStatus == "113")
            obj.ds_show = true;
    } else if (myParent == "isSummary") {

    }
}

//一体化同步数据按钮加载完成事件
function btn_YTHOtherData_complete(obj) {
    obj.ds_show = false;
}

//批复按钮加载完成事件
function btn_reply_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var endFlag = "";
    var taskStatus = "";
    if (grid_node_val) {
        taskStatus = grid_node_val.TASKSTATUS || "";
        endFlag = grid_node_val.ENDFLAG || "";
    }
    var admdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
    obj.ds_show = false;
    if (provinceArr.indexOf(admdivLevel) != -1 && endFlag == "1" && (taskStatus == "42" || taskStatus == "223") && myParent == "isSummary") {
        obj.ds_show = true;
    }
}


//查看批复意见加载完成事件
function btn_seeReply_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var endFlag = "";
    var taskStatus = "";
    if (grid_node_val) {
        taskStatus = grid_node_val.TASKSTATUS || "";
        endFlag = grid_node_val.ENDFLAG || "";
    }
    obj.ds_show = false;
    if (myParent == "isFill" && endFlag == "1" && (taskStatus == "5" || taskStatus == "8")) {
        obj.ds_show = true;
    } else if (myParent == "isSummary" && endFlag == "1" && (taskStatus == "5" || taskStatus == "8")) {
        obj.ds_show = true;
    }
}

//审核通过加载完成事件
function btn_complete_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var admdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
    var endFlag = "";
    var taskStatus = "";
    var taskadmdiv = "";
    var ismast = "";
    var budgetLevel = ""
    if (grid_node_val) {
        ismast = grid_node_val.ISMAST || "";
        endFlag = grid_node_val.ENDFLAG || "";
        taskStatus = grid_node_val.TASKSTATUS || "";
        taskadmdiv = grid_node_val.TASKADMDIV || "";
        budgetLevel = grid_node_val.BUDGETLEVEL || "";
    }

    var superTaskStatus = getSuperTaskStatus(grid_node_val.SUPERTASKID, grid_node_val.SUPERADMDIV).superTaskStatus;

    obj.ds_show = false;
    //判断按钮名字和显示逻辑
    //判断按钮名字和显示逻辑
    if (myParent == "isSummary") {
        if (provinceArr.indexOf(admdivLevel) != -1) {//用户是省级
            if (provinceArr.indexOf(budgetLevel) != -1 && endFlag != "1") {//数据是省
                //暂时关闭省级的全部通过按钮的显示
                /* obj.ds_button = "全部通过";
                 obj.ds_show = true;*/
            } else if (municipalArr.indexOf(budgetLevel) != -1 && endFlag != "1" && taskStatus != "42" && taskStatus == "223") {
                //关闭省级审核通过显示
                //obj.ds_button = "审核通过";
                //obj.ds_show = true;
            }
        } else if (municipalArr.indexOf(admdivLevel) != -1) {//用户是市级
            if (endFlag == "0" && municipalArr.indexOf(budgetLevel) != -1 && taskStatus != "223" && taskStatus != "5" && taskStatus != "42") {//市
                //暂时关闭市级全部通过按钮的显示
                /*obj.ds_button = "全部通过";
                obj.ds_show = true;*/
            } else if (endFlag != "0" && taskStatus == "22" && taskStatus != "5" && taskStatus != "43" && superTaskStatus != "223") {//县
                obj.ds_button = "审核通过";
                obj.ds_show = true;
            }
        } else if (countyArr.indexOf(admdivLevel) != -1) {//用户市县
            if (endFlag != "0" && ["225"].indexOf(taskStatus) != -1) {
                obj.ds_button = "审核通过";
                obj.ds_show = true;
            }
        }
    }
}

//驳回说明加载完成事件
function btn_viewDes_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var taskStatus = "";
    if (grid_node_val) {
        taskStatus = grid_node_val.TASKSTATUS || "";
    }
    obj.ds_show = false;
    if (myParent == "isFill") {
        if (taskStatus == "112" || taskStatus == "113") {
            obj.ds_show = true
        }
    }
}

//强制上报按钮加载完成事件
function btn_superSubmit_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var userName = $DS.getPms("USER_userName") || "";
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
    //判断显示
    if (myParent == "isSummary") {
        if (userName == "系统管理员" && (taskStatus == "21" || taskStatus == "11" || taskStatus == "20")) {
            obj.ds_show = true;
        }
    }
}


//开始汇总加载完成事件
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
        if (ismast == "0" && endFlag == "0" && taskStatus == "1" && taskadmdiv == user_upadmdiv) {
            obj.ds_show = true;
        }
    }
}

//填报加载完成事件
function btn_fill_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var user_admdiv = $DS.getPms("USER_admdiv");
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
    if (myParent == "isFill") {
        if (taskStatus == "1") {
            obj.ds_show = true;
        }
    }
}

//上报加载完成事件
function btn_submit_complete(obj) {
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
        superadmdiv = grid_node_val.SUPERADMDIV || "";
    }
    obj.ds_show = false;
    if (myParent == "isSummary") {
        if (ismast == "0" && superadmdiv != '#' && grid_node_val.TASKADMDIV == user_upadmdiv && (taskStatus == "20" || taskStatus == "112" || taskStatus == "113") /*grid_node_val.TASKADMDIV == user_upadmdiv/*&& ((taskStatus == "21" && grid_node_val.TASKADMDIV == user_upadmdiv) || (taskStatus == "11" && grid_node_val.TASKADMDIV == user_upadmdiv))*/) {
            obj.ds_show = true;
        }
    } else if (myParent == "isFill") {
        if (taskStatus == "21" || taskStatus == "112" || taskStatus == "113" || taskStatus == "115") {
            obj.ds_show = true;
        }
    }
}

//已完成按钮加载完成事件
function btn_success_complete(obj) {
    /* var topWin = $DS.util.getTopWin("window");
     var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
     var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
     var admdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
     var endFlag = "";
     var taskStatus = "";
     var taskadmdiv = "";
     var ismast = ""
     var superAdmdiv = "";
     var budgetLevel = "";
     if (grid_node_val) {
         ismast = grid_node_val.ISMAST || "";
         endFlag = grid_node_val.ENDFLAG || "";
         taskStatus = grid_node_val.TASKSTATUS || "";
         taskadmdiv = grid_node_val.TASKADMDIV || "";
         superAdmdiv = grid_node_val.SUPERADMDIV || "";
         budgetLevel = grid_node_val.BUDGETLEVEL || "";
     }
     obj.ds_show = false;
     if (myParent == "isSummary") {
         if (endFlag != "1" && budgetLevel == "2" && superAdmdiv == "#" && taskStatus == "20") {
             obj.ds_show = true;
         }
     }*/
    obj.ds_show = false;
}

//撤销批复按钮加载完成事件
function btn_termination_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var endFlag = "";
    var taskStatus = "";
    if (grid_node_val) {
        endFlag = grid_node_val.ENDFLAG || "";
        taskStatus = grid_node_val.TASKSTATUS || "";
    }
    var admdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
    obj.ds_show = false;
    if (myParent == "isSummary") {
        if (provinceArr.indexOf(admdivLevel) != -1 && endFlag == "1" && taskStatus == "5") {
            obj.ds_show = true;
        }
    }
}

//保存按钮加载完成事件
function btn_save_complete(obj) {
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
        if (ismast == "0" && (taskStatus == "20" || taskStatus == "113" || taskStatus == "112") && taskadmdiv == user_upadmdiv) {
            obj.ds_show = true;
        }
    } else if (myParent == "isFill") {
        if (taskStatus == "20" || taskStatus == "21" || taskStatus == "112" || taskStatus == "113" || taskStatus == "115") {
            obj.ds_show = true;
        }
    }
}

//全部退回按钮加载完成事件
function btn_allReturn_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var admdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
    var endFlag = "";
    var taskStatus = "";
    var taskadmdiv = "";
    var ismast = "";
    var budgetLevel = "";
    if (grid_node_val) {
        ismast = grid_node_val.ISMAST || "";
        endFlag = grid_node_val.ENDFLAG || "";
        taskStatus = grid_node_val.TASKSTATUS || "";
        taskadmdiv = grid_node_val.TASKADMDIV || "";
        budgetLevel = grid_node_val.BUDGETLEVEL || "";
    }
    obj.ds_show = false;
    if (myParent == "isSummary") {
        if (provinceArr.indexOf(admdivLevel) != -1 && budgetLevel == "2" && endFlag != "1") {//用户是省
            //暂时关闭省级的全部退回按钮的显示
            //obj.ds_show = true;
        } else if (municipalArr.indexOf(admdivLevel) != -1 && endFlag == "0" && taskStatus != "5" && taskStatus != "9" && taskStatus != "22" && taskStatus != "223" && taskStatus != "224") {//用户是市
            /*obj.ds_show = true;*/
        }
    }
}

//退回按钮加载完成事件
function btn_return_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var user_upadmdiv = $DS.getPms("USER_UPADMDIV");
    var admdivLevel = $DS.getPms("USER_ADMDIVLEVEL");
    var endFlag = "";
    var taskStatus = "";
    var taskadmdiv = "";
    var ismast = "";
    var budgetLevel = "";
    if (grid_node_val) {
        ismast = grid_node_val.ISMAST || "";
        endFlag = grid_node_val.ENDFLAG || "";
        taskStatus = grid_node_val.TASKSTATUS || "";
        taskadmdiv = grid_node_val.TASKADMDIV || "";
        budgetLevel = grid_node_val.BUDGETLEVEL || "";
    }

    var superTaskStatus = getSuperTaskStatus(grid_node_val.SUPERTASKID, grid_node_val.SUPERADMDIV).superTaskStatus;

    obj.ds_show = false;
    if (myParent == "isSummary" && taskStatus != "9" && taskStatus != "5") {
        if (provinceArr.indexOf(admdivLevel) != -1  /*&& budgetLevel == "3" && endFlag != "1"*/ && (taskStatus == "223" || taskStatus == "42")) {//用户是省
            obj.ds_show = true;
        } else if (municipalArr.indexOf(admdivLevel) != -1 && endFlag != "0" && taskStatus != "223" && taskStatus != "112" && taskStatus != "42" && taskStatus != "113" && superTaskStatus != "223" && (taskStatus == "22" || taskStatus == "43" || superTaskStatus == "112")) {//用户是市
            obj.ds_show = true;
        } else if (countyArr.indexOf(admdivLevel) != -1 && endFlag != "0" && ["45", "225"].indexOf(taskStatus) != -1) {
            obj.ds_show = true;
        }
    }
}

//任务名称标签加载完成事件
function label_taskName_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? $DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    obj.ds_label = `<span style="line-height:1.5rem;">${grid_node_val.TASKADMDIVNAME || ""}</span>`;
}

//填报说明按钮加载完成事件
function btn_instru_complete(obj) {
    /*  if (myParent == "isSummary")
          obj.ds_show = false;
      else*/
    obj.ds_show = true;
}


function batch_export_buildData(cfg) {
    debugger
    $DS.loadingFun("btn_batchExport", cfg, $DS.util.getTopWin("window"), true)
}

//打开批量导出配置
function btn_openExportCfg() {
    debugger
    let url = "freeFromView.jsp?PAGEID=EC033BE385EC4A1CAFB550CCD5097903&PAGETITLE=批量导出配置&APPID=BMP&" +
        "showCheck=TRUE&showUnit=TRUE&myParent=" + myParent + "&showExportSnap=TRUE&HVTYPE=V"
    showMyDialog('导出配置', "40%", '60%', url, '', '', '', "beforeCloseExportCfg")
}

//批量导出
function btn_batchExport(cfg) {
    debugger
    var topWin = $DS.util.getTopWin("window");
    let currentRow = topWin.$DS.getPms("grid_node_val");
    if (!currentRow) {
        alert("请先选择任务!");
        topWin.$DS.loading(false)
        return;
    }
    //let sql = `select MODELID  from RURAL_TASK_TYPEMODEL where TYPEID = '${currentRow.TASKTYPE}' AND modeltype='R' AND STATUS IN ('2','9') order by ORDERNO`;
    //let res = $DS.exeSql(sql);
    //$DS.selectBySql(VUECFG.appId, sql);
    let res = [];
    if (cfg.checkedRpt) {
        res = cfg.checkedRpt;
    } else {
        res = getReportIdsByTabs();
    }

    if (res && /*!res.isError && res.result &&*/ res.length > 0) {

        /**let reportsId = res.map(item => {
            return `/report/reportdesigner/lookreport/reportView.jsp?reportid=${item.MODELID}&TASKID=${currentRow.TASKID}`
        });**/
        try {
            $DS.util.exportMergeReportExcel(res, "政府预算(备案)采集表", {
                backColor: cfg.color == "1" ? true : false,
                changeUnit: cfg.unit,
                exportSnap: cfg.exportSnap
            });
            window.top["btn_batchExportTimeKey"] = setInterval(function () {
                if (window.top.exportMergeObj["EXPORTSTATUS"] == "END") {
                    clearInterval(window.top["btn_batchExportTimeKey"]);
                    topWin.$DS.loading(false);
                    delete window.top.exportMergeObj;
                    delete window.top["btn_batchExportTimeKey"]
                }
            })
        } catch (e) {
            console.error(e);
            delete window.top.exportMergeObj;
            delete window.top["btn_batchExportTimeKey"]
            topWin.$DS.loading(false)
        }
    } else {
        alert("导出失败: 获取报表数据异常");
        delete window.top.exportMergeObj;
        delete window.top["btn_batchExportTimeKey"]
        topWin.$DS.loading(false)
    }
}


/**
 * 批量导出获取报表id
 */
function getReportIdsByTabs(tabCfg) {
    debugger
    if (!tabCfg) {
        tabCfg = $DS.getCtrl('TABS_填报采集表').info.ds_tabs_editableTabs;
    }
    var topWin = $DS.util.getTopWin("window");
    let currentRow = topWin.$DS.getPms("grid_node_val");
    let taskId = currentRow.TASKID;
    let rptIds = [];
    for (let item of tabCfg) {
        if (item.content.indexOf("reportIdY") != -1) {
            let rptId = item.content.split('reportIdY=')[1];
            rptId = rptId.split('&')[0];
            let src = `/report/reportdesigner/lookreport/reportView.jsp?reportid=${rptId}&TASKID=${taskId}&`
            let pmsStr = getPmsStr(currentRow);
            rptIds.push(src + pmsStr);
        }
    }
    return rptIds;
}

//批量导出 获取路径参数
function getPmsStr(row) {
    debugger
    let paramKeys = ['TASKADMDIVCODE', 'TASKSTATUS', 'SUPERTASKID', 'MOF_DIV_CODE', 'BUDGETLEVEL'];
    let paramArr = [];
    for (let key of paramKeys) {
        paramArr.push(key + "=" + row[key]);
    }
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
    paramArr.push("SHOWCODE=" + code);
    paramArr.push("SUBLEN=" + len);
    paramArr.push("YEAR=" + row.YEAR);
    let MOF_DIV_CODE = row.TASKADMDIVCODE || "";
    var taskLevel = row.BUDGETLEVEL || "";
    if (MOF_DIV_CODE) {
        if (provinceArr.indexOf(taskLevel) != -1)//省
            MOF_DIV_CODE = MOF_DIV_CODE.substring(0, 2);
        else if (municipalArr.indexOf(taskLevel) != -1)//市
            MOF_DIV_CODE = MOF_DIV_CODE.substring(0, 4);
        else if (countyArr.indexOf(taskLevel) != -1)//县
            MOF_DIV_CODE = MOF_DIV_CODE.substring(0, 6);
        paramArr.push("MOF_DIV_CODE=" + MOF_DIV_CODE);
    }
    return paramArr.join('&')
}