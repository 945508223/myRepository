/**
 * 刷新百分比
 * @param {} dom
 */
function changeDomPercent(dom){
    if(dom.id&&dom.id.indexOf("ctrl_")!= -1){
        refreshProperty(true);
    }
}
// 获取字体设置信息--wanglin
function setRichText(contenthtml,text,pname) {
    debugger
    if(!pname){
        pname = activeProperty.id.substr("pp_".length);
    }
    contenthtml=replaceHtml(contenthtml,"<strong>","<strong style='font-weight:bold;'>");
    contenthtml=replaceHtml(contenthtml,"<em>","<em style='font-style:italic;'>");

    if(text == undefined )
        text = contenthtml;
    setPropertyValue(activeElement, pname, contenthtml, text);
}

function selectRoles(contenthtml) {
    var pname = activeProperty.id.substr("pp_".length);
    setPropertyValue(activeElement, pname, contenthtml, contenthtml.split(";")[0]);
}


//初始化box属性
function setDefault(element) {
    var ctrlname = element.attr("ctrlname");
    var properties = YCDCommon.Ajax.syncAjax("../designer/getProperties", { "ctrlname": ctrlname });
    if (properties == undefined) {
        alert("获取属性列表失败，请确认是否会话超时？");
        return;
    }

    var ctrlinfo = YCDCommon.Ajax.syncAjax("../designer/getComponentInfo", { "ctrlname": ctrlname });
    for (var i = 0; i < properties.length; i++) {
        var p = properties[i];
        element.attr(p.PNAME, p.DEFAULTVAL||"");
        if (p.PTYPE == "SYSDEF") {
            //系统属性
            if (p.ISSTYLE == "1"&&p.MAPPROPERTY) {
                //样式属性:根据缺省值初始化样式
                element.css(p.MAPPROPERTY, p.DEFAULTVAL);
            } else {
                //普通属性
                if (p.MAPPROPERTY == "innerHTML") {
                    element.html("<div style='width:100%;height:100%;'>"+p.DEFAULTVAL+"</div>");
                    //element.attr('onclick','dateChoose()');
                } else {
                    //目前没有使用场景
                    element.attr(p.MAPPROPERTY, p.DEFAULTVAL);
                }
            }
        }
    }
    //*********************
    //生成当前控件的dv_ctrlname
    setDvCtrlName(element);

    //如果是图，生成图
    if (ctrlinfo.CTRLTYPE == "echarts") {
        if (ctrlinfo.CTRLNAME == "BAR" || ctrlinfo.CTRLNAME == "LINE" || ctrlinfo.CTRLNAME == "SCATTER"||ctrlinfo.CTRLNAME == "MIXED"||ctrlinfo.CTRLNAME == "LIQUID") {
            baseCharts.createChart(element, ctrlinfo, properties);
        } else if (ctrlinfo.CTRLNAME == "MAP") {
            map.createMap(element, ctrlinfo, properties);
        } else if (ctrlinfo.CTRLNAME == "PIE") {
            pie.createPie(element, ctrlinfo, properties);
        }else if (ctrlinfo.CTRLNAME == "TREE") {
            tree.createTree(element, ctrlinfo, properties);
        }

    } else if (ctrlinfo.CTRLTYPE == "grid") {
        //表格控件
        if (ctrlinfo.CTRLNAME == "GRID")
            grid.createGrid(element, ctrlinfo, properties);
    }
}
//resize事件
function resizevent() {
    refreshProperty();
    if (activeElement.attr("ctrltype") == "echarts") {
        var myChart = charts[activeElement.attr("id")];
        myChart.resize();
    } else if (activeElement.attr("ctrltype") == "grid") {
        var myGrid = charts[activeElement.attr("id")];
        myGrid.refresh();
    }
}

//删除选中的控件
function deleteElement() {
    if (activeElement != null && activeElement.prop("id") != "box") {
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index_) {
            delDSItemByCtrl(activeElement);
            //options
            if (options[activeElement.attr("id")] != undefined)
                delete options[activeElement.attr("id")];
            //chartLinks
            if (chartLinks[activeElement.attr("id")] != undefined)
                delete chartLinks[activeElement.attr("id")];
            //cacheChartData
            if (cacheChartData[activeElement.attr("id")] != undefined)
                delete cacheChartData[activeElement.attr("id")];
            //charts
            if (charts[activeElement.attr("id")] != undefined)
                delete charts[activeElement.attr("id")];
            activeElement.remove();
            setActiveElement($("#box"));
            layer.close(index_);
        }, function (index) {
            return;
        });
    }
}
//公共保存方法
//返回空代表成功，其他：错误信息
function pubsave() {
    $(".formitem.ui-resizable").resizable('destroy');
    setSelectionCss(null);
    debugger
    saveData["page"] = page;
    saveData["html"] = $("#box").prop("outerHTML");
    saveData["options"] = options;
    saveData["dragDatas"] = dragDatas;
    saveData["cacheResultData"] = cacheResultData;
    saveData["chartLinks"] = chartLinks;
    var result = YCDCommon.Ajax.syncAjax("../designer/savePage", { "pageid": page.id, "pagecfg": JSON.stringify(saveData) });
    if (result.isError) {
        return result.errMsg;
    } else {
        return "";
    }
}
//保存
function save() {
    var saveresult = pubsave();
    if (saveresult != "") {
        alert("保存失败！\r\n错误信息：" + saveresult);
    } else {
        alert("保存成功！");
        load();
    }
}
function load() {
    debugger
    $("#box").empty();
    $("#box").css("height","100%");
    var result = YCDCommon.Ajax.syncAjax("../designer/getPageCfg", { "pageid": page.id });
    if (result.isError) {
        alert("读取页面数据失败！\r\n错误信息：" + result.errMsg);
        return;
    }
    if (result.result == "") {
        //新建的报告
        $("#box").attr("dv_title", page.pagetitle);
        setDataSource($("#box"),page.SBTID,page.FACTID,page.CUBETYPE);
        return;
    }
    var saveData = JSON.parse(result.result);
    $("#box").prop("outerHTML",saveData["html"]);
    //由于历史报告没dataSource,此处补充完整
    if(!getDataSource($("#box"))){
        setDataSource($("#box"),page.SBTID,page.FACTID,page.CUBETYPE);
    }
    page = saveData["page"];
    options = saveData["options"];
    dragDatas = saveData["dragDatas"];
    cacheResultData=(saveData["cacheResultData"])?saveData["cacheResultData"]:{};
    chartLinks = saveData["chartLinks"]==null?{}:saveData["chartLinks"];
    //点击空白区域，取消所有选择
    $("#box").click(box.boxClick);
    //启用拖放功能
    $("#box").droppable({
        drop: boxDropEvent
    });
    //加载图控件
    for (var id in options){
        var controlType = options[id].controlType;
        if (controlType == "BAR" || controlType == "LINE" || controlType == "SCATTER"|| controlType == "MIXED"|| controlType == "LIQUID")
            baseCharts.loadData($("#" + id), null);
        else if (controlType=="GRID")
            grid.load($("#"+id),options[id]);
        else if (controlType=="PIE")
            pie.loadData($("#" + id));
        else if (controlType=="TREE")
            tree.loadData($("#" + id));
        else if (controlType=="MAP")
            map.createMap($("#" + id), null, null);
        else if (controlType=="LISTBOX")
            listbox.loadData($("#" + id));
        else if (controlType=="COMBOBOX")
            combobox.loadData($("#" + id));
    }
    //支持拖拽
    $(".formitem[ctrltype='base']").draggable({ cursor: "move", containment: "#box", scroll: false, start: function (event, ui) {
            setActiveElement($(ui.helper));
        }
    });
    $(".formitem[ctrltype!='base']").draggable({ handle: ".handler", cursor: "move", containment: "#box", scroll: false, start: function (event, ui) {
            setActiveElement($(ui.helper));
        }
    });
    //点击获得焦点
    $(".formitem").click(function (e) {
        setActiveElement($(this));
        e.stopPropagation();
    });

    setActiveElement($("#box"));
    //加载扩展js
    box.loadJs();
    //初始化容器拖拽事件
    $(".dom_holder").each(function(index,item){
        $(item).draggable({ cursor: "move", scroll: false });
        $(item).droppable({
            drop: function(event, ui){
                debugger
                currHolder=event.target;
                changeToHolder(event,ui);
            }
        });
    })
    //画布定位的位置
    var boxwidth=$("#box").width();
    var boxheight=$("#box").height();
    var htmlwidth=$("html").width();
    var htmlheight=$("html").height();
    boxX=htmlwidth-boxwidth-2;
    boxY=htmlheight-boxheight-6;
    //添加定位
    $(".formitem").each(function(index,item){
        $(item).mousemove(function(e){
            DisplayCoord(e,this.id);
        });
    })
}
/**
 * 焦点变更事件
 */
function changeselect() {
    //处理变更焦点后数据源变更
    refreshDatasource("0");
    //刷新属性列表
    refreshProperty();
}
/**
 * 处理变更焦点后数据源变更
 */
function refreshDatasource(type){
    if(type=="1"){//切换数据源变更
        var source=getDataSource(activeElement);
        source.factid=$("#cubeSelectPage").val();
        source.sbtid=$("#sbtName_page").val();
        setDataSource(activeElement,source.sbtid,source.factid,source.cubetype);
        closeWin('chooseTheme');
    }
    //变更树
    changeThemeAndFactForTree();
}

/**
 * 取属性列表
 * @param {} flag
 */
var slider;
var opacitySlider={};
function refreshProperty(flag) {
    if(activeElementId != null){//判断是否重复点击同一控件
        var id=activeElement.attr("id");
        if(activeElementId==id&&!flag){
            return;
        }else{
            activeElementId=id;
        }
    }else{
        activeElementId=activeElement.attr("id");
    }

    var ctrlname = activeElement.attr("ctrlname");
    var properties = YCDCommon.Ajax.syncAjax("../designer/getProperties", { "ctrlname": ctrlname });

    //构建属性窗口的Html
    var sb = getPropertyHtml(properties);
    $("#propertybox").html(sb.toString());
    //初始化属性窗口滑动框插件
    setPropertySlider();

    //给属性列表赋值
    for (var i = 0; i < properties.length; i++) {
        if (document.getElementById('pp_' + properties[i].PNAME)==null)
            continue;
        var p = properties[i];
        //如果是列表，初始化列表项
        if (p.LISTCODE != undefined)
            initListItems(p);
        //非系统属性
        if (p.PTYPE != "SYSDEF") {
            var pvalue = activeElement.attr(p.PNAME);
            var pShowValue = activeElement.attr(p.PNAME+"_TEXT");
            if (pvalue != undefined) {
                //直接取值给属性窗口
                document.getElementById('pp_' + properties[i].PNAME).value = pShowValue||pvalue;
            }else{
                //取缺省值
                document.getElementById('pp_' + properties[i].PNAME).value = properties[i].DEFAULTVAL||"";
            }
        } else {
            //系统属性
            if (p.ISSTYLE == "1") {
                //取样式值并设置到属性窗口
                getStyleProperty(p);
            } else {
                //普通属性
                if (p.MAPPROPERTY == "innerHTML") {
                    document.getElementById('pp_' + properties[i].PNAME).value = $.trim(activeElement.text());
                } else {
                    //目前没有使用场景
                    document.getElementById('pp_' + properties[i].PNAME).value = activeElement.attr(p.MAPPROPERTY);
                }
            }
        }
    }

    //设置属性列表折叠功能
    $('.propbox_content_group_icon').click(function(e){
        var tag=$(e.currentTarget);
        if(tag.hasClass('layui-icon-down')){
            tag.removeClass('layui-icon-down').addClass('layui-icon-right').css('color','#aaa');
        }else
            tag.removeClass('layui-icon-right').addClass('layui-icon-down').css('color','#000');
        tag.parent().parent().children('.propbox_content_group_table').toggle(200);
    });

    //初始化取色器插件
    colpick();
    //生成拖拽区域
    createDragArea(activeElement, properties);
    //重新初始化DragArea
    initDragArea(activeElement, properties);
}
/**
 * 取样式值并设置到属性窗口
 */
function getStyleProperty(pInfo) {
    var p = pInfo;
    // 样式属性:取对应的属性值
    // debugger
    var cssval = activeElement.css(p.MAPPROPERTY);
    if (cssval.indexOf("rgb(") == 0)// 如果是背景颜色
        cssval = rgb2hex(cssval);
    if (cssval.indexOf("rgba(") == 0)// 如果是背景颜色
        cssval = hexify(cssval)
    if (p.MAPPROPERTY == 'background-image') {
        if (cssval == "none") {
            cssval = (p.DEFAULTVAL) ? p.DEFAULTVAL : "";
        }
    } else if (p.MAPPROPERTY == 'opacity') {
        cssval = activeElement.css('background-color');
        if (cssval.indexOf("rgba(") == 0) {
            cssval = cssval.split(")")[0];
            cssval = cssval.split(",")[3];
        } else {
            cssval = '1';
        }
        opacitySlider['pp_' + p.PNAME].setValue(floatMul(cssval, 100));
    } else if ((p.MAPPROPERTY == 'height' || p.MAPPROPERTY == 'width'
        || p.MAPPROPERTY == 'top' || p.MAPPROPERTY == 'left')
        && p.EDITOR != "SLIDER") {
        if (cssval.indexOf("%") != -1) {
            cssval = cssval;
        } else if (cssval.indexOf("px") != -1) {
            var boxWidth = $("#box").width();
            var boxHeight = $("#box").height();
            var holderId = (activeElement.attr("holderId")) ? activeElement
                .attr("holderId") : "box";
            var holderWidth = $("#" + holderId).width();
            var holderHeight = $("#" + holderId).height();

            switch (p.MAPPROPERTY) {
                case "width" :
                    cssval = parseFloat(floatMul(floatDiv(parseFloat(cssval.split("px")[0]), holderWidth), 100)).toFixed(2)+ "%";
                    break;
                case "left" :
                    cssval = parseFloat(floatMul(floatDiv(parseFloat(cssval.split("px")[0]), holderWidth), 100)).toFixed(2)+ "%";
                    break;
                case "height" :
                    cssval = parseFloat(floatMul(floatDiv(parseFloat(cssval.split("px")[0]), holderHeight),100)).toFixed(2)+ "%";
                    break;
                case "top" :
                    cssval = parseFloat(floatMul(floatDiv(parseFloat(cssval.split("px")[0]), holderHeight),100)).toFixed(2)+ "%";
                    break;
            }
        }

        document.getElementById('pp_' + p.PNAME).value = cssval;
        activeElement.css(p.MAPPROPERTY, cssval);
    } else {
        if (p.EDITOR == "SLIDER") {
            if (cssval.indexOf("%") != -1) {
                opacitySlider['pp_' + p.PNAME].setValue(cssval.split("%")[0]);
            } else if (cssval.indexOf("px") != -1) {
                var boxWidth = $("#box").width();
                var boxHeight = $("#box").height();
                switch (p.MAPPROPERTY) {
                    case "width" :
                    case "left" :
                        cssval = parseFloat(floatMul(floatDiv(parseFloat(cssval.split("px")[0]), boxWidth),100)).toFixed(2);
                        break;
                    case "height" :
                    case "top" :
                        cssval = parseFloat(floatMul(floatDiv(parseFloat(cssval.split("px")[0]), boxHeight),100)).toFixed(2);
                        break;
                }
                opacitySlider['pp_' + p.PNAME].setValue(cssval);
            }
        }
        document.getElementById('pp_' + p.PNAME).value = cssval;
    }

}
/**
 * 初始化属性窗口滑动框插件
 */
function setPropertySlider(){
    layui.use('slider', function(){
        var $ = layui.$,slider = layui.slider;
        lay('.demo-slider').each(function(){

            opacitySlider[this.id]=layui.slider.render({
                elem: this
                ,min: 0 //最小值
                ,max: 100 //最大值
                ,setTips: function(value){ //自定义提示文本
                    return value + '%';
                }
                ,change: function(value){
                    debugger
                    setActiveProperty(this.elem);
                    changeProperty(this.elem,value);
                    //阻止冒泡
                    stopEvent(event);
                }
            });
        });
    })
}
/**
 * 构建属性窗口的Html
 * @param {} properties
 * @return {}
 */
function getPropertyHtml(properties){
    var groupList=getGroupHtmlForProperty(properties);
    var sb = new StringBuilder();
    sb.append('<div class="propbox_title propbox_title_color"><b>属性</b><img src="../images/designer/close.png" class="closeImg" style="display: block; position: absolute; z-index: 99999999; right: 8px; top: 8px; height: 12px; width: 12px !important;" onclick="showPro(\'showPro\',true)"></div>');
    sb.append('<div class="propbox_content" style="height:calc(100% - 28px);border: 1px solid #95B8E7;margin-top: 28px;" >');//<p style="height:28px;"></p>
    for(gr in groupList){
        sb.append('<div class="propbox_content_group">'
            +'<div class="propbox_content_group_title">'
            +'<i class="propbox_content_group_icon layui-icon layui-icon-down"></i>'+gr
            +'</div>'
            +'<div class="propbox_content_group_table">'
            +'<table>');
        sb.append(groupList[gr]);
        sb.append('</table>'
            +'</div>'
            +'</div>');
    }
    sb.append('</div>');
    return sb;
}
/**
 * 取各个属性分组的Html
 */
function getGroupHtmlForProperty(properties){
    //生成属性分组列表
    var groupList={};
    var ctrlname = activeElement.attr("ctrlname");
    //遍历属性
    for (var i = 0; i < properties.length; i++) {
        if (properties[i].ISSHOW != "1")
            continue;
        //属性分组
        if(!groupList.hasOwnProperty(properties[i].GROUPNAME)){//创建新分组
            groupList[properties[i].GROUPNAME]="";
        }
        //向分组中添加属性
        var td_str=new StringBuilder();
        td_str.append("<tr><td>"+ properties[i].PCNNAME + "</td><td>");
        if (properties[i].EDITOR == undefined) {
            td_str.append("<input type='input' onfocus='setActiveProperty(this)' id='pp_" + properties[i].PNAME + "' style='width:130px;' onchange='changeProperty(this)'>");
        } else if (properties[i].EDITOR == "LIST") {
            if(ctrlname=="MAP" && properties[i].PNAME=="dv_provincemap")//地图省列表框
                td_str.append("<select onfocus='setActiveProperty(this)' class='editor_" + properties[i].EDITOR + "' id='pp_" + properties[i].PNAME + "' style='width:130px;height:23px;' onchange='changeMapProvince(this)'></select>");
            else if(ctrlname=="MAP" && properties[i].PNAME=="dv_citymap")//地图市列表框
                td_str.append("<select onfocus='setActiveProperty(this)' class='editor_" + properties[i].EDITOR + "' id='pp_" + properties[i].PNAME + "' style='width:130px;height:23px;' onchange='map.changeView(this,\"city\")'><option value=\"\">--请选择--</option></select>");
            else
                td_str.append("<select onfocus='setActiveProperty(this)' class='editor_" + properties[i].EDITOR + "' id='pp_" + properties[i].PNAME + "' style='width:130px;height:23px;' onchange='changeProperty(this)'></select>");
        }else if(properties[i].EDITOR == "SLIDER"){//透明度
            td_str.append("<div id='pp_" + properties[i].PNAME + "' class='demo-slider editor_"+properties[i].EDITOR+"' style='width:95px'></div>");
        }else if(properties[i].EDITOR == "COLORMANAGE"){//颜色管理器
            td_str.append("<input type='input' readonly id='pp_" + properties[i].PNAME + "'  class='editor_" + properties[i].EDITOR + "' style='width:130px;' onchange='changeProperty(this)'>");
        }else if(properties[i].EDITOR == "PHOTOMANAGE"){//图片管理器
            td_str.append("<input type='input' readonly id='pp_" + properties[i].PNAME + "'  class='editor_" + properties[i].EDITOR + "' style='width:130px;' onchange='changeProperty(this)'>");
        }else if(properties[i].EDITOR == "JSEDITOR"){//js编辑器
            td_str.append("<input type='input' readonly id='pp_" + properties[i].PNAME + "'  class='editor_" + properties[i].EDITOR + "' style='width:130px;' >");//onchange='changeProperty(this)'
        }else if(properties[i].EDITOR == "JSPUBLIC"){//js选择器
            debugger
            td_str.append("<input type='input' readonly id='pp_" + properties[i].PNAME + "'  class='editor_" + properties[i].EDITOR + "' style='width:130px;' >");//onchange='changeProperty(this)'
        } else {
            td_str.append("<input onfocus='setActiveProperty(this)' class='editor_" + properties[i].EDITOR + "' type='input' id='pp_" + properties[i].PNAME + "' readonly style='width:130px;height:23px;'>");
        }
        td_str.append("</td></tr>");
        groupList[properties[i].GROUPNAME]+=td_str.toString();
    }
    return groupList;
}

/**
 * 打开js管理
 */
function showPublicJs(dom){

    debugger
    var domId=(dom)?dom.id:"";
    showMyDialog("JS管理", "95%", "95%", getProjectName()+'/dw/jsManage.jsp?', function(){});
}
/**
 * 打开js选择器
 */
function choosePublicJs(dom){
    debugger
    var domId=(dom)?dom.id:"";
    showMyDialog("JS选择器", "95%", "95%", getProjectName()+'/dw/selectJs.jsp?&id='+domId, function(){});
}
/**
 * js选择器回调
 * @param {} data
 * @param {} pageid
 */
function callBackManageJgText(data,domId,showData){
    setPropertyValue(activeElement, $("#"+domId)[0].id.substr(3), data, showData);
    refreshProperty(true);
}
/**
 * 打开js编辑器
 */
function showJsEditor(dom){
    debugger
    showMyDialog("JS文本编辑", "95%", "95%", getProjectName()+'/dw/dvJsEditor.jsp?id='+dom.id, function(){});
}
/**
 * js编辑器回调
 * @param {} value
 * @param {} domid
 */
function setJsValue(value,domid){
    debugger
    setPropertyValue(activeElement, $("#"+domid)[0].id.substr(3), value, (value?"【脚本】":""));
}
/**
 * 颜色管理器
 * @param {} dom
 */
function manageColor(dom){
    var args={
        sid:Date.parse(new Date()),
        id:$(dom)[0].id,
        value:$(dom).val()
    }
    window.top[args.sid]=args;
    showMyDialog("颜色管理器", "90%", "90%", getProjectName()+'/dw/colorConfig.jsp?sid='+args.sid, function(){});

}
/**
 * 颜色管理回调
 * @param {} data
 * @param {} colorId
 */
function callBackManageColor(data,colorId){
    $("#"+colorId).val(data);
    changeProperty($("#"+colorId)[0],data.split(","));
}
/**
 * 设置当前属性元素
 * @param {} sender
 */
function setActiveProperty(sender){
    activeProperty = sender;

}
/**
 * 获取当前系统名称
 * @return {}
 */
function getProjectName() {
    debugger
    var pathName = window.document.location.pathname;
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return  projectName;
}
//更改地图的默认视图
function changeMapProvince(sender){
    if(sender.value=='中国'){
        $('#pp_dv_citymap').empty().append("<option value=\"\">--请选择--</option>");
    }else{
        changeMapCity(sender.value);
    }
    map.changeView(sender,"province");
}

//更改市下拉列表
function changeMapCity(value,select){
    $.getJSON('../static/echarts/province_json/'+ provinceMap[value] +'.json', function(data){
        if(data==""){
            $('#pp_dv_citymap').empty().append("<option value=\"\">--请选择--</option>");
            return;
        }
        var prodata = [];
        for( var i=0;i<data.features.length;i++ ){
            prodata.push(data.features[i].properties.name);
        }
        var options = "<option value=\"\">--请选择--</option>";
        for (var i = 0; i < prodata.length; i++)
            options += "<option value=\""+prodata[i]+"\">"+prodata[i]+"</option>";
        $('#pp_dv_citymap').empty().append(options);
        if(typeof select =="string" && select.length>0){//选择市
            $('#pp_dv_citymap').val(select);
        }
    });
}

//列表类属性：取列表项
function initListItems(propertyinfo) {
    //debugger
    if (codeList[propertyinfo.LISTCODE] == undefined)
        codeList[propertyinfo.LISTCODE] = YCDCommon.Ajax.syncAjax("../designer/getCodes", { "listcode": propertyinfo.LISTCODE });
    var codes = codeList[propertyinfo.LISTCODE];
    $.each(codes, function (i, n) {
        $('#pp_' + propertyinfo.PNAME).append('<option value=' + n.CODEN + '>' + n.CNAME + '</option>');
    });
}
//属性变更事件
function changeProperty(sender,_value) {
    debugger
    var pname = sender.id.substr(3);
    if (pname == "dv_ctrlname") {
        if (sender.value == "") {
            alert("控件名不允许为空！");
            sender.value = activeElement.attr(pname);
        }
        if ($(".formitem[dv_ctrlname='" + sender.value + "']").length>0) {
            alert("控件名不允许重复！");
            sender.value = activeElement.attr(pname);
        }
    }
    if(!_value){
        _value=sender.value;
    }
    setPropertyValue(activeElement, pname, _value, _value);
}
/**
 * 属性列表显示隐藏
 * @param {} flag
 */
function showPro(id,value){
    debugger
    var dom=$("#"+id);
    var forId=$(dom).attr("forId");
    var flag=(value)?'0':$(dom).attr("value");
    $("#"+forId).css("display",(flag=='1')?"block":"none");
    $("#"+forId).css("top","0px");
    $("#"+forId).css("left","0px");
    $(dom).attr("value",(flag=='1')?"0":"1");

}


//滑块拖动事件
function onComplete(){

}
//设置属性值
function setPropertyValue(element, pname, pvalue, pshowvalue) {
    var ctrlname = element.attr("ctrlname");
    activeProperty.value = pshowvalue;
    var p = YCDCommon.Ajax.syncAjax("../designer/getPropertyInfo", { "ctrlname": ctrlname, "pname": pname });
    element.attr(p.PNAME, pvalue);
    element.attr(p.PNAME+"_TEXT", pshowvalue);

    //属性转换:待替换为convertPvalue(oldpvalue,datatype)
    if(pvalue.constructor === String){
        if (pvalue.toUpperCase() == "TRUE")
            pvalue = true;
        else if (pvalue.toUpperCase() == "FALSE")
            pvalue = false;
    }
    if (p.PTYPE == "SYSDEF") {//标准DOM元素属性
        //系统属性
        if (p.ISSTYLE == "1") {
            setStyleProperty(element,p,pvalue);
        } else {
            //普通属性
            if (p.MAPPROPERTY != "innerHTML") {
                element.attr(p.MAPPROPERTY, pvalue);
            }
        }
    } else if(p.PTYPE == "CTRLDEF") {//控件定义:如Echarts
        //图表控件属性:
        if (element.attr("ctrltype") == "echarts") {
            //通过属性窗口对 Echarts optoin对象 赋值
            setEchartsPropertyValue(p,pvalue)
        }
    }else if(p.PTYPE == "USERDEF"){//用户定义
        //特殊处理用户自定义属性
    }
    //触发当前控件的属性变更事件
    propertyChangeEvent(element, p, pvalue, pshowvalue)
}
function propertyChangeEvent(element, pInfo, pvalue, pshowvalue) {
    var ctrlname = element.attr("ctrlname");
    if ( ctrlname=="BAR" || ctrlname=="LINE" || ctrlname=="SCATTER"|| ctrlname=="MIXED"|| ctrlname=="LIQUID"){
        if(baseCharts.propertyChangeEvent){
            baseCharts.propertyChangeEvent(element, pInfo, pvalue, pshowvalue)
        }
    }else{
        var eFlag=true;
        try{
            eval(ctrlname.toLowerCase());
        }catch(e){
            eFlag=false;
        }
        if (eFlag&&eval(ctrlname.toLowerCase()).propertyChangeEvent)
            eval(ctrlname.toLowerCase()).propertyChangeEvent(element, pInfo, pvalue, pshowvalue);
    }
}
/**
 * 通过属性窗口对 Echarts optoin对象 赋值
 * @param {} pInfo
 * @param {} pvalue
 */
function setEchartsPropertyValue(pInfo,pvalue){
    var myChart = charts[activeElement.attr("id")];
    var option = options[activeElement.attr("id")];
    if (pInfo.MAPPROPERTY != undefined) {
        var list_mapproperty =pInfo.MAPPROPERTY.split("-");
        debugger
        setItem(option, list_mapproperty, pvalue);
    }
    myChart.setOption(option, true);
    charts[activeElement.attr("id")] = myChart;
    options[activeElement.attr("id")] = option;

}
/**
 * 根据属性的真实类型进行数据类型转换
 * @param {} oldpvalue
 * @param {} datatype
 * @return {Boolean}
 */
function convertPvalue(oldpvalue,datatype){
    if (datatype=="bool"){
        if (oldpvalue.toUpperCase() == "TRUE")
            return true;
        else if (oldpvalue.toUpperCase() == "FALSE")
            return false;
    }
}
/**
 * 处理css样式属性
 * @param {} element
 * @param {} propertyInfo
 * @param {} pvalue
 */
function setStyleProperty(element,propertyInfo,pvalue){
    var p=propertyInfo;
    //样式属性:根据缺省值初始化样式
    if(p.MAPPROPERTY=='background-image'){
        if(pvalue=="none"){
            element[0].style.background="";
            element.css('background-color', $("#pp_dv_bgcolor").val());
        }else if(pvalue=='transparent'){
            element[0].style.background="";
            element.css('background-color', 'transparent');
        }else{
            if(pvalue){
                //element[0].style.background="url("+getProjectName()+"/images/"+pvalue+") no-repeat center";
                element[0].style.background="url("+pvalue+") no-repeat center";
                element.css('background-size', '100% 100%');
            }else{
                element[0].style.background="";
            }
        }
    }else if(p.MAPPROPERTY=='opacity'){
        pvalue=floatDiv(pvalue.split("%")[0],100);
        var color=element.css("background-color");
        if (color.indexOf("rgb(") == 0||color.indexOf("rgba(") == 0){
            color=color.split(")")[0];
            color=color.split(",");
            color=color[0]+","+color[1]+","+color[2]+","+pvalue+")";
        }else if(color!=""){
            color=colorRgba (color,pvalue)
        }
        element.css('background-color', color);
    }else{
        if(p.MAPPROPERTY=='background-color'){
            element[0].style.background="";
        }
        element.css(p.MAPPROPERTY, pvalue);
    }
    //标签居中样式支持
    if(element.attr("ctrlname")=="LABEL"&&element.attr("ctrltype")=="base"&&element.css('text-align')){
        label.dealAlign(element);
    }

}

//生成控件GUID号
function getGuid() {
    var d, s = "";
    d = new Date();
    s += (d.getMonth() + 1) + "" + d.getDate() + "" + d.getYear() + "-";
    s += d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();
    return s;
}
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hexify(color) {
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
function colorRgba (str,n){
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    //十六进制颜色转换为RGB格式
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){  //例如：#eee,#fff等
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return "rgba(" + sColorChange.join(",") + ","+n+")";
    }else{
        return sColor;
    }
}
//jquery取色器插件
function colpick() {
    $('.editor_COLOR').colpick({
        submitText: '确定',
        layout: 'rgbhex',
        onSubmit: function (hex, hsb, rgb) {
            var color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            var pName = $(this)[0].el.id.substr(3);
            var color_ = rgb2hex(color);
            $(this)[0].el.value = color_;
            setPropertyValue(activeElement, pName, color_, color_);
        }
    });
}
function showmenu_icon(this_) {
    $(this_).find("i").addClass("layui-icon layui-icon-down");
}
function hidemenu_icon(this_) {
    $(this_).find("i").removeClass("layui-icon layui-icon-down");
}

function openmenu_span(this_) {
    activeDragItem = $(this_).parent().parent();

    var extinfo_ = activeDragItem.parent().parent().parent().attr("extinfo");
    var extinfo = eval("("+extinfo_+")");
    // if($("#drag_dv_dim")[0].contains(this_))
    if(extinfo.target==='DIM'){
        $("#settingWin").show();
        $("#setting_Win").hide();
    }else{
        $("#settingWin").hide();
        $("#setting_Win").show();
    }
    openCtrlAppMenu($('#dragAreaCondiMenu'), 125, 120);
    activeNcode = this_.parentElement.getAttribute("ncode");
}

//删除拖拽项操作
function deleteDragAreaCondi() {
    $('#dragAreaCondiMenu').css("visibility", "hidden");
    var itemParams = dragItemParams(activeDragItem);
    activeDragItem.remove(); //删除
    delDSItem(activeElement, itemParams); //删除拖拽项
}
function dragItemParams(m_dragitem) {
    var params = {};
    var innerDiv = m_dragitem.find("div");
    params.pname = innerDiv.attr("pname");
    params.factname = innerDiv.attr("factname");
    params.ntype = innerDiv.attr("ntype");
    params.ncode = innerDiv.attr("ncode");
    params.ntext = innerDiv.attr("title");
    params.hiertypeid = innerDiv.attr("ntype") == "DIM" ? innerDiv.attr("hiertypeid") : "-1";
    params.grouptype = innerDiv.attr("ntype") == "MEASURE" ? innerDiv.attr("grouptype") : "";
    params.id = innerDiv.attr("id");
    return params;
}
//维度或者度量的增加过滤条件
function openCondiWin() {
    var text = activeDragItem.find("span:first-child").text();
    var $div = activeDragItem.find("div");
    var ntype = $div.attr("ntype"); //拖拽项类型，DIM：维度，MEASURE ：度量
    var filterdescript = getDSItem().FILTERDESCRIPT; //过滤描述
    var bootlevel = getDSItem().BOOTLEVEL; //级次
    if (ntype == "DIM") {
        var ncode = $div.attr("ncode"); //维度的表名或者度量的字段名
        var hiertypeid = $div.attr("hiertypeid"); //维度层次类型
        var source=getDataSource(activeElement);
        showMyDialog('数据过滤(' + text + ')', 900, 565, 'condi/dataFilter.jsp?ncode=' + ncode + "&sbtid=" + source.sbtid + "&hiertypeid=" + hiertypeid + "&title=" + text + "&filter=" + getDSItem().FILTER + "&filterdescript=" + (filterdescript == null ? "" : filterdescript)+"&bootlevel="+bootlevel, function () {

        });
    } else if (ntype == "MEASURE") {

        var content = '<div id="contenDiv_">'
            + '<div style="position: relative;padding: 20px 36px;height: 167px;">'
            + '<div id="ycd_radios" style="margin:0px;" class="layui-input-block ycd_radios layui-form">'
            + '<label><input name="fw" type="radio" checked class="ycd_radios" value="all" title="范围"></label>' //<span>范围</span>
            + '<label><input name="fw" type="radio" class="ycd_radios" value="min" title="至少"></label>'
            + '<label><input name="fw" type="radio" class="ycd_radios" value="max" title="至多"></label>'
            + '</div>'
            + '<div class="u-rangeinput">'
            + '<input placeholder="输入最小值" onkeyup="onlyNum(this)">'
            + '<input placeholder="输入最大值" onkeyup="onlyNum(this)" style="margin-left: 25px;">'
            + '</div>'
            + '<hr/>'
            + '<div class="layui-input-block layui-form" style="text-align:left; margin:0px;">'
            + '<label style="margin-right:20px;"><input type="radio" value="1" name="singleOrMulti" title="单笔"></label>'
            + '<label><input type="radio" checked value="2" name="singleOrMulti" title="汇总"></label>'
            + '</div>'
            + '</div>'
            + '<script src="../static/layui2.4.2/layui.all.js"></script>'
            + '<div style="position: absolute;bottom: 11px;width: 100%;height:44px;line-height:44px;text-align:right;">'
            + '<button class="layui-btn layui-btn-sm layui-btn-primary ycd_btn_base" style="margin-top:7px;background-color:#fff;border:1px solid #95B8E7; color:#000;" onclick="confirm_fw()">确定</button>'
            + '<button class="layui-btn layui-btn-sm layui-btn-primary ycd_btn_base" style="margin:7px 25px 0 15px;" onclick="close_fw()">取消</button>'
            + '</div>'
            + '</div>';


        var options = {
            offset: '100px', //距top
            type: 1,
            title: ["数据过滤(" + text + ")", "font-size:15px;color:#fff;background:#2e62bf;background:-moz-linear-gradient(top, #73a6fe 0%, #2e62bf 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#73a6fe), color-stop(100%,#2e62bf));background:-webkit-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-o-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-ms-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:linear-gradient(to bottom, #73a6fe 0%,#2e62bf 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#73a6fe',endColorstr='#2e62bf',GradientType=0);"],
            area: ['380px', '300px'],
            skin: 'layer-ext-myskin',
            content: content
        };
        layer.config({
            extend: 'myskin/style.css'
        });
        var fwIndex = layer.open(options);
        $("#contenDiv_").attr("fwIndex", fwIndex);

        if (filterdescript != null) {
            var arr = filterdescript.split(":");
            $("input[name='fw'][value='" + arr[0] + "']").prop("checked", true); //包含或排除
            $(".u-rangeinput input:eq(0)").val(arr[1]);
            $(".u-rangeinput input:eq(1)").val(arr[2]);
            $("input[name='singleOrMulti'][value='" + arr[3] + "']").prop("checked", true); //默认汇总
            if (arr[0] == "min") {
                $(".u-rangeinput input:eq(1)").val("").prop("disabled", true);
            } else if (arr[0] == "max") {
                $(".u-rangeinput input:eq(0)").val("").prop("disabled", true);
            }
        }


        $('input[name="fw"]').bind("click", function () {
            var value = $(this).val();
            if (value == "all") {
                $(".u-rangeinput :input").val("").prop("disabled", false);
            } else if (value == "min") {
                $(".u-rangeinput input:eq(0)").prop("disabled", false);
                $(".u-rangeinput input:eq(1)").val("").prop("disabled", true);
            } else if (value == "max") {
                $(".u-rangeinput input:eq(0)").val("").prop("disabled", true);
                $(".u-rangeinput input:eq(1)").prop("disabled", false);
            }
        });
    }
}

function onlyNum(that) {
    that.value = that.value.replace(/\D/g, "");
}
function setFilter_(filter, filterdescript, bootlevel) {
    setFilter(filter, filterdescript, bootlevel);
}
function confirm_fw() {
    var fwVal = $('input[name="fw"]:checked').val();
    var minVal = $(".u-rangeinput input:eq(0)").val();
    var maxVal = $(".u-rangeinput input:eq(1)").val();
    var singleOrMulti = $('input[name="singleOrMulti"]:checked').val(); //默认汇总
    if ((fwVal == "all" || fwVal == "min") && (minVal == null || minVal.trim() == "")) {
        alert("请输入最小值"); return;
    }
    if ((fwVal == "all" || fwVal == "max") && (maxVal == null || maxVal.trim() == "")) {
        alert("请输入最大值"); return;
    }
    var mFilter = fwVal + ":" + minVal + ":" + maxVal + ":" + singleOrMulti;
    close_fw();
    setFilter(mFilter, mFilter, 1);
}
function close_fw() {
    layer.close($("#contenDiv_").attr("fwIndex"));
}

//页面预览
function preview() {
    var saveresult = pubsave();
    if (saveresult != "") {
        alert("保存失败！\r\n错误信息：" + saveresult);
        return;
    } else {
        load();
    }

    window.open("preview.jsp?pageId=" + page.id,page.id+"_view");
}

//打开组件自定义菜单,移出菜单容器后隐藏
function openCtrlAppMenu($dom, width, height) {
    $("#hideMenu").show();
    $dom.addClass("basePubMenu");
    $dom.css({"z-index":2000,"width": width + 'px', "height": height + 'px', "font-size": '13px', "position": "fixed", "left": (clientX - 10) + 'px', "top": (clientY - 10) + 'px', "visibility": "visible" });
    $dom.mouseleave(function () {
        $dom.css({ "visibility": "hidden" });
    });
    if(activeElement.attr("ctrlname")==="LIQUID"){//隐藏液体图图表联动
        $("#hideMenu").hide();
    }
}

//图标联动设置窗口
function openSetChartLinkWin() {
    showMyDialog(activeElement.attr("dv_ctrlname") + "----图表联动", 600, 450, 'condi/setChartLink.jsp?activeElementId=' + activeElement.context.id, function () {

    });
}
//设置上移下移浮层
function setzindex(step) {
    if (activeElement == null)
        return;
    var zindex = 999;
    try {
        zindex = parseInt(activeElement.css("zIndex"), 10);
    } catch (e) {
        zindex = 999;
    }
    zindex += step;
    activeElement.css("zIndex", zindex);
}

/**
 * 打开图片库页面
 */
function showImageContent(){
    showMyDialog("图片库", "95%", "95%", getProjectName()+'/dw/dialogs/imageUpLoad/upload.html?pageId='+page.id, function(){});
}
function imgUploadSucceed(json){
    debugger
}
function imgUploadFail(msg){
    debugger

}

/**
 * 解析dom
 * @param {} html
 * @return {}
 */
function parseDom(html) {
    var objE = document.createElement("div");
    objE.innerHTML = html;
    return objE.childNodes;
};
//设置活动控件
function setActiveElement(sender) {
    activeElement = sender;
    setSelectionCss(sender);
    changeselect();
}
//设置控件选中效果样式
function setSelectionCss(sender) {
    $(".handler").css("display", "none");
    $(".inactive").addClass("deactive").removeClass("inactive");
    $(".formitem.ui-resizable").resizable('destroy');
    if ((sender != null) && (sender.prop("id") != "box")) {
        sender.removeClass("deactive").addClass("inactive");
        if (sender.find(".handler").length == 0)
            createDragHandler(sender);
        sender.find(".handler").css("display", "");
        sender.resizable({
            resize: function (event, ui) {
                resizevent();
            }
        });
    }
}
//创建拖动句柄
function createDragHandler(element) {
    if (element.attr("ctrltype") == "base")
        return;
    if (element.find(".handler").length == 0) {
        //添加浮层，用于拖动
        var newElement = $("<div class='handler' style='width:100%;height:20px;background:green;left:0px;top:0px;'/>");
        var $i = $("<i class='layui-icon' title='更多操作' style='float:right;margin:1px 4px 0 0;color:#fff;font-weight:bold;cursor:pointer;' onclick='openChartMenu();'>&#xe671;</i>  ");
        newElement.append($i);
        element.append(newElement);
        newElement.css('position', 'absolute');
        newElement.css("opacity", 0.3);
    }
}
//打开图表活动对象上的菜单
function openChartMenu(){
    openCtrlAppMenu($('#chartLinkSettingMenu'),124,140);
}
function setDvCtrlName(element) {
    if(element.attr("ctrlname")==="PAGE") return;
    for (var i = 1; i < 100; i++) {
        var dv_ctrlname = element.attr("cnname") + i;
        if ($(".formitem[dv_ctrlname='" + dv_ctrlname + "']").length==0) {
            element.attr("dv_ctrlname", dv_ctrlname);
            break;
        }
    }
}

//跳转到日期选择的页面
function dateChoose(){
    showMyDialog('日期选择', 500, 500, 'condi/dateChoose.jsp', function() {

    });
}
//打开发布报告界面
function toPublishPage(){

    showMyDialog("报告发布", 600, 450, 'publishSetting.jsp?pageId='+page.id, function () {

    });
}

//打开维度项设置界面
function toDimSettingWin(){
    debugger
    var ncode = activeDragItem.find("div").attr("ncode");
    var showDimField = "",beginLevelSel = "";

    var element = activeElement;
    var itemParams = dragItemParams(activeDragItem);
    var key = element.attr("id")+"||"+itemParams.pname;
    var itemKey = itemParams.ntype+"||"+itemParams.factname+"||"+itemParams.ncode;
    if (dragDatas[key]!=undefined){
        var items = dragDatas[key];
        var item = null;
        if (items[itemKey]!=undefined){
            item = items[itemKey];
            showDimField = item.DISPLAYFIELD == undefined ?"":item.DISPLAYFIELD;
            beginLevelSel = item.BOOTLEVEL == undefined ?"":item.BOOTLEVEL;
        }
    }
    showMyDialog("维度项设置", 500, 300, 'condi/dimDragSetting.jsp?dimTableName='+ncode+"&showDimField="+showDimField+"&beginLevelSel="+beginLevelSel, function () {

    });
}
/**
 * 基础信息设置
 */
function toChartsSettingWin(){
    debugger
    showMyDialog("基础信息设置",600,500,'basicInformation.jsp?activeNcode='+activeNcode,function(){

    })
}
//维度项设置确认
function dimSettingConfirm(showDimField,beginLevelSel){
    var element = activeElement;
    var itemParams = dragItemParams(activeDragItem);
    var key = element.attr("id")+"||"+itemParams.pname;
    var itemKey = itemParams.ntype+"||"+itemParams.factname+"||"+itemParams.ncode;
    if (dragDatas[key]!=undefined){
        var items = dragDatas[key];
        var item = null;
        if (items[itemKey]!=undefined){
            item = items[itemKey];
            item.DISPLAYFIELD = showDimField;
            item.BOOTLEVEL = beginLevelSel;
            //触发拖拽数据源变更事件
            dsChangeEvent("filter",element,itemParams.pname,item);
        }
    }
}
