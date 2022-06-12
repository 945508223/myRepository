let pageInfo_checkRpt = {
    treeId :''
}
//加载数据 以及初始化选中
function initData(info) {
    debugger
    pageInfo_checkRpt.treeId = info.ds_id;
    info.ds_tree = [{ID:'#',NAME:'全部',children : window.top.batchExportRpt}];
    setTimeout(function () {
        if (window.top.checkedExportRpt && window.top.checkedExportRpt.length > 0) {
            $tree.setCheckedNodes(info.ds_id, window.top.checkedExportRpt.map(item=>item.ID));
        }
    })
}

//确定按钮
function sureCheckExportRpt() {
    debugger
    let nodes = $tree.getCheckedNodes(pageInfo_checkRpt.treeId);
    nodes = nodes.filter(item=>item.ID!='#');
    window.top.checkedExportRpt = nodes;
    $DS.util.close()
}


