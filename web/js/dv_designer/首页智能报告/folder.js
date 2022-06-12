var rMenu, zTree;
var currNode = parent.currNode;
var currId = parent.currId;
$(document).ready(function () {

    var pageId = YCDCommon.Win.getUrlParam("pageId");
    buttonListener();
    loadGridData(pageId);
    if (currNode.ID == "#") {
        $("#removePort").hide();
        $("#editPort").hide();
        $("#addPort").hide();
        $("#copyPort").hide();
    }
});


function loadGridData(pageId) {
    $("#pages_grid").datagrid({
        width: "100%",
        height: "100%",
        //view : scrollview,
        url: "../meta/ds/getPageDetail.do?ID=" + pageId,//+"PAGETYPE=2",
        pageSize: 50,
        fitColumns: true,
        scrollbarSize: 0,
        //rownumbers : true,
        singleSelect: true,
        columns: [[

            {
                field: "PAGETYPE",
                title: "报告类别",
                halign: 'center',
                width: 100,
                formatter: function (value, row, index) {
                    debugger
                    var img = "<div style='width:100%;height:100%;'><img src='../images/designer/wordicon.png' title='" + "报告" + "' style='width:20px;height:20px;border:0;padding: 0 0px;margin:auto;'></img></div>";
                    return img;
                }
            },
            {field: "PAGETITLE", title: "报告名称", halign: 'center', width: 300},
            {field: "FACTNAME", title: "相关事实", halign: 'center', width: 200},
            {field: "SBTNAME", title: "所属主题", halign: 'center', width: 200},
            {field: "CUID", title: "创建人", halign: 'center', width: 200},
            {field: "CTIME", title: "更新时间", halign: 'center', width: 200},
            /*  {field:"REMARK",title:"备注",halign: 'center',width:200,formatter:function (value,row,index) {
                  value = (value==undefined)?'':value;
                  return "<div title='"+value+"' style='width:100%;height:100%;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;'>"+value+"</div>"
                  }},*/
            {
                field: "PAGEOPT", title: "操作", halign: 'center', width: 150, formatter: function (value, row, index) {
                    return "<img src='../images/designer/editor.png' title='" + "报告" + "编辑' style='width:16px;height:16px;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;' onclick='edit_newWin(" + index + ")'></img>"
                        + "<img src='../images/designer/search.png' title='" + "报告" + "预览' style='width:16px;height:16px;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;' onclick='showPage(" + index + ")'></img>"
                        + "<img src='../images/designer/shuoming.png' title='" + "报告" + "说明' style='width:16px;height:16px;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;' onclick='showRemark(" + index + ")'></img>"
                }
            }
        ]]/*,
	    onClickCell : clickCell*/
    });

}

function showRemark(index) {
    debugger
    var node = $('#pages_grid').datagrid('getRows')[index];
    var htmlContent = '<div id="reportRemark">'
        + '<div class="div_top_page">'
        + '<textarea id="remarkContent" style="color: #000; width: 100%;height: 413px;" ></textarea>'
        + '</div>'
        + '<div class="ycdpw-footer-main" style="position: absolute;bottom: 0;width: 100%;">'
        + '<div class="ycdpw-footer-content">'
        + '	<button class="ycdpw-footer-button" onclick="saveRemark()"><i style="margin-top:2px;" class="ycd-icon-ok"></i>提交</button>'
        + '	<button class="ycdpw-footer-button" onclick="closeWin(\'reportRemark\');"><i style="margin-top:2px;" class="ycd-icon-cancel"></i>取消</button>	'
        + '</div></div>'
        + '</div>';

    var options = {
        offset: '50px',
        type: 1,
        title: ["报告说明", "font-size:15px;color:#fff;background:#2e62bf;background:-moz-linear-gradient(top, #73a6fe 0%, #2e62bf 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#73a6fe), color-stop(100%,#2e62bf));background:-webkit-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-o-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-ms-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:linear-gradient(to bottom, #73a6fe 0%,#2e62bf 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#73a6fe',endColorstr='#2e62bf',GradientType=0);"],
        area: ['750px', '500px'],
        content: htmlContent,
        skin: 'layer-ext-myskin',
        anim: 4
    };
    layer.config({
        extend: 'myskin/style.css'
    });
    debugger
    var winIndex = layer.open(options);
    if (node) {
        $("#remarkContent").val(node.REMARK);
    }
    $("#reportRemark").attr("pageId", node.ID);
    $("#reportRemark").attr("winIndex", winIndex);
}

function saveRemark() {
    debugger
    var remark = $("#remarkContent").val();
    var pageId = $("#reportRemark").attr("pageId");
    if (remark && remark.length > 2000) {
        alert("说明超出最大长度2000字符!");
        return;
    }
    YCDCommon.Ajax.syncAjax("../meta/ds/saveRemark.do", {"pageId": pageId, "remark": remark});
    $("#pages_grid").datagrid("reload");
    closeWin("reportRemark");
}

function showPage(index) {
    debugger
    var node = $('#pages_grid').datagrid('getRows')[index];
    URL4 = {
        pageId: node.ID,
        pageName: node.PAGETITLE,
        sbtId: node.SBTID
    }
    postUrl((node.PAGETYPE == "1") ? "pageMain.jsp" : null, URL4, true, node.ID + "_show")
}

/**
 * 打开报告窗口
 * @param {} index
 */
function edit_newWin(index) {
    var node = $('#pages_grid').datagrid('getRows')[index];
    //window.open("dw/designer.jsp?pageId=" + node.ID);
    URL4 = {
        pageId: node.ID,
        pageName: node.PAGETITLE,
        sbtId: node.SBTID
    }
    postUrl((node.PAGETYPE == "1") ? "../dw/designer.jsp" : "../word/wordEditor.jsp", URL4, true, node.ID)
}

/**
 * 复制报告
 */
function copyPort() {
    var treeNode;
    treeNode = $("#pages_grid").datagrid("getSelected");
    if (!treeNode) {
        alert("请选择要复制的报告!");
        return false;
    }
    var htmlContent = '<div id="copyPage">'
        + '<div class="div_top_page"><table>'
        //+'	<tr><td>相关主题：</td><td><input id="sbtName_page" disabled="disabled"></input></td></tr>'
        + '	<tr><td>类型：</td><td><select id="pageType" onchange="changeType()" style="width: 70%;height: 26px;color: #000;"><option value="1">图表</option><option value="2">报告</option></select></td></tr>'
        + '	<tr><td>相关主题：</td><td><select id="sbtName_page" onchange="changeSbtName(2)" style="width: 230px;height: 26px;color: #000;"></select></td></tr>'
        + '	<tr><td>报告名称：</td><td><input id="pageName" type="text"/></td></tr>'
        + '	<tr id="mo"><td>分析模型：</td><td><select id="cubeSelectPage" style="width: 70%;height: 26px;color: #000;"></select></td></tr>'
        + '	<tr><td>关键字：</td><td><input id="pageKeyword" style="color: #000;"></input></td></tr>'
        + '	<tr id="di"><td>所属目录：</td><td><select id="directorySelectPage" style="width: 70%;height: 26px;color: #000;"></select></td></tr>'
        + '	</table></div>'
        /*	+'<div style="position: absolute;bottom: 0;width: 100%;height:40px;line-height:40px;text-align:center;background-color:#F2F2F2;">'
            +'<button class="layui-btn layui-btn-sm ycd_btn_base" onclick="savePageInfo()">确定</button>'
            +'<button class="layui-btn layui-btn-sm layui-btn-primary ycd_btn_base" onclick="parent.closeWin()">取消</button>'
            +'</div></div>';*/
        + '<div class="ycdpw-footer-main" style="position: absolute;bottom: 0;width: 100%;">'
        + '<div class="ycdpw-footer-content">'
        + '	<button class="ycdpw-footer-button" onclick="savePageInfoCopy()"><i style="margin-top:2px;" class="ycd-icon-ok"></i>确定</button>'
        + '	<button class="ycdpw-footer-button" onclick="closeWin(\'copyPage\');"><i style="margin-top:2px;" class="ycd-icon-cancel"></i>取消</button>	'
        + '</div></div>'
        + '</div>';

    var options = {
        offset: '100px',
        type: 1,
        title: [("复制报告"), "font-size:15px;color:#fff;background:#2e62bf;background:-moz-linear-gradient(top, #73a6fe 0%, #2e62bf 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#73a6fe), color-stop(100%,#2e62bf));background:-webkit-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-o-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-ms-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:linear-gradient(to bottom, #73a6fe 0%,#2e62bf 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#73a6fe',endColorstr='#2e62bf',GradientType=0);"],
        area: ['500px', '360px'],
        content: htmlContent,
        skin: 'layer-ext-myskin',
        anim: 4
    };
    layer.config({
        extend: 'myskin/style.css'
    });
    debugger
    var winIndex = layer.open(options);
    //var sbtNode = getPraentNode_sbt();
    var sbtNode = getTheme(treeNode.SBTID);
    //$("#sbtName_page").val(sbtNode.NAME).attr("title",sbtNode.NAME);
    $("#copyPage").attr("sbtid", sbtNode.ID).attr("winIndex", winIndex).attr("editType", "edit");
    queryPageByIdCopy(treeNode);
}

/**
 * 新建或修改报告
 */
function addOrUpdatePort(type) {
    debugger
    var treeNode;
    if (type == "edit") {
        treeNode = $("#pages_grid").datagrid("getSelected");
        if (!treeNode) {
            alert("请选择要修改的报告!");
            return false;
        }
    }
    var htmlContent = '<div id="addOrUpdatePage">'
        + '<div class="div_top_page"><table>'
        //+'	<tr><td>相关主题：</td><td><input id="sbtName_page" disabled="disabled"></input></td></tr>'
        + '	<tr><td>类型：</td><td><select id="pageType" onchange="changeType()" style="width: 70%;height: 26px;color: #000;"><option value="1">图表</option><option value="2">报告</option></select></td></tr>'
        + '	<tr><td>相关主题：</td><td><select id="sbtName_page" onchange="changeSbtName(1)" style="width: 70%;height: 26px;color: #000;"></select></td></tr>'
        + '	<tr><td>报告编码：</td><td><input id="pageCode" disabled="disabled" style="color: #000;"></input></td></tr>'
        + '	<tr><td>报告名称：</td><td><input id="pageName" type="text"/></td></tr>'
        + '	<tr id="mo"><td>分析模型：</td><td><select id="cubeSelectPage" style="width: 70%;height: 26px;color: #000;"></select></td></tr>'
        + '	<tr><td>关键字：</td><td><input id="pageKeyword" style="color: #000;"></input></td></tr>'
        + '	<tr><td>备注：</td><td><textarea id="remark" style="color: #000; width: 70%;height: 140px;" ></textarea></td></tr>'
        + '</table></div>'
        + '<div class="ycdpw-footer-main" style="position: absolute;bottom: 0;width: 100%;">'
        + '<div class="ycdpw-footer-content">'
        + '	<button class="ycdpw-footer-button" onclick="savePageInfo()"><i style="margin-top:2px;" class="ycd-icon-ok"></i>确定</button>'
        + '	<button class="ycdpw-footer-button" onclick="closeWin(\'addOrUpdatePage\');"><i style="margin-top:2px;" class="ycd-icon-cancel"></i>取消</button>	'
        + '</div></div>'
        + '</div>';

    var options = {
        offset: '50px',
        type: 1,
        title: [(type == "add" ? "新建报告" : "修改报告"), "font-size:15px;color:#fff;background:#2e62bf;background:-moz-linear-gradient(top, #73a6fe 0%, #2e62bf 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#73a6fe), color-stop(100%,#2e62bf));background:-webkit-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-o-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:-ms-linear-gradient(top, #73a6fe 0%,#2e62bf 100%);background:linear-gradient(to bottom, #73a6fe 0%,#2e62bf 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#73a6fe',endColorstr='#2e62bf',GradientType=0);"],
        area: ['600px', '450px'],
        content: htmlContent,
        skin: 'layer-ext-myskin',
        anim: 4
    };
    layer.config({
        extend: 'myskin/style.css'
    });
    debugger
    var winIndex = layer.open(options);
    //var sbtNode = getPraentNode_sbt();
    var sbtNode = getTheme((type == "edit") ? treeNode.SBTID : null);
    //$("#sbtName_page").val(sbtNode.NAME).attr("title",sbtNode.NAME);
    $("#addOrUpdatePage").attr("sbtid", sbtNode.SBTID).attr("winIndex", winIndex).attr("editType", type);
    if (type == "edit") {
        queryPageById(treeNode);
    }
}

var themResult = {};

function getTheme(value) {
    debugger
    themResult = {};
    var sbtNode;
    var result = YCDCommon.Ajax.syncAjax("../meta/querySbtList");
    var options = "";
    for (var i = 0; i < result.length; i++) {
        themResult[result[i].SBTID] = result[i];
        var sbt = result[i];
        if (value) {
            if (sbt.SBTID == value) sbtNode = sbt;
            options += "<option value='" + sbt.SBTID + "' " + ((sbt.SBTID == value) ? "selected" : "") + ">" + sbt.SBTNAME + "</option>";
        } else {
            if (i == 0) sbtNode = sbt;
            options += "<option value='" + sbt.SBTID + "' " + ((i == 0) ? "selected" : "") + ">" + sbt.SBTNAME + "</option>";
        }
    }
    queryCubesBysbtCopy();
    $("#sbtName_page").html("").append(options);
    /*if(value){
        $("#sbtName_page").attr("disabled",true).addClass("disabled");
    }*/
    queryCubesBysbt(sbtNode.SBTID);
    return sbtNode;
}

function changeSbtName(type) {
    debugger
    var cuNode = themResult[$("#sbtName_page")[0].value];
    if (type == 1) {//增加或修改报告时的切换主题
        $("#addOrUpdatePage").attr("sbtid", cuNode.SBTID);
    } else if (type == 2) {//复制报告
        $("#copyPage").attr("sbtid", cuNode.SBTID);
    }
    queryCubesBysbt(cuNode.SBTID);
}

function changeType() {
    var value = $("#pageType")[0].value;
    if (value == '1') {
        $("#mo").show();
    } else {
        $("#mo").hide();
    }
}


/**
 * 主题查询分析模型
 * @param sbtid
 */
function queryCubesBysbt(sbtid) {
    var result = YCDCommon.Ajax.syncAjax("../meta/queryFacts", {"sbtid": sbtid});
    var options = "";
    options += "<option value='-1'>--- 请选择分析模型 ---</option>";
    if (result.facts != null && result.facts.length > 0) {
        options += "<optgroup label='事实'>";
        for (var i = 0; i < result.facts.length; i++)
            options += "<option value='" + result.facts[i].FACTID + "' cubetype='" + result.facts[i].CUBETYPE + "'>" + result.facts[i].FACTNAME + "</option>";
        options += "</optgroup>";
    }
    if (result.cubes != null && result.cubes.length > 0) {
        options += "<optgroup label='分析模型'>";
        for (var i = 0; i < result.cubes.length; i++)
            options += "<option value='" + result.cubes[i].CUBEID + "' cubetype='" + result.cubes[i].CUBETYPE + "'>" + result.cubes[i].CUBENAME + "</option>";
        options += "</optgroup>";
    }
    //取数据集
    if (result.dataSets != null && result.dataSets.length > 0) {
        options += "<optgroup label='自定义数据集'>";
        for (var i = 0; i < result.dataSets.length; i++)
            options += "<option value='" + result.dataSets[i].GUID + "' cubetype='" + result.dataSets[i].DSTYPE + "'>" + result.dataSets[i].DSNAME + "</option>";
        options += "</optgroup>";
    }
    $("#cubeSelectPage").html("").append(options);
}

/**
 * 获取报告基本信息
 */
function queryPageById(treeNode) {
    debugger
    var result = YCDCommon.Ajax.syncAjax("../meta/queryPageInfo", {"pageId": treeNode.ID});
    $("#pageType").find("option[value='" + result.PAGETYPE + "']").prop("selected", true);
    $("#pageType").attr("disabled", true).addClass("disabled");
    $("#pageCode").val(result.ID).attr("title", result.ID);
    $("#pageName").val(result.PAGETITLE);
    $("#pageKeyword").val(result.KEYWORD);
    $("#remark").val(result.REMARK);
    if (result.PAGETYPE == '1') {
        $("#cubeSelectPage").find("option[cubetype='" + (result.CUBETYPE + "").toUpperCase() + "'][value='" + result.FACTID + "']").prop("selected", true);
    } else {
        $("#mo").hide();
    }
    return true;
}

/**
 * 主题查询分析模型 复制专用
 */
function queryCubesBysbtCopy() {
    debugger
    var options = "";
    options += "<option value='-1'>--- 请选择所属目录 ---</option>";
    var result = YCDCommon.Ajax.syncAjax(getProjectName() + "/meta/ds/treeCatDataAll.do");

    if (result != null) {
        $.each(result, function (index, item) {
            options += "<option value='" + item["ID"] + "' >" + item["NAME"] + "</option>";
        });
    }
    var pNode = parent.treeObj.getSelectedNodes()[0];
    $("#directorySelectPage").html("").append(options);
    $("#directorySelectPage").val(pNode.ID);
}

/**
 * 异步加载过滤
 * @param {} treeId
 * @param {} parentNode
 * @param {} responseData
 * @return {}
 */
function ajaxDataFilter(treeId, parentNode, responseData) {
    debugger
    var data = [];
    if (responseData.length > 0) {
        for (var i = 0; i < responseData.length; i++) {
            //if(responseData[i].isParent){
            if (responseData[i].ENDFLAG == '1') responseData[i].isParent = false;
            data.push(responseData[i]);
            //}
        }
    }
    return data;
}

/**
 * 复制报告获取报告基本信息
 */
function queryPageByIdCopy(treeNode) {
    debugger
    var result = YCDCommon.Ajax.syncAjax("../meta/queryPageInfo", {"pageId": treeNode.ID});
    $("#pageType").find("option[value='" + result.PAGETYPE + "']").prop("selected", true);
    $("#pageType").attr("disabled", true).addClass("disabled");
    /*$("#cubeSelectPage").attr("disabled",true).addClass("disabled");
    $("#pageKeyword").attr("disabled",true).addClass("disabled");*/
    $("#pageName").val(result.PAGETITLE);
    $("#pageKeyword").val(result.KEYWORD);
    $("#remark").val(result.REMARK);
    if (result.PAGETYPE == '1') {
        $("#cubeSelectPage").find("option[cubetype='" + (result.CUBETYPE + "").toUpperCase() + "'][value='" + result.FACTID + "']").prop("selected", true);
    } else {
        $("#mo").hide();
    }

    return true;
}

// 按钮监听
function buttonListener() {
    $(document).on('click', '.ns-li,.nsl-a', function (e) {
        debugger
        switch (e.currentTarget.id) {
            case 'addPort' :
                addOrUpdatePort("add");
                break;
            case 'editPort' :
                addOrUpdatePort("edit");
                break;
            case 'copyPort' :
                copyPort();
                break;
            case 'removePort' :
                deletePort();
                break;
        }
        $(this).blur();
    });
}

/**
 * 保存报告
 */
function savePageInfo() {
    var pageName = $("#pageName").val();
    if (pageName == null || pageName.trim().length == 0) {
        alert("报告名称不允许为空！");
        return;
    } else {
        if (pageName.trim().length > 100) {
            alert("报告名称超出最大长度100！");
            return;
        }
    }
    var pageType = $("#pageType").val();//'1'
    debugger
    var cubeid = (pageType == '1') ? $("#cubeSelectPage").val() : null;//相关分析模型
    if (pageType == '1' && (cubeid == null || cubeid === '-1')) {
        alert("请选择分析模型！");
        return;
    }
    // var samePageNameList = YCDCommon.Ajax.syncAjax("../meta/ds/isPageTitleRepeat",{"pageTitle":pageName});
    // if(samePageNameList != null) {
    // 	alert("报告名称重复！ ");
    // 	return;
    // }
    //分析模型类别
    var cubeType = (pageType == '1') ? $("#cubeSelectPage").find("option:selected").attr("cubetype") : null;
    var pNode = parent.treeObj.getSelectedNodes()[0];
    var node = $("#pages_grid").datagrid("getSelected");
    var sbtid = $("#addOrUpdatePage").attr("sbtid");
    var editType = $("#addOrUpdatePage").attr("editType");//add/update
    var remark = $("#remark").val();
    if (remark && remark.length > 2000) {
        alert("备注超出最大长度2000字符!");
        return;
    }
    var result = YCDCommon.Ajax.syncAjax("../meta/ds/savePageInfo", {
        "editType": editType,
        "folderId": pNode.ID,
        "pageId": (editType == 'add') ? null : ((node) ? node.ID : null),
        "pageName": pageName,
        "sbtid": sbtid,
        "cubeType": cubeType,
        "cubeid": cubeid,
        "keyword": $("#pageKeyword").val().trim(),
        "pageType": pageType,
        "remark": remark
    });
    if (result.isError) {
        alert(result.errMsg);
        return;
    }
    closeWin("addOrUpdatePage");
    //节点刷新
    $("#pages_grid").datagrid("reload");
    if (editType == "add") {
        //parent.window.location.href = "../dw/designer.jsp?pageId="+result.result;
        URL4 = {
            pageId: result.result,
            sbtId: sbtid,
            pageName: pageName
        }
        postUrl((pageType == "1") ? "../dw/designer.jsp" : "../word/wordEditor.jsp", URL4, true, result.result)
    }
}

/**
 * 复制报告保存
 */
function savePageInfoCopy() {
    var pageName = $("#pageName").val();
    if (pageName == null || pageName.trim().length == 0) {
        alert("报告名称不允许为空！");
        return;
    } else {
        if (pageName.trim().length > 100) {
            alert("报告名称超出最大长度100！");
            return;
        }
    }
    var pageType = $("#pageType").val();//'1'
    debugger
    if ($("#directorySelectPage").val() == -1 || $("#directorySelectPage").val() == null) {
        alert("请选择所属目录！");
        return;
    }
    //所属目录
    var sbtid = ($("#copyPage").attr("sbtid") != undefined) ? $("#copyPage").attr("sbtid") : $("#sbtName_page").val();
    var cubeid = (pageType == '1') ? $("#cubeSelectPage").val() : null;//相关分析模型
    var folderId = $("#directorySelectPage").val();
    var node = $("#pages_grid").datagrid("getSelected");
    var result = YCDCommon.Ajax.syncAjax("../meta/ds/savePageInfoCopy", {
        "folderId": folderId,
        "pageName": pageName,
        "fromPageId": node.ID,
        "sbtid": sbtid,
        "cubeid": cubeid
    });
    if (result.isError) {
        alert(result.errMsg);
        return;
    }
    closeWin("copyPage");
    //节点刷新
    $("#pages_grid").datagrid("reload");
    //parent.window.location.href = "../dw/designer.jsp?pageId="+result.result;
    // URL4 = {
    // 	pageId:result.result,
    // 	sbtId:sbtid,
    // 	pageName:pageName
    // }
    // postUrl((pageType=="1")?"../dw/designer.jsp":"../word/wordEditor.jsp",URL4,true,result.result)
}

function closeWin(id) {
    layer.close($("#" + id).attr("winIndex"));
}

/**
 * 删除报告
 */
function deletePort() {
    var node = $("#pages_grid").datagrid("getSelected");
    if (!node) {
        alert("请选择报告!");
        return false;
    }
    var title = "报告";
    layer.confirm('您确定要删除吗？删除报告会同时删除该报告独有的JS文件！', {icon: 3, title: "删除" + title},
        function (index_) {
            var result = YCDCommon.Ajax.syncAjax("../meta/deletePage", {"guid": node.ID});
            if (result.isError)
                alert(result.errMsg);
            else
                alert(result.result);
            layer.close(index_);
            //局部刷新
            $("#pages_grid").datagrid("reload");
        }
    );

}