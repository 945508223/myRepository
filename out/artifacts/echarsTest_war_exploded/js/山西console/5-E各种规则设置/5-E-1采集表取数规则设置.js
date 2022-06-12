function reloadGRID_courselist(val) {

    debugger
    if ($DS.util.isArray(val)) {
        val = val[0];
    }
    try {
        let selectSql = `SELECT B.FK_TABLENAME FROM RPT_T_REPORTTEMPLET A INNER JOIN DM_DF_FIELDS B ON A.RPTDESC = B.TABLE_NAME AND A.REPORTTYPE = '0' AND B.FIELD_TYPE = '006' AND A.GUID ='${val.GUID}'`;
        selectSql.replaceAll("\n", "");
        let selectRes = $DS.selectBySql(VUECFG.appId, selectSql);
        //let selectRes = $DS.exeSql(selectSql);
        let tableName = "";
        if (selectRes.isError) {
            console.error(selectRes.errMsg);
        } else if (!selectRes.isError && selectRes.result && selectRes.result.length > 0) {
            tableName = selectRes.result[0].FK_TABLENAME;
        }

        if (tableName) {
            let newSql = `SELECT GUID, ITEMCODE, ITEMNAME, YEAR, ENDFLAG, SUPERGUID FROM ${tableName}  ORDER BY ITEMCODE`;
            newSql.replaceAll("\n", "");
            let source = $DS.getSource("DS_科目编码");
            source.sql = newSql;
            $DS.loadCtrl("GRID_科目列表");
        }else {
            $grid.setData($DS.getCtrl("GRID_科目列表").info.ds_id,[]);
        }
    } catch (e) {
        console.error(e);
    }

}