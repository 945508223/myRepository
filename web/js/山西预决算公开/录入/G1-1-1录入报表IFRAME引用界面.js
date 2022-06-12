let pageInfo_ = {
    isLoaded: false//是否保存完毕html报表
};
let tabsInfo_ = {};
let currentYearTabCfg;
let currentYearRptId = new Array();
let pageCommonParams_ = {};//该页面常用参数集合
//顶层window
var topWin = $DS.util.getTopWin("window");

//初始化
function init() {
    let TASKDATA = topWin.$DS.getPms("TASKDATA") || {};
    if (TASKDATA["SUBSTATUSNAME"])
        $DS.putPms("TASKSTATUSNAME", TASKDATA["SUBSTATUSNAME"]);
    //==========页面常用各种参数集合===================

    if ($DS.getPms("URL_YEAR"))
        pageCommonParams_.YEAR = $DS.getPms("URL_YEAR");
    else
        pageCommonParams_.YEAR = $DS.getPms("USER_currentyear");
    let topWinPms = topWin.$DS.getPms("TASKDATA") || {};
    if (topWinPms["AGENCYID"])
        pageCommonParams_.updivid = topWinPms["AGENCYID"];
    if (topWin.$DS.getPms("TASKID"))
        pageCommonParams_.TASKID = topWin.$DS.getPms("TASKID");


}

init();

/**
 * 批量校验点击事件
 */
function batchRegRpt() {
    debugger
    let tabCfg = $DS.util.clone($DS.getCtrl('TABS_填报采集表').info.ds_tabs_editableTabs);
    window.top['regRptData'] = tabCfg.filter(item => {
        item.ID = item.tabIndex;
        item.NAME = item.title;
        return item
    });
    $DS.showPage(`${$DS.util.getProjectName(VUECFG.appId)}/freeForm/freeFromView.jsp?PAGEID=39CD2A4443B3406CA388B47A143684A5&PAGETITLE=【Z1-5-1】批量校验&APPID=BMP`, '选择批量校验的报表', '50%', '75%')
}

//取消确认按钮点击事件
function btn_noSuccess_click() {
    $DS.util.confirm(vm, "是否取消确认当前数据!", function () {
        parent.updateTaskStatus("04");
        // location.reload(false);
        let parentStepInfo = parent.$DS.getCtrl("STEP_步骤").info;
        let index = parentStepInfo.ds_step_active;
        if (index != 1) {
            parent.$DS.getCtrl("STEP_步骤").info.ds_step_active = 1;
            parent.$DS.putPms("stepPms", parentStepInfo.ds_step_cfg[parentStepInfo.ds_step_active]["url"]);
        }
        location.reload(false);
    }, "已取消");
}

//确认按钮点击事件
function btn_success_click() {
    if (!checkSuccessBF())
        return false;

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
                    let result = parent.updateTaskStatus("03");
                    location.reload(false);
                }

            }, 500)
        } catch (e) {
            clearInterval(loadedTimeKey);
            console.error(e);
        }

    }, "已取消");
}

//确认前校验
function checkSuccessBF() {
    //顶层窗口
    var topWin = $DS.util.getTopWin("window");
    let TASKDATA = topWin.$DS.getPms("TASKDATA") || {};
    var sql = `select GUID,TASKID,RPTGUID,CHKSTATUS,SUPERTASKID,CHECKUSER,CHECKTIME from RURAL_TASK_RPTCHKDETAIL where TASKID = '${TASKDATA.GUID}'`;
    var result = $DS.selectBySql(VUECFG.appId, sql);
    var checkStatus = result && result.result && result.result.length > 0 ? result.result : "";
    if (!checkStatus) {
        alert("未校验或校验未通过,   请点击批量校验!");
        return false;
    }
    //如果表数据填写不全,或者有些表没有填写或没有打开
    if (currentYearRptId.length > 0 && currentYearRptId.length != checkStatus.length) {
        let noOpenArr = new Array();
        let checkStatusRptIds = checkStatus.map(item => item["RPTGUID"]);
        for (let item of currentYearRptId) {
            if (checkStatusRptIds.indexOf(item) == -1)
                noOpenArr.push(`'${item}'`);
        }
        if (noOpenArr.length > 0) {
            let sql = `select ITEMNAME from RPT_T_REPORTTEMPLET where GUID in (${noOpenArr.join(",")}) order by ITEMCODE`;
            result = $DS.selectBySql(VUECFG.appId, sql);
            let rptNames = result.result.map(item => `${item["ITEMNAME"]}<br>`);
            alert(`${rptNames.join("")}未校验或校验未通过!请校验`);
            return false;
        }
    }
    //判断校验表中是否存在校验不通过的数据
    let checkArr = new Array;
    checkStatus.map(item => {
        if (item["CHKSTATUS"] == "0")
            checkArr.push(`'${item["RPTGUID"]}'`);
    });
    if (checkArr.length > 0) {
        let sql = `select ITEMNAME from RPT_T_REPORTTEMPLET where GUID in (${checkArr.join(",")}) order by ITEMCODE`;
        result = $DS.selectBySql(VUECFG.appId, sql);
        let rptNames = result.result.map(item => `${item["ITEMNAME"]}<br>`);
        alert(`${rptNames.join("")}校验未通过!,请校验或点击批量校验!`);
        return false;
    }
    return true;
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

        let tb = new Array();
        for (let item of currentYearTabCfg)
            tb.push(getPmsByUrl(item["content"]).reportIdY);
        currentYearRptId = tb;
    }
}

//获取路径参数方法
function getPmsByUrl(url) {
    if (!url) return {};
    let p = url.split("?")[1];
    let m = p.split("&");
    let tb = new Object();
    for (let i of m) {
        p = i.split("=");
        tb[p[0]] = p[1];
    }
    return tb;
}

//确认按钮加载完成事件
function btn_success_complete(obj) {
    let TASKDATA = topWin.$DS.getPms("TASKDATA") || {};
    obj.ds_show = false;
    //设置报表制度
    if (["02", "04"].indexOf(TASKDATA["SUBSTATUS"]) != -1)
        obj.ds_show = true;
}

//取消按钮加载完成事件
function btn_noSuccess_complete(obj) {
    let TASKDATA = topWin.$DS.getPms("TASKDATA") || {};
    let btnSuccessInfo = $DS.getCtrl("BUTTON_确认").info;
    obj.ds_show = false;
    if (["06", "03", "5", "3"].indexOf(TASKDATA["SUBSTATUS"]) != -1)
        obj.ds_show = true;
}

//保存按钮加载完成事件
function btn_save_complete(obj) {
    let btnSuccessInfo = $DS.getCtrl("BUTTON_确认").info;
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
    let tabCfgs = getCurrentYearTabCfg_();
    topWin.$DS.loading(true);
    topWin.$DS.loadingText(`<p style="font-size: 2rem;font-weight: bold;font-family:iconfont ;color: rgba(0,0,0,1)">报表确认中[0/${tabCfgs.length}]……</p>`);
    try {
        timeKey = setInterval(() => {
            for (let i = 0; i < tabCfgs.length; i++) {
                let tabCfg = tabCfgs[i];
                if (!pageInfo_[tabCfg.name] && !pageInfo_.loadingTab) {
                    topWin.$DS.loadingText(`<p style="font-size: 2rem;font-weight: bold;font-family:iconfont ;color: rgba(0,0,0,1)">【${tabCfg.title}】确认中... [${i + 1}/${tabCfgs.length}]……</p>`);
                    pageInfo_.loadingTab = tabCfg.name;
                    /*let tabWin = $tabs.getSubWindow('TABS_填报采集表', tabCfg.name);
                    let iframeWin = tabWin?.$iframe?.getSubWindow('IFRAME_采集表');
                    //已加载过则直接调用 生成html进行保存
                    if (iframeWin?.spread && iframeWin?.speardUtil?.excelToHtml) {
                        tabsInfo_[tabCfg.name] = $DS.util.clone(urlPmsObj);
                        tabsInfo_[tabCfg.name]['reportid'] = getReportId(iframeWin.location.search, 'reportid');
                        tabsInfo_[tabCfg.name]["GUID"] = $DS.util.UUID().replaceAll('-', '').toUpperCase();
                        iframeWin.speardUtil.excelToHtml(null, null,
                            {
                                isWithBackColor: iframeWin.pageargs[0].isWithBackColor == 'TRUE' ? true : false,
                                isWithFontColor: iframeWin.pageargs[0].isWithFontColor == 'TRUE' ? true : false,
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
                    else {*/
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
                    //}
                //全部加载完成 加工html 统一保存
                else if (i == tabInfo.ds_tabs_editableTabs.length - 1 && pageInfo_[tabCfg.name]) {
                    clearInterval(timeKey);
                    dealHtmlRptResult();
                    saveHtmlTableToDb();
                    topWin.$DS.loadingText(`<p style="font-size: 2rem;font-weight: bold;font-family:iconfont ;color: rgba(0,0,0,1)">确认完毕!</p>`);
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
    //let topWin = $DS.util.getTopWin("window");
    //topWin.$DS.loadingText(`<p style="font-size: 2rem;font-width: bold;font-family:iconfont ;color: rgba(0,0,0,1)">报表加载完毕，写入缓存中，请稍后……</p>`);
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

/**
 * 构建数据 合并导出
 * @param cfg 导出参数配置
 */
function batch_export_buildData(cfg) {
    debugger
    var topWin = $DS.util.getTopWin("window");
    topWin.$DS.loading(true);
    let res = [];
    //选择导出的报表
    if (cfg.checkedRpt) {
        res = cfg.checkedRpt;
    } else {
        //通过tab页控件获取
        res = getReportIdsByTabs();
    }

    if (res && res.length > 0) {
        try {
            //根据路径 合并报表
            $DS.util.exportMergeReportExcel(res, "公开表", {
                backColor: cfg.color == "1" ? true : false,
                changeUnit: cfg.unit == "1" ? true : false
            });

            //定时 判断是否已经合并完报表
            window.top["btn_batchExportTimeKey"] = setInterval(function () {
                let name = getReportId(window.top.exportMergeObj.URLARR[0], 'REPORTNAME_');
                if (name) {
                    topWin.$DS.loadingText(`<p style="font-size: 2rem;font-weight: bold;font-family:iconfont ;color: rgba(0,0,0,1)">正在导出：【${name}】……</p>`);
                }
                if (window.top.exportMergeObj["EXPORTSTATUS"] == "END") {
                    clearInterval(window.top["btn_batchExportTimeKey"]);
                    topWin.$DS.loading(false);
                    delete window.top["btn_batchExportTimeKey"]
                }
            }, 500)
        } catch (e) {
            console.error(e);
            if (window.top["btn_batchExportTimeKey"]) {
                clearInterval(window.top["btn_batchExportTimeKey"]);
                delete window.top["btn_batchExportTimeKey"];
            }
            topWin.$DS.loading(false);
        }
    } else {
        alert("导出失败: 获取报表数据异常");
        topWin.$DS.loading(false);
    }

}


/**
 * 根据页面参数以及tab页控件获取加载报表的路径
 */
function getReportIdsByTabs() {
    debugger
    let tabCfgs = $DS.getCtrl('TABS_填报采集表').info.ds_tabs_editableTabs;
    let rptIds = [];
    for (let tabCfg of tabCfgs) {
        let rptId = getReportId(tabCfg.content, 'reportIdY');
        if (rptId) {
            let url = `/report/reportdesigner/lookreport/reportView.jsp?reportid=${rptId}&REPORTNAME_=${tabCfg.title}`;
            //拼接参数
            let urlPmsObj = $DS.util.clone(pageCommonParams_);
            for (let pmsKey in urlPmsObj) {
                url += `&${pmsKey}=${urlPmsObj[pmsKey]}`;
            }
            rptIds.push(url);
        }
    }
    return rptIds;
}


//=========================批量导入==============================================================================

function batch_import_() {
    $DS.util.confirm(window.vm, `注意：请使用批量导出的模板进行导入`, function () {
        debugger
        /**
         *  TODO   执行批量导入
         *      1 利用选中的tab页中的报表 选择文件 获取文件数据 生成importSpread 并缓存
         *      2 遍历加载tab页 当报表加载完成 且speardUtil.xxx方法存在时调用, 执行导入
         */
        let tabsInfo = $DS.getCtrl("TABS_填报采集表").info;
        let curTabWin = getTabReportWindow('TABS_填报采集表', tabsInfo.ds_tabs_editableTabsValue);
        if (!curTabWin) {
            alert('导入失败');
            return false;
        }
        window.top.importReport_importCfg = {
            canleLoading: true
        };
        //读取文件成功回调 执行导入
        window.top.importReport_importCfg.success = readImportExcelSuccess_;
        curTabWin.$('#importExcel').click();

    }, '已取消导入')
}

/**
 * 批量导入 读取excel成功回调
 * @param json 读取到的json数据
 */
function readImportExcelSuccess_(json) {
    debugger
    topWin.$DS.loading(true);
    //用选中的tab页中的报表 选择文件 获取文件数据 生成importSpread 并缓存
    let tabsInfo = $DS.getCtrl("TABS_填报采集表").info;
    let curTabWin = getTabReportWindow('TABS_填报采集表', tabsInfo.ds_tabs_editableTabsValue);
    //利用选中的tab页中的报表 选择文件, 获取文件数据 生成importSpread 并缓存
    curTabWin.$("body").append("<div id='importMergeSS' class='y-hide'></div>");
    var importSpread = new curTabWin.GC.Spread.Sheets.Workbook($('#importSS')[0], {sheetCount: 1});
    importSpread.fromJSON(json);

    //构造对象记录导入中的各种信息
    window.top.importReport_importCfg.mergeImportInfo = {
        importSpread: importSpread,//通过文件生成的spread对象
        tabConfigs: $DS.util.clone(tabsInfo.ds_tabs_editableTabs),//tab页控件配置
        importingReport: '',//当前正在导入的报表
        error: [],//导入失败的报表
    };
    //定时循环 执行导入
    let mergeImportTimeKey;
    try {
        mergeImportTimeKey = setInterval(() => {
            let mergeImportInfo = window.top.importReport_importCfg.mergeImportInfo;
            //导入结束
            if (mergeImportInfo.tabConfigs.length == 0) {
                clearInterval(mergeImportTimeKey);
                mergeImportSuccess_();
                topWin.$DS.loading(false);
            }
            //执行导入
            else if (mergeImportInfo.tabConfigs.length > 0
                && mergeImportInfo.importingReport != mergeImportInfo.tabConfigs[0].tabIndex) {
                let rptName = mergeImportInfo.tabConfigs[0].title;
                topWin.$DS.loadingText(`<p style="font-size: 2rem;font-weight: bold;font-family:iconfont ;color: rgba(0,0,0,1)">正在导入【${rptName}】……</p>`);
                doImportForOneReport(mergeImportInfo, tabsInfo);
            }
        }, 1000);
    } catch (e) {
        //删除缓存
        clearInterval(mergeImportTimeKey);
        delete window.top.importReport_importCfg;
        topWin.$DS.loading(false);
    }
}


/**
 *执行单张导入
 * @param mergeImportInfo 合并到出时构造的信息对象
 * @param tabsInfo tab页控件info
 * @param curTab 当前选中的tab页配置
 */
function doImportForOneReport(mergeImportInfo, tabsInfo) {
    debugger
    //正在导入的tab页配置
    let importingTabCfg = mergeImportInfo.tabConfigs[0];
    //变更正在导入的报表
    mergeImportInfo.importingReport = importingTabCfg.tabIndex;
    //选中当前报表tab页
    tabsInfo.ds_tabs_editableTabsValue = mergeImportInfo.importingReport;

    let getImportingWinTimeKey = setInterval(() => {
        try {
            //获取报表window 调用导入方法
            let importingWin = getTabReportWindow('TABS_填报采集表', mergeImportInfo.importingReport);
            if (importingWin?.reportLoadSuccessFlag && importingWin?.speardUtil?.importMergeDataForSheet) {
                clearInterval(getImportingWinTimeKey);
                let importSp = mergeImportInfo.importSpread;
                let importSh = importSp.getSheet(importingTabCfg.tabIndex - 1);
                importingWin.speardUtil.importMergeDataForSheet(importSp, importSh);
                mergeImportInfo.importingReport = '';
                mergeImportInfo.tabConfigs.splice(0, 1);
            }
        } catch (e) {
            //导入异常
            clearInterval(getImportingWinTimeKey);
            console.error(`${importingTabCfg.title} 导入数据异常： ${e}`);
            mergeImportInfo.importingReport = '';
            mergeImportInfo.tabConfigs.splice(0, 1);
            mergeImportInfo.error.push(importingTabCfg.title);

        }
    }, 500);
}

/**
 * 合并导入执行完毕
 * 删除缓存 重新加载页面
 * @private
 */
function mergeImportSuccess_() {

    //TODO 存在导入异常的提示
    if (window.top.importReport_importCfg.mergeImportInfo.error.length > 0) {
        console.error(window.top.importReport_importCfg.mergeImportInfo.error)
    }
    delete window.top.importReport_importCfg;
    //重新加载页面
    location.reload(false);

}

/**
 * 获取tab页下 报表页面window
 * @param ctrlName
 * @param index
 */
function getTabReportWindow(ctrlName, index) {
    try {
        let tabWin = $tabs.getSubWindow('TABS_填报采集表', index);
        return tabWin.$iframe.getSubWindow('IFRAME_采集表');
    } catch (e) {
        return false;
    }
}

