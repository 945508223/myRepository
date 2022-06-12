/**
 * 值变更 保存信息
 */
function updatePersonInfoForAddPerson(params) {
    debugger
    try {
        if (!params["tag"]) return;
        var sheet = params["sheet"];
        var row = params["row"];
        var col = params["col"];
        var tag = params["tag"];
        //当前cell的值
        var newVal = $SH.getValue(sheet, row, col);
        var fieldName = tag.fieldname;
        var tablename = tag.tablename;
        if (!fieldName || !tablename) return;
        let isString = tag["numberType"] == "string" ? true : false;
        //保存
        let guidCol = getGuidColNum_();
        let guid = $SH.getValue(sheet, row, guidCol);
        var saveResult = pubSave_(tablename, "GUID", guid, fieldName, newVal, isString);
        if ((saveResult) && (saveResult.isError))
            alert(saveResult.errMsg);
        //执行月份变更
        if(fieldName=='GZBDZXQSYF'){
            changeBFYS(newVal,tablename,guid);
        }
    } catch (err) {
        alert(err);
    }

}


function pubSave_(tablename, keyFiled, keyVal, fieldName, fieldValue, isString) {

    fieldValue = isString ? `'${fieldValue}'` : fieldValue;
    let sql = `update ${tablename} set ${fieldName} = ${fieldValue} where ${keyFiled}='${keyVal}'`;
    //执行sql
    let result = speardUtil.exeSql(sql);
    return result
}

/**
 *
 * 执行月份变更 计算补发月份
 */
function changeBFYS(actionMonth,tablename, guid) {
    let nowMonth = speardUtil.getPms('URL_month');
    let BFYF = parseInt(actionMonth) - parseInt(nowMonth);
    pubSave_(tablename,'GUID',guid,'BFYF',BFYF,true);
}

function getGuidColNum_() {
    let sheet = spread.getActiveSheet();
    let colcount = $SH.getColumnCount(sheet);
    for (let i = 0; i < colcount; i++) {
        let tag = speardUtil.getTagByIndex(sheet, 2, i);
        if (tag?.fieldname == 'GUID') {
            return i;
        }
    }
}



