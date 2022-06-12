

//触发其他控件刷新数据
if(info.ds_trigger&&info.ds_trigger.length>0){
    $DS.putPms(info.ds_param,val);
    triggerComps(info.ds_trigger);
}

//设置参数名,如果没有默认为CTRL_+当前控件name
var ds_param = getProInfoByObj("input", {
    ds_id: "ds_param",
    ds_pid: VUECFG.ctrlId,
    ds_draggable: "false",
    ds_style: "ds-mt-1",
    ds_labeltxt: "推送参数名",
    ds_placeholder: "控件推送参数名",
    ds_input: "",
    ds_name: "ds_param",
    ds_ispro: true
})
cfg.push(ds_param);

//触发刷新控件
var ds_trigger = getProInfoByObj("select", {
    ds_id: "ds_trigger",
    ds_pid: VUECFG.ctrlId,
    ds_labeltxt: "触发刷新控件",
    ds_placeholder: "请选择触发刷新控件",
    ds_style: "ds-mt-1",
    ds_draggable: "false",
    ds_options: [],
    ds_select_visible_change: "getAllPageCtrl",//选择框展开前后事件
    ds_select_change: "putLazyLoading",//变更事件
    ds_select: "",
    ds_name: "ds_trigger",
    ds_ispro: true,
    ds_multiple: true,
})
cfg.push(ds_trigger);



//----------------------------------------------------------------------------------------
var titles = [
    "财政画像",
    "企业画像",
    "单位画像",
    "项目画像"
];

//初始化将颜色全部置为亮色
for (let i = 0; i < titles.length; i++) {
    var title = getElByName(titles[i]);
    $(title).css("color", "#06a1a4");
    $(title).removeClass("transform")
}
initMenu("888888000006", titles);

/**
 * 初始化菜单
 * @param id
 * @param titleArr
 */
var mouse = true

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
                        clickOpen($(title), url, GUID, NAME,result)
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

function clickOpen(dom, url, guid, name,result) {
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

        switch (name) {
            case "单位画像":
                name ="单位画像—句容市人民政府办公室";
                break;
            case  "企业画像":
                name ="企业画像—建华建材（中国）有限公司";
                break;
            case  "财政画像":
                name ="财政画像—句容市财政";
                break;
            case  "项目画像":
                name ="项目画像—\“金保工程\”社保卡资金";
                break;
        }
        var _name = encodeURI(name)

        window.open(getProjectName()+url + "&name=" + _name + "&date=" + date+"&guid"+guid)
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


<symbol id="icon-pubjs-management" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        className="icon" viewBox="0 0 1024 1024">
    <defs>
        <style type="text/css"></style>
    </defs>
    <path d="M177.977806 189.935484h668.044388a16.516129 16.516129 0 0 1 16.516129 16.516129v610.105806a16.516129 16.516129 0 0 1-16.516129 16.516129H177.977806a16.516129 16.516129 0 0 1-16.516129-16.516129V206.451613a16.516129 16.516129 0 0 1 16.516129-16.516129z m16.516129 33.032258v577.073548h635.01213V222.967742H194.493935z" fill="#66B1FF" p-id="4306"></path>
    <path d="M165.16129 376.633806h695.081291v-33.032258H165.16129zM545.858065 443.507613l-99.096775 302.922322a16.516129 16.516129 0 1 0 31.380645 10.273033l99.096775-302.922323a16.516129 16.516129 0 0 0-31.380645-10.273032zM257.32129 607.661419l147.208258-54.05729a16.516129 16.516129 0 0 0-11.396129-31.01729l-147.208258 54.073806a16.516129 16.516129 0 1 0 11.396129 31.000774zM752.128 607.463226l-147.224774 54.05729a16.516129 16.516129 0 1 0 11.396129 31.01729l147.208258-54.073806a16.516129 16.516129 0 0 0-11.396129-31.000774z" fill="#66B1FF" p-id="4307"></path>
    <path d="M241.911742 609.06529l149.949935 78.071742a16.516129 16.516129 0 1 0 15.244388-29.299613l-149.949936-78.071742a16.516129 16.516129 0 1 0-15.244387 29.299613zM764.795871 606.042839l-149.966452-78.055226a16.516129 16.516129 0 0 0-15.244387 29.299613l149.966452 78.055226a16.516129 16.516129 0 1 0 15.244387-29.299613z" fill="#66B1FF" p-id="4308"></path>
</symbol>
