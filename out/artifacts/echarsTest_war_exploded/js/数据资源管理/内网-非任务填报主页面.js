let pageInfo_ = {};

//根据角色初始化报表列表
function init_rptListByRole() {
    debugger
    let roles = $DS.getPms('USER_userRoleBean');
    let rolesIds = roles.map(role => `'${role.GUID}'`);
    //let rolesIds_ = roles.map(role => role.GUID);
    if (rolesIds.length == 0 && !$DS.getPms('USER_IsSuperUser')) {
        pageInfo_.rptList = {};
        return;
    }
    let sql = '';
    if ($DS.getPms('USER_IsSuperUser')) {
        sql = `select ITEMNAME ,REMARK AS RPTDESC ,GUID FROM SSO_T_DATARESOURCE`
    } else {
        sql = `select SUPERGUID,ITEMCODE,ITEMNAME ,REMARK AS RPTDESC ,GUID ,DSGUID FROM SSO_T_DATARESOURCE WHERE GUID IN (SELECT RESOURCEID FROM SSO_T_ROLERESOURCE WHERE ROLEID IN (${rolesIds}))`
    }
    // let sourceData = YCDCommon.Ajax.syncAjax("/console_portal/datareresource/getDataResourceByRoleId", {rows: JSON.stringify(rolesIds_)});
    let sourceData = $DS.selectBySql('PORTAL', sql);
    if (sourceData.isError) {
        alert(sourceData.errMsg ? sourceData.errMsg : '获取报表列表失败');
        pageInfo_.rptOjb = {};
        return;
    }

    pageInfo_.rptOjb = {};
    for (let item of sourceData.result){
        if (!pageInfo_.rptOjb[item.DSGUID]) {
            pageInfo_.rptOjb[item.DSGUID] = [];
        }
        pageInfo_.rptOjb[item.DSGUID].push(item);
    }
}

init_rptListByRole();

//根据角色过滤数据
function initGridData(info) {
    debugger
    if (!$DS.getPms('USER_IsSuperUser')) {
        let sourceIds = Object.keys(pageInfo_.rptOjb);
        if (!pageInfo_.rptOjb || sourceIds.length == 0) {
            info.ds_grid = [];
        } else if (sourceIds.length > 0 && info.ds_grid.length > 0) {
            //有该资源权限 同时判断是否存在可见权限
            info.ds_grid = info.ds_grid.filter(row => {
                if (sourceIds.indexOf(row.GUID) != -1 /*&& pageInfo_.rptOjb[row.GUID].find(item => item.ITEMCODE == 'VISIBLE')*/) {
                    return row;
                }
            })
        }
    }
}

/**
 * 表格行点击事件
 * @param obj
 * @param val
 */
function grid_row_click(obj, val) {
    debugger
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.putPms("UNTASKROW", val);
    var subWin = $iframe.getSubWindow("IFRAME_填报页面网页框");
    subWin.loadCtrl_btn();
}

//label标签点击事件
function label_left_click() {
    let leftRow = $DS.getCtrl("ROW_左容器").info;
    let rightRow = $DS.getCtrl("ROW_右容器").info;
    let leftLabel = $DS.getCtrl("LABEL_左点击").info;
    let rightLabel = $DS.getCtrl("LABEL_右点击").info;
    if (leftRow.ds_width == "0%") {
        leftRow.ds_width = "20%";
        rightRow.ds_width = "80%";
        leftLabel.ds_show = true;
        rightLabel.ds_show = false;
    } else {
        leftRow.ds_width = "0%";
        rightRow.ds_width = "100%";
        leftLabel.ds_show = false;
        rightLabel.ds_show = true;
    }
}

