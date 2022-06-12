//=================================== 农业总产值（按规则计算目标值）(表格1)=======================================================================
//---------------------------------------------------根据不同条件生成预测数据-------------------------------------------------------------------------



/**
 * 根据控件名获取sbid
 * @param ctrlname
 */
function getSbtid(ctrlname) {
    var sbtid;
    var dataSource = $($DV.getEl(ctrlname)).attr("datasource");
    dataSource = JSON.parse(dataSource);
    return (dataSource) ? dataSource.sbtid : "";
}

/**
 * 根据不同条件生成预测数据
 * @param gridName
 * @param type
 */
function resetGridByType(gridName, type, input) {
    debugger
    //获取表格的数据
    var gridEl = $($DV.getEl(gridName));
    var optData = options[gridEl.attr("id")].data;
    var cacheData = cacheResultData[gridEl.attr("id")];
    if (optData.length > 5) {
        return;
    }
    var per = 0;
    if (type == "average") {
        //根据年平均增长率生成预测数据
        for (let i = 0; i < optData.length; i++) {
            if (optData[i]["CNUM_PER"] == undefined || optData[i]["CNUM_PER"] == null) {
                optData[i]["CNUM_PER"] = 0;
            }
            per += parseFloat(optData[i]["CNUM_PER"])
        }
        per = floatDiv(per, optData.length).toFixed(2);
    } else if (type == "custom" && input) {
        //根据固定比例生成数据
        per = parseFloat(inputbox.getValue(input).split("%")[0]);
    }
    debugger
    var allData = buildNewData(cacheData, optData, per);
    optData = allData["optData"];
    cacheData = allData["cacheData"];
    //刷新表格
    options[gridEl.attr("id")].data = optData;
    cacheResultData[gridEl.attr("id")] = cacheData;
    easygrid.load(gridEl);
}

//------------------------------------------------------------根据增长率计算其他项数据-------------------------------------------------------------------
/**
 * 根据增长率计算其他项数据
 *
 */
function buildNewData(cacheData, optData, per) {
    var newData = {};
    var allData = {};
    //根据增长率计算其他项数据
    //存入option中
    var zengz = floatMul(optData[optData.length - 1]["CNUM"], per / 100).toFixed(2);
    newData["CNUM"] = floatAdd(optData[optData.length - 1]["CNUM"], zengz).toFixed(2);
    newData["CNUM_PER"] = parseFloat(per).toFixed(2);
    newData["REF_T_DATE_YEARID"] = parseInt(optData[optData.length - 1]["REF_T_DATE_YEARID"]) + 1;
    newData["REF_T_DATE_YEARNAME"] = parseInt(optData[optData.length - 1]["REF_T_DATE_YEARID"]) + 1 + "";
    newData["SNO"] = parseInt(optData.length) + 1;
    newData["ZENGZ"] = zengz;
    optData.push(newData);

    //存入缓存中
    for (var key in newData) {
        if (key == "SNO" || key == "REF_T_DATE_YEARID") {
            newData[key] = parseInt(newData[key]);
        } else if (key == "CNUM_PER" || key == "ZENGZ" || key == "CNUM") {
            newData[key] = parseFloat(newData[key]).toFixed(2);
        }
    }
    cacheData.push(newData);

    allData["optData"] = optData;
    allData["cacheData"] = cacheData;
    return allData;
}


//===================================================按部门测算预算数(表格2)=====================================================================================


//--------------------------------------------------- 手工录入测算数-------------------------------------------------------------------------
/**
 * 手工录入测算数
 * @param iframeName
 * @param gridName
 */
function handWork(gridName) {
    var gridEl = $DV.getEl(gridName);
    //1.设置表格测算列可编辑
    var option = options[$(gridEl).attr("id")];
    var cols = option.columns[option.columns.length - 1];
    for (var c = 0; c < cols.length; c++) {
        if (cols[c].field == "CNUM_YUCE") {
            cols[c].editor = {type: "text"};
        }
    }
    //2.重新加载表格
    // option.data =cacheResultData[$(gridEl).attr("id")];
    easygrid.load($(gridEl));
}

//--------------------------------------------------- 结束编辑表格事件-------------------------------------------------------------------------
/**
 * 结束编辑表格事件
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
    })
    return res;
}

//=======================================保存表格数据====================================================================================================


/**
 * 保存表格1数据
 * @param gridName
 */

function saveTableData(gridName) {
    debugger
    //获取主题id sbtid
    var dataSource = $($DV.getEl(gridName)).attr("datasource");
    dataSource = JSON.parse(dataSource);
    //获取数据
    var data = cacheResultData[$($DV.getEl(gridName)).attr("id")];
    if (data.length < 5) {
        alert("请先设置数据");
        return
    }
    //判断数据库中是否已经保存过预测数据 没有则为第一次 直接保存 否则先删除后保存
    var CID;
    var sql = "select max(cid) as cid from DW_NF_ZNAVG";
    var result = $DV.commonSelect([{name: "selectCid", sql: sql}], (dataSource) ? dataSource.sbtid : "");
    if (result && result["selectCid"] && result["selectCid"].length > 0) {
        CID = result["selectCid"][0].CID;
    }
    if (CID > 6) {
        for (let i = 0; i < 2; i++) {
            //执行删除
            var delTemp = {
                tablename: "DW_NF_ZNAVG",
                sbtid: (dataSource) ? dataSource.sbtid : "",
                keyfields: [{
                    fieldname: "CID",
                    value: parseInt(CID),
                    defaultvalue: "",
                    fieldType: "number"
                }, {
                    fieldname: "TYPECODE",
                    value: "02",
                    defaultvalue: "",
                    fieldType: "string"
                }],
                columns: []
            };
            var delresult = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
            if (delresult.isError) {
                alert(delresult.errMsg);
                return false;
            }
            CID--;
        }

    }

    CID = 7;
    var jsonArr = [];
    var dataRowTemp = {
        tablename: "DW_NF_ZNAVG",
        sbtid: (dataSource) ? dataSource.sbtid : "",
        keyfields: [],
        columns: []
    };
    var _data = []
    _data.push(data[3])
    _data.push(data[4])

    dataRowTemp = JSON.stringify(dataRowTemp);
    for (var d = 0; d < _data.length; d++) {
        var dataRow = JSON.parse(dataRowTemp);
        dataRow.columns.push({
            fieldname: "REF_T_DATE_YEARID",
            value: _data[d]["REF_T_DATE_YEARID"]
        }, {
            fieldname: "CID",
            value: CID
        }, {
            fieldname: "BID",
            value: CID
        }, {
            fieldname: "TYPECODE",
            value: "02"
        }, {
            fieldname: "TYPENAME",
            value: "句容市"
        }, {
            fieldname: "CNUM",
            value: _data[d]["CNUM"]
        }, {
            fieldname: "CNUM_PER",
            value: _data[d]["CNUM_PER"]
        })
        jsonArr.push(dataRow);
        CID++
    }
    var saveresult = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/commJsonSave", {jsonstr: JSON.stringify(jsonArr)});

    if (saveresult.isError) {
        alert(saveresult.errMsg);
        return false;
    } else {
        return true;
    }
}

//------------------------------------------保存表格 三公经费明细-----------------------------------------------------------------------------
/**
 * 保存表格二的数据
 * @param gridName
 */
function saveTable2Data(gridName) {
    debugger
    //获取sbtid
    var sbtid;
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
            })
            jsonArr.push(dataRow);
        }

        var saveresult = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/commJsonSave", {jsonstr: JSON.stringify(jsonArr)});
        if (0) {
            alert(saveresult.errMsg);
            return false;
        } else {
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
    var sbtid;
    var dataSource = $($DV.getEl("简单表格1")).attr("datasource");
    dataSource = JSON.parse(dataSource);
    //表格1重置 删除2020 /2021年数据
    var CID;
    var sql = "select max(cid) as cid from DW_NF_ZNAVG";
    var result = $DV.commonSelect([{name: "selectCid", sql: sql}], (dataSource) ? dataSource.sbtid : "");
    if (result && result["selectCid"] && result["selectCid"].length > 0) {
        CID = result["selectCid"][0].CID;
    }

    if (CID > 6) {
        var delResult = delTableOldData(CID,dataSource);
        if (delResult === false) {
            return;
        }
    }

    $DV.loadEl("简单表格1");

    //重置 表格2 查询有无2021 年数据 如果有 就删除 加载2020年数据
    var sbtid2 = getSbtid("三公经费明细")
    var sql = "select * from DW_DS_ZNCS1 where REF_T_DATE_YEARID = 2021"
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
    $DV.loadEl("三公经费明细")
}

/**
 * 删除 表格1 的2020 2021 数据
 *
 */
function delTableOldData(CID, dataSource) {
    for (let i = 0; i < 2; i++) {
        //执行删除
        var delTemp = {
            tablename: "DW_NF_ZNAVG",
            sbtid: (dataSource) ? dataSource.sbtid : "",
            keyfields: [{
                fieldname: "CID",
                value: parseInt(CID),
                defaultvalue: "",
                fieldType: "number"
            }, {
                fieldname: "TYPECODE",
                value: "02",
                defaultvalue: "",
                fieldType: "string"
            }],
            columns: []
        };
        var delresult = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
        if (delresult.isError) {

            return false;
        }
        CID--;
    }
}


/**
 * 重构---- 定时任务
 */
loadNewData2()
function loadNewData2() {
    debugger
    var sbtid = getSbtid("三公经费明细")
    var sql = "select * from DW_DS_ZNCS1 where REF_T_DATE_YEARID = 2021"
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
            var allData = {}
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

                    optData.rows[i]["PAY_EXEC2"] = numFormat(optData.rows[i]["PAY_EXEC2"])
                    optData.rows[i]["CNUM_YUCE"] = numFormat(optData.rows[i]["CNUM_YUCE"])
                }

                //修改汇总数据
                optData = resetCount(optData, cacheData)
                cacheResultData[element.id] = cacheData;
                options[element.attr("id")].data = optData;
                easygrid.load(element)
            }
            easygrid.load(element);
            window.clearInterval(loadInterval);
        }
    }, 1000)
}



