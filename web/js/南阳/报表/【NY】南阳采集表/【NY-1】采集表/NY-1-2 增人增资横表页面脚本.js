var pageInfo_Add = {
    checkedRow: {},
    nowCheckRow: '',//当前选中行
    guidColNum: '',//guid列号
    checkRowGuid: '',//当前选中行guid
    startRow: 3
}


var CZLX__ = speardUtil.getPms('URL_CZLX');

function changeColName_() {
    debugger
    //操作类型为 离休调标 调整列名称
    if (CZLX__ == '11') {
        console.log(tags_position);
        let sheet = spread.getActiveSheet();

        for (let item of tags_position[0]) {
            let tag_ = speardUtil.getTagByIndex(sheet, item.row, item.col);
            if (tag_.extpro && tag_.extpro.indexOf('COLNAME') != -1) {
                let colName = tag_.extpro.split(':')[1];

                //sheet.setText(item.row, parseInt(item.col)+1, '');
                sheet.removeSpan(item.row, item.col);
                sheet.addSpan(item.row, item.col, 2, 1);
                sheet.setValue(item.row + 1, item.col, '');
                sheet.setText(item.row, item.col, colName);
            }
        }
    }
}

//删除缓存
delete window.top.comboBoxOption

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
            let tag = speardUtil.getTagByIndex(sheet, pageInfo_Add.startRow, i);
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
    let sheet = spread.getActiveSheet();
    let agencyid = speardUtil.getPms('URL_agencyid');
    let CZLX = speardUtil.getPms('URL_CZLX');
    let month = speardUtil.getPms('URL_month');
    // 删除全部
    let chkCol = getCellPositonInRow(pageInfo_Add.startRow, 'CHK');
    let delAll = sheet.getTag(0, chkCol.col, GC.Spread.Sheets.SheetArea.colHeader);
    if (Object.keys(pageInfo_Add.checkedRow).length == 0 && !delAll) {
        parent.alert('请选择要删除的数据!');
        return;
    }
    let guidColNum = getGuidColNum();
    let guids = Object.keys(pageInfo_Add.checkedRow).map(row => {
        let id = $SH.getValue(sheet, row, guidColNum);
        return `'${id}'`
    })
    //人员唯一标识列
    let idPos = getCellPositonInRow(pageInfo_Add.startRow, 'PERSONID');
    let PERSONIDs = [];
    //删除全部
    if (delAll) {
        let sql = `SELECT PERSONID FROM  NY_PAYROLL WHERE  AGENCYID='${agencyid}' AND TASKMONTH='${month}' AND STATUS = '0' AND CZLX='${CZLX}'`;
        PERSONIDs = speardUtil.selectBySql(sql).result.map(item => `'${item.PERSONID}'`);
    } else {
        PERSONIDs = Object.keys(pageInfo_Add.checkedRow).map(row => {
            let id = $SH.getValue(sheet, row, idPos.col);
            return `'${id}'`
        })
    }

    parent.$DS.util.confirm(parent.window.vm, `确定删除选中数据?`, function () {
        let delSql = "";
        if (delAll) {

            delSql = `DELETE FROM NY_PAYROLL WHERE  AGENCYID='${agencyid}' AND TASKMONTH='${month}' AND STATUS = '0' AND CZLX='${CZLX}'`
        } else {
            delSql = `delete from NY_PAYROLL where GUID IN (${guids.join(',')})`;
        }
        let result = speardUtil.exeSql(delSql);
        if (result.isError) {
            alert('删除失败' + result.errMsg);
            return
        }
        alert('删除成功');
        //调出状态修改
        let sql2 = `update NY_PERSONINFO SET ISDC = '2' WHERE PERSONID IN(${PERSONIDs.join(',')})`;
        let sql3 = `update NY_PERSONINFO SET REMARK = '' WHERE PERSONID IN(${PERSONIDs.join(',')})`;
        speardUtil.exeSqls(sql2 + ';' + sql3);


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
        let sqlXZ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID IN('ZW','ZJ','JSDJ')  ORDER BY ELE_CODE`
        //事业引用技术等级
        let sqlSY = `SELECT  ELE_CODE AS value,ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID IN ('JSDJ','ZWSY') ORDER BY ELE_CODE`

        //行政人员编制
        let sqlXZBZ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='RYBZ' AND ELE_CODE IN (01,02,03,04,05) ORDER BY ELE_CODE`
        //事业编制人员编制
        let sqlSYBZ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='RYBZ' AND ELE_CODE IN (06,07,08,0901,0902,0903) ORDER BY ELE_CODE`
        //新增时 人员来源
        let sql_ = `SELECT  ELE_CODE AS value, ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='ZZRYLY' AND ELE_CODE IN (1,5,6,7,9) ORDER BY ELE_CODE`

        //行政人员 级别(岗位)档次
        let OPOSTGRADSql_xz = `SELECT  ELE_CODE AS value,ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID IN('GZJB','GWGZJB') ORDER BY ELE_CODE`;
        //事业人员 级别(岗位)档次
        let OPOSTGRADSql_sy = `SELECT  ELE_CODE AS value,ELE_CODE||'-'||ELE_NAME AS text FROM ELE_UNION WHERE  ELE_CATALOG_ID='GWGZJB' ORDER BY ELE_CODE`;

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
        //行政人员 级别(岗位)档次 引用
        let OPOSTGRADSql_xzOptions = speardUtil.selectBySql(OPOSTGRADSql_xz).result.map(item => {
            return {value: item.VALUE, text: item.TEXT}
        });

        //行政人员 级别(岗位)档次 引用
        let OPOSTGRADSql_syOptions = speardUtil.selectBySql(OPOSTGRADSql_sy).result.map(item => {
            return {value: item.VALUE, text: item.TEXT}
        });

        let sheet = spread.getActiveSheet();
        sheet.suspendPaint();

        let rowCnt = $SH.getRowCount(sheet);
        let catCol = getCellPositonInRow(pageInfo_Add.startRow, 'PERSONCAT')?.col || 4;
        let oldZwCol = getCellPositonInRow(pageInfo_Add.startRow, 'OLDJOBLEVEL')?.col || 31;//变动前技术等级
        let newZwCol = getCellPositonInRow(pageInfo_Add.startRow, 'NEWJOBLEVEL')?.col || 45;//变动后技术等级
        let oldJob = getCellPositonInRow(pageInfo_Add.startRow, 'OLDJOB')?.col || 21;//原职务技术登记
        let newJob = getCellPositonInRow(pageInfo_Add.startRow, 'NEWJOB')?.col || 23;//现职务技术等级
        let PERSONSTAFFCol = getCellPositonInRow(pageInfo_Add.startRow, 'PERSONSTAFF')?.col || 7;
        let fromCol = getCellPositonInRow(pageInfo_Add.startRow, 'PERSONFROM')?.col || 6;
        let OLDOPOSTGRADCol = getCellPositonInRow(pageInfo_Add.startRow, 'OLDOPOSTGRAD')?.col || 34;
        let NEWOPOSTGRADCol = getCellPositonInRow(pageInfo_Add.startRow, 'NEWOPOSTGRAD')?.col || 48;
        for (let row = pageInfo_Add.startRow; row < rowCnt; row++) {
            let catVal = $SH.getValue(sheet, row, catCol);
            if (catVal) {
                //行政 引用
                if (catVal == '1') {
                    $SH.setComboBoxCell(xzOptions, row, oldZwCol, sheet);
                    $SH.setComboBoxCell(xzOptions, row, newZwCol, sheet);
                    $SH.setComboBoxCell(xzOptions, row, oldJob, sheet);
                    $SH.setComboBoxCell(xzOptions, row, newJob, sheet);
                    $SH.setComboBoxCell(XZBZOptions, row, PERSONSTAFFCol, sheet);
                    $SH.setComboBoxCell(OPOSTGRADSql_xzOptions, row, OLDOPOSTGRADCol, sheet);
                    $SH.setComboBoxCell(OPOSTGRADSql_xzOptions, row, NEWOPOSTGRADCol, sheet);
                } else {
                    //事业引用
                    $SH.setComboBoxCell(syOptions, row, oldZwCol, sheet);
                    $SH.setComboBoxCell(syOptions, row, newZwCol, sheet);
                    $SH.setComboBoxCell(syOptions, row, oldJob, sheet);
                    $SH.setComboBoxCell(syOptions, row, newJob, sheet);
                    $SH.setComboBoxCell(SYBZ, row, PERSONSTAFFCol, sheet);
                    $SH.setComboBoxCell(OPOSTGRADSql_syOptions, row, OLDOPOSTGRADCol, sheet);
                    $SH.setComboBoxCell(OPOSTGRADSql_syOptions, row, NEWOPOSTGRADCol, sheet);
                }

            }
            //人员新增 人员来源引用
            if (speardUtil.getPms('URL_CZLX') == '1') {
                $SH.setComboBoxCell(fromOptions, row, fromCol, sheet);
            }
        }


        sheet.resumePaint();
    } catch (e) {
        console.error('根据人员类别设置新旧职务引用失败' + e);
        sheet.resumePaint();
    }

}

//设置汇总
function setSumCell_() {
    var sumCell = speardUtil.getTagsPosition(`"isSumCell":`);
    let sheet = spread.getSheet(0);
    if (sumCell[0] && sumCell[0].length > 0) {
        let oneSumCell = sumCell[0];
        for (var s = 0; s < oneSumCell.length; s++) {
            $SH.setFormula(sheet, oneSumCell[s].row, oneSumCell[s].col, undefined)
        }
    }
    if (temporary?.$FIRSTLEVELMAP?.[0]?.length > 0) {
        temporary.$FIRSTLEVELMAP[0] = Array.from(new Set(temporary.$FIRSTLEVELMAP[0]));
    }

    setFirstSumFormula();
}


