let pageInfo_ = {
    admdivList: {},
    fieldArr: [
        'MOF_DIV_NAME',//区划名称
        'MOF_TOWN_CODE',//行政区划编码
        'MOF_TOWN_NAME',//单位名称
        'TOWNTYPE',//TOWNTYPE
        'TOWNNUM',//本年乡镇数
        'TOWNNUM1',//其中：乡
        'TOWNNUM2',//其中：镇
        'TOWNNUM4',//其中：街道
        'TOWNNUM5',//二、已建立乡镇国库的乡镇数
        'PERSON1',//乡镇财政供养人数
        'PERSON2',//1.财政统发工资人员人数
        'PERSON3',//2.统发外人员人数
        'PERSON_TOTAL1',//乡镇年末总人口（人）
        'PERSON_TOTAL2',//城镇人口（人）
        'PERSON_TOTAL3',//乡村人口（人）
        'VILLAGENUM',//五、行政区个数
        'COMMUNITYNUM',//六、社区个数
        'CADRENUM',//七、乡镇村两委干部人数
    ],
    townTypeArr: []
}
initAdmdivList();

//利用父页面区划树做导入时的对照
function initAdmdivList() {
    debugger
    try {
        let pCheckNode = parent.parent.$DS.getPms('ADMDIVTREE')[0];
        $DS.putPms('ADMDIVTREE', pCheckNode);
        $DS.putPms('P_ADMDIVCODE', pCheckNode ? pCheckNode.ITEMCODE.substr(0, 6) : '');

        let treeData = parent.parent.$DS.getCtrl('TREE_区划树').info.ds_tree;
        pageInfo_.admdivList = {};
        let arr = $DS.util.childrenToList(treeData, 'children', []);
        arr.forEach(item => pageInfo_.admdivList[item.ITEMNAME] = item);
    } catch (e) {
        console.error(e);
    }

}

//值变更校验
function checkInputVal_(val, scope, fuScope) {
    debugger
    if (val && scope.column.columnKey != 'MOF_TOWN_CODE' && scope.column.columnKey != 'MOF_TOWN_NAME' && scope.column.columnKey != 'TOWNTYPE') {
        if (isNaN(parseInt(val))) {
            scope.row[scope.column.columnKey] = fuScope.val;
            alert('请输入数字')
        }
    }
}

//按钮显示条件
function showCondition() {
    let checkNode = $DS.getPms('ADMDIVTREE');
    if (checkNode && checkNode.ITEMCODE && (checkNode.ITEMCODE.substr(checkNode.ITEMCODE.length - 3, checkNode.ITEMCODE.length) !== '000' || checkNode.ITEMNAME.indexOf('本级') != -1)) return true;
    return false;
}

//保存前校验
function beforeSaveData_() {
    debugger
    let info = $DS.getCtrl('GRID_数据列表').info;
    $grid.setEditRows(info.ds_id);
    let nullData = [];
    let errorData = [];
    for (let key in info.ds_editAllRows) {
        if (key == 'deleted') continue;
        for (let row of info.ds_editAllRows[key]) {
            if (!row.MOF_TOWN_CODE)
                if (row.MOF_TOWN_NAME)
                    nullData.push(`【${row.MOF_TOWN_NAME}】单位`);
                else
                    nullData.push(`【第${row.index + 1}行】`);
            //编码前6位不同
            if (row.MOF_TOWN_CODE.substr(0, 6) != $DS.getPms('P_ADMDIVCODE') || row.MOF_TOWN_CODE.length <= 6) {
                if (row.MOF_TOWN_NAME)
                    errorData.push(`【${row.MOF_TOWN_NAME}】单位`);
                else
                    errorData.push(`【第${row.index + 1}行】`);
            }
        }
    }
    if (nullData.length > 0) {
        alert(`${nullData.join("，")} 行政区划编码编码未填写`);
        return false;
    }
    if (errorData.length > 0) {
        alert(`${errorData.join("，")} 行政区划编码编码有误`);
        return false;
    }
}


//导入
function exportDataByExcel(data) {
    if (Object.keys(pageInfo_.admdivList).length == 0) {
        alert('导入失败');
        console.error('初始化区划树对象异常');
    }
    $DS.util.confirm(window.vm, '注意:请使用提供的模板进行导入,县名称为必填项', function () {
        debugger
        try {
            data = data[0];
            //先删后增加
            let saveData = {inserted: [], deleted: [], updated: []};
            for (let i = 2; i < data.length; i++) {
                let row = data[i];
                //县名称不存在跳过 或县名称最后为市的 或编码未填
                if (!row[0] || row[0][row[0].length - 1] == '市' || !row[1]) continue;
                //根据县名称获取区划编码
                row[0] = row[0].replace(/\s*/g, "");
                let MOF_DIV_CODE = pageInfo_.admdivList[row[0]] && pageInfo_.admdivList[row[0]].ITEMCODE ? pageInfo_.admdivList[row[0]].ITEMCODE : '';
                if (!MOF_DIV_CODE) continue;
                //校验编码  编码不存在或前六位为对应上跳过
                let pcode = MOF_DIV_CODE.substr(0, 6);
                if (!row[1] || pcode != row[1].replace(/\s*/g, "").substr(0, 6)||row[1].length<=6) continue;
                let newItem = {'MOF_DIV_CODE': MOF_DIV_CODE};
                for (let j = 0; j < pageInfo_.fieldArr.length; j++) {
                    let field = pageInfo_.fieldArr[j];
                    if (field == 'MOF_DIV_NAME' || field == 'MOF_TOWN_NAME' || field == 'TOWNTYPE') {
                        if (field == 'TOWNTYPE')
                            newItem[field] = row[j] && pageInfo_.townTypeArr.indexOf(row[j]) != -1 ? row[j] : '';
                        else
                            newItem[field] = row[j] ? row[j] : '';
                    } else {
                        newItem[field] = row[j] && !isNaN(parseInt(row[j])) ? parseInt(row[j]) + '' : '';
                    }
                }
                saveData.inserted.push(newItem);
                saveData.deleted.push(newItem);
            }
            let res = $DS.saveAllTableData('PM_T_TOWNBASE', 'MOF_TOWN_CODE', saveData, VUECFG.appId);
            if (res.isError) {
                alert('导入失败')
                console.error(res.errMsg ? res.errMsg : '保存失败')
            } else
                alert('导入成功')
        } catch (e) {
            console.error(e);
        }
    }, '已取消导入')

}


//表格加载完成事件
function loadAfterGrid_(info) {

    if (pageInfo_.townTypeArr.length == 0) {
        let townTypeOption = getColObj(info.ds_id)['TOWNTYPE'].options;
        pageInfo_.townTypeArr = townTypeOption.map(option => option.label);
    }
    let ref = window[info.ds_id + "_gridRef"];
    if (ref && ref.$refs.multipleTable)
        ref.$refs.multipleTable.clearSelection();
}
