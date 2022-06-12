debugger
$DS.putPms("P_ADMDIV", parent.$DS.getPms("P_ADMDIV"));


//设置行为可编辑状态
function updateGrid_Role() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_区划表格").info;
    let checkedNode = $grid.getCheckedNodes(gridInfo.ds_id);
    if (!checkedNode || (checkedNode && checkedNode.length == 0)) {
        alert("请选择要修改的数据");
        return;
    }
    if (!checkedNode[0].optType) {
        checkedNode[0].optType = "updated";
    }
    $grid.setOneRowData(gridInfo.ds_id, checkedNode[0].index, checkedNode[0]);
}

//修改某条数据某个字段
function execForRoleInfo(fieldName, value, succeccMsg, errMsg) {
    debugger
    let gridInfo = $DS.getCtrl("GRID_区划表格").info;
    let checkedNode = $grid.getCheckedNodes(gridInfo.ds_id);
    if (!checkedNode || checkedNode.length == 0) {
        alert("请选择要修改的数据!")
    } else {
        var result = setFlagById_role("SSO_T_ROLEINFO", fieldName, value, checkedNode[0].GUID, "1", VUECFG.appId);
        if (result.isError) {
            alert(result.errMsg)
        } else {
            $grid.clearCheckedNode($DS.getCtrl("GRID_区划表格").info.ds_id);
            $DS.clearTableSCache("SSO_T_ROLEINFO,SSO_V_ROLEINFO");
            $DS.loadCtrl("GRID_区划表格");
            alert(succeccMsg)
        }
    }
}


/**
 * 保存
 */
function saveGrid_role() {
    debugger
    let treeData = $DS.getPms("P_ADMDIV")[0];
    let gridInfo = $DS.getCtrl("GRID_区划表格").info;
    let editData = $grid.getEditRows(gridInfo.ds_id);
    let saveData = {inserted: [], updated: [], deleted: []};
    for (let key in editData) {
        for (let row of editData[key]) {
            let newRow = {};
            newRow.GUID = row.GUID;
            newRow.ROLECODE = row.ITEMCODE;
            newRow.ROLENAME = row.ITEMNAME;
            newRow.ROLETYPE = row.ROLETYPE;
            newRow.STATUS = row.STATUS;
            newRow.REMARK = row.REMARK;
            newRow.IS_PUBROLE = row.IS_PUBROLE;
            newRow.ADMDIV = treeData.GUID;//ADMDIV
            newRow.AGENCY = treeData.GUID;
            ;//单位ID
            newRow.PROVINCE = treeData.ITEMCODE;//所属区划编码
            saveData[key].push(newRow);
        }
    }

    let result = $DS.saveAllTableData("SSO_T_ROLEINFO", "GUID", saveData);
    if (result.isError) {
        alert(result.errMsg)
    } else {
        $grid.clearCheckedNode($DS.getCtrl("GRID_区划表格").info.ds_id);
        $DS.clearTableSCache("SSO_T_ROLEINFO,SSO_V_ROLEINFO");
        $DS.loadCtrl("GRID_区划表格");
        alert("保存成功")
    }
}


function setFlagById_role(tableName, fieldName, value, guids, isCascade, appId) {
    if (!appId) appId = VUECFG.appId;
    var saveResult = {
        isError: false,
        result: [],
        errMsg: ""
    };
    var result = YCDCommon.Ajax.syncAjax($DS.util.getProjectName(appId) + "/frame/setFlagById", {
        "tableName": tableName,
        "fieldName": fieldName,
        "value": value,
        "guids": guids,
        "isCascade": isCascade
    });
    if (result.isError) {
        saveResult = result
    } else {
        saveResult.result = result.result;
    }
    return saveResult;
}