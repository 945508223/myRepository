//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";

//初始化
function init() {

}

init();

/**
 * 0 >送审
 * 1 >审核通过
 * 2 >退回
 * @param status
 * @param statuName
 */
function btn_submit_click(status, statuName) {
    let gridData  = $DS.getCtrl('GRID_汇总').info.ds_grid;
    if(gridData?.length==0){
        alert('无可操作数据')
        return
    }

    $DS.util.confirm(vm, `是否确认${statuName}`, function () {
        let treePms = parent.$DS.getPms("treePms");
        let month = $DS.getPms('month');
        let result = $DS.exeSql(`update NY_PAYROLL set STATUS = '${parseInt(status) + 1}'  where (AGENCYCODE  in (select ITEMCODE from SSO_V_PUBAGENCY start with ITEMCODE = '${treePms[0]["ITEMCODE"]||'Y'}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '${status}' and TASKMONTH = '${month}'`)
        if (result && !result.isError) {
            /*if (status == '1') {
                createIndi()
            }*/
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

    let result = $DS.selectBySql(VUECFG.appId, `select AGENCYID, AGENCYIDCODE,AGENCYIDNAME,CZLXNAME,REMARK,AMOUT_BFJZ from NY_V_PAYROLL`).result;
    //当前时间
    let newDateTime = $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss");
    let newData = result.map(item => {
        return {
            YEAR: year,
            AGENCY_CODE: item["AGENCYIDCODE"],
            BGT_COUNTMONEY: item["AMOUT_BFJZ"],
            BZ: item["REMARK"],
            DWMC: item["AGENCYIDNAME"],
            DATE_SB: newDateTime,
            ZBFL: item["CZLXNAME"],
            AGENCYID: item["AGENCYID"],
            SHRQ: newDateTime
        }
    });
    let data = {inserted: newData, updated: [], deleted: []};
    result = $DS.saveAllTableData(`INDI_T_DZZBB`, `GUID`, data, VUECFG.appId);
    if (result.isError) {
        alert('生成代转指标失败!')
    }

}

//树节点点击事件
function tree_node_click(val) {
    let treePms = val["data"];
    var iframeInfo = $DS.getCtrl("IFRAME_审批").info;
    var src = `/bmp_portal/report/reportdesigner/lookreport/reportView.jsp?reportid=F930DA459C2349B7A2F0A44C3876FB94&AGENCYID=${treePms["ID"]}`;
    $(`#${iframeInfo.ds_id}_iframe`).attr("src", "");
    setTimeout(function () {
        $(`#${iframeInfo.ds_id}_iframe`).attr("src", src);
    }, 50);
}