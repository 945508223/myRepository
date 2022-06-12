debugger

if (VUECFG && VUECFG.viewStatu) {
    var isEditor = YCDCommon.Win.getUrlParam("isEditor");
    let richInfo = $DS.getCtrl("RICH_通知内容").info;
    if (isEditor == "true") {
        //可编辑
        $DS.getCtrl("ROW_不再提示容器").info.ds_show = false;
        $DS.getCtrl("ROW_按钮容器").info.ds_show = true;
        richInfo.ds_rich_showBottomBar = false;
        richInfo.ds_rich_type = "1";
        richInfo.ds_rich_isedit = true;
    } else {
        $DS.getCtrl("ROW_不再提示容器").info.ds_show = true;
        $DS.getCtrl("ROW_按钮容器").info.ds_show = false;
        richInfo.ds_rich_showBottomBar = false;
        richInfo.ds_rich_type = "0";
        richInfo.ds_rich_isedit = false;
    }
}


//设置图片
function setAnnouncementImage() {
    let richId = $DS.getCtrl("RICH_通知内容").info.ds_id;
    showMyDialog("图片库", "95%", "95%", getProjectName(VUECFG.appId) + '/freeForm/manage/imageUpLoad/upload.html?basePath=' + $DS.util.getProjectName(VUECFG.appId) + "&richId=" + richId, function () {
    });
}


function saveAnnouncement() {
    debugger
    var cloneData = $DS.util.clone(VUECFG);
    cloneData.viewStatu = false;
    cloneData["announcementVersion"] = cloneData["announcementVersion"] ? cloneData["announcementVersion"] + 1 : 1;
    let richId = $DS.getCtrl("RICH_通知内容").info.ds_id;
    cloneData.formObj[richId].info.ds_rich_showBottomBar = false;
    cloneData.formObj[richId].info.ds_rich_type = "0";
    //保存配置信息VUECFG
    var datas = {
        FORMID: cloneData.pageId,
        FORMCONFIG: cloneData,
        GUID: VUECFG.pageInfoId
    }

    var result = $DS.saveTable($DS.getPms("URL_APPID"), "edit", datas, "DM_FORM_PAGESDETAIL", "GUID", function (data) {
        VUECFG.pageInfoId = data.GUID;
        alert("保存成功!");
        //更新保存时间
        var res = $DS.exeSql(`update DM_FORM_PAGES set CTIME=sysdate where GUID='${pageId}'`);
    }, "保存配置信息异常");
    if (result.isError) {
        alert(result.errMsg);
        return false;
    }
}

//不在提示点击
function setIsShowAnnouncement() {
    setAnnouncementCookie("cantShowAnnouncement", "true", 30,true);
    $DS.util.close();
}


/**
 * 设置cookie
 * @param name
 * @param value
 * @param day
 @param day
 */
function setAnnouncementCookie(name, value, day,isparent) {
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date() + expires);
        parent.document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
        parent.document.cookie = name + "=" + escape(value);
    }
}
