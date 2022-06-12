var pageObj = {
    total: "",//总额
    editAfterData: {},//编辑过的数据
    editBeforeData: {},//获取焦点时记录的数据
    originalData: {},//原始数据 用于判断分配的数据是新增还是修改
    editRows: {},//编辑过数据用于保存
    deleteData: {},//保存 删除的数据
    insertData: {},//插入的数据
    initListGridData: []//初始化的数据
};

//=========================保存页面,初始化 设置表格自定义列以及标签数据=====================================================================

function initGridlabelData(gridData) {
    debugger
    try {
        var parentGUID = YCDCommon.Win.getUrlParam("GUID");
        var year = YCDCommon.Win.getUrlParam("year");
        if (parentGUID) {
            debugger
            var filter = {"filter1": "AND INDI_ID=" + "'" + parentGUID + "' AND YEAR=" + "'" + year + "'"};
            var moneyData = $DS.selectAll(VUECFG.appId, "RURAL_INDI_DETAIL", ["GUID", "AMOUNT"], "GUID", filter, "GUID");
            if (moneyData.isError && moneyData.result && moneyData.result.rows) {
                console.error("查询金额数据失败:" + moneyData.errMsg);
                return false;
            } else {
                moneyData = moneyData.result.rows;

                if (gridData && gridData.length > 0 && moneyData.length > 0) {
                    gridData = setMoney(gridData, moneyData);
                } else {
                    gridData = $DS.util.childrenToList(gridData, "children", []);
                }
                var flag = setLabelData(moneyData);
                gridData = initComputedUpData(gridData, true);
                $DS.getCtrl("指标分配").info.ds_grid = [];
                $DS.getCtrl("指标分配").info.ds_grid = gridData;
                pageObj.initListGridData = gridData;
                //获取所有已挂接金额 做后续录入的判断
                var filter2 = {"filter": "AND YEAR = " + "'" + year + "'"};
                var capitalData = $DS.selectAll(VUECFG.appId, "RURAL_PROJECT_CAPITAL", ["INDI_DETAILID", "AMOUNT"], "GUID", filter2, "GUID");
                if (capitalData.isError && capitalData.result && capitalData.result.rows) {
                    console.error("查询项目资金分配金额失败:" + capitalData.errMsg);
                } else {
                    buildCapitalData(capitalData.result.rows);
                }
            }
        }
    } catch (e) {
        console.error(e);
        $DS.util.alert("初始化数据失败!");
    }
}

//构建资金分配金额数据
function buildCapitalData(data) {
    var capitalData = {};
    for (let i = 0; i < data.length; i++) {
        capitalData[data[i].INDI_DETAILID] = data[i];
    }
    pageObj["capitalData"] = capitalData;
}

//初始化汇总
function initComputedUpData(gridData, isList) {
    gridData = computedUpdata(gridData, pageObj["initUsedData"], isList);
    return gridData;
}

/**
 * 设置 自定义列 金额数据
 * @param data
 * @param moneyData
 * @returns {*}
 */
function setMoney(data, moneyData) {
    data = $DS.util.childrenToList(data, "children", []);
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < moneyData.length; j++) {
            if (data[i].GUID === moneyData[j].DIS_AGENCY) {
                data[i]["MONEY"] = moneyData[j].AMOUNT;
                data[i]["ZBFPGUID"] = moneyData[j].GUID;
                //构造编辑前对象
                pageObj.editBeforeData[data[i].GUID] = {MONEY: moneyData[j].AMOUNT, SUPERGUID: data[i].SUPERGUID};
                pageObj.editAfterData[data[i].GUID] = {MONEY: moneyData[j].AMOUNT, SUPERGUID: data[i].SUPERGUID};
                pageObj.originalData[data[i].GUID] = data[i];
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
    var amount = $DS.getPms("URL_amount");
    if (!amount) {
        amount = $DS.getPms("URL_AMOUNT");
    }
    amount = $DS.util.removeThousands(amount);
    pageObj.total = amount;
    var guid = YCDCommon.Win.getUrlParam("GUID");
    var res = $DS.select(VUECFG.appId, "DIS_AMOUNT", "RURAL_INDI_INFO", "AND GUID='" + guid + "'");
    if (!res.isError) {
        var usedData = res.result.DIS_AMOUNT;
    } else {
        console.error("获取已使用金额失败!");
        return false;
    }
    pageObj["initUsedData"] = usedData;
    var haveData = $DS.util.sub(amount, usedData);
    haveData = $DS.util.fixedNumber(haveData, 2);
    haveData = $DS.util.addThousands(haveData);

    usedData = $DS.util.fixedNumber(usedData, 2);
    usedData = $DS.util.addThousands(usedData);
    amount = $DS.util.fixedNumber(amount, 2);
    amount = $DS.util.addThousands(amount);
    $DS.getCtrl("总金额数字文字").info.ds_label = amount;
    $DS.getCtrl("已用金额数字文字").info.ds_label = usedData;
    $DS.getCtrl("可用金额数字文字").info.ds_label = haveData;
    return true;
}


//=========================================================指标页面js -===================================================================================
//单元格获取焦点事件 将编辑前的行存入pageObj 中
function buildEditBeforeObj(scope) {
    var money = scope.row.MONEY;
    if (!money) {
        money = "";
    }
    pageObj.editBeforeData[scope.row.GUID] = {MONEY: money, SUPERGUID: scope.row.SUPERGUID};
}

//==============/单元格 input事件校验============================================
//单元格 input事件校验
function cellInputCheck(val) {
    if (val.value && val.value[val.value.length - 1] != "." && val.value != "0" && val.value !== "0.0" && val.value !== "0.00") {
        var reg = /^[+-]?\d*\.?\d{0,2}$/;//正负小数 最多保留小数点后两位
        var flag = reg.test(val.value);
        if (flag === false) {
            //$DS.util.alert("设置分配金额有误!", window);
            var scope = val.scope;
            scope.row[scope.column.columnKey] = pageObj.editBeforeData[scope.row.GUID].MONEY;
            return false;
        }
    }
}

//============================================表格编辑后事件 改变 可用金额 已用金额=====================
function setHaveUsedData(money, rowId, scope) {
    debugger
    var haveData = undefined;
    var usedData = undefined;
    var amount = getAllMoney();
    if (money == "") {
        //todo  输入值为空 添加到删除的数据中 编辑过的行数据中删除
        delete pageObj.editRows[rowId];
        delete pageObj.insertData[rowId];
        if (pageObj.originalData[rowId]) {
            pageObj.deleteData[rowId] = scope.row;
        }
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
        //todo 判断删除的数据中是否存在 存在则删除
        delete pageObj.deleteData[rowId];
        //判断是新增还是修改
        if (pageObj.originalData[rowId]) {
            pageObj.editRows[rowId] = scope.row;
        } else {
            pageObj.insertData[rowId] = scope.row;
        }
    }

    //更新编辑前数据
    pageObj.editBeforeData[rowId] = {MONEY: parseFloat(money), SUPERGUID: scope.row.SUPERGUID};
    //更新编辑后数据
    pageObj.editAfterData[rowId] = {MONEY: parseFloat(money), SUPERGUID: scope.row.SUPERGUID};

    usedData = computedUsedData();//已用
    haveData = $DS.util.sub(amount, usedData);//可用
    setHaveData(haveData);
    setUsedData(usedData);
    reSetRowData(rowId, money);
    var gridData = $DS.getCtrl("指标分配").info.ds_grid;
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
function computedUpdata(gridData, usedData, isList) {
    var computedRows = [];
    var listGridData = [];
    if (!isList) {
        listGridData = $DS.util.childrenToList(gridData, "children", []);
    } else {
        listGridData = gridData;
    }

    listGridData[0]["MONEY"] = usedData;
    computedRows.push(listGridData[0].GUID);
    //只对操作过的进行汇总
    for (var key in pageObj.editBeforeData) {
        for (let i = 0; i < listGridData.length; i++) {
            if (pageObj.editBeforeData[key].SUPERGUID === listGridData[i].GUID && computedRows.indexOf(listGridData[i].GUID) === -1) {
                var sum = getZBFPSum(listGridData[i].children, 0);
                listGridData[i]["MONEY"] = sum;
                listGridData[i]["optType"] = "updated";
                computedRows.push(listGridData[i].GUID);
            }
        }
    }
    for (let i = 0; i < listGridData.length; i++) {
        delete listGridData[i].children
    }

    return listGridData;
}

function getZBFPSum(data, sum) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].MONEY) {
            sum = $DS.util.add(parseFloat(data[i].MONEY), sum);
        }
        if (data[i].children && data[i].children.length > 0) {
            getZBFPSum(data[i].children, sum)
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
    var reg = /^[+-]?\d*\.?\d{0,2}$/;//限制只能为数字并且数字最多带2位小数
    if (!reg.test(money)) { //正则匹配通过，提取有效文本
        return false;
    }

    money = parseFloat(money);
    if (isNaN(money)) {
        return false;
    }
    if (!$DS.util.isNumber(money)) {
        return false;
    }

    //todo 指标分配金额必须大于 项目资金分配表(RURAL_PROJECT_CAPITAL)的已挂接指标金额 通过 INDI_DETAILID==指标分配的id
    if (pageObj.originalData[rowId] && pageObj.capitalData) {
        var zbfpGUID = pageObj.originalData[rowId].ZBFPGUID;
        if (pageObj.capitalData[zbfpGUID] && parseFloat(pageObj.capitalData[zbfpGUID]) > money) {
            return false;
        }
    }

    var haveData = getHaveData();
    var data = $DS.util.sub(money, pageObj.editBeforeData[rowId].MONEY);
    if (pageObj.total < 0) {
        if (money > 0) {
            return false;
        } else if (data < 0) {
            data = Math.abs(data);
            haveData = Math.abs(haveData);
            if (data > haveData) {
                return false;
            }
        }

    } else {
        //重复设置同一单元格
        if (pageObj.editBeforeData[rowId] && (pageObj.editBeforeData[rowId].MONEY || pageObj.editBeforeData[rowId].MONEY == 0)) {
            //指标金额为负数
            if (parseFloat(data) > parseFloat(haveData)) {
                return false;
            }
        }

        //第一次录入
        if (!pageObj.editBeforeData[rowId].MONEY && parseFloat($DS.util.sub(haveData - money)) < 0) {
            return false;
        }
    }
    return true;
}


//=====================================================保存按钮 保存数据=====================================================
function saveZBFPGridData() {
    debugger
    try {
        var editData = {updated: [], inserted: [], deleted: []}
        var parentGUID = YCDCommon.Win.getUrlParam("GUID");
        //构造编辑过的数据

        for (var key in pageObj.editRows) {
            editData.updated.push(pageObj.editRows[key])
        }
        for (var key in pageObj.insertData) {
            editData.inserted.push(pageObj.insertData[key])
        }
        for (var key in pageObj.deleteData) {
            editData.deleted.push(pageObj.deleteData[key])
        }

        for (var key in editData) {
            editData[key] = editData[key].map(item => {
                var newItem = {};
                newItem["AMOUNT"] = item.MONEY;
                newItem["YEAR"] = item.YEAR;
                newItem["INDI_ID"] = parentGUID;
                newItem["DIS_AGENCY"] = item.GUID;
                newItem["DIS_AGENCYCODE"] = item.ITEMCODE;
                if (key != "inserted") {
                    newItem["GUID"] = item.ZBFPGUID;
                }
                return newItem;
            })
        }

        //调用保存 保存数据
        editData = JSON.stringify(editData);
        var url = $DS.util.getProjectName(VUECFG.appId) + "/sysconfig/frame/saveData";
        var params = {
            "tableName": "RURAL_INDI_DETAIL",
            "rows": editData,
            "keyField": "GUID",
        }
        var res = YCDCommon.Ajax.syncAjax(url, params);
        if (res.isError == false) {
            $DS.util.alert("保存成功", window);
            saveUsedData();
            //刷新查看页面
            flashViewGrid(parentGUID);
        } else {
            $DS.util.alert("保存失败", window);
            console.error(res.errMsg)
        }
        cleanEditZBFPData()
    } catch (e) {
        console.error(e);
        cleanEditZBFPData()
    }
}

function cleanEditZBFPData() {
    pageObj.editRows = {};//编辑过数据用于保存
    pageObj.deleteData = {};//保存 删除的数据
    pageObj.insertData = {};//插入的数据
}

//刷新查看分配表格
function flashViewGrid(parentGUID) {
    var tabName = parent.$DS.getCtrl("TAB").info.ds_ctrlname;
    var tabWin = parent.$tabs.getSubWindow(tabName, 1);
    if (tabWin.flashGrid) {
        var total = getAllMoney();
        tabWin.flashGrid(parentGUID, total);
    }
}

//保存 已使用金额
function saveUsedData(usedData) {
    if (!usedData) {
        usedData = getUsedData();
    }

    var GUID = YCDCommon.Win.getUrlParam("GUID");
    var res = $DS.saveTable(VUECFG.appId, "edit", {DIS_AMOUNT: usedData, GUID: GUID}, "RURAL_INDI_INFO", "GUID");
    if (res.isError) {
        console.error("保存已用金额失败" + res.errMsg)
    } else {
        parent.$DS.loadCtrl("指标列表");
    }
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
    var amount = getAllMoney();
    var usedData = computedUsedData();
    return $DS.util.sub(amount - usedData);
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
    if (pageObj.total) {
        return pageObj.total
    } else {
        var amount = $DS.getPms("URL_amount");
        if (!amount) {
            amount = $DS.getPms("URL_AMOUNT");
        }
        amount = $DS.util.removeThousands(amount);
        amount = $DS.util.fixedNumber(amount, 2);
        return amount;
    }
}


//一键导入表格数据
function importExcelData(excelData) {
    debugger
    $DS.util.confirm(window.vm, "注意: 一键导入将覆盖未保存数据, 并确定Excel表格市县名称与本表对应!", function (vue, excelData) {
        $DS.loadingFun("confirmSurImportExcelData",excelData,window);
    }, "", excelData)
}

//点击确定回调 进行保存
function confirmSurImportExcelData(excelData) {
    debugger
    //校验excel数据
    var res = checkExcelData(excelData);
    if (res !== true) {
        $DS.util.alert(res, window);
    }
    //判断数据为新增 修改 删除
    var editData = dealExcelData(excelData, pageObj.originalData);
    //调用保存 保存数据
    editData = JSON.stringify(editData);
    var url = $DS.util.getProjectName(VUECFG.appId) + "/sysconfig/frame/saveData";
    var params = {
        "tableName": "RURAL_INDI_DETAIL",
        "rows": editData,
        "keyField": "GUID",
    }
    var res = YCDCommon.Ajax.syncAjax(url, params);
    if (res.isError == false) {
        //保存已用金额
        saveUsedData(pageObj["excelDisMoney"]);
        $DS.loadCtrl("指标分配");
        $DS.util.alert("保存成功", window);
        //刷新查看页面
        var parentGUID = YCDCommon.Win.getUrlParam("GUID");
        flashViewGrid(parentGUID);

    } else {
        $DS.util.alert("保存失败", window);
        console.error(res.errMsg)
    }

}

//校验excel数据是否合法
function checkExcelData(excelData) {
    if (excelData.length == 0) {
        return "表格无数据";
    }
    var flag = excelData.every(item => {
        for (var key in item) {
            if (key !== "市县名称" && key !== "分配金额") {
                return false;
            }
        }
        return true;
    });

    if (flag == false) {
        return " Excel数据不符合要求!( 要求:表格应为两列数据,第一列为\"市县名称\",第二列为\"分配金额\", 并将两列置与表格第一行! ) ";
    }
    return true;
}

//处理导入的Excel表数据
function dealExcelData(excelData) {
    debugger
    var _excelData = [];
    for (let i = 0; i < excelData.length; i++) {
        if(!excelData[i]["市县名称"]){
            continue;
        }
        if (excelData[i]["市县名称"].indexOf("县") == -1 && excelData[i]["市县名称"].indexOf("区") == -1 && excelData[i]["市县名称"].indexOf("州") !== -1 && excelData[i]["市县名称"].indexOf("州本级") == -1) {
            continue;
        }

        if (excelData[i]["市县名称"] == "临夏市"||excelData[i]["市县名称"] == "合作市" || excelData[i]["市县名称"] == "玉门市" || excelData[i]["市县名称"] == "敦煌市" || excelData[i]["市县名称"] == "嘉峪关市") {
            if (excelData[i]["分配金额"] != null && excelData[i] !== undefined) {
                excelData[i]["分配金额"] = parseFloat(excelData[i]["分配金额"]) * 10000;
            }
            _excelData.push(excelData[i]);
        } else if (excelData[i]["市县名称"].indexOf("市") !== -1 && excelData[i]["市县名称"].indexOf("市本级") == -1) {
            continue;
        } else {
            if (excelData[i]["分配金额"] != null && excelData[i] !== undefined) {
                excelData[i]["分配金额"] = parseFloat(excelData[i]["分配金额"]) * 10000;
            }
            _excelData.push(excelData[i]);
        }

    }

    //获取汇总数据
    var disMoney = 0;
    for (let i = 0; i < _excelData.length; i++) {
        if (_excelData[i]["分配金额"]) {
            disMoney += _excelData[i]["分配金额"];
        }
    }
    pageObj["excelDisMoney"] = disMoney;

    var editData = buildSaveData(_excelData);
    return editData;
}

//根据excel数据构建需要保存的数据
function buildSaveData(excelData) {
    var initListGridData = pageObj.initListGridData;//原始数据
    var originalData = pageObj.originalData;//原始存在金额的数据
    var parentGUID = YCDCommon.Win.getUrlParam("GUID");
    var editData = {updated: [], inserted: [], deleted: []};

    for (let i = 0; i < excelData.length; i++) {
        for (let j = 0; j < initListGridData.length; j++) {
            if (excelData[i]["市县名称"] == initListGridData[j].ITEMNAME) {
                var newItem = {};
                newItem["AMOUNT"] = excelData[i]["分配金额"];
                newItem["YEAR"] = initListGridData[j].YEAR;
                newItem["INDI_ID"] = parentGUID;
                newItem["DIS_AGENCY"] = initListGridData[j].GUID;
                newItem["DIS_AGENCYCODE"] = initListGridData[j].ITEMCODE;
                //原始已分配过的数据 中存在 则为修改
                if (originalData[initListGridData[j].GUID]) {
                    newItem["GUID"] = initListGridData[j].ZBFPGUID;
                    editData.updated.push(newItem);
                } else if (newItem["AMOUNT"] == null || newItem["AMOUNT"] == undefined && initListGridData[j].ZBFPGUID) {
                    newItem["GUID"] = initListGridData[j].ZBFPGUID;
                    editData.deleted.push(newItem);
                } else {
                    editData.inserted.push(newItem);
                }
            }
        }
    }
    return editData;
}