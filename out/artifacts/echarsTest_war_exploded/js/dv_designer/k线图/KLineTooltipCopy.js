
var me ={}
function setKlineTooltip(option, element) {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    /* //取维度
     var key = element.attr("id") + "||dv_dim";
     var dimItems = null;
     if (dragDatas[key] != undefined)
         dimItems = getOrderItems(dragDatas[key]);//排序后

     //取度量
     var measureItems = null;
     var measureItems_ = getShowMeasure(element);
     measureItems = getOrderItems(measureItems_);//排序后
     me = measureItems
     console.log(dimItems)
     console.log(measureItems)*/
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
        var formatter = element.attr("dv_ktooltip");
        var namearr = formatter.split(",")
        option.tooltip.formatter = function (params) {
            console.log(me.measureItems[0].NTEXT)
            var result = "";
            var str = "";
            params.forEach(function (item) {
                result = namearr[0] + ":  " + item.axisValue + "<br/>"
                for (let i = 1; i < 5; i++) {
                    str += namearr[i] + ":  " + item.data[i] + "<br/>"
                }
            });
            return result + str +"<br/>"+me.measureItems[0].NTEXT
        }
    }
    return option;
}