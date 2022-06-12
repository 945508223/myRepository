//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";

//初始化
function init() {

}

init();

//退回点击事件
function tuiHui() {
    let gridData = $DS.getCtrl('GRID_汇总').info.ds_grid;
    if (gridData?.length == 0) {
        alert('无可操作数据')
        return false;
    }
    let treePms = parent.$DS.getPms('treePms');
    if (treePms && treePms[0].children) {
        alert('请选择退回单位!');
        return false;
    }

    let agency_ = parent.$DS.getPms('treePms')[0].ID;
    let month_ = $DS.getPms('month');
    writeBackRemark(agency_, month_, '4', false)
}

/**
 * 0 >送审
 * 1 >审核通过
 * 2 >退回
 * @param status
 * @param statuName
 */
function btn_submit_click(status, statuName) {
    let gridData = $DS.getCtrl('GRID_汇总').info.ds_grid;
    let treePms = parent.$DS.getPms("treePms");
    let currentSumRow = $DS.getPms('SUM');
    if (gridData?.length == 0) {
        alert('无可操作数据')
        return
    }
    let agency_ = currentSumRow?.[0]?.AGENCYID ? currentSumRow?.[0]?.AGENCYID : (treePms && !treePms?.[0].children ? treePms[0].ID : '');
    if(!agency_){
        alert('请选择单位');
        return;
    }
    $DS.util.confirm(vm, `是否确认${statuName}`, function () {
        debugger

        let month = $DS.getPms('month');

        let sql;
        if (status == '2') {
            sql = `update NY_REDUCE_DETAIL set STATUS = '0'  where (AGENCYCODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '1' and CURRENTMONTH = '${month}'`;
        } else {
            sql = `update NY_REDUCE_DETAIL set STATUS = '${parseInt(status) + 1}'  where  (AGENCYCODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"] || 'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '${status}' and CURRENTMONTH = '${month}'`;
        }
        sql = dealSumDataSql(sql)
        let result = $DS.exeSql(sql)
        if (result && !result.isError) {
            if (status == '1') {
                if (!createIndi())
                    return
            } else if (status == '2') {

                saveBackRemark(agency_, month, '4')
            }
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
function createIndi() {
    debugger
    let gridInfo = $DS.getCtrl('GRID_汇总').info;
    let result;
    let currentSumRow = $DS.getPms('SUM');
    if (currentSumRow?.length > 0) {
        result = currentSumRow;
    } else {
        result = gridInfo.ds_grid;
    }

    if (result.length == 0) return true;
    //当前时间
    let newDateTime = $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss");
    let newData = result.map(item => {
        return {
            YEAR: year,
            AGENCY_CODE: item["AGENCYCODE"],
            BGT_COUNTMONEY: item["AMOUT_BFJZ"],
            BZ: item["REMARK"],
            DWMC: item["AGENCYNAME"],
            DATE_SB: newDateTime,
            ZBFL: '4',
            AGENCYID: item["AGENCYID"],
            SHRQ: newDateTime,
            REMARK: getRemark_(item.REMARK)
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
function dealSumDataSql(sql) {
    //操作选中的合计数据
    let sumPms = $DS.getPms('SUM');
    if (sumPms && sumPms.length > 0) {
        //[AND] PERSONCAT='${V.SUM[0].PERSONCAT}'
        sql += " [AND] AGENCYCODE = '${V.SUM.0.AGENCYCODE}'"
        sql = $DS.util.replace(sql);
    }
    return sql;
}