//用户类型   财政:1,部门:0
var userType = $DS.pageParams["USER_UserType"];

//初始化 控制数据审核中 tab页显示 以及树根节点显示
function initY() {
    debugger
    //如果为部门用户
    if (userType == "0") {
        let tabId = new String("");
        for (let item in VUECFG.formObj)
            if (VUECFG.formObj[item]["type"] == "drag_tabs") {
                tabId = item;
                break;
            }
        if (!tabId) return true;
        let ctrlInfo = $DS.getCtrlById(tabId).info;
        ctrlInfo.ds_tabs_editableTabs = [ctrlInfo.ds_tabs_editableTabs[0],ctrlInfo.ds_tabs_editableTabs[1]];
        console.log(`tabCfg:${JSON.stringify(ctrlInfo.ds_tabs_editableTabs)}`);
    } else {
        //单位树添加根节点
        let tree = $DS.getCtrl('TREE_单位')
        if (tree) {
            tree.info.ds_tree_rootId = "AA"
            tree.info.ds_tree_rootText = "全部";//根节点名称,如果设置,添加根节点
        }
    }
}

initY()


/**
 * 获取ip
 */
function getIp__() {
    let cur = window.document.location.href;
    let pathname = window.document.location.pathname;
    let pos = cur.indexOf(pathname);
    return cur.substring(0, pos);
}

function getCtrlIdByType(ctrlType) {
    var ctrlArr = [];
    $("#dropArea .ds_ctrl").each(function () {
        var obj = $DS.getCtrlById(this.id);
        var type = $DS.getCtrlType(this.id);
        if (type == ctrlType) {
            ctrlArr.push(this.id)
        }
    })
    return ctrlArr;
}

//=======================================附件相关=======================================================================


//上传成功
function saveResultForSuccess() {
    debugger
    let treePms_ = $DS.getPms('agencyInfo');
    if (!treePms_ || !treePms_[0].ID) {
        alert('请选择单位');
        return false
    }
    let month = $DS.getPms('currentMonth');
    uploadFileSuccessWhenCheck(treePms_[0].ID, month, '1', val.response, val.file)
}


/**
 * 送审上传附件成功事件
 */
function uploadFileSuccessWhenCheck(agencyId, month, czlx, response) {
    debugger
    if (response.isError) {
        alert('上传失败!');
        return;
    }

    let result = $DS.saveTable(VUECFG.appId, 'add',
        {
            FILENAME: response.result.fileName,
            FILEPATH: response.result.fileUrl,
            AGENCYID: agencyId,
            MONTH: month,
            CZLX: czlx
        }, 'NY_FILEINFO', 'GUID');

    if (!result.isError) {
        alert('上传成功!')
    } else {
        alert('上传失败!' + result.errMsg);
    }
}


//考核指标通用调用
function chakanFile() {
    debugger
    let currentSumRow = $DS.getPms('SUM');
    let treePms_ = parent.$DS.getPms('treePms');
    let agency_ = currentSumRow?.[0]?.AGENCYID ? currentSumRow?.[0]?.AGENCYID : (treePms_ && !treePms_?.[0].children ? treePms_[0].ID : '');

    if (!agency_) {
        alert('请选择单位');
        return false
    }
    let month = $DS.getPms('month');

    viewFile_(agency_, month, $DS.getPms('URL_CZLX'))
}

/**
 * 查看附件
 * @param agencyId
 * @param month
 * @param czlx
 * @private
 */
function viewFile_(agencyId, month, czlx) {
    debugger
    let src = `${getProjectName()}/freeForm/freeFromView.jsp?PAGEID=0AD0B01B2F464758B8D33D17130B85D4&PAGETITLE=附件列表&APPID=BMP&agencyId=${agencyId}&month=${month}&czlx=${czlx}`
    let win = $DS.util.getTopWin('window');
    $DS.showPage(src, '附件列表', '70%', '75%', null, false, win);

}


//========================================考核指标 身份证号去重以及校验========================================================================
//身份证变更 校验是否已经填报过  ,并截取出生日期 以及 性别
function gridCellValueChangeEvent_(info, params) {
    debugger
    let col = params.scope.column.columnKey;
    let value = params.value;
    if (col != 'IDNO' || !value) {
        return true
    }
    if (value.length != '18') {
        alert('请输入正确的身份证号!');
        params.scope.row[col] = '';
        params.fuScope.row[col] = '';
        return
    }
    let tableName = $DS.getSourceById(info.ds_datasource).tableName;
    let sql = `select count(*) as CNT from ${tableName} where IDNO='${value}' and CZLX='${$DS.getPms('URL_CZLX')}' and YEAR = '${$DS.getPms('USER_currentyear')}'`;
    let cnt = $DS.selectBySql(VUECFG.appId, sql)?.result?.[0]?.CNT;
    let gridVm = $grid.getGridVmByName(info.ds_ctrlname);
    //表中没有 校验 新增的是否有
    if (!cnt || cnt == 0) {
        let person = gridVm.computed_data.find(row => row.IDNO == value && row.index != params.scope.$index);
        if (person)
            cnt = 1;
        else
            cnt = 0;
    }
    if (cnt && cnt > 0) {
        alert('该人员已录入!');
        params.scope.row[col] = '';
        params.fuScope.row[col] = '';
        return false;
    }
    //412931195706150719
    //截取出生日期 性别
    let birthday = value.substr(6, 8);
    let sex = value.substr(16, 1) % 2 == 0 ? '2' : '1';
    //XB BIRDAY
    if (gridVm.computed_columns.find(item => item.id == 'BIRDAY')) {
        params.scope.row.BIRDAY = `${birthday.substr(0, 4)}-${birthday.substr(4, 2)}-${birthday.substr(6, 2)} 00:00:00`;
    }
    if (gridVm.computed_columns.find(item => item.id == 'XB')) {
        params.scope.row.XB = sex;
    }
    return true;
}


//=======================================退回相关=======================================================================
/**
 * 编写退回说明
 * @param agencyId
 * @param month
 * @param CZLX
 */
function writeBackRemark(agencyId, month, CZLX, isView) {
    debugger
    let src = `${getProjectName()}/freeForm/freeFromView.jsp?PAGEID=067DF32E282040B1B614EC16AD21D2D2&PAGETITLE=退回说明&APPID=BMP&AGENCYID=${agencyId}&MONTH=${month}&CZLX=${CZLX}&isView=${isView}`
    $DS.showPage(src, '退回说明', '70%', '75%', null, false);
}

/**
 * 控制是否显示退回说明按钮
 * @param info
 * @param status
 */
function isShowBackRemarkBtn(info, status) {
    debugger
    if (status == '0') {
        let agency_ = parent.$DS.getPms('treePms')[0].ID;
        let month_ = $DS.getPms('month');
        let czlx_ = $DS.getPms('URL_CZLX');
        let sql = `select count(*) as CNT from TASK_HISTORY where AGENCYID ='${agency_}' AND MONTH = '${month_}' AND CZLX = '${czlx_}'`
        let cnt = $DS.selectBySql(VUECFG.appId, sql).result[0].CNT;
        if (cnt > 0) {
            info.ds_show = true
        } else {
            info.ds_show = false;
        }
    } else {
        info.ds_show = false;
    }

}

/**
 * 送审前 删除退回说明
 */
function beforeToSendCheck(agencyid, month, czlx) {
    debugger
    let sql = `delete from TASK_HISTORY where AGENCYID='${agencyid}' and MONTH='${month}' and CZLX='${czlx}'`
    $DS.exeSql(sql, null, null, VUECFG.appId)
}

//查看退回说明 点击汇总
function lookBackRemark(){
    debugger
    let treePms = parent.$DS.getPms('treePms');
    let currentSumRow = $DS.getPms('SUM');
    let agency_ = currentSumRow?.[0]?.AGENCYID ? currentSumRow?.[0]?.AGENCYID : (treePms && !treePms?.[0].children ? treePms[0].ID : '');
    if(!agency_){
        alert('请选择单位');
        return false;
    }
    let month_ = $DS.getPms('month');
    let czlx_ = $DS.getPms('URL_CZLX')
    writeBackRemark(agency_,month_,czlx_,true)
}

//=======================================导出相关=======================================================================\

function beforeExportExcel_() {
    debugger
    let iframeWin = $iframe.getSubWindow('IFRAME_列表');
    let sheet2 = iframeWin.$SP.getSheet(iframeWin.spread, 1)
    sheet2.visible(true);
    setTimeout(() => {
        sheet2.visible(false);
    })
}

/**
 * 增人增资导出
 * @param type
 */
function exportFileForAddPerson(type) {
    debugger
    let win = $iframe.getSubWindow('IFRAME_列表');
    let showName = $DS.getPms('agencyInfo')?.[0]?.NAME ? $DS.getPms('agencyInfo')[0].NAME : '';
    win.pageargs[0].reportname = `${type}-${showName}`;
    $DS.util.exportReportExcel('IFRAME_列表');
}


/**
 * 人员减少导出
 */
function exportFileForReducePerson(info) {
    debugger
    let showName = parent.$DS.getPms('agencyInfo')?.[0]?.NAME ? parent.$DS.getPms('agencyInfo')[0].NAME : '';
    info.ds_button_pubTableExportExt_fileName = `人员减少-${showName}`
}

/**
 * 指标考核导出 点击前修改导出文件名
 * @param type
 */
function exportFileForZBKH(czlx, info) {
    debugger
    let showName = parent.$DS.getPms('agencyInfo')?.[0]?.NAME ? parent.$DS.getPms('agencyInfo')[0].NAME : '';
    let sql = `SELECT ELE_NAME FROM ELE_UNION WHERE ELE_CATALOG_ID = 'ZBFL' AND ELE_CODE ='${czlx}'`;
    let catName = $DS.selectBySql(VUECFG.appId, sql)?.result?.[0]?.ELE_NAME || '';
    info.ds_button_pubTableExportExt_fileName = `${catName}-${showName}`
}

//=======================================导入相关=======================================================================


/**
 *  导入数据
 * @param data
 * @param type 类型
 */


/**
 *
 * @param data 解析后的数据
 * @param type 操作类型
 * @param startRow 开始解析的行索引
 * @param startCol 开始解析的列索引
 * @param ctrlName 表格控件名称
 * @private
 */
function importData__(data, type, startRow, startCol, ctrlName) {

    $DS.util.confirm(window.vm, `注意:请勿修改表头，并使用导出的模板进行导入，日期使用 / 分隔`, function () {
        debugger
        try {
            let topWin = $DS.util.getTopWin('window');
            switch (type) {
                case '人员新增':
                    let iframeWin = $iframe.getSubWindow('IFRAME_列表');
                    iframeWin.importData__addPerson();
                    break
                case '减少' :
                case '考核' :

                    topWin.$DS.loading(true);
                    importData_reduce(data, type, startRow, startCol, ctrlName);
                    topWin.$DS.loading(false);
                    break;
            }
        } catch (e) {
            if (type == '减少' || type == '考核') {
                topWin.$DS.loading(false);
            }
            alert('导入失败' + e);
        }

        return true;
    }, '已取消导入', null, function () {
        return false;
    })

}


/**
 * 人员减少 考核指标导入
 * @param data
 */
function importData_reduce(data, type, startRow, startCol, ctrlName) {
    debugger

    let gridInfo = $DS.getCtrl(ctrlName).info;
    let source = $DS.getSourceById(gridInfo.ds_datasource);
    let gridVm = $grid.getGridVmByName(ctrlName);
    //保存的数据
    let saveData = {inserted: [], updated: [], deleted: []};
    //有问题的数据
    let errorData = {
        index: [],//错误行index
        names: [],//已录入过的
    };
    let isFormula = $DS.util.getObjVal(temporary, ['gridCache', gridInfo.ds_id, 'isFormula']);
    if (data.length > 0 && data[0].length > startRow) {
        //解析第一个sheet页
        data = data[0];
        let listCols = $DS.util.childrenToList(gridVm.computed_columns, 'children', []);
        //不显示的列
        let hiddenCols = listCols.filter(col => col.fieldShowType == 'none' || col.fieldShowType == 'hidden' && !col.isTitle);
        //数据列
        let showCols = listCols.filter(col => col.fieldShowType != 'none' && col.fieldShowType != 'hidden' && !col.isTitle);
        outer:for (let row = startRow; row < data.length; row++) {
            let rowItem = data[row];
            let insertItem = {};

            for (let colIndex = 0; colIndex < showCols.length; colIndex++) {
                let col = showCols[colIndex];
                // 序号列 复选框列
                let val = rowItem[colIndex + startCol];
                val = formatterImportVal(val, col);
                insertItem[col.id] = val;
            }
            //设置隐藏的列默认值
            for (let hideCol of hiddenCols) {
                if (hideCol.defaultVal) {
                    insertItem[hideCol.id] = formatterImportVal('', hideCol);
                }
            }
            for(let field in insertItem){
                if(insertItem[field]==""||insertItem[field]==null||insertItem[field]==undefined){
                    delete insertItem[field]
                }
            }
            //身份证号 姓名为空
            if (!insertItem.IDNO || insertItem.IDNO.length != 18 || !insertItem.NAME) {
                errorData.index.push(row + 1)
            } else {
                //计算公式
                if (isFormula) {
                    let formula = $DS.getRowDataByFormula(VUECFG.appId, source.tableName, insertItem);
                    if (formula.isError) {
                        console.error(`计算公式失败:第${row + 1}行 ,` + formula.errMsg);
                    } else {
                        Object.assign(insertItem, formula.result);
                    }
                }
                //根据身份证设置出生日期 性别
                insertItem = getBirthday_sexByIDNO(insertItem,listCols);
                //特殊处理月份字段 计算公式后 补全日期长度 CYKHYFZYF CYKHYFQYF
                if(source.tableName=='INDI_T_PSKH'){
                    for (let field in insertItem) {
                        if (field == 'CYKHYFQYF' || field == 'CYKHYFZYF') {
                            let val_ = insertItem[field];
                            if (val_.split('/').length == 1) {
                                insertItem[field] = `${$DS.getPms('USER_currentyear')}-${val_}-01 00:00:00`
                            } else if (val_.split('/').length == 2 || val_.split('/').length == 3) {
                                insertItem[field] = `${$DS.getPms('USER_currentyear')}-${val_.split('/')[1]}-01 00:00:00`
                            }
                        }
                    }
                }

                saveData.inserted.push(insertItem);
            }
        }
        if (type == '减少' && saveData.inserted.length > 0) {
            saveData = getPersonid__(saveData);
        } else if (type == '考核') {
            //校验是否已经录入过
            errorData = checkData__(saveData, source.tableName, errorData);
        }
        console.log(saveData);
        let result = inbatchesSaveData_(source.tableName, 'GUID', saveData);
        if (result) {
            if (errorData.index.length > 0 || errorData.names.length > 0) {
                /*$DS.util.confirm(parent.window.vm, `请检查 ${errorData.join('，')} 行姓名或身份证号`, function () {

                }, `导入 ${errorData.join('，')} 行 失败`, '', function () {
                })*/
                //错误信息
                let errMsg = '';
                if (errorData.index.length > 0) {
                    errMsg = `请检查 ${errorData.index.join('，')} 行姓名或身份证号`
                }
                if (errorData.names.length > 0) {
                    errMsg += ` ${errorData.names.join('，')} 已录入,请勿重复操作`
                }

                if (type == '减少') {
                    parent.$DS.loadCtrl('IFRAME_列表');
                    parent.alert(errMsg)
                } else {
                    parent.$DS.loadCtrl('TABS_选项');
                    parent.alert(errMsg)
                }
            } else {
                if (type == '减少') {
                    parent.$DS.loadCtrl('IFRAME_列表')
                } else {
                    parent.$DS.loadCtrl('TABS_选项')
                }
                alert('导入成功');
            }
        }
    } else {
        alert('未解析到数据!');
    }
}


/**
 * 格式化
 * @param val
 * @param col
 */
function formatterImportVal(val, col) {
    // todo 引用 日期 数值 类型 当列遍历完后 最后处理 公式列
    //默认值
    if (col.defaultVal) {
        val = $DS.util.replace(col.defaultVal);
    } else if (!val) {
        return '';
    }
    //引用
    else if (col.fieldShowType = 'select' && col.fieldType == '006') {
        val = (val + '').trim();
        val = val + '';
        val = col.options.find(item => {
            //中文名称
            if (item.value == val) {
                return item;
            }
            if (item.label == val) {
                return item;
            }
            //编码-中文名
            if (val.split('-').length == 2 && (val.split('-')[1] == item.label || val.split('-')[0] == item.value)) {
                return item;
            }

        })?.value || '';
    } else if ((col.fieldShowType == 'date' || col.fieldType == '008') && val) {
        let len = val.split('/').length;
        if (col.date_formater == 'MM' && len == 1) {

        } else if (len == 1) {
            val = `${val}/01/01 00:00:00`
        } else if (len == 2) {
            val = `${val}/01 00:00:00`;
        } else if (len == 3) {
            val = `${val} 00:00:00`;
        }
        try {
            let date = new Date(val);
            if (date == 'Invalid Date') {
                console.error('日期格式错误' + val + '列:' + col);
                return '';
            }
        } catch (e) {
            console.error('日期格式错误' + val + '列:' + col);
            return '';
        }

        //TODO 校验日期
        //new Date(val)
    } else if (col.fieldType == '001' && val) {
        val = $DS.util.removeThousands(val + '');
        val = parseInt(val);
        $DS.util.removeThousands(val + '');
    } else if (col.fieldType == '002' && val) {
        val = $DS.util.removeThousands(val + '');
        val = parseFloat(val);
    } else if (val && col.fieldType == '003') {//字符型
        val = val.trim();
    }

    return val;
}


/**
 * 分批此执行保存
 * @param tableName
 * @param keyField
 * @param data {inserted:[],updated:[],deleted:[]}
 */
function inbatchesSaveData_(tableName, keyField, data) {
    //先执行删除
    let orderArr = ['deleted', 'updated', 'inserted'];
    //toto 如果是人员调入 获取 年中追加 根据身份证获取 人员唯一标识

    orderArr.forEach(key => {
        let saveData = {deleted: [], updated: [], inserted: []};
        let cnt = 0;
        while (data[key].length > 0) {
            saveData[key] = data[key].splice(0, 200);
            let result = saveAllTableData(tableName, keyField, saveData);
            if (result.isError) {
                console.error(`分批次导入失败:${key}-第${cnt}批`);
                alert("导入失败,请检查数据是否有误");
                return false;
            }
            cnt++;
        }
    })
    return true;
}


/**
 *
 * @param data
 * @private
 */
function getPersonid__(data) {

    let IDNOs = data.inserted.map(item => `'${item.IDNO}'`);
    if (IDNOs && IDNOs.length > 0) {
        let sql = `SELECT PERSONID,IDNO FROM NY_PERSONINFO WHERE IDNO IN(${IDNOs.join(',')})`;
        let persons = $DS.selectBySql(VUECFG.appId, sql).result;
        let no_idObj = {};
        persons.forEach(item => no_idObj[item.IDNO] = item.PERSONID);
        data.inserted.forEach(item => {
            item.PERSONID = no_idObj[item.IDNO]
        })
    }
    return data;
}


/**
 * 校验是否已经录入过
 * @param saveData
 * @param tabelName
 * @private
 */
function checkData__(saveData, tableName, errorData) {
    debugger
    if (saveData.inserted.length > 0) {

        let agencyId = parent.$DS.getPms('agencyInfo')[0].ID;
        let czlx = $DS.getPms('URL_CZLX');
        let year = $DS.getPms('USER_currentyear');
        let ids = saveData.inserted.map(person => `'${person.IDNO}'`);
        let sql = `select NAME ,IDNO FROM ${tableName} where IDNO IN (${ids.join(',')}) and CZLX ='${czlx}' and year ='${year}' and AGENCYID='${agencyId}'`;
        let result = $DS.selectBySql(VUECFG.appId, sql).result;
        if (result.length > 0) {
            errorData.names = result.map(item => item.NAME);
            let havedIds = result.map(item => item.IDNO);
            saveData.inserted = saveData.inserted.filter(item => !havedIds.includes(item.IDNO));
        }
    }

    return errorData
}

//根据身份证设置出生日期
function getBirthday_sexByIDNO(item,listCols){
    let value = item.IDNO;
    let birthday = value.substr(6, 8);
    let sex = value.substr(16, 1) % 2 == 0 ? '2' : '1';
    //XB BIRDAY
    if (listCols.find(item => item.id == 'BIRDAY')) {
        item.BIRDAY = `${birthday.substr(0, 4)}-${birthday.substr(4, 2)}-${birthday.substr(6, 2)} 00:00:00`;
    }
    if (listCols.find(item => item.id == 'XB')) {
        item.XB = sex;
    }
    return item;
}

//=========================人员调入 追加 离休调标 根据 由于编码变更 根据中文找对应新编码===============================================
function getNewCodeByPerson(newData,person) {
    debugger
    let fieldMap = {
        OLDJOB:'ZW',
        OLDJOBLEVEL:'JSDJLEVEL',
        OLDOPOSTGRAD:''

    }
    let fields = ['OLDJOB',];
}