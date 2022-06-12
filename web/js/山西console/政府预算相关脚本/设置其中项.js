//=============================================================================设置其中项========================================================================================

/**
 * //修改报表其中项
 * @param type first:初始化调用;action 手动设置涉密项目
 * @param porCodes {CANCLE:[],SURE:[]}
 */
function setInnerProjForRpt(type, porCodes) {
    debugger
    let sheet = $SP.getActiveSheet(spread);
    //获取INC_EXP_SORT_CODE 编码列tag 以及缩进列tag
    let C_IColTag = getCode_IndentColTag(sheet);
    if (!C_IColTag.INDENTTAG || !C_IColTag.CODETAG) {
        console.error("请设置缩进列和编码列");
        return false;
    }
    if (type == 'hideExp' || type == 'hidePro') {
        return setInerProj_init(sheet, C_IColTag, type);
    } /*else if ((type == "action" ||type == "hideExp")&& (porCodes.SURE.length || porCodes.CANCLE.length > 0)) {
        return setInerProj_action(porCodes, sheet, C_IColTag,type);
    }*/
}


/**
 * 页面初始化设置其中项目
 * @param sheet
 */
function setInerProj_init(sheet, C_IColTag, type) {
    debugger
    let sql = '';
    //科目
    if (type == 'hideExp') {
        sql = "select EXP_FUNC_CODE from PM_GOV_FUNC_SEC where 1=1 [AND]  MOF_DIV_CODE = '${V.USER_admdivCode}'";
    } else {
        //项目
        sql = "select PRO_CODE,EXP_FUNC_CODE from PM_GOV_PROJECT where 1=1 [AND]  MOF_DIV_CODE = '${V.USER_admdivCode}'";
    }
    sql = speardUtil.replace(sql);
    let result = speardUtil.selectBySql(sql);
    if (result && result.result && result.result.length > 0) {
        if (type == 'hideExp') {
            let codes = result.result.map(item => item.EXP_FUNC_CODE);
            return setInerProj_action({
                SURE: codes,//科目编码
                SUREPRO: codes,
            }, sheet, C_IColTag, type)
        } else {
            return setInerProj_action({
                SURE: result.result.map(item => item.EXP_FUNC_CODE),//科目编码
                SUREPRO: result.result.map(item => item.PRO_CODE)//项目编码
            }, sheet, C_IColTag, type)
        }


    } else if (!result || result.isError) {
        console.error(result.errMsg ? result.errMsg : "初始化其中项失败");
        return false;
    }
    return true;
}


/**
 * 手动调用
 * @param porCodes
 * @param sheet
 * @param codeTag 编码列tag
 * 层级信息
 * levelMap {
 *     3:[4]
 *     5:[6,7,8]
 * }
 */

function setInerProj_action(porCodes, sheet, C_Itag, type) {
    debugger
    let hideRows = getHideRowIndex();
    //遍历编码列 获取到后设置修改
    let codecol = C_Itag.CODETAG.col;//编码tag列坐标
    let indentcol = C_Itag.INDENTTAG.col;//缩进tag列坐标
    let sumcolsTag = C_Itag.SUMCOLS;//合计行列坐标
    let rowCount = $SH.getRowCount(sheet);
    //设置其中项科目编码数组
    let sureExp_codes = getExp_code(porCodes["SURE"], type);
    //隐藏的项目
    let delPro_codes = porCodes["SUREPRO"] && porCodes["SUREPRO"].length > 0 ? porCodes["SUREPRO"] : [];
    outer: for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        //获取编码
        let code = $SH.getValue(sheet, parseInt(rowIndex), parseInt(codecol));
        if (!code) continue;

        if (sureExp_codes.length > 0 && sureExp_codes.indexOf(code) != -1/*sureExp_codes.find(item => code.indexOf(item) == 0)*/) {
            if (sureExp_codes.length > 0) {
                //去除已搜索过的科目编码
                sureExp_codes = sureExp_codes.filter(item => item != code);
                //sureExp_codes.splice(0, 1);
            }
            //取消科目公式
            if (sumcolsTag.length > 0) {
                for (let tag of sumcolsTag) {
                    sheet.setFormula(parseInt(rowIndex), parseInt(tag.col), undefined);
                    //记录合计行的值用于校验
                    let val = $SH.getValue(sheet, parseInt(rowIndex), parseInt(tag.col));
                    speardUtil.setObjVal(temporary, ['secretPro',code, tag.fieldname],val);
                }
            }
            //设置其中项
            for (let childRowIndex = rowIndex + 1; childRowIndex < rowCount; childRowIndex++) {
                let childcode = $SH.getValue(sheet, parseInt(childRowIndex), parseInt(codecol));
                //项目都被隐藏 遇到下一个科目 跳出
                if (childcode.length < 10 && (type == 'hidePro')) {
                    continue outer;
                } else if (hideRows.indexOf(childRowIndex) == -1 && delPro_codes.indexOf(childcode) == -1) {
                    let oldText = $SH.getValue(sheet, parseInt(childRowIndex), parseInt(indentcol));
                    if (oldText.indexOf("其中:") == -1) {
                        $SH.setValue(sheet, parseInt(childRowIndex), parseInt(indentcol), "  其中:" + oldText);
                        continue outer;
                    }
                }
            }
        }
        //涉密项目隐藏
        if (delPro_codes.length > 0 && delPro_codes.indexOf(code) != -1/*delPro_codes.find(item => code.indexOf(item) == 0)*/) {
            //隐藏
            $SH.setRowVisible(sheet, rowIndex, false);
        }
    }
}


//删除涉密项目
function delSecretPro(sheet, delArr) {
    let delCount = 0;
    for (let index of delArr) {
        sheet.deleteRows(parseInt(index - delCount), 1);
        delCount++;
    }
    //设置其中
    var pos = speardUtil.getTagsPosition("isInnerPro");
    pos = pos[0];
    for (var p = 0; p < pos.length; p++) {
        var tag = speardUtil.getTagByIndex(sheet, pos[p].row, pos[p].col);
        if (tag.isInnerPro == "TRUE") {
            let oldText = $SH.getValue(sheet, parseInt(pos[p].row), parseInt(pos[p].col));
            if (oldText.indexOf("其中:") != 0) {
                $SH.setValue(sheet, parseInt(pos[p].row), parseInt(pos[p].col), "其中:" + oldText);
            }
        }
    }
}


function getHideRowIndex() {
    let rowIndexArr = [];
    let hideRowMap = speardUtil.getRowHideByCondition(0);
    if (hideRowMap.hideMap) {
        rowIndexArr = Object.keys(hideRowMap.hideMap)
    }
    return rowIndexArr;
}


//数组去重
function distintArr(arr) {
    let set = new Set();
    arr.forEach(item => set.add(item));
    return Array.from(set)
}


//获取科目编码数组
function getExp_code(arr, type) {
    if (arr && arr.length > 0) {
        let newarr = arr.map(item => {
            if (type == 'hideExp') {
                return item.substring(0, 3)
            } else {
                return item;
            }

        })
        return distintArr(newarr);
    } else return []
}

/**
 * 获取编码列 以及缩进列
 */

function getCode_IndentColTag(sheet) {
    let obj = {SUMCOLS: []}
    for (let axis of tags_position[0]) {
        let tagVal = speardUtil.getTagByIndex(sheet, axis.row, axis.col);
        if (tagVal.fieldname == "INC_EXP_SORT_CODE") {
            obj.CODETAG = tagVal;
            tagVal.row = axis.row;
            tagVal.col = axis.col;
        }
        //todo 修改为缩进列
        else if (tagVal.fieldname == "INC_EXP_SORT_NAME") {
            obj.INDENTTAG = tagVal;
            tagVal.row = axis.row;
            tagVal.col = axis.col;
        } else if (tagVal.isLevelsSumCol == "TRUE") {
            tagVal.row = axis.row;
            tagVal.col = axis.col;
            obj.SUMCOLS.push(tagVal);
        }
    }
    return obj;
}

/**
 * 根据层级关系设置汇总行公式
 */
function setFormulaByLevelInfo(sheet, row, col, childRowArr) {
    //列索引转字母
    let letterIndex = speardUtil.convertDSTo26BS(parseInt(col) + 1);

    let cellStr = "";
    let childArr = childRowArr.map(child => letterIndex + (child + 1));
    cellStr = childArr.join(",");
    $SH.setFormula(sheet, parseInt(row), parseInt(col), `=SUM(${cellStr})`);
    $SH.setLocked(sheet, parseInt(row), parseInt(col), true);
}