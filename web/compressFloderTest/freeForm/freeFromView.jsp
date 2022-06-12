<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head view="true">
	<meta charset="UTF-8">
	<title>自由表单</title>
	<!-- bootstrap -->
	<link rel="stylesheet" href="../static/bootstrap/bootstrap.css" />
	<!--layui-->
	<link rel="stylesheet" href="../static/layui2.4.2/css/layui.css" />
	<!--elementui-->
	<link rel="stylesheet" href="../static/vue/elementui/elementui.css" />
	<!--css-->
	<link rel="stylesheet" href="css/pubcss/css/public.css"/>
	<link rel="stylesheet" href="css/freeForm.css"/>
	<!--jquery-->
	<script type="text/javascript" src="../static/jquery/jquery-1.10.2.min.js"></script>
	<!--loading-->
	<link rel="stylesheet" href="../static/jquery-plugin/loading/loading.css">
	<script src="../static/jquery-plugin/loading/loading.js"></script>
	<!--外部图标库-->
	<script src="../freeForm/css/icons/iconfont.js"></script>
	<link rel="stylesheet" href="../freeForm/css/icons/iconfont.css">

	<!--echarts-->
	<script defer type="text/javascript" src="echarts/5.1.0/echarts.min.js/"></script>

	<!--video-->
	<script type="text/javascript" defer src="js/editor/video/video.min.js"></script>
	<link rel="stylesheet" href="js/editor/video/video-js.min.css">

	<!--layui-->
	<script type="text/javascript" defer src="../static/layui2.4.2/layui.js"></script>
	<!--common-->
	<script type="text/javascript" src="../static/pubjs/ycdcommon.js"></script>
	<script type="text/javascript" src="../static/pubjs/common.js"></script>
	<!--vue-->
	<script type="text/javascript" defer src="../static/vue/vue.js"></script>
	<!--elementui-->
	<script type="text/javascript" defer src="../static/vue/elementui/elementui.js"></script>
	<!--注册-->
	<script type="text/javascript" defer src="js/form_register.js"></script>

	<!--formcommon-->
	<script type="text/javascript" defer src="js/json.js"></script>
	<script type="text/javascript" defer src="js/icon.js"></script>
	<script type="text/javascript" defer src="js/form_common.js"></script>
	<script type="text/javascript" defer src="js/form_xlsx.js"></script>
	<!--components-->
	<script type="text/javascript" defer src="js/components/page.js"></script>
	<!--主js-->
	<script type="text/javascript" defer src="js/form_view.js"></script>
</head>
<body>
<%--引用模板--%>
<iframe id="templeteRef" src="templete.jsp" class="y-hide"></iframe>
<%--引用图标--%>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 style="position: absolute; width: 0; height: 0" aria-hidden="true" id="__SVG_SPRITE_NODE__">
</svg>

	<div id="content" class=".container ww hh">
		<div class="row ww hh">
			<!--中间画布-->
			<div class="ww hh">
				<!--画布-->
				<div id="ds_drop" class="ww hh dropArea">
					<form id="dropArea" :class="['ww','hh','pos-r','over-a',computed_view]" onsubmit="return false;" :style="computed_style">
						<!--表单内部组件-->
						<drag_comp v-for="item in formArr"
								   :data="item"
								   :key="item.info.ds_id">
						</drag_comp>
					</form>
				</div>
			</div>
		</div>
		<%--刷新专用--%>
		<div id="templeteModel" @click="dealform()" class="y-hide"></div>
		<div id="templetePro" @click="dealPro()" class="y-hide"></div>
		<div id="templeteSource" @click="dealSource()" class="y-hide"></div>
		<div id="templetePagePro" @click="dealPagePro()" class="y-hide"></div>
		<div id="templeteDel" @click="deleteformCtrl()" class="y-hide"></div>
		<%--导出word--%>
		<div id="exportWord" class="y-hide"></div>
	</div>
	<!--父盒子-->
	<form id="form1" method="post" action="" target="hideIframe" class="y-hide">
		<input id="userpackage" name="userpackage" type="hidden">
		<input id="targetUrl" name="targetUrl" type="hidden">
		<input id="app" name="appUrl" type="hidden">
	</form>
	<iframe id="hideIframe" name="hideIframe" class="y-hide"></iframe>
</body>
</html>
