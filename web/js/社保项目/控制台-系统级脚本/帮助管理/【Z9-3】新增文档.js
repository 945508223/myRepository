/**
 * 保存目录
 */
function registerMenu() {
    debugger
    let type = $DS.getPms('URL_$type');
    let result = $DS.saveSource(type, '数据源_文档信息');
    if (result.isError) {
        alert(`保存失败:${result.errMsg}`);
        return;
    }

    //新增完成后 插入文档表clob 同时直接打开编辑文档页面
    if (type == 'add') {
        let docId = result.result.rowObj.GUID;
        result = $DS.saveTable(VUECFG.appId, type, {GUID: docId}, 'DM_HELP_PAGECLOB', 'GUID');
        if (result.isError) {
            alert(`新建文档失败:${result.errMsg}`);
            return;
        } else {
            let url = `${getProjectName()}/freeForm/freeFromView.jsp?PAGEID=69297D3887914AF8AE597B5F926C0263&PAGETITLE=【Z9-4】编辑文档&APPID=CONSOLE&type=edit&docId=${docId}`;
            window.open(url, docId);
        }
    }

    parent.$DS.loadCtrl('GRID_文档列表');
    $DS.util.close();
}

/**
 * 目录弹出树加载完成事件
 * @param info
 */
function popTreeMenuLoadAfter(info) {
    debugger
    if ($DS.getPms('URL_$type') == 'add' && $DS.getPms('URL_menuId')) {
        info.ds_poptree = $DS.getPms('URL_menuId');
    }
    //添加根节点
    if (info.ds_options.length > 0 && info.ds_poptree_node?.length > 0) {
        info.ds_poptree = info.ds_poptree_node[0].ID;
        info.ds_options = [{ID: '#', NAME: '文档列表', children: info.ds_options}];
    }
}

//校验规则
check_T9_003(${-1,-1},${V.$EXTPRO.INC_EXP_SORT_CODE})


//校验规则 返回 true 校验不通过
function check_T9_003(val, INC_EXP_SORT_CODE) {
    debugger

    //比如这里 你判断 编码为 001的 返回true
    if (INC_EXP_SORT_CODE == '001') {
        return true;
    }

    let data1 = $DT['REP091']?.["20707"]?.GOV_INCOME_MONEY ? $DT['REP091']?.["20707"]?.GOV_INCOME_MONEY : 0;

    let data2 = $DT['REP091']?.["20710"]?.GOV_INCOME_MONEY ? $DT['REP091']?.["20710"]?.GOV_INCOME_MONEY : 0;

    //如果 val 为空 则校验不通过
    if (!val) {
        return true;
    }

    //如果 val 有值 并且 ( data1 + data2 )有值 并且 val 的值小于( data1 + data2 ) 校验不通过
    if (val && (data1 + data2) && val < (data1 + data2)) {
        return true;
    }
    //其余情况都返回 false 校验通过
    return false;
}


//校验规则
check_T9_003(${-1,3},  ${V.$EXTPRO.INC_EXP_SORT_CODE})






//校验规则 返回 true 校验不通过
function check_T9_003(val, INC_EXP_SORT_CODE) {
    //比如 数据集的编码为 REPT01

    //这里 rpt4Val 等于数据集REPT01中科目编码为 当前行科目编码的值
    //如果有值 就返回数据集中的值 没有就返回 0
    let rpt4Val = $DT?.REPT01?.[INC_EXP_SORT_CODE]? ? $DT?.REPT01?.[INC_EXP_SORT_CODE] : 0;

    //这里格式化 保留了一下两位小数  如果数据集sql处理过了 就不需要了
    rpt4Val = rpt4Val.toFixed(2);


    if (val && rpt4Val && val != rpt4Val) {
        return true;
    }

    return false;
}
