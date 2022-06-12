//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}
function btn_sureExportCfg() {
    debugger
    let colorRadio = $DS.getCtrl("RADIO_单选").info.ds_radio;
    let cfg = {
        color: colorRadio
    }
    //单位转换配置
    if ($DS.getPms('URL_showUnit') == 'TRUE') {
        cfg.unit = $DS.getCtrl("SELECT_计量单位").info.ds_select;
    }
    cfg.exportSnap = $DS.getCtrl('RADIO_全为零值隐藏行').info.ds_radio == '0' ? false : true;
    //整行为0 隐藏行
    //if ($DS.getPms('URL_showHideRow') == 'TRUE') {
    cfg.allZeroHideExport = $DS.getCtrl('RADIO_全为零值隐藏行').info.ds_radio == '0' ? true : false;
    //}
    //选择批量导出的报表
    if ($DS.getPms('URL_showCheck') == 'TRUE' && window.top.checkedExportRpt && window.top.checkedExportRpt.length > 0) {
        cfg.checkedRpt = parent.getReportIdsByTabs(window.top.checkedExportRpt);
    } else if ($DS.getPms('URL_showCheck') == 'TRUE' && (!window.top.checkedExportRpt || window.top.checkedExportRpt.length == 0)) {
        alert('未选要导出的择报表');
        delete window.top.batchExportRpt;
        delete window.top.checkedExportRpt;
        return false;
    }
    $DS.util.close();
    delete window.top.batchExportRpt;
    delete window.top.checkedExportRpt;
    parent.batch_export_buildData(cfg);
}

//选择批量导出的按钮
function beforeOpenExportRpt() {
    debugger
    if (!window.top['batchExportRpt']) {
        let tabCfg = $DS.util.clone(parent.$DS.getCtrl('TABS_填报采集表').info.ds_tabs_editableTabs);
        window.top['batchExportRpt'] = tabCfg.filter(item => {
            if (item.title.indexOf('封面') == -1) {
                item.ID = item.tabIndex;
                item.NAME = item.title;
                return item
            }
        });
    }

    parent.$DS.showPage(`freeFromView.jsp?PAGEID=244485FD231E4BFF91C651606B3A8803&PAGETITLE=选择批量导出的报表&APPID=BMP`, '选择批量导出的报表', '50%', '75%')
}

//关闭前
function beforeCloseExportCfg() {
    debugger
    delete window.top.batchExportRpt;
    delete window.top.checkedExportRpt;
    return true;
}

//初始化计量单位下拉
function initUnitOptions(info) {
    debugger
    info.ds_select = 'DW_5';
    let sql = "select ITEMCODE ,ITEMNAME from DM_BASE_CODES where BASETYPE = 'unitOfcalculation'";
    let result = $DS.selectBySql(VUECFG.appId, sql);
    if (result.isError) {
        console.error(result.errMsg ? result.errMsg : "获取单位码表失败");
        return false;
    }
    info.ds_options = result.result.map(item => {
        let option = {};
        option.value = item.ITEMCODE;
        option.label = item.ITEMNAME;
        return option;
    })
}