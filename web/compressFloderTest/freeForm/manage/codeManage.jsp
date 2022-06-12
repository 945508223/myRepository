<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>码表窗口</title>

<script type="text/javascript" src="../../static/jquery/jquery-2.0.js"></script>
<script language="javascript" src="../../static/pubjs/ycdcommon.js"></script>
<script language="javascript" src="../../static/pubjs/common.js"></script>
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
<link rel="stylesheet" href="css/codeManage.css">
<!-- 表单通用js -->
<script type="text/javascript" src="../js/form_common.js"></script>
<script src="codeManage.js"></script>

</head>

<body onload="init()">
		<div id="d1">
			<!-- 码表分类管理树形 -->
			<div id="d2">
				
				<div id="d3" class="layui-btn-group">
				  <button title="新增" onclick="addCodeCate()"  class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm">
				    <i class="layui-icon">&#xe654;</i>
				  </button>
				  <button title="修改" onclick="updateCodeCate()" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm">
				    <i class="layui-icon">&#xe642;</i>
				  </button>
				  <button title="删除" onclick="deleteCodeCate()" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm">
				    <i id="i_01" class="layui-icon" style="">&#xe640;</i>
				  </button>
				</div>
				
				<div id="initListCodeTreeId" class="ztree"></div>
			</div>
			
			<!-- 属性表格 -->
			<div id="d4" class='grid-panel'>
				<div id='ctrlPropertyBtnGroup'>
						<input id="b1" type="button" value="新增码表" onclick="addCode()"    class="layui-btn layui-btn-sm  layui-btn-radius layui-btn-primary ycd_btn_base"/>
						<input id="b2" type="button" value="修改码表" onclick="updateCode()" class="layui-btn layui-btn-sm  layui-btn-radius ycd_btn_base"/>
						<input id="b3" type="button" value="删除码表" onclick="deleteCode()" class="layui-btn layui-btn-sm  layui-btn-radius layui-btn-primary ycd_btn_base"/>
				</div>
				<table id="ctrlCodeGrid" ></table>
			</div>

		</div>
		
	<!-- </div> -->
</body>
</html>