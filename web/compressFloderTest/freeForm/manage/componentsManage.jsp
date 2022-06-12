<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>控件窗口</title>

    <script type="text/javascript" src="../../static/jquery/jquery-2.0.js"></script>
    <script type="text/javascript" src="../../static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="../../static/pubjs/common.js"></script>
    <link rel="stylesheet" href="../../static/layui2.4.2/css/layui.css" media="all" />
    <script src="../../static/layui2.4.2/layui.all.js"></script>
    <!-- easyUI -->
    <script type="text/javascript" src="../../static/easyUI1.5.1/jquery.easyui.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../../static/easyUI1.5.1/themes/material/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../static/easyUI1.5.1/themes/icon.css">
    <!-- Ztree -->
    <link rel="stylesheet" href="../../static/jquery-plugin/ztree/css/zTreeStyle/default/zTreeStyle.css">
    <script type="text/javascript" src="../../static/jquery-plugin/ztree/js/jquery.ztree.all-3.5.js"></script>
    <script src="../../static/jquery-plugin/loading/loading.js"></script>
    <link rel="stylesheet" href="../../static/jquery-plugin/loading/loading.css">
    <!-- 表单通用js -->
    <script type="text/javascript" src="../js/form_common.js"></script>
    <script src="componentsManage.js"></script>
    <link rel="stylesheet" href="css/componentsManage.css">



</head>

<body onload="init()">
<div id="bDiv">
    <!-- 控件管理树形 -->
    <div id="d2">

        <div id="d2-1" class="layui-btn-group">
            <button  id="b1" title="新增" onclick="addCtrl()"    class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm">
                <i class="layui-icon">&#xe654;</i>
            </button>
            <button id="b2" title="修改" onclick="updateCtrl()" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm">
                <i class="layui-icon">&#xe642;</i>
            </button>
            <button id="b3" title="删除" onclick="deleteCtrl()" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm">
                <i class="layui-icon">&#xe640;</i>
            </button>
        </div>

        <div id="initListCtrlTreeId" class="ztree"></div>
    </div>

    <!-- 属性表格 -->
    <div id="grid-1" class='grid-panel'>
        <div id='ctrlPropertyBtnGroup'>
            <input id="b4" type="button" value="新增属性" onclick="addCtrlProperty()"    class="layui-btn layui-btn-sm  layui-btn-radius layui-btn-primary ycd_btn_base"/>
            <input id="b5" type="button" value="修改属性" onclick="updateCtrlProperty()" class="layui-btn layui-btn-sm  layui-btn-radius ycd_btn_base" style="" />
            <input id="b6" type="button" value="删除属性" onclick="deleteCtrlProperty()" class="layui-btn layui-btn-sm  layui-btn-radius layui-btn-primary ycd_btn_base"/>
        </div>
        <table id="ctrlPropertyGrid" ></table>
    </div>

</div>

<!-- </div> -->
</body>
</html>