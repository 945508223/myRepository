
console.log(result);



var titles = [
    "智能报告生成标题",
    "自助可视化图标处理标题"
];

//初始化将颜色全部置为暗色
for (let i = 0; i < titles.length; i++) {
    var title = getElByName(titles[i]);
    $(title).css("color", "#06a1a4");
    $(title).removeClass("transform")
}
initMenu("888888000007", titles);

function initMenu(id,titleArr) {
    var result = YCDCommon.Ajax.syncAjax("../ssoservice/getSubjectList", {
        parentid: id
    });
    console.log(result);
    debugger
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
                    var url = result[j].URL;
                    var GUID = result[j].GUID;
                    var NAME = result[j].NAME;
                    //点击跳转
                    if (url) {
                        clickOpen($(title), url, GUID, NAME)
                    }
                    //鼠标移动改变颜色
                    bindHover($(title));
                }
            }
        } else {
            //无权 使用暗色
            $(title).css("color", "#06a1a4")
        }
    }
}
/**
 * 点击跳转url
 *
 */
function clickOpen(dom, url, GUID, NAME) {
    dom.click(function () {
        mouse = false
        $(this).css("color", "#58A5FF");
        for (let i = 0; i < titles.length; i++) {
            if (titles[i] != NAME) {
                var title = getElByName(titles[i])
                $(title).css("color", "#06f8fb");
            }
        }
        window.open(url + "?&&GUID=" + GUID + "&&NAME=" + NAME)
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

//============================================================================================================
var smart = getElByName("智能报告生成标题");

$(smart).hover(function () {
        $(this).css("color", "#58A5FF");
    }, function () {
        $(this).css("color", "#06f8fb");
    }
);
$(smart).click(function () {
    var NAME = result[0].NAME;
    var url = result[0].URL;
    var GUID = result[0].GUID;
    window.open(url+"?GUID="+GUID+"&&NAME="+NAME);

})

var title = getElByName("自助可视化图标处理标题");
$(title).hover(function () {
        $(this).css("color", "#58A5FF");
    }, function () {
        $(this).css("color", "#06f8fb");
    }
);
$(title).click(function () {
    var NAME = result[1].NAME;
    var url = result[1].URL;
    var GUID = result[1].GUID;
    window.open(url+"?GUID="+GUID+"&&NAME="+NAME);

})

function openISearch(){
    var logid = $DV.pms('USER.LOGID','321183_sys_admin');
    var url = '/dfs_portal/SSOLogin?logid='+logid+'&url=dfs/homePage.jsp';
    window.open(url,'searchframe');
}
window.setTimeout(openISearch(),1000);


