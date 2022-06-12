//页面类型
var pageTypeMain;
var pageType;
//父页面推送的参数
var parentTreeVal;
var parentGridVal;

//初始化
function init() {
    debugger;
    pageType = $DS.getPms("URL_pageType_") || "";
    pageTypeMain = ($DS.getPms("URL_pageType_") || "").substring(0, 4);
    parentTreeVal = parent.$DS.getPms("tree_pms") || "";
    parentGridVal = parent.$DS.getPms("grid_pms") || "";
    //回显
    let codeCtrlInfo = $DS.getCtrl("INPUT_编码").info;
    let nameCtrlInfo = $DS.getCtrl("INPUT_名称").info;
    if (pageTypeMain != "grid") {
        if (pageType == "isUpdate") {
            codeCtrlInfo.ds_input = parentTreeVal[0].ITEMCODE;
            nameCtrlInfo.ds_input = parentTreeVal[0].NAME;
        }
    } else {
        codeCtrlInfo.ds_show = false;
        nameCtrlInfo.ds_labeltxt = "页面名称";
        if (pageType == "grid_isUpdate")
            nameCtrlInfo.ds_input = parentGridVal[0].ITEMNAME;
    }
}

init();

//确认按钮点击事件
function btn_success_click() {

    if (pageTypeMain == "grid")
        btn_success_click2grid();
    else
        btn_success_click2tree();

}

//确认按钮点击事件(操作树)
function btn_success_click2tree() {
    let type;
    let data;
    let inputCode = $DS.getCtrl("INPUT_编码").info.ds_input;
    let inputName = $DS.getCtrl("INPUT_名称").info.ds_input;
    if (!inputCode || !inputName) {
        alert("编码、名称不可为空!");
        return;
    }
    if (pageType == "isInsert") {
        data = {
            ITEMCODE: inputCode,
            ITEMNAME: inputName,
            SUPERGUID: parentTreeVal[0]["ID"],
            LEVELS: parentTreeVal[0]["LEVELS"] ? parentTreeVal[0]["LEVELS"] + 1 : 1,
            ORDERNUM: parentTreeVal[0]["ORDERNUM"] ? (parseInt(parentTreeVal[0]["ORDERNUM"]) + 1).toString() : "000001"
        }
        type = "add";
    } else if (pageType == "isUpdate") {
        data = {
            GUID: parentTreeVal[0]["ID"],
            ITEMCODE: inputCode,
            ITEMNAME: inputName,
        }
        type = "edit";
    }
    let result = $DS.saveTable("MFBI", type, data, "AD_PAGECAT", "GUID");
    if (!result || result.isError) {
        alert("数据操作失败!");
        return;
    }
    $DS.util.alert("操作成功!");
    parent.$DS.putPms("tree_pms", "");
    parent.$DS.loadCtrl("TREE_树");
    $DS.util.close();
}

//确认按钮点击事件(操作表格)
function btn_success_click2grid() {
    let type;
    let data;
    let inputName = $DS.getCtrl("INPUT_名称").info.ds_input;
    if (!inputName) {
        alert("页面名称不可为空!");
        return;
    }
    if (pageType == "grid_isInsert") {
        data = {
            ITEMNAME: inputName,
            PAGECAT: parentTreeVal[0]["ID"],
            CTIME: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss"),
            CURSERNAME:$DS.getPms("USER_UserName"),
            CUSERGUID:$DS.getPms("USER_MID"),
            IS_SYS :"0"
        }
        type = "add";
    } else if (pageType == "grid_isUpdate") {
        data = {
            ITEMNAME: inputName,
            GUID: parentGridVal[0]["GUID"]
        }
        type = "edit";
    }
    let result = $DS.saveTable("MFBI", type, data, "AD_PAGES", "GUID");
    if (!result || result.isError) {
        alert("数据操作失败!");
        return;
    }
    $DS.util.alert("操作成功!");
    parent.$DS.putPms("grid_pms", "");
    parent.$DS.loadCtrl("GRID_右表格");
    $DS.util.close();
}


