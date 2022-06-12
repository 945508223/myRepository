setDefaultData()
var ninput = $DV.getEl("按固定增长率输入框")
$(ninput).css("display", "none")

function setDefaultData() {
    debugger
    var loadInterval = setInterval(function () {
        if ($DV.isLoaded()) {
            for (let i = 0; i < 2; i++) {
                debugger
                resetGridByType("简单表格1", "average")
            }
            window.clearInterval(loadInterval);
        }
    }, 1000)
}


//默认选中
var labelo = $DV.getEl("标签2");
$(labelo).css("background-image", "url(http://" + FASTDFSURL + "/group1/M00/00/06/wKgBV19bOiuAVmOlAAAC8NReVSY752.png");//选中
$(labelo).css("font-weight", "700");//按钮1//选中 边框颜色加深
var other = $DV.getEl("标签3");
$(other).css("background-image", "url(http://" + FASTDFSURL + "/group1/M00/00/08/wKgBWF9bOfSAfXgwAAABbjJWQTk234.png");
$(other).css("font-weight", "400");//按钮2//不选中 边框颜色不加深


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
    //如果是根据平均 判断是否大于五条数据 是 则直接返回

    var per = 0;
    if (type == "average") {
        if (optData.length >= 5) {
            return;
        }
        //根据年平均增长率生成预测数据
        for (let i = 0; i < optData.length; i++) {
            if (optData[i]["CNUM_PER"] == undefined || optData[i]["CNUM_PER"] == null) {
                optData[i]["CNUM_PER"] = 0;
            }
            per += parseFloat(optData[i]["CNUM_PER"])
        }
        per = floatDiv(per, optData.length).toFixed(2);
    } else if (type == "custom" && input) {
        //判断 数据是否大于等于5 是 则重置表格 获取输入框的值 重新设置表格数据
        if (optData.length >= 5) {
            optData.splice(3, 2);
            cacheData.splice(3, 2);
        }

        debugger
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


//----------------------------------保存-------------------------------------------------------------

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
        if (delTableOldData(CID, dataSource) === false) {
            alert("保存失败");
            return;
        }
    }
    //执行保存
    CID = 7;
    var jsonArr = [];
    var dataRowTemp = {
        tablename: "DW_NF_ZNAVG",
        sbtid: (dataSource) ? dataSource.sbtid : "",
        keyfields: [],
        columns: []
    };
    var _data = [];
    _data.push(data[3]);
    _data.push(data[4]);

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
        });
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


/**
 * 重置表格
 * @param ctrlname
 */
function reloadTable() {
    debugger
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
        var delResult = delTableOldData(CID, dataSource);
        if (delResult === false) {
            return;
        }
    }
    $DV.loadEl("简单表格1");
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
