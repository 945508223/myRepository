//预决算填报状态值域引用
var taskStatusObj = new Object();

//初始化
function init() {
    //初始化任务状态逻辑
    taskStatusObj = setTaskStatusObj();
}

init();

//时间线加载完成事件
function timeLine_complete(obj) {
    debugger
    //取审核流程
    let guid = $DS.getPms('gridPms')?.[0]?.GUID;
    if (guid) {
        let msgList = getMsgListbyBKeyvalue(guid);
        if (msgList && msgList.length > 0) {
            let userObj = getUserName(msgList);
            let timeLineMsgData = msgList.map(item => {
                return {
                    SUBSTATUS: item.MSGSTATUS,
                    REMARK: item.REMARK,
                    CREATE_USERNAME: userObj[item.SENDUSERID],
                    OPTDATE: strTimeForMT(item.SENDTITME)
                }
            })
            obj.ds_timeline_data = [...obj.ds_timeline_data, ...timeLineMsgData];
            obj.ds_timeline_data = sortData(obj.ds_timeline_data, 'OPTDATE', 'back')
        }
    }

    let newData = obj.ds_timeline_data.map(item => {
        item["SUBSTATUS"] = taskStatusObj[item["SUBSTATUS"]];
        item["content"] = configTimeLineStyle('content', item);
        return item;
    });

    obj.ds_timeline_data = newData;
}

/**
 *格式化数据库字段
 */
function strTimeForMT(str) {
    const finalTime = str.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', '')
    return finalTime;
}

function sortData(data, timeField, order) {
    if (order == "order") {
        return data.sort(function (a, b) {
            //这里的time要根据本身的数据来，后面的正则匹配也要根据自己数据来
            return Date.parse(a[timeField].replace(/-/g, "/")) - Date.parse(b[timeField].replace(/-/g, "/"));
        });
    } else if (order == "back") {
        return data.sort(function (a, b) {
            return Date.parse(b[timeField].replace(/-/g, "/")) - Date.parse(a[timeField].replace(/-/g, "/"));
        });
    }
}

/**
 * 获取用户名
 * @param msgList
 */
function getUserName(msgList) {
    let obj = {}
    let userIds = msgList.map(item => `'${item.SENDUSERID}'`);
    let sql = `select NAME,GUID from SSO_T_USERINFO where GUID in (${userIds.join(',')})`;
    let result = $DS.selectBySql('PORTAL', sql);
    if (result.isError) {
        console.error('获取用户名失败:' + result.errMsg);
    } else {
        result.result.forEach(item => {
            obj[item.GUID] = item.NAME;
        })

    }
    return obj;
}


//*用于查看审批流程
//*当业务实体对象存在多个流程的情况，取最后那个流程相关的消息列表
function getMsgListbyBKeyvalue(guid) {
    debugger;
    var result = YCDCommon.Ajax.syncAjax($DS.util.getProjectName(VUECFG.appId) + "/bpm/getMsgListbyBKeyvalue", {
        "bkeyval": guid,
        "bType": "GFA01"
    });
    if (result.isError) {
        alert(result.errMsg);
        return false;
    }
    return result.result;
}


//初始化任务状态逻辑
function setTaskStatusObj() {
    let tb = new Object();
    let sql = `select itemcode,itemname from dm_base_codes  where BASETYPE = 'GFASTATUS'`;
    let result = $DS.selectBySql(VUECFG.appId, sql);
    if (!result || result.isError || !result.result || result.result.length == 0) {
        console.error("查询任务状态失败!请检查");
        return false;
    }
    result = result.result;
    for (let i of result) {
        tb[i["ITEMCODE"]] = i["ITEMNAME"];
    }
    return tb;
}

/*
状态：${V.SUBSTATUS}<br>
操作人： ${V.CREATE_USERNAME}&nbsp;&nbsp;操作时间： ${V.OPTDATE}

* */

/**
 * 配置时间线
 * @param type
 * @param data
 * @returns {string|*}
 */
function configTimeLineStyle(type, data) {
    switch (type) {
        case 'color' :
            return getTimeLineNodeColor(data);
        case 'icon':
            return getTimeLineNodeIcon(data);
        case 'content':
            return getTimeLineNodeContent(data);
    }


    /**
     * 根据条件设置节点颜色
     * @param data
     */
    function getTimeLineNodeColor(data) {
        let conditionArr = [{
            condition: ['未填报'],
            color: 'rgba(222, 221, 93, 1)'
        }, {
            condition: ['开始填报', '送审', '填报公开表', '填报'],
            color: 'rgba(125, 196, 241, 1)'
        }, {
            condition: ['审核通过', '公开表确认', '已发布'],
            color: 'rgba(93, 228, 187, 1)'
        }, {
            condition: ['公开表取消确认', '取消发布','退回'],
            color: 'rgba(235, 129, 154, 1)'
        }];
        for (let cfg of conditionArr) {
            if (cfg.condition.includes(data.SUBSTATUS)) {
                return cfg.color;
            }
        }
        return 'rgba(90, 228, 148, 1)';
    }

    /**
     * 根据条件设置节点图标
     * @param data
     */
    function getTimeLineNodeIcon(data) {
        let conditionArr = [{
            condition: ['未填报'],
            icon: 'el-icon-loading'
        }, {
            condition: ['开始填报', '送审', '填报公开表', '填报'],
            icon: 'el-icon-edit-outline'
        }, {
            condition: ['审核通过', '公开表确认', '已发布'],
            icon: 'el-icon-finished'
        }, {
            condition: ['公开表取消确认', '取消发布'],
            icon: 'el-icon-warning'
        }, {
            condition: ['退回'],
            icon: 'el-icon-error'
        }];

        for (let cfg of conditionArr) {
            if (cfg.condition.includes(data.SUBSTATUS)) {
                return cfg.icon;
            }
        }
        return 'el-icon-edit-outline';
    }

    function getTimeLineNodeContent(data) {

        //显示查看详情的状态
        let showDetailCondition = ['退回'];
        if (data.REMARK) {
            data.content += '<br>说明:${V.REMARK}';
        }
        if (showDetailCondition.includes(data.SUBSTATUS)) {
            data.content += '<br> <a className="toPage"><span style="cursor: pointer;color:blue;" GUID="${V.GUID}" onClick="showDetail(this)" title="查看详情">&nbsp;查看详情</span></a>';
        }
        return data.content;
    }
}



//查看详情
function showDetail(dom) {
    let guid = $(dom).attr("GUID");
    parent.$DS.showPage(`${getProjectName()}freeForm/freeFromView.jsp?PAGEID=EFEFCB15319E472BA0E9483317D1837E&PAGETITLE=【G1-2-9-2】步骤内审核意见操作界面&APPID=BMP&GUID=${guid}&TYPE=HIS`, "查看详情", "95%", "95%");
}
