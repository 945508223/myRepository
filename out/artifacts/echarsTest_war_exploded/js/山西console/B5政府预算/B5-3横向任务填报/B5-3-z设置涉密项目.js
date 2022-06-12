var initCurRow = [];

/**
 * 设置涉密项目
 */
function setSecretProj() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_项目列表").info;
    let curRows = $grid.getCheckedNodes(gridInfo.ds_id);
    if (!curRows || curRows.length == 0) {
        alert("请选择项目")
        return false
    }

    if(!curRows){
        $DS.util.close();
        return
    }

    let saveData = {inserted: [], updated: [], deleted: []};
    let curRowsIds = curRows.map(row => row.GUID);
    let cancleSecret = [];
    cancleSecret = initCurRow.filter(item => {
        if (curRowsIds.indexOf(item.GUID) == -1) {
            return item;
        }
    })


    //取消保密
    for (let cancleRow of cancleSecret) {
        let newItem = {};
        newItem.GUID = cancleRow.GUID;
        newItem.ISBM = "0";
        newItem.EXP_FUNC = cancleRow.EXP_FUNC;
        saveData.updated.push(newItem);
    }
    for (let secretPro of curRows) {
        let newItem = {};
        newItem.GUID = secretPro.GUID;
        newItem.ISBM = "1";
        newItem.EXP_FUNC = secretPro.EXP_FUNC;
        saveData.updated.push(newItem);
    }

    //let result = $DS.saveTable( VUECFG.appId,'edit',saveData.updated[0],"PM_BGT_PROOJECT", "GUID");
    let result = $DS.saveAllTableData("PM_BGT_PROOJECT", "GUID", saveData, VUECFG.appId);
    if (result && !result.isError) {
        //alert("保存成功")  删除表中对应编码的数据
        //设置其中项
        $DS.util.close()
        setInnerProj(saveData.updated);
    } else {
        alert(result.errMsg ? result.errMsg : "保存失败")
    }
}

function setInnerProj(data) {
    debugger
    let cancleArr = []
    let sureArr = []
    for (let item of data) {
        if (item.ISBM == "1") {
            sureArr.push(item.EXP_FUNC)
        } else if (item.ISBM == "0") {
            cancleArr.push(item.EXP_FUNC)
        }
    }
    cancleArr = cancleArr.length>0?distintArr(cancleArr):[]
    sureArr =sureArr.length>0? distintArr(sureArr):[];
    let win = parent.$iframe.getSubWindow("IFRAME_采集表");
    if (win && win.setInnerProjForRpt) {
        win.setInnerProjForRpt("action", {CANCLE: cancleArr, SURE: sureArr});
    }
}


/**
 * 初始化反选
 * @param info
 */
function setCurRowForSecretProj(info) {
    debugger
    let gridData = info.ds_grid;
    let curRows = gridData.filter(row => {
        if (row.ISBM == "1") {
            return row
        }
    });
    initCurRow = curRows;
    let curRowIds = curRows.map(row => row.GUID);
    //initCurRow = curRowIds;
    $grid.setCheckedNodes(info.ds_id, curRowIds)

}


/**
 * 设置全选
 */
function selectAll() {
    let gridInfo = $DS.getCtrl("GRID_项目列表").info;
    $(`#${gridInfo.ds_id} thead .el-checkbox__original`).click();
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
        let disSelectRows = curRows.map(item => item.GUID);
        let allData = $grid.getAllData(gridInfo.ds_id);
        let allIds = allData.map(item => item.GUID);
        $grid.setCheckedNodes(gridInfo.ds_id, disSelectRows, false);

        for (let id of allIds) {
            if (disSelectRows.indexOf(id) == -1) {
                $grid.setCheckedNodes(gridInfo.ds_id, id, true);
            }
        }
    }
}


function distintArr(arr) {
    let set = new Set();
    arr.forEach(item => set.add(item));
    return Array.from(set)
}

/*[AND] PROVICE=${V.USER_admdivCode,""}  [AND] YEAR=${V.USER_CURRENTYEAR}*/

