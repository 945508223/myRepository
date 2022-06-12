

<div>
<p>
    <span style="font-size: 12px;"><span style="font-size: 14px;"></span>
        <span style="font-size: 24px;"></span>
    </span>
</p>

<p style="white-space: normal; text-align: center;">
    <span style="font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(238, 236, 225);"></span>
</p>

<p style="white-space: normal; text-align: center;">
<span style="font-size: 12px; color: rgb(219, 229, 241); font-family: arial, helvetica, sans-serif;">收入增幅</span>
</p>
4
<p style="white-space: normal; text-align: center;">
<span style="font-size: 12px;">
<span style="font-size: 14px;"></span>
3
<span style="font-size: 24px; font-family: 宋体, SimSun;">-16.40%</span>
</span>
</p>

<p style="white-space: normal; text-align: center;"><span style="font-size: 12px;">
<span style="font-size: 24px;"></span></span><br/>
</p>

</div>




//var value = ele.text();
//截取数据字符串
//value = value.split("收入增幅")[1].split("%")[0];//收入增幅 +数据
//转换为数字



var ele = $("<div/>");
ele.html(newvalue);
//获取数据标签对象
//var dataSpan = $($((ele.children(":last"))).children(":last")).children(":last")
//var dataSpan = ele.children(":first").find("strong").eq(0).children(":first")
var dataSpan = ele.find("p").eq(3).find("span").eq(2)
//获取字符数据
var stringData = dataSpan.text();
var data = stringData.split("%")[0]
//将字符转为数字
//todo 判断优化
data = numberFormatters(data, 2)
var arrow = $("#ctrl_623120-18826887");
if (data == null || data == undefined || data == 0) {
    arrow.css("display", "none")
} else if (data > 0) {
    dataSpan.css("color", "rgb(6,248,251)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
} else {
    data = data * -1
    dataSpan.css("color", "rgb(221,55,65)");
    arrow.css("display", "block");
    arrow.css("background-image", "url(http://" + FASTDFSURL.result + "/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
    dataSpan.text(data + "%");
    //ele.text("收入增幅"+data+"%");
}
newvalue=ele.html();







var result = YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList",{

});

var result = YCDCommon.Ajax.syncAjax(basePath+"/designer/delPhoto",{
    parentid:888888000001
});

var result = YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList?parentid=888888000001",{
    parentid:888888000001
});

var result= YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList?parentid=888888000001",{
    parentid:888888000001
})