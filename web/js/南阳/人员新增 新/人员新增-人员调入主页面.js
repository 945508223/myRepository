var topWin = $DS.util.getTopWin("window");
//人员类型
var PERSONCAT = $DS.getPms("URL_PERSONCAT");

//初始化
function init() {
    $DS.putPms("URL_PERSONCAT", PERSONCAT);
    if (parent.$DS.getPms("selectPms"))
        $DS.putPms("selectPms", parent.$DS.getPms("selectPms"));
}

init();


/**
 * 月份加载完成 设置默认值
 * @param info
 */
function monthLoadCompelete(info) {
    debugger
    let date = new Date;
    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" + month : month);
    info.ds_select = month
    $DS.putPms('currentMonth', month);
}


//调入按钮点击事件
function btn_tran_click() {
    let treePms = parent.$DS.getPms("treePms");
    if (!treePms || treePms.length == 0 || treePms[0]["children"]) {
        alert("请选择左侧具体数据!");
        return false;
    }
    let insType = `tran`;
    window.top["windowY"] = window;
    window.top["windowP"] = parent;
    window.top["needDeleteGrid"] = $DS.getCtrl("GRID_工资变动表").info.ds_grid;
    topWin.$DS.showPage(`freeFromView.jsp?PAGEID=3C324FDE97AB4586B18FCC951E4136D3&PAGETITLE=【NY-2-01-0】工资变动审批表新增表单&APPID=BMP&insType=${insType}&PERSONCAT=${PERSONCAT}`, `调入`, `90%`, `90%`);
}

function sentToCheck() {
    debugger
    let month = $DS.getCtrl('SELECT_月份').info.ds_select;
    let agencyCode = $DS.getPms('agencyInfo')?.[0]?.ITEMCODE;
    if (!agencyCode) {
        alert('请选择单位')
        return;
    }
    let getCheckData = `select COUNT(*) AS CNT FROM NY_PAYROLL WHERE TASKMONTH='${month}' AND AGENCYCODE = '${agencyCode}' AND STATUS='0'`;
    let result = $DS.selectBySql(VUECFG.appId, getCheckData)?.result?.[0]?.CNT;
    if (!result) {
        alert('无可操作数据!')
        return;
    }

    $DS.util.confirm(window.vm, `确认送审?`, function () {
        debugger
        let sql = `update NY_PAYROLL set STATUS = '1' WHERE TASKMONTH='${month}' AND AGENCYCODE = '${agencyCode}' AND STATUS='0'`
        let result = $DS.exeSql(sql,null,null,VUECFG.appId)
        if(result.isError){
            alert('送审失败'+result.errMsg);
        }else{
            $DS.loadCtrl('IFRAME_列表');
            alert('送审成功')
        }
    }, '已取消送审');

}