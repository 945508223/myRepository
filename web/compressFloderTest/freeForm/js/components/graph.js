/**
 * 关系图
 * @type {{}}
 */
var $graph = {
    type: "drag_graph",//类型标识
    dataType: "levelData",//数据类型(singeleData 单数据;allData 多数据)
    uuid: Date.parse(new Date()),//唯一id
    isCanvas:true,//是否处理为Canvas画布
    getConfig: getGraphConfig,
    register: registerGraph,
    showProperty: showPropertyGraph,//展示右侧属性
    setData: setGraphData,  //为控件数据源设置数据
    getData: getGraphVal,//获得数据
    getDefaultData: getDefaultGraphData,//获取默认数据
    clearData: clearGraphVal,//清空数据
}

/**
 * 配置对象
 */
function getGraphConfig() {
    let baseConfig = chartsBaseConfig.getBaseConfigByNames(
        ['title', 'tooltip', 'toolbox']);

    let privateConfig = {
        /*公共*/
        ds_id: "",//id
        ds_ctrlname: "GRAPH_" + $graph.uuid++,//控件名
        ds_show: true,//显示隐藏
        ds_showCondition: "",//显示条件
        ds_width: "100%",//控件宽度
        ds_height: "100%",//控件高度
        ds_innerwidth: "calc(100% - 2rem)",//主体内容宽度
        ds_style: "drawing-item",//自定义样式
        ds_datasource: "",//数据源
        ds_name: "",//name
        ds_group_fields: [],//数据分组主键
        ds_group_cfg: [],//数据分组配置
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
        ds_isEchart: true,//表示该控件为echarts控件 动态加载页面js时使用
        ds_isRefresh_onTime: false,//是否定时刷新
        ds_refresh_onTime_frequency: 5000,//定时刷新频率
        ds_selectcolumns: [],//根据数据源选择表字段
        ds_custom_data: "",//自定义数据
        ds_graph: [],
        ds_columns: [],//数据源字段
        ds_animation: true,//动画效果
        ds_series_animationDuration: 1000,//动画时长
        ds_series_animationEasing: 'cubicOut',//动画缓存
        ds_background_color: "",//饼状图背景颜色
        ds_series_type: "graph",//系列类型
        ds_graph_categoriesCfg: [{
            "name": "层级1",
            "symbol": "circle",
            "symbolSize": 50,
            "itemStyle_color": "rgba(166, 220, 231, 1)",
            "label_show": true,
            "label_color": "rgba(67, 157, 203, 1)",
            "itemStyle_shadowBlur": "5",
            "itemStyle_shadowColor": "rgba(193, 192, 235, 1)",
            "label_position": "inside",
            "label_fontSize": "15"
        }, {
            "name": "层级2",
            "itemStyle_symbol": "circle",
            "itemStyle_symbolSize": 25,
            "itemStyle_color": "rgba(227, 176, 209, 1)",
            "symbolSize": "25",
            "symbol": "circle",
            "label_show": true,
            "label_color": "rgba(224, 83, 135, 1)",
            "itemStyle_shadowBlur": "5",
            "itemStyle_shadowColor": "rgba(224, 163, 207, 1)",
            "label_position": "bottom",
            "label_fontSize": "13"
        }],//节点类目配置

        ds_graph_label_formatter: "/**\n支持使用字符串模板以及回调函数方式，'\\n'可换行。\n" +
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
            "**/ \"{b}\"",
        //图形属性
        ds_graph_heigth: '100%',
        ds_graph_width: '100%',
        ds_graph_left: '50',
        ds_graph_top: '10',
        ds_graph_roam: true,
        ds_graph_layout: 'force',
        ds_graph_draggable: false,
        ds_graph_circular_rotateLabel: false,
        ds_graph_force_repulsion: 500,
        ds_graph_force_gravity: 0.1,
        ds_graph_lineStyle_color: 'rgba(54, 202, 231, 1)',
        ds_graph_lineStyle_width: 2,
        ds_graph_lineStyle_type: 'solid',
        ds_graph_lineStyle_shadowBlur: 5,
        ds_graph_lineStyle_shadowColor: 'rgba(225, 186, 186, 1)',
        ds_graph_lineStyle_shadowOffsetX: 0,
        ds_graph_lineStyle_shadowOffsetY: 0,

        ds_data_limit_before: "", //数据显示限制条数 前n条
        ds_data_limit_after: "",//数据显示限制条数 后n条
        ds_data_condition: [],//数据显示条件
        /*事件*/
        ds_load_success: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",//加载完成事件
        ds_before_setOption: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:图形配置项",//设置option前事件
        ds_graph_click: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_graph_dbclick: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
    }

    return $.extend(baseConfig, privateConfig);
}

/**
 * 组件注册
 */

function registerGraph() {
    Vue.component('drag_graph', {
        props: ["type", "info"],
        created: function () {
            debugger
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
        watch: {
            //容器大小发生改变刷新饼状图
            computed_resize(curVal, oldVal) {
                debugger
                var temp = temporary[this.info.ds_id + "_dsChart"];
                setTimeout(function () {
                    temp.resize()
                }, 10)

            },
        },
        data: function () {
            return {
                isFirstCreated: true,//是否为初次创建
                multiple: this.info.ds_multiple,
                hide: "y-hide",
                refdate: Date.parse(new Date())
            }
        },
        //计算属性
        computed: {
            // 自动调整饼状图位置
            computed_resize: function () {
                return {
                    height: this.info.ds_height,
                    width: this.info.ds_width
                }
            },
            computed_option: function () {
                var refdateStr=`${this.refdate}_change`;
                var option = buildGraphOption(getGraphModel(this.info), this.info, this.info.ds_graph);
                this.$nextTick(function () {
                    if (this.isFirstCreated === true) {
                        this.isFirstCreated = false;
                        temporary[this.info.ds_id + "_isFirstCreated"] = false;
                        temporary[this.info.ds_id + "_dsChart"] = echarts.init(document.getElementById(this.info.ds_id + "_graph"));
                        $(`#${this.info.ds_id}_graph`).removeAttr("_echarts_instance_");
                        bindGraphEvent(temporary[this.info.ds_id + "_dsChart"], this.info);
                    }
                    //设置option前事件
                    if (this.info.ds_before_setOption) {
                        $DS.eval(this.info.ds_before_setOption, this.info, option);
                    }
                    temporary[this.info.ds_id + "_computedOption"] = option;
                    temporary[this.info.ds_id + "_dsChart"].clear();
                    temporary[this.info.ds_id + "_dsChart"].setOption(temporary[this.info.ds_id + "_computedOption"]);
                    console.log(JSON.stringify(option));
                    $DS.echart.setTimeRefresh(this.info);
                });
                return "";
            },

            computed_graphname: function () {
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
            selectGraphColBySource: selectGraphColBySource,//根据数据源选择字段
        },
        template: util.getModelHtml("drag_graph")
    })
}

//------------------------------------------------------事件----------------------------------------

/**
 * 绑定事件
 * @param instance chart实例
 * @param info
 */
function bindGraphEvent(instance, info) {
    //点击事件
    instance.on('click', function (param) {

        if (info.ds_graph_click) {
            //event 转json报错
            delete param.event;
            $DS.eval(info.ds_graph_click, info, param);
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
        if (info.ds_graph_dbclick) {
            $DS.eval(info.ds_graph_dbclick, info, param);
        }

        //推送参数
        $DS.dealPms(info, [param]);
        //触发其他控件刷新数据
        if (info.ds_trigger && info.ds_trigger.length > 0) {
            let self = info.ds_trigger.find(item => item === info.ds_id);
            if (self) temporary[info.ds_id + "_loadSelf"] = true;
            triggerComps(info.ds_trigger, $DS.getCtrlType(info.ds_id), info.ds_id);
        }
    });

}


/**
 * 构建关系图
 * @param model
 * @param info
 * @param result
 */
function buildGraphOption(model, info, result) {
    debugger
    try {
        //取数据
        let graphData = [];
        if (result && info.ds_datasource && info.ds_selectcolumns.length > 0) {
            result = setDataLimit(result, info);
            //构造data模板
            let dmObj = $DS.echart.getDM(info);
            //默认取第一维度为名称字段, 第一度量为数据字段
            let [valField, nameField] = [dmObj.MEASURE[0]?.FIELD_NAME ? dmObj.MEASURE[0].FIELD_NAME : '', dmObj.DIMENSION[0]?.FIELD_NAME ? dmObj.DIMENSION[0].FIELD_NAME : ''];
            graphData = [handleData(result, info, 0, valField, nameField)];
        }
        //自定义数据
        else if (info.ds_custom_data) {
            graphData = [handleData(info.ds_custom_data, info, 0, 'name', 'value')];
        }
        //默认数据
        else {
            graphData = [handleData(getDefaultGraphData(), info, 0, 'value', 'name')];
        }
        //设置基础option
        let option = $DS.echart.setBaseOption(model, {series_data: graphData}, info);
        option.series[0].links = buildLinks(graphData[0], []);
        return option;
    } catch (e) {
        console.error('构建关系图异常' + e);
        return [];
    }
}

/**
 * 构造数据模板
 * @param data
 * @param info
 * @param level 层级
 * @param valField 度量字段
 *  @param nameField 度量字段
 * @returns {*}
 */
function handleData(data, info, level, valField, nameField) {

    function getSeriesData(data, info, level, valField, nameField) {
        return data.map(item => {
            item.value = item[valField];
            item.name = item[nameField];
            item.category = level % info.ds_graph_categoriesCfg.length;//使用的类目index
            if (item.children) {
                item.children = getSeriesData(item.children, info, level + 1, valField, nameField);
            }
            return item;
        });
    }

    let seriesData = getSeriesData(data, info, level, valField, nameField);

    return $DS.util.childrenToList(seriesData, 'children', []);

}

/**
 * 构造links
 * @param data
 * @param links
 * @returns {*}
 */
function buildLinks(data, links) {
    for (let row of data) {
        if (row?.children?.length > 0) {
            pushLinks(row, links)
        }
    }

    function pushLinks(row, links) {
        for (let child of row.children) {
            links.push({source: row.name, target: child.name});
            if (child?.children?.length > 0) {
                pushLinks(child, links);
            }
        }
        return links;
    }

    return links;
}


//层级分类设置
function getCategoriesCfg(info) {
    try {
        let cfg = info.ds_graph_categoriesCfg ? info.ds_graph_categoriesCfg : [];
        return cfg.map((item, index) => {
            let newItem = {name: index};
            for (let proName in item) {
                let continueCons = ['LAY_CHECKED', '', '_UUID', 'LAY_TABLE_INDEX', 'symbol', 'symbol_image']
                if (continueCons.includes(proName)) continue;
                let nameArr = proName.split('_');
                $DS.util.setObjVal(newItem, nameArr, (item[proName] ?? '') == '' ? '' : item[proName])
            }
            //设置节点图标
            if(item.symbol_image)
                $DS.util.setObjVal(newItem, ['symbol'], (item.symbol_image ?? '') == '' ? '' : `image://${item.symbol_image}`)
            else
                $DS.util.setObjVal(newItem, ['symbol'], (item.symbol ?? '') == '' ? '' : item.symbol)
            return newItem;
        })
    } catch (e) {
        console.error('设置节点类目配置异常: ' + e);
        return [];
    }

}


//设置显示数据显示
function setDataLimit(result, info) {
    let num = info.ds_data_limit_after;
    let position = 'after';
    if (info.ds_data_limit_before) {
        num = info.ds_data_limit_before;
        position = 'before'
    }
    if (result && result.length > 0 && num && num > 0 && result.length > num) {
        if (position === 'before') {
            result = result.slice(0, num);
        } else if (position === "after") {
            result = result.slice(result.length - num, result.length);
        }
    }
    //根据显示条件过滤数据
    if (info.ds_data_condition && info.ds_data_condition.length > 0) {
        result = $DS.util.filterDataByCondition(result,info.ds_data_condition);
    }
    return result;
}


/**
 * 饼状图颜色
 */
function graphColors(info, event) {
    var cfg = info.ds_input;
    $DS.openCfgTable([
        {
            field: "color",//**使用颜色
            title: "颜色",
            width: 1,
            codeType: "color",
            defaultval: "#5470c6"
        }], cfg, function (data, key) {
        data = JSON.parse(data);
        var colors = [];
        for (var i in data) {
            colors.push(data[i].color)
        }
        $DS.getCtrlById(info.ds_pid).info[info.ds_id] = colors;
        info.ds_input = data;
    }, "90%", "80%", "选择颜色", {id: info.ds_pid})
}


/**
 * 选择字段打开页面
 */
function selectGraphColBySource(event) {
    var info = $DS.getCtrlById(event.ds_pid).info;
    if (!info.ds_datasource) {
        console.error("未设置数据源");
        if (event && event.stopPropagation) { // w3c标准
            event.stopPropagation();
        } else { // IE系列 IE 678
            event.cancelBubble = true;
        }
    } else {

        info.ds_columns = Object.values($DS.getSourceById(info.ds_datasource).fieldInfo);//每次获取最新的数据
        var sourceCols = $DS.util.clone(info.ds_columns);//数据源字段
        var selectCols = $DS.util.clone(info.ds_selectcolumns);//当前控件已选择字段
        var sid = Date.parse(new Date());
        var params = {
            sourceCols: sourceCols,
            selectCols: selectCols,
            ctrlId: info.ds_id
        };
        window.top[sid] = params;
        var url = $DS.util.getProjectName() + "/freeForm/manage/condi/selectEchartsColumns.html?sid=" + sid;
        var args = {
            hideTit: false, time: '', beginClose: '', callBack: function () {
                $DS.loadCtrl($DS.getCtrlById(VUECFG.ctrlId).info.ds_ctrlname)
            }
        }
        $DS.showPage(url, "选择字段", "70%", "90%", args, false);
    }
}


/**
 * 设置数据
 * @param id
 */
function setGraphData(id, val, cache) {
    debugger
    //获取数据源信息
    var source = getSourceById(VUECFG.groupObj[id]);
    var ctrl = $DS.getCtrlById(id).info;
    ctrl.ds_searchdata = "";
    if (val) {
        if (ctrl.ds_group_fields && ctrl.ds_group_fields.length > 0 && ctrl.ds_group_cfg && ctrl.ds_group_cfg.length > 0) {
            val = $DS.util.buildGroupData($DS.util.clone((val.rows) ? (val.rows) : val), ctrl.ds_group_fields, ctrl.ds_group_cfg)
        }
        ctrl['ds_graph'] = "";
        ctrl['ds_graph'] = (val.rows) ? (val.rows) : val;
        if (source) {
            //记录当前数据源id 切换数据源时修改 并置空 ds_selectcolumns
            if (ctrl['ds_sourceId'] && ctrl['ds_sourceId'] != source.sourceId) {
                ctrl['ds_selectcolumns'] = [];//控件已选择的列置空
                if (temporary.echarsCtrlDM) {
                    delete temporary.echarsCtrlDM[ctrl.ds_id];
                }
            }
            ctrl['ds_sourceId'] = source.sourceId;
            ctrl['ds_columns'] = Object.values(source.fieldInfo);
        }
    } else {
        ctrl['ds_columns'] = [];//数据源列信息
        ctrl['ds_graph'] = [];
        ctrl['ds_selectcolumns'] = [];//控件已选择的列置空
    }
}


/**
 * 通过控件id取值
 * @param id
 * @returns {*|string}
 */
function getGraphVal(id) {
    var ctrl = $DS.getCtrlById(id);
    if (!ctrl) console.error("【ID为" + id + "】的控件不存在!");
    return ctrl.info.ds_graph;
}

/**
 * 清空数据
 * @param ctrl
 */
function clearGraphVal(ctrl) {
    ctrl.info.ds_graph = "";
    ctrl.info.ds_columns = [];
    ctrl.info.ds_selectcolumns = [];
    ctrl.info.ds_custom_data = "";
}

//默认数据
function getDefaultGraphData() {
    return [
        {
            name: "root1",
            value: 100,
            children: [
                {name: 'child1', value: 50},
                {name: 'child2', value: 50},
                {name: 'child3', value: 50},
                {name: 'child4', value: 50},
                {name: 'child5', value: 50},
            ]
        }];
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


/**
 * 获取模板
 * @return {*}
 */
function getGraphModel(info) {
    let model = chartsBaseModel.getEchartsModelByName(["title", "tooltip", "toolbox"]);

    let graphModel = {
        backgroundColor: 'ds_background_color|STRING',
        series: [{
            type: 'graph',
            height: 'ds_graph_heigth|NUMBER',
            width: 'ds_graph_width|NUMBER',
            left: 'ds_graph_left|STRING',
            top: 'ds_graph_top|STRING',
            layout: 'ds_graph_layout|STRING',//'ds_graph_radial|STRING', circular 环形布局,force 采用力引导布局
            roam: 'ds_graph_roam|BOOLEAN',//是否开启鼠标缩放和平移漫游
            draggable: 'ds_graph_draggable|BOOLEAN',//节点是否可拖拽，只在使用力引导布局的时候有用。
            label: {
                formatter: 'ds_graph_label_formatter|FUNCTION'
            },
            circular: {
                rotateLabel: 'ds_graph_circular_rotateLabel|BOOLEAN',//环形布局是否旋转标签
            },
            force: {
                initLayout: 'circular',
                repulsion: 'ds_graph_force_repulsion|NUMBER',//节点之间的斥力因子 值越大则斥力越大 50
                gravity: 'ds_graph_force_gravity|FLOAT',//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。0.1
            },
            //层级分类设置
            categories: getCategoriesCfg(info),
            lineStyle: {
                color: 'ds_graph_lineStyle_color|STRING',//线颜色
                width: 'ds_graph_lineStyle_width|NUMBER',//线宽度
                type: 'ds_graph_lineStyle_type|STRING',//线类型
                shadowBlur: 'ds_graph_lineStyle_shadowBlur|NUMBER',//阴影
                shadowColor: 'ds_graph_lineStyle_shadowColor|STRING',//阴影颜色
                shadowOffsetX: 'ds_graph_lineStyle_shadowOffsetX|NUMBER',
                shadowOffsetY: 'ds_graph_lineStyle_shadowOffsetY|NUMBER'

            },
        }],
        ds_isRefresh_onTime: 'ds_isRefresh_onTime|BOOLEAN',
        ds_refresh_onTime_frequency: 'ds_refresh_onTime_frequency|NUMBER'
    };

    return $.extend(model, graphModel);
}


/**
 * 配置右侧属性
 */
function showPropertyGraph(change) {
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
        ds_select: $graph.type,
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

    //饼状图背景颜色
    var ds_background_color = getProInfoByObj("color", {
        ds_id: "ds_background_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "背景颜色",
        ds_name: "ds_background_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "rgba(128, 128, 128,1)",
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

    //----------------------★数据源---------------------------------------------------
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
        ds_input_focus: "selectGraphColBySource",
        ds_readonly: true,
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(ds_selectcolumns);

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
    })
    cfg.push(ds_out_padding);
    //-------------------★组件布局--------------------------------------------------
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
    })
    cfg.push(ds_out_margin);

    //★标题
    cfg = chartsBasePro.getBaseTitlePro(cfg, "关系图");


    //★悬浮框
    cfg = chartsBasePro.getBaseTooltipPro(cfg, "关系图");

    //★工具栏
    cfg = chartsBasePro.getBaseToolboxPro(cfg, "关系图");

    //-----------------------★图形属性----------------------------------

    var ds_graph_heigth = getProInfoByObj("input", {
        ds_id: "ds_graph_heigth",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "图形高度",
        ds_placeholder: "数值或百分比",
        ds_input: "100%",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_name: "ds_graph_heigth",
        ds_ispro: true,
        group1: "图形属性",
    })
    cfg.push(ds_graph_heigth);

    var ds_graph_width = getProInfoByObj("input", {
        ds_id: "ds_graph_width",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "图形宽度",
        ds_placeholder: "数值或百分比",
        ds_input: "100%",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_name: "ds_graph_width",
        ds_ispro: true,
        group1: "图形属性",
    })
    cfg.push(ds_graph_width);
    //距左
    var ds_graph_left = getProInfoByObj("input", {
        ds_id: "ds_graph_left",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "距左",
        ds_placeholder: "数值或百分比",
        ds_input: "50",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_name: "ds_graph_left",
        ds_ispro: true,
        group1: "图形属性",
    })
    cfg.push(ds_graph_left);

    // 距上  :'10',
    var ds_graph_top = getProInfoByObj("input", {
        ds_id: "ds_graph_top",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "距上",
        ds_placeholder: "数值或百分比",
        ds_input: "10",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_name: "ds_graph_top",
        ds_ispro: true,
        group1: "图形属性",
    })
    cfg.push(ds_graph_top);
    //是否开启平移缩放
    var ds_graph_roam = getProInfoByObj("switch", {
        ds_id: "ds_graph_roam",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否开启平移缩放",
        ds_name: "ds_graph_roam",
        ds_switch: true,
        ds_ispro: true,
        group1: "图形属性",
    })
    cfg.push(ds_graph_roam);


    //节点类目配置
    var ds_graph_categoriesCfg = getProInfoByObj("input", {
        ds_id: "ds_graph_categoriesCfg",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "节点配置",
        ds_placeholder: "从根节点开始,根据层级依次设置",
        ds_input: [],
        ds_name: "ds_graph_categoriesCfg",
        ds_ispro: true,
        ds_input_focus: "categoriesCfg",
        ds_valformat: "JSON",
        group1: "图形属性",
        group2: "节点样式",
    });
    cfg.push(ds_graph_categoriesCfg);


    var ds_graph_label_formatter = getProInfoByObj("jseditor", {
        ds_id: "ds_graph_label_formatter",
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
        ds_name: "ds_graph_label_formatter",
        ds_ispro: true,
        ds_savedb: false,
        group1: "图形属性",
        group2: "标签富文本"
    })
    cfg.push(ds_graph_label_formatter);

    //布局类型
    var ds_graph_layout = getProInfoByObj("select", {
        ds_id: "ds_graph_layout",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "布局类型",
        ds_placeholder: "布局类型",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_options:
            [
                {value: "circular", label: "环形布局"},
                {value: "force", label: "引力布局"}
            ],
        ds_select: 'force',
        ds_name: "ds_graph_layout",
        ds_ispro: true,
        group1: "图形属性",
    })
    cfg.push(ds_graph_layout);


    // 是否旋转标签:false,
    var ds_graph_circular_rotateLabel = getProInfoByObj("switch", {
        ds_id: "ds_graph_circular_rotateLabel",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否旋转标签",
        ds_name: "ds_graph_circular_rotateLabel",
        ds_switch: false,
        ds_ispro: true,
        group1: "图形属性",
        group2: "环形布局"
    })
    cfg.push(ds_graph_circular_rotateLabel);

    // 是否可拖拽 draggable:true,
    var ds_graph_draggable = getProInfoByObj("switch", {
        ds_id: "ds_graph_draggable",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否可拖拽",
        ds_name: "ds_graph_draggable",
        ds_switch: true,
        ds_ispro: true,
        group1: "图形属性",
        group2: "引力布局"
    })
    cfg.push(ds_graph_draggable);

    //斥力因子   :50,
    var ds_graph_force_repulsion = getProInfoByObj("input", {
        ds_id: "ds_graph_force_repulsion",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "斥力因子",
        ds_placeholder: "节点之间的斥力因子,值越大则斥力越大。",
        ds_input: 500,
        ds_name: "ds_graph_force_repulsion",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "图形属性",
        group2: "引力布局"
    })
    cfg.push(ds_graph_force_repulsion);

    //引力因子
    var ds_graph_force_gravity = getProInfoByObj("input", {
        ds_id: "ds_graph_force_gravity",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "引力因子",
        ds_placeholder: "0~1,该值越大节点越往中心点靠拢。",
        ds_input: 0.1,
        ds_name: "ds_graph_force_gravity",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "图形属性",
        group2: "引力布局"
    })
    cfg.push(ds_graph_force_gravity);

    //连接线颜色
    var ds_graph_lineStyle_color = getProInfoByObj("color", {
        ds_id: "ds_graph_lineStyle_color",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "连接线颜色",
        ds_name: "ds_graph_lineStyle_color",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "rgba(54, 202, 231, 1)",
        group1: "图形属性",
        group2: "连接线"
    })
    cfg.push(ds_graph_lineStyle_color);

    //连接线宽度
    var ds_graph_lineStyle_width = getProInfoByObj("input", {
        ds_id: "ds_graph_lineStyle_width",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "连接线宽度",
        ds_placeholder: "",
        ds_input: 2,
        ds_name: "ds_graph_lineStyle_width",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "图形属性",
        group2: "连接线"
    })
    cfg.push(ds_graph_lineStyle_width);

    //连接线类型
    var ds_graph_lineStyle_type = getProInfoByObj("select", {
        ds_id: "ds_graph_lineStyle_type",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "连接线类型",
        ds_placeholder: "连接线类型",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_options:
            [{value: "solid", label: "实线"},
                {value: "dashed", label: "虚线"},
                {value: "dotted", label: "点"}
            ],
        ds_select: 'solid',
        ds_name: "ds_graph_lineStyle_type",
        ds_ispro: true,
        group1: "图形属性",
        group2: "连接线"
    })
    cfg.push(ds_graph_lineStyle_type);

    //连接线阴影大小
    var ds_graph_lineStyle_shadowBlur = getProInfoByObj("input", {
        ds_id: "ds_graph_lineStyle_shadowBlur",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "连接线阴影大小",
        ds_placeholder: "连接线阴影大小",
        ds_input: 5,
        ds_name: "ds_graph_lineStyle_shadowBlur",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "图形属性",
        group2: "连接线"
    })
    cfg.push(ds_graph_lineStyle_shadowBlur);

    //连接线阴影颜色
    var ds_graph_lineStyle_shadowColor = getProInfoByObj("color", {
        ds_id: "ds_graph_lineStyle_shadowColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "连接线阴影颜色",
        ds_name: "ds_graph_lineStyle_shadowColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "rgba(225, 186, 186, 1)",
        group1: "图形属性",
        group2: "连接线"
    })
    cfg.push(ds_graph_lineStyle_shadowColor);

    //阴影横向偏移量
    var ds_graph_lineStyle_shadowOffsetX = getProInfoByObj("input", {
        ds_id: "ds_graph_lineStyle_shadowOffsetX",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "阴影横向偏移量",
        ds_placeholder: "",
        ds_input: 1,
        ds_name: "ds_graph_lineStyle_shadowOffsetX",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "图形属性",
        group2: "连接线"
    })
    cfg.push(ds_graph_lineStyle_shadowOffsetX);

    // 阴影纵向偏移量
    var ds_graph_lineStyle_shadowOffsetY = getProInfoByObj("input", {
        ds_id: "ds_graph_lineStyle_shadowOffsetY",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "阴影纵向偏移量",
        ds_placeholder: "",
        ds_input: 1,
        ds_name: "ds_graph_lineStyle_shadowOffsetY",
        ds_valformat: 'NUMBER',
        ds_ispro: true,
        group1: "图形属性",
        group2: "连接线"
    })
    cfg.push(ds_graph_lineStyle_shadowOffsetY);


    //点击事件
    var ds_graph_click = getProInfoByObj("jseditor", {
        ds_id: "ds_graph_click",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "点击事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_graph_click",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_graph_click);

    //双击事件
    var ds_graph_dbclick = getProInfoByObj("jseditor", {
        ds_id: "ds_graph_dbclick",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "双击事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_graph_dbclick",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_graph_dbclick);


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
                    if (proArr[p].info["ds_show"])
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

//====================================属性相关事件=============================================================================================

/**
 * 节点类目设置
 * @param info
 */
function categoriesCfg(info) {
    let fields = [
        {
            field: "name",//**使用颜色
            title: "类目名称",
            width: 0.2,
            edit: "text",
        }, {
            field: "symbol",//**使用颜色
            title: "节点标记的图形",
            width: 0.15,
            codeType: "select",
            defaultval: 'circle',
            code: [{name: '无', value: 'none'}, {name: '圆形', value: 'circle'}, {
                name: '方形',
                value: 'rect'
            }, {name: '圆角方形', value: 'roundRect'}, {name: '圆角方形', value: 'roundRect'}, {name: '箭头', value: 'arrow'}]
        },
        {
            field: "symbol_image",//**使用颜色
            title: "节点图片(优先使用此属性)",
            width: 0.15,
            codeType: "image",
        },
        {
            field: "symbolSize",
            title: "节点大小",
            width: 0.15,
            edit: "text",
            defaultval: 12
        }, {
            field: "itemStyle_color",
            title: "节点颜色",
            width: 0.15,
            codeType: "color",
            defaultval: '#00ADD0'
        }, {
            field: "itemStyle_borderColor",
            title: "边框颜色",
            width: 0.15,
            codeType: "color",
            defaultval: '#008baa'
        }, {
            field: "itemStyle_borderWidth",
            title: "边框宽度",
            width: 0.15,
            edit: "text",
            defaultval: '2'
        }, {
            field: "itemStyle_shadowBlur",
            title: "阴影大小",
            width: 0.15,
            edit: "text",
            defaultval: '0'
        }, {
            field: "itemStyle_shadowColor",
            title: "阴影颜色",
            width: 0.15,
            codeType: "color",
            defaultval: '#006980'
        }, {
            field: "label_show",
            title: "是否显示标签",
            width: 0.1,
            codeType: "switch",
            defaultval: true,
            code: [{
                name: "显示",
                value: true
            }, {
                name: "不显示",
                value: false
            }]
        }, {
            field: "label_color",
            title: "标签颜色",
            width: 0.15,
            codeType: "color",
            defaultval: '#ffffff'
        }, {
            field: "label_fontSize",
            title: "标签字体大小",
            width: 0.15,
            edit: "text",
            defaultval: '12'
        }, {
            field: "label_position",
            title: "标签位置",
            width: 0.15,
            codeType: "select",
            defaultval: 'inside',
            code: [{
                name: "top",
                value: 'top'
            }, {
                name: "left",
                value: 'left'
            }, {
                name: "right",
                value: 'right'
            }, {
                name: "bottom",
                value: 'bottom'
            }, {
                name: "inside",
                value: 'inside'
            }]
        }]
    let pInfo = $DS.getCtrlById(info.ds_pid).info;
    $DS.openCfgTable(fields, pInfo.ds_graph_categoriesCfg, function (data) {
        info.ds_input = data;
        pInfo.ds_graph_categoriesCfg = JSON.parse(data);
    }, '95%', '90%', '节点类目配置,依据层级依次设置')
}


