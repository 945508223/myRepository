var titles = [
    "财政库款",
    "一般性支出",
    "转移支付",
    "三公经费",
    "重点项目",
];



for (var n = 0; n < titles.length; n++) {
    var title = getElByName(titles[n]);
    $(title).removeClass("transform");
    $(title).css("color", "#06a1a4")
}
initMenu("888888000002", titles);

/**
 * 初始化菜单
 * @param id
 * @param titleArr
 */
var mouse = true;

function initMenu(id, titleArr) {
    debugger
    var result = YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList", {
        parentid: id
    });
    console.log(result)
    if (result <= 0) {
        return
    }
    for (let i = 0; i < titleArr.length; i++) {
        var title = getElByName(titleArr[i]);
        $(title).css("cursor", "pointer");
        $(title).text(result[i].NAME);
        //有权限添加事件
        if (result[i].ISUES == "1") {
            $(title).css("color", "#06f8fb");
            for (let j = 0; j < result.length; j++) {
                if (result[j].NAME == titleArr[i]) {
                    $(title).addClass("transform");
                    var url = result[i].URL;
                    var GUID = result[i].GUID;
                    var NAME = result[i].NAME;
                    //点击跳转
                    if (url) {
                        clickOpen($(title), url, GUID, NAME, result)
                    }
                    //鼠标移动改变颜色
                    bindHover($(title))
                }
            }
        } else {
            //无权 使用暗色
            $(title).css("color", "#06a1a4")
            var divDom = getElByName(result[i].NAME+"容器");
            $(divDom).css("opacity","0.5")
        }
    }
}


/**
 * 点击跳转url
 *
 */
function clickOpen(dom, url, guid, name, result) {
    dom.click(function () {
        mouse = false;
        $(this).css("color", "#58A5FF");
        for (let i = 0; i < result.length; i++) {
            if (result[i].NAME != name) {
                var title = getElByName(result[i].NAME);
                //有权限
                if (result[i].ISUES == "1") {
                    $(title).css("color", "#06f8fb");
                } else {
                    $(title).css("color", "#68767a");
                    var divDom = getElByName(result[i].NAME+"容器");
                    $(divDom).css("opacity","0.5")
                }

            }
        }
        var date = $DV.pms("PUBDATE_DATE");

        //    /dv_designer/dw/custompage/reportDatePage.jsp
        //   var pageId = url.split("?pageId=")[1];
        name = encodeURI("专题分析—" + name);
        window.open(getProjectName()+url + "&name=" + name + "&date=" + date+"&guid="+guid)

    })
}



/**
 * 绑定hover
 * @param dom
 */
function bindHover(dom) {
    dom.hover(function () {
            mouse = true;
            $(this).css("color", "#58A5FF");
        }, function () {
            if (mouse) {
                $(this).css("color", "#06f8fb");
            }
        }
    );
}