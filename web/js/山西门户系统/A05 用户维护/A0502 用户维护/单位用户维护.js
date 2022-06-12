var pageInfo_agency_user = {}

// 初始化
function init() {
    debugger
    //清缓存
    var Path = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(Path + "/sysconfig/frame/clearCache");

}

init();


/**
 * 通用删除/启用/保存
 * @param type
 * @param succeccMsg
 * @param errMsg
 */
function execForUserInfo(type, succeccMsg, errMsg) {
    debugger
    var userRow = $DS.getPms("P_USER")
    if (!userRow || userRow.length == 0) {
        alert("请选择一行!")
    } else {
        if (type == '2')
            $DS.util.confirm(window.vm, '确认删除此用户?', function () {
                doExecForUserInfo(type, succeccMsg, errMsg, userRow)
            }, '已取消删除')
        else
            doExecForUserInfo(type, succeccMsg, errMsg, userRow)

    }
}

function doExecForUserInfo(type, succeccMsg, errMsg, userRow) {
    var result = $DS.setFlagById("SSO_T_USERINFO", "STATUS", type, userRow[0].GUID, "1", VUECFG.appId)
    if (result.isError) {
        alert(result.errMsg ? result.errMsg : errMsg);
    } else {
        $DS.clearTableSCache("SSO_T_USERINFO,SSO_V_CAUSER")
        $DS.loadCtrl("GRID_用户表格")
        $grid.clearCheckedNode($DS.getCtrl("GRID_用户表格").info.ds_id)
        alert(succeccMsg)
    }
}


//按钮的显示控制
function isShowBtn_(btn) {
    debugger
    switch (btn) {
        //新增按钮
        case 'add':
            return $DS.getPms('P_ADMDIV')?.[0]?.children ? false : true;
        case 'update'://修改
        case 'del'://删除
        case'changePwd'://修改密码
            return $DS.getPms('P_USER')?.[0] ? true : false;
        case 'start'://启用
            return $DS.getPms('P_USER')?.[0]?.STATUS == '0' ? true : false;
        case 'disable'://禁用
            return $DS.getPms('P_USER')?.[0]?.STATUS == '1' ? true : false;
    }
}

//缓存树 list 数据
function treeLoadAfter_(info) {
    pageInfo_agency_user.listTree = $DS.util.childrenToList(info.ds_tree, 'children', []);
}

//树节点点击事件 推送区划相关信息
function treeNodeClick_agency_user(info, node) {
    debugger
    $DS.delPms("P_USER");
    //获取行政区划节点并推送参数
    if (!node.children) {
        let admdivNode = getAdmdivNode(node);
        $DS.putPms('ADMDIVNODE', admdivNode)
    } else {
        $DS.delPms('ADMDIVNODE');
    }
}

function getAdmdivNode(node) {
    let pNode = pageInfo_agency_user.listTree.find(item => item.ID == node.PID);
    if (pNode.ISADMDIV == '1')
        return pNode;
    else
        return getAdmdivNode(pNode)
}