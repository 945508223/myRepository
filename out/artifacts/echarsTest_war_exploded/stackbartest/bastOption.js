var baseOpt = {
    default_legend_data: ['区域一', '区域二', '区域三'],
    default_xAxis_data: ['年度一', '年度二', '年度三'],
    default_series_data: [
        {
            name: "区域一",
            type: "bar",
            data: [423, 445, 666]
        }, {
            name: "区域二",
            type: "bar",
            data: [1423, 6445, 7777]
        }, {
            name: "区域三",
            type: "bar",
            data: [4423, 5545, 8888]
        }],
    default_mix_legend_data: ['度量一', '度量二'],
    default_mix_xAxis_data: ['年度一', '年度二', '年度三'],
    default_mix_series_data: [
        {
            name: '度量一',
            type: 'bar',
            data: [20, 49, 70]
        }, {
            name: '度量二',
            type: 'line',
            yAxisIndex: 1,
            data: [20, 22, 33]
        }
    ],
    default_liquid_legend_data: {//一个维度时，legend不需要，两个维度时，data数据为第二个维度的类别
        orient: "horizontal",
        x: "left",
        y: "bottom"
    },
    default_liquid_series_data: [{
        name: "数据一",
        value: "0.3"
    }],
    //词云默认
    default_wcloud_series_data: [{
        name: "数据一",
        value: "12355"
    },
        {
            name: "数据二",
            value: "12093"
        },
        {
            name: "数据三",
            value: "8874"
        },
        {
            name: "数据四",
            value: "7427"
        },
        {
            name: "数据五",
            value: "4308"
        },

    ],
    //偏移量
    default_wcloud_offsetData: [
        [6, 63],
        [27, 36],
        [50, 50],
        [74, 68],
        [93, 40]
    ],
    //symbolSize 散点气泡大小
    default_wcloud_symbolSizeData: [57, 67, 77, 67, 55],

    //增强折线图
    default_bline_legend_data: ['税收', '非税'],
    default_bline_xAxis_data: ['1', '2', '3', '4', '5', '6'],
    default_bline_series_data: [{         //第一条折线
        name: '税收',
        type: 'line',
        // smooth: true, //是否平滑
        showAllSymbol: true,

        smooth: true,
        symbol: 'none',
        lineStyle: {
            normal: {
                color: "#2086ff",

            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#6c50f3',
            }
        },
        itemStyle: {
            color: "#6c50f3",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
        },
        tooltip: {
            show: false
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(108,80,243,0.3)'
                },
                    {
                        offset: 1,
                        color: 'rgba(108,80,243,0)'
                    }
                ], false),
                shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 20
            }
        },
        data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02,]
    },
        { 		//第二条折线
            name: '非税',
            type: 'line',
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            smooth: true,//是否平滑
            symbol: 'none',
            lineStyle: {
                normal: {
                    color: "#90FCFF",

                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#00ca95',
                }
            },

            itemStyle: {
                color: "#00ca95",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,202,149,0.3)'
                    },
                        {
                            offset: 1,
                            color: 'rgba(0,202,149,0)'
                        }
                    ], false),
                    shadowColor: 'rgba(0,202,149, 0.9)',
                    shadowBlur: 20
                }
            },
            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14,],
        }],
    barOpt: function () {
        return {
            controlType: "BAR",
            title: {
                text: "",
                subtext: "",
                x: "left"
            },
            tooltip: {//坐标轴指示器
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            grid: {
                left: 130,
                top: 100,
                bottom: 100,
                right: '18%'
            },
            legend: {
                x: "left",
                orient: "vertical",
                data: ['区域一', '区域二', '区域三']
            },
            xAxis: {
                data: ['年度一', '年度二', '年度三'],
                axisLabel: {
                    interval: 0,
                    rotate: 30
                }
            },
            yAxis: [ //y轴为度量
                {
                    //type: 'value',
                    name: '金额',
                    position: 'left',
                    offset: 0
                }
            ],
            series: [
                {
                    name: "区域一",
                    type: "bar",
                    data: [423, 445, 666]
                }, {
                    name: "区域二",
                    type: "bar",
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [1423, 6445, 7777]
                }, {
                    name: "区域三",
                    type: "bar",
                    data: [4423, 5545, 8888]
                }]
        };
    },
    lineOpt: function () {
        return {
            controlType: "LINE",
            title: {
                text: "",
                subtext: "",
                x: "left"
            },
            tooltip: {//坐标轴指示器
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            grid: {
                left: 130,
                top: 70,
                bottom: 40,
                right: '18%'
            },
            legend: {//一个维度时，legend不需要，两个维度时，data数据为第二个维度的类别
                x: "left",
                orient: "vertical",
                data: ['区域一', '区域二', '区域三']
            },
            xAxis: {
                data: ['2015', '2016', '2017', '2018'],  //两个维度时，第一个维度的类别作为x轴
                //data:['喀什地区本级','莎车县','叶城县'], //一个维度时，第一个维度的类别作为x轴
                axisLabel: {
                    interval: 0,
                    rotate: 30
                }
            },
            yAxis: [ //y轴为度量
                {
                    type: 'value',
                    name: '金额',
                    position: 'left',
                    offset: 0
                }
            ],
            series: [
                {
                    name: "区域一", //一个维度时，数据中不要name属性
                    type: "line",
                    data: [423, 445, 776, 900]
                }, {
                    name: "区域二",
                    type: "line",
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'}
                            //{type: 'min', name: '最小值'}
                        ],
                        itemStyle: {

                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: 'red' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'blue' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    data: [3423, 5445, 5976, 5600]
                }, {
                    name: "区域三",
                    type: "line",
                    data: [4423, 5545, 5800, 5900]
                }]
        };
    },
    scatterOpt: function () {
        return {
            controlType: "SCATTER",
            title: {
                text: "",
                subtext: "",
                x: "left"
            },
            tooltip: {//坐标轴指示器
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            grid: {
                left: 130,
                top: 70,
                bottom: 40
            },
            legend: {
                x: "left",
                orient: "vertical",
                data: ['演示维度项1', '演示维度项2', '演示维度项3', '演示维度项4', '演示维度项5']
            },
            xAxis: {
                data: ['演示维度项1', '演示维度项2', '演示维度项3', '演示维度项4', '演示维度项5'],
                axisLabel: {
                    interval: 0,
                    rotate: 30
                }
            },
            yAxis: [ //y轴为度量
                {
                    type: 'value',
                    name: '金额',
                    position: 'left',
                    offset: 0
                }
            ],
            series: [{
                name: "",
                type: "scatter",
                data: [11, 44, 66, 24, 99]
            }]
        };
    },
    mixedOpt: function () {
        return {
            controlType: "MIXED",
            title: {
                text: "",
                subtext: "",
                x: "left"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    /*crossStyle: {
                        color: '#999'
                    }*/
                }
            },
            grid: {
                left: 130,
                top: 100,
                bottom: 100,
                right: '18%'
            },
            legend: {
                data: ['度量一', '度量二']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['年度一', '年度二'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [//两个度量
                {
                    type: 'value',
                    name: '度量一'

                },
                {
                    type: 'value',
                    name: '度量二'

                }
            ],
            series: [
                {
                    name: '度量一',
                    type: 'bar',
                    barWidth: '12',
                    data: [20, 49, 70]
                }, {
                    name: '度量二',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [20, 22, 33]
                },

            ]
        }
    },
    liquidOpt: function () {
        return {
            controlType: "LIQUID",
            title: {
                text: "",
                subtext: "",
                x: "left"
            },
            /*legend: {//一个维度时，legend不需要，两个维度时，data数据为第二个维度的类别
                orient: "horizontal",
                x: "left",
                y: "bottom"
            },*/
            grid: {
                left: 130,
                top: 70,
                bottom: 40,
                right: '18%'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c}"
            },
            series: [{
                radius: '75%',// 大小
                amplitude: '5%',// 波动
                waveLength: '80%',// 波纹
                phase: 'auto',
                period: 'auto',
                shape: 'circle',
                direction: 'right',
                center: ['50%', '50%'],
                //name:"度量名称",
                type: 'liquidFill',
                data: [{
                    name: "数据一",
                    value: "0.3"
                }],
                label: {
                    normal: {
                        //formatter:"{a}\n{b}\nValue: {c}"  //显示在水球图中间的文字，可以是字符串，可以是占位符，也可以是一个函数。
                        //如果使用{a}\n{b}\nValue: {c} ，a代表系列名称，b代表数据名称，c代表数据值。
                        textStyle: {
                            color: '#fff',
                            insideColor: '#fff',
                            fontSize: 36,
                            fontWeight: 'bold',
                            fontFamily: 'Microsoft YaHei'
                        }
                    }
                },
                waveAnimation: true,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear',
                animationDuration: 2000,
                animationDurationUpdate: 1000,
                outline: {
                    show: true,
                    borderDistance: 3,
                    itemStyle: {
                        color: 'transparent',
                        borderColor: '#70b3fd',
                        borderWidth: 2,
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.25)'
                    }
                },

                backgroundStyle: {
                    color: 'transparent'
                },

                itemStyle: {
                    opacity: 0.95,
                    shadowBlur: 50,
                    shadowColor: 'rgba(0, 0, 0, 0.4)'
                },


                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                }
            }]


        }
    },
    wcloudOpt: function () {
        return {
            controlType: "WCLOUD",
            backgroundColor: 'rgba(0,0,0,0)',//'#0e2147'
            grid: {
                show: false,
                top: 10,
                bottom: 10
            },
            xAxis: [{
                gridIndex: 0,
                type: "value",
                show: false,
                min: 0,
                max: 100,
                nameLocation: "middle",
                nameGap: 5
            }],
            yAxis: [{
                gridIndex: 0,
                min: 0,
                show: false,
                max: 100,
                nameLocation: "middle",
                nameGap: 30
            }],

            series: [{
                type: "scatter",
                symbol: "circle",
                symbolSize: 120,
                label: {
                    normal: {
                        show: true,
                        formatter: "{b}",
                        color: "#fff",
                        textStyle: {
                            fontSize: "20"
                        }
                    }
                },
                animationDurationUpdate: 1000,
                animationEasingUpdate: 1000,
                animationDelay: function (idx) {
                    // 越往后的数据延迟越大
                    return idx * 100;
                },
                itemStyle: {
                    normal: {
                        color: "#00acea",
                        borderColor: "#97FFFF"
                    }
                },
                data: getWcloudOptData(baseOpt.default_wcloud_series_data)
            }],
            graphic: [
                {
                    type: 'image',
                    id: 'logo',
                    left: '45%',
                    bottom: '30%',
                    z: -10,
                    bounding: 'raw',
                    origin: [675, 5],
                    //  position: [100, 0], // 平移，默认值为 [0, 0]。
                    style: {
                        //image: img2,
                        width: 120,
                        height: 120,
                        opacity: 0.4
                    }
                },
                {
                    type: 'image',
                    id: 'logo1',
                    right: '14%',
                    bottom: '0',
                    z: -10,
                    bounding: 'raw',
                    origin: [275, 5],
                    style: {
                        //image: img2,
                        width: 80,
                        height: 80,
                        opacity: 0.4
                    }
                },
                {
                    type: 'image',
                    id: 'logo2',
                    left: '10%',
                    bottom: '2%',
                    z: -10,
                    bounding: 'raw',
                    origin: [875, 15],
                    style: {
                        //image: img2,
                        width: 60,
                        height: 60,
                        opacity: 0.4
                    }
                }, {
                    type: 'image',
                    id: 'logo3',
                    left: '36%',
                    bottom: 0,
                    z: -10,
                    bounding: 'raw',
                    origin: [975, 5],
                    style: {
                        //image: img2,
                        width: 40,
                        height: 40,
                        opacity: 0.4
                    }
                },
                {
                    type: 'image',
                    id: 'logo4',
                    left: '32%',
                    bottom: '10%',
                    z: -10,
                    bounding: 'raw',
                    origin: [76, 76],
                    style: {
                        //image: img2,
                        width: 50,
                        height: 50,
                        opacity: 0.4
                    }
                },
                {
                    type: 'image',
                    id: 'logo5',
                    left: '40%',
                    bottom: '35%',
                    z: -10,
                    bounding: 'raw',
                    origin: [76, 76],
                    style: {
                        //image: img2,
                        width: 90,
                        height: 90,
                        opacity: 0.4
                    }
                }]

        }
    },
    blineOpt: function () {
        return {
            controlType: "BLINE",
            color: ['#2086ff', "#90FCFF"],
            backgroundColor: 'rgba(0,0,0,0)',
            legend: {
                orient: 'horizontal',
                type: 'scroll',
                data: ['税收', '非税'],
                top: '150px',
                right: '80px',
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                icon: 'circle',
                itemGap: 10,
                itemWidth: 20,             // 图例图形宽度
                itemHeight: 14

            },
            title: {
                text: '哎呦,不错哦',
                textStyle: {
                    align: 'center',
                    color: '#fff',
                    fontSize: 20,
                },
                top: '5%',
                left: 'center',
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#112885'
                    }
                }
            },
            grid: {
                top: '15%',
                left: '5%',
                right: '5%',
                bottom: '15%',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true
                },
                splitArea: {
                    // show: true,
                    color: '#f00',
                    lineStyle: {
                        color: '#f00'
                    },
                },
                axisLabel: {
                    color: '#2086ff'
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: ['1', '2', '3', '4', '5', '6'],

            }],

            yAxis: [{
                name: '亿元',
                type: 'value',
                min: 0,
                // max: 140,
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    margin: 20,
                    textStyle: {
                        color: '#2086ff',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{         //第一条折线
                name: '税收',
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,

                smooth: true,
                symbol: 'none',
                lineStyle: {
                    normal: {
                        color: "#2086ff",

                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#6c50f3',
                    }
                },
                itemStyle: {
                    color: "#6c50f3",
                    borderColor: "#fff",
                    borderWidth: 3,
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(108,80,243,0.3)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(108,80,243,0)'
                            }
                        ], false),
                        shadowColor: 'rgba(108,80,243, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02,]
            },
                { 		//第二条折线
                    name: '非税',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: "#90FCFF",

                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#00ca95',
                        }
                    },

                    itemStyle: {
                        color: "#00ca95",
                        borderColor: "#fff",
                        borderWidth: 3,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    tooltip: {
                        show: false
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0,202,149,0.3)'
                            },
                                {
                                    offset: 1,
                                    color: 'rgba(0,202,149,0)'
                                }
                            ], false),
                            shadowColor: 'rgba(0,202,149, 0.9)',
                            shadowBlur: 20
                        }
                    },
                    data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14,],
                },
            ]
        }
    },

    default_stackBar_legend_data: ['总收', '税收', '非税'],
    default_stackBar_series_data: [{
        name: '税收',
        type: 'bar',
        stack: 'a',
        label: {
            show: true,
            position: 'insideRight'
        },

        data: [220, 182, 191, 234, 290, 330, 310, 220],
    },
        {
            name: '非税',
            type: 'bar',
            stack: 'a',
            label: {
                show: true,
                position: 'insideRight'
            },
            data:[120, 132, 101, 134, 90, 230, 210, 330],
        },
        {
            name: '总收',
            type: 'bar',
            stack: 'a',
            label: {
                show: true,
                position: 'insideRight'
            },

            data: data[2]
        },],
    default_stackBar_yAxis_data:['句容市', '丹阳市', '扬中市', '高新区', '镇江新区', '丹徒区', '润州区', '京口区'],


    //折叠柱状图
    stackBarOpt: function () {
        return {
            controlType: "STACKBAR",
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['总收', '税收', '非税']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['句容市', '丹阳市', '扬中市', '高新区', '镇江新区', '丹徒区', '润州区', '京口区']
            },
            series: [
                {
                    name: '税收',
                    type: 'bar',
                    stack: 'a',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },

                    data: [220, 182, 191, 234, 290, 330, 310, 220],
                },
                {
                    name: '非税',
                    type: 'bar',
                    stack: 'a',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data:[120, 132, 101, 134, 90, 230, 210, 330],
                },
                {
                    name: '总收',
                    type: 'bar',
                    stack: 'a',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },

                    data: [340,314,292,368,380,560,520,550]
                },
            ]
        }
    }
};

/**
 * 格式化词云数据
 * @param data
 */
function getWcloudOptData(data) {
    //字符串截取
    debugger
    var wordLength = (value) => {
        var ret = ""; //拼接加\n返回的类目项
        var maxLength = 4; //每项显示文字个数
        var valLength = value.length; //X轴类目项的文字个数
        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
        if (rowN > 1) //如果类目项的文字大于3,
        {
            for (var i = 0; i < rowN; i++) {
                var temp = ""; //每次截取的字符串
                var start = i * maxLength; //开始截取的位置
                var end = start + maxLength; //结束截取的位置
                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + "\n";
                ret += temp; //凭借最终的字符串
            }
            return ret;
        } else {
            return value;
        }
    }
    //循环定义series的data值
    var datas = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        //var itemToStyle = datalist[i];

        datas.push({
            name: wordLength(item.name),
            value: baseOpt.default_wcloud_offsetData[i],
            symbolSize: baseOpt.default_wcloud_symbolSizeData[i],
            label: {
                normal: {
                    textStyle: {
                        fontSize: 12,
                        color: '#06F8FB '
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.RadialGradient(0.3, 0.5, 0.7, [{
                        offset: 0,
                        color: "#0D1A55"
                    },
                        {
                            offset: 1,
                            color: "#0D1A55"
                        }
                    ]),
                    opacity: 0.8,
                    shadowBlur: 0,
                    shadowOffsetX: 1,
                    shadowOffsetY: 1
                },

            }
        });
    }
    return datas;
}