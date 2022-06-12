//初始化操作
function init_() {
}

//单位列表加载完成事件 回填上年编码 等字段值
function loadSuccess_anencyGrid(info) {
    debugger
    //设置自定义列引用
    let gridRef = window[info.ds_id + "_gridRef"];
    gridRef.computed_columns.forEach(col => {
        switch (col.prop) {
            case 'IS_PUBLIC':
            case 'IS_PDF':
            case 'IS_DONE':
            case 'ISSUE':
                col.fieldShowType = 'switch';
                break;
        }
    })

    let sql = "select ADMDIV,MOF_DIV_CODE,AGENCYID,AGENCYCODE,AGENCYCODE_LAST,IS_PUBLIC,IS_PDF,IS_DONE from GFA_REPORT_AGENCY where year = '${V.P_SELECTYEAR,2022}'";
    let result = $DS.selectBySql(VUECFG.appId, $DS.util.replace(sql));
    if (result.isError) {
        console.error(result.errMsg);
        return;
    }
    let resObj = {};
    result.result.forEach(item => resObj[item.AGENCYID] = item);
    let listData = $DS.util.childrenToList(info.ds_grid, 'children', []);
    listData.forEach(item => {
        delete item.children;
        if (resObj[item.GUID]) {
            item.AGENCYCODE_LAST = resObj[item.GUID].AGENCYCODE_LAST;
            item.IS_PUBLIC = resObj[item.GUID].IS_PUBLIC;
            item.IS_PDF = resObj[item.GUID].IS_PDF;
            item.IS_DONE = resObj[item.GUID].IS_DONE;
        }
    })
    info.ds_grid = listData;
}


//保存
function saveAgencyGrid() {
    debugger
    let editRows = $grid.getEditRows($DS.getCtrl('GRID_单位列表').info.ds_id);
    if (editRows?.updated?.length == 0 && editRows?.deleted?.length == 0) {
        alert('未修改数据');
        return false;
    }
    if (editRows?.deleted?.length > 0) {
        editRows.deleted.forEach(item => item.AGENCYID = item.GUID)
    }
    let admdiv = $DS.getPms('P_ADMDIV')[0].GUID;
    let mof_div_code = $DS.getPms('P_ADMDIV')[0].ITEMCODE;
    let year = $DS.getPms('P_SELECTYEAR');
    let saveData = editRows.updated.map(item => {
        let newItem = {};
        newItem.ADMDIV = admdiv;//操作区划
        newItem.AGENCYCODE_LAST = item.AGENCYCODE_LAST;//单位上年编码
        newItem.IS_PUBLIC = item.IS_PUBLIC || '0';//是否公开
        newItem.IS_PDF = item.IS_PDF || '0';//是否允许上传PDF
        newItem.IS_DONE = item.IS_DONE || '0';//IS_DONE
        newItem.YEAR = year;
        newItem.AGENCYID = item.GUID; //单位ID
        newItem.AGENCYCODE = item.ITEMCODE; //单位编码
        newItem.MOF_DIV_CODE = mof_div_code;//单位所在区划编码
        return newItem;
    })
    editRows.deleted = [...saveData, ...editRows.deleted];
    editRows.inserted = saveData;
    editRows.updated = [];

    let result = $DS.saveAllTableData('GFA_REPORT_AGENCY', 'AGENCYID', editRows, VUECFG.appId);
    if (result.isError) {
        alert(result.errMsg);
        return false;
    } else
        alert('保存成功!')

}

//删除
function delRows_() {
    debugger
    let gridInfo = $DS.getCtrl('GRID_单位列表').info;
    let gridRef = window[gridInfo.ds_id + "_gridRef"];

    var selectRows = gridRef.getSelectRows();
    if (selectRows.length === 0) {
        gridRef.$message.warning("请选择要删除的行!");
        return;
    }
    let msg = /*selectRows[0].children ? '该单位下存在下级单位,是否确定删除该行' :*/ '是否确定删除该行'
    gridRef.$confirm(msg, '提示', {type: 'warning'}).then(() => {
        debugger
        selectRows.forEach(item => item.AGENCYID = item.GUID);
        // let deldata = $DS.util.childrenToList(selectRows, 'children', []);
        /* deldata.forEach(item=>{
             delete item.children;
             item.AGENCYID = item.GUID;
         })*/
        let saveData = {inserted: [], deleted: selectRows, updated: []}
        let result = $DS.saveAllTableData('GFA_REPORT_AGENCY', 'AGENCYID', saveData, VUECFG.appId);
        if (result.isError) {
            alert('删除失败');
            console.error(result.errMsg)
        } else {
            alert('删除成功');
            $DS.loadCtrl('GRID_单位列表')
        }
    });
}


function cellValChange_Angecy(value, scope) {
    debugger
    let field = scope.column.columnKey;
    if (field === 'IS_PUBLIC' && value == '0') {
        scope.row.ISSUE = '0'
    } else if (value == '1' && field === 'ISSUE' && (scope.row.IS_PUBLIC == undefined || scope.row.IS_PUBLIC == '0')) {
        scope.row.ISSUE = '0';
        alert('未选择是否公开!');
    }
}

let sql = `delete from RPT_T_REPORTRULE where REPORTID ='3D66FD848E674C6883C8A61A20DE94A3'`
speardUtil.exeSql(sql)


VUECFG.$refs[obj.ds_id].computed_columns.forEach(col=>{
    if(col.prop=='SUM'){
        col.fieldShowType=='select'
        col.options = [{label:'选项一',value:1},{label:'选项二',value:2}]
    }
})