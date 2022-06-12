//var basePath=getProjectName(); //获取项目路径


/*function loadChartsData(element,dimItems,measureItems,filterItems){
    var source=getDataSource(element);
    return YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData",
        {
            "sbtid": source.sbtid,
            "dimItems": JSON.stringify(dimItems),
            "measureItems": JSON.stringify(measureItems),
            "filterItems": JSON.stringify(filterItems)
        });
}*/
//var tagIds = ["ctrl_624120_154222190", "ctrl_624120_161821766", "ctrl_624120_161824977"];


//初始化页面时 加载数据

window.onload = function () {

    var imgIds = ["ctrl_624120-154218765"];

    var hImgIds = ["ctrl_624120-115827730"];

    var textIds = ["ctrl_624120-154222109"];

    var url;
    var data = YCDCommon.Ajax.syncAjax(url);

    for (var i = 0; i < data.length; i++) {
        //获取图片标签的div
        var img = $(#imgIds[i]);
        var hImg = $(#hImgIds[i]);
        var text = $($(#textIds[i])[0].children[0]);

        var NAME = data[i].NAME;
        var ISUES = data[i].ISUES;
        var URL = data[i].URL;

        //设置名称
        text.text(NAME);

        if (ISUES == 1) {
            //如果ISUES为1 则修改标签内字体为灰色 无权访问 设置为不可点击  并将发光背景图设置为none
            hImg.attr("dv_display", "none");
        } else {
            //可以访问 图片绑定url
            img.append("<a herf=" + URL + "><a/>");
            hImg.hover(function () {
                //鼠标经过
                $(this).attr("dv_display", "block");
            }, function () {
                //鼠标离开
                $(this).attr("dv_display", "none");
            });
        }
        ;
    }
};



var hImgIds = ["ctrl_628120-115641766","ctrl_628120-115827730","ctrl_628120-122385","ctrl_628120-12329923",
    "ctrl_628120-12614465","ctrl_628120-1276664","ctrl_628120-12818908","ctrl_628120-12949450",
    "ctrl_628120-121132108","ctrl_628120-121318820"];

var textIds = ["ctrl_624120-154222190","ctrl_624120-161821766","ctrl_624120-161824977","ctrl_624120-163612411",
    "ctrl_624120-163732951","ctrl_624120-163736447","ctrl_624120-163752496","ctrl_624120-164259530",
    "ctrl_624120-164313219","ctrl_624120-164316797",];


var ht ={
    "ctrl_624120-154222190":"ctrl_628120-115641766",
    "ctrl_624120-161821766":"ctrl_628120-115827730",
    "ctrl_624120-161824977":"ctrl_628120-122385",
    "ctrl_624120-163612411":"ctrl_628120-12329923",
    "ctrl_624120-163732951":"ctrl_628120-12614465",
    "ctrl_624120-163736447":"ctrl_628120-1276664",
    "ctrl_624120-163752496":"ctrl_628120-12818908",
    "ctrl_624120-164259530":"ctrl_628120-12949450",
    "ctrl_624120-164313219":"ctrl_628120-121132108",
    "ctrl_624120-164316797":"ctrl_628120-121318820",
}


var hImgIds = ["ctrl_628120-115641766","ctrl_628120-115827730","ctrl_628120-122385","ctrl_628120-12329923","ctrl_628120-12614465","ctrl_628120-1276664","ctrl_628120-12818908","ctrl_628120-12949450",
    "ctrl_628120-121132108","ctrl_628120-121318820"];

var textIds = ["ctrl_624120-154222190","ctrl_624120-161821766","ctrl_624120-161824977","ctrl_624120-163612411","ctrl_624120-163732951","ctrl_624120-163736447","ctrl_624120-163752496","ctrl_624120-164259530","ctrl_624120-164313219","ctrl_624120-164316797",];
debugger
for (var j = 0; j < hImgIds.length; j++) {
    $("#" + hImgIds[j]).css("display", "none");
}
clickBackground(hImgIds);
$().click(function(){
    $("#ctrl_625120-144254123").css("display","block")
    $("#ctrl_625120-164738887").css("display","none")
});

function clickBackground(hImgIds) {
    for (var c = 0; c < hImgIds.length; c++) {
        $("#"+hImgIds[c]).click(function () {
            console.log($(this))
            $("#"+hImgIds[c]).css("display", "block");
            for (var i = 0; i < hImgIds.length; i++) {
                if (!c == i) {
                    $("#" + hImgIds[i]).css("display", "none");
                }
            }
        })
    }
}


function clickBackground(textIds,ht) {
    debugger
    for (var c = 0; c < textIds.length; c++) {
        $("#"+textIds[c]).click(function () {
            debugger
            console.log($(this))
            himgId = ht[$(this).attr("id")];
            $("#"+himgId).css("display", "block");
            for (var i = 0; i < textIds.length; i++) {
                if(!ht[textIds[i]]==himgId){
                    $("#"+ht[textIds[i]]).css("display", "none")
                }
            }
        })
    }
}

//镇江
var nameMap = {
    "句容市":"ctrl_625120-18100884",
    "丹阳市":"ctrl_625120-18117917",
    "丹徒区":"ctrl_625120-18130221",
    "润州区":"ctrl_625120-181153774",
    "京口区":"ctrl_625120-18124422",
    "扬中市":"ctrl_625120-18117510",
}


map_onclick=function(params){
    //点击变红色图片
   $("#"+nameMap[params.name]).css("background-image","url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF70zM2ADX8GAAAFxe8ZLB0855.png)");
    for (let nameMapKey in nameMap) {
        if(!(nameMapKey==params.name)){
            //其他变为蓝色
            $("#"+nameMap[nameMapKey]).css("background-image","url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7zNfGAfnHVAAAJrPXOVG4449.png)");
        }
    }
};
map_onclick=function(params,dom){
    debugger
    dom.element.attr("dv_openclick")
    if((element.attr("dv_openclick"))){
        //点击变红色图片
        $("#"+nameMap[params.name]).css("background-image","url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF70zM2ADX8GAAAFxe8ZLB0855.png)");
        debugger
        for (let nameMapKey in nameMap) {
            if(!(nameMapKey==params.name)){
                //其他变为蓝色
                $("#"+nameMap[nameMapKey]).css("background-image","url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7zNfGAfnHVAAAJrPXOVG4449.png)");
            }
        }
    }

};