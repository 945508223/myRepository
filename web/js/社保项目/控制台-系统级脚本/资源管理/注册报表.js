debugger
var saveType = $DS.getPms("URL_$type");
$DS.putPms("p_grid", parent.$DS.getPms("p_grid"));
$DS.putPms("p_tree", parent.$DS.getPms("p_tree"))
$DS.putPms("left_tree", parent.$DS.getPms("left_tree"));
$DS.getCtrl("资源类型").info.ds_defaultval = $DS.getPms("left_tree")[0].ID

/**
 * 资源数据管理保存   (注册报表)
 */
function saveData() {
    debugger
    let pTreeNode = $DS.getPms('left_tree');
    $DS.getCtrl("所属系统").info.ds_input = pTreeNode[0].APPNAME;
    var result = $DS.saveSource(saveType, "数据资源表");
    if (result.isError) {
        alert(result.errMsg);
    } else {
        //将资源模板一并插入
        addSourceByModel(result.result.rowObj);
        $DS.util.close();
        parent.$DS.clearTableSCache("SSO_T_DATARESOURCE");
        parent.$DS.loadCtrl("grid")
        parent.$DS.loadCtrl("tree")
        parent.alert("保存成功!")
    }
}

/**
 *将资源模板插入
 */
function addSourceByModel(rowObj) {
    debugger
    try {
        let year = $DS.getPms('USER_currentyear');
        let r_ = $DS.selectBySql('PORTAL', `select * from SSO_T_DATARESOURCEMODEL where SOURCETYPE='R' and YEAR ='${year}' `);
        if (r_.isError) {
            console.error('添加资源失败!')
        } else {
            let models = r_.result;
            if (models.length == 0) {
                return;
            }
            let saveData = {inserted: [], updated: [], deleted: []};
            saveData.inserted = models.map(model => {
                let source = {};
                source.DSGUID = rowObj.DSGUID;
                source.DSTYPE = rowObj.DSTYPE;
                source.ADMDIVCODE = '*';
                source.STATUS = '1';
                source.SUPERGUID = rowObj.GUID;
                source.ITEMCODE = model.ITEMCODE;
                source.ITEMNAME = model.ITEMNAME;
                source.APPID = rowObj.APPID;
                source.year = year;
                return source;
            })

            let result = $DS.saveAllTableData('SSO_T_DATARESOURCE', 'GUID', saveData, VUECFG.appId)
            if (result.isError) {
                console.error('添加资源失败:' + result.errMsg)
            }
        }

    } catch (e) {
        console.error(e);
    }

}