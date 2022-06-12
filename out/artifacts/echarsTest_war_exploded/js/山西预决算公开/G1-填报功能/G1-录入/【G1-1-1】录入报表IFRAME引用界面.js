let pageInfo_ = {
    isLoaded: false//是否保存完毕html报表
};
let tabsInfo_ = {};
let currentYearTabCfg;
//顶层window
var topWin = $DS.util.getTopWin("window");

//初始化
function init() {
    let TASKDATA = topWin.$DS.getPms("TASKDATA") || {};
    if (TASKDATA["SUBSTATUSNAME"])
        $DS.putPms("TASKSTATUSNAME", TASKDATA["SUBSTATUSNAME"]);

}

init();

//确认按钮点击事件
function btn_success_click() {
    $DS.util.confirm(vm, "是否确认当前数据,确认后不允许进行数据修改!", function () {
        debugger
        //保存html报表
        pageInfo_.isLoaded = false;
        saveHtmlRptCache();
        let loadedTimeKey;
        try {
            loadedTimeKey = setInterval(() => {
                if (pageInfo_.isLoaded === true) {
                    clearInterval(loadedTimeKey);
                    //修改任务状态=>填报公开表
                    result = parent.updateTaskStatus("03");
                    location.reload(false);
                }

            }, 500)
        } catch (e) {
            clearInterval(loadedTimeKey);
            console.error(e);
        }

    }, "已取消");
}

//保存按钮点击事件
function btn_save_click() {
    alert("保存成功!");
}

//加载tab页
function tabsUpdateData() {
    debugger
    let newData = getDynamicTabCfg($DS.getPms("URL_guid"));
    setDynamicTabCfg(newData);
}

/**
 * 获取动态tab页配置
 */
function getDynamicTabCfg(guid) {
    debugger
    //最终tabs数据
    let newData = new Array();
    let sql = `select TABLELIMIT from GFA_REPORT_TEMPLET where GUID = '${guid}'`;
    let result = $DS.selectBySql(VUECFG.appId, sql);
    //如果查询不到值,或者没有设置
    if (!result || result.isError || !result.result[0] || result.result.length == 0 || !result.result[0].TABLELIMIT) {

    } else {
        let resArr = result.result[0].TABLELIMIT.split(",");
        let guids = resArr.map(item => {
            return `'${item.split("|")[0]}'`;
        });
        let sql = `select * from RURAL_V_TASKMODEL where TABLE_NAME in(${guids.join(",")})  order by TABLE_NAMECODE`;
        result = $DS.selectBySql(VUECFG.appId, sql);
        let data = result.result;
        let content;
        let modelName;
        for (let item of data) {
            if (item["TABLETYPE"] == "PT") {
                content = item["TABLE_NAME"];
                modelName = item["TABLE_NAMECN"];
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i]["TABLETYPE"] != "PT") {
                let obj = {};
                obj.tabIndex = i + 1 + "";
                obj.text = "";
                obj.name = i + 1;
                obj.iconClass = "el-icon-finished";
                obj.title = data[i].TABLE_NAMECN;
                obj.lazy = true;
                obj.content = $DS.util.replace("/freeForm/freeFromView.jsp?" +
                    "PAGEID=" + content + "&PAGETITLE=" + modelName + "&APPID=" + VUECFG.appId + "&$zoom=true" + "&reportIdY=" + data[i].TABLE_NAME);
                newData.push(obj);
            }
        }
    }
    return newData;

}

/**
 * 设置动态tab页
 */
function setDynamicTabCfg(newData) {
    let tabsInfo = $DS.getCtrl("TABS_填报采集表").info;
    tabsInfo.ds_tabs_editableTabs = newData;
    //如果为本年缓存数据
    let isCurrentYear = topWin.$DS.getPms('listPms')?.PARAMS?.indexOf('USER_CURRENTYEAR') != -1 ? true : false;
    if (isCurrentYear) {
        currentYearTabCfg = $DS.util.clone(newData);
    }
}

//确认按钮加载完成事件
function btn_success_complete(obj) {
    let TASKDATA = topWin.$DS.getPms("TASKDATA") || {};
    obj.ds_show = true;
    //设置报表制度
    if (TASKDATA["SUBSTATUS"] == "1" || (parseInt(TASKDATA["SUBSTATUS"]) > 2 && TASKDATA["SUBSTATUS"] != "04"))
        obj.ds_show = false;
}


/**
 * 点击确认 保存html报表
 */
function saveHtmlRptCache() {
    debugger
    let urlPmsObj = {};
    if ($DS.getPms("URL_YEAR"))
        urlPmsObj.YEAR = $DS.getPms("URL_YEAR");
    else
        urlPmsObj.YEAR = $DS.getPms("USER_currentyear");
    let topWin = $DS.util.getTopWin("window");
    let topWinPms = topWin.$DS.getPms("TASKDATA") || {};
    if (topWinPms["AGENCYID"])
        urlPmsObj.updivid = topWinPms["AGENCYID"];
    if (topWin.$DS.getPms("TASKID"))
        urlPmsObj.TASKID = topWin.$DS.getPms("TASKID");

    //遍历tab页
    let tabInfo = $DS.getCtrl('TABS_填报采集表').info;
    let timeKey;

    topWin.$DS.loading(true);
    let tabCfgs = getCurrentYearTabCfg_();
    try {
        timeKey = setInterval(() => {
            for (let i = 0; i <tabCfgs.length; i++) {
                let tabCfg = tabCfgs[i];
                if (!pageInfo_[tabCfg.name] && !pageInfo_.loadingTab) {
                    pageInfo_.loadingTab = tabCfg.name;
                    let tabWin = $tabs.getSubWindow('TABS_填报采集表', tabCfg.name);
                    let iframeWin = tabWin?.$iframe?.getSubWindow('IFRAME_采集表');
                    //已加载过则直接调用 生成html进行保存
                    if (iframeWin?.spread && iframeWin?.speardUtil?.excelToHtml) {
                        tabsInfo_[tabCfg.name] = $DS.util.clone(urlPmsObj);
                        tabsInfo_[tabCfg.name]['reportid'] = getReportId(iframeWin.location.search, 'reportid');
                        tabsInfo_[tabCfg.name]["GUID"] = $DS.util.UUID().replaceAll('-', '').toUpperCase();
                        iframeWin.speardUtil.excelToHtml(null, null,
                            {
                                isWithBackColor: iframeWin.pageargs[0].isWithBackColor == 'FALSE' ? false : true,
                                isWithFontColor: iframeWin.pageargs[0].isWithFontColor == 'FALSE' ? false : true,
                                isWithBorderStyle: false
                            },
                            function (result) {
                                result.toHtmlWidth = iframeWin.pageargs[0].toHtmlWidth ? iframeWin.pageargs[0].toHtmlWidth : '100%';
                                result.toHtmlHeight = iframeWin.pageargs[0].toHtmlHeight ? iframeWin.pageargs[0].toHtmlHeight : '100%';
                                result.toHtmlhorizontally = iframeWin.pageargs[0].toHtmlhorizontally ? iframeWin.pageargs[0].toHtmlhorizontally : 'center';
                                result.toHtmlvertical = iframeWin.pageargs[0].toHtmlvertical ? iframeWin.pageargs[0].toHtmlvertical : 'center';
                                result.toHtmlPadding = iframeWin.pageargs[0].toHtmlPadding ? iframeWin.pageargs[0].toHtmlPadding : '1rem';
                                result.toHtmlHDirection = iframeWin.pageargs[0].toHtmlHDirection == "TRUE" ? true : false;
                                pageInfo_[tabCfg.name] = result;
                                pageInfo_.loadingTab = false;
                            }, function (e) {
                                console.error(e);
                                pageInfo_[tabCfg.name] = {isError: true, errMsg: e};
                                pageInfo_.loadingTab = false;
                            })
                    }
                    //未加载的报表 生成路径 加载完成完成后获取html保存
                    else {
                        let rptId = getReportId(tabCfg.content, 'reportIdY');//tabCfg.content?.split('&reportIdY=')?.[1]?.split('&')[0];
                        if (rptId) {
                            tabsInfo_[tabCfg.name] = $DS.util.clone(urlPmsObj);
                            tabsInfo_[tabCfg.name]["reportid"] = rptId;
                            let url = `/bmp_portal/report/reportdesigner/lookreport/reportView.jsp?ylTb=${tabCfg.name}&isExcelRptToHtml=true&excelRptToHtmlId=${rptId}`;
                            //拼接参数
                            for (let pmsKey in tabsInfo_[tabCfg.name]) {
                                url += `&${pmsKey}=${tabsInfo_[tabCfg.name][pmsKey]}`;
                            }
                            $('body').append(`<iframe style="display:none" id="${rptId}" src="${url}"></iframe>`);
                            tabsInfo_[tabCfg.name]["GUID"] = $DS.util.UUID().replaceAll('-', '').toUpperCase();
                            let loadRptTimeKey;
                            try {
                                loadRptTimeKey = setInterval(() => {
                                    if (window.top[rptId]) {
                                        clearInterval(loadRptTimeKey);
                                        $('#' + rptId).remove();
                                        pageInfo_[tabCfg.name] = window.top[rptId];
                                        pageInfo_.loadingTab = false;
                                        delete window.top[rptId];
                                    }
                                })
                            } catch (e) {
                                clearInterval(loadRptTimeKey);
                                console.error(`缓存${tabCfg.title}失败:` + e);
                                pageInfo_[tabCfg.name] = {isError: true, errMsg: e};
                                pageInfo_.loadingTab = false;
                            }
                        } else {
                            pageInfo_[tabCfg.name] = {isError: true, errMsg: `获取报表Id异常:插页${tabCfg.name}`};
                            pageInfo_.loadingTab = false;
                        }
                    }
                }
                //全部加载完成 加工html 统一保存
                else if (i == tabInfo.ds_tabs_editableTabs.length - 1 && pageInfo_[tabCfg.name]) {
                    clearInterval(timeKey);
                    dealHtmlRptResult();
                    saveHtmlTableToDb();
                    topWin.$DS.loading(false);
                }
            }
        }, 500)

    } catch (e) {
        clearInterval(timeKey);
        console.error(e);
        topWin.$DS.loading(false);
    }

}

/**
 * 获取本年的tab页
 * @private
 */
function getCurrentYearTabCfg_() {
    debugger
    if (currentYearTabCfg && currentYearTabCfg.length > 0) {
        return currentYearTabCfg;
    } else if (!currentYearTabCfg) {
        let cfg = topWin.$DS.getCtrl('LISTVIEW_操作明细步骤').info.ds_listview.find(item => item.PARAMS.indexOf('USER_currentyear') !== -1)
        return getDynamicTabCfg(cfg.GUID);
    }

    return [];
}


/**
 * 取路径上的报表id
 * @param url
 * @param pmsKey
 */
function getReportId(url, pmsKey) {
    try {
        return url?.split(`&${pmsKey}=`)?.[1]?.split('&')[0];
    } catch (e) {
        console.error(e);
        return false;
    }
}


/**
 * 加工htmlTable
 * @param htmlTable
 */
function dealHtmlRptResult(htmlTable) {
    debugger
    delete pageInfo_.loadingTab;
    for (let key in pageInfo_) {
        if (key !== 'isLoaded') {
            let resultItem = pageInfo_[key];
            if (resultItem.isError) {
                console.error(`插页${key}转HTML异常:${resultItem.errMsg}`);
                pageInfo_[key] = null;
            } else if (!resultItem.isError && resultItem?.result?.length > 0) {
                pageInfo_[key] = dealHtmlTable(resultItem);
                // 清除添加进去的html表格
                $("#outerHtmlTableContainer").remove();
            } else {
                pageInfo_[key] = null;
            }
        }
    }

}

/**
 * 加工html
 * @param htmlTable
 * @returns {jQuery}
 */
function dealHtmlTable(htmlTable) {
    let outerHtmlTableContainer = `<div id="outerHtmlTableContainer" style="display:none"></div>`;
    $("body").append(outerHtmlTableContainer);
    let {toHtmlWidth, toHtmlHeight, toHtmlhorizontally, toHtmlvertical, toHtmlPadding, toHtmlHDirection} = htmlTable;
    switch (toHtmlhorizontally) {
        case 'LEFT':
            toHtmlhorizontally = 'flex-start';
            break;
        case 'CENTER':
            toHtmlhorizontally = 'center';
            break;
        case 'RIGHT':
            toHtmlhorizontally = 'flex-end';
            break;
    }
    switch (toHtmlhorizontally) {
        case 'TOP':
            toHtmlvertical = 'flex-start';
            break;
        case 'CENTER':
            toHtmlvertical = 'center';
            break;
        case 'BOTTOM':
            toHtmlvertical = 'flex-end';
            break;
    }
    htmlTable.result.forEach((item, index) => {
        let id = $DS.util.UUID();
        let html = item.html;
        let outDiv = `<div id="innerHtmlTableContainer_${id}" style="float: left;padding:${toHtmlPadding};height: auto;width:100%;display:flex;` +
            `justify-content:${toHtmlhorizontally};align-items:${toHtmlvertical}">` +
            ` ${html}</div>` +
            `<div style="display:none;">=!@#%=</div>`;
        //横向报表
        if (toHtmlHDirection == true)
            outDiv += `<div style="display: none">direction=H</div>`;
        $("#outerHtmlTableContainer").append(outDiv);
        $(`#innerHtmlTableContainer_${id} table`).css('height', toHtmlHeight).css('width', toHtmlWidth);

    });
    return $("#outerHtmlTableContainer").html();
}

/**
 * 保存入库
 */
function saveHtmlTableToDb() {
    debugger
    var base = new Base64();
    let delIds = '';
    let saveData = {inserted: [], deleted: [], updated: []};
    for (let key in pageInfo_) {
        if (key == 'isLoaded') continue;
        let item = {
            REPORTID: tabsInfo_[key].reportid,
            TASKID: tabsInfo_[key].TASKID,
            YEAR: tabsInfo_[key].YEAR,
            GUID: tabsInfo_[key].GUID
        }
        saveData.inserted.push(item);
        delIds += `'${tabsInfo_[key].reportid}',`
    }
    delIds = delIds.substring(0, delIds.length - 1);
    let delResult = $DS.exeSql(`delete from DM_DOC_PAGECACHE where REPORTID in(${delIds}) and TASKID='${tabsInfo_[1].TASKID}' and YEAR='${tabsInfo_[1].YEAR}'`, '', '', VUECFG.appId);
    if (delResult.isError) {
        console.error(delResult.errMsg ? delResult.errMsg : '保存HTML报表失败,删除失败');
    } else {
        let saveInfoResult = $DS.saveAllTableData('DM_DOC_PAGECACHE', 'GUID', saveData, VUECFG.appID);
        if (saveInfoResult.isError) {
            console.error(saveInfoResult.errMsg ? saveInfoResult.errMsg : '保存HTML报表失败,保存基本信息失败');
        } else {
            //保存clob
            for (let key in pageInfo_) {
                if (pageInfo_[key]) {
                    let code = base.encode(pageInfo_[key]);
                    let flag = $DS.saveClob(VUECFG.appId, 'HTMLSTR', code, 'DM_DOC_PAGECACHE', 'GUID', tabsInfo_[key].GUID);
                    if (flag.isError) {
                        console.error(`保存插页${key}HTMLSTR失败${flag.errMsg}`);
                    }
                }
            }
        }
    }
    pageInfo_ = {isLoaded: true};
    tabsInfo_ = {};
}
