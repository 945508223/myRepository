<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<title>快速构建表单</title>
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
	<link rel="stylesheet" href="css/fastBuildForm.css"/>
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
	<script type="text/javascript" src="fastBuildForm.js"></script>
</head>
<body>
<div id="fastbuild" class="ww hh">
	<div id="topDiv" class="ww divHeight">
		<div id="leftDiv" class="hh float-l">
			<div id="leftTopDiv" class="ww center right topDiv">
				<el-input class="center left" v-model="globalWidth" style="padding: 1rem"></el-input>
				<el-button class="center right" type="primary" @click="setWidth">设置宽度</el-button>
				<el-button class="center right" type="primary" @click="move('top')">上移一层</el-button>
				<el-button class="center right" type="primary" @click="move('bottom')">下移一层</el-button>
				<el-button class="center right" type="primary" @click="addData">新增</el-button>
				<el-button class="center right" type="primary" @click="delData">删除</el-button>
			</div>
			<el-divider></el-divider>
			<div id="leftCenterDiv" class="ww centerDiv">
				<el-table
						:data="leftTableData"
						:class="['ww','hh']"
						border
						ref="multipleTable"
						:row-class-name="leftRowClassName"
						tooltip-effect="light"
						highlight-current-row
						@cell-click ="cellClick"
						@row-click ="clickLeftGridRow"
						@select ="selectLeftRow"
						@selection-change="selectionLeftChange">
					<el-table-column
							type="index"
							align="center"
							header-align="center"
							width="55">
					</el-table-column>
					<el-table-column v-for="(item,index) in tableColumObj.FORM"
									 v-if="item.show"
									 :prop="item.prop"
									 :label="item.label"
									 :width="item.width"
									 :column-key="item.prop"
									 show-overflow-tooltip
									 :align="item.align?item.align:'left'"
									 :formatter="stateFormat"
									 :key="index">
						<template slot-scope="scope">
							<el-input v-if="item.editor==='el-input'&&scope.column.columnKey===leftCurrColField&&(scope.row.seen||scope.$index===leftCurrRowIndex)"
									  :class="['hh']"
									  v-model="scope.row[item.prop]"
									  @blur ="loseInputFcous(scope)">
							</el-input>
							<el-switch v-if="item.editor==='el-switch'"
									   v-model="scope.row[item.prop]"
									   :class="['ww','hh','center']">
							</el-switch>
							<el-select v-if="item.editor==='el-select'&&scope.column.columnKey===leftCurrColField&&(scope.row.seen||scope.$index===leftCurrRowIndex)"
									   :class="['ww','hh']"
									   v-model="scope.row[item.prop]"
									   @visible-change="commonFunction(item.visible)"
									   @change="selectChange"
									   placeholder="请选择">
								<el-option
										v-if="(item.group)?false:true"
										v-for="option in codeJson[item.code]"
										:key="option.value"
										:label="option.label"
										:value="option.value">
								</el-option>
								<el-option-group
										v-if="(item.group)?true:false"
										v-for="option in codeJson[item.code]"
										:key="option.label"
										:label="option.label">
									<el-option
											v-for="opt in option.options"
											:key="opt.value"
											:label="opt.label"
											:value="opt.value">
									</el-option>
								</el-option-group>
							</el-select>
							<el-input-number v-if="item.editor==='el-input-number'&&scope.column.columnKey===leftCurrColField&&(scope.row.seen||scope.$index===leftCurrRowIndex)"
											 v-model="scope.row[item.prop]"
											 :min="item.min" :max="item.max"
											 controls-position="right"
											 :class="['ww','hh']">
							</el-input-number>
							<span v-else v-html="stateFormat(scope.row[item.prop],item)"></span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div id="centerDiv" class="hh float-l text-cc">
			<i id="icon" @click="rightToLeft" class="el-icon-d-arrow-left"></i>
		</div>
		<div id="rightDiv" class="hh float-l">
			<div id="rightTopDiv" class="ww center left topDiv">
				<label id="modelLabel" class="hh center text-b right">数据源：</label>
				<el-select v-model="dataSource"
						   class="center hh"
						   @change="changeRightTableData"
						   placeholder="请选择">
					<el-option
							v-for="source in codeJson.dataSource"
							:key="source.value"
							:label="source.label"
							:value="source.value">
					</el-option>
				</el-select>
			</div>
			<el-divider></el-divider>
			<div id="rightCenterDiv" class="ww centerDiv">
				<el-table
						:data="rightTableData"
						:class="['ww','hh']"
						border
						ref="sourceTable"
						:row-class-name="rightRowClassName"
						tooltip-effect="light"
						highlight-current-row
						@row-click ="clickRightGridRow"
						@select ="selectRightRow"
						@selection-change="selectionRightChange">
					<el-table-column
							type="selection"
							align="center"
							header-align="center"
							width="55">
					</el-table-column>
					<el-table-column v-for="(item,index) in tableColumObj.FIELDS"
									 v-if="item.show"
									 :prop="item.prop"
									 :label="item.label"
									 :width="item.width"
									 :align="item.align?item.align:'left'"
									 :column-key="item.prop"
									 show-overflow-tooltip
									 :key="index">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
	<el-divider></el-divider>
	<div id="bottomDiv" class="ww">
		<div id="bottomDivInner" class="hh center">
			<el-button class="center" type="primary" @click="sure">确定</el-button>
			<el-button class="center" type="primary" @click="close">取消</el-button>
		</div>
	</div>
</div>
</body>
</html>
