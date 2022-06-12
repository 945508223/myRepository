var $iframe = {
    type: "drag_iframe",
    dataType: "singeleData",
    uuid: Date.parse(new Date),
    getConfig: getIframeConfig,
    register: registerIframe,
    showProperty: showPropertyIframe,
    getSubWindow: getSubWindow,
    changeIframeSrc: changeIframeSrc,
    reloadIframe: reloadIframe,
    reloadIframeByName: reloadIframeByName
};

function getIframeConfig() {
    return {
        ds_id: "",
        ds_ctrlname: "IFRAME_" + $iframe.uuid++,
        ds_show: true,
        ds_showCondition: "",
        ds_width: "100%",
        ds_height: "15rem",
        ds_style: "drawing-item",
        ds_out_padding: "0rem",
        ds_out_margin: "0rem",
        ds_loading: "normal",
        ds_ispro: false,
        ds_pid: "",
        ds_draggable: "true",
        ds_appid: "",
        ds_out_borderWidth: "0rem",
        ds_out_borderColor: "#606266",
        ds_out_borderStyle: "solid",
        ds_iframe_setType: "poptree",
        ds_iframe_src_input: "",
        ds_iframe_src_params: [],
        ds_iframe_src: "",
        ds_load_success: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新"
    }
}

function registerIframe() {
    Vue.component("drag_iframe", {
        props: ["type", "info"],
        created: function () {
            this.$nextTick(function () {
                addListener(this);
                if (!this.info.ds_ispro) {
                    if (this.info.ds_loading == "lazy") {
                        temporary.loadRegister[this.info.ds_id] = true
                    } else {
                        try {
                            var e = this.info.ds_id;
                            var s = $(`#${this.info.ds_id}_iframe`)[0];
                            if (s.attachEvent) {
                                s.attachEvent("onload", function () {
                                    temporary.loadRegister[e] = true
                                })
                            } else {
                                s.onload = function () {
                                    temporary.loadRegister[e] = true
                                }
                            }
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
                VUECFG.$refs[this.info.ds_id] = this
            })
        },
        data: function () {
            return {hide: "y-hide", iframeSrc: this.info.ds_iframe_src, refdate: Date.parse(new Date)}
        },
        computed: {
            computed_drag: function () {
                if (VUECFG.viewStatu) return false;
                return this.info.ds_draggable
            }, computed_style: function () {
                var e = {
                    padding: this.info.ds_out_padding,
                    margin: this.info.ds_out_margin,
                    borderWidth: this.info.ds_out_borderWidth,
                    borderColor: this.info.ds_out_borderColor,
                    borderStyle: this.info.ds_out_borderStyle
                };
                if (!VUECFG.viewStatu) {
                    e["height"] = "calc(100% - 0rem)"
                }
                return e
            }, computed_show: function () {
                var refdateStr = `${this.refdate}_change`;
                if (!VUECFG.viewStatu) {
                    return this.info.ds_ispro && !this.info.ds_show ? "y-hide" : "y-show"
                } else {
                    if (this.info.ds_showCondition) {
                        var str = $DS.util.replace(this.info.ds_showCondition);
                        return eval(str) ? "y-show" : "y-hide"
                    }
                    return this.info.ds_show ? "y-show" : "y-hide"
                }
            }, computed_iframeName: function () {
                if (!VUECFG.viewStatu) return this.info.ds_ctrlname;
                return ""
            }, computed_Ts: function () {
                if (!VUECFG.viewStatu) {
                    return {height: "0rem"}
                }
            }, computed_iframeSrc: function () {
                var e = this.info.ds_iframe_src_params;
                var s = "";
                if (!VUECFG.viewStatu || this.info.ds_loading == "lazy") {
                    s = ""
                } else if (this.info.ds_iframe_setType == "input") {
                    s = this.info.ds_iframe_src_input
                } else {
                    s = this.info.ds_iframe_src
                }
                if (s && e && e.length > 0) {
                    if (typeof e === "string") {
                        e = JSON.parse(e)
                    }
                    if (!(Object.keys(e).length === 0)) {
                        for (let r = 0; r < e.length; r++) {
                            if (s.split("?").length == 1) {
                                s += "?"
                            }
                            var d = $DS.util.replace(e[r].value);
                            s += "&" + e[r].key + "=" + d
                        }
                    }
                    if (s[s.length - 1] === "&") {
                        s = s.substr(0, s.length - 1)
                    }
                }
                if (this.info.ds_appid && s) {
                    debugger;
                    this.$nextTick(function () {
                        var e = this.info.ds_id + "_iframe";
                        iframeGotoOtherApp(s, $DS.util.getProjectName(this.info.ds_appid).substring(1));
                        setTimeout(function () {
                            $(`#${e}`).attr("src", s)
                        }, 500)
                    });
                    return ""
                } else {
                    return s
                }
            }
        },
        methods: {changeCurrId: changeCurrId, mouseOver: ctrlMouseOver, mouseLeave: ctrlMouseLeave},
        template: util.getModelHtml("drag_iframe")
    })
}

function loadSuccess(e, s) {
    var d = this.info;
    $DS.eval(d.ds_load_success, d)
}

function showPropertyIframe(e) {
    var s = [];
    var d = getProInfoByObj("select", {
        ds_id: "type",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "组件类型",
        ds_placeholder: "组件类型",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: true,
        ds_options: getAllCtrl(),
        ds_select: $iframe.type,
        ds_select_change: "changeFormCtrl",
        ds_name: "type",
        ds_ispro: true
    });
    s.push(d);
    var r = getProInfoByObj("input", {
        ds_id: "ds_ctrlname",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件名",
        ds_placeholder: "控件名",
        ds_input: VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,
        ds_input_blur: "checkDuplication",
        ds_name: "ds_ctrlname",
        ds_ispro: true
    });
    s.push(r);
    var t = getProInfoByObj("input", {
        ds_id: "ds_width",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件宽度",
        ds_placeholder: "控件宽度",
        ds_input: "100%",
        ds_name: "ds_width",
        ds_ispro: true,
        ds_isrequired: false
    });
    s.push(t);
    var a = getProInfoByObj("input", {
        ds_id: "ds_height",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件高度",
        ds_placeholder: "控件高度",
        ds_input: "15rem",
        ds_name: "ds_height",
        ds_ispro: true
    });
    s.push(a);
    var i = getProInfoByObj("radio", {
        ds_id: "ds_iframe_setType",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "路径设置方式",
        ds_name: "ds_iframe_setType",
        ds_radio: "poptree",
        ds_options: [{value: "poptree", text: "选择表单"}, {value: "input", text: "网页地址"}],
        ds_radiobtn: true,
        ds_ispro: true,
        ds_radio_change: "changeSetSrcType"
    });
    s.push(i);
    var o = getProInfoByObj("button", {
        ds_id: "ds_iframe_cleanSrc",
        ds_button: "清除",
        ds_pid: VUECFG.ctrlId,
        ds_labelwidth: "10",
        ds_showlable: true,
        ds_height: "2.5rem",
        ds_icon: "el-icon-delete",
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "清除路径设置",
        ds_name: "ds_iframe_cleanSrc",
        ds_ispro: true,
        ds_button_click: "cleanIframeSrc"
    });
    s.push(o);
    var _ = getProInfoByObj("input", {
        ds_id: "ds_iframe_src",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "网页路径",
        ds_placeholder: "网页路径",
        ds_input: "",
        ds_name: "ds_iframe_src",
        ds_readonly: true,
        ds_ispro: true,
        ds_show: true,
        ds_input_focus: "setIframeSrc"
    });
    s.push(_);
    var l = getProInfoByObj("input", {
        ds_id: "ds_iframe_src_input",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "网页路径",
        ds_placeholder: "网页路径",
        ds_input: "",
        ds_name: "ds_iframe_src_input",
        ds_ispro: true,
        ds_show: false
    });
    s.push(l);
    var n = getProInfoByObj("input", {
        ds_id: "ds_iframe_src_params",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "参数设置",
        ds_placeholder: "参数设置",
        ds_input: "",
        ds_name: "ds_iframe_src_params",
        ds_readonly: true,
        ds_valformat: "JSON",
        ds_input_focus: "setSrcParams",
        ds_ispro: true,
        ds_show: true
    });
    s.push(n);
    var u = getProInfoByObj("select", {
        ds_id: "ds_appid",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "跨系统访问",
        ds_placeholder: "跨系统访问",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getAppArrForIframe(),
        ds_select: "",
        ds_name: "ds_appid",
        ds_ispro: true,
        ds_isrequired: true,
        group1: "跨系统访问",
        group2: ""
    });
    s.push(u);
    var p = getProInfoByObj("select", {
        ds_id: "ds_loading",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "加载机制",
        ds_placeholder: "请选择加载机制",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_options: [{value: "first", label: "优先加载"}, {value: "normal", label: "正常加载"}, {value: "lazy", label: "懒加载"}],
        ds_select: "normal",
        ds_select_change: "changeCtrlLoading",
        ds_name: "ds_loading",
        ds_ispro: true,
        group1: "控件加载",
        group2: ""
    });
    s.push(p);
    var f = getProInfoByObj("switch", {
        ds_id: "ds_show",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示控件",
        ds_name: "ds_show",
        ds_switch: true,
        ds_ispro: true,
        group1: "显示设置",
        group2: ""
    });
    s.push(f);
    var c = getProInfoByObj("input", {
        ds_id: "ds_out_padding",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "内边距大小",
        ds_placeholder: "内边距大小",
        ds_input: "0rem",
        ds_name: "ds_out_padding",
        ds_ispro: true,
        group1: "属性",
        group2: "组件样式"
    });
    s.push(c);
    var g = getProInfoByObj("input", {
        ds_id: "ds_out_margin",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "外边距大小",
        ds_placeholder: "外边距大小",
        ds_input: "0rem",
        ds_name: "ds_out_margin",
        ds_ispro: true,
        group1: "属性",
        group2: "组件样式"
    });
    s.push(g);
    var m = getProInfoByObj("input", {
        ds_id: "ds_out_borderWidth",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "网页框边框宽度",
        ds_placeholder: "网页框边框宽度",
        ds_input: "0rem",
        ds_name: "ds_out_borderWidth",
        ds_ispro: true,
        group1: "属性",
        group2: "组件样式"
    });
    s.push(m);
    var h = getProInfoByObj("color", {
        ds_id: "ds_out_borderColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "网页框边框颜色",
        ds_name: "ds_out_borderColor",
        ds_ispro: true,
        ds_show_alpha: true,
        ds_color: "#606266",
        group1: "属性",
        group2: "组件样式"
    });
    s.push(h);
    var b = getProInfoByObj("select", {
        ds_id: "ds_out_borderStyle",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "网页框边框类型",
        ds_placeholder: "网页框边框类型",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_options: [{value: "solid", label: "实线"}, {value: "dashed", label: "虚线"}, {value: "dotted", label: "点状"}],
        ds_select: "solid",
        ds_name: "ds_out_borderStyle",
        ds_ispro: true,
        group1: "属性",
        group2: "组件样式"
    });
    s.push(b);
    var y = getProInfoByObj("input", {
        ds_id: "ds_showCondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示条件",
        ds_placeholder: "推送参数名.A=='a'||推送参数名.A=='b'",
        ds_input: "",
        ds_name: "ds_showCondition",
        ds_ispro: true,
        group1: "显示设置",
        group2: ""
    });
    s.push(y);
    var v = getProInfoByObj("jseditor", {
        ds_id: "ds_load_success",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "加载完成事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",
        ds_prepend: "fn(obj,trigger){",
        ds_jseditor_change: "",
        ds_name: "ds_load_success",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    });
    s.push(v);
    if (VUECFG.proObj[VUECFG.ctrlId] && !e) {
        var I = VUECFG.proObj[VUECFG.ctrlId];
        for (var C = 0; C < s.length; C++) {
            for (var S = 0; S < I.length; S++) {
                if (s[C].info.ds_name == I[S].info.ds_name) {
                    var d = s[C].type.split("drag_")[1];
                    s[C].info["ds_" + d] = I[S].info["ds_" + d];
                    if (!$DS.util.isUndefined(I[S].info["ds_show"])) s[C].info["ds_show"] = I[S].info["ds_show"]
                }
            }
        }
    }
    VUECFG.proObj[VUECFG.ctrlId] = [];
    VUECFG.proArr = formatterCtrlProCfg(s);
    VUECFG.proObj[VUECFG.ctrlId] = s;
    $("#templetePro").click()
}

function cleanIframeSrc(e) {
    var s = $DS.getCtrlById(e.ds_pid).info;
    if (s.ds_iframe_setType === "poptree") {
        $DS.setPro(s.ds_id, "ds_iframe_src", "input", "")
    } else {
        $DS.setPro(s.ds_id, "ds_iframe_src_input", "input", "")
    }
}

function changeSetSrcType(e, s) {
    debugger;
    if (s == "input") {
        $DS.setRightProShow(e.ds_pid, {ds_iframe_src: false, ds_iframe_src_input: true})
    } else {
        $DS.setRightProShow(e.ds_pid, {ds_iframe_src: true, ds_iframe_src_input: false})
    }
}

function setIframeSrc(e) {
    var s = getPageInfo();
    if (!s) {
        return
    }
    var d = null;
    var r = [];
    if (e.ds_input) {
        d = e.ds_input.split("PAGEID=")[1].split("&")[0];
        r.push(d)
    }
    var t = {
        node_key: "GUID",
        props: {label: "NAME", children: "children"},
        filterFields: ["NAME"],
        expand_on_click_node: false,
        current_node_key: d,
        default_expanded_keys: r
    };
    $DS.openCfgTree(t, s, function (s, d) {
        if (s) {
            var r = s.GUID;
            var t = s.NAME;
            var a = VUECFG.appId;
            var i = encodeURI("../freeForm/freeFromView.jsp?PAGEID=" + r + "&PAGETITLE=" + t + "&APPID=" + a);
            e.ds_input = i;
            $DS.getCtrlById(e.ds_pid).info.ds_iframe_src = i
        }
    }, "50%", "70%", "引入本地页面")
}

function getPageInfo() {
    var e = $DS.util.getProjectName(VUECFG.appId);
    var s = e + "/sysconfig/frame/treeReportData";
    var d = YCDCommon.Ajax.syncAjax(s);
    if (d) {
        return $DS.util.children(d, "GUID", "PID", "children")
    } else {
        console.error("【 获取页面信息失败! 】");
        return
    }
}

function getSubWindow(e) {
    var s = $DS.getCtrl(e).info.ds_id;
    return $("#" + s).find("iframe")[0].contentWindow
}

function reloadIframe(e) {
    var s = $DS.getCtrlById(e).info;
    reload(s)
}

function reloadIframeByName(e) {
    var s = $DS.getCtrl(e).info;
    reload(s)
}

function reload(e) {
    debugger;
    var s = e.ds_iframe_src_input;
    var d = e.ds_iframe_src;
    e.ds_iframe_src_input = "";
    e.ds_iframe_src = "";
    e.ds_iframe_src_input = s;
    e.ds_iframe_src = d
}

function setSrcParams(e) {
    var s = [{field: "key", title: "参数名", width: .2, edit: "text"}, {
        field: "value",
        title: '参数值( 表达式: ${V."参数名","默认值"} 。例如: ${V.aaa,"300"} )',
        width: .4,
        edit: "text"
    }];
    var d = $DS.getCtrlById(e.ds_pid).info[e.ds_id];
    if (d && typeof d === "string") {
        d = JSON.parse(d)
    }
    $DS.openCfgTable(s, d, function (s, d) {
        if (typeof s !== "string") {
            s = JSON.stringify(s)
        }
        $DS.getCtrlById(e.ds_pid).info[e.ds_id] = s;
        e.ds_input = s
    }, "80%", "70%", "配置参数")
}

function changeIframeSrc(e, s) {
    let d = $DS.getCtrl(e).info;
    if (d.ds_iframe_setType == "poptree") {
        d.ds_iframe_src = s
    } else if (d.ds_iframe_setType == "input") {
        d.ds_iframe_src_input = s
    }
}

function iframeGotoOtherApp(e, s) {
    debugger;
    if (document.all.appUrl.value == "") {
        document.all.appUrl.value = `${window.location.protocol}//${window.location.host}/${s}/SSOLogin`
    }
    if (document.all.userpackage.value == "") {
        var d = YCDCommon.Ajax.syncAjax(getProjectName() + "/login/getUserTokenForSSO");
        document.all.userpackage.value = d.result
    }
    document.all.targetUrl.value = e;
    document.all.form1.action = document.all.appUrl.value;
    document.all.form1.submit()
}

function getAppArrForIframe() {
    debugger;
    var e = [{label: "无", value: ""}];
    for (var s = 0; s < VUECFG.appArr.length; s++) {
        e.push({label: VUECFG.appArr[s].NAME, value: VUECFG.appArr[s].APPID})
    }
    return e
}