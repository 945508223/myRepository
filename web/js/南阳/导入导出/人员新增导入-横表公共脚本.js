var pageInfo_Add = {
    checkedRow: {},
    nowCheckRow: '',//当前选中行
    guidColNum: '',//guid列号
    checkRowGuid: ''//当前选中行guid
}

/**
 * 复选框选中变更
 * @param params
 */
function myCheckedChangeEvent(params) {
    if (params.val) {
        pageInfo_Add.checkedRow[params.row] = true;
        pageInfo_Add.nowCheckRow = params.row;
        let guidCol = getGuidColNum();
        pageInfo_Add.checkRowGuid = $SH.getValue(params.sheet, params.row, guidCol);
    } else {
        delete pageInfo_Add.checkedRow[params.row];
    }
}


function getGuidColNum() {
    if (pageInfo_Add.guidColNum) {
        return pageInfo_Add.guidColNum;
    } else {
        let sheet = spread.getActiveSheet();
        let colcount = $SH.getColumnCount(sheet);
        for (let i = 0; i < colcount; i++) {
            let tag = speardUtil.getTagByIndex(sheet, 2, i);
            if (tag?.fieldname == 'GUID') {
                pageInfo_Add.guidColNum = i;
                return i;
            }
        }
    }
}

/**
 * 删除新增人员
 */
function deleteNewPerson() {
    debugger

    if (Object.keys(pageInfo_Add.checkedRow).length == 0) {
        parent.alert('请选择要删除的数据!')
        return;
    }
    let sheet = spread.getActiveSheet();
    let guidColNum = getGuidColNum();
    let guids = Object.keys(pageInfo_Add.checkedRow).map(row => {
        let id = $SH.getValue(sheet, row, guidColNum);
        return `'${id}'`
    })
    //人员唯一标识列
    let idPos = getCellPositonInRow(2,'PERSONID');
    let PERSONIDs = Object.keys(pageInfo_Add.checkedRow).map(row => {
        let id = $SH.getValue(sheet, row, idPos.col);
        return `'${id}'`
    })



    parent.$DS.util.confirm(parent.window.vm, `确定删除选中数据?`, function () {
        let sql = `delete from NY_PAYROLL where GUID IN (${guids.join(',')})`;
        let result = speardUtil.exeSql(sql);
        if (result.isError) {
            alert('删除失败' + result.errMsg);
            return
        }
        alert('删除成功');
        //调出状态修改
        let sql2 = `update NY_PERSONINFO SET ISDC = '2' WHERE PERSONID IN(${PERSONIDs.join(',')})`;
        let sql3 = `update NY_PERSONINFO SET REMARK = '' WHERE PERSONID IN(${PERSONIDs.join(',')})`;
        speardUtil.exeSqls(sql2+';'+sql3);
        parent.$DS.loadCtrl('IFRAME_列表');
    }, '已取消删除')


}


/**
 * 加载完成事件根据人员类别设置不同引用数据
 */
function loadAfterSetZwOptions() {
    debugger
    try {
        //行政引用职务
        let sqlXZ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='ZW'  ORDER BY ELE_CODE`
        //事业引用技术等级
        let sqlSY = `SELECT  ELE_CODE AS value,ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='JSDJ' ORDER BY ELE_CODE`

        //行政人员编制
        let sqlXZBZ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='RYBZ' AND ELE_CODE IN (01,02,03,04,05) ORDER BY ELE_CODE`
        //事业编制人员编制
        let sqlSYBZ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='RYBZ' AND ELE_CODE IN (06,07,08,0901,0902,0903) ORDER BY ELE_CODE`
        //新增时 人员来源
        let sql_ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='ZZRYLY' AND ELE_CODE IN (1,5,6,7,9) ORDER BY ELE_CODE`
        let syOptions = speardUtil.selectBySql(sqlSY).result.map(item => {
            return {value: item.VALUE, text: item.TEXT}
        });

        let xzOptions = speardUtil.selectBySql(sqlXZ).result.map(item => {
            return {value: item.VALUE, text: item.TEXT}
        });
        let XZBZOptions = speardUtil.selectBySql(sqlXZBZ).result.map(item => {
            return {value: item.VALUE, text: item.TEXT}
        });

        let SYBZ = speardUtil.selectBySql(sqlSYBZ).result.map(item => {
            return {value: item.VALUE, text: item.TEXT}
        });


        let fromOptions = speardUtil.selectBySql(sql_).result.map(item => {
            return {value: item.VALUE, text: item.TEXT}
        });


        let sheet = spread.getActiveSheet();
        sheet.suspendPaint();

        let rowCnt = $SH.getRowCount(sheet);
        let catCol = getCellPositonInRow(2, 'PERSONCAT')?.col || 4;
        let oldZwCol = getCellPositonInRow(2, 'OLDJOBLEVEL')?.col || 31;
        let newZwCol = getCellPositonInRow(2, 'NEWJOBLEVEL')?.col || 45;
        let oldJob = getCellPositonInRow(2, 'OLDJOB')?.col || 21;
        let newJob = getCellPositonInRow(2, 'NEWJOB')?.col || 23;
        let PERSONSTAFFCol = getCellPositonInRow(2, 'PERSONSTAFF')?.col || 7;
        let fromCol = getCellPositonInRow(2, 'PERSONFROM')?.col || 6;
        for (let row = 2; row < rowCnt; row++) {
            let catVal = $SH.getValue(sheet, row, catCol);
            if (catVal) {
                if (catVal == '1') {
                    $SH.setComboBoxCell(xzOptions, row, oldZwCol, sheet);
                    $SH.setComboBoxCell(xzOptions, row, newZwCol, sheet);
                    $SH.setComboBoxCell(xzOptions, row, oldJob, sheet);
                    $SH.setComboBoxCell(xzOptions, row, newJob, sheet);
                    $SH.setComboBoxCell(XZBZOptions, row, PERSONSTAFFCol, sheet);
                } else {
                    $SH.setComboBoxCell(syOptions, row, oldZwCol, sheet);
                    $SH.setComboBoxCell(syOptions, row, newZwCol, sheet);
                    $SH.setComboBoxCell(syOptions, row, oldJob, sheet);
                    $SH.setComboBoxCell(syOptions, row, newJob, sheet);
                    $SH.setComboBoxCell(SYBZ, row, PERSONSTAFFCol, sheet);
                }

            }
            //人员新增 人员来源引用
            if(speardUtil.getPms('URL_CZLX')=='1'){
                $SH.setComboBoxCell(fromOptions, row, fromCol, sheet);
            }
        }


        sheet.resumePaint();
    } catch (e) {
        console.error('根据人员类别设置新旧职务引用失败' + e);
        sheet.resumePaint();
    }

}