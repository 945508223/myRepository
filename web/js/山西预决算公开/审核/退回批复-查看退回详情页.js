var guid = $DS.getPms("URL_TASKID");


/**
 * 查看详情时调用 切换数据源为历史表数据源
 * @private
 */
function viewInit_() {
    debugger
    let type = $DS.getPms("URL_TYPE");
    if (type == 'HIS') {
        let ctrl = $DS.getCtrl('审核意见').info;
        let source = $DS.getSource('数据源_历史');
        source.fieldMap['REMARK'] = ctrl.ds_id;
        ctrl.ds_datasource = source.sourceId;
    }
}

viewInit_();

function pageSaveY() {
    debugger
    let selectVal = $DS.getVal("审核状态");
    let inputVal = $DS.getVal("审核意见");
    completeTask(selectVal, inputVal);
    let result = $DS.saveSource("edit", "数据源_单位状态");
    updateTaskStatus(guid, selectVal, inputVal);
    alert("执行成功!");
}

//修改任务状态=>并添加历史表   isLoadPage:是否刷新页面
function updateTaskStatus(taskid, status, remake) {
    debugger;
    //============================================================================================================
    let userId = $DS.getPms("USER_MID");
    let userName = $DS.getPms("USER_UserName");
    let agencyCode = $DS.getPms("USER_DeptCode") || "";
    let admdivCode = $DS.getPms("USER_admdivCode");
    //任务ID
    taskid = taskid || topWin.$DS.getPms("TASKID");
    remake = remake || "";
    //当前时间
    let newDateTime = $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss");
    let sqls = [`update GFA_ANGENCY_STATUS set SUBSTATUS = '${status}' ,UPDATE_TIME = TO_DATE('${newDateTime}','yyyy-mm-dd hh24-mi-ss') where guid = '${taskid}'`,
        `insert into GFA_ANGENCY_STATUSHIS (GUID,YEAR,ADMDIV,MOF_DIV_CODE,AGENCYID,AGENCY_CODE,REMARK,TASKID,OPTUSER,OPTDATE,SUBSTATUS,CREATE_USERNAME) select sys_guid() as GUID, YEAR, ADMDIV,'${admdivCode}' as MOF_DIV_CODE, AGENCYID,'${agencyCode}' as AGENCY_CODE,'${remake}' as REMARK,GUID AS TASKID,'${userId}' as OPTUSER,UPDATE_TIME as OPTDATE,SUBSTATUS,'${userName}' as CREATE_USERNAME from GFA_ANGENCY_STATUS  where guid = '${taskid}'`];
    return $DS.exeSqls(sqls.join(";"));
}

//下一步，审核通过（完成任务）
function completeTask(status, remake) {
    debugger;
    var datas = querytTodoList();
    if ((datas == null) || (datas.length == 0)) {
        alert("没有待办理的消息！");
        return;
    }
    var msgRow = datas[0];
    var taskId = msgRow.TASKID;
    var args = {"name": "zhangsan", "sno": "1111"};
    var result = YCDCommon.Ajax.syncAjax($DS.util.getProjectName(VUECFG.appId) + "/bpm/completeTask", {
        "taskId": taskId,
        "checkResult": status,  //2通过或者5驳回
        "variables": JSON.stringify(args),       //流程变量
        "remake": remake
    });
    if (result.isError) {
        console.log(result.errMsg);
        return;
    }
    if (result.result)
        console.log("整个审核流程结束！");
    else
        console.log("当前步骤审核完毕！");
}

function querytTodoList() {
    debugger;
    //取待审核列表
    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/bpm/findTaskList", {
        "type": "unfinished",  //查询类型 all/unfinished/finished/reject
        "bType": "GFA01"
    });
    if (result.isError) {
        console.log(result.errMsg);
        return;
    }
    var datas = result.result;
    return datas;
}