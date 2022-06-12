var pie = {};

pie.default_legend_data = [],
    pie.default_series_data = [
        {value: 0, name: ''}
    ],
//仪表图模式下的内容
    pie.default_title = [{
        //text: ['{a|44%}'].join('\t\t'),
        //subtext: ['{a|收入完成率}'].join('\t\t'),
        x: 'center',
        y: 'center',
        textStyle: {
            rich: {
                a: {
                    fontFamily: 'SourceHanSansCN-Regular',
                    fontWeight: '400',
                    color: "rgba(76, 177, 255, 1)",
                    fontSize: 24,
                    align: 'center',
                    textAlign: 'right'
                }
            }
        },
        subtextStyle: {
            rich: {
                a: {
                    fontFamily: 'SourceHanSansCN-Regular',
                    fontWeight: '400',
                    color: "rgba(76, 177, 255, 1)",
                    fontSize: 14,
                    textAlign: 'right'
                }
            }
        }
    }],
    pie.createPie = function (element, ctrlinfo, properties) {
        var opt = pie.getOption();
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
        //option["legend"]["data"] = pie.default_legend_data;
        //option["series"][0]["data"] = pie.default_series_data;
        myChart.setOption(option);
        myChart.on('click', function (params) {

            var dom=params.event.topTarget.__zr.dom;
            pubclick(dom,params)
        });
        charts[element.attr("id")] = myChart;
        options[element.attr("id")] = option;
    }
//打开报表时，重新加载饼图
pie.load = function (element, option) {
    element.removeAttr("_echarts_instance_");
    var myChart = echarts.init(element[0]);
    myChart.setOption(option);
    charts[element.attr("id")] = myChart;
    options[element.attr("id")] = option;
    myChart.on('dblclick', function (params) {
        pie.dblClickLinkChart(element.attr("id"), params);
    });
    myChart.on('click', function (params) {

        var dom=params.event.topTarget.__zr.dom;
        pubclick(dom,params)
    });
    if (window.setSelectionCss)
        setSelectionCss(element);
}

//图表双击事件
pie.dblClickLinkChart = function (elementid, params) {
    //图表双击存在两种展现形式，1：设置了图表联动（优先级高）
    if (chartLinks[elementid] != null && chartLinks[elementid].length > 0) {
        var key = elementid + "||dv_dim";
        if (dragDatas[key] == undefined)
            return;
        var dimitems = dragDatas[key];
        var firstdim = dimitems[Object.keys(dimitems)[0]];
        var filterItems = pie.getFilterItems(elementid, firstdim, params);
        reloadByLinkFilter(elementid, filterItems);
    } else {//2：未设联动，图表自身钻取
        //两种形式不支持钻取，bottom=undefined表示维度 不是非平衡层次（无层级），bottom=1 表示最末级
        if (params.data.bottom == undefined || params.data.bottom == "1")
            return;
        var key = elementid + "||dv_dim";
        if (dragDatas[key] == undefined)
            return;
        var dimitems = dragDatas[key];
        var firstdim = dimitems[Object.keys(dimitems)[0]];
        firstdim.BOOTLEVEL = parseInt(firstdim.BOOTLEVEL) + 1;

        pie.createDrillBackMenu(elementid, firstdim);

        var filterItems = pie.getFilterItems(elementid, firstdim, params);
        reloadByDrillFilter(elementid, filterItems);
    }
}

//创建FilterItems
pie.getFilterItems = function (elementid, firstdim, params) {
    var filterItems = new Array();
    var itemNode = $.extend(true, {}, firstdim);
    //取CID
    var dimItemName = params.name;
    var CID = 0;
    $.each(cacheChartData[elementid], function (n, item) {
            if (item[itemNode.NCODE.toUpperCase() + "NAME"] == dimItemName)
                CID = item[itemNode.NCODE.toUpperCase() + "ID"];
        }
    );
    itemNode.FILTER = "1:" + CID;
    filterItems.push(itemNode);
    return filterItems;
}

//创建自定义按钮，图表自身钻取的返回操作
pie.createDrillBackMenu = function (elementid, firstdim) {
    //记录钻取过程，将钻取的过程存储在拖拽项的FILTERLIST属性中
    if (!firstdim.FILTERLIST)
        firstdim.FILTERLIST = [];
    firstdim.FILTERLIST.push(firstdim.FILTER);

    options[elementid].toolbox.feature.myTool_back = {
        show: true,
        title: '返回',
        icon: 'image://http://echarts.baidu.com/images/favicon.png',
        onclick: function () {
            var firstdims_ = dragDatas[elementid + "||dv_dim"];
            var firstdim_ = firstdims_[Object.keys(firstdims_)[0]];
            if (firstdim_.FILTERLIST.length > 0) {
                //返回操作，删除最后一次钻取的过程
                firstdim_.FILTERLIST.splice(firstdim_.FILTERLIST.length - 1, 1);
                firstdim_.BOOTLEVEL = parseInt(firstdim_.BOOTLEVEL) - 1;
                var filter = firstdim_.FILTERLIST[firstdim_.FILTERLIST.length - 1];
                firstdim_.FILTER = (filter == undefined ? "" : filter);
                if (firstdim_.FILTERLIST.length == 0) {
                    firstdim_.FILTERLIST = null;//返回初始状态，清空钻取过程
                    delete options[elementid].toolbox.feature.myTool_back;//移除自定义返回按钮
                }
            }
            var filterItems = new Array();
            filterItems.push(firstdim_);
            reloadByDrillFilter(elementid, filterItems);
        }
    }
}


//根据维度度量，刷新饼图数据
//拖拽的数据源项发生改变时，触发
pie.loadData = function (element, linkFilter) {
    var option = options[element.attr("id")];
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
        filterItems = $.extend(true, {}, dragDatas[key]);
    //link\pub filter
    if (linkFilter != null) {
        for (var i = 0; i < linkFilter.length; i++)
            filterItems["link" + i] = $.extend(true, {}, linkFilter[i]);
    }
    //取数据
    var loaded = false;
    if ((dimItems != null) && (measureItems != null)) {
        if ((Object.getOwnPropertyNames(dimItems).length > 0) && (Object.getOwnPropertyNames(measureItems).length > 0)) {
            //var result = YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData", { "sbtid": page.sbtid, "dimItems": JSON.stringify(dimItems), "measureItems": JSON.stringify(measureItems), "filterItems": JSON.stringify(filterItems) });
            //处理前后n条
            var opt = options[element.attr("id")];
            var nstr = ((opt.topn) ? opt.topn : "") + ((opt.lastn) ? ("," + opt.lastn) : "");
            //var result = loadChartsData(element, dimItems, measureItems, filterItems, nstr);
            if(viewState)loaded=true;
            asyncLoadChartsData(element, dimItems, measureItems, filterItems,nstr,function (data) {
                //---------------------------
                var option = options[element.attr("id")];
                var key = element.attr("id") + "||dv_dim";
                dimItems = getOrderItems(dragDatas[key])
                key = element.attr("id") + "||dv_measure";
                measureItems = getOrderItems(dragDatas[key])
                if (data) {
                    var result =data;
                    //生成数据  度量单位
                    var legend_datas = new Array();
                    var series_datas = new Array();
                    var sername = "";
                    var formatter = "";

                    if (dimItems.length >= 2 && measureItems.length >= 1) {
                        var dim1Type = new Array()
                        var dim2Type = new Array()
                        var dim2Type_cid = new Array()
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
                        for (var i = 0; i < dim2Type.length; i++) { // 由 图例的个数产生数据的组数
                            var series_data = new Array();
                            for (var j = 0; j < result.length; j++) {
                                if (dim2Type_cid[i] == result[j][ncode_1 + "ID"])
                                    series_data.push(result[j][measureItems[0]["NCODE"].toUpperCase()]);
                            }
                           // series_datas.push({"type": "bar", "name": dim2Type[i], data: tempArr});
                            series_datas.push(series_data);
                        }
                        /*//多维度 一个度量
                        var ncode_meas = measureItems[0]["NCODE"].toUpperCase();
                        //多维度时多个series
                        for (var i = 0; i < dimItems.length; i++) {
                            var series_data = [];
                            var legend_data = [];
                            var ncode_dim = dimItems[i]["NCODE"].toUpperCase();
                            for (var j = 0; j < result.length; j++) {
                                var row = result[j];
                                legend_data.push(row[ncode_dim + "NAME"] || row[ncode_dim]);
                                var item = {};
                                item.value = row[ncode_meas];
                                item.name = row[ncode_dim + "NAME"] || row[ncode_dim];
                                item.cid = row[ncode_dim + "ID"];
                                item.bottom = row[ncode_dim + "BOTTOM"];
                                series_data.push(item);
                            }
                            series_datas.push(series_data);
                            legend_datas.push(legend_data);
                        }*/
                        //   cacheChartData[element.attr("id")] ;
                        //todo 构造series
                        pie.addSeries(option, series_datas)
                    } else {
                        // var delCount = opt.series.length
                        //  opt.series.splice(0, delCount)
                        //一个度量维度
                        var ncode_meas = measureItems[0]["NCODE"].toUpperCase();
                        var ncode_dim = dimItems[0]["NCODE"].toUpperCase();
                        var series_data = [];
                        var legend_data = [];
                        for (var i = 0; i < result.length; i++) {
                            var row = result[i];
                            legend_data.push(row[ncode_dim + "NAME"] || row[ncode_dim]);
                            var item = {};
                            item.value = row[ncode_meas];
                            item.name = row[ncode_dim + "NAME"] || row[ncode_dim];
                            item.cid = row[ncode_dim + "ID"];
                            item.bottom = row[ncode_dim + "BOTTOM"];
                            series_data.push(item);
                        }
                        series_datas.push(series_data)
                        legend_datas.push(legend_data)

                        //设置option
                        option["legend"]["data"] = legend_datas[0];
                        option["series"]["data"] = series_datas[0];

                        //  option["series"][0]["data"] = series_datas[0];
                    }

                    var basicInfo;
                    key = element.attr("id");
                    if (basicInformation[key]) {
                        basicInfo = basicInformation[key];
                    }
                    if (basicInfo && basicInfo[ncode_meas]) {
                        var _basicInfo = basicInfo[ncode_meas];
                        var suffix = "";
                        if (_basicInfo.title) {
                            sername = _basicInfo.title;
                        }
                        var formatterData = series_datas;
                        for (var r = 0; r < formatterData.length; r++) {
                            for (let i = 0; i < formatterData[r].length; i++) {
                                var _data = (formatterData[r])[i].value;

                                //转万元
                                _data = formatterNumThousand(_basicInfo, _data);
                                //转小数
                                if (_basicInfo.number) {
                                    _data = parseFloat(_data).toFixed(_basicInfo.number);
                                }
                                (formatterData[r])[i].value = _data;
                            }
                        }
                        series_datas = formatterData;
                    } else {//默认转两位小数
                        var formatterData = series_datas;
                        for (var r = 0; r < formatterData.length; r++) {
                            for (let i = 0; i < formatterData[r].length; i++) {
                                var _data = (formatterData[r])[i].value;
                                //转小数
                                _data = parseFloat(_data).toFixed('2');
                                (formatterData[r])[i].value = _data;
                            }
                        }
                        series_datas = formatterData;;
                    }
                    if (formatter != "") {
                        option["tooltip"]["formatter"] = formatter;
                    }
                    //处理标签提示
                    var measureUnit = option['measureUnit'];
                    if (measureUnit && measureUnit != undefined){
                        option['tooltip']['formatter'] = '{b} : {c}' + measureUnit + '({d}%)';
                        if (option['seriesDataExt'] && option['seriesDataExt']['seriesDataExt-label-normal-formatter']){
                            var labelFormatter = option['seriesDataExt']['seriesDataExt-label-normal-formatter'][0];//标签格式
                            if (labelFormatter.indexOf('{c}') != -1)//标签包含{c}
                                option['seriesDataExt']['seriesDataExt-label-normal-formatter'][0] = labelFormatter.substring(0, labelFormatter.lastIndexOf('{c}')+3) + measureUnit;
                        }
                    }

                    /* option["legend"]["data"] = legend_data;
                     option["series"][0]["data"] = series_data;*/
                    option = addSeriesDataPro(option);
                    //*************渲染图表前，设置图表的标题 *************
                    var measNTEXT = measureItems[0].NTEXT;//度量拖拽项名称
                    var dimNTEXTs = "";
                    $.each(dimItems, function (n, item) {
                        dimNTEXTs += item.NTEXT + "、";
                    });
                    if (dimNTEXTs != "")
                        dimNTEXTs = dimNTEXTs.substring(0, dimNTEXTs.length - 1);
                    option.title.text = (measNTEXT + "【按" + dimNTEXTs + "划分】")
                    $("#pp_dv_title").val(measNTEXT + "【按" + dimNTEXTs + "划分】");
                    //***********************************************


                    pie.load(element, option);
                    cacheChartData[element.attr("id")] = result;
                    //触发加载成功后事件
                    pubAfterLoaded(element[0]);
                    loaded = true;
                }else{
                    var option= getEmptyOption(element);
                    pie.load(element, option);
                    cacheChartData[element.attr("id")] = result;
                    //触发加载成功后事件
                    pubAfterLoaded(element[0]);
                    loaded = true;
                }
                //---------------------------
            })


        }
    }
    if (!loaded) {
        var option = options[element.attr("id")];
        option["legend"]["data"] = pie.default_legend_data;
        option["series"][0]["data"] = pie.default_series_data;
        option = addSeriesDataPro(option);
        pie.load(element, option);
        delete cacheChartData[element.attr("id")];
    }
}

pie.getOption = function () {
    option = {
        controlType: "PIE",
        //是否开启仪表图模式
        ismeter: false,
        title: pie.default_title,
        polar:{},
        angleAxis: { //极坐标系的角度轴
            interval: 1,
            type: 'category',
            data: [],
            z: 10,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B4A6B",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                interval: 0,
                show: false,
                color: "#0B4A6B",
                margin: 8,
                fontSize: 16
            }
        },
        radiusAxis: {
            min: 20,
            max: 120,
            interval: 20,
            axisTick:{ show:false },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B3E5E",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                show: false,
                // formatter: '{value} %',
                padding: [0, 0, 20, 0],
                color: "#0B3E5E",
                fontSize: 16
            },
            splitLine: {//极坐标分割线
                show: false,
                lineStyle: {
                    color: "#07385e",
                    width: 2,
                    type: "dashed"
                }
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            type: 'scroll',
            right: '15',
            data: []
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        series: [
            {
                name: '',
                type: 'pie',
                color:["skyblue"],
                radius: ['50%', '80%'],
                roseType: false,//是否展示成南丁格尔图，默认false
                center: ['50%', '50%'],
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}:\n'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        shadowBlur: 0,
                        shadowColor: [],
                        shadowOffsetx: 0,
                        shadowOffsety: 0,
                    }
                },
                data: [
                    {value: 0, name: ''}
                ]
            }
        ]
    };
    return option;
}



pie.addSeries = function (option, series_datas) {
    option.series.splice(0, 1)

    //设置option
    var radiuss = [
        [0, '50%'],
        ["60%", "90%"]
    ]
    for (var i = 0; i < series_datas.length; i++) {
        // option["legend"]["data"] = legend_datas;
        // option["series"][i]["data"] = series_datas;
        // option.series[i].data = series_datas[i];
        option.series.push({
            name: '',
            type: 'pie',
            radius: radiuss[i],
            roseType: false,//是否展示成南丁格尔图，默认false
            center: ['50%', '50%'],
            label: {
                normal: {
                    show: true,
                    formatter: '{b}:\n'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    shadowBlur: 20,
                    shadowColor: [],
                    shadowOffsetx: 25,
                    shadowOffsety: 20,
                }
            },
            data: series_datas[i]
        });

    }

}


