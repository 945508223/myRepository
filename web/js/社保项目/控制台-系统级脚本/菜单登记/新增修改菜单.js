let type = $DS.getPms('URL_$type');//修改 新增

function initType() {

}

function init_() {
    //数据源 添加homnepage字段
    let source = $DS.getSource('DS_注册菜单');
    source.fieldMap['SHOWINHOMEPAGE'] = 'drag_radio_1649820244000';
}

/**
 * 编码输入框加载完成事件
 * @private
 */
function levelsAndCodeLoadAfter_(info, btn) {
    if (type == 'add') {
        switch (btn) {
            case 'CODE':
                info.ds_input = $DS.getPms('URL_superMenuCode') || '';
                break;
            case 'LEVELS':
                info.ds_input = $DS.getPms('URL_superMenuLevels') ? parseInt($DS.getPms('URL_superMenuLevels')) + 1 : 1;
                break;
        }
    }
}


//注册菜单
function registerMenu() {
    debugger
    let result = doRegisterMenu();
    if (result.isError) {
        alert(result.errMsg);
    } else {
        let msg = type == 'add' ? '注册成功' : '修改成功';
        $DS.util.close();
        parent.$DS.loadCtrl('GRID_右侧表格');
        parent.$DS.loadCtrl('TREE_左侧树');
        parent.alert(msg);
    }
}


function doRegisterMenu() {
    let name = "DS_注册菜单";
    var saveResult = {
        isError: false,
        result: [],
        errMsg: ""
    };
    var data = {};
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
    //字段映射>字段名:控件id
    var fieldMap = source.fieldMap;
    for (var key in fieldMap) {
        var value = $DS.getValById(fieldMap[key]);
        data[key] = value;
    }

    //校验
    var checkMsg = $DS.check(data, source);
    if (checkMsg) {
        saveResult.isError = true;
        saveResult.errMsg = checkMsg;
        return saveResult;
    }

    //判断数据是否存在
    if (!data) {
        saveResult.isError = true;
        saveResult.errMsg = "数据为空,保存失败!";
        console.error("【sourceCommonSaveForm】数据为空,保存失败!")
        return saveResult;
    }
    //保存
    var result = save_(appId,  data, source.tableName, source.keyField, "数据源保存失败");
    if (result.isError) {
        saveResult.isError = true;
        saveResult.result = result.result;
        saveResult.errMsg = result.errMsg;
        return saveResult;
    } else {
        saveResult.result = result.result;
    }
    return saveResult;
}

function save_(appId,  datas, tableName, keyField, errDiscripe) {
    debugger;
    var saveResult = {
        isError: false,
        result: {},
        errMsg: ""
    }

    if (!errDiscripe) errDiscripe = "保存异常";
    var param = {
        type: type,
        columns: "",
        keyField: keyField,
        tableName: tableName,
        isRefOrderNum: "0",
        datas: JSON.stringify(datas),
        dbSource: ""
    }

    var basePath = $DS.util.getProjectName(appId);
    var result = YCDCommon.Ajax.syncAjax(basePath + "/sysconfig/frame/saveForm", param);
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

    }
    saveResult.result = result.result;
    return saveResult;
}

/**
 * 根据级次显示控件
 * @param info
 */
function showCtrlByLevel(info) {
   if(info.ds_input=='0'){
       $DS.getCtrl('SWITCH_是否显示').info.ds_show = false;
       $DS.getCtrl('RADIO_是否显示菜单项').info.ds_show = false;
   }
}