//--------------------------------------------------- 结束编辑表格事件-------------------------------------------------------------------------
/**
 * 根据控件名获取sbid
 * @param ctrlname
 */
function getSbtid(ctrlname) {
    debugger
    var sbtid;
    var dataSource = $($DV.getEl(ctrlname)).attr("datasource");
    dataSource = JSON.parse(dataSource);
    return (dataSource) ? dataSource.sbtid : "";
}
/**
 * 表格结束编辑事件
 * @param index
 * @param row
 * @param change
 * @param element
 */

function onAfterEdit(index, row, change, element) {
    easyGridId = element[0].id + "_easygrid";
    debugger
    var optData = options[element[0].id].data;
    var dsItems = easygrid.getDsItems(element[0].id);

    //去除千分符
    for (var key in row) {
        if (key.indexOf("PAY") != -1 || key.indexOf("CNUM") != -1) {
            row[key] = row[key].replace(new RegExp(","), "");
            if (key == "CNUM_YUCE" && (row[key] == null || row[key] == undefined || row[key] == "")) {
                row[key] = "0"
            }
        }
    }
    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/loaddata/calcFormula", {
        "jsonRowvalues": JSON.stringify(row),
        "colItems": JSON.stringify(dsItems.columnItems)
    });


    if (result) {
        result["PAY_EXEC2"] = result["pay_exec2"];
        //变更catchResult
        var data = $DV.getDS(element.attr("dv_ctrlname"));
        data[index]["PAY_EXEC2"] = parseFloat(result["pay_exec2"]).toFixed(2) * 10000;
        data[index]["CNUM_YUCE"] = parseFloat(result["CNUM_YUCE"]).toFixed(2) * 10000
        cacheResultData[element.id] = data;

        //修改汇总数据
        optData = resetCount(optData, data)
        //数据添加千分符
        for (var key in result) {
            if (key.indexOf("PAY") != -1 || key.indexOf("CNUM") != -1) {
                result[key] = parseFloat(result[key]).toFixed(2);
                result[key] = numFormat(result[key])
            }
        }
        optData.rows[index] = result;
        options[element[0].id].data = optData;
    }
    easygrid.load(element)
    loadTableDataByNewData()
}

//====================================按照百分比生成表格数据==============================================================
//页面加载时 将数据保存一份 用于多次按照百分比修改时获取原始数据
debugger
var originalGridEl = $($DV.getEl("三公经费明细"));
var originalOptData = options[originalGridEl.attr("id")].data;
var originalCacheData = cacheResultData[originalGridEl.attr("id")];

/**
 * 根据输入框输入的百分比生成数据
 * @param input
 */
function setTableDataByPercent(input) {

    var per = parseFloat(inputbox.getValue(input).split("%")[0]) / 100;
    var gridEl = $($DV.getEl("三公经费明细"));
    var optData = options[gridEl.attr("id")].data;
    var cacheData = cacheResultData[gridEl.attr("id")];

    for (let i = 0; i < cacheData.length; i++) {
        //修改缓存数据
        cacheData[i].CNUM_YUCE = parseFloat($DV.mul(originalCacheData[i].PAY_EXEC2, per));
        cacheData[i].PAY_EXEC2 = parseFloat($DV.sub(originalCacheData[i].PAY_EXEC2, originalCacheData[i].CNUM_YUCE));
        //修改option中的数据
        optData.rows[i].CNUM_YUCE = numFormat((cacheData[i].CNUM_YUCE/10000).toFixed("2"));
        optData.rows[i].PAY_EXEC2 = numFormat((cacheData[i].PAY_EXEC2/10000).toFixed("2"));
    }

    //修改汇总数据
    optData = resetCount(optData, cacheData)
    easygrid.load(gridEl);

}
//----------------------------------修改汇总数据-------------------------------------------------------------------
/**
 * 修改汇总数据
 * @param optData
 * @param data
 */
function resetCount(optData, data) {
    //修改汇总数据
    var countCNUM_YUCE = 0;
    var countPAY_EXEC2 = 0;
    for (let i = 0; i < data.length; i++) {
        countCNUM_YUCE += data[i]["CNUM_YUCE"]
        countPAY_EXEC2 += data[i]["PAY_EXEC2"]
    }

    optData.footer[0]["CNUM_YUCE"] = (countCNUM_YUCE / 10000).toFixed(2);
    optData.footer[0]["PAY_EXEC2"] = (countPAY_EXEC2 / 10000).toFixed(2);

    //添加千分符
    for (var key in optData.footer[0]) {
        if (key.indexOf("PAY") != -1 || key.indexOf("CNUM") != -1) {
            optData.footer[0][key] = numFormat(optData.footer[0][key])
        }
    }

    return optData
}

//-----------------------------------------数字添加千分符方法--------------------------------------------------------------------------------

function numFormat(num) {
    var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            return $1 + ",";
        });
    });
    return res;
}



//------------------------------------------保存表格 三公经费明细-----------------------------------------------------------------------------
/**
 * 保存表格二的数据
 * @param gridName
 */
function saveTable2Data(gridName) {
    debugger
    //获取sbtid
    var dataSource = $($DV.getEl(gridName)).attr("datasource");
    dataSource = JSON.parse(dataSource);
    //获取数据
    var data = cacheResultData[$($DV.getEl(gridName)).attr("id")];
    //执行删除
    var delTemp = {
        tablename: "DW_DS_ZNCS1",
        sbtid: (dataSource) ? dataSource.sbtid : "",
        keyfields: [{
            fieldname: "REF_T_DATE_YEARID",
            value: 2021,
            defaultvalue: "",
            fieldType: "number"
        }],
        columns: []
    };

    var delresult = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
    if (delresult.isError) {
        alert(delresult.errMsg);
        return false;
    } else {
        //执行保存
        var jsonArr = [];
        var dataRowTemp = {
            tablename: "DW_DS_ZNCS1",
            sbtid: (dataSource) ? dataSource.sbtid : "",
            keyfields: [],
            columns: []
        };
        dataRowTemp = JSON.stringify(dataRowTemp);
        for (var d = 0; d < data.length; d++) {
            var dataRow = JSON.parse(dataRowTemp);
            dataRow.columns.push({
                fieldname: "REF_T_DATE_YEARID",
                value: 2021
            }, {
                fieldname: "DEPT_CODE_R",
                value: data[d].DEPT_CODE_RID
            }, {
                fieldname: "DEPT_NAME",
                value: data[d].DEPT_NAMENAME
            }, {
                fieldname: "CNUM",
                value: data[d].CNUM
            }, {
                fieldname: "PAY_AMT",
                value: data[d].PAY_AMT
            }, {
                fieldname: "CNUM_YUCE",
                value: data[d].CNUM_YUCE
            });
            jsonArr.push(dataRow);
        }

        var saveresult = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/commJsonSave", {jsonstr: JSON.stringify(jsonArr)});
        if (0) {
            alert(saveresult.errMsg);
            return false;
        } else {
            debugger
            loadTableDataByNewData()
            return true;
        }
    }

}



/**
 * 重置表格
 * @param ctrlname
 */
function reloadTable() {
    debugger
    //重置 表格2 查询有无2021 年数据 如果有 就删除 加载2020年数据
    var sbtid2 = getSbtid("三公经费明细");
    var sql = "select * from DW_DS_ZNCS1 where REF_T_DATE_YEARID = 2021";
    var result2 = $DV.commonSelect([{name: "selectNewData", sql: sql}], sbtid2);
    if (result2 && result2["selectNewData"] && result2["selectNewData"].length > 0) {
        var delTemp = {
            tablename: "DW_DS_ZNCS1",
            sbtid: sbtid2,
            keyfields: [{
                fieldname: "REF_T_DATE_YEARID",
                value: 2021,
                defaultvalue: "",
                fieldType: "number"
            }],
            columns: []
        };

        var delresult = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
    }
    $DV.loadEl("三公经费明细");
    //根据新数据重新加载简单表格2
    debugger
    loadTableDataByNewData()

}

/**
 * 定时任务
 */
loadNewData2();
function loadNewData2() {
    debugger
    var sbtid = getSbtid("三公经费明细");
    var sql = "select * from DW_DS_ZNCS1 where REF_T_DATE_YEARID = 2021";
    var result = $DV.commonSelect([{name: "selectNewData", sql: sql}], sbtid);
    if (result && result["selectNewData"] && result["selectNewData"].length > 0) {

        //将新数据替换掉旧数据
        var cacheData = $DV.getDS("三公经费明细");
        for (let i = 0; i < cacheData.length; i++) {
            for (let j = 0; j < result["selectNewData"].length; j++) {
                if (cacheData[i].DEPT_NAMENAME == result["selectNewData"][j].DEPT_NAME) {
                    cacheData[i].CNUM_YUCE = result["selectNewData"][j].CNUM_YUCE
                }
            }
        }

        resetDatas($($DV.getEl("三公经费明细")), cacheData)
    }
}


function resetDatas(element, cacheData) {
    debugger
    var loadInterval = setInterval(function () {
        if ($DV.isLoaded()) {
            easyGridId = element.attr("id") + "_easygrid";
            debugger
            var optData = options[element.attr("id")].data;
            var dsItems = easygrid.getDsItems(element.attr("id"));

            //重新计算数据
            var newResult = YCDCommon.Ajax.syncAjax(getProjectName() + "/loaddata/calcFormulas", {
                "jsonRowvalues": JSON.stringify(cacheData),
                "colItems": JSON.stringify(dsItems.columnItems)
            });
            if (newResult) {
                for (let i = 0; i < newResult.length; i++) {
                    newResult["PAY_EXEC2"] = newResult["pay_exec2"];
                    //变更catchResult
                    cacheData[i]["PAY_EXEC2"] = parseFloat(newResult[i]["pay_exec2"]);
                    cacheData[i]["CNUM_YUCE"] = parseFloat(newResult[i]["CNUM_YUCE"]);

                    //变更option数据  添加千i分符
                    optData.rows[i]["PAY_EXEC2"] = (cacheData[i]["PAY_EXEC2"] / 10000).toFixed(2)
                    optData.rows[i]["CNUM_YUCE"] = (cacheData[i]["CNUM_YUCE"] / 10000).toFixed(2)

                    optData.rows[i]["PAY_EXEC2"] = numFormat(optData.rows[i]["PAY_EXEC2"]);
                    optData.rows[i]["CNUM_YUCE"] = numFormat(optData.rows[i]["CNUM_YUCE"])
                }

                //修改汇总数据
                optData = resetCount(optData, cacheData);
                cacheResultData[element.id] = cacheData;
                options[element.attr("id")].data = optData;
                easygrid.load(element)
            }
            easygrid.load(element);
            window.clearInterval(loadInterval);
        }
    }, 1000)
}




/**
 * 根据新数据重新加载简单表格2
 */
function loadTableDataByNewData() {
    debugger
    var win = parent.window.getIframeWin("网页框2")
    var element = $(win.$DV.getEl("简单表格2"))
    win.easygrid.loadData (element)
}
