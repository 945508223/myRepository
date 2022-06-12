let pageInfo_ = {
    saveType: 'add',
    changed: false,//是否变更过
    base64: new Base64()
}

/**
 * 初始化
 * @private
 */
function init_() {
    debugger
    let type = $DS.getPms('URL_type');
    //查看
    if (type == 'view') {
        //隐藏保存
        $DS.getCtrl('BUTTON_保存').info.ds_show = false;
        //不可编辑
        let richInfo = $DS.getCtrl('RICH_编辑器').info;
        richInfo.ds_rich_isedit = false;
        richInfo.ds_rich_type = '0';
    }
}

init_();

/**
 * 编辑器加载完成事件
 */
function editorLoadComplete(info) {
    debugger
    let richInfo = $DS.getCtrl('RICH_编辑器').info;
    let content;
    if (info.ds_input) {
        content = info.ds_input.substring(1, info.ds_input.length - 1);
        if ($DS.util.isBase64Str(content)) {
            content = pageInfo_.base64.decode(content);
        }

        richInfo.ds_rich = replaceIp(content);
    }
}

/**
 * 保存文档
 * @private
 */
function saveDoc_() {
    debugger
    let content = $DS.getCtrl('RICH_编辑器').info.ds_rich;
    //纯文本 用于搜索
    var text = content.replace(/<[^<>]+>/g, "");

    //保存大字段
    //转base64
    if (content) {
        content = pageInfo_.base64.encode(content);
    }
    let result = $DS.saveClob(VUECFG.appId, 'PAGECONTENT', content, 'DM_HELP_PAGECLOB', 'GUID', $DS.getPms('URL_docId'))
    if (result.isError) {
        alert(`保存文档失败:${result.errMsg}`);
        return;
    } else {
        //保存纯文本
        result = $DS.saveClob(VUECFG.appId, 'PAGETEXT', text, 'DM_HELP_PAGECLOB', 'GUID', $DS.getPms('URL_docId'))
        if (result.isError) {
            alert(`保存文档失败:${result.errMsg}`);
            return;
        }
        alert('保存成功');
    }
}

/**
 * 关闭页面前
 */
function beforeClose() {

}


/**
 * 替换ip
 * @param content
 */
function replaceIp(content) {
    debugger

    let ip = getIp_();
    let arr = content.split('bmp_upfiles/helpDocImages')
    let newContentArr = arr.map((item,index) => {
        item = item.replace(/http:\/\/.*\.[0-9]{1,4}(:[\w]+)?/g, ip);
        if(index!=arr.length-1){
            item += 'bmp_upfiles/helpDocImages';
        }
        return item;
    })
    content = newContentArr.join('');

    return content;
}


/**
 * 获取ip
 */
function getIp_() {
    let cur = window.document.location.href;
    let pathname = window.document.location.pathname;
    let pos = cur.indexOf(pathname);
    return cur.substring(0, pos);
}