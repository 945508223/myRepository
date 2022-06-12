
<div><p>14.8%</p></div>
//<p>14.8<p>


//var value = ele.text();
//截取数据字符串
//value = value.split("收入增幅")[1].split("%")[0];//收入增幅 +数据
//转换为数字


var ele = $("<div/>");
ele.html(newvalue);
//获取数据标签对象
var dataP = $(ele.children(":first"))
//获取字符数据
var stringData = dataP.text();
//var data = stringData.split("%")[0]
//将字符转为数字
//todo 判断优化
var data = numberFormatters(stringData, 2)
var arrow = $("#ctrl_624120-151621353");
if (data == null || data == undefined || data == 0) {
    arrow.css("display", "none")
} else if (data > 0) {
    dataP.css("color", "rgb(6,248,251)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
} else {
    data = data * -1
    dataP.css("color", "rgb(221,55,65)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
    dataP.text(data + "%");

}
newvalue=ele.html();
