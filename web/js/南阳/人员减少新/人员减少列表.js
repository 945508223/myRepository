/**
 * 送审 状态置为2
 */
function sentToCheck() {
    debugger
    let gridInfo = $DS.getCtrl('GRID_明细表格').info;
    if (gridInfo.ds_grid?.length == 0) {
        alert('请先选择人员信息')
        return
    }
    let errorNames = gridInfo.ds_grid.filter(row => row.ACTIONMONTH == '' || row.ACTIONMONTH == null || row.ACTIONMONTH == undefined).map(item => item.NAME).join(',');

    $DS.util.confirm(window.vm, `${errorNames ? '【' + errorNames + '】未填写执行月份,' : ''}确认送审?`, function () {
        debugger

        gridInfo.ds_grid.forEach(row => {
            row.STATUS = '1';
            //未填写执行月份
            if (row.ACTIONMONTH == '' || row.ACTIONMONTH == null || row.ACTIONMONTH == undefined) {
                row.ACTIONMONTH = '' + parseInt(row.CURRENTMONTH) + 1;
                if (row.ACTIONMONTH < 10) {
                    row.ACTIONMONTH = '0' + row.ACTIONMONTH;
                }
                row.ADDMONTH = 1;
                row.ADDWAGE = row.MONTHWAGE * -1;
            }
        })
        let result = $DS.saveAllTableData('NY_REDUCE_DETAIL', 'GUID', {
            inserted: [],
            updated: gridInfo.ds_grid,
            deleted: []
        }, VUECFG.appId);
        if (result.isError) {
            alert('送审失败:' + result.errMsg);
        } else {
            $DS.loadCtrl('GRID_明细表格')
            alert('送审成功!')
        }
    }, '已取消送审');

}

/**
 * 表格值变更
 * @param pms
 */
function gridValChange(pms) {
    if (isNaN(parseInt(pms.value)) || pms.value <= 0 || pms.value > 12) {
        pms.fuScope.row.ACTIONMONTH = '';
        pms.scope.row.ADDMONTH = '';

        return false;
    }
    if (pms.value < 10) {
        pms.value = '0' + pms.value;
    }
}



