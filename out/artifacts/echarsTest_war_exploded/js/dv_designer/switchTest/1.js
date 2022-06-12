
//窗体加载
window.onload = function () {
    var onoffswitch = document.getElementById("toggle-button");
    onoffswitch.checked = true;
}
var myswitch ={}
//测试开始
myswitch. SwitchClick=function() {
    var onoffswitch = document.getElementById("toggle-button");
    var label = document.getElementById("batteryIconContent");
    if (onoffswitch.checked) {
        //调用后台
        alert("checked")
    }
    else {
        //调用后台
        alert("onblur")
    }
};