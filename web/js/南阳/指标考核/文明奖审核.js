//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || parent.$DS.getPms("USER_CURRENTYEAR") || "2022";

//初始化
function init() {

}

init();

//审批按钮点击事件
function btn_submit_click() {
    $DS.util.confirm(vm, `是否确认审批`, function () {
        debugger
        let treePms = $DS.getPms("treePms");
        let year = $DS.getPms('USER_currentyear');
        let result = $DS.selectBySql(VUECFG.appId, `select count(*) as CNT from INDI_T_MBJ where (AGENCYID in (select GUID FROM SSO_V_PUBAGENCY WHERE GUID = '${treePms[0]["ID"]}' connect by prior GUID = SUPERGUID) or '${treePms[0]["ID"]}' = 'AA') and STATUS = '2' and year = ${year}`).result;
        if (result && result.length > 0 && result[0].CNT > 0) {
            $DS.exeSql(`update INDI_T_MBJ set STATUS = '1'  where (agencyid  in (select GUID from SSO_V_PUBAGENCY start with GUID = '${treePms[0]["ID"]}' connect by prior GUID = SUPERGUID ) or '${treePms[0]["ID"]}' = 'AA') and STATUS = '2' and year =${year}`)

            if (result && !result.isError) {
                $DS.util.alert("审批成功!");
                tree_node_click({data: treePms[0]});
            } else {
                $DS.util.alert("审批失败,请检查!");
            }
        }else {
            $DS.util.alert("无审批数据,请检查!");
        }
    });
}

//树节点点击事件
function tree_node_click(val) {
    debugger
    let treePms = val["data"];
    var iframeInfo = $DS.getCtrl("IFRAME_审批").info;
    var src = `/bmp_portal/report/reportdesigner/lookreport/reportView.jsp?reportid=E8840A5AA2184092B3199CCC2B67491A&UNITGUID=${treePms.ID}`;
    $(`#${iframeInfo.ds_id}_iframe`).attr("src", "");
    setTimeout(function () {
        $(`#${iframeInfo.ds_id}_iframe`).attr("src", src);
    }, 50);
}