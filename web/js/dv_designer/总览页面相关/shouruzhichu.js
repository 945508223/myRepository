/*

收入
* 左上： 数字：ctrl_624120-175820673  箭头：ctrl_624120-151621353
* 右上： 数字：ctrl_624120-202143695  箭头：ctrl_624120-144213148
* 左下： 数字：ctrl_624120-14419884   箭头：ctrl_624120-144228569
* 右下： 数字：ctrl_624120-175821202  箭头：ctrl_624120-144213390
*
* 上箭头 url("http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png")
* 下箭头 url("http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png")
*
支出
 左上： 数字：ctrl_624120-175820673  箭头：ctrl_624120-151621353
 右上： 数字：ctrl_624120-202143695  箭头：ctrl_624120-144213148
 左下： 数字：ctrl_624120-14419884   箭头：ctrl_624120-144228569
 右下： 数字：ctrl_624120-175821202  箭头：ctrl_624120-144213390

* */
var numIds = [
    "ctrl_624120-175820673",
    "ctrl_624120-202143695",
    "ctrl_624120-14419884",
    "ctrl_624120-175821202"
];
var imageIds = [
    "ctrl_624120-151621353",
    "ctrl_624120-144213148",
    "ctrl_624120-144228569",
    "ctrl_624120-144213390"
];

for (var i = 0; i < numIds.length; i++) {
    var num = $($("#" + numIds[i])[0].children[0]).text();
    if (num >= 0) {
        $("#"+imageIds[i]).css("background-image","url(\"http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png\")")
    }else {
        $("#"+imageIds[i]).css("background-image","url(\"http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png\")")
    }
}


debugger
var num = $($("#ctrl_623120-175614457")[0].children[0]).text()
console.log(num)
if(num>=0){
    debugger
    $($("#ctrl_623120-175614457")[0].children[0]).css("color","#06f8fb")
    $("#ctrl_623120-18826887").css("background-image","url(http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
}else{
    $($("#ctrl_623120-175614457")[0].children[0]).css("color","#ff3d3d")
    $("#ctrl_623120-18826887").css("background-image","url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
}




//收入增幅箭头
debugger
var arrow = $("#ctrl_623120-18826887");
var text = $("#ctrl_623120-175614457")[0].children[0].text();




console.log(data)
if(data[0].YEAR_SMPERIOD_PERCENT==0){
    arrow.css("display","none")
}
else if(data[0].YEAR_SMPERIOD_PERCENT>0){
    $("#ctrl_623120-175614457").css("color","rgb(6,248,251)")
    arrow.css("display","block")
    arrow.css("background-image","url(http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
}else{
    $("#ctrl_623120-175614457").css("color","rgb(221,55,65)")
    arrow.css("display","block")
    arrow.css("background-image","url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
}


