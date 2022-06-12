var opt = options["ctrl_710120-83715346"]
console.log(opt)
console.log(opt.series[0].itemStyle.normal)
opt.series[0].itemStyle.normal.label["formatter"] = '{b}:{d}'


function setFormatter(params) {
    var percent = 0;
    var total = 0;
    for (var i = 0; i < params.length; i++) {
        total += params[i].value;
    }
    percent = ((params.value / total) * 100).toFixed(0);
    if (params.name !== '') {
        return  params.name + '\n' + '\n' + '占百分比：' + percent + '%';
    } else {
        return '';
    }
}


opt.series[2].lineStyle["color"]="rgba(0,0,0,0)"

var pie = getElByName("发光嵌图片_饼图");
var opt = options["ctrl_79120-162627814"]
console.log(opt)

var params = opt.series[0].data
setFormatter(params)
/*function setFormatter(params) {
    var percent = 0;
    var total = 0;
    for (var i = 0; i < params.length; i++) {
        total += params[i].value;
    }
    percent = ((params.value / total) * 100).toFixed(0);
    if (params.name !== '') {
        return  params.name + '\n' + '\n' + '占百分比：' + percent + '%';
    } else {
        return '';
    }
}*/
opt.series[0].itemStyle.normal.label["formatter"] =

"var percent = 0;var total = 0;for (var i = 0; i < params.length; i++) " +
    "{total += params[i].value;}percent = ((params.value / total) * 100).toFixed(0);" +
    "if (params.name !== '') {return  params.name + '\n' + '\n' + '占百分比：' + percent + '%';} else {return '';}"

delete opt.series[0].itemStyle.normal.label.formatter