//点击不同光柱 切换数据
function changeData(checked){
    $("#ctrl_718120-191631659")
    if(checked=="收入增幅"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">收入增幅<br/>句容市:第${YEARDCT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">收入增幅<br/>句容市:第${YEARDCT_DESC}名<div>")
    }
    if(checked=="一般公共预算收入"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">一般公共预算<br/>句容市:第${TOTAL_AMT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">一般公共预算<br/>句容市:第${TOTAL_AMT_DESC}名<div>")
    }
    if(checked=="税占比"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">第${TAX_RAT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">税占比<br/>句容市:第${TAX_RAT_DESC}名<div>")
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
            mouseoutIf(dom,win,layer)
        });
    }
}

function mouseoutIf(dom,win,layer) {
    dom.mouseout(function () {
        layer.closeAll("iframe")
        //$(this).remove()
        win.close_()
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
//标签hover
/*var labelNames = [
    "MAP_321183"
]
for (var i = 0; i < labelNames.length; i++) {
    var cityLabel = getElByName(labelNames[i])
    $(cityLabel).addClass("transform")
    $(cityLabel).hover(function () {
				  $(this).children(":first").children(":first").css("font-weight", "bold")
            //$(this).children(":first").children(":first").css("color", "#58A9FF ")
            $(this).css("cursor", "pointer")
        }, function () {

            //$(this).children(":first").children(":first").css("color", "#cef3ff")
            $(this).children(":first").children(":first").css("font-weight", "normal")
            $(this).css("cursor", "default")
        }
    )
}*/
