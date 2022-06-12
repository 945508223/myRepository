/**
 * 加载完成后 修改formatter
 * @param option
 * @param index
 */
//"[name|内圈,名称{b}],百分比 {d}||系列名:  {a},名字1:  {b},名字2:  {name0},数据:  {value},百分比:  {d}"
//[name|内圈,系列名:  {a}],名字1:  {b},数据:{c}||外圈名字1:{b},名字2:  {EXP_FUNC_NAME1},数据:  {c},[percent|百分比:  {d}]
var oldLabelFormatter = [];
loadAfterFormatter = function (option, element) {
    //判断是否开启标签格式属性
    if (!(element.attr("dv_loadafterformatter"))) {
        return
    }

    //判断是否开启提示框格式属性
    if (!(element.attr("dv_loadafterTtformatter"))) {
        return
    }

    //每次执行清空
    oldLabelFormatter = [];
    var labelFormatter = element.attr("dv_loadafterformatter");
    var labelFormatterArr = labelFormatter.split("||");
    //一个
    if (labelFormatterArr.length == 1) {
        oldLabelFormatter[0] = labelFormatterArr[0];
        for (let i = 0; i < option.series.length; i++) {

            if (!(option.series[i].label)) {
                option.series[i].label = {}
            }
            //重新设置标签formatter
            if (option.series[i].type == "bar" || option.series[i].type == "line") {
                option.series[i].label.formatter = setLabelFormatter
            } else {
                option.series[i].label.normal.formatter = setLabelFormatter
            }
        }
    } else {
        //处理数据为空 情况
        if (labelFormatterArr.length != option.series.length) {
            return;
        }
        //如果多个则逐一进行修改
        for (let i = 0; i < labelFormatterArr.length; i++) {
            oldLabelFormatter.push(labelFormatterArr[i]);
            if (option.series[i].type == "bar" || option.series[i].type == "line") {
                option.series[i].label.formatter = setLabelFormatter
            } else {
                option.series[i].label.normal.formatter = setLabelFormatter
            }
        }
    }
    var myChart = charts[element.attr("id")];
    myChart.setOption(option)
    charts[element.attr("id")] = myChart;
    options[element.attr("id")] = option
}


/**
 * 设置标签所需要的回调函数
 * @param param
 * @returns {string}
 */
setLabelFormatter = function (param) {
    var index = 0;
    if (oldLabelFormatter.length > 1) {
        index = param.seriesIndex
    }
    // console.log(JSON.stringify(param))
    //todo 区分不同类型series 数据结构的不同处理
    var filedMap = {
        "a": "seriesIndex",
        "b": "name",
        "c": "value",
        "d": "percent"
    };
    //用于切分{}获取传递的值
    var reg = new RegExp('(?<=\{)[0-9a-zA-Z_]+(?=\})', "g");
    //解析原来标签formatter 先按照换行符号进行切割
    var formatterArr = oldLabelFormatter[index].split(",");
    //记录新的formatter的数组
    var newFormatterArr = [];
    //处理切割后的字符串 获取 {}中的值
    for (let j = 0; j < formatterArr.length; j++) {
        //处理多个换行
        if (formatterArr[j] == "") {
            newFormatterArr.push("\n");
            continue;
        }
        //通过正则表达式获取{}中的内容
        var dataArr = formatterArr[j].match(reg); //显示的数据字符数组  a b
        if (dataArr == undefined) {
            newFormatterArr.push(formatterArr[j] + "\n");
            continue;
        }
        //将输入的值与param中存放的进行比对 相同则去除值 替换掉formatter中的字符串为数据
        var _formatter = "";
        for (let n = 0; n < dataArr.length; n++) {
            //处理a系列名  d 百分比 特殊字段
            if (filedMap[dataArr[n]]) {
                var filed = filedMap[dataArr[n]]
                //如果是系类名
                if (filed == "seriesIndex" && n == 0) {
                    _formatter = formatterArr[j].replace("{" + dataArr[n] + "}", (param.seriesIndex))
                    continue;
                } else if (dataArr[n] == "seriesIndex") {
                    _formatter = _formatter.replace("{" + dataArr[n] + "}", (param.seriesIndex))
                    continue;
                }
                //如果是百分比
                if (filed == "percent" && n == 0) {
                    _formatter = formatterArr[j].replace("{" + dataArr[n] + "}", (param.percent + "%"))
                    continue;
                } else if (filed == "percent") {
                    _formatter = _formatter.replace("{" + dataArr[n] + "}", (param.percent + "%"))
                    continue;
                }
                var _param;
                if (param.seriesType == "pie") {
                    _param = param.data
                } else if (param.seriesType == "bar" || param.seriesType == "line") {
                    _param = param
                }
                for (let key in _param) {
                    if (key == filed && n == 0) {
                        _formatter = formatterArr[j].replace("{" + dataArr[n] + "}", _param[key])
                    } else if (key == filed) {
                        _formatter = _formatter.replace("{" + dataArr[n] + "}", _param[key])
                    }
                }
            } else {
                //处理非a d 的数据  区分不同类型series 的处理
                var _param;
                if (param.seriesType == "pie") {
                    _param = param.data
                } else if (param.seriesType == "bar" || param.seriesType == "line") {
                    _param = param
                }
                for (let key in _param) {
                    if (key == dataArr[n] && n == 0) {
                        _formatter = formatterArr[j].replace("{" + dataArr[n] + "}", _param[key])
                    } else if (key == dataArr[n]) {
                        _formatter = _formatter.replace("{" + dataArr[n] + "}", _param[key])
                    }
                }
            }
        }
        //将新的切分过的formatter存入新formatter数组
        newFormatterArr.push(_formatter)
    }
    //将新的切分过的formatter按照换行拼接成最终的全新formatter
    var newFormatter = newFormatterArr.join("\n");
    //处理富文本
    return (newFormatter.replace(/\[/g, "{")).replace(/\]/g, "}")
};



