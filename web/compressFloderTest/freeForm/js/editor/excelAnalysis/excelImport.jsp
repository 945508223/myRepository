<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<title>导入</title>
	<!-- bootstrap -->
	<link rel="stylesheet" href="../../../../static/bootstrap/bootstrap.css" />
	<!--layui-->
	<link rel="stylesheet" href="../../../../static/layui2.4.2/css/layui.css" />
	<!--elementui-->
	<link rel="stylesheet" href="../../../../static/vue/elementui/elementui.css" />
	<!--css-->
	<link rel="stylesheet" href="../../../css/pubcss/css/public.css"/>
	<link rel="stylesheet" href="css/excelImport.css"/>
	<!--jquery-->
	<script type="text/javascript" src="../../../../static/jquery/jquery-1.10.2.min.js"></script>
	<!--loading-->
	<link rel="stylesheet" href="../../../../static/jquery-plugin/loading/loading.css">
	<script src="../../../../static/jquery-plugin/loading/loading.js"></script>
	<!--layui-->
	<script type="text/javascript" src="../../../../static/layui2.4.2/layui.js"></script>
	<!--common-->
	<script type="text/javascript" src="../../../../static/pubjs/ycdcommon.js"></script>
	<script type="text/javascript" src="../../../../static/pubjs/common.js"></script>
	<!--vue-->
	<script type="text/javascript" src="../../../../static/vue/vue.js"></script>
	<!--elementui-->
	<script type="text/javascript" src="../../../../static/vue/elementui/elementui.js"></script>

	<!--导出EXCEL-->
	<script src="../../../../freeForm/manage/FileSaver.js-master/src/FileSaver.js"></script>
	<script src="../../../../freeForm/manage/js-xlsx-master/dist/xlsx.extendscript.js"></script>
	<script src="../../../../freeForm/manage/js-xlsx-master/dist/xlsx.full.min.js"></script>

	<!--主js-->
	<script type="text/javascript" src="js/excelImport.js"></script>
</head>
<body>
<div id="content" v-cloak class=".container ww hh">
	<div id="step1"
		 v-if="step.active===0"
		 :class="['ww','center','stepStyle']">
		<el-form ref="form"
				 :model="form"
				 :class="['formStyle']"
				 label-width="80px">
			<el-form-item label="目标表：">
				<el-select
						v-model="form.table"
						:class="['ww']"
						@change="changeFormTable"
						filterable
						placeholder="请选择">
					<el-option
							v-for="item in form.tableArr"
							:key="item.TABLE_NAME"
							:label="item.TABLE_NAMECN"
							:value="item.TABLE_NAME">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="Excel文件：">
				<el-upload
						:class="['upload-demo']"
						:action="form.action"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						:on-exceed="handleExceed"
						:before-upload="beforeAvatarUpload"
						:on-success="upLoadSuccess"
						multiple
						:limit="1"
						:file-list="form.fileList">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过1GB(如包含表头,请删除后上传)!</div>
				</el-upload>
			</el-form-item>
		</el-form>
	</div>
	<div id="step2"
		 v-if="step.active===1"
		 :class="['ww','stepStyle']">
		<div id="top" :class="['ww','around']">
			<model-ul id="excelField"
					  v-cloak
					  v-on:build-contrast="buildContrast"
					  :data="contrast.excel"
					  :title="'Excel表字段：'"
					  :type="'excelField'">
			</model-ul>
			<el-button id="contrast"
					   :class="[]"
					   @click="assContrast"
					   type="primary"
					   plain>
				添加关联
			</el-button>
			<model-ul id="tableField"
					  v-on:build-contrast="buildContrast"
					  :data="contrast.fields"
					  :title="'目标字段：'"
					  :showname="true"
					  :type="'tableField'">
			</model-ul>
		</div>
		<div id="bottom" :class="['ww']">
			<el-table ref="table"
					  :data="contrast.config"
					  border
					  :highlight-current-row="true"
					  :row-class-name="rowClassName"
					  @cell-click="cellClick"
					  @row-click="rowClick"
					  :class="['ww','hh']">
				<el-table-column
						type="index"
						width="50">
				</el-table-column>
				<el-table-column
						:header-align="'center'"
						prop="EXCELFIELD"
						label="Excel字段">
				</el-table-column>
				<el-table-column
						:header-align="'center'"
						prop="TARGETFIELD"
						label="目标表字段">
				</el-table-column>
				<el-table-column
						:header-align="'center'"
						prop="KEYFIELD"
						align="center"
						label="主键字段">
					<template slot-scope="scope" :class="['text-cc','hh']">
						<el-switch
								v-model="scope.row.KEYFIELD"
								:class="['text-cc','hh']"
								active-value="1"
								inactive-value="0">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column
						:header-align="'center'"
						prop="TRANSCODING"
						align="center"
						label="是否需要转码">
					<template slot-scope="scope" :class="['text-cc','hh']">
						<el-switch
								v-model="scope.row.TRANSCODING"
								:class="['text-cc','hh']"
								active-value="1"
								inactive-value="0">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column :header-align="'center'"
								 prop="TRANSTFIELD"
								 column-key="TRANSTFIELD"
								 label="对应码表字段名">
					<template slot-scope="scope">
						<el-select v-if="computedEdit(scope)"
								   v-model="scope.row.TRANSTFIELD"
								   :class="['hh']"
								   @visible-change="getTransOptions(scope)"
								   placeholder="请选择">
							<el-option
									v-for="item in contrastTable.transOptions"
									:key="item.FIELD_NAME"
									:label="item.FIELD_NAMECN"
									:value="item.FIELD_NAME">
							</el-option>
						</el-select>
						<span v-else>{{scope.row.TRANSTFIELD}}</span>
					</template>
				</el-table-column>
				<el-table-column :header-align="'center'"
								 prop="SAVETRANSTFIELD"
								 column-key="SAVETRANSTFIELD"
								 label="码表存储字段名">
					<template slot-scope="scope">
						<el-select v-if="computedEdit(scope)"
								   v-model="scope.row.SAVETRANSTFIELD"
								   :class="['hh']"
								   @visible-change="getTransOptions(scope)"
								   placeholder="请选择">
							<el-option
									v-for="item in contrastTable.transOptions"
									:key="item.FIELD_NAME"
									:label="item.FIELD_NAMECN"
									:value="item.FIELD_NAME">
							</el-option>
						</el-select>
						<span v-else>{{scope.row.SAVETRANSTFIELD}}</span>
					</template>
				</el-table-column>
				<el-table-column
						:header-align="'center'"
						align="center"
						label="操作">
					<template slot-scope="scope">
						<el-button type="text"
								   size="small"
								   @click="delRow(scope)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
	<div id="step3"
		 v-if="step.active==2"
		 :class="['ww','stepStyle']">
		<el-table ref="table"
				  id="extTop"
				  :data="contrast.tableExtData"
				  border
				  :highlight-current-row="true"
				  :row-class-name="extRowClassName"
				  @cell-click="extCellClick"
				  @row-click="extRowClick"
				  :class="['ww']">
			<el-table-column
					type="index"
					width="50">
			</el-table-column>
			<el-table-column
					:header-align="'center'"
					prop="TARGETFIELD"
					label="目标表字段">
			</el-table-column>
			<el-table-column
					:header-align="'center'"
					prop="TARGETFIELDCN"
					label="目标表字段中文名">
			</el-table-column>
			<el-table-column
					:header-align="'center'"
					prop="KEYFIELD"
					align="center"
					label="主键字段">
				<template slot-scope="scope" :class="['text-cc','hh']">
					<el-switch
							v-model="scope.row.KEYFIELD"
							:class="['text-cc','hh']"
							active-value="1"
							inactive-value="0">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column :header-align="'center'"
							 prop="TARGETFIELDVAL"
							 column-key="TARGETFIELDVAL"
							 label="目标表字段值">
				<template slot-scope="scope">
					<el-input v-if="extComputedEdit(scope)"
							  :class="['hh']"
							  v-model="scope.row.TARGETFIELDVAL"
							  @blur="loseInputFcous(scope)">
					</el-input>
					<span v-else>{{scope.row.TARGETFIELDVAL}}</span>
				</template>
			</el-table-column>
		</el-table>
		<div id="extBottom" :class="['ww','text-cl','text-b']">
			<el-radio v-model="contrast.type" label="1">清空,追加</el-radio>
			<el-radio v-model="contrast.type" label="2">全部追加导入</el-radio>
			<el-radio v-model="contrast.type" label="3">更新或追加导入</el-radio>
		</div>
	</div>
	<div id="step4"
		 v-if="step.active==3"
		 :class="['ww','center','stepStyle']">
		<model-grid :class="['ww','hh']"
					tablename="gridShow"
					:tablecol="tableCol"
					:tabledata="tableData">
		</model-grid>
	</div>
	<div id="bar"
		 :class="['ww','text-cr','barStyle']">
		<el-button v-for="item in step.buttonArr"
				   v-if="isShow(item.fun)"
				   size="mini"
				   @click="clickBtn(item.fun)"
				   :key="item.fun">
			{{item.text}}
		</el-button>
	</div>
</div>

<script id="model-ul" type="text/html">
	<div :class="['ww','ul-all']">
		<div :class="['ww','ul-title','text-cl']">
			{{title}}
		</div>
		<ul :class="['ww','ul-body','over-a']">
			<li v-for="(item,index) in data"
				:value="item.FIELD_NAME"
				:title="getTitle(item,showname)"
				:style="computedStyle(item.FIELD_NAME)"
				@click="clickLi(type,item.FIELD_NAME)"
				:key="index">
				<div :class="['float-l','text-p']" v-html="getTitle(item,showname)"></div>
			</li>
		</ul>
	</div>
</script>
<script id="model-grid" type="text/html">
	<div id="tablename" :class="['ww','hh']">
		<el-table :ref="tablename"
				  :data="computed_data"
				  highlight-current-row
				  border
				  :class="['ww','modelGrid']">
			<el-table-column
					type="index"
					align="center"
					width="50">
			</el-table-column>
			<el-table-column
					v-for="(item,index) in tablecol"
					:prop="item.FIELD_NAME"
					:label="item.FIELD_NAMECN"
					:align="getAlign(item)"
					sortable
					header-align="center"
					:key="index">
				<template slot-scope="scope">
					<div :style="compute_match_style(scope)">{{scope.row[item.FIELD_NAME]}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="_ADDTTYPE"
							 label="导入方式"
							 align="center"
							 width="100"
							 fixed="right"
							 sortable
							 header-align="center">
				<template slot-scope="scope">
					<div>{{scope.row._ADDTTYPE}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="CAOZUO"
							 label="操作"
							 align="center"
							 width="100"
							 fixed="right"
							 sortable
							 header-align="center">
				<template slot-scope="scope">
					<div class="addtType cursor" @click="delRowData(scope)">删除</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
				:class="['ww','modelPageer','text-cr']"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pageSize"
				:total="computed_total"
				layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
	</div>
</script>
</body>
</html>
