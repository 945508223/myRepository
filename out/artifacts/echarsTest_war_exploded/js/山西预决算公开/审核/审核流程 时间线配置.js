let subStatus = $DS.getPms("URL_SUBSTATUS");//ALL | 1待审 | 2已审
let P_AGENCY = parent.$DS.getPms("P_AGENCY")[0] || {};

//当前年度
var year = $DS.getPms("USER_CURRENTYEAR") || new Date().getFullYear();
//预决算填报状态值域引用
var taskStatusObj = new Object();

//初始化
function init() {
    debugger
    //初始化任务状态逻辑
    taskStatusObj = setTaskStatusObj();
    //过滤条件
    let filter = new String();
    if (subStatus == "ALL") {
        filter = `SUBSTATUS in ('1','2')`;
    } else
        filter = `SUBSTATUS='${subStatus}'`;
    $DS.putPms("dataSourceFilter", filter);
    if (P_AGENCY["ADMDIV"])
        $DS.putPms("ADMDIV", P_AGENCY["ADMDIV"]);
    if (P_AGENCY["GUID"])
        $DS.putPms("AGENCYID", P_AGENCY["GUID"]);
    $DS.putPms('filterCondition', parent.$DS.getPms('filterCondition'))
}

init();

//审核按钮点击事件
function btn_examine_click() {
    let gridPms = $DS.getPms("gridPms");
    if (!gridPms) {
        alert("请选择具体内容!");
        return false;
    }
    let taskId = gridPms[0]["GUID"];
    let gridVal = $DS.getPms("gridPms") ? $DS.getPms("gridPms")[0] : {};
    getPdfViewPageCfg(gridVal["GUID"], gridVal["AGENCYID"], gridVal["REPORTTEMPLET"], gridVal["AGENCYNAME"]);
    parent.$DS.showPage(`freeFromView.jsp?PAGEID=93A14F0DD942457A8A291D886A498318&PAGETITLE=【G1-2-9】审核操作页面步骤条&APPID=BMP&TASKID=${taskId}`, `报告审核`, "95%", "95%");
}

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

//查看报告点击事件
function ckbg(event) {
    let guid = $(event).attr("guid");
    let AGENCYID = $(event).attr("AGENCYID");
    let REPORTTEMPLET = $(event).attr("REPORTTEMPLET");
    let AGENCYNAME = $(event).attr("AGENCYNAME");
    getPdfViewPageCfg(guid, AGENCYID, REPORTTEMPLET, AGENCYNAME);

    parent.$DS.showPage(`/bmp_gfa/pdfDesigner/pdf.jsp`, "报告", "95%", "95%");
}

/**
 *  获取PDF配置
 */
function getPdfViewPageCfg(taskid, agencyId, reportTemplet, AGENCYNAME) {
    debugger
    var sql = `select REPORTLIMIT,TABLELIMIT from GFA_REPORT_TEMPLET where GFACAT='${reportTemplet}' and REPORTTYPE='P'`
    var res = $DS.selectBySql(VUECFG.appId, sql)
    $DS.dealRes(res, function (result) {
        debugger
        if (result && result.length > 0) {
            result = result[0]
            //{"title":"2","header":"1","footer":"3","isShowPageNumber":true,"pageNumberStar":"2"}
            var reportLimit = JSON.parse(result.REPORTLIMIT)
            //["T|A2421F1D4C494CCA9786E83A65F93DB5,71F98F161A77461F988BA831BA62ACDF,44D7170E4D6A47F8ADBBF58D82735FC0,D63F7C211C0E45618F09347B81226CB7","T|7F47E120F96047E9B325E623E796E6E2","R|B83E241224A94A77B1864ECD292536C7|R,FF53BE3CCB6B47718805F70C5653AD64|R,DF5608F9E1C741BA9F19830FB20C97A3|R,4C8A0FAC0DFF4F4C9515E7554CD22D8D|R,B73A9C73777541C7BD10BB68223D6118|R,CFFA1ABBF6C84297AB99A7BB1D4A8CB7|R,15B4DB6360DB4260B1EECE22CC313BDB|R,997472639FD94947B3AA1466F7783BFB|R,EAACCD94AB444E44A6FD3F6DA3F411C5|PT"]
            var tableLimit = JSON.parse(result.TABLELIMIT)
            var obj = {
                pdfName: reportLimit.title,
                pdfCfg: {
                    isCir: "true",//是否循环每页都展示如上内容
                    headerText: reportLimit.header,
                    headerPos: reportLimit.headerPosition,//left/right/center
                    footerText: reportLimit.footer,
                    footerPos: "left",//left?right/center
                    PageNumPos: reportLimit.pageNumPosition,//left/center/right
                    showPageNumCss: reportLimit.pageNum,//页数表达式:第${PAGENUM}页/共${PAGETOTAL}页
                    fromNumOfHeader: reportLimit.headerStart, //页眉从第几页开始写
                    fromNumOfFooter: "", //页脚从第几页开始写
                    fromNumOfPageNum: reportLimit.pageNumStart, //页码从第几页开始写
                },
                pageArr: [],
                pageHtml: ""
            }
            for (let item of tableLimit) {
                var str = "";
                if (item && item.indexOf("T|") == 0 || item && item.indexOf("C|") == 0 || item && item.indexOf("D|") == 0) {//报告
                    str = item.substring(2);
                    var ids = str.split(",");
                    ids.map(function (id) {
                        obj.pageArr.push({
                            pageId: id,
                            PAGE: "WORD",
                            TASKID: taskid,
                            AGENCYNAME: AGENCYNAME
                        })
                    })
                } else if (item && item.indexOf("R|") == 0) {
                    str = item.substring(2);
                    var arrs = str.split(",");
                    arrs.map(function (arr) {
                        arr = arr.split("|")
                        if (arr[1] == "R") {
                            obj.pageArr.push({
                                GUID: arr[0],
                                PAGE: "EXCEL",
                                PARAMS: {
                                    TASKID: taskid,
                                    YEAR: year,
                                    updivid: agencyId,
                                    CACHETABLENAME: 'DM_DOC_PAGECACHE',
                                    CACHETABLEKEYFIELDS: 'REPORTID,TASKID,YEAR',
                                    CLOBFIELDNAME: 'HTMLSTR',
                                    REPORTID: arr[0]
                                }
                            })
                        }
                    })
                }
            }

            var htmlRes = $DS.getClob('BMP', 'GFA_REPORT_PDF2HTML', 'TASKID', taskid, 'HTMLCLOB')
            $DS.dealRes(htmlRes, function (htmlResult) {
                obj.pageHtml = htmlResult;
            })

            $DS.randerPdf(obj.pdfName, obj.pageArr, obj.pdfCfg, obj.pageHtml)
        }
    })
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
            condition: ['公开表取消确认', '取消发布', '退回'],
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
    parent.$DS.showPage(`${getProjectName()}/freeForm/freeFromView.jsp?PAGEID=EFEFCB15319E472BA0E9483317D1837E&PAGETITLE=【G1-2-9-2】步骤内审核意见操作界面&APPID=BMP&GUID=${guid}&TYPE=HIS`, "查看详情", "70%", "95%");
}

/**
 * 表格加载完成 取交集 过滤
 * @param obj
 */
function loadSuccess_grid(obj) {
    debugger
    if (obj.ds_grid?.length > 0) {
        let toDoList = querytTodoList(subStatus);
        if (!toDoList || toDoList.length == 0) {
            obj.ds_grid = [];
        } else {
            let todoKeyList = toDoList.map(item => item.BKEYVALUE);
            obj.ds_grid = obj.ds_grid.filter(row => todoKeyList.indexOf(row.GUID));
        }
    }
}


function querytTodoList(subStatus) {
    debugger;
    let type;
    //取待审核列表
    switch (subStatus) {
        case 'ALL':
            type = 'all';
            break;
        case '1':
            type = 'unfinished';
            break;
        case '2':
            type = 'finished';
            break;
    }

    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/bpm/findTaskList", {
        "type": type,  //查询类型 all/unfinished/finished/reject
        "bType": "GFA01"
    });
    if (result.isError) {
        alert(result.errMsg);
        return false;
    }
    var datas = result.result;
    return datas;
}


//修改任务状态=>并添加历史表   isLoadPage:是否刷新页面
function updateTaskStatus(taskid, status, remake) {
    debugger;
    //============================================================================================================
    let userId = $DS.getPms("USER_MID");
    let userName = $DS.getPms("USER_UserName");
    let agencyCode = $DS.getPms("USER_DeptCode") || "";
    let admdivCode = $DS.getPms("USER_admdivCode");
    //任务ID
    taskid = taskid || topWin.$DS.getPms("TASKID");
    remake = remake || "";
    //当前时间
    let newDateTime = $DS.util.timeFormate(new Date(), "yyyy-MM-dd HH:mm:ss");
    let sqls = [`update GFA_ANGENCY_STATUS set SUBSTATUS = '${status}' ,UPDATE_TIME = TO_DATE('${newDateTime}','yyyy-mm-dd hh24-mi-ss') where guid = '${taskid}'`
        /*`insert into GFA_ANGENCY_STATUSHIS (GUID,YEAR,ADMDIV,MOF_DIV_CODE,AGENCYID,AGENCY_CODE,REMARK,TASKID,OPTUSER,OPTDATE,SUBSTATUS,CREATE_USERNAME) select sys_guid() as GUID, YEAR, ADMDIV,'${admdivCode}' as MOF_DIV_CODE, AGENCYID,'${agencyCode}' as AGENCY_CODE,'${remake}' as REMARK,GUID AS TASKID,'${userId}' as OPTUSER,UPDATE_TIME as OPTDATE,SUBSTATUS,'${userName}' as CREATE_USERNAME from GFA_ANGENCY_STATUS  where guid = '${taskid}'`*/];
    return $DS.exeSqls(sqls.join(";"));
}