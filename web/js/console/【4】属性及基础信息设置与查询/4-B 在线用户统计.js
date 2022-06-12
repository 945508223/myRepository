var isFirstLoad = true;
var freshGridTimer = "";
var UserCountPageInfo = {
    USER_upadmdiv: $DS.getPms("USER_upadmdiv"),
    User_upadmdivArr: []
};

getAdmdivArr(true);

//初始化 查询当前区划下级 过滤当前在线用户
function getAdmdivArr(isFirst) {
    debugger
    var nowUSER_upadmdiv = $DS.getPms("USER_upadmdiv");
    if (UserCountPageInfo.USER_upadmdiv != nowUSER_upadmdiv || isFirst) {
        UserCountPageInfo.USER_upadmdiv = nowUSER_upadmdiv;
        var sql = "select itemname from fw_t_admindiv   START WITH GUID = '" + nowUSER_upadmdiv + "'  CONNECT BY PRIOR GUID = SUPERGUID";
        var q_result = $DS.selectBySql(VUECFG.appId, sql, "", "");
        if (!q_result || q_result.isError) {
            console.error(q_result.errMsg ? q_result.errMsg : "获取区划数据失败!");
        } else {
            UserCountPageInfo.User_upadmdivArr = q_result.result.map(item => {
                return item.ITEMNAME;
            });
        }
    }
    return UserCountPageInfo.User_upadmdivArr;
}


//表格加载完成事件 | 点击刷新触发
//统计登录的用户信息
function conutOnlineUser() {
    debugger
    var info = $DS.getCtrl("GRID_在线人数统计").info;
    var cusCols = [
        {
            id: "USERNAME",
            prop: "USERNAME",
            label: "姓名",
            align: "center",
            fieldShowType: "input"
        },
        {
            id: "ADMDIV",
            prop: "ADMDIV",
            label: "区划",
            align: "center",
            fieldShowType: "input"
        },
        {
            id: "AGENCY",
            prop: "AGENCY",
            label: "部门",
            align: "center",
            fieldShowType: "input"
        }];

    info.ds_columns = cusCols;
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/login/getOnlineUsers");
    if (!result) {
        console.error("获取当前在线用户信息失败!");
        if (freshGridTimer) {
            window.clearInterval(freshGridTimer);
        }
        info.ds_grid = [];
    } else {
        var userInfo = dealUserForGrid(result);
        info.ds_grid = userInfo;
    }
    try {
        if (isFirstLoad == true) {
            isFirstLoad = false;
            freshGridTimer = setInterval(function () {
                $DS.loadCtrl("GRID_在线人数统计");
            }, 180000)
        }
    } catch (e) {
        window.clearInterval(freshGridTimer);
    }
}

//加工用户数据
function dealUserForGrid(userInfo) {
    debugger
    var userInfoArr = [];
    var userObj = {};
    var admdivArr = getAdmdivArr();
    for (var key in userInfo) {
        var newItem = {};
        //去除管理员
        if (userInfo[key].split("_")[2] == "系统管理员") {
            continue;
        }
        var userId = userInfo[key].split("_")[6];
        //去除重复
        if (userObj[userId]) {
            continue;
        }
        //取当前区划下用户
        if (admdivArr && admdivArr.length > 0 && admdivArr.indexOf(userInfo[key].split("_")[3]) == -1) {
            continue;
        }

        newItem["USERNAME"] = userInfo[key].split("_")[2];
        newItem["ADMDIV"] = userInfo[key].split("_")[3];
        if (userInfo[key].split("_")[7] == "1") {
            newItem["AGENCY"] = "财政";
        } else {
            newItem["AGENCY"] = userInfo[key].split("_")[4];
        }
        userObj[userId] = true;
        userInfoArr.push(newItem);
    }
    var labelInfo = $DS.getCtrl("LABEL_在线人数").info;
    labelInfo.ds_expression = userInfoArr.length + "";
    labelInfo.ds_label = userInfoArr.length + "";
    return userInfoArr;
}