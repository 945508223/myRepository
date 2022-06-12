var nameMap = {
    "南京市": "ctrl_78120-11327936",
    "镇江市": "ctrl_78120-113544179",
    "常州市": "ctrl_78120-11361841",
    "无锡市": "ctrl_78120-11369977",
    "苏州市": "ctrl_78120-11361870",
};

var element = $("#ctrl_78120-11720862")
var source = getDataSource(element);
debugger
//取维度
var key = element.attr("id") + "||dv_dim";
var dimItems = null;
if (dragDatas[key] != undefined) {
    dimItems = dragDatas[key];

}
//取度量
key = element.attr("id") + "||dv_measure";
var measureItems = null;
if (dragDatas[key] != undefined)
    measureItems = dragDatas[key];
console.log(measureItems)
key = element.attr("id") + "||dv_filter";
var filterItems = null;
if (dragDatas[key] != undefined)
    filterItems = dragDatas[key];
//取数据
if ((dimItems != null) && (measureItems != null)) {
    if ((Object.getOwnPropertyNames(dimItems).length > 0) && (Object.getOwnPropertyNames(measureItems).length > 0)) {
        debugger
        var result = YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData", {
            "sbtid": source.sbtid,
            "dimItems": JSON.stringify(dimItems),
            "measureItems": JSON.stringify(measureItems),
            "filterItems": JSON.stringify(filterItems)
        });
        console.log(result)
    }
};


for (var i = 0; i < result.length; i++) {
    var divId = nameMap[result[i].MOF_DIV_NAMENAME];
    if(divId&&!(divId==undefined)){
        debugger
        var data = (result[i].SMPERIOD_ZZL_YB)*100
        data = Math.round(data * 100) / 100
        $($("#" + divId)[0].children[0]).text(data+"%");
    }
}

function loadData(){
    var element = $("#ctrl_78120-11720862")
    var source = getDataSource(element);
    debugger
//取维度
    var key = element.attr("id") + "||dv_dim";
    var dimItems = null;
    if (dragDatas[key] != undefined) {
        dimItems = dragDatas[key];

    }
//取度量
    key = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[key] != undefined)
        measureItems = dragDatas[key];
    console.log(measureItems)
    key = element.attr("id") + "||dv_filter";
    var filterItems = null;
    if (dragDatas[key] != undefined)
        filterItems = dragDatas[key];
//取数据
    if ((dimItems != null) && (measureItems != null)) {
        if ((Object.getOwnPropertyNames(dimItems).length > 0) && (Object.getOwnPropertyNames(measureItems).length > 0)) {
            debugger
            var result = YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData", {
                "sbtid": source.sbtid,
                "dimItems": JSON.stringify(dimItems),
                "measureItems": JSON.stringify(measureItems),
                "filterItems": JSON.stringify(filterItems)
            });
            console.log(result)
        }
    };

}

function changeData(checked) {
    debugger

    //获取数据

    for (var i = 0; i < result.length; i++) {
        //根据名称获取标签div
        var divId = nameMap[result[i].MOF_DIV_NAMENAME];
        //获取到得数据
        if(divId&&(divId!=undefined)){
            var data;
            if (checked == "收入增幅") {
                data = (result[i].SMPERIOD_ZZL_YB)*100
                data = Math.round(data * 100) / 100
                $($("#" + divId)[0].children[0]).text(data+"%");
            }
            if (checked == "一般公共预算收入") {
                data = (result[i].GEN_PUB_BUD_AMT/100000000)
                data = Math.round(data * 100) / 100
                $($("#" + divId)[0].children[0]).text(data+"亿");
            }
            if (checked == "税占比") {
                data = result[i].SZB*100;
                data = Math.round(data * 100) / 100
                $($("#" + divId)[0].children[0]).text(data+"%");
            }
        }
    }
}

