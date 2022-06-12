
//收入增幅 一般公共预算收入 税占比  点击事件
//收入增幅
var isMouseOver = true;
$("#ctrl_622120-194039324").click(function(){
    //收入增幅升高
    $("#ctrl_623120-175614457").css("top","14%");//百分比
    $("#ctrl_717120-142652905").css("top","30%");//箭头
    //一般公共预算降低
    $("#ctrl_623120-18313424").css("top","20%");//百分比
    //税占比降低
    $("#ctrl_623120-175949120").css("top","22%");//百分比


    $("#ctrl_622120-194037116").css("top","33%");//一般预算光柱
    $("#ctrl_622120-194111917").css("top","33%");//税占比光柱
    $("#ctrl_622120-194039324").css("top","29%");//收入增幅光柱
    $("#ctrl_625120-16501815").css("display","block");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","none");
    isMouseOver=false
    //改变地图标签数据
    /*var map = getElByName("中下_地图iframe");
 	  $(map).find("iframe")[0].contentWindow.changeData("税占比");*/
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("收入增幅");

});


//一般公共预算收入
$("#ctrl_622120-194037116").click(function(){

    //一般升高
    $("#ctrl_623120-18313424").css("top","14%");//百分比

    //收入增幅
    $("#ctrl_623120-175614457").css("top","18.95%");//百分比
    $("#ctrl_717120-142652905").css("top","34%");//箭头

    //税占比
    $("#ctrl_623120-175949120").css("top","22%");//百分比



    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","33%");
    $("#ctrl_622120-194037116").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","block");
    $("#ctrl_622120-19457942").css("display","none");
    isMouseOver=false
    /*var map = getElByName("中下_地图iframe");
      $(map).find("iframe")[0].contentWindow.changeData("一般公共预算收入");*/
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("一般公共预算收入");
});

//税占比
$("#ctrl_622120-194111917").click(function(){
    //税占比升高
    $("#ctrl_623120-175949120").css("top","15%");//百分比

    //收入增幅
    $("#ctrl_623120-175614457").css("top","18.95%");//百分比
    $("#ctrl_717120-142652905").css("top","34%");//箭头

    //一般
    $("#ctrl_623120-18313424").css("top","20%");//百分比


    $("#ctrl_622120-194037116").css("top","33%");
    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","block");
    isMouseOver=false
    /*var map = getElByName("中下_地图iframe");
     $(map).find("iframe")[0].contentWindow.changeData("税占比");*/
    $("#ctrl_625120-162817983").find("iframe")[0].contentWindow.changeData("税占比");
});



//收入增幅
$("#ctrl_622120-194039324").hover(function(){
    isMouseOver=true;
    //收入增幅升高
    $("#ctrl_623120-175614457").css("top","14%");//百分比
    $("#ctrl_717120-142652905").css("top","30%");//箭头
    //一般公共预算降低
    $("#ctrl_623120-18313424").css("top","20%");//百分比
    //税占比降低
    $("#ctrl_623120-175949120").css("top","22%");//百分比

    $("#ctrl_622120-194037116").css("top","33%");//一般预算光柱
    $("#ctrl_622120-194111917").css("top","33%");//税占比光柱
    $("#ctrl_622120-194039324").css("top","29%");//收入增幅光柱
    $("#ctrl_625120-16501815").css("display","block");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","none");

},function () {
    if(isMouseOver){
        //收入增幅
        $("#ctrl_623120-175614457").css("top","18.95%");//百分比
        $("#ctrl_717120-142652905").css("top","34%");//箭头
        $("#ctrl_622120-194039324").css("top","33%");//收入增幅光柱
        $("#ctrl_625120-16501815").css("display","none");
    }
});

//一般
$("#ctrl_622120-194037116").hover(function(){
    isMouseOver=true;
    //一般升高
    $("#ctrl_623120-18313424").css("top","14%");//百分比
    //收入增幅
    $("#ctrl_623120-175614457").css("top","18.95%");//百分比
    $("#ctrl_717120-142652905").css("top","34%");//箭头
    //税占比
    $("#ctrl_623120-175949120").css("top","22%");//百分比

    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","33%");
    $("#ctrl_622120-194037116").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","block");
    $("#ctrl_622120-19457942").css("display","none");
},function () {
    if(isMouseOver){
        //一般
        $("#ctrl_623120-18313424").css("top","20%");//百分比
        $("#ctrl_622120-194037116").css("top","33%")
        $("#ctrl_625120-16501359").css("display","none");
    }
});


$("#ctrl_622120-194111917").hover(function(){
    isMouseOver=true;
    //税占比升高
    $("#ctrl_623120-175949120").css("top","15%");//百分比
    //收入增幅
    $("#ctrl_623120-175614457").css("top","18.95%");//百分比
    $("#ctrl_717120-142652905").css("top","34%");//箭头
    //一般
    $("#ctrl_623120-18313424").css("top","20%");//百分比

    $("#ctrl_622120-194037116").css("top","33%");
    $("#ctrl_622120-194039324").css("top","33%");
    $("#ctrl_622120-194111917").css("top","29%");
    $("#ctrl_625120-16501815").css("display","none");
    $("#ctrl_625120-16501359").css("display","none");
    $("#ctrl_622120-19457942").css("display","block");
},function () {
    if(isMouseOver){
        //税占比
        $("#ctrl_623120-175949120").css("top","22%")
        $("#ctrl_622120-194111917").css("top","33%");//光柱
        $("#ctrl_622120-19457942").css("display","none");
    }
});