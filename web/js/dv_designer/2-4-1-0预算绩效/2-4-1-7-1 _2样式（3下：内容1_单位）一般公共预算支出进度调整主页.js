////http://localhost:8090/dv_designer/dw/custompage/analysis.jsp?pageId=ADAB25AB3DB17880E0530100007F8251&GUID=888888000001000003
//================================================表格结束编辑===============================
onAfterEdit(index, row, change, element)

/**
 * 结束编辑事件
 * @param index
 * @param row
 * @param chang
 */
function onAfterEdit(index, row, change, element) {
    easyGridId = element[0].id + "_easygrid";
    debugger
    var oneData = {};
    var dsItems = easygrid.getDsItems(element[0].id);
    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/loaddata/calcFormula", {
        "jsonRowvalues": JSON.stringify(row),
        "colItems": JSON.stringify(dsItems.columnItems)
    });
    if (result) {
        result["PAY_EXEC2"] = result["pay_exec2"];
        result["PAY_EXEC4"] = (parseFloat(result["pay_exec4"]) * 100).toFixed(2) + "%";
        result["PAY_TIAOZHENG"] = (parseFloat(result["PAY_TIAOZHENG"])) ? result["PAY_TIAOZHENG"] : "";
        $("#" + easyGridId).datagrid('updateRow', {
            index: index,
            row: result
        });
        //变更catchResult
        var data = $DV.getDS(element.attr("dv_ctrlname"))
        data[index]["PAY_EXEC2"] = parseFloat(result["pay_exec2"]) * 10000;
        data[index]["PAY_EXEC4"] = parseFloat(result["pay_exec4"]);
        data[index]["PAY_TIAOZHENG"] = (parseFloat(result["PAY_TIAOZHENG"])) ? parseFloat(result["PAY_TIAOZHENG"]) * 10000 : "";
        cacheResultData[element.id] = data;

    }
}


//========================================初始化=====================================================================
//存储原始src和pageid
debugger
var iframeElement = $DV.getEl("网页框1")
var tableElement = $DV.getEl("网页框1").find("iframe")[0].contentWindow.$DV.getEl("")
var oldSrc = $(iframeElement).find("iframe").attr("src");
var oldPageId = oldSrc.split("pageId=")[1].split("&")[0];
var pageInfo = {
    iframeElement: iframeElement,
    tableElement: tableElement,
    oldSrc: oldSrc,
    oldPageId: oldPageId,
    type: "old",
    pageId: oldPageId,
    currMonth: $DV.pms("PUBDATE_YEARMONTH")//获取当前月份
}

var sql = "select id from DV_PAGESNAPSHOT where fromid='" + pageInfo.oldPageId + "' and exe1='" + pageInfo.currMonth + "'";
var selectResult = $DV.commonSelect([{name: "selectSnapshot", sql: sql}]);
//如果数据存在,执行更新操作
if (selectResult && selectResult["selectSnapshot"] && selectResult["selectSnapshot"].length > 0) {
    var guid = selectResult["selectSnapshot"][0].ID;
    if (guid) {
        pageInfo.type = "new";
        pageInfo.pageId = guid;
        changeSrc();
    }
}

//===========================================修改iframe路径===================================================================
/**
 * 修改iframe路径
 */
function changeSrc() {
    debugger
    var newSrc = oldSrc.split("?")[0] + "?pageId=" + pageInfo.pageId + "&cachemode=1"
    $(iframeElement).find("iframe").attr("src", newSrc);
}

//==========================================隐藏输入框=================================================================
/**
 * 隐藏输入框
 * @param name
 * @param type
 */
function displayCtrl(name, display) {
    debugger
    if (!display) {
        display = $($DV.getEl(name)).css("display");
        display = (display == "block") ? "none" : "block"
    }
    $($DV.getEl(name)).css("display", display);
}

//===========================================重置============================================================
/**
 * 重置
 * @param ctrlname
 */
function reloadTable(ctrlname) {
    debugger
    var element = $DV.getEl(ctrlname);
    $(element).find("iframe").attr("src", pageInfo.oldSrc);
}

//============================================保存===============================================================
/**
 * 保存数据
 */

function saveTable() {
    debugger
    //保存数据
    var saveData = {};
    saveData["page"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.page;
    saveData["html"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.$("#box").prop("outerHTML");
    saveData["options"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.options;
    saveData["dragDatas"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.dragDatas;
    saveData["cacheResultData"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.cacheResultData;
    saveData["chartLinks"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.chartLinks;
    //存储表格镜像
    if (pageInfo.type == "old") {
        var savePageId = $DV.saveWord(pageInfo.oldPageId, {"EXE1": pageInfo.currMonth}, saveData, null, "all");
        pageInfo.type = "new";
    } else {
        var savePageId = $DV.saveWord(pageInfo.oldPageId, {
            "EXE1": pageInfo.currMonth,
            "saveup": true
        }, saveData, null, "update", pageInfo.pageId);
    }
    pageInfo.pageId = savePageId;
    //数据保存到表
    //var data=$(pageInfo.iframeElement).find("iframe")[0].contentWindow.cacheResultData[];
    changeSrc();

}

//================================================手工录入==========================================================
/**
 * 手工录入
 * @param element //var element=$($($DV.getEl("网页框1")).find("iframe")[0].contentWindow.$DV.getEl("执行率表格"));
 */

function handWork(iframeName, gridName) {
    var element = $($($DV.getEl(iframeName)).find("iframe")[0].contentWindow.$DV.getEl(gridName));
    //1.设置表格测算列可编辑
    var option = $($DV.getEl(iframeName)).find("iframe")[0].contentWindow.options[element.attr("id")];
    var cols = option.columns[option.columns.length - 1];
    for (var c = 0; c < cols.length; c++) {
        if (cols[c].field == "PAY_TIAOZHENG") {
            cols[c].editor = {type: "text"};
        }
    }
    //2.重新加载表格
    option.data = $($DV.getEl(iframeName)).find("iframe")[0].contentWindow.cacheResultData[element.id];
    $($DV.getEl(iframeName)).find("iframe")[0].contentWindow.easygrid.load(element);
}



//=============================================按月份\比例 通用===================================================
//averageByMonth("网页框1","执行率表格");
resetGridByType("网页框1", "执行率表格", {
    "type": "PERCENT",
    "inputName": "输入框1"
});

resetGridByType("网页框1", "执行率表格", {
    "type": "PERCENT"
});


/**
 * 计算实际未执行数
 * @param cacheData
 * @returns {[]}
 */
function rebuildCacheData(cacheData) {
    var PAY_EXEC2Arr = [];
    for (let i = 0; i < cacheData.length; i++) {
        //  目标 - 已执行 = 未执行
        var _PAY_MUBIAO = (cacheData[i]["PAY_MUBIAO"] / 10000) + "";
        var _PAY_YEAR = (cacheData[i]["PAY_YEAR"] / 10000) + "";
        var _PAY_EXEC2 = floatSub(_PAY_MUBIAO, _PAY_YEAR);
        cacheData[i]["PAY_MUBIAO"] = _PAY_MUBIAO;
        cacheData[i]["PAY_YEAR"] = _PAY_YEAR;
        PAY_EXEC2Arr.push(_PAY_EXEC2);

        for(var key in  cacheData[i]){
            if(typeof(cacheData[i][key])=="number"){
                cacheData[i][key] = cacheData[i][key]+""
            }
        }
    }
    return PAY_EXEC2Arr
}


/**
 * 根据不同条件 重新设置表格数据
 * @param iframeName
 * @param gridName
 * @param condition
 */
function resetGridByType(iframeName, gridName, condition) {
    debugger
    var win = $($DV.getEl(iframeName)).find("iframe")[0].contentWindow;
    var gridEl = $($($DV.getEl(iframeName)).find("iframe")[0].contentWindow.$DV.getEl(gridName));
    var option = $($DV.getEl(iframeName)).find("iframe")[0].contentWindow.options[gridEl.attr("id")];

    easyGridId = gridEl[0].id + "_easygrid";

    var optData = option.data;
    var dsItems = win.easygrid.getDsItems(gridEl[0].id);
    var cols = option.columns[option.columns.length - 1];
    var filedIndex;
    for (let i = 0; i < cols.length; i++) {
        if (cols[i].field == "PAY_TIAOZHENG") {
            filedIndex = i
        }
    }
    //缓存数据
    var data = win.$DV.getDS(gridName);
    var PAY_EXEC2Arr = rebuildCacheData(data);

    if (condition.type == "PERCENT") {
        //根据百分比
        var inputEl = $($DV.getEl(condition.inputName));
        var percent = floatDiv(inputbox.getValue(inputEl).split("%")[0], 100);
        for (let i = 0; i < data.length; i++) {
            data[i]["PAY_EXEC2"] = PAY_EXEC2Arr[i];
            data[i]["PAY_TIAOZHENG"] = floatMul(PAY_EXEC2Arr[i], percent);
        }

    } else if (condition.type == "MONTH") {
        //剩余月份数量
        var monthNum = 12 - parseInt($DV.pms("PUBDATE_MONTH"));
        for (let i = 0; i < data.length; i++) {
            data[i]["PAY_EXEC2"] = PAY_EXEC2Arr[i];
            data[i]["PAY_TIAOZHENG"] = floatDiv(PAY_EXEC2Arr[i], monthNum)+"";
        }
    }

    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/loaddata/calcFormulas", {
        "jsonRowvalues": JSON.stringify(data),
        "colItems": JSON.stringify(dsItems.columnItems)
    });

    if (result) {
        for (let i = 0; i < result.length; i++) {

            //变更option中的data
            optData[i]["PAY_EXEC2"] = (parseFloat(result[i]["pay_exec2"])).toFixed(2);
            optData[i]["PAY_EXEC4"] = parseFloat(result[i]["pay_exec4"] * 100).toFixed(2) + "%";
            optData[i]["PAY_TIAOZHENG"] = parseFloat(result[i]["PAY_TIAOZHENG"]).toFixed(2);

            //变更catchResult
            data[i]["PAY_EXEC2"] = parseFloat(result[i]["pay_exec2"] * 10000);
            data[i]["PAY_EXEC4"] = parseFloat(result[i]["pay_exec4"]);
            data[i]["PAY_TIAOZHENG"] = parseFloat(result[i]["PAY_TIAOZHENG"] * 10000);

            //设置列 不可编辑
            cols[filedIndex].editor = null;
        }
    }

    $($DV.getEl(iframeName)).find("iframe")[0].contentWindow.options[gridEl.attr("id")].data = optData;

    $($DV.getEl(iframeName)).find("iframe")[0].contentWindow.cacheResultData[gridEl[0].id] = data;

    $($DV.getEl(iframeName)).find("iframe")[0].contentWindow.easygrid.load(gridEl);

}