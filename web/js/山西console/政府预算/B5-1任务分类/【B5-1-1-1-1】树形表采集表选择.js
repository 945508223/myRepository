var needDeleteVal = [];
var tabsName = "TABS_采集表选择";
function init() {
    debugger
    var topWin = $DS.util.getTopWin("window");
    if (topWin.$DS.getPms("taskClassVal")) $DS.putPms("TYPEID", topWin.$DS.getPms("taskClassVal").GUID);
}

init();

function savePage() {
    var grid = $DS.getCtrl("GRID_已选择采集表");
    var topWin = $DS.util.getTopWin("window");

    var TYPEID = topWin.$DS.getPms("taskClassVal")?topWin.$DS.getPms("taskClassVal").GUID:"";
    var allGridVal = $grid.getAllData(grid.info.ds_id);
    for (let i = 0; i < allGridVal.length; i++) {
        allGridVal[i].TYPEID = TYPEID;
    }
    var data = {deleted: needDeleteVal, inserted: allGridVal, updated: []};
    var result = $DS.saveAllTableData("RURAL_TASK_TYPEMODEL", "GUID", data, VUECFG.appId);

    $DS.loadCtrl("GRID_已选择采集表");

    return result;
}

//表格加载完成事件
function grid_complete(obj) {
    debugger
    let gridInfo = $DS.getCtrl("GRID_已选择采集表").info;
    let _data = $DS.util.clone(gridInfo.ds_grid);
    needDeleteVal = $DS.util.children(_data, "children", []);

}
//选择按钮点击事件
function btn_choice_click() {
    var topWin = $DS.util.getTopWin("window");
    if (!topWin.$DS.getPms("taskClassVal")) {
        topWin.alert("请先选择采集分类");
        return;
    }
    topWin.$DS.putPms("tabsName",tabsName);
    topWin.$DS.putPms("needDeleteVal",needDeleteVal);
    $DS.showPage("freeFromView.jsp?PAGEID=E69E41B01D554AB7B9ABD4A541D01284&PAGETITLE=【5-1-1-1-2】树形表采集表选择&APPID=BMP", "选择采集表", "80%", "80%", "", "", topWin);
}

//选择按钮加载完成事件
function btn_choice_complete(obj) {
    var topWin = $DS.util.getTopWin("window");
    if (!topWin.$DS.getPms("taskClassVal") || !topWin.$DS.getPms("taskClassVal").TASKTYPECODE || !topWin.$DS.getPms("taskClassVal").TASKTYPENAME) {
        obj.ds_show = false;
    } else {
        obj.ds_show = true;
    }
}

//表格值变更事件
function grid_change(obj) {
    var data = $grid.getEditRows(obj.ds_id);
    var result = $DS.saveGridSource(data, "DS_已选择采集表");
    if (result && !result.isError) {

    } else {
        alert("保存失败" + result.errMsg);
    }
}
//保存按钮点击事件
function btn_save_click(){
    var data = $grid.getEditRows($DS.getCtrl("GRID_已选择采集表").info.ds_id);
    var result = $DS.saveGridSource(data, "DS_已选择采集表");
    if (result && !result.isError) {
        $DS.util.alert("保存成功！");
    } else {
        alert("保存失败" + result.errMsg);
    }
}
//删除按钮点击事件
function btn_delete_clickNew(){
    var topWin = $DS.util.getTopWin("window");
    $DS.util.confirm(vm, "是否确认删除行数据？", function () {
        btn_delete_click();
    }, "已取消", "", "", topWin.vm);
}
//删除按钮点击后事件(被调用)
function btn_delete_click(){
    var deleteVal = $DS.getPms("grid_row_val");
    var data = {deleted:deleteVal,inserted:[],updated:[]}
    var result = $DS.saveGridSource(data, "DS_已选择采集表");
    if (result && !result.isError) {
        $DS.util.alert("删除成功");
        $DS.loadCtrl("GRID_已选择采集表")
    } else {
        alert("删除失败" + result.errMsg);
    }

}


//删除前 校验是否可删除
function beforeDel_() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_已选择采集表").info;
    let selectData = $grid.getData(gridInfo.ds_id);
    let contDelData = [];
    if (selectData && selectData.length > 0) {
        for (let item of selectData) {
            if (item.children && item.children.length > 0) {
                contDelData.push(item.MODELNAME);
            }
        }
    }

    if (contDelData.length > 0) {
        let names = contDelData.join(",");
        alert(`【${names}】存在下级,不可删除!`);
        return false;
    }

}
