var hImgIds = ["ctrl_628120-115641766", "ctrl_628120-115827730", "ctrl_628120-122385", "ctrl_628120-12329923",
    "ctrl_628120-12614465", "ctrl_628120-1276664", "ctrl_628120-12818908", "ctrl_628120-12949450",
    "ctrl_628120-121132108", "ctrl_628120-121318820"];

var textIds = ["ctrl_624120-154222190", "ctrl_624120-161821766", "ctrl_624120-161824977", "ctrl_624120-163612411",
    "ctrl_624120-163732951", "ctrl_624120-163736447", "ctrl_624120-163752496", "ctrl_624120-164259530",
    "ctrl_624120-164313219", "ctrl_624120-164316797",];

var imgsIds = ["ctrl_624120-154218765", "ctrl_624120-161117290", "ctrl_624120-161250774", "ctrl_624120-162333306", "ctrl_624120-1624204",
    "ctrl_624120-162651919", "ctrl_624120-162654974", "ctrl_624120-164051151", "ctrl_624120-164148416", "ctrl_624120-164155980",];


var lightUrls = [
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7zbVGAYbuAAAB69MdH7SA847.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7zfOeAd6m2AAB4rV1n2mk234.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17zfP-AB-f7AAB7iscfyhM065.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7_ScOAahs_AAB4ZtAL7mM104.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17_ShSAFHnuAAB52Lp9W34884.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7_SiqASJdOAAB8B3Cyl48134.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17_SiqAGKVxAAB4jNhsuCg855.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7_WQ2AXn5aAAB8ghEcKDg888.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7_SiqAN6kGAAB5zSI-AZk908.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17_SiyAZNeEAAB38SepePg132.png)",
];

var darkUrls = [
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17_X3qAD80LAAB1ZNjnZRk728.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7_X3qAVSm8AABy56PCE8E359.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17_X3qAFiVXAAB2NtgrRwM921.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7zgSaAAD9RAABzuT4jR7s937.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17zgSaAf6flAAB0Ji17n_A489.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17zgSaAKbexAAB2Fxfb4Kc553.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7zgSaAO6-VAABzvZuk904425.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17zg6eAGAKHAAB3p059XNE664.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF7zg6eAO744AAB1GGnfyl8945.png)",
    "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17zg6eAYlduAABzLhM1Ers168.png)",
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


debugger
for (var j = 0; j < hImgIds.length; j++) {
    $("#" + hImgIds[j]).css("display", "none");
}
for (var j = 0; j < textIds.length; j++) {
    $("#" + textIds[j]).css("cursor", "pointer")
}
$.ajax({
    url: "../ssoservice/getSubjectList", success: function (result) {
        console.log(result);

        for (var i = 0; i < result.length; i++) {
            debugger
            //给文本赋值
            if (result[i].ISLEAF == "1") {
                $($("#" + textIds[i])[0].children[0]).text(result[i].NAME);
                //有权限访问 使用亮色图片
                $("#" + imgsIds[i]).css("background-image", lightUrls[i]);

                var url = result[i].URL;
                $("#" + imgsIds[i]).attr("uri", url);
                var GUID = result[i].GUID;

                if (url && !(url == undefined)) {
                    clickRoom(i, url, GUID);
                }

            } else {
                $($("#" + textIds[i])[0].children[0]).text(result[i].NAME);
                $("#" + imgsIds[i]).css("background-image", darkUrls[i]);
            }
        }
    }
});

function clickRoom(i, url, GUID) {
    $("#" + roomIds[i]).click(function () {
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


/*

触发点击背景图 url("http://192.168.1.88:8888/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png") 字体颜色 06F8FB
平时状态背景图 url("http://192.168.1.88:8888/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png")          58A9FF
01_收入分析柱状图左 本月div ctrl_77120-175316117 ifarm A9DA422A7C73193BE055000000000001
01_收入分析柱状图左 累计div ctrl_77120-175617191 ifarm A9E6EF5398402CD7E055000000000001
左边div ctrl_77120-20563120



01_收入分析柱状图右 本月div ctrl_77120-174547818
01_收入分析柱状图右 累计div ctrl_77120-175037505
右边div ctrl_77120-21049876
*/

//点击本月
$("#ctrl_77120-174547818").click(function () {
    $(this).css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png)")
    $("#ctrl_77120-175037505").css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png")
    $($(this)[0].children[0]).css("color", "#06F8FB")
    $($("#ctrl_77120-175037505")[0].children[0]).css("color", "#58A9FF")
    $("#ctrl_77120-21049876").find("iframe").attr("src", "/dv_designer/dw/sharereport.jsp?pageId=A9DA422A7C73193BE055000000000001")
})

//点击累计
$("#ctrl_77120-175037505").click(function () {
    $(this).css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png)")
    $("#ctrl_77120-174547818").css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png")
    $($(this)[0].children[0]).css("color", "#06F8FB")
    $($("#ctrl_77120-174547818")[0].children[0]).css("color", "#58A9FF")
    $("#ctrl_77120-21049876").find("iframe").attr("src", "/dv_designer/dw/sharereport.jsp?pageId=A9E6EF5398402CD7E055000000000001")
})

var nameMap = {
    "南京市": "ctrl_78120-11327936",
    "镇江市": "ctrl_78120-113544179",
    "常州市": "ctrl_78120-11361841",
    "无锡市": "ctrl_78120-11369977",
    "苏州市": "ctrl_78120-11361870",
};


map.loadData = function (element) {
    var source = getDataSource(element);
    //取维度
    var key = element.attr("id") + "||dv_dim";
    var dimItems = null;
    if (dragDatas[key] != undefined) {
        dimItems = dragDatas[key];

        //Object.getOwnPropertyNames(items).length;
    }
    //取度量
    key = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[key] != undefined)
        measureItems = dragDatas[key];

    key = element.attr("id") + "||dv_filter";
    var filterItems = null;
    if (dragDatas[key] != undefined)
        filterItems = dragDatas[key];
    //取数据
    if ((dimItems != null) && (measureItems != null)) {
        if ((Object.getOwnPropertyNames(dimItems).length > 0) && (Object.getOwnPropertyNames(measureItems).length > 0)) {
            var result = YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData", {
                "sbtid": source.sbtid,
                "dimItems": JSON.stringify(dimItems),
                "measureItems": JSON.stringify(measureItems),
                "filterItems": JSON.stringify(filterItems)
            });
         
        }
    }
};


/*SMPERIOD_ZZL_YB 增幅
GEN_PUB_BUD_AMT  一般预算收入
SZB 税占比*/


$('#ctrl_625120-162817983').find("iframe")[0].contentWindow.changeData(checked);



//ctrl_625120-173521413
//加载默认数据
var opt = options["ctrl_624120-10575730"];

var result= opt.currResult;
for (var i = 0; i < result.length; i++) {
    var divId = nameMap[result[i].MOF_DIV_NAMENAME];
    if(divId&&!(divId==undefined)){
        debugger
        var data = (result[i].SMPERIOD_ZZL_YB)*100
        data = Math.round(data * 100) / 100
        $($("#" + divId)[0].children[0]).text(data+"%");
    }
}

function changeData(checked) {
    debugger
    var opt = options["ctrl_624120-10575730"];
    //获取数据
    var result = opt.currResult;
    for (var i = 0; i < result.length; i++) {
        //根据名称获取标签div
        var divId = nameMap[result[i].MOF_DIV_NAMENAME];
        //获取到得数据
        if(divId&&(divId!=undefined)){
            var data;
            if (checked == "收入增幅") {
                data = (result[i].SMPERIOD_ZZL_YB)*100
                data = Math.round(data * 100) / 100
                $($("#" + divId)[0].children[0]).text(data+"%");
            }
            if (checked == "一般公共预算收入") {
                data = (result[i].GEN_PUB_BUD_AMT/100000000)
                data = Math.round(data * 100) / 100
                $($("#" + divId)[0].children[0]).text(data+"亿");
            }
            if (checked == "税占比") {
                data = result[i].SZB*100;
                data = Math.round(data * 100) / 100
                $($("#" + divId)[0].children[0]).text(data+"%");
            }
        }
    }
}



var ele = $("<div/>");
ele.html(newvalue);
//获取数据标签对象
var dataP = $(ele.children(":first"))
//获取字符数据
var stringData = dataP.text();
//var data = stringData.split("%")[0]
//将字符转为数字
var data = parseFloat(stringData);
var arrow = $("#ctrl_624120-151621353");
if (data == null || data == undefined || data == 0) {
    arrow.css("display", "none")
} else if (data > 0) {
    dataP.css("color", "rgb(6,248,251)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
    dataP.text(numberFormatters(data, 2));
} else {
    data = data * -1
    dataP.css("color", "rgb(221,55,65)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
    data = numberFormatters(data, 2);
    dataP.text(data+"%");

}
newvalue=$(ele).html();



var ele = $("<div/>");
ele.html(newvalue);
//获取数据标签对象
var dataP = $(ele.children(":first"))
//获取字符数据
var stringData = dataP.text();
//var data = stringData.split("%")[0]
//将字符转为数字
var data = parseFloat(stringData);
var arrow = $("#ctrl_624120-144213148");
if (data == null || data == undefined || data == 0) {
    arrow.css("display", "none")
} else if (data > 0) {
    dataP.css("color", "rgb(6,248,251)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
    dataP.text(numberFormatters(data, 2)+"%");
} else {
    data = data * -1
    dataP.css("color", "rgb(221,55,65)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
    dataP.text(numberFormatters(data, 2)+"%");

}
newvalue=$(ele).html();





























var logo = {};

logo.createLogo = function (element, ctrlinfo, properties) {
    var opt = logo.getOption(element);
    for (var i = 0; i < properties.length; i++) {
        var p = properties[i];
        if (p.PTYPE == "CTRLDEF") {
            if ((p.MAPPROPERTY != undefined) && (p.DEFAULTVAL != undefined)) {
                var list_mapproperty = p.MAPPROPERTY.split("-");
                var pvalue = p.DEFAULTVAL;
                if (pvalue.toUpperCase() == "TRUE")
                    pvalue = true;
                else if (pvalue.toUpperCase() == "FALSE")
                    pvalue = false;
                setItem(opt, list_mapproperty, pvalue);
            }
        }
    }
    showTips(element, opt);
    options[$(element).attr("id")] = opt;

};

logo.load = function (element) {
    var opt = options[$(element).attr("id")];
    if (opt.title && (opt.openTip === true)) {
        showTips(element, opt)
    }
};


logo.loadData = function (element) {
    logo.load(element)
};

/**
 * 修改控件属性
 * @param element
 * @param pInfo
 * @param pvalue
 */
logo.propertyChangeEvent = function (element, pInfo, pvalue) {
    //处理控件定义的属性
    if (pInfo.PTYPE == "CTRLDEF") {
        var pname = pInfo.MAPPROPERTY;
        if (pname == "innerHTML") {
            innerPvalueHtml(element, pvalue);
        }
        var opt = options[$(element).attr("id")];
        if (pvalue === true) {
            showTips(element, options[$(element).attr("id")])
        } else if (pvalue === false) {
            $(element).unbind("mouseenter");
            $(element).unbind("mouseleave");
            options[$(element).attr("id")] = opt;
        } else {
            switch (pname) {
                //设置提示框内容
                case "title":
                    if (pvalue == "") {
                        element.attr("logo_" + element[0].id, " ");
                        opt.content[0] = "请输入内容";
                    } else {
                        //文本编辑器回显
                        // element.attr("logo_" + element[0].id, pvalue);
                        innerPvalueHtml(element, pvalue);
                        opt.content[0] = pvalue;
                    }
                    break;
                //设置提示框背景颜色
                case "tipBackColor":
                    opt.tips[1] = pvalue;
                    break;
                //设置提示框位置
                case "direction":
                    opt.tips[0] = pvalue;
                    break;
                case "area":
                    var arr = pvalue.split(",")
                    opt.area = [];
                    opt.area.push(arr[0])
                    opt.area.push(arr[1])
                    break;
                default:
                    opt[pname] = pvalue;
                    break;
            }
            showTips(element, opt);
        }
    }
};

/**
 * 设置提示框
 * @param element
 * @param opt
 */
function showTips(element, opt) {
    if (opt.openTip === true || opt.openTip == undefined) {
        var id = $(element).attr("id");
        opt.content[1] = "#" + id;
        var tips = 0;
        $(element).on({
            mouseenter: function () {
                tips = layer.open(opt);
                logo.setBorder(element, element.attr("dv_tbboder"))
            }
        })
    }
    //将opt存储到options中
    options[$(element).attr("id")] = opt;
}

/**
 * 插入表格时设置边框线颜色
 * @param element
 * @param pvalue
 */
logo.setBorder = function(element, pvalue ) {
    if ($(".layui-layer-content").find("table") && pvalue) {
        var tb = $(".layui-layer-content").find("table");
        tb.find("td").css("border", "1px solid");
        tb.find("td").css("borderColor", pvalue);
        tb.find("th").css("border", "1px solid");
        tb.find("th").css("borderColor", pvalue)
    }
}

/**
 * 默认设置
 * @returns opt
 */

logo.getOption = function (element) {
    var layerIndex;
    var layerInitWidth;
    var layerInitHeight;
    var id = $(element).attr("id");
    var options = {
        controlType: "LOGO",
        content: ["请输入内容", '#' + id],
        type: 4,
        tips: [2, "#4794ec"],
        time: 5000,
        area: [],
        shade: 0,

    };

    return options;
};



