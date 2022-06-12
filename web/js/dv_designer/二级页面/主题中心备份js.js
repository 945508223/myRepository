debugger
var hImgIds = ["ctrl_628120-115641766", "ctrl_628120-115827730", "ctrl_628120-122385", "ctrl_628120-12329923",
    "ctrl_628120-12614465", "ctrl_628120-1276664", "ctrl_628120-12818908", "ctrl_628120-12949450",
    "ctrl_628120-121132108", "ctrl_628120-121318820"];

var textIds = ["ctrl_624120-154222190", "ctrl_624120-161821766", "ctrl_624120-161824977", "ctrl_624120-163612411",
    "ctrl_624120-163732951", "ctrl_624120-163736447", "ctrl_624120-163752496", "ctrl_624120-164259530",
    "ctrl_624120-164313219", "ctrl_624120-164316797",];

var imgsIds = ["ctrl_624120-154218765", "ctrl_624120-161117290", "ctrl_624120-161250774", "ctrl_624120-162333306", "ctrl_624120-1624204",
    "ctrl_624120-162651919", "ctrl_624120-162654974", "ctrl_624120-164051151", "ctrl_624120-164148416", "ctrl_624120-164155980",
];

var lightUrls = [
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7zbVGAYbuAAAB69MdH7SA847.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7zfOeAd6m2AAB4rV1n2mk234.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17zfP-AB-f7AAB7iscfyhM065.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7_ScOAahs_AAB4ZtAL7mM104.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17_ShSAFHnuAAB52Lp9W34884.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7_SiqASJdOAAB8B3Cyl48134.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17_SiqAGKVxAAB4jNhsuCg855.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7_WQ2AXn5aAAB8ghEcKDg888.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7_SiqAN6kGAAB5zSI-AZk908.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17_SiyAZNeEAAB38SepePg132.png)",
];

var darkUrls = [
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17_X3qAD80LAAB1ZNjnZRk728.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7_X3qAVSm8AABy56PCE8E359.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17_X3qAFiVXAAB2NtgrRwM921.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7zgSaAAD9RAABzuT4jR7s937.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17zgSaAf6flAAB0Ji17n_A489.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17zgSaAKbexAAB2Fxfb4Kc553.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7zgSaAO6-VAABzvZuk904425.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17zg6eAGAKHAAB3p059XNE664.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/05/wKgBWF7zg6eAO744AAB1GGnfyl8945.png)",
    "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17zg6eAYlduAABzLhM1Ers168.png)",
];


var roomIds = [
    "ctrl_76120-10859391",
    "ctrl_76120-10320717",
    "ctrl_624120-161250774",
    "ctrl_76120-103540751",
    "ctrl_76120-10383915",
    "ctrl_76120-103910640",
    "ctrl_76120-104021354",
    "ctrl_76120-104211140",
    "ctrl_76120-104419807",
    "ctrl_76120-104540478",
];

var isMouseOver = true;
for (var j = 0; j < textIds.length; j++) {
    $("#" + textIds[j]).css("cursor", "pointer")
}

//初始话 将所有高亮图片变为none
for (var j = 0; j < hImgIds.length; j++) {
    $("#" + hImgIds[j]).css("display", "none");
}

var result = YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList", {
    parentid: "888888000001"
})
console.log(result)
//?parentid=888888000001
for (var i = 0; i < result.length; i++) {
    debugger
    //给文本赋值
    if (result[i].ISUES == "1") {
        //设置名称
        $($("#" + textIds[i])[0].children[0]).text(result[i].NAME);
        //字体为亮色
        $($("#" + textIds[i])[0].children[0]).css("color", "#CEF3FF ")
        //有权限访问 使用亮色图片
        $("#" + imgsIds[i]).css("background-image", lightUrls[i]);

        var url = result[i].URL;
        $("#" + imgsIds[i]).attr("uri", url);
        var GUID = result[i].GUID;

        if (url && !(url == undefined)) {
            clickRoom(i, url, GUID);
        }
        hoverRoom(i)
    } else {
        //无权访问
        $($("#" + textIds[i])[0].children[0]).text(result[i].NAME);
        //字体为暗色
        $($("#" + textIds[i])[0].children[0]).css("color", "#68767a ")
        $("#" + imgsIds[i]).css("background-image", darkUrls[i]);
    }
}


function clickRoom(i, url, GUID) {
    $("#" + roomIds[i]).click(function () {
        isMouseOver = false;
        debugger
        var url = $("#" + imgsIds[i]).attr("uri");
        $("#" + hImgIds[i]).css("display", "block");

        for (var j = 0; j < hImgIds.length; j++) {
            if (!(hImgIds[i] == hImgIds[j])) {
                $("#" + hImgIds[j]).css("display", "none");
            }
        }
        ;
        if (url.substring(0, 1) == "!") {
            url = url.substring(1);
        }
        ;
        console.log(url);
        window.open(url + "?GUID=" + GUID);
    })
}

function hoverRoom(i) {
    $("#" + roomIds[i]).hover(function () {
        isMouseOver = true;
        $("#" + hImgIds[i]).css("display", "block");

    }, function () {
        if (isMouseOver) {
            $("#" + hImgIds[i]).css("display", "none");
        }

    });
}