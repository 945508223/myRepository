var initCurRow = {};
//记录原始数据
var oldData_ = [];
var oldListData = [];
var allDataIds = [];
var page_info_ = {
    isSearch: false,
    isFirstLoad: true,
    isShowChecked: false,
    gridVm: ''
}
$DS.getCtrl('GRID_项目列表').info.info.ds_grid_searchComplete = "resetChecked()"

/**
 * 设置涉密科目
 */
function setSecretProj() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_项目列表").info;
    let curRows = $grid.getCheckedNodes(gridInfo.ds_id);
    if (!curRows) {
        $DS.util.close();
        return
    }
    //先删后存
    let delSql = "delete from PM_GOV_FUNC_SEC where MOF_DIV_CODE='${V.USER_admdivCode}'";
    delSql = $DS.util.replace(delSql);
    let delRes = $DS.exeSql(delSql, '删除涉密科目失败', '', VUECFG.appId);
    if (delRes.isError) {
        console.error(delRes.errMsg);
        alert("保存失败");
        return false;
    }
    let saveData = {inserted: [], updated: [], deleted: []};
    if (curRows.length == 0) {
        $DS.util.close();
        setInnerProj();
    }
    saveData.inserted = curRows.map(item => {
        let newItem = {};
        newItem.EXP_FUNC_CODE = item.EXP_FUNC_CODE;
        newItem.EXP_FUNC_NAME = item.EXP_FUNC_NAME;
        newItem.MOF_DIV_CODE = item.MOF_DIV_CODE;
        return newItem;
    })
    let result = $DS.saveAllTableData("PM_GOV_FUNC_SEC", "EXP_FUNC_CODE", saveData, VUECFG.appId);
    if (result && !result.isError) {
        //设置其中项
        $DS.util.close();
        setInnerProj();
    } else {
        alert(result.errMsg ? result.errMsg : "保存失败")
    }
}

//设置涉密科目
function setInnerProj() {
    debugger
    let iframeId = parent.$DS.getCtrl('IFRAME_采集表').info.ds_id;
    let src = parent.$(`#${iframeId}_iframe`).attr("src");
    parent.$(`#${iframeId}_iframe`).attr("src","");
    setTimeout(function(){
        parent.$(`#${iframeId}_iframe`).attr("src",src);
    })
}


/**
 * 初始化选中
 * @param info
 */
function setCurRowForSecretProj(info) {
    debugger
    if (page_info_.isFirstLoad) {
        let sql = "select EXP_FUNC_CODE,EXP_FUNC_NAME from PM_GOV_FUNC_SEC where MOF_DIV_CODE='${V.USER_admdivCode}'"
        sql = $DS.util.replace(sql);
        let res = $DS.selectBySql(VUECFG.appId, sql, '获取涉密科目失败');
        if (res.isError) {
            console.error(res.errMsg);
            return false;
        }
        res = res.result;
        for (let item of res) {
            initCurRow[item.EXP_FUNC_CODE] = true
        }

        $grid.setCheckedNodes(info.ds_id, res.map(item => item.EXP_FUNC_CODE),true);
        //记录原始数据
        oldData_ = $DS.util.clone(info.ds_grid);
        oldListData = $DS.util.childrenToList(oldData_, 'children', []);

        for (let row of oldListData) {
            delete row.children;
            allDataIds.push(row.EXP_FUNC_CODE);
        }
        page_info_.isFirstLoad = false;
        page_info_.gridVm = window[info.ds_id + "_gridRef"];
    } else {
        $grid.setCheckedNodes(info.ds_id, Object.keys(initCurRow));
    }

}


/**
 * 设置全选
 */
function selectAll() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_项目列表").info;
    $(`#${gridInfo.ds_id} thead .el-checkbox__original`).click();
    let checkedNodes = $grid.getCheckedNodes(gridInfo.ds_id);
    for (let row of checkedNodes) {
        row.treegrid_ischecked = true;
        initCurRow[row.EXP_FUNC_CODE] = true;
    }

}

/**
 * 设置反选
 */
function setInverseSelect() {
    let gridInfo = $DS.getCtrl("GRID_项目列表").info;
    let curRows = $grid.getCheckedNodes(gridInfo.ds_id);
    if (!curRows || curRows.length == 0) {
        selectAll();
    } else {
        let disSelectRows = curRows.map(item => item.EXP_FUNC_CODE);
        $grid.setCheckedNodes(gridInfo.ds_id, disSelectRows, false);
        for (let id of allDataIds) {
            if (disSelectRows.indexOf(id) == -1) {
                $grid.setCheckedNodes(gridInfo.ds_id, id, true);
            }
        }
    }
}

//搜索框变更
function searchChange(val) {

    if (val || val == '0') {
        page_info_.isSearch = true;
    } else {
        page_info_.isSearch = false;
        setTimeout(function () {
            debugger
            $grid.setCheckedNodes(page_info_.gridVm.info.ds_id, Object.keys(initCurRow), true);
        }, 500)
    }
}


//搜索 完成后或 显示已选选项变更 重新设置选中
function resetChecked() {

    //搜索完成后重现设置勾选
    setTimeout(function () {
        debugger
        let info = $DS.getCtrl('GRID_项目列表').info;
        $grid.setCheckedNodes(info.ds_id, Object.keys(initCurRow),true);
    }, 500)
}

//选项变更事件 记录已选数据 如果是搜索则添加 未搜 全部替换
function selectedRows(checkedRows) {
    debugger
    if (page_info_.isSearch == false && page_info_.isShowChecked == false) {
        initCurRow = {};
    }
    if (checkedRows.row.treegrid_ischecked == true) {
        delete initCurRow[checkedRows.row.EXP_FUNC_CODE]
    }
    for (let row of checkedRows.selection) {
        initCurRow[row.EXP_FUNC_CODE] = true;
    }
}

/**
 * 显示已选
 */
function showCheckedEXP(val) {
    debugger
    let info = $DS.getCtrl('GRID_项目列表').info;
    //显示已选
    if (val.length == 2) {
        let checkedrRows = $grid.getCheckedNodes(info.ds_id);
        let checkedrRowIds = [];
        for (let row of checkedrRows) {
            checkedrRowIds.push(row.EXP_FUNC_CODE);
            delete row.children;
        }
        info.ds_grid = checkedrRows;
        setTimeout(function () {
            $grid.setCheckedNodes(info.ds_id, checkedrRowIds,true)
        }, 500)
        page_info_.isShowChecked = true;
    } else {
        info.ds_grid = $DS.util.clone(oldListData);
        page_info_.isShowChecked = false;
        setTimeout(function(){
            $grid.setCheckedNodes(info.ds_id, Object.keys(initCurRow),true);
        })
    }
}
