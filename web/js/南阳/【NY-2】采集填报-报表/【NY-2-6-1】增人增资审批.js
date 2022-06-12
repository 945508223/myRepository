//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";

//初始化
function init() {
    //人员导入 使用 数据源DS_人员调入汇总
    initSunGridSource();
}

init();

//人员导入 使用 数据源DS_人员调入汇总
function initSunGridSource() {
    debugger
    let CZLX = $DS.getPms('URL_CZLX');
    let source = $DS.getSource('DS_人员调入汇总');
    if (CZLX == '3') {
        let drSumSql = "SELECT B.CHANGERESON, (SELECT ELE_NAME FROM ELE_UNION A WHERE A.ELE_CATALOG_ID = 'GZBDYY' AND A.ELE_CODE = CHANGERESON) AS CHANGERESONCN,B.AGENCYCODE,  B.AGENCYNAME,  B.AGENCYID,  B.TASKMONTH,  B.CZLX,  B.PERSONCAT, (SELECT ELE_NAME FROM ELE_UNION A WHERE A.ELE_CATALOG_ID = 'RYLB' AND A.ELE_CODE = PERSONCAT) AS PERSONCATCN, COUNT(B.PERSONCAT) AS PERSON_NUM, (SELECT ELE_NAME FROM ELE_UNION A WHERE A.ELE_CATALOG_ID = 'CZLX1' AND A.ELE_CODE = CZLX) AS CZLXNAME, SUM(BDHYGZHJ * BFYF) AS AMOUT_BFJZ,LISTAGG(PERSONNAME, ',') WITHIN GROUP(ORDER BY B.PERSONNAME) AS REMARK FROM NY_PAYROLL B where B.TASKMONTH='${V.month}' AND B.CZLX='${V.URL_CZLX}' AND B.STATUS='${V.URL_STATUS}' and B.YEAR='${V.USER_currentyear}' and (AGENCYCODE in (select ITEMCODE FROM SSO_V_PUBAGENCY START WITH ITEMCODE ='${P.treePms.0.ITEMCODE,Y}' CONNECT BY PRIOR GUID = SUPERGUID) or '${P.treePms.0.ID}' = 'AA') GROUP BY B.AGENCYCODE, B.AGENCYNAME,AGENCYID,B.TASKMONTH, B.CZLX,B.PERSONCAT ,B.CHANGERESON"
        //$DS.getCtrl('GRID_汇总').info.ds_datasource = source.sourceId;
        $DS.getSource('DS_汇总').sql = drSumSql;
    }
}

//退回点击事件
function tuiHui() {
    let gridData = $DS.getCtrl('GRID_汇总').info.ds_grid;
    if (gridData?.length == 0) {
        alert('无可操作数据')
        return false;
    }
    let currentSumRow = $DS.getPms('SUM');
    let treePms = parent.$DS.getPms('treePms');
    let agency_ = currentSumRow?.[0]?.AGENCYID ? currentSumRow?.[0]?.AGENCYID : (treePms && !treePms?.[0].children ? treePms[0].ID : '');

    if (!agency_) {
        alert('请选择退回单位!');
        return false;
    }
    let month_ = $DS.getPms('month');
    let czlx_ = $DS.getPms('URL_CZLX');

    writeBackRemark(agency_, month_, czlx_, false)
}

/**
 * 0 >送审
 * 1 >审核通过
 * 2 >退回
 * @param status
 * @param statuName
 */
function btn_submit_click(status, statuName) {


    $DS.util.confirm(vm, `是否确认${statuName}`, function () {
        debugger
        let treePms = parent.$DS.getPms("treePms");
        let month = $DS.getPms('month');
        let CZLX = $DS.getPms('URL_CZLX');
        let currentSumRow = $DS.getPms('SUM');
        let agency_ = currentSumRow?.[0]?.AGENCYID ? currentSumRow?.[0]?.AGENCYID : (treePms && !treePms?.[0].children ? treePms[0].ID : '');
        //送审 删除 退回说明
        if (status == '0') {
            beforeToSendCheck(treePms[0].ID, month, CZLX)
        }
        let sql;
        if (status == '2') {
            sql = `update NY_PAYROLL set STATUS = '0'  where CZLX='${CZLX}' AND (AGENCYCODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '1' and TASKMONTH = '${month}'`;
            //保存退回说明
            saveBackRemark(agency_, month, CZLX);
        } else {
            sql = `update NY_PAYROLL set STATUS = '${parseInt(status) + 1}'  where CZLX='${CZLX}' AND (AGENCYCODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '${status}' and TASKMONTH = '${month}'`;
        }
        sql = dealSumDataSql(sql, currentSumRow)
        let result;
        //生成指标
        if (status == '1') {
            result = createIndi(treePms, CZLX, month);
            if (!result) return
            //人员新增审批通过 将记录插入人员音系表一份
            if (CZLX == '1') {
                insertForPersoninfoByAddPerson(treePms, month, currentSumRow);
            }
            //审批通过调入人员 生成减少人员信息
            if (CZLX == '3')
                result = createReducePeople(treePms, month);
            if (!result) return
        }

        result = $DS.exeSql(sql);
        if (!result.isError) {

            $DS.util.alert(`${statuName}成功!`);
            parent.$DS.loadCtrl('TABS_选择');
        } else {
            $DS.util.alert(`${statuName}失败,请检查!`);
        }

    })

}

/**
 * 审核通过 生成指标
 */
function createIndi(treePms, CZLX, month) {

    let sumGrid = $DS.getCtrl('GRID_汇总').info;
    let result = sumGrid.ds_grid;
    if (result.length == 0) {
        alert('无可操作数据!');
        return true;
    }
    // let currentSumRow = $DS.getPms('SUM');
    let currentSumRow = $grid.getCheckedNodes(sumGrid.ds_id);
    if (currentSumRow?.length > 0) {
        result = currentSumRow;
    }
    //当前时间
    let newDateTime = $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss");
    let newData = result.map(item => {
        return {
            YEAR: year,
            AGENCY_CODE: item["AGENCYCODE"],
            BGT_COUNTMONEY: item["AMOUT_BFJZ"],
            BZ: getRemark_(item["REMARK"]),
            DWMC: item["AGENCYNAME"],
            DATE_SB: newDateTime,
            ZBFL: CZLX,
            AGENCYID: item["AGENCYID"],
            SHRQ: newDateTime
        }
    });
    let data = {inserted: newData, updated: [], deleted: []};
    result = $DS.saveAllTableData(`INDI_T_DZZBB`, `GUID`, data, VUECFG.appId);
    if (result.isError) {
        alert('生成代转指标失败!');
        return false;
    }
    return true;
}


/**
 * 汇总表格行点击 刷新ifram 查看明细
 * @param row
 */
function sumGridRowClick(row) {
    debugger
    let src = `/bmp_portal/report/reportdesigner/lookreport/reportView.jsp?reportid=7F0454FF2A3B4FCA93702FF247FC6432&mxAgencyId=${row.AGENCYCODE}&PERSONCAT=${row.PERSONCAT}&CHANGERESON=${row.CHANGERESON ? row.CHANGERESON : ' '}`;
    let iframInfo = $DS.getCtrl('IFRAME_明细').info;
    iframInfo.ds_iframe_src_input = src;
    $DS.loadCtrl('IFRAME_明细')
}


//生成减少人员
function createReducePeople(treePms, month) {
    let addPersonSql = `select * from NY_PAYROLL  where CZLX='3' AND (AGENCYCODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'AA'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'AA') and STATUS = '1' and TASKMONTH = '${month}'`
    addPersonSql = dealSumDataSql(addPersonSql, $DS.getPms('SUM'));
    let addPerson = $DS.selectBySql(VUECFG.appId, addPersonSql).result;
    if (addPerson.length == 0) {
        return true;
    }
    //人员唯一标识 id 获取人员信息
    let personidS = addPerson.map(person => `'${person.PERSONID}'`);
    let personSql = `select * from NY_PERSONINFO WHERE PERSONID IN (${personidS.join(',')})`;
    let persionInfo = $DS.selectBySql(VUECFG.appId, personSql).result;
    let personObj = {};
    persionInfo.forEach(person => {
        personObj[person.PERSONID] = person;
    })
    let joinDate = $DS.util.timeFormate(new Date(), 'yyyy年MM月dd日');//年**月**日调入****单位
    let year = $DS.getPms('USER_currentyear');
    let reducePerson = addPerson.map(person => {
        let reducePerson = {};
        reducePerson.YEAR = year;
        reducePerson.AGENCYNAME = personObj[person.PERSONID].AGENCYNAME;
        reducePerson.AGENCYCODE = personObj[person.PERSONID]["AGENCYCODE"] || "";
        reducePerson.RYJSLX = "1";
        reducePerson.NAME = person["PERSONNAME"] || "";
        reducePerson.IDNO = person["IDNO"] || "";
        reducePerson.MONTHWAGE = person.BDQYGZHJ; //月工资合计 取变动前工资合计 personObj[person.PERSONID]["YGZHJ"] || "";
        reducePerson.AGENCYID = personObj[person.PERSONID]["AGENCYID"] || "";
        reducePerson.PERSONID = person.PERSONID || "";
        reducePerson.CURRENTMONTH = month;
        reducePerson.REMARK = `${joinDate}调入${person.AGENCYNAME}单位`;
        reducePerson.ACTIONMONTH = $DS.util.timeFormate(new Date(person.GZBDZXQSYF), 'MM');//执行月份
        reducePerson.ADDMONTH = 13 - parseInt(reducePerson.ACTIONMONTH);//补发月份 12 - 执行月份+1
        reducePerson.ADDWAGE = parseInt(reducePerson.ADDMONTH) * parseFloat(reducePerson.MONTHWAGE) * -1;//补发工资

        return reducePerson;
    })
    let result = $DS.saveAllTableData('NY_REDUCE_DETAIL', 'GUID', {
        inserted: reducePerson,
        updated: [],
        deleted: []
    }, VUECFG.appId)
    if (result.isError) {
        alert('生成减少人员失败:' + result.errMsg);
        return false;
    }
    return true;
}


//取备注
function getRemark_(remark) {
    if (!remark) {
        return '';
    } else if (remark.split(',').length < 3) {
        return remark
    } else {
        let arr = remark.split(',');
        return `${arr[0]},${arr[1]},${arr[2]}等`
    }
}

//保存退回说明
function saveBackRemark(agencyid, month, CZLX) {
    debugger
    try {
        let result = $DS.saveTable(VUECFG.appId, 'add', {
            MONTH: month,
            AGENCYID: agencyid,
            CZLX: CZLX,
            REMARK: window.top.TUIHUIREMARK
        }, 'TASK_HISTORY', 'GUID');
        if (result.isError) {
            alert('保存退回说明失败!' + result.errMsg)
            return
        }
    } catch (e) {
        console.error('保存退回说明失败' + e)
        delete window.top.TUIHUIREMARK;
    } finally {
        delete window.top.TUIHUIREMARK;
    }

}


function insertForPersoninfoByAddPerson(treePms, month, currentSumRow) {
    debugger
    let selectSql = `SELECT B.PERSONID,B.IDNO,B.AGENCYID,B.AGENCYCODE,B.PERSONNAME,B.YEAR,B.TASKMONTH,B.SEX ,'1' AS ISXZ,'2' AS ISDC,'3' AS PERSONSTATUS FROM NY_PAYROLL B WHERE CZLX='1' AND (AGENCYCODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '1' and TASKMONTH = '${month}'`
    selectSql = dealSumDataSql(selectSql, currentSumRow);
    //let sql = `INSERT INTO NY_PERSONINFO (${selectSql})`;
    let result = $DS.selectBySql( VUECFG.appId,selectSql).result;
    let res_ = $DS.saveAllTableData('NY_PERSONINFO','GUID',{inserted:result,updated:[],deleted:[]})
    if(res_.isError){
        return false;
    }
    return true
}


//送审 退回 选中的数据
function dealSumDataSql(sql, sumPms) {
    //操作选中的合计数据
    if (sumPms && sumPms.length > 0) {
        $DS.putPms('SUM',sumPms)
        //[AND] PERSONCAT='${V.SUM[0].PERSONCAT}'
        sql += " [AND] AGENCYCODE = '${V.SUM.0.AGENCYCODE}' [AND] PERSONCAT = '${V.SUM.0.PERSONCAT}' AND CHANGERESON = '${V.SUM.0.CHANGERESON}'";
        sql = $DS.util.replace(sql);
        $DS.delPms('SUM', sumPms)
    }
    return sql;
}
