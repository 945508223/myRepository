//页面脚本v
var taskPageInfo = {
    USER_FINYEAR: $DS.getPms("USER_FINYEAR"),
    taskTypeObj: {},
    taskMonthObj: {}
};

//任务表格加载完成后 todo 将相同的任务采集分类一个月份上只能建立
function taskGridLoadAfter_ZYL(gridInfo) {
    var gridData = gridInfo.ds_grid;
    gridData.map(item => {
        //  var date = new Date(item.TASKMONTH);
        //  item.TASKMONTH = formateDate2String(date, "yyyy-MM");
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
    var year = taskPageInfo.USER_FINYEAR;
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
        var taskNo = newTaskNoArr[newTaskNoArr.length - 1] + 1 + "";
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
function checkEdit_ZYL(newValue, oldValue, scope) {
    debugger
    var row = scope.row;
    var col = scope.column;
    switch (col.columnKey) {
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
            if(!flag){
                alert("输入格式有误:输入格式为xxxx-xx");
                scope.row.TASKMONTH = oldTaskMonth;
                return false;
            }
            //修改编码
            row.TASKNO = createTaskNO(newTaskMonth);

            if (row.TASKTYPE) {
                //校验新时间是否合法
                if (taskPageInfo.taskTypeObj[row.TASKTYPE] && taskPageInfo.taskTypeObj[row.TASKTYPE][newTaskMonth]) {
                    alert("当前分类下此月份已存在任务!");
                    scope.row.TASKMONTH = oldTaskMonth;
                    return false;
                }


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
            let taskMonth = row.TASKMONTH//formateDate2String(new Date(row.TASKMONTH), "yyyy-MM");
            if (taskPageInfo.taskTypeObj[newValue] && taskPageInfo.taskTypeObj[newValue][taskMonth]) {
                alert("当前分类下此月份已存在任务!");
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
    if(val.split("-").length!=2){
        return false;
    }
    if(val.split("-")[0].length!=4){
        return false;
    }
    if(val.split("-")[1].length!=2){
        return false;
    }
    if(parseInt(val.split("-")[1])>12||parseInt(val.split("-")[1])<1){
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
    if (selectTask.TASKSTATUS == "1") {
        alert("该任务已下达!");
        return;
    }
    let url = $DS.util.getProjectName() + "/freeForm/freeFromView.jsp?PAGEID=B26C2F6ACDAC44EB83594B981131B6BE&PAGETITLE=【5-2-1-2】任务下发设置&APPID=BMP"
    $DS.showPage(url, "填报下发", "50%", "70%");
}


//保存任务
function saveTask_ZYL() {
    debugger
    //todo 校验数据
    // 相同的任务采集分类一个月份上只能建立一个
    var gridInfo = $DS.getCtrl("GRID_任务列表").info;
    $grid.save(gridInfo.ds_id);
    taskPageInfo.taskMonthObj = {};
    taskPageInfo.taskTypeObj = {};
    $DS.loadCtrl("GRID_任务列表");
    var btnNames = ["BUTTON_下达", "BUTTON_保存", "BUTTON_删除"];
    for (let i = 0; i < btnNames.length; i++) {
        $DS.getCtrl(btnNames[i]).info.ds_show = false;
    }
}

//删除任务
function deleteTask() {
    var taskGridInfo = $DS.getCtrl("GRID_任务列表").info;
    var selectTask = $grid.getData(taskGridInfo.ds_id);
    if (selectTask.length == 0) {
        alert("请选择要删除的任务!");
        return;
    }
    selectTask = selectTask[0];
    if (selectTask.TASKSTATUS == "1") {
        alert("当前任务不可删除!");
        return;
    }

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
            var tabWin = $tabs.getSubWindow("TABS_区划任务列表", 1);
            tabWin.$DS.loadCtrl("GRID_任务下达表格");
            var btnNames = ["BUTTON_下达", "BUTTON_保存", "BUTTON_删除"];
            for (let i = 0; i < btnNames.length; i++) {
                $DS.getCtrl(btnNames[i]).info.ds_show = false;
            }
            return true;
        }
    });
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

    var detalWin = $tabs.getSubWindow("TABS_区划任务列表", 1);
    detalWin.$DS.putPms("SUPERTASKID", val);
    detalWin.$DS.loadCtrl("GRID_任务下达表格");
    //控制按钮的显示
    setButtonIsShow(val);
}

//控制按钮的显示
function setButtonIsShow(row) {
    debugger

    var btnNames = ["BUTTON_下达", "BUTTON_保存", "BUTTON_删除"];
    //已下发数据 不显示
    if (row.TASKSTATUS == "1") {
        for (let i = 0; i < btnNames.length; i++) {
            var btnInfo = $DS.getCtrl(btnNames[i]).info;
            btnInfo.ds_show = false;
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