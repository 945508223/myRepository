debugger
var saveType = $DS.getPms("URL_$type");
$DS.putPms("p_grid", parent.$DS.getPms("p_grid"));
$DS.putPms("p_tree",parent.$DS.getPms("p_tree"));
$DS.putPms("left_tree",parent.$DS.getPms("left_tree"));
$DS.getCtrl("资源类型").info.ds_defaultval = $DS.getPms("left_tree")[0].ID;
/**
 * 资源数据管理保存   (注册报表)
 */
function saveData() {
    debugger
    $DS.getCtrl("所属系统").info.ds_input = VUECFG.appId;
    var result=$DS.saveSource(saveType,"数据资源表");
    if(result.isError){
        alert(result.errMsg);
    }else{
        $DS.util.close();
        parent.$DS.clearTableSCache("SSO_T_DATARESOURCE")
        parent.$DS.loadCtrl("grid")
        parent.$DS.loadCtrl("tree")
        //注册报表同时 修改报表所属资源
        parent.updateOriginalSource(result.result.rowObj,$DS.getPms('left_tree')[0].ID);
        parent.alert("保存成功!")
    }
}

