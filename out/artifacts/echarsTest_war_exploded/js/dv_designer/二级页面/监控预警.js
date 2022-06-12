var titles = [
    "财政内控",
    "专项资金监控",
    "财政库款预警监控",
    "企业扶持资金监控",
    "宏观经济监控"

];

//初始化将颜色全部置为暗色
for (let i = 0; i < titles.length; i++) {
    var title = getElByName(titles[i]);
    $(title).css("color", "#06a1a4");
    $(title).removeClass("transform")
}
initMenu("888888000003", titles);

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
    console.log(result);
    if (result <= 0) {
        return
    }

    for (let i = 0; i < result.length; i++) {
        var divDom = getElByName(result[i].NAME + "容器");
        var title = getElByName(result[i].NAME);

        if (result[i].ISUES == "1") {
            //有权
            $(title).css("cursor", "pointer");
            $(title).addClass("transform");
            $(divDom).css("opacity", "1");
            $(title).css("color", "#06f8fb");
            $(title).addClass("transform");
            var url = result[i].URL;
            var GUID = result[i].GUID;
            var NAME = result[i].NAME;
            //点击跳转
            if (url) {
                clickOpen($(title), url, GUID, NAME, result)
            }
            //鼠标移动改变颜色
            bindHover($(title));

        }else {
            //无权 使用暗色
            $(title).css("color", "#06a1a4");
            $(divDom).css("opacity", "0.5");
            $(title).unbind('mouseenter').unbind('mouseleave');
            $(title).removeClass("transform")
        }

    }




    /*
    for (let i = 0; i < titleArr.length; i++) {
        var title = getElByName(titleArr[i]);
        $(title).css("cursor", "pointer");


        //有权限添加事件
        if (result[i].ISUES == "1") {
            $(divDom).css("opacity", "1");
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
                    bindHover($(title));
                }
                continue;
            }
        } else {
            for (let j = 0; j < result.length; j++) {
                if (result[j].NAME == titleArr[i]) {
                    //无权 使用暗色
                    $(title).css("color", "#06a1a4");
                    $(divDom).css("opacity", "0.5");
                    $(title).unbind('mouseenter').unbind('mouseleave');
                    $(title).removeClass("transform")
                    continue;
                }
            }
        }
    }*/
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
                    var divDom = getElByName(result[i].NAME + "容器");
                    $(divDom).css("opacity", "0.5")
                }

            }
        }

        var date = $DV.pms("PUBDATE_DATE");
        name = encodeURI("监控预警—" + name);
        console.log(name)
        window.open(getProjectName() + url + "&name=" + name + "&date=" + date + "&guid" + guid)
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