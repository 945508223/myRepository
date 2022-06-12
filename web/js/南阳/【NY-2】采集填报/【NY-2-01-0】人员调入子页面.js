//新增:add,调入:tran
var insType = $DS.getPms("URL_insType");
//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";
//人员类型
var PERSONCAT = $DS.getPms("URL_PERSONCAT");
//当前用户处室
var userAgencyId = $DS.getPms("USER_agency");
// 修改之后,在原表标识  已调出,  备注中写调出到了哪个单位
//初始化
function init() {
    debugger
    //如果是新增按钮打开,只显示本单位数据,左侧单位树不显示
    /* if (insType == "add") {
         let parentTreePms = window.top["windowP"].$DS.getPms("agencyInfo");
         let sourceInfo = $DS.getSource("DS_单位人员基本信息");
         sourceInfo.filter = `and AGENCYCODE = '${parentTreePms[0]["ITEMCODE"]}'`;
         $DS.getCtrl("ROW_左").info.ds_show = false;
         $DS.getCtrl("ROW_右").info.ds_width = "100%";
     }*/
    $DS.getCtrl("ROW_左").info.ds_show = false;
    $DS.getCtrl("ROW_右").info.ds_width = "100%";
}

init();

//确认按钮点击事件
function btn_success_click() {
    debugger
    let parentTreePms = window.top["windowP"].$DS.getPms("agencyInfo");
    let gridInfo = $DS.getCtrl("GRID_单位基本工资表").info;
    let gridData = $grid.getData(gridInfo.ds_id);
    let saveObj = machiningData(gridData);
    let data = {inserted: saveObj.data, deleted: [], updated: []};
    if (saveObj.orgiGuid && saveObj.orgiGuid.length > 0)
        $DS.exeSql(`update NY_PERSONINFO set ISDC = '1',REMARK='已调出至单位:${parentTreePms[0]["ITEMNAME"]}' where guid in (${saveObj.orgiGuid.join(",")})`)
    //let downSiz = insertDownSiz(gridData);
    //$DS.saveAllTableData(`NY_REDUCE_DETAIL`, `GUID`, {inserted: downSiz, updated: [], deleted: []}, VUECFG.appId);
    let result = $DS.saveAllTableData(`NY_PAYROLL`, `GUID`, data, VUECFG.appId);
    if (result && !result.isError) {
        alert("执行成功!", "closeY");
        if (window.top["windowP"])
            window.top["windowP"].$DS.loadCtrl("IFRAME_列表");
    } else {
        alert("执行失败,请检查!");
    }
}

//加工数据
function machiningData(data) {
    let xzArr = ['01', '02', '03', '04', '05'];
    let syArr = ['06', '07', '08', '0901', '0902', '0903'];


    let newData = new Array();
    //当前月份
    let month = $DS.getPms("currentMonth") || new Date().getMonth() + 1;
    let parentTreePms = window.top["windowP"].$DS.getPms("agencyInfo");
    let orgiGuids = new Array();
    let normalPerson = data.filter(item => item.ISXZ == '' || item.ISXZ == '2');
    //通过人员人员新增来的
    let addPeron = data.filter(item => item.ISXZ == '1');
    normalPerson.forEach(item => {
        newData.push({
            TASKMONTH: month,//月份
            YEAR: item["YEAR"] || "",//年度
            PERSONCAT: xzArr.includes(item["RYBZ"]) ? '1' : '2',//人员类别
            PERSONFROM: '2',//人员来源
            OUTUNITNAME: item["AGENCYCODE"]+'-'+item["AGENCYNAME"] || "",//调出单位
            PERSONSTAFF: item["RYBZ"] || "",//人员编制
            AGENCYCODE: `${parentTreePms[0]["ITEMCODE"]}` || "",//单位代码
            AGENCYNAME: `${parentTreePms[0]["ITEMNAME"]}` || "",//单位名称
            PERSONID: item["PERSONID"],//个人编码
            PERSONNAME: item["PERSONNAME"] || "",//姓名
            SEX: item["SEX"] || "",//性别
            NATION: item["NATION"] || "",//民族
            BIRTHDATE: item["BIRTHDATE"] || "",//出生日期
            IDNO: item["IDNO"],//身份证号
            COLLEGE: "",//毕业院校
            STUDYDATE: "",//学习时间
            EDUCATION: "",//学历类别
            WORKDATE: item.WORKYEAR||"",//工作年限
            OLDJOB: item["ZW"] || "",//原任职务(技术等级)
            OLDJOBDATE: item["JOINDATE"] || "",//原任职时间
            OLDJOBLEVEL: item["JSDJLEVEL"] || "",//变动前职务(技术等级)
            OLDOPOSTGRAD: item["GWGZJBLEVEL"] || "",//变动前级别(岗位)档次
            OLDJOBLEVELWAGE: item["GWGZ"] || 0,//变动前职务(技术等级)工资额
            OLDJOBPOSTWAGE: item["JBGZ"] || 0,//变动前级别(岗位)档次工资额
            OLDPERIODWAGE: item[""] || 0,//变动前试用(学徒、熟练)期工资
            BDQGZXJT: item["GZXJT"] || 0,//变动前工作性津贴
            BDQBLGZ: item["BLWJFB"] || 0,//变动前保留工资
            BDQBLDFLXBT: item[""] || 0,//变动前保留的福利性补贴
            BDQNZGWSF: 0,//变动前女职工卫生费
            BDQSHXBT: item.SHXBT,//变动前生活性补贴
            BDQTSGWJT: item["QTTSGWJT"] || 0,//变动前特殊岗位津贴
            BDQJXJT: item["JXJT"] || 0,//变动前警衔(检察官、法官)津贴
            BDQQTXMDJBT: item["QT"] || 0,//变动前其他项目的津补贴
            BDQYGZHJ: getBDQYGZHJ(item),//变动前月工资合计
            AGENCYID: `${parentTreePms[0]["ID"]}` || "",//填报单位ID
            GZBDZXQSYF: $DS.getPms('USER_currentyear') + '-' + month + '-01 00:00:00 ',//工资变动执行起始月份
            CZLX: "3",//操作类型,
            STATUS: "0",
            BFYF: (13 - parseInt(month)) + '',
            CHANGERESON:'12'

        });
        orgiGuids.push(`'${item["GUID"]}'`);
    });
    let addPersonGUid = addPeron.map(item=>`'${item.GUID}'`);
    orgiGuids = addPersonGUid.concat(addPersonGUid);
    newData = getPersonIfoByAddPersons(addPeron,newData,{TASKMONTH: month,
        CZLX: '3',
        STATUS: '0',
        CHANGERESON: '12',
        BFYF: (13 - parseInt(month)) + '',
        AGENCYCODE: `${parentTreePms[0]["ITEMCODE"]}` || "",//单位代码
        AGENCYNAME: `${parentTreePms[0]["ITEMNAME"]}` || "",//单位名称
        AGENCYID:`${parentTreePms[0]["ID"]}` || "",//单位名称
    })
    newData = setDefaultValue_(newData);

    return {
        data: newData,
        orgiGuid: orgiGuids
    };
}

//插入人员减少表
function insertDownSiz(data) {
    let parentTreePms = window.top["windowP"].$DS.getPms("agencyInfo");
    //调入单位
    let joinAgency = parentTreePms[0]["ITEMNAME"];
    let joinDate = $DS.util.timeFormate(new Date(), 'yyyy年MM月dd日');//年**月**日调入****单位
    let insertData = $DS.util.clone(data);
    //当前月份
    let month = $DS.getPms("currentMonth") || new Date().getMonth() + 1;
    let newData = new Array();
    insertData.forEach(item => {
        newData.push({
            YEAR: year,
            AGENCYNAME: item["AGENCYNAME"] || "",
            AGENCYCODE: item["AGENCYCODE"] || "",
            RYJSLX: "1",
            ACTIONMONTH: month,
            NAME: item["PERSONNAME"] || "",
            IDNO: item["IDNO"] || "",
            MONTHWAGE: item["YGZHJ"] || "",
            AGENCYID: item["AGENCYID"] || "",
            PERSONID: item.PERSONID || "",
            CURRENTMONTH: month,
            REMARK: `${joinDate}调入${joinAgency}单位`
        });
    });
    return newData;
}

//关闭页面
function closeY() {
    $DS.util.close();
}

//===================================================================================================================
/**
 * 月份加载完成 设置默认值
 * @param info
 */
function monthLoadCompelete(info) {
    debugger
    let date = new Date;
    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" + month : month);
    info.ds_select = month
    $DS.putPms('currentMonth', month);
}


//搜索
function searchPeople(val) {
    debugger

    let source = $DS.getSource('DS_单位人员基本信息');
    let filter = "AND ISDC<>'1' [and] year = '${V.USER_currentyear}'  AND PERSONSTATUS NOT IN ('3 ','9') [AND] AGENCYID <> '${V.URL_agencyId}'";
    if (val != '' && val != null && val != undefined) {
        source.filter = filter + ` and IDNO = '${val}' `;
    } else {
        source.filter = filter;
    }
    let gridVm = $grid.getGridVmByName('GRID_单位基本工资表');
    gridVm.currentPage = 1;
    $DS.loadCtrl('GRID_单位基本工资表');

}


/**
 * 设置默认值
 * @param data
 * @private
 */
function setDefaultValue_(data) {
    debugger
    let fields = $DS.selectFieldInfo('NY_PAYROLL', VUECFG.appId).result;
    let numField = ['001', '002', '005'];
    fields = fields.filter(field => numField.includes(field.FIELD_TYPE)).map(field => field.FIELD_NAME);
    data.forEach(item => {
        fields.forEach(field => {
            if (!item.hasOwnProperty(field)) {
                item[field] = 0;
            }
        })
    })

    return data;
}



/**
 * 计算合计
 * @param person
 */
function getBDQYGZHJ(person) {
    let sum = 0;
    let fields = ['GWGZ', 'JBGZ', 'GZXJT', 'QTTSGWJT', 'JXJT', 'QT'];
    fields.forEach(field => {
        sum += person[field] && !isNaN(parseFloat(person[field])) ? parseFloat(person[field]) : 0;
    })
    return sum;
}



//根据新增人员  取信息
function getPersonIfoByAddPersons(addPeron, newData, fieldInfo) {
    debugger
    let result = [];
    if (addPeron?.length > 0) {
        let personids = addPeron.map(item => `'${item.PERSONID}'`);
        let sql = `select * from NY_PAYROLL WHERE PERSONID IN (${personids}) AND CZLX ='1' `
        result = $DS.selectBySql(VUECFG.appId, sql).result;
        let dateField = ['BIRTHDATE','STUDYDATE', 'OLDJOBDATE', 'NEWJOBDATE', 'LEVELUPASSESSYEAR', 'PROMOTEDASSESSYEAR', 'GZBDZXQSYF', 'CJGZSJ', 'PZLTXTZSJ']
        result.forEach(item => {
            delete item.GUID;
            delete item.GZBDZXQSYF;
            item.OUTUNITNAME = item["AGENCYCODE"]+'-'+item["AGENCYNAME"] || "";
            for (let field in fieldInfo) {
                item[field] = fieldInfo[field];
            }
            for (let field_ in item) {
                if (item[field_] == null || item[field_] == undefined || item[field_] == 'null' || item[field_] == 'undefined') {
                    delete item[field_]
                }
                //处理日期
                if (dateField.includes(field_) && item[field_]) {
                    item[field_] = $DS.util.timeFormate(new Date(item[field_]),'yyyy-MM-dd')
                }
            }
        })
    }

    return newData.concat(result);
}