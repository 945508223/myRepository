var rulerCfg = {
    targetDb: "",//目标数据集
    fromDb: "",//来源数据集
    clearBfEpt: "",//导入前清空当前任务数据
    autoInit: "",//首次进入填报自动初始化
    compareTable: [],//对照设置
    keyFiled: "",//主键

}
var ctrlForCfg = {
    targetDb: "SELECT_目标数据集",//目标数据集
    fromDb: "SELECT_来源数据集",//来源数据集
    clearBfEpt: "SWITCH_清空任务数据",//导入前清空当前任务数据
    autoInit: "SWITCH_首次进入填报时自动初始",//首次进入填报自动初始化
    compareTable: "GRID_设置对照",

}
var ruleId = $DS.getPms("URL_RULEID");
let rptId = $DS.getPms("URL_REPORTID");
$DS.putPms("REPORTID", rptId)
let ruleCode = $DS.getPms("URL_CODE");
let dataSetMap = parent.parent.temporary.$DATASETMAP;

/**
 * 初始化加载页面  多文本的加载完成事件设置数据
 */
function initRuler(data) {
    debugger
    //let result = $DS.select(VUECFG.appId, "RULECONDITION", "RPT_T_ETLRULE", `AND REPORTID = ${rptId} AND RULECODE = ${ruleCode}`, "查询取数规则失败!");
    if (data) {
        rulerCfg = JSON.parse(data);
    }
    initRefData();
    for (let key in rulerCfg) {
        if ("keyFiled" == key) {
            continue;
        }
        //初始化表格数据
        if (key == "compareTable") {
            let keyFileds = rulerCfg['keyFiled'].split(",");
            let tableData = [];
            let type = $DS.getPms("URL_type");
            if (type == 'edit') {
                let havedTargetField = [];
                tableData = rulerCfg[key].map(rowStr => {
                    let row = {};
                    let data = rowStr.split("-");
                    row.TARGETFIELD = data[0];
                    row.COMPAREFIELD = data[1];
                    row.FIXEDVALUE = data[2];
                    if (keyFileds.indexOf(row.TARGETFIELD) != -1) {
                        row.KEYFILED = "1";
                    }
                    havedTargetField.push(row.TARGETFIELD);
                    return row;
                })
                if (rulerCfg.targetDb && tableData.length > 0) {
                    let targetLength = dataSetMap[rulerCfg.targetDb].children.length;
                    if (targetLength > tableData.length) {
                        for (let field of dataSetMap[rulerCfg.targetDb].children) {
                            if (havedTargetField.indexOf(field.ID) == -1) {
                                tableData.push({TARGETFIELD: field.ID});
                            }
                        }
                    }
                }
            }

            let gridInfo = $DS.getCtrl("GRID_设置对照").info;
            $grid.setData(gridInfo.ds_id, tableData);
        } else {
            let ctrlInfo = $DS.getCtrl(ctrlForCfg[key]).info;
            $DS.setValById(ctrlInfo.ds_id, rulerCfg[key], true);
        }
    }
}

/**
 * 初始化各控件引用数据
 */
function initRefData() {
    debugger

    let selectOptions = [];
    for (let key in dataSetMap) {
        if (key == "SSO_USER") continue;
        let selectOption = {};
        selectOption.value = key;
        selectOption.label = dataSetMap[key].NAME;
        selectOptions.push(selectOption);
        if (key == rulerCfg.targetDb) {
            setTableColOption("TARGETFIELD", dataSetMap[key].children ? dataSetMap[key].children : [], true)
        }
        if (key == rulerCfg.fromDb) {
            setTableColOption("COMPAREFIELD", dataSetMap[key].children ? dataSetMap[key].children : [], true)
        }
    }
    let selectArr = ["SELECT_目标数据集", "SELECT_来源数据集"];
    for (let select of selectArr) {
        $DS.getCtrl(select).info.ds_options = selectOptions;
    }
}

/**
 * 设置表格列引用数据
 */
function setTableColOption(colId, dataSet, isInit) {
    let gridInfo = $DS.getCtrl("GRID_设置对照").info;
    let cols = gridInfo.ds_columns;
    if ($DS.util.isString(cols)) {
        cols = JSON.parse(cols);
    }
    for (let col of cols) {
        if (col.id == colId) {
            col.options = dataSet.map(item => {
                let newItem = {};
                newItem.value = item.ID;
                newItem.label = `${item.ID} （${item.NAME}）`;
                return newItem;
            })
            //col.options.push({value: '', label: '无'});
            break;
        }
    }
    if (!isInit) {
        gridInfo.ds_grid = [];
        if (colId == "TARGETFIELD") {
            for (let i = 0; i < dataSet.length; i++) {
                gridInfo.ds_grid.push({TARGETFIELD: dataSet[i].ID, COMPAREFIELD: ""});
            }
        } else if (colId == "COMPAREFIELD") {
            for (let row of window[gridInfo.ds_id + "_gridRef"].$refs.multipleTable.data) {
                row.COMPAREFIELD = '';
                gridInfo.ds_grid.push(row);
            }
        }
        $grid.setData(gridInfo.ds_id, gridInfo.ds_grid);
    }
    gridInfo.ds_columns = JSON.stringify(cols);
}

/**
 * 清空配置
 */
function clearAllCfg() {
    debugger
    rulerCfg = {
        targetDb: "",//目标数据集
        fromDb: "",//来源数据集
        clearBfEpt: "",//导入前清空当前任务数据
        autoInit: "",//首次进入填报自动初始化
        compareTable: [],//对照设置
        keyFiled: "",//主键
    }
    for (let ctrlKey in ctrlForCfg) {
        let ctrlInfo = $DS.getCtrl(ctrlForCfg[ctrlKey]).info;
        if (ctrlKey == "compareTable") {
            let cols = ctrlInfo.ds_columns;
            if ($DS.util.isString(ctrlInfo.ds_columns)) {
                cols = JSON.parse(ctrlInfo.ds_columns);
            }
            for (let col of cols) {
                if (col.id == "TARGETFIELD" || col.id == "COMPAREFIELD") {
                    col.options = []
                }
            }

            ctrlInfo.ds_columns = JSON.stringify(cols);
            ctrlInfo.ds_grid = [];
        } else {
            $DS.setValById(ctrlInfo.ds_id, "");
        }
    }
}


/**
 * 保存规则
 */
function saveRuler() {
    debugger
    let type = $DS.getPms("URL_type");
    // 获取表格数据处理 设置主键
    for (let key in rulerCfg) {
        if (key == "keyFiled") {
            continue
        }
        let ctrlInfo = $DS.getCtrl(ctrlForCfg[key]).info;
        if (key == "compareTable") {
            let gidData = $grid.getAllData(ctrlInfo.ds_id);
            let keyFileds = [];
            rulerCfg[key] = [];

            for (let row of gidData) {
                if (!row.TARGETFIELD) continue;
                //未设置跳过
                if (!row.COMPAREFIELD && !row.FIXEDVALUE) continue;
                if (row.KEYFILED == "1") {
                    keyFileds.push(row.TARGETFIELD);
                }
                rulerCfg[key].push(`${row.TARGETFIELD ? row.TARGETFIELD : ""}-${row.COMPAREFIELD ? row.COMPAREFIELD : ""}-${row.FIXEDVALUE ? row.FIXEDVALUE : ""}`)
            }
            rulerCfg.keyFiled = keyFileds.join(",");
        } else {
            rulerCfg[key] = $DS.getValById(ctrlInfo.ds_id);
        }
    }

    $DS.getCtrl("TEXTAREA_数据").info.ds_textarea = JSON.stringify(rulerCfg);
    $DS.getCtrl("INPUT_规则类型").info.ds_input = "TABLE";
    var result = $DS.saveSource(type, "DS_整表取数规则");
    if (result && !result.isError) {
        parent.$DS.loadCtrl("GRID_取数规则");
        $DS.util.close();
        parent.alert("保存成功");
    } else {
        alert(result.errMsg ? result.errMsg : "保存失败");
        return false;
    }
}


showRowConditionByCode(${V.$row});

//判断是否隐藏行
//speardUtil.getExt(0,${V.$row},0).INC_EXP_SORT_CODE.substring(0,${V.URL_SUBLEN})!=${V.URL_SHOWCODE}
function showRowConditionByCode(row) {
    debugger
    let code, len;
    let TASKADMDIVCODE = speardUtil.getPms('URL_TASKADMDIVCODE');
    let BUDGETLEVEL = speardUtil.getPms('URL_BUDGETLEVEL');
    let ENDFLAG = speardUtil.getPms('URL_ENDFLAG');
    let INC_EXP_SORT_CODE = speardUtil.getExt(0, row, 0).INC_EXP_SORT_CODE;

    if (BUDGETLEVEL == '2') {
        code = TASKADMDIVCODE.substring(0, 2);
        len = 2;
    }
    //市级非末级
    else if ((BUDGETLEVEL == '3' || BUDGETLEVEL == '4') && ENDFLAG == '0') {
        code = TASKADMDIVCODE.substring(0, 4);
        len = 4;
    } else {
        code = TASKADMDIVCODE;
        len = 12;
    }

    if (code.substr(0,4)==INC_EXP_SORT_CODE.substr(0,4)&&(BUDGETLEVEL == '3' || BUDGETLEVEL == '4') && ENDFLAG == '1' && INC_EXP_SORT_CODE.substr(4,1)=='7') {
        return false;
    }
    if(code.substr(0,5)==INC_EXP_SORT_CODE.substr(0,5)&&(parseInt(BUDGETLEVEL)>5&&INC_EXP_SORT_CODE.substr(6,1) == '7')){
        return false;
    }
    //根据级次截取不同位数编码
    if ((INC_EXP_SORT_CODE && INC_EXP_SORT_CODE.substring(0, len) != code)) {
        return true;
    }
}