
var urlMap = {
    "收入增幅": "AC0484E6AD6648D1E0534901A8C07D3B",
    "一般公共预算收入": "AC044655EA8048CFE0534901A8C06055",
    "税占比": "AC044655EA7F48CFE0534901A8C06055",
};
changeCityData("一般公共预算收入");

function changeCityData(checked) {
    var code = map.mapClickParams.data.code;
    var name = map.mapClickParams.data.name;
    var layer;
    layer = showMyDialog("", "50%", "50%", getProjectName() + '/dw/sharereport.jsp?pageId=' + urlMap[checked] + '&specialcode=' + code, function () {
    }, "1", "", "", 0);
    var index = layer.index;
    var body = layer.getChildFrame('body', index);
    var sel = body.prevObject.prevObject.prevObject.selector;
    var dom = $(sel);
    $(dom).css("background-color", "rgba(0,0,0,0)");
    $($(dom).find("div")[0]).remove();
    //var win = parent.$(sel).find("iframe")[0].contentWindow;
    mouseoutIf(dom, layer)

}


function mouseoutIf(dom, layer) {
    dom.mouseout(function () {
        layer.closeAll('iframe')
    })
}
