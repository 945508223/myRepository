
'<a class="toPage"   >   <span style="cursor: pointer;color:blue;"   onclick="tzxq(this)"           title="项目详情">&nbsp;&nbsp;         <img src="../dm/pubcss/icon/img/design_hover.png"/>         &nbsp;&nbsp;项目详情     </span> </a> <a class="toPage">     <span style="cursor: pointer;color:blue; display: '|| case when CHECKSTATUS='0' then 'none' ||'"      guid="'|| GUID ||'"    onclick="tzlc(this)"           title="项目流程">&nbsp;&nbsp;         <img src="../dm/pubcss/icon/img/search_hover.png"/>         &nbsp;&nbsp;项目流程     </span> </a>' as CAOZUO

'<a class="toPage"><span style="cursor: pointer;color:blue;" onclick="tzxq(this)" title="项目详情">&nbsp;&nbsp; <img src="../dm/pubcss/icon/img/design_hover.png"/> &nbsp;&nbsp;项目详情 </span></a><a class="toPage"><span style="cursor: pointer;color:blue;" guid="""'|| GUID ||'" onclick="tzlc(this)" title="项目流程">&nbsp;&nbsp; <img src="../dm/pubcss/icon/img/search_hover.png"/>&nbsp;&nbsp;项目流程 </span></a>' as CAOZUO

'<a class="toPage"><span style="cursor: pointer;color:blue;" onclick="tzxq(this)" title="项目详情">&nbsp;&nbsp; <img src="../dm/pubcss/icon/img/design_hover.png"/> &nbsp;&nbsp;项目详情 </span></a><a class="toPage"><span style="cursor: pointer;color:blue ; display:'|| decode(CHECKSTATUS,'0','none') ||'"  guid="'|| GUID ||'" onclick="tzlc(this)" title="项目流程">&nbsp;&nbsp; <img src="../dm/pubcss/icon/img/search_hover.png"/>&nbsp;&nbsp;项目流程 </span></a>' as CAOZUO

'<a class="toPage"> <span style="cursor: pointer;color:blue;"   onclick="tzxq(this)"  title="项目详情">&nbsp;&nbsp;         <img src="../dm/pubcss/icon/img/design_hover.png"/>  &nbsp;&nbsp;项目详情</span> </a> <a class="toPage">     <span style="cursor: pointer;color:blue; display:'|| decode(CHECKSTATUS='0','none') ||'"      guid="'|| GUID ||'"    onclick="tzlc(this)"           title="项目流程">&nbsp;&nbsp;         <img src="../dm/pubcss/icon/img/search_hover.png"/>         &nbsp;&nbsp;审核详情     </span> </a>' as CAOZUO
function tzlc(dom) {
    debugger
    var pms = $DS.getPms("P_PROJ").GUID;
    $DS.showPage('freeFromView.jsp?PAGEID=E9A8D2C0498F49488AEF5C9BAEC448EE&PAGETITLE=【2-8-2】单项目审核详情&APPID=BMP&GUID=' + pms, '项目流程', '80%', '80%')
}

//【增加】按钮点击前事件
function pre_add() {
    var p_cyfl = $DS.getPms("P_CYFL");
    if (!p_cyfl) {
        alert("请选择产业分类");
        return false;
    } else {
        if (p_cyfl[0].ENDFLAG == '0') {
            alert("请选择具体的产业分类");
            return false;
        }
    }
    return true;
}

//送审
function btn_wfStart() {
    var m_proj = $DS.getPms("P_PROJ");
    if (!m_proj) {
        alert("请选择您要送审的项目！");
        return false;
    }
    debugger
    var params = {
        projid: m_proj[0].GUID
    };
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/wfservice/wfStart", params);
    if (!result) {
        alert("启动流程失败！");
        return false;
    }
    if (result.isError) {
        alert("送审失败，失败原因：" + result.errMsg);
        return false;
    }
    //修改项目审核状态
    result = $DS.exeSql("update RURAL_PROJECT_INFO set CHECKSTATUS='1' where GUID='" + m_proj[0].GUID + "'");
    if (result.isError) {
        alert("更新送审状态失败！");
        return false;
    } else {
        alert("送审操作成功！");
        $DS.loadCtrl("项目列表");
        return true;
    }
}

//撤回送审
function btn_wfDelete() {
    var m_proj = $DS.getPms("P_PROJ");
    if (!m_proj) {
        alert("请选择您要撤回送审的项目！");
        return false;
    }
    if (m_proj[0].CHECKSTATUS != '1') {
        alert("当前项目状态不是【已送审】，不能执行操作！");
        return false;
    }

    var params = {
        projid: m_proj[0].GUID
    };
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/wfservice/wfDelete", params);
    if (!result) {
        alert("撤回送审失败！");
        return false;
    }
    if (result.isError) {
        alert("撤回送审失败，失败原因：" + result.errMsg);
        return false;
    }
    //修改项目审核状态
    result = $DS.exeSql("update RURAL_PROJECT_INFO set CHECKSTATUS='9' where GUID='" + m_proj[0].GUID + "'");
    if (result.isError) {
        alert("更新送审状态失败！");
        return false;
    } else {
        alert("撤回送审操作成功！");
        $DS.loadCtrl("项目列表");
        return true;
    }
}

//项目行变更事件
function grid_rowchange(row) {
    debugger
    var status = row.CHECKSTATUS;
    if (status == '1') {
        //已送审
        $DS.getCtrl("送审").info.ds_show = false;
        $DS.getCtrl("修改").info.ds_show = false;
        $DS.getCtrl("删除").info.ds_show = false;
        $DS.getCtrl("撤回").info.ds_show = true;
    } else if (status == '0' || status == '9') {
        //未送审或者撤回
        $DS.getCtrl("送审").info.ds_show = true;
        $DS.getCtrl("修改").info.ds_show = true;
        $DS.getCtrl("删除").info.ds_show = true;
        $DS.getCtrl("撤回").info.ds_show = false;
    }
}

//跳转项目详情页面
function tzxq(dom) {
    $DS.putPms("whoParent", "isDeta");
    $DS.showPage('freeFromView.jsp?PAGEID=0C032A95B39F47FE8AEC1609F3B0B1FE&PAGETITLE=【2-8-1】单项目信息详情&APPID=BMP', '项目详情', '95%', '95%')
}

//跳转项目流程页面
function tzlc(dom) {
    $DS.showPage('freeFromView.jsp?PAGEID=E9A8D2C0498F49488AEF5C9BAEC448EE&PAGETITLE=【2-8-2】单项目审核详情&APPID=BMP', '项目流程', '95%', '95%')
}

function grid_after_reload() {
    $DS.delPms("P_PROJ");
    $DS.getCtrl("送审").info.ds_show = false;
    $DS.getCtrl("修改").info.ds_show = true;
    $DS.getCtrl("删除").info.ds_show = true;
    $DS.getCtrl("撤回").info.ds_show = false;
    var table = $DS.getCtrl("项目列表");
    var tableVal = $grid.getAllData(table.info.ds_id);
    if (tableVal.length == 0) {
        $DS.getCtrl("送审").info.ds_show = false;
        $DS.getCtrl("修改").info.ds_show = false;
        $DS.getCtrl("删除").info.ds_show = false;
        $DS.getCtrl("撤回").info.ds_show = false;
    }
}

//修改按钮点击事件
function btn_update() {
    var proVal = $DS.getPms("proVal");
    if (proVal) {
        $DS.putPms("whoParent", "isUpdate");
        $DS.showPage('freeFromView.jsp?PAGEID=0C032A95B39F47FE8AEC1609F3B0B1FE&PAGETITLE=【2-8-1】单项目信息详情&APPID=BMP', '修改项目', '95%', '95%');
    } else {
        alert("请选择一行需要修改的数据!");
    }
}

function setTimelineNodeType(val) {
    if (val.STEPSTATUS == '0')
        return 'info';
    else if (val.STEPSTATUS == '1')
        return 'primary';
    else if (val.STEPSTATUS == '2') {
        if (val.STEPRESULT == '2' || val.STEPRESULT == '3')
            return 'danger';
        else
            return 'success';
    }
}
