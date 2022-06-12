
//收入增幅 一般公共预算收入 税占比  点击事件
//收入增幅
var isMouseOver = true;
$("#ctrl_622120-194039324").click(function(){
    //收入增幅升高
    $("#ctrl_623120-175614457").css("top","15%");//百分比
    $("#ctrl_623120-18826887").css("top","31%");//箭头
    //一般公共预算降低
    $("#ctrl_623120-18313424").css("top","19.37%");//百分比
    //税占比降低
    $("#ctrl_623120-175949120").css("top","19.37%");//百分比


    $("#ctrl_622120-194037116").css("top","33%");//一般预算光柱
    $("#ctrl_622120-194111917").css("top","33%");//税占比光柱
    $("#ctrl_622120-194039324").css("top","29%");//收入增幅光柱
    $("#ctrl_625120-16501815").css("display","block");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","none");
    isMouseOver=false
    //全省
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("收入增幅");
});


//一般公共预算收入
$("#ctrl_622120-194037116").click(function(){

    //一般升高
    $("#ctrl_623120-18313424").css("top","15%");//百分比

    //收入增幅
    $("#ctrl_623120-175614457").css("top","19.37%");//百分比
    $("#ctrl_623120-18826887").css("top","34.68%");//箭头

    //税占比
    $("#ctrl_623120-175949120").css("top","19.37%");//百分比



    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","33%");
    $("#ctrl_622120-194037116").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","block");
    $("#ctrl_622120-19457942").css("display","none");
    isMouseOver=false
    //全省
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("一般公共预算收入");
});

//税占比
$("#ctrl_622120-194111917").click(function(){
    //税占比升高
    $("#ctrl_623120-175949120").css("top","15%");//百分比

    //收入增幅
    $("#ctrl_623120-175614457").css("top","19.37%");//百分比
    $("#ctrl_623120-18826887").css("top","34.68%");//箭头

    //一般
    $("#ctrl_623120-18313424").css("top","19.37%");//百分比


    $("#ctrl_622120-194037116").css("top","33%");
    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","block");
    isMouseOver=false

    //$("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("税占比");
});



//收入增幅
$("#ctrl_622120-194039324").hover(function(){
    isMouseOver=true;
    //收入增幅升高
    $("#ctrl_623120-175614457").css("top","15%");//百分比
    $("#ctrl_623120-18826887").css("top","31%");//箭头
    //一般公共预算降低
    $("#ctrl_623120-18313424").css("top","19.37%");//百分比
    //税占比降低
    $("#ctrl_623120-175949120").css("top","19.37%");//百分比

    $("#ctrl_622120-194037116").css("top","33%");//一般预算光柱
    $("#ctrl_622120-194111917").css("top","33%");//税占比光柱
    $("#ctrl_622120-194039324").css("top","29%");//收入增幅光柱
    $("#ctrl_625120-16501815").css("display","block");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","none");

},function () {
    if(isMouseOver){
        //收入增幅
        $("#ctrl_623120-175614457").css("top","19.37%");//百分比
        $("#ctrl_623120-18826887").css("top","34.68%");//箭头
        $("#ctrl_622120-194039324").css("top","33%");//收入增幅光柱
        $("#ctrl_625120-16501815").css("display","none");
    }
});

//一般
$("#ctrl_622120-194037116").hover(function(){
    isMouseOver=true;
    //一般升高
    $("#ctrl_623120-18313424").css("top","15%");//百分比
    //收入增幅
    $("#ctrl_623120-175614457").css("top","19.37%");//百分比
    $("#ctrl_623120-18826887").css("top","34.68%");//箭头
    //税占比
    $("#ctrl_623120-175949120").css("top","19.37%");//百分比

    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","33%");
    $("#ctrl_622120-194037116").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","block");
    $("#ctrl_622120-19457942").css("display","none");
},function () {
    if(isMouseOver){
        //一般
        $("#ctrl_623120-18313424").css("top","19.37%");//百分比
        $("#ctrl_622120-194037116").css("top","33%")
        $("#ctrl_625120-16501359").css("display","none");
    }
});


$("#ctrl_622120-194111917").hover(function(){
    isMouseOver=true;
    //税占比升高
    $("#ctrl_623120-175949120").css("top","15%");//百分比
    //收入增幅
    $("#ctrl_623120-175614457").css("top","19.37%");//百分比
    $("#ctrl_623120-18826887").css("top","34.68%");//箭头
    //一般
    $("#ctrl_623120-18313424").css("top","19.37%");//百分比

    $("#ctrl_622120-194037116").css("top","33%");
    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","block");
},function () {
    if(isMouseOver){
        //税占比
        $("#ctrl_623120-175949120").css("top","19.37%")
        $("#ctrl_622120-194111917").css("top","33%");//光柱
        $("#ctrl_622120-19457942").css("display","none");
    }
});





    //默认一般升高
    $("#ctrl_623120-18313424").css("top","15%");//百分比
    $("#ctrl_622120-194037116").css("top","29%");
    $("#ctrl_625120-16501359").css("display","block");


//默认显示镇江

    $("#ctrl_623120-16836244").css("color","#06f8fb")

    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=AA79F4447F9F42B6E0534901A8C04890")




//点击镇江
$("#ctrl_623120-16836244").click(function () {
    $($("#ctrl_623120-16836244")[0].children[0]).css("color","#06f8fb")
    $($("#ctrl_623120-16743666")[0].children[0]).css("color","#58a9ff")
    $($("#ctrl_623120-16918876")[0].children[0]).css("color","#58a9ff")
    $("#ctrl_625120-162817983").find("iframe").attr("src","/dv_designer/dw/sharereport.jsp?pageId=AA79F4447F9F42B6E0534901A8C04890")
})



//点击不同光柱 切换数据
function changeData(checked) {

    console.log("触发------------------------------------")
    console.log(checked)
    if(checked=="收入增幅"){
      console.log("收入增幅")
        console.log($("#ctrl_718120-191631659").attr("dv_labelreg_text"))
        console.log($("#ctrl_718120-191631659").attr("cnname"))
        console.log($("#ctrl_718120-191631659").attr("name"))
        console.log($("#ctrl_718120-191631659").attr("dv_labelreg"))
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${SMPERIOD_ZZL_YB}<div>")
    }
    if(checked=="一般公共预算收入"){
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${GEN_PUB_BUD_AMT}<div>")
    }
    if(checked=="税占比"){
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${SZB}<div>")
    }
}

