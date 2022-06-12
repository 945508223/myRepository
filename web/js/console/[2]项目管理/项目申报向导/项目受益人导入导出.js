debugger
$DS.putPms("pageData", parent.$DS.getPms("DEE603E48BF84A1FAC7F18C2221A8CEE"));
allInput = ["受益人属性", "受益人表格"];
//$DS.putPms("vill",parent.$DS.getPms("vill"));暂时弃用
var whoParent = parent.$DS.getPms("whoParent");
var btn_save = $DS.getCtrl("保存");
var btn_insert = $DS.getCtrl("新增");
var btn_delete = $DS.getCtrl("删除");
var needDeleteVal = [];

function init() {
    debugger
    var radio = $DS.getCtrl("受益人属性");
    var gridVal = $DS.getCtrl("受益人表格").info.ds_grid;
    //$DS.setValById(radio.info.ds_id,"1");
    if (whoParent == "isUpdate") {
        btn_save.info.ds_button = "修改";
        var PROJID = parent.$DS.getPms("pageDataCes").GUID;
        //var resultParam = $DS.select(VUECFG.appId,"PROJID","RURAL_PROJECT_CONTENT","and PROJID='"+PROJID+"'");
        $DS.putPms("GUID", PROJID);

    } else if (whoParent == "isDeta") {
        btn_save.info.ds_show = false;
        btn_insert.info.ds_show = false;
        btn_delete.info.ds_show = false;
        for (let i = 0; i < allInput.length; i++) {
            if ($DS.getCtrl(allInput[i]) && $DS.getCtrl(allInput[i]).info && $DS.getCtrl(allInput[i]).info.ds_disabled == false)
                $DS.getCtrl(allInput[i]).info.ds_disabled = true;
        }
        var PROJID = parent.$DS.getPms("pageDataCes").GUID;
// var resultParam = $DS.select(VUECFG.appId,"PROJID","RURAL_PROJECT_CONTENT","and PROJID='"+PROJID+"'");
        $DS.putPms("GUID", PROJID);
    } else {
        $DS.putPms("GUID", parent.$DS.getPms("GUID"));
    }
    var colVal = "";
    var str = "select distinct BNFTYPE from RURAL_PROJECT_FARMER where PROJID = '" + $DS.getPms("GUID") + "'";
    if (selectBySql(VUECFG.appId, str).result[0]) {
        colVal = $DS.selectBySql(VUECFG.appId, str).result[0].BNFTYPE;
        radio.info.ds_radio = colVal;
    }


}

//表格加载完成事件
function grid_complete(obj) {
    debugger
    needDeleteVal = $DS.util.clone($grid.getAllData(obj.ds_id));
}

//保存功能
function save(notShow) {
    var grid = $DS.getCtrl("受益人表格");
    var PROJID = $DS.getPms("GUID");
    var BNFTYPE = $DS.getVal("受益人属性");
    var needUpdateOtherTablrVal = $grid.getEditRows(grid.info.ds_id).updated;
    var gridAllVal = $grid.getAllData(grid.info.ds_id);
    for (let i = 0; i < gridAllVal.length; i++) {
        gridAllVal[i].PROJID = PROJID;
        gridAllVal[i].BNFTYPE = BNFTYPE
    }
    var gridDeleteVal = $grid.getEditRows(grid.info.ds_id);
    data = {inserted: gridAllVal, updated: [], deleted: needDeleteVal};
    var insert_result = $DS.saveGridSource(data, "受益人录入");
    if (!notShow) {
        if (insert_result.isError) {
            alert("保存失败!" + insert_result.errMsg);
        } else {
            $DS.loadCtrl("受益人表格");
            alert("保存成功!");
        }
    }
    return insert_result;
}

//新增按钮点击事件
function btn_insert_click(obj) {
    console.log("USER_ADMDIV:" + $DS.getPms("USER_ADMDIV"));
    $DS.showPage("freeFromView.jsp?PAGEID=C2DFAB30313844E3B0A77222AB9BFF46&PAGETITLE=【2-1-5-1】项目选择农户&APPID=BMP", "选择农户", "95%", "95%");
}

init();


//-----------------------------------------------------------------------------
//按钮 通用功能导入excel表
function confirmImoortProjectFarmer(excelData) {
    debugger
    $DS.util.confirm(window.vm, "注意: Excel表格格式应与此表一致,且确保Excel标题在第一行!", function (vue, excelData) {
        $DS.loadingFun("imoortProjectFarmer", excelData, window);
    }, "", excelData)
}

//导入项目受益人数据
function imoortProjectFarmer(excelData) {
    debugger
    //todo 校验Excel数据是否合法

    //解析Excel表数据
    var newExcelData = [];
    for (let i = 0; i < excelData.length; i++) {
        var newItem = {};
        if (excelData[i]["受益人身份证号"]) {
            newItem["BNFIDENNO"] = excelData[i]["受益人身份证号"];
            newItem["BNFNAME"] = excelData[i]["受益人姓名"]?excelData[i]["受益人姓名"]:"";
            newItem["TOWNSHIP"] = excelData[i]["所属乡镇"]? excelData[i]["所属乡镇"]:"";
            newItem["VILLAGES"] = excelData[i]["所属村"]?excelData[i]["所属村"]:"";
            newItem["GROUPS"] = excelData[i]["社（组）"]?excelData[i]["社（组）"]:"";
            newItem["ADDRESS"] = excelData[i]["家庭住址"]?excelData[i]["家庭住址"]:"";
            newItem["POPULATION"] = excelData[i]["家庭人口数"]?excelData[i]["家庭人口数"]:"";
            newExcelData.push(newItem);
        }
    }


    //1 将导入的数据设置到表格控件中 重新加载表格
    dealImportExcelForGrid(newExcelData);
    //2 将导入的数据保存到农户表中
    dealImportExcelForFARMER(newExcelData);

}

//处理导入Excel 刷新受益人表格控件
function dealImportExcelForGrid(excelData) {
    var bnfidenNoArr = excelData.map(item => {
        return item.BNFIDENNO;
    });
    //去除重复
    var gridInfo = $DS.getCtrl("受益人表格").info;
    var gridData = $grid.getAllData(gridInfo.ds_id);
    gridData = gridData.filter(item => {
        if (bnfidenNoArr.indexOf(item.BNFIDENNO) == -1) {
            return item;
        }
    });

    var newGridData = gridData.concat(excelData);
    $grid.setData(gridInfo.ds_id, newGridData);
}


//保存农户信息表
function dealImportExcelForFARMER(excelData) {
    var editData = {updated: [], inserted: [], deleted: []};
    var farmerInfo = [];
    for (let i = 0; i < excelData.length; i++) {
        var newItem = {};
        newItem["PERNAME"] = excelData[i].BNFNAME;
        newItem["IDEN_NO"] = excelData[i].BNFIDENNO;
        newItem["ADDRESS"] = excelData[i].ADDRESS;
        newItem["TOWNSHIP"] = excelData[i].TOWNSHIP;
        newItem["VILLAGES"] = excelData[i].VILLAGES;
        farmerInfo.push(newItem);
    }

    editData.deleted = farmerInfo;
    editData.inserted = farmerInfo;
    editData = JSON.stringify(editData);
    var url = $DS.util.getProjectName(VUECFG.appId) + "/sysconfig/frame/saveData";
    var params = {
        "tableName": "RURAL_FARMER",
        "rows": editData,
        "keyField": "IDEN_NO",
    }
    var res = YCDCommon.Ajax.syncAjax(url, params);
    if (res.isError == false) {
        $DS.util.alert("保存成功", window);
    } else {
        $DS.util.alert("保存失败", window);
        console.error(res.errMsg)
    }
}

