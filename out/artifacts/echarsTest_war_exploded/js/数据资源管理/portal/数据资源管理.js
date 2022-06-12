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
            $grid.clearCheckedNode($DS.getCtrl("grid").info.ds_id);
            $DS.clearTableSCache("SSO_T_DATARESOURCE");
            $DS.loadCtrl("grid")
            $DS.loadCtrl("tree")
            // 修改 任务或报表的所属资源
            updateOriginalSource(dataRow[0]);
            //删除角色对资源中数据
            deleteSourceForRole(dataRow[0]);
            alert(succeccMsg)
        }
    }, "已取消删除", {dataRow: dataRow})
}


function deleteType(fileName, value, successMsg, errMsg) {
    debugger
    var node = $DS.getPms("left_tree");
    if (!node || node.length == 0) {
        alert("请选择分类")
        return;
    }
    $DS.util.confirm(window.vm, `确定删除【${node[0].ITEMNAME}】`, function (vue, data) {
        debugger
        var sql = `delete from SSO_T_DATARESOURCE where DSTYPE IN (select GUID from SSO_T_RESOURCECAT t start with t.GUID = '${node[0].GUID}' connect by prior t.GUID = t.SUPERGUID)`;
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
            var sql = `delete from SSO_T_RESOURCECAT where GUID IN (select GUID from SSO_T_RESOURCECAT t start with t.GUID = '${node[0].GUID}' connect by prior t.GUID = t.SUPERGUID)`;
            var params = {
                sql: sql,
                dbSource: ""
            }
            result = YCDCommon.Ajax.syncAjax(url, params);
            if (result.isError) {
                alert(result.errMsg)
            } else {
                $DS.clearTableSCache("SSO_T_RESOURCECAT");
                $DS.loadCtrl("tree");
                $DS.getCtrl("tree").info.ds_tree_rootText = ""
                $DS.loadCtrl("grid");
                $DS.loadCtrl("left_tree");
                alert(successMsg);
            }
        }
    })

}

function cli(node) {
    debugger
    if (node.ITEMCODE.indexOf('TASK') !== -1) {
        $DS.getCtrl("注册报表").info.ds_show = false
        $DS.getCtrl("注册任务").info.ds_show = true
    } else if (node.ITEMCODE.indexOf('REPORT') !== -1) {
        $DS.getCtrl("注册报表").info.ds_show = true
        $DS.getCtrl("注册任务").info.ds_show = false
    } else {
        $DS.getCtrl("注册报表").info.ds_show = false
        $DS.getCtrl("注册任务").info.ds_show = false
    }
    var sql = `select * from SSO_T_RESOURCECAT t  start with t.guid ='${$DS.getPms("left_tree")[0].GUID}' connect by prior t.superguid = t.guid`;
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

    /*for (let i = 0; i < result.result.length; i++) {
        //if(result.result[i].SUPERGUID == '#'){
        if(result.result[i].ITEMNAME.indexOf("任务") != -1 ){
            $DS.getCtrl("注册报表").info.ds_show = false
            $DS.getCtrl("注册任务").info.ds_show = true
        }else{
            $DS.getCtrl("注册报表").info.ds_show = true
            $DS.getCtrl("注册任务").info.ds_show = false
        }
        //}
    }*/

}

//修改原始资源 所属资源
function updateOriginalSource(data, type) {
    debugger
    let left_treeNode = $DS.getPms('left_tree')[0];
    let tableName, fieldName;
    //修改任务所属资源
    if (left_treeNode.ITEMCODE.indexOf('TASK') != -1) {
        tableName = 'RURAL_TASK_INFO';
        fieldName = 'DSTYPE';
    }
    //修改报表所属资源
    else if (left_treeNode.ITEMCODE.indexOf('REPORT') != -1) {
        tableName = 'RPT_T_REPORTTEMPLET';
        fieldName = 'DSTYPE';
    }
    if (tableName && fieldName && data.DSGUID) {
        let sql = `update ${tableName} set ${fieldName} = '${type ? type : ''}' where GUID = '${data.DSGUID}'`;
        let result = $DS.exeSql(sql);
        if (result.isError) {
            console.error(result.errMsg ? result.errMsg : '修改原始资源失败!');
        }
    }
}

//删除角色对资源中的数据
function deleteSourceForRole(data) {
    debugger
    let sql =`delete from SSO_T_ROLERESOURCE where RESOURCEID = '${data.GUID}'`;
    let res = $DS.exeSql(sql,'','','PORTAL');
    if(res.isError){
        console.error(res.errMsg?res.errMsg:'删除角色资源失败!')
    }
}