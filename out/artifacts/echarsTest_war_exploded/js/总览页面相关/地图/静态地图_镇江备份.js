/*<div className="labelalign">
    <p>
        <span style="color:#06f8fb;font-size:12px;">一般公共预算 句容市:<br/></span>
        <span style="color:#cef3ff;font-size:10px;">${GEN_PUB_BUD_AMT}<br/></span>
        <span style="color:#cef3ff;font-size:10px;">第${TOTAL_AMT_DESC}名</span>
    </p>
    <div>*/
//点击不同光柱 切换数据
function changeData(checked) {
    if(checked=="收入增幅"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">${SMPERIOD_ZZL_YB}%<br/>第${YEARDCT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">${SMPERIOD_ZZL_YB}%<br/>第${YEARDCT_DESC}名<div>")
    }
    if(checked=="一般公共预算收入"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">${GEN_PUB_BUD_AMT}<br/>第${TOTAL_AMT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">${GEN_PUB_BUD_AMT}<br/>第${TOTAL_AMT_DESC}名<div>")
    }
    if(checked=="税占比"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">${SZB}%<br/>第${TAX_RAT_DESC}名<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#000000;font-size:12px;\">${SZB}%<br/>第${TAX_RAT_DESC}名<div>")
    }
   // changeCityData(checked)
    loadDataById("ctrl_718120-191631659")
}
var cityMap = {
    "句容市标签":"321183",
    "丹徒区标签":"321112",
    "润州区标签":"321111",
    "丹阳市标签":"321181",
    "京口区标签":"321102",
    "扬中市标签":"321182",
    "高新区标签":"321116",
    "新区标签":"321115"
}

var urlMap = {
    "收入增幅": "AC0484E6AD6648D1E0534901A8C07D3B",
    "一般公共预算收入": "AC044655EA8048CFE0534901A8C06055",
    "税占比": "AC044655EA7F48CFE0534901A8C06055",
}



/*function changeCityData(checked) {
    for (let city in cityMap) {
        var cityDom = getElByName(city);
        var layer;
        $(cityDom).unbind("click")
        $(cityDom).click(function () {
            layer = parent.showMyDialog("", "50%", "50%", getProjectName() + '/dw/sharereport.jsp?pageId=' + urlMap[checked] + '&&specialcode=' + cityMap[city], function () {
            }, "0","","",0);
            var index = layer.index
            var body = layer.getChildFrame('body', index);
            var sel = body.prevObject.prevObject.prevObject.selector
            var dom = parent.$(sel)
            var win = parent.$(sel).find("iframe")[0].contentWindow

            mouseoutIf(dom,win)
        });
    }
}

function mouseoutIf(dom,win) {
    dom.mouseout(function () {
        //$(this).remove()
        win.close_()
    })
}*/

//hover
areaNames= [
    "句容市标签",
    "丹徒区标签",
    "润州区标签",
    "丹阳市标签",
    "京口区标签",
    "扬中市标签",
    "高新区标签",
    "新区标签"
]

for (var i = 0; i < areaNames.length; i++) {
    var area = getElByName(areaNames[i])
    $(area).addClass("transform")
    $(area).hover(function () {
            $(this).css("color", "#06f8fb")
            //$(this).children(":first").children(":first").children(":first").css("color", "#06f8fb")
            //console.log($(this).children(":first").children(":first").children(":first").text())
            $(this).css("cursor", "pointer")
        }, function () {
            $(this).css("color", "#cef3ff")
            // $(this).children(":first").children(":first").children(":first").css("color", "#cef3ff")
            $(this).css("cursor", "default")
        }
    )
}

/**
 * 市标签hover事件
 * @type {*[]}
 */
var labelNames = [
    "MAP_321183",
    "MAP_321112",
    "MAP_321111",
    "MAP_321102",
    "MAP_321181",
    "MAP_321182",
    "MAP_321116",
    "MAP_321115"
]
for (var i = 0; i < labelNames.length; i++) {
    var cityLabel = getElByName(labelNames[i])
    $(cityLabel).removeClass("transform")
    $(cityLabel).hover(function () {
            $(this).children(":first").children(":first").css("font-weight", "bold")
            // $(this).children(":first").children(":first").css("color", "#58A9FF ")
            $(this).css("cursor", "pointer")
        }, function () {

            // $(this).children(":first").children(":first").css("color", "#cef3ff")
            $(this).children(":first").children(":first").css("font-weight", "normal")
            $(this).css("cursor", "default")
        }
    )
}
