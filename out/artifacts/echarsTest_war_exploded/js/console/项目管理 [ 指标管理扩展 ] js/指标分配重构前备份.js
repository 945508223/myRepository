'<a><span style="cursor: pointer;color:blue;" dis_amount="'||DIS_AMOUNT||'" amount="'||AMOUNT||'" guid="'||GUID||'" onclick="zbfp(this)"title=指标分配">&nbsp;&nbsp;<img src="../dm/pubcss/icon/img/tianbao.png" />&nbsp;&nbsp;指标分配</span></a>' as ZBFP

'<a><span style="cursor: pointer;color:blue;" amount="'||AMOUNT||'" guid="'||GUID||'" onclick="zbfp(this)"title=指标分配">&nbsp;&nbsp;<img src="../dm/pubcss/icon/img/tianbao.png" />&nbsp;&nbsp;指标分配</span></a>' as ZBFP
var pageObj = {}
var picArr = ["总金额图片","已用金额图片","可用金额图片","指标进行度图片"];
var textArr = ["总金额文字","已用金额文字","可用金额文字","指标进行度文字"];


//修改图片样式
function changeStyle(size,fontSize) {
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
    debugger
    if (!pageObj.selectMoneyData || pageObj.selectMoneyData.length <= 0) {
        var parentGUID = YCDCommon.Win.getUrlParam("GUID");
        if (parentGUID) {
            debugger
            var filter = {"filter1": "AND INDI_ID=" + "'" + parentGUID + "'"}
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
                $DS.getCtrl("指标分配").info.ds_grid = gridData;
                setLabelData(moneyData);
            }
        }
    }
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
    if(!amount){
        amount =  $DS.getPms("URL_AMOUNT");
    }
    amount = $DS.util.removeThousands(amount);
    var usedData = 0;
    for (let i = 0; i < moneyData.length; i++) {
        usedData = $DS.util.add(usedData,moneyData[i].AMOUNT);
    }
    var haveData = $DS.util.sub(amount,usedData);
    haveData = $DS.util.fixedNumber(haveData,2);
    haveData = $DS.util.addThousands(haveData);

    usedData = $DS.util.fixedNumber(usedData,2);
    usedData = $DS.util.addThousands(usedData);
    $DS.getCtrl("已用金额数字文字").info.ds_label = usedData;
    $DS.getCtrl("可用金额数字文字").info.ds_label = haveData;
}




//=========================================================指标页面js -===================================================================================


//============================================表格编辑后事件 改变 可用金额 已用金额=====================
function setHaveUsedData(money) {
    var haveData = undefined;
    var usedData = undefined;
    var amount = getAllMoney();
    //输入值为空 不确定单元格原本的值 重新计算
    if (money == "") {
        usedData = computedUsedData();//已用
        haveData = $DS.util.sub(amount,usedData);//可用

    } else {
        //校验是否合法
        var flag = checkSetMoney(money);
        if (!flag) {
            return;
        }

        //新已用金额 = 已用金额 + 输入的金额
        usedData = getUsedData();//已用金额
        usedData = $DS.util.add(usedData, money);
        //新可用 = 可用 - 输入
        haveData = getHaveData();
        haveData = $DS.util.sub(haveData, money);
    }
    setHaveData(haveData);
    setUsedData(usedData);
}

//================================================== 校验输入的金额是否合法===============================
/**
 * 校验输入的金额是否合法
 * @param money
 * @returns {boolean}
 */
function checkSetMoney(money) {
    money = parseFloat(money);
    if (isNaN(money)) {
        $DS.util.alert("设置分配金额有误 : 请输入数字!", window);
        return false;
    }
    if (!$DS.util.isNumber(money)) {
        $DS.util.alert("设置分配金额有误 : 请输入数字!", window);
        return false;
    }
    var haveData = getHaveData();
    if ($DS.util.sub(haveData - money) < 0) {
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
    var gridInfo = $DS.getCtrl("指标分配").info;
    var flag = checkSaveData();
    if(!flag){
        return;
    }
    $grid.setEditRows(gridInfo.ds_id);
    var editData = gridInfo["ds_editAllRows"];
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
        var GUID = YCDCommon.Win.getUrlParam("GUID");
        var newEditData = {updated: [], inserted: [], deleted: []};
        newEditData.inserted = editData.updated.map(item => {
            var newItem = {};
            newItem["AMOUNT"] = item.MONEY;
            newItem["YEAR"] = item.YEAR;
            newItem["INDI_ID"] = GUID;
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
        alert("保存失败!")
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
    var usedMoney = 0;
    for (let i = 0; i < listData.length; i++) {
        if (listData[i].hasOwnProperty("MONEY") && listData[i].MONEY) {
            var oneMoney = parseFloat(listData[i].MONEY);
            if (oneMoney < 0||isNaN(oneMoney)) {
                errorData.push(listData[i].ITEMNAME);
            } else {
                usedMoney = $DS.util.add(usedMoney, oneMoney);
            }
        }
    }
    var amount = getAllMoney();
    if (usedMoney > amount) {
        $DS.util.alert("设置分配金额有误: 分配金额超出总额", window);
        return false;
    }
    if (errorData.length > 0) {
        $DS.util.alert("分配金额有误项: " + JSON.stringify(errorData));
        return false;
    }
    return true;
}
//===================================本页面api======================================================================================================


/**
 * 根据表格数据计算 已用金额
 */
function computedUsedData() {
    var gridInfo = $DS.getCtrl("指标分配").info;
    var getAllData = $grid.getAllData(gridInfo.ds_id);
    var listData = $DS.util.childrenToList(getAllData, "children", []);
    var gridAmount = 0;

    for (let i = 0; i < listData.length; i++) {
        if (listData[i].MONEY && !isNaN(listData[i].MONEY)) {
            gridAmount = $DS.util.add(gridAmount, parseFloat(listData[i].MONEY))
        }
    }
    return gridAmount;
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
    var haveData = $DS.getCtrl("可用金额数字文字").info.ds_label;
    if(!haveData||isNaN(haveData)){
        haveData =  computedHaveData();
    }else {
        haveData = $DS.util.removeThousands(haveData);
    }
    return haveData;
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
    var amount = $DS.getPms("URL_amount");
    if(!amount){
        amount =  $DS.getPms("URL_AMOUNT");
    }
    amount = $DS.util.removeThousands(amount);
    amount = $DS.util.fixedNumber(amount, 2);
    return amount;
}
