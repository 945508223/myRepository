//=============================================================================整表提数========================================================================================

/**
 *  rulerCfg = {
        targetDb: "",//目标数据集
        fromDb: "",//来源数据集
        clearBfEpt: "",//导入前清空当前任务数据
        autoInit: "",//首次进入填报自动初始化
        compareTable: [],//对照设置
        keyFiled: "",//主键
    }
 提取数据
 @param type :first 报表初始化调用 ; action 手动触发提取按钮调用
 */
function ETLFullData(type) {
    debugger
    let rptId = speardUtil.getPms("URL_reportid");
    let ruler = getTableRuler(rptId);
    if (!ruler) return true
    var dataSetMap = {};
    let sql = `select SQL,TABLENAME,DATASETCODE,DATASETNAME,KEYFIELDS from RPT_T_REPORTTABLES where reportid='${rptId}' and datasetcode in ('${ruler.fromDb}','${ruler.targetDb}')`;
    let result = speardUtil.selectBySql(sql, "查询数据集信息失败!");
    if (result.isError) {
        console.error(result.errMsg);
        return false;
    }
    //构造数据集信息
    for (let item of result.result) {
        for (let key in item) {
            if (!dataSetMap[item.DATASETCODE]) {
                dataSetMap[item.DATASETCODE] = {}
            }
            dataSetMap[item.DATASETCODE][key] = item[key];
        }
    }

    let taskId = speardUtil.getPms("URL_TASKID");
    //页面首次加载 初始化数据
    if (ruler.autoInit == "1" && type == "first") {
        //如果没有数据就初始化
        var tmp = speardUtil.selectBySql(`select count(*) as CNT from ${dataSetMap[ruler.targetDb].TABLENAME} where TASKID='${taskId}'`);
        var table = tmp.result;
        if (table.length > 0) {
            var cnt = parseInt(table[0]["CNT"], 10);
            if (cnt > 0) {
                //如果有数据，就退出
                return true;
            }
        }
        getDataByTableRuler_Sql(ruler, dataSetMap);
    }
    //手动触发提取
    else if (type == "action") {
        if (!dataSetMap[ruler.targetDb].KEYFIELDS || !dataSetMap[ruler.fromDb].KEYFIELDS) {
            console.error("提取数据失败,未设置数据集主键")
            return false;
        }
        try {
            return getDataByTableRuler_compare(ruler, dataSetMap, taskId);

        } catch (e) {
            console.error("提取整表数据失败")
            console.error(e)
            return false;
        }
    }
}

//获取整表取数规则
function getTableRuler(rptId) {
    debugger

    let sql = `SELECT RULECONDITION ,RULESETCONDITION FROM RPT_T_ETLRULE WHERE REPORTID = '${rptId}' AND RULETYPE = 'TABLE'`;
    let res = speardUtil.selectBySql(sql, "查询取数规则信息异常!");
    if (!res || res.isError) {
        console.error(res.errMsg ? res.errMsg : "获取整表取数规则异常!");
        return false;
    } else if (res && res.result.length > 0) {
        for (let ruler of res.result) {
            let enableRuler = ruler.RULESETCONDITION;
            //未设置 直接 返回
            if (enableRuler == '' || enableRuler == undefined || enableRuler == null) {
                return JSON.parse(ruler.RULECONDITION);
            } else {
                //校验启用规则是否成立
                let setRes = speardUtil.replace(enableRuler, pageParams);
                if (!speardUtil.eval(setRes))
                    continue;
                else
                    return JSON.parse(ruler.RULECONDITION);
            }
        }
        return false;
    } else {
        return false;
    }

}


/**
 * 拼接sql获取数据
 */
function getDataByTableRuler_Sql(ruler, dataSetMap) {

    let taskId = speardUtil.getPms("URL_TASKID");
    //目标表
    let targetTb = dataSetMap[ruler.targetDb].TABLENAME;
    let fromSql = dataSetMap[ruler.fromDb].SQL;
    let deletesql = "";
    //导入前清空当前任务数据
    if (ruler.clearBfEpt == "1") {
        deletesql = ` delete from  ${targetTb} where TASKID='${taskId}'`;
    }
    //转换单位的字段对象
    let fieldUnitObj = getChangeUnitFieldByTag();

    //对照数据
    let compareData = ruler.compareTable;
    let insertedFiled = compareData.map(item => {
        let data = item.split("-");
        /*if (fieldUnitObj != false && fieldUnitObj[data[0]]) {
            return `NVL(${data[0]},0)*${fieldUnitObj.mulriple_} as ${data[0]}`
        } else*/
        return data[0];
    })
    var insertsql = ` insert into  ${targetTb} (${insertedFiled.join(",")})`;
    var selectsql = ` select `;
    for (let item of compareData) {
        let targetFiled = item.split("-")[0];
        let compareFiled = "";

        if (item.split("-")[1]) {
            compareFiled = item.split("-")[1];
        } else {
            compareFiled = speardUtil.replace(item.split("-")[2]);
        }
        if (fieldUnitObj != false && fieldUnitObj[targetFiled]) {
            compareFiled = `NVL(${compareFiled},0)*${fieldUnitObj.mulriple_}`
        }
        selectsql += `${compareFiled} AS ${targetFiled},`
    }
    selectsql = selectsql.substr(0, selectsql.length - 1) + " FROM (" + speardUtil.replaceForDataSet(fromSql) + ")";
    console.log(deletesql);
    console.log(insertsql);
    console.log(selectsql);

    if (deletesql) {
        let delRes = speardUtil.exeSql(deletesql);
        if (delRes.isError) {
            console.error(delRes.errMsg);
        }
    }
    let insertRes = speardUtil.exeSql(insertsql + " " + selectsql);
    if (insertRes.isError) {
        console.error(insertRes.errMsg);
    }
}


/**
 * 根据数据集做比较取数
 * @param ruler
 * @param dataSetMap
 */
function getDataByTableRuler_compare(ruler, dataSetMap, taskId) {
    //使用${} 替换sql中的参数
    //获取来源数据集sql
    let fromDbSql = speardUtil.replaceForDataSet(dataSetMap[ruler.fromDb].SQL);
    //目标数据集sql
    let targetDbSql = speardUtil.replaceForDataSet(dataSetMap[ruler.targetDb].SQL);
    //查询数据集数据
    let fromData = speardUtil.selectBySql(fromDbSql).result;
    //如果设置了转换单位 转为元
    let fieldUnitObj = getChangeUnitFieldByTag();
    //目标表数据
    let targetData = [];
    //提取前清空原始数据
    if (ruler.clearBfEpt == "1") {
        let targetTb = dataSetMap[ruler.targetDb].TABLENAME;
        let deletesql = ` delete from  ${targetTb} where TASKID='${taskId}'`;
        speardUtil.exeSql(deletesql);
    } else {
        targetData = speardUtil.selectBySql(targetDbSql).result;
    }
    //数据对象
    let fromDataObj = buildDataObj(fromData, dataSetMap[ruler.fromDb].KEYFIELDS);
    let targetDataObj = buildDataObj(targetData, dataSetMap[ruler.targetDb].KEYFIELDS);
    let compareObj = {};
    for (let rowStr of ruler.compareTable) {
        compareObj[rowStr.split("-")[0]] = rowStr.split("-")[1] ? rowStr.split("-")[1] : "$FIXED" + rowStr.split("-")[2]
    }

    let data = {inserted: [], updated: [], deleted: []};
    //目标存在 来源不存
    for (let key of Object.keys(targetDataObj)) {
        if (!fromDataObj[key]) {
            data.deleted.push(targetDataObj[key]);
        }
    }

    for (let key of Object.keys(fromDataObj)) {
        //目标不存在来源存在 插入 | 都存在 更新 | 目标存在 来源不存在 删除
        let item = updateTargetItem(compareObj, fromDataObj, key, fieldUnitObj);
        if (!targetDataObj[key]) {
            data.inserted.push(item);
        }
        //都存在 更新
        else if (targetDataObj[key]) {
            data.updated.push(item);
        }
    }
    console.log(data);
    var url = getProjectName() + "/sysconfig/frame/saveData";
    var params = {
        "tableName": dataSetMap[ruler.targetDb].TABLENAME,
        "rows": JSON.stringify(data),
        "keyField": dataSetMap[ruler.targetDb].KEYFIELDS,
    }
    var saveResult = YCDCommon.Ajax.syncAjax(url, params);
    if (saveResult.isError) {
        console.error(saveResult.errMsg);
        return false;
    } else if (saveResult && !saveResult.isError) {
        return true;
    }
}

//根据对照关系修改目标表数据
function updateTargetItem(compareObj, fromDataObj, key, fieldUnitObj) {
    let item = {};
    for (let tagetFiled in compareObj) {
        //固定值
        if (compareObj[tagetFiled].indexOf("$FIXED") != -1) {
            let val = speardUtil.replace(compareObj[tagetFiled].split("$FIXED")[1]);
            if (val.split("'").length == 3) {
                item[tagetFiled] = val.split("'")[1];
            }
        }
        //取来源数据
        else {
            if (fieldUnitObj != false && fieldUnitObj[tagetFiled]) {
                //item[tagetFiled] = parseFloat(fromDataObj[key][compareObj[tagetFiled]] * fieldUnitObj.mulriple_.toFixed(2));
                item[tagetFiled] = speardUtil.mul(fromDataObj[key][compareObj[tagetFiled]], fieldUnitObj.mulriple_);
            } else
                item[tagetFiled] = fromDataObj[key][compareObj[tagetFiled]];
        }
    }
    return item;
}


/**
 * 根据主键将数组数据转为对象
 * @param data
 * @param keyFileds
 * @returns {{}}
 */
function buildDataObj(data, keyFileds) {
    let obj = {};
    let keyArr = keyFileds.split(",");
    for (let row of data) {
        let keyFiled = "";
        for (let key of keyArr) {
            keyFiled += row[key];
        }
        obj[keyFiled] = row;
    }
    return obj;
}

//根据tag获取转换单位的字段
function getChangeUnitFieldByTag() {
    debugger
    let sheet = $SP.getActiveSheet(spread);
    let sheetPms = speardUtil.getTagByIndex(sheet, -1, -1);
    if (sheetPms && sheetPms.startUnit == 'TRUE' && sheetPms.oldUnit && (sheetPms.oldUnit !== 'DW_0' || sheetPms.oldUnit !== 'DW_1')) {
        let fieldUnitObj = {};
        let defaultUnit = sheetPms.oldUnit.split("_")[1];
        const count = parseInt(Math.abs(defaultUnit - 1));
        //放大倍数
        fieldUnitObj.mulriple_ = Math.pow(10, count);
        let index = $SP.getActiveSheetIndex(spread);
        for (let axis of tags_position[index]) {
            var tagval = speardUtil.getTagByIndex(sheet, axis.row, axis.col);
            if (tagval.isExportChangeUnit && tagval.isExportChangeUnit == 'TRUE') {
                fieldUnitObj[tagval.fieldname] = true;
            }
        }
        if (Object.keys(fieldUnitObj).length == 0) {
            return false;
        }
        return fieldUnitObj;
    } else return false;
}