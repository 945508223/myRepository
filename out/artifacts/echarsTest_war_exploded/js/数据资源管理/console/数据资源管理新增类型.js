/**
 * 数据资源管理保存  左中右结构
 */
var type = $DS.getPms("URL_$type");
$DS.putPms("left_tree", parent.$DS.getPms("left_tree"));
$DS.getCtrl("上级编码").info.ds_defaultval = $DS.getPms("left_tree")[0].ID;
init_appName();

//初始化所属系统
function init_appName() {
    debugger
    let info = $DS.getCtrl('SELECT_所属系统').info;
    info.ds_options = [
        {"value": "TX", "label": "三保预算"},
        {"value": "GOV", "label": "政府预算"},
        {"value": "MFBI", "label": "数据仓库"},
        {"value": "DV", "label": "可视化"}
    ]
    //新增 携带所属系统
    let pTreeNode = $DS.getPms('left_tree');
    if (type == 'add' && pTreeNode[0].ID !== '#') {
        info.ds_select = pTreeNode[0].APPNAME;
    }
}

//保存
function saveType() {
    debugger
    var result = $DS.saveSource(type, "资源分类");
    if (result.isError) {
        alert(result.errMsg);
    } else {
        $DS.util.close();

        parent.$DS.clearTableSCache("SSO_T_RESOURCECAT")
        parent.$DS.loadCtrl("tree")
        parent.$DS.loadCtrl("left_tree")
        parent.alert("保存成功!")
    }
}