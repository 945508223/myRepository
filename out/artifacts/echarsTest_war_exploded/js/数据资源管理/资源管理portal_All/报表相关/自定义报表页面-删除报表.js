var pageInfo_ = {
    isRegistedObj: {}//记录报表是否已经注册到资源管理
}

/**
 * 删除报表分类
 */
function deleteRptFl() {
    $DS.util.confirm(window.vm, "是否确认删除?", function () {
        var val = $DS.getPms("P_RPTFL");
        if (!val || !val[0].ID) {
            alert("请选择分类!")
        } else {
            if (val[0].ID == "#") {
                alert("根节点不能删除!")
            } else {
                var source = $DS.getSource("数据源_报表分类");
                var reg = $DS.selectBySql(source.appId, "select count(*) as CNT from RPT_T_REPORTTEMPLET where REPORTCAT='" + val[0].GUID + "'", "", "");
                if (reg.isError) {
                    alert(res.errMsg);
                } else {
                    if (reg.result && reg.result[0].CNT > 0) {
                        alert("该分类下存在报表模板，不允许删除！");
                        return false;
                    } else {
                        var res = $DS.deleteByPageSource("数据源_报表分类", val[0].GUID)
                        if (res.isError) {
                            alert(res.errMsg);
                        } else {
                            $DS.loadCtrl("Tree_报表分类")
                            alert("删除成功!")
                        }
                    }
                }
            }
        }
    }, "已取消删除!")
}

/**
 * 修改前事件
 */
function beforeEditFl() {
    var val = $DS.getPms("P_RPTFL");
    if (val && val[0].ID && val[0].ID != "#") {
        return true
    } else {
        alert("根节点不能修改!")
        return false
    }
}

/**
 * 删除报表模板
 */
function deleteRptMd() {
    $DS.util.confirm(window.vm, "是否确认删除?", function () {
        var val = $DS.getPms("P_RPTMD");
        if (!val || !val[0].GUID) {
            alert("请选择一行!")
        } else {
            var res = $DS.deleteByPageSource("数据源_报表模板", val[0].GUID)
            if (res.isError) {
                alert(res.errMsg);
            } else {
                $DS.loadCtrl("GRID_报表模板")
                //删除资源相关
                deleteSource(val[0])
                alert("删除成功!")
            }
        }
    }, "已取消删除!")
}


/**
 * 报表定义
 * @constructor
 */
function rptDy() {
    debugger
    var reportid = $DS.getPms("P_RPTMD");
    if (!reportid) {
        alert("请选择一行!")
        return false;
    }
    var url = `${$DS.util.getProjectName(VUECFG.appId)}/report/reportdesigner/reportmodel.jsp?guid=${reportid[0].GUID}&itemcode=${reportid[0].ITEMCODE}&itemname=${reportid[0].ITEMNAME}&status=${reportid[0].STATUS}`
    $DS.showPage(url, reportid[0].GUID, "", "", null, true);
}

/**
 * 预览报表
 */
function previewReport() {
    debugger
    var rows = $DS.getPms("P_RPTMD");
    if (rows.length != 1) {
        alert("请选择一条数据");
        return;
    }
    showMyDialog('设置预览参数', 650, 480, $DS.util.getProjectName(VUECFG.appId) + '/report/reportdesigner/lookreport/setargs.jsp?reportid=' + rows[0].GUID, function () {
    });
}

//确认下拉菜单点击事件
function dropdown_success_click(command) {
    debugger;
    var val = $DS.getPms("P_RPTMD");
    if (!val || !val[0].GUID) {
        alert("请选择一行!")
        return;
    }
    let status = "";
    //确认
    if (command == "1")
        status = `'1'`;
    //取消确认
    else if (command == "2")
        status = `'0'`;
    let sql = `update RPT_T_REPORTTEMPLET set STATUS = ${status} where GUID = '${val[0]["GUID"]}'`;
    let result = $DS.exeSql(sql);
    if (!result || result.isError) {
        alert("修改确认状态失败!");
        return;
    } else {
        alert("修改确认状态成功!");
        $DS.clearTableSCache("RPT_T_REPORTTEMPLET");
        $DS.loadCtrl("GRID_报表模板");
        return;
    }

}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//复制按钮点击事件
function btn_copy_click() {
    var val = $DS.getPms("P_RPTMD");
    if (!val || !val[0] || !val[0].GUID) {
        alert("请选择复制的报表!");
        return;
    }
    $DS.showPage("freeFromView.jsp?PAGEID=080C95CC284442F1BE3E4EEDD03325CE&PAGETITLE=【4-0-0-0-1】报表复制&APPID=BMP", "报表复制", "60%", "80%");
}

//导入下拉菜单内容的点击事件
function dropdown_Import_click(command) {
    debugger
    if (command == "1") {//新增导入
        var treeVal = $DS.getPms("P_RPTFL");
        $DS.putPms("parent_name", "isInsert");
        $DS.showPage("freeFromView.jsp?PAGEID=179D7FCBCBA549829FD9F3765DEE5D21&PAGETITLE=【8-0-C】报表导入&APPID=BMP&treeId=" + treeVal[0].GUID, "报表新增导入", "60%", "80%");
    } else if (command == "2") {//覆盖导入
        var val = $DS.getPms("P_RPTMD");
        var treeVal = $DS.getPms("P_RPTFL");
        $DS.putPms("parent_name", "isCover");
        //if (!val || !val[0] || !val[0].GUID) {
        //   alert("请选择要覆盖的报表!");
        //   return;
        //}
        $DS.showPage("freeFromView.jsp?PAGEID=179D7FCBCBA549829FD9F3765DEE5D21&PAGETITLE=【8-0-C】报表导入&APPID=BMP&treeId=" + treeVal[0].GUID, "报表覆盖导入", "60%", "80%");
    }
}


//导出按钮点击事件
function btn_export_click() {
    var val = $DS.getPms("P_RPTMD");
    if (!val || !val[0] || !val[0].GUID) {
        alert("请选择导出的报表!");
        return;
    }
    var finalObj = {};//最终的对象数据
    var largeField = {};//报表主表的大字段数据
    var mainTableVal;//报表主表的数据   RPT_T_REPORTTEMPLET
    var dataSetTableVal;//报表模板数据集 表的数据   RPT_T_REPORTTABLES
    var dataSetParam;//报表模板数据集参数 表的数据   RPT_T_REPORTARGS
    var ruleData;//报表校验规则定义表  RPT_T_REPORTRULE
    var etlRuleData;//报表提数规则定义表  RPT_T_ETLRULE
    var sourceData;//报表数据来源定义   RPT_T_REPORTSOURCE

    var Path = $DS.util.getProjectName(VUECFG.appId);
    var Param = {
        tableName: "RPT_T_REPORTTEMPLET",
        keyFieldName: "GUID",
        keyVal: val[0].GUID,
        clobFieldName: "REPORTCONTENT"
    };
    var result = YCDCommon.Ajax.syncAjax(Path + "/frame/getClob", Param);
    if (result && !result.isError) {
        largeField["reportcontent"] = result.result;
        Param.clobFieldName = "PAGEARGS";
        result = YCDCommon.Ajax.syncAjax(Path + "/frame/getClob", Param);
        if (result && !result.isError) {
            largeField["pageargs"] = result.result;
        } else {
            alert("导出失败!" + result.errMsg || "");
        }
    } else {
        alert("导出失败!" + result.errMsg || "");
        return;
    }

    result = $DS.select(VUECFG.appId, "ORDERNO,STATUS,RPTDESC,IS_SHOWEXTRACTDATA,STORTABLENAME,IS_SHOWFORMULA,APPID,REPORTTYPE,RPTDESC,REPORTCAT,ITEMNAME,ITEMCODE,FINYEAR,GUID", "RPT_T_REPORTTEMPLET", `and guid = '${val[0].GUID}'`);
    //var sql = "select * from RPT_T_REPORTTEMPLET where GUID = '" + val[0].GUID + "'";
    //result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        mainTableVal = result.result;
        mainTableVal = Object.assign(mainTableVal, largeField);
    } else {
        alert("导出失败" + result.errMsg);
        return;
    }
    //报表模板数据集
    var sql = "select * from RPT_T_REPORTTABLES where REPORTID = '" + val[0].GUID + "'";
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        //把查到的输入拼到对象中
        dataSetTableVal = result.result != -1 ? result.result : [];
    } else {
        alert("导出失败" + result.errMsg);
        return;
    }
    //报表模板数据集参数
    sql = "select * from RPT_T_REPORTARGS where REPORTID = '" + val[0].GUID + "'";
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        //把从查到的数据拼到对象中
        dataSetParam = result.result != -1 ? result.result : [];
    }
    //报表校验规则定义表
    sql = `select * from RPT_T_REPORTRULE where REPORTID = '${val[0].GUID}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        //把从查到的数据拼到对象中
        ruleData = result.result != -1 ? result.result : [];
    }
    //报表提数规则定义表
    sql = `select * from RPT_T_ETLRULE where REPORTID = '${val[0].GUID}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        //把从查到的数据拼到对象中
        etlRuleData = result.result != -1 ? result.result : [];
    }
    //报表数据来源定义
    sql = `select * from RPT_T_REPORTSOURCE where REPORTID = '${val[0].GUID}'`;
    result = $DS.selectBySql(VUECFG.appId, sql);
    if (result && !result.isError) {
        //把从查到的数据拼到对象中
        sourceData = result.result != -1 ? result.result : [];
    }
    finalObj["mainTable"] = mainTableVal;
    finalObj["secondTable"] = dataSetTableVal;
    finalObj["thirdTable"] = dataSetParam;
    finalObj["fourthTable"] = ruleData;
    finalObj["fifthTable"] = etlRuleData;
    finalObj["sixthTable"] = sourceData;
    var blob = new Blob([JSON.stringify(finalObj)], {type: ""});
    saveAs(blob, `${val[0].ITEMNAME}.json`);
}


//导入按钮点击事件
function btn_Import_click() {

    $DS.showPage("freeFromView.jsp?PAGEID=BF5CBC67C4344A71A36A593507174A61&PAGETITLE=【4-0-0-0-2】报表导入&APPID=BMP", "报表导入", "60%", "80%");
}

//注册资源按钮点击前事件
function beforeClickRegBtn() {
    debugger
    let rpt = $DS.getPms('P_RPTMD')
    if (!rpt || rpt.length == 0) {
        alert('请选择报表')
        return false;
    }
    if ($DS.getPms('regType') == 'cancle') {
        cancleRegister(rpt[0]);
        return false;
    }
}


/**
 * 行点击变更注册资源按钮
 * @param row
 */
function changeRegisterType(row) {
    debugger
    let type, btnName;
    if (pageInfo_.isRegistedObj[row.GUID] === true) {
        //变更为取消资源
        type = 'cancle';
        btnName = '取消注册';
    } else if (pageInfo_.isRegistedObj[row.GUID] === false) {
        //变更为注册资源
        type = 'register';
        btnName = '注册资源';
    } else {
        //查询 是否已注册 并记录 推送参数
        let sql = `select count(*) as CNT from SSO_T_DATARESOURCE WHERE DSGUID = '${row.GUID}' `;
        let res = $DS.selectBySql('PORTAL', sql);
        if (res.isError) {
            console.error(res.errMsg ? res.errMsg : '查询是否已注册资源失败');
        } else if (res.result[0].CNT > 0) {
            type = 'cancle';
            btnName = '取消注册';
            pageInfo_.isRegistedObj[row.GUID] = true;
        } else if (res.result[0].CNT == 0) {
            type = 'register';
            btnName = '注册资源';
            pageInfo_.isRegistedObj[row.GUID] = false;
        }
    }

    if (type) {
        $DS.putPms('regType', type);
        $DS.getCtrl('BUTTON_注册资源').info.ds_button = btnName;
    }
}

//取消注册
function cancleRegister(row) {

    $DS.util.confirm(window.vm, '确定取消注册该资源?', function () {
        debugger
        let res = deleteSource(row)
        if (res == true) {
            alert('取消注册成功')
            pageInfo_.isRegistedObj[row.GUID] = true;
            $DS.putPms('regType', 'register');
            $DS.getCtrl('BUTTON_注册资源').info.ds_button = "注册资源";
            pageInfo_.isRegistedObj[row.GUID] = false;
        } else {
            alert('取消注册失败');
            return false;
        }
    }, '已取消操作')
}


//删除资源
function deleteSource(val) {
    debugger
    //删除资源
    let delSourceSql = `delete from SSO_T_DATARESOURCE where DSGUID in (select DSGUID from SSO_T_DATARESOURCE t start with t.GUID in (select GUID from SSO_T_DATARESOURCE t where DSGUID = '${val.GUID}') connect by prior t.guid = t.SUPERGUID)`;
    //删除角色对资源
    let delRoleSql = `delete from SSO_T_ROLERESOURCE where RESOURCEID in(select GUID from SSO_T_DATARESOURCE t start with t.GUID in (select GUID from SSO_T_DATARESOURCE t where DSGUID = '${val.GUID}') connect by prior t.guid = t.SUPERGUID)`;
    let res = $DS.exeSqls(delRoleSql + ";" + delSourceSql, 'PORTAL');
    if (res.isError) {
        console.error(res.errMsg ? res.errMsg : '删除资源失败!');
        return false;
    }
    return true;
}

//==============================================方法区===============================================================


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

function download(url, name, opts) {
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
function click(node) {
    try {
        node.dispatchEvent(new MouseEvent('click'))
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
                        ? download(blob, name, opts)
                        : click(a, a.target = '_blank')
                } else {
                    click(a)
                }
            } else {
                // Support blobs
                a.href = URL.createObjectURL(blob)
                setTimeout(function () {
                    URL.revokeObjectURL(a.href)
                }, 4E4) // 40s
                setTimeout(function () {
                    click(a)
                }, 0)
            }
        }

        // Use msSaveOrOpenBlob as a second approach
        : 'msSaveOrOpenBlob' in navigator
            ? function saveAs(blob, name, opts) {
                name = name || blob.name || 'download'

                if (typeof blob === 'string') {
                    if (corsEnabled(blob)) {
                        download(blob, name, opts)
                    } else {
                        var a = document.createElement('a')
                        a.href = blob
                        a.target = '_blank'
                        setTimeout(function () {
                            click(a)
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

                if (typeof blob === 'string') return download(blob, name, opts)

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


