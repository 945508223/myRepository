var pie = {};

pie.default_legend_data = ['演示1', '演示2'],
    pie.default_series_data = [
        {value: 1, name: '演示1'},
        {value: 1, name: '演示2'},

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

            var dom = params.event.topTarget.__zr.dom;
            pubclick(dom, params)
        });
        charts[element.attr("id")] = myChart;
        options[element.attr("id")] = option;
    }
//打开报表时，重新加载饼图
pie.load = function (element, option) {
    element.removeAttr("_echarts_instance_");
    var myChart = echarts.init(element[0]);
    myChart.setOption(option);
    // console.log(myChart.getDataURL())
    charts[element.attr("id")] = myChart;
    options[element.attr("id")] = option;
    myChart.on('dblclick', function (params) {
        pie.dblClickLinkChart(element.attr("id"), params);
    });
    myChart.on('click', function (params) {

        var dom = params.event.topTarget.__zr.dom;
        pubclick(dom, params)
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
    //A、判断dv_datasource属性是否存在
    if ($(element).attr("dv_datasource")) {
        //1、根据控件名加载饼图数据
        var dsArr = $(element).attr("dv_datasource").split(",")
        //置空series 重新绘制饼图
        var option = options[element.attr("id")];
        option["legend"]["data"] = pie.default_legend_data;
        var opt = pie.getOption()
        option.series = opt.series;
        for (var i = 0; i < dsArr.length; i++) {
            //2、根据数据构建option
            if ($DV.getEl(dsArr[i])) {
                buidPieOptionByName(element, $DV.getEl(dsArr[i]), $DV.getDS(dsArr[i]), i);
            }
        }
        //3、加载饼图
        var option = options[element.attr("id")];
        console.log(JSON.stringify(option))
        pie.load(element, option);
        //cacheChartData[element.attr("id")] = result;
        //触发加载成功后事件
        pubAfterLoaded(element[0]);
        loaded = true;

    } else {
        if ((dimItems != null) && (measureItems != null)) {
            if ((Object.getOwnPropertyNames(dimItems).length == 1) && (Object.getOwnPropertyNames(measureItems).length == 1)) {
                //处理前后n条
                var option = options[element.attr("id")];
                var nstr = ((option.topn) ? option.topn : "") + ((option.lastn) ? ("," + option.lastn) : "");
                //预览状态获取数据后加载数据
                if (viewState) loaded = true;
                asyncLoadChartsData(element, dimItems, measureItems, filterItems, nstr, function (data) {
                    //置空series 重新绘制饼图
                    var option = options[element.attr("id")];
                    option["legend"]["data"] = pie.default_legend_data;
                    var opt = pie.getOption()
                    option.series = opt.series;

                    buidPieOptionByName(element, element, data, 0)
                    var option = options[element.attr("id")];
                    console.log("option:>>>>>>" + JSON.stringify(option));
                    pie.load(element, option);
                    cacheChartData[element.attr("id")] = data;
                    //触发加载成功后事件
                    pubAfterLoaded(element[0]);
                    loaded = true;
                })
            }
        } else {
            //没有拖拽数据源情况
            var option = options[element.attr("id")];
            option["legend"]["data"] = pie.default_legend_data;
            var opt = pie.getOption()
            option.series = opt.series;
            pie.load(element, option);
            //cacheChartData[element.attr("id")] = result;
            //触发加载成功后事件
            pubAfterLoaded(element[0]);
            loaded = true;
        }

        //没有数据加载默认饼图
        /*var option = options[element.attr("id")];
        option["legend"]["data"] = pie.default_legend_data;
        option["series"][0]["data"] = pie.default_series_data;
        option = addSeriesDataPro(option);
        //如果变换过形态清楚y轴数据
        if(element.attr("dv_changeshape_text")){
            option.yAxis[0].data=[]
        }
        pie.load(element, option);
        //触发加载成功后事件
        pubAfterLoaded(element[0]);
        loaded = true;*/

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


/**
 * 根据控件名构建optinn
 * @param element
 * @param result
 * @param index
 */
function buidPieOptionByName(element, dataSourceElement, result, index) {
    var option = options[element.attr("id")];
    //取维度
    var key = $(dataSourceElement).attr("id") + "||dv_dim";
    var dimItems = getOrderItems(dragDatas[key])
    // dimItems = dimItems[0]
    //取度量
    key = $(dataSourceElement).attr("id") + "||dv_measure";
    var measureItems = getOrderItems(dragDatas[key])
    measureItems = measureItems[0]
    //取数据
    if (result && result.length > 0) {
        //生成数据  度量单位
        var legend_data = new Array();
        var series_data = new Array();
        var sername = "";
        var formatter = "";
        // var ncode_dim = (getOrderItems(dragDatas[$(dataSourceElement).attr("id") + "||dv_dim"])[0]["NCODE"]).toUpperCase();
        //判断几个维度
        //var dimLength = (getOrderItems(dragDatas[$(dataSourceElement).attr("id") + "||dv_dim"])).length;
        //用于记录多个维度字段
        var dims = [];
        for (var x = 0; x < dimItems.length; x++) {
            var ncode_dim = (getOrderItems(dragDatas[$(dataSourceElement).attr("id") + "||dv_dim"])[x]["NCODE"]).toUpperCase();
            dims.push(ncode_dim)
        }
        var ncode_meas = (getOrderItems(dragDatas[$(dataSourceElement).attr("id") + "||dv_measure"])[0]["NCODE"]).toUpperCase();
        var ncode_meas_fieldname = getMeasureFieldName(getOrderItems(dragDatas[$(dataSourceElement).attr("id") + "||dv_measure"])[0]);
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            legend_data.push(row[dims[0] + "NAME"] || row[dims[0]]);
            var item = {};
            //data_arry[0]==0?null:data_arry[0], 为0 值给null
            item.value = row[ncode_meas_fieldname] == 0 ? null : row[ncode_meas_fieldname];
            //添加每个维度的数据
            item.name = item[dims[0]] = row[dims[0] + "NAME"] || row[dims[0]];
            for (var j = 1; j < dims.length; j++) {
                item[dims[j]] = row[dims[j] + "NAME"] || row[dims[j]];
            }
            //item["cid"+n] = row[ncode_dim + "ID"];
            //item["bottom"+n] = row[ncode_dim + "BOTTOM"];
            // test["name" + i] = i

            series_data.push(item);
        }
        var basicInfo;
        key = $(dataSourceElement).attr("id");
        if (basicInformation[key]) {
            basicInfo = basicInformation[key];
        }
        if (basicInfo && basicInfo[ncode_meas]) {
            var _basicInfo = basicInfo[ncode_meas];
            var suffix = "";
            if (_basicInfo.title) {
                sername = _basicInfo.title;
            }
            var formatterData = series_data;
            for (var r = 0; r < formatterData.length; r++) {
                var _data = formatterData[r].value;
                //转万元
                _data = formatterNumThousand(_basicInfo, _data);
                //转小数
                if (_basicInfo.number) {
                    _data = parseFloat(_data).toFixed(_basicInfo.number);
                }
                formatterData[r].value = _data;
            }
            series_data = formatterData;
        } else {//默认转两位小数
            var formatterData = series_data;
            for (var r = 0; r < formatterData.length; r++) {
                var _data = formatterData[r].value;
                //转小数
                _data = parseFloat(_data).toFixed('2');
                formatterData[r].value = _data;
            }
            series_data = formatterData;
        }
        if (formatter != "") {
            option["tooltip"]["formatter"] = formatter;
        }
        //处理标签提示
        var measureUnit = option['measureUnit'];
        if (measureUnit && measureUnit != undefined) {
            option['tooltip']['formatter'] = '{b} : {c}' + measureUnit + '({d}%)';
            if (option['seriesDataExt'] && option['seriesDataExt']['seriesDataExt-label-normal-formatter']) {
                var labelFormatter = option['seriesDataExt']['seriesDataExt-label-normal-formatter'][0];//标签格式
                if (labelFormatter.indexOf('{c}') != -1)//标签包含{c}
                    option['seriesDataExt']['seriesDataExt-label-normal-formatter'][0] = labelFormatter.substring(0, labelFormatter.lastIndexOf('{c}') + 3) + measureUnit;
            }
        }
        if (option["legend"] && option["legend"]["data"]) {
            option["legend"]["data"] = option["legend"]["data"].concat(legend_data)
        } else {
            option["legend"]["data"] = legend_data;
        }
        setItem(option, ["series", index, "type"], "pie");
        setItem(option, ["series", index, "data"], series_data);
        //option["series"][index]["data"] = series_data;

        //处理饼图变换形态
        if ((element.attr("dv_changeshape_text")) == "TRUE" || (element.attr("dv_changeshape")) == "FALSE") {
            option = changeShape2(option, element.attr("dv_changeshape"), element.attr("dv_piebackgroundcolor"), element.attr("dv_yaxis_axislabel_textstyle_fontsize"), element.attr("dv_yaxis_axislabel_textstyle_color_text"))


        }
        //添加圆环背景
        if (element.attr("dv_addbackground_text")) {
            option = addBackground(option, element.attr("dv_addbackground_text"), element.attr("dv_piebackgroundcolor"))
        }

        option = addSeriesDataPro(option);


        //*************渲染图表前，设置图表的标题 *************
        var measNTEXT = measureItems.NTEXT;//度量拖拽项名称
        var dimNTEXTs = "";
        dimNTEXTs += dimItems.NTEXT + "、";
        if (dimNTEXTs != "")
            dimNTEXTs = dimNTEXTs.substring(0, dimNTEXTs.length - 1);
        if (index != 0) {
            var textString = option.title.text;
            measNTEXT = measNTEXT + "、" + textString.split("【按")[0];
            dimNTEXTs = dimNTEXTs + "、" + textString.split("【按")[1].split("划分】")[0];

        }
        option.title.text = (measNTEXT + "【按" + dimNTEXTs + "划分】")
        $("#pp_dv_title").val(measNTEXT + "【按" + dimNTEXTs + "划分】");

        options[element.attr("id")] = option;

    } else {
        //如果没有数据 加载默认数据
        option = addSeriesDataPro(option);
        options[element.attr("id")] = option;
    }


}


pie.getOption = function () {
    option = {
        controlType: "PIE",
        //是否开启仪表图模式
        ismeter: false,
        title: pie.default_title,
        polar: {},
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
            axisTick: {show: false},
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
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            type: 'scroll',
            right: '15',
            data: ['演示1', '演示2']
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

        yAxis: [{
            show: false
        }],
        xAxis: [{
            show: false
        }],

        series: [
            {
                name: '',
                type: 'pie',
                color: ["skyblue"],
                radius: ['50%', '70%'],
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
                    {value: 1, name: '演示1'},
                    {value: 1, name: '演示2'},

                ]
            }
        ]
    };
    return option;
}

/**
 *
 * @param option
 * @param mark
 * @param piebackgroundcolor
 * @param fontSize
 * @param labelColor
 */
function changeShape2(option, mark, piebackgroundcolor, fontSize, labelColor) {

    if (mark == "TRUE") {
        //获取数据
        var data = option.series[0].data;
        //获取center
        var center = option.series[0].center;
        //y轴数据
        var lineYAxis = [];

        //清除原series
        option.series.pop();
        data.forEach((v, i) => {
            //根据数据构造圆环
            option.series.push({
                name: '',
                type: 'pie',
                z: 1,
                clockWise: false,
                hoverAnimation: false,
                radius: [75 - i * 20 + '%', 69 - i * 20 + '%'],
                center: center,
                label: {
                    show: false
                },
                data: [
                    {
                        value: v.value,
                        name: v.name
                    },
                    {
                        value: (100 - v.value),
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }]
            });

            //构造背景圆环
            option.series.push({
                name: '',
                type: 'pie',
                silent: true,
                z: 0,
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [75 - i * 20 + '%', 69 - i * 20 + '%'],
                center: center,
                label: {
                    show: false
                },
                data: [{
                    value: baseOpt.backgroundData_1_4 [0],
                    itemStyle: {
                        //背景颜色
                        color: piebackgroundcolor
                    }
                }, {
                    value: baseOpt.backgroundData_1_4 [1],
                    name: '',
                    itemStyle: {
                        color: "rgba(0,0,0,0)"
                    }
                }]
            });
            //记录y轴数据
            lineYAxis.push({
                value: (v.name + ":  " + v.value + "%"),
                textStyle: {}
            });

            /*lineYAxis["data"].push(v.value);
            lineYAxis["name"].push(v.name)*/
        });

        //构造xy轴 显示数据
        option["yAxis"] = [{
            type: 'category',
            z: 3,
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                inside: true,
                textStyle: {
                    color: labelColor,
                    fontSize: fontSize,
                },
                show: true,
            },
            data: lineYAxis
        }]

        option["xAxis"] = [{show: false,}]
    } else {
        option.xAxis = [{show: false}]
        option.yAxis = [{show: false}]
    }
    return option
}


/**
 * 处理一个维度一个度量饼图变换形态
 * @param option
 * @param mark
 */
//记录变换前的radius
var _radius;

function changeShape(option, mark, piebackgroundcolor, fontSize, labelColor) {
    //变换形态后圆环背景颜色

    /*if(!piebackgroundcolor){
        piebackgroundcolor = "#013678"
    }*/
    //获取center
    var center = option.series[0].center;
    if (mark == "TRUE") {
        _radius = option.series[0].radius
    }
    //为true 切换
    if (mark == "TRUE") {
        //获取所有数据进行重组
        var chartData = option.series[0].data;
        // 数据处理
        let arrName = [];
        let arrValue = [];
        let sum = 0;
        //y轴数据
        let lineYAxis = [];
        chartData.forEach((v, i) => {
            arrName.push(v.name);
            arrValue.push(v.value);
            sum = floatAdd(sum, v.value);

        });

        //清除原series
        option.series.pop();
        // 图表option整理
        chartData.forEach((v, i) => {
            option.series.push({
                name: '',
                type: 'pie',
                z: 1,
                clockWise: false,
                hoverAnimation: false,
                radius: [75 - i * 20 + '%', 69 - i * 20 + '%'],
                center: center,
                label: {
                    show: false
                },
                data: [{
                    value: v.value,
                    name: v.name
                },
                    {
                        value: (sum - v.value),
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }]
            });
            option.series.push({
                name: '',
                type: 'pie',
                silent: true,
                z: 0,
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [75 - i * 20 + '%', 69 - i * 20 + '%'],
                center: center,
                label: {
                    show: false
                },
                data: [{
                    value: baseOpt.backgroundData_1_4 [0],
                    itemStyle: {
                        //背景颜色
                        color: piebackgroundcolor
                    }
                }, {
                    value: baseOpt.backgroundData_1_4 [1],
                    name: '',
                    itemStyle: {
                        color: "rgba(0,0,0,0)"
                    }
                }]
            });
            v.percent = (v.value / sum * 100).toFixed(1) + "%";
            lineYAxis.push({
                value: v.name,
                textStyle: {}
            });
        });
        //展示数据的标签颜色
        if (!labelColor) {
            labelColor = "#cef3ff"
        }

        option["yAxis"] = [{
            type: 'category',
            z: 3,
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                formatter:
                    function (params) {
                        let item = chartData[params];
                        return item.name + ":   " + item.percent
                    },
                interval: 0,
                inside: true,
                textStyle: {
                    color: labelColor,
                    fontSize: fontSize,
                },
                show: true,
            },
            data: lineYAxis
        }]

        option["xAxis"] = [{show: false,}]


    } else {
        option.xAxis = [{show: false}]
        option.yAxis = [{show: false}]
    }
    return option;

}

/**
 * 添加圆环背景
 */
function addBackground(option, backgroundSize, piebackgroundcolor) {

    if (backgroundSize == "FALSE" || backgroundSize == "false") {
        return option;
    }
    var backgroundData = [];
    switch (backgroundSize) {
        case '1_4':
            backgroundData = baseOpt.backgroundData_1_4;
            break;
        case 'all':
            backgroundData = baseOpt.backgroundData_all;
            break;
        case '1_8':
            backgroundData = baseOpt.backgroundData_1_8;
            break;
        default:
            backgroundData = baseOpt.backgroundData_all
    }

    //如果没有传递值 使用默认
    if (!piebackgroundcolor) {
        piebackgroundcolor = "#cef3ff"
    }
    //构建饼图数据
    var pieData = [];
    for (let i = 0; i < backgroundData.length; i++) {
        if (i % 2 == 0) {
            pieData.push({
                name: '',
                value: backgroundData[i],
                itemStyle: {
                    color: piebackgroundcolor
                }
            })
        } else {
            pieData.push({
                name: '',
                value: backgroundData[i],
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            })
        }
    }


    option.series.push({
        name: '',
        type: 'pie',
        hoverAnimation: false, //鼠标移入变大
        radius: ['30%', '40%'],
        center: ['50%', '50%'],
        label: {
            normal: {
                show: false,
            }
        },
        data: pieData
    })
    return option;
}


pie.loadAfter = function (option, index, element) {

    //获取原来标签的的formatter
    // var labelFormatter = option.series[index].label.normal.formatter;

    tooltipFormatter = function (param) {

        //console.log(JSON.stringify(param))
        if (param.data.name2) {
            return param.data.name2 + " <br />" + param.percent + "%"
        } else {
            return param.data.name + " <br />" + param.data.value
        }
    };
    //重新赋值提示框formatter
    option.tooltip.formatter = tooltipFormatter;

    //重新赋值标签formatter
    formatter = function (param) {
        var value = param.data.value;
        var name = param.data.name;
        var name2 = param.data.name2;

        //console.log(JSON.stringify(param))
        return name2 + "   " + value

    };
    option.series[index].label.normal.formatter = formatter;
    var myChart = charts[element.attr("id")];
    myChart.setOption(option)
    charts[element.attr("id")] = myChart;
    options[element.attr("id")] = option

}

