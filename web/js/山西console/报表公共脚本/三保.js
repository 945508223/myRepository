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
    var newVal = params.result.fileUrl || "";
    //当前cell的定义：字段名
    //var tag = $SH.getTag(sheet,row,col);
    var fieldName = tag.fieldname;
    var tablename = tag.tablename;
    if (!fieldName) return;

    //当前cell行条件、列条件单元格
    var conditionTag = speardUtil.getConditionInfo(row, col);
    var rowConditionTag = conditionTag.row;
    var colConditionTag = conditionTag.col;
    //取行条件单元格的扩展属性：BUDGETFROM:0101;FUNDLEVEL:1
    getRowValues(rowConditionTag, rowValues);
    getRowValues(colConditionTag, rowValues);
    let isString = tag["numberType"] == "string" ? true : false;
    //保存
    let taskId = speardUtil.getPms("URL_TASKID");
    if (!taskId || taskId == "undefined") return;
    var saveResult = pubSave_(tablename, "TASKID", taskId, rowValues, fieldName, newVal, isString);
    if ((saveResult) && (saveResult.isError))
        alert(saveResult.errMsg);

    if (saveResult.isError) {
        alert("上传失败!");
        console.error(saveResult.errMsg)
    } else {
        alert("上传成功")
        resetMutipHyperLinkCell(sheet, row, col, ["viewCfg", "uploadCfg"])
    }

}

/**
 *
 * @param params link row col result
 * @private
 */
function delFile_(params) {
    debugger
    resetMutipHyperLinkCell(params.sheet, params.row, params.col, ["uploadCfg"]);
    alert("删除成功")
}

//单元格值变更保存
function cellsave(params, keyFiled, keyVal) {
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
        //当前cell的定义：字段名
        //var tag = $SH.getTag(sheet,row,col);
        var fieldName = tag.fieldname;
        var tablename = tag.tablename;
        if (!fieldName) return;

        //当前cell行条件、列条件单元格
        var conditionTag = speardUtil.getConditionInfo(row, col);
        var rowConditionTag = conditionTag.row;
        var colConditionTag = conditionTag.col;
        //取行条件单元格的扩展属性：BUDGETFROM:0101;FUNDLEVEL:1
        getRowValues(rowConditionTag, rowValues);
        getRowValues(colConditionTag, rowValues);
        let isString = tag["numberType"] == "string" ? true : false;
        //保存
        let taskId = speardUtil.getPms("URL_TASKID");
        if (!taskId || taskId == "undefined") return;
        var saveResult = pubSave_(tablename, "TASKID", taskId, rowValues, fieldName, newVal, isString);
        if ((saveResult) && (saveResult.isError))
            alert(saveResult.errMsg);
    } catch (err) {
        alert(err);
    }
}

//校验
function checkReport() {
    debugger

    try {
        var index = $SP.getActiveSheetIndex(spread);
        speardUtil.refConditionReg(index);
    } catch (err) {
        console.log(err);
    } finally {

        alert("校验完成!");

    }
}

//提取数据
function loadOtherData() {
    debugger
    try {
        var index = $SP.getActiveSheetIndex(spread);
        speardUtil.refDataByReg(index);

    } catch (err) {
        console.log(err);
    } finally {

        alert("提取数据成功!");

    }
}

//-----------------------------------------------------------------------------------方法区------------------------------------------------------------------------------------------
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

    var sqls = new Array();
    let deleteCondition = "";//删除数据主要条件
    let insertArrayVal = [];//新增数据主要条件

    //删除旧数据
    var delsql = "";
    let infoArray = Object.keys(data);
    infoArray.map(item => {
        //构造删除的条件
        deleteCondition += `and ${item} = '${data[item]}'`;
        //构造插入字段对应的值
        insertArrayVal.push(`'${data[item]}'`);
    })
    //判断该单元格的值是否是字符串类型
    let type = isString ? " IS NOT NULL" : " <>0";
    delsql = `delete from ${tablename} where ${keyFiled} = '${keyVal}' ${deleteCondition} and ${fieldName}${type} `;
    sqls.push(delsql);

    if (newVal) {
        newVal = isString ? `'${newVal}'` : newVal;
        let insertSql = `insert into ${tablename} (${infoArray.join(",")},${keyFiled},${fieldName}) values (${insertArrayVal.join(",")},'${keyVal}',${newVal})`;
        sqls.push(insertSql);
    }
    //执行sql
    return speardUtil.exeSqls(sqls.join(";"));
}

//取行条件扩展属性保存的列数据
function getRowValues(conditionTag, rowValues) {
    if ((conditionTag) && (conditionTag.extpro)) {
        var tmp = conditionTag.extpro.split(";");
        for (var i = 0; i < tmp.length; i++) {
            var item = tmp[i].split(":");
            if (item.length > 0)
                rowValues[item[0]] = item[1];
        }
    }
}

/**
 * 重新设置附件单元格
 * @param sheet
 * @param row
 * @param col
 * @param itemArr
 */
function resetMutipHyperLinkCell(sheet, row, col, itemArr) {
    debugger
    let cellType = sheet.getCellType(row, col);
    if (cellType._items.length == 2) return;
    let viewCfg = {
        "text": "查看",
        "clickAction": function (linkInfo) {
            let sheet = $SP.getActiveSheet(spread);
            let tag = getTagByIndex(sheet, linkInfo.row, linkInfo.col);
            if (tag && tag.linkUrl) {
                window.open("http://" + speardUtil.getFastDFSUrl() + tag.linkUrl);
            } else {
                alert("请先上传附件");
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
            window.top.mutipLinkCellInfo[sheetName][`${row}_${col}`] = linkInfo;
            $("#file").click();
        }
    }
    let delCfg = {
        "text": "删除",
        "clickAction": function (link) {
            let sheet = $SP.getActiveSheet(spread);
            let sheetIndex = spread.getActiveSheetIndex();
            let tag = getTagByIndex(sheet, link.row, link.col);
            let row = link.row;
            let col = link.col;
            if (tag && tag.linkUrl) {
                let result = speardUtil.delFromFastDFS(tag.linkUrl);
                tag.linkUrl = "";
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

//=============================================================================依赖===========================================================================================

