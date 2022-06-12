function setStackSum(option, element) {
    //如果最后一个series为总和 属性值为true 直接返回
    var last = option.series[option.series.length - 1].name;
    if (last == "总和" && option.stackSum == "true") {
        var data = setSumData(option,element);
        option.series[option.series.length - 1].data = data;
        return option;
    }
    //处理柱状图堆叠计算总和
    if (option.stackSum && last != "总和") {
        //获取总和数据
        var countData = setSumData(option,element);
        var stack = option.series[0].stack;

        //设置总和series
        option.series.push({
                name: '总和',
                type: 'bar',
                stack: stack,
                color: 'rgba(0,0,0,0)',
                label: {
                    color: '#cef3ff',
                    show: true,
                    position: 'insideBottomRight',
                },
                data: countData
            }
        );
        return option;
    }
    // 删除总和
    if (!option.stackSum && last == "总和") {
        option.series.pop()
    }
    return option;
}

function setSumData(option,element) {
    var basicInfo = getBasicInfo(element);
    var allData = [];
    var countData = [];
    for (var i = 0; i < (option.series.length); i++) {
        allData.push(option.series[i].data);
    }
    for (var i = 0; i < (option.series[0].data).length; i++) {
        var count = 0;
        for (var j = 0; j < allData.length; j++) {
            var num = parseFloat(allData[j][i]).toFixed(basicInfo.number);
            count += num;
        }
        countData.push(count);
    }
    return countData;
}

//获取basicInfo
function getBasicInfo(element) {
    //取度量
    var measureKey = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[measureKey] != undefined) {
        measureItems = getOrderItems(dragDatas[measureKey])
    }
    //处理总和的数据
    var basicInfo;
    var basicKey = element.attr("id");
    if (basicInformation[basicKey]) {
        basicInfo = basicInformation[basicKey];
    }
    if(basicInfo&&basicInfo[measureItems[0].NCODE]){
        var _basicInfo = basicInfo[measureItems[0].NCODE];
    }
    return _basicInfo;

}


//点击不同光柱 切换数据
function changeData(checked) {

    if(checked=="收入增幅"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${SMPERIOD_ZZL_YB}<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${SMPERIOD_ZZL_YB}<div>")
    }
    if(checked=="一般公共预算收入"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${GEN_PUB_BUD_AMT}<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${GEN_PUB_BUD_AMT}<div>")
    }
    if(checked=="税占比"){
        $("#ctrl_718120-191631659").attr("dv_labelreg","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${SZB}<div>")
        $("#ctrl_718120-191631659").attr("dv_labelreg_text","<div class=\"labelalign\" style=\"color:#cef3ff;font-size:12px;\">${SZB}<div>")
    }
    loadDataById("ctrl_718120-191631659")
}

//获取basicInfo
function getBasicInfo(element) {
    //取度量
    var measureKey = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[measureKey] != undefined) {
        measureItems = getOrderItems(dragDatas[measureKey])
    }
    //处理总和的数据
    var basicInfo;
    var basicKey = element.attr("id");
    if (basicInformation[basicKey]) {
        basicInfo = basicInformation[basicKey];
    }
    if(basicInfo&&basicInfo[measureItems[0].NCODE]){
        var _basicInfo = basicInfo[measureItems[0].NCODE];
    }
    return _basicInfo;

}
