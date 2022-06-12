var saveType = $DS.getPms("URL_$type");

function init_() {
    debugger
    var treeNode = parent.$DS.getPms("P_ADMDIV");
    $DS.putPms("P_ADMDIV", treeNode);
    $DS.putPms("P_ADMDIVCODE", treeNode[0].ISADMDIV == "1" ? treeNode[0].ITEMCODE : treeNode[0].parent.ITEMCODE)
    let admdivNode = parent.$DS.getPms("ADMDIVNODE");
    $DS.putPms('admdivNode', admdivNode);
    if (saveType != "add")
        $DS.putPms("P_USER", parent.$DS.getPms("P_USER"))

}

//初始化
init_()

/**
 * 保存用户信息
 */
function saveUserInfo() {
    debugger
    var source = $DS.getSource("DS_用户表");
    var data = $DS.getSourceVal("DS_用户表");
    if (saveType == 'add') {
        let admdivNode = parent.$DS.getPms("ADMDIVNODE");
        data.ADMDIV = admdivNode.ID;
        data.PROVINCE = admdivNode.MOF_DIV_CODE;
        data.AGENCYID = $DS.getPms('P_ADMDIV')[0].ID;
        data.division = $DS.getPms('P_ADMDIV')[0].ID;

    }
    //根据管线单位设置usertype
    if (data.UPAGENCYID) {
        let upAgency = parent.pageInfo_agency_user.listTree.find(item => item.ID == data.UPAGENCYID)
        if (upAgency.ISDEPARTMENT == '1')
            data.USERTYPE = '2';
        else
            data.USERTYPE = '0';
    } else
        data.USERTYPE = '0';

    var checkMsg = $DS.check(data, source);
    if (checkMsg) {
        alert(checkMsg);
    } else {
        var result_new = YCDCommon.Ajax.syncAjax($DS.util.getProjectName(VUECFG.appId) + "/login/getUserPassword", {
            "orginStr": "88888888",
            "keyStr": data.CODE
        });
        if (result_new.isError) {
            alert(result_new.errMsg);
        } else {
            if (saveType == "add")
                data.PASSWORD = result_new.result;
            var result = $DS.saveTable(VUECFG.appId, saveType, data, "SSO_T_USERINFO", "GUID")
            if (result.isError) {
                alert(result.errMsg);
            } else {
                $DS.util.close();
                parent.$grid.clearCheckedNode(parent.$DS.getCtrl("GRID_用户表格").info.ds_id)
                parent.$DS.clearTableSCache("SSO_T_USERINFO,SSO_V_CAUSER")
                parent.$DS.loadCtrl("GRID_用户表格")
                parent.alert("保存成功!")
            }
        }
    }
}


//管辖单位下拉加载完成事件
function loadSucess_upagency(info) {
    debugger
    function formatterOptions(options, levelNo, level) {

        for (let option of options) {
            option.label = `${option.ORDERNUM}-${option.label}`;
            if (option.children)
                formatterOptions(option.children, levelNo, level);
        }

       /* for (let i = 0; i < options.length; i++) {
            let option = options[i];
            if (level === 0) {
                option.label = `${i} ${option.label}`;
            } else {
                option.label = `${levelNo}${i} ${option.label}`;
            }
            if (option.children) {
                if(level === 0){
                    formatterOptions(info.ds_options, `${i}-`, level + 1);
                }else{
                    formatterOptions(info.ds_options, `${levelNo}${i}-`, level + 1);
                }
            }
        }*/

    }

    formatterOptions(info.ds_options, '', 0);
    info.ds_options = $DS.util.childrenToList(info.ds_options, 'children', []);
    if (saveType == 'add')
        info.ds_select = $DS.getPms("P_ADMDIV")[0].ID;
}