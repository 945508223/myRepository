//税收非税全部切换
/*  灰色圆点图片url("http://192.168.1.88:8888/group1/M00/00/08/wKgBWF819XCAGMG1AAAUT1OK_FI042.png")
*  下中_全部
*  下中_税收收入
*  下中_非税收收入
*  下中_XY轴反转iframe
* */
var iframeDom = getElByName("下中_XY轴反转iframe");
var nChoseImg = "url(http://" + FASTDFSURL + "/group1/M00/00/08/wKgBWF819XCAGMG1AAAUT1OK_FI042.png)";
var dataArr = [
    {
        "name": "下中_全部",
        "url": "/dv_designer/dw/sharereport.jsp?pageId=AC6D7A632F56601AE0534901A8C09F62",
        "img": "url(http://" + FASTDFSURL + "/group1/M00/00/08/wKgBWF819XCAVS58AAAUqaiDYtA681.png)"
    },
    {
        "name": "下中_税收收入",
        "url": "/dv_designer/dw/sharereport.jsp?pageId=ACCD617B7F335F86E0534901A8C03530",
        "img": "url(http://" + FASTDFSURL + "/group1/M00/00/08/wKgBWF819XCAVS58AAAUqaiDYtA681.png)"
    },
    {
        "name": "下中_非税收收入",
        "url": "/dv_designer/dw/sharereport.jsp?pageId=ACCD617B7F345F86E0534901A8C03530",
        "img": "url(http://" + FASTDFSURL + "/group1/M00/00/06/wKgBV1819ZyAUtR7AAAQ07qeQwc869.png)"
    },
];

//默认显示全部
for (let k = 0; k < dataArr.length; k++) {
    var dom = getElByName(dataArr[k].name);
    if (k == 0) {
        $(iframeDom).find("iframe").attr("src", dataArr[k].url);
        $(dom).css("background-image", dataArr[k].img);
    } else {
        $(dom).css("background-image", dataArr[k].img);
    }
}


for (let i = 0; i < dataArr.length; i++) {
    var dom = getElByName(dataArr[i].name);
    bindClick(dom, dataArr[i])
}


/**
 * 新 点击事件
 * @param dom
 * @param item
 */
function bindClick2(dom, item) {

    $(dom).click(function () {
        debugger
        //点击税收收入 全部 自身变暗 非税变亮
        if (item.name !== "下中_全部") {

            $(this).css("background-image", nChoseImg);
            $($DV.getEl("下中_全部")).css("background-image", nChoseImg);
            var index = (item.name === "下中_税收收入") ? 2 : 1;
            $($DV.getEl(dataArr[index].name)).css("background-image", dataArr[index].img);
            $(iframeDom).find("iframe").attr("src", dataArr[index].url);

        } else if (item.name === "下中_全部") {
            for (let i = 0; i < dataArr.length; i++) {
                var _dom = getElByName(dataArr[i].name);
                $(_dom).css("background-image", dataArr[i].img)
            }
            $(iframeDom).find("iframe").attr("src", item.url);
        }
    })
}


/**
 * 绑定点击事件 切换ifram 以及图片
 * @param dom
 * @param name
 */
function bindClick(dom, item) {
    $(dom).click(function () {
        //切换视图
        $(iframeDom).find("iframe").attr("src", item.url);
        //修改自身图片

        if (item.name == "下中_全部") {
            for (let i = 0; i < dataArr.length; i++) {
                var _dom = getElByName(dataArr[i].name);
                $(_dom).css("background-image", dataArr[i].img)
            }
        } else {
            $(this).css("background-image", item.img);
            //修改其他未选中图片
            for (let i = 0; i < dataArr.length; i++) {
                if (dataArr[i].name != item.name)
                    var _dom = getElByName(dataArr[i].name);
                $(_dom).css("background-image", nChoseImg)
            }
        }
    })
}