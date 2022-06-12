function getMenuTreeData(info) {
    debugger
    // getProjectName()
    let params = {
        dbSource: "",
        id: "GUID",
        name: "'['||ITEMCODE||']'||ITEMNAME",
        order: "t.MENUORDER",
        otherCols: "",
        pid: "SUPERGUID",
        status: "",
        table: "SSO_V_ROLEMENUINFO",
        treelist: "1",
        wherestr: encodeURI(" and APPID <> 'SSO_FOCAL'")
    }
    var result = YCDCommon.Ajax.syncAjax(getProjectName(VUECFG.appId) + "/getTreeData", params);
    if (result.isError) {
        alert(result.errMsg);
        return;
    } else {
        info.ds_tree = result.result;
    }
}


function checkedMenuTree(row) {
    debugger

    var params = {
        sql: "select * from SSO_T_ROLEMENU where ROLEGUID='" + row.GUID + "'"
    }

    //var basePath=getProjectName();
    var basePath = getProjectName(VUECFG.appId);
    var url = basePath + "/frame/selectBySql";
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (result.isError) {
        alert(result.errMsg);
        return;
    }
    let treeInfo = $DS.getCtrl("TREE_RIGHTTREE").info;
    treeInfo.ds_tree_check_strictly = true;
    setTimeout(function () {
        var datas = result.result;
        let ids = datas.map(item => item.MENUID);
        $tree.clearCheckedNodes(treeInfo.ds_id);
        $tree.setCheckedNodes(treeInfo.ds_id, ids);
    })

}


function saveRole_Menu() {
    debugger

    let gridInfo = $DS.getCtrl("GRID_LEFTGRID").info;
    let treeInfo = $DS.getCtrl("TREE_RIGHTTREE").info;
    let sRow = $grid.getData(gridInfo.ds_id);
    if (sRow && sRow.length > 0) {
        sRow = sRow[0];
        var roleId = sRow.GUID;
        let chkNodes = $tree.getCheckedNodes(treeInfo.ds_id);
        //treeInfo.ds_tree_check_strictly = true;
        let halfNodes = window.top[treeInfo.ds_id + "treeRef"].getHalfCheckedNodes();
        chkNodes = chkNodes.concat(halfNodes);
        var insertRows = new Array();
        for (var i = 0; i < chkNodes.length; i++)
            insertRows.push({"MENUID": chkNodes[i].ID, "ROLEGUID": roleId});

        var deleteRows = new Array();
        deleteRows.push({"ROLEGUID": roleId});

        var ck_rows = {
            inserted: insertRows, updated: "", deleted: deleteRows
        };

        var basePath = getProjectName(VUECFG.appId);
        var url = basePath + "/frame/saveData";
        var params = {
            "tableName": "SSO_T_ROLEMENU",
            "rows": JSON.stringify(ck_rows),
            "keyField": "ROLEGUID",
            "isRefOrderNum": "1"
        }
        /*var result = YCDCommon.Ajax.syncAjax(url, params);
        if (result.isError) {
            alert(result.errMsg);
            return false;
        }*/
        alert("保存成功！");
    } else {
        alert("请选择角色设置权限！");
    }
}
