debugger

//收入支出切换
//收
$("#ctrl_623120-153833467").click(function(){
    $("#ctrl_625120-164738887").css("display","block")
    $("#ctrl_625120-144254123").css("display","none")
    $("#ctrl_624120-161932354").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=A8B85FD898E17C8FE055000000000001")
});
//支
$("#ctrl_623120-15401700").click(function(){
    $("#ctrl_625120-144254123").css("display","block")
    $("#ctrl_625120-164738887").css("display","none")
    $("#ctrl_624120-161932354").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=A8E41E7A012F383DE055000000000001")
});



//收入增幅字体颜色与箭头切换
debugger
var num = $($("#ctrl_623120-175614457")[0].children[0]).text();
if(typeof(num)==="string"){
    num = num.split("%")[0]
}

if(num>=0){
    debugger
    $($("#ctrl_623120-175614457")[0].children[0]).css("color","#06f8fb");
    $("#ctrl_623120-18826887").css("background-image","url(http://192.168.1.88:8888/group1/M00/00/00/wKgBTl7wZ8KAD94nAAAB8fwRvjk643.png)")
}else{
    $($("#ctrl_623120-175614457")[0].children[0]).css("color","#ff3d3d");
    $("#ctrl_623120-18826887").css("background-image","url(http://192.168.1.88:8888/group1/M00/00/03/wKgBV17w2KCAJZG2AAAB5pVaJ7c699.png)")
}


var text = $($("#ctrl_623120-175614457")[0].children[0]);
var text = Object.defineProperties({}, {
    "text":{
        get:function(){
            console.log("Get:"+this.value);
        },
        set:function(val){
            console.log("Set:"+val);
            this.value = val;
        }
    },

});



//收入增幅 一般公共预算收入 税占比  点击事件
//收入增幅
$("#ctrl_622120-194039324").click(function(){

    $("#ctrl_623120-18313424").css("top","24.22%");
    $("#ctrl_623120-18731143").css("top","16.85%");
    $("#ctrl_623120-175949120").css("top","24.22%");
    $("#ctrl_623120-18731345").css("top","16.85%");


    $("#ctrl_623120-175614457").css("top","21.15%");
    $("#ctrl_623120-18548734").css("top","13.85%");
    $("#ctrl_623120-18826887").css("top","33%");


    $("#ctrl_622120-194037116").css("top","32%");
    $("#ctrl_622120-194111917").css("top","32%");
    $("#ctrl_622120-194039324").css("top","29%");
    $("#ctrl_625120-16501815").css("display","block");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","none");
    //全省
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("收入增幅");
});


//一般公共预算收入
$("#ctrl_622120-194037116").click(function(){

    $("#ctrl_623120-175614457").css("top","24.22%");
    $("#ctrl_623120-18548734").css("top","16.85%");
    $("#ctrl_623120-18826887").css("top","36%");
    $("#ctrl_623120-175949120").css("top","24.22%");
    $("#ctrl_623120-18731345").css("top","16.85%");

    $("#ctrl_623120-18313424").css("top","21.15%");
    $("#ctrl_623120-18731143").css("top","13.85%");


    $("#ctrl_622120-194039324").css("top","32%");
    $("#ctrl_622120-194111917").css("top","32%");
    $("#ctrl_622120-194037116").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","block");
    $("#ctrl_622120-19457942").css("display","none");
    //全省
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("一般公共预算收入");
});

//税占比
$("#ctrl_622120-194111917").click(function(){
    
    $("#ctrl_623120-175614457").css("top","24.22%");
    $("#ctrl_623120-18548734").css("top","16.85%");
    $("#ctrl_623120-18313424").css("top","24.22%");
    $("#ctrl_623120-18731143").css("top","16.85%");
    $("#ctrl_623120-18826887").css("top","36%");

    $("#ctrl_623120-175949120").css("top","21.15%");
    $("#ctrl_623120-18731345").css("top","13.85%");

    $("#ctrl_622120-194037116").css("top","32%");
    $("#ctrl_622120-194039324").css("top","32%");
    $("#ctrl_622120-194111917").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","block");
    //全省
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("税占比");
});



//地图切换
//点击江苏
$("#ctrl_623120-16743666").click(function () {
    $(this.children[0]).css("color","#06f8fb")
    $($("#ctrl_623120-16836244")[0].children[0]).css("color","#58a9ff")
    $($("#ctrl_623120-16918876")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=A8CC922263271AECE055000000000001")
})



//点击镇江
$("#ctrl_623120-16836244").click(function () {
    $(this.children[0]).css("color","#06f8fb")
    $($("#ctrl_623120-16743666")[0].children[0]).css("color","#58a9ff")
    $($("#ctrl_623120-16918876")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=A8E5E19AF0CB3C4EE055000000000001")
})


//点击苏南
$("#ctrl_623120-16918876").click(function () {
    $(this.children[0]).css("color","#06f8fb")
    $($("#ctrl_623120-16836244")[0].children[0]).css("color","#58a9ff")
    $($("#ctrl_623120-16743666")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=A9E66E5F05E72C4DE055000000000001")
})