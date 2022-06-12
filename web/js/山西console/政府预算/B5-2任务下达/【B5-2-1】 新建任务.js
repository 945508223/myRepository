var taskPageInfo = {
    taskTypeObj: {},
    taskMonthObj: {},
    taskTabInfo: $DS.util.clone($DS.getCtrl("TABS_区划任务列表").info.ds_tabs_editableTabs),
    taskType_HZObj: {},//任务横纵分类对象
    taskPeriodObj: {}//任务周期对象
};
initTaskType();

//任务表格加载完成后
function taskGridLoadAfter_ZYL(gridInfo) {
    var gridData = gridInfo.ds_grid;
    gridData.map(item => {
        //构建任务类型对象
        if (!taskPageInfo.taskTypeObj[item.TASKTYPE]) {
            taskPageInfo.taskTypeObj[item.TASKTYPE] = {};
        }
        taskPageInfo.taskTypeObj[item.TASKTYPE][item.TASKMONTH] = item;

        //构建任务月份对象
        if (!taskPageInfo.taskMonthObj[item.TASKMONTH]) {
            taskPageInfo.taskMonthObj[item.TASKMONTH] = {};
        }
        taskPageInfo.taskMonthObj[item.TASKMONTH][item.TASKNO] = item;
    });
}


//新增任务 点击新增按钮触发
function addTask_ZYL() {
    debugger
    var inputInfo = $DS.getCtrl("INPUT_搜索框").info;
    if (inputInfo.ds_input) {
        $input.setData(inputInfo.ds_id, "");
        $DS.loadCtrl("GRID_任务列表");
    }
    var taskGridInfo = $DS.getCtrl("GRID_任务列表").info;
    var nowData = formateDate2String(new Date(), "yyyy-MM-dd HH:mm:ss");
    var taskMonth = formateDate2String(new Date(), "yyyy-MM");
    if ($DS.getPms("USER_currentyear")) {
        taskMonth = $DS.getPms("USER_currentyear") + "-" + taskMonth.split("-")[1];
    }
    var taskNO = createTaskNO(taskMonth);
    var newTask = {
        optType: "inserted",
        TASKMONTH: taskMonth + "",//任务月份
        TASKNO: taskNO,//任务编号
        TASKNAME: "",//任务名称
        STARTDATE: nowData,//任务开始时间
        ENDDATE: nowData,//任务结束时间
        BUDGETLEVEL: $DS.getPms("USER_admdivlevel"),//任务所属级次
        TASKSTATUS: "0",//TASKSTATUS='0'可删除；可修改；其他状态不可编辑不可修改
        SUPERTASKID: "#",
        TASKADMDIV: $DS.getPms("USER_upadmdiv"),
        TASKADMDIVCODE: $DS.getPms("USER_upadmdiv"),
        TASKADMDIVNAME: $DS.getPms("USER_upadmdiv")
    };

    var gridData = $grid.getAllData(taskGridInfo.ds_id);
    if (!gridData) {
        gridData = []
    }
    //taskGridInfo.ds_grid.push(newTask);
    gridData.push(newTask);
    $grid.setData(taskGridInfo.ds_id, gridData);
    setButtonIsShow(newTask);
}

//生成任务编号
function createTaskNO(taskMonth) {
    debugger
    // var year = taskPageInfo.USER_FINYEAR;
    var gridData = $DS.getCtrl("GRID_任务列表").info.ds_grid;
    if (!gridData || gridData.length == 0) {
        //return year + "-" + taskMonth + "-001";
        return taskMonth + "-001";
    } else {
        var taskNoArr = [];
        for (let i = 0; i < gridData.length; i++) {
            if (gridData[i].TASKNO && gridData[i].TASKNO.split("-").length == 3) {
                taskNoArr.push(parseInt(gridData[i].TASKNO.split("-")[2]));
            }
        }

        var newTaskNoArr = taskNoArr.sort(function (a, b) {
            b - a
        });
        // var taskNo = newTaskNoArr[newTaskNoArr.length - 1] + 1 + "";
        var taskNo = newTaskNoArr[0] + 1 + "";
        if (taskNo.length == 1) {
            taskNo = "00" + taskNo;
        } else if (taskNo.length == 2) {
            taskNo = "0" + taskNo;
        }
        //  return year + "-" + taskMonth + "-" + taskNo;
        return taskMonth + "-" + taskNo;
    }
}


//表格数据变更事件校验
function checkEdit_ZYL(newValue, oldValue, scope, ctrlVm) {
    debugger
    var row = scope.row;
    var col = scope.column;
    switch (col.columnKey) {
        //修改任务编号
        case "TASKNO":
            // 根据任务采集周期校验任务编号 任务月份是否合法
            var flag = checkTaskPeriod(newValue, oldValue, scope, "TASKNO");
            if (flag == false) {
                scope.row.TASKNO = oldValue;
                return false;
            }

            if (newValue.split("-")[1] > 12) {
                alert("输入月份有误!");
                scope.row.TASKNO = oldValue;
                return
            } else {
                scope.row.TASKMONTH = newValue.split("-")[0] + "-" + newValue.split("-")[1]
            }

            break;
        //修改任务时间
        case "TASKMONTH" :
            let oldTaskMonth = oldValue//formateDate2String(new Date(oldValue), "yyyy-MM");
            let newTaskMonth = newValue//formateDate2String(new Date(newValue), "yyyy-MM");
            /* if (newValue.length != 2) {
                 alert("请输入正确的两位数月份!");
                 scope.row.TASKMONTH = oldTaskMonth;
                 return false;
             }
             if(parseInt(newValue)>12||parseInt(newValue)<1){
                 alert("请输入正确的两位数月份!");
                 scope.row.TASKMONTH = oldTaskMonth;
                 return false;
             }*/
            var flag = checkInputTaskMonth(newTaskMonth);
            if (!flag) {
                alert("输入格式有误:输入格式为xxxx-xx");
                scope.row.TASKMONTH = oldTaskMonth;
                return false;
            }
            //修改编码
            row.TASKNO = createTaskNO(newTaskMonth);

            if (row.TASKTYPE) {
                //校验新时间是否合法
                /*if (taskPageInfo.taskTypeObj[row.TASKTYPE] && taskPageInfo.taskTypeObj[row.TASKTYPE][newTaskMonth]) {
                    alert("当前分类下此月份已存在任务!");
                    scope.row.TASKMONTH = oldTaskMonth;
                    return false;
                }*/

                //合法 修改pageInfo
                if (!taskPageInfo.taskTypeObj[row.TASKTYPE]) {
                    taskPageInfo.taskTypeObj[row.TASKTYPE] = {};
                }

                delete taskPageInfo.taskTypeObj[row.TASKTYPE][oldTaskMonth];
                taskPageInfo.taskTypeObj[row.TASKTYPE][newTaskMonth] = row;

                if (!taskPageInfo.taskMonthObj[oldTaskMonth]) {
                    taskPageInfo.taskMonthObj[oldTaskMonth] = {}
                }

                delete taskPageInfo.taskMonthObj[oldTaskMonth][row.TASKTYPE];
                if (!taskPageInfo.taskMonthObj[newTaskMonth]) {
                    taskPageInfo.taskMonthObj[newTaskMonth] = {}
                }
                taskPageInfo.taskMonthObj[newTaskMonth][row.TASKTYPE] = row;
            }

            break;
        //修改任务类型
        case "TASKTYPE":
            let taskMonth = row.TASKMONTH;
            // 根据任务采集周期校验任务编号 任务月份是否合法
            var flag = checkTaskPeriod(newValue, oldValue, scope, "TASKTYPE");
            if (flag == false) {
                scope.row.TASKTYPE = oldValue;
                return false;
            }
            if (taskPageInfo.taskTypeObj[oldValue]) {
                delete taskPageInfo.taskTypeObj[oldValue][taskMonth];
            }
            if (!taskPageInfo.taskTypeObj[newValue]) {
                taskPageInfo.taskTypeObj[newValue] = {};
            }
            taskPageInfo.taskTypeObj[newValue][taskMonth] = row;


            if (!taskPageInfo.taskMonthObj[taskMonth]) {
                taskPageInfo.taskMonthObj[taskMonth] = {};
            }
            delete taskPageInfo.taskMonthObj[taskMonth][oldValue];
            taskPageInfo.taskMonthObj[taskMonth][newValue] = row;

            //修改编码
            //row.TASKNO = createTaskNO(taskMonth);
            break;
        //修改 开始时间 结束时间
        case "STARTDATE":
            if (row.ENDDATE) {
                var flag = bjDate(newValue, row.ENDDATE);
                if (!flag) {
                    alert("开始时间不得大于结束时间");
                    scope.row.STARTDATE = oldValue;
                    return false;
                }
            }

            break;
        case "ENDDATE":
            if (row.STARTDATE) {
                var flag = bjDate(row.STARTDATE, newValue);
                if (!flag) {
                    alert("开始时间不得大于结束时间");
                    scope.row.ENDDATE = oldValue;
                    return false;
                }
            }
            break;
    }
    //值变更 隐藏采集下发
    $DS.getCtrl("BUTTON_下达").info.ds_show = false;
}

function checkInputTaskMonth(val) {
    if (val.split("-").length != 2) {
        return false;
    }
    if (val.split("-")[0].length != 4) {
        return false;
    }
    if (val.split("-")[1].length != 2) {
        return false;
    }
    if (parseInt(val.split("-")[1]) > 12 || parseInt(val.split("-")[1]) < 1) {
        return false;
    }
    return true;
}


//下达任务
function downTask_ZYL() {
    debugger
    var taskGridInfo = $DS.getCtrl("GRID_任务列表").info;
    var selectTask = $grid.getData(taskGridInfo.ds_id);
    if (selectTask.length == 0) {
        alert("请选择任务!");
        return;
    }
    selectTask = selectTask[0];
    if (!selectTask.GUID || selectTask.optType == "inserted") {
        alert("请先保存任务!");
        return;
    }
    let url, title;
    let type = taskPageInfo.taskType_HZObj[selectTask.TASKTYPE];
    if (type == "H") {//横向
        url = $DS.util.getProjectName(VUECFG.appId) + "/freeForm/freeFromView.jsp?PAGEID=BB42C9CFC1804A17BC75D542B778ABD2&PAGETITLE=【5-2-1-2】任务下发处室设置&APPID=BMP"
        title = "任务下发处室"
    } else if (type == "V") {//纵向
        url = $DS.util.getProjectName(VUECFG.appId) + "/freeForm/freeFromView.jsp?PAGEID=B26C2F6ACDAC44EB83594B981131B6BE&PAGETITLE=【5-2-1-2】任务下发区划设置&APPID=BMP"
        title = "任务下发区划"
    }

    $DS.showPage(url, title, "65%", "80%");
}

/**
 * 终止任务
 */
function stopTask(isChild) {
    debugger
    var taskGridInfo = $DS.getCtrl("GRID_任务列表").info;
    var selectTask = $grid.getData(taskGridInfo.ds_id);
    if (selectTask.length == 0) {
        alert("请选择任务!");
        return;
    }
    selectTask = selectTask[0];
    if (!selectTask.GUID || selectTask.optType == "inserted") {
        alert("请先保存任务!");
        return;
    }
    //明细页面终止顶层任务 终止主任务
    if (isChild == true) {
        let res = fun_AllProStatusAndHistory_change('9', selectTask.GUID);
        if (!res || res.isError) {
            alert('终止失败');
            console.error(res.errMsg ? res.errMsg : '终止失败');
            return false;
        } else {
            alert('终止成功')
            return true;
        }
    } else {
        $DS.util.confirm(window.vm, '下级任务将全部终止,确认终止该任务', function () {
            debugger
            let res = fun_AllProStatusAndHistory_change('9', selectTask.GUID);
            if (!res || res.isError) {
                alert('终止失败');
                console.error(res.errMsg ? res.errMsg : '终止失败');
                return false;
            } else {
                alert('终止成功');
                return true;
            }
        }, selectTask, '已取消终止', '', $DS.util.getTopWin())
    }


    /* let url, title;
     let type = taskPageInfo.taskType_HZObj[selectTask.TASKTYPE];
     if (type == "H") {//横向
         url = $DS.util.getProjectName(VUECFG.appId) + "/freeForm/freeFromView.jsp?PAGEID=5086326A014B4245985F28A2F8D372C9&PAGETITLE=【A5-2-1-3】任务分配处室明细&APPID=BMP&type=stop"
         title = "任务下发处室"
     } else if (type == "V") {//纵向
         url = $DS.util.getProjectName(VUECFG.appId) + "/freeForm/freeFromView.jsp?PAGEID=8254C0D2BFB54FD09C7CFBF6D8BCA493&PAGETITLE=【5-2-1-1】任务分配区划明细&APPID=BMP&type=stop"
         title = "任务下发区划"
     }

     $DS.showPage(url, title, "65%", "80%");
 */
}


//保存任务
function saveTask_ZYL() {
    debugger
    // 校验数据
    var gridInfo = $DS.getCtrl("GRID_任务列表").info;
    //校验TASKTYPE是否为空
    let editorRow = $grid.getEditRows(gridInfo.ds_id);
    let errorRow = [];
    for (let key in editorRow) {
        if (key == "deleted") {
            continue
        } else {
            for (let row of editorRow[key]) {
                if (!row.TASKTYPE) {
                    errorRow.push(row.TASKNAME);
                }
            }
        }
    }

    if (errorRow.length > 0) {
        let errorNames = errorRow.join(",");
        alert(`【${errorNames}】填报任务分类为空!`);
        return;
    }

    //let insertRow = editorRow.inserted[0];
    //let result = $DS.saveTable(VUECFG.appId,'add',insertRow,"RURAL_TASK_INFO","GUID");

    let result = $DS.saveAllTableData("RURAL_TASK_INFO", "GUID", editorRow, VUECFG.appId);
    if (result.isError) {
        alert("保存失败");
        console.error(result.isError);
        return;
    } else {
        taskPageInfo.taskMonthObj = {};
        taskPageInfo.taskTypeObj = {};
        $DS.loadCtrl("GRID_任务列表");
        var btnNames = ["BUTTON_下达", "BUTTON_保存", "BUTTON_删除"];
        for (let i = 0; i < btnNames.length; i++) {
            $DS.getCtrl(btnNames[i]).info.ds_show = false;
        }
        alert("保存成功")
    }
}

//删除任务
function deleteTask() {
    debugger
    var taskGridInfo = $DS.getCtrl("GRID_任务列表").info;
    var selectTask = $grid.getData(taskGridInfo.ds_id);
    if (selectTask.length == 0) {
        alert("请选择要删除的任务!");
        return false;
    }
    selectTask = selectTask[0];
    //删除的时候判断明细表中的状态是不是都为1，如果是可以删除，如果不是则不能删除
    let detailStatu = getDetailStatus(selectTask);
    if (detailStatu == false) {
        return false;
    }
    if (selectTask.TASKSTATUS == "0" || selectTask.TASKSTATUS == "1") {
        $DS.util.confirm(vm, "您确认要删除【" + selectTask.TASKNAME + "】任务吗？", function () {
            var sqls = [];
            var sql1 = "delete from RURAL_TASK_INFO where GUID='" + selectTask.GUID + "'";
            var sql2 = "delete from RURAL_TASK_DETAIL where SUPERTASKID='" + selectTask.GUID + "'";
            sqls.push(sql1);
            sqls.push(sql2);
            $DS.exeSqls(sqls.join(";"));
            var result = $DS.exeSqls(sqls.join(";"));
            if (result.isError) {
                alert("删除任务失败！");
                return false;
            } else {
                $DS.clearTableSCache("RURAL_TASK_INFO,RURAL_TASK_DETAIL,RURAL_V_TASKDETAIL");
                alert("删除任务成功！");
                taskPageInfo.taskMonthObj = {};
                taskPageInfo.taskTypeObj = {};
                $DS.loadCtrl("GRID_任务列表");
                // var tabWin = $tabs.getSubWindow("TABS_区划任务列表", 1);
                // tabWin.$DS.loadCtrl("GRID_任务下达表格");
                $tabs.load($DS.getCtrl("TABS_区划任务列表").info.ds_id);
                var btnNames = ["BUTTON_下达", "BUTTON_保存", "BUTTON_删除"];
                for (let i = 0; i < btnNames.length; i++) {
                    $DS.getCtrl(btnNames[i]).info.ds_show = false;
                }
                return true;
            }
        });
    } else {
        alert("当前任务不可删除!");
        return;
    }
}

//判断明细状态
function getDetailStatus(selectTask) {
    let sql = `select GUID,TASKSTATUS FROM RURAL_TASK_DETAIL WHERE SUPERTASKID = '${selectTask.GUID}'`;
    var result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        let flag = result.result.every(item => item.TASKSTATUS == "1");
        alert("当前任务不允许删除")
        return flag;
    } else {
        alert("删除失败")
        console.error(result.errMsg ? result.errMsg : "获取任务明细状态失败")
        return false;
    }
    /* if (tabWin) {
         let grid = tabWin.$DS.getCtrl("GRID_任务下达表格").info;
         if (grid.ds_grid && grid.ds_grid.length > 0) {
             let gridData = $DS.util.childrenToList(grid.ds_grid, "children", []);
             return gridData.every(item => {
                 if (item.TASKSTATUS == "1" || item.TASKSTATUS == "0") {
                     return true
                 } else {
                     return false
                 }
             });
         } else {
             return true;
         }

     } else {
         alert("删除失败,获取任务明细失败");
         return false;
     }*/
}


//比较日期
function bjDate(start, end) {
    var date = new Date(start);
    var date1 = new Date(end);
    if (date.getTime() - date1.getTime() < 0) {
        return true;
    } else {
        return false;
    }
}

//表格行点击事件 触发tab页表格重新加载
function reloadTaskDetal(val) {
    debugger
    changeRightTabInfo_task(val.TASKTYPE);
    let tabInfo = $DS.getCtrl("TABS_区划任务列表").info;
    $tabs.load(tabInfo.ds_id);
    //控制按钮的显示
    setButtonIsShow(val);
}

//根据任务横纵类别设置tab页
function changeRightTabInfo_task(val) {

    let tabInfo = $DS.getCtrl("TABS_区划任务列表").info;
    let type = taskPageInfo.taskType_HZObj[val];
    if (type == "H") {//横向
        tabInfo.ds_tabs_editableTabs = taskPageInfo.taskTabInfo.filter(item => item.title == "下达处室");
        tabInfo.ds_tabs_editableTabsValue = "2"
    } else if (type == "V") {//纵向
        tabInfo.ds_tabs_editableTabs = taskPageInfo.taskTabInfo.filter(item => item.title == "下达区划")
        tabInfo.ds_tabs_editableTabsValue = "1"
    } else {
        tabInfo.ds_tabs_editableTabs = taskPageInfo.taskTabInfo;
    }
}


//控制按钮的显示
function setButtonIsShow(row) {

    var btnNames = ["BUTTON_下达", "BUTTON_保存", "BUTTON_删除"];
    if (row.GUID && row.TASKSTATUS != "0" && row.optType != "inserted") {
        $DS.getCtrl("BUTTON_终止").info.ds_show = true;
    } else {
        $DS.getCtrl("BUTTON_终止").info.ds_show = false;
    }

    //已下发数据 下发显示 保存显示 表格可编辑
    if (row.TASKSTATUS == "1") {
        for (let i = 0; i < btnNames.length; i++) {
            var btnInfo = $DS.getCtrl(btnNames[i]).info;
            btnInfo.ds_show = true;
        }
    }
    //新插入数据
    else if (row.optType == "inserted" || row.optType == "updated") {
        for (let i = 0; i < btnNames.length; i++) {
            var btnInfo = $DS.getCtrl(btnNames[i]).info;
            if (btnNames[i] == "BUTTON_下达") {
                btnInfo.ds_show = false;
            } else {
                btnInfo.ds_show = true;
            }
        }
    }
    //保存过但未下发的数据
    else if (row.GUID && row.TASKSTATUS == "0") {
        for (let i = 0; i < btnNames.length; i++) {
            for (let i = 0; i < btnNames.length; i++) {
                var btnInfo = $DS.getCtrl(btnNames[i]).info;
                btnInfo.ds_show = true;
            }
        }
    }
}


//查看详情
function showRemark() {
    let url = $DS.util.getProjectName(VUECFG.appId) + "/freeForm/freeFromView.jsp?PAGEID=5BECF2CE16144B8DA9FB4D7CE61FF706&PAGETITLE=任务描述&APPID=BMP"
    $DS.showPage(url, "任务描述", "50%", "85%")
}

/**
 * 初始化任务 横纵分类
 * @returns {{}}
 */
function initTaskType() {
    debugger
    let year = $DS.getPms("USER_CURRENTYEAR");
    let sql = `select GUID,TASKTYPE ,TASKPERIOD from RURAL_TASK_TYPE WHERE YEAR =${year}`;
    let result = $DS.selectBySql(VUECFG.appId, sql, "获取任务类别失败")
    if (result.isError) {
        console.error(result.errMsg);
        console.error("获取任务类别失败");
        return {};
    } else {
        let hzType = {};
        let PeriodType = {};
        for (let item of result.result) {
            hzType[item.GUID] = item.TASKTYPE;
            PeriodType[item.GUID] = item.TASKPERIOD;
        }
        taskPageInfo.taskType_HZObj = hzType;
        taskPageInfo.taskPeriodObj = PeriodType;
    }
}


/**
 *
 * @param newValue
 * @param oldValue
 * @param scope
 * @param ctrlVm
 */
function checkTaskPeriod(newValue, oldValue, scope, type) {
    //任务分类修改校验
    let periodObj = taskPageInfo.taskPeriodObj;
    if ((!periodObj[newValue] && type == "TASKTYPE") || (type == "TASKNO" && (!scope.row.TASKTYPE || !periodObj[scope.row.TASKTYPE]))) {
        return true;
    }
    let taskType = type == "TASKNO" ? scope.row.TASKTYPE : newValue;
    let taskNo = type == "TASKNO" ? newValue : scope.row.TASKNO;
    let period = type == "TASKNO" ? periodObj[scope.row.TASKTYPE] : periodObj[newValue];
    let taskYear = taskNo.split("-")[0];
    let taskMonth = taskNo.split("-")[1];
    let vm = window[$DS.getCtrl("GRID_任务列表").info.ds_id + "_gridRef"];
    let allData = vm.$refs.multipleTable.data;
    for (let row of allData) {
        if (!row.GUID || row.index == scope.row.index) {
            continue;
        }
        let havedYear = row.TASKNO.split("-")[0];
        let havedMonth = row.TASKNO.split("-")[1];
        //周期为年
        if (period == "Y") {
            if (havedYear == taskYear && row.TASKTYPE && row.TASKTYPE == taskType) {
                alert("当前年份此任务分类下已存在任务");
                return false;
            }
        }
        //周期为月
        else if (period == "M") {
            if (havedYear == taskYear && havedMonth == taskMonth && row.TASKTYPE && row.TASKTYPE == taskType) {
                alert("当前月份此任务分类下已存在任务");
                return false;
            }
        }
    }
    return true;
}


/**
 * 修改全省任务状态   添加数据到历史记录表
 * @param n
 * @returns {{isError}|*}
 */
function fun_AllProStatusAndHistory_change(n, superTaskId) {
    var result;

    //修改全省任务状态
    let sql = `update RURAL_TASK_DETAIL set TASKSTATUS = '${n}' where SUPERTASKID = '${superTaskId}'`;
    result = $DS.exeSql(sql);
    if (!result || result.isError) {
        return result;
    }
    //修改任务主表任务状态
    sql = `update RURAL_TASK_INFO set TASKSTATUS = '${n}' where GUID = ${superTaskId}`;
    result = $DS.exeSql(sql);
    if (!result || result.isError) {
        return result;
    }
    //增加历史表数据
    sql = `select * from RURAL_TASK_DETAIL where SUPERTASKID = '${superTaskId}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    result = result.result;
    var TB = [];
    for (let i = 0; i < result.length; i++) {
        var insertData = {
            TASKID: result[i].GUID,
            SUPERTASKID: result[i].SUPERTASKID || "",
            TASKSTATUS: result[i].TASKSTATUS || "",
            SUBDEPARTMENT: result[i].SUBDEPARTMENT || "",
            SUBUSER: result[i].SUBUSER || "",
            SUBMANAGER: result[i].SUBMANAGER || "",
            SUBDATE: result[i].SUBDATE ? $DS.util.timeFormate(new Date(strTimeForMT(result[i].SUBDATE)), "yyyy-MM-dd HH:mm:ss") : "",
            SUBADMDIVNAME: result[i].SUBADMDIVNAME || "",
            SUBDEPTMANAGER: result[i].SUBDEPTMANAGER || "",
            SUBREMARK: result[i].SUBREMARK || "",
            SUBREMARKBASE: result[i].SUBREMARKBASE || "",
            SUBREMARKYEAR: result[i].SUBREMARKYEAR || "",
            SUBREMARKOTHER: result[i].SUBREMARKOTHER || "",
            RETUENREMARK: result[i].RETUENREMARK || "",
            CREATE_TIME: $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss")
        }
        TB.push(insertData);
    }
    let data = {inserted: TB, updated: [], deleted: []}
    result = $DS.saveAllTableData("RURAL_TASK_HISTORY", "GUID", data, VUECFG.appId);

    clear_Cache();
    let tabInfo = $DS.getCtrl("TABS_区划任务列表").info;
    $tabs.load(tabInfo.ds_id);
    return result;

}


/**
 * 清理缓存事件
 */
function clear_Cache() {
    var Path = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(Path + "/sysconfig/frame/clearCache");
    //$DS.clearTableSCache("RURAL_TASK_INFO,RURAL_V_TASKDETAIL,RURAL_TASK_DETAIL,RURAL_V_TASKTREESJ,RURAL_V_TASKTREE,RURAL_V_TASKMONTHINFO");
}

/**
 *
 */
function strTimeForMT(str) {
    const finalTime = str.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', '')
    return new Date(finalTime).toString();
}


//
function initTaskTypeForMof() {

}
/**
 * 过滤任务分类
 */
function filterTaskTypeOptions(col) {
    debugger
    if(col.id=='TASKTYPE'){

    }
}
