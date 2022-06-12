var option = {
    "controlType": "PICTORIALBAR",
    "grid": {"top": "60", "left": "15%", "bottom": "60", "right": "6%"},
    "dataZoom": [],
    "legend": {
        "show": true,
        "x": "left",
        "orient": "horizontal",
        "data": ["预算数"],
        "textStyle": {"fontSize": "12"},
        "top": "90%",
        "left": "2%",
        "borderWidth": "1",
        "icon": "circle"
    },
    "tooltip": {"show": true, "backgroundColor": "#777"},
    "xAxis": [{
        "axisLabel": {"margin": 27.5, "textStyle": {"color": "black", "fontSize": "14"}},
        "data": ["1月", "2月", "3月", "4月", "5月", "6月"],
        "type": "category",
        "position": "bottom"
    }],
    "yAxis": [{"show": true, "axisTick": {"alignWithLabel": true}, "name": "", "type": "value"}],
    "series": [{
        "type": "pictorialBar",
        "name": "预算数",
        "yAxisIndex": 0,
        "data": ["1300.00", "1200.00", "950.00", "1260.00", "1120.00", "520.00"],
        "symbol": "rect",
        "symbolSize": ["15", "5"],
        "symbolRepeat": true,
        "label": {"show": true, "position": "top"},
        "z": 2,
        "itemStyle": {}
    }, {
        "type": "pictorialBar",
        "name": "",
        "yAxisIndex": 0,
        "data": ["1500", "1500", "1500", "1500", "1500", "1500"],
        "symbol": "rect",
        "symbolSize": ["15", "5"],
        "symbolRepeat": true,
        "symbolClip": true,
        "label": {"show": false},
        "z": 1,
        "itemStyle": {"color": "#c7dded"}
    }, {
        "name": "",
        "type": "bar",
        "barGap": "-100%",
        "data": ["1501", "1501", "1501", "1501", "1501", "1501"],
        "barWidth": "25",
        "label": {"show": false},
        "itemStyle": {"color": "rgba(0,0,0,0)", "barBorderColor": "#1d3b8f", "barBorderWidth": "3"},
        "z": 0
    }],
    "title": {
        "textStyle": {"fontSize": "18"},
        "subtextStyle": {"fontWeight": "500"},
        "subtarget": "blank",
        "target": "blank",
        "text": "预算数【按日期(月)划分】"
    },
    "changexy": false,
    "dimNotToMeasure": false,
    "topn": "50",
    "xAxisCache": "[{\"type\":\"category\",\"data\":[\"1月\",\"2月\",\"3月\",\"4月\",\"5月\",\"6月\"],\"position\":\"bottom\"}]",
    "seriesCache": "[{\"type\":\"pictorialBar\",\"name\":\"预算数\",\"yAxisIndex\":0,\"data\":[\"1300.00\",\"1200.00\",\"950.00\",\"1260.00\",\"1120.00\",\"520.00\"]}]",
    "seriesDataExt": {
        "seriesDataExt-symbol": "rect",
        "seriesDataExt-symbolSize": [["15", "5"]],
        "seriesDataExt-symbolRepeat": true,
        "seriesDataExt-label-show": true,
        "seriesDataExt-label-position": "top"
    },
    "opBattery": true,
    "mycolorArr": {},
    "bkHighTwo": "1500",
    "borerHighTwo": "1501",
    "bkColorTwo": "#c7dded"
}

var ser1 = option.series[0]
var ser2 = $.extend({},ser1)

if(ser2.label&&ser2.label.show){
    option.series[1].label.show = false
}
console.log(option)