//轮播配置
let mapCfg_ = {
    index_: 0,
    time_: 5000,
    intervalKey: '',
}

//定时轮播
function setIntervalChangeColor() {

    mapCfg_.intervalKey = setInterval(function () {

        var map = $DV.getEl("地图1");
        var id = map.id;
        let mapIns = charts[id]
        mapIns.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_

        });
        mapIns.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_
        });
        mapIns.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_ == 0 ? 10 : mapCfg_.index_ - 1
        });


        if (mapCfg_.index_ == 10)
            mapCfg_.index_ = 0
        else
            mapCfg_.index_++

    }, mapCfg_.time_)

}

//切换表格数据
function changeGridData_(params) {
    debugger
    changeLeftGrid(params);
    changeRightGrid(params);
    changeSanBaoGrid(params);

}

function changeSanBaoGrid(params){
    let sanbaoIframe = '';
    if (parent.$DV.getEl('左下_表格') && $(parent.$DV.getEl('左下_表格')).find('iframe') && $(parent.$DV.getEl('左下_表格')).find('iframe')[0]) {
        sanbaoIframe = $(parent.$DV.getEl('左下_表格')).find('iframe')[0].contentWindow;
    }
    if (sanbaoIframe && sanbaoIframe.changeDataByCode) {
        sanbaoIframe.changeDataByCode(mapCfg_.data[params.dataIndex].MOF_DIV_CODE.substr(0,4))
    }
}

function changeRightGrid(params) {
    let rightframe = '';
    if (parent.$DV.getEl('全省预算编制数网页框') && $(parent.$DV.getEl('全省预算编制数网页框')).find('iframe') && $(parent.$DV.getEl('全省预算编制数网页框')).find('iframe')[0]) {
        rightframe = $(parent.$DV.getEl('全省预算编制数网页框')).find('iframe')[0].contentWindow;
    }
    if (rightframe && rightframe.changeDataByCode) {
        rightframe.changeDataByCode(mapCfg_.data[params.dataIndex].MOF_DIV_CODE.substr(0,4))
    }
}

function changeLeftGrid(params){
    let leftIframe = '';
    if (parent.$DV.getEl('右下_表格_网页框') && $(parent.$DV.getEl('右下_表格_网页框')).find('iframe') && $(parent.$DV.getEl('右下_表格_网页框')).find('iframe')[0]) {
        leftIframe = $(parent.$DV.getEl('右下_表格_网页框')).find('iframe')[0].contentWindow;
    }
    if (leftIframe && leftIframe.changeDataByCode) {
        leftIframe.changeDataByCode(mapCfg_.data[params.dataIndex].MOF_DIV_CODE.substr(0,4))
    }
}

function loadAfter__() {
    debugger
    try {
        var loadAfterInterValKey = setInterval(function () {
            let map = $DV.getEl("地图1");
            if (map && options && options[map.id] && charts[map.id]) {
                setTimeout(function () {
                    setIntervalChangeColor();
                    bindEventForMap_(charts[map.id]);
                    mapCfg_.data = deepClone_(options[map.id].series[0].data);
                })
                clearInterval(loadAfterInterValKey)
            }
        })
    } catch (e) {
        clearInterval(loadAfterInterValKey)
    }
}

//绑定事件
function bindEventForMap_(mapIns) {
    mapIns.on('mouseover', function (params) {
        clearInterval(mapCfg_.intervalKey);
        mapIns.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: mapCfg_.index_ == 0 ? 10 : mapCfg_.index_ - 1
        });
        changeGridData_(params)

    });

    mapIns.on('mouseout', function () {
        setIntervalChangeColor()
    });
    mapIns.on('highlight', function (params) {
        debugger
        changeGridData_(params)
    });

}

//加载完成设置轮播
loadAfter__();


function deepClone_(obj) {
    /**
     * 判别类型
     * @param {} o
     * @return {String}
     */
    function isClass(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    var result, oClass = isClass(obj);
    // 确定result的类型
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);// 递归调用
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}