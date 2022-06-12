var pageData = {};
//保存指标信息
//新增或者删除
function savedata() {
    //第一个参数：add/edit
    debugger
    var type = $DS.getPms("URL_$type");
    //var money = $DS.getCtrl("指标金额").info.ds_input;
    var money = $input.getData($DS.getCtrl("指标金额").info.ds_id);
    var flag = checkMoney(money, true);
    if (!flag) {
        return;
    }
    var level = $DS.getCtrl("预算级次").info.ds_select;
    //县级 保存已使用金额
    saveDisAmount(level);
    var result = $DS.saveSource(type, '指标信息表');
    if (result.isError) {
        alert(result.errMsg);
    } else {
        parent.$DS.loadCtrl('指标列表');
        //预算级次为县级 保存
        var res = saveCountylevel(type, result.result.rowObj, level);
        if (res.isError || res == false) {
            alert(res.errMsg);
        } else {
            debugger
            //刷新右侧表格
            if (type == "edit") {
                var tabId = parent.$DS.getCtrl("TAB").info.ds_id;
                var id = parent.$DS.getPms("P_INDI")[0].GUID;
                parent.$("#" + tabId).find("iframe").eq(1)[0].contentWindow.flashGrid(id, money);
                parent.$("#" + tabId).find("iframe").eq(0)[0].contentWindow.winload(id);
            }
            close_();
            parent.alert("保存成功!");

        }
    }


}

/**
 * 为县级 保存已使用金额为指标金额
 */
function saveDisAmount(level) {
    var ctrlInfo = $DS.getCtrl("指标金额").info;
    var source =$DS.getSource("指标信息表");
    var fieldMap = source.fieldMap;
    if (level == "4") {
        fieldMap["DIS_AMOUNT"] = ctrlInfo.ds_id;
    } else {
        delete fieldMap["DIS_AMOUNT"]
    }
}

/**
 * 为县级 保存指标金额到指标分配表
 * @param type
 * @param rowObj
 * @param level
 * @returns {boolean|undefined|{isError}|*}
 */
function saveCountylevel(type, rowObj, level) {
    if (level == "4") {
        var delSql = "delete from RURAL_INDI_DETAIL where INDI_ID = " + "'" + rowObj.GUID + "'" + "AND YEAR=" + "'" + rowObj.YEAR + "'";
        var delRes = $DS.exeSql(delSql, "删除分配金额失败!");
        if (!delRes.isError) {
            //保存到指标分配表
            var data = {
                YEAR: rowObj.YEAR,
                AMOUNT: rowObj.AMOUNT,
                INDI_ID: rowObj.GUID,
                DIS_AGENCY: $DS.getPms("USER_admdiv"),
                DIS_AGENCYCODE:$DS.getPms("USER_admdivCode")
            };
            return $DS.saveTable(VUECFG.appId, "add", data, "RURAL_INDI_DETAIL", "GUID");
        } else {
            return delRes;
        }
    }
    return true;
}

/**
 * 预算级次下拉 值变更事件 选择中央显示上级指标文号控件
 */
function isShowZBWH(val) {
    var zbwhInfo = $DS.getCtrl("上级指标文号").info;
    if (val == "1") {
        zbwhInfo.ds_show = true;
    } else {
        zbwhInfo.ds_show = false;
        zbwhInfo.ds_input = "";
    }
}


/**
 * 修改金额 判断不能小于已使用金额
 * @param money
 * @param isSave 是否为保存时校验
 */
function checkMoney(money,isSave) {
    debugger
    var level = $DS.getCtrl("预算级次").info.ds_select;
    if(level=="4"){
        return true;
    }
    var type = $DS.getPms("URL_$type");
    if (type == "edit" && money!==null && money!==undefined) {
        var disAmonut = $DS.getCtrl("INPUT_已使用金额").info.ds_input;
        if (parseFloat(money) < parseFloat(disAmonut)) {
            if(!isSave){
                $DS.util.alert("【指标金额不得小于已使用指标金额!】");
            }
            return false;
        }
    }
    return true;
}

function recordMoney(info) {
    pageData["money"] = info.ds_input;
}