var baseCharts = {};
//基础信息设置>>图表ID：{title:'',number:'',percent:'',//0否1是suffix:'',tenThousand:''}
var basicInformation = {
    //"ctrl_219120-141336941":{title:'支付',number:'2',percent:'0',suffix:'万元',tenThousand:'1'}
}
/**
 * 创建拖动元素
 * @param {} element
 * @param {} ctrlinfo
 * @param {} properties
 */
baseCharts.createChart = function (element, ctrlinfo, properties) {

    var opt = null;
    if (ctrlinfo.CTRLTYPE === "echarts") {
        if (ctrlinfo.CTRLNAME === "BAR") {
            opt = baseOpt.barOpt();
        } else if (ctrlinfo.CTRLNAME === "PIE") {
            opt = baseOpt.pieOpt();
        } else if (ctrlinfo.CTRLNAME === "TREE") {
            opt = baseOpt.treeOpt();
        } else if (ctrlinfo.CTRLNAME === "LINE") {
            opt = baseOpt.lineOpt();
        } else if (ctrlinfo.CTRLNAME === "SCATTER") {
            opt = baseOpt.scatterOpt();
        } else if (ctrlinfo.CTRLNAME === "MIXED") {
            opt = baseOpt.mixedOpt();
        } else if (ctrlinfo.CTRLNAME === "LIQUID") {
            opt = baseOpt.liquidOpt();
        } else if (ctrlinfo.CTRLNAME === "WCLOUD") {
            opt = baseOpt.wcloudOpt();
        } else if (ctrlinfo.CTRLNAME === "BLINE") {
            opt = baseOpt.blineOpt();
        } else if (ctrlinfo.CTRLNAME === "BLOCKTREE") {
            //opt = baseOpt.blockTreeOpt();
        } else if (ctrlinfo.CTRLNAME === "STATICMAP") {
            opt = staticmap.staticMapOpt();
        }
    }
    //赋缺省值
    for (var i = 0; i < properties.length; i++) {
        var p = properties[i];
        if (p.PTYPE == "CTRLDEF") {
            if ((p.MAPPROPERTY != undefined) && (p.DEFAULTVAL != undefined)) {
                var list_mapproperty = p.MAPPROPERTY.split("-");
                var pvalue = p.DEFAULTVAL;
                if (pvalue.toUpperCase() == "TRUE")
                    pvalue = true;
                else if (pvalue.toUpperCase() == "FALSE")
                    pvalue = false;
                setItem(opt, list_mapproperty, pvalue);
            }
        }
    }
    var myChart = echarts.init(element[0]);
    myChart.setOption(opt);
    myChart.on('click', function (params) {

        var dom = params.event.topTarget.__zr.dom;
        pubclick(dom, params)
    });
    charts[element.attr("id")] = myChart;
    options[element.attr("id")] = opt;
};
//打开报表时，重新加载饼图
baseCharts.load = function (element, option) {

    //生成图表后，会生成_echarts_instance_属性，在保存后会导致再次加载图表渲染不出来
    element.removeAttr("_echarts_instance_");
    var myChart = echarts.init(element[0]);
    myChart.setOption(option);
    charts[element.attr("id")] = myChart;
    options[element.attr("id")] = option;
    myChart.on('click', function (params) {

        var dom = params.event.topTarget.__zr.dom;
        pubclick(dom, params)
    });
    myChart.on('dblclick', function (params) {
        baseCharts.dblClickLinkChart(element.attr("id"), params);
    });
    if (window.setSelectionCss)
        setSelectionCss(element);
};

//图表双击事件
baseCharts.dblClickLinkChart = function (elementid, params) {
    if (chartLinks[elementid] != null) {
        var key = elementid + "||dv_dim";
        if (dragDatas[key] == undefined)
            return;
        var dimitems = getOrderItems(dragDatas[key]);
        var filterItems = new Array();
        for (var i = 0; i < dimitems.length; i++) {
            var firstdim = dimitems[i];
            var itemNode = $.extend(true, {}, firstdim);
            //取CID
            var dimItemName = params.name;
            if (i > 0)
                dimItemName = params.seriesName;
            var CID = 0;
            $.each(cacheChartData[elementid], function (n, item) {
                    if (item[itemNode.NCODE.toUpperCase() + "NAME"] == dimItemName)
                        CID = item[itemNode.NCODE.toUpperCase() + "ID"];
                }
            );
            //FILTER
            itemNode.FILTER = "1:" + CID;
            filterItems.push(itemNode);
        }
        reloadByLinkFilter(elementid, filterItems);
    }
}

//根据维度度量，刷新饼图数据
//拖拽的数据源项发生改变时，触发
baseCharts.loadData = function (element, linkFilter) {
    debugger
    //取维度
    var key = element.attr("id") + "||dv_dim";
    var dimItems = null;
    if (dragDatas[key] != undefined) {
        dimItems = dragDatas[key];
        //Object.getOwnPropertyNames(items).length;
    }
    //取度量
    key = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[key] != undefined)
        measureItems = dragDatas[key];
    //取其他过滤条件 TODO
    key = element.attr("id") + "||dv_filter";
    var filterItems = {};
    if (dragDatas[key] != undefined)
        filterItems = dragDatas[key];
    //link\pub filter
    if (linkFilter != null) {
        for (var i = 0; i < linkFilter.length; i++)
            filterItems["link" + i] = $.extend(true, {}, linkFilter[i]);
    }
    //取数据
    var loaded = false;

    if ((dimItems != null) || (measureItems != null)) {
        var ctrlname = element.attr("ctrlname");
        var mixMeasureCount = 1;
        //区分两个度量的情况
        var _measureItems = null;
        var _dimItems = null;
        if (measureItems) {
            if (ctrlname == 'MIXED' || ctrlname == 'BLINE' || ctrlname == 'LIQUID') {
                mixMeasureCount = (Object.getOwnPropertyNames(measureItems).length >= 2) ? 2 : (Object.getOwnPropertyNames(measureItems).length);
            }
            _measureItems = getOrderItems(measureItems);
        }
        if (dimItems)
            _dimItems = getOrderItems(dimItems);
        var dimNum = 0;
        if (_measureItems && _measureItems.length >= mixMeasureCount) {
            var result = [];
            var dimJson = {};
            if (_dimItems) {
                var dimNum = ((_dimItems && _dimItems.length > 2) ? 2 : _dimItems.length);
                for (var x = 0; x < dimNum; x++) {
                    dimJson[_dimItems[x].NTYPE + "||" + _dimItems[x].FACTNAME + "||" + _dimItems[x].NCODE] = _dimItems[x]
                }
            }
            var measureJson = {}
            for (var k = 0; k < ((_measureItems.length > mixMeasureCount) ? mixMeasureCount : _measureItems.length); k++) {
                measureJson[_measureItems[k].NTYPE + "||" + _measureItems[k].FACTNAME + "||" + _measureItems[k].NCODE] = _measureItems[k];
            }
            //result = YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData", { "sbtid": source.sbtid, "dimItems": JSON.stringify(dimJson), "measureItems": JSON.stringify(measureJson), "filterItems": JSON.stringify(filterItems) });


            //处理前后n条
            var opt = options[element.attr("id")];
            var nstr = ((opt.topn) ? opt.topn : "") + ((opt.lastn) ? ("," + opt.lastn) : "");
            //result = loadChartsData(element, dimJson, measureJson, filterItems, nstr);
            //---------------------------
            if (viewState) loaded = true;
            asyncLoadChartsData(element, dimItems, measureItems, filterItems, nstr, function (data) {
                result = data;
                if ((dimItems && (Object.getOwnPropertyNames(dimItems).length > 0) && (Object.getOwnPropertyNames(measureItems).length > 0)) || ((ctrlname == 'LIQUID') && (Object.getOwnPropertyNames(measureItems).length > 0))) {
                    if (result && result.length > 0) {
                        var dataObj = baseCharts.buildComponentData(element, result);
                        var option = baseCharts.getOptionByData(element, dataObj.legend_data, dataObj.series_data, dataObj.xAxis_data, dataObj.yAxis_data);
                        //如果是柱状图 混合图 处理求和
                        if (((element.attr("ctrlname")) == "BAR" || (element.attr("ctrlname")) == "MIXED") && (option.stackSum)) {
                            option = setStackSum(option, element);
                        }
                        //处理seriesDataExt
                        option = addSeriesDataPro(option);
                        //处理渐变颜色方向
                        if (element.attr("dv_changedirection")) {
                            var changeData = element.attr("dv_changedirection");
                            //获取所有option所有serise中itmeStyle.color
                            var series = options[element.attr("id")].series;
                            for (var i = 0; i < series.length; i++) {
                                var color = series[i].itemStyle.color;
                                color.x = parseInt(changeData[0]);
                                color.x2 = parseInt(changeData[1]);
                                color.y = parseInt(changeData[2]);
                                color.y2 = parseInt(changeData[3]);
                                series[i].itemStyle.color = color
                            }
                        }
                        baseCharts.load(element, option);
                        cacheChartData[element.attr("id")] = result;
                        loaded = true;
                    } else {
                        var option = getEmptyOption(element);
                        baseCharts.load(element, option);
                        cacheChartData[element.attr("id")] = result;
                        loaded = true;

                    }
                }
            })
        }
    }
    if (!loaded) {
        loadDefaultChartsData(element);
    }
};

/**
 * 获取 echarts 加载空数据的option
 * @param element
 */
function getEmptyOption(element) {
    var option = options[element.attr("id")]
    //数据不存在的处理方式
    if (!option) return;
    //图例legend数据置空
    if (option.legend) {
        option.legend.data = [];
    }
    //x轴数据置空
    if (option.xAxis) {
        option.xAxis.data = [];
    }
    //series轴数据置空
    if (option.series) {
        for (var s = 0; s < option.series.length; s++) {
            option.series[s].data = [0];
        }
    }
    return option;
}

/**
 * 加载默认数据
 * @param element
 */
function loadDefaultChartsData(element) {
    var ctrlname = element.attr("ctrlname");
    var arr;
    var option;
    switch (ctrlname) {
        case 'MIXED':
            arr = baseOpt.default_mix_series_data;
            option = baseCharts.getOptionByData(element, baseOpt.default_mix_legend_data, arr, baseOpt.default_mix_xAxis_data);
            break;
        case 'LIQUID':
            arr = baseOpt.default_liquid_series_data;
            option = baseCharts.getOptionByData(element, baseOpt.default_liquid_legend_data, arr);
            break;
        case 'WCLOUD':
            arr = baseOpt.default_wcloud_series_data;
            for (var i = 0; i < arr.length; i++)
                arr[i]["type"] = (ctrlname + "").toLowerCase();
            var arr = [{"data": getWcloudOptData(arr)}];
            option = baseCharts.getOptionByData(element, baseOpt.default_legend_data, arr, baseOpt.default_xAxis_data);
            break;
        case 'BLINE':
            arr = baseOpt.default_bline_series_data;
            option = baseCharts.getOptionByData(element, baseOpt.default_bline_legend_data, arr, baseOpt.default_bline_xAxis_data);
            break;
        case 'BAR':
            if (element.attr("dv_stackSum_text")) {
                var opt = options[element.attr("id")];
                var option = setStackSum(opt, element)
                arr = option.series;
            } else {
                arr = arr = baseOpt.default_series_data;
            }
            option = baseCharts.getOptionByData(element, baseOpt.default_legend_data, arr, baseOpt.default_xAxis_data);
            break;
        default:
            arr = baseOpt.default_series_data;
            for (var i = 0; i < arr.length; i++)
                arr[i]["type"] = (ctrlname + "").toLowerCase();
            option = baseCharts.getOptionByData(element, baseOpt.default_legend_data, arr, baseOpt.default_xAxis_data);
            break;
    }
    //option.title.text = "";

    cacheChartData[element.attr("id")] = null;
    option = addSeriesDataPro(option);
    baseCharts.load(element, option);
    //$("#pp_dv_title").val("");
    delete cacheChartData[element.attr("id")];
}

//构造组件需要的数据
baseCharts.buildComponentData = function (element, result) {

    var dataObj = {};
    //生成数据
    var xAxisData = new Array(); //横坐标数据 （第一个维度的类别）
    var yAxisData = [ //y轴为度量
        {
            type: 'value',
            name: '金额',
            position: 'left',
            offset: 0
        }
    ];
    var legendData = new Array();//图例数据（大于一个维度时，第二个作为维度数据作为图例）
    var seriesData = new Array();


    //取维度
    var key = element.attr("id") + "||dv_dim";
    var dimItems = null;
    if (dragDatas[key] != undefined)
        dimItems = getOrderItems(dragDatas[key]);//排序后

    //取度量
    key = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[key] != undefined)
        measureItems = getOrderItems(dragDatas[key]);//排序后

    if (dimItems != null || measureItems != null) {
        var dim1Type = new Array();
        var dim2Type = new Array();
        var dim2Type_cid = new Array();
        var ctrlname = element.attr("ctrlname");
        switch (ctrlname) {
            case 'MIXED':
                dataObj = getMixedDataobj(result, dataObj, xAxisData, yAxisData, legendData, seriesData, ctrlname, dimItems, measureItems, dim1Type, dim2Type, dim2Type_cid);
                break;
            case 'LIQUID':
                dataObj = getLiquidDataobj(result, dataObj, xAxisData, yAxisData, legendData, seriesData, ctrlname, dimItems, measureItems, dim1Type, dim2Type, dim2Type_cid);
                break;
            default:
                dataObj = getdDefaultDataobj(result, dataObj, xAxisData, yAxisData, legendData, seriesData, ctrlname, dimItems, measureItems, dim1Type, dim2Type, dim2Type_cid);
                break;

        }
        //TODO
        //基础信息设置>>图表ID：{title:'',number:'',percent:'',//0否1是suffix:'',tenThousand:''}
        var basicInfo;
        key = element.attr("id");
        if (basicInformation[key]) {
            basicInfo = basicInformation[key];
        }
        //度量纵轴标题
        var length = (ctrlname == "MIXED") ? 2 : 1;
        //length=(measureItems.length>=2)?2:measureItems.length;
        for (var m = 0; m < length; m++) {
            if (basicInfo && basicInfo[measureItems[m].NCODE]) {
                var _basicInfo = basicInfo[measureItems[m].NCODE];
                //处理两个纵轴
                var name = "";
                var suffix = "";
                if (_basicInfo.title) {
                    switch (ctrlname) {
                        case 'LIQUID':
                            dataObj.xAxis_data = _basicInfo.title;
                            break;
                        case 'WCLOUD':
                            break;
                        default:
                            dataObj.yAxis_data[m].name = _basicInfo.title;
                            break;
                    }
                }
                //后缀
                /*if(_basicInfo.suffix){//有后缀优先后缀
                    suffix="("+_basicInfo.suffix+")";
                }else{
                    if(_basicInfo.tenThousand){
                        switch (_basicInfo.tenThousand) {
                            case "1":
                                suffix="(万元)";
                                break;
                            case "2":
                                suffix="(十万)";
                                break;
                            case "3":
                                suffix="(百万)";
                                break;
                            case "4":
                                suffix="(千万)";
                                break;
                            case "5":
                                suffix="(亿元)";
                                break;
                        }
                    }
                    if(_basicInfo.percent=='1'){
                        suffix="(%)";
                    }
                }*/
                if (suffix != "") {
                    switch (ctrlname) {
                        case 'LIQUID':
                            dataObj.xAxis_data += suffix;
                            break;
                        case 'WCLOUD':
                            break;
                        default:
                            dataObj.yAxis_data[m].name += suffix;
                            break;
                    }
                }

                //数据加工:如果两个维度,取不同的的data遍历,如果是一个维度,遍历所有
                if (length == 1) {
                    var formatterData;
                    switch (ctrlname) {
                        case 'LIQUID':
                            formatterData = dataObj.series_data;
                            for (var v = 0; v < formatterData.length; v++) {
                                //转小数
                                if (_basicInfo.number) {
                                    formatterData[v].value = parseFloat(formatterData[v].value).toFixed(_basicInfo.number);
                                }
                            }

                            break;
                        case 'WCLOUD':
                            formatterData = dataObj.series_data;
                            break;
                        default:
                            formatterData = dataObj.series_data;
                            for (var r = 0; r < formatterData.length; r++) {
                                var _data = formatterData[r].data;
                                for (var d = 0; d < _data.length; d++) {
                                    _data[d] = formatterNumThousand(_basicInfo, _data[d])
                                    //转小数
                                    if (_basicInfo.number) {
                                        _data[d] = parseFloat(_data[d]).toFixed(_basicInfo.number);
                                    }
                                }
                                formatterData[r].data = _data;
                            }
                            break;

                    }
                    dataObj.series_data = formatterData;

                } else {
                    var formatterData = dataObj.series_data;
                    var begin = m * (formatterData.length / 2);
                    var end = begin + (formatterData.length / 2);
                    for (var b = begin; b < end; b++) {
                        var oneData = formatterData[b].data;
                        for (var r = 0; r < oneData.length; r++) {
                            oneData[r] = formatterNumThousand(_basicInfo, oneData[r])
                            //转小数
                            if (_basicInfo.number) {
                                oneData[r] = parseFloat(oneData[r]).toFixed(_basicInfo.number);
                            }
                        }
                        formatterData[b].data = oneData;
                    }
                    dataObj.series_data = formatterData;
                }

            } else {//默认转两位小数
                if (length == 1) {
                    switch (ctrlname) {
                        case 'LIQUID':
                            formatterData = dataObj.series_data;
                            for (var v = 0; v < formatterData.length; v++) {
                                //转小数
                                formatterData[v].value = parseFloat(formatterData[v].value).toFixed('2');
                            }

                            break;
                        case 'WCLOUD':
                            formatterData = dataObj.series_data;
                            break;
                        default:
                            var formatterData = dataObj.series_data;
                            for (var r = 0; r < formatterData.length; r++) {
                                var _data = formatterData[r].data;
                                for (var d = 0; d < _data.length; d++) {
                                    //转小数
                                    _data[d] = parseFloat(_data[d]).toFixed('2');
                                }
                                formatterData[r].data = _data;
                            }
                            break;
                    }
                    dataObj.series_data = formatterData;
                } else {
                    var formatterData = dataObj.series_data;
                    if (ctrlname != 'WCLOUD') {
                        for (var b = 0; b < formatterData.length; b++) {
                            var oneData = formatterData[b].data;
                            for (var r = 0; r < oneData.length; r++) {
                                oneData[r] = parseFloat(oneData[r]).toFixed('2');
                            }
                            formatterData[b].data = oneData;
                        }
                    }
                    dataObj.series_data = formatterData;
                }
            }
        }
    }
    return dataObj;
}

/**
 * 取液体图dataobj对象
 * @param {} result
 * @param {} dataObj
 * @param {} xAxisData
 * @param {} yAxisData
 * @param {} legendData
 * @param {} seriesData
 * @param {} ctrlname
 * @param {} dimItems
 * @param {} measureItems
 * @return {}
 */
function getLiquidDataobj(result, dataObj, xAxisData, yAxisData, legendData, seriesData, ctrlname, dimItems, measureItems) {

    if (result.length > 0) {
        var oneData = result[0];
        for (var d = 0; d < measureItems.length; d++) {
            var data = oneData[measureItems[d]["NCODE"].toUpperCase()];
            var name = measureItems[0]["NTEXT"].toUpperCase();
            if (parseFloat(data) > 1 || parseFloat(data) < 0) {
                seriesData.push({name: name, value: 0});
            } else {
                seriesData.push({name: name, value: data});
            }
        }
    } else {
        var name = measureItems[0]["NTEXT"].toUpperCase();
        seriesData.push({name: name, value: 0});
    }
    seriesData = seriesData.sort(compare('value', 'desc'));
    dataObj.series_data = seriesData;
    return dataObj;
}

//升序/降序
function compare(property, type) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return (type == 'asc') ? (value1 - value2) : (value2 - value1);
    }
}

/**
 * 取混合图dataobj对象
 * @param {} dataObj
 * @param {} xAxisData
 * @param {} yAxisData
 * @param {} legendData
 * @param {} seriesData
 * @param {} ctrlname
 * @param {} dimItems
 * @param {} measureItems
 * @return {}
 */
function getMixedDataobj(result, dataObj, xAxisData, yAxisData, legendData, seriesData, ctrlname, dimItems, measureItems) {
    if (ctrlname == 'MIXED' && measureItems.length >= 2) {//混合图两个度量
        if (dimItems.length == 1) {
            var seriesData_0 = new Array();
            var seriesData_1 = new Array();
            for (var i = 0; i < result.length; i++) {
                var ncode_1 = dimItems[0]["NCODE"].toUpperCase();
                xAxisData.push(result[i][ncode_1 + "NAME"]);
                legendData.push(result[i][ncode_1 + "NAME"]);
                seriesData_0.push(result[i][measureItems[0]["NCODE"].toUpperCase()]);
                seriesData_1.push(result[i][measureItems[1]["NCODE"].toUpperCase()]);
            }
            //seriesData.push({"type": "bar", "name": measureItems[0].NTEXT, data: seriesData_0 });
            //seriesData.push({"type": "line", "name": measureItems[1].NTEXT,yAxisIndex: 1, data: seriesData_1 });
            //dataObj.legend_data = [measureItems[0].NTEXT,measureItems[1].NTEXT];
            seriesData.push({"type": "bar", "name": dimItems[0].NTEXT, data: seriesData_0});
            seriesData.push({"type": "line", "name": dimItems[1].NTEXT, yAxisIndex: 1, data: seriesData_1});
            dataObj.legend_data = [dimItems[0].NTEXT, dimItems[1].NTEXT];
        } else if (dimItems.length >= 2) {

            //第一个维度的字段名
            var ncode_0 = dimItems[0]["NCODE"].toUpperCase();
            var ncode_3 = measureItems[0]["NTEXT"];
            //第二个维度的字段名
            var ncode_1 = dimItems[1]["NCODE"].toUpperCase();
            var ncode_4 = measureItems[1]["NTEXT"];
            var dim2 = {};
            for (var i = 0; i < result.length; i++) {
                //加工数据
                //1.legendData
                if (dim2[result[i][ncode_1 + "NAME"]]) {//根据维度2归类数据
                    dim2[result[i][ncode_1 + "NAME"]].push(result[i]);
                } else {
                    dim2[result[i][ncode_1 + "NAME"]] = [result[i]];
                }
                //xAxisData
                if (xAxisData.indexOf(result[i][ncode_0 + "NAME"]) == -1)
                    xAxisData.push(result[i][ncode_0 + "NAME"]);
            }
            //legendData
            var dimkeys = Object.keys(dim2);
            legendData = dimkeys;
            /*legendData=dimkeys.concat(dimkeys);
            for(var l=0;l<legendData.length;l++){
                legendData[l]=legendData[l]+((l<(legendData.length/2))?ncode_3:ncode_4)
            }*/
            //seriesData
            var barData = [];
            var lineData = [];
            var count = 0;
            for (var s in dim2) {
                var oneDim = dim2[s];
                var seriesData_0 = [];
                var seriesData_1 = [];
                for (var o = 0; o < oneDim.length; o++) {
                    seriesData_0.push(oneDim[o][measureItems[0]["NCODE"].toUpperCase()]);
                    seriesData_1.push(oneDim[o][measureItems[1]["NCODE"].toUpperCase()]);
                }
                barData.push({"type": "bar", "name": legendData[count], data: seriesData_0})
                //lineData.push({"type": "line", "name": legendData[count+(legendData.length/2)],yAxisIndex: 1, data: seriesData_1 });
                lineData.push({"type": "line", "name": legendData[count], yAxisIndex: 1, data: seriesData_1});
                count++;
            }
            barData.push.apply(barData, lineData);
            seriesData = barData;
            dataObj.legend_data = legendData;
        }

        dataObj.xAxis_data = xAxisData;
        dataObj.yAxis_data = [{type: 'value', name: measureItems[0].NTEXT}, {
            type: 'value',
            name: measureItems[1].NTEXT
        }];
        dataObj.series_data = seriesData;

    }
    return dataObj;
}

/**
 * 取其他图表dataObj对象
 * @param {} result
 * @param {} dataObj
 * @param {} xAxisData
 * @param {} yAxisData
 * @param {} legendData
 * @param {} seriesData
 * @param {} ctrlname
 * @param {} dimItems
 * @param {} measureItems
 * @param {} dim1Type
 * @param {} dim2Type
 * @param {} dim2Type_cid
 */
function getdDefaultDataobj(result, dataObj, xAxisData, yAxisData, legendData, seriesData, ctrlname, dimItems, measureItems, dim1Type, dim2Type, dim2Type_cid) {

    // 维度等于2，度量 1，第一个维度为x轴，第二个维度为图例
    if (ctrlname != 'MIXED' && dimItems.length >= 2 && measureItems.length >= 1) {
        //第一个维度的字段名
        var ncode_0 = dimItems[0]["NCODE"].toUpperCase();
        //第二个维度的字段名
        var ncode_1 = dimItems[1]["NCODE"].toUpperCase();


        for (var i = 0; i < result.length; i++) {
            //第一个维度的类别
            if (dim1Type.indexOf(result[i][ncode_0 + "NAME"]) == -1)
                dim1Type.push(result[i][ncode_0 + "NAME"]);

            //第二个维度的类别
            if (dim2Type.indexOf(result[i][ncode_1 + "NAME"]) == -1)
                dim2Type.push(result[i][ncode_1 + "NAME"]);

            if (dim2Type_cid.indexOf(result[i][ncode_1 + "ID"]) == -1)
                dim2Type_cid.push(result[i][ncode_1 + "ID"]);
        }

        //构造三类数据，分别是xAxisData、legendData、seriesData
        //第一次遍历组成维度对象,同时构造第一个维度的顺序
        var dimSortArr = [];
        for (var i = 0; i < dim2Type.length; i++) { // 由 图例的个数产生数据的组数
            var tempArr = new Array();
            if (i == 0) {
                for (var j = 0; j < result.length; j++) {
                    //构造排序
                    dimSortArr.push(result[j][ncode_0 + "ID"])
                    if (dim2Type_cid[i] == result[j][ncode_1 + "ID"]) {
                        //第一维度数据
                        tempArr.push(result[j][measureItems[0]["NCODE"].toUpperCase()]);
                    }

                }
            }

            if (i > 0) {
                for (var x = 0; x < dimSortArr.length; x++) {
                    for (var y = 0; y < result.length; y++) {
                        if (dimSortArr[x] == result[y][ncode_0 + "ID"] && dim2Type_cid[i] == result[y][ncode_1 + "ID"]) {
                            //第n维度数据
                            tempArr.push(result[y][measureItems[0]["NCODE"].toUpperCase()]);
                        }

                    }
                }
            }
            if (ctrlname === "BAR") {
                seriesData.push({"type": "bar", "name": dim2Type[i], data: tempArr});
            } else if (ctrlname === "LINE") {
                seriesData.push({"type": "line", "name": dim2Type[i], data: tempArr});
            }
        }


        /*for (var i = 0; i < dim2Type.length; i++) { // 由 图例的个数产生数据的组数
            var tempArr = new Array();
            for (var j = 0; j < result.length; j++) {
                if (dim2Type_cid[i] == result[j][ncode_1 + "ID"])
                    tempArr.push(result[j][measureItems[0]["NCODE"].toUpperCase()]);
            }
            if (ctrlname === "BAR") {
                seriesData.push({"type": "bar", "name": dim2Type[i], data: tempArr});
            } else if (ctrlname === "LINE") {
                seriesData.push({"type": "line", "name": dim2Type[i], data: tempArr});
            }
        }*/
        dataObj.legend_data = dim2Type;
        dataObj.xAxis_data = dim1Type;
        yAxisData[0].name = measureItems[0]["NTEXT"];
        dataObj.yAxis_data = yAxisData;
        dataObj.series_data = seriesData;
    } else if (ctrlname != 'MIXED' && dimItems.length == 1) {//一个维度
        var seriesData_ = new Array();
        var maxCount = (measureItems.length >= 2) ? 2 : 1;
        if (maxCount == 2) {//两个度量
            seriesData_ = {0: [], 1: []};
            legendData = [measureItems[0]["NTEXT"], measureItems[1]["NTEXT"]];
            yAxisData = [{type: 'value', name: measureItems[0]["NTEXT"]}, {
                type: 'value',
                name: measureItems[1]["NTEXT"]
            }]
        } else {//一个度量
            seriesData_ = {0: []};
            legendData = [measureItems[0]["NTEXT"]];
            yAxisData = [{type: 'value', name: measureItems[0]["NTEXT"]}]
        }
        for (var i = 0; i < result.length; i++) {
            var ncode_1 = dimItems[0]["NCODE"].toUpperCase();
            xAxisData.push(result[i][ncode_1 + "NAME"]);
            for (var j = 0; j < maxCount; j++) {
                seriesData_[j].push(result[i][measureItems[j]["NCODE"].toUpperCase()]);
            }
        }
        if (measureItems.length <= 2) {
            dataObj.xAxis_data = xAxisData;
            dataObj.yAxis_data = yAxisData;
            dataObj.legend_data = legendData;
            for (var i = 0; i < measureItems.length; i++) {
                if (ctrlname == "BLINE" || ctrlname == "LINE") {
                    seriesData.push({"type": "line", "name": measureItems[i]["NTEXT"], data: seriesData_[i]});
                } else {
                    seriesData.push({"type": "bar", "name": measureItems[i]["NTEXT"], data: seriesData_[i]});
                }
            }
            dataObj.series_data = seriesData;
            return dataObj;
        }
    }
    return dataObj;
}

//根据新数据重绘图
baseCharts.getOptionByData = function (element, legend_data, series_data, xAxis_data, yAxis_data) {

    var ctrlname = element.attr("ctrlname");
    var option = options[element.attr("id")];
    //处理xy轴互换
    var xAxis = "xAxis";
    var yAxis = "yAxis";
    if (option.config && option.config.changexy == "y") {
        xAxis = "yAxis";
        yAxis = "xAxis";
    }
    if (ctrlname == 'LIQUID' && xAxis_data) {
        option["series"][0].name = xAxis_data;
    }
    if (option[xAxis] != undefined && xAxis_data) {
        switch (ctrlname) {
            case 'MIXED':
                option[xAxis][0].data = xAxis_data;
                break;
            case 'LIQUID':
                break;
            case 'BLINE':
                option[xAxis][0].data = xAxis_data;
                break;
            default:
                option[xAxis]["data"] = xAxis_data;
                break;

        }
    }
    if (option["legend"] && legend_data) {
        switch (ctrlname) {
            case 'LIQUID':
                option["legend"] = legend_data;
                break;
            default:
                option["legend"]["data"] = legend_data;
                break;
        }
    }
    if (option["series"] && series_data) {

        switch (ctrlname) {
            case 'LIQUID':
                option["series"][0].data = series_data;
                break;
            case 'WCLOUD':
                option["series"][0].data = series_data[0].data;
                break;
            case 'BLINE':
                option["series"] = [];
                for (var i = 0; i < series_data.length; i++) {
                    option["series"][i] = baseOpt.default_bline_series_data[i];
                    option["series"][i].data = series_data[i].data;
                    option["series"][i].name = series_data[i].name;
                }
                break;
            case 'MIXED':
                option["series"] = series_data;
                /*for(var i = 0;i<series_data.length;i++){
                    //option["series"][i].data = series_data[i].data;
                    //option["series"][i].name = series_data[i].name;
                    option["series"].push()
                }*/
                break;
            default:
                option["series"] = series_data;
                break;

        }
    }
    if (option[yAxis] && yAxis_data) {
        switch (ctrlname) {
            case 'MIXED':
                for (var s = 0; s < yAxis_data.length; s++) {
                    option[yAxis][s].type = yAxis_data[s].type;
                    option[yAxis][s].name = yAxis_data[s].name;
                }
                break;
            default:
                for (var s = 0; s < yAxis_data.length; s++) {
                    if (!option[yAxis][s]) option[yAxis][s] = yAxis_data[s];
                    option[yAxis][s].type = yAxis_data[s].type;
                    option[yAxis][s].name = yAxis_data[s].name;
                }


                break;
        }
    }
    return option;
};

function setStackSum(option, element) {
    var changexy = element.attr("dv_changexy");
    //如果最后一个series为总和 属性值为true 直接返回
    var last = option.series[(option.series.length - 1)].name;
    if ((last == "柱状图总和" || last == "折线图总和") && option.stackSum == "true") {
        var data = setSumData(option);
        option.series[(option.series.length - 1)].data = data;
        if (changexy == "true" || changexy == "" || changexy == "TRUE") {
            option.series[(option.series.length - 1)].label.position = "right"
        } else {
            option.series[(option.series.length - 1)].label.position = "top"
        }
        return option;
    }

    //处理柱状图 混合图 总和
    if (option.stackSum && (last != "柱状图总和" || last != "折线图总和")) {
        //分别处理柱状图 混合图求和
        //获取总和数据
        var countData = setSumData(option, element);
        var position = "";
        if (changexy == "true" || changexy == "" || changexy == "TRUE") {
            position = "right"
        } else {
            position = "top"
        }
        //设置总和series
        //rgba(0,0,0,0)
        option.series.push({
                name: '柱状图总和',
                type: 'bar',
                barGap: "-100%",
                color: 'rgba(0,0,0,0)',
                label: {
                    color: '#cef3ff',
                    show: true,
                    position: position,
                },
                data: countData[0]
            }
        );

        if (element.attr("ctrlname") == "MIXED") {
            option.series.push({
                    name: "折线图总和",
                    type: "line",
                    yAxisIndex: 1,
                    data: countData[1]
                }
            );
        }

        return option;
    }
    // 删除总和
    if (!option.stackSum && (last == "柱状图总和" || last == "折线图总和")) {
        for (let i = 0; i < option.series.length; i++) {
            if (option.series[i].name == "柱状图总和" || option.series[i].name == "折线图总和") {
                delete option.series[i]
            }
        }
    }
    return option;
}

function setSumData(option, element) {
    var barData = [];
    var lineData = []
    var barCountData = [];
    var lineCountData = [];
    var countData = []

    for (var i = 0; i < (option.series.length); i++) {
        //处理混和图 柱图求和
        if (option.series[i].type == "bar") {
            barData.push(option.series[i].data);
        }
        if (option.series[i].type == "line") {
            lineData.push(option.series[i].data);
        }
    }

    for (var i = 0; i < (option.series[0].data).length; i++) {
        var count = 0;
        for (var j = 0; j < barData.length; j++) {
            //如果数据为空 或nan 作为0处理
            if (barData[j][i] == "NaN" || barData[j][i] == null) {
                barData[j][i] = 0
            }
            count = floatAdd(count, barData[j][i]);
        }
        barCountData.push(count);
        if (element.attr("ctrlname") == "MIXED") {
            var _count = 0;
            for (var k = 0; k < lineData.length; k++) {
                //如果数据为空 或nan 作为0处理
                if (lineData[k][i] == "NaN" || lineData[k][i] == null) {
                    lineData[k][i] = 0
                }
                _count = floatAdd(_count, lineData[k][i]);
            }
        }
        lineCountData.push(_count)
    }
    countData.push(barCountData);
    countData.push(lineCountData);


    return countData;
}
