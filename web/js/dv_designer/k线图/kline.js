var rawData = [
    {
        day: '2015/12/31',
        open: '3570.47',
        close: '3539.18',
        height: '3580.6',
        low: '3538.35',
    },
    {
        day: '2015/12/30',
        open: '3566.73',
        close: '3572.88',
        height: '3573.68',
        low: '3538.11',
    },
];

baseCharts.getDataobjForDimOne = function (element, result, ctrlname, dimItems, measureItems) {

    var dataObj = {
        legend_data: [],
        yAxis_data: [],
        xAxis_data: [],
        series_data: []

    };
    var seriesData_ = {};
    var yAxisData = {
        left: "",
        right: ""
    };
    //构造k线图数据结构
    var dimcname = dimItems[0]["NCODE"].toUpperCase() + "NAME";//获取维度名 作为x轴数据
    dataObj.xAxis_data = result.map(function (item) {
        return item[dimcname];
    });

    //获取每个度量的字段名
    var measureFieldName = [];
    for (let i = 0; i < measureItems.length; i++) {
        measureFieldName.push(getMeasureFieldName(measureItems[i]).toUpperCase())
    }
    dataObj.series_data = result.map(function (item) {
        return [item.measureFieldName[0], item.measureFieldName[1], item.measureFieldName[2], item.measureFieldName[3]];
    });

};

var _data = [];
    _data = seriesData_.map(function (item) {

        for (let i = 0; i < item[0].length; i++) {
            _data = [item[0][i], item[1][i], item[2][i], item[3][i]]
        }
        return _data;
    });
