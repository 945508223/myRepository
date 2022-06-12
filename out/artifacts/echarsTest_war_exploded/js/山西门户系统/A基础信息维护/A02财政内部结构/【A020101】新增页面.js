debugger

var saveType = $DS.getPms("URL_$type");
$DS.putPms("P_TREE", parent.$DS.getPms("P_TREE"));
$DS.putPms("P_GRID", parent.$DS.getPms("P_GRID"));
/**
 * 保存处室信息
 */

/*function saveChuShiInfo() {
    debugger
    var result=$DS.saveSource(saveType,"DS_处室列表",null,null,{},"","1");
    if(result.isError){
        alert(result.errMsg);
    }else{
        $DS.util.close();
        parent.$grid.clearCheckedNode($DS.getCtrl("GRID_区划表格").info.ds_id)
        parent.$DS.clearTableSCache("BAS_MOF_DEP");
        parent.$DS.loadCtrl("GRID_区划表格");
        parent.alert("保存成功!");
    }
}*/
/**
 * 计算上级编码
 */
function getUpDivCode() {
    var treeNode = $DS.getPms("P_TREE");
    return (treeNode[0].ISADMDIV == "1") ? "#" : treeNode[0].ITEMCODE;
}

function saveChuShiInfo() {
    debugger
    let source = $DS.getSource("DS_处室列表2");
    var fieldMap = source.fieldMap;
    let saveData = {};
    for (var key in fieldMap) {
        var value = $DS.getValById(fieldMap[key]);
        saveData[key] = value;
    }

   // let saveData = $DS.util.clone(sourceData);
    let uuid = $DS.util.UUID().replaceAll("-", "").toUpperCase();
    if (saveType == "add") {
        saveData.GUID = uuid;
        saveData.MOF_DEP_ID = uuid;
    }
    saveData.BIZ_KEY = uuid;//业务唯一标识
    saveData.MOF_DEP_CODE = saveData.ITEMCODE;//内部机构代码
    saveData.MOF_DEP_NAME = saveData.ITEMNAME;//内部机构名称
    saveData.MOF_DIV_CODE = $DS.getPms("P_TREE")[0].ITEMCODE;//财政区划代码
    saveData.PARENT_ID = getUpDivCode();//父级节点主键
    saveData.LEVEL_NO = saveData.LEVELS;
    saveData.IS_LEAF = saveData.ENDFLAG;

    let result = $DS.saveTable(VUECFG.appId, saveType, saveData, "BAS_MOF_DEP", "GUID");
    if (result.isError) {
        alert(result.errMsg);
    } else {
        $DS.util.close();
        parent.$grid.clearCheckedNode($DS.getCtrl("GRID_区划表格").info.ds_id);
        parent.$DS.clearTableSCache("BAS_MOF_DEP");
        parent.$DS.loadCtrl("GRID_区划表格");
        parent.alert("保存成功!");
    }
}