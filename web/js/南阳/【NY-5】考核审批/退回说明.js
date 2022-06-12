function init_() {
    debugger
    let isView = $DS.getPms('URL_isView');
    if (isView == 'true') {
        $DS.getCtrl('TEXTAREA_说明').info.ds_readonly = true;
        $DS.getCtrl('BUTTON_确定').ds_show = false;
    }
}

init_();

//获取退回说明
function getRemark_(info) {
    debugger
    let isView = $DS.getPms('URL_isView');
    if (isView == 'true') {
        let month = $DS.getPms('URL_month'), agencyid = $DS.getPms('URL_agencyid'), CZLX = $DS.getPms('URL_CZLX')
        let sql = `select REMARK FROM TASK_HISTORY WHERE MONTH='${month}' AND AGENCYID='${agencyid}' AND CZLX='${CZLX}'`
        let remark = $DS.selectBySql(VUECFG.appId, sql).result?.[0]?.REMARK;
        if (remark) {
            info.ds_textarea = remark;
        }
    }
}