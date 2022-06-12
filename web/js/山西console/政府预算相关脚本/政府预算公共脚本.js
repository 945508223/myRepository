//--------------------------------------------------------------------------------类-----------------------------------------------------------------------------------------------------
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
    var newVal = params.result.fileUrl + "$$" + params.result.fileName || "";
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

//--------------------------------------------------------------------------------类-----------------------------------------------------------------------------------------------------
//单元格值变更保存
//初始化
function init() {
    debugger
    try {
        if (parent && parent.parent && parent.parent.parent && parent.parent.parent.$DS) {
            let type = parent.parent.parent.$DS.getPms("URL_TYPE");
            window["pageParams"]["TYPE"] = type;
        }
        //ETLFullData("first");
    } catch (err) {
        console.log(err);
    }

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
        parent.alert("校验不通过!请检查");
        saveChkResult(JSON.stringify(result));
    } else {
        parent.alert("校验通过!");
        setChkTagToPass();
    }
}

//公共失去焦点保存事件
function cellsave(params) {
    debugger
    if (!params || !params["tag"]) return;
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


    return true;
}

//不扩展失去焦点保存事件
function cellsaveNoP(params) {
    debugger
    try {
        if (!params["tag"]) return;
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
        //保存
        let taskId = speardUtil.getPms("URL_TASKID");
        if (!taskId || taskId == "undefined") return;
        var saveResult = pubSave_(tablename, "TASKID", taskId, rowValues, fieldName, newVal, isString);
        if ((saveResult) && (saveResult.isError))
            parent.alert(saveResult.errMsg);
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
            })
        }
        //---------------------------------------------------------------------------
        //判断单元格是否是字符串类型
        let isString = tag["numberType"] == "string" ? true : false;
        newVal = isString ? `'${newVal}'` : newVal;
        let taskId = speardUtil.getPms("URL_TASKID");
        //主键字段名
        let keyField = "BGTPRO_ID";
        //主键值(固定在每行的第二列取)
        let keyVal = $SH.getValue(sheet, row, 1);
        if (!keyVal) return;
        let sqls = new Array();
        let sql = `update ${tablename} set ${fieldName} = ${newVal} where TASKID = '${taskId}' and ${keyField} = '${keyVal}' ${conditionArr}`;
        sqls.push(sql);

        //修改审核编辑//合并
        let updateSignSql = setChkTagToUnChk();
        if (updateSignSql)
            sqls = sqls.concat(updateSignSql);

        let result = speardUtil.exeSqls(sqls.join(";"));
    } catch (err) {
        parent.alert(err);
    }
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
    if (!data["INC_EXP_SORT_CODE"]) return;
    var sqls = new Array();
    let deleteCondition = "";//删除数据主要条件
    let insertArrayVal = [];//新增数据主要条件

    //删除旧数据
    var delsql = "";
    let infoArray = Object.keys(data);
    infoArray.map(item => {
        //构造删除的条件
        //字段不能是GUID和收支主键
        if (item != "GUID" && item != "BGTPRO_ID" && item != "CREATE_TIME" && item != "UPDATE_TIME" && item != "INC_EXP_SORT_NAME")
            deleteCondition += ` and ${item} = ${data[item]}`;
        //构造插入字段对应的值
        insertArrayVal.push(`${data[item]}`);
    })
    //判断该单元格的值是否是字符串类型
    let type = isString ? " IS NOT NULL" : " <>0";
    delsql = `delete from ${tablename} where ${keyFiled} = '${keyVal}' ${deleteCondition} and ${fieldName} ${type}`;
    sqls.push(delsql);

    //修改审核编辑//合并
    let updateSignSql = setChkTagToUnChk();
    if (updateSignSql)
        sqls = sqls.concat(updateSignSql);

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
function getTableDefaultField(row, isHas) {
    var sheet = $SP.getActiveSheet(spread);
    let fieldInfo = {};
    //let date = new Date();
    let year = speardUtil.getPms("USER_CURRENTYEAR");
    let isHav = $SH.getValue(sheet, row, 0) || "";
    if (!isNaN(isHav)) isHav = $SH.getValue(sheet, row, 1) || "";
    let itemName = isHav.indexOf("、") != -1 ? isHav.split("、")[1] : isHav;
    let guid = getGUID_Y();
    let MOF_DIV_CODE = speardUtil.getPms("URL_TASKDIVCODE");
    fieldInfo["GUID"] = `'${guid}'`;
    fieldInfo["BGTPRO_ID"] = `'${guid}'`;
    fieldInfo["YEAR"] = `'${year}'`;//年度
    fieldInfo["MOF_DIV_CODE"] = `'${MOF_DIV_CODE.trim()}'`;//财政区划代码
    fieldInfo["FISCAL_YEAR"] = `'${year}'`;//预算年度
    fieldInfo["UPDATE_TIME"] = "sysdate";//更新时间
    fieldInfo["IS_DELETED"] = 0;//是否删除
    fieldInfo["CREATE_TIME"] = "sysdate";//创建时间
    fieldInfo["VERSION"] = `'V1'`;//版本号
    fieldInfo["VERSION_NAME"] = `'草案'`//版本说明
    if (!isHas || !isHas["INC_EXP_SORT_NAME"])
        fieldInfo["INC_EXP_SORT_NAME"] = `'${itemName.trim()}'` //科目名称
    return fieldInfo;
}

//进入报表时，标记为已审核通过，修改后标记为未审核通过，避免多次保存时多次执行修改标记
var curcheckStatus = "1";

//设置校验标记为未审核通过,返回SQL数组
function setChkTagToUnChk() {
    //当前状态为未审核时，不需要执行SQL打标记，直接返回空
    if (curcheckStatus == "0") return "";
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    let taskId = speardUtil.getPms("URL_TASKID");
    let rptid = speardUtil.getPms("URL_reportid");
    let timeForMT = formateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
    let userName = speardUtil.getPms("USER_UserName");

    var sqls = new Array();
    sqls.push("delete from RURAL_TASK_RPTCHKDETAIL where TASKID='" + taskId + "' and RPTGUID='" + rptid + "'");
    sqls.push("insert into RURAL_TASK_RPTCHKDETAIL (TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME) values ('" + taskId + "','" + rptid + "','0','" + grid_node_val.SUPERTASKID + "','" + userName + "',TO_DATE('" + timeForMT + "','yyyy-mm-dd hh24-mi-ss'))");
    curcheckStatus = "0";
    return sqls;
}

//设置校验标记为审核通过,返回SQL数组
function setChkTagToPass() {
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    let taskId = speardUtil.getPms("URL_TASKID");
    let rptid = speardUtil.getPms("URL_reportid");
    let timeForMT = formateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
    let userName = speardUtil.getPms("USER_UserName");
    var sqls = new Array();
    sqls.push("delete from RURAL_TASK_RPTCHKDETAIL where TASKID='" + taskId + "' and RPTGUID='" + rptid + "'");
    sqls.push("insert into RURAL_TASK_RPTCHKDETAIL (TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME) values ('" + taskId + "','" + rptid + "','1','" + grid_node_val.SUPERTASKID + "','" + userName + "',TO_DATE('" + timeForMT + "','yyyy-mm-dd hh24-mi-ss'))");
    let result = speardUtil.exeSqls(sqls.join(";"));
    return sqls;
}

//设置校验标记为未审核通过,并保存审核结果
function saveChkResult(chkResult) {
    let topWin = parent.$DS.util.getTopWin("window");
    var grid_node_val = topWin.$DS.getPms("grid_node_val") ? parent.$DS.util.clone(topWin.$DS.getPms("grid_node_val")) : "";
    let taskId = speardUtil.getPms("URL_TASKID");
    let rptid = speardUtil.getPms("URL_reportid");
    let timeForMT = formateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
    let userName = speardUtil.getPms("USER_UserName");
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
    let sql = `SELECT RULECONDITION FROM RPT_T_ETLRULE WHERE REPORTID = '${rptId}' AND RULETYPE = 'TABLE'`;
    let res = speardUtil.selectBySql(sql, "查询取数规则信息异常!");
    if (!res || res.isError) {
        console.error(res.errMsg ? res.errMsg : "获取整表取数规则异常!");
        return false;
    } else if (res && res.result.length > 0) {
        let ruler = JSON.parse(res.result[0].RULECONDITION);
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
                    return;
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
    } else {
        return true;
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

//=============================================================================设置其中项========================================================================================

/**
 * //修改报表其中项
 * @param type first:初始化调用;action 手动设置涉密项目
 * @param porCodes {CANCLE:[],SURE:[]}
 */
function setInnerProjForRpt(type, porCodes) {
    debugger
    let sheet = $SP.getActiveSheet(spread);
    //获取INC_EXP_SORT_CODE 编码列tag 以及缩进列tag
    let C_IColTag = getCode_IndentColTag(sheet);
    if (!C_IColTag.INDENTTAG || !C_IColTag.CODETAG) {
        console.error("请设置缩进列和编码列");
        return false;
    }
    if (type == 'hideExp' || type == 'hidePro') {
        return setInerProj_init(sheet, C_IColTag, type);
    } /*else if ((type == "action" ||type == "hideExp")&& (porCodes.SURE.length || porCodes.CANCLE.length > 0)) {
        return setInerProj_action(porCodes, sheet, C_IColTag,type);
    }*/
}


/**
 * 页面初始化设置其中项目
 * @param sheet
 */
function setInerProj_init(sheet, C_IColTag, type) {
    debugger
    let sql = '';
    //科目
    if (type == 'hideExp') {
        sql = "select EXP_FUNC_CODE from PM_GOV_FUNC_SEC where 1=1 [AND]  MOF_DIV_CODE = '${V.USER_admdivCode}'";
    } else {
        //项目
        sql = "select PRO_CODE,EXP_FUNC_CODE from PM_GOV_PROJECT where 1=1 [AND]  MOF_DIV_CODE = '${V.USER_admdivCode}'";
    }
    sql = speardUtil.replace(sql);
    let result = speardUtil.selectBySql(sql);
    if (result && result.result && result.result.length > 0) {
        if (type == 'hideExp') {
            let codes = result.result.map(item => item.EXP_FUNC_CODE);
            return setInerProj_action({
                SURE: codes,//科目编码
                SUREPRO: codes,
            }, sheet, C_IColTag, type)
        } else {
            return setInerProj_action({
                SURE: result.result.map(item => item.EXP_FUNC_CODE),//科目编码
                SUREPRO: result.result.map(item => item.PRO_CODE)//项目编码
            }, sheet, C_IColTag, type)
        }


    } else if (!result || result.isError) {
        console.error(result.errMsg ? result.errMsg : "初始化其中项失败");
        return false;
    }
    return true;
}


/**
 * 手动调用
 * @param porCodes
 * @param sheet
 * @param codeTag 编码列tag
 * 层级信息
 * levelMap {
 *     3:[4]
 *     5:[6,7,8]
 * }
 */

function setInerProj_action(porCodes, sheet, C_Itag, type) {
    debugger
    let hideRows = getHideRowIndex();
    //遍历编码列 获取到后设置修改
    let codecol = C_Itag.CODETAG.col;//编码tag列坐标
    let indentcol = C_Itag.INDENTTAG.col;//缩进tag列坐标
    let sumcolsTag = C_Itag.SUMCOLS;//合计行列坐标
    let rowCount = $SH.getRowCount(sheet);
    //设置其中项科目编码数组
    let sureExp_codes = getExp_code(porCodes["SURE"], type);
    //隐藏的项目
    let delPro_codes = porCodes["SUREPRO"] && porCodes["SUREPRO"].length > 0 ? porCodes["SUREPRO"] : [];
    outer: for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        //获取编码
        let code = $SH.getValue(sheet, parseInt(rowIndex), parseInt(codecol));
        if (!code) continue;

        if (sureExp_codes.length > 0 && sureExp_codes.indexOf(code) != -1/*sureExp_codes.find(item => code.indexOf(item) == 0)*/) {
            if (sureExp_codes.length > 0) {
                //去除已搜索过的科目编码
                sureExp_codes = sureExp_codes.filter(item => item != code);
                //sureExp_codes.splice(0, 1);
            }
            //取消科目公式
            if (sumcolsTag.length > 0) {
                for (let tag of sumcolsTag) {
                    sheet.setFormula(parseInt(rowIndex), parseInt(tag.col), undefined);
                    let val = $SH.getValue(sheet, parseInt(rowIndex), parseInt(tag.col));
                    speardUtil.setObjVal(temporary, ['secretPro', code, tag.fieldname], val);
                }
            }
            //设置其中项
            for (let childRowIndex = rowIndex + 1; childRowIndex < rowCount; childRowIndex++) {
                let childcode = $SH.getValue(sheet, parseInt(childRowIndex), parseInt(codecol));
                //项目都被隐藏 遇到下一个科目 跳出
                if (childcode.length < 10 && (type == 'hidePro')) {
                    continue outer;
                } else if (childcode.length <= 3 && (type == 'hideExp')) {
                    continue outer;
                } else if (hideRows.indexOf(childRowIndex) == -1 && delPro_codes.indexOf(childcode) == -1) {
                    let oldText = $SH.getValue(sheet, parseInt(childRowIndex), parseInt(indentcol));
                    if (oldText.indexOf("其中:") == -1) {
                        $SH.setValue(sheet, parseInt(childRowIndex), parseInt(indentcol), "  其中:" + oldText);
                        continue outer;
                    }
                }
            }
        }
        //涉密项目隐藏
        if (delPro_codes.length > 0 && delPro_codes.indexOf(code) != -1/*delPro_codes.find(item => code.indexOf(item) == 0)*/) {
            //隐藏
            $SH.setRowVisible(sheet, rowIndex, false);
        }
    }
}


//删除涉密项目
function delSecretPro(sheet, delArr) {
    let delCount = 0;
    for (let index of delArr) {
        sheet.deleteRows(parseInt(index - delCount), 1);
        delCount++;
    }
    //设置其中
    var pos = speardUtil.getTagsPosition("isInnerPro");
    pos = pos[0];
    for (var p = 0; p < pos.length; p++) {
        var tag = speardUtil.getTagByIndex(sheet, pos[p].row, pos[p].col);
        if (tag.isInnerPro == "TRUE") {
            let oldText = $SH.getValue(sheet, parseInt(pos[p].row), parseInt(pos[p].col));
            if (oldText.indexOf("其中:") != 0) {
                $SH.setValue(sheet, parseInt(pos[p].row), parseInt(pos[p].col), "其中:" + oldText);
            }
        }
    }
}


function getHideRowIndex() {
    let rowIndexArr = [];
    let hideRowMap = speardUtil.getRowHideByCondition(0);
    if (hideRowMap.hideMap) {
        rowIndexArr = Object.keys(hideRowMap.hideMap)
    }
    return rowIndexArr;
}


//数组去重
function distintArr(arr) {
    let set = new Set();
    arr.forEach(item => set.add(item));
    return Array.from(set)
}


//获取科目编码数组
function getExp_code(arr, type) {
    if (arr && arr.length > 0) {
        let newarr = arr.map(item => {
            if (type == 'hideExp') {
                return item.substring(0, 3)
            } else {
                return item;
            }

        })
        return distintArr(newarr);
    } else return []
}

/**
 * 获取编码列 以及缩进列
 */

function getCode_IndentColTag(sheet) {
    let obj = {SUMCOLS: []}
    for (let axis of tags_position[0]) {
        let tagVal = speardUtil.getTagByIndex(sheet, axis.row, axis.col);
        if (tagVal.fieldname == "INC_EXP_SORT_CODE") {
            obj.CODETAG = tagVal;
            tagVal.row = axis.row;
            tagVal.col = axis.col;
        }
        //todo 修改为缩进列
        else if (tagVal.fieldname == "INC_EXP_SORT_NAME") {
            obj.INDENTTAG = tagVal;
            tagVal.row = axis.row;
            tagVal.col = axis.col;
        } else if (tagVal.isLevelsSumCol == "TRUE") {
            tagVal.row = axis.row;
            tagVal.col = axis.col;
            obj.SUMCOLS.push(tagVal);
        }
    }
    return obj;
}

/**
 * 根据层级关系设置汇总行公式
 */
function setFormulaByLevelInfo(sheet, row, col, childRowArr) {
    //列索引转字母
    let letterIndex = speardUtil.convertDSTo26BS(parseInt(col) + 1);

    let cellStr = "";
    let childArr = childRowArr.map(child => letterIndex + (child + 1));
    cellStr = childArr.join(",");
    $SH.setFormula(sheet, parseInt(row), parseInt(col), `=SUM(${cellStr})`);
    $SH.setLocked(sheet, parseInt(row), parseInt(col), true);
}

//=============================================================================快照===========================================================================================

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
    if (spread.getSheetCount() == 1) {
        spread.addSheet(1, new GC.Spread.Sheets.Worksheet("原始汇总快照"));
    }
    let snapSheet = spread.getSheet(1);
    let res = speardUtil.importSheet(spread, sheetInfo, 1, true);
    //设置只读
    if (sheetInfo.TAG) {
        for (let axis in sheetInfo.TAG) {
            if (sheetInfo.TAG[axis].substring(0, 1) == "{") {
                let row = axis.split(",")[0];
                let col = axis.split(",")[1];
                $SH.setLocked(snapSheet, row, col, true);
            }
        }
    }
    return res;
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