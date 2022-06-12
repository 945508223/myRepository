/**
 * 地图
 * @type {{}}
 */
var $map = {
    type: "drag_map",//类型标识
    dataType: "allData",//数据类型(singeleData 单数据;allData 多数据)
    uuid: Date.parse(new Date()),//唯一id
    isCanvas:true,//是否处理为Canvas画布
    getConfig: getMapConfig,
    register: registerMap,
    showProperty: showPropertyMap,//展示右侧属性
    setData: setMapData,  //为控件数据源设置数据
    getData: getMapVal,//获得数据
    clearData: clearMapVal
}

/**
 * 配置对象
 */
function getMapConfig() {

    let baseConfig = chartsBaseConfig.getBaseConfigByNames(
        ['title', 'toolbox', 'tooltip']);

    let privateConfig = {
        /*公共*/
        ds_id: "",//id
        ds_ctrlname: "MAP_" + $map.uuid++,//控件名
        ds_show: true,//显示隐藏
        ds_showCondition: "",//显示条件
        ds_width: "100%",//控件宽度
        ds_height: "25rem",//控件高度
        ds_innerwidth: "calc(100% - 2rem)",//主体内容宽度
        ds_style: "drawing-item",//自定义样式
        ds_datasource: "",//数据源
        ds_group_fields: [],//数据分组主键
        ds_group_cfg: [],//数据分组配置
        ds_name: "",//name
        ds_showlable: true,//是否显示标签
        ds_isrequired: false,//是否必填
        ds_param: "",//推送参数名
        ds_backParamCondition: "",//撤销推送条件
        ds_trigger: "",//触发控件刷新
        ds_loading: "normal",//加载机制 first:优先加载 normal:正常加载 lazy:懒加载
        ds_out_padding: "0rem",//内边距
        ds_out_margin: "0rem", //外边距
        /*属性相关*/
        ds_ispro: false,//是否作为属性
        ds_pid: "",//作为某个控件的属性
        ds_draggable: "true",//是否拖动
        /*私有*/
        ds_isEchart: true,//表示改控件为echarts控件 动态加载页面js时使用
        ds_isRefresh_onTime: false,//是否定时刷新
        ds_refresh_onTime_frequency: 5000,//定时刷新频率
        ds_data_limit_before: "", //数据显示限制条数 前n条
        ds_data_condition: [],//数据显示条件
        ds_data_limit_after: "",//数据显示限制条数 后n条
        ds_selectcolumns: [],//根据数据源选择表字段
        dv_visualmap_measure_map: '',//地图引用度量
        dv_visualmap_measure_effectScatter: '',//散点图引用度量
        ds_map: [],//混合图数据
        ds_map_province: '',//省
        ds_map_city: '',//市
        ds_map_area: '',//县
        ds_columns: [],//数据源字段
        ds_custom_data: "",//自定义数据
        ds_isDynamic: false,//开启轮播
        ds_changeTimes: 3,//频率

        ds_chartsColor: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],//折线图颜色
        ds_background_color: "",//背景颜色

        /*视觉映射组件*/
        ds_map_visualMap_show: true,//显示组件
        ds_map_visualMap_seriesIndex: 0,//映射的seriesindex
        ds_map_visualMap_left: '0',
        ds_map_visualMap_top: 'auto',
        ds_map_visualMap_min: '0',
        ds_map_visualMap_max: '1000',
        ds_map_visualMap_itemWidth: '20',
        ds_map_visualMap_itemHeight: '140',
        ds_map_visualMap_text: '最大值,最小值',
        ds_map_visualMap_textGap: '10',//文字距离组件距离
        ds_map_visualMap_textStyle_color: '#333333',
        ds_map_visualMap_textStyle_fontSize: '12',


        /*地图相关*/
        ds_map_series_map_left: '30%',//距左
        ds_map_series_map_top: '10%',//距上
        ds_map_series_map_zoom: '1',//地图大小
        ds_map_series_map_roam: true,//是否开启鼠标缩放和平移漫游。默认开启 true,
        ds_map_series_map_itemStyle_normal_label_show: true,//是否显示地图标签-普通
        ds_map_series_map_itemStyle_normal_label_offset: '0,0',//标签偏移量
        ds_map_series_map_itemStyle_normal_label_color: "#CEF3FF",//标签颜色
        ds_map_series_map_itemStyle_normal_label_fontSize: 12,//标签字体大小
        ds_map_series_map_itemStyle_normal_label_formatter: "/**\n支持使用字符串模板以及回调函数方式，'\\n'可换行。\n" +
            "字符串模板:\n" +
            "{a}：系列名。\n" +
            "{b}：数据名。\n" +
            "{c}：数据值。\n" +
            "{@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。\n" +
            "{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。\n" +
            "回调函数方式(此方式不支持同时使用字符串模板):例:\n" +
            "funName = function(param){\n" +
            "  //参数:param 包含各项数据,如value:当前数据值,name:当前数据名称 ,seriesType:当前series类型等\n" +
            "  return '数据名:'+param.name+'数据值:'+param.value\n" +
            "}\n" +
            "**/ \"{b}\"",//标签格式化
        ds_map_series_map_itemStyle_normal_borderWidth: 1,//边框宽度 1,
        ds_map_series_map_itemStyle_normal_shadowOffsetX: 0,//阴影偏移横向0
        ds_map_series_map_itemStyle_normal_shadowOffsetY: 0,//阴影偏移纵向0
        ds_map_series_map_itemStyle_normal_areaColor: '#3a7fd5',//地图颜色'#3a7fd5',
        ds_map_series_map_itemStyle_normal_borderColor: '#0a53e9',//地图边框颜色'#0a53e9'
        ds_map_series_map_itemStyle_normal_shadowColor: '#092f8f',//地图阴阳颜色'#092f8f', //外发光
        ds_map_series_map_itemStyle_normal_shadowBlur: 20,//阴影模糊大小20
        ds_map_series_map_itemStyle_emphasis_label_color: '#FFFFFF',//鼠标悬浮标签颜色
        ds_map_series_map_itemStyle_emphasis_label_fontSize: 12,//鼠标悬浮标签字体大小
        ds_map_series_map_itemStyle_emphasis_label_areaColor: '#0a2dae',//鼠标悬浮区域颜色
        ds_map_series_map_select_areaColor: '#0a2dae',

        /*散点图*/
        ds_showEffectScatter: false,//显示散点图
        ds_map_effectScatter_symbolSize: 10,//散点大小
        ds_map_effectScatter_symbol: 'circle',//散点形状
        ds_map_series_effectScatter_rippleEffect_scale: 5,
        ds_map_series_effectScatter_rippleEffect_period: 5,
        ds_map_series_effectScatter_label_show: true,
        ds_map_series_effectScatter_label_formatter: "/**\n支持使用字符串模板以及回调函数方式，'\\n'可换行。\n" +
            "字符串模板:\n" +
            "{a}：系列名。\n" +
            "{b}：数据名。\n" +
            "{c}：数据值。\n" +
            "{@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。\n" +
            "{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。\n" +
            "回调函数方式(此方式不支持同时使用字符串模板):例:\n" +
            "funName = function(param){\n" +
            "  //参数:param 包含各项数据,如value:当前数据值,name:当前数据名称 ,seriesType:当前series类型等\n" +
            "  return '数据名:'+param.name+'数据值:'+param.value\n" +
            "}\n" +
            "**/ \"{b}\"",
        ds_map_series_effectScatter_label_fontSize: '12',
        ds_map_series_effectScatter_label_color: '#ffffff',
        ds_map_series_effectScatter_itemStyle_color: '#32bfc7',

        /*轨迹图*/
        ds_showLines: false,//显示轨迹图
        ds_map_lines_cfg: [],//轨迹图配置
        ds_map_lines_effect_show: true,//是否开启特效
        ds_map_lines_effect_period: 3,//特效时间
        ds_map_lines_effect_symbol: 'circle',//特效图形的标记。
        ds_map_lines_effect_symbolSize: 10,//特效图形的标记大小
        ds_map_lines_effect_color: '#ffffff',//标记颜色
        ds_map_lines_effect_trailLength: '0.2',//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。

        /*事件*/
        ds_before_setOption: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:图形配置项",//设置option前事件
        ds_load_success: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",//加载完成事件
        ds_map_click: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_map_dbclick: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_map_mouseover: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_map_mouseout: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
    }
    return $.extend(baseConfig, privateConfig);
}

/**
 * 组件注册
 */
function registerMap() {

    Vue.component('drag_map', {
        props: ["type", "info"],
        created: function () {
            //记录钻取时返回的最大地图
            this.info.ds_map_maxLevel = this.info.ds_map_province;
            this.$nextTick(function () {

                //添加监听
                addListener(this);
                //注册加载完成
                if (!this.info.ds_ispro)
                    temporary.loadRegister[this.info.ds_id] = true;
                //添加实例
                VUECFG.$refs[this.info.ds_id] = this;
            })

        },
        mounted: function () {

        },
        watch: {
            //容器大小发生改变刷新混合图
            computed_resize(curVal, oldVal) {

                var temp = temporary[this.info.ds_id + "_dsChart"];
                setTimeout(function () {
                    temp.resize()
                }, 10)

            },
        },
        data: function () {
            return {
                isFirstCreated: true,
                multiple: this.info.ds_multiple,
                hide: "y-hide",
                refdate: Date.parse(new Date())
            }
        },
        //计算属性
        computed: {
            // 自动调整混合图位置
            computed_resize: function () {
                return {
                    height: this.info.ds_height,
                    width: this.info.ds_width
                }

            },
            computed_option: function () {
                debugger
                var refdateStr = `${this.refdate}_change`;
                var option = buildMapOption(this.info);
                option = handleMapOption(option, this.info);
                this.$nextTick(function () {
                    if (this.isFirstCreated === true) {
                        this.isFirstCreated = false;
                        temporary[this.info.ds_id + "_dsChart"] = echarts.init(document.getElementById(this.info.ds_id + "_map"));
                        $(`#${this.info.ds_id}_map`).removeAttr("_echarts_instance_");
                        bindMapEvent(temporary[this.info.ds_id + "_dsChart"], this.info);
                    }
                    //设置option前事件
                    if (this.info.ds_before_setOption) {
                        $DS.eval(this.info.ds_before_setOption, this.info, option);
                    }

                    temporary[this.info.ds_id + "_computedOption"] = option;
                    temporary[this.info.ds_id + "_dsChart"].clear();
                    temporary[this.info.ds_id + "_dsChart"].setOption(option);
                    $DS.echart.setTimeRefresh(this.info);
                    dynamicLoadMap(this.info, temporary[this.info.ds_id + "_dsChart"], option);
                    console.log(JSON.stringify(option));
                });
                return "";
            },

            computed_mapname: function () {
                if (!VUECFG.viewStatu) return this.info.ds_ctrlname;
                return "";
            },
            computed_show: function () {
                var refdateStr = `${this.refdate}_change`;
                if (!VUECFG.viewStatu) {
                    return (this.info.ds_ispro && !this.info.ds_show) ? "y-hide" : "y-show";
                } else {
                    return (this.info.ds_show) ? "y-show" : "y-hide";
                }
            },
            computed_drag: function () {
                if (VUECFG.viewStatu) return false;
                return this.info.ds_draggable;
            },
            computed_Ts: function () {
                if (!this.info.ds_showTitTip && VUECFG.viewStatu) {
                    return {
                        height: "0rem"
                    }
                }
            },
            computed_style: function () {
                var stylePro = {
                    "height": "100%",
                    "width": "100%",
                    "padding": this.info.ds_out_padding,
                    "margin": this.info.ds_out_margin
                }
                return stylePro
            },
            computed_padding: function () {
                //作为属性时添加
                if (this.info.ds_ispro === true) {
                    return "1rem 0px"
                }
            },
            computed_marginleft: function () {
                return (this.info.ds_showlable) ? (this.info.ds_labelwidth + 'rem') : '0rem';
            },
        },
        methods: {
            changeCurrId: changeCurrId,
            mouseOver: ctrlMouseOver,//复制删除按钮鼠标移出入
            mouseLeave: ctrlMouseLeave,//复制删除按钮鼠标移出
            selectMapBySource: selectMapBySource,//混合图根据数据源选择字段
        },
        template: util.getModelHtml("drag_map")
    })
}

//==============================构建地图option以及数据=================================================================
function buildMapOption(info) {
    debugger
    //获取选择的区划
    let selectedMap = getSelectedMap(info);
    return renderMap(info, selectedMap);
}


/**
 * 获取选中的区划
 * @param info
 * @param type dril|钻取调用
 */
function getSelectedMap(info, type) {

    let {ds_map_area: area, ds_map_city: city, ds_map_province: province} = info || '';
    let [name, url, level] = [
        info.ds_map_maxLevel || '中国',
        info.ds_map_maxLevel ? 'echarts/province_json/' + provinceMap[info.ds_map_maxLevel] + '.json' : 'echarts/china.json',
        info.ds_map_maxLevel ? 'province' : 'china'
    ];

    //省
    if (province && (city ?? '') === '' && (area ?? '') === '' && provinceMap[province])
        [name, url, level] = [province, 'echarts/province_json/' + provinceMap[province] + '.json', 'province'];
    //市
    if (city && (area ?? '') === '' && cityMap[city])
        [name, url, level] = [city, 'echarts/city/' + cityMap[city] + '.json', 'city'];
    //县
    if (area && areaMap[area])
        [name, url, level] = [area, url = 'echarts/area/' + areaMap[area] + '.json', level];

    return {name, url, level};

}

/**
 * 绘制地图
 * @param info
 * @param selectedMap
 */
function renderMap(info, selectedMap) {
    debugger
    let model = getMapModel(selectedMap.name, info);
    for (let i = 0; i < model.series.length; i++) {
        model.series[i] = $DS.echart.setEchartsPros(model.series[i], info);
    }
    let option = $DS.echart.setEchartsPros(model, info);
    try {
        $.ajaxSettings.async = false;
        $.getJSON(selectedMap.url, function (data) {
            option.geo.map = selectedMap.name;
            echarts.registerMap(selectedMap.name, data);
            //根据读取的数据记录市县经纬度坐标
            recordMapCoords(data, info);
            var d = [];
            //加载数据
            if (info.ds_map && info.ds_map.length > 0 && info.ds_selectcolumns.length > 0) {
                d = buildMapSeriesData(info.ds_map, data, info);
                option.series[0].data = d[0];
                if (info.ds_showEffectScatter) {
                    option.series[1].data = d[1];
                    //以散点数据作为映射 则添加视觉映射组件 dimension 属性 设置为散点图引用度量的index+2 (前两个元素为经纬度坐标)
                    if (info.ds_map_visualMap_seriesIndex == 1) {
                        //散点图引用度量
                        option.visualMap.dimension = info.dv_visualmap_measure_effectScatter ? $DS.echart.getDM(info).MEASURE.find(item => item.FIELD_NAME == info.dv_visualmap_measure_effectScatter).measureIndex + 2 : 2;
                    }
                }

            } else {
                for (var i = 0; i < data.features.length; i++) {
                    d.push({
                        name: data.features[i].properties.name,
                    });
                }
                option.series[0].data = d;
            }

            $.ajaxSettings.async = true;
        });
    } catch (e) {
        console.error('加载地图失败' + e);
        $.ajaxSettings.async = false;
        return option;
    }
    //设置轨迹图
    option = renderMapLines(option, info);
    return option;
}

/**
 * 构建地图 散点图数据
 * @param data 数据源数据
 * @param jsonData 读取到的地图json数据
 * @param info
 * @returns {[]}
 */
function buildMapSeriesData(data, jsonData, info) {
    debugger
    data = setBaseChartDataLimit(data, info);
    let {DIMENSION, MEASURE} = $DS.echart.getDM(info);
    let dmArr = [...MEASURE, ...DIMENSION];
    //默认第一组数据 属性名 为value   如果指定 将指定的数据名称改为value
    var visualMeasure_map = info.dv_visualmap_measure_map ? MEASURE.find(item => item.FIELD_NAME == info.dv_visualmap_measure_map) : '';
    let [result, mapData, effectScatterData] = [[], [], []];
    /*    //特殊标注区域
        var specialCodesArr = info.dv_specialitem ? specialCodes.split(",") : '';*/
    let coordsObj = getRecortedMapCoords(info.ds_id);
    for (let row of data) {
        //默认取第一个维度字段为区划编码字段
        let admdivCode = row[DIMENSION[0].FIELD_NAME];
        //在json数据中获取区划编码 存在 则设置数据
        let item = jsonData.features.find(item => {
            let code = item.properties.code || item.properties.adcode || item.id;
            if (code === admdivCode) return item;
        });
        if (item) {
            //经纬度坐标对象 区划编码:坐标数组[x,y]
            let mapDataItem = {};
            let effectScatterDataItem = coordsObj[admdivCode] ? deepClone(coordsObj[admdivCode]) : ['', ''];
            for (let dmItem of dmArr) {
                let formatterVal = $DS.echart.formatterData(dmItem, row[dmItem.FIELD_NAME]);
                //构造地图数据
                mapDataItem[dmItem.FIELD_NAME] = formatterVal;
                //构造散点数据
                effectScatterDataItem.push(formatterVal);
            }
            mapDataItem.name = item.properties.name;
            let val = $DS.echart.formatterData(visualMeasure_map ? visualMeasure_map : dmArr[0], visualMeasure_map ? row[visualMeasure_map.FIELD_NAME] : row[dmArr[0].FIELD_NAME]);
            mapDataItem.value = val;//不存在 取第一个为映射度量

            mapData.push(mapDataItem);
            effectScatterData.push(effectScatterDataItem);
        }
    }
    result.push(mapData);
    result.push(effectScatterData);
    return result;

}

/**
 * 记录地图各地方经纬度
 * @param data
 * @param info
 */
function recordMapCoords(data, info) {
    let coords = {};
    for (let item of data.features) {
        coords[item.properties.code || item.properties.adcode || item.id] = item.properties.cp;
    }
    $DS.util.setObjVal(temporary, ['mapCoords', info.ds_id], coords);
}

/**
 * 获取已记录的地图各地方经纬度
 * @param ctrlId
 */
function getRecortedMapCoords(ctrlId) {
    return $DS.util.getObjVal(temporary, ['mapCoords', ctrlId])
}

/**
 * 设置轨迹图
 * @param option
 * @param info
 */
function renderMapLines(option, info) {
    debugger
    if (info.ds_showLines && info.ds_map_lines_cfg && info.ds_map_lines_cfg.length > 0) {

        let data = [];
        let mapCoords = getRecortedMapCoords(info.ds_id);
        try {
            let cfg = info.ds_map_lines_cfg;
            for (let item of cfg) {
                //坐标信息没有跳过
                if (!mapCoords[item.FROM] || !mapCoords[item.TO]) continue;
                let newItem = {};
                newItem.coords = [];
                //起点坐标
                newItem.coords.push(mapCoords[item.FROM]);
                //终点坐标
                newItem.coords.push(mapCoords[item.TO]);
                for (let key in item) {
                    if (key == 'FROM' || key == 'TO' || key == 'LAY_TABLE_INDEX' || key == '_UUID') continue;
                    $DS.util.setObjVal(newItem, ['lineStyle', key], item[key]);
                }
                data.push(newItem);
            }
            for (let sesriesItem of option.series) {
                if (sesriesItem.type === 'lines')
                    sesriesItem.data = data;
            }
        } catch (e) {
            console.error('设置轨迹图失败!');
            console.error(e);
            return option;
        }
    }
    return option;
}

/*===============================轮播==============================================*/
/**
 * 设置轮播
 * @param info
 * @param mapIns 实例
 * @param option
 */
function dynamicLoadMap(info, mapIns, option) {
    if (temporary.interval && temporary.interval[info.ds_id])
        clearInterval(temporary.interval[info.ds_id]);
    if (info.ds_isDynamic) {
        let dataLength = option.series[0].data.length;
        $DS.util.setObjVal(temporary, ['mapCarouselIndex', info.ds_id], 0);

        var time = setInterval(function () {
            let index = temporary.mapCarouselIndex[info.ds_id];
            mapIns.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: index

            });
            mapIns.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: index
            });
            mapIns.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: index == 0 ? dataLength : index - 1
            });


            if (index == dataLength)
                temporary.mapCarouselIndex[info.ds_id] = 0;
            else
                temporary.mapCarouselIndex[info.ds_id]++;

        }, info.ds_changeTimes ? info.ds_changeTimes * 1000 : 3000);
        $DS.util.setObjVal(temporary, ['interval', info.ds_id], time);
    }


}

//---------------------------------------------设置维度度量------------------------------------------
/**
 * 设置维度度量
 */
function selectMapBySource(event) {

    var info = $DS.getCtrlById(event.ds_pid).info;
    if (!info.ds_datasource) {
        console.error("未设置数据源");
        $("#" + event.ds_id).find("input").blur();
    } else {
        info.ds_columns = $DS.util.clone($DS.getSourceById(info.ds_datasource).columns);//数据源字段;//每次获取最新的数据
        var selectCols = $DS.util.clone(info.ds_selectcolumns);//当前控件已选择字段

        var sid = Date.parse(new Date());
        var params = {
            sourceCols: info.ds_columns,
            selectCols: selectCols,
            ctrlId: info.ds_id,
            ctrlCols: info.ds_selectcolumns
        };
        window.top[sid] = params;
        var url = $DS.util.getProjectName() + "/freeForm/manage/condi/selectEchartsColumns.html?sid=" + sid;
        var args = {
            hideTit: false, time: '', beginClose: '', callBack: function () {
                $DS.loadCtrl($DS.getCtrlById(VUECFG.ctrlId).info.ds_ctrlname)
            }
        }
        $DS.showPage(url, "选择字段", "90%", "90%", args, false);
    }
}

//---------------------------------------------事件------------------------------------------

/**
 * 绑定事件
 * @param instance chart实例
 * @param info
 */
function bindMapEvent(instance, info) {
    //点击事件
    instance.on('click', function (param) {

        if (info.ds_map_click) {
            //event 转json报错
            delete param.event;
            $DS.eval(info.ds_map_click, info, param);
            //推送参数
            $DS.dealPms(info, [param]);
            //触发其他控件刷新数据
            if (info.ds_trigger && info.ds_trigger.length > 0) {
                //echarts图形点击事件不触发自身的重新加载
                let clickTrigger = info.ds_trigger.filter(item => item !== info.ds_id);
                triggerComps(clickTrigger, $DS.getCtrlType(info.ds_id), info.ds_id);
            }
        }
    });

    //双击事件
    instance.on('dblclick', function (param) {
        delete param.event;
        if (info.ds_map_dbclick) {
            $DS.eval(info.ds_map_dbclick, info, param);
        }
        //触发其他控件刷新数据
        //推送参数
        $DS.dealPms(info, [param]);
        //触发其他控件刷新数据
        if (info.ds_trigger && info.ds_trigger.length > 0) {
            let self = info.ds_trigger.find(item => item === info.ds_id);
            if (self) temporary[info.ds_id + "_loadSelf"] = true;
            triggerComps(info.ds_trigger, $DS.getCtrlType(info.ds_id), info.ds_id);
        }
        //地图钻取
        drillMap(info, param);
    });

    //鼠标移入事件
    instance.on('mouseover', function (param) {
        delete param.event;
        if (info.ds_map_mouseover) {
            $DS.eval(info.ds_map_mouseover, info, param);
        }
        //如果开启了轮播则关闭
        if (info.ds_isDynamic) {
            clearInterval(temporary.interval[info.ds_id]);
            //取消高亮
            instance.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: temporary.mapCarouselIndex[info.ds_id] == 0 ? 10 : temporary.mapCarouselIndex[info.ds_id] - 1
            });
        }
    });

    //鼠标移出事件
    instance.on('mouseout', function (param) {
        delete param.event;
        if (info.ds_map_mouseout) {
            $DS.eval(info.ds_map_mouseout, info, param);
        }
        //如果开启了轮播则重新开启轮播
        if (info.ds_isDynamic) {
            clearInterval($DS.util.getObjVal(temporary, ['interval', info.ds_id]));
            dynamicLoadMap(info, instance, instance.getOption());
        }
    });
}


//双击事件钻取地图
function drillMap(info, param) {
    //钻取 修改地图
    let selectedMap = getSelectedMap(info, 'dril');

    switch (selectedMap.level) {
        case 'area':
            info.ds_map_area = '';
            info.ds_map_city = '';
            info.ds_map_province = info.ds_map_maxLevel;
            break;
        case 'city':
            info.ds_map_area = param.name;
            break;
        case 'province':
            info.ds_map_city = param.name;
            info.ds_map_area = '';
            break;
        case 'china':
            info.ds_map_area = '';
            info.ds_map_city = '';
            info.ds_map_province = param.name;
            break;
    }
}

/**
 * 折线图颜色
 */
function mapColors(info, event) {
    var cfg = $DS.util.isString(info.ds_input) ? JSON.stringify(info.ds_input) : info.ds_input;
    $DS.openCfgTable([
        {
            field: "color",//**使用颜色
            title: "图形颜色",
            width: 1,
            codeType: "color",
            defaultval: "#5470c6"
        }
    ], cfg, function (data, key) {
        data = JSON.parse(data);
        var pInfo = $DS.getCtrlById(info.ds_pid).info;
        pInfo.ds_chartsColor = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].color) {
                pInfo.ds_chartsColor.push(data[i].color);
            }
        }

        info.ds_input = data
    }, "90%", "80%", "选择颜色", {id: info.ds_pid})
}


/**
 * 显示自定义标签位置
 * @param info
 * @param val
 */
function changeLabelPosition(info, val) {

    var ctrlId = info.ds_pid;
    if (val === true) {
        $DS.setRightProShow(ctrlId, {"ds_series_line_label_customPosition": val})
        return
    }
    $DS.setRightProShow(ctrlId, {"ds_series_line_label_customPosition": false})
}

function clearMapVal(ctrl) {
    ctrl.info.ds_map = "";
    ctrl.info.ds_columns = [];
    ctrl.info.ds_selectcolumns = [];
    ctrl.info.ds_custom_data = "";
}

/**
 * 设置地图原始数据
 * @param id
 */
function setMapData(id, val, cache) {

    //获取数据源信息
    var source = getSourceById(VUECFG.groupObj[id]);
    var ctrl = $DS.getCtrlById(id).info;
    if (val) {
        if (ctrl.ds_group_fields && ctrl.ds_group_fields.length > 0 && ctrl.ds_group_cfg && ctrl.ds_group_cfg.length > 0) {
            val = $DS.util.buildGroupData($DS.util.clone((val.rows) ? (val.rows) : val), ctrl.ds_group_fields, ctrl.ds_group_cfg)
        }
        ctrl['ds_map'] = "";
        ctrl['ds_map'] = (val.rows) ? (val.rows) : val;
        if (source) {
            //记录当前数据源id 切换数据源时修改 并置空 ds_selectcolumns
            if (ctrl['ds_sourceId'] && ctrl['ds_sourceId'] != source.sourceId) {
                ctrl['ds_selectcolumns'] = [];//控件已选择的字段置空
                if (temporary.echarsCtrlDM) {
                    delete temporary.echarsCtrlDM[ctrl.ds_id];
                }
            }
            ctrl['ds_sourceId'] = source.sourceId;
            ctrl['ds_columns'] = $DS.util.clone(source.columns);
        }
    } else {
        ctrl['ds_columns'] = [];//数据源字段信息
        ctrl['ds_map'] = [];//混合图数据
        ctrl['ds_selectcolumns'] = [];//控件已选择的字段置空
    }
}

/**
 * 获取地图配置模板
 */

function getMapModel(mapName, info) {
    let baseModel = chartsBaseModel.getEchartsModelByName(["title", "toolbox", "tooltip"]);
    let mapModel = {
        ds_isRefresh_onTime: 'ds_isRefresh_onTime|BOOLEAN',//是否定时刷新
        ds_refresh_onTime_frequency: 'ds_refresh_onTime_frequency|NUMBER',//定时刷新频率
        ds_map_lines_cfg: 'ds_map_lines_cfg|FUNCTION',
        dv_visualmap_measure_map: 'dv_visualmap_measure_map|STRING',
        dv_visualmap_measure_effectScatter: 'dv_visualmap_measure_effectScatter|STRING',
        ds_showEffectScatter: 'ds_showEffectScatter|BOOLEAN',
        ds_showLines: 'ds_showLines|BOOLEAN',
        ds_map_province: 'ds_map_province|STRING',
        ds_map_city: 'ds_map_city|STRING',
        ds_map_area: 'ds_map_area|STRING',
        ds_isDynamic: 'ds_isDynamic|BOOLEAN',//开启轮播
        ds_changeTimes: 'ds_changeTimes|NUMBER',//频率
        //背景色
        backgroundColor: 'ds_background_color|STRING',

        geo: {
            show: false,
            roam: info.ds_map_series_map_roam,
            map: mapName,
            zoom: info.ds_map_series_map_zoom,
        },

        series: [
            {
                z: 1,
                name: mapName,
                mapType: mapName,
                nameMap: mapName,
                type: 'map',
                zoom: 'ds_map_series_map_zoom|STRING',//地图当前缩放比例大小
                left: 'ds_map_series_map_left|STRING',//距左
                top: 'ds_map_series_map_top|STRING',//距上
                roam: 'ds_map_series_map_roam|BOOLEAN',//是否开启鼠标缩放和平移漫游。默认开启 true,
                scaleLimit: {
                    min: 0.5,
                    max: 5
                },
                select: {
                    color: 'ds_map_series_map_select_areaColor|STRING'
                },
                itemStyle: {
                    normal: {
                        label: {
                            offset: 'ds_map_series_map_itemStyle_normal_label_offset|TWODIMARRAY|NUMBER',//标签横纵偏移,
                            show: 'ds_map_series_map_itemStyle_normal_label_show|BOOLEAN',//是否显示地图标签
                            color: 'ds_map_series_map_itemStyle_normal_label_color|STRING',//标签颜色"#CEF3FF"
                            fontSize: 'ds_map_series_map_itemStyle_normal_label_fontSize|NUMBER',//标签字体大小
                            formatter: 'ds_map_series_map_itemStyle_normal_label_formatter|FUNCTION',//标签格式化
                        },
                        borderWidth: 'ds_map_series_map_itemStyle_normal_borderWidth|NUMBER',//边框宽度 1,
                        shadowOffsetX: 'ds_map_series_map_itemStyle_normal_shadowOffsetX|NUMBER',//阴影偏移横向0
                        shadowOffsetY: 'ds_map_series_map_itemStyle_normal_shadowOffsetY|NUMBER', //阴影偏移纵向0,
                        areaColor: 'ds_map_series_map_itemStyle_normal_areaColor|STRING',//地图颜色'#3a7fd5',
                        borderColor: 'ds_map_series_map_itemStyle_normal_borderColor|STRING',//地图边框颜色'#0a53e9'
                        shadowColor: 'ds_map_series_map_itemStyle_normal_shadowColor|STRING',//地图阴阳颜色'#092f8f', //外发光
                        shadowBlur: 'ds_map_series_map_itemStyle_normal_shadowBlur|NUMBER',//阴影模糊大小20
                    },
                    emphasis: {
                        label: {
                            color: 'ds_map_series_map_itemStyle_emphasis_label_color|STRING',//鼠标悬浮标签颜色
                            fontSize: 'ds_map_series_map_itemStyle_emphasis_label_fontSize|NUMBER',//鼠标悬浮标签字体大小
                        },
                        areaColor: 'ds_map_series_map_itemStyle_emphasis_label_areaColor|STRING',//鼠标悬浮区域颜色 "#0a2dae",
                    }
                }
            }
        ]
    };

    let visualMap = {
        z: 4,
        show: 'ds_map_visualMap_show|BOOLEAN',
        seriesIndex: 'ds_map_visualMap_seriesIndex|NUMBER',//指定取哪个系列的数据作为映射
        calculable: true,
        type: "continuous",
        left: 'ds_map_visualMap_left|NUMBER',
        top: 'ds_map_visualMap_top|NUMBER',
        min: 'ds_map_visualMap_min|NUMBER',
        max: 'ds_map_visualMap_max|NUMBER',
        itemWidth: 'ds_map_visualMap_itemWidth|NUMBER',//宽度
        itemHeight: 'ds_map_visualMap_itemHeight|NUMBER',//高度
        text: 'ds_map_visualMap_text|TWODIMARRAY',//两端文字
        textGap: 'ds_map_visualMap_textGap|NUMBER',//文字距离组件距离
        textStyle: {
            color: 'ds_map_visualMap_textStyle_color|STRING',//
            fontSize: 'ds_map_visualMap_textStyle_fontSize|NUMBER',
        },
        inRange: {
            color: 'ds_chartsColor|STRING'
        }
    };
    //视觉映射组件
    if (info.ds_map_visualMap_show) mapModel.visualMap = visualMap;

    //散点图模板
    let effectScatterModel = {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        effectType: 'ripple',
        z: 2,
        symbolSize: 'ds_map_effectScatter_symbolSize|NUMBER',
        symbol: "ds_map_effectScatter_symbol|STRING",
        roam: 'ds_map_series_map_roam|BOOLEAN',
        //涟漪特效
        rippleEffect: {
            scale: 'ds_map_series_effectScatter_rippleEffect_scale|NUMBER',//涟漪最大缩放比例 5
            brushType: "stroke",
            period: 'ds_map_series_effectScatter_rippleEffect_period|NUMBER'//动画周期 5
        },
        label: {
            show: 'ds_map_series_effectScatter_label_show|BOOLEAN',
            formatter: 'ds_map_series_effectScatter_label_formatter|FUNCTION',
            fontSize: 'ds_map_series_effectScatter_label_fontSize|NUMBER',
            color: 'ds_map_series_effectScatter_label_color|STRING'
        },
        itemStyle: {
            color: 'ds_map_series_effectScatter_itemStyle_color|STRING',//'#32bfc7'
        }
    };
    let linesModel = {
        type: 'lines',
        z: 3,
        tooltip: {show: false},
        coordinateSystem: 'geo',
        effect: {
            show: 'ds_map_lines_effect_show|BOOLEAN',//是否开启特效
            period: 'ds_map_lines_effect_period|NUMBER',//特效时间
            symbol: 'ds_map_lines_effect_symbol|STRING',//特效图形的标记。
            symbolSize: 'ds_map_lines_effect_symbolSize|NUMBER',//特效图形的标记大小
            color: 'ds_map_lines_effect_color|STRING',//标记颜色
            trailLength: 'ds_map_lines_effect_trailLength|FLOAT',//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
        },
    };

    /* //极坐标系 用于地图上的散点,轨迹图
     mapModel.geo =  [{
         show: false,
         roam: info.ds_map_series_map_roam,
         map: mapName,
         zoom: info.ds_map_series_map_zoom,
         itemStyle:{
             color:'red'
         }
     }];*/
    if (info.ds_showEffectScatter)
        mapModel.series.push(effectScatterModel);
    if (info.ds_showLines)
        mapModel.series.push(linesModel);
    return $.extend(baseModel, mapModel);
}


/**
 * 通过控件id取值
 * @param id
 * @returns {*|string}
 */
function getMapVal(id) {
    var ctrl = $DS.getCtrlById(id);
    if (!ctrl) console.error("【ID为" + id + "】的控件不存在!")
    return ctrl.info.ds_map;
}


//处理option中的复杂属性
function handleMapOption(option, info) {


    return option
}


//设置数据显示条数
function dataLimitChange(info, val) {

    let pInfo = $DS.getCtrlById(info.ds_pid).info;
    let pro = 'ds_data_limit_before';
    let checkPro = 'ds_data_limit_after';
    if (info.ds_id == "ds_data_limit_after") {
        pro = info.ds_id;
        checkPro = 'ds_data_limit_before';
    }

    if (val && (isNaN(parseInt(val)) || !$DS.util.isNumber(parseInt(val)))) {
        alert("请输入数字!");
        return false;
    }

    //两个限制条件只能存在一个
    if (pInfo[checkPro] && $DS.util.isNumber(parseInt(pInfo[checkPro])) && $DS.util.isNumber(parseInt(val))) {
        alert("两个限制条件只能设置一个!");
        return false;
    }
}

//========================配置右侧属性=====================================================================
/**
 * 配置右侧属性
 */
function showPropertyMap(change) {

    var cfg = [];
    //组件类型
    var type = getProInfoByObj("select", {
        ds_id: "type",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "组件类型",
        ds_placeholder: "组件类型",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: true,
        ds_options: getAllCtrl(),
        ds_select: $map.type,
        ds_select_change: "changeFormCtrl",
        ds_name: "type",
        ds_ispro: true
    })
    cfg.push(type);

    //控件名
    var ds_ctrlname = getProInfoByObj("input", {
        ds_id: "ds_ctrlname",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件名",
        ds_placeholder: "控件名",
        ds_input: VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,
        ds_input_blur: "checkDuplication",
        ds_name: "ds_ctrlname",
        ds_ispro: true
    });
    cfg.push(ds_ctrlname);

    //控件宽度
    var ds_width = getProInfoByObj("input", {
        ds_id: "ds_width",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件宽度",
        ds_placeholder: "控件宽度",
        ds_input: "100%",
        ds_name: "ds_width",
        ds_ispro: true
    })
    cfg.push(ds_width);

    //控件高度
    var ds_height = getProInfoByObj("input", {
        ds_id: "ds_height",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件高度",
        ds_placeholder: "控件高度",
        ds_input: "25rem",
        ds_name: "ds_height",
        ds_ispro: true
    })
    cfg.push(ds_height);

    //省
    var ds_map_province = getProInfoByObj("select", {
        ds_id: "ds_map_province",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "省",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getMapSelectOptions(VUECFG.ctrlId, 'province'),
        ds_select: "中国",
        ds_select_change: "changeMapSelect",
        ds_name: "ds_map_province",
        ds_ispro: true,
    })
    cfg.push(ds_map_province);

    //市
    var ds_map_city = getProInfoByObj("select", {
        ds_id: "ds_map_city",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "市",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getMapSelectOptions(VUECFG.ctrlId, 'city'),
        ds_select: "",
        ds_select_change: "changeMapSelect",
        ds_name: "ds_map_city",
        ds_ispro: true,
    })
    cfg.push(ds_map_city);

    //县
    var ds_map_area = getProInfoByObj("select", {
        ds_id: "ds_map_area",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "县",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getMapSelectOptions(VUECFG.ctrlId, 'area'),
        ds_select: "",
        ds_name: "ds_map_area",
        ds_ispro: true,
    })
    cfg.push(ds_map_area);

    //背景颜色
    var ds_background_color = getProInfoByObj("color", {
        ds_id: "ds_background_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "背景颜色",
        ds_name: "ds_background_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "rgba(128, 128, 128,0)",
    })
    cfg.push(ds_background_color);


//触发刷新控件
    var ds_trigger = getProInfoByObj("select", {
        ds_id: "ds_trigger",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "触发刷新控件",
        ds_placeholder: "请选择触发刷新控件",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: [],
        ds_select_visible_change: "getAllPageCtrl",//选择框展开前后事件
        ds_select: "",
        ds_name: "ds_trigger",
        ds_ispro: true,
        ds_multiple: true,
    })
    cfg.push(ds_trigger);

    //加载机制 first:优先加载 normal:正常加载 lazy:懒加载
    var ds_loading = getProInfoByObj("select", {
        ds_id: "ds_loading",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "加载机制",
        ds_placeholder: "请选择加载机制",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_options: [{
            value: "first",
            label: "优先加载"
        }, {
            value: "normal",
            label: "正常加载"
        }, {
            value: "lazy",
            label: "懒加载"
        }],
        ds_select: "normal",
        ds_select_change: "changeCtrlLoading",//变更事件
        ds_name: "ds_loading",
        ds_ispro: true
    })
    cfg.push(ds_loading);

    //数据源
    var ds_datasource = getProInfoByObj("select", {
        ds_id: "ds_datasource",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "数据源",
        ds_placeholder: "数据源",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getAllDatasource(),
        ds_select: "",
        ds_select_change: "changeDataSourceForCtrl",
        ds_select_visible_change: "changeDatasourceOption",
        ds_name: "ds_datasource",
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(ds_datasource);

    //根据数据源选择表字段
    var ds_selectcolumns = getProInfoByObj("input", {
        ds_id: "ds_selectcolumns",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "选择字段",
        ds_placeholder: "点击选择字段",
        ds_input: "",
        ds_name: "ds_selectcolumns",
        ds_input_focus: "selectMapBySource",
        ds_readonly: true,
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(ds_selectcolumns);

    //地图引用度量
    var dv_visualmap_measure_map = getProInfoByObj("select", {
        ds_id: "dv_visualmap_measure_map",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "地图引用度量",
        ds_placeholder: "默认取第一个度量",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getAllMapMeasureOptions(VUECFG.ctrlId),
        ds_select: "",
        ds_name: "dv_visualmap_measure_map",
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(dv_visualmap_measure_map);

    //散点图引用度量
    var dv_visualmap_measure_effectScatter = getProInfoByObj("select", {
        ds_id: "dv_visualmap_measure_effectScatter",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "散点图引用度量",
        ds_placeholder: "默认取第一个度量",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getAllMapMeasureOptions(VUECFG.ctrlId),
        ds_select: "",
        ds_name: "dv_visualmap_measure_effectScatter",
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(dv_visualmap_measure_effectScatter);


    //数据分组主键
    var ds_group_fields = getProInfoByObj("select", {
        ds_id: "ds_group_fields",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "数据分组主键",
        ds_placeholder: "数据分组主键",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getAllDatasourceField(),
        ds_select: "",
        ds_select_visible_change: "changeFieldOption",
        ds_select_change: "loadChartsCtrl",
        ds_name: "ds_group_fields",
        ds_multiple: true,
        ds_ispro: true,
        ds_isrequired: true,
        group1: "数据分组",
        group2: ""
    })
    cfg.push(ds_group_fields);

    //数据分组配置
    var ds_group_cfg = getProInfoByObj("input", {
        ds_id: "ds_group_cfg",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "数据分组配置",
        ds_placeholder: "点击配置数据分组",
        ds_input: "",
        ds_name: "ds_group_cfg",
        ds_input_focus: "dataGroupCfg",
        ds_readonly: true,
        ds_ispro: true,
        ds_valformat: "JSON",
        group1: "数据分组",
        group2: ""
    })
    cfg.push(ds_group_cfg);


    //数据显示限制条数
    var ds_data_limit_before = getProInfoByObj("input", {
        ds_id: "ds_data_limit_before",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "前n条",
        ds_placeholder: "输入数字",
        ds_input: "",
        ds_name: "ds_data_limit_before",
        ds_ispro: true,
        ds_valformat: "NUMBER",
        ds_input_change: "dataLimitChange",
        group1: "数据显示限制条数",
        group2: "",
    });
    cfg.push(ds_data_limit_before);

    //数据显示限制条数
    var ds_data_limit_after = getProInfoByObj("input", {
        ds_id: "ds_data_limit_after",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "后n条",
        ds_placeholder: "输入数字",
        ds_input: "",
        ds_name: "ds_data_limit_after",
        ds_ispro: true,
        ds_valformat: "NUMBER",
        ds_input_change: "dataLimitChange",
        group1: "数据显示限制条数",
        group2: "",
    });
    cfg.push(ds_data_limit_after);

    //显示条件
    var ds_data_condition = getProInfoByObj("input", {
        ds_id: "ds_data_condition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示条件",
        ds_placeholder: "点击设置显示条件",
        ds_input: "",
        ds_name: "ds_data_condition",
        ds_ispro: true,
        ds_valformat: "JSON",
        ds_input_focus: "dataCondition",
        group1: "数据显示限制条数",
        group2: "",
    });
    cfg.push(ds_data_condition);

    //是否定时刷新
    var ds_isRefresh_onTime = getProInfoByObj("switch", {
        ds_id: "ds_isRefresh_onTime",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否定时刷新",
        ds_name: "ds_isRefresh_onTime",
        ds_switch: false,
        ds_ispro: true,
        group1: "定时刷新",
        group2: ""
    })
    cfg.push(ds_isRefresh_onTime);

    //定时刷新频率
    var ds_refresh_onTime_frequency = getProInfoByObj("input", {
        ds_id: "ds_refresh_onTime_frequency",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "定时刷新频率",
        ds_placeholder: "输入数字,单位毫秒,默认5000",
        ds_input: "5000",
        ds_name: "ds_refresh_onTime_frequency",
        ds_ispro: true,
        ds_valformat: "NUMBER",
        ds_input_change: "changeRefreshFrequency",
        group1: "定时刷新",
        group2: ""
    });
    cfg.push(ds_refresh_onTime_frequency);


    //设置参数名,如果没有默认为CTRL_+当前控件name
    var ds_param = getProInfoByObj("input", {
        ds_id: "ds_param",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "推送参数名",
        ds_placeholder: "控件推送参数名",
        ds_input: "",
        ds_name: "ds_param",
        ds_ispro: true,
        group1: "参数推送",
        group2: ""
    })
    cfg.push(ds_param);

    //撤销推送条件
    var ds_backParamCondition = getProInfoByObj("input", {
        ds_id: "ds_backParamCondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "撤销推送条件",
        ds_placeholder: "推送参数名.A=='a'||推送参数名.A=='b'",
        ds_input: "",
        ds_name: "ds_backParamCondition",
        ds_ispro: true,
        group1: "参数推送",
        group2: ""
    })
    cfg.push(ds_backParamCondition);

    //内边距大小
    var ds_out_padding = getProInfoByObj("input", {
        ds_id: "ds_out_padding",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "内边距大小",
        ds_placeholder: "内边距大小",
        ds_input: "0rem",
        ds_name: "ds_out_padding",
        ds_ispro: true,
        group1: "组件布局",
        group2: ""
    })
    cfg.push(ds_out_padding);

    //外边距大小
    var ds_out_margin = getProInfoByObj("input", {
        ds_id: "ds_out_margin",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "外边距大小",
        ds_placeholder: "外边距大小",
        ds_input: "0rem",
        ds_name: "ds_out_margin",
        ds_ispro: true,
        group1: "组件布局",
        group2: ""
    })
    cfg.push(ds_out_margin);

    //★标题
    cfg = chartsBasePro.getBaseTitlePro(cfg);

    //★工具栏
    cfg = chartsBasePro.getBaseToolboxPro(cfg);


    cfg = chartsBasePro.getBaseTooltipPro(cfg);

    /*视觉映射组件*/
    var ds_map_visualMap_show = getProInfoByObj("switch", {
        ds_id: "ds_map_visualMap_show",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示映射组件",
        ds_name: "ds_map_visualMap_show",
        ds_switch: true,
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_show);

    //视觉映射组件颜色
    var ds_chartsColor = getProInfoByObj("input", {
        ds_id: "ds_chartsColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "组件颜色",
        ds_placeholder: "组件颜色",
        ds_input: [{
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#5470c6"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#91cc75"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#fac858"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#ee6666"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#73c0de"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#3ba272"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#fc8452"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#9a60b4"
        }, {
            field: "color",//**使用颜色
            title: "数据颜色",
            width: 0.2,
            codeType: "color",
            "color": "#ea7ccc"
        }],
        ds_name: "ds_chartsColor",
        ds_ispro: true,
        ds_input_focus: "mapColors",
        ds_valformat: "JSON",
        ds_show_alpha: true,//是否支持透明度
        group1: "视觉映射组件",
        group2: ""
    });
    cfg.push(ds_chartsColor);

    //指定取哪个系列的数据作为映射
    var ds_map_visualMap_seriesIndex = getProInfoByObj("select", {
        ds_id: "ds_map_visualMap_seriesIndex",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "以哪个系列为映射",
        ds_placeholder: "指定取哪个系列的数据",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_options: [{value: "0", label: "地图"}, {value: "1", label: "散点图"},],
        ds_select: '0',
        ds_name: "ds_map_visualMap_seriesIndex",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_seriesIndex);


    //距左
    var ds_map_visualMap_left = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_left",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "距左",
        ds_placeholder: "数字或auto",
        ds_input: "0",
        ds_name: "ds_map_visualMap_left",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_left);

    //距上
    var ds_map_visualMap_top = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_top",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "距上",
        ds_placeholder: "数字或auto",
        ds_input: "auto",
        ds_name: "ds_map_visualMap_top",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_top);

    //最小值
    var ds_map_visualMap_min = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_min",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "最小值",
        ds_placeholder: "数字",
        ds_input: "0",
        ds_name: "ds_map_visualMap_min",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_min);

    //最大值
    var ds_map_visualMap_max = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_max",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "最大值",
        ds_placeholder: "数字",
        ds_input: "1000",
        ds_name: "ds_map_visualMap_max",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_max);

    //组件宽度
    var ds_map_visualMap_itemWidth = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_itemWidth",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "组件宽度",
        ds_placeholder: "数字",
        ds_input: "20",
        ds_name: "ds_map_visualMap_itemWidth",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_itemWidth);

    //组件高度
    var ds_map_visualMap_itemHeight = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_itemHeight",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "组件高度",
        ds_placeholder: "数字",
        ds_input: "140",
        ds_name: "ds_map_visualMap_itemHeight",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: ""
    })
    cfg.push(ds_map_visualMap_itemHeight);

    //组件两端文字
    var ds_map_visualMap_text = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_text",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "组件两端文字",
        ds_placeholder: "最大值,最小值",
        ds_input: "最大值','最小值",
        ds_name: "ds_map_visualMap_text",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: "两端文字"
    })
    cfg.push(ds_map_visualMap_text);


    //文字距离组件距离
    var ds_map_visualMap_textGap = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_textGap",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "文字距组件距离",
        ds_placeholder: "数字",
        ds_input: "10",
        ds_name: "ds_map_visualMap_textGap",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: "两端文字"
    })
    cfg.push(ds_map_visualMap_textGap);

    // 字体颜色
    var ds_map_visualMap_textStyle_color = getProInfoByObj("color", {
        ds_id: "ds_map_visualMap_textStyle_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "字体颜色",
        ds_name: "ds_map_visualMap_textStyle_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#333333",
        group1: "视觉映射组件",
        group2: "两端文字"
    })
    cfg.push(ds_map_visualMap_textStyle_color);

    var ds_map_visualMap_textStyle_fontSize = getProInfoByObj("input", {
        ds_id: "ds_map_visualMap_textStyle_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "字体大小",
        ds_placeholder: "数字",
        ds_input: "12",
        ds_name: "ds_map_visualMap_textStyle_fontSize",
        ds_ispro: true,
        group1: "视觉映射组件",
        group2: "两端文字"
    })
    cfg.push(ds_map_visualMap_textStyle_fontSize);
    //---------------★|地图属性----------------------------------------------------
    //地图位置
    var ds_map_series_map_left = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_left",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "距左",
        ds_placeholder: "百分比或数字",
        ds_input: "30%",
        ds_name: "ds_map_series_map_left",
        ds_ispro: true,
        group1: "地图属性",
        group2: ""
    })
    cfg.push(ds_map_series_map_left);

    var ds_map_series_map_top = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_top",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "距上",
        ds_placeholder: "百分比或数字",
        ds_input: "10%",
        ds_name: "ds_map_series_map_top",
        ds_ispro: true,
        group1: "地图属性",
        group2: ""
    })
    cfg.push(ds_map_series_map_top);


    //地图大小
    var ds_map_series_map_zoom = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_zoom",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "地图缩放比例",
        ds_placeholder: "",
        ds_input: "1",
        ds_name: "ds_map_series_map_zoom",
        ds_ispro: true,
        group1: "地图属性",
        group2: ""
    })
    cfg.push(ds_map_series_map_zoom);


    //是否开启鼠标缩放和平移漫游。默认开启 true,
    var ds_map_series_map_roam = getProInfoByObj("switch", {
        ds_id: "ds_map_series_map_roam",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "鼠标缩放和平移漫游",
        ds_name: "ds_map_series_map_roam",
        ds_switch: true,
        ds_ispro: true,
        group1: "地图属性",
        group2: ""
    })
    cfg.push(ds_map_series_map_roam);

    //是否显示地图标签-普通
    var ds_map_series_map_itemStyle_normal_label_show = getProInfoByObj("switch", {
        ds_id: "ds_map_series_map_itemStyle_normal_label_show",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示地图标签",
        ds_name: "ds_map_series_map_itemStyle_normal_label_show",
        ds_switch: true,
        ds_ispro: true,
        group1: "地图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_label_show);

    //标签偏移
    var ds_map_series_map_itemStyle_normal_label_offset = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_itemStyle_normal_label_offset",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "标签偏移",
        ds_placeholder: "标签偏移(横,纵)",
        ds_input: "0,0",
        ds_name: "ds_map_series_map_itemStyle_normal_label_offset",
        ds_ispro: true,
        group1: "地图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_label_offset);

    //标签颜色
    var ds_map_series_map_itemStyle_normal_label_color = getProInfoByObj("color", {
        ds_id: "ds_map_series_map_itemStyle_normal_label_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "标签颜色",
        ds_name: "ds_map_series_map_itemStyle_normal_label_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#CEF3FF",
        group1: "地图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_label_color);

    //标签字体大小
    var ds_map_series_map_itemStyle_normal_label_fontSize = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_itemStyle_normal_label_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "标签字体大小",
        ds_placeholder: "标签字体大小",
        ds_input: "12",
        ds_name: "ds_map_series_map_itemStyle_normal_label_fontSize",
        ds_valformat: "NUMBER",
        ds_ispro: true,
        group1: "地图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_label_fontSize);

    //鼠标悬浮标签颜色
    var ds_map_series_map_itemStyle_emphasis_label_color = getProInfoByObj("color", {
        ds_id: "ds_map_series_map_itemStyle_emphasis_label_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "鼠标悬浮标签颜色",
        ds_name: "ds_map_series_map_itemStyle_emphasis_label_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#FFFFFF",
        group1: "地图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_map_itemStyle_emphasis_label_color);

    //鼠标悬浮标签字体大小
    var ds_map_series_map_itemStyle_emphasis_label_fontSize = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_itemStyle_emphasis_label_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "鼠标悬浮标签字体大小",
        ds_placeholder: "鼠标悬浮标签字体大小",
        ds_input: "12",
        ds_name: "ds_map_series_map_itemStyle_emphasis_label_fontSize",
        ds_valformat: "NUMBER",
        ds_ispro: true,
        group1: "地图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_map_itemStyle_emphasis_label_fontSize);

    //标签格式化
    var ds_map_series_map_itemStyle_normal_label_formatter = getProInfoByObj("jseditor", {
        ds_id: "ds_map_series_map_itemStyle_normal_label_formatter",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "标签内容(字符串或函数)",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "/**\n支持使用字符串模板以及回调函数方式。'\\n'换行 \n" +
            "字符串模板:\n" +
            "{a}：系列名。\n" +
            "{b}：数据名。\n" +
            "{c}：数据值。\n" +
            "{d}：百分比。\n" +
            "{@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。\n" +
            "{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。\n" +
            "回调函数方式(此方式不支持同时使用字符串模板):例:\n" +
            "funName = function(param){\n" +
            "  //参数:param 包含各项数据,如value:当前数据值,name:当前数据名称 ,seriesType:当前series类型等\n" +
            "  return '数据名:'+param.name+'数据值:'+param.value\n" +
            "}\n" +
            "**/",
        ds_prepend: "富文本回调函数",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_map_series_map_itemStyle_normal_label_formatter",
        ds_ispro: true,
        ds_savedb: false,
        group1: "地图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_label_formatter);

    //地图颜色'#3a7fd5',
    var ds_map_series_map_itemStyle_normal_areaColor = getProInfoByObj("color", {
        ds_id: "ds_map_series_map_itemStyle_normal_areaColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "地图颜色",
        ds_name: "ds_map_series_map_itemStyle_normal_areaColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#3a7fd5",
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_areaColor);

    //鼠标悬浮区域颜色
    var ds_map_series_map_itemStyle_emphasis_label_areaColor = getProInfoByObj("color", {
        ds_id: "ds_map_series_map_itemStyle_emphasis_label_areaColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "鼠标悬浮区域颜色",
        ds_name: "ds_map_series_map_itemStyle_emphasis_label_areaColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#0a2dae",
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_emphasis_label_areaColor);


    var ds_map_series_map_select_areaColor = getProInfoByObj("color", {
        ds_id: "ds_map_series_map_select_areaColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "选中区域颜色",
        ds_name: "ds_map_series_map_select_areaColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#0a2dae",
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_select_areaColor);
    //边框宽度 1,
    var ds_map_series_map_itemStyle_normal_borderWidth = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_itemStyle_normal_borderWidth",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "边框宽度",
        ds_placeholder: "边框宽度",
        ds_input: "1",
        ds_name: "ds_map_series_map_itemStyle_normal_borderWidth",
        ds_valformat: "NUMBER",
        ds_ispro: true,
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_borderWidth);

    //地图边框颜色'#0a53e9'
    var ds_map_series_map_itemStyle_normal_borderColor = getProInfoByObj("color", {
        ds_id: "ds_map_series_map_itemStyle_normal_borderColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "边框颜色",
        ds_name: "ds_map_series_map_itemStyle_normal_borderColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#0a53e9",
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_borderColor);

    //阴影模糊大小20
    var ds_map_series_map_itemStyle_normal_shadowBlur = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_itemStyle_normal_shadowBlur",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "阴影模糊大小",
        ds_placeholder: "",
        ds_input: '20',
        ds_name: "ds_map_series_map_itemStyle_normal_shadowBlur",
        ds_ispro: true,
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_shadowBlur);

    //地图阴阳颜色'#092f8f', //外发光
    var ds_map_series_map_itemStyle_normal_shadowColor = getProInfoByObj("color", {
        ds_id: "ds_map_series_map_itemStyle_normal_shadowColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "阴阳颜色",
        ds_name: "ds_map_series_map_itemStyle_normal_shadowColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#092f8f",
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_shadowColor);

    //阴影偏移横向0
    var ds_map_series_map_itemStyle_normal_shadowOffsetX = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_itemStyle_normal_shadowOffsetX",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "阴影偏移横向",
        ds_placeholder: "",
        ds_input: '0',
        ds_name: "ds_map_series_map_itemStyle_normal_shadowOffsetX",
        ds_ispro: true,
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_shadowOffsetX);

    //阴影偏移纵向0
    var ds_map_series_map_itemStyle_normal_shadowOffsetY = getProInfoByObj("input", {
        ds_id: "ds_map_series_map_itemStyle_normal_shadowOffsetY",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "阴影偏移纵向",
        ds_placeholder: "",
        ds_input: '0',
        ds_name: "ds_map_series_map_itemStyle_normal_shadowOffsetY",
        ds_ispro: true,
        group1: "地图属性",
        group2: "地图样式"
    })
    cfg.push(ds_map_series_map_itemStyle_normal_shadowOffsetY);


    /*散点属性*/
    //是否显示散点图
    var ds_showEffectScatter = getProInfoByObj("switch", {
        ds_id: "ds_showEffectScatter",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否显示散点图",
        ds_name: "ds_showEffectScatter",
        ds_switch: false,
        ds_ispro: true,
        group1: "散点图属性",
    })
    cfg.push(ds_showEffectScatter);
    //散点大小
    var ds_map_effectScatter_symbolSize = getProInfoByObj("input", {
        ds_id: "ds_map_effectScatter_symbolSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "散点大小",
        ds_placeholder: "数字",
        ds_input: '10',
        ds_name: "ds_map_effectScatter_symbolSize",
        ds_ispro: true,
        group1: "散点图属性",
        group2: "散点样式"
    })
    cfg.push(ds_map_effectScatter_symbolSize);

    //散点形状
    var ds_map_effectScatter_symbol = getProInfoByObj("select", {
        ds_id: "ds_map_effectScatter_symbol",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "散点形状",
        ds_options:
            [{value: "circle", label: "圆"},
                {value: "rect", label: "方块"},
                {value: "roundRect", label: "圆角方块"},
                {value: "triangle", label: "三角形"},
                {value: "diamond", label: "菱形"},
                {value: "pin", label: "气球形"},
                {value: "arrow", label: "箭头"},
                {value: "none", label: "无"},
            ],
        ds_select: 'circle',
        ds_group: false,
        ds_name: "ds_map_effectScatter_symbol",
        ds_ispro: true,
        group1: "散点图属性",
        group2: "散点样式"
    })
    cfg.push(ds_map_effectScatter_symbol);

    //散点颜色
    var ds_map_series_effectScatter_itemStyle_color = getProInfoByObj("color", {
        ds_id: "ds_map_series_effectScatter_itemStyle_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "散点颜色",
        ds_name: "ds_map_series_effectScatter_itemStyle_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#32bfc7",
        group1: "散点图属性",
        group2: "散点样式"
    })
    cfg.push(ds_map_series_effectScatter_itemStyle_color);

    //波纹的最大缩放比例
    var ds_map_series_effectScatter_rippleEffect_scale = getProInfoByObj("input", {
        ds_id: "ds_map_series_effectScatter_rippleEffect_scale",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "波纹的最大缩放比例",
        ds_placeholder: "",
        ds_input: '5',
        ds_name: "ds_map_series_effectScatter_rippleEffect_scale",
        ds_ispro: true,
        group1: "散点图属性",
        group2: "动画"
    })
    cfg.push(ds_map_series_effectScatter_rippleEffect_scale);

    //动画的周期
    var ds_map_series_effectScatter_rippleEffect_period = getProInfoByObj("input", {
        ds_id: "ds_map_series_effectScatter_rippleEffect_period",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "动画的周期",
        ds_placeholder: "",
        ds_input: '5',
        ds_name: "ds_map_series_effectScatter_rippleEffect_period",
        ds_ispro: true,
        group1: "散点图属性",
        group2: "动画"
    })
    cfg.push(ds_map_series_effectScatter_rippleEffect_period);

    //是否显示标签
    var ds_map_series_effectScatter_label_show = getProInfoByObj("switch", {
        ds_id: "ds_map_series_effectScatter_label_show",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否显示标签",
        ds_name: "ds_map_series_effectScatter_label_show",
        ds_switch: true,
        ds_ispro: true,
        group1: "散点图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_effectScatter_label_show);

    //标签字体大小
    var ds_map_series_effectScatter_label_fontSize = getProInfoByObj("input", {
        ds_id: "ds_map_series_effectScatter_label_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "字体大小",
        ds_placeholder: "数字",
        ds_input: '12',
        ds_name: "ds_map_series_effectScatter_label_fontSize",
        ds_ispro: true,
        group1: "散点图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_effectScatter_label_fontSize);

    //字体颜色
    var ds_map_series_effectScatter_label_color = getProInfoByObj("color", {
        ds_id: "ds_map_series_effectScatter_label_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "字体颜色",
        ds_name: "ds_map_series_effectScatter_label_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#ffffff",
        group1: "散点图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_effectScatter_label_color);
    //标签格式化
    var ds_map_series_effectScatter_label_formatter = getProInfoByObj("jseditor", {
        ds_id: "ds_map_series_effectScatter_label_formatter",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "标签内容(字符串或函数)",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "/**\n支持使用字符串模板以及回调函数方式。'\\n'换行 \n" +
            "字符串模板:\n" +
            "{a}：系列名。\n" +
            "{b}：数据名。\n" +
            "{c}：数据值。\n" +
            "{d}：百分比。\n" +
            "{@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。\n" +
            "{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。\n" +
            "回调函数方式(此方式不支持同时使用字符串模板):例:\n" +
            "funName = function(param){\n" +
            "  //参数:param 包含各项数据,如value:当前数据值,name:当前数据名称 ,seriesType:当前series类型等\n" +
            "  return '数据名:'+param.name+'数据值:'+param.value\n" +
            "}\n" +
            "**/",
        ds_prepend: "富文本回调函数",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_map_series_effectScatter_label_formatter",
        ds_ispro: true,
        ds_savedb: false,
        group1: "散点图属性",
        group2: "标签"
    })
    cfg.push(ds_map_series_effectScatter_label_formatter);

    /*轨迹图属性*/
    //显示轨迹图
    var ds_showLines = getProInfoByObj("switch", {
        ds_id: "ds_showLines",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示轨迹图",
        ds_name: "ds_showLines",
        ds_switch: false,
        ds_ispro: true,
        group1: "轨迹图属性",
    })
    cfg.push(ds_showLines);

    //轨迹图配置
    var ds_map_lines_cfg = getProInfoByObj("input", {
        ds_id: "ds_map_lines_cfg",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "轨迹图配置",
        ds_placeholder: "轨迹图配置",
        ds_input: '',
        ds_input_focus: 'mapLinesConfig',
        ds_valformat: 'JSON',
        ds_name: "ds_map_lines_cfg",
        ds_ispro: true,
        group1: "轨迹图属性",
    })
    cfg.push(ds_map_lines_cfg);


    //是否开启特效
    var ds_map_lines_effect_show = getProInfoByObj("switch", {
        ds_id: "ds_map_lines_effect_show",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否开启特效",
        ds_name: "ds_map_lines_effect_show",
        ds_switch: true,
        ds_ispro: true,
        group1: "轨迹图属性",
        group2: "特效"
    })
    cfg.push(ds_map_lines_effect_show);

    //特效时间
    var ds_map_lines_effect_period = getProInfoByObj("input", {
        ds_id: "ds_map_lines_effect_period",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "特效时间",
        ds_placeholder: "单位秒",
        ds_input: 3,
        ds_name: "ds_map_lines_effect_period",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "轨迹图属性",
        group2: "特效"
    })
    cfg.push(ds_map_lines_effect_period);

    //特效图形的标记。
    var ds_map_lines_effect_symbol = getProInfoByObj("select", {
        ds_id: "ds_map_lines_effect_symbol",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "标记的图形",
        ds_options:
            [{value: "circle", label: "圆"},
                {value: "rect", label: "方块"},
                {value: "roundRect", label: "圆角方块"},
                {value: "triangle", label: "三角形"},
                {value: "diamond", label: "菱形"},
                {value: "pin", label: "气球形"},
                {value: "arrow", label: "箭头"},
                {value: "none", label: "无"},
            ],
        ds_select: 'circle',
        ds_group: false,
        ds_name: "ds_map_lines_effect_symbol",
        ds_ispro: true,
        group1: "轨迹图属性",
        group2: "特效"
    })
    cfg.push(ds_map_lines_effect_symbol);

    //特效图形的标记大小
    var ds_map_lines_effect_symbolSize = getProInfoByObj("input", {
        ds_id: "ds_map_lines_effect_symbolSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "标记大小",
        ds_placeholder: "数字",
        ds_input: 10,
        ds_name: "ds_map_lines_effect_symbolSize",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "轨迹图属性",
        group2: "特效"
    })
    cfg.push(ds_map_lines_effect_symbolSize);

    //标记颜色
    var ds_map_lines_effect_color = getProInfoByObj("color", {
        ds_id: "ds_map_lines_effect_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "标记颜色",
        ds_name: "ds_map_lines_effect_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#ffffff",
        group1: "轨迹图属性",
        group2: "特效"
    })
    cfg.push(ds_map_lines_effect_color);

    //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
    var ds_map_lines_effect_trailLength = getProInfoByObj("input", {
        ds_id: "ds_map_lines_effect_trailLength",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "特效尾迹的长度",
        ds_placeholder: "小数,0~1",
        ds_input: 0.2,
        ds_name: "ds_map_lines_effect_trailLength",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "轨迹图属性",
        group2: "特效"
    })
    cfg.push(ds_map_lines_effect_trailLength);

    //--------------------★动态效果------------------------------------------------------

    //开启轮播
    var ds_isDynamic = getProInfoByObj("switch", {
        ds_id: "ds_isDynamic",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "开启轮播",
        ds_name: "ds_isDynamic",
        ds_switch: false,
        ds_ispro: true,
        group1: "动态效果",
        group2: "轮播"
    })
    cfg.push(ds_isDynamic);


    //频率
    var ds_changeTimes = getProInfoByObj("input", {
        ds_id: "ds_changeTimes",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "轮播频率",
        ds_placeholder: "轮播频率,单位秒",
        ds_input: 3,
        ds_name: "ds_changeTimes",
        ds_ispro: true,
        group1: "动态效果",
        group2: "轮播"
    })
    cfg.push(ds_changeTimes);


    var ds_custom_data = getProInfoByObj("textarea", {
        ds_id: "ds_custom_data",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "自定义数据",
        ds_placeholder: "{\n" +
            "        xAxis_data: [{\n" +
            "            type: 'category',\n" +
            "            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\n" +
            "        }],\n" +
            "        yAxis_data: [{type: 'value'}],\n" +
            "        legend_data: [{name: 'YEAR1'}, {name: 'YEAR2'}],\n" +
            "        series_data: [\n" +
            "            {data: [820, 932, 901, 934, 1290, 1330, 1320], name: 'YEAR1', type: 'line'},\n" +
            "            {data: [820, 932, 901, 934, 1290, 1330, 1320], name: 'YEAR2', type: 'bar'}\n" +
            "        ],\n" +
            "    }",
        ds_textarea: "",
        ds_name: "ds_custom_data",
        ds_valformat: "JSON",
        ds_ispro: true,
        group1: "自定义数据",
    })
    cfg.push(ds_custom_data);


    //点击事件
    var ds_map_click = getProInfoByObj("jseditor", {
        ds_id: "ds_map_click",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "点击事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_map_click",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_map_click);

    //双击事件
    var ds_map_dbclick = getProInfoByObj("jseditor", {
        ds_id: "ds_map_dbclick",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "双击事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_map_dbclick",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_map_dbclick);


    var ds_map_mouseout = getProInfoByObj("jseditor", {
        ds_id: "ds_map_mouseout",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "鼠标移出事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_map_mouseout",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_map_mouseout);

    var ds_map_mouseover = getProInfoByObj("jseditor", {
        ds_id: "ds_map_mouseover",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "鼠标移入事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_map_mouseover",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_map_mouseover);

    //设置option前事件
    var ds_before_setOption = getProInfoByObj("jseditor", {
        ds_id: "ds_before_setOption",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "设置option前事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:图形配置项",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_before_setOption",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_before_setOption);

    //加载完成事件
    var ds_load_success = getProInfoByObj("jseditor", {
        ds_id: "ds_load_success",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "加载完成事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",
        ds_prepend: "fn(obj,trigger){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_load_success",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_load_success);
    if (VUECFG.proObj[VUECFG.ctrlId] && !change) {
        var proArr = VUECFG.proObj[VUECFG.ctrlId];
        for (var c = 0; c < cfg.length; c++) {
            for (var p = 0; p < proArr.length; p++) {
                if (cfg[c].info.ds_name == proArr[p].info.ds_name) {
                    var type = cfg[c].type.split("drag_")[1];
                    cfg[c].info["ds_" + type] = proArr[p].info["ds_" + type];
                    if (!$DS.util.isUndefined(proArr[p].info["ds_show"]))
                        cfg[c].info["ds_show"] = proArr[p].info["ds_show"];
                }
            }
        }
    }
    VUECFG.proObj[VUECFG.ctrlId] = [];
    //VUECFG.proArr = cfg;
    VUECFG.proArr = formatterCtrlProCfg(cfg);
    VUECFG.proObj[VUECFG.ctrlId] = cfg;
    $("#templetePro").click();
}


//=====================属性列表相关事件=======================================================

/**
 * 获取省市县下拉选项
 * @param ctrlId
 * @param type 类型
 * @returns {[{label: string, value: string}]|{label: string, value: string}[]|*[]}
 */
function getMapSelectOptions(ctrlId, type) {

    if (type == 'province' && temporary.allProvince) {
        return temporary.allProvince;
    } else {
        var url;
        if (type == 'province')
            url = 'echarts/china.json';
        else {
            //上级属性名
            let parentProName = type == 'city' ? 'ds_map_province' : 'ds_map_city';
            //上级所选区划
            let parentSelect;
            if (!VUECFG.proObj[ctrlId]) return [];
            for (var p = 0; p < VUECFG.proObj[ctrlId].length; p++) {
                let pro = VUECFG.proObj[ctrlId][p];
                if (pro.info.ds_name == parentProName) {
                    parentSelect = pro.info.ds_select;
                    break;
                }
            }
            if (!parentSelect) {
                return [{value: '', label: '请选择'}];
            } else {
                let path = type == 'city' ? 'province_json' : 'city';
                let mapFile = type == 'city' ? provinceMap[parentSelect] : cityMap[parentSelect];
                if (!mapFile) return [{value: '', label: '请选择'}];
                url = `echarts/${path}/${mapFile}.json`;
            }
        }
        let options = [{value: '', label: type == 'province' ? '中国' : '请选择'}];
        try {
            $.ajaxSettings.async = false;
            $.getJSON(url, function (data) {
                if (data) {
                    for (var i = 0; i < data.features.length; i++) {
                        options.push({
                            label: data.features[i].properties.name,
                            value: data.features[i].properties.name
                        });
                    }
                }
                $.ajaxSettings.async = true;
            });
        } catch (e) {
            console.error(`获取${type}区划失败,${e}`);
            $.ajaxSettings.async = true;
            return [];
        }
        if (type == 'province') temporary.allProvince = options;
        return options;
    }
}

//地图变更
function changeMapSelect(info, value) {

    //省变更 清除市 县所选 |市变更 清除县所选
    VUECFG.formObj[info.ds_pid].info.ds_map_area = '';
    if (info.ds_id == 'ds_map_province') {
        VUECFG.formObj[info.ds_pid].info.ds_map_city = '';
        VUECFG.formObj[info.ds_pid].info.ds_map_maxLevel = value;
    }
    for (var p = 0; p < VUECFG.proObj[info.ds_pid].length; p++) {
        let pro = VUECFG.proObj[info.ds_pid][p];
        if (pro.info.ds_name == 'ds_map_area')
            pro.info.ds_select = '';
        if (pro.info.ds_name == 'ds_map_city' && info.ds_id == 'ds_map_province')
            pro.info.ds_select = '';
    }
    $DS.refPro();
}

//获取度量下拉
function getAllMapMeasureOptions(ctrlId) {

    let info = $DS.getCtrlById(ctrlId).info;
    if (info.ds_selectcolumns && info.ds_selectcolumns.length > 0) {
        let measureOptions = [];
        for (let item of info.ds_selectcolumns) {
            if (item.DIMENSION == 'MEASURE') {
                measureOptions.push({label: item.FIELD_NAMECN, value: item.FIELD_NAME});
            }
        }
        return measureOptions;
    } else return [];
}

/**
 * 轨迹图配置
 * @param info
 */
function mapLinesConfig(info) {
    let pInfo = $DS.getCtrlById(info.ds_pid).info;
    let cfg = $DS.util.isString(pInfo.ds_map_lines_cfg) ? JSON.parse(pInfo.ds_map_lines_cfg) : pInfo.ds_map_lines_cfg;
    let cols = [
        {"field": "FROM", "title": "起点区划编码", "width": 0.2, "edit": "text"},
        {"field": "TO", "title": "终点区划编码", "width": 0.2, "edit": "text"},
        {"field": "color", "title": "轨迹颜色", "width": 0.15, "codeType": "color"},
        {"field": "width", "title": "轨迹宽度", "width": 0.15, "edit": "text"},
        {"field": "curveness", "title": "轨迹曲率(0~1)", "width": 0.15, "edit": "text"},
        {
            "field": "type",
            "title": "轨迹线类型",
            "width": 0.15,
            "codeType": "select",
            "code": [{"value": "solid", "name": "实线"}, {"value": "dashed", "name": "虚线"}, {
                "value": "dotted",
                "name": "点线"
            }]
        }
    ];

    $DS.openCfgTable(cols, cfg, function (data) {

        pInfo.ds_map_lines_cfg = data;
        info.ds_input = data;
    }, '80%', '90%', '轨迹图配置');
}