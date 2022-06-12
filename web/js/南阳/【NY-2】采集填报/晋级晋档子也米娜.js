//新增:add,调入:tran
var insType = $DS.getPms("URL_insType");
//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";
//人员类型
var PERSONCAT = $DS.getPms("URL_PERSONCAT");
//当前用户处室
var userAgencyId = $DS.getPms("USER_agency");
var CZLX_ = $DS.getPms('URL_CZLX');

var pageInfo_ = {
    sourceFilter: {
        '2': "and PERSONSTATUS = '${V.URL_FILTERPERSON}' and year = '${V.USER_currentyear}' and AGENCYCODE = '${P.agencyInfo.0.ITEMCODE,AA}' ",
        '11': "and PERSONSTATUS = '${V.URL_FILTERPERSON}' and year = '${V.USER_currentyear}' and AGENCYCODE = '${P.agencyInfo.0.ITEMCODE,AA}'  and PERSONID not in(select t.PERSONID FROM NY_PAYROLL t WHERE   t.year='${V.USER_currentyear}' and t.PERSONID <> 'null' and CZLX='${V.URL_CZLX}')"
    },
    TIAOBIAOMONTH: '5',//调标补发月份
}

//初始化
function init() {
    debugger
    $DS.getCtrl("ROW_左").info.ds_show = false;
    $DS.getCtrl("ROW_右").info.ds_width = "100%";

    let sourceInfo = $DS.getSource("DS_单位人员基本信息");
    sourceInfo.filter = pageInfo_.sourceFilter[CZLX_]

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
    let xzArr = ['01', '02', '03', '04', '05']

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
            TASKMONTH: month,
            CZLX: CZLX_,//操作类型 年中追加
            YEAR: item["YEAR"] || "",//年度
            PERSONCAT: xzArr.includes(item["RYBZ"]) ? '1' : '2',//人员类别
            PERSONFROM: item["ZZRYLY"] || "",//人员来源
            PERSONSTAFF: item["RYBZ"] || "",//人员编制
            AGENCYCODE: `${parentTreePms[0]["ITEMCODE"]}` || "",//单位代码
            AGENCYNAME: `${parentTreePms[0]["ITEMNAME"]}` || "",//单位名称
            PERSONID: item.PERSONID,//人员唯一标识
            PERSONNAME: item["PERSONNAME"] || "",//姓名
            SEX: item["SEX"] || "",//性别
            NATION: item["NATION"] || "",//民族
            BIRTHDATE: item["BIRTHDATE"] || "",//出生日期
            IDNO: item["IDNO"],//身份证号
            COLLEGE: "",//毕业院校
            STUDYDATE: "",//学习时间
            EDUCATION: "",//学历类别
            WORKDATE: "",//工作年限
            OLDJOB: item["ZW"] ? '1' + item["ZW"] : "",//原任职务(技术等级)
            OLDJOBDATE: item["JOINDATE"] || "",//原任职时间
            OLDJOBLEVEL: item["JSDJLEVEL"] || "",//变动前职务(技术等级)
            OLDOPOSTGRAD: item["GWGZJBLEVEL"] || "",//变动前级别(岗位)档次
            OLDJOBLEVELWAGE: item["GWGZ"] || "",//变动前职务(技术等级)工资额
            OLDJOBPOSTWAGE: item["JBGZ"] || "",//变动前级别(岗位)档次工资额
            OLDPERIODWAGE: item[""] || "",//变动前试用(学徒、熟练)期工资
            BDQGZXJT: item["GZXJT"] || "",//变动前工作性津贴
            BDQBLGZ: item[""] || "",//变动前保留工资
            BDQBLDFLXBT: item[""] || "",//变动前保留的福利性补贴
            BDQNZGWSF: "",//变动前女职工卫生费
            BDQSHXBT: "",//变动前生活性补贴
            BDQTSGWJT: item["QTTSGWJT"] || "",//变动前特殊岗位津贴
            BDQJXJT: item["JXJT"] || "",//变动前警衔(检察官、法官)津贴
            BDQQTXMDJBT: item["QT"] || "",//变动前其他项目的津补贴
            BDQYGZHJ: getBDQYGZHJ(item),//变动前月工资合计
            AGENCYID: `${parentTreePms[0]["ID"]}` || "",//填报单位ID
            GZBDZXQSYF: $DS.getPms('USER_currentyear') + `-${month}-01 00:00:00`,//工资变动执行起始月份
            STATUS: "0",
            BFYF: CZLX_ == '11' ? pageInfo_.TIAOBIAOMONTH : (13 - parseInt(month)) + '',//离休调标
            CHANGERESON: CZLX_ == '11' ? '35' : ' '
        });
        orgiGuids.push(`'${item["GUID"]}'`);
    });

    newData = getPersonIfoByAddPersons(addPeron, newData, {
        TASKMONTH: month,
        CZLX: CZLX_,
        STATUS: '0',
        CHANGERESON: CZLX_ == '11' ? '35' : ' ',
        BFYF: CZLX_ == '11' ? pageInfo_.TIAOBIAOMONTH : (13 - parseInt(month)) + ''
    });
    return {
        data: newData,
        orgiGuid: orgiGuids
    };
}

/**
 * 计算合计
 * @param person
 */
function getBDQYGZHJ(person) {
    let sum = 0;
    //离休调标 不计算变动前数据
    if (CZLX_ == '11') {
        return sum;
    }
    let fields = ['GWGZ', 'JBGZ', 'GZXJT', 'QTTSGWJT', 'JXJT', 'QT'];
    fields.forEach(field => {
        sum += person[field] && !isNaN(parseFloat(person[field])) ? parseFloat(person[field]) : 0;
    })
    return sum;
}


//插入人员减少表
function insertDownSiz(data) {
    let insertData = $DS.util.clone(data);
    //当前月份
    let month = $DS.getPms("currentMonth") || new Date().getMonth() + 1;
    let newData = new Array();
    insertData.forEach(item => {
        newData.push({
            YEAR: year,
            UNITNAME: item["AGENCYNAME"] || "",
            UNITCODE: item["AGENCYCODE"] || "",
            RYJSLX: "1",
            ACTIONMONTH: month,
            NAME: item["PERSONNAME"] || "",
            IDNO: item["IDNO"] || "",
            MONTHWAGE: item["YGZHJ"] || "",
            AGENCYID: item["AGENCYID"] || ""
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
    let filter = "and PERSONSTATUS = '${V.URL_FILTERPERSON}' and year = '${V.USER_currentyear}' and AGENCYCODE = '${P.agencyInfo.0.ITEMCODE,AA}' and PERSONID not in(select t.PERSONID FROM NY_PAYROLL t WHERE  t.year='${V.USER_currentyear}' and t.PERSONID <> 'null' and czlx <> '1' )"
    if (val != '' && val != null && val != undefined) {
        source.filter = filter + ` and (IDNO like '%${val}%' or PERSONNAME like '%${val}%')`;
    } else {
        source.filter = filter;
    }
    let gridVm = $grid.getGridVmByName('GRID_单位基本工资表');
    gridVm.currentPage = 1;
    $DS.loadCtrl('GRID_单位基本工资表');

}

//根据新增人员  取信息
function getPersonIfoByAddPersons(addPeron, newData, fieldInfo) {
    debugger
    let result = [];
    if (addPeron?.length > 0) {
        let personids = addPeron.map(item => `'${item.PERSONID}'`);
        let sql = `select * from NY_PAYROLL WHERE PERSONID IN (${personids}) AND CZLX ='1' `
        result = $DS.selectBySql(VUECFG.appId, sql).result;
        let dateField = ['STUDYDATE', 'OLDJOBDATE', 'NEWJOBDATE', 'LEVELUPASSESSYEAR', 'PROMOTEDASSESSYEAR', 'GZBDZXQSYF', 'CJGZSJ', 'PZLTXTZSJ']
        result.forEach(item => {
            delete item.GUID;
            delete item.GZBDZXQSYF;

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