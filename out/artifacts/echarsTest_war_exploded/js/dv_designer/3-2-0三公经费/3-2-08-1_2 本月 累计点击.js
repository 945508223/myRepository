//下左_本月  下左_累计
//本月 :AD7440B42E116399E0530100007F9D8B
//累计 :AD9C62368BF44520E0530100007FD3D1
//亮色图片 "url(http://"+FASTDFSURL+"/group1/M00/00/06/wKgBWF8QKXGACN3IAAAEf7y5ajE174.png)"
//暗色图片  url(http://"+FASTDFSURL+"/group1/M00/00/03/wKhkJV9AkpCAa3r-AAADNydpSAA218.png)

var iframe = getElByName("下左_图表");
var lj = getElByName("下左_累计");
$(iframe).find("iframe").attr("src", getProjectName() + "/dw/sharereport.jsp?pageId=AD7440B42E116399E0530100007F9D8B" );
$(this).css("background-image", "url(http://"+FASTDFSURL+"/group1/M00/00/06/wKgBWF8QKXGACN3IAAAEf7y5ajE174.png)");
$(lj).css("background-image", "url(http://"+FASTDFSURL+"/group1/M00/00/03/wKhkJV9AkpCAa3r-AAADNydpSAA218.png)");


//支付信息中其他与三公两费相关支出
/*
setClick("下中_图表","AD73331B02B93AEBE0530100007F6D72","下中_本月");
setClick("下中_图表","AD9C62368BF54520E0530100007FD3D1","下中_累计");
*/

var iframe = getElByName("下中_图表");
var lj = getElByName("下中_本月");
$(iframe).find("iframe").attr("src", getProjectName() + "/dw/sharereport.jsp?pageId=AD73331B02B93AEBE0530100007F6D72" );
$(this).css("background-image", "url(http://"+FASTDFSURL+"/group1/M00/00/06/wKgBWF8QKXGACN3IAAAEf7y5ajE174.png)");
$(lj).css("background-image", "url(http://"+FASTDFSURL+"/group1/M00/00/03/wKhkJV9AkpCAa3r-AAADNydpSAA218.png)");
