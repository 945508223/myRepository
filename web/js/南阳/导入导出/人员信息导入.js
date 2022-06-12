let importInfo = {
    saveTable: 'NY_PERSONINFO',
    tableKeyField: 'GUID',
    appid: 'BMP'
}

//导入人员信息
function exportPersoninfo(val) {
    debugger
    let fieldInfo = $DS.selectFieldInfo(importInfo.saveTable, importInfo.appid);
    let fieldInfoObj = {};
    fieldInfo.result.forEach(field => fieldInfoObj[field.FIELD_NAME] = field);
    let sheetData = val[0];
    let sqls = [];
    for (let i = 0; i < sheetData.length; i++) {
        if (!sheetData[i].IDNO || Object.values(sheetData[i]).every(item => item == '' || item == null || item == undefined)) {
            continue;
        }
        let sqlItem = formatterPersoninfo(sheetData[i], fieldInfoObj);
        sqls.push(sqlItem);
        if (i % 400 == 0) {
            debugger
            let result = $DS.exeSqls(sqls.join(';'), importInfo.appid);
            if (result.isError) {
                alert(`导入失败:第${i}条:${result.errMsg}`);
                return;
            } else {
                console.log('导入进度:' + i + '条')
                sqls = [];
            }
        }
    }
    alert('导入成功')

}

//处理单条信息
function formatterPersoninfo(person, fieldInfo) {
    for (let field in person) {
        person[field] = person[field].trim();
        if (person[field] == null || person[field] == undefined || person[field] == '') {
            delete person[field]
        } else if (person[field] == '是') {
            person[field] = "'1'";
        } else if (person[field] == '否') {
            person[field] = "'2'";
        }
        //引用类型
        else if (person[field]?.split(' ')?.length == 2) {
            person[field] = person[field].split(' ')[0];
            person[field] = `'${person[field]}'`
        }
        //数值 整型
        else if (fieldInfo[field]?.FIELD_TYPE == '001') {
            person[field] = $DS.util.removeThousands(person[field]);
            person[field] = parseInt(person[field]);
        }
        //浮点型 || 公式
        else if (fieldInfo[field]?.FIELD_TYPE == '002'||fieldInfo[field]?.FIELD_TYPE == '') {
            person[field] = $DS.util.removeThousands(person[field]);
            person[field] = parseFloat(person[field]);
        }
        //字符型
        else if (fieldInfo[field]?.FIELD_TYPE == '003') {
            person[field] = `'${person[field]}'`
        } //日期字段
        else if (fieldInfo[field]?.FIELD_TYPE == '008'||fieldInfo[field]?.FIELD_TYPE == '009') {
            person[field] = `to_date('${person[field]}', 'YYYY-MM-DD HH24:MI:SS')`;
        }
    }
    person.YEAR = "'2022'";
    person.ISDC = "'2'";
    person.GUID = `'${$DS.util.UUID().replaceAll("-", "").toUpperCase()}'`;
    person.PERSONID = person.GUID;
    person.TASKMONTH = "'05'";
    let sql = `insert into ${importInfo.saveTable} (${Object.keys(person).join(',')}) values (${Object.values(person).join(',')})`
    return sql;
}


