//"url(http://"+FASTDFSURL.result+"/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)"
"url(http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)"
//192.168.1.88:8888


//var newData = Math.floor((data[0].YEAR_SMPERIOD_PERCENT) * -1) * 100 / 100


var mark = true;
//监听数据变化 修改箭头
var num = $("#ctrl_623120-175614457")
num.bind('DOMNodeInserted', function (e) {
    change();
});

//收入增幅箭头
function change() {
    debugger
    var arrow = $("#ctrl_623120-18826887");
    var data = cacheResultData["ctrl_623120-175614457||label"];
    debugger
    if (data == null || data == undefined) {
        arrow.css("display", "none")
    } else if (data[0].YEAR_SMPERIOD_PERCENT == 0) {
        arrow.css("display", "none")
    } else if (data[0].YEAR_SMPERIOD_PERCENT > 0) {
        $("#ctrl_623120-175614457").css("color", "rgb(6,248,251)");
        arrow.css("display", "block");
        arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
    } else {
        //console.log(data[0].YEAR_SMPERIOD_PERCENT)
        /* var text = $($("#ctrl_623120-175614457")[0].children[0]).text();
         if (typeof (text) == "string") {
             text = text.split("%")[0];
             text = text.split("-")[1];
         }
         console.log(text)
         $($("#ctrl_623120-175614457")[0].children[0]).text(text + "%")

         */
        $("#ctrl_623120-175614457").css("color", "rgb(221,55,65)");
        arrow.css("display", "block");
        arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")

    }
}


//收入支出箭头切换
/*
* 左上： 数字：ctrl_624120-175820673  箭头：ctrl_624120-151621353
* 右上： 数字：ctrl_624120-202143695  箭头：ctrl_624120-144213148
* 左下： 数字：ctrl_624120-14419884   箭头：ctrl_624120-144228569
* 右下： 数字：ctrl_624120-175821202  箭头：ctrl_624120-144213390
*
* 上箭头 url("http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png")
* 下箭头 url("http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png")
*
* */
var numIds = [
    "ctrl_624120-175820673",
    "ctrl_624120-202143695",
    "ctrl_624120-14419884",
    "ctrl_624120-175821202"
];
var arrow = [
    "ctrl_624120-151621353",
    "ctrl_624120-144213148",
    "ctrl_624120-144228569",
    "ctrl_624120-144213390"
];
var idMap = {
    "ctrl_624120-175820673": "ctrl_624120-151621353",
    "ctrl_624120-202143695": "ctrl_624120-144213148",
    "ctrl_624120-14419884": "ctrl_624120-144228569",
    "ctrl_624120-175821202": "ctrl_624120-144213390",
}
/*console.log(cacheResultData["ctrl_624120-175820673||label"])
console.log(cacheResultData["ctrl_624120-202143695||label"])
console.log(cacheResultData["ctrl_624120-14419884||label"])
console.log(cacheResultData["ctrl_624120-175821202||label"])*/


//dom绑定监听数据变化 修改箭头
for (var i = 0; i < numIds.length; i++) {
    $("#" + numIds[i]).bind('DOMNodeInserted', function (e) {
        change(this);
    })
}

function change(domNum) {
    debugger
    //获取数据id
    var numId = $(domNum).attr("id");
    //获取箭头对象
    arrowId = idMap[numId];
    var arrow = $("#" + arrowId)
    //arrow =$("#"+ imageIds[i]);
    var data = cacheResultData[numId + "||label"];

    /*if (data[0] == null) {
        arrow.css("display", "none")
    } else*/
    if (data[0] == null || data[0].SMPERIOD_GROWTHRATES == 0) {
        $(domNum).css("color", "rgb(6,248,251)");
        arrow.css("display", "none")
    } else if (data[0].SMPERIOD_GROWTHRATES > 0) {
        $(domNum).css("color", "rgb(6,248,251)");
        arrow.css("display", "block")
        arrow.css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
    } else {
        debugger
        console.log(data[0].SMPERIOD_GROWTHRATES);
        //var newData = numberFormatters(data[0].SMPERIOD_GROWTHRATES,2)*-1;
        // var newData = Math.floor((data[0].SMPERIOD_GROWTHRATES)*-1 )* 100/ 100
        //$($("#ctrl_623120-175614457")[0].children[0]).text(newData + "%")
        $(domNum).css("color", "rgb(221,55,65)")
        arrow.css("display", "block");
        arrow.css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
    }
}

