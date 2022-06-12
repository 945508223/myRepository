var pageInfo_Secret = {
    MOF_DIV_CODE: $DS.getPms("USER_admdivCode"),
    INIT_CURROW: [],//初始化选中的项目
    leftIsSearch: false,
    rightIsSearch: false,
    curPros: {},
    isFirstLoad:true
}

function initLeftGrid(){
    let leftGrid = $DS.getCtrl('GRID_左项目列表').info;
    leftGrid.ds_tree_grid = true
    leftGrid.ds_row_id = 'GUID'
    leftGrid.ds_row_pid = 'SUPERGUID'
}
initLeftGrid()

/**
 * 初始化勾选左侧表格
 */
function initCurPor(data) {
    debugger
    let ids = data.map(row => row.PRO_CODE);
    pageInfo_Secret.INIT_CURROW = $DS.util.clone(data);
    for (let row of pageInfo_Secret.INIT_CURROW) {
        pageInfo_Secret.curPros[row.PRO_CODE] = row;
    }
    let left_grid = $DS.getCtrl("GRID_左项目列表").info;
    $grid.setCheckedNodes(left_grid.ds_id, ids, true);
}

//设置涉密项目
function btn_right_click() {
    debugger
    let left_grid = $DS.getCtrl("GRID_左项目列表").info;
    let right_grid = $DS.getCtrl("GRID_已选择项目列表").info;
    let left_curRows = $grid.getCheckedNodes(left_grid.ds_id);

    if (!left_curRows || left_curRows.length == 0) {
        return
    }

    //如果是执行搜索时设置
    if (pageInfo_Secret.leftIsSearch) {
        let right_gridData = right_grid.ds_grid;
        let right_gridIds = right_gridData.map(row => row.PRO_CODE);
        for (let curRow of left_curRows) {
            if (right_gridIds.indexOf(curRow.PRO_CODE) == -1) {
                right_gridData.push(buildNewRow(curRow));
            }
        }

    } else {
        let right_gridData = left_curRows.map(row => {
            return buildNewRow(row);
        })
        /*if(pageInfo_Secret.isFirstLoad){
            right_grid.ds_grid = right_grid.ds_grid && right_grid.ds_grid.length > 0 ? right_grid.ds_grid.concat(right_gridData) : right_gridData;
            pageInfo_Secret.isFirstLoad = false;
        }else {*/
            right_grid.ds_grid = right_gridData;
        //}
    }


    setCancleCur_RightGrid(right_grid.ds_id)
}


function buildNewRow(row) {
    let newRow = {};
    newRow.YEAR = $DS.getPms("USER_currentyear");
    newRow.MOF_DIV_CODE = pageInfo_Secret.MOF_DIV_CODE;
    newRow.AGENCY_CODE = row.AGENCY_CODE;
    newRow.AGENCY_NAME = row.AGENCY_NAME;
    newRow.PRO_CODE = row.PRO_CODE;
    newRow.PRO_NAME = row.PRO_NAME;
    newRow.EXP_FUNC_CODE = row.EXP_FUNC_CODE;
    newRow.EXP_FUNC_NAME = row.EXP_FUNC_NAME;
    return newRow
}

//取消涉密项目
function btn_left_click() {
    debugger
    let left_grid = $DS.getCtrl("GRID_左项目列表").info;
    let right_grid = $DS.getCtrl("GRID_已选择项目列表").info;

    let right_curRows = $grid.getCheckedNodes(right_grid.ds_id);
    if (!right_curRows || right_curRows.length == 0) {
        return
    }
    let curRowIds = right_curRows.map(row => row.PRO_CODE);
    let right_All = right_grid.ds_grid;
    //let right_All = $grid.getAllData(right_grid.ds_id);
    for (let i = 0; i < right_All.length; i++) {
        if (curRowIds.indexOf(right_All[i].PRO_CODE) != -1) {
            right_All.splice(i, 1);
            if (i !== 0) {
                i--;
            } else i = -1;
        }
    }
    right_grid.ds_grid = right_All;
    //清除搜索中得数据
    if (pageInfo_Secret.rightIsSearch) {
        clearRightSearchData(right_grid, curRowIds);
    }
    $grid.setCheckedNodes(left_grid.ds_id, curRowIds, false);
    //取消选中行效果
    setCancleCur_RightGrid(right_grid.ds_id)
}


//保存涉密项目 同时设置报表其中项目
function saveSecretPros() {
    debugger
    let right_grid = $DS.getCtrl("GRID_已选择项目列表").info;
    let delRes = {isError: false};
    //先删除 后保存
    if (pageInfo_Secret.INIT_CURROW && pageInfo_Secret.INIT_CURROW.length > 0) {
        let ids = [];
        for (let row of pageInfo_Secret.INIT_CURROW) {
            ids.push(`'${row.PRO_CODE}'`);

        }
        let delProSql = "delete from PM_GOV_PROJECT where PRO_CODE in (" + ids.join(",") + ") AND MOF_DIV_CODE='" + pageInfo_Secret.MOF_DIV_CODE + "'";
        delRes = $DS.exeSqls(delProSql, "", "", VUECFG.appId);
    }

    if (delRes.isError) {
        alert("设置涉密项目失败");
        console.error(delRes.errMsg ? delRes.errMsg : "删除涉密项目失败!");
        return false;
    }

    //保存
    let rightGridData = $grid.getAllData(right_grid.ds_id);
    let savedata = rightGridData && rightGridData.length > 0 ? rightGridData : [];
    let result = $DS.saveAllTableData("PM_GOV_PROJECT", "PRO_CODE", {
        inserted: savedata,
        updated: [],
        deleted: []
    }, VUECFG.appId);
    if (result.isError) {
        alert("设置涉密项目失败");
        console.error(result.errMsg ? result.errMsg : "保存涉密项目失败");
        return false;
    }
    $DS.util.close();
    //设置其中项目
    setInnerProForRpt(savedata);

}

//设置其中项目
function setInnerProForRpt(sureData) {
    let sureProIds = sureData.map(item => item.PRO_CODE);
    let cancleData = [];
    //取消勾选的项目
    if (pageInfo_Secret.INIT_CURROW && pageInfo_Secret.INIT_CURROW.length > 0) {
        cancleData = pageInfo_Secret.INIT_CURROW.filter(item => {
            if (sureProIds.indexOf(item.PRO_CODE) == -1) {
                return item;
            }
        })
    }

    //设置其中项的科目编码
    let sureExpCodes = sureData.map(item => item.EXP_FUNC_CODE);
    sureExpCodes = distintArr(sureExpCodes);
    //取消其中项的科目编码
    let cancleExpCodes = cancleData.map(item => item.EXP_FUNC_CODE);
    cancleExpCodes = distintArr(cancleExpCodes);
    //隐藏项目编码
    let sureProCodes = sureData.map(item => item.PRO_CODE);
    //取消隐藏编码
    let cancleProCodes = cancleData.map(item => item.PRO_CODE);
    //刷新报表
    let iframeId = parent.$DS.getCtrl('IFRAME_采集表').info.ds_id;
    let src = parent.$(`#${iframeId}_iframe`).attr("src");
    parent.$(`#${iframeId}_iframe`).attr("src","");
    setTimeout(function(){
        parent.$(`#${iframeId}_iframe`).attr("src",src);
    })
    /* let win = parent.$iframe.getSubWindow("IFRAME_采集表");
     if (win && win.setInnerProjForRpt) {
         win.setInnerProjForRpt("action", {CANCLE: cancleExpCodes, SURE: sureExpCodes,SUREPRO:sureProCodes,CANCLEPRO:cancleProCodes});
     }*/
}

//数组去重
function distintArr(arr) {
    let set = new Set();
    arr.forEach(item => set.add(item));
    return Array.from(set)
}


/**
 * 设置反选
 */
function setInverseSelect() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_左项目列表").info;
    let curRows = $grid.getCheckedNodes(gridInfo.ds_id);
    if (!curRows || curRows.length == 0) {
        selectAll();
    } else {
        let disSelectRows = curRows.map(item => item.PRO_CODE);
        let allData = $grid.getAllData(gridInfo.ds_id);
        let allIds = allData.map(item => item.PRO_CODE);
        $grid.setCheckedNodes(gridInfo.ds_id, disSelectRows, false);

        for (let id of allIds) {
            if (disSelectRows.indexOf(id) == -1) {
                $grid.setCheckedNodes(gridInfo.ds_id, id, true);
            }
        }
    }
}


/**
 * 设置全选
 */
function selectAll() {
    let gridInfo = $DS.getCtrl("GRID_左项目列表").info;
    $(`#${gridInfo.ds_id} thead .el-checkbox__original`).click();
}


function setCancleCur_RightGrid(id) {
    window[id + "_gridRef"].$refs.multipleTable.setCurrentRow();
}

//左侧搜索框值变更
function leftSearchChange(val) {
    //设置选中
    let right_grid = $DS.getCtrl("GRID_已选择项目列表").info;
    let left_grid = $DS.getCtrl("GRID_左项目列表").info;
    let rightData = right_grid.ds_grid;
    if (val || val == "0") {
        pageInfo_Secret.leftIsSearch = true;

    } else {
        pageInfo_Secret.leftIsSearch = false;
    }
    setTimeout(function () {
        let rightCurIds = rightData.map(row=>row.PRO_CODE);
        $grid.setCheckedNodes(left_grid.ds_id,rightCurIds);
    })

}

function rightSearchChange(val) {

    if (val || val == "0") {
        pageInfo_Secret.rightIsSearch = true;

    } else {
        pageInfo_Secret.rightIsSearch = false;
    }


}

//清除取消时的数据
function clearRightSearchData(info, cancleData) {
    if (info.ds_searchdata && info.ds_searchdata.length > 0) {
        info.ds_searchdata = info.ds_searchdata.filter(row => {
            cancleData.indexOf(row.PRO_CODE) != -1
        })
    }
}



function disableLeftPro(row) {
    let left_grid = $DS.getCtrl("GRID_已选择项目列表").info;
    let ids = left_grid.ds_grid.map(item=>item.PRO_CODE)
    if(ids.indexOf(row.PRO_CODE)!=-1){
        return true
    }
    return  false;
}