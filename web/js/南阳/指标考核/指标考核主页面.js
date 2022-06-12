/**
 * tab页 下子页面点击送审按钮通用方法
 */
function sendToCheck(win) {
    debugger

    let gridInfo = win.$DS.getCtrl('GRID_审核表').info;
    let source = win.getSourceById(gridInfo.ds_datasource);
    if (gridInfo?.ds_grid?.length == 0) {
        alert('请先填写信息');
        return false;
    }
    let saveData = {inserted: [], updated: [], deleted: []};
    gridInfo.forEach(row => {
        if (!row.NAME || !row.GR_CODE) {
            alert('人员姓名、人员编号不得为空!')
            return false;
        }
        row.STATUS = '2';
        if (row.optType == 'inserted') {
            saveData.inserted.push(row);
        } else {
            saveData.updated.push(row);
        }
    })

    let result = $DS.saveAllTableData(source.tableName, 'GUID', saveData);
    if (result.isError) {
        alert('送审失败' + result.errMsg);
    } else {
        win.$DS.loadCtrl('GRID_审核表');
        alert('送审成功');
    }
}


