debugger
//父页面选中的报表数据
let checkedRow__ = $DS.getPms('URL_NOTLIKE') == 'TASK' ? parent?.$DS?.getPms('P_RPTMD')?.[0] : parent?.$DS?.getPms('SUPERTASKID')?.[0];
let regType__ = $DS.getPms('URL_NOTLIKE') == 'TASK' ? 'RPT' : 'TASK';
/*let pageInfo__C = {
    oldPermission: '',//原始权限
    oldDStype: '',//原始资源分类
    oldSourceId: '', //原始资源id
    nameObj: {"ADD": '新增', "UPDATE": "修改", "DEL": "删除"}
}*/

//初始化
function init__() {
    debugger
    //设置多选数据 回显勾选
    let checkBox = $DS.getCtrl('CHECKBOX_资源权限').info;
    checkBox.ds_options = [
        {"value": "ADD", "text": "新增"},
        {"value": "UPDATE", "text": "修改"},
        {"value": "DEL", "text": "删除"}];
    if (!checkedRow__) {
        return
    }
    /* let sql = `select GUID,DSTYPE,ITEMCODE,ITEMNAME from SSO_T_DATARESOURCE where DSGUID = '${checkedRow__.GUID}'`;
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
             if (!pageInfo__C.oldSourceObj) pageInfo__C.oldSourceObj = {};
             if (type && (type == 'ADD' || type == 'UPDATE' || type == 'DEL')) {
                 pageInfo__C.oldSourceObj[type] = $DS.util.clone(item);
                 return type;
             } else {
                 pageInfo__C.oldSourceId = item.GUID;
                 pageInfo__C.oldSourceObj.parent = $DS.util.clone(item);
                 return ''
             }
         })

     }


     pageInfo__C.oldDStype = source[0] && source[0].DSTYPE ? source[0].DSTYPE : '';
     pageInfo__C.oldPermission = checkBox.ds_checkbox.filter(item => item != '');*/
    //let treeInfo = $DS.getCtrl('TREE_资源分类树').info;
    //treeInfo.ds_tree_current_node_key = pageInfo__C.oldDStype;
    //treeInfo.ds_tree_default_expanded_keys = [pageInfo__C.oldDStype]
}

//初始化
init__();


//设置选中
function treeLoadAfter(info) {
    //info.ds_tree_default_expanded_keys = [pageInfo__C.oldDStype]
    // $tree.setCurrentNode(info.ds_id, pageInfo__C.oldDStype);

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

    //判断该分类下是否已经存在该资源
    let checkSql = `select COUNT(*) AS CNT from SSO_T_DATARESOURCE WHERE DSGUID = '${checkedRow__.GUID}' and DSTYPE = '${checkNode.GUID}';`
    let checkResult = $DS.selectBySql('PORTAL', checkSql);
    if (checkResult.isError) {
        alert('校验失败:' + checkResult.errMsg);
        return;
    } else if (checkResult.result[0].CNT > 0) {
        alert('该分类下已存在该资源!');
        return;
    }

    let saveData = {inserted: [], updated: [], deleted: []};
    //新增资源

    let newSource = {
        GUID: $DS.util.UUID().replaceAll("-", "").toUpperCase(),
        SUPERGUID: '#',
        DSTYPE: checkNode.GUID,
        DSGUID: checkedRow__.GUID,
        ITEMCODE: regType == 'RPT' ? checkedRow__.ITEMCODE : checkedRow__.TASKNO,
        ITEMNAME: regType == 'RPT' ? checkedRow__.ITEMNAME : checkedRow__.TASKNAME,
        REMARK: regType == 'RPT' ? checkedRow__.RPTDESC : checkedRow__.REMARK,
        YEAR: $DS.getPms('USER_currentyear'),
        APPID: $DS.getPms('URL_SYSNAME')
    }
    saveData.inserted.push(newSource);
    //注册资源 将模板资源全部注册
    addSourceByModel(newSource, saveData);
    let res = $DS.saveAllTableData('SSO_T_DATARESOURCE', 'GUID', saveData, 'PORTAL');
    if (res.isError) {
        alert(res.errMsg ? res.errMsg : '注册失败');
    } else {
        $DS.util.close();
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
    if (!pageInfo__C.oldPermission || pageInfo__C.oldPermission.length == 0 || !pageInfo__C.oldSourceId) {
        for (let per of permission) {
            actionObj[per] = 'ADD';
        }
        return actionObj;
    }

    //修改
    for (let per of permission) {
        //原始不存在 新增
        if (pageInfo__C.oldPermission.indexOf(per) == -1) {
            actionObj[per] = 'ADD'
        } else if (pageInfo__C.oldPermission.indexOf(per) !== -1 && changeDSType) {
            actionObj[per] = 'UPDATE'
        }
    }
    //删除
    for (let oldPer of pageInfo__C.oldPermission) {
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
            child.ITEMNAME = pageInfo__C.nameObj[key];
            saveData.inserted.push(child);
        } else if (action == 'UPDATE') {
            let child = pageInfo__C.oldSourceObj[key];
            child.DSTYPE = pSource.DSTYPE;
            saveData.updated.push(child);
        } else if (action == 'DEL') {
            saveData.deleted.push(pageInfo__C.oldSourceObj[key]);
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


/**
 *将资源模板插入
 */
function addSourceByModel(rowObj, saveData) {
    debugger
    try {
        let year = $DS.getPms('USER_currentyear');
        let r_ = $DS.selectBySql('PORTAL', `select * from SSO_T_DATARESOURCEMODEL where SOURCETYPE='R' and YEAR ='${year}' `);
        if (r_.isError) {
            console.error('添加资源失败!');
            return saveData;
        } else {
            let models = r_.result;
            if (models.length == 0) {
                return saveData;
            }

            models.forEach(model => {
                let source = {};
                source.DSGUID = rowObj.DSGUID;
                source.DSTYPE = rowObj.DSTYPE;
                source.ADMDIVCODE = '*';
                source.STATUS = '1';
                source.SUPERGUID = rowObj.GUID;
                source.ITEMCODE = model.ITEMCODE;
                source.ITEMNAME = model.ITEMNAME;
                source.year = year;
                source.APPID = rowObj.APPID;
                saveData.inserted.push(source);
            });


            return saveData;
        }

    } catch (e) {
        console.error(e);
    }
}//父页面选中的报表数据
let checkedRow_ = $DS.getPms('URL_NOTLIKE') == 'TASK' ? parent?.$DS?.getPms('P_RPTMD')?.[0] : parent?.$DS?.getPms('SUPERTASKID')?.[0];
let regType = $DS.getPms('URL_NOTLIKE') == 'TASK' ? 'RPT' : 'TASK';
let pageInfo__C = {
    oldPermission: '',//原始权限
    oldDStype: '',//原始资源分类
    oldSourceId: '', //原始资源id
    nameObj: {"ADD": '新增', "UPDATE": "修改", "DEL": "删除"}
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
    if (!checkedRow_) {
        return
    }
    let sql = `select GUID,DSTYPE,ITEMCODE,ITEMNAME from SSO_T_DATARESOURCE where DSGUID = '${checkedRow_.GUID}'`;
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
            if (!pageInfo__C.oldSourceObj) pageInfo__C.oldSourceObj = {};
            if (type && (type == 'ADD' || type == 'UPDATE' || type == 'DEL')) {
                pageInfo__C.oldSourceObj[type] = $DS.util.clone(item);
                return type;
            } else {
                pageInfo__C.oldSourceId = item.GUID;
                pageInfo__C.oldSourceObj.parent = $DS.util.clone(item);
                return ''
            }
        })

    }


    pageInfo__C.oldDStype = source[0] && source[0].DSTYPE ? source[0].DSTYPE : '';
    pageInfo__C.oldPermission = checkBox.ds_checkbox.filter(item => item != '');
    //let treeInfo = $DS.getCtrl('TREE_资源分类树').info;
    //treeInfo.ds_tree_current_node_key = pageInfo__C.oldDStype;
    //treeInfo.ds_tree_default_expanded_keys = [pageInfo__C.oldDStype]
}

//初始化
init_();


//设置选中
function treeLoadAfter(info) {
    //info.ds_tree_default_expanded_keys = [pageInfo__C.oldDStype]
    $tree.setCurrentNode(info.ds_id, pageInfo__C.oldDStype);

}

//注册资源
function registerSource() {
    debugger
    //资源分类
    let tree = $DS.getCtrl('TREE_资源分类树').info;
    let checkNode = $tree.getCurrentNode(tree.ds_id);
    //资源权限
    if (!checkNode) {
        alert('请选择分类');
        return false;
    }

    let saveData = {inserted: [], updated: [], deleted: []};
    //新增资源
    let newSource = {
        GUID: $DS.util.UUID().replaceAll("-", "").toUpperCase(),
        SUPERGUID: '#',
        DSTYPE: checkNode.GUID,
        DSGUID: checkedRow_.GUID,
        ITEMCODE: regType == 'RPT' ? checkedRow_.ITEMCODE : checkedRow_.TASKNO,
        ITEMNAME: regType == 'RPT' ? checkedRow_.ITEMNAME : checkedRow_.TASKNAME,
        REMARK: regType == 'RPT' ? checkedRow_.RPTDESC : checkedRow_.REMARK,
        YEAR: $DS.getPms('USER_currentyear'),
        APPID: $DS.getPms('URL_SYSNAME')
    }
    saveData.inserted.push(newSource);
    //注册资源 将模板资源全部注册
    addSourceByModel(newSource, saveData);

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
        if (parent.pageInfo__C && parent.pageInfo__C.isRegistedObj) {
            parent.pageInfo__C.isRegistedObj[checkedRow_.GUID] = true;
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
    if (!pageInfo__C.oldPermission || pageInfo__C.oldPermission.length == 0 || !pageInfo__C.oldSourceId) {
        for (let per of permission) {
            actionObj[per] = 'ADD';
        }
        return actionObj;
    }

    //修改
    for (let per of permission) {
        //原始不存在 新增
        if (pageInfo__C.oldPermission.indexOf(per) == -1) {
            actionObj[per] = 'ADD'
        } else if (pageInfo__C.oldPermission.indexOf(per) !== -1 && changeDSType) {
            actionObj[per] = 'UPDATE'
        }
    }
    //删除
    for (let oldPer of pageInfo__C.oldPermission) {
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
            child.ITEMNAME = pageInfo__C.nameObj[key];
            saveData.inserted.push(child);
        } else if (action == 'UPDATE') {
            let child = pageInfo__C.oldSourceObj[key];
            child.DSTYPE = pSource.DSTYPE;
            saveData.updated.push(child);
        } else if (action == 'DEL') {
            saveData.deleted.push(pageInfo__C.oldSourceObj[key]);
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


/**
 *将资源模板插入
 */
function addSourceByModel(rowObj, saveData) {
    debugger
    try {
        let year = $DS.getPms('USER_currentyear');
        let r_ = $DS.selectBySql('PORTAL', `select * from SSO_T_DATARESOURCEMODEL where SOURCETYPE='R' and YEAR ='${year}' `);
        if (r_.isError) {
            console.error('添加资源失败!');
            return saveData;
        } else {
            let models = r_.result;
            if (models.length == 0) {
                return saveData;
            }

            models.forEach(model => {
                let source = {};
                source.DSGUID = rowObj.DSGUID;
                source.DSTYPE = rowObj.DSTYPE;
                source.ADMDIVCODE = '*';
                source.STATUS = '1';
                source.SUPERGUID = rowObj.GUID;
                source.ITEMCODE = model.ITEMCODE;
                source.ITEMNAME = model.ITEMNAME;
                source.year = year;
                source.APPID = rowObj.APPID;
                saveData.inserted.push(source);
            });


            return saveData;
        }

    } catch (e) {
        console.error(e);
    }
}