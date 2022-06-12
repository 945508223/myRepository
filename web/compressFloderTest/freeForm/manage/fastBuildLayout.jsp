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
	<link rel="stylesheet" href="css/fastBuildLayout.css"/>
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
	<script type="text/javascript" src="fastBuildLayout.js"></script>
</head>
<body>
<div id="fastbuild" class="ww hh">
	<div id="topDiv" class="ww">
		<el-row v-cloak  class="ww hh over-a">
			<el-col :span="6" v-for="(item, index) in laycard" :key="item.GUID" :offset="index%3 > 0 ? 2 : 1">
				<el-card :id="item.GUID" :body-style="computed_style" :class="['card']" @click="">
					<img :src="item.MIMG" class="image" @click="clickModel(item.GUID)">
					<div class="cardTitle" @click="clickModel(item.GUID)">
						<span>{{item.MNAME}}</span>
					</div>
					<div class="cardBar" @click="clickModel(item.GUID)">
						<el-button type="text" @click="deleteModel(item.GUID)" class="button">删除</el-button>
					</div>
					<div :class="['ellipsis_t','cardDesc']" :title="item.MDESCRIPT" @click="clickModel(item.GUID)">
						<span>{{item.MDESCRIPT}}</span>
					</div>
					<div class="cardBtm" @click="clickModel(item.GUID)"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
	<el-divider></el-divider>
	<div id="bottomDiv" class="ww">
		<div id="bottomDivInner" class="ww hh center">
			<el-button class="center" type="primary" @click="sure">确定</el-button>
			<el-button class="center" type="primary" @click="close">取消</el-button>
		</div>
	</div>
</div>
</body>
</html>
