function checkAdd_edit(type) {
    if(type=="add"){
        let tree = $DS.getCtrl("TREE_区划列表").info;
        let curNode = $tree.getCurrentNode(tree.ds_id);
        if (!curNode) {
            alert("请选择区划");
            return false;
        }
    }else {
        let grid = $DS.getCtrl("GRID_区划表格").info;
        let curNode = $grid.getCheckedNodes(grid.ds_id);
        if (!curNode||(curNode&&curNode.length==0)) {
            alert("请选择修改的数据");
            return false;
        }
    }

}

function edit_Admviv(type) {
    debugger
    let dealField = '';
    let msg = '';
    switch (type) {
        case 'del':
            dealField = 'IS_DELETED';
            msg = '删除';
            break;
        case 'open':
            dealField = 'IS_ENABLED';
            msg = '启用';
            break;
        case 'close' :
            dealField = 'IS_ENABLED';
            msg = '禁用';
            break
    }
    let grid = $DS.getCtrl("GRID_区划表格").info;
    let curData = $grid.getCheckedNodes(grid.ds_id);
    if (!curData || (curData && curData.length == 0)) {
        alert(`请选择要${msg}的区划`);
        return;
    }
    let delItem = {GUID: curData[0].GUID};
    delItem[dealField] = type === "close" ? "0" : "1";
    if (type == 'del') {
        $DS.util.confirm(window.vm, `确定${msg}【${curData[0].ITEMNAME}】`, function (vue, data) {
            debugger
            let curData = data.curData;
            let delItem = data.delItem;
            edit(curData, delItem);
        }, "已取消删除", {curData: curData, delItem: delItem})
    } else {
        edit(curData, delItem);
    }

    function edit(curData, delItem) {
        let result = $DS.saveTable(VUECFG.appId, "edit", delItem, "BAS_MOF_DIV", "GUID");
        if (result.isError) {
            alert(`${msg}失败,失败原因${result.errMsg}`);
            return
        } else {
            alert(`${msg}成功`);
            $DS.loadCtrl("GRID_区划表格");
        }
    }


}


[{"value":"0","text":"标准代码集"},{"value":"1","text":"扩展代码集"}]