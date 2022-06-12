
function setStackSum(option, element) {
    //如果最后一个series为总和 属性值为true 直接返回
    var last = option.series[option.series.length - 1].name;
    if (last == "总和" && option.stackSum == "true") {

        var data = option.series[option.series.length - 1].data;
        //data = setStackSumData(element, data);
        option.series[option.series.length - 1].data = data;
        return option;
    }
    //处理柱状图堆叠计算总和
    if (option.stackSum && last != "总和") {
        debugger
        var stack = option.series[0].stack;
        var allData = [];
        var countData = [];
        for (var i = 0; i < (option.series.length); i++) {
            allData.push(option.series[i].data);
        }
        for (var i = 0; i < (option.series[0].data).length; i++) {
            var count = 0;
            for (var j = 0; j < allData.length; j++) {
                var num = parseFloat(allData[j][i]);
                count += num;
            }
            countData.push(count)
        }

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

//处理堆叠柱状图的总和数据


//var basicInfoMark;
function getBasicInfo(element, countData) {

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
    if (basicInfo && basicInfo[measureItems[0].NCODE]) {
        var _basicInfo = basicInfo[measureItems[0].NCODE];
        //记录basicInfo 用来判断是否修改了数据单位
        //basicInfoMark = _basicInfo
        var _countData = countData;
        for (var d = 0; d < _countData.length; d++) {

            _countData[d] = formatterNumThousand(_basicInfo, _countData[d])

            //转小数
            if (_basicInfo.number) {
                _countData[d] = parseFloat(_countData[d]).toFixed(_basicInfo.number);
            }
        }

        countData = _countData;
    }
    return countData;
}










if(data[0].YEAR_SMPERIOD_PERCENT==null||data[0].YEAR_SMPERIOD_PERCENT==undefined){

}