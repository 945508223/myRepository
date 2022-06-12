//通用配置表格
var key = YCDCommon.Win.getUrlParam("key");
var args = window.top[key];

//表格
var tableIns;
//格式化返回属性信息
var propvalsplit = "json";
var propValue = args.value;
if (propvalsplit != "json" && propvalsplit != "split") {
    parent.alert("当前设置参数值格式化类型不能使用此页面!");
    close_();
}
var layTableId = "layTable";
//记录表格为html的列
var htmlFieldArr = [];
//记录鼠标点击位置
var x;
var y;
//临时变量
var temporary = {
    commonTableCol: {}
};
document.onmousemove = function (e) {
    x = e.pageX;
    y = e.pageY;
}

$(document).ready(function () {


    var btns = new Array();
    btns.push({name: "确定", onclick: "save", classname: "ycd-icon-ok"});
    btns.push({name: "关闭", onclick: "pageClose", classname: "ycd-icon-cancel"});
    YCDComponents.toolbar.formToolbar("main1", btns);
    //layui 模块化引用
    layui.use(['jquery', 'table', 'layer', 'laydate', 'util'], function () {
        var $ = layui.$,
            table = layui.table,
            layUtil = layui.util,
            laydate = layui.laydate;
        form = layui.form;
        layer = layui.layer;

        var tbWidth = $("#left_Table").width();
        var data2 = [];
        var layTableId = "layTable";
        tableIns = table.render({
            elem: '#leftTable'
            , id: layTableId
            , height: "full-41"
            , title: ""
            //隐藏操作按钮
            , toolbar: args.hiddenBtn ? '' : ((propvalsplit == "json") ? '#jsonToolbar' : '#splitToolbar')//开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: ['filter']
            , data: data2 //数据接口
            , page: false //开启分页
            , limit: 999999999999999999999
            , cols: [conputedCol(tbWidth)]
            , done: function (res, curr, count) {

                showTableStyle(res, curr, count)
            }
        });


        //监听事件
        table.on('toolbar(leftTable)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id);
            switch (obj.event) {
                case 'insertData':

                    //layer.msg('新增');
                    var oldData = table.cache[layTableId];
                    var newRow = {"_UUID": generateUUID()};
                    for (var c = 0; c < args.col.length; c++) {
                        if (args.col[c].event && (args.col[c].event).indexOf("date") !== -1) {
                            if (args.col[c].event == "date_datetime") {
                                newRow[args.col[c].field] = parent.formateDate2String(new Date(), "yyyy-MM-dd HH:mm:ss")
                            } else {
                                newRow[args.col[c].field] = parent.formateDate2String(new Date(), "yyyy-MM-dd")
                            }

                        } else {
                            newRow[args.col[c].field] = (args.col[c].defaultval ?? '') == '' ? "" : args.col[c].defaultval;
                        }
                    }
                    oldData.push(newRow);
                    tableIns.reload({
                        data: oldData
                    });

                    renderCtrl();
                    break;
                case 'delData':
                    //layer.msg('删除');
                    var oldData = table.cache[layTableId];
                    var data = checkStatus.data;
                    outer:
                        for (var i = oldData.length - 1, row; i >= 0; i--) {
                            for (j = 0; j < data.length; j++) {
                                if (oldData[i]._UUID == data[j]._UUID) {
                                    oldData.splice(i, 1);    //删除一项
                                    continue outer;
                                }
                            }
                        }
                    tableIns.reload({
                        data: oldData
                    });
                    renderCtrl();

                    break;
                case 'toTop':

                    //layer.msg('删除');
                    var oldData = table.cache[layTableId];
                    var data = checkStatus.data;
                    if (data.length > 1) {
                        alert("只能选择一项!");
                        return false;
                    }
                    if (data.length == 0) {
                        alert("请选择一项!");
                        return false;
                    }
                    var flag = true;
                    for (var i = 0; i < oldData.length; i++) {
                        if (oldData[i]._UUID == data[0]._UUID) {
                            if (oldData[i - 1] && flag) {
                                var dt = null;
                                dt = oldData[i];
                                oldData[i] = oldData[i - 1];
                                oldData[i - 1] = dt;
                                flag = false;
                            }

                        }
                    }
                    tableIns.reload({
                        data: oldData
                    });
                    renderCtrl();
                    break;
                case 'toBottom':
                    //layer.msg('删除');
                    var oldData = table.cache[layTableId];
                    var data = checkStatus.data;
                    if (data.length > 1) {
                        alert("只能选择一项!");
                        return false;
                    }
                    if (data.length == 0) {
                        alert("请选择一项!");
                        return false;
                    }
                    var flag = true;
                    for (var i = 0; i < oldData.length; i++) {
                        if (oldData[i]._UUID == data[0]._UUID) {
                            if (oldData[i + 1] && flag) {
                                var dt = null;
                                dt = oldData[i];
                                oldData[i] = oldData[i + 1];
                                oldData[i + 1] = dt;
                                flag = false;
                            }
                        }
                    }
                    tableIns.reload({
                        data: oldData
                    });
                    renderCtrl();
                    break;
                case 'getJson':

                    var data = getJsonData()
                    if (data || data.length == 0)
                        alert(data);
                    break;

            }

        });
        table.on('edit(leftTable)', function (obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"

            var oldData = table.cache[layTableId];
            //console.log(obj.value); //得到修改后的值
            //console.log(obj.field); //当前编辑的字段名
            //console.log(obj.data); //所在行的所有相关数据
        });
        table.on('tool(leftTable)', function (obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
            var data = obj.data;
            if (obj.event === "icon") {
                //弹出选择icon
                iconSelect.isshow = "y-show";
                iconSelect.cellObj = obj;
                iconSelect.$cell = $(this);
            }
            //通过取色器赋背景颜色
            else if (obj.event === "color") {

                $("#colorselect").css("left", x + "px")
                $("#colorselect").css("top", y + "px")

                //弹出选择颜色
                colorSelect.$children[0].color1 = $(this).find(".layui-table-cell")[0].style.backgroundColor
                colorSelect.isshow = "y-show";
                colorSelect.cellObj = obj;
                colorSelect.$cell = $(this);
            }
            //设置日期
            else if (obj.event.indexOf("date") !== -1) {

                var field = $(this).attr("data-field");
                var type = obj.event.split("_")[1] ? obj.event.split("_")[1] : "datetime";
                laydate.render({
                    elem: this.firstChild
                    , type: type
                    , show: true //直接显示
                    , closeStop: this
                    , value: obj.data[field]
                    , done: function (value, date) {
                        data[field] = value;
                        var oldData = layui.table.cache[layTableId];
                        for (var i = 0; i < oldData.length; i++) {
                            if (obj.data._UUID === oldData[i]._UUID) {
                                oldData[i][field] = value;
                                break;
                            }
                        }
                    }
                });
            } else if (obj.event === "image") {
                var _this = $(this);
                setBackgroundImage(obj, _this);
            }
            //html
            else if (obj.event === "html") {
                debugger
                var _this = $(this);
                var htmlStr = $(this).children(0).text();
                openHtmlEditor(htmlStr, function (htmlValue) {

                    var oldData = layui.table.cache[layTableId];
                    for (var i = 0; i < oldData.length; i++) {
                        if (obj.data._UUID === oldData[i]._UUID) {
                            oldData[i][_this.attr("data-field")] = htmlValue;
                            break;
                        }
                    }
                    _this.attr("data-content", htmlValue);
                    _this.children(0).text(htmlValue);
                });
            }
            //通用表格
            else if (obj.event === 'commonTable') {
                debugger
                var _this = $(this);
                var value = $(this).children(0).text() ? JSON.parse($(this).children(0).text()) : [];
                var field = $(this).attr("data-field");
                openCommonTable(field, value, function (newValue) {
                    debugger
                    var oldData = layui.table.cache[layTableId];
                    for (var i = 0; i < oldData.length; i++) {
                        if (obj.data._UUID === oldData[i]._UUID) {
                            oldData[i][_this.attr("data-field")] = newValue;
                            break;
                        }
                    }
                    _this.attr("data-content", newValue);
                    _this.children(0).text(newValue);
                });
            }
        });

        form.on('switch', function (data) {

            //开关是否开启，true或者false
            if (args.switchChange) {
                args.switchChange(window, data.elem, data.value);
            }
            var oldData = table.cache[layTableId];
            var field = $(data.elem).attr("name");
            var uuid = $(data.elem).attr("uuid");
            var checked = data.elem.checked;
            for (var i = 0; i < oldData.length; i++) {
                if (oldData[i]._UUID == uuid) {
                    oldData[i][field] = checked;
                }
            }
            $(data.elem).attr("value", checked);
            form.render();
        });
        form.on('select', function (data) {

            if (args.selectChange) {
                args.selectChange(window, data.elem, data.value, "change");
            }
            var val = data.value;
            var oldData = table.cache[layTableId];
            var field = $(data.elem).attr("name");
            var uuid = $(data.elem).attr("uuid");
            for (var i = 0; i < oldData.length; i++) {
                if (oldData[i]._UUID == uuid) {
                    oldData[i][field] = val;
                }
            }
            $(data.elem).attr("value", val);
            form.render();
        });

        //初始化数据
        initFiledData();
        //行点击勾选CheckBox
        tableTrClick();


    })
})

/**
 * 行点击勾选CheckBox
 */
function tableTrClick() {
    //单击行勾选checkbox事件
    $(document).on("click", "#right_Table .layui-table-body table.layui-table tbody tr", function () {
        var index = $(this).attr('data-index');
        var tableBox = $(this).parents('.layui-table-box');
        //存在固定列
        if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length > 0) {
            tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
        } else {
            tableDiv = tableBox.find(".layui-table-body.layui-table-main");
        }
        var CheckLength = tableDiv.find("tr[data-index=" + index + "]").find(
            "td div.layui-form-checked").length;

        var checkCell = tableDiv.find("tr[data-index=" + index + "]").find(
            "td div.laytable-cell-checkbox div.layui-form-checkbox I");
        if (checkCell.length > 0) {
            checkCell.click();
        }
    });

    $(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function (e) {
        e.stopPropagation();
    });

}

/**
 * 计算列信息
 * @param tbwidth
 * @returns {*[]|*}
 */

function conputedCol(tbwidth) {
    if (args.col) {
        var $col = args.col;
        var $rcol = [];
        var length = $col.length;
        $rcol.push({type: 'checkbox', width: (0.2 * tbwidth) - 12})
        for (var c = 0; c < $col.length; c++) {
            if ($col[c].hide) length--;
            $rcol.push($col[c])
        }

        for (var c = 0; c < $rcol.length; c++) {
            if ($rcol[c].hide || $rcol[c].type == "checkbox") continue;
            //处理宽度
            if ($rcol[c].width) {
                $rcol[c].width = 0.8 * $rcol[c].width * tbwidth
            } else {
                $rcol[c].width = 0.8 / length * tbwidth
            }

            //处理自定义表格列
            if ($rcol[c].codeType) {
                var code = $rcol[c].code;
                var html = "";
                //非日期
                if ($rcol[c].codeType.indexOf("date") === -1) {
                    switch ($rcol[c].codeType) {
                        case "icon":
                            $rcol[c]["event"] = "icon";
                            break;
                        case "color":
                            $rcol[c]["event"] = "color";
                            break;
                        case "html":
                            $rcol[c]["event"] = "html";
                            htmlFieldArr.push($rcol[c].field);
                            break;
                        case "image":
                            $rcol[c]["event"] = "image";
                            break;
                        case "commonTable":
                            $rcol[c]["event"] = "commonTable";
                            temporary.commonTableCol[$rcol[c].field] = deepClone($rcol[c]);
                            break;
                        case "switch":
                            if (code.length < 2) {
                                alert("码表长度至少为两项,单项格式:{name:'',value:''}");
                                return [];
                            }
                            try {
                                html = YCDCommon.temp("model_switch", {
                                    name: $rcol[c].field,
                                    val: "{{d." + $rcol[c].field + "}}",
                                    //text:code[0].name+"|"+code[1].name,
                                    checked: "{{(d." + $rcol[c].field + "=='" + code[0].value + "')?'checked':''}}",
                                    uuid: '{{d._UUID}}'
                                })
                            } catch (e) {
                                console.error(e)
                                alert("码表长度至少为两项,单项格式:{name:'',value:''}")
                                return [];
                            }
                            break;
                        case "select":
                            var option = "";
                            for (var d = 0; d < code.length; d++) {
                                option += YCDCommon.temp("model_option", {
                                    text: code[d].name,
                                    value: code[d].value,
                                    checked: "{{(d." + $rcol[c].field + "=='" + code[d].value + "')?'checked':''}}"
                                })
                            }
                            html = YCDCommon.temp("model_select", {
                                name: $rcol[c].field,
                                uuid: '{{d._UUID}}',
                                option: option,
                                value: "{{d." + $rcol[c].field + "}}",
                            })
                            break;
                    }
                } else {
                    //设置日历的类型  year month time datetime 默认datetime
                    html = YCDCommon.temp("model_date", {
                        name: $rcol[c].field,
                        value: "{{d." + $rcol[c].field + "}}",
                        uuid: '{{d._UUID}}',
                    });
                    $rcol[c]["event"] = $rcol[c].codeType;
                }

                let notInCols = ['color', 'icon', 'html', 'commonTable'];
                if (!notInCols.includes($rcol[c].codeType)) {
                    html = "<script type=\"text/html\" id='" + $rcol[c].field + "_model'>" + html + "</script>";
                    $("html").append(html);
                    $rcol[c].templet = "#" + $rcol[c].field + "_model";
                }

                delete $rcol[c].code;
                delete $rcol[c].codeType;

            }
        }
        return $rcol;
    } else {
        return [];
    }
}


//回显格式
function showTableStyle(res) {
    $("#left_Table").find("td").each(function () {
        //颜色回显
        if ($(this).attr("lay-event") === "color") {
            var dom = $(this).find(".layui-table-cell");

            var colorText = $(dom).text();
            $(dom).css("background-color", colorText);//背景单元格样式
            $(dom).css("color", colorText);
        }
        //html列添加样式 回显
        if ($(this).attr("lay-event") === "html") {
            $(this).addClass("ellipsis_o");
            let value = $(this).attr("data-content");
            $(this).attr("data-content", value);
            $(this).children(0).text(value);
        }
        $("#left_Table td .layui-form-select").each(function () {
            $(this).parent().css("overflow", "visible");
        })
    });
    //日历回显
    $(".model_date").each(function () {
        $(this).parent().text($(this).attr("value"));
    })

}


/*刷新表格*/
function renderCtrl() {
    renderSwitch();
    renderSelect();
    form.render();
}


/**
 * select渲染
 */
function renderSelect() {
    $("#left_Table select").each(function () {
        let value = $(this).attr("value");
        $(this).val(value);
        if (args.selectChange) {
            args.selectChange(window, $(this), value);
        }
    })
}


/**
 * switch渲染
 */
function renderSwitch() {
    $("#left_Table input").each(function () {
        if ($(this).attr("type") == "checkbox" && $(this).attr("uuid")) {
            if ($(this).val() === "true") {
                $(this)[0].checked = true;
            } else {
                $(this)[0].checked = false;
            }
            if (args.switchChange) {
                args.switchChange(window, $(this), $(this).attr("value"));
            }
        }
    })
}

/**
 * 初始化表格数据
 */
function initFiledData() {
    switch (propvalsplit) {
        case "json":
            var data = propValue;
            if (data && data != "") {
                layui.table.cache[layTableId] = [];
                for (let b = 0; b < data.length; b++) {
                    data[b]._UUID = generateUUID();
                    for (let col in temporary.commonTableCol) {
                        if (data[b][col] && Object.prototype.toString.call(data[b][col]) !== "[object String]") {
                            data[b][col] = JSON.stringify(data[b][col]);
                        }
                    }
                    layui.table.cache[layTableId].push(data[b])
                }
                tableIns.reload({
                    data: layui.table.cache[layTableId]
                });
                renderCtrl();
            }
            break;
        default:
            alert("请配置参数格式化类型!");
            return false;

    }
}


/**
 * 获取数据
 * @return {}
 */
function getJsonData() {

    var data = layui.table.cache[layTableId];
    switch (propvalsplit) {
        case "json":
            return JSON.stringify(data);
            break;
        default:
            alert("请配置参数格式化类型!")
            return false;
            break;
    }
}

//保存
var saveflag = true;

function save() {

    if (saveflag) {
        saveflag = false;
        var loading = new Loading();
        loading.init({
            target: document.body
        });
        loading.start();
        setTimeout(function () {
            try {

                var data = getJsonData();
                if (data || data.length == 0) {
                    args.callback(data, key);
                    close_();
                }

            } catch (e) {
                parent.alert("操作失败!");
                console.log(e);
            }

            saveflag = true;
            loading.stop();
        }, 10);
    }
}

/**
 * 图标选择
 * @param val
 */
function choseIcon(val) {

    var obj = this.$parent.cellObj;
    var $cell = this.$parent.$cell;
    var field = $cell.attr("data-field");
    $cell.find(".layui-table-cell").text(val);

    var oldData = layui.table.cache[layTableId];
    for (var i = 0; i < oldData.length; i++) {
        if (obj.data._UUID === oldData[i]._UUID) {
            oldData[i][field] = val;
            break;
        }
    }
    this.$parent.isshow = "y-hide";
}

/**
 * 颜色选择
 * @param val
 */
function chooseColor(val) {

    var obj = this.$parent.cellObj;
    var $cell = this.$parent.$cell;
    var field = $cell.attr("data-field");
    $cell.find(".layui-table-cell").text(val);

    var bgDom = $cell.find(".layui-table-cell")[0];

    bgDom.style.backgroundColor = val;
    bgDom.style.color = val;
    //同步更新表格和缓存对应的值
    obj.update({
        bgColor: val
    });

    var oldData = layui.table.cache[layTableId];
    for (var i = 0; i < oldData.length; i++) {
        if (obj.data._UUID === oldData[i]._UUID) {
            oldData[i][field] = val;
            break;
        }
    }
    this.$parent.isshow = "y-hide";
}


/**
 * 颜色选择
 * @param bgDom
 * @param obj
 */
function colpick(bgDom, obj, field) {
    $(bgDom).colpick({
        submitText: '确定',
        layout: 'rgbhex',
        onSubmit: function (hex, hsb, rgb) {
            var color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            var color_ = rgb2hex(color);
            $(this)[0].el.value = color_;

            bgDom.style.backgroundColor = color_;
            bgDom.style.color = color_;
            //同步更新表格和缓存对应的值
            obj.update({
                bgColor: color_
            });

            var oldData = layui.table.cache[layTableId];
            for (var i = 0; i < oldData.length; i++) {
                if (obj.data._UUID === oldData[i]._UUID) {
                    oldData[i][field] = color_;
                    break;
                }
            }
            $(bgDom).colpickHide();
        }
    });
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/**
 * 打开html编辑器data
 */
function openHtmlEditor(htmlStr, callback) {
    var key = Date.parse(new Date());
    window.top[key] = {
        html: htmlStr,
        callback: callback
    };
    showMyDialog("编辑HTML", "100%", "100%",
        getProjectName() + '/freeForm/js/editor/online_editor/htmlEditor.jsp?htmlStr=1&key=' + key,
        function () {
        });
}

/**
 * 打开图片库页面
 */
function setBackgroundImage(obj, doc) {
    var key = Date.parse(new Date());
    window.top[key] = {
        functionName: "getImage",
        doc: doc,
        obj, obj
    };
    showMyDialog("图片库", "95%", "95%", '../../manage/imageUpLoad/upload.html?basePath=' + parent.$DS.util.getProjectName(parent.VUECFG.appId) + '&key=' + key, function () {
    });
}

function getImage(url, doc, obj) {
    var oldData = layui.table.cache[layTableId];
    for (var i = 0; i < oldData.length; i++) {
        if (obj.data._UUID === oldData[i]._UUID) {
            oldData[i][doc.attr("data-field")] = url;
            break;
        }
    }
    doc.attr("data-content", url);
    doc.children(0).text(url);
}

//打开通用表格
function openCommonTable(field, data, callback) {
    debugger
    var key = Date.parse(new Date());
    let colCfg = temporary.commonTableCol[field];
    window.top[key] = {
        col: deepClone(colCfg.code),//表格显示列信息
        value: data,//表格显示的数据
        callback: callback
    }
    showMyDialog("", "100%", "100%",
        getProjectName() + '/freeForm/js/editor/commonTable.jsp?&key=' + key,
        function () {
        });
}

/**
 * 关闭页面
 */
function pageClose() {
    close_();
    parent.setGridTitle()
}

//===================================通用api==================================================================
//克隆
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