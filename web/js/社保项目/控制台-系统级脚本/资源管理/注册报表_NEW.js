let pageInfo_ = {
    havedSource: {},//初始化时 记录已将注册过的资源
    newSource: {},
    delSource: {},
    DSTYPE: $DS.getPms('URL_DSTYPE'),
    APPNAME: $DS.getPms('URL_APPNAME')
}
init_();

function init_() {
    let result = $DS.selectByFormSql('PORTAL', VUECFG.pageId, 'getSource', {DSTYPE: pageInfo_.DSTYPE});
    if (result.isError) {
        alert('初始化已注册资源失败!');
    } else {
        result.result.forEach(source => {
            if (source)
                pageInfo_.havedSource[source.DSGUID] = source;
        })
    }
}

/**
 * 表格加载完成事件
 * @param info
 * @private
 */
function gridComplete_(info) {
    debugger
    pageInfo_.delSource = {};
    //设置选中
    $grid.setCheckedNodes(info.ds_id, Object.keys(pageInfo_.havedSource), true);
}

/**
 * 表格复选框选中状态变更事件
 * @param row
 */
function gridCheckStatuChange(val) {
    debugger
    //取消勾选
    if (val.selection.map(item => item.GUID).indexOf(val.row.GUID) == -1) {
        //新勾选的取消勾选
        if (pageInfo_.newSource[val.row.GUID]) {
            delete pageInfo_.newSource[val.row.GUID]
        }
        //注册过的取消勾选
        else {
            pageInfo_.delSource[val.row.GUID] = val.row;
        }
    }
    //勾选注册
    else if (!pageInfo_.havedSource[val.row.GUID]) {
        pageInfo_.newSource[val.row.GUID] = val.row;
    }
}

/**
 * 获取通用资源模板
 */
function getSourceModel() {
    if (pageInfo_.modelSource) {
        return pageInfo_.modelSource;
    }
    let year = $DS.getPms('USER_currentyear');
    let r_ = $DS.selectBySql('PORTAL', `select * from SSO_T_DATARESOURCEMODEL where SOURCETYPE='R' and YEAR ='${year}' `);
    if (r_.isError) {
        alert('获取模板资源失败!' + r_.errMsg);
        return [];
    } else {
        pageInfo_.modelSource = r_.result;
        return pageInfo_.modelSource;
    }
}


/**
 * 获取通用资源模板
 */
function getSourceModelForLevel(superGuid, models, level) {

    for (let model of models) {
        model.GUID = $DS.util.UUID().replaceAll("-", "").toUpperCase();
        model.SUPERGUID = superGuid;
        if (model.children) {
            getSourceModelForLevel(model.GUID, model.children);
        }
    }

}

/**
 * 保存
 */
function saveSource() {
    debugger
    let delSourceIds = Object.keys(pageInfo_.delSource);
    let addSourceIds = Object.keys(pageInfo_.newSource);
    let result;
    //取消注册
    if (delSourceIds.length > 0) {
        let delStrIds = delSourceIds.map(item => `'${item}'`);
        //删除角色对资源
        result = deleteSourceForRole(delStrIds);
        if (result.isError) {
            alert('删除角色对资源失败!');
            return;
        } else {
            //删除资源
            let sql = `delete from SSO_T_DATARESOURCE where DSGUID in (${delStrIds.join(',')})`;
            result = $DS.exeSql(sql, null, null, 'PORTAL');
            if (result.isError) {
                alert('删除资源失败!')
                return;
            }
        }
    }
    //注册资源
    if (addSourceIds.length > 0) {
        let saveData = {inserted: [], updated: [], deleted: []};
        let modelSource = $DS.util.clone(getSourceModel());
        modelSource = $DS.util.children(modelSource, 'GUID', 'SUPERGUID', 'children');
        for (let dsguid in pageInfo_.newSource) {
            let rowObj = {
                GUID: $DS.util.UUID().replaceAll("-", "").toUpperCase(),
                DSGUID: dsguid,
                ITEMCODE: pageInfo_.newSource[dsguid].ITEMCODE,
                ITEMNAME: pageInfo_.newSource[dsguid].ITEMNAME,
                ADMDIVCODE: '*',
                STATUS: '1',
                DSTYPE: pageInfo_.DSTYPE,
                APPID: pageInfo_.APPNAME,
                YEAR: $DS.getPms('USER_currentyear')
            };
            saveData.inserted.push(rowObj);


            getSourceModelForLevel(rowObj.GUID, modelSource);
            modelSource = $DS.util.childrenToList(modelSource,'children',[],true);
            modelSource.forEach(model => {
                let source = {};
                source.GUID = model.GUID;
                source.SUPERGUID = model.SUPERGUID;
                source.DSGUID = rowObj.DSGUID;
                source.DSTYPE = rowObj.DSTYPE;
                source.ADMDIVCODE = '*';
                source.STATUS = '1';
                source.ITEMCODE = model.ITEMCODE;
                source.ITEMNAME = model.ITEMNAME;
                source.YEAR = rowObj.YEAR;
                source.APPID = rowObj.APPID;
                saveData.inserted.push(source);
            });
        }

        result = $DS.saveAllTableData('SSO_T_DATARESOURCE', 'GUID', saveData, 'PORTAL')
        if (result.isError) {
            alert('注册资源失败:' + result.errMsg);
            return;
        }
    }

    if (addSourceIds.length > 0 || delSourceIds.length > 0) {
        $DS.clearAllTableCache("清空缓存失败!");
        parent.$DS.loadCtrl('grid');
        parent.alert('注册成功!')
    }

    $DS.util.close();
}


//删除角色对资源中的数据
function deleteSourceForRole(DSGUIDStr) {
    debugger
    let sql = `delete from SSO_T_ROLERESOURCE where RESOURCEID in(select GUID from SSO_T_DATARESOURCE t start with t.GUID in (select GUID FROM SSO_T_DATARESOURCE WHERE DSGUID in (${DSGUIDStr})) connect by prior t.guid = t.SUPERGUID)`;
    let res = $DS.exeSql(sql, '', '', 'PORTAL');
    if (res.isError) {
        console.error(res.errMsg ? res.errMsg : '删除角色资源失败!');
        return res;
    }
    return true;
}

