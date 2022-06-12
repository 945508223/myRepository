/*
FASTDFSURL.result =ip :192.168.1.88:8888  "+FASTDFSURL.result+"
往年同年
高亮图片
"url(http://"+FASTDFSURL.result+"/group1/M00/00/04/wKgBV18LeN2AauPKAAAHDiF9csM612.png)"

url("http://"+FASTDFSURL.result+"/group1/M00/00/06/wKgBWF8LeN2AN3nwAAAGs7HlZyI537.png")
*/
//页面加载默认往年同年高亮
var year = getElByName("下左_按年");
$(year).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/04/wKgBV18LeN2AauPKAAAHDiF9csM612.png)")
$(year).css("color","#06F8FB");
//修改往年同期
var month = getElByName("下左_按月");
$(month).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/06/wKgBWF8LeN2AN3nwAAAGs7HlZyI537.png)")
$(month).css("color","#58A9FF")
var iframe = getElByName("上中_外嵌饼图iframe");
$(iframe).find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=AB845320A5EA37EFE0534901A8C0CA04")


//--------------------------------------------------------------------------------------------------------------------------
//点击往年同年
$(this).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/04/wKgBV18LeN2AauPKAAAHDiF9csM612.png)")
$(this).css("color","#06F8FB");
var iframe = getElByName("上中_外嵌饼图iframe");
$(iframe).find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=AB845320A5EA37EFE0534901A8C0CA04")

var month = getElByName("下左_按月");
$(month).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/06/wKgBWF8LeN2AN3nwAAAGs7HlZyI537.png)")
$(month).css("color","#58A9FF")
//--------------------------------------------------------------------------------------------------------------------------



//点击往年同期
$(this).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/04/wKgBV18LeN2AauPKAAAHDiF9csM612.png)")
$(this).css("color","#06F8FB");
var iframe = getElByName("上中_外嵌饼图iframe");
$(iframe).find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=AB846B17F1283072E0534901A8C0891E")

var year = getElByName("下左_按年");
$(year).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/06/wKgBWF8LeN2AN3nwAAAGs7HlZyI537.png)")
$(year).css("color","#58A9FF")