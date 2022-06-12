
//地图切换
//江苏
$("#ctrl_623120-16743666").click(function () {
    $(this.children[0]).css("color","#06f8fb")
    //切换背景图
    $(this).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")
    $("#ctrl_623120-16836244").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18LeN2AAUwWAAAJ2brmt-8043.png)")
    $("#ctrl_623120-16918876").css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/03/wKgBV18LeN2AAUwWAAAJ2brmt-8043.png)")

    $($("#ctrl_623120-16836244")[0].children[0]).css("color","#58a9ff")
    $($("#ctrl_623120-16918876")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=AA6955B5BD1C0680E0534901A8C08776")
})




//点击镇江
$("#ctrl_623120-16836244").click(function () {
    $(this.children[0]).css("color","#06f8fb")
    $($("#ctrl_623120-16743666")[0].children[0]).css("color","#58a9ff")
    $($("#ctrl_623120-16918876")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=AA79F4447F9F42B6E0534901A8C04890")
})


//点击苏南
$("#ctrl_623120-16918876").click(function () {
    $(this.children[0]).css("color","#06f8fb")
    $($("#ctrl_623120-16836244")[0].children[0]).css("color","#58a9ff")
    $($("#ctrl_623120-16743666")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=A9E66E5F05E72C4DE055000000000001")
})