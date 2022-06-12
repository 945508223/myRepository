//-------------根据excel批量导入指标-----------------------------------------------------------------------------------------------------------------------------------------------

var specialArea_impIDNI = ["嘉峪关", "临夏市", "合作市", "玉门市", "敦煌市","华亭市"];
var importINDIInfo = {
    colsCellNum: {},
    INDIGUID: {}
}

//根据excel导入指标
function importINDIByExcel(excelData) {
    
    $DS.util.confirm(window.vm, "注意: 请确保指标数据在第一个Sheet页!", function (vue, excelData) {
        $DS.loadingFun("confirmSur", excelData, window);
    }, "", excelData)
}



//点击确定 开始导入
function confirmSur(excelData) {
    
    let leve = getBUDGET_LEVE();//获取预算级次
    if (leve == "") {
        alert("请先设置预算级次!");
        return false;
    }
    excelData = excelData[0];
    getINDIDate_UNIT(excelData);//获取发文日期以及金额单位
    getFUNDCLASSDETAIL();//获取资金分类明细
    var flag = getINDIColIndex(excelData);//获取列的index
    if (!flag) {
        return false;
    }
    var colsCellNum = getColsCellNum(excelData[importINDIInfo.INDIColIndex]);
    importINDIInfo.colsCellNum = colsCellNum;
    var INDIData = getINDIData(excelData, colsCellNum);
    if (INDIData === false) {
        return false;
    }
    //保存指标
    var saveINDIRes = saveINDIData(INDIData, "RURAL_INDI_INFO", "add");
    if (saveINDIRes === false) {
        return false;
    } else if (saveINDIRes === true) {
        //根据保存的指标信息 组织分配金额数据
        var detailData = getDetailData(excelData);
        if (detailData === false) {
            return false;
        }
        //保存分配资金
        var saveDetailRes = saveINDIData(detailData, "RURAL_INDI_DETAIL", "add");
        if (saveDetailRes === false) {
            return false;
        } else if (saveDetailRes === true) {
            //todo 修改指标的已下发金额
            var disAmountData = getDisAmountData(detailData);
            var saveDisAmountRes = saveINDIData(disAmountData, "RURAL_INDI_INFO", "edit");
            if (saveDisAmountRes === false) {
                return false;
            } else {
                $DS.util.close();
                parent.$DS.loadCtrl("指标列表");
                $DS.util.alert("导入成功!");
            }
        }
    }
}

//获取列所在的行号
function getINDIColIndex(excelData) {
    for (let i = 0; i < excelData.length; i++) {
        if (excelData[i].indexOf("序号") !== -1 && excelData[i].indexOf("财政资金名称")) {
            importINDIInfo.INDIColIndex = i;
            return i;
        }
    }
    alert("获取表格列信息失败,请确保包含序号列和财政资金名称列");
    return false;
}

//获取已分配金额数据
function getDisAmountData(detailData) {
    
    let disAmountObj = {};
    let disAmountData = [];
    for (let item of detailData) {
        if (!disAmountObj[item.INDI_ID]) {
            disAmountObj[item.INDI_ID] = [];
        }
        if (item.AMOUNT) {
            disAmountObj[item.INDI_ID].push(item.AMOUNT);
        }
    }
    for (let guidKey in disAmountObj) {
        let sum = getINDIDisAmountsum(disAmountObj[guidKey]);
        let oneData = {};
        oneData["GUID"] = guidKey;
        oneData["DIS_AMOUNT"] = sum;
        disAmountData.push(oneData);
    }
    return disAmountData;
}

//求和
function getINDIDisAmountsum(arr) {
    return arr.reduce(function (prev, curr, idx, arr) {
        return prev + curr;
    });
}

// 获取预算级次
function getBUDGET_LEVE() {
    importINDIInfo.BUDGET_LEVE = $DS.getCtrl("SELECT_预算级次").info.ds_select;
    return importINDIInfo.BUDGET_LEVE;
}

//获取发文时间 以及金额单位
function getINDIDate_UNIT(excelData) {
    for (let i = 0; i < excelData.length; i++) {
        let row = excelData[i];
        for (let j = 0; j < row.length; j++) {
            if ((row[j].indexOf("发文日期") !== -1 || row[j].indexOf("截至时间") !== -1) && row[j].split("：").length == 2) {
                let date = row[j].split("：")[1];
                try {
                    date = date.trim();
                    date = date.replace("年", "-").replace("月", "-").replace("日", "-");
                    importINDIInfo.INDIDATE = $DS.util.timeFormate(new Date(date), "yyyy-MM-dd");
                } catch (e) {
                    console.error(`解析发文日期有误${e}`);
                    importINDIInfo.INDIDATE = "";
                }
                break;
            }
        }
    }

    for (let i = 0; i < excelData.length; i++) {
        let row = excelData[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j].indexOf("单位") !== -1 && row[j].split("：").length == 2) {
                let unit = row[j].split("：")[1];
                if (unit == "万元") {
                    importINDIInfo.INDIUNIT = "10000";
                } else {
                    importINDIInfo.INDIUNIT = "1";
                }
                return;
            }
        }
    }
}

//获取列 所在的单元格
function getColsCellNum(colRow) {
    
    var colsCellNum = {
        dataCols: {}
    };

    var nowCol = "";
    for (let i = 0; i < colRow.length; i++) {
        if (colRow[i] == "序号" || colRow[i].indexOf("安排到58个片区") !== -1) {
            continue;
        }
        if (!colRow[i] && colsCellNum[nowCol]) {
            colsCellNum[nowCol].push(i);
        } else if (colRow[i]) {
            colRow[i] = colRow[i].trim();
            nowCol = colRow[i];
            //判断是否为
            if (colRow[i][colRow[i].length - 1] == "区" || colRow[i][colRow[i].length - 1] == "县" || specialArea_impIDNI.indexOf(colRow[i]) !== -1) {
                if (!colsCellNum.dataCols[colRow[i]]) {
                    colsCellNum.dataCols[colRow[i]] = []
                }
                colsCellNum.dataCols[colRow[i]].push(i);
            } else if (!colsCellNum[colRow[i]]) {
                colsCellNum[colRow[i]] = [];
                colsCellNum[colRow[i]].push(i);
            }
        }
    }

    return colsCellNum;
}

//获取指标数据
function getINDIData(excelData, colsCellNum) {
    
    let BUDGET_LEVE = importINDIInfo.BUDGET_LEVE;
    let infoArr = ["COR_BGT_DOC_NO", "BGT_DOC_TITLE", "DOC_DATE", "AMOUNT", "DIS_AMOUNT"];//指标文号  指标标题 发文日期 指标金额
    let INDIArr = [];
    for (let i = importINDIInfo.INDIColIndex + 1; i < excelData.length; i++) {

        // 设置发文日期等字段
        let oneINDI = {
            GUID: $DS.util.UUID().replaceAll("-", "").toUpperCase(),
            PROTYPE_ID: "1D99F29F80B64D0B8C1FCB7C9FBFE94A",//资金分类为涉农整合
            DOC_DATE: importINDIInfo.INDIDATE ? importINDIInfo.INDIDATE : "",//发文日期
            BUDGET_LEVEL_CODE: importINDIInfo.BUDGET_LEVE//预算级次
        };
        let row = excelData[i];
        for (let j = 0; j < infoArr.length; j++) {
            let filed = "";
            let filedData = "";
            switch (infoArr[j]) {
                case "COR_BGT_DOC_NO":
                    if (BUDGET_LEVE == "1") {
                        filed = "中央指标文件";
                    } else if (BUDGET_LEVE == "2") {
                        filed = "省级下达指标文件";
                    }
                    if (!colsCellNum[filed]) {
                        alert(`请确保指标文件列名为【${filed}】`);
                        return false;
                    }
                    for (let k = 0; k < colsCellNum[filed].length; k++) {
                        filedData += row[colsCellNum[filed][k]];
                    }
                    filedData = filedData.replace(/\s*/g, "");
                    filedData = filedData.split("号").join("号,");
                    if (filedData[filedData.length - 1] == ",") filedData = filedData.slice(0, filedData.length - 1);
                    oneINDI.COR_BGT_DOC_NO = filedData;
                    break;
                case "BGT_DOC_TITLE":
                    filed = "财政资金名称";
                    if (!colsCellNum[filed]) {
                        alert(`请确保指标标题列名为【${filed}】`);
                        return false;
                    }
                    if (!row[colsCellNum[filed][0]]) {
                        filedData = getINDITitle(excelData, i, colsCellNum[filed]);
                    }
                    for (let k = 0; k < colsCellNum[filed].length; k++) {
                        filedData += row[colsCellNum[filed][k]];
                    }
                    oneINDI.BGT_DOC_TITLE = filedData;//指标标题
                    oneINDI.FUNDCLASSDETAIL = setFundClassDetail(row, colsCellNum[filed]);//资金明细
                    break;
                case "AMOUNT":
                    filed = "全省资金规模";
                    if (!colsCellNum[filed]) {
                        alert(`请确保指标金额列名为【${filed}】`);
                        return false;
                    }
                    filedData = row[colsCellNum[filed][0]];
                    if (filedData) {
                        if (importINDIInfo.INDIUNIT == "10000") {
                            oneINDI.AMOUNT = parseFloat(filedData) * 10000;
                        } else {
                            oneINDI.AMOUNT = parseFloat(filedData);
                        }
                    }
                    break;
            }
        }

        importINDIInfo.INDIGUID[i] = oneINDI.GUID;
        INDIArr.push(oneINDI);
    }
    //过滤获取真实数据
    INDIArr = filterINDI(INDIArr);
    //校验数据
    var errorData = checkINDIData(INDIArr);
    if (errorData && errorData.length > 0) {
        let errorDataName = errorData.join(",");
        alert(`导入失败: 【${errorDataName}】 数据超长`);
        return false;
    }
    INDIArr = setINDIDOC_NO(INDIArr);//设置主单id
    if (INDIArr == false) {
        alert(`导入失败!`);
    }
    return INDIArr;
}

//设置主单id
function setINDIDOC_NO(INDIArr) {
    
    let sql = "select max(DOC_NO) as MAXNO from RURAL_INDI_INFO";
    let res = $DS.selectBySql(VUECFG.appId, sql);
    if (res.isError == true) {
        console.error(res.errMsg);
        return false
    }
    let maxNo = res.result[0].MAXNO+1;
    for (let i = 0; i < INDIArr.length; i++) {
        INDIArr[i]["DOC_NO"] = maxNo++;
    }
    return INDIArr;
}

//校验指标数据是否合法
function checkINDIData(INDIArr) {
    
    let errorData = [];
    for (let item of INDIArr) {
        for (let field in item) {
            switch (field) {
                case "COR_BGT_DOC_NO":
                    if (getLength(item[field]) > 200) {
                        errorData.push(item.COR_BGT_DOC_NO);
                    }
                    break;
                case "BGT_DOC_TITLE":
                    if (getLength(item[field]) > 360) {
                        errorData.push(item.BGT_DOC_TITLE);
                    }
                    break;
            }
        }
    }
    return errorData;
}

// 获取资金分类明细
function getFUNDCLASSDETAIL() {
    if (importINDIInfo.FUNDCLASSDETAIL) {
        return importINDIInfo.FUNDCLASSDETAIL;
    } else {
        importINDIInfo.FUNDCLASSDETAIL = {};
        let detailJson = $DS.getCtrl("SELECT_资金分类明细").info.ds_options;
        for (let i = 0; i < detailJson.length; i++) {
            importINDIInfo.FUNDCLASSDETAIL[detailJson[i].label] = detailJson[i].value;
        }
        return importINDIInfo.FUNDCLASSDETAIL;
    }
}

//设置资金明细
function setFundClassDetail(row, dataIndexArr) {

    let fundClassDetailCN = "";
    let fundClassDetail = "";
    for (let i = dataIndexArr.length - 1; i >= 0; i--) {
        if (row[dataIndexArr[i]]) {
            fundClassDetailCN = row[dataIndexArr[i]].replace(" ", "");
            break;
        }
    }
    if (fundClassDetailCN) {
        for (var key in importINDIInfo.FUNDCLASSDETAIL) {
            key = key.replace(" ", "");
            var res = $DS.util.compareSimilarity(fundClassDetailCN, key);
            if (res >= 70) {
                fundClassDetail = importINDIInfo.FUNDCLASSDETAIL[key];
                return fundClassDetail;
            }
        }
    }
    return fundClassDetail;
}

//获取指标标题
function getINDITitle(excelData, i, dataIndexArr) {

    if (excelData[i - 1][dataIndexArr[0]]) {
        return excelData[i - 1][dataIndexArr[0]]
    } else {
        var data = getINDITitle(excelData, i - 1, dataIndexArr);
        if (data) {
            return data;
        }
    }
}

//过滤获取真实数据
function filterINDI(INDIArr) {
    
    return INDIArr.filter((item, index) => {
        if (item.AMOUNT /*&& item.BGT_DOC_TITLE.indexOf("扣除") == -1*/ && item.BGT_DOC_TITLE.indexOf("小计") == -1 && item.BGT_DOC_TITLE.indexOf("合计") == -1) {
            return item;
        } else {
            for (let key in importINDIInfo.INDIGUID) {
                if (importINDIInfo.INDIGUID[key] == item.GUID) {
                    delete importINDIInfo.INDIGUID[key];
                    break;
                }
            }
        }
    });
}


//获取指标分配数据
function getDetailData(excelData) {
    //查询区划信息
    let detailData = [];
    let admdivObj = getAdmdivDataObj();
    if (admdivObj === false) {
        return false;
    }
    var INDIData = importINDIInfo.INDIGUID;
    let year = $DS.getPms("USER_FINYEAR");
    for (let key in INDIData) {
        let row = excelData[key];
        try {
            for (let areaName in importINDIInfo.colsCellNum.dataCols) {
                let oneDetail = {};
                oneDetail["YEAR"] = year;
                oneDetail["INDI_ID"] = INDIData[key];
                oneDetail["DIS_AGENCY"] = admdivObj[areaName].GUID;//区划id
                oneDetail["DIS_AGENCYCODE"] = admdivObj[areaName].ITEMCODE;//区划编码
                let mount = row[importINDIInfo.colsCellNum.dataCols[areaName][0]];
                if (mount && parseFloat(mount) !== 0) {
                    mount = mount * 10000;
                    oneDetail["AMOUNT"] = mount;
                    detailData.push(oneDetail);
                } else {
                    continue;
                }
            }
        } catch (e) {
            console.error(e);
            console.log(row);
            continue;
        }

    }
    //校验数据

    return detailData;
}

//获取区划信息对象 以区划名称为key
function getAdmdivDataObj() {
    if (parent.importINDIAdmidivInfo) {
        return parent.importINDIAdmidivInfo;
    }
    let admdivObj = {};
    //获取当前区划所有下级
    var selectSql = "select * from SSO_V_PUBADMDIV START WITH GUID = '" + $DS.getPms("USER_UPADMDIV") + "' CONNECT BY PRIOR GUID = SUPERGUID";
    var selectRes = $DS.selectBySql(VUECFG.appId, selectSql);
    if (selectRes.isError) {
        console.error("获取区划信息失败!" + selectRes.errMsg);
        $DS.util.close();
        $DS.util.alert("保存分配金额失败!");
        return false;
    }
    selectRes = selectRes.result;
    for (let i = 0; i < selectRes.length; i++) {
        let itemName = "";
        switch (selectRes[i].ITEMNAME) {
            case "张家川回族自治县":
                itemName = "张家川县";
                break;
            case "天祝藏族自治县":
                itemName = "天祝县";
                break;
            case "肃南裕固族自治县": //肃南裕固族县
                itemName = "肃南裕固族县";
                break;
            case "肃北蒙古族自治县":
                itemName = "肃北县";
                break;
            case "阿克塞哈萨克族自治县":
                itemName = "阿克塞县";
                break;
            case "陇南地区本级":
                itemName = "陇南市本级";
                break;
            case "临夏回族自治州":
                itemName = "临夏州";
                break;
            case "东乡族自治县":
                itemName = "东乡县";
                break;
            case "积石山保安族东乡族撒拉族自治县":
                itemName = "积石山县";
                break;
            case "甘南藏族自治州":
                itemName = "甘南州";
                break;
            case "华亭县":
                itemName = "华亭市";
                break;
            default :
                itemName = selectRes[i].ITEMNAME;
                break;
        }
        admdivObj[itemName] = {
            ITEMCODE: selectRes[i].ITEMCODE,
            GUID: selectRes[i].GUID,
        }
    }
    if (!parent.importINDIInfo) {
        parent.importINDIAdmidivInfo = {};
        parent.importINDIAdmidivInfo = admdivObj;
    }
    return admdivObj;
}


//保存指标信息
function saveINDIData(saveData, tableName, type) {
    
    //todo 测试
    /*if (tableName == "RURAL_INDI_INFO") {
        for (let i = 0; i < saveData.length; i++) {
            delete saveData[i].FUNDCLASSDETAIL
        }
    }*/
    var data = {};
    if (type === "edit") {
        data = {updated: saveData, inserted: [], deleted: []};
    } else {
        data = {updated: [], inserted: saveData, deleted: []};
    }

    var url = $DS.util.getProjectName(VUECFG.appId) + "/sysconfig/frame/saveData";
    var params = {
        "tableName": tableName,
        "rows": JSON.stringify(data),
        "keyField": "GUID",
    };
    var saveResult = YCDCommon.Ajax.syncAjax(url, params);
    if (saveResult.isError) {
        console.error(saveResult.errMsg);
        $DS.util.close();
        if (tableName == "RURAL_INDI_INFO" && type == "add") {
            $DS.util.alert("保存指标失败!");
        } else if (tableName == "RURAL_INDI_INFO" && type == "edit") {
            $DS.util.alert("保存指标已下达指标失败!");
        } else {
            $DS.util.alert("保存分配金额失败!");
        }

        return false;
    } else {
        return true;
    }
}
