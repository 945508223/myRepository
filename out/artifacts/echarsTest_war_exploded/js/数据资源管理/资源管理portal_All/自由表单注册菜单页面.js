let type = $DS.getPms('URL_type');//修改 新增
let menuId = $DS.getPms('URL_menuId');//菜单id

//初始化类型 如果menuId 存在 但是GUID不存在 则修改type为新增
function initType(info) {
    if (!info.ds_input) type = 'add';
    delete parent.VUECFG.menuId;
}


//注册菜单
function registerMenu() {
    debugger
    var result = $DS.saveSource(type, "DS_注册菜单");
    if (result.isError) {
        alert(result.errMsg);
    } else {
        $DS.util.close();
        parent.VUECFG.menuId = result.result.rowObj.GUID;
        parent.alert('注册成功,请保存页面!');
    }
}