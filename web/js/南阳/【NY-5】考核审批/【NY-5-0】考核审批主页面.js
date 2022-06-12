let pageCfg_ = {
    tabCfg: {
        /*'MBKH': {PAGEID: 'BC5DDA2B2953459497789BE73C80B4D9', TABLENAME: 'INDI_T_MBJ', CZLX: '5'},//1目标
        'PSKH': {PAGEID: '47FB289931154C13A894AF7434590DDC', TABLENAME: 'INDI_T_PSKH', CZLX: '6'},//平时
        'WMJKH': {PAGEID: '68AD6BC0B1914B94A2D81017575B18D8', TABLENAME: 'INDI_T_WMJ', CZLX: '7'},//文明
        'WYBT': {PAGEID: '843D4F0E060346CDAB1FABCF312DDABE', TABLENAME: 'INDI_T_WYBT', CZLX: '8'},//物业
        'GWTXKH': {PAGEID: '8B91C024651E45858FA02ED0096B9B02', TABLENAME: 'INDI_T_GWTX', CZLX: '9'},//公务
        'JKXYKH': {PAGEID: '8422D5B46FBE4BCF886D07C16DD89BEA', TABLENAME: 'INDI_T_JKXY', CZLX: '10'},//健康*/


        'MBKH': {PAGEID: 'BC5DDA2B2953459497789BE73C80B4D9', TABLENAME: 'INDI_T_MBJ', CZLX: '5'},
        'MBKH_YCX': {PAGEID: 'BC5DDA2B2953459497789BE73C80B4D9', TABLENAME: 'INDI_T_MBJ', CZLX: '52'},

        'WMJKH': {PAGEID: '68AD6BC0B1914B94A2D81017575B18D8', TABLENAME: 'INDI_T_WMJ', CZLX: '7'},
        'WMJKH_LX': {PAGEID: '68AD6BC0B1914B94A2D81017575B18D8', TABLENAME: 'INDI_T_WMJ', CZLX: '72'},
        'WMJKH_TX': {PAGEID: '68AD6BC0B1914B94A2D81017575B18D8', TABLENAME: 'INDI_T_WMJ', CZLX: '73'},

        'WYBT': {PAGEID: '843D4F0E060346CDAB1FABCF312DDABE', TABLENAME: 'INDI_T_WMJ', CZLX: '8'},
        'WYBT_LT': {PAGEID: '843D4F0E060346CDAB1FABCF312DDABE', TABLENAME: 'INDI_T_WMJ', CZLX: '82'},

        'PSKH': {PAGEID: '47FB289931154C13A894AF7434590DDC', TABLENAME: 'INDI_T_PSKH', CZLX: '6'},
        'PSKH_2': {PAGEID: '47FB289931154C13A894AF7434590DDC', TABLENAME: 'INDI_T_PSKH', CZLX: '62'},
        'PSKH_3': {PAGEID: '47FB289931154C13A894AF7434590DDC', TABLENAME: 'INDI_T_PSKH', CZLX: '63'},
        'PSKH_4': {PAGEID: '47FB289931154C13A894AF7434590DDC', TABLENAME: 'INDI_T_PSKH', CZLX: '64'},
        'PSKH_CJYS': {PAGEID: '47FB289931154C13A894AF7434590DDC', TABLENAME: 'INDI_T_PSKH', CZLX: '65'},

        'GWTXKH': {PAGEID: '8B91C024651E45858FA02ED0096B9B02', TABLENAME: 'INDI_T_GWTX', CZLX: '9'},
        'GWTXKH_TX': {PAGEID: '8B91C024651E45858FA02ED0096B9B02', TABLENAME: 'INDI_T_GWTX', CZLX: '92'},

        'JKXYKH': {PAGEID: '8422D5B46FBE4BCF886D07C16DD89BEA', TABLENAME: 'INDI_T_JKXY', CZLX: '10'},
        'JKXYKH_TX': {PAGEID: '8422D5B46FBE4BCF886D07C16DD89BEA', TABLENAME: 'INDI_T_JKXY', CZLX: '102'},
    },
    type: $DS.getPms('URL_KH_TYPE')
}


//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";

//初始化
function init() {
    initTabConfig();
}

init();


/**
 * 初始化tab页
 */
function initTabConfig() {
    debugger
    let type = $DS.getPms('URL_KH_TYPE');
    if (!pageCfg_.tabCfg[type]) {
        alert('获取标签页配置失败!');
        return;
    }
    let tagInfo = $DS.getCtrl('TABS_选择').info;
    let cfg = tagInfo.ds_tabs_editableTabs;
    if ($DS.util.isString(cfg)) {
        cfg = JSON.parse(cfg);
    }
    cfg.forEach(item => {
        item.content = `/freeForm/freeFromView.jsp?PAGEID=${pageCfg_.tabCfg[type].PAGEID}&PAGETITLE=${pageCfg_.tabCfg[type].TABLENAME}&APPID=BMP&CZLX=${pageCfg_.tabCfg[type].CZLX}`
        tagInfo.ds_tabs_editableTabsValue = "1";
    })
}

//退回点击事件
function tuiHui(win) {
    window.top.childWin_ = win;
    let gridData = win.$DS.getCtrl('GRID_汇总').info.ds_grid;
    let currentSumRow = win.$DS.getPms('SUM');
    if (gridData?.length == 0 || currentSumRow?.length == 0) {
        alert('请选择单位')
        return false;
    }
    let treePms = $DS.getPms('treePms');
    let agency_ = currentSumRow?.[0]?.AGENCYID ? currentSumRow?.[0]?.AGENCYID : (treePms && !treePms?.[0].children ? treePms[0].ID : '');
    if(!agency_){
        alert('请选择退回单位');
        return false;
    }
    let month_ = win.$DS.getPms('month');
    let czlx_ = win.$DS.getPms('URL_CZLX');
    writeBackRemark(agency_, month_, czlx_, false)
}

/**
 * 0 >送审
 * 1 >审核通过
 * 2 >退回
 * @param status
 * @param statuName
 */
function btn_submit_click(status, statuName, month, childWin) {

    $DS.util.confirm(window.vm, `是否确认${statuName}`, function () {
        debugger
        childWin = childWin?childWin:window.top.childWin_;
        let type = $DS.getPms('URL_KH_TYPE');
        let treePms = $DS.getPms("treePms");
        let currentSumRow = childWin.$DS.getPms('SUM');
        let tableName = pageCfg_.tabCfg[type].TABLENAME;
        let CZLX = pageCfg_.tabCfg[type].CZLX;

        let sql;
        if (status == '2') {
            sql = `update ${tableName} set STATUS = '0'  where (AGENCY_CODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '1' and MONTH = '${month}' AND CZLX='${CZLX}'`;
        } else {
            sql = `update ${tableName} set STATUS = '${parseInt(status) + 1}'  where  (AGENCY_CODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '${status}' and MONTH = '${month}' and CZLX='${CZLX}'`;
        }
        sql = dealSumDataSql(sql, currentSumRow);
        //代转指标
        if (status == '1' && !createIndi(month, currentSumRow)) {
            return false
        }
        let result = $DS.exeSql(sql);
        if (result && !result.isError) {
            let agency_ =  currentSumRow?.[0]?.AGENCYID ? currentSumRow?.[0]?.AGENCYID : (treePms && !treePms?.[0].children ? treePms[0].ID : '');
            //删除退回说明
            if (status == '0') {
                beforeToSendCheck(agency_, month, CZLX)
            } else if (status == '2') {
                saveBackRemark(agency_, month, CZLX)
            }
            delete window.top.childWin_;
            $DS.util.alert(`${statuName}成功!`);
            $DS.loadCtrl('TABS_选择');
        } else {
            $DS.util.alert(`${statuName}失败,请检查!`);
        }
    },'已取消'+statuName)
}


/**
 * 审核通过 生成指标
 */
function createIndi(month, currentSumRow) {
    debugger
    let result;
    let treePms = $DS.getPms("treePms");
    if (currentSumRow && currentSumRow.length > 0) {
        result = currentSumRow;
    } else {
        let sumSql = `select A.BGT_ID,
       A.CZLX, 
       A.AGENCY_CODE,
       A.AGENCYID,
       A.DWMC,
       count(*)            as NUM,
       sum(BGT_COUNTMONEY) as BGT_COUNTMONEY,
       LISTAGG(NAME, ',') within group (order by A.NAME) as REMARK
        from ${pageCfg_.tabCfg[pageCfg_.type].TABLENAME} A
        WHERE A.AGENCYID in (select GUID FROM SSO_V_PUBAGENCY START WITH GUID = '${treePms[0].ID}' connect by prior GUID = SUPERGUID)
        AND STATUS = '1'
        AND YEAR = '${year}'
        AND MONTH = '${month}'
        group by A.AGENCY_CODE, A.DWMC, A.BGT_ID,A.AGENCYID ,A.CZLX
        ORDER BY A.AGENCY_CODE`;

        result = $DS.selectBySql(VUECFG.appId, sumSql).result;
    }

    if (result.length == 0) return true;
    //当前时间
    let newDateTime = $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss");
    let newData = result.map(item => {
        return {
            YEAR: year,
            AGENCY_CODE: item["AGENCY_CODE"],
            BGT_COUNTMONEY: item["BGT_COUNTMONEY"],
            DWMC: item["DWMC"],
            DATE_SB: newDateTime,
            ZBFL: pageCfg_.tabCfg[pageCfg_.type].CZLX,
            AGENCYID: item["AGENCYID"],
            SHRQ: newDateTime,
            BZ: getRemark_(item.REMARK)
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


//送审 退回 选中的数据
function dealSumDataSql(sql, sumPms) {
    //操作选中的合计数据
    if (sumPms && sumPms.length > 0) {
        //[AND] PERSONCAT='${V.SUM[0].PERSONCAT}'
        $DS.putPms('SUM',sumPms)
        sql += " [AND] AGENCY_CODE = '${V.SUM.0.AGENCY_CODE}'";
        sql = $DS.util.replace(sql);
        $DS.delPms('SUM',sumPms)
    }
    return sql;
}

