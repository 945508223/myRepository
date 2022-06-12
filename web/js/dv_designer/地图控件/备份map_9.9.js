var map = {};
map.default_legend_data = ['演示维度项1', '演示维度项2', '演示维度项3', '演示维度项4', '演示维度项5'];
map.default_series_data = [
    {value: 335, name: '演示维度项1'},
    {value: 310, name: '演示维度项2'},
    {value: 234, name: '演示维度项3'},
    {value: 135, name: '演示维度项4'},
    {value: 158, name: '演示维度项5'}
];
map.default_namemaps = {'中国': 'china'};
map.mapdata = [];//中国的数据
map.mapdataAll = undefined;
map.createMap = function (element, ctrlinfo, properties) {
    var option = map.getOption();
    var myChart = echarts.init(element[0]);
    map.render(element, myChart, option);
};

map.render = function (element, myChart, option) {

    var province = element.attr("dv_provincemap") || "中国";
    var city = element.attr("dv_citymap") || "";
    var area = element.attr("dv_areamap") || "";
    //var name=city||province;
    var name = "中国";
    var url = '../static/echarts/china.json';

    if (province != "" && province != "中国") {
        //if(province!="中国"){
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

    $.getJSON(url, function (data) {
        echarts.registerMap(name, data);
        var d = [];
        for (var i = 0; i < data.features.length; i++) {
            //todo 加载真实数据
            d.push({
                name: data.features[i].properties.name,
                value: (Math.random() * 10000).toFixed(2),
            });
        }
        if (province == "中国") {
            map.mapdataAll = data;
            map.mapdata = d;

        }
        element.removeAttr("_echarts_instance_");
        //绘制地图

        option = map.renderMap(element, option, name, d);
        //处理seriesDataExtsh
        option = addSeriesDataPro(option);
        console.log(JSON.stringify(option))
        myChart.setOption(option);
        map.mapClick(element, myChart, option);
        map.mapDblclick(element, myChart, option);
        charts[element.attr("id")] = myChart;
        options[element.attr("id")] = option;
    });
};

map.mapClick = function (element, myChart) {
    return;
    myChart.off('click');

    myChart.on('click', function (params) {

        if (window.map_onclick) {
            window.map_onclick(params, element, this)
        }
    });
};

map.mapDblclick = function (element, myChart, option) {

    myChart.off('dblclick');
    myChart.on('dblclick', function (params) {
        var result = element.attr("dv_opendbclick");

        if (result == "true") {

            if (params.seriesName == '中国' && provinceMap[params.name] != undefined) {
                //显示省级地图
                map.setMapData(params, element, myChart, option,
                    '../static/echarts/province_json/' + provinceMap[params.name] + '.json');
            }

            if (provinceMap.hasOwnProperty(params.seriesName) && cityMap[params.name] != undefined) {
                //显示市级地图
                map.setMapData(params, element, myChart, option,
                    '../static/echarts/city/' + cityMap[params.name] + '.json');
            }

            if (cityMap.hasOwnProperty(params.seriesName) && areaMap[params.name] != undefined) {
                //显示区 县 级地图
                map.setMapData(params, element, myChart, option,
                    '../static/echarts/area/' + areaMap[params.name] + '.json');

            } else {

                setTimeout(function () {
                    map.setMapView(element, myChart, option, '中国', map.mapdataAll, map.mapdata);
                }, 10);

            }
        }

    });
};

map.setMapData = function (params, element, myChart, option, url) {

    $.getJSON(url, function (data) {
        var d = [];
        for (var i = 0; i < data.features.length; i++) {
            d.push({
                name: data.features[i].properties.name,
                value: (Math.random() * 10000).toFixed(2),
            });
        }
        console.log(data);
        map.setMapView(element, myChart, option, params.name, data, d);
    });
};

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

    $.getJSON(url, function (data) {
        var d = [];
        for (var i = 0; i < data.features.length; i++) {
            d.push({
                name: data.features[i].properties.name,
                value: (Math.random() * 10000).toFixed(2)
            });
        }
        var myChart = charts[activeElement.attr("id")];
        var option = options[activeElement.attr("id")];
        map.setMapView(activeElement, myChart, option, name, data, d);
    });
}

//显示地图
map.setMapView = function (element, myChart, option, name, regData, data) {
    myChart.dispose();
    myChart = null;
    myChart = echarts.init(element[0]);
    echarts.registerMap(name, regData);
    element.removeAttr("_echarts_instance_");
    option = map.renderMap(element, option, name, data);
    //处理seriesDataExt
    option = addSeriesDataPro(option);
    myChart.setOption(option);
    map.mapDblclick(element, myChart, option);
    charts[element.attr("id")] = myChart;
    options[element.attr("id")] = option;
}

//打开报表时，重新加载饼图
map.load = function (element, option) {
    element.removeAttr("_echarts_instance_");
    var myChart = echarts.init(element[0]);
    map.render(element, myChart, option);
};

// todo 拖拽的数据源项发生改变时，触发
map.loadData = function (element, pname, item) {
    var source = getDataSource(element);
    //取维度
    var key = element.attr("id") + "||dv_dim";
    var dimItems = null;
    if (dragDatas[key] != undefined) {
        dimItems = dragDatas[key];
        //Object.getOwnPropertyNames(items).length;
    }
    //取度量
    var measureItems = getShowMeasure(element);

    key = element.attr("id") + "||dv_filter";
    var filterItems = null;
    if (dragDatas[key] != undefined)
        filterItems = dragDatas[key];

    var loaded = false;
    if ((dimItems != null) && (measureItems != null)) {
        //todo 获取数据
        if ((Object.getOwnPropertyNames(dimItems).length > 0) && (Object.getOwnPropertyNames(measureItems).length > 0)) {
            var result = YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData", {
                "sbtid": source.sbtid,
                "dimItems": JSON.stringify(dimItems),
                "measureItems": JSON.stringify(measureItems),
                "filterItems": JSON.stringify(filterItems)
            });
            if (result != null) {
                //生成数据
                options[element.attr("id")].currResult = result;
                map.showMapByData(map.default_legend_data, map.default_series_data, element);
                loaded = true;
            }
        }
    }
    if (!loaded)
        map.showMapByData(map.default_legend_data, map.default_series_data, element);
};
map.getData = function (element) {
    var option = options[element.attr("id")];
    return option.currResult;
};
//根据新数据重绘图
map.showMapByData = function (legend_data, series_data, element) {
    var myChart = charts[element.attr("id")];
    if (!myChart) {
        myChart = echarts.init(element[0]);
    }
    var option = options[element.attr("id")];

    map.render(element, myChart, option);
};
map.getOption = function () {
    option = {
        controlType: 'MAP',
        selectedMode: true,
        backgroundColor: 'rgb(0,0,0,0)',
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
            show: false,
            /*trigger: 'item',
            formatter: '{b}<br/>{c}'*/
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
map.renderMap = function (element, options, title, data) {
    //options.title.text = title;

    var zoomData = (element.attr("dv_series_zoom_text")) ? element.attr("dv_series_zoom_text") : 1;
    options.series = [{
        name: title,
        type: 'map',
        mapType: title,
        zoom: parseFloat(zoomData),
        nameMap: map.default_namemaps,
        //selectedMode:true,

        itemStyle: {
            normal: {
                label: {
                    show: true,
                    color: "#CEF3FF",
                    fontSize: "10"
                },
                borderColor: 'rgb(1,126,178)',
                borderWidth: 1,
                areaColor: {
                    type: 'linear',
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
                    global: false // 缺省为 false
                },
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 10,

            },
            emphasis: {
                label: {
                    color: "#CEF3FF",
                    fontSize: "10",

                },
                areaColor: {
                    type: 'linear',
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
                    global: false // 缺省为 false
                }
            }
        },
        data: data


    }];
    return options;
}