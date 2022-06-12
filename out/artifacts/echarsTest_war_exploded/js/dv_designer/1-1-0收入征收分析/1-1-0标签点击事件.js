
//空心 未选中url(http://"+FASTDFSURL.result+"/group1/M00/00/06/wKgBWF8LeN2AN3nwAAAGs7HlZyI537.png)
var names = [
    "ctrl_76120-153316375",
    "ctrl_76120-153315360",
    "ctrl_76120-153313926",
    "ctrl_76120-153313368",
    "ctrl_76120-14313751",
    "ctrl_76120-15340944"
]

//默认加载县级
for (var i = 0; i < names.length; i++) {
    $("#"+names[i]).css("color","#58A9FF")
    $("#"+names[i]).css("background-image","url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")
    if(i==(names.length-1)) {
        $("#" + names[i]).css("color", "#06F8FB")
        $("#" + names[i]).css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png)")
    }
}
$("#ctrl_77120-141258294").find("iframe").attr("src", "/dw/sharereport.jsp?pageId=A9D69C7274141468E055000000000001")

///dw/sharereport.jsp?pageId==A9D69C7274141468E055000000000001


for (var i = 0; i < names.length; i++) {
    setClick(i)
}

function setClick(i){

    $("#"+names[i]).click(function () {
        $(this).css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/05/wKgBWF8DRZGAfLFIAAAFN0FSkHM729.png)")
        $(this).css("color","#06F8FB")
        for (var j = 0; j <names.length; j++) {
            if(names[i]!=names[j]){
                $("#"+names[j]).css("background-image", "url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV18DRJuADP3BAAAFXV_mSHo246.png)")
                $("#"+names[j]).css("color","#58A9FF")
            }
        }
    })
}

