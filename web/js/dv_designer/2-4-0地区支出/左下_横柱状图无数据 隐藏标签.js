//处理图无数据 隐藏标签
//总页面
var labelNames = [
    "左下_边框标签1",
    "左下_边框标签2",
    "左下_边框标签3",
    "左下_边框标签4"
];
var room = getElByName("下整_布局_容器")
var ifraemDom = getElByName("左下_横柱状图");
var iframe = $(ifraemDom).find("iframe").get(0)
console.log(iframe)
$(iframe).load(function () {
    var win = iframe.contentWindow

    var staus = win.getStatus()
    console.log(staus)
    for (let i = 0; i < labelNames.length; i++) {
        var labelDom = getElByName(labelNames[i])
        if (!staus) {
            $(labelDom).css("display", "none")
            $(room).css("background-image", "")
        } else {
            $(labelDom).css("display", "block")
            $(room).css("background-image", "url(http://" + FASTDFSURL + "/group1/M00/00/04/wKgBV18Zxn-ASsJFAAAMqrlrnko052.png)"
            )
        }
    }
});


//-----------------------------------

function getStatus() {
    debugger
    var el = getElByName("税收征收分类")

    var opt = options[$(el).attr("id")]

    var status;

    if(opt.series[0].name!="度量一"){
        status = true
    }else{
        status = false
    }
    return status;
}