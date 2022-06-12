var basePath = getProjectName()

//江苏
$("#ctrl_623120-16743666").click(function () {

    //切换背景图
    $("#ctrl_622120-203127243").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png)")
    $("#ctrl_622120-203153237").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")
    $("#ctrl_622120-203152677").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")

    $(this).css("color","#06f8fb")
    // $($("#ctrl_623120-16836244")[0].children[0]).css("color","#58a9ff")
    //$($("#ctrl_623120-16918876")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_623120-16918876").css("color","#58a9ff")
    $("#ctrl_623120-16836244").css("color","#58a9ff")

    $("#ctrl_625120-162817983").find("iframe").attr("src",basePath+"/dw/sharereport.jsp?pageId=AABD237162AA4884E0534901A8C01D72")
})

//点击镇江
$("#ctrl_623120-16836244").click(function () {

    //切换背景图
    //镇江
    $("#ctrl_622120-203152677").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png)")
    //江苏
    $("#ctrl_622120-203127243").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")
    //苏南
    $("#ctrl_622120-203153237").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")

    $(this).css("color","#06f8fb")
    //$($("#ctrl_623120-16743666")[0].children[0]).css("color","#58a9ff")
    //$($("#ctrl_623120-16918876")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_623120-16743666").css("color","#58a9ff")
    $("#ctrl_623120-16918876").css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src",basePath+"/dw/sharereport.jsp?pageId=ABCB7B0372955DA1E0534901A8C00152")
})
//basePath/dw/sharereport.jsp?pageId=AABE09BC248F4CA3E0534901A8C0C740

//点击苏南
$("#ctrl_623120-16918876").click(function () {

    //切换背景图
    //苏南
    $("#ctrl_622120-203153237").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png)")
    //镇江
    $("#ctrl_622120-203152677").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")
    //江苏
    $("#ctrl_622120-203127243").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")

    $(this).css("color","#06f8fb")
    // $($("#ctrl_623120-16836244")[0].children[0]).css("color","#58a9ff")
    //  $($("#ctrl_623120-16743666")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_623120-16743666").css("color","#58a9ff")
    $("#ctrl_623120-16836244").css("color","#58a9ff")

    $("#ctrl_625120-162817983").find("iframe").attr("src",basePath+"/dw/sharereport.jsp?pageId=AABE3CA986BD527AE0534901A8C078B9")
});





//收入增幅正常高度
var srNormal = {
    "#ctrl_623120-175614457": 18.95,//百分比
    "#ctrl_717120-142652905": 34,//箭头
    "#ctrl_622120-194039324": 33,//光柱
    "#ctrl_625120-16501815": "none"//底盘
};

//一般公共预算正常
var ybNormal = {
    "#ctrl_623120-18313424": 20,//百分比
    "#ctrl_622120-194037116": 33,//一般预算光柱
    "#ctrl_625120-16501359": "none"//底盘
};

//税占比正常
var szbNormal = {
    "#ctrl_623120-175949120": 22,//百分比
    "#ctrl_622120-194111917": 33,//光柱
    "#ctrl_622120-19457942": "none"
};

var dataArr = [
    srNormal,
    ybNormal,
    szbNormal
];


var idArr = [
    "ctrl_622120-194039324",
    "ctrl_622120-194037116",
    "ctrl_622120-194111917"
];

for (let i = 0; i < dataArr.length; i++) {
    if (i == 1) {
        for (let key in dataArr[i]) {
            if (typeof (dataArr[i][key]) == "number") {
                $(key).css("top", dataArr[i][key] - 3 + "%")
            } else {
                $(key).css("display", "block")
            }
        }
        $("#"+idArr[i]).unbind('mouseenter').unbind('mouseleave')
    } else {
        for (let key in dataArr[i]) {
            if (typeof (dataArr[i][key]) == "number") {
                $(key).css("top", dataArr[i][key] + "%")
            } else {
                $(key).css("display", "none")
            }
        }

        bindHover(idArr[i],i)
    }

}


function bindHover(id, index) {
    $("#"+id).hover(function () {
        for (let key in dataArr[index]) {
            if (typeof (dataArr[index][key]) == "number") {
                $(key).css("top", dataArr[index][key] - 3 + "%")
            } else {
                $(key).css("display", "block")
            }
        }

    }, function () {
        for (let key in dataArr[index]) {
            if (typeof (dataArr[index][key]) == "number") {
                $(key).css("top", dataArr[index][key] + "%")
            } else {
                $(key).css("display", "none")
            }
        }
    });

}
