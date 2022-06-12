let form = `<form id="form1" method="post" target="_blank" style="display: none;"><input id="userpackage" name="userpackage" type="hidden"><input id="targetUrl" name="targetUrl" type="hidden"></form>`
$("body").append(form);

//打开按钮点击事件
function btn_open_click() {
    let gridPms = $DS.getPms("grid_pms");
    if (!gridPms || !gridPms[0]) {
        alert("请选择具体页面");
    }
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    //window.open(`http://39.105.222.150:9196/dv_designer/report/reportAnalysis/reportmodel_v2.jsp?id=${gridPms[0]["GUID"]}`);
   // window.open(`/dv_designer/report/reportAnalysis/reportmodel_v2.jsp?id=${gridPms[0]["GUID"]}`);
    //url:http://182.92.155.2:8080/dv_designer/SSOLogin?url=report/reportAnalysis/reportmodel.jsp
    let actionUrl = "/dv_designer/SSOLogin";
    let targetUrl = `report/reportAnalysis/reportmodel_v2.jsp?id=${gridPms[0]["GUID"]}`;

    var token = YCDCommon.Ajax.syncAjax(getProjectName() + "/login/getUserTokenForSSO");
    if (token.isError) {
        window.alert("登录超时，请重新登录！");
        window.top.location.href = 'login.jsp';
        return;
    }
    document.all.userpackage.value = token.result;
    document.all.targetUrl.value = targetUrl;
    document.all.form1.action = actionUrl;
    document.all.form1.target = "_blank";
    /** 后台filter中区分当前操作的是MDM还是DRC，携带参数m**/
    document.all.form1.submit();
}

//左删除按钮点击事件
function leftBtn_delete_click() {
    $DS.util.confirm(vm, "是否确认删除?", function () {
        let treePms = $DS.getPms("tree_pms");
        let listCondition = $DS.util.childrenToList(treePms, "children", []);
        let conditionArray = listCondition.map(item => `'${item.GUID}'`);
        let sql = `delete AD_PAGECAT where GUID in (${conditionArray.join(",")})`;
        let result = $DS.exeSqls(sql, "MFBI");
        if (!result || result.isError) {
            alert("删除失败!");
            return;
        }
        alert("删除成功!");
        $DS.putPms("tree_pms", "");
        $DS.loadCtrl("TREE_树");
    }, "已取消删除", "", "", vm);
}

//右删除按钮点击事件
function rightBtn_delete_click() {
    $DS.util.confirm(vm, "是否确认删除?", function () {
        let gridPms = $DS.getPms("grid_pms");
        let sql = `delete AD_PAGES where GUID = '${gridPms[0]["GUID"]}'`;
        let result = $DS.exeSqls(sql, "MFBI");
        if (!result || result.isError) {
            alert("删除失败!");
            return;
        }
        alert("删除成功!");
        $DS.putPms("grid_pms", "");
        $DS.loadCtrl("GRID_右表格");
    }, "已取消删除", "", "", vm);
}

//左侧新增按钮点击事件
function leftBtn_insert_click() {
    let treePms = $DS.getPms("tree_pms");
    if (!treePms) {
        alert("请选择具体新增分类!");
        return;
    }
    $DS.showPage("freeFromView.jsp?PAGEID=509C7EAC5B96405A89022386A6827284&PAGETITLE=即席分析新增修改&APPID=BMP&pageType_=isInsert", "新增分类", "40%", "50%");
}

//左侧修改按钮点击事件
function leftBtn_update_click() {
    let treePms = $DS.getPms("tree_pms");
    if (!treePms) {
        alert("请选择具体修改的分类!");
        return;
    }
    if (!treePms[0]["PID"]) {
        alert("该节点不允许进行修改!");
        return;
    }
    $DS.showPage("freeFromView.jsp?PAGEID=509C7EAC5B96405A89022386A6827284&PAGETITLE=即席分析新增修改&APPID=BMP&pageType_=isUpdate", "修改分类", "40%", "50%");
}

//右侧新增按钮点击事件
function rightBtn_insert_click() {
    let treePms = $DS.getPms("tree_pms");
    if (!treePms) {
        alert("请选择具体新增分类!");
        return;
    }
    if (!treePms[0]["PID"]) {
        alert("该节点不允许新增!");
        return;
    }
    $DS.showPage("freeFromView.jsp?PAGEID=509C7EAC5B96405A89022386A6827284&PAGETITLE=即席分析新增修改&APPID=BMP&pageType_=grid_isInsert", "新增页面", "40%", "50%");
}

//右侧修改按钮点击事件
function rightBtn_update_click() {
    let gridPms = $DS.getPms("grid_pms");
    if (!gridPms || !gridPms[0]) {
        alert("请选择具体页面!");
        return;
    }
    $DS.showPage("freeFromView.jsp?PAGEID=509C7EAC5B96405A89022386A6827284&PAGETITLE=即席分析新增修改&APPID=BMP&pageType_=grid_isUpdate", "新增页面", "40%", "50%");
}

/**
 * 子页面调用的方法
 * @param data
 * @returns {{result: *[], isError: boolean, errMsg: string}}
 */
function supSubLinkSave(data, name) {
    let result = $DS.saveGridSource(data, name);
    return result;
}