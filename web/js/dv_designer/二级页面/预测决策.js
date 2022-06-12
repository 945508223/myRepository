var titles = [
    "财政收入预测",
    "精细化预算预测",
    "国库现金流预测",

];

//初始化将颜色全部置为暗色
for (let i = 0; i < titles.length; i++) {
    var title = getElByName(titles[i]);
    $(title).css("color", "#06a1a4");
    $(title).removeClass("transform")
}
initMenu("888888000005", titles);

/**
 * 初始化菜单
 * @param id
 * @param titleArr
 */
var mouse = true;

function initMenu(id, titleArr) {
    var result = YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList", {
        parentid: id
    });
    console.log(result);
    if (result <= 0) {
        return
    }
    for (let i = 0; i < titleArr.length; i++) {
        var title = getElByName(titleArr[i]);
        $(title).css("cursor", "pointer");
        //有权限添加事件
        if (result[i].ISUES == "1") {
            $(title).css("color", "#06f8fb");
            for (let j = 0; j < result.length; j++) {
                debugger
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
        name = encodeURI("预测决策—" + name);
        // window.open("/dv_designer" + url + "&GUID=" + guid + "&NAME=" + name)
        // window.open("/dv_designer/dw/custompage/reportDatePage.jsp" + "?guid=" + guid + "&name=" + name+"&date="+date+"&pageId="+pageId)
        window.open(getProjectName()+url + "&name=" + name + "&date=" + date+"&guid"+guid)
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