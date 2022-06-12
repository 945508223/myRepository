//k线图提示框自定义格式
var me = {};
function setKlineTooltip(option, element) {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    if (element.attr("dv_opkline") == "FALSE") {
        option.tooltip.formatter = function (params) {
            var result = params[0].name + "<br/>";
            var str = "";
            params.forEach(function (item) {
                str += item.seriesName + ":  " + item.value + "<br/>"
            });
            return result + str
        }
    } else {
        var tpFormatter = element.attr("dv_ktooltip");
        option.tooltip.formatter = function (params) {
            //构造map
            var dataMap = {};
            var dimFiled = me.dimItems.NCODE;
            var dimData = params[0].name;

            dataMap[dimFiled] = dimData;
            for (let i = 1; i <= measureItems.length; i++) {
                var measFiled = measureItems[i].NCODE;
                var measData = params[0].data[i];
                dataMap[measFiled] = measData
            }
            //处理自定义标签格式
            //切分{}获取传递的值
            var reg = new RegExp('(?<=\{)[0-9a-zA-Z_]+(?=\})', "g");
            //解析原来标签formatter 先按照换行符号进行切割
            var formatterArr = tpFormatter.split(",");
            //记录新的formatter的数组
            var newFormatterArr = [];
            //处理切割后的字符串 获取 {}中的值
            for (let j = 0; j < formatterArr.length; j++) {
                //处理多个换行
                if (formatterArr[j] == "") {
                    newFormatterArr.push("\n");
                    continue;
                }
                //通过正则表达式获取{}中的内容
                var dataArr = formatterArr[j].match(reg); //显示的数据字符数组  a b
                if (dataArr == undefined) {
                    newFormatterArr.push(formatterArr[j] + "\n");
                    continue;
                }
                //通过正则表达式获取{}中的内容
                var dataArr = formatterArr[j].match(reg); //显示的数据字符数组  a b
                if (dataArr == undefined) {
                    newFormatterArr.push(formatterArr[j] + "\n");
                    continue;
                }
                //将输入的值与param中存放的进行比对 相同则去除值 替换掉formatter中的字符串为数据
                var _formatter = "";
                for (let n = 0; n < dataArr.length; n++) {
                    for (let filed in dataMap) {
                        if (filed == dataArr[n]) {
                            if (n == 0) {
                                _formatter = formatterArr[j].replace("{" + dataArr[n] + "}", (dataMap[filed]));
                                continue;
                            } else {
                                _formatter = _formatter.replace("{" + dataArr[n] + "}", (dataMap[filed]))
                                continue;
                            }
                        }
                    }
                }

                newFormatterArr.push(_formatter)
            }

            var newFormatter = newFormatterArr.join("\n");

            return (newFormatter.replace(/\[/g, "{")).replace(/\]/g, "}")
        }
    }


    return option;
}