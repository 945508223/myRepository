var ctrlNames = [
    "财政画像",
    "企业画像",
    "单位画像",
    "项目画像"
];


function initMenu(id,ctrlNames) {
    //初始化将颜色全部置为暗色
    for (let i = 0; i < titles.length; i++) {
        var title = getElByName(titles[i]);
        $(title).css("color", "#06a1a4");
        $(title).removeClass("transform")
    }

    //获取数据
    var result = YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList", {
        parentid: id
    });


}