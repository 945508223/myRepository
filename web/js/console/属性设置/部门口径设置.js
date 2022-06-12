//(AGENCYID || '_' || ADMDIV) as FACKGUID


//保存部门口径设置表格
function saveBMKJ() {
    debugger
    var gridInfo = $DS.getCtrl("GRID_部门口径设置").info;
    var editRows = $grid.getEditRows(gridInfo.ds_id);
    var saveData = {updated: [], inserted: [], deleted: []};
    editRows.updated.map(item => {
        var newItem = {};
        newItem["ADMDIV"] = item.ADMDIV;
        newItem["AGENCYID"] = item.AGENCYID;
        newItem["DEPARTTYPE"] = item.DEPARTTYPE;
        if (item.GUID) {
            newItem["GUID"] = item["GUID"];
        }
        //修改
        if (item.GUID && item.DEPARTTYPE) {
            saveData.updated.push(newItem);
        }
        //删除
        else if (item.GUID && !item.DEPARTTYPE) {
            saveData.deleted.push(newItem);
        }
        //新增
        else if (!item.GUID) {
            saveData.inserted.push(newItem);
        }
    });

    if (saveData.updated.length == 0 && saveData.deleted.length == 0 && saveData.inserted.length == 0) {
        $DS.util.alert("无更改过的数据", window);
        return;
    }
    saveData = JSON.stringify(saveData);
    var url = $DS.util.getProjectName(VUECFG.appId) + "/sysconfig/frame/saveData";
    var params = {
        "tableName": "RURAL_DEPARTSET",
        "rows": saveData,
        "keyField": "GUID",
    }
    var res = YCDCommon.Ajax.syncAjax(url, params);
    if (res.isError == false) {
        $DS.util.alert("保存成功", window);
        $DS.clearTableSCache("RURAL_DEPARTSET");
        gridInfo.ds_grid_autoContrast = false;
    } else {
        $DS.util.alert("保存失败", window);
        console.error(res.errMsg)
    }

    $DS.loadCtrl("GRID_部门口径设置");
}


function autoCheck() {
    debugger
    var gridInfo = $DS.getCtrl("GRID_部门口径设置").info;
    gridInfo.ds_grid_autoContrast = true;
}