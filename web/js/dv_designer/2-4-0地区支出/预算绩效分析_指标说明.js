/*
$(this).css("color", "#06f8fb");
var kh = getElByName("考核办法文字");
$(kh).css("color", "#1461ae");
var zbsm = getElByName("指标说明");
var khbf = getElByName("考核办法");
$(zbsm).css("display","block");
$(khbf).css("display","none");
*/


var zb = getElByName("指标说明文字");
var kh = getElByName("考核办法文字");
var zbsm = getElByName("指标说明");
var khbf = getElByName("考核办法");

$(zb).click(function () {
    $(this).css("color", "#06f8fb");
    $(kh).css("color", "#1461ae");
    $(zbsm).css("display","block");
    $(khbf).css("display","none");
});

$(kh).click(function () {
    $(this).css("color", "#06f8fb");
    $(zb).css("color", "#1461ae");
    $(zbsm).css("display","none");
    $(khbf).css("display","block");
});
