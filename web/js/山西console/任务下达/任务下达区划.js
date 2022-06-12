let taskGridInfo = parent.$DS.getCtrl("GRID_任务列表").info;
let selectTask = parent.$grid.getData(taskGridInfo.ds_id)[0];
let checkNodes = [];
let endNodeId = [];
let mapData = {}
var appname = parent.$DS.getPms("URL_APPNAME");//TX GOV EXEC

//根据appname初始化区划树数据源
function initAdmdivByAppName() {
    debugger
    let radioInfo = $DS.getCtrl('RADIO_区划').info;
    let info = $DS.getCtrl('TREE_区划树').info;
    if (appname == 'EXEC') {
        //设置财政数据源
        let source = $DS.getSource('数据源_财政区划');
        source.sourceGroup[info.ds_id] = info.ds_id;
        info.ds_datasource = source.sourceId;
        radioInfo.ds_radio = '2'
    } else {
        let source = $DS.getSource('数据源_区划');
        source.sourceGroup[info.ds_id] = info.ds_id;
        info.ds_datasource = source.sourceId;
        radioInfo.ds_radio = '1'
    }
}

initAdmdivByAppName();

//初始化树
function initTreeData_Task(info) {
    debugger
    let listTreeData = $DS.util.childrenToList(info.ds_tree, "children", []);
    let sql = `select * from RURAL_TASK_DETAIL where SUPERTASKID='${selectTask.GUID}'`;

    let res = $DS.selectBySql(VUECFG.appId, sql);
    if (res && !res.isError && res.result.length > 0) {
        res = res.result;
        let resId = res.map(item => item.TASKADMDIV);
        for (let i = 0; i < listTreeData.length; i++) {
            if (listTreeData[i].children) {
                delete listTreeData[i].children;
            }
            if (resId.indexOf(listTreeData[i].ID) !== -1) {
                listTreeData[i]["disabled"] = true;
                if (listTreeData[i].ENDFLAG == 1) {
                    endNodeId.push(listTreeData[i].ID);
                }
            }
        }
        info.ds_tree = $DS.util.children(listTreeData, "ID", "PID", "children");
        $tree.setCheckedNodes(info.ds_id, endNodeId);
        let halfKeys = window.top[info.ds_id + "treeRef"].getHalfCheckedKeys() ? window.top[info.ds_id + "treeRef"].getHalfCheckedKeys() : [];
        let checkKeys = window.top[info.ds_id + "treeRef"].getCheckedKeys() ? window.top[info.ds_id + "treeRef"].getCheckedKeys() : [];
        checkNodes = halfKeys.concat(checkKeys);
    }
}


function sureDownTask() {
    debugger
    var saveData = [];
    let treeInfo = $DS.getCtrl("TREE_区划树").info;
    let selectRes = $tree.getCheckedNodes(treeInfo.ds_id);
    let halfRes = window.top[treeInfo.ds_id + "treeRef"].getHalfCheckedNodes();
    selectRes = selectRes.concat(halfRes);
    selectRes = selectRes.filter(item => checkNodes.indexOf(item.GUID) == -1);
    if (selectRes.length == 0) {
        $DS.util.close();
        return;
    }
    for (let i = 0; i < selectRes.length; i++) {

        let newItem = {};
        newItem["ADMDIV"] = $DS.getPms('USER_admdiv');
        newItem["TASKADMDIV"] = selectRes[i].GUID;
        newItem["TASKADMDIVCODE"] = selectRes[i].ITEMCODE;
        newItem["TASKADMDIVNAME"] = selectRes[i].ITEMNAME;
        newItem["SUPERTASKID"] = selectTask.GUID;
        newItem["TASKSTATUS"] = "1";//selectTask.TASKSTATUS;
        newItem["TASKMONTH"] = selectTask.TASKMONTH;
        newItem["TASKNO"] = selectTask.TASKNO + "-" + selectRes[i].ITEMCODE;
        newItem["TASKNAME"] = selectTask.TASKNAME;
        newItem["TASKTYPE"] = selectTask.TASKTYPE;
        newItem["STARTDATE"] = selectTask.STARTDATE;
        newItem["ENDDATE"] = selectTask.ENDDATE;
        newItem["BUDGETLEVEL"] = selectTask.BUDGETLEVEL;//任务级次
        newItem["TASKDOWNDATE"] = selectTask["TASKDOWNDATE"];
        newItem["SUPERADMDIV"] = $DS.getPms("USER_admdiv");//selectTask.GUID//;
        saveData.push(newItem);
    }

    var _saveData = {inserted: saveData, deleted: [], updated: []};
    var saveRes = $DS.saveAllTableData("RURAL_TASK_DETAIL", "TASKADMDIV", _saveData, VUECFG.appId);
    if (saveRes.isError) {
        alert("下达任务失败!");
    } else {
        //保存任务表
        var taskData = {inserted: [], deleted: [], updated: []};
        if (selectTask.optType == "inserted") {
            taskData.inserted.push(selectTask);
        } else if (selectTask["TASKSTATUS"] == "0") {
            //修改状态 添加下发时间
            let task = {
                TASKSTATUS: '1',
                GUID: selectTask.GUID,
                TASKDOWNDATE: formateDate2String(new Date(), "yyyy-MM-dd HH:mm:ss")
            }
            taskData.updated.push(task);
        }
        var saveTaskRes = $DS.saveAllTableData("RURAL_TASK_INFO", "GUID", taskData, VUECFG.appId);
        if (saveTaskRes.isError) {
            alert("下达任务失败!");
        } else {
            //发送通知
            debugger
            var str
            for (let i = 0; i < selectRes.length; i++) {
                if (selectRes[i].children) {
                    continue
                }
                str += sendMsgTip(selectRes[i])
            }
            str = str ? `注意:【${str}】发送通知失败!` : ""
            console.log(str)
            $DS.getCtrl("BUTTON_确定").info.ds_show = false;
            //清除缓存
            $DS.clearTableSCache("RURAL_TASK_INFO,RURAL_TASK_DETAIL,RURAL_V_TASKDETAIL")
            parent.$DS.loadCtrl("GRID_任务列表");
            let detelWin = parent.$tabs.getSubWindow("TABS_区划任务列表", 1);
            detelWin.$DS.loadCtrl("GRID_任务下达表格");
            parent.taskPageInfo.taskTypeObj = {};
            parent.taskPageInfo.taskMonthObj = {};
            $DS.util.close();
            parent.alert("下达任务成功!");

        }
    }
}

//清空全选
function clearAll_TASK() {
    let treeInfo = $DS.getCtrl("TREE_区划树").info;
    $tree.setCheckedNodes(treeInfo.ds_id, []);
}

//全选
function selectAll_TASK() {
    let treeInfo = $DS.getCtrl("TREE_区划树").info;
    $tree.setCheckedNodes(treeInfo.ds_id, [treeInfo.ds_tree[0].ID]);
}


function inverseAdmdivTree() {
    let treeInfo = $DS.getCtrl("TREE_区划树").info;
    let treeRef = window.top[treeInfo.ds_id + "treeRef"];
    let nodes = treeRef.getCheckedNodes(true, true);
    let allData = $DS.util.childrenToList(treeRef.data, "children", []);

    batchSelect(allData, treeRef, true, nodes);
}

function batchSelect(nodes, refs, flag, seleteds) {
    if (typeof nodes != "undefined") {
        nodes.forEach(element => {
            refs.setChecked(element, flag, true);
        });
    }

    if (typeof seleteds != "undefined") {
        seleteds.forEach(node => {
            refs.setChecked(node, !flag, true);
        });
    }
}

/**
 * 发送消息
 * @param selectRes
 */
function sendMsgTip(selectRes) {
    debugger
    if (appname == "GOV") {//政府预算
        var receiveMenuid = "006003002";
        var url = "F4C9F8FFC8A141798DA4EF4B3342DC10,F28DE3A8041E428896F9C4F60DEA300D";
        var bType = "BMP_GOV";
    } else {//三保预算
        //var receiveMenuid="005006003"
        var receiveMenuid = "005005001"
        var url = "27A1E9FC727C4DCDA0D99E134C217613,FB16EE42DFF1424EA06D796E766E8931";
        var bType = "BMP_TX";
    }
    var newSelect = [];
    var errArr = [];
    var info = $DS.getCtrl("TREE_区划树").info;
    let saveTreeData = $DS.util.childrenToList(info.ds_tree, "children", [])
    for (let i = 0; i < saveTreeData.length; i++) {
        if (saveTreeData[i].children) {
            delete saveTreeData[i].children;
        }
        mapData[saveTreeData[i].GUID] = saveTreeData[i];
    }
    //记录新选中
    if (selectRes.ENDFLAG == 1) {
        newSelect.push(selectRes.GUID);
    }
    //发送消息
    var result = $DS.massage.sendUserMsg(VUECFG.appId, {
        msgTitle: `[已下发]` + selectTask.TASKNAME + ",请及时填写",//消息标题>任务名称
        msgType: "BMSG",//消息类型
        msgContent: selectTask.REMARK,//消息内容
        //msgStatus:"0",//消息状态
        //msgGroup:$DS.util.getGuid(),//消息分组
        appId: VUECFG.appId,//appId
        receiveMenuId: receiveMenuid,//消息接收菜单ID
        receiveADMDIV: selectRes.ID,//消息接收区划
        receiveUserType: "1",//接收用户类型
        url: url,//三保预算审核,数据编制
        bKeyValue: selectTask.GUID,//业务ID
        bType: bType,//消息业务类型
        //sendUserId:$DS.getPms("USER_MID"),//消息发送人
        //sendADMDIV:$DS.getPms("USER_agency"),//消息发送人所在单位
        //saveType:"add"//保存类型
    }, `【${selectRes.ITEMNAME}】发送通知失败!`)
    mapData[selectRes.GUID].disabled = true;
    if (result.isError) {
        mapData[selectRes.GUID].statuIcon = "el-icon-circle-close";
        mapData[selectRes.GUID].statuColor = "red";
        mapData[selectRes.GUID].statuText = "通知失败";
        errArr.push(selectRes.ITEMNAME)

    } else {
        mapData[selectRes.GUID].statuIcon = "el-icon-circle-check";
        mapData[selectRes.GUID].statuColor = "green";
        mapData[selectRes.GUID].statuText = "已通知";
    }
    $tree.setCheckedNodes(info.ds_id, newSelect.concat(endNodeId));
    info.ds_tree = $DS.util.children(Object.values(mapData), "ID", "PID", "children");
    return errArr.join(",")
}

/**
 * 获取树节点html
 * @return {string}
 */
function getTempHtmlForTree() {
    return `h('span', {class: data[info.ds_tree_iconField] ? data[info.ds_tree_iconField] : ""}, [
        h('span', [
            h('span', {
                domProps: {
                    innerHTML: node.label,
                },
                style: {
                    fontSize: info.ds_tree_node_fontsize,
                    color: info.ds_tree_node_color,
                    fontFamily: info.ds_tree_node_fontfamily,
                    fontWeight: info.ds_tree_node_fontWeight,
                }
            }),
            h('span',{class:'oper'},[
                h('span',{class:data.statuIcon?data.statuIcon:"",
                    domProps: {
                        innerHTML: data.statuText?data.statuText:"",
                    },
                    style: {
                        marginLeft:"1rem",
                        color:data.statuColor?data.statuColor:"",
                        fontSize:"1rem"
                    }
                })
            ])
        ])
    ])`
}

//----------------------------------------------
//切换区划
function changeAdmdivSource(val) {
    debugger
    let source;
    let treeInfo = $DS.getCtrl('TREE_区划树').info;
    //行政区划
    if (val == '1') {
        source = $DS.getSource('数据源_区划');
    }
    //财政区划
    else if (val == '2') {
        source = $DS.getSource('数据源_财政区划');
    }
    treeInfo.ds_datasource = source.sourceId;
    source.sourceGroup[treeInfo.ds_id] = treeInfo.ds_id;
    $DS.loadCtrl('TREE_区划树');
}


