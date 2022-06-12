$DS.getCtrl('SELECT_所属系统').info.ds_options = [{"value":"TX","label":"三保预算"},{"value":"GOV","label":"政府预算"},{"value":"MFBI","label":"数据仓库"},{"value":"DV","label":"可视化"}]

/**
 * 数据资源管理保存  左中右结构
 */
var type = $DS.getPms("URL_$type");
$DS.putPms("left_tree",parent.$DS.getPms("left_tree"));
$DS.getCtrl("上级编码").info.ds_defaultval = $DS.getPms("left_tree")[0].ID;
function saveType(){
    debugger
    var result = $DS.saveSource(type,"资源分类");
    if(result.isError){
        alert(result.errMsg);
    }else{
        $DS.util.close();

        parent.$DS.clearTableSCache("SSO_T_RESOURCECAT")
        parent.$DS.loadCtrl("tree")
        parent.$DS.loadCtrl("left_tree")
        parent.alert("保存成功!")
    }

}