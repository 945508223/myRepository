debugger
//指标分配
function zbfp(dom){
    debugger
    var guid = $(dom).attr("guid")
    var amount = $(dom).attr("amount")
    var dis_amount = $(dom).attr("dis_amount");
    if(amount){
        amount = parseFloat(amount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }
    $DS.showPage('freeFromView.jsp?PAGEID=3EA2482FAF224AB98628E3D875E33D71&PAGETITLE=【0104】指标分配保存&APPID=BMP&GUID='+guid+"&amount="+amount+'&dis_amount=' + dis_amount, '指标分配', '80%', '80%')
}
//删除指标
function btn_delindi(obj){
    if(!$DS.getVal("指标列表")){
        alert("请选择您要删除的指标！");
    }else{
        if (confirm("您确认要删除此指标吗？")){
            //取fastdfs服务器文件列表
            var indi_GUID=$DS.getVal("指标列表")[0].GUID;
            var filelist = $DS.selectAll(VUECFG.appId,"RURAL_INDI_POL",["GUID","POLURL"],"GUID",{filter1:"and INDI_ID='"+indi_GUID+"'"});
            //删除数据库数据
            var delRel='RURAL_INDI_DETAIL:INDI_ID,RURAL_INDI_POL:INDI_ID';
            var result = $DS.deleteByPageSource("指标列表",indi_GUID,delRel);
            if (!result.isError){
                $DS.loadCtrl('指标列表');
                $tabs.getSubWindow("TAB页",0).winload("");
                $tabs.getSubWindow("TAB页",1).clearData();
                alert("删除成功！");
            }else{
                alert("删除失败，失败原因："+result.errMsg);
            }
            //删除文件
            debugger;
            if (filelist){
                if(!filelist.isError){
                    var urls = new Array();
                    for (var i=0;i<filelist.result.rows.length;i++)
                        urls.push(filelist.result.rows[i].POLURL);
                    $DS.delFromFastDFS(urls.join(","));
                }

            }
        }
    }
}

//菜单加载成功事件
function menu_loadsucceed(obj){
    var icons = [
        "icon-gendantuoshouchaxun",
        "icon-baozhengjincunru",
        "icon-zhangbuguanlianguizeguanli",
        "icon-dianzihuidan",
        "icon-duojizhangbuyuetiaozhang",
        "icon-beishubaozheng",
        "icon-weidaizijinchiguijimingxichaxun",
        "icon-weituodaikuanjiekuanmingxichaxun",
        "icon-goumai-zaixianlicai",
        "icon-qiyejihuo",
    ];

    debugger
    //菜单数据
    var menuData = obj.ds_menu;
    obj.ds_menu_iconField = "customIcon";
    for (let i = 0; i < menuData.length; i++) {
        if (!icons[i]) {
            menuData[i]["customIcon"] = icons[i - 9];
        } else {
            menuData[i]["customIcon"] = icons[i];
        }
    }

    obj.ds_menu = "";
    obj.ds_menu = menuData;

}


var pageObj = {
    centerwidth: $DS.getCtrl("ROW_右侧指标列表容器").info.ds_width,
    leftWidth: $DS.getCtrl("ROW_左侧项目分类容器").info.ds_width,
    rightWidth: $DS.getCtrl("ROW_TAB页容器").info.ds_width,
    fastUrl:$DS.FASTDFSURL,
}


//=========================点击导航标签==================================================================
//点击导航栏标签
function clickMenuLabel() {
    debugger
    //导航展开 tab页展开, 点击收缩导航栏 指标容器扩容
    if (pageObj.leftWidth == "20rem" && pageObj.rightWidth == "32rem") {
        pageObj.centerwidth = "calc(100% - 40rem)";
        pageObj.leftWidth = "7rem";
    }
    //导航栏展开 tab 收缩,点击收缩导航栏,指标扩容
    else if (pageObj.leftWidth == "20rem" && pageObj.rightWidth == "0%") {
        pageObj.centerwidth = "calc(100% - 8rem)";
        pageObj.leftWidth = "7rem";
    }
    //导航栏收缩  tab页展开
    else if (pageObj.leftWidth == "7rem" && pageObj.rightWidth == "32rem") {
        pageObj.centerwidth = "calc(100% - 53rem)";
        pageObj.leftWidth = "20rem";
    }
    //导航栏收缩 tab页收缩
    else if (pageObj.leftWidth == "7rem" && pageObj.rightWidth == "0%") {
        pageObj.centerwidth = "calc(100% - 21rem)";
        pageObj.leftWidth = "20rem";
    }

    setMenuRowWidth_MenuHeight_InputIsShow();
    setZbRowWidth();
    setMenuLabel();
}



//======================================右箭头点击事件====================================================================
//点击右箭头
function clickRightArrow() {
    debugger
    //导航展开 tab页展开, 点击收缩Tab页 指标容器扩容
    if (pageObj.leftWidth == "20rem" && pageObj.rightWidth == "32rem") {
        pageObj.centerwidth = "calc(100% - 21rem)";
        pageObj.rightWidth = "0%";
    }
    //导航栏展开 tab 收缩,点击展开Tab页,指标缩小
    else if (pageObj.leftWidth == "20rem" && pageObj.rightWidth == "0%") {
        pageObj.centerwidth = "calc(100% - 53rem)";
        pageObj.rightWidth = "32rem";
    }
    //导航栏收缩  tab页展开 ,点击收缩Tab页 ,指标扩展
    else if (pageObj.leftWidth == "7rem" && pageObj.rightWidth == "32rem") {
        pageObj.centerwidth = "calc(100% - 8rem)";
        pageObj.rightWidth = "0%";
    }
    //导航栏收缩 tab页收缩 ,点击展开tab页,指标缩小
    else if (pageObj.leftWidth == "7rem" && pageObj.rightWidth == "0%") {
        pageObj.centerwidth = "calc(100% - 40rem)";
        pageObj.rightWidth = "32rem";
    }

    setTabRowWidth();
    setZbRowWidth();
    setRightArrowLabel();
}



//导航栏 收缩 或展开 设置导航栏容器宽度 ,导航栏高度 ,导航栏搜索框的显示与否
function setMenuRowWidth_MenuHeight_InputIsShow() {
    $DS.getCtrl("ROW_左侧项目分类容器").info.ds_width = pageObj.leftWidth;//导航栏_搜索框容器
    $DS.getCtrl("导航栏搜索框").info.ds_show = pageObj.leftWidth == "7rem" ? false : true;//导航栏搜索框容器
    var type = pageObj.leftWidth == "7rem" ? true : false;//导航栏
    $menu.changeCollapse($DS.getCtrl("资金大类").info.ds_id,type);
}
//设置中间容器宽度
function setZbRowWidth() {
    $DS.getCtrl("ROW_右侧指标列表容器").info.ds_width = pageObj.centerwidth;//中间容器
}


//设置tab页宽度
function setTabRowWidth() {
    $DS.getCtrl("ROW_TAB页容器").info.ds_width = pageObj.rightWidth;
}

//改变导航栏 标签图片
function setMenuLabel() {
    if(pageObj.leftWidth=="7rem"){
        $DS.getCtrl("导航栏收缩标签").info.ds_width = "100%";
    }else {
        $DS.getCtrl("导航栏收缩标签").info.ds_width = "4rem";
    }
}

//设置右箭头图片
function setRightArrowLabel() {
    if(pageObj.rightWidth == "32rem"){
        $DS.getCtrl("右箭头").info.ds_label_background_image = "url("+pageObj.fastUrl+"/group1/M00/00/02/wKgBV2CrZMyAfX1zAAAE50ObTmc745.png)";
    }else {
        $DS.getCtrl("右箭头").info.ds_label_background_image = "url('"+pageObj.fastUrl + "/group1/M00/00/08/wKgBWGCrZDaAQoSjAAAE514K8Gw852.png')";
    }
}


//鼠标移入导航栏收缩标签
function inMenuLabel() {
    $DS.getCtrl("导航栏收缩标签").info.ds_label_background_image = "url("+pageObj.fastUrl+"/group1/M00/00/08/wKgBWGCvQsmAZwK3AAARrcxMkRg737.png)";
}

//鼠标移出导航栏收缩标签
function outMenuLabel() {
    $DS.getCtrl("导航栏收缩标签").info.ds_label_background_image = "url("+pageObj.fastUrl+"/group1/M00/00/08/wKgBWGCt5hSAfNuhAAARFIT_Uwg517.png)";
}


AND INDI_DETAILID='${V.INDI_DETAILID,""}'

var tabInfo = $DS.getCtrl("TAB").info;
var index = tabInfo.ds_tabs_editableTabsValue;
var iframeCount = $("#"+tabInfo.ds_id).find("iframe").length;
if(index==1){
    $tabs.getSubWindow("TAB",0).winload(val.INDI_ID);
}else {
    if(iframeCount==1){
        $tabs.getSubWindow("TAB",0).winload(val.INDI_DETAILID);
    }else {
        $tabs.getSubWindow("TAB",1).winload(val.INDI_DETAILID);
    }
}
