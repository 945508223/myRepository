/**
 * 删除报表分类
 */
function deleteRptFl() {
    $DS.util.confirm(window.vm, "是否确认删除?", function () {
        var val = $DS.getPms("P_RPTFL");
        if (!val || !val[0].ID) {
            alert("请选择分类!")
        } else {
            if (val[0].ID == "#") {
                alert("根节点不能删除!")
            } else {
                var source = $DS.getSource("DS_SQL分类");
                var reg = $DS.selectBySql(source.appId, "select count(*) as CNT from RPT_T_SQLTEMPLET where SQLCAT='" + val[0].GUID + "'", "", "");
                if (reg.isError) {
                    alert(res.errMsg);
                } else {
                    if (reg.result && reg.result[0].CNT > 0) {
                        alert("该分类下存在数据，不允许删除！");
                        return false;
                    } else {
                        var res = $DS.deleteByPageSource("DS_SQL分类", val[0].GUID)
                        if (res.isError) {
                            alert(res.errMsg);
                        } else {
                            $DS.loadCtrl("Tree_报表分类")
                            alert("删除成功!")
                        }
                    }
                }
            }
        }
    }, "已取消删除!")
}

/**
 * 修改前事件
 */
function beforeEditFl() {
    var val = $DS.getPms("P_RPTFL");
    if (val && val[0].ID && val[0].ID != "#") {
        return true
    } else {
        alert("根节点不能修改!")
        return false
    }
}

/**
 * 删除报表模板
 */
function deleteRptMd() {
    $DS.util.confirm(window.vm, "是否确认删除?", function () {
        var val = $DS.getPms("P_RPTMD");
        if (!val || !val[0].GUID) {
            alert("请选择一行!")
        } else {
            var res = $DS.deleteByPageSource("DS_SQ列表", val[0].GUID)
            if (res.isError) {
                alert(res.errMsg);
            } else {
                $DS.loadCtrl("DS_SQ列表")
                alert("删除成功!")
            }
        }
    }, "已取消删除!")
}

//新增前校验
function beforeAddSql() {
    let pms = $DS.getPms("P_RPTFL");
    if (!pms || (pms && (pms.length == 0 || pms[0].ID == "#"))) {
        alert("请选择规则分类")
        return false;
    }
}


//表格数据保存后才可编辑sql
function checkSqlIsReadOnly(val) {
    debugger
    let textArea = $DS.getCtrl("TEXTAREA_SQL取数").info;
    if (val.optType == "inserted") {
        textArea.ds_readonly = true;
        textArea.ds_textarea = "";
        return
    } else {
        textArea.ds_readonly = false;
    }
    //设置sql回显
    let res = $DS.getClob(VUECFG.appId, "RPT_T_SQLTEMPLET", "GUID", val.GUID, "SQLCONTENTT")
    if (res.isError) {
        console.error(res.errMsg);
    } else {
        textArea.ds_textarea = res.result;
    }
}


//sql保存前校验
function beforeSaveSqlContent() {
    debugger
    let curRow = $DS.getPms("C_GRID");
    if (!curRow || (curRow && (curRow.length == 0) || !curRow[0].GUID)) {
        alert("请先选择分类");
        return false;
    }

    if (curRow[0].optType == "inserted") {
        alert("请先保存")
    }
}

//保存sql
function saveSqlContent() {
    debugger
    let curRow = $DS.getPms("C_GRID");
    let sql = $DS.getCtrl("TEXTAREA_SQL取数").info.ds_textarea;


    //let res = $DS.saveClob(VUECFG.appId,"SQLCONTENTT",sql,"RPT_T_SQLTEMPLET","GUID",curRow[0].GUID)
    let saveData = {
        GUID: curRow[0].GUID,
        SQLCONTENTT: sql
    }
    let res = $DS.saveTable(VUECFG.appId, "edit", saveData, "RPT_T_SQLTEMPLET", "GUID")
    if (res.isError) {
        alert("保存失败")
        console.error(res.errMsg);
    } else {
        alert("保存成功")
    }
}

//删除表格行
function deleteCenterGrid() {
    debugger
    let gridInfo = $DS.getCtrl('GRID_SQL列表').info;
    let _this = window[gridInfo.ds_id + "_gridRef"];

    var info = _this.info;
    var selectRows = _this.getSelectRows();
    if (selectRows.length === 0) {
        _this.$message.warning("请选择要删除的行!");
        return;
    }
    _this.$confirm("是否确定删除该行", '提示', {type: 'warning'}).then(() => {
        var deleteRows = [];
        let rowKey = _this.info.ds_row_key ? _this.info.ds_row_key : (_this.info.ds_row_id ? _this.info.ds_row_id : "GUID");
        deleteRows = setDelAfterData(_this.computed_data, selectRows, deleteRows, rowKey);

        if (deleteRows.length > 0) {
            if (!_this.info.ds_deleteRows) {
                _this.info.ds_deleteRows = [];
            }
            _this.info.ds_deleteRows = _this.info.ds_deleteRows.concat(deleteRows);
        }

        let textArea = $DS.getCtrl("TEXTAREA_SQL取数").info;

        textArea.ds_readonly = true;
        textArea.ds_textarea = "";
        return


    });
}
//sql校验
function checkSql(){
    debugger
    let sql = $DS.getCtrl("TEXTAREA_SQL取数").info.ds_textarea;
    var result = YCDCommon.Ajax.syncAjax("../report/getDataSet", {
        'sql' : sql,
        'argsData':"[]"
    });
    if(result.isError){
        alert(result.errMsg);
    }else {
        alert("校验通过")
    }
}