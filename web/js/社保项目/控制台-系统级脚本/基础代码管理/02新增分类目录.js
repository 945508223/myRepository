let pageInfo_ = {
    MOF_DIV_CODE: ''
};

/**
 * 初始化操作
 * @private
 */
function init_() {
    let mof_div_code = $DS.getPms('USER_admdivCode');
    pageInfo_.MOF_DIV_CODE = mof_div_code && mof_div_code != 'null' ? mof_div_code : getMofDivCode();
    let manager = $DS.getCtrl('SELECT_管理方式').info;
    manager.ds_select = '';
    manager.ds_options = [{label: "财政部下发", value: "1"}, {label: "地方财政上报", value: "2"}, {label: "自行管理", value: "3"}];

    let extend = $DS.getCtrl('SELECT_扩展类型').info;
    extend.ds_select = '';
    extend.ds_options = [{label: "财政部标准（不允许修改）", value: "1"}, {label: "地方扩展（扩展下一级）", value: "2"}, {
        label: "自行维护",
        value: "3"
    }]

}

/**
 * 取财政区划编码
 */
function getMofDivCode() {
    let result = $DS.selectByFormSql(VUECFG.appId, VUECFG.pageId, 'getMofCode', {});
    if (result.isError) {
        alert('获取区划编码失败:' + result.errMsg);
        return '';
    } else {
        return result.result[0].CNAME;
    }
}

init_();

/**
 * 保存分类
 * @private
 */
function saveCat_() {
    debugger
    let type = $DS.getPms('URL_$type');
    if (type == 'add') {
        let code = $DS.getCtrl('INPUT_基础代码目录代码').info.ds_input;
        $DS.getCtrl('INPUT_目录主键').info.ds_input = code;
    }
    let result = $DS.saveSource(type, 'DS_CAT');
    if (result.isError) {
        alert(`${type == 'add' ? '新增代码分类失败' : '修改代码分类失败'}:失败原因:${result.errMsg}`);
    } else {
        //let ptreeInfo = parent.$DS.getCtrl('TREE_代码分类树').info;
        parent.$DS.loadCtrl('TREE_代码分类树');
        //parent.$tree.setCurrentNode(ptreeInfo.ds_id,result.result.rowObj.ELE_CATALOG_ID)
        $DS.util.close();
    }
}