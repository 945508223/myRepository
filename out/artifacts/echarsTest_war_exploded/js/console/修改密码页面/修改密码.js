var pagePwdVal = {};
//初始化用户名
function init() {
    $DS.getCtrl("用户名输入框").info.ds_input = $DS.getPms("USER_name");
}

function changePwd() {
    var checkRes = changeCheck();
    if (!checkRes) {
        return;
    }
    var url = getProjectName() + "/login/changePwd?oldpwd=" + pagePwdVal.oldPwd + "&newpwd=" + pagePwdVal.newPwd;
    var result = YCDCommon.Ajax.syncAjax(url);
    if (!result || result.result == "0") {
        alert("修改失败");
    } else if (result.isError) {
        alert(result.errMsg);
    } else if (result.result == "1") {
        alert("修改成功");
        $DS.util.close();
    }
}

//修改前校验
function changeCheck() {
    var oldPwd = $DS.getCtrl("旧密码").info.ds_input;
    var newPwd = $DS.getCtrl("新密码").info.ds_input;
    var surePwd = $DS.getCtrl("确认密码").info.ds_input;
    //未输入旧密码
    if (oldPwd == null || oldPwd == undefined) {
        alert("未输入旧密码!");
        return false;
    }
    //未输入新密码
    if (newPwd == null || newPwd == undefined) {
        alert("未输入新密码!");
        return false;
    }
    //未输入确认密码
    if (surePwd == null || newPwd == null) {
        alert("未输入确认密码!");
        return false;
    }
    //新旧密码相同
    if (newPwd == oldPwd) {
        alert("新密码与旧密码相同!");
        return false;
    }
    //新密码 确认密码不同
    if (newPwd != surePwd) {
        alert("两次输入的密码不同!")
        return false;
    }
    pagePwdVal["oldPwd"] = oldPwd;
    pagePwdVal["newPwd"] = newPwd;
    return true;
}


//校验新密码 与确认密码是否相同