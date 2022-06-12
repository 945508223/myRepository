var pageInfo__ = {
    CATIDS: []
}

function init_() {
    let treeInfo = $DS.getCtrl("TREE_数据资源树").info
    treeInfo.ds_tree_check_strictly = false;
    $DS.putPms('roleType', "'2','1'");
    initTreeData_(treeInfo);
}

init_();

/**
 * 加载树数据
 * @param treeInfo
 * @private
 */
function initTreeData_(treeInfo) {
    debugger
    let year = $DS.getPms('USER_currentyear');
    let appName = $DS.getPms('URL_APPNAME');
    let catResult, sourceResult;
    if (appName) {
        catResult = $DS.selectByFormSql('PORTAL', VUECFG.pageId, 'getCat_', {APPNAME: appName, YEAR: year});
        sourceResult = $DS.selectByFormSql('PORTAL', VUECFG.pageId, 'getSourc_', {APPNAME: appName, YEAR: year});
    } else {
        //APPNAME不存在查所有
        catResult = $DS.selectByFormSql('PORTAL', VUECFG.pageId, 'getAllCat_', {APPNAME: appName, YEAR: year});
        sourceResult = $DS.selectByFormSql('PORTAL', VUECFG.pageId, 'getAllSource_', {APPNAME: appName, YEAR: year});
    }


    if (catResult.result.isError || sourceResult.result.isError) {
        alert('加载资源数据异常:' + catResult.result.isError ? catResult.result.errMsg : sourceResult.result.errMsg);
    } else {

        let sources = $DS.util.children(sourceResult.result, 'ID', 'PID', 'children');
        let cats = catResult.result;//$DS.util.children(catResult.result, 'ID', 'PID', 'children');
        for (let cat of cats) {
            let downSource = sources.filter(source => source.DSTYPE == cat.ID_);
            if (downSource && downSource.length > 0) {
                cat.children = downSource;
            }
        }
        let treeData = $DS.util.children(cats, 'ID_', 'PID_', 'children_');
        buildNewTreeData(treeData);
        treeData.forEach(node => delete node.children_);
        //
        //buildSourceGrid(treeData);
        if (treeInfo.ds_tree_rootId && treeInfo.ds_tree_rootText) {
            treeInfo.ds_tree = [{
                ISCAT: '1',
                ID: treeInfo.ds_tree_rootId,
                NAME: treeInfo.ds_tree_rootText,
                children: treeData
            }]
        } else {
            treeInfo.ds_tree = treeData;
        }

    }
}

function buildNewTreeData(cats) {

    for (let cat of cats) {
        if (cat.ISCAT == '1') {
            cat.ID = cat.ID_;
            cat.PID = cat.PID_;
            pageInfo__.CATIDS.push(cat.ID);
            if (cat.children_ && cat.children) {
                cat.children = cat.children_.concat(cat.children);
            } else if (cat.children_ && !cat.children) {
                cat.children = cat.children_;
            }
            if (cat.children_) {
                buildNewTreeData(cat.children_);
            }
        }
    }
}

function checkboxOption_(val){
    debugger
    return val.row.SOURCEOPTIONS?val.row.SOURCEOPTIONS:[]
}
/**
 * 构建表格数据
 * @param treeData
 */
function buildSourceGrid(treeData) {
    debugger
    let newData = [];
    let listTreeData = $DS.util.childrenToList(treeData, 'children', []);
    for (let node of listTreeData) {
        if (node.ISCAT == '1' || pageInfo__.CATIDS.includes(node.PID)/*||node.children*/) {
            continue;
        }
        if(!node.children){
            node.SOURCEOPTIONS = [{value:node.ID,label:node.NAME}];
            delete node.ITEMCODE;
            delete node.ITEMNAME;
        }else if (node.children && node.children.length > 0) {
            //node.children
        }
    }

    let gridInfo = $DS.getCtrl('GRID_资源目录').info;
    gridInfo.ds_grid = treeData;
}

//树节点禁用条件
function isDisable_(val) {
    debugger
    if (val.data.ISCAT == '1') {
        return true;
    } else {
        return false;
    }
}

function checkRoleTree(val) {
    debugger
    let sql = "select * from SSO_T_ROLERESOURCE where ROLEID = '" + val.GUID + "'";
    var result = $DS.selectBySql('PORTAL', sql)
    if (result.isError) {
        alert(result.errMsg)
        return
    }
    let treeInfo = $DS.getCtrl("TREE_数据资源树").info;
    treeInfo.ds_tree_check_strictly = true;
    setTimeout(function () {
        var datas = result.result;
        let ids = datas.map(item => item.RESOURCEID);
        $tree.clearCheckedNodes(treeInfo.ds_id);
        $tree.setCheckedNodes(treeInfo.ds_id, ids);
        treeInfo.ds_tree_check_strictly = false;
        treeCheckByNodes(treeInfo, ids);
    }, 10)
}


function saveRoleAndResource(obj, val) {
    debugger
    var treeInfo = $DS.getCtrl("TREE_数据资源树").info
    var gridInfo = $DS.getCtrl("GRID_角色表").info
    var sRow = $grid.getData(gridInfo.ds_id);
    if (sRow && sRow.length > 0) {
        var roleId = sRow[0].GUID
        let chkNodes = $tree.getCheckedNodes(treeInfo.ds_id);
        let halfNodes = window.top[treeInfo.ds_id + "treeRef"].getHalfCheckedNodes();
        chkNodes = chkNodes.concat(halfNodes);
        chkNodes = chkNodes.filter(node => !node.disabled);
        var insertRows = new Array();
        for (let i = 0; i < chkNodes.length; i++) {
            insertRows.push({
                "ROLEID": roleId,
                "RESOURCEID": chkNodes[i].ID,
            })
        }
        var deleteRows = new Array();
        deleteRows.push({
            "ROLEID": roleId,
        })
        var deleteData = {inserted: insertRows, updated: "", deleted: deleteRows};
        var result = $DS.saveAllTableData('SSO_T_ROLERESOURCE', 'ROLEID', deleteData, 'PORTAL');
        //var basePath = $DS.util.getProjectName();
        // var result = YCDCommon.Ajax.syncAjax(url, params)
        /*var url = basePath + "/frame/saveData";
        var params = {
            "tableName": "SSO_T_ROLERESOURCE",
            "rows": JSON.stringify(deleteData),
            "keyField": "ROLEID",
            "isRefOrderNum": "1"
        }*/
        if (result.isError) {
            alert(result.errMsg);
        } else {
            alert("保存成功!")
        }
    } else {
        alert("请选择角色！")
    }

}

/**
 * 复选框变更事件
 * @param info
 * @param val
 */
function roleCheckBoxChange(info, val) {
    let pmsStr = val.map(item => `'${item}'`);
    $DS.putPms("roleType", pmsStr.join(','));
    $DS.loadCtrl('GRID_角色表')
}

function treeCheckByNodes(obj, nodes = []) {
    let treeVal = obj.ds_tree;
    let data = getTreeNode(treeVal[0], {});
    let checkNodes = $tree.getCheckedNodes(obj.ds_id);
    if (data) {
        if (data[nodes.join("")])
            nodes.push(data[nodes.join("")]);
    }
}

function getTreeNode(nodeVal, data = {}) {
    if (!nodeVal) return;
    if (!Array.isArray(nodeVal)) nodeVal = [nodeVal];

    nodeVal.forEach(item => {
        if (item["children"]) {
            let info = new String();
            item["children"].forEach(Y => {
                info += Y["ID"];
            });
            data[info] = item["ID"];
            getTreeNode(item["children"], data);
        }
    });
    return data;
}


var colCfg = [{
    "id": "ITEMCODE",
    "prop": "ITEMCODE",
    "label": "资源编码",
    "width": "10rem",
    "perwidth": "",
    "isexpend": false,
    "expendWidth": "100%",
    "ISMERGECOL": false,
    "isedit": false,
    "fieldShowType": "input",
    "fieldType": "003",
    "align": "left",
    "bdShowFiledName": "",
    "superFieldName": "#",
    "disableddatefield": "",
    "isTitle": false,
    "level": 1
}, {
    "id": "ITEMNAME",
    "prop": "ITEMNAME",
    "label": "资源名称",
    "width": "10rem",
    "perwidth": "",
    "isedit": true,
    "fieldShowType": "input",
    "fieldType": "003",
    "align": "left",
    "superFieldName": "#",
    "isTitle": false,
    "level": 1
}, {
    "id": "SOURCE",
    "prop": "SOURCE",
    "label": "资源",
    "width": null,
    "perwidth": "",
    "isexpend": false,
    "expendWidth": "100%",
    "ISMERGECOL": false,
    "isedit": true,
    "fieldShowType": "checkbox",
    "fieldType": "006",
    "isTitle": false,
    "level": 1,
    "options": []
}, {
    "id": "PID",
    "prop": "PID",
    "label": "上级编码",
    "width": null,
    "perwidth": "",
    "isexpend": false,
    "expendWidth": "100%",
    "ISMERGECOL": false,
    "isedit": true,
    "fieldShowType": "hidden",
    "fieldType": "006",
    "isTitle": false,
    "level": 1
}, {
    "id": "ID",
    "prop": "ID",
    "label": "ID",
    "width": null,
    "perwidth": "",
    "isexpend": false,
    "expendWidth": "100%",
    "ISMERGECOL": false,
    "isedit": true,
    "fieldShowType": "hidden",
    "fieldType": "006",
    "isTitle": false,
    "level": 1
}]



    [{"value":1,"text":"公共角色"},{"value":1,"text":"私有角色"}]