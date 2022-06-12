function getDataMap(option, params, dmMap) {
    var dataMap = {}//存储维度 度量 字段 以及对应的数据

    if (params.axisDim = "y") {
        //不反转xy轴 x轴为维度轴
        var dataIndex;
        // 多维度 维度不转度量
        if (option.dimNotToMeasure == true) {
            dataIndex = params[0].dataIndex;//鼠标滑动到的数据index

            for (let i = dmMap.dimItems.length - 1; i >= 0; i--) {
                var dimFiled;
                var dimData;
                if (i == dmMap.dimItems.length - 1) {
                    dimFiled = dmMap.dimItems[i].NCODE;
                    dimData = option.xAxis[dmMap.dimItems.length - 1 - i].data[dataIndex];
                    dataMap[dimFiled] = dimData;
                } else {

                    var nowXlength = option.xAxis[dmMap.dimItems.length - 1 - i].data.length;
                    var beforeXlength = option.xAxis[dmMap.dimItems.length - 2 - i].data.length;

                    dimFiled = dmMap.dimItems[i].NCODE;

                    dataIndex = Math.floor(dataIndex / (beforeXlength/nowXlength));
                    dimData = option.xAxis[dmMap.dimItems.length - 1 - i].data[dataIndex].value;
                    dataMap[dimFiled] = dimData;
                }
            }
        } else {
            //todo 多维度 维度转度量

        }


        for (let i = 0; i < dmMap.measureItems.length; i++) {
            var measFiled = dmMap.measureItems[i].NCODE;
            var measData = params[i].data;
            dataMap[measFiled] = measData
        }

    } else {
        //todo 反转xy轴
    }

    return dataMap
}