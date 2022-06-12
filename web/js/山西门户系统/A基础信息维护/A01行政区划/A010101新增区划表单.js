function init_Form() {
    debugger
    if ($DS.getPms("URL_TYPE") == "edit") {
        let grid = parent.$DS.getCtrl("GRID_区划表格").info;
        let curNode = parent.$grid.getCheckedNodes(grid.ds_id)[0];
        //setFormData_ADMDIV(curNode)
        $DS.getCtrl("INPUT_GUID").info.ds_input = curNode.GUID;
        $DS.putPms("ADMDIV_GUID", curNode.GUID);
    }

}

init_Form();

//保存
function saveAdmdiv() {
    debugger
    let formData = getFormData_ADMDIV();
    if (!formData.ITEMCODE) {
        alert("区划编码不能为空");
        return
    }
    if (!formData.ITEMNAME) {
        alert("区划名称不能为空");
        return;
    }
    let type = $DS.getPms("URL_TYPE");
    let parenTree = parent.$DS.getCtrl("TREE_区划列表").info;
    let parentGrid = parent.$DS.getCtrl("GRID_区划表格").info;
    let treeData = parent.$tree.getCurrentNode(parenTree.ds_id);
    let saveData = {inserted: [], updated: [], deleted: []};

    let item = {
        SUPERGUID: treeData.GUID,
        //ITEMCODE: formData.ITEMCODE,
        //ITEMNAME: formData.ITEMNAME,
        ADMDIVCODE: formData.ITEMCODE,
        ADMDIVNAME:formData.ITEMNAME,
        //ORDERNUM: getORDERNUMBER(parentGrid, treeData),
        MOF_DIV_TYPE: formData.MOF_DIV_TYPE,
        IS_ADMDIV: formData.IS_ADMDIV,
        PARENT_ADM_DIV_CODE: treeData.ITEMCODE,

        //MOF_DIV_ID: "",
        //MOF_DIV_CODE: formData.ITEMCODE,
        //MOF_DIV_NAME: formData.ITEMNAME,
        //PARENT_ID: treeData.GUID,
        //ADM_DIV_CODE: formData.ITEMCODE,
        START_DATE: formData.START_DATE,
        END_DATE: formData.START_DATE,
    }

    if (type == "edit") {
        let row = parent.$grid.getCheckedNodes(parentGrid.ds_id);
        item["GUID"] = row[0].GUID;
        saveData.updated.push(item);
    } else {
        let uuid = $DS.util.UUID().replaceAll("-", "").toUpperCase();
        item["GUID"] = uuid;
        // item["MOF_DIV_ID"] = uuid;
        item["ENDFLAG"] = "1";
        item["LEVELS"] = treeData.LEVELS + 1;
        // item["IS_LEAF"] = "1";
        // item["LEVEL_NO"] = item["LEVELS"];
        item["YEAR"] = $DS.getPms("USER_currentyear");
        saveData.inserted.push(item);

        //修改父节点endflag
        if (treeData.ENDFLAG == "1") {
            let item2 = {
                GUID: treeData.GUID,
                ENDFLAG: '0',
                IS_LEAF: '0'
            };
            saveData.updated.push(item2);
        }
    }

    let result = $DS.saveTable(VUECFG.appId, 'add', saveData.inserted[0], 'SSO_T_PUBADMDIV', 'GUID');
    if (result.isError) {
        alert(`保存失败,失败原因${result.errMsg}`);
        return;
    }
    if (saveData.updated && saveData.updated.length > 0) {
        result = $DS.saveTable(VUECFG.appId, 'edit', saveData.updated[0], 'SSO_T_PUBADMDIV', 'GUID');
    }
    //let result = $DS.saveAllTableData("SSO_T_PUBADMDIV", "GUID", saveData, VUECFG.appId);
    //let result = $DS.saveTable(VUECFG.appId,"add",saveData.inserted[0],"BAS_MOF_DIV", "GUID" );
    if (result.isError) {
        alert(`保存失败,失败原因${result.errMsg}`);
    } else {
        parent.$DS.loadCtrl("TREE_区划列表");
        parent.$DS.loadCtrl("GRID_区划表格");
        $DS.util.close();
    }
}


function getFormData_ADMDIV() {
    return {
        ITEMCODE: $DS.getCtrl("INPUT_区划编码").info.ds_input,
        ITEMNAME: $DS.getCtrl("INPUT_区划名称").info.ds_input,
        MOF_DIV_TYPE: $DS.getCtrl("SELECT_区划类型").info.ds_select,
        IS_ADMDIV: $DS.getCtrl("RADIO_是否行政区划").info.ds_radio,
        START_DATE: $DS.getCtrl("DATE_启用日期").info.ds_date,
        END_DATE: $DS.getCtrl("DATE_停用日期").info.ds_date,
    };
}

function setFormData_ADMDIV(data) {
    $DS.getCtrl("INPUT_区划编码").info.ds_input = data.ITEMCODE;
    $DS.getCtrl("INPUT_区划名称").info.ds_input = data.ITEMNAME;
    $DS.getCtrl("SELECT_区划类型").info.ds_select = data.MOF_DIV_TYPE;
    $DS.getCtrl("RADIO_是否行政区划").info.ds_radio = data.IS_ADMDIV;
}

//获取层次编码
function getORDERNUMBER(parentGrid, treeData) {
    if (parentGrid.ds_grid && parentGrid.ds_grid.length > 0) {
        let lastNumber = parentGrid.ds_grid[parentGrid.ds_grid.length - 1].ORDERNUM;
        let num = parseInt(lastNumber.substr(lastNumber.length - 3, 3)) + 1 + "";
        if (num.length > 2) {
            return lastNumber.substr(0, lastNumber.length - 3) + num;
        } else {
            return lastNumber.substr(0, lastNumber.length - 3) + "0" + num;
        }
    } else {
        return treeData.ORDERNUM + "000001";
    }
}