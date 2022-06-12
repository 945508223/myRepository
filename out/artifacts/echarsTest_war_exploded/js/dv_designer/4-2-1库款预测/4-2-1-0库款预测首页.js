var ele = $("<div/>");
ele.html(newvalue);


var dataP = ele.find("p").eq(0);
//获取字符数据
var strP = ele.find("p").eq(1);
var data = parseInt($(dataP).text());
if(data==0){
    $(strP).text("")
}

newvalue=ele.html();
