//初始化layui
if (window.layui) {
    layui.use(['layer', 'element'], function () {
        var $ = layui.jquery
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
        layer = layui.layer //弹层
    })
}
/*---------------------------------工具方法---------------------------------------------------------*/
var util = {
    getHtml: getHtml,//获取html
    getModelHtml: getModelHtml,//获取模板html
    getOuterHtml: getOuterHtml,//获取OuterHtml
    exception: exception,//异常封装
    exceptionRegister: exceptionRegister,//组件对象异常
    tryCatch: tryCatch,//函数异常捕获
    getProjectName: getProjectNameByAppId,//根据系统id获取系统url
    getObjVal: getObjVal,//根据key数组取对象值
    setObjVal: setObjVal,//根据key数组设置对象值
    replace: replaceStr,//参数替换
    evalReplace: evalReplace,//替换后的结果执行eval
    joinStrByPms: joinStrByPms,//参数逗号拼接
    eval: ycdeval,//通用执行
    clone: deepClone,//对象克隆,
    json: formatJson,//json格式化,
    children: transData,//转换为children格式
    childrenToList: childrenToList,//chuildren 转list
    add: floatAdd,//精确加,
    sub: floatSub,//精确减,
    mul: floatMul,//精确乘,
    div: floatDiv,//精确除,
    stopEvent: stopEvent,//阻止冒泡(事件阻止)
    isString: isString,//是否是字符串
    isNumber: isNumber,//是否是数字
    isBoolean: isBoolean,//是否是布尔值
    isUndefined: isUndefined,//是否是undefined
    isNull: isNull,//是否是null
    isArray: isArray,//是否是数组
    isFunction: isFunction,//是否是函数
    isObject: isObject,//是否是对象
    isRegExp: isRegExp,//是否是正则表达式
    isDate: isDate,//是否是日期对象
    isBase64Str: isBase64Str,//是否为base64字符串
    isFullAngle: isFullAngle,//是否包含全角字符
    addThousands: addThousands,//数值添加千分符
    removeThousands: removeThousands,//去除千分符
    fixedNumber: fixedNumber,//保留小数
    commonFunction: commonFunction,//通用执行函数
    UUID: generateUUID,//获取uuid
    getGuid: getGuid,//获取guid,去掉_
    isObjEqual: isObjEqual,//判断两个对象是否相等
    close: close_,//关闭弹出框
    confirm: confirmFun,//确认函数
    notify: notifyFun,//通知函数
    getData: getData,//获取当前日期数字
    getSysDefault: getSysDefaultVal,//获取系统内置值
    getIframeByName: getIframeByName,//通过名称获取iframe内函数
    strLength: getLength,//获取字符串长度
    getTopWin: getTopWin,//根据指定属性获取最上层页面
    alert: topAlert,//最上层弹出提示
    getChildrenDataByVal: getChildrenDataByVal,//获取层级结构的值
    htmlFormate: formatHTML,//html格式化
    timeFormate: formateTime,//日期时间格式化
    exportFileByType: exportFileByType,//导出JSON文件
    exportPdf: exportPdf,//导出PDF
    exportWord: exportWord,//导出word
    exportExcel: exportExcel,//表格导出EXCEL
    exportReportExcel: exportReportExcel,//导出报表excel
    downLoadFile: downLoadFile,//通用下载(根据url)
    exportMergeReportExcel: exportMergeReportExcel,//导出合并的excel
    exportMergeReportExcelByTab: exportMergeReportExcelByTab,//根据tab页名称导出合并的excel
    printReportExcel: printReportExcel,//打印报表excel
    numToCN: numToCN,//阿拉伯数字转中文大写(非金额)
    numToCNstr: convertCurrency,//阿拉伯数字转中文大写
    reverse: reverse,//字符串反转
    rgb2Hex: rgb2Hex,//RGB转十六进制
    rgba2Hex: rgba2Hex,//RGBA转十六进制
    hex2Rgba: hex2Rgba,//16进制 转rgba
    canvasToDataURL: canvasToDataURL,//canvas转dataURL：canvas对象、转换格式、图像品质
    dataURLToCanvas: dataURLToCanvas,//DataURL转canvas
    imageToCanvas: imageToCanvas,//image转canvas：图片地址
    canvasToImage: canvasToImage,//canvas转image
    fileOrBlobToDataURL: fileOrBlobToDataURL,//File/Blob对象转DataURL
    dataURLToBlob: dataURLToBlob,//DataURL转Blob对象
    blobToImage: blobToImage,//Blob转image
    imageToBlob: imageToBlob,//image转Blob
    BlobToCanvas: BlobToCanvas,//Blob转canvas
    canvasToBlob: canvasToBlob,//canvas转Blob
    imageToDataURL: imageToDataURL,//image转dataURL
    dataURLToImage: dataURLToImage,//dataURL转image，这个不需要转，直接给了src就能用
    sortArrByItemValue: sortArrByItemValue,//根据元素中某个属性值对数组排序
    uniqueArr: uniqueArr,//根据元素某个属性值去重
    convertDSTo26BS: convertDSTo26BS,//十进制转26进制(列数对照:Excel)
    ConvertNum: ConvertNum,//26进制转十进制(列数对照:Excel)
    compareSimilarity: compareSimilarity,//比较两个字符串 或数据相似度
    filterData: filterData,//根据条件模糊匹配过滤数据
    getStrLength: getStringLength,//获取字符长度
    filterDataByCondition: filterDataByCondition,//根据条件过滤数据
    importReportByExcel: importReportByExcel,
    findObjKeyByVal: findObjKeyByVal,//寻找满足条件的数组中对象其他属性值
    buildGroupData: buildGroupData,//构建分组数据
    buildDataBySumType: buildDataBySumType,//依据字段汇总数据
    timeDown: timeDown,//倒计时
    subDate: subDate,//时间相减
    getCursorPosition: getCursorPosition,//获取光标位置
    setCursorPosition: setCursorPosition,//设置光标位置
    Observer: null,//对象监听
}

/*---------------------------------echarts通用方法----------------------------------------------*/
var echart = {
    getChartInstanceById: getChartInstanceById,//根据控件id获取图形实例
    getChartInstanceByName: getChartInstanceByName,//根据控件名称获取图形实例
    getChartOptionById: getChartOptionById,//根据控件id获取图形option
    getChartOptionByName: getChartOptionByName,//根据控件名获取图形option
    getDM: getDimsAndMeas,//根据控件获取度量维度数据
    buildBaseOption: buildBaseOption,//设置基础图option数据 包括柱图折线混合图
    getChartData: getChartDataObj,//获取图形数据
    setEchartsPros: setEchartsPros,//设置图形属性
    getDataObjForDimOne: getDataObjForDimOne,//一维度多度量情况时的图形数据
    getDataObjForDimTwo: getDataObjForDimTwo,//多维度一度量情况时的图形数据
    setBaseOption: setBaseOptionByData,//根据数据设置基础option
    handleOffsetColor: handleOffsetColor,//处理渐变颜色
    handleDataZoom: handleDataZoom,//处理默认滑动条缩放
    formatterData: formatterEchartsData,//格式化数据
    setTimeRefresh: setTimeRefreshChart,//定时刷新控件
    dynamicLoad: dynamicLoad,//轮播
    uploadImage: uploadImage,//根据控件名转图片上传
}
/*---------------------------------消息类----------------------------------------------*/
var massage = {
    sendUserMsg: sendUserMsg,//发送消息
    getUserMsgByAppId: getUserMsgByAppId,//根据消息状态取消息列表
}
/*---------------------------------多线程类----------------------------------------------*/
var $woker = {
    new: newWoker,//新建线程
    do: doWoker,//执行线程
    destory: destoryWorker,//销毁线程
    ajax: ajaxWorkCode,//ajax线程方法>>>在newWoker的时候传递此方法可执行ajax
}
/*---------------------------------lowdb类----------------------------------------------*/
var $lowdb = {
    new: newLowDb,//初始化本地缓存(基于LocalStorage)
    get: getLowDbData,//获取本地缓存数据
    set: setLowDbData,//设置本地缓存数据
}
/*---------------------------------预加载---------------------------------------------*/
var $preload = {
    getPageIdOfSrc: getPageIdOfSrc,//通过路径获取PAGEID
    preVueCfg: preVueCfg,//预加载VUECFG
}
/*---------------------------------$DS---------------------------------------------------------*/
var $DS = {

    //VUE
    VUE: {},
    //页面参数
    pageParams: {},
    //设置loading
    loading: setLoading,
    //设置loading文本
    loadingText: setLoadingText,
    //loading函数
    loadingFun: loadingFun,
    //设置参数
    putPms: putParams,
    //删除页面参数
    delPms: delPms,
    //通用处理页面参数推送和撤销推送
    dealPms: dealPms,
    //获取页面参数
    getPms: getParams,
    //工具类
    util: util,
    //echart
    echart: echart,
    //消息类
    massage: massage,
    //多线程类
    woker: $woker,
    //预加载类
    preload: $preload,
    //处理结果
    dealRes: dealResult,
    //刷新页面属性
    refPagePro: (window["refearchPagePro"]) ? refearchPagePro : null,
    //刷新表单
    refForm: (window["refearchFormArr"]) ? refearchFormArr : null,
    //设置属性
    setPro: setProperties,
    //刷新属性
    refPro: (window["refearchFormPro"]) ? refearchFormPro : null,
    //刷新数据源
    refSource: (window["refearchFormSource"]) ? refearchFormSource : null,
    //刷新关联引用
    refFieldRef: refFieldRef,
    //通过名称获取数据源
    getSource: getSourceByName,
    //获取数据源数据
    getSourceData: getSourceData,
    //通过ID获取数据源
    getSourceById: getSourceById,
    //通过数据源回显数据源相关数据
    setSourceVal: setSourceVal,
    //通过数据源获取控件数据
    getSourceVal: getSourceVal,
    //通用表单校验
    check: checkData,
    //通用表单数据源保存
    saveSource: sourceCommonSaveForm,
    //通用表格数据源保存
    saveGridSource: sourceCommonSaveGrid,
    //跨页面多数据源保存
    saveCrossDataSource: saveCrossDataSource,
    //更新表状态(字段)
    setFlagById: setFlagById,
    //通过控件名加载控件数据
    loadCtrl: loadCtrl,
    //通过ID获取控件名称
    getCtrlNameById: getCtrlNameById,
    //通过名称获取控件信息
    getCtrl: getCtrlByName,
    //通过ID获取控件信息
    getCtrlById: getCtrlById,
    //通过名称获取控件值
    getVal: getCtrlValueByName,
    //通过名称设置控件值
    setVal: setCtrlValueByName,
    //通过ID获取控件值
    getValById: getCtrlValById,
    //通过ID设置控件值
    setValById: setCtrlValById,
    //通过ID获取控件类型
    getCtrlType: getCtrlTypeById,
    //加载页面css文件
    loadPageCssFile: loadPageCssFile,
    //加载页面css
    loadPageCss: loadPageCss,
    //加载页面js文件
    loadPageJsFile: loadPageJsFile,
    //加载公共脚本
    loadPubJs: loadPubJs,
    //页面加载js文本
    loadJs: dsLoadJsTexts,
    //页面加载js文件
    loadJsByUrl: loadJavaScriptUrl,
    //页面加载css文件
    loadCssByUrl: loadCssUrl,
    //通用执行函数
    eval: evalFunction,
    //通用查询
    select: selectTableData,
    //通用查询所有
    selectAll: selectAllTableData,
    //通用查询树
    selectTree: selectTreeData,
    //通用sql查询
    selectBySql: selectBySql,
    //通用form sql查询
    selectByFormSql: selectByFormSql,
    //通用执行Form sql
    exeFormSql: exeFormSql,
    //通用执行sql
    exeSql: exeSql,
    //通用执行sqls
    exeSqls: exeSqls,
    //通用表单保存
    saveTable: saveTableData,
    //通用表多数据保存
    saveAllTableData: saveAllTableData,
    //通用删除
    deleteById: deleteById,
    // 根据页面数据源定义+KeyValue删除数据
    deleteByPageSource: deleteByPageSource,
    //通用控件删除控件数据
    deleteByCtrlId: deleteByCtrlId,
    //字段信息
    selectFieldInfo: selectFactors,
    //通过字段名获取字段信息
    getOneField: getOneFieldFromDource,
    //查询引用数据
    selectRefFiled: selectRefFiled,
    //弹出窗口
    showPage: showPage,
    //通过控件id获取控件对应数据源
    getDataSourceForCtrl: getDataSourceForCtrl,
    //步骤条变更
    changeStepByName: changeStepByName,
    //打开通用配置表格
    openCfgTable: openCfgTable,
    //打开通用树
    openCfgTree: openCfgTree,
    //设置控件缺省值
    initCtrlDefvalue: initCtrlDefvalue,
    //初始化数据源对应的控件值
    initCtrl: initCtrl,
    //重新查询数据源表和字段信息
    reloadDataSourceFieldInfo: reloadDataSourceFieldInfo,
    //设置控件右侧某属性是否展示
    setRightProShow: setRightProShow,
    //根据ID展开树节点
    expandedTreeNode: expandedTreeNode,
    //清除数据缓存
    cleanCache: cleanCache,
    //获取fastDFSUrl地址
    FASTDFSURL: "",
    //获取fastDFSUrl地址
    delFromFastDFS: delFromFastDFS,
    //清空组件数据
    clearData: clearData,
    //是否触发控件刷新
    isTrigger: isTrigger,
    //触发刷新其他组件
    trigger: triggerOtherByCtrl,
    //获取当前控件的所有触发组件
    getAllTriggr: getAllTriggr,
    //获取当前页面所有触发刷新控件
    getAllPageCtrl: getAllPageCtrl,
    //通过控件名判断控件是否加载完成
    isLoaded: isLoaded,
    //判断控件全部加载完成
    isAllLoaded: isAllLoaded,
    //显示控件
    show: showCtrl,
    //隐藏控件
    hide: hideCtrl,
    //清空表数据缓存
    clearTableSCache: clearTableSCache,
    //清空全部数据缓存
    clearAllTableCache: clearAllTableCache,
    //根据属性名获取页面属性值
    getPageProValByName: getPageProValByName,
    //根据属性名设置页面属性值
    setPageProValByName: setPageProValByName,
    //获取clob字段
    getClob: getClob,
    //保存clob字段
    saveClob: saveClob,
    //获取IFRAME或者TABS的WINDOW
    getSubWindowByName: getSubWindowByName,
    //获取getUserRoleBean的SQL过滤
    getUserRoleBean: getUserRoleBean,
    //查看excel
    viewExcel: viewExcel,
    //查看word
    viewWord: viewWord,
    //根据文件路径预览PDF
    viewPdf: viewPdf,
    //渲染PDF
    randerPdf: randerPdf,
    //获取页面属性配置
    getPageProp: getPageProp,
    //获取内嵌表单的数组数据
    getIncludeArrByPageId: getIncludeArrByPageId,
    //JS是否全部加载
    allJsLoad: allJsLoad,
    //获取页面类某型所有控件
    getAllCtrlByCtrlType: getAllCtrlByCtrlType,
    //触发表格 ,树的关键字搜索
    triggerFilter: triggerFilter
}
//FASTDFSURL
try {
    if (window.$STANDALONE) {//单机
        $DS.FASTDFSURL = null;
    } else {//服务器
        $DS.FASTDFSURL = "http://" + getFastDFSUrl(VUECFG.appId);
    }
} catch (e) {
    console.log("FASTDFSURL未初始化")
}
//当前时间
$DS.pageParams["SYS_DATE"] = new Date();

/*---------------------------------参数方法---------------------------------------------------------*/
/**
 * 获取url中传递的window参数
 * @returns {*}
 */
function getUrlWin() {
    try {
        var win = $DS.getPms("URL_$win");
        if (win) {
            win = (win == 'top') ? $DS.util.getTopWin('window') : eval(win)
        } else {
            win = window
        }
        return win;
    } catch (e) {
        return window;
    }
}

/**
 *    获取所有url参数
 */
function getAllUrlParams() {
    var urlpms = document.location.href.split("?")[1];
    if (urlpms) {
        var aParams = urlpms.split('&');
        for (var i = 0; i < aParams.length; i++) {
            var aParam = aParams[i].split('=');
            try {
                var key = decodeURI(aParam[0]).trim()
                var val = decodeURI(aParam[1]).trim();
                if (key == "VUECFGURL" && $FREEFORM == "FREEFORM") {
                    val = aParam[1].trim();
                }
                if (aParam[1] == undefined) {
                    $DS.pageParams["URL_" + key] = "";
                } else {
                    $DS.pageParams["URL_" + key] = val;
                }
            } catch (e) {
                $DS.pageParams["URL_" + key] = "";
            }
        }
    }

}

/**
 *    获取用户信息所有参数
 */
function getUserParams() {
    var user = {};
    if (window.top.user) {
        user = window.top.user;
    } else if (window.$STANDALONE) {//单机
        user = {};
    } else {
        user = YCDCommon.Ajax.syncAjax(getProjectName() + "/login/getCurUser");
    }
    for (var u in user) {
        $DS.pageParams["USER_" + u] = user[u];
    }
}

/**
 * 设置页面参数
 * @param key
 * @param value
 */
function putParams(key, value) {
    $DS.pageParams[key] = value;
}

/**
 * 删除页面参数
 * @param key
 */
function delPms(key) {
    delete $DS.pageParams[key];
}

/**
 * 获取页面参数
 * @param key
 * @returns {*}
 */
function getParams(key) {
    return $DS.pageParams[key];
}

/**
 * 处理页面参数推送和撤销推送
 * @param info
 */
function dealPms(info, val) {
    var id = info.ds_id;
    var type = $DS.getCtrlType(id);
    if (info.ds_param) {
        var data = "";
        //echarts双击触发自身加载时 不删除已推送的参数
        if (temporary[info.ds_id + "_loadSelf"] === true) {
            data = $DS.getPms(info.ds_param);
        } else {
            //删除参数推送
            $DS.delPms(info.ds_param);
            //获取参数值
            data = val ? val : window["$" + type].getData(id);
        }

        //撤销推送参数
        if (info.ds_backParamCondition) {
            temporary.paramsObj[info.ds_param] = data;
            var str = info.ds_backParamCondition.replaceAll(info.ds_param, "temporary.paramsObj." + info.ds_param)
            try {
                if (!eval(str))
                    $DS.putPms(info.ds_param, data);
            } catch (e) {
                //console.error(`撤销推送参数失败!表达式:【${info.ds_backParamCondition}】`)
            }

        } else {
            $DS.putPms(info.ds_param, data);
        }
    }
}

/**
 * 设置控件加载机制
 */
function changeCtrlLoading(info, val) {

    var id = info.ds_pid;
    //先删除
    if (!VUECFG.firstObj) VUECFG.firstObj = {};
    if (!VUECFG.normalObj) VUECFG.normalObj = {};
    if (!VUECFG.lazyObj) VUECFG.lazyObj = {};
    delete VUECFG.firstObj[id];
    delete VUECFG.normalObj[id];
    delete VUECFG.lazyObj[id];
    //设置新映射
    VUECFG[val + "Obj"][id] = true;
}


/**
 * 依据控件刷新其他控件
 * @param ctrl
 */
function triggerOtherByCtrl(ctrl) {
    var info = ctrl.info;
    //刷新其他控件
    triggerComps($DS.getAllTriggr(ctrl), $DS.getCtrlType(info.ds_id), info.ds_id);
}

/**
 * 获取所有触发组件
 * @param id
 * @return {[]}
 */
function getAllTriggr(ctrl) {
    var arr = [];
    var info = ctrl.info;
    if (info.ds_trigger) {
        for (let t of info.ds_trigger) {
            arr.push(t)
        }
    }
    if (info.ds_trigger_form) {
        for (let item of info.ds_trigger_form) {
            var zctrl = $DS.getCtrl(item)
            if (zctrl) arr.push(zctrl.info.ds_id)
        }
    }
    return arr;
}

/**
 * 触发其他控件刷新
 * @param idArr
 */
function triggerComps(idArr, ctrltype, ctrlId) {
    for (let i = 0; i < idArr.length; i++) {
        var type = $DS.getCtrlType(idArr[i])
        if (!type) {
            console.warn(`【警告】${idArr[i]}:触发刷新的控件不存在!`)
            continue;
        }
        ;
        if (!window["$" + type]) {
            if (!window.loadComponentsJs) {
                console.error(`【错误】${idArr[i]}控件不存在,请确认组件[$${type}]是否正常加载!`)
            }
            var cfg = {formObj: {}}
            cfg.formObj[idArr[i]] = VUECFG.formObj[idArr[i]];
            window.loadComponentsJs(cfg)
            temporary.triggerArr.push({
                type: type,
                idArr: $DS.util.clone(idArr),
                ctrltype: ctrltype,
                ctrlId: ctrlId,
                index: i,
            })
            if (!window.triggerForJsLoad) {
                var triggerForJsLoad = setInterval(function () {
                    var oneTrigger = temporary.triggerArr[0];
                    if (oneTrigger) {
                        if (window[`$${oneTrigger.type}`]) {
                            //如果未注册
                            if (!temporary.vueRegister[oneTrigger.type]) {
                                console.log(`【动态加载JS】$${oneTrigger.type}>>>>>>`)
                                //注册组件
                                var ctrlCfg = window[`$${oneTrigger.type}`];
                                if (!ctrlCfg) {
                                    util.exceptionRegister(`$${oneTrigger.type}`)
                                    return false;
                                }
                                ctrlCfg.register();
                                temporary.vueRegister[oneTrigger.type] = true;
                            }
                            //触发刷新
                            triggerOneComp({
                                idArr: oneTrigger.idArr,
                                ctrltype: oneTrigger.ctrltype,
                                ctrlId: oneTrigger.ctrlId,
                                index: oneTrigger.index,
                            })
                            temporary.triggerArr.splice(0, 1);
                        }
                    } else {
                        window.clearInterval(triggerForJsLoad)
                        delete window.triggerForJsLoad
                    }
                }, 100)
            }
        } else {
            triggerOneComp({
                idArr: $DS.util.clone(idArr),
                ctrltype: ctrltype,
                ctrlId: ctrlId,
                index: i,
            })
        }
    }
}

/**
 * 触发加载一个控件
 * @param pms
 * @return {boolean}
 */
function triggerOneComp(pms) {
    var idArr = pms.idArr;//触发的数组
    var i = pms.index;//触发的控件index
    var ctrl = $DS.getCtrlById(idArr[i]);//触发的控件
    var ctrlId = pms.ctrlId;//原控件Id
    var ctrltype = pms.ctrltype;//原控件类型
    //控件不存在
    if (!ctrl) {
        console.log("控件" + idArr[i] + "不存在");
        return false;
    }
    //echarts控件首次加载时不触发自身 或 双击刷新自己时避免重复触发
    if (ctrlId && ctrlId == idArr[i] && (window.vm.isFirstLoad == true || !temporary[ctrlId + "_loadSelf"])) {
        return false;
    }
    var tirggeredCtrlType = $DS.getCtrlType(idArr[i]);
    //树查询跳过控件触发
    if (ctrltype === "input" && tirggeredCtrlType === "tree" && ctrl.info.ds_tree_isfilter === true) {
        //触发搜索
        $DS.triggerFilter([idArr[i]], $input.getData(ctrlId));
        return false;
    }
    //表格查询跳过控件触发
    if (ctrltype === "input" && tirggeredCtrlType === "grid" && ctrl.info.ds_enablesearch === true) {
        //触发搜索
        $DS.triggerFilter([idArr[i]], $input.getData(ctrlId));
        return false;
    }
    //菜单查询跳过控件触发
    if (ctrltype === "input" && tirggeredCtrlType === "menu" && ctrl.info.ds_menu_filter === true) {
        //触发搜索
        $DS.triggerFilter([idArr[i]], $input.getData(ctrlId));
        return false;
    }
    //如果触发刷新的控件存在引用数据源,加载引用数据源
    if (ctrl.info.ds_refdatasource) {
        temporary.refObj[idArr[i]] = true;
    }

    //echarts控件触发自身时 修改状态 防止多次触发自身
    if (ctrl.info.ds_isEchart === true && temporary.hasOwnProperty(ctrl.info.ds_id + "_loadSelf")) {
        temporary[ctrl.info.ds_id + "_loadSelf"] = false;
    }
    //触发控件刷新
    $DS.loadCtrl($DS.getCtrlById(idArr[i]).info.ds_ctrlname);
}

/**
 * 设置页面名称
 */
function setPageTitle() {
    var title = $DS.getPms("URL_PAGETITLE")
    if (!title) title = window.$PAGETITLE;
    document.title = title ? title : "";
}

/**
 * 设置页面loading效果
 */
function setLoading(flag) {
    //初始化loading
    if (flag) {
        if (!window.top.loadingObj || window.top.loadingObj.count === 0) {
            var loading = new Loading()
            loading.init({
                target: document.body
            });
            loading.start();
            if (!window.top.loadingObj) {
                window.top.loadingObj = {
                    loading: null,
                    count: 0
                }
            }
            window.top.loadingObj.loading = loading;
        }
        window.top.loadingObj.count++;
    } else {
        if (window.top.loadingObj.count === 1) {
            window.top.loadingObj.loading.stop();
            window.top.loadingObj.loading = null;
        }
        window.top.loadingObj.count--;
    }
}

/**
 * 设置loading展示文本
 * @param html
 * @param target
 */
function setLoadingText(html, target) {
    if (!target) target = document.body
    $(target).find(".ui-loading-text").html(html)
}

/**
 * 重写提示
 * @param msg 提示信息
 * @param callbackFun 回调函数(action)
 * @param title 标题
 * @param confirmButtonText 确定按钮文本
 * @param type 图标类型
 */
function alert(msg, callbackFun, title, confirmButtonText, type) {
    try {
        var vue = (window.vm) ? window.vm : new Vue({})
        vue.$alert(msg, {
            title: title ? title : "信息",
            confirmButtonText: confirmButtonText ? confirmButtonText : "确定",
            dangerouslyUseHTMLString: true,
            type: type ? type : 'warning',
            callback: action => {
                if (window[callbackFun])
                    window[callbackFun](action);
            }
        });
    } catch (e) {
        window.alert = function (msg) {
            if (!msg) {
                msg = "未知的异常信息!"
            }
            if (window.layer)
                layer.alert(msg, {icon: 7});
            else
                WinAlert(msg);

        };
        alert(msg);
    }
}

/*---------------------------------系统级方法---------------------------------------------------------*/
/**
 * 查询表数据
 * @param appId 系统id console系统可以给 null
 * @param columns 字段 逗号分隔 "aaa,bbb"
 * @param tableName 表名
 * @param filter "AND aaa='"+"bbb"+"'"
 * @param errDiscripe 异常描述
 * @param dbSource ""和portal 一般不用管
 * @param customcolumns 扩展字段  例如:'<a><span style="cursor: pointer;color:blue;" onclick="viewdata()"title="查看数据">&nbsp;&nbsp;<img src="../pubcss/icon/img/search.png" />&nbsp;&nbsp;查看数据</span></a>' as editbtn
 * @returns {*}
 */
function selectTableData(appId, columns, tableName, filter, errDiscripe, dbSource, customcolumns) {
    var returnResult = {
        isError: false,
        result: [],
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "表数据查询异常"
    filter = filter ? filter : "";
    if ($DS.util.isFullAngle(filter)) {
        console.log(`过滤条件存在全角字符,请检查!【${filter}】`)
    }
    var params = {
        columns: columns,
        tableName: tableName,
        filter: filter,
        customcolumns: (customcolumns) ? customcolumns : "",
        dbSource: (dbSource) ? dbSource : ""
    };
    var basePath = $DS.util.getProjectName(appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/selectFormInfo", params);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return returnResult;
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 通用保存
 * @param appId 系统id console系统可以给 null
 * @param type 类型 add edit
 * @param datas 数据对象{aaa:bbb}
 * @param tableName 表名
 * @param keyField 主键 GUID
 * @param callback 回调函数
 * @param errDiscripe 异常描述
 * @param otherParams 其他参数
 * @param dbSource ""和portal 一般不用管
 * @param isRefOrderNum 0和1 一般不用管
 * @returns {boolean}
 */
function saveTableData(appId, type, datas, tableName, keyField, callback, errDiscripe, otherParams, dbSource, isRefOrderNum) {
    debugger;
    var saveResult = {
        isError: false,
        result: {},
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "保存异常"
    var param = {
        type: type,
        columns: "",
        keyField: keyField,
        tableName: tableName,
        isRefOrderNum: (isRefOrderNum) == "0" ? isRefOrderNum : "1",
        datas: JSON.stringify(datas),
        dbSource: (dbSource) ? dbSource : "",
    }

    var basePath = $DS.util.getProjectName(appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/saveForm", param);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!")
        saveResult.isError = true;
        saveResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return saveResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg)
        saveResult.isError = true;
        saveResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return saveResult;
    } else {
        if (callback)
            callback(result.result.rowObj, otherParams);
    }
    saveResult.result = result.result;
    return saveResult;
}

/**
 * 获取clob
 * @param appId
 * @param tableName 表名
 * @param keyFieldName 主键名
 * @param keyVal 主键值
 * @param clobFieldName clob字段名
 * @param callback
 * @param errDiscripe
 * String tableName, String keyFieldName, String keyVal, String clobFieldName
 */
function getClob(appId, tableName, keyFieldName, keyVal, clobFieldName, callback, errDiscripe) {
    debugger;
    var saveResult = {
        isError: false,
        result: {},
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "获取clob异常";
    var param = {
        keyFieldName: keyFieldName,
        keyVal: keyVal,
        tableName: tableName,
        clobFieldName: clobFieldName,
    }

    var basePath = $DS.util.getProjectName(appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/getClob", param);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!")
        saveResult.isError = true;
        saveResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return saveResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        saveResult.isError = true;
        saveResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return saveResult;
    } else {
        if (callback)
            //todo
            callback(result.result);
    }
    saveResult.result = result.result;
    return saveResult;
}

/**
 * 保存clob
 * @param appId
 * @param clobFieldName 字段名
 * @param content 字段值
 * @param tableName 表名
 * @param keyFieldName 主键名
 * @param keyVal 主键值
 * @param callback
 * @param errDiscripe
 */
function saveClob(appId, clobFieldName, content, tableName, keyFieldName, keyVal, callback, errDiscripe) {
    debugger;
    var saveResult = {
        isError: false,
        result: {},
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "获取clob异常";

    var param = {
        keyFieldName: keyFieldName,
        tableName: tableName,
        keyVal: keyVal,
        clobFieldName: clobFieldName,
        content: content ? JSON.stringify(content) : "",
    }

    var basePath = $DS.util.getProjectName(appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/setClob", param);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        saveResult.isError = true;
        saveResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return saveResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        saveResult.isError = true;
        saveResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return saveResult;
    } else {
        if (callback)
            //todo
            callback(result.result);
    }
    saveResult.result = result.result;
    return saveResult;
}

/**
 * 字段信息
 * @param tableName 表名
 * @param appId 系统标识
 * @param errDiscripe 异常描述
 * @returns {*}
 */
function selectFactors(tableName, appId, errDiscripe) {
    var returnResult = {
        isError: false,
        result: [],
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "字段信息查询异常"
    var basePath = $DS.util.getProjectName(appId);
    var select = basePath + "/sysconfig/frame/selectFactors";
    var params = {
        tableName: tableName,
        appId: appId
    }
    var result = YCDCommon.Ajax.syncAjax(select, params);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return returnResult;
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 通过字段名获取字段信息
 * @param source
 * @param fieldName
 * @returns {null|*}
 */
function getOneFieldFromDource(source, fieldName) {
    var fieldInfo = source.fieldInfo;
    if (!fieldInfo) return null;
    for (var key in fieldInfo) {
        if (key == fieldName) {
            return fieldInfo[key];
        }
    }
    return null;
}

/**
 * 查询下级字段
 * @param appId appId
 * @param fieldInfo 字段信息
 * @param formatName 格式化名称
 * @param formatId 格式化id
 * @param isTree 是否为层级关系
 * @param initValues //初始化数据
 * @param filter 过滤条件
 * @param allowNull 是否添加空
 * @param filterFieldFilter //过滤已经查询的引用数据
 * @param dbSource
 * @returns {boolean|T[]}
 */
function selectRefFiled(appId, fieldInfo, formatName, formatId, allowNull, isTree, initValues, filter, filterFieldFilter, dbSource) {
    var returnResult = {
        isError: false,
        result: [],
        errMsg: ""
    };

    var basePath = $DS.util.getProjectName(appId);
    //过滤条件
    var fkFilter = fieldInfo.FK_FILTER;
    if (fkFilter) {
        //替换$的过滤条件
        var reg = /\@\{.*?\}/g;
        var arr = fkFilter.match(reg);
        if (arr != null && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                var name = arr[i];//匹配到的@{}数组
                var fieldname = name.substring(2, name.length - 1).toUpperCase();
                var ini = null;
                if (initValues) {
                    ini = initValues[fieldname];
                } else {
                    ini = $DS.util.getSysDefault("$" + fieldname + "$")
                }
                if (ini) {
                    var value = "'" + ini + "'";
                } else {
                    value = null;
                }
                if (!value || value == null) {
                    console.error("数据过滤条件【" + name + "】未匹配到相应参数值，请检查！")
                    returnResult.isError = true;
                    returnResult.errMsg = "数据过滤条件【" + name + "】未匹配到相应参数值，请检查！";
                    return returnResult;
                }
                fkFilter = fkFilter.replaceAll('\\@{' + fieldname + '}', value, false);
                fieldInfo.FK_FILTER = fkFilter;
            }
        }
    }
    if (filter) {
        filter = filter + ((fieldInfo.FK_FILTER) ? " and " + (fieldInfo.FK_FILTER) : "");
    } else {
        filter = (fieldInfo.FK_FILTER) ? (fieldInfo.FK_FILTER) : "";
    }
    ;
    if (filterFieldFilter) {
        filter = filter + " and " + filterFieldFilter;
    }
    var result;
    if (fieldInfo.FK_TABLENAME == 'DM_BASE_CODES') {
        result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/listBaseCode", {
            baseType: fieldInfo.FK_FIELDNAME,
            superGuid: '*',
            dbSource: (dbSource != null) ? (dbSource) : "",
            filter: filter
        });
    } else if (fieldInfo.FK_TABLENAME == 'CSSCODES') {
        if (fieldInfo.FIELD_TYPE == "006") {
            result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/getCssData", {
                fieldName: fieldInfo.FK_FIELDNAME,
                filter: filter,
                dbSource: (dbSource != null) ? (dbSource) : ""
            });
        } else {
            result.result = [];
        }
    } else {

        var params = {
            tableName: fieldInfo.FK_TABLENAME,
            fieldName: fieldInfo.FK_FIELDNAME,
            txtName: fieldInfo.FK_TXTNAME,
            filter: filter,
            dbSource: (dbSource != null) ? (dbSource) : ""
        }
        result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/getKffieldData", params);
    }
    if (result.isError) {
        console.error("【" + fieldInfo.FIELD_NAMECN + "】字段查询关联外键表【" + fieldInfo.FK_TABLENAME + "】信息异常:" + result.errMsg)
        returnResult.isError = true;
        returnResult.errMsg = "【" + fieldInfo.FIELD_NAMECN + "】字段查询关联外键表【" + fieldInfo.FK_TABLENAME + "】信息异常:" + result.errMsg;
        return returnResult;
    }
    result = result.result;
    result.reverse();
    if (allowNull && fieldInfo.TYPE == "select") {
        var fieldCName = fieldInfo.FIELD_NAMECN
        if (fieldInfo.FIELD_NAME == 'SUPERGUID') {
            result.push({ID: "#", NAME: "---  请选择" + fieldCName + "  ---"});
        } else {
            result.push({ID: "", NAME: "---  请选择" + fieldCName + "  ---"});
        }

    }
    result.reverse();
    if (isTree) {
        result = $DS.util.children(result, "ID", "PID", "children")
    } else {
        for (var r = 0; r < result.length; r++) {
            result[r][formatName] = result[r].NAME;
            result[r][formatId] = result[r].ID;
        }
    }
    returnResult.result = result
    return returnResult;
}

/**
 * 查询表数据
 * @param appId 系统id console系统可以给 null
 * @param tableName 表名
 * @param columns 表显示的字段: aaa,bbb,ccc
 * @param keyField 主键字段
 * @param filter 过滤条件   {"filter1": "AND aaa='"+"bbb"+"'", fliter2:"aaa:bbb;ccc:ddd"} filter2为外键多值引用过滤,可不填
 * @param order 排序 ORDERID asc
 * @param customcolumns 扩展字段  例如:'<a><span style="cursor: pointer;color:blue;" onclick="viewdata()"title="查看数据">&nbsp;&nbsp;<img src="../pubcss/icon/img/search.png" />&nbsp;&nbsp;查看数据</span></a>' as editbtn
 * @param errDiscripe 异常描述
 * @param dbSource 业务表来源 ""和portal 一般不用管
 * @returns {*}
 */
function selectAllTableData(appId, tableName, columns, keyField, filter, order, customcolumns, errDiscripe, dbSource) {
    var returnResult = {
        isError: false,
        result: [],
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "表数据查询异常(多数据)";
    //order = getOrderFields(order, "t.");
    if (filter) {
        let filterStr = "";
        for (let key in filter) {
            filterStr += filter[key]
        }
        var filterLength = $DS.util.getStrLength(filterStr);
        if (filterLength > 35000) {
            errDiscripe = "表数据查询异常:sql超出长度限制";
            returnResult.errMsg = "【" + errDiscripe + "!】";
            console.error(errDiscripe);
            return returnResult;
        }
    } else {
        filter = {}
    }
    filter = JSON.stringify(filter)
    if ($DS.util.isFullAngle(filter)) {
        console.log(`过滤条件存在全角字符,请检查!【${filter}】`)
    }
    //获取数据
    var params = {
        tableName: tableName,
        columns: columns ? columns.join(",") : "",
        keyField: keyField,
        filter: filter ? encodeURI(filter) : "",
        order: order ? order : "",
        customcolumns: customcolumns ? $DS.util.replace(customcolumns) : "",
        dbSource: dbSource ? dbSource : ""
    }
    var basePath = $DS.util.getProjectName(appId);
    var url = basePath + "/sysconfig/frame/getTableData";
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    returnResult.result = result;
    return returnResult;
}

/**
 * 根据sql查询数据
 * @param appId 系统id console系统可以给 null
 * @param sql 字符串
 * @param errDiscripe 异常描述
 * @param dbSource 业务表来源 ""和portal 一般不用管
 * @returns {*}
 */
function selectBySql(appId, sql, errDiscripe, dbSource) {
    var returnResult = {
        isError: false,
        result: null,
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "sql查询异常";
    if ($DS.util.isFullAngle(sql)) {
        console.log(`SQL存在全角字符,请检查!【${sql}】`)
    }
    //获取数据
    var params = {
        sql: sql,
        dbSource: dbSource ? dbSource : ""
    }
    var basePath = $DS.util.getProjectName(appId);
    var url = basePath + "/sysconfig/frame/selectBySql";
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return returnResult
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 根据Form sql查询数据
 * @param appId 系统id console系统可以给 null
 * @param formid 表单
 * @param sqlno sql代码
 * @param params 参数列表
 * @param dbSource 业务表来源 ""和portal 一般不用管
 * @returns {*}
 */
function selectByFormSql(appId, formid, sqlno, params, dbSource) {
    var returnResult = {
        isError: false,
        result: null,
        errMsg: ""
    }
    //获取数据
    var params = {
        formid: formid,
        sqlno: sqlno,
        params: params ? JSON.stringify(params) : "",
        dbSource: dbSource ? dbSource : ""
    }
    var basePath = $DS.util.getProjectName(appId);
    var url = basePath + "/sysconfig/frame/queryByFormSql";
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        returnResult.isError = true;
        returnResult.errMsg = "执行查询错误!";
        return returnResult;
    }
    if (result.isError) {
        returnResult.isError = true;
        returnResult.errMsg = result.errMsg;
        return returnResult
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 执行Form sql，更新数据
 * @param appId 系统id console系统可以给 null
 * @param formid 表单
 * @param sqlno sql代码
 * @param params 参数列表
 * @param dbSource 业务表来源 ""和portal 一般不用管
 * @returns {*}
 */
function exeFormSql(appId, formid, sqlno, params, dbSource) {
    var returnResult = {
        isError: false,
        result: null,
        errMsg: ""
    }
    //获取数据
    var params = {
        formid: formid,
        sqlno: sqlno,
        params: params ? JSON.stringify(params) : "",
        dbSource: dbSource ? dbSource : ""
    }
    var basePath = $DS.util.getProjectName(appId);
    var url = basePath + "/sysconfig/frame/exeFormSql";
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        returnResult.isError = true;
        returnResult.errMsg = "系统错误!";
        return returnResult;
    }
    if (result.isError) {
        returnResult.isError = true;
        returnResult.errMsg = result.errMsg;
        return returnResult
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 通用执行sql
 * @param appId 系统id console系统可以给 null
 * @param sql 字符串
 * @param errDiscripe 异常描述
 * @param dbSource 业务表来源 ""和portal 一般不用管
 * @returns {*}
 */
function exeSql(sql, errDiscripe, dbSource, appId) {
    if (!appId) appId = VUECFG.appId;
    var returnResult = {
        isError: false,
        result: null,
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "sql执行异常";
    //获取数据
    var params = {
        sql: sql,
        dbSource: dbSource ? dbSource : ""
    }
    var basePath = $DS.util.getProjectName(appId);
    var url = basePath + "/sysconfig/frame/execBySql";
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return returnResult;
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 通用执行sql
 * 多条SQL，支持事务
 * @param sql 字符串
 * @param dbSource 业务表来源 ""和portal 一般不用管
 * @returns {*}
 */
function exeSqls(sqls, appId, dbSource) {
    if (!appId) appId = VUECFG.appId;
    var returnResult = {
        isError: false,
        result: null,
        errMsg: ""
    }
    //获取数据
    var basePath = $DS.util.getProjectName(appId);
    var url = basePath + "/sysconfig/frame/exesqls";
    var params = {
        sqls: sqls,
        dbSource: dbSource ? dbSource : ""
    }
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        returnResult.isError = true;
        returnResult.errMsg = "系统错误!";
        return returnResult;
    }
    if (result.isError) {
        returnResult.isError = true;
        returnResult.errMsg = result.errMsg;
        return returnResult;
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 根据页面数据源--通用删除
 * @param ds_name 页面数据源名称
 * @param keyvalue 主键值，支持主键值包含动态参数
 * @param delRel 级联删除相关表(T1:F1,T2:F2)
 * @param dbSource 业务表来源 ""和portal
 */
function deleteByPageSource(ds_name, keyvalue, delRel, dbSource) {
    //获取数据源对象
    var source = $DS.getSource(ds_name);
    if (!source) {
        var returnResult = {isError: true, errMsg: "获取名称为【" + ds_name + "】的数据源失败，请检查配置是否有误？"};
        return returnResult;
    }
    var appId = source.appId ? source.appId : VUECFG.appId;
    keyvalue = $DS.util.replace(keyvalue);
    //调AJAX服务，执行删除操作
    var url = $DS.util.getProjectName(appId) + "/sysconfig/frame/deleteById";
    var params = {
        tableName: source.tableName,
        keyField: source.keyField,
        keyId: keyvalue,
        delRel: delRel ? delRel : "",
        dbSource: dbSource ? dbSource : ""
    };
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        var returnResult = {isError: true, errMsg: "【" + errDiscripe + "】系统错误!"};
        return returnResult;
    }
    if (result.isError) {
        var returnResult = {isError: true, errMsg: result.errMsg};
        return returnResult;
    }
    return {isError: false};
}

/**
 * 通用删除
 * @param appId 系统id console系统可以给 null
 * @param tableName 表名
 * @param keyField 主键
 * @param keyId 主键值
 * @param callBack 回调函数
 * @param delRel 级联删除相关表(T1:F1,T2:F2)
 * @param errDiscripe 异常描述
 * @param pms 携带参数
 * @param dbSource 业务表来源 ""和portal 一般不用管
 */
function deleteById(appId, tableName, keyField, keyId, callBack, delRel, errDiscripe, pms, dbSource) {
    if (!errDiscripe) errDiscripe = "删除异常"
    var returnResult = {
        isError: false,
        errMsg: ""
    }
    var url = $DS.util.getProjectName(appId) + "/sysconfig/frame/deleteById";
    var params = {
        tableName: tableName,
        keyField: keyField,
        keyId: keyId,
        delRel: delRel ? delRel : "",
        dbSource: dbSource ? dbSource : ""
    };
    var result = YCDCommon.Ajax.syncAjax(url, params);
    if (!result) {
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        console.error("【" + errDiscripe + "】系统错误!");
        return returnResult;
    }
    if (result.isError) {
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        console.error("【" + errDiscripe + "】" + result.errMsg);
        return returnResult;
    } else {
        if (callBack)
            callBack(result.result, pms);
    }
    return returnResult;
}

/**
 *  根据控件删除控件数据
 * @param ctrlId 控件ID
 * @param tableName 表名
 * @param keyField 主键字段
 * @param keyVal 主键值
 * @param errDiscripe 异常描述
 * @param callback 回调函数
 * @param pms 携带参数
 * @param delRel 级联删除相关表(T1:F1,T2:F2)
 * @param dbSource 业务表来源 ""和portal 一般不用管
 * @returns {{isError: boolean, errMsg: string}}
 */
function deleteByCtrlId(ctrlId, keyVal, callback, pms, delRel, errDiscripe, tableName, keyField, dbSource) {
    var returnResult = {
        isError: false,
        errMsg: ""
    }
    var ctrl = $DS.getCtrlById(ctrlId);
    var dataSourceId = ctrl.info.ds_datasource;
    if (!dataSourceId) {
        console.error("【" + ctrlName + "】控件未指定数据源,删除失败!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + ctrlName + "】控件未指定数据源,删除失败!"
        return returnResult;
    }
    var source = $DS.getSourceById(dataSourceId);
    var appId = source.appId ? source.appId : VUECFG.appId;
    keyVal = $DS.util.replace(keyVal);
    if (source && (source.sourceType == "allData" || source.sourceType == "levelData")) {
        var skeyField = source.keyField;
        try {
            keyVal = JSON.parse(keyVal);
            //是树且为单选
            if ($DS.getCtrlType(ctrl.info.ds_id) == "tree" && !ctrl.info.ds_tree_showCheckbox && $DS.util.isArray(keyVal)) {
                keyVal = getAllChildArr(keyVal, ctrl.info.ds_children_filed, [])
            }
            var arr = [];
            for (var k = 0; k < keyVal.length; k++) {
                arr.push(keyVal[k][skeyField]);
            }
            keyVal = arr.join(",")

        } catch (e) {
            keyVal = keyVal;
            if (!keyVal) {
                returnResult.isError = true;
                returnResult.errMsg = "未设置正确的主键值!";
                return returnResult
            }
        }
    }

    tableName = tableName ? tableName : source.tableName;
    keyField = keyField ? keyField : source.keyField;
    var returnResult = $DS.deleteById(appId, tableName, keyField, keyVal, function (res, pms) {
        callback(res, pms, source.sourceName, keyVal)
    }, delRel, errDiscripe, pms, dbSource);
    return returnResult;
}

/**
 * 递归获取所有下级节点
 * @param arr
 * @param childField
 * @param returnArr
 */
function getAllChildArr(arr, childField, returnArr) {
    for (var a = 0; a < arr.length; a++) {
        returnArr.push(arr[a]);
        if (arr[a][childField] && arr[a][childField].length > 0) {
            returnArr = getAllChildArr(arr[a][childField], childField, returnArr)
        }
    }
    return returnArr;
}

/**
 * 获取排序字段
 * @param order
 * @param str
 * @returns {*|string}
 */
function getOrderFields(order, str) {
    order = order.split(",");
    for (var o = 0; o < order.length; o++) {
        if (order[o])
            order[o] = str + order[o];
    }
    return order.join(",")
}

/**
 *    通用查询树数据
 * @param appId 系统id console系统可以给 null
 * @param tableName 表名
 * @param id ID字段
 * @param pid PID字段
 * @param name NAME字段
 * @param order 排序字段
 * @param filter "AND aaa='"+"bbb"+"'"
 * @param status 确认状态 例如:fieldname='1'
 * @param errDiscripe 异常描述
 * @param otherCols 其他字段 逗号分割
 * @param customcolumns 扩展字段
 * @param treelist '0':LIST '1':childre格式
 * @param dbSource ""和portal 一般不用管
 * @returns {*}
 */
function selectTreeData(appId, tableName, id, pid, name, order, filter, errDiscripe, otherCols, customcolumns, treelist, status, dbSource) {
    var returnResult = {
        isError: false,
        result: [],
        errMsg: ""
    }
    if (!treelist) treelist = "1";
    if (!errDiscripe) errDiscripe = "树数据查询异常"
    var params = {
        id: id,
        pid: pid ? pid : "",
        name: name,
        table: tableName,
        order: order ? order : "",
        wherestr: (filter) ? encodeURI(filter) : "",
        status: status ? status : "",
        otherCols: (otherCols.length > 0) ? ("," + otherCols) : "",
        dbSource: (dbSource) ? dbSource : "",
        treelist: treelist,
        customcolumns: customcolumns ? $DS.util.replace(customcolumns) : "",
    };
    var basePath = $DS.util.getProjectName(appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/getTreeData", params);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return returnResult;
    }
    returnResult.result = result.result
    return returnResult;
}

/**
 * 通用执行方法
 * @param val
 */
function commonFunction(funName, params, loading) {
    if (funName && window[funName]) {
        if (loading) {
            $DS.loadingFun(funName, {
                vue: this,
                params: params
            })
        } else {
            window[funName]({
                vue: this,
                params: params
            })
        }
    }
}

/*---------------------------------表单控件方法---------------------------------------------------------*/
/**
 * 加载控件
 * @param name
 * @param refreshRef 刷新引用数据 true|false
 */
function loadCtrl(name, refreshRef) {
    console.log(`【加载】${name}>>>`)
    var ctrl = $DS.getCtrl(name);
    var id = ctrl.info.ds_id;
    var source = $DS.getSourceById(ctrl.info.ds_datasource);
    var type = $DS.getCtrlType(id);
    //控件加载先删除自身参数推送
    if (ctrl.info.ds_param) {
        $DS.delPms(ctrl.info.ds_param)
    }
    //如果引用数据源刷新,刷新引用
    if (ctrl.info.ds_refdatasource && (temporary.refObj[id] || refreshRef)) {
        delete temporary.refObj[id];
        $DS.clearData(ctrl);
        $DS.refFieldRef(name);
    }

    if (source) {
        //如果有数据源
        $DS.setSourceVal(source, id);
    } else if (ctrl && ctrl.info.ds_defaultval) {
        //如果没有数据源但是有缺省值
        $DS.initCtrlDefvalue(ctrl)
    } else {
        if (VUECFG.$refs[id]) {
            VUECFG.$refs[id].refdate++;
        }
        if (type == "menu") {
            $menu.checkFirst(id)
        }
        //如果是tabs
        if (type == "tabs") {
            $tabs.load(id);
        }
        if (type == "iframe") {
            $iframe.reloadIframe(id);
        }
        //日期类控件初始化推送参数
        if (type == "time" || type == "timerange" || type == "date" || type == "daterange") {
            $DS.dealPms(ctrl.info, $DS.getValById(id))
        }
        //加载完成事件
        var trigger = true;//触发状态
        if (ctrl.info.ds_load_success) {
            //自定义函数
            $DS.eval(ctrl.info.ds_load_success, ctrl.info, trigger);
        }
        if (trigger) {
            $DS.trigger(ctrl)
        }
    }
    //处理显示条件
    if (ctrl.info.ds_showCondition && VUECFG.viewStatu) {
        var str = $DS.util.replace(ctrl.info.ds_showCondition)
        ctrl.info.ds_show = eval(str);
        if (VUECFG.$refs[id] && VUECFG.$refs[id].$data)
            VUECFG.$refs[id].$data.refdate = Date.parse(new Date());
    }

}

/**
 * 通过ID获取控件名称
 * @param id
 * @return {*}
 */
function getCtrlNameById(id) {
    var ctrl = $DS.getCtrlById(id)
    return ctrl.info.ds_ctrlname;

}


/**
 * 通过控件名获取控件属性
 * @param ctrlName
 * @returns {*}
 */
function getCtrlByName(ctrlName) {
    var repeat = [];
    var obj = null;
    var arr = VUECFG.formObj;
    for (var a in arr) {
        if (arr[a].info.ds_ctrlname == ctrlName) {
            repeat.push(arr[a].info.ds_id)
            obj = arr[a]
        }
    }
    if (repeat.length > 1) {
        var msg = `【${ctrlName}】控件名称出现重复!</br>可能导致结果异常,请检查!`;
        alert(msg)
        console.error(msg)
    }
    return obj;
}

/**
 * 通过Id名获取控件属性
 * @param id
 * @returns {*}
 */
function getCtrlById(id) {
    if (!temporary.compObj) temporary.compObj = {};
    var oneObj = VUECFG.formObj[id]
    var type = $DS.getCtrlType(id);
    if (!type)
        return false;
    var onePro = {};
    if (temporary.compObj[type]) {
        onePro = temporary.compObj[type];
    } else {
        if (window["$" + type]) {
            onePro = window["$" + type].getConfig();
            temporary.compObj[type] = onePro;
        } else {
            console.warn("【警告】因存在内嵌表单可能导致多层嵌套中的底层控件属性版本不是最新的!")
        }
    }
    //补足控件属性
    for (var o in onePro) {
        if (oneObj.info[o] === undefined) {
            oneObj.info[o] = onePro[o]
        }
    }
    return oneObj;
}

/**
 * 通过名称获取控件值
 * @param name
 * @returns {*}
 */
function getCtrlValueByName(name) {
    var id = $DS.getCtrl(name).info.ds_id;
    var val = "";
    if (window["$" + $DS.getCtrlType(id)] && window["$" + $DS.getCtrlType(id)].getData)
        val = window["$" + $DS.getCtrlType(id)].getData(id)
    return val;
}

/**
 * 通过名称设置控件值
 * @param name
 * @param val
 */
function setCtrlValueByName(name, val, cache) {

    var obj = $DS.getCtrl(name);
    setCtrlValByObj(obj, val, cache);
}

/**
 * 通过ID获取控件值
 * @param id
 * @returns {*}
 */
function getCtrlValById(id) {
    var val = "";
    if (window["$" + $DS.getCtrlType(id)] && window["$" + $DS.getCtrlType(id)].getData)
        val = window["$" + $DS.getCtrlType(id)].getData(id)
    return val;
}

/**
 * 通过ID设置控件值
 * @param id
 * @param val
 * @param cache 缓存
 * @param trigger 触发状态
 *
 */
function setCtrlValById(id, val, cache) {
    var obj = VUECFG.formObj[id];
    setCtrlValByObj(obj, val, cache);
}

/**
 * 通过控件对象设置控件值
 * @param obj
 * @param val val可以为查出的数据源数据,也可以为用户指定的值
 */
function setCtrlValByObj(obj, val, cache) {
    if (window["triggerInterval_" + obj.info.ds_id]) {
        debugger
        window.clearInterval(window["triggerInterval_" + obj.info.ds_id])
        delete window["triggerInterval_" + obj.info.ds_id];
    }
    $DS.util.tryCatch(function ({obj, val, cache}) {
        var ctrlId = obj.info.ds_id;
        var ctrl = $DS.getCtrlById(ctrlId);
        var type = $DS.getCtrlType(ctrlId);
        var info = obj.info;
        //设置值
        if (window["$" + type] && window["$" + type].setData) {
            if (info.ds_before_loadData) {
                $DS.eval(info.ds_before_loadData, info, {val, cache});
            }
            window["$" + type].setData(ctrlId, val, cache);
        }
        //推送参数
        try {
            var value = $DS.getValById(ctrlId);
            $DS.dealPms(info, value);
        } catch (e) {

        }
        //处理加载完成
        window["triggerInterval_" + ctrlId] = setInterval(function () {
            if (temporary.loadRegister[ctrlId] || VUECFG.$refs[ctrlId]) {
                //推送参数
                var value = $DS.getValById(ctrlId);
                $DS.dealPms(info, value);
                //触发
                var trigger = true;
                trigger = $DS.isTrigger(type, info);
                //加载完成事件
                if (obj.info.ds_load_success) {
                    //自定义函数
                    $DS.eval(obj.info.ds_load_success, obj.info, trigger);
                }
                if (trigger) {
                    $DS.trigger(obj)
                }
                //刷新
                $DS.refForm();
                $DS.refPro();
                window.clearInterval(window["triggerInterval_" + obj.info.ds_id])
                delete window["triggerInterval_" + obj.info.ds_id];
            }
        }, 100)
    }, function ({obj, val, cache}) {

    }, "【" + obj.info.ds_ctrlname + "】设置控件值异常!", {obj, val, cache})
}

/**
 * 通过ID获取控件类型
 * @param id
 * @returns {*|string}
 */
function getCtrlTypeById(id) {
    var obj = VUECFG.formObj[id];
    if (!obj) return false;
    var type = obj.type;
    type = type.split("drag_")[1];
    return type;
}

/**
 * 添加拖拽监听
 * @param vue
 */
function addListener(vue) {
    if (!VUECFG.viewStatu && vue.info.ds_id && $("#" + vue.info.ds_id)[0]) {
        $("#" + vue.info.ds_id)[0].addEventListener("dragstart", dragStart);
        $("#" + vue.info.ds_id)[0].addEventListener("dragend", dragEnd);
    }
}

/**
 * 点击事件
 * @param vue
 */
function changeCurrId(vue) {

    $DS.util.stopEvent(event);
    //处理样式
    if (!$(vue.currentTarget).attr("ispro")) {
        $(".ds_ctrl").find(".ds-form-item").removeClass("ds_ctrl_active");
        $(vue.currentTarget).find(".ds-form-item").addClass("ds_ctrl_active");
    }
    //处理逻辑
    if ($(vue.currentTarget).attr("ispro")) {
        //属性控件点击id
        VUECFG.proId = vue.currentTarget.id;
        var ctrltype = $(vue.currentTarget).attr("ctrltype")
        VUECFG.proType = ctrltype;
    } else {
        if (!vue.currentTarget) {
            if (!VUECFG.viewStatu) {
                var ctrlname = $DS.getCtrlById(vue.id).info.ds_ctrlname;
                vm.$confirm(`当前界面不存在【${ctrlname}(ID:${vue.id})】控件, 是否删除?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delete VUECFG.formObj[vue.id]
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        } else {
            //当前控件点击id
            VUECFG.ctrlId = vue.currentTarget.id;
            vm.$data.currentId = vue.currentTarget.id;
            //当前控件类型
            var ctrltype = $(vue.currentTarget).attr("ctrltype")
            VUECFG.ctrlType = ctrltype;
            //展示属性
            if (ctrltype && !VUECFG.viewStatu) {
                try {
                    window["$" + ctrltype].showProperty();
                } catch (e) {
                    console.log(e);
                    util.exceptionRegister("$" + ctrltype);
                }
            }
            if (VUECFG.viewStatu) {
                console.log(VUECFG.ctrlId)
                //处理报表失去焦点
                if (window.top.$SPREAD) {
                    for (var key in window.top.$SPREAD) {
                        if (window.top.$SPREAD[key] && window.top.$SPREAD[key].focus) {
                            window.top.$SPREAD[key].focus(false)
                        }
                    }
                }
            }
        }
    }

}

/**
 * 格式化层级属性
 * @param cfg
 * @returns {[]}
 */
function formatterCtrlProCfg(cfg) {
    var cfgArr = [];
    var obj = {};
    for (var c = 0; c < cfg.length; c++) {
        var arr = [];
        if (cfg[c].info.group1) {
            if (!obj[cfg[c].info.group1]) obj[cfg[c].info.group1] = {
                children: [],
                group: {}
            };
            if (cfg[c].info.group2) {
                if (!obj[cfg[c].info.group1].group[cfg[c].info.group2])
                    obj[cfg[c].info.group1].group[cfg[c].info.group2] = [];
                obj[cfg[c].info.group1].group[cfg[c].info.group2].push(cfg[c])
            } else {
                obj[cfg[c].info.group1].children.push(cfg[c])
            }
        } else {
            cfgArr.push(cfg[c])
        }
    }
    for (var key1 in obj) {
        var newObj1 = {
            id: key1,
            name: key1,
            children: obj[key1].children
        };
        for (var key2 in obj[key1].group) {
            var newObj2 = {
                id: key2,
                name: key2,
                children: obj[key1].group[key2]
            };
            newObj1.children.push(newObj2)
        }
        cfgArr.push(newObj1)
    }
    return cfgArr;
}

/**
 * 复制删除按钮鼠标移出
 */
function ctrlMouseLeave(e) {
    if (this.info.ds_ispro) return;
    this.hide = "y-hide"
}

/**
 * 复制删除按钮鼠标移入
 */
function ctrlMouseOver(e) {
    if (this.info.ds_ispro) return;
    this.hide = VUECFG.viewStatu ? "y-hide" : "y-show"
}

/**
 * 根据对象获取各个控件自定义配置信息
 * @param ctrl
 * @param obj
 * @returns {{type: *, info: ([]|*[])}}
 */
function getProInfoByObj(ctrl, obj) {
    var ctrlObj = window["$" + ctrl];
    var info = {
        type: ctrlObj.type,
        info: deepClone(ctrlObj.getConfig())
    }
    for (var key in obj) {
        info.info[key] = obj[key];
    }
    return info;
}

/**
 * 通用执行函数
 * @param funInfo
 * @param obj
 * @param val
 * @param event
 */
function evalFunction(funInfo, obj, val, event) {
    var res = null;
    try {
        if (funInfo) {
            if (window[funInfo]) {
                if (val) {
                    res = window[funInfo](obj, val);
                } else if (event) {
                    res = window[funInfo](obj, event);
                } else {
                    res = window[funInfo](obj);
                }

            } else {
                res = eval(funInfo);
            }
            return $DS.util.isUndefined(res) ? true : res;
        } else {
            return true;
        }
    } catch (e) {
        console.log(`【执行脚本异常】:${funInfo}`)
        console.log({obj, val, event})
        console.error(e)
        return res
    }
}

/**
 * 通过控件id获取控件数据源
 * @param id
 * @returns {*}
 */
function getDataSourceForCtrl(id) {
    for (var s = 0; s < VUECFG.sourceArr.length; s++) {
        if (VUECFG.sourceArr[s].sourceGroup[id]) {
            return VUECFG.sourceArr[s];
        }
    }
}

/**
 * 处理结果
 * @param fun 执行函数
 * @param pms 执行参数
 * @param sureFun 正向结果函数
 * @param errFun 反向结果函数
 * @param funDesc 函数描述
 */
function dealResult(res, sureFun, errFun, pms, funDesc) {
    if (funDesc) console.log(funDesc)
    if (res.isError) {
        alert(res.errMsg)
        return (errFun) ? errFun(res.errMsg, pms) : false
    } else {
        res = res.result
        return (sureFun) ? sureFun(res, pms) : true
    }
}

/*---------------------------------属性方法---------------------------------------------------------*/
/**
 * 属性变更
 *     ctrlId:控件id,
 *     proName:控件属性,
 *     proCtrlType:属性展示控件类型
 *     proVal:属性值
 */
function setProperties(ctrlId, proName, proCtrlType, proVal) {
    if (ctrlId == "PAGE") {
        for (var p = 0; p < VUECFG.pageArr.length; p++) {
            if (VUECFG.pageArr[p].info.ds_name == proName) {
                VUECFG.pageArr[p].info["ds_" + proCtrlType] = proVal;
            }
        }
        //刷新页面属性
        $DS.refPagePro();
    } else {
        //变更表单属性
        VUECFG.formObj[ctrlId].info[proName] = proVal;
        //变更属性列表的属性
        var proArr = VUECFG.proObj[ctrlId];
        for (var p = 0; p < proArr.length; p++) {
            if (proArr[p].info.ds_name == proName) {
                proArr[p].info["ds_" + proCtrlType] = proVal;
            }
        }
        //刷新表单
        $DS.refForm();
        //刷新属性
        $DS.refPro();
    }
}

/**
 * 获取属性控件类型数据(属性切换控件)
 */
function getAllCtrl() {
    var option = [];
    for (var c = 0; c < componentsCfg.length; c++) {
        var group = {
            label: componentsCfg[c].classify_text,
            options: [],
        }
        var dragDatas = componentsCfg[c].dragDatas;
        for (var d = 0; d < dragDatas.length; d++) {
            group.options.push({
                value: dragDatas[d].btn_ctrltype,
                label: dragDatas[d].btn_text
            })
        }
        option.push(group);
    }
    return option;
}

/**
 * 获取格式化类型配置对象
 */
function getFormatObj() {
    var option = [{
        value: "STRING",
        label: "字符串"
    }, {
        value: "NUMBER",
        label: "整型"
    }, {
        value: "FLOAT",
        label: "浮点型"
    }, {
        value: "BOOLEAN",
        label: "布尔值"
    }, {
        value: "ARRAY",
        label: "数组"
    }, {
        value: "JSON",
        label: "JSON"
    }];
    return option;
}

/**
 * 获取字体加粗选项
 */
function getFontWeight() {
    return [{
        value: "bold",
        label: "bold"
    }, {
        value: "normal",
        label: "normal"
    }, {
        value: "100",
        label: "100"
    }, {
        value: "200",
        label: "200"
    }, {
        value: "300",
        label: "300"
    }, {
        value: "400",
        label: "400"
    }, {
        value: "500",
        label: "500"
    }, {
        value: "600",
        label: "600"
    }, {
        value: "700",
        label: "700"
    }, {
        value: "800",
        label: "800"
    }, {
        value: "900",
        label: "900"
    }]
}

/**
 * 获取字体样式
 */
function getFontFamily() {
    return [
        {value: "SimSun", label: "宋体"},
        {value: "SimHei", label: "黑体"},
        {value: '仿宋_GB2312', label: '仿宋_GB2312'},
        {value: '方正小标宋简体', label: '方正小标宋简体'},
        {value: "Microsoft YaHei", label: "微软雅黑"},
        {value: "Microsoft JhengHei", label: "微软正黑体"},
        {value: "NSimSun", label: "新宋体"},
        {value: "FangSong", label: "仿宋"},
        {value: "KaiTi", label: "楷体"},
        {value: "LiSu", label: "隶书"},
        {value: "YouYuan", label: "幼圆"},
        {value: "STXihei", label: "华文细黑"},
        {value: "STKaiti", label: "华文楷体"},
        {value: "STSong", label: "华文宋体"},
        {value: "STZhongsong", label: "华文中宋"},
        {value: "STFangsong", label: "华文仿宋"},
        {value: "FZShuTi", label: "方正舒体"},
        {value: "FZYaoti", label: "方正姚体"},
        {value: "STCaiyun", label: "华文彩云"},
        {value: "STHupo", label: "华文琥珀"},
        {value: "STLiti", label: "华文隶书"},
        {value: "STXingkai", label: "华文行楷"},
        {value: "STXinwei", label: "华文新魏"},
        {value: "Arial", label: "Arial"},
        {value: "lcd", label: "LCD液晶"},
        {value: "zhFont", label: "字魂35"},
        {value: "Tahoma", label: "Tahoma"},
        {value: "Verdana", label: "Verdana"},
        {value: "Lucida Grande", label: "Lucida Grande"},
        {value: "Times New Roman", label: "Times New Roman"},
        {value: "Georgia", label: "Georgia"},
        {value: "PmingLiu", label: "PmingLiu"},
        {value: "Impact", label: "Impact"},
        {value: "Book Antiqua", label: "Book Antiqua"},
        {value: "Century Gothic", label: "Century Gothic"},
        {value: "Courier New", label: "Courier New"},
        {value: "serif", label: "serif"},
        {value: "sans-serif", label: "sans-serif"},
        {value: "monospace", label: "monospace"}]
}

/**
 * 获取控件基本配置对象
 */
function getCtrlConfig($ctrl) {
    var ctrlType = $ctrl.type;
    //从数据库中取对应控件属性
    var properties = getProperties(ctrlType);
    var ctrlName = ctrlType.substr(5).toUpperCase() + "_" + $ctrl.uuid++;
    var ctrlConfig = {};
    for (let i = 0; i < properties.length; i++) {
        var pItem = properties[i];
        ctrlConfig[pItem.PNAME] = getProDefaultVal(pItem);
    }
    ctrlConfig.ds_ctrlname = ctrlName
    return ctrlConfig;
}

/**
 * 从数据库获取控件详细属性
 */
function getProperties(ctrlType) {
    var ctrl = $DS.selectBySql(null, "select * from dm_form_components t where t.ctrlname='" + ctrlType + "'", "查询控件信息异常");
    if (ctrl.isError) {
        alert(ctrl.errMsg);
        return false;
    } else {
        ctrl = ctrl.result;
    }
    var properties = $DS.selectBySql(null, "select * from dm_form_cproperties t where t.ctrlname='" + ctrlType + "' order by porder", "查询控件属性信息异常");
    if (properties.isError) {
        alert(properties.errMsg);
        return false;
    } else {
        properties = properties.result;
    }
    if (ctrl[0] && ctrl[0].BASECTRL && ctrl[0].BASECTRL != '') {
        var baseCtrl = ctrl[0].BASECTRL;
        var basePro = $DS.selectBySql(null, "select * from dm_form_cproperties t where t.ctrlname='" + baseCtrl + "' order by porder", "查询共有属性信息异常");
        if (basePro.isError) {
            alert(basePro.errMsg);
            return false;
        } else {
            basePro = basePro.result;
        }
        properties = basePro.concat(properties);
    }
    return properties;
}

/**
 * 获取属性默认值
 */
function getProDefaultVal(pItem) {
    var val = '';
    if (!pItem || pItem.DEFAULTVAL == undefined) return val;
    var parseType = pItem.PARSETYPE;
    var defaultVal = pItem.DEFAULTVAL;
    switch (parseType) {
        case "STRING":
            val = defaultVal + "";
            break;
        case "NUMBER":
            util.tryCatch(function () {
                val = (parseInt(defaultVal)) ? parseInt(defaultVal) : 0;
            }, function () {
                val = 0;
            }, "整型格式化错误,请检查数值格式是否符合规则!");
            break;
        case "FLOAT":
            util.tryCatch(function () {
                val = (parseFloat(defaultVal)) ? parseFloat(defaultVal) : 0;
            }, function () {
                val = 0;
            }, "浮点型格式化错误,请检查数值格式是否符合规则!");
            break;
        case "BOOLEAN":
            val = (defaultVal.toUpperCase() == "TRUE") ? true : false;
            break;
        case "ARRAY":
            val = defaultVal.split(",");
            break;
        case "JSON":
            util.tryCatch(function () {
                val = JSON.parse(defaultVal)
            }, function () {
                val = [];
            }, "JSON格式化错误,请检查值格式是否符合规则!");
    }
    return val;
}

/**
 * 所有编辑类型
 */
function getAllEditor() {
    var result = $DS.selectBySql(null, "select * from dm_form_code where basename='editors'", "查询控件编辑类型信息异常");
    if (result.isError) {
        alert(result.errMsg);
        return false;
    } else {
        return result.result;
    }
}

/**
 *显示对应控件的右侧属性
 */
function showProperty() {
    VUECFG.proObj[VUECFG.ctrlId] = [];
    var cfg = [];
    var ctrlConfigObj = VUECFG.formObj[VUECFG.ctrlId].info;
    var ctrlType = VUECFG.formObj[VUECFG.ctrlId].type;
    //组件类型
    var type = getProInfoByObj("select", {
        ds_id: "type",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "组件类型",
        ds_placeholder: "组件类型",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: true,
        ds_options: getAllCtrl(),
        ds_select: ctrlType, //$input   drag_input
        ds_select_change: "changeFormCtrl",
        ds_name: "type",
        ds_ispro: true,
        ds_isrequired: true
    })
    cfg.push(type);
    var properties = getProperties(ctrlType);
    for (let i = 0; i < properties.length; i++) {
        var pItem = properties[i];
        if (pItem.ISSHOW === "0")
            continue;
        var editor = pItem.EDITOR;//编辑器
        var extInfo = pItem.EXTINFO;//扩展属性
        //var defaultVal = ctrlConfigObj[pItem.PNAME];//默认值
        var obj = {
            ds_id: pItem.PNAME, //"ds_ctrlname"
            ds_pid: VUECFG.ctrlId,
            ds_draggable: "false",
            ds_style: "ds-mt-1",
            ds_labeltxt: pItem.PCNAME,
            ds_placeholder: pItem.PCNAME,
            //ds_input: ctrlConfigObj[pItem.PNAME], //值
            ds_name: pItem.PNAME,//"ds_ctrlname"
            ds_ispro: true,

        };
        obj['ds_' + editor] = ctrlConfigObj[pItem.PNAME];//值
        //添加扩展属性
        if (extInfo && extInfo.trim() != '') {
            var extObj;

            util.tryCatch(function () {
                extObj = eval("({" + extInfo + "})");
            }, function () {
                extObj = {}
            }, "拓展属性解析失败");

            for (var pKey in extObj) {
                var pVal = getExtPVal(extObj[pKey]);
                obj[pKey] = pVal;
            }

        }
        var cfgItem = getProInfoByObj(editor, obj);
        cfg.push(cfgItem);

    }
    VUECFG.proArr = cfg;
    VUECFG.proObj[VUECFG.ctrlId] = cfg;
}

/**
 * 获取扩展属性值
 */
function getExtPVal(pVal) {

    if (!pVal)
        return '';
    if (typeof pVal === 'string') {
        if (pVal.toUpperCase() == "FALSE")
            return false;
        else if (pVal.toUpperCase() == "TRUE")
            return true;

        //特殊处理值是方法
        if (pVal.indexOf("${") != -1) {
            /**
             *  ${aa|{bb:cc}}
             *  pkey:'${方法名|参数}'
             */
            var pArry = pVal.substring(pVal.indexOf("${") + 2, pVal.lastIndexOf("}")).split("|");
            var fun = pArry[0];
            var parms;
            if (pArry[1] && pArry[1] != '') {
                util.tryCatch(function () {
                    parms = eval("(" + pArry[1] + ")");

                }, function () {
                    parms = null;
                }, "拓展属性定义方法参数解析失败")
            }
            pVal = window[fun](parms);
        }

    }

    return pVal;
}

/*---------------------------------数据源方法---------------------------------------------------------*/
/**
 * 格式化字段信息
 * @param fieldInfo
 */
function formatFieldInfo(fieldInfo) {
    var fieldObj = {};
    for (var f = 0; f < fieldInfo.length; f++) {
        fieldObj[fieldInfo[f].FIELD_NAME] = fieldInfo[f];
    }
    return fieldObj;
}

/**
 * 重新查询数据源表和字段信息
 */
function reloadDataSourceFieldInfo(cfg) {
    debugger
    if (!cfg) cfg = VUECFG;
    //数据源
    var sourceArr = cfg.sourceArr;
    for (var s = 0; s < sourceArr.length; s++) {
        var appId = sourceArr[s].appId ? sourceArr[s].appId : VUECFG.appId;
        //重查表信息(不为sql数据源且不是预览状态)
        if (sourceArr[s].sourceType != "sqlData" && !cfg.viewStatu) {
            getSourceTables(true, appId);
            //表信息
            sourceArr[s].tableInfo = VUECFG.appObj[sourceArr[s].appId]
        }
        //重新查询字段信息
        var result = null;
        if (sourceArr[s].sourceType != "sqlData") {
            if (temporary.fieldInfoObj[sourceArr[s].tableName]) {
                result = temporary.fieldInfoObj[sourceArr[s].tableName];
            } else {
                result = $DS.selectFieldInfo(sourceArr[s].tableName, appId, "重查询字段信息异常");
                if (result.isError) {
                    alert(result.errMsg);
                    return false;
                } else {
                    result = result.result;
                    temporary.fieldInfoObj[sourceArr[s].tableName] = result;
                }
            }
            sourceArr[s].fieldInfo = formatFieldInfo(result);
        } else {
            if (!sourceArr[s].fieldInfo || Object.keys(sourceArr[s].fieldInfo).length == 0) {
                debugger
                /*alert(`【${sourceArr[s].sourceName}】SQL数据源字段信息缺失,请设置!`)
                return false;*/
            }
        }
        //字段存在校验
        var fieldMap = sourceArr[s].fieldMap;
        for (var key in fieldMap) {
            if (!key || key === undefined) {
                delete fieldMap[key];
                continue;
            }
            if (!sourceArr[s].fieldInfo[key]) {
                var flag = true;
                if (sourceArr[s].customcolumns) {
                    var costom = sourceArr[s].customcolumns.split(",");
                    for (var c = 0; c < costom.length; c++) {
                        var carr = costom[c].split(" ")
                        if (carr[carr.length - 1].toUpperCase() == key) flag = false;
                    }
                }
                if (flag)
                    console.error("【" + key + "】字段已经不存在于【" + sourceArr[s].sourceName + "】" +
                        "数据源中,继续使用可能造成程序出错!请检查【" + appId + "】" +
                        "系统的【" + sourceArr[s].tableName + "】表中是否存在该字段!")
            }
        }
    }
}

/**
 * 根据参数池初始化数据源数据信息
 */
function initCtrl(cfg) {
    debugger
    if (!cfg) cfg = VUECFG;
    VUECFG.catchLoad = true;
    //优先加载
    for (var f in cfg.firstObj) {
        var ctrl = $DS.getCtrlById(f);
        if (!ctrl) {
            console.log("ID为" + n + "的控件不存在,已删除!")
            delete cfg.firstObj[f];
            continue;
        }
        $DS.loadCtrl(ctrl.info.ds_ctrlname)
    }
    for (var n in cfg.normalObj) {
        var ctrl = $DS.getCtrlById(n);
        if (!ctrl) {
            console.log("ID为" + n + "的控件不存在,已删除!")
            delete cfg.normalObj[n];
            continue;
        }
        $DS.loadCtrl(ctrl.info.ds_ctrlname)
    }
    VUECFG.catchLoad = false;
}

/**
 * 控件初始化控件缺省值
 */
function initCtrlDefvalue(ctrlObj) {
    var flag = false;
    var type = $DS.getCtrlType(ctrlObj.info.ds_id)
    var val = "";
    //查询字段缺省值
    if (ctrlObj.info.ds_datasource && ctrlObj.info.ds_name) {
        flag = true;
        var dataSource = $DS.getSourceById(ctrlObj.info.ds_datasource);
        if (dataSource) {
            var fieldInfo = dataSource.fieldInfo[ctrlObj.info.ds_name];
            var defaultval = fieldInfo ? fieldInfo.DEFAULTVAL : null;
            if (defaultval) {
                val = $DS.util.getSysDefault(defaultval);
            }
        }
    }
    //如果设置了缺省值
    if (ctrlObj.info.ds_defaultval) {
        flag = true;
        val = $DS.util.replace(ctrlObj.info.ds_defaultval)
        if (val && val.trim().indexOf("@>") == 0) {
            try {
                val = eval(val.trim().substring(2))
            } catch (e) {
                console.error(e)
                val = val
            }
        }
        console.log("缺省结果值>>>=======================================")
        console.log(val)
    }
    //变更控件值
    if (flag) {
        $DS.setValById(ctrlObj.info.ds_id, val, true);
    }
}

/**
 * 通过名称获取数据源
 * @param name
 * @returns {null}
 */
function getSourceByName(name) {
    var cnt = 0;
    var sourceObj = null;
    var sourceArr = VUECFG.sourceArr;
    for (var s = 0; s < sourceArr.length; s++) {
        if (sourceArr[s].sourceName == name) {
            cnt++;
            sourceObj = sourceArr[s];
        }
    }
    if (cnt > 1) alert("数据源名称出现重复!</br>可能导致结果异常,请检查!")
    return sourceObj;
}

/**
 * 通过ID获取数据源
 * @param id
 * @returns {*}
 */
function getSourceById(id) {
    var cnt = 0;
    var sourceObj = null;
    var sourceArr = VUECFG.sourceArr;
    for (var s = 0; s < sourceArr.length; s++) {
        if (sourceArr[s].sourceId == id) {
            cnt++;
            sourceObj = sourceArr[s];
            if (VUECFG.viewStatu) return sourceObj;
        }
    }
    if (cnt > 1) alert("数据源名称出现重复!</br>可能导致结果异常,请检查!")
    return sourceObj;
}

/**
 * 通过数据源获取数据
 * @param source 数据源
 * @param cache 是否缓存
 * @param extFilter 扩展过滤条件
 * @returns {*}
 */
function getSourceData(source, cache, extFilter) {
    if (!source) {
        alert("请先设置数据源信息!")
        return;
    }
    var appId = source.appId ? source.appId : VUECFG.appId;
    if (source.sourceType == "singleData") {//如果是单值数据
        var fieldMap = source.fieldMap;
        //替换过滤条件
        var filter = source.filter;
        //存在扩展条件
        if (extFilter) {
            filter = filter ? `${filter} ${extFilter}` : extFilter;
        }
        if (filter) {
            if (!cache || (cache && !temporary.cacheSourceData.hasOwnProperty(source.sourceId))) {
                //查询数据
                filter = $DS.util.replace(filter, null, true);
                var allColumns = Object.keys(fieldMap);
                var result = $DS.select(appId, allColumns.join(","), source.tableName, filter,
                    "查询【" + source.sourceName + "】数据源数据异常", "", source.customcolumns);
                if (result.isError) {
                    alert(result.errMsg);
                    return false;
                }
                //数据源记录数据
                source.sourceData = result.result;
                //缓存记录数据
                temporary.cacheSourceData[source.sourceId] = result.result;
                return source.sourceData;
            } else {
                //从缓存中取
                return temporary.cacheSourceData[source.sourceId]
            }
        } else {
            var tip = "提示:【" + source.sourceName + "】数据源选择的单数据类型,但未设置过滤条件,当数据源保存时会执行新增操作!"
            console.error(tip)
        }
    } else if (source.sourceType == "allData") {//如果是多值数据
        if (!cache || (cache && !temporary.cacheSourceData.hasOwnProperty(source.sourceId))) {
            //查询数据
            var filter = source.filter;
            //存在扩展条件
            if (extFilter) {
                filter = filter ? `${filter} ${extFilter}` : extFilter;
            }
            if (filter)
                filter = $DS.util.replace(filter, null, true);
            if ((!source.tableName || !source.keyField || (!source.columns || source.columns.length == 0)) && source.tableName.toUpperCase() != "DM_BASE_CODES") return [];
            var columnNames = [];
            $.each(source.columns, function (index, item) {
                columnNames.push(item.FIELD_NAME);
            })
            var result = $DS.selectAll(appId, source.tableName, columnNames,
                source.keyField, {filter1: filter}, source.order, source.customcolumns,
                "查询【" + source.sourceName + "】数据源数据异常")
            if (result.isError) {
                alert(result.errMsg);
                return false;
            } else {
                result = result.result;
            }
            //数据源记录数据
            source.sourceData = result;
            //缓存记录数据
            temporary.cacheSourceData[source.sourceId] = result;
            return source.sourceData;
        } else {
            //从缓存中取
            return temporary.cacheSourceData[source.sourceId]
        }

    } else if (source.sourceType == "levelData") {//如果是层级数据
        var filter = source.filter;
        //存在扩展条件
        if (extFilter) {
            filter = filter ? `${filter} ${extFilter}` : extFilter;
        }
        if ((!source.tableName || !source.treeId || !source.treeName) && source.tableName.toUpperCase() != "DM_BASE_CODES") return [];
        if (!cache || (cache && !temporary.cacheSourceData.hasOwnProperty(source.sourceId))) {
            if (filter)
                filter = $DS.util.replace(filter, null, true);
            if (source.tableName === "DM_BASE_CODES") {
                source.treeId = "ITEMCODE";
                source.treePid = "";
                source.treeName = "ITEMNAME";
                source.treeotherCols = "GUID";
            }
            //查询数据
            var result = $DS.selectTree(appId, source.tableName, source.treeId, source.treePid, source.treeName,
                source.order, filter, "查询层级数据异常", source.treeotherCols, source.customcolumns, "1",
                source.status, source.dbSource);
            if (result.isError) {
                alert(result.errMsg);
                return false;
            } else {
                result = result.result;
            }
            //数据源记录数据
            source.sourceData = result;
            //缓存记录数据
            temporary.cacheSourceData[source.sourceId] = result;
            return source.sourceData;
        } else {
            //从缓存中取
            return temporary.cacheSourceData[source.sourceId]
        }
    } else if (source.sourceType == "sqlData") {//如果是SQL数据
        if (!cache || (cache && !temporary.cacheSourceData.hasOwnProperty(source.sourceId))) {
            var sql = source.sql;
            //存在扩展条件
            if (extFilter) {
                sql = sql ? `${sql} ${extFilter}` : extFilter;
            }
            sql = $DS.util.replace(sql, null, true);
            var result = null;
            //查询数据
            if (sql) {
                result = $DS.selectBySql(appId, sql, "查询SQL数据异常", source.dbSource)
                if (result.isError) {
                    alert(result.errMsg);
                    return false;
                } else {
                    result = result.result;
                }
            }
            //数据源记录数据
            source.sourceData = result;
            //缓存记录数据
            temporary.cacheSourceData[source.sourceId] = result;
            return source.sourceData;
        } else {
            //从缓存中取
            return temporary.cacheSourceData[source.sourceId]
        }
    }
}

/**
 * 通过数据源获取数据
 * @param source
 */
function getSourceVal(sourceName) {
    var source = $DS.getSource(sourceName);
    if (!source) {
        alert("请先设置数据源信息!")
        return;
    }
    var data = {};
    var sourceGroup = source.sourceGroup;
    if (source.sourceType == "singleData") {//如果是单值数据
        //字段映射>字段名:控件id
        var fieldMap = source.fieldMap;
        for (var key in fieldMap) {
            var value = $DS.getValById(fieldMap[key]);
            data[key] = value;
        }
    } else if (source.sourceType == "allData" || source.sourceType == "levelData") {//如果是多值数据或层级数据
        for (var s in sourceGroup) {
            var value = $DS.getValById(sourceGroup[s]);
            var ctrlName = $DS.getCtrlById(sourceGroup[s]).info.ds_ctrlname;
            data[ctrlName] = value;
        }
    }
    return data;
}

/**
 * 通过数据源回显数据源相关数据
 * @param source 数据源
 * @param ctrlid 加载指定id的数据
 */
function setSourceVal(source, ctrlid) {
    var appId = source.appId ? source.appId : VUECFG.appId;
    //设置数据源
    var ctrl = $DS.getCtrlById(ctrlid);
    if (!ctrl) {
        console.err(`setSourceVal:设置数据源值失败!【${ctrlid}】当前控件不存在!`)
        return false;
    }
    //控件类型
    var type = $DS.getCtrlType(ctrlid)
    //数据源控件映射
    var sourceGroup = source.sourceGroup;
    if (source.sourceType == "singleData") {//如果是单值数据
        var fieldMap = source.fieldMap;
        var fieldName = ctrl.info.ds_name;
        //替换过滤条件
        var filter = source.filter;
        if (filter) {
            //回显数据
            if (fieldName && fieldMap[fieldName]) {
                //查询数据
                var data = null;
                if (VUECFG.catchLoad && temporary.cacheSourceData[source.sourceId]) {
                    data = temporary.cacheSourceData[source.sourceId]
                } else {
                    filter = $DS.util.replace(filter, null, true);
                    var allColumns = Object.keys(fieldMap);
                    data = $DS.select(appId, allColumns.join(","), source.tableName, filter,
                        "查询【" + source.sourceName + "】数据源数据异常", "", source.customcolumns);
                    if (data.isError) {
                        alert(data.errMsg);
                        return false;
                    } else {
                        data = data.result ? data.result : {};
                        temporary.cacheSourceData[source.sourceId] = data;
                    }
                }
                source.sourceData = data;
                //判断数据类型匹配数据源
                if (window["$" + type].dataType != "singeleData" && window["$" + type].dataType != "doubleData") {
                    alert(`【${ctrl.info.ds_ctrlname}】控件不支持单值数据源!`)
                }
                //根据id设置数据
                try {
                    if (($DS.util.isUndefined(data[fieldName]) || $DS.util.isNull(data[fieldName]))) {
                        //如果没有数据源但是有缺省值
                        $DS.initCtrlDefvalue(ctrl)
                    } else {
                        if (type == "label") {
                            $DS.setValById(ctrlid, data, false);
                        } else {
                            $DS.setValById(ctrlid, data[fieldName], true);

                        }
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            //清除缓存
            if (!VUECFG.catchLoad)
                $DS.cleanCache();
        } else {
            console.error("提示:【" + source.sourceName + "】数据源选择的单数据类型,但未设置过滤条件,当数据源保存时会执行新增操作!")
        }
    } else if (source.sourceType == "allData") {//如果是多值数据
        //通过ID设置控件值
        if (!sourceGroup[ctrlid]) {
            delete sourceGroup[ctrlid];
            return false;
        }
        if (VUECFG.formObj[ctrlid]) {
            //查询数据
            var result = null;
            if (VUECFG.catchLoad && temporary.cacheSourceData[source.sourceId]) {
                result = temporary.cacheSourceData[source.sourceId]
            } else {
                var filter = source.filter;
                if (filter)
                    filter = $DS.util.replace(filter, null, true);
                var columnNames = [];
                $.each(source.columns, function (index, item) {
                    columnNames.push(item.FIELD_NAME);
                })
                var result = $DS.selectAll(appId, source.tableName, columnNames,
                    source.keyField, {filter1: filter}, source.order, source.customcolumns,
                    "查询【" + source.sourceName + "】数据源数据异常")
                if (result.isError) {
                    alert(result.errMsg);
                    return false;
                } else {
                    result = result.result;
                    temporary.cacheSourceData[source.sourceId] = result ? result : [];
                }
            }
            source.sourceData = result;
            //判断数据类型匹配数据源
            if (window["$" + type].dataType == "allData" || window["$" + type].dataType == "doubleData") {
                if (($DS.util.isUndefined(result) || $DS.util.isNull(result))) {
                    //如果没有数据源但是有缺省值
                    $DS.initCtrlDefvalue(ctrl)
                } else {
                    $DS.setValById(ctrlid, result, false);
                }
            } else {
                alert(`【${ctrl.info.ds_ctrlname}】控件不支持多值数据源!`)
            }
        }
    } else if (source.sourceType == "levelData") {//如果是层级数据
        //通过ID设置控件值
        if (!sourceGroup[ctrlid]) {
            delete sourceGroup[ctrlid];
            return false;
        }
        //通过ID设置控件值
        if (VUECFG.formObj[ctrlid]) {
            var result = null;
            if (VUECFG.catchLoad && temporary.cacheSourceData[source.sourceId]) {
                result = temporary.cacheSourceData[source.sourceId]
            } else {
                //替换过滤条件
                var filter = source.filter;
                if (filter) {
                    filter = $DS.util.replace(filter, null, true);
                }
                if (source.tableName === "DM_BASE_CODES") {
                    source.treeId = "ITEMCODE";
                    source.treePid = "";
                    source.treeName = "ITEMNAME";
                    source.treeotherCols = "GUID";
                }
                //查询数据
                result = $DS.selectTree(appId, source.tableName, source.treeId, source.treePid, source.treeName,
                    source.order, filter, "查询层级数据异常", source.treeotherCols, source.customcolumns, "1",
                    source.status, source.dbSource);
                if (result.isError) {
                    alert(result.errMsg);
                    return false;
                } else {
                    result = result.result;
                    temporary.cacheSourceData[source.sourceId] = result ? result : [];
                }
            }
            source.sourceData = result;
            //判断数据类型匹配数据源
            if (window["$" + type].dataType == "levelData" || window["$" + type].dataType == "doubleData") {
                if (($DS.util.isUndefined(result) || $DS.util.isNull(result))) {
                    //如果没有数据源但是有缺省值
                    $DS.initCtrlDefvalue(ctrl)
                } else {
                    //虚拟根节点
                    if (ctrl.info.ds_tree_rootText) {
                        var data = [{}];
                        data[0].ID = ctrl.info.ds_tree_rootId;
                        data[0].PID = "";
                        data[0].NAME = ctrl.info.ds_tree_rootText;
                        data[0].children = $DS.util.clone(result);
                        result = data;
                    }
                }
                $DS.setValById(ctrlid, result, false);
            } else {
                alert(`【${ctrl.info.ds_ctrlname}】控件不支持层级数据源!`)
            }
        }
    } else if (source.sourceType == "sqlData") {//如果是SQL数据
        var fieldName = ctrl.info.ds_name;
        //查询数据
        var data = null;
        if (VUECFG.catchLoad && temporary.cacheSourceData[source.sourceId]) {
            data = temporary.cacheSourceData[source.sourceId]
        } else {
            var allsql = source.sql;
            allsql = allsql.replaceAll("\n", "")
            allsql = $DS.util.replace(allsql, null, true);
            if (allsql) {
                data = $DS.selectBySql(appId, allsql, "查询SQL数据异常", source.dbSource)
                if (data.isError) {
                    alert(data.errMsg);
                    return false;
                } else {
                    data = data.result;
                }
            } else {
                data = [];
            }
            temporary.cacheSourceData[source.sourceId] = data ? data : [];
            source.sourceData = data;
        }
        //单数据源情况
        if (fieldName && (window["$" + type].dataType == "singeleData" || window["$" + type].dataType == "doubleData")) {
            if (data) data = (data[0]) ? data[0] : {};
            //根据id设置数据
            try {
                if (($DS.util.isUndefined(data[fieldName]) || $DS.util.isNull(data[fieldName]))) {
                    //如果没有数据源但是有缺省值
                    $DS.initCtrlDefvalue(ctrl)
                } else {
                    if (type == "label") {
                        $DS.setValById(ctrlid, data, false);
                    } else {
                        $DS.setValById(ctrlid, data[fieldName], true);

                    }
                }
            } catch (e) {
                console.log(e)
            }
            //清除缓存
            if (!VUECFG.catchLoad)
                $DS.cleanCache();
        } else {//多数据源和层级数据源情况
            //通过ID设置控件值
            if (!sourceGroup[ctrlid]) {
                delete sourceGroup[ctrlid];
                return false;
            }
            if (VUECFG.formObj[ctrlid]) {
                if (($DS.util.isUndefined(data) || $DS.util.isNull(data))) {
                    //如果没有数据源但是有缺省值
                    $DS.initCtrlDefvalue(data)
                } else {
                    //虚拟根节点
                    if ((window["$" + type].dataType == "levelData" || window["$" + type].dataType == "doubleData") && ctrl.info.ds_tree_rootText) {
                        /*var result = [{}];
                        result[0].ID = ctrl.info.ds_tree_rootId;
                        result[0].PID = "";
                        result[0].NAME = ctrl.info.ds_tree_rootText;
                        result[0].children = $DS.util.clone(data);
                        data = result;*/
                    }
                    $DS.setValById(ctrlid, data, false);
                }
            }
        }
    }
}

/**
 * 获取所有数据源选项
 * @returns {[{label: string, value: string}]}
 */
function getAllDatasource() {

    var dataSourceArr = [{
        label: "无",
        value: ""
    }];
    var arr = VUECFG.sourceArr;
    for (var s = 0; s < arr.length; s++) {
        dataSourceArr.push({
            label: arr[s].sourceName,
            value: arr[s].sourceId
        })
    }
    return dataSourceArr;
}

/**
 * 查询当前数据源下的字段信息
 * @param type
 * @param info
 */
function getAllDatasourceField(ctrlId) {
    var option = [{
        label: "无",
        value: ""
    }];
    if (!ctrlId)
        ctrlId = VUECFG.ctrlId;
    var sourceId = VUECFG.groupObj[ctrlId];
    var dataSource = $DS.getSourceById(sourceId);
    if (dataSource) {
        var fieldInfo = dataSource.fieldInfo;
        for (var fieldName in fieldInfo) {
            option.push({
                label: fieldInfo[fieldName].FIELD_NAMECN,
                value: fieldName
            })
        }
        if (dataSource.customcolumns) {
            var customArr = dataSource.customcolumns.split(",")
            for (var c = 0; c < customArr.length; c++) {
                if (customArr[c]) {
                    var arr = customArr[c].split(" ");
                    option.push({
                        label: arr[arr.length - 1],
                        value: arr[arr.length - 1].toUpperCase()
                    })
                }
            }
        }
    }
    return option;
}

/**
 * 刷新关联引用
 */
function refFieldRef(ctrlName) {
    debugger
    var arr = VUECFG.formObj;
    if (ctrlName) {
        var ctrl = $DS.getCtrl(ctrlName)
        var type = $DS.getCtrlType(ctrl.info.ds_id);
        if (ctrl.info.ds_refdatasource || ctrl.info.ds_name) {
            changeFieldNameForCtrl({ds_pid: ctrl.info.ds_id}, ctrl.info.ds_name);
        }
    } else {
        for (var a in arr) {
            var ctrl = $DS.getCtrlById(a);
            if (ctrl.info.ds_refdatasource || ctrl.info.ds_name)
                changeFieldNameForCtrl({ds_pid: ctrl.info.ds_id}, ctrl.info.ds_name);
        }
    }
}


/**
 * 通用表单数据源保存
 * @param name 数据源名称
 * @param saveCallBack 保存后回调事件(row:行数据)
 * @param beforeSave 保存前事件 (type:类型,source:数据源,data:数据)
 * @param saveType 保存类型 (add:新增,edit:修改)
 * @param otherParams 其他参数
 * @param dbSource ""和portal 一般不用管
 * @param isRefOrderNum 0和1 一般不用管
 */
function sourceCommonSaveForm(saveType, name, saveCallBack, beforeSave, otherParams, dbSource, isRefOrderNum) {
    var saveResult = {
        isError: false,
        result: [],
        errMsg: ""
    };
    var data = {};
    var type = "add";
    //数据源
    var source = $DS.getSource(name);
    var appId = source.appId ? source.appId : VUECFG.appId;
    if (saveType) {
        type = saveType;
    }
    //校验
    if (!source) {
        saveResult.isError = true;
        saveResult.errMsg = "请检查【" + name + "】数据源是否存在!";
        return saveResult;
    }
    if (!source.tableName) {
        saveResult.isError = true;
        saveResult.errMsg = "请设置【" + source.sourceName + "】数据源表名!";
        return saveResult;
    }
    if (!source.keyField) {
        saveResult.isError = true;
        saveResult.errMsg = "请设置【" + source.sourceName + "】数据源主键!";
        return saveResult;
    }
    //如果为一值数据源
    if (source.sourceType == "singleData") {
        //字段映射>字段名:控件id
        var fieldMap = source.fieldMap;
        for (var key in fieldMap) {
            var value = $DS.getValById(fieldMap[key]);
            data[key] = value;
        }
        if (data[source.keyField] && !saveType) type = "edit";
        //校验
        var checkMsg = $DS.check(data, source);
        if (checkMsg) {
            saveResult.isError = true;
            saveResult.errMsg = checkMsg;
            return saveResult;
        }
        //回调函数
        if (beforeSave)
            data = beforeSave(data, source, type, otherParams);

        //判断数据是否存在
        if (!data) {
            saveResult.isError = true;
            saveResult.errMsg = "数据为空,保存失败!";
            console.error("【sourceCommonSaveForm】数据为空,保存失败!")
            return saveResult;
        }
        //保存
        var result = $DS.saveTable(appId, type, data, source.tableName, source.keyField, function (row, pms) {

            //根据返回数据回显设置数据源值
            for (var key in fieldMap) {
                $DS.setValById(fieldMap[key], row[key.toUpperCase()], true);
            }
            //清除缓存
            $DS.cleanCache();
            //回调函数
            if (saveCallBack)
                saveCallBack(row, source, type, pms);
        }, "数据源保存失败", otherParams, dbSource, isRefOrderNum);
        if (result.isError) {
            saveResult.isError = true;
            saveResult.result = result.result;
            saveResult.errMsg = result.errMsg;
            return saveResult;
        } else {
            saveResult.result = result.result;
        }
        return saveResult;
    } else {
        console.error("多数据源请选择【$DS.saveGridSource】方法保存数据!")
    }
    return saveResult;
}

/**
 * 通用表多数据保存
 * @param tableName
 * @param keyField
 * @param data {inserted:[],updated:[],deleted:[]}
 * @param appId
 * @returns {null|undefined}
 */
function saveAllTableData(tableName, keyField, data, appId, isRefOrderNum) {
    if (!appId) appId = VUECFG.appId;
    var saveResult = {
        isError: false,
        result: [],
        errMsg: ""
    };
    if (!$DS.util.isString(data)) {
        data = JSON.stringify(data);
    }
    var url = $DS.util.getProjectName(appId) + "/sysconfig/frame/saveData";
    var params = {
        "tableName": tableName,
        "rows": data,
        "keyField": keyField,
        "isRefOrderNum": (isRefOrderNum) == "0" ? isRefOrderNum : "1",
    }
    var saveResult = YCDCommon.Ajax.syncAjax(url, params);
    return saveResult;
}

/**
 * 通用表格数据源保存
 * @param data
 * @param name
 * @param beforeSave
 * @returns {{result: [], isError: boolean, errMsg: string}|null|undefined}
 */
function sourceCommonSaveGrid(data, name, beforeSave) {

    var saveResult = {
        isError: false,
        result: [],
        errMsg: ""
    };
    //数据源
    var source = $DS.getSource(name);
    var appId = source.appId ? source.appId : VUECFG.appId;
    //校验
    if (!source) {
        saveResult.isError = true;
        saveResult.errMsg = "请检查【" + name + "】数据源是否存在!";
        return saveResult;
    }
    if (!source.tableName) {
        saveResult.isError = true;
        saveResult.errMsg = "请设置【" + source.sourceName + "】数据源表名!";
        return saveResult;
    }
    if (!source.keyField) {
        saveResult.isError = true;
        saveResult.errMsg = "请设置【" + source.sourceName + "】数据源主键!";
        return saveResult;
    }

    //保存前 校验数据
    for (var key in data) {
        //删除数据不进行校验
        if (key == "deleted") {
            continue;
        }
        for (let i = 0; i < data[key].length; i++) {
            var checkMsg = $DS.check(data[key][i], source);
            if (checkMsg) {
                saveResult.isError = true;
                saveResult.errMsg = checkMsg;
                return saveResult;
            }
        }
    }


    //多值数据源
    if (source.sourceType == "allData") {
        //保存前事件
        if (beforeSave) {
            beforeSave(source, data)
        }
        if (data) {
            saveResult = $DS.saveAllTableData(source.tableName, source.keyField, data, appId)
        } else {
            saveResult.isError = true;
            saveResult.errMsg = "无操作的的行数据!";
            console.error("【sourceCommonSaveGrid】无修改的行数据!")
        }
    }
    return saveResult;
}

/**
 * 跨页面多数据源保存
 * @param type 保存类型
 * @param saveObj 多页面保存对象
 *  [{
 *      iframeName:页面名称
 *      sourceName:数据源名称
 *      initvalues:初始化值{key:val}
 *  }]
 * @param sameGuid 是否保存相同的GUID
 * @returns {{isError: boolean, errMsg: string}|{result: null, isError: boolean, errMsg: string}|{data}|{isError}|*}
 */
function saveCrossDataSource(type, saveObj, sameGuid) {
    var guid = $DS.util.UUID().replaceAll("-", "").toUpperCase();
    var returnResult = {
        isError: false,
        result: null,
        errMsg: ""
    }
    try {
        for (var s = 0; s < saveObj.length; s++) {
            //初始化参数
            if (!saveObj[s].initvalues) {
                saveObj[s].initvalues = {};
            }
            //同GUID保存
            if (sameGuid) {
                saveObj[s].initvalues.GUID = guid;
            }
            //当前iframe页面
            var iframe = $DS.util.getIframeByName(saveObj[s].iframeName);
            if (!iframe || !iframe.length) {
                console.error("请检查【" + saveObj[s].iframeName + "】页面是否存在!");
                returnResult.isError = true;
                returnResult.errMsg = "请检查【" + saveObj[s].iframeName + "】页面是否存在!";
                return returnResult;
            }
            var result = iframe.$DS.saveSource(type, saveObj[s].sourceName, function (row, source, type, ps) {

            }, function (data, source, type, initvalues) {

                //如果是新增
                if (type == "add") {
                    for (var key in initvalues) {
                        if (initvalues[key] == "$GUID$") {
                            data[key] = guid;
                        } else {
                            data[key] = initvalues[key]
                        }
                    }
                }
                return data;
            }, saveObj[s].initvalues)
            if (result.isError) {
                if (type == "add") {
                    //删除上一个
                    var source = $DS.getSource(saveObj[s].sourceName);
                    var appId = source.appId ? source.appId : VUECFG.appId;
                    if ((result.result && result.result.rowObj && result.result.rowObj.GUID) || sameGuid) {
                        var del = $DS.deleteById(appId, source.tableName, source.keyField, sameGuid ? guid : result.result.rowObj.GUID, function () {

                        }, null, "保存失败!")
                        if (del.isError) {
                            returnResult = del;
                            return returnResult;
                        }
                    } else {
                        result.errMsg += ">>>保存失败后删除未找到保存的主键值!"
                    }
                    returnResult = result;
                    return returnResult;
                }
            }
        }
    } catch (e) {
        console.error(e)
        returnResult.isError = true;
        returnResult.errMsg = e;
        return returnResult;
    }
    return returnResult;
}

/**
 * 校验数据
 * @param data
 * @param source
 */
function checkData(data, source) {
    var fieldInfo = source.fieldInfo;
    for (var d in data) {
        if (fieldInfo[d]) {
            if (fieldInfo[d].FIELD_NAME.toUpperCase() == "GUID") continue;
            var str = "【" + fieldInfo[d].FIELD_NAMECN + "】";
            var value = data[d];
            var length = getLength(value);
            var codeLength = 0;
            var flag = true;
            var notNullFlag = false;
            //校验非空
            if (fieldInfo[d].ALLOWNULL == "0" || fieldInfo[d].ALLOWNULL === 0) {
                notNullFlag = true;
                if (!length)
                    return str + "不能为空!"
            }
            //字段长度
            if (fieldInfo[d].MAXLENGTH && (notNullFlag || length > 0)) {
                if (length > parseInt(fieldInfo[d].MAXLENGTH))
                    return str + "长度超出限制值(" + fieldInfo[d].MAXLENGTH + ")!";
            }
            //编码规则
            if (fieldInfo[d].CODERULE && (notNullFlag || length > 0)) {
                var coderule = fieldInfo[d].CODERULE.split(",");
                //校验编码长度
                for (var c = 0; c < coderule.length; c++) {
                    codeLength += parseInt(coderule[c]);
                    if (length == codeLength) flag = false;
                }
                if (flag) return str + "编码长度不符合规则!";
            }
            //正则校验
            if (fieldInfo[d].CODEFORMAT && (notNullFlag || length > 0)) {
                var codeformat = fieldInfo[d].CODEFORMAT;
                var formatTip = fieldInfo[d].CODEFORMATREMARK;
                var reg = new RegExp(codeformat);
                if (!reg.test(value)) {
                    return str + (formatTip ? formatTip : "编码不符合规则!")
                }
            }
        }
    }
}

/**
 * 更新表状态(字段)
 * @param tableName 表名
 * @param fieldName 状态字段
 * @param value 状态值
 * @param guids 主键值，“,”分隔
 * @param filter 过滤条件 (可传null或空字符串)
 * @param isCascade 是否级联更新 0 不级联，1、级联更新
 * @param appId
 * @return {{result: [], isError: boolean, errMsg: string}}
 */
function setFlagById(tableName, fieldName, value, guids, isCascade, appId) {
    if (!appId) appId = VUECFG.appId;
    var saveResult = {
        isError: false,
        result: [],
        errMsg: ""
    };
    var result = YCDCommon.Ajax.syncAjax($DS.util.getProjectName(appId) + "/frame/setFlagById", {
        "tableName": tableName,
        "fieldName": fieldName,
        "value": value,
        "guids": guids,
        "isCascade": isCascade ? isCascade : "1"
    });
    if (result.isError) {
        saveResult = result
    } else {
        saveResult.result = result.result;
    }
    return saveResult;
}

/*---------------------------------控件方法---------------------------------------------------------*/
/**
 * 步骤条变更
 * @param id
 * @param type
 * @param count
 */
function changeStepByName(ctrlName, type, count) {
    if (!count) count = 1;
    var ctrl = $DS.getCtrl(ctrlName);
    ctrl.info.ds_step_change_type = type;
    ctrl.info.ds_step_change_count = count;
    $("#" + ctrl.info.ds_id + "_step").click();

}

/**
 *  根据ID展开树节点
 * @param name
 * @param nodeIdArr
 */
function expandedTreeNode(ctrlName, nodeIdArr) {
    var ctrl = $DS.getCtrl(ctrlName);
    ctrl.info.ds_tree_default_expanded_keys = nodeIdArr;
    $DS.refPagePro();
    $DS.refForm();
    $DS.refPro();
    $DS.refSource();
}

/**
 * 获取当前控件内部window
 * @param name
 * @returns {{}|WindowProxy}
 */
function getSubWindowByName(name) {
    var ctrl = $DS.getCtrl(name)
    var type = $DS.getCtrlType(ctrl.info.ds_id)
    switch (type) {
        case "iframe":
            return $iframe.getSubWindow(name)
            break;
        case "tabs":
            return $tabs.getSubWindow(name)
            break;
        default:
            console.error(`【${name}】当前控件不包含IFRAME,无法使用此方法!`)
            break
    }
}

/**
 * 获取getUserRoleBean的某个属性
 * @param key
 * @return {string}
 */
function getUserRoleBean(key) {
    var arr = [];
    var userRoleBen = $DS.getPms("USER_userRoleBean");
    if (userRoleBen) {
        for (var u = 0; u < userRoleBen.length; u++) {
            if (userRoleBen[u][key]) {
                arr.push(userRoleBen[u][key])
            }
        }
    }
    return `'${arr.join("','")}'`
}

/**
 * 查看excel
 * @param url
 */
function viewExcel(url, fileName) {
    $excelUrl = {
        url: url,
        fileName: fileName
    };
    window.open(`${getProjectName()}/report/reportdesigner/lookreport/reportView.jsp`, fileName)
}

/**
 * 查看word
 * @param url
 */
function viewWord(url, fileName) {
    $wordUrl = {
        url: url,
        fileName: fileName
    };
    window.open(`${getProjectName()}/freeForm/manage/doc2html/view.html`, fileName)
}

/**
 * 根据文件路径预览PDF
 * @param filePath
 */
function viewPdf(filePath) {
    var key = filePath.split("/")
    key = key[key.length - 1];
    var url = `${getProjectName()}/pdfDesigner/resource/pdfjs/pdfjs/web/viewer.html?file=${filePath}`
    window.open(url, key ? key.split(".")[0] : "");
}

/**
 * 渲染PDF
 * {
 *      pdfName:PDF名称
 *      pdfCfg:{
 *          isCir:"true/false",//是否循环每页都展示如上内容
 *          headerText:"xxxxx",
 *          headerPos:"left/right/center",
 *          footerText:"xxxx",
 *          footetPos:"left?right/center",
 *          showPageNum:"true/false",//是否显示页数
 *          PageNumPos:"left/center/right",
 *          showTotal:"true,false",//是否显示总页数
 *          fromNum:"1/2/3/4/5", //页眉页脚页码从第几页开始写
 *      }
 *      pageArr:[{GUID:XXX,PAGE:WORD},{GUID:XXX,PAGE:EXCEL}]
 *  }
 *  {pdfName, pageArr, pdfCfg,pageHtml,ISSH,pageSrc}
 */
function randerPdf(obj) {
    var defaultCfg = {
        isCir: "true",//是否循环每页都展示如上内容
        headerText: "",
        headerPos: "left",
        footerText: "",
        footerPos: "left",
        showPageNum: "true",//是否显示页数
        PageNumPos: "right",
        showPageNumCss: "第${PAGENUM}页",//页数表达式:第${PAGENUM}页/共${PAGETOTAL}页
        fromNumOfHeader: "1", //页眉从第几页开始写
        fromNumOfFooter: "1", //页脚从第几页开始写
        fromNumOfPageNum: "1", //页码从第几页开始写
    }
    if (obj.pdfCfg) {
        for (var key in obj.pdfCfg) {
            defaultCfg[key] = obj.pdfCfg[key] ? obj.pdfCfg[key] : defaultCfg[key];
        }
    }
    window.top.$PDFJOINOBJ = {
        pdfName: obj.pdfName ? obj.pdfName : "PDF",
        pageArr: obj.pageArr,
        pdfCfg: defaultCfg,
        pageHtml: obj.pageHtml,
        stopViewPdf: true,
        ISSH: obj.ISSH,
        pageSrc: obj.pageSrc
    };
}

/**
 * 获取页面属性
 * @param key
 * @return {string|*}
 */
function getPageProp(key) {
    for (let item of VUECFG.pageArr) {
        if (item.info.ds_name == key) {
            return item.info[`ds_${item.type.split("drag_")[1]}`]
        }
    }
    return "";
}

/*---------------------------------内嵌方法---------------------------------------------------------*/
/**
 * 构造子表单数据
 */
function getIncludeArrByPageId(info, page, type) {
    if (!type) type = "pageId";
    debugger
    //1.获取cfg,与freeFormView保持同步
    var cfg = getVueCfgForInclude(info, page, type)
    //2.重新处理各个对象属性
    cfg = mergeIncludeProp(cfg)
    //3.处理继承属性
    dealInheritProp(info)
    //4.加载页面css文件
    $DS.loadPageCssFile(cfg);
    //5.根据CFG加载页面css
    $DS.loadPageCss(cfg);
    //6.根据CFG动态加载页面js
    if (window.loadComponentsJs) {
        temporary.jsObj = {};
        window.loadComponentsJs(cfg)
    }
    //7.根据CFG加载页面js文件
    $DS.loadPageJsFile(cfg);
    //8.根据CFG加载公用js
    $DS.loadPubJs(cfg);
    //9.根据CFG加载页面js
    $DS.loadJs(page);
    //10.根据CFG重新初始化数据源字段信息
    $DS.reloadDataSourceFieldInfo(cfg)
    //11.根据sort构造cfg的formArr
    cfg.formArr = [];
    for (let s of cfg.sort) {
        cfg.formArr.push(VUECFG.formObj[s])
    }
    return cfg;
}

/**
 * 判断所需js是否加载完成
 * @returns {boolean}
 */
function allJsLoad(jsObj) {
    if (!jsObj) jsObj = temporary.jsObj;
    if (temporary["isLoadEchartsBaseJs"]) {//echarts的依赖
        if ((!$("#js_echartsMin") || $("#js_echartsMin").length == 0) || !echarts) return false;
    }
    for (var key in jsObj) {
        if (key.indexOf(`js_file_`) != -1) {//js文件
            if ((!$(`#${key}`) || $(`#${key}`).length == 0)) return false;
        } else {//普通组件
            if (!window["$" + key]) return false;
        }
    }
    return true;
}

/**
 * 获取cfg,与freeFormView保持同步
 */
function getVueCfgForInclude(info, page, type) {
    var cfg = null;
    switch (type) {
        case "key"://顶层窗口
            if (page) cfg = $DS.util.clone(window.top[page]);
            break;
        case "json"://json
            $.ajaxSettings.async = false;//設置getJson同步
            var ajaxExec = false;
            $.getJSON(page, function (data) {
                debugger
                cfg = data;
                ajaxExec = true;
            })
            $.ajaxSettings.async = true;//設置etJson同步
            if (!ajaxExec) {
                alert(`【内嵌表单JSON路径异常】</br>${url}`)
                console.warn(`内嵌表单名称>${info.ds_ctrlname}`)
            }
            break;
        case "poptree":
        case "pageId":
            var result = {};
            if (window.top.$FREEFORMPRELOADMAP && window.top.$FREEFORMPRELOADMAP[page]) {
                //获取预加载数据
                console.log(`【预加载成功】>>>${page}>>>[${info.ds_ctrlname}]内嵌表单`)
                result = window.top.$FREEFORMPRELOADMAP[page];
            } else {
                console.log(window.top)
                console.log(`【无预加载】>>>${page}>>>[${info.ds_ctrlname}]内嵌表单`)
                var col = "FORMID,FORMCONFIG";
                var filter = "AND FORMID='" + page + "'";
                result = $DS.select(VUECFG.appId, col, "DM_FORM_PAGESDETAIL", filter, "系统配置信息查询异常");
            }
            if (result.isError) {
                alert(result.errMsg);
                return false;
            } else {
                result = result.result;
                if (result && result.FORMCONFIG) {
                    cfg = JSON.parse(result.FORMCONFIG);
                    cfg.pageInfoId = result.GUID;
                }

            }
            break;
    }
    return cfg;
}

/**
 * 处理继承属性
 * window.top.$inheritMap={
 *     REQ:[{//必填
 *         PROPNAME:"",
 *         PROPVAL:""
 *     }]
 *     COVER:{//覆盖
 *          data:[{CTRLNAME:"xxx"}],
 *          map:{}
 *     },
 *     PUB:[{//继承属性
 *         PROPNAME:"",
 *         PROPVAL:""
 *     }]
 * }
 * @param info
 */
function dealInheritProp(info) {
    debugger
    var obj = info.ds_include_inherit;
    if (obj) {
        //1.处理必填属性
        var req = obj.REQ;
        for (let r of req) {
            $DS.putPms(r.PROPNAME, $DS.util.replace(r.PROPVAL))
        }
        //2.处理覆盖属性
        var coverData = obj.COVER.data;
        var coverMap = obj.COVER.map;
        for (let c of coverData) {
            var ctrlName = c.CTRLNAME;
            var ctrl = $DS.getCtrl(ctrlName)
            if (!ctrl) {
                console.warn(`【警告】组件名称为[${ctrlName}]的控件不存在于子表单中,无法覆盖属性!`)
                continue;
            }
            var map = coverMap[c.GUID];
            if (map) {
                for (let m in map) {
                    if (m == "ds_datasource") {
                        var source = $DS.getSource(map[m])
                        if (source) {
                            ctrl.info[m] = source.sourceId;
                        } else {
                            alert(`【${info.ds_ctrlname}】组件属性继承中的覆盖的【${m}】数据源不存在,请检查!`)
                            console.error(`【错误】[${info.ds_ctrlname}]组件属性继承中的覆盖的[${m}]数据源不存在,请检查!`)
                        }
                    } else {
                        ctrl.info[m] = map[m];
                    }
                }
            }
        }
        //3.处理继承属性
        var pub = obj.PUB;
        for (let p of pub) {
            $DS.putPms(p.PROPNAME, $DS.util.replace(p.PROPVAL))
        }
    }
}

/**
 * 重新处理各个对象属性
 * @param cfg
 */
function mergeIncludeProp(cfg) {
    debugger
    //1.formObj
    for (let form in cfg.formObj) {
        VUECFG.formObj[form] = cfg.formObj[form]
        new $DS.util.Observer(VUECFG.formObj[form].info, function (obj, key, val) {
            if (VUECFG.$refs[obj.ds_id] && VUECFG.$refs[obj.ds_id].info) VUECFG.$refs[obj.ds_id].info[key] = val;
        })
    }
    //2.sourceArr
    var obj = {};
    for (let vsource of VUECFG.sourceArr) {
        obj[vsource.sourceId] = vsource;
    }
    for (let csource of cfg.sourceArr) {
        obj[csource.sourceId] = csource;
    }
    VUECFG.sourceArr = Object.values(obj)
    //3.groupObj
    for (let group in cfg.groupObj) {
        VUECFG.groupObj[group] = cfg.groupObj[group]
    }
    //4.firstObj
    for (let first in cfg.firstObj) {
        VUECFG.firstObj[first] = cfg.firstObj[first]
    }
    //5.normalObj
    for (let normal in cfg.normalObj) {
        VUECFG.normalObj[normal] = cfg.normalObj[normal]
    }
    //6.lazyObj
    for (let lazy in cfg.lazyObj) {
        VUECFG.lazyObj[lazy] = cfg.lazyObj[lazy]
    }
    //7.$refs
    for (let refs in cfg.$refs) {
        VUECFG.$refs[refs] = cfg.$refs[refs]
    }
    return cfg;
}


/*---------------------------------通用方法---------------------------------------------------------*/
/**
 * 深度克隆
 * @param obj
 * @returns
 */

function deepClone(obj) {
    /**
     * 判别类型
     * @param {} o
     * @return {String}
     */
    function isClass(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    var result, oClass = isClass(obj);
    // 确定result的类型
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);// 递归调用
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * json格式化
 * @param jsonObj
 * @param callback为数据格式化错误的时候处理函数
 * @returns {string|*}
 */
function formatJson(jsonObj, callback) {
    // 正则表达式匹配规则变量
    var reg = null;
    // 转换后的字符串变量
    var formatted = '';
    // 换行缩进位数
    var pad = 0;
    // 一个tab对应空格位数
    var PADDING = '    ';
    // json对象转换为字符串变量
    var jsonString = transitionJsonToString(jsonObj, callback);
    if (!jsonString) {
        return jsonString;
    }
    // 存储需要特殊处理的字符串段
    var _index = [];
    // 存储需要特殊处理的“再数组中的开始位置变量索引
    var _indexStart = null;
    // 存储需要特殊处理的“再数组中的结束位置变量索引
    var _indexEnd = null;
    // 将jsonString字符串内容通过\r\n符分割成数组
    var jsonArray = [];
    // 正则匹配到{,}符号则在两边添加回车换行
    jsonString = jsonString.replace(/([\{\}])/g, '\r\n$1\r\n');
    // 正则匹配到[,]符号则在两边添加回车换行
    jsonString = jsonString.replace(/([\[\]])/g, '\r\n$1\r\n');
    // 正则匹配到,符号则在两边添加回车换行
    jsonString = jsonString.replace(/(\,)/g, '$1\r\n');
    // 正则匹配到要超过一行的换行需要改为一行
    jsonString = jsonString.replace(/(\r\n\r\n)/g, '\r\n');
    // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
    jsonString = jsonString.replace(/\r\n\,/g, ',');
    // 特殊处理双引号中的内容
    jsonArray = jsonString.split('\r\n');
    jsonArray.forEach(function (node, index) {
        // 获取当前字符串段中"的数量
        var num = node.match(/\"/g) ? node.match(/\"/g).length : 0;
        // 判断num是否为奇数来确定是否需要特殊处理
        if (num % 2 && !_indexStart) {
            _indexStart = index
        }
        if (num % 2 && _indexStart && _indexStart != index) {
            _indexEnd = index
        }
        // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
        if (_indexStart && _indexEnd) {
            _index.push({
                start: _indexStart,
                end: _indexEnd
            })
            _indexStart = null
            _indexEnd = null
        }
    })
    // 开始处理双引号中的内容，将多余的"去除
    _index.reverse().forEach(function (item, index) {
        var newArray = jsonArray.slice(item.start, item.end + 1)
        jsonArray.splice(item.start, item.end + 1 - item.start, newArray.join(''))
    })
    // 奖处理后的数组通过\r\n连接符重组为字符串
    jsonString = jsonArray.join('\r\n');
    // 将匹配到:后为回车换行加大括号替换为冒号加大括号
    jsonString = jsonString.replace(/\:\r\n\{/g, ':{');
    // 将匹配到:后为回车换行加中括号替换为冒号加中括号
    jsonString = jsonString.replace(/\:\r\n\[/g, ':[');
    // 将上述转换后的字符串再次以\r\n分割成数组
    jsonArray = jsonString.split('\r\n');
    // 将转换完成的字符串根据PADDING值来组合成最终的形态
    jsonArray.forEach(function (item, index) {
        var i = 0;
        // 表示缩进的位数，以tab作为计数单位
        var indent = 0;
        // 表示缩进的位数，以空格作为计数单位
        var padding = '';
        if (item.match(/\{$/) || item.match(/\[$/)) {
            // 匹配到以{和[结尾的时候indent加1
            indent += 1
        } else if (item.match(/\}$/) || item.match(/\]$/) || item.match(/\},$/) || item.match(/\],$/)) {
            // 匹配到以}和]结尾的时候indent减1
            if (pad !== 0) {
                pad -= 1
            }
        } else {
            indent = 0
        }
        for (i = 0; i < pad; i++) {
            padding += PADDING
        }
        formatted += padding + item + '\r\n'
        pad += indent
    })
    // 返回的数据需要去除两边的空格
    return formatted.trim();
}

/**
 * json格式方法公共方法
 * @param jsonObj
 * @param callback
 * @returns {null}
 */
function transitionJsonToString(jsonObj, callback) {
    // 转换后的jsonObj受体对象
    var _jsonObj = null;
    // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
    if (Object.prototype.toString.call(jsonObj) !== "[object String]") {
        try {
            _jsonObj = JSON.stringify(jsonObj);
        } catch (error) {
            // 转换失败错误信息
            console.error('您传递的json数据格式有误，请核对...');
            console.error(error);
            callback(error);
        }
    } else {
        try {
            jsonObj = jsonObj.replace(/(\')/g, '\"');
            _jsonObj = JSON.stringify(JSON.parse(jsonObj));
        } catch (error) {
            // 转换失败错误信息
            console.error('您传递的json数据格式有误，请核对...');
            console.error(error);
            callback(error);
        }
    }
    return _jsonObj;
}

/**
 * 加载页面js文件
 * @param pageArr
 */
function loadPageJsFile(cfg) {
    if (!cfg) cfg = VUECFG;
    if (!cfg.pageArr) {
        return;
    }
    var pageJsFiles = $DS.getPageProValByName("ds_pageJsFile", cfg);
    if (pageJsFiles && pageJsFiles.length > 0) {
        for (let i = 0; i < pageJsFiles.length; i++) {
            if (pageJsFiles[i].FILEURL) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.id = `js_file_${i}`;
                script.src = pageJsFiles[i].FILEURL;
                document.getElementsByTagName('head')[0].appendChild(script);
                temporary.jsObj[`js_file_${i}`] = `js_file_${i}`;
            }
        }
        $DS.setPageProValByName("ds_pageJsFile", JSON.stringify(pageJsFiles), cfg);
    } else {
        $DS.setPageProValByName("ds_pageJsFile", "", cfg);
    }

}

//加载页面css文件
function loadPageCssFile(cfg) {
    if (!cfg.pageArr) {
        return;
    }
    var pageCssFiles = $DS.getPageProValByName("ds_pageCssFile", cfg);
    if (pageCssFiles && pageCssFiles.length > 0) {
        for (let i = 0; i < pageCssFiles.length; i++) {
            if (pageCssFiles[i].FILEURL) {
                var style = document.createElement("link");
                style.rel = "stylesheet";
                style.href = pageCssFiles[i].FILEURL;
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        }
        $DS.setPageProValByName("ds_pageCssFile", JSON.stringify(pageCssFiles), cfg);
    } else {
        $DS.setPageProValByName("ds_pageCssFile", "", cfg);
    }
}

/**
 * 加载公共js
 * @param pageArr
 */
function loadPubJs(cfg) {
    if (!cfg) cfg = VUECFG;
    if (!cfg.pageArr) {
        return;
    }
    var pubIDs = [];
    for (let i = 0; i < cfg.pageArr.length; i++) {
        if (cfg.pageArr[i].info.ds_id === "ds_pubjs") {
            pubIDs = (cfg.pageArr[i].info.ds_input) ? cfg.pageArr[i].info.ds_input.split(",") : [];
            continue;
        }
    }

    for (let i = 0; i < pubIDs.length; i++) {
        var filter = "AND GUID='" + pubIDs[i] + "'";
        var result = $DS.select(cfg.appId, "JS_TEXT", "DM_FORM_PAGEJS", filter, "查询公共JS脚本异常");
        if (result.isError) {
            alert(result.errMsg);
            return false;
        } else {
            result = result.result;
        }
        if (!result)
            return;
        result = (result.JS_TEXT) ? result.JS_TEXT : "";
        var base = new Base64();
        var code = (result) ? base.decode(result) : "";
        loadJavaScript(code, pubIDs[i]);
    }
}

/**
 * 动态加载页面css
 * @param pageId
 */
function loadPageCss(cfg) {
    if (!cfg) cfg = VUECFG;
    var cssText = "";
    if (cfg.pageArr && cfg.pageArr.length > 0) {
        var pageArr = cfg.pageArr;
        for (var p = 0; p < pageArr.length; p++) {
            if (pageArr[p].info.ds_name === "ds_pagecss") {
                cssText = pageArr[p].info.ds_csseditor;
                break;
            }
        }
    }
    if (cssText) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.id = "css_" + cfg.pageId;
        if ($("#css_" + cfg.pageId).length == 0) {
            style.appendChild(document.createTextNode(cssText));
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }
}


/**
 * 动态加载页面需要的公共方法：js文本
 * @param textArr
 */
function dsLoadJsTexts(textArr) {
    //todo:此方法有问题，如果需要加载的页面方法比较多，会造成页面加载缓慢
    textArr = textArr.split(",");
    for (var t = 0; t < textArr.length; t++) {
        dsLoadScriptString(textArr[t]);
    }
}

/**
 * 加载页面脚本
 * @param guid
 */
function dsLoadScriptString(guid) {
    if (!guid) return false;
    var filter = "AND ITEMCODE='" + guid + "'";
    var result = $DS.select(VUECFG.appId, "JS_TEXT", "DM_FORM_PAGEJS", filter, "查询页面JS脚本异常")
    if (result.isError) {
        alert(result.errMsg);
        return false;
    } else {
        result = result.result;
    }
    if (!result)
        return;
    result = (result.JS_TEXT) ? result.JS_TEXT : "";
    var base = new Base64();
    var code = (result) ? base.decode(result) : "";
    loadJavaScript(code, guid);
}

/**
 * 动态添加脚本
 * @param code
 * @param guid
 */
function loadJavaScript(code, guid) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "js_" + guid;
    if ($("#js_" + guid).length == 0) {
        try {
            //IE浏览器认为script是特殊元素,不能再访问子节点;报错;
            script.appendChild(document.createTextNode(code));
        } catch (ex) {
            script.text = code;
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    }

}

/**
 * 动态添加脚本
 * @param url
 * @param id
 */
function loadJavaScriptUrl(url, id) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "js_" + id;
    if (!$("#js_" + id) || $("#js_" + id).length == 0) {
        script.src = url
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}

/**
 * 动态添加css文件
 * @param url
 * @param id
 */
function loadCssUrl(url, id) {
    var ycdcss = document.createElement('link');
    ycdcss.setAttribute("id", "css_" + id);
    ycdcss.setAttribute("rel", "stylesheet");
    ycdcss.setAttribute("type", "text/css");
    ycdcss.setAttribute("href", url);
    if (typeof ycdcss != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(ycdcss);
    }
}

/**
 * base64
 * @constructor
 */
function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

/**
 * 精确加
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatAdd(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;

    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));

    //(arg1*m+arg2*m)/m;
    arg1 = floatMul(arg1, m);
    arg2 = floatMul(arg2, m);
    return floatDiv(arg1 + arg2, m)
    // return floatDiv((floatMul(arg1,m)+floatMul(arg2,m)),m)
}

/**
 * 精确减
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatSub(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 精确乘
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatMul(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


/**
 * 精确除
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
function floatDiv(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }

    r1 = Number(arg1.toString().replace(".", ""));

    r2 = Number(arg2.toString().replace(".", ""));
    var result = (r1 / r2) * Math.pow(10, t2 - t1);
    if (result.toString() == "NaN") return 0;
    return result;
}

/**
 * 通过表达式获取参数 用逗号拼接
 * @param expression 表达式
 * @param filedName 字段名
 */


function joinStrByPms(expression, filedName) {

    expression = "${V." + expression + "}";
    let pms = $DS.util.replace(expression);
    if (pms && $DS.util.isString(pms)) {
        pms = JSON.parse(pms);
    }
    let res = "";
    if (pms && $DS.util.isArray(pms) && pms.length > 0) {
        let resArr = [];
        for (let item of pms) {
            resArr.push(`'${item[filedName]}'`);
        }
        res = resArr.join(",");
    }
    return res;
}


/**
 * 替换参数
 * 基础表达式 :
 *      ${V.A.0.*.B.*.C.D,缺省值,@>格式表达式}
 * 示例:
 *      $DS.util.replace("${V.formArr.*.info.ds_rowarr.*.info.ds_id,@>S|}",VUECFG)
 * 起始符:
 *      V.:当前页面参数
 *      P.:父页面参数
 *      T.:顶级页面window.top的参数
 *  星号(*):
 *      代表数组中的所有数据
 *  @>格式表达式:
 *      @>S:格式化为字符串,分割符默认为","
 *      @>S|:格式化为字符串,分割符为"|"
 *      @>F:格式化为数值,不转千分符,小数位数为0
 *      @>FT:格式化为数值,转千分符,小数位数为0
 *      @>F2:格式化为数值,不转千分符,小数位数为2
 *      @>FT2:格式化为数值,转千分符,小数位数为2
 *
 *
 * @param str 字符串
 * @param obj 参数对象
 * @param isFilter 是否为过滤条件替换
 * @param isFromatNum 是否格式化数字
 * @returns {*}
 */
function replaceStr(str, obj, isFilter, isFromatNum) {
    if (str == "") return str;
    console.log("未替换语句>>>=======================================================")
    console.log(`${str}`)
    str = replaceDsPageParams(str, obj, isFilter, isFromatNum)
    console.log("已替换语句>>>=======================================================")
    console.log(`${str}`)
    return str;
}

/**
 * 替换标签里所有V开头的参数
 * V：数据来源参数集合
 * @param str
 */
function replaceDsPageParams(str, obj, isFilter, isFromatNum) {
    var g = "\\$\\{(.*?)}";
    var result = getMatchs(str, g);
    //替换pageparams
    var str = replaceDsParams(result, obj, isFilter, isFromatNum);
    return str;
}

/**
 * 获取改变后的html和匹配值的数组
 * @param str
 * @param pattern
 * @returns {any[]}
 */
function getMatchs(str, pattern) {
    var result = new Array();
    var group = str.match(pattern);
    while (group && group.length > 0) {
        result.push(group[1]);
        str = str.replace(group[0], "{{" + (result.length - 1) + "}}");
        group = str.match(pattern);
    }
    result.push(str);
    return result;
}

/**
 * 替换数组中的str,返回最终替换结果
 * @param result
 * @returns {*}
 */
function replaceDsParams(result, obj, isFilter, isFromatNum) {

    var str = result[result.length - 1];
    for (var i = 0; i < result.length - 1; i++) {
        var tag = result[i].split(",")[0].substr(0, 2);
        var key = result[i].split(",")[0].substr(2);
        var keyArr = key.split(".");
        //var defaultvalue = result[i].replace("V." + key + ",", "");
        var defaultvalue = result[i].split([tag, key, ","].join(""))[1];
        var valType = "";//数值类型
        var thousand = false;//是否千分符
        var floatNum = undefined;//转小数位数
        var split = "";//分隔符
        if (defaultvalue) {
            var splitStr = "@>";
            if (defaultvalue.indexOf(",@>") != -1) splitStr = ",@>";
            var valInfo = defaultvalue.split(splitStr)[1];
            defaultvalue = defaultvalue.split(splitStr)[0];
            if (valInfo) {
                if (valInfo.substring(0, 1).toUpperCase() == "S") {//字符串
                    valType = "STRING";
                    split = valInfo.substring(1) ? valInfo.substring(1) : "";
                } else if (valInfo.substring(0, 1).toUpperCase() == "F") {//数字
                    valType = "FLOAT";
                    if (valInfo.substring(1, 2).toUpperCase() == "T") {
                        thousand = true;
                        floatNum = (valInfo.substring(2)) ? parseInt(valInfo.substring(2)) : undefined;
                    } else {
                        floatNum = (valInfo.substring(1)) ? parseInt(valInfo.substring(1)) : undefined;
                    }
                }
            }
        }
        switch (tag) {
            case "V."://页面参数集
                $DS.pageParams["SYS_DATE"] = new Date();
                obj = obj ? obj : $DS.pageParams;
                break;
            case "P."://父页面参数集
                if (parent && parent.$DS && parent.$DS.pageParams) {
                    parent.$DS.pageParams["SYS_DATE"] = new Date();
                    obj = parent.$DS.pageParams;
                } else {
                    obj = obj ? obj : {}
                }
                break;
            case "T."://顶级页面参数集
                window.top["SYS_DATE"] = new Date();
                obj = window.top ? window.top : obj
                break;
        }
        if (!$DS.util.isUndefined(obj[keyArr[0]])) {
            var val = $DS.util.getObjVal(obj, keyArr);
            if (!val && key.indexOf(".*.") != -1) {
                val = getObjValAll(obj, key, {valType, split})
            }
            if ($DS.util.isObject(val) || $DS.util.isArray(val)) {
                val = JSON.stringify(val)
            }
            if ($DS.util.isUndefined(val) || val === "") {
                if ($DS.util.isUndefined(defaultvalue) && isFilter) {
                    var arr = str.split("{{" + i + "}}")
                    var andindex0 = arr[0].toUpperCase().lastIndexOf("[AND] ");
                    var orindex0 = arr[0].toUpperCase().lastIndexOf("[OR] ");
                    var andindex1 = arr[1].toUpperCase().indexOf("[AND] ");
                    var orindex1 = arr[1].toUpperCase().indexOf("[OR] ");
                    var index1 = (andindex0 > orindex0) ? andindex0 : orindex0
                    var index2 = (andindex1 > orindex1 ? andindex1 : orindex1)
                    str = arr[0].substring(0, index1) + ((index2 !== -1) ? arr[1].substring(index2) : "")
                } else {
                    val = $DS.util.eval(defaultvalue);
                    val = formatValByExpress(val, {valType, thousand, floatNum, split})
                    str = str.replace("{{" + i + "}}", formatReplaceValToNumStyle(val, valType ? false : isFromatNum));
                }
            } else {
                val = formatValByExpress(val, {valType, thousand, floatNum, split})
                str = str.replace("{{" + i + "}}", formatReplaceValToNumStyle(val, valType ? false : isFromatNum));
            }
        } else {
            try {
                if ($DS.util.isUndefined(defaultvalue) && isFilter) {
                    var arr = str.split("{{" + i + "}}")
                    var andindex0 = arr[0].toUpperCase().lastIndexOf("[AND] ");
                    var orindex0 = arr[0].toUpperCase().lastIndexOf("[OR] ");
                    var andindex1 = arr[1].toUpperCase().indexOf("[AND] ");
                    var orindex1 = arr[1].toUpperCase().indexOf("[OR] ");
                    var index1 = (andindex0 > orindex0) ? andindex0 : orindex0;
                    var index2 = (andindex1 > orindex1 ? andindex1 : orindex1);
                    str = arr[0].substring(0, index1) + ((index2 !== -1) ? arr[1].substring(index2) : "")
                } else {
                    //${V.aa,$DS.util.xxx}
                    defaultvalue = $DS.util.eval(defaultvalue);
                    defaultvalue = formatValByExpress(defaultvalue, {valType, thousand, floatNum, split})
                    str = str.replace("{{" + i + "}}", formatReplaceValToNumStyle(defaultvalue, valType ? false : isFromatNum));
                }
            } catch (e) {
                console.log(e)
                defaultvalue = ""
                defaultvalue = formatValByExpress(defaultvalue, {valType, thousand, floatNum, split})
                str = str.replace("{{" + i + "}}", formatReplaceValToNumStyle(defaultvalue, valType ? false : isFromatNum));
            }
        }
    }
    str = str.split("[AND]").join("AND").split("[OR]").join("OR").split("[and]").join("and").split("[or]").join("or")
    return str;

}

/**
 * eval参数替换
 * @param str
 * @param obj
 * @return {any}
 */
function evalReplace(str, obj) {
    if (str == "") return str;
    console.log("未替换语句>>>=======================================================")
    console.log(`${str}`)
    var g = "\\$\\[(.*?)]";
    var result = getMatchs(str, g);
    //替换pageparams
    str = result[result.length - 1];
    for (var i = 0; i < result.length - 1; i++) {
        var replaceArr = result[i];
        var replaceStr = replaceArr.split("|@>")[0];
        var valInfo = replaceArr.split("|@>")[1];
        var key = replaceStr.split("|>")[0]
        var defaultVal = replaceStr.split([key, "|>"].join(""))[1]
        replaceStr = key
        var valType = "";//数值类型
        var thousand = false;//是否千分符
        var floatNum = undefined;//转小数位数
        var split = "";//分隔符
        if (valInfo) {
            if (valInfo.substring(0, 1).toUpperCase() == "S") {//字符串
                valType = "STRING";
                split = valInfo.substring(1) ? valInfo.substring(1) : "";
            } else if (valInfo.substring(0, 1).toUpperCase() == "F") {//数字
                valType = "FLOAT";
                if (valInfo.substring(1, 2).toUpperCase() == "T") {
                    thousand = true;
                    floatNum = (valInfo.substring(2)) ? parseInt(valInfo.substring(2)) : undefined;
                } else {
                    floatNum = (valInfo.substring(1)) ? parseInt(valInfo.substring(1)) : undefined;
                }
            }
        }
        replaceStr = $DS.util.replace(replaceStr, obj)
        try {
            replaceStr = eval(replaceStr)
            if ([replaceStr].join("") == "NaN" || [replaceStr].join("") == "Infinity") replaceStr = 0;
            replaceStr = formatValByExpress(replaceStr, {valType, thousand, floatNum, split})
        } catch (e) {
            console.log(e)
            replaceStr = ""
        }
        str = str.replace("{{" + i + "}}", replaceStr);
    }
    if ((str == "" || str == null || $DS.util.isUndefined(str)) && defaultVal) {
        try {
            str = eval(defaultVal)
        } catch (e) {
            console.log(e)
            str = ""
        }

    }
    console.log("已替换语句>>>=======================================================")
    console.log(`${str}`)
    return str;
}

/**
 * 根据带*表达式取对象数据
 * getObjValAll(VUECFG,"formArr.*.info.ds_rowarr.*.info.ds_id",{"string"})
 * @param obj
 * @param key
 * @param pms
 */
function getObjValAll(obj, key, pms) {
    debugger
    var keyArr = key.split(".*.")
    var res = {};
    for (var k = 0; k < keyArr.length; k++) {
        if (k == 0) {
            if (!res[k]) res[k] = [];
            var val1 = $DS.util.getObjVal(obj, keyArr[k].split("."))
            if (val1) res[k].push(val1)
        } else {
            var resArr = res[k - 1];
            for (var a = 0; a < resArr.length; a++) {
                if (!res[k]) res[k] = [];
                var item = resArr[a];
                for (var i = 0; i < item.length; i++) {
                    var val2 = $DS.util.getObjVal(item[i], keyArr[k].split("."))
                    if (val2) res[k].push(val2)
                }
            }
        }
    }
    var result = res[keyArr.length - 1]
    if (!pms.valType || pms.valType == "STRING") {
        result = pms.split ? result.join(pms.split) : result.join(",")
    } else {
        result = eval(result.join("+"));
    }
    return result;
}

/**
 * 依据表达式格式化替换参数
 * @param val
 * @param {valType,thousand,floatNum,split}
 */
function formatValByExpress(val, pms) {
    try {
        if (pms.valType == "STRING") {
            return [val].join(pms.split ? pms.split : ",")
        } else if (pms.valType == "FLOAT") {
            if (`${parseFloat(val)}` == "NaN") return val;
            if (pms.thousand) {
                if ($DS.util.isUndefined(pms.floatNum)) {
                    return [parseFloat(val)].join("").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }
                return parseFloat(val).toFixed(pms.floatNum).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            }
            if ($DS.util.isUndefined(pms.floatNum)) {
                return parseFloat(val)
            }
            return parseFloat(val).toFixed(pms.floatNum);
        } else {
            return val
        }
    } catch (e) {
        console.error(e)
        return val;
    }
}

/**
 * 格式化替换参数
 * @param val
 * @param isFromatNum
 * @returns {string|*}
 */
function formatReplaceValToNumStyle(val, isFromatNum) {
    if (!isFromatNum) {
        return val;
    } else {
        try {
            if ((parseFloat(val) + "") == "NaN") return val;
            return parseFloat(val).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        } catch (e) {
            return val;
        }
    }
}

/**
 * 阻止冒泡
 * @param {} event
 */
function stopEvent(event) {
    if (event) {
        if (event && event.stopPropagation) { // w3c标准
            event.stopPropagation();
        } else { // IE系列 IE 678
            event.cancelBubble = true;
        }
    }
}

/**
 * json格式转树状结构
 * @param json            json数据
 * @param idStr        id的字符串
 * @param pidStr        父id的字符串
 * @param chindrenStr   children的字符串
 * @returns {[]}
 */
function transData(json, idStr, pidStr, chindrenStr) {
    var a = json;
    var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        var aVal = a[j], hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}


/**
 * 层级数据转list
 * @param source 层级数据
 * @param childField 子集 字段
 * @param listData 承载返回的list数据
 * @param delChildren 是否删除children
 * @returns {*}
 */
function childrenToList(source, childField, listData, delChildren) {
    if (!listData)
        listData = [];

    doAction(source, childField, listData);

    if (delChildren)
        listData.forEach(item => delete item.children);

    function doAction(source, childField, listData) {
        for (let i = 0; i < source.length; i++) {
            listData.push(source[i]);
            source[i][childField] && source[i][childField].length > 0 ? doAction(source[i][childField], childField, listData) : ""// 子级递归
        }
    }

    return listData;
}

/**
 * 通过appid获取系统 url
 * @param appId
 */
function getProjectNameByAppId(appId) {
    /*if ((appId==null) || (appId==""))
        appId = VUECFG.appId;*/
    if (!appId) return '/console_portal';
    var appArr = initApp();
    for (var a = 0; a < appArr.length; a++) {
        if (appArr[a].APPID == "BMP") {
            appArr[a].PROJECTNAME = (window.top.CFG && window.top.CFG.PROJECTNAME) ? window.top.CFG.PROJECTNAME.substring(1) : appArr[a].PROJECTNAME;
        }
        if (appArr[a].APPID == appId)
            return "/" + appArr[a].PROJECTNAME;
    }
    return getProjectName();
}

/**
 * 通用eval
 * @param expression
 * @returns {string|any|number}
 */
function ycdeval(expression) {
    if (expression == null || expression == undefined || expression == "")
        return "";
    expression = expression.replaceAll("&quot;", "\"");
    expression = expression.replaceAll("&#39;", "\'");
    expression = expression.replaceAll("&apos;", "'");
    expression = expression.replaceAll("&amp;", "&");
    expression = expression.replaceAll("&lt;", "<");
    expression = expression.replaceAll("&gt;", ">");
    expression = expression.replaceAll("&gt;", ">");
    try {
        var tmp = eval(expression);
        if (tmp == window.Infinity)
            return 0.00;
        else
            return tmp;
    } catch (e) {
        return "";
    }
}

/**
 * 通过数组对象取值
 * @param arr 取值key数组
 * @param obj 取值对象
 */
function getObjVal(obj, arr) {
    var name = undefined;
    try {
        name = arr.reduce((itemName, key) => itemName[key], obj);
    } catch (e) {
        name = undefined;
    }
    return name;
}

/**
 * 对象赋值方法
 * @param obj 赋值对象
 * @param arr 赋值的层次key
 * @param val  值
 */
function setObjVal(obj, arr, val) {
    arr.reduce((cur, key, index) => {
        if (!cur[key]) {
            cur[key] = {};
        }
        if (index === arr.length - 1) {
            cur[key] = val;
        }
        return cur[key];
    }, obj);
}

/**
 * 是否是字符串
 * @param value
 * @returns {boolean}
 */
function isString(value) {
    return Object.prototype.toString.call(value) == "[object String]";
}

/**
 * 是否是数字
 * @param value
 * @returns {boolean}
 */
function isNumber(value) {
    return Object.prototype.toString.call(value) == "[object Number]";
}

/**
 * 是否是布尔值
 * @param value
 * @returns {boolean}
 */
function isBoolean(value) {
    return Object.prototype.toString.call(value) == "[object Boolean]";
}

/**
 * 是否undefined
 * @param value
 * @returns {boolean}
 */
function isUndefined(value) {
    return Object.prototype.toString.call(value) == "[object Undefined]";
}

/**
 * 是否是null
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
    return Object.prototype.toString.call(value) == "[object Null]";
}

/**
 * 是否数组
 * @param value
 * @returns {boolean}
 */
function isArray(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}

/**
 * 是否是函数
 * @param value
 * @returns {boolean}
 */
function isFunction(value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}

/**
 * 是否是对象
 * @param value
 * @returns {boolean}
 */
function isObject(value) {
    return Object.prototype.toString.call(value) == "[object Object]";
}

/**
 * 是否是正则表达式
 * @param value
 * @returns {boolean}
 */
function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}

/**
 * 是否是日期对象
 * @param value
 * @returns {boolean}
 */
function isDate(value) {
    return Object.prototype.toString.call(value) == "[object Date]";
}

/**
 * 是否为base64字符串
 * @param str
 * @returns {boolean}
 */
function isBase64Str(str) {
    if (str === '' || str.trim() === '') {
        return false;
    }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

/**
 * 校验是否包含全角字符
 * @param thisval
 * @return {boolean}
 */
function isFullAngle(thisval) {
    var flag = false;
    if (thisval.match(/[^\x00-\x80]/)) {      //或  /[^\0-\127]/    十进制表示
        flag = true;
    }
    return flag;
}

/**
 * 添加千分符
 * @param strVal
 */
function addThousands(strVal) {
    var IntegerPat, decimalPat;
    decimalPat = strVal.indexOf('.') != -1 ? '.' + strVal.split('.')[1] : '';
    IntegerPat = (strVal.indexOf('.') != -1 ? strVal.split('.')[0] : strVal).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    return IntegerPat + decimalPat;
}

/**
 * 去除千分符
 * @param strVal
 * @returns {string}
 */
function removeThousands(strVal) {
    return (strVal + "").split(",").join("");
}

/**
 * 保留小数
 * @param value
 * @param index
 * @returns {string}
 */
function fixedNumber(value, index) {
    return (parseFloat(value).toFixed(index) + '')
}

/**
 * 封装弹出页
 * @param url 弹出页地址
 * @param title 标题
 *
 * @param width 宽度
 * @param height 高度
 * @param args 扩展配置
 * @param isOpen 是否开辟窗口
 */
function showPage(url, title, width, height, args, isOpen, win) {
    if (!win) win = window;
    if (!url) {
        alert("请传入url地址");
        return false;
    }
    ;
    url = encodeURI(url);
    if (!args) args = {};
    if (isOpen) {
        window.open(url, title)
    } else {
        win.showMyDialog(title, width, height, url, args.callBack, args.hideTit, args.time, args.beginClose)
    }
}

/**
 * 封装配置表格
 * @param col 表格列 [{field:"",title:"",width:"小数",edit:"text",codeType:"",code:{},hide:true}]
 * @param value 表格数据
 * @param callback  function(data,key){} 返回数据 data  | window.top[key]
 * @param width 宽度
 * @param height 高度
 * @param title 标题
 * @param args 其他配置信息
 */
function openCfgTable(col, value, callback, width, height, title, args) {
    if (temporary.open) return;
    temporary.open = true;
    var key = Date.parse(new Date());
    window.top[key] = {
        col: col,//表格显示列信息
        value: value,//表格显示的数据
        callback: callback
    }
    if (args) {
        for (var a in args) {
            window.top[key][a] = args[a];
        }
    }
    $DS.showPage(getProjectName() + "/freeForm/js/editor/commonTable.jsp?key=" + key,
        title, width, height)
    temporary.open = false;
}


/**
 * 打开通用树
 * @param cfg 树配置
 * @param treeData 树数据
 * @param callback
 * @param cancelCallback
 * @param width
 * @param height
 * @param title
 * @param args

 通过传递的配置对象设置属性  参照elementui官方文档。  " - " 替换为 " _ "
 例:   cfg = {
       node_key: "ID",//必传
       props: {       //必传
           label: "NAME",//NAME
           children: "children",
       },
       indent: 50,
       check_strictly: false,
       show_checkbox: false,
       filterFields: ["NAME"]  //string|array  不传 默认取props label
}
 */

function openCfgTree(cfg, treeData, callback, width, height, title, args, cancelCallback, isOpen, win) {

    if (temporary.openTree) return;
    temporary.openTree = true;
    var key = Date.parse(new Date());
    window.top[key] = {
        cfg: cfg,
        treeData: treeData,
        callback: callback,
        cancelCallback: cancelCallback
    };
    if (args) {
        for (var a in args) {
            window.top[key][a] = args[a];
        }
    }
    $DS.showPage($DS.util.getProjectName(VUECFG.viewStatu ? VUECFG.appId : null) + "/freeForm/js/editor/commonTree.html?key=" + key, title, width, height, args, isOpen, win);
    temporary.openTree = false;
}

/**
 * 编辑正则校验属性 打开通用表格
 */
function editRegular() {

    var col = [
        {
            edit: "text",
            field: "expression",
            title: "正则表达式",
            width: 0.5
        }, {
            edit: "text",
            field: "errMsg",
            title: "错误提示",
            width: 0.5
        },
    ];
    var value = $DS.getCtrlById(VUECFG.ctrlId).info.ds_checkRegular;
    if (value && typeof (value) === "string") {
        value = JSON.parse(value)
    }
    //回调函数
    openCfgTable(col, value, function (data, key) {
        debugger
        var info = $DS.getCtrlById(VUECFG.ctrlId).info;
        info.ds_checkRegular = data;
        //回显input
        for (let i = 0; i < VUECFG.proArr.length; i++) {
            if (VUECFG.proArr[i].info.ds_name === "ds_checkRegular") {
                VUECFG.proArr[i].info.ds_input = JSON.stringify(data);
            }
        }

    }, "80%", "80%", "正则校验")
}


/**
 * 对输入的文本进行 正则校验
 * @param info
 * @param regulars //正则表达式
 */
function checkRegular(info, regulars, inputVal) {

    let ctrlType = $DS.getCtrlType(info.ds_id);
    let data = regulars ? regulars : info.ds_checkRegular;

    if (ctrlType !== "grid") {
        switch (ctrlType) {
            case "input":
                inputVal = info.ds_input;
                break;
            case "password":
                inputVal = info.ds_password;
                break;
            case "textarea":
                inputVal = info.ds_textarea;
                break;
        }
    }


    if (data && inputVal) {
        if (util.isString(data)) {
            data = JSON.parse(data);
        }
        for (let i = 0; i < data.length; i++) {
            var expression = data[i].expression;
            var errMsg = data[i].errMsg;
            if (!expression) {
                alert("正则表达式为空");
                return false;
            }
            var reg = new RegExp(expression);
            if (!reg.test(inputVal)) {
                alert(errMsg);
                if (ctrlType != "grid") {
                    info.ds_input = "";
                }
                return false;
            }

        }
    }
    return true
}

/**
 * 获得UUID
 * @return {}
 */
function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/**
 * 获取GUID
 * 不带_
 * @returns {string}
 */
function getGuid() {
    var guid = generateUUID();
    return guid.replaceAll("-", "").toUpperCase();
}

/**
 * 比较两个对象是否相等
 * @param {} o1
 * @param {} o2
 * @return {Boolean}
 */
function isObjEqual(o1, o2) {
    var props1 = Object.getOwnPropertyNames(o1);
    var props2 = Object.getOwnPropertyNames(o2);
    if (props1.length != props2.length) {
        return false;
    }
    for (var i = 0, max = props1.length; i < max; i++) {
        var propName = props1[i];
        if (o1[propName] !== o2[propName]) {
            return false;
        }
    }
    return true;
}

/**
 * 确认函数
 */
function confirmFun(vue, tip, sureFun, cancleMsg, pms, cancleFun, topWin) {
    debugger
    if (!cancleMsg) cancleMsg = "已取消删除!"
    var win = vue;
    if (topWin) win = topWin;
    win.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
    }).then(() => {
        sureFun(vue, pms);
    }).catch((e) => {
        if (cancleFun)
            cancleFun(vue, pms);
        win.$message({
            type: 'info',
            message: cancleMsg
        });
        console.error(e)
    });
}

/**
 * 通知函数
 * @param vue
 * @param title 标题
 * @param msg 消息
 * @param duration 显示时间
 */
function notifyFun(vue, msg, duration, title) {
    if (!title) title = '提示';
    vue.$notify({
        title: title,
        message: msg,
        duration: duration
    });
}

/**
 * 获取当前日期数字
 * @returns {number}
 */
function getData() {
    return Date.parse(new Date())
}

/**
 * 格式化日期
 * @param {} date 时间
 * @param {} fmt  格式化公式
 * @return {}
 */
function formateDate2String(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + "日一二三四五六".charAt(date.getDay()));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        }
    }
    return fmt;

}

/**
 * 获取系统值
 */
function getSysDefaultVal(defaultval) {
    var val = defaultval;
    switch (defaultval) {
        case "$USERID$"://用户ID
            val = $DS.getPms("USER_MID");
            break;
        case "$USERNAME$"://用户姓名
            val = $DS.getPms("USER_UserName");
            break;
        case "$FINYEAR$"://预算年度
            val = $DS.getPms("USER_FINYEAR");
            break;
        case "$DISTRICTID$"://用户所在区划ID
            val = $DS.getPms("USER_admdiv");
            break;
        case "$DISTRICTCODE$"://用户所在区划编码
            val = $DS.getPms("USER_admdivCode");
            break;
        case "$DISTRICTNAME$"://用户所在区划名称
            val = $DS.getPms("USER_admdivName");
            break;
        case "$DIVID$"://用户所在单位ID
            val = $DS.getPms("USER_agency");
            break;
        case "$DIVNAME$"://用户所在单位名称
            val = "[" + $DS.getPms("USER_agency") + "]" + $DS.getPms("USER_agencyName");
            break;
        case "$UPDIVID$"://用户提升级次单位ID
            val = $DS.getPms("USER_UPDIVID");
            break;
        case "$UPDIVNAME$"://用户提升级次单位名称
            val = "[" + $DS.getPms("USER_UPDIVID") + "]" + $DS.getPms("USER_UPDIVNAME");
            break;
        case "$DEPTID$"://用户所在处室ID
            val = $DS.getPms("USER_DEPTID");
            break;
        case "$DEPTNAME$"://用户所在处室名称
            val = $DS.getPms("USER_DEPTNAME");
            break;
        /*case "$CURRENTDATE$"://当前日期
        case "$INITSYSDATE$"://当前日期初始化一次
            value = "sysdate";
            break;*/
        case "$USERTYPE$"://用户类型
            val = $DS.getPms("USER_userType");
            break;
        /*case "$GUID$"://GUID
            value = "sys_guid()";
            break;*/
        case "$USERDIVLEVEL$"://数据级次
            val = $DS.getPms("USER_USERDIVLEVEL");
            break;
        case "$CURRENTYEAR$"://当前年度
            val = $DS.getPms("USER_CURRENTYEAR");
            break;
        case "$DEPTPRIORITY$"://特殊处室
            val = $DS.getPms("USER_DeptPriority");
            break;
    }
    return val;
}

/**
 * 获取html
 * @param id
 * @returns {jQuery|null|HTMLElement}
 */
function getHtml(id) {
    return $("#" + id).html();
}

/**
 * 获取模板html
 * @param id
 * @returns {string}
 */
function getModelHtml(id) {
    return $("#templeteRef")[0].contentDocument.scripts[id].innerHTML;
}

/**
 * 获取OuterHtml
 * @param id
 * @returns {*}
 */
function getOuterHtml(id) {
    return $("#" + id)[0].outerHTML;
}

/**
 * 格式化HTML
 * @param html
 * @returns {*}
 */
function formatHTML(Html) {
    //声明left变量用于存放html标签中左尖括号（‘<’）位置
    var left = null;
    //声明right变量用于存放html标签中右尖括号（‘<’）位置
    var right = null;
    //声明str变量，用于存放格式化后的代码字符串
    var str = '';
    //存放html代码所进所用的空格
    var blank = '\t';
    //存放若干个blank变量，用于控制代码缩进的深度
    var fmt = [];
    //对需要格式化的代码字符串进行遍历
    for (var i = 0; i < Html.length; i++) {
        //发现左尖括号后将其位置记录在left变量上
        if (Html[i] == '<') {
            left = i;
        } else if (Html[i] == '>') {
            //发现右尖括号后将其记录在right变量上
            right = i;
        }
        //当做尖括号右尖括号都记录了一个位置后，说明二者之间的内容为代码的一行
        if (typeof left == 'number' && typeof right == 'number') {
            //判断字符串左尖括号后是否为‘/’，如果满足，表明该行代码为双标签的闭合标签
            if (Html[left + 1] == '/') {
                //对数组中的空格做出栈，确保代码缩进正确
                fmt.pop();
                //将该行代码放入str变量中
                str += fmt.join('') + Html.slice(left, right + 1);
                //判断字符串右尖括号前一位是否为‘/’，如满足，表明该标签为严格闭合的单标签
            } else if (Html[right - 1] == '/') {
                str += fmt.join('') + Html.slice(left, right + 1);
                //判断字符串开头是否包含input/imig/hr/br/link/meta等字母，用于屏蔽非严格未闭合的单标签
            } else if (Html.slice(left, right).search(/\<input|\<img|\<hr|\<br|\<link|\<meta/) != -1) {
                str += fmt.join('') + Html.slice(left, right + 1);
                //对双标签的左标签进行的操作
            } else {
                str += fmt.join('') + Html.slice(left, right + 1);
                //向数组中堆入一个空格，确保下一行双标签的左标签的缩进正确
                fmt.push(blank);
            }
            //对right位置后的字符串进行遍历
            for (var j = right; j < Html.length; j++) {
                //查找right位置后，第一个左尖括号的位置，二者之间的内容即为代码中的文本内容
                if (Html[j] == '<') {
                    //去掉文本中多余的空格
                    var s = Html.slice(right + 1, j - right - 1).replace(/\s*/g, '');
                    if (s) {
                        //当文本中去掉空格后任然有内容，则将文本拼入str变量进行存储
                        str += s;
                    }
                    break;
                }
            }
            //每次获得一次左右尖括号的位置后，即得到了一行代码，为代码做换行处理
            str += '\n';
            //重置left、right的值，用于for循环的下次存储做右尖括号的位置
            left = null;
            right = null;
        }

    }
    //返回得到的格式化完成的html代码字符串
    return str;
}

/**
 * 异常封装
 * @param tip
 */
function exception(tip) {
    console.log("formErr:" + tip);
    throw new Error(tip);
}

/**
 * 组件对象异常
 * @param componentObjName
 */
function exceptionRegister(componentObjName) {
    util.exception("【" + componentObjName + "】请检查注册的组件是否存在," +
        "组件的配置对象命名方式为$+组件名称!")
}

/**
 * 函数异常捕获
 * @param fun
 * @param callback
 * @param tip
 */
function tryCatch(fun, callback, tip, pms) {
    try {
        fun(pms);
    } catch (e) {
        if (callback)
            callback(pms);
        console.log(e)
        console.error(tip)
    }
}

/**
 * 通过名称操作iframe函数
 * @param name
 */
function getIframeByName(name) {

    var iframe = $("iframe[iframe=" + name + "]");
    if (iframe && iframe.length > 0) {
        return $(iframe)[0].contentWindow;
    } else {
        alert("当前名称为【" + name + "】的iframe不存在!")
        return false;
    }
}

/**
 * 字符长度校验
 *
 * @param {}
 *            str 要校验的字符串
 * @return {} 字符串长度
 */
function getLength(str) {
    // /<summary>获得字符串实际长度，中文2，英文1</summary>
    // /<param name="str">要获得长度的字符串</param>
    if (!str || (str + "").length == 0) return 0;
    var realLength = 0, len = (str + "").length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = (str + "").charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 1;
        else
            realLength += 2;
    }
    return realLength;
}

/**
 * 设置控件右侧某属性是否展示
 * @param ctrlId 控件名
 * @param obj  属性:是否展示
 * @param noRefresh  不刷新属性
 */
function setRightProShow(ctrlId, obj, noRefresh) {
    var proArr = VUECFG.proObj[ctrlId];
    for (let i = 0; i < proArr.length; i++) {
        for (var key in obj) {
            if (proArr[i].info.ds_id === key) {
                proArr[i].info.ds_show = obj[key]
                break;
            }
        }

    }
    if (!noRefresh)
        $DS.refPro();
}

/**
 * 清空数据缓存
 */
function cleanCache() {
    temporary.cacheSourceData = {};
}


/**
 * loading加载函数
 * @param funName
 * @param params
 * @param win
 * @returns {null}
 */
function loadingFun(funName, params, win, noEnd) {
    if (!win) win = window;
    win.$DS.loading(true);
    var timeOut = setTimeout(function () {
        try {
            var res = null;
            if (window[funName]) {
                res = window[funName](params)
            } else if (window.top[funName]) {
                res = window.top[funName](params)
            }
            if (!noEnd)
                win.$DS.loading(false);
            window.clearTimeout(timeOut)
            return res;
        } catch (e) {
            win.$DS.loading(false);
            console.error(e)
            window.clearTimeout(timeOut)
            return res;
        }
    }, 500)

}

/**
 * 获取顶级父窗口中的属性
 * @param prop 获取的属性
 * @param judgeVal 判断条件
 * @returns {any}
 */
function getTopWin(prop, judgeVal) {
    if (judgeVal && !$DS.util.isString(judgeVal) && !$DS.util.isObject(judgeVal)) {
        console.error("传值不符合规则!获取顶级窗口属性失败!")
    }
    if (!judgeVal || $DS.util.isString(judgeVal)) {
        judgeVal = {
            arr: ['parent'],
            val: judgeVal
        }
    }
    if (!judgeVal.val) judgeVal.val = 'vm';
    if (!prop) prop = judgeVal.val;
    var str = "window." + judgeVal.arr.join(".") + "." + judgeVal.val;
    if (eval(str)) {
        //如果父页面是本页面,直接返回
        var thisStr = "window." + judgeVal.arr.join(".");
        var nextStr = "window." + judgeVal.arr.join(".") + ".parent";
        judgeVal.arr.push("parent");
        if (!(eval(thisStr) && eval(nextStr) && eval(thisStr).location.href === eval(nextStr).location.href)) {
            //找寻父页面元素
            return getTopWin(prop, judgeVal)
        }
    }
    var arr = [];
    for (var a = 0; a < judgeVal.arr.length - 1; a++) {
        arr.push(judgeVal.arr[a])
    }
    judgeVal.arr = arr;
    if (prop.toUpperCase() !== 'WINDOW') {
        judgeVal.arr.push(prop)
    }
    str = ["window"].concat(judgeVal.arr).join(".");
    return eval(str);
}

/**
 * 最上层弹出提示
 * @param msg
 */
function topAlert(msg, win) {
    if (!win) win = $DS.util.getTopWin('window');
    win.alert(msg);
}

/**
 * 获取层级结构的值
 * @param data
 * @param key
 * @param val
 * @param haveParent
 * @param childrenKey
 * @returns {undefined|*}
 */
function getChildrenDataByVal(data, key, val, haveParent, childrenKey) {
    if (!childrenKey)
        childrenKey = "children";
    for (var d = 0; d < data.length; d++) {
        if (data[d][key] === val) {
            var res = $DS.util.clone(data[d]);
            if (haveParent) {
                res.parent = data;
            }
            return res;
        }
        if (data[d][childrenKey]) {
            var res = getChildrenDataByVal(data[d][childrenKey], key, val, haveParent, childrenKey);
            if (res) return res;
        }
    }

}

/**
 * 获取 fastDFS url
 * @param appId
 * @returns {string|*}
 */
function getFastDFSUrl(appId) {
    if (!appId) {
        appId = VUECFG.appId;
    }
    var basePath = getProjectName();
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/getFastDFSUrl");
    if (!result || result.isError) {
        console.error("【 获取fastDFSUrl地址失败!】");
        return "";
    } else {
        return result.result;
    }
}

/**
 * 删除FastDfs文件
 * @param filePath 除去组名
 * @param appId
 * @returns {string|*}
 */
function delFromFastDFS(filePath, appId) {
    if (!appId) {
        appId = VUECFG.appId;
    }
    var basePath = $DS.util.getProjectName(appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/delFromFastDFS", {storagePath: filePath});
    if (result == null)
        return "文件服务器删除文件失败！";
    else if (result.isError)
        return result.errMsg;
    else
        return "";
}

/**
 * 格式化日期
 * @param {} date 时间
 * @param {} fmt  格式化公式
 * @param {} isAm 是否AM/PM显示
 * @param {} isTb 是否上午/下午显示
 * @param {} ischina 是否中文显示
 * @return {}
 * 调用方式：
 * var date = new Date();
 * console.log(date.pattern("yyyy-MM-dd EEE hh:mm:ss"));  //2017-06-26 星期一 14:54:12
 * console.log(date.pattern("yyyy-MM-dd EE hh:mm:ss"));   //2017-06-26 周一 14:54:12
 * console.log(date.pattern("yyyy-MM-dd E hh:mm:ss"));    //2017-06-26 一 14:54:12
 */
function formateTime(date, fmt, isAm, isTb, ischina) {
    /**
     数字转中文
     */
    var Utils = {
        /*单位*/
        units: '个十百千万@#%亿^&~',
        /*字符*/
        chars: '零一二三四五六七八九',
        /* 数字转中文
            @number {Integer} 形如123的数字
            @return {String} 返回转换成的形如 一百二十三 的字符串
        */
        numberToChinese: function (number) {
            if (number == "00") return "零";
            //debugger
            var a = (number + '').split(''), s = [], t = this;
            if (a.length > 12) {
                throw new Error('too big');
            } else {
                for (var i = 0, j = a.length - 1; i <= j; i++) {
                    if (j == 1 || j == 5 || j == 9) {//两位数 处理特殊的 1*
                        if (i == 0) {
                            if (a[i] != '1') s.push(t.chars.charAt(a[i]));
                        } else {
                            s.push(t.chars.charAt(a[i]));
                        }
                    } else {
                        s.push(t.chars.charAt(a[i]));
                    }
                    if (i != j) {
                        s.push(t.units.charAt(j - i));
                    }
                }
            }
            //return s;
            return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {//优先处理 零百 零千 等
                b = t.units.indexOf(d);
                if (b != -1) {
                    if (d == '亿') return d;
                    if (d == '万') return d;
                    if (a[j - b] == '0') return '零'
                }
                return '';
            }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) {// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
                return b;
            }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
                return {'@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千'}[m];
            }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
                c = t.units.indexOf(d);
                if (c != -1) {
                    if (a[j - c] == '0') return d + '零' + b
                }
                return m;
            });
        }
    };
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (ischina) {
        var keys = Object.keys(o);
        for (var k = 0; k < keys.length; k++) {
            var one = o[keys[k]];
            o[keys[k]] = Utils.numberToChinese(one);
        }
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + "日一二三四五六".charAt(date.getDay()));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (ischina) {
                fmt = fmt.replace(RegExp.$1, o[k]);
            } else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    if (isAm) fmt = fmt + " " + formatAPShow(date.getHours());
    if (isTb) fmt = formatTbShow(date.getHours()) + " " + fmt;
    return fmt;

}

/**
 * AM/PM
 * @param {} h_24
 * @return {}
 */
function formatAPShow(h_24) {
    return h_24 < 12 ? 'AM' : 'PM';
}

/**
 * 上午/下午
 * @param {} h_24
 * @return {}
 */
function formatTbShow(h_24) {
    return h_24 < 12 ? '上午' : '下午';
}

/**
 * 清空组件数据
 */
function clearData(ctrl) {
    var type = $DS.getCtrlType(ctrl.info.ds_id)
    window["$" + type].clearData(ctrl);
}

/**
 * 是否触发控件刷新
 * @param ctrlType
 * @param info
 */
function isTrigger(ctrlType, info) {
    if (window["$" + ctrlType].isTrigger) {
        return window["$" + ctrlType].isTrigger(info)
    }
    return true;
}

/**
 * 导出word
 * @param html
 * @param fileName
 */
function exportWord(html, fileName) {
    if (!($("#js_fileSaver") && $("#js_fileSaver").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/FileSaver.js-master/src/FileSaver.js", "fileSaver");
    }
    if (!($("#js_wordexport") && $("#js_wordexport").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/js/pub/jquery.wordexport.js", "wordexport");
    }
    if (!fileName) fileName = "word"
    $("#exportWord").attr("fileName", "").attr("fileName", fileName)
    $("#exportWord").html("").html(html)
    var exportWordInterval = setInterval(function () {
        if ($("#exportWord") && $("#exportWord").wordExport) {
            $("#exportWord").wordExport($("#exportWord").attr("fileName"));
            window.clearInterval(exportWordInterval)
        }
    }, 100)
}

/**
 * 导出pdf
 * @param element
 * @param filename
 * @param opt
 */
function exportPdf(element, filename, opt, unRepalce) {
    if (!element) {
        alert("导出失败!")
        console.error("请指定导出的页面元素!")
        return false;
    }
    element = $(element)[0];
    //引入JS
    if (!($("#js_es6p") && $("#js_es6p").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/pdf/es6-promise.min.js", "es6p");
    }
    if (!($("#js_jspdf") && $("#js_jspdf").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/pdf/jspdf.umd.min.js", "jspdf");
    }
    if (!($("#js_html2canvas") && $("#js_html2canvas").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/html2canvas/html2canvas.min.js", "html2canvas");
    }
    debugger
    var canvasArr = [];
    var ctrlArr = $(element).find(".ds_ctrl");
    ctrlArr.each(function () {
        var id = $(this).attr("id")
        if ($DS.getCtrlById(id).info.ds_show) {
            canvasArr.push(this)
        }
    })
    var count = canvasArr.length;
    var guid = $DS.util.getGuid();
    element.$guid = guid;
    temporary[`$pdf_${guid}`] = count;
    var c2hInterVal = setInterval(function () {
        if (window.html2canvas) {
            debugger
            window.clearInterval(c2hInterVal)
            for (var item of canvasArr) {
                $(item).addClass("ds-canvas")
                var ctrlId = $(item).attr("id")
                var ctrlType = $DS.getCtrlType(ctrlId);
                if (window[`$${ctrlType}`] && window[`$${ctrlType}`].isCanvas) {
                    var replaceDom = $(item)[0];
                    saveCanvasPdf({element, filename, opt, unRepalce, replaceDom, ctrlId, ctrlType})
                } else if (!unRepalce) {
                    saveCtrlPdf({element, filename, opt, unRepalce, replaceDom, ctrlId, ctrlType})
                } else {
                    temporary[`$pdf_${element.$guid}`]--;
                    if (temporary[`$pdf_${element.$guid}`] == 0) {
                        exportPdfByHtml(element, filename, opt)
                    }
                }
            }
        }
    })
}

/**
 * 保存PDF前替换普通控件为图片
 * @param pms
 */
function saveCtrlPdf(pms) {
    debugger
    temporary[`$pdf_${pms.element.$guid}`]--;
    if (temporary[`$pdf_${pms.element.$guid}`] == 0) {
        exportPdfByHtml(pms.element, pms.filename, pms.opt)
    }
}

/**
 * 保存PDF前替换canvas类为图片
 * @param pms
 */
function saveCanvasPdf(pms) {
    debugger
    var cvs = document.createElement("canvas");
    cvs.$dom = pms.replaceDom;
    cvs.width = $(cvs.$dom).width();
    cvs.height = $(cvs.$dom).height();
    html2canvas(cvs.$dom, {canvas: cvs}).then(function (canvas) {
        debugger
        var dataUrl = $DS.util.canvasToDataURL(canvas)
        var width = $(canvas.$dom).css("width");
        var height = $(canvas.$dom).css("height");
        if ($(canvas.$dom).attr("ctrltype") == "grid") {
            width = "100%";
        }
        var img = $(`<div class="ds-pdf" style='width:${width};height: ${height};float: left;background: url("${dataUrl}") no-repeat center;background-size: 100% 100%;' />`);
        $(canvas.$dom).hide()
        insertAfterDom(img[0], $(canvas.$dom)[0])
        temporary[`$pdf_${pms.element.$guid}`]--;
        if (temporary[`$pdf_${pms.element.$guid}`] == 0) {
            exportPdfByHtml(pms.element, pms.filename, pms.opt)
        }
    })

}

/**
 * 向后添加元素
 * @param newElement
 * @param targentElement
 */
function insertAfterDom(newElement, targentElement) {
    var parent = targentElement.parentNode;
    if (parent.lastChild == targentElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targentElement.nextSibling)
    }
}

/**
 * 导出PDF
 * @param element
 * @param filename
 * @param opt
 */
function exportPdfByHtml(element, filename, opt) {
    debugger
    if (!element) {
        alert("导出失败!")
        console.error("请指定导出的页面元素!")
        return false;
    }
    element = $(element)[0];
    //引入JS
    if (!($("#js_es6p") && $("#js_es6p").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/pdf/es6-promise.min.js", "es6p");
    }
    if (!($("#js_jspdf") && $("#js_jspdf").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/pdf/jspdf.umd.min.js", "jspdf");
    }
    if (!($("#js_html2canvas") && $("#js_html2canvas").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/html2canvas/html2canvas.min.js", "html2canvas");
    }
    var exportPdfInterVal = setInterval(function () {
        if (window.jspdf && window.html2canvas) {
            debugger
            if (!($("#js_html2pdf") && $("#js_html2pdf").length > 0)) {
                $DS.loadJsByUrl("/bmp_pub/freeForm/manage/pdf/html2pdf.min.js", "html2pdf");
            }
            if (window.html2pdf) {
                //配置对象
                if (!opt) opt = {
                    margin: 1,
                    image: {type: 'jpeg', quality: 0.98},
                    enableLinks: true,
                    html2canvas: {scale: 2, useCORS: true,},
                    jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
                };
                opt.filename = filename ? `${filename}.pdf` : '导出.pdf';
                $DS.util.setObjVal(temporary, ["$savePdfObj", opt.filename], true)
                html2pdf().set(opt).from(element).save();
                window.clearInterval(exportPdfInterVal)
            }
        }
    })
}

/**
 * 下载PDF
 * @param element
 * @param filename
 */
function downloadPdf(element, filename) {
    if (!element) {
        alert("导出失败!")
        console.error("请指定导出的页面元素!")
        return false;
    }
    filename = filename ? `${filename}.pdf` : '导出.pdf';
    //引入JS
    if (!($("#js_es6p") && $("#js_es6p").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/pdf/es6-promise.min.js", "es6p");
    }
    if (!($("#js_jspdf") && $("#js_jspdf").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/pdf/jspdf.umd.min.js", "jspdf");
    }
    if (!($("#js_html2canvas") && $("#js_html2canvas").length > 0)) {
        $DS.loadJsByUrl("/bmp_pub/freeForm/manage/html2canvas/html2canvas.min.js", "html2canvas");
    }
    debugger
    var downloadPdfInterval = setInterval(function () {
        if (window.jspdf && window.html2canvas) {
            window.clearInterval(downloadPdfInterval)
            debugger
            element = $(element); // 这个dom元素是要导出pdf的div容器
            var w = element.width(); // 获得该容器的宽
            var h = element.height(); // 获得该容器的高
            var offsetTop = element.offset().top; // 获得该容器到文档顶部的距离
            var offsetLeft = element.offset().left; // 获得该容器到文档最左的距离
            var canvas = document.createElement("canvas");
            var abs = 0;
            var win_i = $(window).width(); // 获得当前可视窗口的宽度（不包含滚动条）
            var win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
            if (win_o > win_i) {
                abs = (win_o - win_i) / 2; // 获得滚动条长度的一半
            }
            canvas.width = w * 2; // 将画布宽&&高放大两倍
            canvas.height = h * 2;
            var context = canvas.getContext("2d");
            context.scale(2, 2);
            context.translate(-offsetLeft - abs, -offsetTop);
            // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
            // translate的时候，要把这个差值去掉
            html2canvas($(element)[0]).then(function (canvas) {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                var pageHeight = contentWidth / 592.28 * 841.89;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28;
                var imgHeight = 592.28 / contentWidth * contentHeight;

                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                window.jsPDF = window.jspdf.jsPDF;
                var pdf = new jsPDF('', 'pt', 'a4');

                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                } else { // 分页
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        //避免添加空白页
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                pdf.save(filename);
            })
        }
    })
}

/**
 * 定义导出Excel表格事件
 * @param ctrlName
 * @param fileName
 * @param fileType
 * @returns {boolean|*}
 */
function exportExcel(ctrlName, fileName, fileType, isNotStyle, fileTitle) {
    debugger;
    var ctrl = $DS.getCtrl(ctrlName);

    if (!ctrl) {
        console.error(`【${ctrlName}】控件不存在,导出失败!`)
        return false;
    }
    var id = ctrl.info.ds_id;
    if ($DS.getCtrlType(id) != "grid") {
        console.error(`请选择表格组件!【${ctrlName}】控件类型错误,导出失败!`)
        return false;
    }
    if (!fileName) fileName = ctrlName;
    if (!fileType) fileType = "xlsx";


    let xlsx = new ToXlsx(id, `${fileName}.${fileType}`, isNotStyle, fileTitle || "");
    xlsx.createCustomizeTable()

}

/**
 * 根据iframe控件名 调用iframe下的导出报表Excel功能
 * @param ctrlName\
 * @param exportCfg导出配置
 */
function exportReportExcel(ctrlName, exportCfg) {
    var ctrlInfo = $DS.getCtrl(ctrlName).info;
    var ctrltype = $DS.getCtrlType(ctrlInfo.ds_id);
    if (ctrltype == "iframe") {
        var win = $iframe.getSubWindow(ctrlName);
        if (!win) {
            console.error("获取" + ctrlName + " window 失败");
            return;
        }
        if (win && win.exportExcel) {
            win.exportExcel(exportCfg);
        }
    } else if (ctrltype == "tabs") {
        var activeTab = ctrlInfo.ds_tabs_editableTabsValue;
        var tabWin = $tabs.getSubWindow(ctrlName, activeTab);
        if (tabWin.exportExcel) {
            tabWin.exportExcel(exportCfg);
        }
    }
}

/**
 * 根据tab页名称导出合并的excel
 * @param ctrlName
 * @param fileName
 * @param exportCfg 导出的配置  exportCfg.backColor:true(默认:携带背景色):false(取消背景色)
 * @return {boolean}
 * $DS.util.exportMergeReportExcelByTab("","")
 */
function exportMergeReportExcelByTab(ctrlName, fileName, exportCfg) {
    debugger
    var proj = $DS.util.getProjectName(VUECFG.appId);
    var ctrl = $DS.getCtrl(ctrlName)
    var type = $DS.getCtrlType(ctrl.info.ds_id)
    if (type != "tabs") {
        alert("当前控件不是TAB页!")
        return false;
    }
    var tabsCfg = $DS.getVal(ctrlName)
    var arr = [];
    for (var t = 0; t < tabsCfg.length; t++) {
        if (tabsCfg[t].content.indexOf(proj) != -1) {
            arr.push(tabsCfg[t].content.split(proj)[1])
        } else {
            arr.push(tabsCfg[t].content)
        }

    }
    $DS.util.exportMergeReportExcel(arr, fileName ? fileName : ctrlName, exportCfg)
}

/**
 *
 * @param ctrlName iframe控件名称
 * @param importCfg 导出配置 {importData:true 仅导入数据,不改变原表 否则完全覆盖原表}
 */
function importReportByExcel(ctrlName, importCfg) {
    var ctrlInfo = $DS.getCtrl(ctrlName).info;
    var ctrltype = $DS.getCtrlType(ctrlInfo.ds_id);
    if (ctrltype == "iframe") {
        var win = $iframe.getSubWindow(ctrlName);
        if (!win) {
            console.error("获取" + ctrlName + " window 失败");
            return;
        }
        if (win && win.$("#importExcel")) {
            window.top.importReport_importCfg = importCfg;
            win.$("#importExcel").click();
        }
    } else {
        alert("请选择网页框控件");
        return false;
    }
}

/**
 * 导出合并的excel
 * @param urlArr:需要合并的报表所在页面URL数组
 *              ["/report/reportdesigner/lookreport/reportView.jsp?reportid=ADB53D0E25FF4AF192B6E14CC3588FDA"]
 * @param fileName:导出的文件名
 * @param exportCfg  导出的配置  exportCfg.backColor:true(默认:携带背景色):false(取消背景色)
 */
function exportMergeReportExcel(urlArr, fileName, exportCfg) {
    debugger
    window.top.exportMergeObj = {
        FLAG: true,//放置数据标识
        REOPRTNAME: fileName,//文件名
        JSON: [],//放置的JSON数据
        URLARR: urlArr,//需要合并的报表页面URL
        EXPORTSTATUS: "START",
        exportCfg: exportCfg//导出的配置
    }
    if (!$("#mergeIframe") || $("#mergeIframe").length == 0)
        $("body").append("<iframe id='mergeIframe' class='y-hide'></iframe>")
    var exportMergeReportInterval = setInterval(function () {
        if (window.top.exportMergeObj.URLARR.length > 0) {
            if (window.top.exportMergeObj.FLAG) {
                debugger
                if (window.top.exportMergeObj.URLARR[0].indexOf("reportView.jsp") != -1) {
                    $("#mergeIframe").attr("src", `${$DS.util.getProjectName(VUECFG.appId)}${window.top.exportMergeObj.URLARR[0]}&exportMergeSheet=true`)
                    window.top.exportMergeObj.FLAG = false;
                } else {
                    window.top.exportMergeObj.URLARR.splice(0, 1)
                }
            }
        } else {
            debugger
            $("#mergeIframe").attr("src", `${$DS.util.getProjectName(VUECFG.appId)}/report/reportdesigner/lookreport/reportView.jsp?exportMergeSpread=true`)
            window.clearInterval(exportMergeReportInterval)
        }
    }, 500)

}

/**
 * 根据iframe控件名 调用iframe下的打印报表Excel功能
 * @param ctrlName
 */
function printReportExcel(ctrlName) {
    var ctrlInfo = $DS.getCtrl(ctrlName).info;
    var ctrltype = $DS.getCtrlType(ctrlInfo.ds_id);
    if (ctrltype == "iframe") {
        var win = $iframe.getSubWindow(ctrlName);
        if (!win) {
            console.error("获取" + ctrlName + " window 失败");
            return;
        }
        if (win && win.printExcel) {
            win.printExcel();
        }
    } else if (ctrltype == "tabs") {
        var activeTab = ctrlInfo.ds_tabs_editableTabsValue;
        var tabWin = $tabs.getSubWindow(ctrlName, activeTab);
        if (tabWin.printExcel) {
            tabWin.printExcel();
        }
    }
}

//阿拉伯数字转中文大写
function convertCurrency(money) {
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money == '') {
        return '';
    }
    money = parseFloat($DS.util.removeThousands(money));
    if (money >= maxNum) {
        //超出最大处理数字
        return '';
    }
    if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
}

/**
 * 阿拉伯数字转简写大写
 * @param money
 * @return {string}
 */
function numToCN(Num) {
    //阿拉伯数字转换为简写汉字
    for (i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(",", "")//替换Num中的“,”
        Num = Num.replace(" ", "")//替换Num中的空格
    }
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return;
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    part = String(Num).split(".");
    newchar = "";
    //小数点前进行转化
    for (i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            //alert("位数过大，无法计算");
            return "";
        }//若数量超过拾亿单位，提示
        tmpnewchar = ""
        perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "一" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "二" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "三" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "四" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "五" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "六" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "七" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "八" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "九" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar;
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "十";
                break;
        }
        newchar = tmpnewchar + newchar;
    }
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("一十") == 0) {
        newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
        newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
}

//字符串反转
function reverse(str) {
    if (!str) {
        return "";
    }
    return str.split('').reverse().join('');
}

//RGB转16进制
function rgb2Hex(RGB) {
    // RGB颜色值的正则
    var reg = /^(rgb|RGB)/;
    var color = RGB;
    if (reg.test(color)) {
        var strHex = "#";
        // 把RGB的3个数值变成数组
        var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        // 转成16进制
        for (var i = 0; i < colorArr.length; i++) {
            var hex = Number(colorArr[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            hex = hex.length == 1 ? '0' + hex : hex;
            strHex += hex;
        }
        return strHex;
    } else {
        return String(color);
    }
}

function rgba2Hex(color) {
    var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
    var a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);
}


/**
 * 十六进制转rgba
 * @param str
 * @param n
 * @returns {string}
 */
function hex2Rgba(str, n) {
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    //十六进制颜色转换为RGB格式
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {  //例如：#eee,#fff等
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgba(" + sColorChange.join(",") + "," + n + ")";
    } else {
        return sColor;
    }
}

/*-----------------------------------------------------------------------*/
/**
 * canvas转dataURL：canvas对象、转换格式、图像品质
 * @param canvas
 * @param format
 * @param quality
 * @return {void|string|*}
 */
function canvasToDataURL(canvas, format, quality) {
    return canvas.toDataURL(format || 'image/jpeg', quality || 1.0);
}

/**
 * DataURL转canvas
 * @param dataurl
 * @param cb
 */
function dataURLToCanvas(dataurl, cb) {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        cb(canvas);
    };
    img.src = dataurl;
}

/*-----------------------------------------------------------------------*/
/**
 * image转canvas：图片地址
 * @param src
 * @param cb
 */
function imageToCanvas(src, cb) {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        cb(canvas);
    };
}

/**
 * canvas转image
 * @param canvas
 * @return {HTMLImageElement}
 */
function canvasToImage(canvas) {
    var img = new Image();
    img.src = canvas.toDataURL('image/jpeg', 1.0);
    return img;
}

/*-----------------------------------------------------------------------*/
/**
 * File/Blob对象转DataURL
 * @param obj
 * @param cb
 */
function fileOrBlobToDataURL(obj, cb) {
    var a = new FileReader();
    a.readAsDataURL(obj);
    a.onload = function (e) {
        cb(e.target.result);
    };
}

/**
 * DataURL转Blob对象
 * @param dataurl
 * @return {Blob}
 */
function dataURLToBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

/*-----------------------------------------------------------------------*/
/**
 * Blob转image
 * @param blob
 * @param cb
 */
function blobToImage(blob, cb) {
    fileOrBlobToDataURL(blob, function (dataurl) {
        var img = new Image();
        img.src = dataurl;
        cb(img);
    });
}

/**
 * image转Blob
 * @param src
 * @param cb
 */
function imageToBlob(src, cb) {
    imageToCanvas(src, function (canvas) {
        cb(dataURLToBlob(canvasToDataURL(canvas)));
    });
}

/*-----------------------------------------------------------------------*/
/**
 * Blob转canvas
 * @param blob
 * @param cb
 * @constructor
 */
function BlobToCanvas(blob, cb) {
    fileOrBlobToDataURL(blob, function (dataurl) {
        dataURLToCanvas(dataurl, cb);
    });
}

/**
 * canvas转Blob
 * @param canvas
 * @param cb
 */
function canvasToBlob(canvas, cb) {
    cb(dataURLToBlob(canvasToDataURL(canvas)));
}

/*-----------------------------------------------------------------------*/
/**
 * image转dataURL
 * @param src
 * @param cb
 */
function imageToDataURL(src, cb) {
    imageToCanvas(src, function (canvas) {
        cb(canvasToDataURL(canvas));
    });
}

/**
 * dataURL转image，这个不需要转，直接给了src就能用
 * @param dataurl
 * @return {HTMLImageElement}
 */
function dataURLToImage(dataurl) {
    var img = new Image();
    img.src = d;
    return img;
}

/*-----------------------------------------------------------------------*/


/**
 * 数组排序 元素为对象 根据元素的某个属性值排序
 * @param arr 排序数组
 * @param key 对象的key
 * @returns {*}
 */
function sortArrByItemValue(arr, key) {
    var compare = function (item1, item2) {
        var val1 = item1[key];
        var val2 = item2[key];
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
    return arr.sort(compare)
}


/**
 * 数组元素为对象 根据属性值去重
 * arr 数组
 * key 属性
 */
function uniqueArr(arr, key) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[key]) && res.set(a[key], 1));
}

/**
 * 26进制转十进制
 * @param str
 * @return {number}
 * @constructor
 */
function ConvertNum(str) {
    var n = 0;
    var s = str.match(/./g);//求出字符数组
    var j = 0;
    for (var i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
        var c = s[i].toUpperCase();
        if (c < 'A' || c > 'Z') {
            return 0;
        }
        n += (c.charCodeAt(0) - 64) * j;
    }
    return n;
}

/**
 * 十进制转26进制
 * @param num
 * @return {string}
 */
function convertDSTo26BS(num) {
    var code = '';
    var reg = /^\d+$/g;
    if (!reg.test(num)) {
        return code;
    }
    while (num > 0) {
        m = num % 26
        if (m == 0) {
            m = 26;
        }
        code = String.fromCharCode(64 + parseInt(m)) + code;
        num = (num - m) / 26;
    }
    return code;
}


//比较字符串 数组相似度
function compareSimilarity(x, y) {
    if (Object.prototype.toString.call(x) == "[object String]") {
        x = x.split("");
    }
    if (Object.prototype.toString.call(y) == "[object String]") {
        y = y.split("");
    }
    var z = 0;
    var s = x.length + y.length;

    x.sort();
    y.sort();
    var a = x.shift();
    var b = y.shift();

    while (a !== undefined && b !== undefined) {
        if (a === b) {
            z++;
            a = x.shift();
            b = y.shift();
        } else if (a < b) {
            a = x.shift();
        } else if (a > b) {
            b = y.shift();
        }
    }
    return z / s * 200;
}

/**
 * 判断控件是否加载完成 传递控件名称
 * @param ctrlName
 * @returns {boolean}
 */
function isLoaded(ctrlName) {
    try {
        var ctrlInfo = $DS.getCtrl(ctrlName).info;
        var ctrlId = ctrlInfo.ds_id;
        if (temporary && temporary.loadRegister && temporary.loadRegister[ctrlId] === true) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

/**
 * 判断是否全部加载
 * @return {boolean}
 */
function isAllLoaded() {
    if (VUECFG.viewStatu) {
        var formInfo = VUECFG.formObj;
        for (var k in formInfo) {
            var ctrl = $DS.getCtrlById(k)
            if (!ctrl || !($DS.isLoaded(ctrl.info.ds_ctrlname))) {
                return false;
            }
            return true;
        }
        return true
    } else {
        return false;
    }
}

/**
 * 显示控件
 */
function showCtrl(ctrlName) {
    var ctrl = $DS.getCtrl(ctrlName)
    ctrl.info.ds_show = true;
    VUECFG.$refs[ctrl.info.ds_id].info.ds_show = true;
    VUECFG.$refs[ctrl.info.ds_id].refdate++;
}

/**
 * 隐藏控件
 */
function hideCtrl(ctrlName) {
    var ctrl = $DS.getCtrl(ctrlName)
    ctrl.info.ds_show = false;
    VUECFG.$refs[ctrl.info.ds_id].info.ds_show = false;
    VUECFG.$refs[ctrl.info.ds_id].refdate++;
}

/**
 * 清空表数据缓存
 * @param tablenames
 * @returns {{result: [], isError: boolean, errMsg: string}}
 */
function clearTableSCache(tablenames, errDiscripe) {
    var returnResult = {
        isError: false,
        result: [],
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "清空表数据缓存异常"
    var params = {
        tablenames: tablenames
    };
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/clearTableSCache", params);
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return returnResult;
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 清空全部数据缓存
 * @param errDiscripe
 * @return {{result: [], isError: boolean, errMsg: string}}
 */
function clearAllTableCache(errDiscripe) {
    var returnResult = {
        isError: false,
        result: [],
        errMsg: ""
    }
    if (!errDiscripe) errDiscripe = "清空数据缓存异常"
    var basePath = $DS.util.getProjectName(VUECFG.appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/clearCache");
    if (!result) {
        console.error("【" + errDiscripe + "】系统错误!");
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return returnResult;
    }
    if (result.isError) {
        console.error("【" + errDiscripe + "】" + result.errMsg);
        returnResult.isError = true;
        returnResult.errMsg = "【" + errDiscripe + "】" + result.errMsg;
        return returnResult;
    }
    returnResult.result = result.result;
    return returnResult;
}

/**
 * 根据属性名 获取页面属性值
 * @param proName
 * @return {*}
 */
function getPageProValByName(proName, cfg) {
    if (!cfg) cfg = VUECFG;
    if (cfg.pageArr && cfg.pageArr.length > 0) {
        var pageArr = cfg.pageArr;
        for (var p = 0; p < pageArr.length; p++) {
            if (pageArr[p].info.ds_name === proName) {
                return pageArr[p].info["ds_" + pageArr[p].type.split("drag_")[1]];
            }
        }
    }
}

/**
 * 根据属性名设置页面属性 属性值
 * @param proName
 * @param data
 */
function setPageProValByName(proName, data, cfg) {
    if (!cfg) cfg = VUECFG;
    if (cfg.pageArr && cfg.pageArr.length > 0) {
        var pageArr = cfg.pageArr;
        for (var p = 0; p < pageArr.length; p++) {
            if (pageArr[p].info.ds_name === proName) {
                pageArr[p].info["ds_" + pageArr[p].type.split("drag_")[1]] = data;
                break;
            }
        }
    }
}


//根据控件id获取图形实例
function getChartInstanceById(ctrlId) {
    return temporary[ctrlId + "_dsChart"];
}

//根据控件名称获取图形实例
function getChartInstanceByName(ctrlName) {

    let ctrlInfo = $DS.getCtrl(ctrlName).info;
    $DS.echart.getChartInstanceById(ctrlInfo.ds_id);
}

//根据控件id获取图形option
function getChartOptionById(ctrlId) {
    return temporary[ctrlId + "_computedOption"]
}

//根据控件名获取图形option
function getChartOptionByName(ctrlName) {
    let ctrlInfo = $DS.getCtrl(ctrlName).info;
    $DS.echart.getChartOptionByName(ctrlInfo.ds_id);
}


/**
 * 根据控件属性 获取series数据
 * @param info
 * @returns {[]} series数据数组
 */
function getSeriesData(info, ctrlType) {

    var seriesData = [];
    var ctrType = ("ds_" + ctrlType).toLowerCase();
    //获取维度度量
    var dmObj = $DS.echart.getDM(info);
    var dimension = dmObj.DIMENSION;
    var measure = dmObj.MEASURE;
    if (dimension && dimension.length == 1 && measure && measure.length > 0) {
        seriesData = getSeriesDataForDimOne(dimension, measure, info[ctrType], info);
    } else if (dimension && dimension.length > 1 && measure && measure.length == 1) {
        seriesData = getSeriesDataForDimTwo(dimension, measure, info[ctrType], info)
    }

    return seriesData;
}


/**
 * 一维度多度量情况时 设置seriesData
 * @param dimItems
 * @param measureItems
 * @param sourceData
 * @param info
 * @returns {[]}
 */
function getSeriesDataForDimOne(dimItems, measureItems, sourceData, info) {

    var seriesData = [];
    for (let i = 0; i < measureItems.length; i++) {
        var seriesDataOne = [];
        for (let j = 0; j < sourceData.length; j++) {
            seriesDataOne.push(sourceData[j][measureItems[i]]);
        }
        seriesData.push(seriesDataOne);
    }
    return seriesData;
}

/**
 * 多维度一度量 设置seriesData
 * @param dimItems
 * @param measureItems
 * @param sourceData
 * @param info
 * @returns {[]}
 */
function getSeriesDataForDimTwo(dimItems, measureItems, sourceData, info) {

    var seriesData = [];
    for (let i = 0; i < dimItems.length; i++) {
        var seriesDataTwo = [];
        for (let j = 0; j < sourceData.length; j++) {
            seriesDataTwo.push(sourceData[j][dimItems[i]]);
        }
        seriesData.push(seriesDataTwo);
    }
    return seriesData;
}


/**
 * 根据控件获取度量维度数据
 * @param info
 * @returns {{DIMENSION: [], MEASURE: []}|*}
 */
function getDimsAndMeas(info) {
    var dmInfo = {
        DIMENSION: [],
        MEASURE: []
    }
    if (!temporary.echarsCtrlDM) {
        temporary.echarsCtrlDM = {};
    }
    if (temporary.echarsCtrlDM[info.ds_id]) {
        return temporary.echarsCtrlDM[info.ds_id]
    } else if (info.ds_selectcolumns && info.ds_datasource != "") {
        //已选择的维度度量字段
        var selectDMFields = $DS.util.clone(info.ds_selectcolumns);
        /*for (let i = 0; i < selectfields.length; i++) {
            if (selectfields[i].INDEX && (selectfields[i].DIMENSION) && selectfields[i].DIMENSION !== "EMPTY") {
                selectDMFields.push(selectfields[i])
            }
        }*/
        //排序维度度量字段
        //selectDMFields = $DS.util.sortArrByItemValue(selectDMFields, "INDEX");
        var sourcefield = $DS.util.clone($DS.getSourceById(info.ds_datasource).fieldInfo);

        for (let item of selectDMFields) {
            item.FIELD_NAME = item.FIELD_NAME.toUpperCase();
            if (sourcefield[item.FIELD_NAME]) {
                item = $.extend(sourcefield[item.FIELD_NAME], item);
            }
            //维度数量
            if (item.DIMENSION == "DIMENSION") {
                dmInfo.DIMENSION.push(item);
            }
            //度量数量
            else if (item.DIMENSION == "MEASURE") {
                dmInfo.MEASURE.push(item);
            }
        }
        temporary.echarsCtrlDM[info.ds_id] = dmInfo;
    }
    return dmInfo;
}


/**
 * 设置option
 * @param optModel  控件option模板
 * @param info      控件info
 * @param ctrlType  控件类型
 * @param sourceData 数据源数据
 * @returns {*}
 */
function buildBaseOption(optModel, info, ctrlType, sourceData) {
    debugger
    var dmInfo = $DS.echart.getDM(info);
    var dataObj = {};
    //构造数据对象
    let customData = info.ds_custom_data;
    if (customData) {
        if ($DS.util.isString(customData)) {
            customData = JSON.parse(customData);
        }
    }
    if (customData && Object.keys(customData).length > 0) {
        dataObj = customData;
    } else {
        sourceData = setBaseChartDataLimit(sourceData, info);
        dataObj = $DS.echart.getChartData(sourceData, dmInfo.DIMENSION, dmInfo.MEASURE, info, ctrlType);
    }
    //根据数据以及模板设置 option
    var option = $DS.echart.setBaseOption(optModel, dataObj, info);
    return option;
}


//设置显示数据显示
function setBaseChartDataLimit(result, info) {
    let num = info.ds_data_limit_after;
    let position = 'after';
    if (info.ds_data_limit_before) {
        num = info.ds_data_limit_before;
        position = 'before'
    }
    if (result && result.length > 0 && num && num > 0 && result.length > num) {
        if (position === 'before') {
            result = result.slice(0, num);
        } else if (position === "after") {
            result = result.slice(result.length - num, result.length);
        }
    }
    //根据显示条件过滤数据
    if (info.ds_data_condition && info.ds_data_condition.length > 0) {
        result = $DS.util.filterDataByCondition(info.ds_data_condition, result);
    }
    return result;
}

//设置echarts控件数据显示条件
function dataCondition(info) {

    let cfgData = info.ds_input;
    if (cfgData && $DS.util.isString(cfgData)) {
        cfgData = JSON.parse(cfgData);
    }
    let pInfo = $DS.getCtrlById(info.ds_pid).info;
    if (cfgData && $DS.util.isString(cfgData)) {
        cfgData = JSON.stringify(cfgData);
    }
    $DS.openCfgTable([
        {
            field: "fieldname",
            title: "字段名",
            width: 0.33,
            edit: "text"
        },
        {
            field: "condition",
            title: "条件(=, >, <, <=, >=, !=, in, notin, like, leftlike, rightlike)",
            width: 0.33,
            edit: "text"
        },
        {
            field: "fieldvalue",
            title: "字段值",
            width: 0.33,
            edit: "text"
        }
    ], cfgData, function (data) {
        debugger
        info.ds_input = data;
        data = JSON.parse(data);
        /*let condition = {};
        if (data && data.length > 0) {
            for (let item of data) {
                condition[item.CONDITIONKEY] = item.CONDITIONVALUE;
            }
        }*/
        pInfo.ds_data_condition = data;
    }, "90%", "80%", "设置数据显示条件")
}

/**
 * 获取数据
 * @param sourceData  数据信息
 * @param dimItems    维度字段信息
 * @param measureItems 度量字段信息
 * @param info        控件info
 * @param ctrlType    控件类型
 * @returns {{}}
 */
function getChartDataObj(sourceData, dimItems, measureItems, info, ctrlType) {
    debugger
    var dataObj = {};
    //未设置维度度量加载默认数据
    try {
        if (dimItems.length == 0 || measureItems.length == 0) {
            let defaultData = window[`$${ctrlType}`].getDefaultData();
            console.log(`【${info.ds_ctrlname}】控件未设置维度度量!`);
            return defaultData;
        }
        //多个维度
        if (dimItems.length >= 2 && measureItems.length == 1) {
            dataObj = getDataObjForDimTwo(sourceData, ctrlType, dimItems, measureItems, info);
        }
        //一个维度
        else if (dimItems.length == 1) {
            dataObj = getDataObjForDimOne(sourceData, ctrlType, dimItems, measureItems, info);
        }
        //多维度多度量混合图
        else if (ctrlType == "mix" && dimItems.length >= 2 && measureItems.length >= 2) {
            dataObj = getDataObjForMix(sourceData, ctrlType, dimItems, measureItems, info)
        }
        console.log(dataObj);
        return dataObj;
    } catch (e) {
        console.error(`【${info.ds_ctrlname}】设置数据异常!`);
        console.error(e);
        //加载默认数据
        let defaultData = window[`$${ctrlType}`].getDefaultData();
        return defaultData;
    }
}

/**
 *
 //一维度多度量的图形数据
 * @param result       数据
 * @param ctrlType     控件类型
 * @param dimItems     维度字段信息
 * @param measureItems 度量字段信息
 * @param info
 * @returns {{series_data: [], yAxis_data: [], legend_data: [], xAxis_data: []}}
 */
function getDataObjForDimOne(result, ctrlType, dimItems, measureItems, info) {
    debugger
    var dataObj = {
        legend_data: [],
        yAxis_data: [],
        xAxis_data: [],
        series_data: [],
        // dataZoom_data: []
    };
    var seriesData_ = {};
    var yAxisData = {
        left: "",
        //right: ""
    };
    for (var m = 0; m < measureItems.length; m++) {
        seriesData_[m] = [];
        // 将每个度量名称作为图例
        dataObj.legend_data.push(measureItems[m]["FIELD_NAMECN"]);
        //生成左右Y轴定义
        if ((!measureItems[m]["YAXIS"]) || (measureItems[m]["YAXIS"] == "left")) {
            yAxisData["left"] = {type: 'value'}
        } else {
            yAxisData["right"] = {type: 'value', position: "right"}
        }
    }
    for (n in yAxisData) {
        dataObj.yAxis_data.push(yAxisData[n]);
    }
    //维度字段名
    var dimname = dimItems[0].FIELD_NAME;
    for (var i = 0; i < result.length; i++) {
        //根据维度字段名生成X轴数据
        dataObj.xAxis_data.push(result[i][dimname]);
        //取每一行数据的各个度量值
        for (var j = 0; j < measureItems.length; j++) {
            //todo 格式化数据
            //seriesData_[j].push((result[i][measureItems[j].FIELD_NAME]));
            let oneData = result[i][measureItems[j].FIELD_NAME];
            oneData = $DS.echart.formatterData(measureItems[j], oneData);
            seriesData_[j].push(oneData);
        }
    }
    dataObj.xAxis_data = [{type: 'category', data: dataObj.xAxis_data, position: 'bottom'}];

    //根据度量构建各个series的数据
    for (var i = 0; i < measureItems.length; i++) {
        var yAxisIndex = 0;
        if ((dataObj.yAxis_data.length >= 2) && (measureItems[i]["YAXIS"] == "right")) {
            yAxisIndex = 1;
        }
        dataObj.series_data.push({
            type: ctrlType,
            name: measureItems[i].FIELD_NAMECN,
            yAxisIndex: yAxisIndex,
            data: seriesData_[i]
        });
    }

    return dataObj;
}

/**
 * 获取多维度数据排序
 * @param begin
 * @param end
 * @param obj1
 */
var ccount = 1;
var dimConnResult = [];

function getConnDimName(dimarray, begin, end, obj1) {
    if (ccount == dimarray.length) {
        dimConnResult = Object.keys(obj1);
        return;
    }
    var obj2 = {};
    for (var b = 0; b < begin.length; b++) {
        for (var e = 0; e < (end.length / begin.length); e++) {
            obj2[begin[b] + "|" + end[e]] = null;
        }
    }

    ccount++;
    getConnDimName(dimarray, Object.keys(obj2), dimarray[ccount], obj2);
}

/**
 * 多维度一度量的图形数据
 * @param result
 * @param ctrlType
 * @param dimItems
 * @param measureItems
 * @param info
 */
function getDataObjForDimTwo(result, ctrlType, dimItems, measureItems, info) {
    var dataObj = {
        legend_data: [measureItems[0]["FIELD_NAMECN"]],
        yAxis_data: [],
        xAxis_data: [],
        series_data: []
    };

    var seriesData_ = {};
    var yAxisData = {};
    //遍历维度取各个维度的数据集
    var dimInfoObj = {};
    var resultObj = {};
    for (var j = 0; j < result.length; j++) {
        //为result添加索引
        var connString = "";
        for (var d = 0; d < dimItems.length; d++) {
            var dimFieldName = dimItems[d]["FIELD_NAME"].toUpperCase();
            //获取xAxis相关数据
            if (!dimInfoObj[dimFieldName]) {
                dimInfoObj[dimFieldName] = {};
            }
            dimInfoObj[dimFieldName][result[j][dimFieldName]] = null;
            connString += (d == dimItems.length - 1) ? result[j][dimFieldName] : result[j][dimFieldName] + "|"
        }
        //todo 格式化数据
        //resultObj[j] = result[j][measureItems[0]["FIELD_NAME"].toUpperCase()];
        resultObj[connString] = $DS.echart.formatterData(measureItems[0], result[j][measureItems[0]["FIELD_NAME"].toUpperCase()]);
    }
    //生成左右Y轴定义
    if ((!measureItems[0]["YAXIS"]) || (measureItems[0]["YAXIS"] == "left")) {
        dataObj.yAxis_data[0] = {type: 'value', position: "left"};
    } else {
        dataObj.yAxis_data[0] = {type: 'value', position: "right"};
    }

    //构建xAxis_data
    var dimlength = 1;//虚拟上一个维度的length为1
    var xdataArr = [];//准备所有xAxis的data数组
    var lineHeight = 0;
    for (let a in dimInfoObj) {
        //各维度数据数组
        var dimInfoArr = [];
        //当前去重后维度数据对象
        var currInfoArr = Object.keys(dimInfoObj[a]);
        //遍历上一个维度的数量length
        for (var l = 0; l < dimlength; l++) {
            dimInfoArr = dimInfoArr.concat(currInfoArr);
        }
        dimlength = dimInfoArr.length;
        dataObj.xAxis_data.push({type: 'category', data: dimInfoArr, position: 'bottom'});
        xdataArr.push(dimInfoArr);
    }
    //获取series数组排序
    getConnDimName(xdataArr, xdataArr[0], xdataArr[1], dimConnResult)
    //遍历排序数组准备数据
    var series_data = [];
    for (var s = 0; s < dimConnResult.length; s++) {
        series_data.push((resultObj[dimConnResult[s]]) ? resultObj[dimConnResult[s]] : 0);
    }
    dimConnResult = [];
    ccount = 1;
    var dimNotToMeasure = info.ds_dimToMeasure;
    if (!dimNotToMeasure) {
        //如果一个维度作为度量
        //legend_data
        var lastdimname = dimItems[dimItems.length - 1]["FIELD_NAME"].toUpperCase();
        var firstxAxis = Object.keys(dimInfoObj[lastdimname]);
        dataObj.legend_data = firstxAxis;
        //xAxis_data
        var temparr = [];
        for (var e = 0; e < dataObj.xAxis_data.length - 1; e++) {
            temparr.push(dataObj.xAxis_data[e]);
        }
        dataObj.xAxis_data = temparr;

        //series_data
        for (var s = 0; s < series_data.length;) {
            for (var f = 0; f < firstxAxis.length; f++) {
                if (s >= series_data.length) continue;
                if (!dataObj.series_data[f]) {
                    var yAxisIndex = 0;
                    if ((dataObj.yAxis_data.length >= 2) && (measureItems[0]["YAXIS"] == "right")) {
                        yAxisIndex = 1;
                    }
                    dataObj.series_data[f] = {
                        "type": ctrlType,
                        "name": dataObj.legend_data[f],
                        yAxisIndex: yAxisIndex,
                        data: [series_data[s]]
                    };
                    s++;
                } else {
                    dataObj.series_data[f].data.push(series_data[s]);
                    s++;
                }
            }
        }

    } else {
        dataObj.series_data.push({
            "type": ctrlType,
            "name": dataObj.legend_data[0],
            yAxisIndex: (measureItems[0]["YAXIS"] == "right") ? 1 : 0,
            data: series_data
        });
    }
    for (var m = 0; m < measureItems.length; m++) {
        seriesData_[m] = [];
        //生成左右Y轴定义
        if ((!measureItems[m]["YAXIS"]) || (measureItems[m]["YAXIS"] == "left")) {
            yAxisData["left"] = {type: 'value'}
        } else {
            yAxisData["right"] = {type: 'value', position: "right"}
        }
    }
    for (n in yAxisData) {
        dataObj.yAxis_data.push(yAxisData[n]);
    }

    dataObj.xAxis_data = dataObj.xAxis_data.reverse();
    //xAxis_data 处理多层级
    for (var b = 0; b < dataObj.xAxis_data.length; b++) {
        if (b == 0) delete dataObj.xAxis_data[b].position;
        if (b > 0) {
            var bdata = dataObj.xAxis_data[b].data;
            for (var c = 0; c < bdata.length; c++) {
                bdata[c] = {
                    value: bdata[c],
                    textStyle: {
                        lineHeight: 50 * lineHeight
                    }
                }
            }
        }
        lineHeight++;
    }
    return dataObj;
}

/**
 * 取多维度多度量的dataObj
 * @param sourceData   数据
 * @param ctrlType     控件类型
 * @param dimItems     维度字段
 * @param measureItems 度量字段
 * @param info
 */
function getDataObjForMix(sourceData, ctrlType, dimItems, measureItems, info) {
    debugger
    // var dimNotToMeasure = option.dimNotToMeasure;//末级维度不作为度量
    var dimNotToMeasure = true;
    if (dimNotToMeasure) {
        var dataObj = {
            legend_data: [],
            yAxis_data: [],
            xAxis_data: [],
            series_data: []
        };
        //处理维度:维度作为x轴>>>
        //遍历维度取各个维度的数据集
        var dimInfoObj = {};
        var resultObj = {};
        for (var j = 0; j < sourceData.length; j++) {
            //为result添加索引
            var connString = "";
            for (var d = 0; d < dimItems.length; d++) {
                var dimName = dimItems[d]["FIELD_NAME"].toUpperCase();
                //获取xAxis相关数据
                if (!dimInfoObj[dimName]) {
                    dimInfoObj[dimName] = {};
                }
                dimInfoObj[dimName][sourceData[j][dimName]] = null;
                connString += (d == dimItems.length - 1) ? sourceData[j][dimName] : sourceData[j][dimName] + "|"
            }
            resultObj[connString] = [];
            for (m = 0; m < measureItems.length; m++) {
                //todo 格式化数据
                resultObj[connString].push($DS.echart.formatterData(measureItems[m], sourceData[j][measureItems[m]["FIELD_NAME"]]));
                // resultObj[connString].push(sourceData[j][measureItems[m]["FIELD_NAME"]]);
            }
        }
        //构建xAxis_data
        var dimlength = 1;//虚拟上一个维度的length为1
        var xdataArr = [];//准备所有xAxis的data数组
        var lineHeight = 0;
        for (a in dimInfoObj) {
            //各维度数据数组
            var dimInfoArr = [];
            //当前去重后维度数据对象
            var currInfoArr = Object.keys(dimInfoObj[a])
            //遍历上一个维度的数量length
            for (var l = 0; l < dimlength; l++) {
                dimInfoArr = dimInfoArr.concat(currInfoArr);
            }
            dimlength = dimInfoArr.length;
            dataObj.xAxis_data.push({type: 'category', data: dimInfoArr, position: 'bottom'})
            xdataArr.push(dimInfoArr);
        }
        //处理度量用作图例,y轴>>>
        let yAxisData = [];
        for (var m = 0; m < measureItems.length; m++) {
            //将每个度量名称作为图例
            dataObj.legend_data.push(measureItems[m]["FIELD_NAMECN"]);
            //生成左右Y轴定义
            if ((!measureItems[m]["YAXIS"]) || (measureItems[m]["YAXIS"] == "left")) {
                yAxisData["0"] = {type: 'value'}
            } else {
                yAxisData["1"] = {type: 'value', position: "right"}
            }
        }
        for (n in yAxisData) {
            dataObj.yAxis_data.push(yAxisData[n]);
        }
        //获取series数组排序
        getConnDimName(xdataArr, xdataArr[0], xdataArr[1], dimConnResult)
        //todo 排序后的seriesdata
        //遍历排序数组准备数据
        for (var l = 0; l < measureItems.length; l++) {
            var series_data = [];
            for (var s = 0; s < dimConnResult.length; s++) {
                series_data.push((resultObj[dimConnResult[s]] && resultObj[dimConnResult[s]][l]) ? resultObj[dimConnResult[s]][l] : 0);
            }
            var yAxisIndex = 0;
            if ((dataObj.yAxis_data.length >= 2) && (measureItems[l]["YAXIS"] == "right")) {
                yAxisIndex = 1;
            }
            dataObj.series_data[l] = {
                "type": "bar",
                "name": dataObj.legend_data[l],
                yAxisIndex: yAxisIndex,
                data: series_data
            };
        }

        dimConnResult = [];
        ccount = 1;
        dataObj.xAxis_data = dataObj.xAxis_data.reverse();
        //xAxis_data 处理多层级
        for (var b = 0; b < dataObj.xAxis_data.length; b++) {
            if (b == 0) delete dataObj.xAxis_data[b].position;
            if (b > 0) {
                var bdata = dataObj.xAxis_data[b].data;
                for (var c = 0; c < bdata.length; c++) {
                    bdata[c] = {
                        value: bdata[c],
                        textStyle: {
                            lineHeight: 50 * lineHeight
                        }
                    }
                }
            }
            lineHeight++;
        }
    } else {
        //维度转度量
        dataObj = {
            legend_data: [],
            yAxis_data: [],
            xAxis_data: [],
            series_data: []
        };
        //分化维度
        var firstDim = null;
        var lastDim = {};//剩余维度
        for (var d = 0; d < dimItems.length; d++) {
            if (d > 0) {
                lastDim[dimItems[d]["FIELD_NAME"].toUpperCase()] = [];
            } else {
                firstDim = dimItems[d]["FIELD_NAME"].toUpperCase();
            }

        }
        //分化度量
        var allMeasure = {};
        var measureInfo = {};
        for (var m = 0; m < measureItems.length; m++) {
            allMeasure[(measureItems[m]["FIELD_NAME"])] = measureItems[m]["FIELD_NAME"];
            measureInfo[(measureItems[m]["FIELD_NAME"])] = measureItems[m];
        }
        var allData = {};
        //遍历数据,依据第一维度分类数据
        for (var i = 0; i < sourceData.length; i++) {
            var oneResult = sourceData[i];
            if (!allData[oneResult[firstDim]])
                allData[oneResult[firstDim]] = [oneResult]
            else
                allData[oneResult[firstDim]].push(oneResult);

        }
        var measureObj = {};//度量划分的对象{1月:{},2月{}}
        var count = 0;
        var length = Object.keys(allData).length;

        for (var a in allData) {//1-6月数据
            var data = allData[a];//1月数据
            for (var m in allMeasure) {//预算数,执行数
                if (!measureObj[m])
                    measureObj[m] = {};//以预算数为key记录不同维度+预算数的值
                for (var d = 0; d < data.length; d++) {//遍历1月所有数据
                    var key = "";//按照剩余维度组织key
                    for (var l in lastDim) {
                        key += data[d][l];
                    }
                    key += allMeasure[m];//添加度量key
                    //度量划分后数据结构:预算数:{2019年,句容市,预算数:[(一月)100]}

                    if (!measureObj[m][key]) {
                        var newArr = [];
                        for (var l = 0; l < length; l++) {
                            newArr.push(0);
                        }
                        measureObj[m][key] = {
                            data: newArr,
                            minfo: measureInfo[m]
                        };
                    }
                    measureObj[m][key].data[count] = data[d][m];
                }
            }
            count++;
        }
        var dataArr = {};
        for (var mkey in measureObj) {
            var obj = measureObj[mkey];
            for (var o in obj) {
                dataArr[o] = obj[o];
            }
        }
        //legendData
        legendData = Object.keys(dataArr)
        //xAxisData
        xAxisData = Object.keys(allData)
        //yAxis_data
        var ydata = {};
        //seriesData
        var seriesData = [];
        for (var dd in dataArr) {
            var yAxisIndex = 0;
            if (dataArr[dd].minfo["YAXIS"] == "right") {
                yAxisIndex = 1;
                ydata[yAxisIndex] = {type: 'value', name: "", position: "right"}
            } else {
                ydata[yAxisIndex] = {type: 'value', name: ""}
            }
            seriesData.push({"type": "bar", "name": dd, yAxisIndex: yAxisIndex, data: dataArr[dd].data})
        }

        dataObj.legend_data = legendData;
        dataObj.xAxis_data.push({type: 'category', data: xAxisData, position: 'bottom'})
        for (var y in ydata) {
            dataObj.yAxis_data.push(ydata[y])
        }
        dataObj.series_data = seriesData;
    }
    return dataObj;
}

/**
 * 获取多维度数据排序
 * @param dimarray 维度数据数组
 * @param begin
 * @param end
 * @param obj1
 */
var ccount = 1;
var dimConnResult = [];

function getConnDimName(dimarray, begin, end, obj1) {
    if (ccount == dimarray.length) {
        dimConnResult = Object.keys(obj1);
        return;
    }
    var obj2 = {};
    for (var b = 0; b < begin.length; b++) {
        for (var e = 0; e < (end.length / begin.length); e++) {
            obj2[begin[b] + "|" + end[e]] = null;
        }
    }

    ccount++;
    getConnDimName(dimarray, Object.keys(obj2), dimarray[ccount], obj2);
}


/**
 * //根据数据设置option
 * @param optModel
 * @param dataObj
 * @param info
 * @returns {*|{}}
 */
function setBaseOptionByData(optModel, dataObj, info) {
    var newOption = {};
    var arr = ["xAxis", "yAxis", "series"];
    //拆分x轴，y轴，图形数据和其余属性
    var arrayData = {};
    var stringData = {};
    for (var dataKey in optModel) {
        if ((arr.indexOf(dataKey)) > -1) {
            arrayData[dataKey] = optModel[dataKey]
        } else stringData[dataKey] = optModel[dataKey]
    }
    //设置其余属性
    newOption = setEchartsPros(stringData, info);
    //设置x轴y轴和图形series数据
    if (dataObj) {
        for (var key in dataObj) {
            switch (key) {
                case "yAxis_data":
                    newOption["yAxis"] = setYAxisOption(arrayData, dataObj[key], info);
                    break;
                case "xAxis_data":
                    newOption["xAxis"] = setXAxisOption(arrayData, dataObj[key], info);
                    break;
                case "series_data":
                    newOption["series"] = setSeriesOption(arrayData, dataObj[key], info);
                    break;
            }
        }
    }
    if (newOption.legend)
        newOption.legend["data"] = dataObj.legend_data;

    return newOption;
}

/**
 * 设置y轴 option
 * @param optModel
 * @param yAxisData
 * @param info
 * @return {[]}
 */
function setYAxisOption(optModel, yAxisData, info) {
    var yAxis = [];
    var yAxisModel = optModel.yAxis[0];
    for (let i = 0; i < yAxisData.length; i++) {
        var _yAxisModel = $DS.util.clone(yAxisModel);
        _yAxisModel = setEchartsPros(_yAxisModel, info, i);
        _yAxisModel = $.extend(_yAxisModel, yAxisData[i]);
        //最大值最小值属性如果不存在则删除该配置
        if (!info.ds_yAxis_min && info.ds_yAxis_min != "0") {
            delete _yAxisModel["min"];
        }
        if (!info.ds_yAxis_max && info.ds_yAxis_max != "0") {
            delete _yAxisModel["max"];
        }
        yAxis.push(_yAxisModel);
    }
    return yAxis;
}

/**
 * 设置x轴 option
 * @param optModel
 * @param xAxisData
 * @param info
 * @return {[]}
 */
function setXAxisOption(optModel, xAxisData, info) {
    var xAxis = [];
    var xAxisModel = optModel.xAxis[0];
    for (let i = 0; i < xAxisData.length; i++) {
        var _xAxisModel = $DS.util.clone(xAxisModel);
        _xAxisModel = setEchartsPros(_xAxisModel, info, i);
        _xAxisModel = $.extend(_xAxisModel, xAxisData[i]);
        if (!info.ds_xAxis_min && info.ds_xAxis_min != "0") {
            delete _xAxisModel["min"];
        }
        if (!info.ds_xAxis_max && info.ds_xAxis_max != "0") {
            delete _xAxisModel["max"];
        }
        xAxis.push(_xAxisModel);
    }
    if (xAxis.length > 1)
        delete xAxis[0].position
    return xAxis;
}


/**
 *
 * @param arrayData   x轴y轴和series数据模板
 * @param seriesData  处理后的实际series数据
 * @param info
 * @returns {[]}
 */
function setSeriesOption(arrayData, seriesData, info) {
    var series = [];
    var seriesModel;
    var ctrlType = $DS.getCtrlType(info.ds_id);
    //判断是否是混合图
    if (ctrlType == "mix") {
        var seriesTypes = info.ds_series_type;
        for (let i = 0; i < seriesData.length; i++) {
            if (seriesData.length <= seriesTypes.length) {
                //使用折线模板
                if (seriesTypes[i] == "line") {
                    seriesModel = arrayData.series[0];
                    var seriesModel_ = $DS.util.clone(seriesModel);
                    seriesModel_ = setEchartsPros(seriesModel_, info, i);
                    seriesData[i].type = seriesTypes[i];
                    seriesModel_ = $.extend(seriesModel_, seriesData[i]);
                    series.push(seriesModel_);
                } else {
                    //使用柱图模板
                    seriesModel = arrayData.series[1];
                    seriesModel_ = $DS.util.clone(seriesModel);
                    seriesModel_ = setEchartsPros(seriesModel_, info, i);
                    seriesData[i].type = seriesTypes[i];
                    seriesModel_ = $.extend(seriesModel_, seriesData[i]);
                    series.push(seriesModel_);
                }
            }
            //判断自定义图形类型数量是否大于实际类型数量
            else if (seriesData.length > seriesTypes.length) {
                //若实际series数量大于自定义series类型数量，循环自定义图形数组
                var index = i % seriesTypes.length;
                if (seriesTypes[index] == "line") {
                    seriesModel = arrayData.series[0];
                    var seriesModel_ = $DS.util.clone(seriesModel);
                    seriesModel_ = setEchartsPros(seriesModel_, info, i);
                    seriesData[i].type = seriesTypes[i];
                    seriesModel_ = $.extend(seriesModel_, seriesData[i]);
                    series.push(seriesModel_);
                } else {
                    seriesModel = arrayData.series[1];
                    seriesModel_ = $DS.util.clone(seriesModel);
                    seriesModel_ = setEchartsPros(seriesModel_, info, i);
                    seriesData[i].type = seriesTypes[i];
                    seriesModel_ = $.extend(seriesModel_, seriesData[i]);
                    series.push(seriesModel_);
                }
            }

        }
    } else {
        for (let i = 0; i < seriesData.length; i++) {
            seriesModel = arrayData.series[0];
            var _seriesModel = $DS.util.clone(seriesModel);
            _seriesModel = setEchartsPros(_seriesModel, info, i);
            let ctrlArr = ['pie', 'graph']
            if (ctrlArr.includes(ctrlType)) {
                _seriesModel["data"] = seriesData[i];
            } else {
                _seriesModel = $.extend(_seriesModel, seriesData[i]);
            }

            series.push(_seriesModel);
        }
    }


    return series;
}


/**
 * 设置echars控件属性
 * model 属性模板
 * index 对应的索引
 */
function setEchartsPros(model, info, index) {

    model = setEchartsProsForOBJ(model, info, index);
    return model;
}

function setEchartsProsForOBJ(echartsPro, info, index) {
    for (var key in echartsPro) {
        try {
            if ($DS.util.isString(echartsPro[key]) && echartsPro[key].split("_")[0] == "ds") {
                //分割属性名
                var proName = echartsPro[key].split("|")[0];
                var formatterType = echartsPro[key].split("|")[1];
                var itemType = echartsPro[key].split("|").length > 1 ? echartsPro[key].split("|")[2] : "";
                if ((!formatterType || formatterType === "STRING")) {
                    echartsPro[key] = info[proName];
                } else {
                    var infoType = Object.prototype.toString.call(info[proName]);
                    switch (formatterType) {
                        case "ARRAY":
                            if (infoType === "[object Array]") {
                                if (info[proName].length > 1 && !index && index != 0) {
                                    echartsPro[key] = formatterEcharsProItem(info[proName][index], itemType);
                                } else {
                                    echartsPro[key] = formatterEcharsProItem(info[proName][0], itemType);
                                }
                            } else if (infoType === "[object String]") {
                                let infoPro = info[proName].split(",");
                                if (infoPro.length > 1 && (index || index == 0)) {
                                    echartsPro[key] = formatterEcharsProItem(infoPro[index], itemType);
                                } else {
                                    echartsPro[key] = formatterEcharsProItem(infoPro[0], itemType);
                                }
                            } else if (infoType === "[object Boolean]" && itemType == "BOOLEAN") {
                                echartsPro[key] = info[proName];
                            }
                            break;
                        case "TWODIMARRAY":
                            if (infoType === "[object String]") {
                                let proValItems = info[proName].split("|");
                                if (index || index == 0)
                                    echartsPro[key] = formatterEcharsProItem(proValItems[index].split(","), itemType);
                                else
                                    echartsPro[key] = formatterEcharsProItem(proValItems[0].split(','), itemType);
                            } else if (infoType === "[object Array]" && info[proName].length === 1) {
                                echartsPro[key] = formatterEcharsProItem(info[proName][0], itemType);
                            } else if (infoType === "[object Array]" && (index || index == 0)) {
                                echartsPro[key] = formatterEcharsProItem(info[proName][index], itemType);
                            }
                            break;
                        case "FLOAT":
                            echartsPro[key] = parseFloat(info[proName]);
                            break;
                        case "NUMBER":
                            if (info[proName] && info[proName].toString().indexOf("%") != -1) {
                                echartsPro[key] = info[proName];
                            } else {
                                echartsPro[key] = parseInt(info[proName]);
                            }
                            break;
                        case "BOOLEAN":
                            if (info[proName] && (info[proName] == true || info[proName].toLowerCase() == "true")) {
                                echartsPro[key] = true;
                            } else echartsPro[key] = false;
                            break;
                        case "OBJECT":
                            if (Object.prototype.toString.call(info[proName]) != "[object Object]" && info[proName] != "" && $DS.util.isString(info[proName]))
                                echartsPro[key] = JSON.parse(info[proName]);
                            else
                                echartsPro[key] = info[proName];
                            break;
                        case "FUNCTION":
                            echartsPro[key] = eval(info[proName]);
                            break;
                    }
                }

            } else if ($DS.util.isObject(echartsPro[key])) {
                setEchartsProsForOBJ(echartsPro[key], info, index);
            }
        } catch (e) {
            console.error(`属性${key}设置异常`);
            console.error(e)
        }
    }
    return echartsPro;
}

/**
 * 当echarts属性为数组或二维数组格式化元素
 * @param val 数据
 * @param type 格式化类型
 */
function formatterEcharsProItem(val, type) {

    function formatter(val, type) {
        switch (type) {
            case 'STRING':
                val = val + "";
                break;
            case 'NUMBER':
                val = parseInt(val);
                break;
            case 'FLOAT':
                val = parseFloat(val);
                break;
            case 'BOOLEAN':
                if (val.toLowerCase() == 'true')
                    val = true;
                else
                    val = false;
        }
        return val;
    }

    if (!type) return val;

    if ($DS.util.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
            val[i] = formatter(val[i], type);
        }
    } else {
        val = formatter(val, type);
    }
    return val;

}


/**
 * 处理echarts渐变颜色
 * @param option    图形设置
 * @param info      控件info
 * @param ctrlType  控件类型
 * @returns {*}
 */
function handleOffsetColor(option, info, ctrlType) {
    debugger
    var directionMap = {"up": "0001", "down": "0010", "left": "0100", "right": "1000"};
    var lineCount = 0;
    try {
        for (let i = 0; i < option.series.length; i++) {
            let seriesItem = option.series[i];
            let seriesType = seriesItem.type;
            let direction = info["ds_gradient_direction_" + seriesType];
            let graded = info["ds_series_gradientGraded_" + seriesType];//渐变梯度
            if (direction === "none" || !direction) continue;
            if (seriesType === "line" && info.ds_series_line_areaStyle_color && info.ds_series_line_areaStyle_color.length > 0) {
                seriesItem.areaStyle.color = getGradientCfg(info.ds_series_line_areaStyle_color[lineCount], directionMap[direction], graded ? graded.split("~") : "");
                lineCount++;
            } else if (seriesType === "bar" && info.ds_chartsColor && info.ds_chartsColor.length > 0) {
                seriesItem.itemStyle.color = getGradientCfg(info.ds_chartsColor[i], directionMap[direction], graded ? graded.split("~") : "");
            }
        }
    } catch (e) {
        console.error("设置渐变异常");
        console.error(e);
        return option;
    }

    return option
}

//获取渐变属性配置
/**
 *
 * @param color 颜色
 * @param direction 渐变方向
 * @param graded 渐变梯度
 * @returns {{x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: *|string}, {offset: number, color: *|string}], type: string}}
 */
function getGradientCfg(color, direction, graded) {
    var _color1 = "";
    var _color2 = "";
    var point1 = graded ? graded[0] : "0.6";
    var point2 = graded ? graded[1] : "1";
    if (color.split("#").length > 1) {
        //十六进制
        _color1 = $DS.util.hex2Rgba(color, point1);
        _color2 = $DS.util.hex2Rgba(color, point2);
    } else if (color.split(",").length == 3) {
        //rgb
        _color1 = color.split(")")[0] + point1 + ")";
        _color2 = color.split(")")[0] + point2 + ")";

    } else if (color.split(",").length == 4) {
        //rgba
        let _colorArr = color.split(",");
        _colorArr[_colorArr.length - 1] = point1 + ")";
        _color1 = _colorArr.join(",");
        _colorArr[_colorArr.length - 1] = point2 + ")";
        _color2 = _colorArr.join(",");
    }
    return {
        x: parseInt(direction[0]),
        x2: parseInt(direction[1]),
        y: parseInt(direction[2]),
        y2: parseInt(direction[3]),
        type: "liner",
        global: false,
        colorStops: [
            {
                offset: 0,
                color: _color1,
            }, {
                offset: 1,
                color: _color2,
            }
        ]
    }
}


/**
 * 设置滑动条属性
 * @param option echart图形option
 * @param info   控件info
 * @param ctrlType 控件类型
 */
function handleDataZoom(option, info) {

    let dataZoomTypeStr = info.ds_dataZoom_type;
    if (!dataZoomTypeStr) {
        return option;
    }
    let types = dataZoomTypeStr.split(",");
    option["dataZoom"] = [];
    for (let i = 0; i < types.length; i++) {
        let model = $DS.util.clone(types[i] === "inside" ? chartsBaseModel.getDataZoomInsideModel() : chartsBaseModel.getDataZoomSliderModel());
        model = $DS.echart.setEchartsPros(model, info, i);
        option["dataZoom"].push(model);
    }
    //根据初始化显示图形数量设置滑动条起始结束位置
    if (info.ds_dataZoom_show && dataZoomTypeStr == 'slider') {
        if (info.ds_dataZoom_scopeType == 'percent') {
            delete option.dataZoom[0].startValue;
            delete option.dataZoom[0].endValue;
        } else {
            delete option.dataZoom[0].start;
            delete option.dataZoom[0].end;
        }
    }

    return option;
}

//修改滑动条初始范围设置方式
function changeDataZoomScopeType(info, ctrlType) {

    let val = info.ds_select;
    if (val == 'percent') {
        $DS.setRightProShow(info.ds_pid, {
            ds_dataZoom_start: true,
            ds_dataZoom_end: true,
            ds_dataZoom_startValue: false,
            ds_dataZoom_endValue: false
        }, true)
    } else if (val == 'index') {
        $DS.setRightProShow(info.ds_pid, {
            ds_dataZoom_start: false,
            ds_dataZoom_end: false,
            ds_dataZoom_startValue: true,
            ds_dataZoom_endValue: true
        }, true)
    }
}


/**
 * 根据条件模糊匹配过滤数据
 * @param condition
 * @param data
 * @return {*}
 */
function filterData(condition, data) {
    return data.filter(item => {
        return Object.keys(condition).every(key => {
            return String(item[key]).toLowerCase().includes(
                String(condition[key]).trim().toLowerCase())
        })
    })
}

/**
 * 获取字符串长度
 * @param str
 * @returns {number}
 */
function getStringLength(str) {
    // /<summary>获得字符串实际长度，中文2，英文1</summary>
    // /<param name="str">要获得长度的字符串</param>
    if (!str || (str + "").length == 0) return 0;
    var realLength = 0, len = (str + "").length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = (str + "").charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 1;
        else
            realLength += 2;
    }
    return realLength;
}

/**
 * 格式化echarts数据
 */
function formatterEchartsData(measure, data) {

    //百分数
    if (measure.TENTHOUSAND == '0') {
        data = $DS.util.mul(data, 100);
    }
    //万元
    if (measure.TENTHOUSAND == '1') {
        data = $DS.util.div(data, 10000);
    }
    //十万元
    if (measure.TENTHOUSAND == '2') {
        data = $DS.util.div(data, 100000);
    }
    //百万元
    if (measure.TENTHOUSAND == '3') {
        data = $DS.util.div(data, 1000000);
    }
    //千万元
    if (measure.TENTHOUSAND == '4') {
        data = $DS.util.div(data, 10000000);
    }
    //亿元
    if (measure.TENTHOUSAND == '5') {
        data = $DS.util.div(data, 100000000);
    }

    //格式化小数位数
    if (measure.FIELD_DECLENGTH) {
        data = $DS.util.fixedNumber(data, measure.FIELD_DECLENGTH);
    }

    return data;
}

/**
 * echarts 控件定时刷新
 * @param info
 */
function setTimeRefreshChart(info) {

    //关闭
    if (!info.ds_isRefresh_onTime && temporary[info.ds_id + "_setTimeRefresh"]) {
        window.clearInterval(temporary[info.ds_id + "_setTimeRefresh"]);
    } else if (info.ds_isRefresh_onTime && !temporary[info.ds_id + "_setTimeRefresh"]) {
        try {
            temporary[info.ds_id + "_setTimeRefresh"] = window.setInterval(function () {
                $DS.loadCtrl(info.ds_ctrlname);
            }, info.ds_refresh_onTime_frequency ? info.ds_refresh_onTime_frequency : 5000)
        } catch (e) {
            console.error(`${info.ds_ctrlname}控件定时刷新异常!`);
            console.error(e);
            window.clearInterval(temporary[info.ds_id + "_setTimeRefresh"]);
        }
    }
}

//变更echarts控件刷新频率
function changeRefreshFrequency(info, val) {

    var pInfo = $DS.getCtrlById(info.ds_id);
    if (pInfo.ds_isRefresh_onTime && temporary[pInfo.ds_id + "_setTimeRefresh"]) {
        pInfo.ds_refresh_onTime_frequency = val;
        window.clearInterval(temporary[info.pInfo + "_setTimeRefresh"]);
        $DS.setTimeRefresh(pInfo);
    }
}

/**
 * echarts图形轮播
 * @param info
 */
function dynamicLoad(info) {
    debugger
    if (!temporary.interval)
        temporary.interval = {};
    //更新dataNum,如果interval存在 则停止
    if ($DS.util.getObjVal(temporary, ['interval', info.ds_id]))
        stopDynamic(info);

    if (!info['ds_isDynamic'] || info['ds_isDynamic'] != true)
        return;
    //实例
    let myChart = temporary[info.ds_id + "_dsChart"];
    let option = myChart.getOption();
    var series = option.series;
    var xAxis = option.xAxis;
    temporary[info.ds_id + "intervalSeriesCache"] = deepClone(option.series);
    temporary[info.ds_id + "intervalXAxisCache"] = deepClone(option.xAxis);
    var seriesMinLength;
    for (let o = 0; o < series.length; o++) {
        seriesMinLength = series[0]['data'].length;
        if (series[o]['data'].length < seriesMinLength)
            seriesMinLength = series[o]['data'].length
    }
    //取series里的data里的最小长度 为最大显示长度
    var maxLength = seriesMinLength;
    var dataNum;
    if (info['ds_rollDataNum'] && option['ds_rollDataNum'] != '') {
        dataNum = (info['ds_rollDataNum'] > maxLength) ? maxLength : info['ds_rollDataNum'];
    } else
        return;
    var changeTimes = info.ds_changeTimes ? info.ds_changeTimes : 3000; //默认3秒的切换时间

    //动画滚动方向 默认toRight  toLeft
    var direct = info.ds_direct ? info.ds_direct : 'toRight';
    var index = 0;
    var start = 0;
    var end = parseInt(dataNum);
    if (direct == 'toLeft') {
        start = maxLength - parseInt(dataNum);
        end = maxLength;
    }

    temporary.interval[info.ds_id] = setInterval(function () {

        if (info['pauseScroll'] && index != 0) { //暂停
            index--;
        }

        if (direct == 'toLeft') {//倒放 向左移动
            if (index > start)
                index = 0;
            for (let i = 0; i < series.length; i++) {
                var seriesCache = temporary[info.ds_id + "intervalSeriesCache"];
                var series_sdata = seriesCache[i]['data'].slice(start - index, end - index);
                option['series'][i]['data'] = series_sdata;
            }
            for (let j = 0; j < xAxis.length; j++) {
                var xAxisCache = temporary[info.ds_id + "intervalXAxisCache"]
                var xAxis_sdata = xAxisCache[j]['data'].slice(start - index, end - index);
                option['xAxis'][j]['data'] = xAxis_sdata;
            }
        } else {//默认正放 ,向右移动

            if ((index + end) > maxLength)
                index = 0;
            for (let i = 0; i < series.length; i++) {
                var seriesCache = temporary[info.ds_id + "intervalSeriesCache"];
                var series_sdata = seriesCache[i]['data'].slice(start + index, end + index);
                option['series'][i]['data'] = series_sdata;
            }
            for (let j = 0; j < xAxis.length; j++) {
                var xAxisCache = temporary[info.ds_id + "intervalXAxisCache"]
                var xAxis_sdata = xAxisCache[0]['data'].slice(start + index, end + index);

                option['xAxis'][j]['data'] = xAxis_sdata;
            }

        }
        index++;
        myChart.setOption(option);
    }, changeTimes);

    //鼠标移入暂停轮播
    $("#" + info.ds_id).mousemove(function () {
        info['pauseScroll'] = true;
    });
    //鼠标移离元素继续轮播
    $("#" + info.ds_id).mouseleave(function () {
        info['pauseScroll'] = false;
    });
}

//停止定时,退出动态加载
function stopDynamic(info) {
    debugger
    clearInterval($DS.util.getObjVal(temporary, ['interval', info.ds_id]));//停止定时
    let option = temporary[info.ds_id + "_computedOption"];
    option.series = temporary[info.ds_id + "intervalSeriesCache"];
    option.xAxis = temporary[info.ds_id + "intervalXAxisCache"];
    delete temporary[info.ds_id + "intervalSeriesCache"];
    delete temporary[info.ds_id + "intervalXAxisCache"];
    delete info['pauseScroll'];
    temporary[info.ds_id + "_dsChart"].setOption(option);
}

/**
 * 根据控件名转图片并上传,返回文件路径
 */
function uploadImage(ctrlName, route) {
    var filePath = "";
    var ctrlId = $DS.getCtrl(ctrlName).info.ds_id;
    var basePath = getProjectName();
    var src = temporary[`${ctrlId}_dsChart`].getDataURL()
    var url = `${basePath}/sysconfig/frame/uploadBase64`
    var data = {
        imageData: src,
        route: route,
        fileName: `${ctrlId}.png`
    };
    var res = YCDCommon.Ajax.syncAjax(url, data)
    console.log(res)
    $DS.dealRes(res, function (path) {
        filePath = path;
        console.log(path)
    })
    return filePath;
}

/**
 * 根据条件过滤数据
 * @param data
 * @param filterArr [{fieldname:AA,vieldvalue:100,condition:"="}]
 */
function filterDataByCondition(data, filterArr) {
    var res = [];
    outer:for (var d = 0; d < data.length; d++) {
        var flag = true;
        for (var f = 0; f < filterArr.length; f++) {
            if (!flag) continue outer;
            var filterfieldname = filterArr[f].fieldname;
            switch (filterArr[f].condition) {
                case "=":
                    flag = ((data[d][filterfieldname] + "") == filterArr[f].fieldvalue) ? true : false;
                    break;
                case ">":
                    flag = parseFloat(data[d][filterfieldname]) > parseFloat(filterArr[f].fieldvalue) ? true : false;
                    break;
                case ">=":
                    flag = parseFloat(data[d][filterfieldname]) >= parseFloat(filterArr[f].fieldvalue) ? true : false;
                    break;
                case "<":
                    flag = parseFloat(data[d][filterfieldname]) < parseFloat(filterArr[f].fieldvalue) ? true : false;
                    break;
                case "<=":
                    flag = parseFloat(data[d][filterfieldname]) <= parseFloat(filterArr[f].fieldvalue) ? true : false;
                    break;
                case "!=":
                    flag = ((data[d][filterfieldname] + "") != filterArr[f].fieldvalue) ? true : false;
                    break;
                case "in":
                    var fieldvalInArr = filterArr[f].fieldvalue.split(",")
                    flag = false;
                    for (var fi = 0; fi < fieldvalInArr.length; fi++) {
                        if ((data[d][filterfieldname] + "") == fieldvalue[fi]) {
                            flag = true;
                            break;
                        }
                    }
                    break;
                case "notin":
                    var fieldvalNotInArr = filterArr[f].fieldvalue.split(",")
                    flag = false;
                    for (var fn = 0; fn < fieldvalNotInArr.length; fn++) {
                        if ((data[d][filterfieldname] + "") != fieldvalNotInArr[fn]) {
                            flag = true;
                            break;
                        }
                    }
                    break;
                case "like":
                    flag = (data[d][filterfieldname].indexOf(filterArr[f].fieldvalue) != -1) ? true : false;
                    break;
                case "leftlike":
                    flag = (data[d][filterfieldname].indexOf(filterArr[f].fieldvalue) == 0) ? true : false;
                    break;
                case "rightlike":
                    flag = (data[d][filterfieldname].lastIndexOf(filterArr[f].fieldvalue) == 0) ? true : false;
                    break;
                default:
                    flag = ((data[d][filterfieldname] + "") == filterArr[f].fieldvalue) ? true : false;
                    break;
            }
        }
        if (flag) {//包含多条数据求和的条件添加至数组然后求和
            res.push(data[d])
        }
    }
    return res;
}

/**
 *
 * @param Object 导出的对象
 * @param fileName 文件名
 * @param fileExtension 文件后缀
 */
function exportFileByType(Obj, fileName, fileExtension) {
    if (!Obj) {
        console.log("exportFileByType:请检查方法参数!");
    }
    try {
        var blob = new Blob([JSON.stringify(Obj)], {type: ""});
        saveAs(blob, `${fileName || "文件"}.${fileExtension || "json"}`);
    } catch (e) {
        console.log("导出文件异常,请检查!");
    }

}

/**
 * 寻找满足条件的数组中对象其他属性值
 * @param arr
 * @param key
 * @param valueKey
 * @param val
 * @return {*}
 */
function findObjKeyByVal(arr, key, valueKey, val) {
    var obj = arr.find((item) => {
        return item[valueKey] == val;
    })
    if (!obj) return ""
    return obj[key] ? obj[key] : "";
}

/**
 * 构建分组数据
 * @param data
 * @param key
 * @param cfg:[{
 *     FIELD_NAME:"xxxx",
 *     TYPE:"comma:逗号拼接/index:第N条/sum:求和/avg:平均数/min:最小值/max:最大值",
 * }]
 */
function buildGroupData(data, keyArr, cfg) {
    var res = [];
    var obj = {};
    for (let item of data) {
        var arr = [];
        for (let key of keyArr) {
            arr.push(item[key])
        }
        var id = arr.join("|");
        if (!obj[id]) obj[id] = [];
        obj[id].push(item)
    }
    for (let idKey in obj) {
        var oneData = $DS.util.clone(obj[idKey]);
        var sinleObj = $DS.util.clone(oneData[0]);
        for (let c of cfg) {
            sinleObj[c.FIELD_NAME] = buildDataBySumType(oneData, c.FIELD_NAME, {TYPE: c.TYPE});
        }
        res.push(sinleObj)
    }
    return res;
}

/**
 * 依据字段汇总数据
 * @param data []
 * @param field xxx
 * @param pms {
 *          TYPE:"comma:逗号拼接/index:第N条/sum:求和/avg:平均数/min:最小值/max:最大值",
 *          INDEX:0
 *      }
 */
function buildDataBySumType(data, field, pms) {
    var str = "";
    var arr = [];
    var sum = 0;
    var min = "";
    var max = "";
    if (data.length > 0) {
        min = data[0][field];
        max = data[0][field];
        for (var i = 0; i < data.length; i++) {
            arr.push(data[i][field] ? data[i][field] : "")
            if (pms.TYPE != "comma" && pms.TYPE != "index") {
                sum = $DS.util.add(sum, data[i][field] ? data[i][field] : 0)
                min = min > data[i][field] ? data[i][field] : min;
                max = max > data[i][field] ? max : data[i][field];
            }
        }
    }
    if (field) {
        switch (pms.TYPE) {
            case "comma"://逗号拼接
                str = arr.join(",")
                break;
            case "index"://第N条
                str = (data[pms.INDEX]) ? (data[pms.INDEX][field] ? data[pms.INDEX][field] : "") : ""
                break;
            case "sum"://求和
                str = sum;
                break;
            case "avg"://平均数
                str = $DS.util.div(sum, data.length);
                break;
            case "min"://最小值
                str = parseFloat(min);
                str = (str.toString() == 'NaN') ? 0 : str
                break;
            case "max"://最大值
                str = parseFloat(max);
                str = (str.toString() == 'NaN') ? 0 : str
                break;
        }
    }
    return str;
}

/**
 * 倒计时
 * `${days}天${hours}小时${minutes}分钟${seconds}秒`
 * @param endDateStr
 * @param fun
 */
function timeDown(endDateStr, fun, pms) {
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var model = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(model / (60 * 60));
    model = model % (60 * 60);
    //分钟
    var minutes = Math.floor(model / 60);
    //秒
    var seconds = model % 60;
    //输出到页面
    fun({days, hours, minutes, seconds}, pms)
    //延迟一秒执行自己
    setTimeout(function () {
        timeDown(endDateStr, fun, pms);
    }, 1000)
}

/**
 * 时间相减
 * @param endDate
 * @param nowDate
 */
function subDate(endDate, nowDate) {
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var model = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(model / (60 * 60));
    model = model % (60 * 60);
    //分钟
    var minutes = Math.floor(model / 60);
    //秒
    var seconds = model % 60;
    return {days, hours, minutes, seconds}
}

/**
 * 获取光标位置
 * @param element
 * @return {number}
 */
function getCursorPosition(element) {
    element = $(element)[0]
    var pos = 0;
    if (document.selection) {/*IE*/
        element.focus();
        var range = document.selection.createRange();
        range.moveStart("character", -form1.txt.value.length);
        pos = range.text.length;
    } else if (element.selectionStart) {
        pos = element.selectionStart;
    }
    return pos;
}

/**
 * 设置光标位置
 * @param element
 * @param pos
 */
function setCursorPosition(element, pos) {
    element = $(element)[0]
    pos = pos ? pos : 0;
    if (element.createTextRange) {
        var range = element.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    } else if (element.setSelectionRange) {
        element.setSelectionRange(pos, pos);
    }
}

/**
 * 发送消息
 * @param appId
 * @param msgObj{
 *      @param msgTitle 消息标题
 *      @param msgType  消息类型 BMSG 业务消息 TMSG 文本消息
 *      @param msgContent 消息内容
 *      @param msgStatus 消息状态  -1已删除 0未处理 1已接收 2已处理 3已被他人办理 4驳回
 *      @param msgGroup 消息分组 ""
 *      @param appId 所属系统ID
 *      @param receiveRole 消息接收角色
 *      @param receiveUserId 消息接收人
 *      @param receiveUserType 接收用户类型 1财政用户
 *      @param receiveAgencyId 接收单位ID
 *      @param receiveDivision 接收处室ID
 *      @param receiveMenuId 接收菜单ID 菜单编码
 *      @param receiveADMDIV 接收行政区划
 *      @param receiveDate 接收时间
 *      @param url 业务处理URL
 *      @param bKeyValue 业务ID
 *      @param bType 消息业务类型 BMP_TX 三保预算 BMP_GOV 政府预算
 *      @param sendUserId 消息发送人
 *      @param sendAgencyId 发送单位ID
 *      @param sendDivision 发送处室ID
 *      @param sendUserType 发送用户类型
 *      @param sendADMDIV 发送行政区划
 *      @param saveType 保存类型 add 新增 edit 修改
 * }
 * {
            msgTitle:selectTask.TASKNAME+"已下发,请及时填写",//消息标题>任务名称
            msgType:"BMSG",//消息类型
            msgContent:selectTask.REMARK,//消息内容
            msgStatus:"0",//消息状态
            msgGroup:$DS.util.getGuid(),//消息分组
            appId:VUECFG.appId,//appId
            receiveMenuId:receiveMenuid,//消息接收菜单ID
            receiveADMDIV:selectRes[s].ID,//消息接收区划
            receiveUserType:"1",//接收用户类型
            url:url,//三保预算审核,数据编制
            bKeyValue:selectTask.GUID,//业务ID
            bType:bType,//消息业务类型
            sendUserId:$DS.getPms("USER_MID"),//消息发送人
            sendADMDIV:$DS.getPms("USER_agency"),//消息发送人所在单位
            saveType:"add"//保存类型
        }
 * @return {*}
 */
function sendUserMsg(appId, msgObj, errDiscripe) {
    if (!appId) appId = VUECFG.appId;
    var sendResult = {
        isError: false,
        result: null,
        errMsg: ""
    };
    var url = $DS.util.getProjectName(appId) + "/usermsg/sendUserMsg";
    sendResult = YCDCommon.Ajax.syncAjax(url, msgObj);
    if (!sendResult) {
        console.error("【" + errDiscripe + "】系统错误!");
        sendResult.isError = true;
        sendResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return sendResult;
    }
    if (sendResult.isError) {
        console.error("【" + errDiscripe + "】" + sendResult.errMsg);
        sendResult.isError = true;
        sendResult.errMsg = "【" + errDiscripe + "】" + sendResult.errMsg;
        return sendResult;
    }
    return sendResult;
}

/**
 * 根据消息状态取消息列表
 * @param appId
 * @param userId
 * @return {*}
 */
function getUserMsgByAppId(appId, msgStatus, errDiscripe) {
    if (!appId) appId = VUECFG.appId;
    if (!msgStatus) msgStatus = "";
    var getResult = {
        isError: false,
        result: null,
        errMsg: ""
    };
    var url = $DS.util.getProjectName(appId) + "/usermsg/getCurUserMsg";
    getResult = YCDCommon.Ajax.syncAjax(url, {
        appId: appId,
        msgStatus: msgStatus
    });
    if (!getResult) {
        console.error("【" + errDiscripe + "】系统错误!");
        getResult.isError = true;
        getResult.errMsg = "【" + errDiscripe + "】系统错误!";
        return getResult;
    }
    if (getResult.isError) {
        console.error("【" + errDiscripe + "】" + getResult.errMsg);
        getResult.isError = true;
        getResult.errMsg = "【" + errDiscripe + "】" + getResult.errMsg;
        return getResult;
    }
    return getResult;
}

/**
 * 通用下载(根据url)
 * @param url
 * @param fileName
 */
function downLoadFile(url, fileName) {
    let downV = new downLoadOpen();
    downV.download(url, fileName);
}

//========================================================勿念=================================================
// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global = typeof window === 'object' && window.window === window
    ? window : typeof self === 'object' && self.self === self
        ? self : typeof global === 'object' && global.global === global
            ? global
            : this

function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {autoBom: false}
    else if (typeof opts !== 'object') {
        console.warn('Deprecated: Expected third argument to be a object')
        opts = {autoBom: !opts}
    }

    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type})
    }
    return blob
}

function saveFileDownload(url, name, opts) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.onload = function () {
        saveAs(xhr.response, name, opts)
    }
    xhr.onerror = function () {
        console.error('could not download file')
    }
    xhr.send()
}

function corsEnabled(url) {
    var xhr = new XMLHttpRequest()
    // use sync to avoid popup blocker
    xhr.open('HEAD', url, false)
    try {
        xhr.send()
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299
}

// `a.click()` doesn't work for all browsers (#465)
function saveFileclick(node) {
    try {
        node.dispatchEvent(new MouseEvent('click'))
        debugger
        if (node && $DS.util.getObjVal(temporary, ["$savePdfObj", node.download])) {
            $(".ds-canvas").show();
            $(".ds-pdf").remove();
            delete temporary.$savePdfObj[node.download];
        }
    } catch (e) {
        var evt = document.createEvent('MouseEvents')
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
            20, false, false, false, false, 0, null)
        node.dispatchEvent(evt)
    }
}

// Detect WebView inside a native macOS app by ruling out all browsers
// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
var isMacOSWebView = _global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)

var saveAs = _global.saveAs || (
    // probably in some web worker
    (typeof window !== 'object' || window !== _global)
        ? function saveAs() { /* noop */
        }

        // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
        : ('download' in HTMLAnchorElement.prototype && !isMacOSWebView)
        ? function saveAs(blob, name, opts) {
            var URL = _global.URL || _global.webkitURL
            var a = document.createElement('a')
            name = name || blob.name || 'download'

            a.download = name
            a.rel = 'noopener' // tabnabbing

            // TODO: detect chrome extensions & packaged apps
            // a.target = '_blank'

            if (typeof blob === 'string') {
                // Support regular links
                a.href = blob
                if (a.origin !== location.origin) {
                    corsEnabled(a.href)
                        ? saveFileDownload(blob, name, opts)
                        : saveFileclick(a, a.target = '_blank')
                } else {
                    saveFileclick(a)
                }
            } else {
                // Support blobs
                a.href = URL.createObjectURL(blob)
                setTimeout(function () {
                    URL.revokeObjectURL(a.href)
                }, 4E4) // 40s
                setTimeout(function () {
                    saveFileclick(a)
                }, 0)
            }
        }

        // Use msSaveOrOpenBlob as a second approach
        : 'msSaveOrOpenBlob' in navigator
            ? function saveAs(blob, name, opts) {
                name = name || blob.name || 'download'

                if (typeof blob === 'string') {
                    if (corsEnabled(blob)) {
                        saveFileDownload(blob, name, opts)
                    } else {
                        var a = document.createElement('a')
                        a.href = blob
                        a.target = '_blank'
                        setTimeout(function () {
                            saveFileclick(a)
                        })
                    }
                } else {
                    navigator.msSaveOrOpenBlob(bom(blob, opts), name)
                }
            }

            // Fallback to using FileReader and a popup
            : function saveAs(blob, name, opts, popup) {
                // Open a popup immediately do go around popup blocker
                // Mostly only available on user interaction and the fileReader is async so...
                popup = popup || open('', '_blank')
                if (popup) {
                    popup.document.title =
                        popup.document.body.innerText = 'downloading...'
                }

                if (typeof blob === 'string') return saveFileDownload(blob, name, opts)

                var force = blob.type === 'application/octet-stream'
                var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari
                var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)

                if ((isChromeIOS || (force && isSafari) || isMacOSWebView) && typeof FileReader !== 'undefined') {
                    // Safari doesn't allow downloading of blob URLs
                    var reader = new FileReader()
                    reader.onloadend = function () {
                        var url = reader.result
                        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
                        if (popup) popup.location.href = url
                        else location = url
                        popup = null // reverse-tabnabbing #460
                    }
                    reader.readAsDataURL(blob)
                } else {
                    var URL = _global.URL || _global.webkitURL
                    var url = URL.createObjectURL(blob)
                    if (popup) popup.location = url
                    else location.href = url
                    popup = null // reverse-tabnabbing #460
                    setTimeout(function () {
                        URL.revokeObjectURL(url)
                    }, 4E4) // 40s
                }
            }
)

_global.saveAs = saveAs.saveAs = saveAs

if (typeof module !== 'undefined') {
    module.exports = saveAs;
}

class downLoadOpen {

    download(url, filename) {
        this.getBlob_YL(url, function (blob) {
            let downV = new downLoadOpen();
            downV.saveAs_YL(blob, filename);
        });
    }

    getBlob_YL(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (xhr.status === 200) {
                cb(xhr.response);
            }
        };
        xhr.send();
    }

    saveAs_YL(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement('a');
            var body = document.querySelector('body');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.style.display = 'none';
            body.appendChild(link);
            link.click();
            body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }
    }
}

/*--------------------------------多线程---------------------------------------------------------*/
/**
 * 子线程代码模板
 * //importScripts(`${projectName}/static/pubjs/ycdcommon.js`);
 */
function workCode() {
    debugger
    onmessage = (e) => {
        console.log(`接收到主线程传递的信息：${e.data}`);
        postMessage('你好，我是子进程！');
    }
}

/**
 * ajax线程
 */
function ajaxWorkCode() {
    debugger
    onmessage = (e) => {
        debugger
        var returnResult = {
            isError: false,
            result: [],
            errMsg: "",
        }
        console.log(`接收到主线程传递的信息：${e.data}`);
        var json = e.data;
        if (!json) {
            returnResult.isError = true;
            returnResult.errMsg = "请传递参数";
        } else {
            try {
                json = JSON.parse(json);
                returnResult = YCDCommon.Ajax.syncAjax(`${pathName}${json.url}`, json.data)
            } catch (e) {
                returnResult.isError = true;
                returnResult.errMsg = "JSON参数解析异常";
            }
        }
        returnResult.message = e.data;
        postMessage(JSON.stringify(returnResult));
    }
}

/**
 * 创建线程
 * @param wokerName 线程名称
 * @param fun 线程内执行函数
 */
function newWoker(wokerName, fun) {
    debugger
    if (!wokerName) wokerName = $DS.util.getGuid();
    var pathName = window.location.origin
    var blobString = `
        var pathName='${pathName}';
        var projectName='${pathName}${getProjectName()}';
        var document = self.document = {parentNode: null, nodeType: 9, toString: function() {return "FakeDocument"}};var window = self.window = self;var fakeElement = Object.create(document);
        fakeElement.nodeType = 1;
        fakeElement.toString=function() {return "FakeElement"};
        fakeElement.parentNode = fakeElement.firstChild = fakeElement.lastChild = fakeElement;
        fakeElement.ownerDocument = document;
        document.head = document.body = fakeElement;
        document.ownerDocument = document.documentElement = document;
        document.getElementById = document.createElement = function() {return fakeElement;};
        document.createDocumentFragment = function() {return this;};
        document.getElementsByTagName = document.getElementsByClassName = function() {return [fakeElement];};
        document.getAttribute = document.setAttribute = document.removeChild =
        document.addEventListener = document.removeEventListener =
        function() {return null;};
        document.cloneNode = document.appendChild = function() {return this;};
        document.appendChild = function(child) {return child;};
        importScripts('${pathName}${getProjectName()}/static/jquery/jquery-1.10.2.min.js');
        var YCDCommon={Ajax:{syncAjax:null}};
        YCDCommon.Ajax.syncAjax=${YCDCommon.Ajax.syncAjax.toString()};
        (${fun.toString()})();
    `
    var workBlob = new Blob([blobString]); // 把函数转成一个自执行函数
    // 创建方法
    var url = URL.createObjectURL(workBlob);
    var worker = new Worker(url);
    window.top[wokerName] = worker;
}

/**
 * 执行线程
 * @param wokerName
 * @param message
 * //doWoker("wjx",JSON.stringify({url:`${getProjectName()}/login/getCurUser`,data:{}}))
 * //console.log(JSON.stringify(YCDCommon.Ajax.syncAjax(`${getProjectName()}/login/getCurUser`,{})))
 */
function doWoker(wokerName, message, callBack) {
    if (!window.top[wokerName]) alert(`【${wokerName}】线程不存在!`)
    window.top[wokerName].onmessage = (e) => {
        debugger
        if (callBack) callBack(e)
        console.log(`接收到worker传递的信息：${e.data}`);
    }
    window.top[wokerName].postMessage(message);
}

/**
 * 销毁线程
 * @param wokerName
 */
function destoryWorker(wokerName) {
    if (!window.top[wokerName]) alert(`【${wokerName}】线程不存在!`)
    window.top[wokerName].terminate();
    window.top[wokerName] = null;
}

/*--------------------------------本地缓存---------------------------------------------------------*/
/**
 * 初始化本地缓存
 * @return {*}
 */
function newLowDb() {
    var adapter = new LocalStorage('db')
    var db = low(adapter)
    return db;
}

/**
 * 获取本地缓存数据
 * @param db
 * @param key
 * @return {*}
 */
function getLowDbData(db, key) {
    return db.get(key).value()
}

/**
 * 设置本地缓存数据
 * @param db
 * @param key
 * @param val
 * @return {boolean}
 */
function setLowDbData(db, key, val) {
    try {
        db.set(key, val).write()
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
}

/*-----------------------------------预加载------------------------------------------------------*/
/**
 * 通过路径获取PAGEID
 */
function getPageIdOfSrc(src) {
    var pageId = "";
    if (src && src.indexOf("PAGEID=") != -1 && src.indexOf("freeFromView.jsp") != -1) {
        var urlpms = src.split("?")[1];
        var aParams = urlpms.split('&');
        for (var i = 0; i < aParams.length; i++) {
            var aParam = aParams[i].split('=');
            try {
                var key = decodeURI(aParam[0]).trim()
                var val = decodeURI(aParam[1]).trim();
                if (key == "VUECFGURL") {
                    return "";
                }
                if (key == "PAGEID") {
                    pageId = (val || val === 0) ? val : ""
                }
            } catch (e) {
                return "";
            }
        }
    }
    return pageId;
}

/**
 * 获取预加载的VUECFG
 * @param pageId
 * @return {*}
 */
function preVueCfg(pageId) {
    debugger
    var col = "FORMID,FORMCONFIG";
    var filter = "AND FORMID='" + pageId + "'";
    var appId = $DS.util.getProjectName($DS.getPms("URL_APPID"))
    var data = {
        columns: col,
        tableName: "DM_FORM_PAGESDETAIL",
        filter: filter,
        customcolumns: "",
        dbSource: ""
    }
    $DS.woker.do("$freeFormAjaxWoker",
        JSON.stringify({url: `${appId}/sysconfig/frame/selectFormInfo`, data: data, pageId: pageId}),
        function (e) {
            try {
                var message = e.data;
                message = JSON.parse(message)
                var saveMsg = message.message;
                saveMsg = JSON.parse(saveMsg)
                window.top.$FREEFORMPRELOADMAP[saveMsg.pageId] = message;
            } catch (e) {
                console.warn(`【预加载失败VUECFG】>`, e)
            }

        })
}

/*-----------------------------------------------------------------------------------------*/
/**
 * 对树/表格控件进行关键字搜索
 * @param triggerIDs 控件id数组
 * @param val 关键字
 */
function triggerFilter(triggerIDs, val) {
    debugger
    if (triggerIDs && triggerIDs.length > 0) {
        for (let i = 0; i < triggerIDs.length; i++) {
            //判断为树 并且开启过滤 执行
            if ($DS.getCtrlType(triggerIDs[i]) === "tree" && ($DS.getCtrlById(triggerIDs[i]).info.ds_tree_isfilter === true)) {
                //获取树组件实例 调用过滤方法
                var treeVm = window.top[triggerIDs[i] + "treeRef"];
                if (!treeVm) continue
                var info = $DS.getCtrlById(triggerIDs[i]).info;
                //判断 树节点数据中是否存在过滤字段 不存在不执行过滤
                if (treeVm.data && treeVm.data.length > 0) {
                    var filterFileds = info.ds_tree_filterFiled;
                    if (filterFileds === "" || filterFileds === undefined || filterFileds.length <= 0) {
                        // 未设置过滤字段 默认取节点 名称
                        filterFileds = [];
                        filterFileds.push(info.ds_label_filed);
                    }
                    // 从数据源中找到ID PID NAME 对应的字段替换
                    var source = $DS.getSourceById(info.ds_datasource);
                    if (source) {
                        filterFileds = filterFileds.map(item => {
                            if (item == source.treeId) {
                                return "ID"
                            } else if (item == source.treeName) {
                                return "NAME"
                            } else if (item == source.treePid) {
                                return "PID"
                            } else {
                                return item;
                            }
                        })
                    }


                    //搜索数据中是否携带过滤字段
                    for (let i = 0; i < filterFileds.length; i++) {
                        if (!treeVm.data[0].hasOwnProperty([filterFileds[i]])) {
                            alert("设置过滤有误,数据中不存在 " + "【 " + filterFileds[i] + " 】字段");
                            return;
                        }
                    }
                    info.ds_tree_click_flag = false;
                    treeVm.filter(val);
                }
            }
            //判断是表格 且开启过滤 执行表格过滤方法
            else if ($DS.getCtrlType(triggerIDs[i]) === "grid" && ($DS.getCtrlById(triggerIDs[i]).info.ds_enablesearch === true)) {
                //获取表格组件 调用搜索方法
                $grid.search(triggerIDs[i], val)
            } else if ($DS.getCtrlType(triggerIDs[i]) === "menu" && ($DS.getCtrlById(triggerIDs[i]).info.ds_menu_filter === true)) {
                $menu.search(triggerIDs[i], val)
            }
        }
    }
}

/**
 * 获取页面下某些类型的所有控件
 * @param types 要获取的控件类型 数组
 * @param filter
 * @returns {[]}
 */
function getAllCtrlByCtrlType(types, filter) {

    let ctrls = [];
    let allCtrl = $("#dropArea .ds_ctrl");
    if (!types || types.length == 0 || allCtrl.length == 0) return ctrls;

    allCtrl.each(function () {
        var obj = $DS.getCtrlById(this.id);
        var ctrlType = $DS.getCtrlType(this.id);
        if (types.includes(ctrlType)) {
            if ((filter && filter(obj)) || !filter) {
                ctrls.push({
                    ctrlName: obj.info.ds_ctrlname,
                    ctrlId: this.id,
                    ctrlInfo: obj
                })
            }
        }
    });
    return ctrls;
}


/**
 * 获取当前页面所有表格 树 菜单控件 并返回下拉option
 * @param info
 * @param val
 */
function getOptionByTreeAndTable(info, val) {

    let ctrls = $DS.getAllCtrlByCtrlType(['tree', 'grid', 'menu'], function (ctrlInfo) {
        if (ctrlInfo.ds_id != info.ds_pid)
            return true;
        else
            return false;
    })
    info.ds_options = ctrls.map(item => {
        let option = {};
        option.label = item.ctrlName;
        option.value = item.ctrlId;
        return option;
    })

}

/**
 * 对象监听
 */
$DS.util.Observer = class {
    constructor(data, change) {
        this.data = data;
        this.filterObj(data);
        this.change = change;
    }

    isObject(obj) {
        if (Object.prototype.toString.call(obj) === "[object Object]") {
            return true;
        }
        return false;

    }

    filterObj(data) {
        if (!this.isObject(data)) return;
        for (const key in data) {
            // 过滤原型链上的属性。
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                if (this.isObject(data[key])) {
                    new $DS.util.Observer(data[key]);
                }
                ;
                this.watch(key, value);
            }
        }
    }

    watch(k, v) {
        const that = this;
        Object.defineProperty(this.data, k, {
            enumerable: true,
            configurable: true,
            get: function () {
                //console.log(`${k}，被访问。`)
                return v;
            },
            set: function (newV) {
                //console.log(`${k}，属性值发生变化。`)
                //console.log(`新的值为：${JSON.stringify(newV)}。`)
                that.change(that.data, k, newV)
                if (that.isObject(newV)) {
                    new $DS.util.Observer(newV);
                }
                v = newV;
            },
        })
    }
}

/**
 * 获取所有页面控件
 * @returns {[]}
 */
function getAllPageCtrl(info, val) {

    var ctrlArr = [];
    if (!val) return ctrlArr;
    var pInfo = $DS.getCtrlById(info.ds_pid).info;
    $("#dropArea .ds_ctrl").each(function () {
        if (this.id != VUECFG.ctrlId || pInfo.ds_isEchart) {
            var obj = $DS.getCtrlById(this.id);
            var type = $DS.getCtrlType(this.id);
            if (type != "include") {
                ctrlArr.push({
                    label: obj.info.ds_ctrlname,
                    value: this.id
                })
            }
        }
    })
    info.ds_options = ctrlArr;
}
