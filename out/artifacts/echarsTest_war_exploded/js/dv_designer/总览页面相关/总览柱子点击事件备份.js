//收入增幅 一般公共预算收入 税占比  点击事件
//收入增幅正常高度
var srNormal = {
    "#ctrl_623120-175614457": 18.95,//百分比
    "#ctrl_717120-142652905": 37.37,//箭头
    "#ctrl_622120-194039324": 33,//光柱
    "#ctrl_625120-16501815": "none"//底盘
};

//一般公共预算正常
var ybNormal = {
    "#ctrl_623120-18313424": 20,//百分比
    "#ctrl_622120-194037116": 33,//一般预算光柱
    "#ctrl_625120-16501359": "none"//底盘
};

//税占比正常
var szbNormal = {
    "#ctrl_623120-175949120": 22,//百分比
    "#ctrl_622120-194111917": 33,//光柱
    "#ctrl_622120-19457942": "none"
};

var dataArr = [
    srNormal,
    ybNormal,
    szbNormal
];

var idArr = [
    "ctrl_622120-194039324",
    "ctrl_622120-194037116",
    "ctrl_622120-194111917"
]




$(window).load(function () {
    bindClick("ctrl_622120-194039324", 0, "收入增幅");
    bindClick("ctrl_622120-194037116", 1, "一般公共预算收入");
    bindClick("ctrl_622120-194111917", 2, "税占比");

    bindHover("ctrl_622120-194039324", 0);
    //bindHover("ctrl_622120-194037116", 1);
    bindHover("ctrl_622120-194111917", 2)
});


//绑定各个柱子点击事件
function bindClick(id, index, data) {
    $("#" + id).click(function () {
        //  isMouseOver = false;
        for (let i = 0; i < dataArr.length; i++) {
            if (i == index) {
                for (let key in dataArr[i]) {
                    if (typeof (dataArr[i][key]) == "number") {
                        $(key).css("top", dataArr[i][key] - 5 + "%")
                    } else {
                        $(key).css("display", "block")
                    }
                }
            } else {
                for (let key in dataArr[i]) {
                    if (typeof (dataArr[i][key]) == "number") {
                        $(key).css("top", dataArr[i][key] + "%")
                    } else {
                        $(key).css("display", "none")
                    }
                }
            }
        }
        //改变地图标签数据
        debugger
        changeData(data);
        for (let i = 0; i < idArr.length; i++) {

            if (i == index) {
                $(this).unbind('mouseenter').unbind('mouseleave')
            } else {
                bindHover(idArr[i], i)
            }
        }
    });
}
/**
 * 修改地图控件散点提示框格式 重新加载地图
 * @param data
 */
function changeData(data) {
    debugger
    var win = $("#ctrl_625120-162817983").find("iframe")[0].contentWindow;
    var mapEl = $(win.$DV.getEl("地图1"));
    var pageId = win.pageParams.url_pageId.val;
    var newLabel;
    var newTooltip;
    switch (data) {
        case "收入增幅":
            if (pageId === "B2CC35E3D8A03A75E0535501A8C01276") { //省
                newLabel = "{YBGGYS_YEARZF_DESC}";
                newTooltip = "{MOF_DIV_NAME},排名：{YBGGYS_YEARZF_DESC},金额：{GEN_PUB_BUD_YEAR_GROPER}亿元";
            } else if (pageId==="B317534EC7F134F8E0535501A8C09B14") {//苏南
                newLabel = "{GEN_PUB_BUD_YEAR_GROPER_DESC}";
                newTooltip = "{MOF_DIV_NAME},排名：{GEN_PUB_BUD_YEAR_GROPER_DESC},金额：{GEN_PUB_BUD_YEAR_GROPER}亿元";
            } else if (pageId === "B31A9A3C039A4576E0535501A8C06824") {//镇江  1-4-0: B317534EC7F234F8E0535501A8C09B14
                newLabel = "第{GEN_PUB_BUD_YEAR_GROPER_DESC}名,{GEN_PUB_BUD_YEAR_GROPER}%";
                newTooltip = "{MOF_DIV_NAME},排名：{GEN_PUB_BUD_YEAR_GROPER_DESC},收入增幅:{GEN_PUB_BUD_YEAR_GROPER}%";
            }
            break;
        case "一般公共预算收入":
            if (pageId === "B2CC35E3D8A03A75E0535501A8C01276") {

                newLabel = "{GENPUBBUD_YEARAMT_DESC}";
                newTooltip = "{MOF_DIV_NAME},排名：{GENPUBBUD_YEARAMT_DESC},金额：{GEN_PUB_BUD_YEAR_AMT}亿元";

            } else if (pageId==="B317534EC7F134F8E0535501A8C09B14") {

                newLabel = "{GEN_PUB_BUD_YEAR_AMT_DESC}";
                newTooltip = "{MOF_DIV_NAME},排名：{GEN_PUB_BUD_YEAR_AMT_DESC},金额：{GEN_PUB_BUD_YEAR_AMT}亿元";

            } else if (pageId === "B31A9A3C039A4576E0535501A8C06824") {

                newLabel = "第{GEN_PUB_BUD_YEAR_AMT_DESC}名,{GEN_PUB_BUD_YEAR_AMT}亿元";
                newTooltip = "{MOF_DIV_NAME},排名：{GEN_PUB_BUD_YEAR_AMT_DESC},金额：{GEN_PUB_BUD_YEAR_AMT}亿元";
            }
            break;
        case "税占比":
            if (pageId === "B2CC35E3D8A03A75E0535501A8C01276") {

                newLabel = "{SZB_YEAR_PER_DESC}";
                newTooltip = "{MOF_DIV_NAME},排名：{SZB_YEAR_PER_DESC},税占比：{TAX_GENPUBDUD_YEAR_PER}%";

            } else if (pageId==="B317534EC7F134F8E0535501A8C09B14") {

                newLabel = "{TAX_GENPUBDUD_YEAR_PER_DESC}";
                newTooltip = "{MOF_DIV_NAME},排名：{TAX_GENPUBDUD_YEAR_PER_DESC},税占比：{TAX_GENPUBDUD_YEAR_PER}%";

            } else if (pageId === "B31A9A3C039A4576E0535501A8C06824") {

                newLabel = "第{TAX_GENPUBDUD_YEAR_PER_DESC}名,{TAX_GENPUBDUD_YEAR_PER}%";
                newTooltip = "{MOF_DIV_NAME},排名：{TAX_GENPUBDUD_YEAR_PER_DESC},税占比：{TAX_GENPUBDUD_YEAR_PER}%";

            }
            break;
    }
    mapEl.attr("dv_effectscatterlabel", newLabel);
    mapEl.attr("dv_effecttooltip", newTooltip);
    win.$DV.loadEl("地图1")
}


/**
 * 绑定hover事件
 * @param id
 * @param index
 */
function bindHover(id, index) {
    $("#"+id).hover(function () {
        for (let key in dataArr[index]) {
            if (typeof (dataArr[index][key]) == "number") {
                $(key).css("top", dataArr[index][key] - 5 + "%")
            } else {
                $(key).css("display", "block")
            }
        }

    }, function () {
        for (let key in dataArr[index]) {
            if (typeof (dataArr[index][key]) == "number") {
                $(key).css("top", dataArr[index][key] + "%")
            } else {
                $(key).css("display", "none")
            }
        }
    });

}





function upBar(choseBar) {
    for (let key in choseBar) {
        if (typeof (choseBar[key]) == "number") {
            $(key).css("top", choseBar[key] - 5 + "%")
        } else {
            $(key).css("display", "block")
        }
    }
}

function downBar(choseBar) {
    for (let key in choseBar) {
        if (typeof (choseBar[key]) == "number") {
            $(key).css("top", choseBar[key] + "%")
        } else {
            $(key).css("display", "none")
        }
    }
}
