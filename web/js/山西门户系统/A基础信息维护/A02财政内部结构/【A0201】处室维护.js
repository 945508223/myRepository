/**
 * 通用删除/启用/保存
 * @param type
 * @param succeccMsg
 * @param errMsg
 */
function execForChuShiInfo(fieldName, value, succeccMsg, errMsg) {
    debugger
    var chuShirRow = $DS.getPms("P_GRID");
    if (!chuShirRow || chuShirRow.length == 0) {
        alert("请选择一行!")
    } else {
        var result = $DS.setFlagById("BAS_MOF_DEP", fieldName, value, chuShirRow[0].GUID, "1", VUECFG.appId);
        if (result.isError) {
            alert(result.errMsg)
        } else {
            $grid.clearCheckedNode($DS.getCtrl("GRID_区划表格").info.ds_id)
            $DS.clearTableSCache("BAS_MOF_DEP,SSO_V_PUBDEPARTMENT");
            $DS.loadCtrl("GRID_区划表格")
            alert(succeccMsg)
        }
    }
}