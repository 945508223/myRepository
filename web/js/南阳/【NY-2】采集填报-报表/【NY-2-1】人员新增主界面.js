//删除
function deleteClickEvent_() {
    debugger
    let iframeWin = $iframe.getSubWindow('IFRAME_列表')
    if (iframeWin.deleteNewPerson) {
        iframeWin.deleteNewPerson(window);
    }
}

/*
修改新增人员 获取报表选中行
 */
function updatePersonInfo() {
    debugger
    let iframeWin = $iframe.getSubWindow('IFRAME_列表')
    if (iframeWin?.pageInfo_Add?.checkRowGuid) {
        if (Object.keys(iframeWin.pageInfo_Add.checkedRow).length > 1) {
            alert('请选择一行数据');
            return false;
        }
        $DS.putPms('personGUID',iframeWin?.pageInfo_Add?.checkRowGuid);
    }
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