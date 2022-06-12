//点击不同光柱 切换数据
function changeData(checked) {

    if(checked=="收入增幅"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">收入增幅<br/>句容市:第${YEARDCT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">收入增幅<br/>句容市:第${YEARDCT_DESC}名<div>")
    }
    if(checked=="一般公共预算收入"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">一般公共预算<br/>句容市:第${TOTAL_AMT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">一般公共预算<br/>句容市:第${TOTAL_AMT_DESC}名}<div>")
    }
    if(checked=="税占比"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">税占比<br/>句容市:第${TAX_RAT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">税占比<br/>句容市:第${TAX_RAT_DESC}名<div><div>")
    }
    loadDataById("ctrl_718120-191631659")
}

//hover
var cityNames = [
    "徐州市标签",
    "宿迁市标签",
    "连云港市标签",
    "淮安市标签",
    "盐城市标签",
    "扬州市标签",
    "泰州市标签",
    "南京市标签",
    "镇江市标签",
    "常州市标签",
    "无锡市标签",
    "苏州市标签",
    "南通市标签",
]

//var cityNames = []
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
/**
 * 市标签hover事件
 * @type {*[]}
 */
/*var labelNames = [
  "MAP_321183"
]*/
/*for (var i = 0; i < labelNames.length; i++) {
    var cityLabel = getElByName(labelNames[i])
    $(cityLabel).addClass("transform")
    $(cityLabel).hover(function () {
    		$(this).children(":first").children(":first").css("font-weight", "bold")
            //$(this).children(":first").children(":first").css("color", "#58A9FF ")
            $(this).css("cursor", "pointer")
        }, function () {
            $(this).children(":first").children(":first").css("font-weight", "normal")
           // $(this).children(":first").children(":first").css("color", "#cef3ff")
            $(this).css("cursor", "default")
        }
    )
}*/
