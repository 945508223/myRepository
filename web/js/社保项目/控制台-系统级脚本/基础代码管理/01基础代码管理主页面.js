let pageInfo_ = {
    appId: VUECFG.appId,
    baseCatObj: {}//以系统id 缓存基础分类
}


init_();

/**
 * 初始化操作
 * @private
 */
function init_() {
    debugger
    $DS.getCtrl('GRID_代码表').info.ds_notRefCols = true;
    // getBaseCat(pageInfo_.appId);
    $DS.getCtrl('TREE_代码分类树').info.ds_before_loadData = "beforeLoadCatTreeData(obj,val)"

    //初始化mofdivcode
    let mof_div_code = $DS.getPms('USER_admdivCode');
    pageInfo_.MOF_DIV_CODE = mof_div_code && mof_div_code != 'null' ? mof_div_code : getMofDivCode();
    $DS.putPms('MOF_DIV_CODE_', pageInfo_.MOF_DIV_CODE);

    //初始化年控件下拉数据
    let yearsResult = $DS.selectByFormSql(VUECFG.appId, VUECFG.pageId, 'years', {});
    if (yearsResult.isError) {
        alert('初始化年份失败!')
    } else {
        let yearSelect = $DS.getCtrl('SELECT_年份').info;
        yearSelect.ds_options = yearsResult.result.map(item => {
            let option = {};
            option.label = item.YEAR + '年';
            option.value = item.YEAR;
            return option;
        })
    }
}

/**
 * 取财政区划编码
 */
function getMofDivCode() {
    let result = $DS.selectByFormSql(VUECFG.appId, VUECFG.pageId, 'mofcode', {});
    if (result.isError) {
        alert('获取区划编码失败:' + result.errMsg);
        return '';
    } else {
        return result.result[0].CNAME;
    }
}

/**
 * 取左侧树基础分类
 */
function getBaseCat(appid) {
    debugger
    /*if (pageInfo_.baseCatObj[appid]) {
        return pageInfo_.baseCatObj[appid];
    }*/
    let result = $DS.selectByFormSql(appid, VUECFG.pageId, 'getBaseCat', {});
    if (result.isError) {
        alert('获取基础分类失败:' + result.errMsg);
        return [];
    } else {
        result.result.forEach(item => {
            item.ISBASE = true;
        });
        // pageInfo_.baseCatObj[appid] = $DS.util.clone(result.result);
        //return pageInfo_.baseCatObj[appid];
        return result.result;
    }
}


/***
 * 分类树加载数据前事件 获取分类 拼接树数据
 * @param info
 * @param data
 */
function beforeLoadCatTreeData(info, data) {
    debugger
    let baseCodeCat = getBaseCat(pageInfo_.appId);
    if (data?.val?.length > 0) {
        data.val[0].ID = '#';
        let listData = $DS.util.childrenToList(data.val, 'children', [], true);
        listData = baseCodeCat.concat(listData);
        data.val = $DS.util.children(listData, 'ID', 'PID', 'children');
    }
}


/**
 *表格加载数据前事件
 * @param info
 * @param val
 */
function beforeLoadCodeGridData(info, data) {

   
}


/**
 * 系统变更
 */
function changeApp(val) {
    $DS.getSource('DS_CATALOG').appId = val;
    $DS.getSource('DS_UNION').appId = val;
    pageInfo_.appId = val;
}

/**
 * 删除分类
 * @private
 */
function deleteCat_() {

    let currCat = $DS.getPms('categoryTree');
    if (!currCat || currCat.length == 0) {
        alert('请选择要删除的分类!');
        return false;
    }
    if (currCat[0].children && currCat[0].children.length > 0) {
        alert('该分类下存在下级,不允许删除');
        return false;
    }
    if ($DS.getCtrl('GRID_代码表').info.ds_grid?.length > 0) {
        alert(`该分类下存在代码,不允许删除`);
        return false;
    }
    $DS.util.confirm(window.vm, `确定删除【${currCat[0].NAME}】分类?`, function () {
        debugger
        //let result = $DS.deleteById(pageInfo_.appId, 'ELE_CATALOG', 'GUID', currCat[0].GUID);
        //  let result = $DS.setFlagById('ELE_CATALOG', 'IS_DELETED', 1, currCat[0].GUID, 1, pageInfo_.appId);
        let result = dodel_('ELE_CATALOG', 'IS_DELETED', 1, currCat[0].GUID, pageInfo_.appId, 1);
        if (result.isError) {
            alert(`删除失败:${result.errMsg}`);
            return false;
        } else {
            $DS.loadCtrl('TREE_代码分类树');
            alert('删除成功')

            debugger
            var modelName = "业务功能"
            var opType = "删除业务代码集栏目"
            var objGuid = currCat[0].GUID
            var msgObj = {
                modelName: modelName,
                objGuid: objGuid,
                opType: opType,
                opDesc: currCat[0].ELE_CATALOG_NAME
            }
            $DS.massage.sendTableMsg(VUECFG.appId, msgObj, opType + "触发消息失败");


        }
    }, '已取消删除')
}

/**
 * 保存
 * @private
 */
function saveCodes_() {
    debugger
    let year = $DS.getPms('currentYear');
    let codeGrid = $DS.getCtrl('GRID_代码表').info;
    let gridVm = $grid.getGridVmById(codeGrid.ds_id);
    let listData = $DS.util.childrenToList(gridVm.computed_data, 'children', []);
    let editRowsObj = $grid.getEditRows(codeGrid.ds_id);
    //逻辑删除
    if (editRowsObj.deleted.length > 0) {
        editRowsObj.deleted.forEach(item => item.IS_DELETED = 1);
        editRowsObj.updated = editRowsObj.updated.concat(editRowsObj.deleted);
        editRowsObj.deleted = [];
    }
    let errRows = [];
    for (let key in editRowsObj) {
        if (key != 'deleted') {
            editRowsObj[key].forEach(row => {
                if (!row.ELE_CODE || !row.ELE_NAME) {
                    errRows.push(row);
                }
                row.LEVEL_NO = getCodeLevel(row, listData);
                row.YEAR = year;
                if (!row.PARENT_ID) {
                    row.PARENT_ID = '#'
                }
            });
            if (errRows.length > 0) {
                alert(`代码集代码或代码集名称不允许为空!`);
                return;
            }
        }
    }
    let result = $DS.saveAllTableData('ELE_UNION', 'ELE_ID', editRowsObj, pageInfo_.appId);
    if (result.isError) {
        alert('保存失败:' + result.errMsg);
    } else {
        $DS.loadCtrl("GRID_代码表");
        alert('保存成功!');

        //保存成功发送消息
        debugger
        var guid = "";
        var opDesc = "";
        var u_guid = "";
        var u_opDesc = "";
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].optType != undefined && listData[i].optType != "") {
                if (listData[i].optType == "inserted") {
                    guid = guid == "" ? guid + gridVm.computed_data[i].GUID : guid + "," + gridVm.computed_data[i].GUID;
                    opDesc = opDesc == "" ? opDesc + gridVm.computed_data[i].ELE_NAME : opDesc + "," + gridVm.computed_data[i].ELE_NAME;
                } else if (listData[i].optType == "updated") {
                    u_guid = u_guid == "" ? u_guid + listData[i].GUID : u_guid + "," + listData[i].GUID;
                    u_opDesc = u_opDesc == "" ? u_opDesc + listData[i].ELE_NAME : u_opDesc + "," + listData[i].ELE_NAME;
                }
            }
        }
        var modelName = "业务功能"
        var opType = "";
        var u_opType = "";
        if (guid != "") {
            opType = "新增业务代码集";
            var msgObj = {
                modelName: modelName,
                objGuid: guid,
                opType: opType,
                opDesc: opDesc
            }
            $DS.massage.sendTableMsg(VUECFG.appId, msgObj, opType + "触发消息失败");
        }
        if (u_guid != "") {
            u_opType = "修改业务代码集";
            var msgObj = {
                modelName: modelName,
                objGuid: u_guid,
                opType: u_opType,
                opDesc: u_opDesc
            }
            $DS.massage.sendTableMsg(VUECFG.appId, msgObj, u_opType + "触发消息失败");
        }


    }
}

/**
 * 获取行的level
 * @param row
 * @param ctrlId
 */
function getCodeLevel(row, listData) {
    if (listData && listData.length > 0) {
        let item = listData.find(item => item.ELE_ID == row.ELE_ID);
        if (item) {
            return item.level_
        }
    }
    return '';
}

function dodel_(tableName, fieldName, value, guids, appId, isCascade) {
    debugger
    var result = YCDCommon.Ajax.syncAjax($DS.util.getProjectName(appId) + "/sysconfig/frame/setFlagById", {
        "tableName": tableName,
        "fieldName": fieldName,
        "value": value,
        "guids": guids,
        "isCascade": isCascade ? isCascade : "1"
    });
    return result;
}

/**
 * 左侧树按钮显示控制
 */
function leftBtnsIsShow(info, type) {
    debugger
    let treePms = $DS.getPms('categoryTree');
    if (!treePms || treePms.length == 0) {
        info.ds_show = false;
    } else if (treePms[0].ID == '#') {
        info.ds_show = false;
    } else if ((type == 'edit' || type == 'del') && treePms[0].ISBASE) {
        info.ds_show = false;
    } else {
        info.ds_show = true;
    }
}

/**
 * 树加载完成事件
 */
function catTreeLoadComplete(info) {
    debugger
    let key = info.ds_tree[0]?.children?.[0]?.children?.[0]?.ID;
    $tree.setCurrentNode(info.ds_id, key, true)
}

//同步到业务系统，add by ych
function syncToBusi() {
    debugger
    let url = $DS.util.getProjectName() + "/freeForm/freeFromView.jsp?PAGEID=AD0BED6B5CF4402186054BC74ED424AB&APPID=CONSOLE"
    $DS.showPage(url, "同步到业务系统", "60%", "95%");
}

