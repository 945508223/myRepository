//newvalue,oldvalue
var ele = $("<div/>");
ele.html(newvalue);
var text = $(ele).text();
var data = parseFloat(text.split("万元")[0]);

if(data==0){
    $(ele).text("");
    var yearLabel = getElByName("右中_年份1");
    $(yearLabel).text("");
}

newvalue=ele.html();
//============================================
var yearLabel = getElByName("右中_年份1");
var dataLabel = getElByName("右中_金额1")
var text = $(dataLabel).text()
if(text==""){
    $(yearLabel).text("")
}else{
  //  $(yearLabel).text("2020")
    $(yearLabel).find("span").text("2020年")
}


//---------------------------------------
//newvalue,oldvalue
debugger
var ele = $("<div/>");
ele.html(newvalue);
var text = $(ele).text();


var data = parseFloat(text.split("万元")[0]);

if(data==0){
    $(ele).text("");
    var yearLabel = getElByName("右中_年份2");

    $(yearLabel).text("")
}


newvalue=ele.html();
//-------------------------------------------
//newvalue,oldvalue
debugger
var ele = $("<div/>");
ele.html(newvalue);
var text = $(ele).text();
var data = parseFloat(text.split("万元")[0]);

if(data==0){
    $(ele).text("");
    setLabelText("右中_年份3")
    /*var yearLabel = getElByName("右中_年份3");
    console.log(yearLabel)
    $(yearLabel).text("")*/
}

newvalue=ele.html();
//-----------------------------------------
//newvalue,oldvalue
var ele = $("<div/>");
ele.html(newvalue);
var text = $(ele).text();
var data = parseFloat(text.split("万元")[0]);

if(data==0){
    $(ele).text("");
    var yearLabel = getElByName("右中_年份4");
    $(yearLabel).text("")
}


newvalue=ele.html();