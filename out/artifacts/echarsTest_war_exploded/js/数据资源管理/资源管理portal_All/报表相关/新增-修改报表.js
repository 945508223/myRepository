var pageInfo_rptModel = {
    sourceType: ''
}
$DS.putPms('URL_APPNAME', parent.$DS.getPms('URL_APPNAME'));

/**
 * 保存报表模板
 * @returns {boolean}
 */
function saveRptMd() {
    var res = $DS.saveSource($DS.getPms("URL_$type"), "数据源_报表模板");
    if (res.isError) {
        alert(res.errMsg);
        return false;
    } else {
        //设置了所属资源 同时添加资源
        registerSource(res.result.rowObj,$DS.getPms("URL_$type"));
        $DS.util.close();
        parent.$DS.loadCtrl("GRID_报表模板");
        parent.alert("保存成功!")
    }
}

//初始化所属资源
function initSourceCategory(info) {
    debugger
    //记录原始资源类型
    pageInfo_rptModel.sourceType = info.ds_poptree;
    if (info.ds_poptree) {
        let source = $DS.getSource('DS_资源分类').sourceData;
        let listData = $DS.util.childrenToList(source, 'children', []);
        let node = listData.filter(item => item.ID == info.ds_poptree);
        info.ds_poptree = node[0].NAME;
        info.ds_poptree_node = node;
        info.ds_poptree_current_node_key = node[0].ID;
    }
}


//根据所属资源注册资源
function registerSource(data) {
    debugger
    if (data.DSTYPE) {
        let sql = `select count(*) as CNT from SSO_T_DATARESOURCE where DSGUID='${data.GUID}'`;
        let cntRes = $DS.selectBySql('PORTAL', sql);
        let type = 'add';
        if (cntRes.result[0].CNT > 0) type = 'edit';
        let sourceItem = {
            SUPERGUID: '#',
            DSGUID: data.GUID,
            ITEMCODE: data.ITEMCODE,
            ITEMNAME: data.ITEMNAME,
            REMARK: data.RPTDESC,
            DSTYPE: data.DSTYPE,
        }

        let result = $DS.saveTable('PORTAL',type,sourceItem,"SSO_T_DATARESOURCE",'DSGUID');
        if (result.isError) {
            console.error(result.errMsg ? result.errMsg : '注册资源失败');
            return false;
        }
        return true;
    }
    return true;
}