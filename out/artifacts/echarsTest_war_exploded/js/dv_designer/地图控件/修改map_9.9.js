var map = {};
map.labelParam = [];
map.default_namemaps = {'中国': 'china'};
map.mapdata = [];//中国的数据
map.mapdataAll = undefined;
map.mapClickParams; //点击时的参数

/**
 * 首次创建地图控件
 * @param element
 * @param ctrlinfo
 * @param properties
 */
map.createMap = function (element, ctrlinfo, properties) {
    var option = map.getOption(element);
    var myChart = echarts.init(element[0]);
    map.render(element, myChart, option);
};


/**
 * 加载地图
 * @param element
 * @param myChart
 * @param option
 * @param result
 * @param name
 * @param url
 */
map.render = function (element, myChart, option, result, name, url) {

    if (!url && !name) {

        var province = element.attr("dv_provincemap") || "中国";
        var city = element.attr("dv_citymap") || "";
        var area = element.attr("dv_areamap") || "";

        name = "中国";
        url = '../static/echarts/china.json';

        if (province != "" && province != "中国") {
            name = province;
            url = '../static/echarts/province_json/' + provinceMap[name] + '.json';
        }

        if (city != "") {
            name = city;
            url = '../static/echarts/city/' + cityMap[name] + '.json';
        }

        if (area != "") {
            url = '../static/echarts/area/' + areaMap[name] + '.json';
            name = area;
        }

    }

    $.getJSON(url, function (data) {
            option.geo.map = name;
            echarts.registerMap(name, data);

            var d = [];

            if (result && result.length > 0) {

                d = map.setRealData(result, d, data, element)

            } else {

                for (var i = 0; i < data.features.length; i++) {

                    d.push({
                        name: data.features[i].properties.name,
                    });

                }
            }

            if (province == "中国") {

                map.mapdataAll = data;
                map.mapdata = d;

            }

            map.load(element, option, myChart, data, name, d)

        }
    );
};


map.mapClick = function (element, myChart) {

    myChart.off('click');

    myChart.on('click', function (params) {

        var result = element.attr("dv_click");

        if (result == "TRUE" || result == "true") {

            if (element.attr("dv_mapclick")) {

                map.mapClickParams = params;

                eval(element.attr("dv_mapclick"))

            }
        }
    });
};

map.mapDblclick = function (element, myChart, option) {

    myChart.off('dblclick');

    myChart.on('dblclick', function (params) {
        debugger
        var result = element.attr("dv_opendbclick");

        if (result == "true" || result == "TRUE") {
            var url;

            if (params.seriesName == '中国' && provinceMap[params.name] != undefined) {

                url = '../static/echarts/province_json/' + provinceMap[params.name] + '.json';

                map.loadData(element, params.name, url)

            } else if (provinceMap.hasOwnProperty(params.seriesName) && cityMap[params.name] != undefined) {

                //显示市级地图
                url = '../static/echarts/city/' + cityMap[params.name] + '.json';

                map.loadData(element, params.name, url)

            } else if (cityMap.hasOwnProperty(params.seriesName) && areaMap[params.name] != undefined) {

                //显示区 县 级地图
                url = '../static/echarts/area/' + areaMap[params.name] + '.json';

                map.loadData(element, params.name, url)

            } else {

                url = '../static/echarts/china.json';

                map.loadData(element, '中国', url)

            }
        }
    });
};


/**
 * 鼠标移动事件
 */
map.mapMouseover = function (element, myChart, option) {

    myChart.on('mouseover', function (params) {

    })

};

/**
 * 通过属性列表改变 默认视图
 * @param sender
 * @param type
 */
map.changeView = function (sender, type) {

    var name = sender.value;

    var url = '../static/echarts/china.json';

    if (type == "province") {

        activeElement.attr("dv_provincemap", name);

        activeElement.attr("dv_citymap", "");

        if (name != '中国') {

            url = '../static/echarts/province_json/' + provinceMap[name] + '.json';

        }
    }

    if (type == "city") {

        activeElement.attr("dv_citymap", name);

        activeElement.attr("dv_areamap", "");

        url = '../static/echarts/city/' + cityMap[name] + '.json';

    }

    if (type == "area") {

        activeElement.attr("dv_areamap", name);

        url = '../static/echarts/area/' + areaMap[name] + '.json';

    }

    map.loadData(activeElement, name, url)

};


//打开报表时，重新加载饼图
map.load = function (element, option, myChart, data, name, d) {

    myChart.dispose();

    myChart = null;

    myChart = echarts.init(element[0]);

    element.removeAttr("_echarts_instance_");

    //绘制地图
    option = map.renderMap(element, option, name, d);

    //处理seriesDataExt
    option = addSeriesDataPro(option);

    console.log(JSON.stringify(option));

    myChart.setOption(option);

    map.mapClick(element, myChart, option);

    map.mapDblclick(element, myChart, option);

    map.mapMouseover(element, myChart, option);

    charts[element.attr("id")] = myChart;

    options[element.attr("id")] = option;

    //console.log(map.labelParam)
    if (window.setSelectionCss)
        setSelectionCss(element);
};


// todo 拖拽的数据源项发生改变时，触发
map.loadData = function (element, name, url) {

    //取维度
    var key = element.attr("id") + "||dv_dim";

    var dimItems = null;

    if (dragDatas[key] != undefined) {

        dimItems = dragDatas[key];

    }
    //取度量
    var measureItems = getShowMeasure(element);

    key = element.attr("id") + "||dv_filter";

    var filterItems = {};

    if (dragDatas[key] != undefined)

        filterItems = $.extend(true, {}, dragDatas[key]);

    //取数据
    var loaded = false;

    //todo 获取数据  加载地图
    if ((dimItems != null) && (measureItems != null)) {
        //处理前后n条
        var option = options[element.attr("id")];

        var nstr = ((option.topn) ? option.topn : "") + ((option.lastn) ? ("," + option.lastn) : "");

        if (viewState) loaded = true;

        var result = pubLoadData(element);

        if (result && result.length > 0) {

            //todo 维度度量不为空  数据不为空

            map.showMapByData(element, result, name, url);

            cacheChartData[element.attr("id")] = result;

            loaded = true;

        } else {

            //todo 维度度量不为空  数据为空
            map.showMapByData(element, result, name, url);

            loadEmpty(element);

            pubAfterLoaded(element[0]);
        }

    } else if (!loaded) {

        //todo 没有维度度量 加载地图

        var result = [];

        map.showMapByData(element, result, name, url);

    }
};
map.getData = function (element) {

    var option = options[element.attr("id")];

    return option.currResult;

};


//根据新数据重绘图
map.showMapByData = function (element, result, params, url) {

    var myChart = charts[$(element).attr("id")];

    if (!myChart) {

        myChart = echarts.init(element[0]);

    }

    var option = options[element.attr("id")];

    map.render(element, myChart, option, result, params, url);
};



map.getOption = function () {
    option = {
        controlType: 'MAP',
        selectedMode: true,
        backgroundColor: 'rgb(0,0,0,0)',
        visualMap: [],
        geo: {
            map: "",
            zoom: "1"
        },
        title: {
            //text: '中国地图',
            left: '50px',
            textStyle: {
                color: '#ffffff',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: "Microsoft YaHei"
            },
            subtextStyle: {
                color: '#ccc',
                fontSize: 13,
                fontWeight: 'normal',
                fontFamily: "Microsoft YaHei"
            },
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: function (p) {

            }
        },

        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,
    };
    return option;
};


/**
 * 设置series
 * @param element
 * @param options
 * @param title
 * @param data
 * @returns {*}
 */
map.renderMap = function (element, option, title, data) {

    option.geo.zoom = (element.attr("dv_series_zoom")) ? element.attr("dv_series_zoom") : 1;
    option.series = [{
        name: title,
        type: 'map',
        mapType: title,
        zoom: "1",
        nameMap: map.default_namemaps,

        tooltip: {
            show: true,
            formatter: function (p) {
                debugger
                return  map.loadAfterTooltipFormatter(element, p);
            }
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    color: "#CEF3FF",
                    fontSize: "10",
                    offset: [30, 40],
                    formatter: function (p) {
                        var formatter =map.loadAfterLabelFormatter (element, p);
                        return formatter;
                    }
                },
                borderColor: 'rgb(1,126,178)',
                borderWidth: 1,
                //  areaColor: {
                /*     type: 'linear',
                     x: 0,
                     y: 0,
                     x2: 0,
                     y2: 1,

                     colorStops: [{
                         offset: 0,
                         color: 'rgba(4,29,86, 1)' // 0% 处的颜色
                     }, {
                         offset: 0.5,
                         color: 'rgba(11,108,162,1)' // 100% 处的颜色
                     }, {
                         offset: 0.7,
                         color: 'rgba(14,137,203,1)' // 100% 处的颜色
                     }, {
                         offset: 0.9,
                         color: 'rgba(51,179,247,1)' // 100% 处的颜色
                     }],
                     global: false // 缺省为 false*/
                //  },
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 10,
            },
            emphasis: {
                label: {
                    color: "#CEF3FF",
                    fontSize: "10",
                },
                // areaColor: {
                /*type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: 'rgba(4,29,86, 1)' // 0% 处的颜色
                }, {
                    offset: 0.5,
                    color: 'rgba(11,108,162,1)' // 100% 处的颜色
                }, {
                    offset: 0.7,
                    color: 'rgba(14,137,203,1)' // 100% 处的颜色
                }, {
                    offset: 0.9,
                    color: 'rgba(51,179,247,1)' // 100% 处的颜色
                }],
                global: false // 缺省为 false*/
                // }
            }
        },
        data: data


    }];
    return option;
};

/**
 * 根据维度度量设置地图数据
 * @param result
 * @param d
 */
map.setRealData = function (result, d, data, element) {
    //取维度
    var key = element.attr("id") + "||dv_dim";

    var dimItems = null;

    if (dragDatas[key] != undefined) {

        dimItems = getOrderItems(dragDatas[key]);

    }
    //取度量
    var _measureItems = getShowMeasure(element);

    var measureItems = getOrderItems(_measureItems);

    // 加载真实数据
    var dims = [];

    var ncode_mea_fieldnames = [];

    for (var x = 0; x < dimItems.length; x++) {

        var ncode_dim = (getOrderItems(dragDatas[$(element).attr("id") + "||dv_dim"])[x]["NCODE"]).toUpperCase();

        dims.push(ncode_dim)
    }

    for (var n = 0; n < measureItems.length; n++) {

        var ncode_mea_fieldname = getMeasureFieldName(getOrderItems(dragDatas[$(element).attr("id") + "||dv_measure"])[n]);

        ncode_mea_fieldnames.push(ncode_mea_fieldname)
    }
    //默认第一组数据 属性名 为value   如果指定 将指定的数据名称改为value
    debugger
    var whichDim ;
    if(element.attr("dv_visualmap_dimension")){
        whichDim = element.attr("dv_visualmap_dimension")
    }
    for (var k = 0; k < result.length; k++) {

        var row = result[k];

        for (var i = 0; i < data.features.length; i++) {

            var dimcname = dimItems[0]["NCODE"].toUpperCase() + "NAME";

            var code = row[dimcname];

            var _code = data.features[i].properties.code || data.features[i].properties.adcode;

            if (code != _code) {
                continue;
            }

            var item = {};
            item.code = _code;
            item.name = data.features[i].properties.name;

            var basicInfo;

            key = element.attr("id");

            if (basicInformation[key]) {

                basicInfo = basicInformation[key];

            }

            //取每一行数据的各个度量值
            for (var j = 0; j < measureItems.length; j++) {

                if (basicInfo && basicInfo[measureItems[j].NCODE]) {

                    var _basicInfo = basicInfo[measureItems[j].NCODE];

                    var _flag = false;
                    if (parseFloat(row[ncode_mea_fieldnames[j]]) < 0) {
                        _flag = true;
                        row[ncode_mea_fieldnames[j]] = row[ncode_mea_fieldnames[j]].toString().substring(1);
                    }
                    row[ncode_mea_fieldnames[j]] = formatterNumThousand(_basicInfo, row[ncode_mea_fieldnames[j]]);
                    //转小数
                    if (_basicInfo.number) {

                        row[ncode_mea_fieldnames[j]] = parseFloat(row[ncode_mea_fieldnames[j]]).toFixed(_basicInfo.number);

                    } else {

                        row[ncode_mea_fieldnames[j]] = parseFloat(row[ncode_mea_fieldnames[j]]).toFixed(2);

                    }

                    if (_flag) {
                        row[ncode_mea_fieldnames[j]] = "-" + row[ncode_mea_fieldnames[j]];
                    }

                    //数据映射组件使用哪个度量作为依据
                    if(whichDim&&whichDim!=""&&whichDim==ncode_mea_fieldnames[j]){
                        item["value"] = row[ncode_mea_fieldnames[j]];
                    }else if(j==0){
                        item["value"] = row[ncode_mea_fieldnames[j]];
                    }else {
                        item[ncode_mea_fieldnames[j]] = row[ncode_mea_fieldnames[j]];
                    }

                } else {

                    row[ncode_mea_fieldnames[j]] = parseFloat(row[ncode_mea_fieldnames[j]]).toFixed(2);

                    //数据映射组件使用哪个度量作为依据
                    if(whichDim&&whichDim!=""&&whichDim==ncode_mea_fieldnames[j]){
                        item["value"] = row[ncode_mea_fieldnames[j]];
                    }else if(j==0){
                        item["value"] = row[ncode_mea_fieldnames[j]];
                    }else {
                        item[ncode_mea_fieldnames[j]] = row[ncode_mea_fieldnames[j]];
                    }

                }
            }

            console.log(item);

            d.push(item);
        }
    }
    console.log(d);

    return d;

};


/**
 * 加载完成后处理自定义标签显示格式
 * @param option
 * @param element
 */

map.loadAfterLabelFormatter = function (element, param) {
//    console.log(param);
    //map.labelParam.push(param)
    // map.labelParam = element.attr("id") + "||dv_maplabelparam";

    if (element.attr("dv_series_itemstyle_label_formatter") && param.data == undefined) {
        return
    }

    if (!element.attr("dv_series_itemstyle_label_formatter") && param.data != undefined) {
        return param.data.name
    }

    if (element.attr("dv_series_itemstyle_label_formatter") && param.data != undefined) {
        var formatter = map.setFormatter(element, param, "dv_series_itemstyle_label_formatter");
        return formatter;
    }
};

/**
 * 自定义提示框格式
 * @param element
 * @param p
 */
map.loadAfterTooltipFormatter = function (element, param) {
    /*  console.log("map.loadAfterTooltipFormatter");
      console.log(param);*/

    if (!element.attr("dv_series_tooltip_formatter") && param.data != undefined) {
        return param.data.name
    }

    if (element.attr("dv_series_tooltip_formatter") && param.data == undefined) {
        return
    }

    if (element.attr("dv_series_tooltip_formatter") && param.data != undefined) {

        var formatter = map.setFormatter(element, param, "dv_series_tooltip_formatter");
        return formatter;

    }
};

/**
 * 设置格式
 * @param element
 * @returns {string}
 */
map.setFormatter = function (element, param, property) {

    var option = options[element.attr("id")];

    var oldLabelFormatter = element.attr(property);

    //用于切分{}获取传递的值
    var reg = new RegExp('(?<=\{)[0-9a-zA-Z_]+(?=\})', "g");

    //解析原来标签formatter 先按照换行符号进行切割
    var formatterArr = oldLabelFormatter.split(",");

    //记录新的formatter的数组
    var newFormatterArr = [];

    //处理切割后的字符串 获取 {}中的值
    for (let j = 0; j < formatterArr.length; j++) {
        //处理多个换行
        if (formatterArr[j] == "") {

            if (property == "dv_series_itemstyle_label_formatter") {

                newFormatterArr.push("\n");

            } else {

                newFormatterArr.push("<br/>");

            }
            continue;
        }

        //通过正则表达式获取{}中的内容
        var dataArr = formatterArr[j].match(reg); //显示的数据字符数组  a b

        if (dataArr == undefined) {

            if (property == "dv_series_itemstyle_label_formatter") {

                newFormatterArr.push("\n");

            } else {

                newFormatterArr.push("<br/>");

            }
            continue;
        }
        //将输入的值与param中存放的进行比对 相同则去除值 替换掉formatter中的字符串为数据
        var _formatter = "";

        for (let n = 0; n < dataArr.length; n++) {

            if (param.data) {

                for (let key in param.data) {

                    if (param.data[key] == undefined || param.data[key] == null || param.data[key] == "NaN") {

                        param.data[key] = ""

                    }

                    if (key == dataArr[n] && n == 0) {

                        _formatter = formatterArr[j].replace("{" + dataArr[n] + "}", param.data[key])

                    } else if (key == dataArr[n]) {

                        _formatter = _formatter.replace("{" + dataArr[n] + "}", param.data[key])

                    }
                }
            }
        }

        //将新的切分过的formatter存入新formatter数组
        newFormatterArr.push(_formatter)
    }

    var newFormatter;

    //将新的切分过的formatter按照换行拼接成最终的全新formatter
    if (property == "dv_series_itemstyle_label_formatter") {

        newFormatter = newFormatterArr.join("\n");

    } else {

        newFormatter = newFormatterArr.join("<br/>");

    }

    //处理富文本
    return (newFormatter.replace(/\[/g, "{")).replace(/\]/g, "}")

};

/**
 * 设置地图区域的渐变
 * @param option
 * @param pvalue
 * @param pInfo
 */
map.setAreaColrStyle = function (option, pvalue, pInfo) {
    if(pInfo.MAPPROPERTY == "seriesDataExt--areaStyle-color"){

    }

};
