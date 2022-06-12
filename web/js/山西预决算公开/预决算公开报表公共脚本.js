//报表ID
var rptId = speardUtil.getPms("URL_reportid");
//存储表名
var tableName_
//--------------------------------------------------------------------------------类-----------------------------------------------------------------------------------------------------
//单元格值变更保存
//初始化
function init() {
    debugger
    /*let type = parent.parent.parent.$DS.getPms("URL_TYPE");
    window["pageParams"]["TYPE"] = type;*/
    //初始化汇总数据
    //initRptSnapshot();
    ETLFullData("first");
    //获取存储表名
    tableName_ = getTableName();
}

//获取存储表名
function getTableName() {
    //查询表名
    let sql = `select STORTABLENAME from RPT_T_REPORTTEMPLET where GUID = '${rptId}'`;
    let result = speardUtil.selectBySql(sql);
    //拿到对应存储表名
    let tableName = result.result[0] && result.result[0]["STORTABLENAME"] ? result.result[0]["STORTABLENAME"].trim() : "";
    return tableName;
}

init();
var listObj = {};
var BS = 0;

//获得扩展的列
function setListCell() {
    debugger
    let tb = temporary.mapFormulaExpand;
    let tbArr = Object.keys(tb);
    tbArr.map(item => {
        let itemArr = Object.keys(tb[item]);
        listObj[item] = new Object;
        itemArr.map(itemC => {
            let itemCArr = Object.keys(tb[item][itemC]);
            itemCArr.map(itemCA => {
                listObj[item] [itemCA] = true;
            });
        })
    })
}

//汇总
function reportSum(taskid, str) {
    debugger
    let $DS = parent.$DS;
    //let sysDate = $DS.util.timeFormate(pageParams["SYS_DATE"], "yyyy-MM-dd HH:mm:ss");
    let sql = new String();
    let result;
    //年度
    let year = speardUtil.getPms("URL_YEAR");
    if (!year) return false;

    let selectCondition1 = new Array();//查询数据主要条件
    let selectSum = new Array();//查询数据主要条件(SUM)
    //报表ID
    let rptId = speardUtil.getPms("URL_reportid");
    //查询表名
    sql = `select STORTABLENAME from RPT_T_REPORTTEMPLET where GUID = '${rptId}'`;
    result = speardUtil.selectBySql(sql);
    //拿到对应存储表名
    let tableName = result.result[0] && result.result[0]["STORTABLENAME"] ? result.result[0]["STORTABLENAME"].trim() : "";
    if (!tableName) return;

    //拿到表所有字段和对应属性
    result = $DS.selectFieldInfo(tableName, parent.VUECFG.appId);
    if (!result && result.isError) {
        console.log("获取表字段信息失败!");
        return;
    }
    result = result.result;
    let selectArr = ["LEVELS", "INC_EXP_SORT_CODE", "VERSION", "IS_DELETED", "VERSION_NAME", "INC_EXP_SORT_NAME", "GOV_BGT_ECO_CODE", "INCOME_SORT_CODE", "EXP_FUNC_CODE"];

    result.map(item => {
        if (item["FIELD_TYPE"] == "002") {
            //002代表为浮点型的字段
            selectSum.push(`SUM(${item["FIELD_NAME"]}) as ${item["FIELD_NAME"]}`);
        }
        if (selectArr.indexOf(item["FIELD_NAME"]) != -1)
            selectCondition1.push(`${item["FIELD_NAME"]}`);
    })
    sql = `select ${selectCondition1.join(",")} , ${selectSum} from ${tableName} where TASKID in (${str}) and YEAR = '${year}' group by ${selectCondition1.join(",")}`;
    result = speardUtil.selectBySql(sql);
    if (result.result.length == 0) return true;
    result = result.result;
    //--------------------------------加工插入数据-------------------------------
    //任务区划
    let TASKDIVCODE = speardUtil.getPms("URL_TASKDIVCODE");
    //加工截取区划代码
    let strCode = speardUtil.getPms("URL_MOF_DIV_CODE");

    for (let i = 0; i < result.length; i++) {
        let guid = getGUID_Y();
        result[i]["TASKID"] = taskid;
        result[i]["GUID"] = guid;
        result[i]["BGTPRO_ID"] = `${year}_${strCode}_${result[i]["INC_EXP_SORT_CODE"]}`
        result[i]["MOF_DIV_CODE"] = TASKDIVCODE;
        //result[i]["UPDATE_TIME"] = sysDate;
        //result[i]["CREATE_TIME"] = sysDate;
    }
    //-----------------------------------------------------------------------------
    let data = {inserted: result, updated: [], deleted: []};
    let deleteSql = [`delete ${tableName} where TASKID = '${taskid}' and YEAR = '${year}'`];
    let result1 = speardUtil.exeSqls(deleteSql.join(";"));
    result = $DS.saveAllTableData(tableName, "GUID", data, parent.VUECFG.appId);
    if (!result.isError && !result1.isError) {
        return true;
    } else
        return false;

}

//报表加载完成事件
function success_YL() {
    debugger;
    if (parent.moniterObj) {
        //获得随机数
        var d, s = "";
        d = new Date();
        s += (d.getMonth() + 1) + "" + d.getDate() + "" + d.getYear() + "-";
        s += d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();

        parent.moniterObj.data = s;
    }
}

//提取数据
function loadOtherData() {
    debugger
    let loading_ = new Loading();
    loading_.init({
        target: document.body
    });
    loading_.start();
    setTimeout(function () {
        try {
            var index = $SP.getActiveSheetIndex(spread);
            let result = speardUtil.refDataByReg(index);
            let result2 = ETLFullData("action");
            if (result && result2) {
                //刷新报表
                let rptIframeId = parent.$DS.getCtrl("IFRAME_采集表").info.ds_id;
                let src = parent.$(`#${rptIframeId}_iframe`).attr("src");
                parent.$(`#${rptIframeId}_iframe`).attr("src", "");
                parent.$(`#${rptIframeId}_iframe`).attr("src", src);
                parent.alert("提取数据成功!");
            } else
                console.error("提取数据失败!");
            //新增历史表
            addLoadOtherHistory("CREATE_TIME");
        } catch (e) {
            parent.alert("提取数据失败!");
            console.error(e);
        } finally {
            loading_.stop();
        }
    }, 500);
}

//校验
function checkReport() {
    debugger
    var index = $SP.getActiveSheetIndex(spread);
    let result = speardUtil.refConditionReg(index);
    result = speardUtil.getRegResult(index);
    let infoArr = Object.keys(result);
    if (infoArr && infoArr.length > 0) {
        let tb = true;
        infoArr.map(item => {
            if (result[item]["RULELEVEL"] == "2" || result[item]["RULELEVEL"] == "1")
                tb = false;
        })
        if (tb) {
            parent.alert("校验不通过!请检查");
            saveOnCheckRes(JSON.stringify(result));

        } else {
            parent.alert("校验不通过!请检查");
            saveOffChkResult(JSON.stringify(result));
        }

    } else {
        parent.alert("校验通过!");
        setChkTagToPass();
    }
}

//公共失去焦点保存事件
function cellsave(params) {
    debugger
    if (!params || !params["tag"]) return;
    //TODO 校验科目列是否可变更 不可变更则还原原值
    if (!checkIsAllowChangeCode(params)) return;
    //如果是公式单元格
    if (params["tag"]["celltype"] == "formula") {
        if (Object.keys(listObj).length == 0 && BS == 0) {
            setListCell();//构造对象
            BS++;
        }
        var index = $SP.getActiveSheetIndex(spread);
        var col = params["col"];
        if (listObj[index] && listObj[index][col])//扩展
            cellListSave(params);
        else//不扩展
            cellsaveNoP(params);
    } else {
        if (params["tag"]["expand"] == "NOEXPAND")
            cellsaveNoP(params);
        else
            cellListSave(params);
    }
    if (params["tag"]["tablename"])
        parent.$DS.clearTableSCache(params["tag"]["tablename"]);
    //TODO 科目编码变更, 如果是可编辑表格 且修改的是科目编码 同时将上级插入表中
    insertRowWithCodeChange(params);
    return true;
}

//失去焦点保存事件
function cellsaveNoP(params) {
    debugger
    try {
        if (!params["tag"]) return;
        let taskId = speardUtil.getPms("URL_TASKID");
        if (!taskId || taskId == "undefined") return;
        var rowValues = {};
        var sheet = params["sheet"];
        var row = params["row"];
        var col = params["col"];
        var tag = params["tag"];
        //当前cell的值
        var newVal = $SH.getValue(sheet, row, col);
        //转换单位
        var index = $SP.getActiveSheetIndex(spread);
        newVal = speardUtil.changeUnitToYuan(index, tag, newVal);
        //当前cell的定义：字段名
        //var tag = $SH.getTag(sheet,row,col);
        var fieldName = tag.fieldname;
        var tablename = tag.tablename;
        if (!fieldName || !tablename) return;
        //当前cell行条件、列条件单元格
        var conditionTag = speardUtil.getConditionInfo(row, col);
        var conditionLength = Object.keys(conditionTag);
        //没有行列条件,退出
        if (conditionLength == 0 && fieldName == "REMARK" && tablename == "PM_GFA_REPORTREMARK") {
            let isString = tag["numberType"] == "string" ? true : false;
            let defFieldObj = {
                GUID: `'${getGUID_Y()}'`,
                YEAR: `'${speardUtil.getPms("URL_YEAR")}'`,
                CREATE_TIME: "sysdate",
                UPDATE_TIME: "sysdate",
                CREATE_USER: `'${speardUtil.getPms("USER_MID")}'`,
                REPORTID: `'${speardUtil.getPms("URL_reportid")}'`
            }
            var saveResult = pubSave_(tablename, "TASKID", taskId, defFieldObj, fieldName, newVal, isString);
            if ((saveResult) && (saveResult.isError))
                parent.alert(saveResult.errMsg);
        } else {
            if (conditionLength == 0) return;
            var rowConditionTag = conditionTag.row;
            var colConditionTag = conditionTag.col;
            //取行条件单元格的扩展属性：BUDGETFROM:0101;FUNDLEVEL:1
            getRowValues(rowConditionTag, rowValues);
            getRowValues(colConditionTag, rowValues);
            let defFieldObj = getTableDefaultField(row, rowValues);
            //没有成功生成默认值,退出
            if (!defFieldObj) return;
            Object.assign(rowValues, defFieldObj);
            let isString = tag["numberType"] == "string" ? true : false;
            var saveResult = pubSave_(tablename, "TASKID", taskId, rowValues, fieldName, newVal, isString);
            if ((saveResult) && (saveResult.isError))
                parent.alert(saveResult.errMsg);
        }
    } catch (err) {
        parent.alert(err);
    }
}

//列扩展失去焦点保存事件
function cellListSave(params) {
    debugger
    try {
        if (!params["tag"]) return;
        var sheet = params["sheet"];
        var row = params["row"];
        var col = params["col"];
        var tag = params["tag"];
        //当前cell的值
        var newVal = $SH.getValue(sheet, row, col);
        //转换单位
        var index = $SP.getActiveSheetIndex(spread);
        newVal = speardUtil.changeUnitToYuan(index, tag, newVal);
        //当前cell的定义：字段名
        //var tag = $SH.getTag(sheet,row,col);
        var fieldName = tag.fieldname;
        var tablename = tag.tablename;
        if (!fieldName || !tablename) return;
        //--------------------列条件----------------------------------------------------
        var tb = {};
        var conditionTag = speardUtil.getConditionInfo(row, col);
        var rowConditionTag = conditionTag.row;
        var colConditionTag = conditionTag.col;
        //取行条件单元格的扩展属性：BUDGETFROM:0101;FUNDLEVEL:1
        getRowValues(rowConditionTag, tb);
        getRowValues(colConditionTag, tb);
        let infoArr = Object.keys(tb);
        let conditionArr = new String();
        if (infoArr.length > 0) {
            infoArr.map(item => {
                conditionArr += ` and ${item} = '${tb[item]}'`;
            });
        }
        //---------------------------------------------------------------------------
        //判断单元格是否是字符串类型
        let isString = tag["numberType"] == "string" ? true : false;
        newVal = isString ? `'${newVal}'` : newVal;
        let taskId = speardUtil.getPms("URL_TASKID");
        //主键字段名
        let keyField = "GUID";
        //主键值(固定在每行的第二列取)
        let keyVal = $SH.getValue(sheet, row, 1);
        let sqls = new Array();
        let sql = new String();
        if (!keyVal) {
            let BGTPRO_ID = insertRow_after(params, row);
            sql = `update ${tablename} set ${fieldName} = ${newVal} where TASKID = '${taskId}' and ${keyField} = '${BGTPRO_ID}' ${conditionArr}`;
        } else
            sql = `update ${tablename} set ${fieldName} = ${newVal} where TASKID = '${taskId}' and ${keyField} = '${keyVal}' ${conditionArr}`;

        sqls.push(sql);
        if (fieldName == "ITEMCODE" && isString)
            sqls.push(`update ${tablename} set BGTPRO_ID = '${getBGTPRO_ID()}_${newVal.replaceAll("'", "")}' where TASKID = '${taskId}' and ${keyField} = '${keyVal}' ${conditionArr}`);
        //修改审核编辑//合并
        let updateSignSql = setChkTagToUnChk();
        if (updateSignSql)
            sqls = sqls.concat(updateSignSql);

        let result = speardUtil.exeSqls(sqls.join(";"));
    } catch (err) {
        parent.alert(err);
    }
}

//--------------------------------------------------------------------------------类-----------------------------------------------------------------------------------------------------
//设置业务主键
function getBGTPRO_ID() {
    let keyCombination = pageargs[0]["keyValue"];
    if (keyCombination) {
        keyCombination = speardUtil.replace(keyCombination);
        return keyCombination;
    } else
        return false;
}

//上传成功事件
function upload_success_YL(params) {
    debugger
    if (!params["tag"]) return;
    var rowValues = {};
    var sheet = params["sheet"];
    var row = params["row"];
    var col = params["col"];
    var tag = params["tag"];
    //当前cell的值
    var newVal = params.result.fileUrl || "";
    //当前cell的定义：字段名
    //var tag = $SH.getTag(sheet,row,col);
    var fieldName = tag.fieldname;
    var tablename = tag.tablename;
    if (!fieldName || !tablename) return;

    //当前cell行条件、列条件单元格
    var conditionTag = speardUtil.getConditionInfo(row, col);
    var conditionLength = Object.keys(conditionTag);
    //没有行列条件,退出
    if (conditionLength == 0) return;
    var rowConditionTag = conditionTag.row;
    var colConditionTag = conditionTag.col;
    //取行条件单元格的扩展属性：BUDGETFROM:0101;FUNDLEVEL:1
    getRowValues(rowConditionTag, rowValues);
    getRowValues(colConditionTag, rowValues);
    let defFieldObj = getTableDefaultField(row);
    //没有成功生成默认值,退出
    if (!defFieldObj) return;
    Object.assign(rowValues, defFieldObj);
    let isString = tag["numberType"] == "string" ? true : false;
    //保存
    let taskId = speardUtil.getPms("URL_TASKID");
    if (!taskId || taskId == "undefined") return;
    var saveResult = pubSave_(tablename, "TASKID", taskId, rowValues, fieldName, newVal, isString);
    if ((saveResult) && (saveResult.isError))
        parent.alert(saveResult.errMsg);
    if (saveResult.isError) {
        parent.alert("上传失败!");
        console.error(saveResult.errMsg)
    } else {
        parent.alert("上传成功")
        resetMutipHyperLinkCell(sheet, row, col, ["viewCfg", "uploadCfg", "delCfg"])
    }
}

/**
 * 删除附件事件
 * @param params link row col result
 * @private
 */
function delFile_(params) {
    debugger
    // 删除数据库中数据
    if (!params["tag"]) return;
    var rowValues = {};
    var sheet = params["sheet"];
    var row = params["row"];
    var col = params["col"];
    var tag = params["tag"];
    //当前cell的值
    var newVal = params.result.fileUrl || "";
    //当前cell的定义：字段名
    //var tag = $SH.getTag(sheet,row,col);
    var fieldName = tag.fieldname;
    var tablename = tag.tablename;
    if (!fieldName || !tablename) return;
    //当前cell行条件、列条件单元格
    var conditionTag = speardUtil.getConditionInfo(row, col);
    var conditionLength = Object.keys(conditionTag);
    //没有行列条件,退出
    if (conditionLength == 0) return;
    var rowConditionTag = conditionTag.row;
    var colConditionTag = conditionTag.col;
    //取行条件单元格的扩展属性：BUDGETFROM:0101;FUNDLEVEL:1
    getRowValues(rowConditionTag, rowValues);
    getRowValues(colConditionTag, rowValues);
    let defFieldObj = getTableDefaultField(row);
    //没有成功生成默认值,退出
    if (!defFieldObj) return;
    Object.assign(rowValues, defFieldObj);
    let isString = tag["numberType"] == "string" ? true : false;
    //保存
    let taskId = speardUtil.getPms("URL_TASKID");
    if (!taskId || taskId == "undefined") return;
    var saveResult = pubSave_(tablename, "TASKID", taskId, rowValues, fieldName, newVal, isString);

    resetMutipHyperLinkCell(params.sheet, params.row, params.col, ["uploadCfg"]);
    parent.alert("删除成功")
}

//-----------------------------------------------------------------------------------方法区------------------------------------------------------------------------------------------
//增加提取数据历史表
function addLoadOtherHistory(timeFieldName) {
    let type = "add";
    let guid = '';
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    /*  let sql = `select * from RURAL_TASKDATA_HISTORY where TASKID = '${grid_node_val["TASKID"]}' and SUPERTASKID = '${grid_node_val["SUPERTASKID"]}' and REPORTID = '${speardUtil.getPms("URL_reportid")}'`;
      let result = speardUtil.selectBySql(sql);
      if (result && result.result && result.result.length > 0) {
          type = "edit";
          guid = result.result[0]["GUID"];
      }*/
    let taskId = speardUtil.getPms("URL_TASKID");
    let data = {
        GUID: "",
        TASKID: taskId,
        SUPERTASKID: grid_node_val["SUPERTASKID"],
        REPORTID: speardUtil.getPms("URL_reportid"),
        [timeFieldName]: formateTime(new Date(), "yyyy-MM-dd HH:mm:ss")
    }
    let param = {
        type: "add",
        columns: "",
        keyField: "GUID",
        tableName: "RURAL_TASKDATA_HISTORY",
        isRefOrderNum: "1",
        datas: JSON.stringify(data),
        dbSource: ""
    }
    var basePath = parent.$DS.util.getProjectName(parent.VUECFG.appId);
    result = parent.YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/saveForm", param);
    if (!result || result.isError)
        console.error("新增历史表错误!");
}

/**
 * 保存具体实现
 * @param taskid  任务id
 * @param itemcode   科目编码
 * @param byear    年份
 * @param fieldName  字段名
 * @param newVal    变更后的内容
 * @returns {*}
 */
function pubSave_(tablename, keyFiled, keyVal, data, fieldName, newVal, isString) {
    //if (!data["ITEMCODE"]) return;
    var sqls = new Array();
    let deleteCondition = "";//删除数据主要条件
    let insertArrayVal = [];//新增数据主要条件

    //删除旧数据
    var delsql = "";
    let infoArray = Object.keys(data);
    infoArray.map(item => {
        //构造删除的条件
        //字段不能是GUID和收支主键
        let notCondion = ["GUID", "BGTPRO_ID", "CREATE_TIME", "UPDATE_TIME", "MOF_DIV_CODE", "CREATE_USER"];
        if (notCondion.indexOf(item) == -1)
            deleteCondition += ` and ${item} = ${data[item]}`;
        //构造插入字段对应的值
        insertArrayVal.push(`${data[item]}`);
    })
    //判断该单元格的值是否是字符串类型
    let type = isString ? " IS NOT NULL" : " <>0";
    delsql = `delete from ${tablename} where ${keyFiled} = '${keyVal}' ${deleteCondition} and ${fieldName} ${type}`;
    sqls.push(delsql);

    //修改审核编辑//合并
    //let updateSignSql = setChkTagToUnChk();
    //if (updateSignSql)
    //   sqls = sqls.concat(updateSignSql);

    if (newVal) {
        newVal = isString ? `'${newVal}'` : newVal;
        let insertSql = `insert into ${tablename} (${infoArray.join(",")},${keyFiled},${fieldName}) values (${insertArrayVal.join(",")},'${keyVal}',${newVal})`;
        sqls.push(insertSql);
    }
    //执行sql
    let result = speardUtil.exeSqls(sqls.join(";"));
    //修改历史表
    //addLoadOtherHistory("UPDATE_TIME");
    return result
}

//取行条件扩展属性保存的列数据
function getRowValues(conditionTag, rowValues) {
    if ((conditionTag) && (conditionTag.extpro)) {
        var tmp = conditionTag.extpro.split(";");
        for (var i = 0; i < tmp.length; i++) {
            var item = tmp[i].split(":");
            if (item.length > 0)
                rowValues[item[0].trim()] = `'${item[1].trim()}'`;
        }
    }
}

//拿到表中默认字段
//row:行数
//isHas:已经拥有的条件(Object)
/**
 *
 * @param row
 * @param isHas
 * @param isList
 * @param isInsertRow 是否插入行事件时调用
 * @returns {{}}
 */
function getTableDefaultField(row, isHas, isList, isInsertRow) {
    let TASKDATA = pageParams["TASKDATA"];
    var sheet = $SP.getActiveSheet(spread);
    let ADMDIV = TASKDATA["ADMDIV"];
    let MOF_DIV_CODE = TASKDATA["MOF_DIV_CODE"];
    let AGENCY_ID = TASKDATA["AGENCYID"];
    let AGENCY_CODE = TASKDATA["AGENCY_CODE"];
    let CREATE_USER = speardUtil.getPms("USER_MID");
    let fieldInfo = {};
    let year = speardUtil.getPms("URL_YEAR");
    let itemName = new String();
    if (!isList) {
        let isHav = $SH.getValue(sheet, row, 1) || "";
        if (!isNaN(isHav)) isHav = $SH.getValue(sheet, row, 0) || "";
        itemName = isHav.indexOf("、") != -1 ? isHav.split("、")[1] : isHav;
    }
    let guid = getGUID_Y();

    fieldInfo["GUID"] = `'${guid}'`;
    fieldInfo["BGTPRO_ID"] = `'${guid}'`;
    fieldInfo["YEAR"] = `'${year}'`;//年度
    fieldInfo["MOF_DIV_CODE"] = `'${MOF_DIV_CODE.trim()}'`;//财政区划代码
    fieldInfo["ADMDIV"] = `'${ADMDIV}'`;
    fieldInfo["AGENCY_ID"] = `'${AGENCY_ID}'`;
    fieldInfo["AGENCY_CODE"] = `'${AGENCY_CODE}'`;
    fieldInfo["UPDATE_TIME"] = "sysdate";//更新时间
    fieldInfo["CREATE_TIME"] = "sysdate";//创建时间
    fieldInfo["CREATE_USER"] = `'${CREATE_USER}'`;
    if (!isHas || !isHas["ITEMNAME"])
        fieldInfo["ITEMNAME"] = `'${itemName.trim()}'` //科目名称
    //TODO 插入行时调用
    if (isInsertRow && window.insertRowWithCodeChangeOpt) {
        fieldInfo = updateDefaultFieldByCodeChangeOpt(fieldInfo);
    }
    return fieldInfo;
}

/**
 * 重新设置附件单元格
 * @param sheet
 * @param row
 * @param col
 */
function resetMutipHyperLinkCell(sheet, row, col, itemArr) {
    debugger
    let cellType = sheet.getCellType(row, col);
    if (cellType._items.length == 2) return;


    let viewCfg = {
        "text": "查看",
        "clickAction": function (linkInfo) {
            debugger
            let sheet = $SP.getActiveSheet(spread);
            let tag = speardUtil.getTagByIndex(sheet, linkInfo.row, linkInfo.col);
            if (tag && tag.linkUrl) {
                var url = "http://" + speardUtil.getFastDFSUrl() + tag.linkUrl;
                var arr = tag.linkUrl.split(".");
                var fileName = tag.linkName;
                var type = arr[arr.length - 1];
                switch (type) {
                    case "docx":
                        speardUtil.viewWord(url, fileName)
                        break;
                    case "xls":
                    case "xlsx":
                        speardUtil.viewExcel(url, fileName)
                        break;
                    default:
                        window.open(url, fileName);
                        break;
                }

            } else {
                parent.alert("请先上传附件");
            }
        }
    }
    let uploadCfg = {
        "text": "上传",
        "clickAction": function (linkInfo) {
            $("#file").attr("row", linkInfo.row).attr("col", linkInfo.col);
            //记录超链接单元格信息
            let sheet = $SP.getActiveSheet(spread);
            let sheetName = $SH.getSheetName(sheet);
            if (!window.top.mutipLinkCellInfo) {
                window.top.mutipLinkCellInfo = {};
            }
            if (!window.top.mutipLinkCellInfo[sheetName]) {
                window.top.mutipLinkCellInfo[sheetName] = {};
            }
            window.top.mutipLinkCellInfo[sheetName][`${linkInfo.row}_${linkInfo.col}`] = linkInfo;
            $("#file").click();
        }
    }
    let delCfg = {
        "text": "删除",
        "clickAction": function (link) {
            debugger
            let flag = confirm("确认删除该附件?")
            if (flag) {
                let sheet = $SP.getActiveSheet(spread);
                let sheetIndex = spread.getActiveSheetIndex();
                let tag = speardUtil.getTagByIndex(sheet, link.row, link.col);
                let row = link.row;
                let col = link.col;
                if (tag && tag.linkUrl) {
                    let result = speardUtil.delFromFastDFS(tag.linkUrl);
                    tag.linkUrl = "";
                    tag.linkName = ""
                    $SH.setTag(sheet, row, col, JSON.stringify(tag));
                    if (pageargs && pageargs[sheetIndex] && pageargs[sheetIndex].delAppendix) speardUtil.eval(pageargs[sheetIndex].delAppendix, {
                        sheet,
                        row,
                        col,
                        tag,
                        link,
                        result
                    });
                }
            }
        }
    }


    let linkCfg = {
        linkInfo: []//[viewCfg, uploadCfg]
    }
    if (itemArr && itemArr.length > 0) {
        for (let item of itemArr) {
            switch (item) {
                case 'viewCfg':
                    linkCfg.linkInfo.push(viewCfg);
                    break;
                case 'uploadCfg':
                    linkCfg.linkInfo.push(uploadCfg);
                    break;
                case 'delCfg':
                    linkCfg.linkInfo.push(delCfg);
                    break;
            }
        }

    }
    var mutipLink = new MutipHyperLinkCellType(linkCfg);
    sheet.setCellType(row, col, mutipLink);
}


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
                item[tagetFiled] = (fromDataObj[key][compareObj[tagetFiled]]) * fieldUnitObj.mulriple_;
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

//==============================================================================快照===========================================================================================

/**
 * 保存快照
 */
function saveRptSnapshot() {
    debugger
    //获取汇总后sheet页信息
    let sheetInfo = speardUtil.getSheetJsonAndTag(spread, 0);
    if (!sheetInfo || !sheetInfo.JSON) {
        console.error("获取快照信息失败");
        return false;
    }
    sheetInfo.JSON.name = "原始汇总快照";

    let taskId = speardUtil.getPms('URL_TASKID');
    let rpttId = speardUtil.getPms('URL_reportid');
    if (!taskId || !rpttId) {
        console.error("保存快照失败,未获取到ID信息");
        return false;
    }
    let delSql = `delete from PM_GOV_SNAP where TASKID ='${taskId}' and REPORTID = '${rpttId}'`;
    let delRes = speardUtil.exeSql(delSql);
    if (!delRes || delRes.isError) {
        console.error(delRes.errMsg ? delRes.errMsg : "删除旧快照失败");
        return false;
    }
    var param = {
        type: 'add',
        columns: "",
        keyField: "TASKID",
        tableName: "PM_GOV_SNAP",
        datas: JSON.stringify(
            {
                TASKID: taskId,
                REPORTID: rpttId,
                CUSERID: speardUtil.getPms("USER_mid"),
                CUSERNAME: speardUtil.getPms("USER_UserName"),
                VERSION: "1",
                //RPTBODY: JSON.stringify(sheetInfo)
            }),
    }

    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/sysconfig/frame/saveForm", param);
    if (!result || result.isError) {
        console.error(result.errMsg ? result.errMsg : "保存快照失败");
        return false;
    }
    //保存大字段

    let result2 = YCDCommon.Ajax.syncAjax(getProjectName() + "/sysconfig/frame/setClob", {
        tableName: "PM_GOV_SNAP",
        keyFieldName: "TASKID",
        keyVal: taskId,
        clobFieldName: "RPTBODY",
        content: JSON.stringify(sheetInfo),
        whereStr: `1=1 AND TASKID ='${taskId}' and REPORTID = '${rpttId}'`
    });
    if (!result2 || result2.isError) {
        console.error(result2.errMsg ? result2.errMsg : "保存快照失败");
        return false;
    }
    //保存成功加载快照
    return setRptSnapshot(sheetInfo);

}


//加载汇总快照
function initRptSnapshot() {
    debugger
    let taskId = speardUtil.getPms('URL_TASKID');
    let rpttId = speardUtil.getPms('URL_reportid');
    if (!taskId || !rpttId) {
        console.error("保存快照失败,未获取到ID信息");
        return false;
    }
    var param = {
        keyFieldName: "TASKID",
        keyVal: taskId,
        tableName: "PM_GOV_SNAP",
        clobFieldName: "RPTBODY",
        whereStr: ` TASKID = '${taskId}' AND REPORTID = '${rpttId}'`
    }

    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/sysconfig/frame/getClob", param);
    if (!result || result.isError) {
        console.error(result.errMsg ? result.errMsg : "初始化快照失败,获取快照信息失败");
        return false;
    } else if (result.result) {
        return setRptSnapshot(result.result);
    }

    return true;
}

//设置报表快照
function setRptSnapshot(sheetInfo) {
    if (speardUtil.isString(sheetInfo)) {
        sheetInfo = JSON.parse(sheetInfo);
    }
    if (spread.getSheetCount() == 1) {
        spread.addSheet(1, new GC.Spread.Sheets.Worksheet("原始汇总快照"));
    }
    let snapSheet = spread.getSheet(1);
    let res = speardUtil.importSheet(spread, sheetInfo, 1, true);
    try {
        let rowCount = $SH.getRowCount(snapSheet);
        let colCount = $SH.getColumnCount(snapSheet);
        snapSheet.getRange(0, 0, rowCount, colCount, GC.Spread.Sheets.SheetArea.viewport).locked(true);
    } catch (e) {
        console.error(e);
    }
    return res;
}

//===========================================================================================================================================================================================
//进入报表时，标记为已审核通过，修改后标记为未审核通过，避免多次保存时多次执行修改标记
var curcheckStatus = "1";

//设置校验标记为未审核通过,返回SQL数组
function setChkTagToUnChk() {
    //当前状态为未审核时，不需要执行SQL打标记，直接返回空
    if (curcheckStatus == "0") return "";
    let taskId = speardUtil.getPms("URL_TASKID");
    let rptid = speardUtil.getPms("URL_reportid");
    let timeForMT = formateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
    let userName = speardUtil.getPms("USER_UserName");
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var sqls = new Array();
    sqls.push("delete from RURAL_TASK_RPTCHKDETAIL where TASKID='" + taskId + "' and RPTGUID='" + rptid + "'");
    sqls.push("insert into RURAL_TASK_RPTCHKDETAIL (TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME) values ('" + taskId + "','" + rptid + "','0','" + grid_node_val.SUPERTASKID + "','" + userName + "',TO_DATE('" + timeForMT + "','yyyy-mm-dd hh24-mi-ss'))");
    curcheckStatus = "0";
    return sqls;
}

//设置校验标记为审核通过,返回SQL数组
function setChkTagToPass() {
    let taskId = speardUtil.getPms("URL_TASKID");
    let rptid = speardUtil.getPms("URL_reportid");
    let timeForMT = formateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
    let userName = speardUtil.getPms("USER_UserName");
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    var sqls = new Array();
    sqls.push("delete from RURAL_TASK_RPTCHKDETAIL where TASKID='" + taskId + "' and RPTGUID='" + rptid + "'");
    sqls.push("insert into RURAL_TASK_RPTCHKDETAIL (TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME) values ('" + taskId + "','" + rptid + "','1','" + grid_node_val.SUPERTASKID + "','" + userName + "',TO_DATE('" + timeForMT + "','yyyy-mm-dd hh24-mi-ss'))");
    let result = speardUtil.exeSqls(sqls.join(";"));
    return sqls;
}

//设置校验标记为未审核通过(不保存结果)
function saveOffChkResult(chkResult) {
    let taskId = speardUtil.getPms("URL_TASKID");
    let rptid = speardUtil.getPms("URL_reportid");
    let timeForMT = formateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
    let userName = speardUtil.getPms("USER_UserName");
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    //保存普通信息
    var sqls = new Array();
    sqls.push("delete from RURAL_TASK_RPTCHKDETAIL where TASKID='" + taskId + "' and RPTGUID='" + rptid + "'");
    sqls.push("insert into RURAL_TASK_RPTCHKDETAIL (TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME) values ('" + taskId + "','" + rptid + "','0','" + grid_node_val.SUPERTASKID + "','" + userName + "',TO_DATE('" + timeForMT + "','yyyy-mm-dd hh24-mi-ss'))");
    speardUtil.exeSqls(sqls.join(";"));
    //保存大字段
    var result = parent.parent.$DS.select(parent.parent.VUECFG.appId, "GUID", "RURAL_TASK_RPTCHKDETAIL", " AND TASKID='" + taskId + "' and RPTGUID='" + rptid + "'", "");
    if (result.isError) {
        parent.alert(result.errMsg);
        return false;
    } else {
        var guid = result.result["GUID"];
        var result = parent.$DS.saveClob(parent.VUECFG.appId, "CHKRESULT", chkResult, "RURAL_TASK_RPTCHKDETAIL", "GUID", guid);
        if (result && !result.isError) {
        } else {
            parent.alert("保存校验结果失败：" + result.errMsg);
        }
    }
}

//设置校验标记为通过,并保存审核结果
function saveOnCheckRes(chkResult) {
    let taskId = speardUtil.getPms("URL_TASKID");
    let rptid = speardUtil.getPms("URL_reportid");
    let timeForMT = formateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
    let userName = speardUtil.getPms("USER_UserName");
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    //保存普通信息
    var sqls = new Array();
    sqls.push("delete from RURAL_TASK_RPTCHKDETAIL where TASKID='" + taskId + "' and RPTGUID='" + rptid + "'");
    sqls.push("insert into RURAL_TASK_RPTCHKDETAIL (TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME) values ('" + taskId + "','" + rptid + "','1','" + grid_node_val.SUPERTASKID + "','" + userName + "',TO_DATE('" + timeForMT + "','yyyy-mm-dd hh24-mi-ss'))");
    speardUtil.exeSqls(sqls.join(";"));
    //保存大字段
    var result = parent.parent.$DS.select(parent.parent.VUECFG.appId, "GUID", "RURAL_TASK_RPTCHKDETAIL", " AND TASKID='" + taskId + "' and RPTGUID='" + rptid + "'", "");
    if (result.isError) {
        parent.alert(result.errMsg);
        return false;
    } else {
        var guid = result.result["GUID"];
        var result = parent.$DS.saveClob(parent.VUECFG.appId, "CHKRESULT", chkResult, "RURAL_TASK_RPTCHKDETAIL", "GUID", guid);
        if (result && !result.isError) {
        } else {
            parent.alert("保存校验结果失败：" + result.errMsg);
        }
    }
}

//=============================================================================依赖===========================================================================================
//随机32位码
function getGUID_Y() {
    var guid = generateUUID();
    return guid.replaceAll("-", "").toUpperCase();
}

/**
 * 获得UUID
 * @return {}
 */
function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

//格式化日期格式
function formateTime(date, fmt, isAm, isTb) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + "日一二三四五六".charAt(date.getDay()));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    if (isAm) fmt = fmt + " " + formatAPShow(date.getHours());
    if (isTb) fmt = formatTbShow(date.getHours()) + " " + fmt;
    return fmt;

}

/**
 * AM/PM
 * @param {} h_24
 * @return {}
 */
function formatAPShow(h_24) {
    return h_24 < 12 ? 'AM' : 'PM';
}

/**
 * 上午/下午
 * @param {} h_24
 * @return {}
 */
function formatTbShow(h_24) {
    return h_24 < 12 ? '上午' : '下午';
}

//================================================加载完成事件===============================================================
//加载完成事件 汇总后生成快照
function loadAfterCreatSnap() {
    debugger
    if (parent.$DS.getPms('creatSnap') == true) {
        parent.$DS.delPms('creatSnap')
        let result = saveRptSnapshot();
    } else {
        initRptSnapshot()
    }
}

//报表加载完成事件
function success_YL() {
    debugger;
    if (parent.moniterObj) {
        //获得随机数
        var d, s = "";
        d = new Date();
        s += (d.getMonth() + 1) + "" + d.getDate() + "" + d.getYear() + "-";
        s += d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();

        parent.moniterObj.data = s;
    }
}

success_YL();

//新增行后事件
function insertRow_after(params, row) {
    debugger;
    if (!params) return;
    let sheet = $SP.getActiveSheet(spread);
    row = row || params["row"];

    let data = getTableDefaultField(row, null, true, true);
    //TODO LEVELS不存在 赋值
    if (!data.LEVELS) {
        data = $.extend(data, {
            LEVELS: $SH.getValue(sheet, row, 0) || 1
        });
    }

    //给主键单元格复制
    let GUID = data["GUID"].replaceAll("'", "");

    let infoArray = Object.keys(data);
    let insertArrayVal = infoArray.map(item => {
        //构造插入字段对应的值
        return `${data[item]}`;
    })
    let keyFiled = "TASKID";
    let keyVal = speardUtil.getPms("URL_TASKID");
    if (!keyVal) return;

    //拿到对应存储表名
    let tableName = tableName_;
    let sqls = [`insert into ${tableName} (${infoArray.join(",")},${keyFiled}) values (${insertArrayVal.join(",")},'${keyVal}')`];
    let result = speardUtil.exeSqls(sqls.join(";"));
    $SH.setValue(sheet, row, 1, GUID);
    return GUID;
}

//删除行前事件
function deleteRow_before(params) {
    debugger;
    if (!params) return;
    let sheet = $SP.getActiveSheet(spread);
    let row = params["row"];

    //拿到对应存储表名
    let tableName = tableName_;
    //主键
    let GUID = $SH.getValue(sheet, row, 1);
    let sqls = [`delete ${tableName} where GUID = '${GUID}'`];
    return speardUtil.exeSqls(sqls.join(";"));
}

//=======================可编辑表格科目编码列值变更相关============================================================
/**
 * 校验科目列是否可变更 科目编码变更 判断是否已经插入过 true 则不执行保存
 * @param params
 */
function checkIsAllowChangeCode(params) {
    debugger
    let pagePms = pageargs[spread.getSheetIndex(params.sheet.name())];
    if (params.tag.fieldname == 'ITEMCODE'
        && pagePms.isEditReport == 'TRUE'
        && params.tag.isAutoComplete == 'TRUE') {
        let code = params.args.newValue;
        let flag = checkCodeIsHaved(code, params.col, params.sheet, pagePms.startEditRow || 0, params.row);
        if (flag) {
            //还原单元格的值
            //params.sheet.setValue(params.row, params.col, params.args.oldValue);
            window.vm.$message.error("该科目已存在，请勿重复添加!");
            return false;
        }
        return true;
    }
    return true;
}

/**
 * 判断是否已存在某编码
 * @param code
 * @param col
 * @param sheet
 */
function checkCodeIsHaved(code, col, sheet, startEditRow, changeRowIndex) {
    let flag = false;
    //let startEditRow = pagePms.startEditRow || 0;
    let rowCount = sheet.getRowCount();
    for (let iterationRow = startEditRow; iterationRow <= rowCount; iterationRow++) {
        if (changeRowIndex == iterationRow) continue;

        if (code == $SH.getValue(sheet, iterationRow, col)) {
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * 科目编码变更插入行
 * @param params
 */
function insertRowWithCodeChange(params) {
    debugger
    /**
     * TODO
     *  判断原级次 是否大于1 true > 删除上级行 暂不考虑
     *  判断新级次 是否大于1 true > 插入新行
     */
    let pagePms = pageargs[spread.getSheetIndex(params.sheet.name())];
    if (params.tag.fieldname == 'ITEMCODE'
        && pagePms.isEditReport == 'TRUE'
        && params.tag.isAutoComplete == 'TRUE') {

        let options = speardUtil.getComboBoxOption(params.tag, params.sheet, true);
        let curIndex;
        if (params.args.newValue) {
            let curOption = options.find((item, index) => {
                if (item[params.tag.autoCompleteShowField] == params.args.newValue) {
                    curIndex = index;
                    return item;
                }
            });
            if (curOption && curOption.LEVELS > 1 && curIndex > 0) {
                //可以插入的option
                let insertRowOptions = [];
                for (let i = curIndex - 1; i >= 0; i--) {
                    let option = options[i];
                    let flag = checkCodeIsHaved(option[params.tag.autoCompleteShowField], params.args.col, params.sheet, pagePms.startEditRow || 0, params.row);
                    if (!flag) insertRowOptions.push(option);
                    if (option.LEVELS == 1) break;
                }
                //调用 向前插入行
                for (let i = 0; i < insertRowOptions.length; i++) {
                    setTimeout(() => {
                        window.insertRowWithCodeChangeOpt = insertRowOptions[i];
                        speardUtil.addOrDeleteEditRow('insertRowsBefore', params.args.row);
                        delete window.insertRowWithCodeChangeOpt;
                        $SH.setValue(params.sheet, params.args.row, 0, insertRowOptions[i].LEVELS);
                        $SH.setValue(params.sheet, params.args.row, params.args.col, insertRowOptions[i].VALUE);
                        $SH.setValue(params.sheet, params.args.row, params.args.col + 1, insertRowOptions[i].TEXT);
                        //重新设置 单元格类型为自动匹配
                        if (i == insertRowOptions.length - 1) {
                            let rowCount = params.sheet.getRowCount();
                            for (let j = (pagePms.startEditRow || 0); j < rowCount; j++) {
                                var tag = speardUtil.getTagByIndex(params.sheet, j, params.args.col);
                                if (tag && tag.isAutoComplete) {
                                    setVexpendAutoComplete(params.sheet, '', j, params.args.col, tag);
                                }
                            }
                        }
                    }, 500)
                }
            }
        }
    }
}

/**
 * 根据插入行所使用的option选项 修改字段值
 * @param fieldObj
 */
function updateDefaultFieldByCodeChangeOpt(fieldObj) {
    let option = window.insertRowWithCodeChangeOpt;
    fieldObj.LEVELS = option.LEVELS;
    fieldObj.BGTPRO_ID = `'${getBGTPRO_ID()}_${option.ITEMCODE.replaceAll("'", "")}'`
    fieldObj.ITEMCODE = `'${option.VALUE}'`;
    fieldObj.ITEMNAME = `'${option.TEXT}'`;
    return fieldObj;
}