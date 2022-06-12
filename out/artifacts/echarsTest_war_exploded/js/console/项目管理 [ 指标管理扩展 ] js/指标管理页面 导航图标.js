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

//$menu.changePro(obj.ds_id, {ds_menu: menuData});




