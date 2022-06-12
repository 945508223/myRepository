<div>
    <p>
    <span style="font-size: 20px;">

    <strong style="font-weight:bold;">
        <span style="font-family: 黑体, SimHei;">-17.86</span>
    </strong>

    <strong style="font-weight:bold;"><span style="font-family: 黑体, SimHei;">%</span> </strong>

    </span>
    </p>

    <p><br/></p>

</div>

var ele = $("<div/>");
ele.html(newvalue);
//获取数据标签对象
var dataSpan = ele.children(":first").find("strong").eq(0).children(":first")
var percent = ele.children(":first").find("strong").eq(1).children(":first")
//获取字符数据
var stringData = dataSpan.text();
//将字符转为数字

var data = numberFormatters(stringData, 2);
var arrow = getElByName("底左3_图片")

if (data == null || data == undefined || data == 0) {
    $(arrow).css("display", "none")
} else if (data > 0) {
    dataSpan.css("color", "rgb(6,248,251)");
    percent.css("color", "rgb(6,248,251)");
    $(arrow).css("display", "block");
    $(arrow).css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
} else {
    data = data * -1
    dataSpan.css("color", "rgb(221,55,65)");
    percent.css("color", "rgb(221,55,65)");
    $(arrow).css("display", "block");
    $(arrow).css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
    dataSpan.text(data);
    //ele.text("收入增幅"+data+"%");
}
newvalue=ele.html();