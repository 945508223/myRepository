var taskInfo = {};
initAllTask()

//保存按钮点击事件
function btn_save_click() {
    var topWin = $DS.util.getTopWin("window");
    var grid = $DS.getCtrl("GRID_采集分类");
    var data = $grid.getEditRows(grid.info.ds_id);
    var str_condition = "";
    for (let i = 0; i < data["deleted"].length; i++) {
        if (i == data["deleted"].length - 1) {
            str_condition += `'${data["deleted"][i].GUID}'`;
        } else {
            str_condition += `'${data["deleted"][i].GUID}',`;
        }
    }
    var sql = `delete from RURAL_TASK_TYPEMODEL where TYPEID in (${str_condition})`;
    var result = $DS.exeSql(sql);
    if (!result || result.isError) {
        alert("保存失败" + result.errMsg);
        return;
    }
    var result = $DS.saveGridSource(data, "DS_采集分类");
    if (result && !result.isError) {
        alert("保存成功!");
        topWin.$DS.putPms("taskClassVal", "");
        $DS.loadCtrl("TABS_采集表选择");
    } else {
        alert("保存失败" + result.errMsg);
        return;
    }
}

/**
 * 修改填报类型变更校验
 * @param newVal
 * @param oldVal
 * @param scope
 */
function beforeChangeTaskType(newVal, oldVal, scope) {
    debugger
    var row = scope.row;
    var col = scope.column;
    if (col.columnKey == "TASKTYPE") {
        if (taskInfo[row.GUID]) {
            scope.row.TASKTYPE = oldVal;
            alert("此分类下已存在任务");
            return false;
        }
    }

}

/**
 * 删除前校验
 */
function beforeDelTaskType() {
    debugger
    let gridInfo = $DS.getCtrl("GRID_采集分类").info;
    let curRows = $grid.getCheckedNodes(gridInfo.ds_id);
    if (curRows && curRows.length > 0) {
        for (let row of curRows) {
            if (taskInfo[row.GUID]) {
                alert(`【${row.TASKTYPENAME}】分类下已存在任务,不允许删除`);
                return false;
            }
        }
    }
}


/**
 * 初始化查询任务
 */
function initAllTask() {
    debugger
    let sql = "SELECT GUID,TASKTYPE from RURAL_TASK_INFO WHERE  1=1 [AND] YEAR='${V.USER_CURRENTYEAR,\"\"}' [AND]  TASKTYPE IN (SELECT GUID FROM RURAL_TASK_TYPE WHERE APPID='${V.URL_APPNAME}')"
    sql = $DS.util.replace(sql)
    var result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        result = result.result;
        for (let task of result) {
            if (!taskInfo[task.TASKTYPE]) {
                taskInfo[task.TASKTYPE] = [];
            }
            taskInfo[task.TASKTYPE].push(task.GUID);
        }
    } else {
        console.error(result.errMsg ? result.errMsg : "获取任务信息失败")
    }

}


var taskScope = {}
//根据用户级次不同过滤采集分类
function initTaskCatgreyLimits(col, row, options) {
    debugger
    if (col.id != "TASKSCOPE") {
        return options;
    }
    let userlevel = $DS.getPms("USER_admdivlevel");
    let TASKTYPE = row.TASKTYPE;
    if (!TASKTYPE) {
        alert("请选择填报类型");
        return [];
    }
    //纵向 无本级
    if (taskScope[TASKTYPE] && taskScope[TASKTYPE].length > 0) {
        return (taskScope[TASKTYPE]);
    } else {
        taskScope[TASKTYPE] = [];
        for (let option of options) {
            if (option.value == "0" &&TASKTYPE == "V") {
                continue/*taskScope[TASKTYPE].push(option);*/
            } else if (option.value == "0") {
                taskScope[TASKTYPE].push(option);
            } else if (option.value >= userlevel) {
                taskScope[TASKTYPE].push(option);
            }
        }
        return taskScope[TASKTYPE]
    }
}



var pageInfo_MOF_DEP_CODE;
//任务分类过滤主管初始下拉
function getMOF_DEP_CODEOptions(col) {
    debugger
    let info = $DS.getCtrl('GRID_采集分类').info;
    if (pageInfo_MOF_DEP_CODE) {
        return pageInfo_MOF_DEP_CODE;
    }
    let fieldInfo = info.ds_fieldinfo;
    var fk_fieldName = fieldInfo[col.prop].FK_FIELDNAME; //关联外键字段
    var fk_txtName = fieldInfo[col.prop].FK_TXTNAME;   //关联显示字段

    //引用数据过滤条件
    let code = $DS.getPms("USER_admdivCode");
    let colSqlFilter = "";
    if ($DS.getPms('USER_isSuperUUser') == true) {
        colSqlFilter = "YEAR='${V.USER_currentyear}'";
    } else {
        colSqlFilter = "ADMDIVCODE='" + code + "' AND  YEAR='${V.USER_currentyear}'";
    }

    colSqlFilter = $DS.util.replace(colSqlFilter);
    var result = $DS.selectRefFiled(VUECFG.appId, fieldInfo[col.prop], fk_txtName, fk_fieldName, false, false, false, colSqlFilter);
    if (result.isError) {
        console.error("【" + col.label + "】 列引用数据获取失败! 失败原因:" + result.errMsg);
        col["options"] = [];
    } else {
        result = result.result;
    }
    var options = [];
    if (result && result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            var option = {value: result[i][fk_fieldName], label: result[i][fk_txtName]};
            options.push(option);
        }
    } else {
        options = result;
    }
    pageInfo_MOF_DEP_CODE = options;
    return options;
}




function setMOF_DEP_CODEOptions(info) {
    debugger
    if (pageInfo_MOF_DEP_CODE) {
        let gridRef = window[info.ds_id+"_gridRef"];
        for(let col of gridRef.computed_columns){
            if(col.id=='MOF_DEP_CODE'){
                col.options = pageInfo_MOF_DEP_CODE
                break;
            }
        }
        return true
    }
    let fieldInfo = info.ds_fieldinfo;
    var fk_fieldName = fieldInfo.MOF_DEP_CODE.FK_FIELDNAME; //关联外键字段
    var fk_txtName = fieldInfo.MOF_DEP_CODE.FK_TXTNAME;   //关联显示字段

    //引用数据过滤条件
    let code = $DS.getPms("USER_admdivCode");
    let colSqlFilter = "";
    if ($DS.getPms('USER_isSuperUUser') == true) {
        colSqlFilter = "YEAR='${V.USER_currentyear}'";
    } else {
        colSqlFilter = "ADMDIVCODE='" + code + "' AND  YEAR='${V.USER_currentyear}'";
    }

    colSqlFilter = $DS.util.replace(colSqlFilter);
    delete fieldInfo.MOF_DEP_CODE.FK_FILTER
    var result = $DS.selectRefFiled(VUECFG.appId, fieldInfo.MOF_DEP_CODE, fk_txtName, fk_fieldName, false, false, false, colSqlFilter);
    let options = [];
    if (result.isError) {
        console.error("【" + col.label + "】 列引用数据获取失败! 失败原因:" + result.errMsg);
    } else {
        result = result.result;
    }
    if (result && result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            var option = {value: result[i][fk_fieldName], label: result[i][fk_txtName]};
            options.push(option);
        }
    } else {
        options = result;
    }
    pageInfo_MOF_DEP_CODE = options;
    let gridRef = window[info.ds_id+"_gridRef"];
    for(let col of gridRef.computed_columns){
        if(col.id=='MOF_DEP_CODE'){
            col.options = options;
            break;
        }
    }
}


