//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";

//初始化
function init() {

}

init();

//审批按钮点击事件
function btn_submit_click() {
    $DS.util.confirm(vm, `是否确认审批`, function () {
        let treePms = $DS.getPms("treePms");
        //当前时间
        let newDateTime = $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss");
        let result = $DS.selectBySql(VUECFG.appId, `select agencyid, UNITCODE,unitname,aaa,Czlxname,REMARK from NY_V_PAYROLL`).result;
        if (result && result.length > 0 && result[0]) {
            let newData = result.map(item => {
                return {
                    YEAR: year,
                    AGENCY_CODE: item["UNITCODE"],
                    BGT_COUNTMONEY: item["AAA"],
                    BZ: item["REMARK"],
                    DWMC: item["UNITNAME"],
                    DATE_SB: newDateTime,
                    ZBFL: item["CZLXNAME"],
                    AGENCYID: item["AGENCYID"],
                    SHRQ: newDateTime
                }
            });
            let data = {inserted: newData, updated: [], deleted: []};
            $DS.exeSql(`update NY_PAYROLL set STATUS = '2'  where (agencyid  in (select GUID from SSO_V_PUBAGENCY start with GUID = '${treePms[0]["ID"]}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'Y') and STATUS = '1'`)
            result = $DS.saveAllTableData(`INDI_T_DZZBB`, `GUID`, data, VUECFG.appId);
            if (result && !result.isError) {
                $DS.util.alert("审批成功!");
                tree_node_click({data: treePms[0]});
            } else {
                $DS.util.alert("审批失败,请检查!");
            }
        } else {
            $DS.util.alert("无数据,审批失败!");
        }
    });
}

//树节点点击事件
function tree_node_click(val) {
    debugger
    return
    let treePms = val["data"];
    var iframeInfo = $DS.getCtrl("IFRAME_审批").info;
    var src = `/bmp_portal/report/reportdesigner/lookreport/reportView.jsp?reportid=F930DA459C2349B7A2F0A44C3876FB94&AGENCYID=${treePms["ID"]}`;
    $(`#${iframeInfo.ds_id}_iframe`).attr("src", "");
    setTimeout(function () {
        $(`#${iframeInfo.ds_id}_iframe`).attr("src", src);
    }, 50);
}