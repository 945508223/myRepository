//指标管理表格 点击事件触发指标页面表格刷新 传递参数
$DS.loadCtrl("TAB");
var tabId = $DS.getCtrl("TAB").info.ds_id;
$("#" + tabId).find("iframe").eq(1)[0].contentWindow.flashGrid(val.GUID, val.AMOUNT);

var pageObj = {
    // selectMoneyData:[],//初始化查询的 分配金额数据
    total: "",//总额
    guid: "",//guid
    gridDataObj: {},//表格数据对象
    editAfterData: {},//编辑过的数据
    editBeforeData: {},//获取焦点时记录的数据
    editRows: {},//编辑过数据用于保存
    firstLoad: true,//第一次加载页面
    oldData:""//记录表格原始数据
};

//====================================指标分配页面刷新表格======================================================
function flashGrid(guid, amount) {
    pageObj.guid = guid;
    pageObj.total = amount;
    $DS.loadCtrl("指标分配");
}

/**
 * 重置表格数据
 */
function reloadGrid() {
    debugger
    if(pageObj.oldData){
        $DS.getCtrl("指标分配").info.ds_grid = pageObj.oldData;
        setLabelData();
    }
}

//===================================调整样式==============================
var picArr = ["总金额图片", "已用金额图片", "可用金额图片", "指标进行度图片"];
var textArr = ["总金额文字", "已用金额文字", "可用金额文字", "指标进行度文字"];


//修改图片样式
function changeStyle(size, fontSize) {
    for (let i = 0; i < picArr.length; i++) {
        var picLabel = $DS.getCtrl(picArr[i]).info;
        picLabel.ds_label_background_size = '100% 100%';
    }
    for (let i = 0; i < textArr.length; i++) {
        var picLabel = $DS.getCtrl(textArr[i]).info;
        picLabel.ds_label_fontsize = fontSize;
    }
}


//=========================初始化 设置表格自定义列以及标签数据=====================================================================

function initGridlabelData(gridData) {
    if (!pageObj.selectMoneyData || pageObj.selectMoneyData.length <= 0) {
        // var parentGUID = YCDCommon.Win.getUrlParam("GUID");
        if (!pageObj.guid) {

            return false;
        }
        pageObj.oldData = $DS.util.clone(gridData);
        var parentGUID = pageObj.guid;
        if (parentGUID) {
            debugger
            var filter = {"filter1": "AND INDI_ID=" + "'" + parentGUID + "'"};
            var moneyData = $DS.selectAll(VUECFG.appId, "RURAL_INDI_DETAIL", ["GUID", "AMOUNT"], "GUID", filter, "GUID");
            if (moneyData.isError && moneyData.result && moneyData.result.rows) {
                console.error("查询金额数据失败:" + moneyData.errMsg);
                return false;
            } else {
                moneyData = moneyData.result.rows;
                pageObj.selectMoneyData = moneyData;
                if (gridData && gridData.length > 0 && moneyData.length > 0) {
                    gridData = setMoney(gridData, moneyData);
                }

                var flag = setLabelData(moneyData);
                gridData = initComputedUpData(gridData);
                $DS.getCtrl("指标分配").info.ds_grid = gridData;
            }
        }
        delete pageObj.selectMoneyData;

    }

}

function initComputedUpData(gridData) {
    var _gridData = $DS.util.children(gridData, "GUID", "SUPERGUID", "children");
    gridData = computedUpdata(_gridData, pageObj["initUsedData"]);
    return gridData;
}

/**
 * 设置 自定义列 金额数据
 * @param data
 * @param moneyData
 * @returns {*}
 */
function setMoney(data, moneyData) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < moneyData.length; j++) {
            if (data[i].ITEMCODE === moneyData[j].DIS_AGENCY) {
                data[i]["MONEY"] = moneyData[j].AMOUNT;
                //构造编辑前对象
                pageObj.editBeforeData[data[i].GUID] = {MONEY: moneyData[j].AMOUNT, SUPERGUID: data[i].SUPERGUID};
                pageObj.editAfterData[data[i].GUID] = {MONEY: moneyData[j].AMOUNT, SUPERGUID: data[i].SUPERGUID};
                break;
            }
        }
    }
    return data;
}


/**
 * 初始化 设置已用金额与未用金额
 * @param moneyData
 */
function setLabelData(moneyData) {
    if (moneyData) {

        var amount = pageObj.total;
        // var usedData = YCDCommon.Win.getUrlParam("dis_amount");
        //if (!usedData) {
        var res = $DS.select(VUECFG.appId, "DIS_AMOUNT", "RURAL_INDI_INFO", "AND GUID='" + pageObj.guid + "'");
        if (!res.isError) {
            var usedData = res.result.DIS_AMOUNT;
        } else {
            console.error("获取以使用金额失败!");
            return false;
        }
        // }
        pageObj["initUsedData"] = usedData;
        var haveData = $DS.util.sub(amount, usedData);
        haveData = $DS.util.fixedNumber(haveData, 2);
        haveData = $DS.util.addThousands(haveData);

        usedData = $DS.util.fixedNumber(usedData, 2);
        usedData = $DS.util.addThousands(usedData);
        $DS.getCtrl("总金额数字文字").info.ds_label = amount;
        $DS.getCtrl("已用金额数字文字").info.ds_label = usedData;
        $DS.getCtrl("可用金额数字文字").info.ds_label = haveData;
    } else {
        $DS.getCtrl("总金额数字文字").info.ds_label = "";
        $DS.getCtrl("已用金额数字文字").info.ds_label = "";
        $DS.getCtrl("可用金额数字文字").info.ds_label = "";
    }
    return true;
}


//=========================================================指标页面js -===================================================================================
//单元格获取焦点事件 将编辑前的行存入pageObj 中
function buildEditBeforeObj(scope) {
    var money = scope.row.MONEY;
    if (!money) {
        money = 0;
    }
    pageObj.editBeforeData[scope.row.GUID] = {MONEY: money, SUPERGUID: scope.row.SUPERGUID};
}

//============================================表格编辑后事件 改变 可用金额 已用金额=====================
function setHaveUsedData(money, rowId, scope) {
    debugger
    var haveData = undefined;
    var usedData = undefined;
    var amount = pageObj.total;
    if (money == "") {
        pageObj.editBeforeData[rowId] = {MONEY: 0, SUPERGUID: scope.row.SUPERGUID};
        scope.row[scope.column.columnKey] = "";
    } else {
        var flag = checkSetMoney(money, rowId);
        if (!flag) {
            if (!pageObj.editBeforeData[rowId] || !pageObj.editBeforeData[rowId].MONEY) {
                money = 0;
            } else {
                money = pageObj.editBeforeData[rowId].MONEY;
            }
            scope.row[scope.column.columnKey] = money;
            return false;
        }
    }

    //更新编辑前数据
    pageObj.editBeforeData[rowId] = {MONEY: parseFloat(money), SUPERGUID: scope.row.SUPERGUID};
    //更新编辑后数据
    pageObj.editAfterData[rowId] = {MONEY: parseFloat(money), SUPERGUID: scope.row.SUPERGUID};
    pageObj.editRows[rowId] = scope.row;
    usedData = computedUsedData();//已用
    haveData = $DS.util.sub(amount, usedData);//可用
    setHaveData(haveData);
    setUsedData(usedData);

    reSetRowData(rowId, money);

    var gridData = $DS.getCtrl("指标分配").info.ds_grid;
    console.log(gridData)
    gridData = computedUpdata(gridData, usedData);
    $DS.getCtrl("指标分配").info.ds_grid = gridData;

}

function reSetRowData(rowId, money) {
    var gridData = $DS.getCtrl("指标分配").info.ds_grid;
    gridData = setRowData(rowId, money, gridData);
    $DS.getCtrl("指标分配").info.ds_grid = gridData;
}

function setRowData(rowId, money, gridData) {
    for (let i = 0; i < gridData.length; i++) {
        if (rowId == gridData[i].GUID) {
            gridData[i]["MONEY"] = money;
        } else if (gridData[i].children && gridData[i].children.length > 0) {
            setRowData(rowId, money, gridData[i].children)
        }
    }
    return gridData;
}

//分层汇总
function computedUpdata(gridData, usedData) {
    var computedRows = [];
    var listGridData = $DS.util.childrenToList(gridData, "children", []);
    listGridData[0]["MONEY"] = usedData;
    computedRows.push(listGridData[0].GUID);
    // pageObj.editRows[listGridData[0].GUID] = listGridData[0];
    //只对操作过的进行汇总
    for (var key in pageObj.editBeforeData) {
        for (let i = 0; i < listGridData.length; i++) {
            if (pageObj.editBeforeData[key].SUPERGUID === listGridData[i].GUID && computedRows.indexOf(listGridData[i].GUID) === -1) {
                var sum = getSum(listGridData[i].children, 0);
                listGridData[i]["MONEY"] = sum;
                listGridData[i]["optType"] = "updated";
                computedRows.push(listGridData[i].GUID);
                //pageObj.editRows[listGridData[i].GUID] = listGridData[i];
            }
        }
    }
    for (let i = 0; i < listGridData.length; i++) {
        delete listGridData[i].children
    }
    console.log(listGridData);
    return listGridData;
}

function getSum(data, sum) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].MONEY) {
            sum = $DS.util.add(parseFloat(data[i].MONEY), sum);
        }
        if (data[i].children && data[i].children.length > 0) {
            getSum(data[i].children, sum)
        }
    }
    return sum;
}

//================================================== 校验输入的金额是否合法===============================
/**
 * 校验输入的金额是否合法
 * @param money
 * @returns {boolean}
 */
function checkSetMoney(money, rowId) {
    money = parseFloat(money);
    if (isNaN(money)) {
        $DS.util.alert("设置分配金额有误 : 请输入数字!", window);
        return false;
    }
    if (!$DS.util.isNumber(money)) {
        $DS.util.alert("设置分配金额有误 : 请输入数字!", window);
        return false;
    }
    //重复设置同一单元格
    var haveData = getHaveData();
    if (pageObj.editBeforeData[rowId] && pageObj.editBeforeData[rowId].MONEY) {
        var data = $DS.util.sub(money, pageObj.editBeforeData[rowId].MONEY);
        if (parseFloat(data) > parseFloat(haveData)) {
            $DS.util.alert("设置分配金额有误 : 分配金额大于可用金额!", window);
            return false;
        }
    }

    //第一次录入
    if ((!pageObj.editBeforeData[rowId] || !pageObj.editBeforeData[rowId].MONEY) && parseFloat($DS.util.sub(haveData - money)) < 0) {
        $DS.util.alert("设置分配金额有误 : 分配金额大于可用金额!", window);
        return false;
    }

    if (money < 0) {
        $DS.util.alert("设置分配金额有误 : 分配金额不得为负数!", window);
        return false;
    }
    return true;
}


//=====================================================保存按钮 保存数据=====================================================
function saveZBFPGridData() {
    debugger
    var gridInfo = $DS.getCtrl("指标分配").info;
    var flag = checkSaveData();
    if (!flag) {
        return;
    }

    //构造编辑过的数据
    //var editData = $grid.getEditRows(gridInfo.ds_id);
    var editData = {updated: [], inserted: [], deleted: []};
    for (var key in pageObj.editRows) {
        editData.updated.push(pageObj.editRows[key])
    }
    for (let i = 0; i < editData.updated.length; i++) {
        delete editData.updated[i].children
    }
    // var editData = gridInfo["ds_editAllRows"];
    var delKeys = "";
    for (let i = 0; i < editData.updated.length; i++) {
        if (i == editData.updated.length - 1) {
            delKeys += editData.updated[i]["ITEMCODE"];
        } else {
            delKeys += editData.updated[i]["ITEMCODE"] + ",";
        }
    }

    //删除数据  再添加
    var delRes = $DS.deleteById(VUECFG.appId, "RURAL_INDI_DETAIL", "DIS_AGENCY", delKeys, function () {
    });
    if (!delRes.isError) {
        var newEditData = {updated: [], inserted: [], deleted: []};
        newEditData.inserted = editData.updated.map(item => {
            var newItem = {};
            newItem["AMOUNT"] = item.MONEY;
            newItem["YEAR"] = item.YEAR;
            newItem["INDI_ID"] = pageObj.guid;
            newItem["DIS_AGENCY"] = item.ITEMCODE;
            return newItem;
        });

        //调用保存 保存数据
        newEditData = JSON.stringify(newEditData);
        var url = $DS.util.getProjectName(VUECFG.appId) + "/sysconfig/frame/saveData";
        var params = {
            "tableName": "RURAL_INDI_DETAIL",
            "rows": newEditData,
            "keyField": "GUID",
        }
        var res = YCDCommon.Ajax.syncAjax(url, params);
        if (res.isError == false) {
            $DS.util.alert("保存成功", window);
        } else {
            $DS.util.alert("保存失败", window);
            console.error(res.errMsg)
        }
    } else {
        alert("保存失败!");
    }
    saveUsedData();
}

//保存 已使用金额
function saveUsedData() {
    var usedData = getUsedData();
    var res = $DS.saveTable(VUECFG.appId, "edit", {
        DIS_AMOUNT: usedData,
        GUID: pageObj.guid
    }, "RURAL_INDI_INFO", "GUID");
    if (res.isError) {
        console.error("保存已用金额失败" + res.errMsg)
    }
}

//=======================保存前校验是否合法=====================================================================================

/**
 * 检查数据是否合法
 */
function checkSaveData() {
    var gridInfo = $DS.getCtrl("指标分配").info;
    var getAllData = $grid.getAllData(gridInfo.ds_id);
    var listData = $DS.util.childrenToList(getAllData, "children", []);
    var errorData = [];

    for (let i = 0; i < listData.length; i++) {
        if (listData[i].hasOwnProperty("MONEY") && listData[i].MONEY) {
            var oneMoney = parseFloat(listData[i].MONEY);
            if (oneMoney < 0 || isNaN(oneMoney)) {
                errorData.push(listData[i].ITEMNAME);
            }
        }
    }


    if (errorData.length > 0) {
        $DS.util.alert("分配金额有误项: " + JSON.stringify(errorData));
        return false;
    }
    return true;
}

//===================================本页面api======================================================================================================


/**
 * 根据记录的数据 计算 已用金额
 */
function computedUsedData() {
    var usedData = 0;
    for (var key in pageObj.editBeforeData) {
        if (pageObj.editBeforeData[key] && pageObj.editBeforeData[key].MONEY) {
            usedData = $DS.util.add(usedData, pageObj.editBeforeData[key].MONEY)
        }
    }
    return usedData;
}

/**
 * 根据表格数据计算 可用金额
 * @returns {*}
 */
function computedHaveData() {
    var usedData = computedUsedData();
    return $DS.util.sub(pageObj.total - usedData);
}


//设置可用金额
function setHaveData(money) {
    money = $DS.util.fixedNumber(money, 2);
    money = $DS.util.addThousands(money);
    $DS.getCtrl("可用金额数字文字").info.ds_label = money;
}

/**
 * 获取可用金额
 */
function getHaveData() {
    return computedHaveData();
}

//设置已用金额
function setUsedData(money) {
    money = $DS.util.fixedNumber(money, 2);
    money = $DS.util.addThousands(money);
    $DS.getCtrl("已用金额数字文字").info.ds_label = money;
}

/**
 * 获取已用金额
 * @returns {*}
 */
function getUsedData() {
    var uesdData = $DS.getCtrl("已用金额数字文字").info.ds_label;
    if (!uesdData || isNaN(uesdData)) {
        uesdData = computedUsedData();
    } else {
        uesdData = $DS.util.removeThousands(uesdData);
    }
    return uesdData;
}


//获取总额
function getAllMoney() {
    return pageObj.total
}



//菜单点击事件
var tabId = $DS.getCtrl("TAB").info.ds_id;
if ($("#" + tabId).find("iframe") && $("#" + tabId).find("iframe").eq(1) && $("#" + tabId).find("iframe").eq(1)[0].contentWindow&&$("#" + tabId).find("iframe").eq(1)[0].contentWindow.pageObj) {
    $("#" + tabId).find("iframe").eq(1)[0].contentWindow.pageObj.guid = "";
    $("#" + tabId).find("iframe").eq(1)[0].contentWindow.pageObj.total = "";
    $("#" + tabId).find("iframe").eq(1)[0].contentWindow.reloadGrid();
}