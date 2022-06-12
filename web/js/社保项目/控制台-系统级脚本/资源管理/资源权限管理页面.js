function deleteData(fieldName, value, succeccMsg, errMsg) {
    debugger
    var dataRow = $DS.getPms("p_grid");
    if (!dataRow || dataRow.length == 0) {
        alert("请选择一行!")
        return;
    }
    $DS.util.confirm(window.vm, `确定删除【${dataRow[0].ITEMNAME}】`, function (vue, data) {
        debugger
        //var sql = `delete from SSO_T_DATARESOURCE where GUID = '${dataRow[0].GUID}' or SUPERGUID = '${dataRow[0].GUID}'`;
        var sql = `delete from SSO_T_DATARESOURCE  where GUID IN (select GUID from SSO_T_DATARESOURCE t start with t.GUID = '${dataRow[0].GUID}' connect by prior t.guid = t.SUPERGUID)`;
        var params = {
            sql: sql,
            dbSource: ""
        }
        var basePath = $DS.util.getProjectName();
        var url = basePath + "/sysconfig/frame/execBySql";
        var result = YCDCommon.Ajax.syncAjax(url, params);

        if (result.isError) {
            alert(result.errMsg)
        } else {
            $grid.clearCheckedNode($DS.getCtrl("grid").info.ds_id)
            $DS.clearTableSCache("SSO_T_DATARESOURCE");
            $DS.loadCtrl("grid")
            $DS.loadCtrl("tree")
            alert(succeccMsg)
        }
    }, "已取消删除", {dataRow: dataRow})
}


//删除分类
function deleteType(fileName, value, successMsg, errMsg) {
    debugger
    var node = $DS.getPms("left_tree");
    if (!node || node.length == 0) {
        alert("请选择分类")
        return;
    }
    $DS.util.confirm(window.vm, `确定删除【${node[0].ITEMNAME}】`, function (vue, data) {
        debugger
        var delRole = `delete from SSO_T_ROLERESOURCE where RESOURCEID IN (select GUID from SSO_T_DATARESOURCE where DSTYPE in (select GUID from SSO_T_RESOURCECAT t start with t.GUID = '${node[0].GUID}' connect by prior t.GUID = t.SUPERGUID))`;
        var delSourceSql = `delete from SSO_T_DATARESOURCE where DSTYPE IN (select GUID from SSO_T_RESOURCECAT t start with t.GUID = '${node[0].GUID}' connect by prior t.GUID = t.SUPERGUID)`;
        var delCatSql = `delete from SSO_T_RESOURCECAT where GUID IN (select GUID from SSO_T_RESOURCECAT t start with t.GUID = '${node[0].GUID}' connect by prior t.GUID = t.SUPERGUID)`;
        let result = $DS.exeSqls(delRole + ";" + delSourceSql + ";" + delCatSql, 'PORTAL');
        if (result.isError) {
            alert(result.errMsg ? result.errMsg : '删除失败');
            return false;
        } else {
            $DS.clearTableSCache("SSO_T_RESOURCECAT");
            $DS.loadCtrl("tree");
            $DS.getCtrl("tree").info.ds_tree_rootText = "";
            $DS.loadCtrl("grid");
            $DS.loadCtrl("left_tree");
            alert(successMsg);
        }
    })
}

function cli() {
    debugger
    var sql = `select * from SSO_T_RESOURCECAT t  start with t.guid ='${$DS.getPms("left_tree")[0].ID}' connect by prior t.superguid = t.guid`;
    var params = {
        sql: sql
    }
    var basePath = "/console_portal"
    var url = basePath + "/sysconfig/frame/selectBySql";
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (result.isError) {
        console.log(result.errMsg);
        return;
    }
}


//删除角色对资源中的数据
function deleteSourceForRole(data) {
    debugger
    let sql = `delete from SSO_T_ROLERESOURCE where RESOURCEID in(select GUID from SSO_T_DATARESOURCE t start with t.GUID = '${data.GUID}' connect by prior t.guid = t.SUPERGUID)`;
    let res = $DS.exeSql(sql, '', '', 'PORTAL');
    if (res.isError) {
        console.error(res.errMsg ? res.errMsg : '删除角色资源失败!');
        return false;
    }
    return true;
}


/**
 * 右键菜单事件
 * @param type
 * @param row
 * @param col
 */
function dealSourceByContext(type, row, col) {
    debugger
    let gridVm = $grid.getGridVmByName('grid');
    switch (type) {
        case 'insertedSource':
            insertSource(row, col, gridVm);
            break
        case 'deletedSource':
            deletedSource(row, col, gridVm);
            break;
    }
}

//新增资源
function insertSource(row, col, gridVm) {

    if (row.level_ == 1) {
        let menuRef = gridVm.$refs.rowcontextmenuRef;
        $DS.putPms('INSERT_DSGUID', row.DSGUID);
        $DS.putPms('INSERT_DSTYPE', row.DSTYPE)
        menuRef.rowContextmenu_insert(row, col, 'childInsert');
        setTimeout(() => {
            $DS.delPms('INSERT_DSGUID')
            $DS.delPms('INSERT_DSTYPE')
        }, 200)
    }

}

/*
删除前 删除角色对资源
 */
function beforeSave_() {
    let ctrl = $DS.getCtrl('grid').info;
    let editData = $grid.getEditRows(ctrl.ds_id);
    if (editData.deleted.length > 0) {
        let deletedIds = editData.deleted.map(item=>`'${item.GUID}'`);
        var delRole = `delete from SSO_T_ROLERESOURCE where RESOURCEID IN (${deletedIds.join(',')})`;
        let res = $DS.exeSql(delRole,null,null,'PORTAL');
        if(res.isError){
            alert('删除角色对资源失败:'+res.errMsg);
            return false;
        }
    }
}


//删除资源
function deletedSource(row, col, gridVm) {
    /*if (row.level_ != 1) {
        $grid.deleteRow(gridVm.info.ds_id, 'menu', [row]);
    }*/
    $grid.deleteRow(gridVm.info.ds_id, 'menu', [row]);
}