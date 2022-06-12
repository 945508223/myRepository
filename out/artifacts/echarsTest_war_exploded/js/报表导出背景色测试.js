var count = 0;
var addFlag = true;
setInterval(function () {
    count += randomNum(1, 10)
}, 20000)
var cssStr = `
    .jianbian{
        background:-webkit-linear-gradient(right, #0076ff, #00eaff 40%, #00eaff 40%, #00eaff 20%, #0076ff);/*背景渐变,方向往下，不同颜色的百分比*/
        -webkit-background-clip:text;/*只有webkit内核支持text的剪切模式，背景裁剪，文字外的区域都被裁剪*/
        color:transparent;/*透明*/
    }
    .datagrid-body::-webkit-scrollbar-thumb {
        background: rgba(6,248,251,0)
     }
`

/**
 * 设置CSS
 * @param css
 */
function initCss(css, guid) {
    if (css) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.id = `css_${guid}`;
        if ($(`#css_${guid}`).length == 0) {
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }
}

initCss(cssStr, "jianbian")

//轮播配置
let mapCfg_ = {
    index_: 0,
    time_: 5000,
    intervalKey: '',
}

//定时轮播
function setIntervalChangeColor() {

    mapCfg_.intervalKey = setInterval(function () {

        var map = $DV.getEl("江苏地图");
        var id = map.id;
        let mapIns = charts[id]
        mapIns.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_

        });
        mapIns.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_
        });
        mapIns.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_ == 0 ? 12 : mapCfg_.index_ - 1
        });


        if (mapCfg_.index_ == 12)
            mapCfg_.index_ = 0
        else
            mapCfg_.index_++

    }, mapCfg_.time_)

}

//切换表格数据
function changeGridData_(params) {
    debugger
    changeLeftGrid(params);
    changeRightGrid(params);
    changeSanBaoGrid(params);

}

function changeSanBaoGrid(params) {
    let sanbaoIframe = '';
    if (parent.$DV.getEl('左下_表格') && $(parent.$DV.getEl('左下_表格')).find('iframe') && $(parent.$DV.getEl('左下_表格')).find('iframe')[0]) {
        sanbaoIframe = $(parent.$DV.getEl('左下_表格')).find('iframe')[0].contentWindow;
    }
    if (sanbaoIframe && sanbaoIframe.changeDataByCode) {
        sanbaoIframe.changeDataByCode(mapCfg_.data[params.dataIndex].MOF_DIV_CODE.substr(0, 4))
    }
}

function changeRightGrid(params) {
    let rightframe = '';
    if (parent.$DV.getEl('全省预算编制数网页框') && $(parent.$DV.getEl('全省预算编制数网页框')).find('iframe') && $(parent.$DV.getEl('全省预算编制数网页框')).find('iframe')[0]) {
        rightframe = $(parent.$DV.getEl('全省预算编制数网页框')).find('iframe')[0].contentWindow;
    }
    if (rightframe && rightframe.changeDataByCode) {
        rightframe.changeDataByCode(mapCfg_.data[params.dataIndex].MOF_DIV_CODE.substr(0, 4))
    }
}

function changeLeftGrid(params) {
    let leftIframe = '';
    if (parent.$DV.getEl('右下_表格_网页框') && $(parent.$DV.getEl('右下_表格_网页框')).find('iframe') && $(parent.$DV.getEl('右下_表格_网页框')).find('iframe')[0]) {
        leftIframe = $(parent.$DV.getEl('右下_表格_网页框')).find('iframe')[0].contentWindow;
    }
    if (leftIframe && leftIframe.changeDataByCode) {
        leftIframe.changeDataByCode(mapCfg_.data[params.dataIndex].MOF_DIV_CODE.substr(0, 4))
    }
}

function loadAfter__() {
    debugger
    try {
        var loadAfterInterValKey = setInterval(function () {
            let map = $DV.getEl("江苏地图");
            if (map && options && options[map.id] && charts[map.id]) {
                initPathLine(options[map.id], charts[map.id]);
                /*setTimeout(function () {
                    setIntervalChangeColor();
                    bindEventForMap_(charts[map.id]);
                    mapCfg_.data = deepClone_(options[map.id].series[0].data);
                })*/
                clearInterval(loadAfterInterValKey)
            }
        })
    } catch (e) {
        clearInterval(loadAfterInterValKey)
    }
}


//设置轨迹图
function initPathLine(mapOption, chartIns) {
    debugger
    mapOption.series.push({
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 6, //箭头指向速度，值越小速度越快
            trailLength: 0.7, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 6, //图标大小
            color: 'rgb(234,231,88)'
        },
        lineStyle: {
            normal: {
                color: 'rgba(22,238,249,0.17)',
                width: 1.5, //尾迹线条宽度
                opacity: 0.4, //尾迹线条透明度
                curveness: .3 //尾迹线条曲直度
            }
        },

        data: [
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [117.192941, 34.269397], value: 0}],//徐州
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [119.63, 32.18], value: 0}],//镇江
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [119.14634, 33.507499], value: 0}],//淮安
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [120.28, 31.58], value: 0}],//无锡
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [119.93, 31.75], value: 0}],//常州
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [120.63, 31.3], value: 0}],//苏州
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [120.86, 32.01], value: 0}],//南通
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [119.366487, 34.739529], value: 0}],//连云港
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [120.13, 33.4], value: 0}],//盐城
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [119.43, 32.38], value: 0}],//扬州
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [119.92, 32.49], value: 0}],//泰州
            [{coord: [118.792199, 32.050678], value: 0}, {coord: [118.25, 33.97], value: 0}]//宿迁
        ]
    }, {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke',
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
            },
        },
        symbolSize: function (val) {
            return 7.5;
        },
        itemStyle: {
            normal: {
                color: 'red',
            },
        },
        data: [{
            name: "",
            value: [118.792199, 32.050678, 60]
        }],
    })
    chartIns.setOption(mapOption)
}

//绑定事件
function bindEventForMap_(mapIns) {
    mapIns.on('mouseover', function (params) {
        clearInterval(mapCfg_.intervalKey);
        mapIns.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_ == 0 ? 10 : mapCfg_.index_ - 1
        });
        //changeGridData_(params)

    });

    mapIns.on('mouseout', function () {
        setIntervalChangeColor()
    });
    mapIns.on('highlight', function (params) {
        //debugger
        //changeGridData_(params)
    });

}

//加载完成设置轮播
loadAfter__();


function deepClone_(obj) {
    /**
     * 判别类型
     * @param {} o
     * @return {String}
     */
    function isClass(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    var result, oClass = isClass(obj);
    // 确定result的类型
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);// 递归调用
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

//==================


/**
 * 生成随机整数
 * @param minNum
 * @param maxNum
 * @return {number}
 */
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

/**
 * 精确加
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatAdd(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;

    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));

    //(arg1*m+arg2*m)/m;
    arg1 = floatMul(arg1, m);
    arg2 = floatMul(arg2, m);
    return floatDiv(arg1 + arg2, m)
    // return floatDiv((floatMul(arg1,m)+floatMul(arg2,m)),m)
}

/**
 * 精确减
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatSub(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 精确乘
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatMul(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


/**
 * 精确除
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatDiv(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }

    r1 = Number(arg1.toString().replace(".", ""));

    r2 = Number(arg2.toString().replace(".", ""));
    var result = (r1 / r2) * Math.pow(10, t2 - t1);
    if (result.toString() == "NaN") return 0;
    return result;
}