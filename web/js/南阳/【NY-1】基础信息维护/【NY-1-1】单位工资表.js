//删除
function deleteClickEvent_() {
    debugger
    let curRow = $DS.getPms('persionInfo');
    if (!curRow || curRow.length == 0) {
        alert('请选择要删除的人员信息')
        return false;
    }
    $DS.util.confirm(window.vm, `确定删除该人员信息?`, function () {
        debugger
        let result = $DS.deleteById(VUECFG.appId, 'NY_PERSONINFO', 'GUID', curRow[0].GUID)
        if (result.isError) {
            alert('删除失败:' + result.errMsg);
            return false;
        } else {
            $DS.loadCtrl('GRID_单位基本工资表')
            alert('删除成功!')
        }
    })
}

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

//搜索
function searchPeople(val) {
    debugger
    let source = $DS.getSource('DS_单位人员基本信息');
    let filter = "[and] year = '${V.USER_currentyear}' [and] AGENCYCODE = '${V.agencyInfo.0.ITEMCODE}' [and] TASKMONTH = '${V.currentMonth}'";
    if (val != '' && val != null && val != undefined) {
        source.filter = filter + `and (IDNO like '%${val}%' or PERSONNAME like '%${val}%')`;
    } else {
        source.filter = filter;
    }
    let gridVm = $grid.getGridVmByName('GRID_单位基本工资表');
    gridVm.currentPage = 1;
    $DS.loadCtrl('GRID_单位基本工资表');

}