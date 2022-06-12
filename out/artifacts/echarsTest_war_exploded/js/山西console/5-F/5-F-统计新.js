let TaskStatusCode = {};


//设置中文状态 TASKSTATUS
function getTaskStatusCode() {
    let sql = `select ITEMCODE,ITEMNAME from dm_base_codes where BASETYPE='TASKSTATUS'`;
    let res = $DS.selectBySql(VUECFG.appId, sql);
    if (res && res.result) {
        res = res.result;
        for (let row of res) {
            //TaskStatusCode[row["ITEMCODE"]] = row["ITEMNAME"];
            TaskStatusCode[row["ITEMNAME"]] = row["ITEMCODE"];
        }
    }
}

getTaskStatusCode();
function setTaskSelectData(info) {
    debugger
    let source = $DS.getSource("DS_主任务");
    let data = $DS.getSourceData(source, false);
    let _data = $DS.util.clone(data);
    if (_data && _data.rows && _data.rows.length > 0) {
        //TASKNAME  / GUID
        info.ds_options = _data.rows.map(item=>{
            item["label"] = item.TASKNAME;
            item["value"] = item.GUID;
            return item;
        })
        $DS.putPms("P_TASK",info.ds_options[0].value);
        $DS.putPms("P_TASK_t",[info.ds_options[0]]);
    }
}

function pie_click(obj,val){
    debugger
    $DS.putPms("P_STATUSNAME",val.name);
    let code = TaskStatusCode[val.name];
    $DS.putPms("P_STATUSVALUE",code);
    $DS.loadCtrl("GRID_区划列表");
}

function changeSelect_HistoryDetil(obj,val) {
    debugger
    let pms = obj.ds_options.filter(item=>item.value==val);
    $DS.putPms("P_TASK_t",pms)
}


function lookHistoryDetail() {
    let url = $DS.util.getProjectName(VUECFG.appId) + "/freeForm/freeFromView.jsp?PAGEID=058F423C427B45CE98E8A9BD37A37117&PAGETITLE=查看历史&APPID=BMP"
    $DS.showPage(url,"历史详情","50%", "85%")
}

//查看详情
function xq(dom){
    let url = $DS.util.getProjectName(VUECFG.appId) + "/freeForm/freeFromView.jsp?PAGEID=AC21FD11CC6D40B8B9B3B0B9E5708A72&PAGETITLE=查看历史&APPID=BMP&parent=new"
    $DS.showPage(url,"查看详情","50%", "85%")
}