debugger
var saveType = $DS.getPms("URL_$type");
$DS.putPms("p_grid", parent.$DS.getPms("p_grid"));
$DS.putPms("p_tree",parent.$DS.getPms("p_tree"))
$DS.putPms("left_tree",parent.$DS.getPms("left_tree"));
$DS.getCtrl("上级编码").info.ds_defaultval = $DS.getPms("p_tree")[0].ID
$DS.getCtrl("资源类型").info.ds_defaultval = $DS.getPms("left_tree")[0].ID
/**
 * 资源数据管理保存   (注册任务)
 */
function saveData() {
    debugger
    var guid = $DS.getPms("P_REPORTCAT") //任务模板参数 guid
    var sql = `select * from RURAL_TASK_INFO WHERE GUID =  '${guid}'`;
    var result = $DS.selectBySql(VUECFG.appId,sql);
    if(result.isError){
        alert("获取报表模板失败")
        return
    }
    $DS.setVal("资源编码",result.result[0].TASKNO)
    $DS.setVal("资源名称",result.result[0].TASKNAME)
    var result=$DS.saveSource(saveType,"数据资源表");
    if(result.isError){
        alert(result.errMsg);
    }else{
        $DS.util.close();
        parent.$grid.clearCheckedNode(parent.$DS.getCtrl("grid").info.ds_id)
        parent.$DS.clearTableSCache("SSO_T_DATARESOURCE")
        parent.$DS.loadCtrl("grid");
        //注册报表同时 修改报表所属资源
        parent.updateOriginalSource(result.result.rowObj,$DS.getPms('left_tree')[0].ID);
        parent.alert("保存成功!")
    }
}