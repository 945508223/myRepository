/**
 * 保存目录
 */
function registerMenu() {
    debugger
    let type = $DS.getPms('URL_$type');
    let result = $DS.saveSource(type, '数据源_文档信息');
    if (result.isError) {
        alert(`保存失败:${result.errMsg}`);
        return;
    }
    parent.$DS.loadCtrl('GRID_文档列表');
    $DS.util.close();
}

/**
 * 目录弹出树加载完成事件
 * @param info
 */
function popTreeMenuLoadAfter(info) {
    if ($DS.getPms('URL_$type') == 'add' && $DS.getPms('URL_menuId')) {
        info.ds_poptree = $DS.getPms('URL_menuId');
    }
}