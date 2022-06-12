var baseCharts = {};
//基础信息设置>>图表ID：{title:'',number:'',percent:'',//0否1是suffix:'',tenThousand:''}
var basicInformation={
    //"ctrl_219120-141336941":{title:'支付',number:'2',percent:'0',suffix:'万元',tenThousand:'1'}
}
/**
 * 创建拖动元素
 * @param {} element
 * @param {} ctrlinfo
 * @param {} properties
 */
baseCharts.createChart=function(element,ctrlinfo,properties){
    debugger
    var opt = null;
    if(ctrlinfo.CTRLTYPE==="echarts"){
        if(ctrlinfo.CTRLNAME==="BAR"){
            opt = baseOpt.barOpt();
        }else if(ctrlinfo.CTRLNAME==="PIE"){
            opt = baseOpt.pieOpt();
        }else if(ctrlinfo.CTRLNAME==="TREE"){
            opt = baseOpt.treeOpt();
        }else if(ctrlinfo.CTRLNAME==="LINE"){
            opt = baseOpt.lineOpt();
        }else if(ctrlinfo.CTRLNAME==="SCATTER"){
            opt = baseOpt.scatterOpt();
        }else if(ctrlinfo.CTRLNAME==="MIXED"){
            opt = baseOpt.mixedOpt();
        }else if(ctrlinfo.CTRLNAME==="LIQUID"){
            opt = baseOpt.liquidOpt();
        }else if(ctrlinfo.CTRLNAME==="WCLOUD"){
            opt = baseOpt.wcloudOpt();
        }else if(ctrlinfo.CTRLNAME==="BLINE"){
            opt = baseOpt.blineOpt();
        }else if(ctrlinfo.CTRLNAME==="STACKBAR"){
            opt = baseOpt.stackBarOpt();
        }
    }
    //赋缺省值
    for (var i=0;i<properties.length;i++){
        var p = properties[i];
        if (p.PTYPE=="CTRLDEF"){
            if ((p.MAPPROPERTY!= undefined) && (p.DEFAULTVAL!=undefined)){
                var list_mapproperty = p.MAPPROPERTY.split("-");
                var pvalue = p.DEFAULTVAL;
                if (pvalue.toUpperCase()=="TRUE")
                    pvalue=true;
                else if (pvalue.toUpperCase()=="FALSE")
                    pvalue=false;
                setItem(opt, list_mapproperty, pvalue);
                /*if (list_mapproperty.length==1)
                    opt[list_mapproperty[0]] = pvalue;
                else if (list_mapproperty.length==2){
                    if(opt[list_mapproperty[0]]){
                        opt[list_mapproperty[0]][list_mapproperty[1]] = pvalue;
                    }else{
                        opt[list_mapproperty[0]]={};
                        opt[list_mapproperty[0]][list_mapproperty[1]] = pvalue;
                    }
                }else if (list_mapproperty.length==3){
                    if(opt[list_mapproperty[0]]){
                        if(opt[list_mapproperty[0]][list_mapproperty[1]]){
                                opt[list_mapproperty[0]][list_mapproperty[1]][list_mapproperty[2]] = pvalue;
                        }else{
                            opt[list_mapproperty[0]][list_mapproperty[1]]={};
                            opt[list_mapproperty[0]][list_mapproperty[1]][list_mapproperty[2]] = pvalue;
                        }
                    }else{
                        opt[list_mapproperty[0]]={};
                        opt[list_mapproperty[0]][list_mapproperty[1]]={};
                        opt[list_mapproperty[0]][list_mapproperty[1]][list_mapproperty[2]]= pvalue;
                    }
                }*/
            }
        }
    }
    var myChart = echarts.init(element[0]);
    myChart.setOption(opt);
    charts[element.attr("id")]=myChart;
    options[element.attr("id")] = opt;
};
//打开报表时，重新加载饼图
baseCharts.load=function(element,option){
    debugger
    //生成图表后，会生成_echarts_instance_属性，在保存后会导致再次加载图表渲染不出来
    element.removeAttr("_echarts_instance_");
    var myChart = echarts.init(element[0]);
    myChart.setOption(option);
    charts[element.attr("id")]=myChart;
    options[element.attr("id")] = option;
    myChart.on('dblclick', function (params) {
        baseCharts.dblClickLinkChart(element.attr("id"),params);
    });
    if(window.setSelectionCss)
        setSelectionCss(element);
};

//图表双击事件
baseCharts.dblClickLinkChart = function (elementid, params) {
    if (chartLinks[elementid] != null) {
        var key = elementid + "||dv_dim";
        if (dragDatas[key] == undefined)
            return;
        var dimitems = getOrderItems(dragDatas[key]);
        var filterItems = new Array();
        for (var i = 0; i < dimitems.length; i++) {
            var firstdim = dimitems[i];
            var itemNode = $.extend(true, {}, firstdim);
            //取CID
            var dimItemName = params.name;
            if (i > 0)
                dimItemName = params.seriesName;
            var CID = 0;
            $.each(cacheChartData[elementid], function (n, item) {
                    if (item[itemNode.NCODE.toUpperCase() + "NAME"] == dimItemName)
                        CID = item[itemNode.NCODE.toUpperCase() + "ID"];
                }
            );

            //FILTER
            itemNode.FILTER = "1:" + CID;
            filterItems.push(itemNode);
        }
        reloadByLinkFilter(elementid, filterItems);
    }
}

//根据维度度量，刷新饼图数据
//拖拽的数据源项发生改变时，触发
baseCharts.loadData = function (element, linkFilter) {
    //取维度
    var key = element.attr("id") + "||dv_dim";
    var dimItems = null;
    if (dragDatas[key] != undefined) {
        dimItems = dragDatas[key];
        //Object.getOwnPropertyNames(items).length;
    }
    //取度量
    key = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[key] != undefined)
        measureItems = dragDatas[key];
    //取其他过滤条件 TODO
    key = element.attr("id") + "||dv_filter";
    var filterItems = {};
    if (dragDatas[key] != undefined)
        filterItems = dragDatas[key];
    //link\pub filter
    if (linkFilter != null) {
        for (var i = 0; i < linkFilter.length; i++)
            filterItems["link" + i] = $.extend(true, {}, linkFilter[i]);
    }
    //取数据
    var loaded = false;
    debugger
    if ((dimItems != null) && (measureItems != null)) {
        if ((Object.getOwnPropertyNames(dimItems).length > 0) && (Object.getOwnPropertyNames(measureItems).length > 0)) {
            //区分两个度量的情况
            var ctrlname = element.attr("ctrlname");
            var mixMeasureCount=1;
            if(ctrlname=='MIXED'||ctrlname=='BLINE'){//处理混合图的情况
                mixMeasureCount=(Object.getOwnPropertyNames(measureItems).length>=2)?2:(Object.getOwnPropertyNames(measureItems).length);
            }
            var _measureItems = getOrderItems(measureItems);
            var _dimItems = getOrderItems(dimItems);
            if(_measureItems.length>=mixMeasureCount){
                var result=[];
                var dimJson={};
                var dimNum=((_dimItems.length>2)?2:_dimItems.length);
                if(ctrlname=='LIQUID'){
                    dimNum=1;
                }
                for(var x=0;x<dimNum;x++){
                    dimJson[_dimItems[x].NTYPE+"||"+_dimItems[x].FACTNAME+"||"+_dimItems[x].NCODE]=_dimItems[x]
                }
                var measureJson={}
                for(var k=0;k<((_measureItems.length>mixMeasureCount)?mixMeasureCount:_measureItems.length);k++){
                    measureJson[_measureItems[k].NTYPE+"||"+_measureItems[k].FACTNAME+"||"+_measureItems[k].NCODE]=_measureItems[k];
                }
                //result = YCDCommon.Ajax.syncAjax("../loaddata/loadChartsData", { "sbtid": source.sbtid, "dimItems": JSON.stringify(dimJson), "measureItems": JSON.stringify(measureJson), "filterItems": JSON.stringify(filterItems) });
                debugger
                result =loadChartsData(element,dimJson,measureJson,filterItems);
                if (result != null && result.length > 0) {
                    if(ctrlname=='LIQUID'&&result.length>30){
                        alert("数据量过多,暂不支持显示!</br>(数据量<=30)");
                        loaded = false;
                    }else{
                        var dataObj = baseCharts.buildComponentData(element, result);
                        var option = baseCharts.getOptionByData(element, dataObj.legend_data, dataObj.series_data, dataObj.xAxis_data,dataObj.yAxis_data);
                        baseCharts.load(element, option);
                        cacheChartData[element.attr("id")] = result;
                        loaded = true;
                    }
                }
            }
        }
    }
    if (!loaded) {
        var ctrlname = element.attr("ctrlname");
        var arr;
        var option;
        switch(ctrlname){
            case 'STACKBAR':
                arr = baseOpt. default_stackBar_series_data;
                option = baseCharts.getOptionByData(element, baseOpt.default_stackBar_legend_data, arr);
                break;
            case 'MIXED':
                arr = baseOpt.default_mix_series_data;
                option = baseCharts.getOptionByData(element, baseOpt.default_mix_legend_data, arr, baseOpt.default_mix_xAxis_data);
                break;
            case 'LIQUID':
                arr = baseOpt.default_liquid_series_data;
                option = baseCharts.getOptionByData(element, baseOpt.default_liquid_legend_data, arr);
                break;
            case 'WCLOUD':
                arr = baseOpt.default_wcloud_series_data;
                for(var i = 0;i < arr.length;i++)
                    arr[i]["type"] =  (ctrlname+"").toLowerCase();
                var arr = [{"data":getWcloudOptData(arr)}];
                option = baseCharts.getOptionByData(element, baseOpt.default_legend_data,arr, baseOpt.default_xAxis_data);
                break;
            case 'BLINE':
                arr = baseOpt.default_bline_series_data;
                option = baseCharts.getOptionByData(element, baseOpt.default_bline_legend_data,arr, baseOpt.default_bline_xAxis_data);
                break;
            default:
                arr = baseOpt.default_series_data;
                for(var i = 0;i < arr.length;i++)
                    arr[i]["type"] =  (ctrlname+"").toLowerCase();
                option = baseCharts.getOptionByData(element, baseOpt.default_legend_data, arr, baseOpt.default_xAxis_data);
                break;
        }
        //option.title.text = "";

        cacheChartData[element.attr("id")] = null;
        baseCharts.load(element, option);
        //$("#pp_dv_title").val("");
        delete cacheChartData[element.attr("id")];
    }
};
//构造组件需要的数据
baseCharts.buildComponentData = function (element, result) {
    debugger
    var dataObj = {};
    //生成数据
    var xAxisData = new Array(); //横坐标数据 （第一个维度的类别）
    var yAxisData = [ //y轴为度量
        {
            type: 'value',
            name: '金额',
            position: 'left',
            offset: 0
        }
    ];
    var legendData = new Array();//图例数据（大于一个维度时，第二个作为维度数据作为图例）
    var seriesData = new Array();;

    //取维度
    var key = element.attr("id") + "||dv_dim";
    var dimItems = null;
    if (dragDatas[key]!=undefined)
        dimItems = getOrderItems(dragDatas[key]);//排序后

    //取度量
    key = element.attr("id") + "||dv_measure";
    var measureItems = null;
    if (dragDatas[key]!=undefined)
        measureItems = getOrderItems(dragDatas[key]);//排序后

    if(dimItems!=null && measureItems !=null){
        var dim1Type = new Array();
        var dim2Type = new Array();
        var dim2Type_cid = new Array();
        var ctrlname = element.attr("ctrlname");
        switch(ctrlname){
            case 'MIXED':
                dataObj=getMixedDataobj(result,dataObj,xAxisData,yAxisData,legendData,seriesData,ctrlname,dimItems,measureItems,dim1Type,dim2Type,dim2Type_cid);
                break;
            case 'LIQUID':
                dataObj=getLiquidDataobj(result,dataObj,xAxisData,yAxisData,legendData,seriesData,ctrlname,dimItems,measureItems,dim1Type,dim2Type,dim2Type_cid);
                break;
            default:
                dataObj=getdDefaultDataobj(result,dataObj,xAxisData,yAxisData,legendData,seriesData,ctrlname,dimItems,measureItems,dim1Type,dim2Type,dim2Type_cid);
                break;

        }
        //TODO
        //基础信息设置>>图表ID：{title:'',number:'',percent:'',//0否1是suffix:'',tenThousand:''}
        var basicInfo;
        key= element.attr("id");
        if(basicInformation[key]){
            basicInfo=basicInformation[key];
        }
        //度量纵轴标题
        var length=(ctrlname=="MIXED")?2:1;
        //length=(measureItems.length>=2)?2:measureItems.length;
        for(var m=0;m<length;m++){
            if(basicInfo&&basicInfo[measureItems[m].NCODE]){
                var _basicInfo=basicInfo[measureItems[m].NCODE];
                //处理两个纵轴
                var name="";
                var suffix="";
                if(_basicInfo.title){
                    switch(ctrlname){
                        case 'LIQUID':
                            dataObj.xAxis_data=_basicInfo.title;
                            break;
                        case 'WCLOUD':
                            break;
                        default:
                            dataObj.yAxis_data[m].name=_basicInfo.title;
                            break;
                    }
                }
                //后缀
                if(_basicInfo.suffix){//有后缀优先后缀
                    suffix="("+_basicInfo.suffix+")";
                }else{
                    if(_basicInfo.tenThousand=='1'){
                        suffix="(万元)";
                    }
                    if(_basicInfo.percent=='1'){
                        suffix="(%)";
                    }
                }
                if(suffix!=""){
                    switch(ctrlname){
                        case 'LIQUID':
                            dataObj.xAxis_data+=suffix;
                            break;
                        case 'WCLOUD':
                            break;
                        default:
                            dataObj.yAxis_data[m].name+=suffix;
                            break;
                    }
                }
                debugger
                //数据加工:如果两个维度,取不同的的data遍历,如果是一个维度,遍历所有
                if(length==1){
                    var formatterData;
                    switch(ctrlname){
                        case 'LIQUID':
                            formatterData=dataObj.series_data;
                            for(var v=0;v<formatterData.length;v++){
                                //转小数
                                if(_basicInfo.number){
                                    formatterData[v].value=parseFloat(formatterData[v].value).toFixed(_basicInfo.number);
                                }
                            }

                            break;
                        case 'WCLOUD':
                            formatterData=dataObj.series_data;
                            break;
                        default:
                            formatterData=dataObj.series_data;
                            for(var r=0;r<formatterData.length;r++){
                                var _data=formatterData[r].data;
                                for(var d=0;d<_data.length;d++){
                                    //百分号
                                    if(_basicInfo.percent=='1'){
                                        _data[d]=floatDiv(_data[d],100);
                                    }
                                    //万元
                                    if(_basicInfo.tenThousand=='1'){
                                        _data[d]=floatDiv(_data[d],10000);
                                    }
                                    //转小数
                                    if(_basicInfo.number){
                                        _data[d]=parseFloat(_data[d]).toFixed(_basicInfo.number);
                                    }
                                }
                                formatterData[r].data=_data;
                            }
                            break;

                    }
                    dataObj.series_data=formatterData;

                }else{
                    var formatterData=dataObj.series_data;
                    var begin=m*(formatterData.length/2);
                    var end=begin+(formatterData.length/2);
                    for(var b=begin;b<end;b++){
                        var oneData=formatterData[b].data;
                        for(var r=0;r<oneData.length;r++){
                            //百分号
                            if(_basicInfo.percent=='1'){
                                oneData[r]=floatDiv(oneData[r],100);
                            }
                            //万元
                            if(_basicInfo.tenThousand=='1'){
                                oneData[r]=floatDiv(oneData[r],10000);
                            }
                            //转小数
                            if(_basicInfo.number){
                                oneData[r]=parseFloat(oneData[r]).toFixed(_basicInfo.number);
                            }
                        }
                        formatterData[b].data=oneData;
                    }
                    dataObj.series_data=formatterData;
                }

            }else{//默认转两位小数
                if(length==1){
                    switch(ctrlname){
                        case 'LIQUID':
                            formatterData=dataObj.series_data;
                            for(var v=0;v<formatterData.length;v++){
                                //转小数
                                formatterData[v].value=parseFloat(formatterData[v].value).toFixed('2');
                            }

                            break;
                        case 'WCLOUD':
                            formatterData=dataObj.series_data;
                            break;
                        default:
                            var formatterData=dataObj.series_data;
                            for(var r=0;r<formatterData.length;r++){
                                var _data=formatterData[r].data;
                                for(var d=0;d<_data.length;d++){
                                    //转小数
                                    _data[d]=parseFloat(_data[d]).toFixed('2');
                                }
                                formatterData[r].data=_data;
                            }
                            break;
                    }
                    dataObj.series_data=formatterData;
                }else{
                    var formatterData=dataObj.series_data;
                    if(ctrlname!='WCLOUD'){
                        for(var b=0;b<formatterData.length;b++){
                            var oneData=formatterData[b].data;
                            for(var r=0;r<oneData.length;r++){
                                oneData[r]=parseFloat(oneData[r]).toFixed('2');
                            }
                            formatterData[b].data=oneData;
                        }
                    }
                    dataObj.series_data=formatterData;
                }
            }
        }
    }
    return dataObj;
}
/**
 * 取液体图dataobj对象
 * @param {} result
 * @param {} dataObj
 * @param {} xAxisData
 * @param {} yAxisData
 * @param {} legendData
 * @param {} seriesData
 * @param {} ctrlname
 * @param {} dimItems
 * @param {} measureItems
 * @return {}
 */
function getLiquidDataobj(result,dataObj,xAxisData,yAxisData,legendData,seriesData,ctrlname,dimItems,measureItems){
    debugger
    var max=0;
    for(var x=0;x<result.length;x++){
        var num = result[x][measureItems[0]["NCODE"].toUpperCase()];
        if(num>=0){max+=num}
    }
    var ncode_1 = dimItems[0]["NCODE"].toUpperCase();
    var ncode_2 = measureItems[0]["NCODE"].toUpperCase();
    var valurArr=[];
    for(var i=0;i<result.length;i++){
        var value=floatDiv(result[i][ncode_2],max);
        var name=result[i][ncode_1+"NAME"]+"("+result[i][ncode_2]+")";
        seriesData.push({name:name,value:value});
    }
    seriesData=seriesData.sort(compare('value','desc'));
    dataObj.series_data = seriesData;
    return dataObj;
}
//升序/降序
function compare(property,type){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return (type=='asc')?(value1 - value2):(value2 - value1);
    }
}
/**
 * 取混合图dataobj对象
 * @param {} dataObj
 * @param {} xAxisData
 * @param {} yAxisData
 * @param {} legendData
 * @param {} seriesData
 * @param {} ctrlname
 * @param {} dimItems
 * @param {} measureItems
 * @return {}
 */
function getMixedDataobj(result,dataObj,xAxisData,yAxisData,legendData,seriesData,ctrlname,dimItems,measureItems){
    if(ctrlname=='MIXED'&&measureItems.length >= 2){//混合图两个度量
        if(dimItems.length == 1){
            var seriesData_0 = new Array();
            var seriesData_1 = new Array();
            for(var i=0;i<result.length;i++){
                var ncode_1 = dimItems[0]["NCODE"].toUpperCase();
                xAxisData.push(result[i][ncode_1+"NAME"]);
                legendData.push(result[i][ncode_1+"NAME"]);
                seriesData_0.push(result[i][measureItems[0]["NCODE"].toUpperCase()]);
                seriesData_1.push(result[i][measureItems[1]["NCODE"].toUpperCase()]);
            }
            seriesData.push({"type": "bar", "name": measureItems[0].NTEXT, data: seriesData_0 });
            seriesData.push({"type": "line", "name": measureItems[1].NTEXT,yAxisIndex: 1, data: seriesData_1 });
            dataObj.legend_data = [measureItems[0].NTEXT,measureItems[1].NTEXT];
        }else if(dimItems.length >= 2){
            debugger
            //第一个维度的字段名
            var ncode_0 = dimItems[0]["NCODE"].toUpperCase();
            var ncode_3 = measureItems[0]["NTEXT"];
            //第二个维度的字段名
            var ncode_1 = dimItems[1]["NCODE"].toUpperCase();
            var ncode_4 = measureItems[1]["NTEXT"];
            var dim2={};
            for(var i=0;i<result.length;i++){
                //加工数据
                //1.legendData
                if(dim2[result[i][ncode_1+"NAME"]]){//根据维度2归类数据
                    dim2[result[i][ncode_1+"NAME"]].push(result[i]);
                }else{
                    dim2[result[i][ncode_1+"NAME"]]=[result[i]];
                }
                //xAxisData
                if(xAxisData.indexOf(result[i][ncode_0+"NAME"]) == -1)
                    xAxisData.push(result[i][ncode_0+"NAME"]);
            }
            //legendData
            var dimkeys= Object.keys(dim2);
            legendData=dimkeys.concat(dimkeys);
            for(var l=0;l<legendData.length;l++){
                legendData[l]=legendData[l]+((l<(legendData.length/2))?ncode_3:ncode_4)
            }
            //seriesData
            var barData=[];
            var lineData=[];
            var count=0;
            for(var s in dim2){
                var oneDim=dim2[s];
                var seriesData_0=[];
                var seriesData_1=[];
                for(var o=0;o<oneDim.length;o++){
                    seriesData_0.push(oneDim[o][measureItems[0]["NCODE"].toUpperCase()]);
                    seriesData_1.push(oneDim[o][measureItems[1]["NCODE"].toUpperCase()]);
                }
                barData.push({"type": "bar", "name": legendData[count], data: seriesData_0 })
                lineData.push({"type": "line", "name": legendData[count+(legendData.length/2)],yAxisIndex: 1, data: seriesData_1 });
                count++;
            }
            barData.push.apply(barData,lineData);
            seriesData=barData;
            dataObj.legend_data=legendData;
        }

        dataObj.xAxis_data = xAxisData;
        dataObj.yAxis_data = [{type: 'value',name: measureItems[0].NTEXT},{type: 'value',name: measureItems[1].NTEXT}];
        dataObj.series_data = seriesData;

    }
    return dataObj;
}
/**
 * 取其他图表dataObj对象
 * @param {} result
 * @param {} dataObj
 * @param {} xAxisData
 * @param {} yAxisData
 * @param {} legendData
 * @param {} seriesData
 * @param {} ctrlname
 * @param {} dimItems
 * @param {} measureItems
 * @param {} dim1Type
 * @param {} dim2Type
 * @param {} dim2Type_cid
 */
function getdDefaultDataobj(result,dataObj,xAxisData,yAxisData,legendData,seriesData,ctrlname,dimItems,measureItems,dim1Type,dim2Type,dim2Type_cid){
    debugger
    // 维度等于2，度量 1，第一个维度为x轴，第二个维度为图例
    if(ctrlname!='MIXED'&&dimItems.length >= 2 && measureItems.length >= 1){
        //第一个维度的字段名
        var ncode_0 = dimItems[0]["NCODE"].toUpperCase();
        //第二个维度的字段名
        var ncode_1 = dimItems[1]["NCODE"].toUpperCase();
        for(var i=0;i<result.length;i++){
            //第一个维度的类别
            if(dim1Type.indexOf(result[i][ncode_0+"NAME"]) == -1)
                dim1Type.push(result[i][ncode_0+"NAME"]);

            //第二个维度的类别
            if(dim2Type.indexOf(result[i][ncode_1+"NAME"])== -1)
                dim2Type.push(result[i][ncode_1+"NAME"]);

            if(dim2Type_cid.indexOf(result[i][ncode_1+"ID"])== -1)
                dim2Type_cid.push(result[i][ncode_1+"ID"]);
        }

        //构造三类数据，分别是xAxisData、legendData、seriesData
        for(var i = 0; i< dim2Type.length;i++){ // 由 图例的个数产生数据的组数
            var tempArr = new Array();
            for(var j=0;j<result.length;j++){
                if(dim2Type_cid[i] == result[j][ncode_1+"ID"])
                    tempArr.push(result[j][measureItems[0]["NCODE"].toUpperCase()]);
            }
            if (ctrlname === "BAR") {
                seriesData.push({"type": "bar", "name": dim2Type[i], data: tempArr});
            } else if (ctrlname === "LINE") {
                seriesData.push({"type": "line", "name": dim2Type[i], data: tempArr});
            }
        }
        dataObj.legend_data = dim2Type;
        dataObj.xAxis_data = dim1Type;
        yAxisData[0].name=measureItems[0]["NTEXT"];
        dataObj.yAxis_data = yAxisData;
        dataObj.series_data = seriesData;
    }else if(ctrlname!='MIXED'&&dimItems.length == 1){//一个维度
        var seriesData_ = new Array();
        var maxCount=(measureItems.length>=2)?2:1;
        if(ctrlname=='BLINE'){
            if(maxCount==2){
                seriesData_={0:[],1:[]};
            }else{
                seriesData_={0:[]};
            }
        }
        for(var i=0;i<result.length;i++){
            var ncode_1 = dimItems[0]["NCODE"].toUpperCase();
            xAxisData.push(result[i][ncode_1+"NAME"]);
            legendData.push(result[i][ncode_1+"NAME"]);
            if(ctrlname == "BLINE"){
                for(var j = 0;j<maxCount;j++){
                    seriesData_[j].push(result[i][measureItems[j]["NCODE"].toUpperCase()]);
                }
            }else
                seriesData_.push(result[i][measureItems[0]["NCODE"].toUpperCase()]);
        }
        if (ctrlname === "BAR") {
            seriesData.push({"type": "bar", "name": dimItems[0].NTEXT, data: seriesData_ });
        } else if (ctrlname === "LINE") {
            seriesData.push({"type": "line", "name": dimItems[0].NTEXT, data: seriesData_ });
        }
        if(ctrlname == "WCLOUD"&&measureItems.length == 1){// 词云: 一个维度 一个度量
            var maxlength = result.length>5?5:result.length;
            var wcloudData=[];
            for(var i=0;i<maxlength;i++){
                wcloudData.push({"name":xAxisData[i],"value":seriesData_[i]})
            }
            seriesData.push({"type": "wcloud", "name": dimItems[0].NTEXT, data: getWcloudOptData(wcloudData)});
        }
        if(ctrlname == "BLINE"&&measureItems.length <=2){
            dataObj.xAxis_data = xAxisData;
            dataObj.yAxis_data = yAxisData;
            dataObj.legend_data=[];
            for(var i = 0;i<measureItems.length;i++){
                debugger
                seriesData.push({"type": "line", "name": measureItems[i]["NTEXT"], data: seriesData_[i] });
                dataObj.legend_data.push(measureItems[i]["NTEXT"]);
            }result
            dataObj.series_data = seriesData;
            return dataObj;
        }
        dataObj.legend_data = [dimItems[0].NTEXT];
        dataObj.xAxis_data = xAxisData;
        yAxisData[0].name=measureItems[0]["NTEXT"];
        dataObj.yAxis_data = yAxisData;

        dataObj.series_data = seriesData;
    }
    return dataObj;
}
//根据新数据重绘图
baseCharts.getOptionByData = function (element, legend_data, series_data, xAxis_data,yAxis_data) {
    debugger
    var ctrlname = element.attr("ctrlname");
    var option = options[element.attr("id")];
    if(ctrlname=='LIQUID'&&xAxis_data){
        option["series"][0].name=xAxis_data;
    }
    if (option["xAxis"] != undefined&& xAxis_data) {
        switch(ctrlname){
            case 'MIXED':
                option["xAxis"][0].data = xAxis_data;
                break;
            case 'LIQUID':
                break;
            case 'BLINE':
                option["xAxis"][0].data = xAxis_data;
                break;
            default:
                option["xAxis"]["data"] = xAxis_data;
                break;

        }
    }
    if(option["legend"]&&legend_data){
        switch(ctrlname){
            case 'LIQUID':
                option["legend"] = legend_data;
                break;
            default:
                option["legend"]["data"] = legend_data;
                break;

        }
    }
    if(option["series"]&&series_data){
        debugger
        switch(ctrlname){
            case 'LIQUID':
                option["series"][0].data = series_data;
                break;
            case 'WCLOUD':
                option["series"][0].data = series_data[0].data;
                break;
            case 'BLINE':
                option["series"]=[];
                for(var i = 0;i<series_data.length;i++){
                    option["series"][i]=baseOpt.default_bline_series_data[i];
                    option["series"][i].data = series_data[i].data;
                    option["series"][i].name = series_data[i].name;
                }
                break;
            case 'MIXED':
                for(var i = 0;i<series_data.length;i++){
                    option["series"][i].data = series_data[i].data;
                    option["series"][i].name = series_data[i].name;
                }
                break;
            default:
                option["series"] = series_data;
                break;

        }
    }
    if (option["yAxis"] && yAxis_data){
        switch(ctrlname){
            case 'MIXED':
                option["yAxis"] = yAxis_data;
                break;
            default:
                option["yAxis"][0].name = yAxis_data[0].name;
                break;

        }
    }
    return option;
};

