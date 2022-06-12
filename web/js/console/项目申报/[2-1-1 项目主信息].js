debugger
var allInput = ["项目编码", "项目类别", "所属项目", "项目拟开工年份", "项目名称", "项目拟结束年份", "项目主管部门", "实施单位", "项目责任人", "投资金额", "INPUT_业务处室", "TEXTAREA_项目立项依据"];//拿到页面所有控件名字
var whoParent = parent.$DS.getPms("whoParent");//判断是哪个按钮打开的此页面
var btn = $DS.getCtrl("生成项目");
var btn_update = $DS.getCtrl("修改");

var publicComeYear = "";
var publicOverYear = "";

function init() {
    btn_update.info.ds_show = false;//默认修改按钮是隐藏的
    if (parent.$DS.getPms("GUID")) {
        btn.info.ds_show = false;
        btn_update.info.ds_show = true;
    }

    if (whoParent == "isUpdate") {//项目申报页面的修改按钮打开的此页面
        btn_update.info.ds_show = true;//修改按钮显示
        btn.info.ds_show = false;//生成项目按钮隐藏
        $DS.putPms("pageData", parent.$DS.getPms("pageDataCes"));
    } else if (whoParent == "isDeta") {//项目申报页面的项目详情打开的此页面
        // btn_update.info.ds_show=false;//修改按钮隐藏
        //  btn.info.ds_show=false;//保存按钮隐藏
        for (let i = 0; i < allInput.length; i++) {//项目详情不允许修改操作,所有输入型组件设置成禁用
            $DS.getCtrl(allInput[i]).info.ds_disabled = true;
        }
        $DS.putPms("pageData", parent.$DS.getPms("pageDataCes"));
    } else {
        $DS.putPms("pageData", parent.$DS.getPms("605C90A5028843BABD24080E6650DE91"));
    }
}

init();

//项目拟开工年份失去焦点事件
function proComeYear() {
    var overYear = str2date(getCtrlByName("项目拟结束年份").info.ds_date);
    var comeYear = str2date(getCtrlByName("项目拟开工年份").info.ds_date);

    var come = comeYear.split("-");
    var over = overYear.split("-");

    for (var i = 0; i < come.length; i++) {
        if (over.length == 1) over = 1000000000000000;//如果用户先输入的项目拟开工年份,逻辑为开工年份不得大于结束年份,所以当结束年份没有值时->结束年份默认大于开工年份
        if (parseInt(come[i]) > parseInt(over[i])) {
            alert("开工年份不能大于结束年份!");
            getCtrlByName("项目拟开工年份").info.ds_date = "";
            break;
        } else if (parseInt(come[i]) == parseInt(over[i])) {
            continue;
        } else {
            break;
        }
    }
}

//项目拟结束年份失去焦点事件
function proNextYear() {
    var comeYear = str2date(getCtrlByName("项目拟开工年份").info.ds_date);
    var overYear = str2date(getCtrlByName("项目拟结束年份").info.ds_date);

    var come = comeYear.split("-");
    var over = overYear.split("-");

    for (var i = 0; i < come.length; i++) {
        if (parseInt(come[i]) > parseInt(over[i])) {
            alert("开工年份不能大于结束年份!")
            getCtrlByName("项目拟结束年份").info.ds_date = "";
            break;
        } else if (parseInt(come[i]) == parseInt(over[i])) {
            continue;
        } else {
            break;
        }
    }

}

//验证是否为日期型,不是就弄成日期型;!只有日期型字符串此方法才管用
function str2date(date) {
    var zz = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])([-]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-]?)(?:29|30)|(?:0?[13578]|1[02])([-]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2([-]?)29)$/;
    if (!zz.test(date)) {
        let y = date.getFullYear();
        let M = date.getMonth() + 1;
        let d = date.getDate();
        date = y + '-' + M + '-' + d;
        return date;
    } else {
        return date;
    }
}

//修改表格高度
function changeRowHeight() {
    var ctrl = $DS.getCtrl("表单容器");
    if (parent.$DS.getPms("whoParent") == "isDeta")
        ctrl.info.ds_height = "100%"
}

//保存点击事件
function save() {
    var proName = $DS.getCtrl("项目名称").info.ds_input;
    parent.$DS.putPms("first2SecProName", proName);//推送向导页第一页的项目名称的值
    var comeYear = str2date($DS.getCtrl("项目拟开工年份").info.ds_date);
    var overYear = str2date($DS.getCtrl("项目拟结束年份").info.ds_date);
    var twoYear = {"comeYear": comeYear, "overYear": overYear}
    parent.$DS.putPms("twoYear", twoYear);
    var sourceVal = $DS.getSourceVal("项目主信息");
    var result = $DS.saveSource("add", "项目主信息");
    if (result.isError) {
        alert("保存失败!" + result.errMsg);
    } else {
        alert("保存成功!");
        $DS.putPms("URL_GUID", result.result.rowObj.GUID);
        parent.$DS.putPms("GUID", result.result.rowObj.GUID);
        parent.$DS.putPms("isClick", "true");
        if (whoParent == "isInsert") {
            parent.parent.$DS.loadCtrl("项目列表");
        }
        parent.$DS.putPms("main_active", parent.$DS.getCtrl("步骤条").info.ds_step_active);
        if (parent.$DS.getCtrl("步骤条")) parent.$DS.loadCtrl("步骤条");
        if (parent.$DS.getCtrl("上一步")) parent.$DS.loadCtrl("上一步");
        if (parent.$DS.getCtrl("下一步")) parent.$DS.loadCtrl("下一步");
        if (parent.$DS.getCtrl("生成项目")) parent.$DS.loadCtrl("生成项目")
        if (parent.$DS.getCtrl("保存并送审")) parent.$DS.loadCtrl("保存并送审");
        $DS.loadCtrl("生成项目");
        $DS.loadCtrl("投资金额");
    }
}

//修改点击事件
function update(notShow) {

    var sourceVal = $DS.getSourceVal("项目主信息");
    var result = $DS.saveSource("edit", "项目主信息");
    var proName = $DS.getCtrl("项目名称").info.ds_input;
    parent.$DS.putPms("first2SecProName", proName);//推送向导页第一页的项目名称的值

    if (!notShow) {
        if (result.isError) {
            alert("修改失败!" + result.errMsg);
        } else {
            alert("修改成功!");
        }
    }
    if (whoParent == "isUpdate" || whoParent == "isInsert") {
        parent.parent.$DS.loadCtrl("项目列表");
    }
    return result;
}

//生成项目按钮加载完成事件
function btn_gen_complete(obj) {
    if (parent.$DS.getPms("GUID")) {
        obj.ds_show = false;
        btn_update.info.ds_show = true;
    }
}

//项目主管部门select控件的加载完成事件
function select_complete(obj) {
    var result = $DS.getSource("部门口径");
    if (result.sourceData) {
        obj.ds_disabled = true;
        $DS.setVal("SELECT_项目主管部门", result.sourceData);
    } else {
        if (whoParent == "isDeta") {
            obj.ds_disabled = true;
        } else {
            obj.ds_disabled = false;
        }

    }
}



