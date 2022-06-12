//=============================================================================================================================================
/**
 * 初始化操作
 * @private
 */
function init_() {
    $DS.getCtrl('TREE_左侧树').info.ds_before_loadData = 'cleanTreeBr(param)'
}

/**
 * 清除树节点名称中的换行符
 * @param param
 */
function cleanTreeBr(param) {
    debugger
    if (param?.val?.length > 0) {
        let list = $DS.util.childrenToList(param.val, 'children', [], true);
        list.forEach(item => item.NAME = item.NAME.replaceAll('<br>', ''));
        param.val = $DS.util.children(list, 'ID', 'PID', 'children');
    }
}

/**
 * 按钮加载完成事件
 */
function loadAfter_btn(info, type) {
    switch (type) {
        case 'ADD':
            let pms = $DS.getPms('leftTreePms');
            info.ds_show = (pms?.[0]?.ID == '#' || pms?.[0]?.ID == undefined) ? false : true;
            break;
        case 'EDIT':
        case 'DEL':
            let gridPms = $DS.getPms('rightGridPms');
            info.ds_show = (gridPms && gridPms.length > 0) ? true : false;
            break;
    }
}

/**
 * 新增 修改按钮点击前校验
 */
function checkBeforClickAddAndUpdate(type) {
    if (type == 'add') {
        let treePms = $DS.getPms('leftTreePms');
        if (!treePms || treePms.length == 0) {
            alert("请选择菜单分类");
            return false;
        }
    } else if (type == 'edit') {
        let gridPms = $DS.getPms('rightGridPms');
        if (!gridPms || gridPms.length == 0) {
            alert("请选择菜单");
            return false;
        }
    }
}

/**
 * 删除菜单
 * @private
 */
function deleteMenu_(dom) {

    let name = $(dom).attr('itemName');
    let menuId = $(dom).attr('menuId');
    $DS.util.confirm(window.vm, `确定删除【${name}】以及下级菜单?`, function () {
        debugger
        let delSql = `delete from SSO_T_MENUINFO where GUID in
 (select GUID from SSO_T_MENUINFO start with GUID = '${menuId}' CONNECT BY PRIOR GUID = SUPERGUID)`;
        let result = $DS.exeSql(delSql, '删除失败', '', 'PORTAL');
        if (result.isError) {
            alert(`删除失败! 失败原因:${result.errMsg}`);
            return;
        } else {
            $DS.loadCtrl('GRID_右侧表格');
            $DS.loadCtrl('TREE_左侧树');
            alert("删除成功");
        }
    }, '已取消删除')
}

/**
 * 修改菜单
 * @param dom
 */
function updateMenu(dom) {
    debugger
    let menuId = $(dom).attr("menuId");
    let url = `freeFromView.jsp?PAGEID=475242615A67448F917E2C27B87A6F99&PAGETITLE=【Z2-01】注册修改菜单&menuId=${menuId}&$type=edit`;
    $DS.showPage(url, '修改菜单', '60%', '70%');
}

