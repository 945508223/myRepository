/*<div className="labelalign">
    <p>
        <span style="color:#06f8fb;font-size:12px;">税占比 句容市:<br/></span>
        <span style="color:#cef3ff;font-size:10px;">第${TAX_RAT_DESC}名</span>
    </p>
    <div>*/

//点击不同光柱 切换数据
function changeData(checked){
    $("#ctrl_718120-191631659")
    if(checked=="收入增幅"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div className=\"labelalign\">\n" +
            "    <p>\n" +
            "        <span style=\"color:#06f8fb;font-size:12px;\">收入增幅 句容市:<br/></span>\n" +
            "        <span style=\"color:#cef3ff;font-size:10px;\">第${GEN_PUB_BUD_YEAR_GROPER_DESC}名</span>\n" +
            "    </p>\n" +
            "    <div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div className=\"labelalign\">\n" +
            "    <p>\n" +
            "        <span style=\"color:#06f8fb;font-size:12px;\">收入增幅 句容市:<br/></span>\n" +
            "        <span style=\"color:#cef3ff;font-size:10px;\">第${GEN_PUB_BUD_YEAR_GROPER_DESC}名</span>\n" +
            "    </p>\n" +
            "    <div>")
    }
    if(checked=="一般公共预算收入"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div className=\"labelalign\">\n" +
            "    <p>\n" +
            "        <span style=\"color:#06f8fb;font-size:12px;\">一般公共预算 句容市:<br/></span>\n" +
            "        <span style=\"color:#cef3ff;font-size:10px;\">第${GEN_PUB_BUD_YEAR_AMT_DESC}名</span>\n" +
            "    </p>\n" +
            "    <div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div className=\"labelalign\">\n" +
            "    <p>\n" +
            "        <span style=\"color:#06f8fb;font-size:12px;\">一般公共预算 句容市:<br/></span>\n" +
            "        <span style=\"color:#cef3ff;font-size:10px;\">第${GEN_PUB_BUD_YEAR_AMT_DESC}名</span>\n" +
            "    </p>\n" +
            "    <div>")
    }
    if(checked=="税占比"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div className=\"labelalign\">\n" +
            "    <p>\n" +
            "        <span style=\"color:#06f8fb;font-size:12px;\">税占比 句容市:<br/></span>\n" +
            "        <span style=\"color:#cef3ff;font-size:10px;\">第${TAX_GENPUBDUD_YEAR_PER_DESC}名</span>\n" +
            "    </p>\n" +
            "    <div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div className=\"labelalign\">\n" +
            "    <p>\n" +
            "        <span style=\"color:#06f8fb;font-size:12px;\">税占比 句容市:<br/></span>\n" +
            "        <span style=\"color:#cef3ff;font-size:10px;\">第${TAX_GENPUBDUD_YEAR_PER_DESC}名</span>\n" +
            "    </p>\n" +
            "    <div>")
    }

    changeCityData(checked)
    loadDataById("ctrl_718120-191631659")
}



var cityMap = {
    "南京市标签": "3201",
    "镇江市标签": "321183",
    "常州市标签": "3204",
    "无锡市标签": "3202",
    "苏州市标签": "3205"
}

var urlMap ={
    "收入增幅":"AC0484E6AD6648D1E0534901A8C07D3B",
    "一般公共预算收入":"AC044655EA8048CFE0534901A8C06055",
    "税占比":"AC044655EA7F48CFE0534901A8C06055",
}

changeCityData("一般公共预算收入")
function changeCityData(checked) {
    for (let city in cityMap) {
        var cityDom = getElByName(city);
        var layer;
        $(cityDom).unbind("click")
        $(cityDom).click(function () {
            layer = parent.showMyDialog("", "60%", "50%", getProjectName() + '/dw/sharereport.jsp?pageId=' + urlMap[checked] + '&&specialcode=' + cityMap[city], function () {
            }, "0","","",0);
            var index = layer.index
            var body = layer.getChildFrame('body', index);
            var sel = body.prevObject.prevObject.prevObject.selector
            var dom = parent.$(sel)
            var win = parent.$(sel).find("iframe")[0].contentWindow
            $(dom).css("background-color","rgba(0,0,0,0)")

            // $(".layui-layer-title").remove()
            $($(dom).find("div")[0]).remove()
            mouseoutIf(dom,win,layer)
        });
    }
}

function mouseoutIf(dom,win,layer) {
    dom.mouseout(function () {
        layer.closeAll('iframe')
        //$(this).remove()
        // win.close_()
    })
}




//hover
cityNames= [
    "南京市标签",
    "镇江市标签",
    "常州市标签",
    "无锡市标签",
    "苏州市标签",
]

for (var i = 0; i < cityNames.length; i++) {

    var city = getElByName(cityNames[i])
    $(city).addClass("transform")
    $(city).hover(function () {
            $(this).css("color", "#06f8fb")
            $(this).css("cursor", "pointer")
        }, function () {
            $(this).css("color", "#cef3ff")
            $(this).css("cursor", "default")
        }
    )
}

var cityLabel = getElByName("MAP_321183")
$(cityLabel).removeClass("transform")
