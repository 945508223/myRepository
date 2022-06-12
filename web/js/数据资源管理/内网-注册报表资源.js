//父页面选中的报表数据
let checkedRow = $DS.getPms('URL_NOTLIKE') == 'TASK' ? parent.$DS.getPms('P_RPTMD')[0] : parent.$DS.getPms('SUPERTASKID')[0];
let regType = $DS.getPms('URL_NOTLIKE') == 'TASK' ? 'RPT' : 'TASK';
let pageInfo_ = {
    oldPermission: '',//原始权限
    oldDStype: '',//原始资源分类
    oldSourceId: '', //原始资源id
    nameObj:{"ADD":'新增',"UPDATE":"修改","DEL":"删除"}
}

//初始化
function init_() {
    debugger
    //设置多选数据 回显勾选
    let checkBox = $DS.getCtrl('CHECKBOX_资源权限').info;
    checkBox.ds_options = [
        {"value": "ADD", "text": "新增"},
        {"value": "UPDATE", "text": "修改"},
        {"value": "DEL", "text": "删除"}];

    let sql = `select GUID,DSTYPE,ITEMCODE,ITEMNAME from SSO_T_DATARESOURCE where DSGUID = '${checkedRow.GUID}'`;
    let source = $DS.selectBySql('PORTAL', sql);
    if (source.isError) {
        alert('获取资源信息失败');
        console.error(source.errMsg);
        return false;
    }
    source = source.result;
    if (source.length > 0) {
        checkBox.ds_checkbox = source.map(item => {
            let type = item.ITEMCODE.split('_')[item.ITEMCODE.split('_').length - 1];
            if (!pageInfo_.oldSourceObj) pageInfo_.oldSourceObj = {};
            if (type && (type == 'ADD' || type == 'UPDATE' || type == 'DEL')) {
                pageInfo_.oldSourceObj[type] = $DS.util.clone(item);
                return type;
            } else {
                pageInfo_.oldSourceId = item.GUID;
                pageInfo_.oldSourceObj.parent = $DS.util.clone(item);
                return ''
            }
        })

    }


    pageInfo_.oldDStype = source[0] && source[0].DSTYPE ? source[0].DSTYPE : '';
    pageInfo_.oldPermission = checkBox.ds_checkbox.filter(item => item != '');
    //let treeInfo = $DS.getCtrl('TREE_资源分类树').info;
    //treeInfo.ds_tree_current_node_key = pageInfo_.oldDStype;
    //treeInfo.ds_tree_default_expanded_keys = [pageInfo_.oldDStype]
}

//初始化
init_();


//设置选中
function treeLoadAfter(info) {
    //info.ds_tree_default_expanded_keys = [pageInfo_.oldDStype]
    $tree.setCurrentNode(info.ds_id, pageInfo_.oldDStype);

}

//注册资源
function registerSource() {
    debugger
    //资源分类
    let tree = $DS.getCtrl('TREE_资源分类树').info;
    let checkNode = $tree.getCurrentNode(tree.ds_id);
    //资源权限
    let permission = $DS.getCtrl('CHECKBOX_资源权限').info.ds_checkbox.filter(item => item != '');
    if (!checkNode) {
        alert('请选择分类');
        return false;
    }
    /*if (checkNode.NAME.indexOf('任务') == -1 && checkNode.NAME.indexOf('报表') == -1) {
        alert('当前分类不可选!');
        return false;
    }*/
    //未做修改
    if (checkNode.GUID == pageInfo_.oldDStype && JSON.stringify(permission) == JSON.stringify(pageInfo_.oldPermission)) {
        $DS.util.close();
        return true;
    }

    let changeDSType = false;
    if (checkNode.GUID != pageInfo_.oldDStype) {
        changeDSType = true;
    }
    let actionType = getChildSourceActionType(permission, changeDSType);
    let saveData = {inserted: [], updated: [], deleted: []};
    //新增资源
    if (!pageInfo_.oldSourceId) {
        let newSource = {
            GUID: $DS.util.UUID().replaceAll("-", "").toUpperCase(),
            SUPERGUID: '#',
            DSTYPE: checkNode.GUID,
            DSGUID: checkedRow.GUID,
            ITEMCODE: regType == 'RPT' ? checkedRow.ITEMCODE : checkedRow.TASKNO,
            ITEMNAME: regType == 'RPT' ? checkedRow.ITEMNAME : checkedRow.TASKNAME,
            REMARK: regType == 'RPT' ? checkedRow.RPTDESC : checkedRow.REMARK
        }
        saveData.inserted.push(newSource);
        if (regType == 'RPT')
            saveData = getChildSource(newSource, actionType, saveData);
    } else {
        if (changeDSType) {
            pageInfo_.oldSourceObj.parent.DSTYPE = checkNode.GUID;
            saveData.updated.push(pageInfo_.oldSourceObj.parent);
        }
        if (regType == 'RPT')
            saveData = getChildSource(pageInfo_.oldSourceObj.parent, actionType, saveData);
    }
    let res = $DS.saveAllTableData('SSO_T_DATARESOURCE', 'GUID', saveData, 'PORTAL');
    if (res.isError) {
        alert(res.errMsg ? res.errMsg : '注册失败')
    } else {
        $DS.util.close();
        if (saveData.deleted.length > 0) {
            //删除角色对资源
            deleteRole_Source(saveData.deleted);
        }
        //修改父页面记录对象
        if(parent.pageInfo_&&parent.pageInfo_.isRegistedObj){
            parent.pageInfo_.isRegistedObj[checkedRow.GUID] = true;
            parent.$DS.putPms('regType', 'cancle');
            parent.$DS.getCtrl('BUTTON_注册资源').info.ds_button = '取消注册';
        }
        parent.alert('注册成功')
    }
}


//获取下级资源修改方式
/**
 *
 * @param permission 勾选的权限 是否修改资源分类字段
 * @param changeDSType
 * @returns {{add: string, update: string, del: string}}
 */
function getChildSourceActionType(permission, changeDSType) {
    let actionObj = {
        ADD: '',
        UPDATE: '',
        DEL: ''
    };
    //全部新增
    if (!pageInfo_.oldPermission || pageInfo_.oldPermission.length == 0 || !pageInfo_.oldSourceId) {
        for (let per of permission) {
            actionObj[per] = 'ADD';
        }
        return actionObj;
    }

    //修改
    for (let per of permission) {
        //原始不存在 新增
        if (pageInfo_.oldPermission.indexOf(per) == -1) {
            actionObj[per] = 'ADD'
        } else if (pageInfo_.oldPermission.indexOf(per) !== -1 && changeDSType) {
            actionObj[per] = 'UPDATE'
        }
    }
    //删除
    for (let oldPer of pageInfo_.oldPermission) {
        if (permission.indexOf(oldPer) == -1) {
            actionObj[oldPer] = 'DEL'
        }
    }
    return actionObj;
}


//根据父级资源获取下级资源
/**
 *
 * @param pSource 父级资源
 * @param actionType 资源权限
 */
function getChildSource(pSource, actionType, saveData) {
    debugger
    for (let key in actionType) {
        let action = actionType[key]
        if (action == 'ADD') {
            let child = $DS.util.clone(pSource);
            child.GUID = $DS.util.UUID().replaceAll("-", "").toUpperCase();
            child.SUPERGUID = pSource.GUID;
            child.ITEMCODE = pSource.ITEMCODE + '_' + key.toUpperCase();
            child.ITEMNAME = pageInfo_.nameObj[key];
            saveData.inserted.push(child);
        } else if (action == 'UPDATE') {
            let child = pageInfo_.oldSourceObj[key];
            child.DSTYPE = pSource.DSTYPE;
            saveData.updated.push(child);
        } else if (action == 'DEL') {
            saveData.deleted.push(pageInfo_.oldSourceObj[key]);
        }
    }
    return saveData
}

/**
 * 删除角色对资源
 * @param delRow
 */
function deleteRole_Source(delRow) {
    debugger
    let delRowIds = delRow.map(item => `'${item.GUID}'`);
    let delRoleSql = `delete from SSO_T_ROLERESOURCE where RESOURCEID in (${delRowIds.join(',')})`;
    let res = $DS.exeSqls(delRoleSql, 'PORTAL');
    if (res.isError) {
        console.error(res.errMsg ? res.errMsg : '删除角色对资源失败!');
    }
}