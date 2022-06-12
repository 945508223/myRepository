//1-3-3百分比标签 ctrl_78120-114116244 1-3-3箭头标签
//绿色箭头 url(http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png) rgb(6,248,251)
//红色箭头 url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png) rgb(221,55,65)
if(data[0].YEAR_SMPERIOD_PERCENT==0){
    arrow.css("display","none")
}
else if(data[0].YEAR_SMPERIOD_PERCENT>0){

    $("#ctrl_78120-114116244").css("color","rgb(6,248,251)")
    arrow.css("display","block")
    arrow.css("background-image","url(http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
}else{
    $("#ctrl_78120-114116244").css("color","rgb(221,55,65)")
    arrow.css("display","block")
    arrow.css("background-image","url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
}






var opt = options["ctrl_712120-182136269"];
var data = opt.series[opt.series.length-1];
for (var i = 0; i < data.length; i++) {
    data[i].toFixed(2)
    console.log(data)
}
alert()
for (let i = 0; i <data.length; i++) {

}

for (var i = 0; i < data.length; i++) {
    debugger
    data[i] = data[i].toFixed(2)
// data[i]= Math.floor(data[i] * 100) / 100
    console.log(data[i])
}
