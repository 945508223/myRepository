<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<title>快速构建布局</title>
	<!-- bootstrap -->
	<link rel="stylesheet" href="../../static/bootstrap/bootstrap.css" />
	<!--layui-->
	<link rel="stylesheet" href="../../static/layui2.4.2/css/layui.css" />
	<!--elementui-->
	<link rel="stylesheet" href="../../static/vue/elementui/elementui.css" />
	<!--css-->
	<link rel="stylesheet" href="../css/pubcss/css/public.css"/>
	<link rel="stylesheet" href="../css/freeForm.css"/>
	<link rel="stylesheet" href="../css/extSkin_blue.css"/>
	<link rel="stylesheet" href="css/saveModelLayout.css"/>
	<!--jquery-->
	<script type="text/javascript" src="../../static/jquery/jquery-1.10.2.min.js"></script>
	<!--loading-->
	<link rel="stylesheet" href="../../static/jquery-plugin/loading/loading.css">
	<script src="../../static/jquery-plugin/loading/loading.js"></script>
	<!--layui-->
	<script type="text/javascript" src="../../static/layui2.4.2/layui.js"></script>
	<!--common-->
	<script type="text/javascript" src="../../static/pubjs/ycdcommon.js"></script>
	<script type="text/javascript" src="../../static/pubjs/common.js"></script>
	<!--vue-->
	<script type="text/javascript" src="../../static/vue/vue.js"></script>
	<!--elementui-->
	<script type="text/javascript" src="../../static/vue/elementui/elementui.js"></script>
	<!--formcommon-->
	<script type="text/javascript" src="../js/form_common.js"></script>
	<!--主js-->
	<script type="text/javascript" src="saveModelLayout.js"></script>
</head>
<body>
<div id="saveForm" class="ww hh">
	<div id="topDiv" class="ww">
		<el-form ref="form" :rules="rules" :model="formData"  label-width="12rem" :class="['formPadding']">
			<el-form-item label="模板名称：" prop="MNAME">
				<el-input v-model="formData.MNAME" placeholder="请输入模板名称"></el-input>
			</el-form-item>
			<el-form-item label="缩略图：">
				<el-input v-model="formData.MIMG"
						  placeholder="请选择缩略图"
						  readonly>
					<el-button slot="append"
							   :class="['cursor']"
							   title="请选择缩略图"
							   icon="el-icon-picture"
							   @click="choosePicture">
					</el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="描述：">
				<el-input type="textarea"
						  :autosize="{ minRows: 10}"
						  placeholder="请输入描述"
						  v-model="formData.MDESCRIPT"></el-input>
			</el-form-item>
		</el-form>
	</div>
	<el-divider></el-divider>
	<div id="bottomDiv" class="ww">
		<div id="bottomDivInner" class="ww hh center">
			<el-button class="center" type="primary" @click="sure">保存</el-button>
			<el-button class="center" type="primary" @click="close">取消</el-button>
		</div>
	</div>
</div>
</body>
</html>
