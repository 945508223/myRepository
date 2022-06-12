var projProtectInfo = {};

//支出功能范围树加载完成事件
function getExpfuncTree() {

    if (projProtectInfo["expfuncTreeListData"]) {
        return projProtectInfo["expfuncTreeListData"];
    }
    let treeInfo = $DS.getCtrl("TREE_支出功能科目").info;
    let treeData = $DS.util.clone(treeInfo.ds_tree);
    let treeListData = $DS.util.childrenToList(treeData, "children", []);
    let treeObjData = {};
    for (let item of treeListData) {
        treeObjData[item.ID] = item;
    }
    projProtectInfo["expfuncTreeListData"] = treeObjData;
    return projProtectInfo["expfuncTreeListData"];
}


//表格加载完成事件 设置科目范围
function projCompleteForSetEXPFUNCID(gridInfo) {

    let treeParam = $DS.getPms("treeParam");
    if (!treeParam || treeParam[0].ID == "#" || !gridInfo.ds_grid || (gridInfo.ds_grid && gridInfo.ds_grid.length == 0)) {
        return;
    }

    let gridData = $DS.util.childrenToList(gridInfo.ds_grid, "children", []);
    let spfIds = [];
    let strSpfIds = "";
    for (let item of gridData) {
        spfIds.push(`'${item.GUID}'`);
    }
    strSpfIds = spfIds.join(",");
    let sql1 = `select SPFID,EXPFUNCID from RURAL_SET_PROJFUNC WHERE SPFID in(${strSpfIds})`;
    let result = $DS.selectBySql(VUECFG.appId, sql1);
    if (!result || result.isError) {
        console.error("获取科目范围数据失败");
        console.error(result.errMsg);
        return false;
    } else {
        if (result.result.length == 0) {
            return true;
        }
        let proj_expfuncObj = {};
        let proj_expfuncList = result.result;
        let expfuncTreeObj = getExpfuncTree();
        for (let item of proj_expfuncList) {
            if (!proj_expfuncObj[item.SPFID]) {
                proj_expfuncObj[item.SPFID] = [];
            }
            proj_expfuncObj[item.SPFID].push(item);
        }

        //获取项目对应的科目范围
        for (let proj of gridData) {
            proj["EXPFUNC"] = "";
            proj["EXPFUNC_ID"] = ""
            if (proj.children) {
                delete proj.children;
            }
            let expfuncs = proj_expfuncObj[proj.GUID];
            if (expfuncs && expfuncs.length > 0) {

                for (let i = 0; i < expfuncs.length; i++) {

                    if (i == expfuncs.length - 1) {
                        proj["EXPFUNC"] += expfuncTreeObj[expfuncs[i].EXPFUNCID].NAME;
                        proj["EXPFUNC_ID"] += expfuncTreeObj[expfuncs[i].EXPFUNCID].ID;
                    } else {
                        proj["EXPFUNC"] += expfuncTreeObj[expfuncs[i].EXPFUNCID].NAME + "/";
                        proj["EXPFUNC_ID"] += expfuncTreeObj[expfuncs[i].EXPFUNCID].ID + "/";
                    }
                }
            }
        }

        gridInfo.ds_grid = gridData;
    }
}


//新增按钮
function addProjByTreeParam() {

    var treeParam = $DS.getPms("treeParam");
    if (!treeParam || treeParam[0].ID == "#") {
        alert("请先选择分类!");
        return false;
    }
    var gridParam = $DS.getPms("gridParam");

    var gridInfo = $DS.getCtrl("GRID_项目列表").info;
    //设置 superguid、levels、ordernum
    var newRow = {
        optType: "inserted",
        ENDFLAG: "1",
        PROJTYPE: treeParam[0].ID,
        GUID: $DS.util.UUID().replaceAll("-", "").toUpperCase()
    };

    //添加二级项目 同时修改endflag
    if (gridParam && $DS.util.isObject(gridParam)) {
        gridParam = [gridParam];
    }
    if (gridParam && gridParam[0] && gridParam[0].LEVELS == "2") {
        alert("当前选择为二级项目,请选择一级项目!");
        return true;
    }
    if (gridParam && gridParam.length > 0) {
        let obj = getCodeAndOrderByGridAndTree("2", gridInfo, treeParam[0], gridParam[0]);
        newRow["LEVELS"] = "2";
        newRow["SUPERGUID"] = gridParam[0].GUID;
        newRow["ORDERNUM"] = obj.ORDERNUM;
        newRow["ITEMCODE"] = obj.ITEMCODE;

        let gridData = gridInfo.ds_grid;
        let newData = $DS.util.childrenToList(gridData, "children", []);
        for (let item of newData) {
            if (item.children) delete item.children;
            if (gridParam[0].GUID == item.GUID && gridParam[0].ENDFLAG == "1") {
                item.ENDFLAG = "0";
                if (!item.optType) {
                    item.optType = "updated";
                }
            }
        }
        newData.push(newRow);
        gridInfo.ds_grid = newData;
    }
    //添加一级项目
    else {
        let obj = getCodeAndOrderByGridAndTree("1", gridInfo, treeParam[0]);
        newRow["LEVELS"] = "1";
        newRow["SUPERGUID"] = "#";
        newRow["ORDERNUM"] = obj.ORDERNUM;
        newRow["ITEMCODE"] = obj.ITEMCODE;
        if (!gridInfo.ds_grid) {
            gridInfo.ds_grid = [];
        }
        gridInfo.ds_grid.push(newRow);
    }
    $grid.clearCheckedNode(gridInfo.ds_id);
}

//生成编码和ordernumber
function getCodeAndOrderByGridAndTree(levels, gridInfo, treeParam, gridParam) {

    var itemCode = "";
    var orderNumber = "";
    var gridData = gridInfo.ds_grid;
    //一级项目编码
    if (levels == "1") {
        let code = 1;
        let number = 1;
        if (gridData && gridData[gridData.length - 1]) {
            code = parseInt(gridData[gridData.length - 1].ITEMCODE.substr(7, 2)) + 1;
            number = parseInt(gridData[gridData.length - 1].ORDERNUM) + 1;
        }
        code = code < 10 ? "0" + number : code + "";
        itemCode = treeParam.ITEMCODE + "-" + code + "";
        orderNumber = number < 10 ? "00000" + number : "0000" + number;

    } else {
        let parentCode = gridParam.ITEMCODE;
        let code = parseInt(gridParam.children && gridParam.children[gridParam.children.length - 1] ? parseInt((gridParam.children[gridParam.children.length - 1].ITEMCODE).substr(10, 2)) + 1 : 1);
        itemCode = code < 10 ? parentCode + "-0" + code : parentCode + "-" + code;

        let parentOrder = gridParam.ORDERNUM;
        let number = parseInt(gridParam.children && gridParam.children[gridParam.children.length - 1] ? parseInt((gridParam.children[gridParam.children.length - 1].ORDERNUM).substr(10, 2)) + 1 : 1);
        orderNumber = number < 10 ? parentOrder + "00000" + number : "0000" + number;
    }

    return {ITEMCODE: itemCode, ORDERNUM: orderNumber};
}


//删除按钮
function deleteProjByGridParam() {

    let gridParam = $DS.getPms("gridParam");
    if (gridParam && gridParam.length > 0) {

        let tip = gridParam[0].ITEMNAME ? `确认删除【${gridParam[0].ITEMNAME}】?` : `确认删除该项目分类?`;
        if (gridParam[0].children && gridParam[0].children.length > 0) {
            tip = gridParam[0].ITEMNAME ? `【${gridParam[0].ITEMNAME}】下存在子集数据,确认删除?` : `该分类下存在子集数据,确认删除?`
        }
        $DS.util.confirm(window.vm, tip, function () {

            let gridInfo = $DS.getCtrl("GRID_项目列表").info;
            let gridData = $grid.getAllData(gridInfo.ds_id);
            if (!gridInfo.ds_deleteRows) {
                gridInfo.ds_deleteRows = [];
            }
            // 删除末级节点 且为二级项目时 修改父级节点的endflag
            if (gridParam[0].ENDFLAG == "1" && gridParam[0].LEVELS == "2") {
                let newData = $DS.util.childrenToList(gridInfo.ds_grid, "children", []);
                if (gridParam[0].optType && gridParam[0].optType == "inserted") {
                    delete gridParam[0].optType;
                } else {
                    gridParam[0].optType = "deleted";
                    gridInfo.ds_deleteRows.push(gridParam[0]);
                }

                let parentData = getParentProjForGrid(newData, gridParam[0].SUPERGUID);
                for (let i = 0; i < newData.length; i++) {
                    if (gridParam[0].GUID == newData[i].GUID) {
                        newData.splice(i, 1);
                        if (i !== 0) {
                            i--;
                        }
                        break;
                    }
                }
                for (let i = 0; i < newData.length; i++) {
                    if (parentData.GUID == newData[i].GUID && parentData.children.length == 1 && parentData.ENDFLAG == "0") {
                        newData[i].ENDFLAG = "1";
                        if (!newData[i].optType) {
                            newData[i].optType = "updated";
                            break;
                        }
                    }
                }
                for (let i = 0; i < newData.length; i++) {
                    if (newData[i].children) {
                        delete newData[i].children;
                    }
                }
                dealDelProjAndEXPFUNC(gridInfo.ds_deleteRows);
                gridInfo.ds_deleteRows = [];
                gridInfo.ds_grid = newData;
            } else {
                // 删除非末级节点 将子集一并删除
                if ((!gridParam[0].optType || gridParam[0].optType == "updated") && gridParam[0].children && gridParam[0].children.length > 0) {
                    for (let item of gridParam[0].children) {
                        item.optType = "deleted";
                        gridInfo.ds_deleteRows.push(item);
                    }
                }
                delete gridParam[0].children;
                gridParam[0].optType = "deleted";
                gridInfo.ds_deleteRows.push(gridParam[0]);
                for (let i = 0; i < gridData.length; i++) {
                    if (gridData[i].GUID == gridParam[0].GUID) {
                        gridData.splice(i, 1);
                    }
                }
                gridData = $DS.util.childrenToList(gridData, "children", []);
                for (let item of gridData) {
                    if (item.children) delete item.children
                }
                dealDelProjAndEXPFUNC(gridInfo.ds_deleteRows);
                gridInfo.ds_deleteRows = [];
                gridInfo.ds_grid = gridData;
            }
        }, "已取消删除")
    } else {
        alert("请选择要删除的数据!");
    }
}

//执行删除
function dealDelProjAndEXPFUNC(delData) {

    let ids = "";
    for (let i = 0; i < delData.length; i++) {
        if (i == delData.length - 1) {
            ids += `'${delData[i].GUID}'`
        } else {
            ids += `'${delData[i].GUID}',`
        }
    }
    let sql1 = `delete from ELE_PROJTOP where GUID in(${ids})`;
    let sql2 = `delete from RURAL_SET_PROJFUNC where SPFID in(${ids})`;
    let result = $DS.exeSqls(sql1 + ";" + sql2, VUECFG.appId);
    if (result && !result.isError) {
        alert("删除成功!")
    } else {
        alert("删除失败!");
        console.error(result.errMsg);
    }
}

//获取父级数据
function getParentProjForGrid(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].GUID == id) {
            return data[i];
        }
    }
}

// 保存科目范围
function saveProjByGrid() {

    let gridInfo = $DS.getCtrl("GRID_项目列表").info;
    let editRows = $grid.getEditRows(gridInfo.ds_id);
    let expfuncData = [];
    let projs = [];
    // editRows分类
    for (let key in editRows) {
        if (key == "deleted") {
            continue;
        }
        for (let i = 0; i < editRows[key].length; i++) {
            if (editRows[key][i].EXPFUNC_ID) {
                let expfunc = editRows[key][i].EXPFUNC_ID.split("/");
                for (let j = 0; j < expfunc.length; j++) {
                    let item = {
                        SPFID: editRows[key][i].GUID,
                        EXPFUNCID: expfunc[j],
                        // ADMDIV: $DS.getPms("USER_admdiv")
                    };
                    expfuncData.push(item);
                }
            }
            delete editRows[key][i].EXPFUNC;
            delete editRows[key][i].EXPFUNC_ID;
            projs.push("'" + editRows[key][i].GUID + "'");
        }
    }

    //保存 项目
    let result1 = $DS.saveAllTableData("ELE_PROJTOP", "GUID", editRows, VUECFG.appId);
    if (!result1 || (result1 && result1.isError)) {
        alert("保存失败!");
        console.error(result1.errMsg);
        return false;
    } else {
        //保存科目分类
        let strProjs = projs.join(",");
        let delSql = `delete from RURAL_SET_PROJFUNC where SPFID in (${strProjs})`;
        let delResult = $DS.exeSql(delSql, "", "", VUECFG.appId);
        if (!delResult || (delResult && delResult.isError)) {
            alert("保存科目范围失败!");
            console.error(delResult.errMsg);
            return false;
        } else {
            let saveExpfuncData = {updated: [], inserted: expfuncData, deleted: []};
            let result2 = $DS.saveAllTableData("RURAL_SET_PROJFUNC", "GUID", saveExpfuncData, VUECFG.appId);
            if (!result2 || (result2 && result2.isError)) {
                alert("保存科目范围失败!");
                console.error(result2.errMsg);
                return false;
            } else {
                alert("保存成功!");
            }
        }
    }
}

//设置功能科目
function setEXPFUNC() {

    let gridParam = $DS.getPms("gridParam");
    let gridInfo = $DS.getCtrl("GRID_项目列表").info;
    if (!gridParam || gridParam.length == 0) {
        alert("请选择分类!");
        return false;
    }
    let defaultCheckNodes = gridParam[0].EXPFUNC_ID;
    if (defaultCheckNodes) {
        defaultCheckNodes = defaultCheckNodes.split("/");
    }
    let data = $DS.getCtrl("TREE_支出功能科目").info.ds_tree;
    let cfg = {
        node_key: "ID",//必传
        props: {       //必传
            label: "NAME",//NAME
            children: "children",
        },
        default_checked_keys: defaultCheckNodes,
        check_strictly: true,
        show_checkbox: true,
        filterFields: ["NAME"]  //string|array  不传 默认取props label
    }
    $DS.openCfgTree(cfg, data, function (checkNodes) {

        let nodesName = "";
        let nodesKey = "";
        if (checkNodes && checkNodes.length > 0) {
            for (let i = 0; i < checkNodes.length; i++) {
                if (i == checkNodes.length - 1) {
                    nodesName += checkNodes[i].NAME;
                    nodesKey += checkNodes[i].ID;
                } else {
                    nodesName += checkNodes[i].NAME + "/";
                    nodesKey += checkNodes[i].ID + "/";
                }
            }
        }
        let newData = $DS.util.childrenToList($grid.getAllData(gridInfo.ds_id), "children", []);
        for (let i = 0; i < newData.length; i++) {
            delete newData[i].children;
            if (newData[i].GUID == gridParam[0].GUID) {
                newData[i].EXPFUNC = nodesName;
                newData[i].EXPFUNC_ID = nodesKey;
                if (!newData[i].optType) {
                    newData[i].optType = "updated";
                }
                break;
            }
        }
        $grid.clearCheckedNode(gridInfo.ds_id);
        gridInfo.ds_grid = newData;
    }, "50%", "90%", "设置科目限定范围")
}