debugger
var data = row["SCORE"];
var ifraemDom = getElByName("网页框2");
var iframe = $(ifraemDom).find("iframe").get(0);

$(iframe).load(function () {
    iframe.contentWindow.reload(data)
});


function reload(data) {
    debugger
    console.log("执行===================================================================")
    var barDom = getElByName("柱状图1");
    var opt = options[$(barDom).attr("id")];
    opt.xAxis[0].max = data;
    opt["xAxisExt"]["xAxisExt-max"] = data
    options[$(barDom).attr("id")] = opt
    $DV.loadEl("柱状图1")

}