
var logo = {};

/*
创建logo
 */


logo.load = function (element) {

    if (!options[element.attr("id")]) {
        options[element.attr("id")] = {controlType: "LOGO"};
    }
    if ($(element).attr("dv_title")) {
        showTips(element, $(element).attr("dv_title"))
    }
};
logo.loadData = function (element) {
    logo.load(element)
};

logo.propertyChangeEvent = function (element, pInfo, pvalue) {
    var pname = pInfo.MAPPROPERTY
    if (pname == "innerHTML") {
        innerPvalueHtml(element, pvalue);
    }
    if (pname == "title") {
        element.attr("logo_" + element[0].id, pvalue)
        showTips(element, pvalue, "title")
    }

    //是否开启提示框
    if (pname == "openTip" && pvalue == true) {
        if(options[element.attr("id")]){

        }
        //第一次加载默认设置
        var opt = logo.getOption();
        showTips(element, opt)

    } else {
        $(element).unbind("mouseenter")
        $(element).unbind("mouseleave")
    }
};

function showTips(element,opt,pvalue, mark) {

    /*
        var title = $(element).attr("dv_title");
        if (mark == "TRUE") {
            title = "请输入内容"
        }
        if (mark == "title") {
            title = pvalue;
            if ($(element).attr("dv_tipBackColor")) {
                tipBackColor = $(element).attr("dv_tipBackColor")
            }
        }
        var tipBackColor = $(element).attr("dv_tipBackColor");
        //默认提示框背景颜色
        if (!tipBackColor) {
            tipBackColor = "#4794ec"
        }

        if (mark == "tipBackColor") {
            tipBackColor = pvalue;
            title = $(element).attr("dv_title")
        }*/
 //   var id = element.attr("id")
   // opt.content[1] = "#"+id
    var tips = 0
    $(element).on({
        mouseenter: function () {
            tips = layer.open(opt);
        }, mouseleave: function () {
            layer.close(tips);
        }
    })
    //将opt存储到options中
    options[element.attr("id")] = opt;
}


/**
 * 默认设置
 * @returns opt
 */
logo.getOption = function (element) {
    var id = element.attr("id")
    var option = {
        controlType: "LOGO",
        content: ["请输入内容", '#'+id],
        type: 4,
        tips: [2, "#4794ec"],
        time: 5000,
        area: 'auto',
        shade: 0,
        maxWidth: 500
    }
    return option;
}








