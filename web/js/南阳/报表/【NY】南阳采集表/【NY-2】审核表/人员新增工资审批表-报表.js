//初始化
function init_Y() {
    if (!pageParams["saveObj"])
        pageParams["saveObj"] = new Object();
    //设置默认字段
    setDefaultValue();
}

init_Y();

//设置默认字段
function setDefaultValue() {
    if (!pageParams["saveObj"]["NY_PAYROLL"])
        pageParams["saveObj"]["NY_PAYROLL"] = new Object();
    pageParams["saveObj"]["NY_PAYROLL"]["AGENCYNAME"] = `'${speardUtil.getPms("URL_agencyName") || ""}'`;
    pageParams["saveObj"]["NY_PAYROLL"]["AGENCYCODE"] = `'${speardUtil.getPms("URL_agencyCode") || ""}'`;
    pageParams["saveObj"]["NY_PAYROLL"]["TASKMONTH"] = `'${speardUtil.getPms("URL_currentMonth") || ""}'`;
    pageParams["saveObj"]["NY_PAYROLL"]["YEAR"] = `'${speardUtil.getPms('USER_currentyear')}'`;
}

//单元格失去焦点记录保存的数据
function recordCell(params) {
    debugger
    if (!params || !params["tag"]) return;
    let sheet = params["sheet"];
    let row = params["row"];
    let col = params["col"];
    let tag = params["tag"];
    //当前cell的值
    let newVal = $SH.getValue(sheet, row, col);
    //判断单元格是否是字符串类型
    let isString = tag["numberType"] == "string" ? true : false;
    newVal = isString ? `'${newVal}'` : newVal;
    //表名字段名
    let fieldName = tag.fieldname;
    let tableName = tag.tablename;
    if (!fieldName || !tableName) return;
    if (!pageParams["saveObj"][tableName])
        pageParams["saveObj"][tableName] = new Object();
    pageParams["saveObj"][tableName][fieldName] = newVal;
}

//保存具体实现
function pubSave_Y(keyFiled, keyVal) {
    if (!keyFiled) return;
    //新增=>字段名数组,//新增=>值数组
    let insInfoArr = new Array();
    let insValArr = new Array();
    //修改=>字段名:值 数组
    let updateInfoValArr = new Array();
    let saveObj = pageParams["saveObj"]
    let infoArr = Object.keys(saveObj);
    if (infoArr.length == 0) return;
    //-------------------------------------------------------------------------------------------
    for (let tableName of infoArr) {
        let fieldArr = Object.keys(saveObj[tableName]);
        if (fieldArr.length == 0) continue;
        fieldArr.forEach(fieldName => {
            insInfoArr.push(fieldName);
            insValArr.push(saveObj[tableName][fieldName]);
            updateInfoValArr.push(`${fieldName} = ${saveObj[tableName][fieldName]}`);
        });
        let sqls = new String();
        //如果有值,执行update操作
        if (keyVal) {
            sqls = [`update ${tableName} set ${updateInfoValArr.join(",")} where ${keyFiled} = '${keyVal}'`];
        } else {
            let newGuid = getGUID_Y();
            sqls = [`insert into ${tableName} (${insInfoArr.join(",")},${keyFiled}) values (${insValArr.join(",")},'${newGuid}')`];
        }
        let result = speardUtil.exeSqls(sqls.join(";"));
    }
    //------------------------------------------------------------------------------------------------
    return true;
}

//=============================================================================依赖===========================================================================================
//随机32位码
function getGUID_Y() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid.replaceAll("-", "").toUpperCase();
}