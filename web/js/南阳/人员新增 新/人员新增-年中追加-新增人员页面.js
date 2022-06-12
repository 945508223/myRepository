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
    if (insType == "add") {
        let parentTreePms = window.top["windowP"].$DS.getPms("agencyInfo");
        let sourceInfo = $DS.getSource("DS_单位人员基本信息");
        sourceInfo.filter = `and AGENCYCODE = '${parentTreePms[0]["ITEMCODE"]}'`;
        $DS.getCtrl("ROW_左").info.ds_show = false;
        $DS.getCtrl("ROW_右").info.ds_width = "100%";
    }
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
    let newData = new Array();
    //当前月份
    let month = $DS.getPms("currentMonth") || new Date().getMonth() + 1;
    let parentTreePms = window.top["windowP"].$DS.getPms("agencyInfo");
    let orgiGuids = new Array();
    data.forEach(item => {
        newData.push({
            TASKMONTH:month,
            CZLX:'2',//操作类型 年中追加
            YEAR: item["YEAR"] || "",//年度
            PERSONCAT: PERSONCAT || "",//人员类别
            PERSONFROM: item["ZZRYLY"] || "",//人员来源
            OUTUNITNAME: item["AGENCYNAME"] || "",//调出单位
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
            OLDJOB: item["ZW"] || "",//原任职务(技术等级)
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
            BDQYGZHJ: item["YGZHJ"] || "",//变动前月工资合计
            AGENCYID: `${parentTreePms[0]["ID"]}` || "",//填报单位ID
            GZBDZXQSYF: month,//工资变动执行起始月份
            STATUS: "0"
        });
        orgiGuids.push(`'${item["GUID"]}'`);
    });
    return {
        data: newData,
        orgiGuid: orgiGuids
    };
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