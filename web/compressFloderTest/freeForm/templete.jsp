<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <title>模板页面</title></head>
<body></body>
<!--=================================    组件文本   =============================================-->
<!--按钮-->
<script id="drag-btn" class="templete" type="text/html">
    <div class="components-item" :ctrltype="btn_ctrltype">
        <div class="components-body">
            <svg data-v-19957a58="" aria-hidden="true" class="svg-icon">
                <use data-v-19957a58="" :xlink:href="btn_id"></use>
            </svg>
            {{btn_text}}
        </div>
    </div>
</script>

<!--标题-->
<script id="drag_classify" class="templete" type="text/html">
    <div class="components-title y-show">
        <svg data-v-19957a58="" aria-hidden="true" class="svg-icon">
            <use data-v-19957a58="" :xlink:href="classify_id"></use>
        </svg>
        {{classify_text}}
    </div>
</script>

<!--拖动外框-->
<script id="drag_able" class="templete" type="text/html">
    <div class="components-draggable dragArea" dragAble="true">
        <drag-btn v-for="item in dragDatas"
                  :key="item.btn_id"
                  :btn_id="item.btn_id"
                  :btn_text="item.btn_text"
                  :btn_ctrltype="item.btn_ctrltype">
        </drag-btn>
    </div>
</script>

<!--列表-->
<script id="drag_list" class="templete" type="text/html">
    <div class="components-list">
        <div v-for="item in list" :key="item.index">
            <drag_classify :classify_id="item.classify_id"
                           :classify_text="item.classify_text">
            </drag_classify>
            <drag_able :dragDatas="item.dragDatas">
            </drag_able>
        </div>
    </div>
</script>
<!--=================================    数据源文本   =============================================-->
<script id="data-source" class="templete" type="text/html">
    <div class="ww el-hh source-ground">
        <el-form-item label="数据源名称:">
            <el-input v-model="source.sourceName" class="ww" placeholder="请输入数据源名称"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型:">
            <el-select v-model="source.sourceType" class="ww" placeholder="请选择数据源类型">
                <el-option label="单数据类型" value="singleData"></el-option>
                <el-option label="多数据类型" value="allData"></el-option>
                <el-option label="层次数据类型" value="levelData"></el-option>
                <el-option label="SQL数据类型" value="sqlData"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="系统:">
            <el-select v-model="computed_appid"
                       class="ww"
                       @change="changeSourceAppId"
                       placeholder="请选择系统">
                <el-option v-for="(item,index) in appArr"
                           :key="item.APPID"
                           :label="item.NAME"
                           :value="item.APPID">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="source.sourceType!='sqlData'" label="表名:">
            <el-select v-model="source.tableName"
                       class="ww"
                       clearable
                       filterable
                       @visible-change="getSourceTables"
                       @change="getTableFields"
                       placeholder="请选择表名">
                <el-option v-for="(item,index) in source.tableInfo"
                           :key="index"
                           :label="item.TABLE_NAMECN"
                           :value="item.TABLE_NAME"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="source.sourceType!='sqlData'" label="主键:">
            <el-select v-model="source.keyField"
                       class="ww"
                       clearable
                       filterable
                       @change="setKeyField"
                       placeholder="请选择主键">
                <el-option v-for="(item,index) in source.fieldInfo"
                           :key="index"
                           :label="item.FIELD_NAMECN"
                           :value="item.FIELD_NAME"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='sqlData'" label="SQL:">
            <el-input v-model="source.sql"
                      type="textarea"
                      class="ww"
                      :autosize="{ minRows: 4}"
                      placeholder="普通过滤条件: AND GUID=\${V.URL_GUID,''}###撤销参数条件: AND=>[AND]或者OR=>[OR]###参数表达式:\${V.参数池中参数名,'缺省值'}">
            </el-input>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='sqlData'" label="字段定义:">
            <el-input v-model="source.sqlFileds" class="ww" :readonly="true" @click.native="clickTableFields"
                      placeholder="字段定义">>
            </el-input>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='allData'" label="查询字段:">
            <el-input v-model="computed_columns" class="ww" :readonly="true" @click.native="clickTableFields"
                      placeholder="请选择查询字段">>
            </el-input>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='levelData'" label="ID字段:">
            <el-select v-model="source.treeId"
                       class="ww"
                       clearable
                       filterable
                       @change=""
                       placeholder="请选择层级ID字段">
                <el-option v-for="(item,index) in source.fieldInfo"
                           :key="index"
                           :label="item.FIELD_NAMECN"
                           :value="item.FIELD_NAME"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='levelData'" label="PID字段:">
            <el-select v-model="source.treePid"
                       class="ww"
                       clearable
                       filterable
                       @change=""
                       placeholder="请选择层级PID字段">
                <el-option v-for="(item,index) in source.fieldInfo"
                           :key="index"
                           :label="item.FIELD_NAMECN"
                           :value="item.FIELD_NAME"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='levelData'" label="NAME字段:">
            <el-select v-model="source.treeName"
                       class="ww"
                       @change=""
                       clearable
                       filterable
                       placeholder="请选择层级NAME字段">
                <el-option v-for="(item,index) in source.fieldInfo"
                           :key="index"
                           :label="item.FIELD_NAMECN"
                           :value="item.FIELD_NAME"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='levelData'" label="查询字段:">
            <el-select v-model="source.treeotherCols"
                       class="ww"
                       @change=""
                       clearable
                       filterable
                       :multiple="true"
                       placeholder="请选择其他查询字段">
                <el-option v-for="(item,index) in source.fieldInfo"
                           :key="index"
                           :label="item.FIELD_NAMECN"
                           :value="item.FIELD_NAME"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item
                v-if="source.sourceType=='singleData'||source.sourceType=='levelData'||source.sourceType=='allData'"
                label="扩展字段:">
            <el-input v-model="source.customcolumns"
                      class="ww"
                      placeholder="例如:'<a style=xxx>xxx</a> as editbtn'">
            </el-input>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='levelData'" label="确认状态:">
            <el-input v-model="source.treeStatus"
                      class="ww"
                      placeholder="例如: STATUS='1'">
            </el-input>
        </el-form-item>
        <el-form-item v-if="source.sourceType=='levelData'||source.sourceType=='allData'" label="排序:">
            <el-input v-model="source.order"
                      class="ww"
                      placeholder="例如: AAA asc,BBB desc">
            </el-input>
        </el-form-item>
        <el-form-item v-if="source.sourceType!='sqlData'" label="过滤条件:">
            <el-input v-model="source.filter"
                      type="textarea"
                      class="ww"
                      :autosize="{ minRows: 4}"
                      placeholder="普通过滤条件: AND GUID=\${V.URL_GUID,''}###撤销参数条件: AND=>[AND]或者OR=>[OR]###参数表达式:\${V.参数池中参数名,'缺省值'}">
            </el-input>
        </el-form-item>
        <el-form-item class="text-cc" label-width="0">
            <el-popover v-if="source.sourceType!='sqlData'"
                        placement="left"
                        width="400"
                        trigger="click">
                <el-input
                        type="textarea"
                        :rows="20"
                        readonly
                        v-model="getFildInfo">
                </el-input>
                <el-button type="primary" slot="reference">字段信息</el-button>
            </el-popover>
            <el-button type="primary" @click="deleteSource">删除</el-button>
        </el-form-item>
    </div>
</script>
<!--======================================  控件文本  ============================================-->
<!--单行文本-->
<script id="drag_input" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="input"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerstyle"></div>
                <el-input class="hh"
                          v-model="computed_inputVal"
                          :datasource="info.ds_datasource"
                          :name="info.ds_name"
                          @change="inputChange"
                          @blur="inputBlur"
                          @focus="inputFocus"
                          @input="inputInput"
                          @clear="inputClear"
                          @keyup.enter.native="inputEnter"
                          :suffix-icon="info.ds_suffix_icon"
                          :prefix-icon="info.ds_prefix_icon"
                          :maxlength="info.ds_maxlength"
                          :clearable="info.ds_clearable"
                          :readonly="info.ds_readonly"
                          :disabled="info.ds_disabled"
                          :placeholder="info.ds_placeholder">
                    <el-button v-if="info.ds_append" @click="appendClick" slot="append">{{info.ds_append}}</el-button>
                    <el-button v-if="info.ds_prepend" @click="prependClick" slot="prepend">{{info.ds_prepend}}
                    </el-button>
                </el-input>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--多行文本-->
<script id="drag_textarea" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="textarea"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerstyle"></div>
                <el-input class="hh"
                          type="textarea"
                          v-model="computed_textareaVal"
                          :datasource="info.ds_datasource"
                          :name="info.ds_name"
                          @change="textareaChange"
                          @input="textareaInput"
                          @clear="textareaClear"
                          @blur="textareaBlur"
                          @focus="textareaFocus"
                          :maxlength="info.ds_maxlength"
                          :clearable="info.ds_clearable"
                          :readonly="info.ds_readonly"
                          :disabled="info.ds_disabled"
                          :autosize="computed_autosize"
                          :placeholder="info.ds_placeholder">
                </el-input>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--密码-->
<script id="drag_password" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="password"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-input class="hh"
                          v-model="info.ds_password"
                          :datasource="info.ds_datasource"
                          :name="info.ds_name"
                          @change="passwordChange"
                          @blur="passwordBlur"
                          @focus="passwordFocus"
                          :suffix-icon="info.ds_suffix_icon"
                          :prefix-icon="info.ds_prefix_icon"
                          :maxlength="info.ds_maxlength"
                          :clearable="info.ds_clearable"
                          :readonly="info.ds_readonly"
                          :disabled="info.ds_disabled"
                          :placeholder="info.ds_placeholder"
                          show-password>
                    <template v-if="info.ds_append" slot="append">{{info.ds_append}}</template>
                    <template v-if="info.ds_prepend" slot="prepend">{{info.ds_prepend}}</template>
                </el-input>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--计数器-->
<script id="drag_inputnumber" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="inputnumber"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerstyle"></div>
                <el-input-number
                        class="hh"
                        v-model="info.ds_inputnumber"
                        :datasource="info.ds_datasource"
                        :name="info.ds_name"
                        @change="inputnumberChange"
                        @blur="inputmnumberBlur"
                        @focus="inputmnumberFocus"
                        :min="info.ds_min"
                        :max="info.ds_max"
                        :controls-position="info.ds_controls_position"
                        :step="info.ds_step"
                        :step-strictly="info.ds_step_strictly"
                        :precision="info.ds_precision"
                        :disabled="info.ds_disabled"
                        :placeholder="'请输入' + info.ds_placeholder">
                </el-input-number>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--rich -->
<script id="drag_rich" class="templete" type="text/html">
    <div :id="info.ds_id"
         v-cloak
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="rich"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">

                <iframe class="ww hh" :rich="computed_rich" :src="computed_src" :style="computed_iframeStyle"></iframe>

                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--弹出树-->
<script id="drag_poptree" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="poptree"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}"
    >

        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-input class="hh"
                          v-model="computed_poptree"
                          :datasource="info.ds_datasource"
                          :name="info.ds_name"
                          @focus="showPoptree"
                          :maxlength="info.ds_maxlength"
                          :clearable="info.ds_clearable"
                          :readonly="info.ds_readonly"
                          :disabled="info.ds_disabled"
                          :placeholder="info.ds_placeholder">
                    <template v-if="info.ds_append" slot="append">{{info.ds_append}}</template>
                    <template v-if="info.ds_prepend" slot="prepend">{{info.ds_prepend}}</template>
                </el-input>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>

    </div>

</script>


<!--JS编辑器-->
<script id="drag_jseditor" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="jseditor"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-input class="hh"
                          v-model="info.ds_jseditor"
                          :datasource="info.ds_datasource"
                          :name="info.ds_name"
                          @change="jseditorChange"
                          @focus="showJsEditor"
                          :maxlength="info.ds_maxlength"
                          :clearable="info.ds_clearable"
                          :readonly="info.ds_readonly"
                          :disabled="info.ds_disabled"
                          :placeholder="info.ds_placeholder">
                    <template v-if="info.ds_append" slot="append">{{info.ds_append}}</template>
                    <template v-if="info.ds_prepend" slot="prepend">{{info.ds_prepend}}</template>
                </el-input>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--HTML编辑器-->
<script id="drag_htmleditor" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="htmleditor"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-input class="hh"
                          v-model="info.ds_htmleditor"
                          :datasource="info.ds_datasource"
                          :name="info.ds_name"
                          @change="htmlEditorChange"
                          @focus="showHtmlEditor"
                          :maxlength="info.ds_maxlength"
                          :clearable="info.ds_clearable"
                          :readonly="info.ds_readonly"
                          :disabled="info.ds_disabled"
                          :placeholder="info.ds_placeholder">
                    <template v-if="info.ds_append" slot="append">{{info.ds_append}}</template>
                    <template v-if="info.ds_prepend" slot="prepend">{{info.ds_prepend}}</template>
                </el-input>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--CSS编辑器-->
<script id="drag_csseditor" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="csseditor"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-input class="hh"
                          v-model="info.ds_csseditor"
                          :datasource="info.ds_datasource"
                          :name="info.ds_name"
                          @change="cssEditorChange"
                          @focus="showCssEditor"
                          :maxlength="info.ds_maxlength"
                          :clearable="info.ds_clearable"
                          :readonly="info.ds_readonly"
                          :disabled="info.ds_disabled"
                          :placeholder="info.ds_placeholder">
                    <template v-if="info.ds_append" slot="append">{{info.ds_append}}</template>
                    <template v-if="info.ds_prepend" slot="prepend">{{info.ds_prepend}}</template>
                </el-input>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--drag_select -->
<script id="drag_select" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="select"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerStyle"></div>
                <el-select v-model="info.ds_select"
                           :datasource="info.ds_datasource"
                           :name="info.ds_name"
                           @change="selectChange"
                           @visible-change="visibleChange"
                           @clear="selectClear"
                           @blur="selectBlur"
                           @focus="selectFocus"
                           @remove-tag="selectRemoveTag"
                           class="ww hh"
                           :clearable="info.ds_clearable"
                           :disabled="info.ds_disabled"
                           :filterable="info.ds_filterable"
                           :multiple="info.ds_multiple"
                           :placeholder="info.ds_placeholder"
                           :allow-create="info.ds_allow_create"
                           :ref="info.ds_id+'_selectRef'">
                    <el-option
                            v-if="(info.ds_group)?false:true"
                            v-for="item in computed_options"
                            :key="item.value"
                            :label="item.label"
                            :style="computed_optionStyle"
                            :value="item.value">
                    </el-option>

                    <el-option-group
                            v-if="(info.ds_group)?true:false"
                            v-for="group in info.ds_options"
                            :key="group.label"
                            :label="group.label">
                        <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--drag_cascader -->
<script id="drag_cascader" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="cascader"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerStyle"></div>
                <el-cascader
                        v-model="info.ds_cascader"
                        :datasource="info.ds_datasource"
                        :name="info.ds_name"
                        @change="cascaderChange"
                        @expand-change="cascaderExpandChange"
                        @blur="cascaderBlur"
                        @focus="cascaderFocus"
                        @visible-change="cascaderVisibleChange"
                        @remove-tag="cascaderRemoveTag"
                        class="ww hh"
                        :options="info.ds_options"
                        :separator="info.ds_separator"
                        :show-all-levels="info.ds_show_all_levels"
                        :clearable="info.ds_clearable"
                        :disabled="info.ds_disabled"
                        :filterable="info.ds_filterable"
                        :props="computed_props"
                        :placeholder="info.ds_placeholder"
                        :ref="info.ds_id+'_cascaderRef'">
                </el-cascader>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--drag_radio -->
<script id="drag_radio" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="radio"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh text-cr"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-radio-group v-model="info.ds_radio"
                                :datasource="info.ds_datasource"
                                :name="info.ds_name"
                                size="small"
                                class="text-cl hh"
                                @change="radioChange">
                    <el-radio-button v-if="(info.ds_radiobtn)?true:false"
                                     v-for="item in info.ds_options"
                                     :label="item.value"
                                     :border="info.ds_border"
                                     :disabled="info.ds_disabled"
                                     :key="item.value">
                        {{item.text}}
                    </el-radio-button>
                    <el-radio v-if="(info.ds_radiobtn)?false:true"
                              v-for="item in info.ds_options"
                              :label="item.value"
                              :border="info.ds_border"
                              :disabled="info.ds_disabled"
                              :style="computed_option_style"
                              :key="item.value">
                        {{item.text}}
                    </el-radio>
                </el-radio-group>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--drag_checkbox -->
<script id="drag_checkbox" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="checkbox"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content"
                 :style="{width:computed_width,marginLeft:computed_marginleft,height:'100%'}">
                <el-checkbox-group v-model="info.ds_checkbox"
                                   :datasource="info.ds_datasource"
                                   :name="info.ds_name"
                                   size="small"
                                   :min="info.ds_min"
                                   :max="info.ds_max"
                                   class="text-cl hh"
                                   @change="checkboxChange">
                    <el-checkbox-button v-if="(info.ds_checkboxbtn)?true:false"
                                        v-for="item in info.ds_options"
                                        :label="item.value"
                                        :border="info.ds_border"
                                        :disabled="info.ds_disabled"
                                        :key="item.value">
                        {{item.text}}
                    </el-checkbox-button>
                    <el-checkbox v-if="(info.ds_checkboxbtn)?false:true"
                                 v-for="item in info.ds_options"
                                 :label="item.value"
                                 :border="info.ds_border"
                                 :disabled="info.ds_disabled"
                                 :style="computed_innerStyle"
                                 :key="item.value">
                        {{item.text}}
                    </el-checkbox>
                </el-checkbox-group>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--switch -->
<script id="drag_switch" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="switch"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">

        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh text-cr"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-switch class="hh"
                           v-model="info.ds_switch"
                           :datasource="info.ds_datasource"
                           :name="info.ds_name"
                           @change="switchChange"
                           :active-value="info.ds_active_value"
                           :inactive-value="info.ds_inactive_value"
                           :active-color="info.ds_active_color"
                           :inactive-color="info.ds_inactive_color"
                           :active-text="info.ds_active_text"
                           :inactive-text="info.ds_inactive_text"
                           :disabled="info.ds_disabled">
                </el-switch>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>


<!--progress-->
<script id="drag_progress" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="progress"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item','ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh text-cr"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content ww hh "
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div class="hh over-a center" :style="{width:info.ds_innerwidth}">
                    <el-progress
                            v-if="computed_if"
                            :status="computed_sataus"
                            :type="info.ds_progress_type"
                            :percentage="computed_percentage"
                            :color="computed_color"
                            :show-text="info.ds_progress_show_text"
                            :stroke-width="info.ds_progress_stroke_width"
                            :format="progress_format"
                            :text-inside="info.ds_progress_text_inside"
                            :stroke-linecap="info.ds_progress_stroke_linecap">
                    </el-progress>
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>


<!--slider -->
<script id="drag_slider" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="slider"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-slider v-model="info.ds_slider"
                           :datasource="info.ds_datasource"
                           :name="info.ds_name"
                           @change="sliderChange"
                           @input="sliderInput"
                           class="text-cl hh"
                           :show-tooltip="info.ds_show_tooltip"
                           :format-tooltip="info.ds_format_tooltip"
                           :range="info.ds_range"
                           :vertical="info.ds_vertical"
                           :show-input="info.ds_show_input"
                           :marks="info.ds_marks"
                           :step="info.ds_step"
                           :min="info.ds_min"
                           :max="info.ds_max"
                           :show-stops="info.ds_show_stops"
                           :disabled="info.ds_disabled">
                </el-slider>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--time -->
<script id="drag_time" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="time"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerstyle"></div>
                <el-time-picker
                        class="hh"
                        v-if="info.ds_optiontype=='picker'"
                        v-model="info.ds_time"
                        :datasource="info.ds_datasource"
                        :name="info.ds_name"
                        @change="timeChange"
                        @blur="timeBlur"
                        @focus="timeFocus"
                        :arrow-control="info.ds_arrow_control"
                        :picker-options="computed_optiontype"
                        :value-format="info.ds_value_format"
                        :readonly="info.ds_readonly"
                        :disabled="info.ds_disabled"
                        :editable="info.ds_editable"
                        :clearable="info.ds_clearable"
                        :placeholder="info.ds_placeholder">
                </el-time-picker>
                <el-time-select
                        class="hh"
                        v-if="info.ds_optiontype=='select'"
                        v-model="info.ds_time"
                        :datasource="info.ds_datasource"
                        :name="info.ds_name"
                        @change="timeChange"
                        :picker-options="computed_optiontype"
                        :readonly="info.ds_readonly"
                        :disabled="info.ds_disabled"
                        :editable="info.ds_editable"
                        :clearable="info.ds_clearable"
                        :placeholder="info.ds_placeholder">
                </el-time-select>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--timerange -->
<script id="drag_timerange" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="timerange"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerstyle"></div>
                <el-time-picker
                        class="hh"
                        is-range
                        v-model="info.ds_timerange"
                        :datasource="info.ds_datasource"
                        :name="info.ds_name"
                        @change="timerangeChange"
                        @blur="timerangeBlur"
                        @focus="timerangeFocus"
                        :range-separator="info.ds_separator"
                        :start-placeholder="info.ds_startplaceholder"
                        :end-placeholder="info.ds_endplaceholder"
                        :value-format="info.ds_value_format"
                        :readonly="info.ds_readonly"
                        :disabled="info.ds_disabled"
                        :editable="info.ds_editable"
                        :clearable="info.ds_clearable"
                        :placeholder="info.ds_placeholder">
                </el-time-picker>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--date -->
<script id="drag_date" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="date"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerstyle"></div>
                <el-date-picker
                        class="hh"
                        v-model="info.ds_date"
                        :datasource="info.ds_datasource"
                        :name="info.ds_name"
                        @change="dateChange"
                        @blur="dateBlur"
                        @focus="dateFocus"
                        :type="info.ds_datatype"
                        :format="info.ds_format"
                        :value-format="info.ds_value_format"
                        :picker-options="computed_option"
                        :readonly="info.ds_readonly"
                        :disabled="info.ds_disabled"
                        :editable="info.ds_editable"
                        :clearable="info.ds_clearable"
                        :placeholder="info.ds_placeholder">
                </el-date-picker>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--daterange -->
<script id="drag_daterange" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="daterange"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <div :style="computed_innerstyle"></div>
                <el-date-picker
                        class="hh"
                        v-model="info.ds_daterange"
                        :datasource="info.ds_datasource"
                        :name="info.ds_name"
                        @change="daterangeChange"
                        @blur="daterangeBlur"
                        @focus="daterangeFocus"
                        :type="info.ds_daterangetype"
                        :unlink-panels="info.ds_unlink_panels"
                        :format="info.ds_format"
                        :value-format="info.ds_value_format"
                        :picker-options="computed_option"
                        :range-separator="info.ds_separator"
                        :start-placeholder="info.ds_startplaceholder"
                        :end-placeholder="info.ds_endplaceholder"
                        :default-time="computed_defaultTime"
                        :readonly="info.ds_readonly"
                        :disabled="info.ds_disabled"
                        :editable="info.ds_editable"
                        :clearable="info.ds_clearable">
                </el-date-picker>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--rate -->
<script id="drag_rate" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="rate"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh text-cr"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-rate v-model="info.ds_rate"
                         :datasource="info.ds_datasource"
                         :name="info.ds_name"
                         @change="rateChange"
                         class="text-cl hh"
                         :max="info.ds_max"
                         :allow-half="info.ds_allow_half"
                         :low-threshold="info.ds_low_threshold"
                         :high-threshold="info.ds_high_threshold"
                         :colors="computed_colors"
                         :void-color="info.ds_void_color"
                         :disabled-void-color="info.ds_disabled_void_color"
                         :icon-classes="computed_classes"
                         :void-icon-class="info.ds_void_icon_class"
                         :disabled-void-icon-class="info.ds_disabled_void_icon_class"
                         :show-text="info.ds_show_text"
                         :show-score="info.ds_show_score"
                         :text-color="info.ds_text_color"
                         :texts="computed_texts"
                         :score-template="info.ds_score_template"
                         :disabled="info.ds_disabled">
                </el-rate>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--color -->
<script id="drag_color" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="color"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh']" :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh text-cr"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-color-picker v-model="info.ds_color"
                                 :datasource="info.ds_datasource"
                                 :name="info.ds_name"
                                 @change="colorChange"
                                 class="text-cl hh"
                                 :show-alpha="info.ds_show_alpha"
                                 :predefine="predefineColors"
                                 :color-format="info.ds_color_format"
                                 :size="info.ds_size"
                                 :disabled="info.ds_disabled">
                </el-color-picker>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--upload -->
<script id="drag_upload" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="upload"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh','center']"
             :style="computed_outerstyle">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh text-cr"
                   :title="computed_title"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh left"
                 :style="{width:computed_width,marginLeft:computed_marginleft}">
                <el-upload class="upload-demo center"
                           :action="computed_action"
                           :headers="info.ds_header"
                           :datasource="info.ds_datasource"
                           :name="info.ds_name"
                           :data="info.ds_data"
                           :with-credentials="info.ds_with_credentials"
                           :show-file-list="info.ds_show_file_list"
                           :drag="info.ds_drag"
                           :accept="info.ds_accept"
                           :multiple="info.ds_multiple"
                           :limit="info.ds_limit"
                           :on-preview="uploadOnPreview"
                           :on-remove="uploadRemove"
                           :before-remove="uploadBeforeRemove"
                           :before-upload="uploadBeforeUpload"
                           :on-exceed="uploadExceed"
                           :on-success="uploadSuccess"
                           :on-error="uploadError"
                           :on-progress="uploadProgress"
                           :on-change="uploadFileStatuChange"
                           :list-type="info.ds_list_type"
                           :file-list="info.ds_fileList"
                           :auto-upload="info.ds_auto_upload"
                           :disabled="computed_disabled">
                    <el-button
                            :type="info.ds_button_type"
                            :size="info.ds_button_size"
                            :icon="info.ds_button_icon"
                            :plain="info.ds_button_plain"
                            :round="info.ds_button_round"
                            :circle="info.ds_button_circle"
                            :disabled="info.ds_button_disabled"
                            :class="['hh']"
                            :style="computed_btnstyle"
                    >{{info.ds_btntext}}
                    </el-button>
                    <div slot="tip" class="el-upload__tip">{{info.ds_tiptext}}</div>
                </el-upload>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--row -->
<script id="drag_row" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="row"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="computed_position"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','rowContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['rowTop','ww','text-cl',hide]" :style="computed_Ts">{{computed_rowname}}</div>
                <el-row :id="info.ds_id+'_holder'"
                        class="rowBtm"
                        :style=computed_style>
                    <!--表单内部组件-->
                    <drag_comp v-for="item in info.ds_rowarr"
                               :data="item"
                               :key="item.info.ds_id">
                    </drag_comp>
                </el-row>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy','drag-row-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete','drag-row-del',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--button -->
<script id="drag_button" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="button"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height,width:info.ds_width,zIndex:info.ds_button_zIndex}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh','btnContent']">
            <label v-if="info.ds_showlable"
                   class="ds-form-item-label float-l hh"
                   :style="computed_labelstyle">
                {{info.ds_labeltxt}}
            </label>
            <div class="ds-form-item-content hh"
                 @mouseover="buttonMouseover"
                 @mouseleave="buttonMouseLeave"
                 :style="[computed_marginleft,computed_flex,computed_outerstyle]">
                <input @change="readFile" style="display: none" type="file" class="button_fileUploader"
                       name="fileUploader" accept=".xls, .xlsx"/>
                <el-button :name="info.ds_name"
                           @click="buttonClick"
                           :size="info.ds_size"
                           :type="info.ds_type"
                           :icon="info.ds_icon"
                           :plain="info.ds_plain"
                           :round="info.ds_round"
                           :circle="info.ds_circle"
                           :disabled="info.ds_disabled"
                           :style="computed_style">
                    {{info.ds_button}}
                </el-button>

            </div>
            <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
            <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
        </div>
    </div>
</script>
<!--dropdown-->
<script id="drag_dropdown" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="dropdown"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="{height:info.ds_height,width:info.ds_width,lineHeight:info.ds_height,width:info.ds_width,zIndex:info.ds_button_zIndex}">
        <div :class="['ds-form-item',computed_isrequired,'ds-form-item-medium','hh','btnContent']">
            <div class="ds-form-item-content hh"
                 :style="[computed_marginleft,computed_flex,computed_outerstyle]">
                <el-dropdown
                        :class="['hh']"
                        :hide-on-click=info.ds_dropdown_isNotHide
                        @command="handleCommand"
                        @visible-change="dropdownChange"
                >
                    <el-button type="primary"
                               :icon="info.ds_dropdown_icon"
                               :size="info.ds_dropdown_size"
                               :style="computed_style"
                               :disabled="info.ds_dropdown_disabled"
                               :class="['hh']"
                               @click="dropdownClick">
                        {{info.ds_dropdown}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>

                    <el-dropdown-menu slot="dropdown"
                                      :trigger="info.ds_dropdown_trigger">
                        <el-dropdown-item v-for="(item,index) in computed_item_data"
                                          :command="item.command"
                                          :tabindex="index"
                                          :disabled="computed_process_data(item.isNotDisabled)"
                                          :divided="computed_process_data(item.isNotDivided)"
                                          :icon="item.icon">{{item.item_text}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
            <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
        </div>
    </div>
</script>
<!--label -->
<script id="drag_label" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="label"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl',info.ds_style,'unfocus-bordered','rowHolder','float-l']"
         :draggable="computed_drag"
         :title="computed_title"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="[computed_position,computed_hw]">

        <div :class="['ds-form-item','ds-form-item-medium','hh','ww','otherContent']">
            <div :class="['ds-form-item-content','hh','ww']"
                 :style="{width:info.ds_innerwidth,marginLeft:'0rem'}">
                <div :class="['otherTop','ww','text-cl',hide]" :style="computed_Ts">{{computed_labelname}}</div>
                <div :class="['ww','otherBtm']"
                     :style="computed_style"
                     :datasource="info.ds_datasource"
                     @click="labelClick"
                     @mouseover="labelMouseOver"
                     @mouseleave="labelMouseLeave">
                    <div><i :class="info.ds_label_preicon" :style="computed_preicon_style"></i></div>
                    <p v-html="computed_ds_label"></p>
                    <div><i :class="info.ds_label_suficon" :style="computed_suficon_style"></i></div>
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--carousel轮播图-->
<script id="drag_carousel" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="carousel"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop','ww','text-cl', hide]" :style="computed_Ts">
                    {{computed_carouselname}}
                </div>
                <el-carousel
                        @change="carouselChange"
                        :style="computed_carouselstyle"
                        :interval="info.ds_carousel_interval"
                        :loop="info.ds_carousel_loop"
                        :autoplay="info.ds_carousel_autoplay"
                        :direction="info.ds_carousel_direction"
                        :initial-index="info.ds_carousel_initial_index"
                        :indicator-position="info.ds_carousel_indicator_position"
                        :arrow="info.ds_carousel_arrow"
                        :trigger="info.ds_carousel_trigger"
                        :type="info.ds_carousel_type">
                    <el-carousel-item v-for="(item,index) in computed_playlist"
                                      :key="index"
                                      :name="index.toString()"
                                      :label="item.label"
                                      :style="computed_carouseloutstyle">
                        <img :src="item.path" class="image" :style="computed_imgstyle">
                    </el-carousel-item>
                </el-carousel>
                <span @click="$emit('copy-ctrl')" title="复制" class="drawing-item-copy"><i
                        class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" class="drawing-item-delete"><i
                        class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--tree -->
<script id="drag_tree" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="tree"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,height:info.ds_height,width:info.ds_width}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop','ww','text-cl',hide]" :style="computed_Ts">{{computed_treename}}</div>
                <div :style="computed_style"></div>
                <el-tree :data="computed_data"
                         :id="info.ds_id+'_tree'"
                         class="treeBtm"
                         :style="[computed_Bs,computed_outerstyle]"
                         :node-key="info.ds_node_key"
                         :render-after-expand="info.ds_tree_render_after_expand"
                         :highlight-current="info.ds_tree_highlight_current"
                         :props="computed_props"
                         :filter-node-method="filterNode"
                         :render-content="renderContent"
                         :empty-text="info.ds_tree_empty_text"
                         :default-expand-all="info.ds_tree_default_expand_all"
                         :indent="info.ds_tree_indent"
                         :icon-class="info.ds_tree_icon_class"
                         :show-checkbox="info.ds_tree_showCheckbox"
                         :check-strictly="info.ds_tree_check_strictly"
                         :check-on-click-node="info.ds_tree_check_on_click_node"
                         :auto-expand-parent="info.ds_tree_auto_expand_parent"
                         :default-expanded-keys="computed_expandedKeys"
                         :expand-on-click-node="info.ds_tree_expand_on_click_node"
                         :current-node-key="info.ds_tree_current_node_key"
                         :default-checked-keys="info.ds_tree_checked_keys"
                         :draggable="info.ds_tree_draggable"
                         :allow-drag="allowDrag"
                         :allow-drop="allowDrop"
                         @current-change="currentChange"
                         @node-click="treeNodeClick"
                         @node-expand="treeNodeExpand"
                         @node-collapse="treeNodeCollapse"
                         @check="treeNodeCheck"
                         @node-contextmenu="nodeContextmenu"
                         @check-change="checkChange"
                         @node-drag-start="nodeDragStart"
                         @node-drag-enter="nodeDragEnter"
                         @node-drag-leave="nodeDragLeave"
                         @node-drag-over="nodeDragOver"
                         @node-drag-end="nodeDragEnd"
                         @node-drop="nodeDrop"
                         ref="treeRef">
                </el-tree>

                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>

        </div>
    </div>
</script>


<!--drag_grid-->
<script id="drag_grid" class="templete" type="text/html">
    <div :id="info.ds_id"
         v-cloak
         v-if="info.ds_render"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="grid"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']"
             @contextmenu.prevent="gridContextmenu" <%--@click.prevent="gridBodyClick"--%>>
            <div :class="['ds-form-item-content','hh']"
                 :style="[computed_outerstyle,computed_marginleft]">
                <div :class="['otherTop','ww','text-cl',hide]" :style="computed_Ts">{{computed_gridname}}</div>
                <div v-if="computed_showHead" :class="['grid_headTool','ww','text-cl']">
                    <!--编辑按钮-->
                    <div v-if="info.ds_isedit&&info.ds_showeditbutton" :class="['grid-edit']">
                        <el-button type="primary" plain @click="insertEditRow">新增</el-button>
                        <el-button type="danger" plain @click="deleteEditRow">删除</el-button>
                        <el-button type="primary" plain @click="editSave">保存</el-button>
                    </div>
                    <!--关键字搜索-->
                    <div v-if="info.ds_enablesearch" :class="['grid-search']">
                        <el-input v-model="keyWord" placeholder="请输入关键字" clearable
                                  :class="['grid-search-input']"></el-input>
                        <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <el-table
                        :class="['otherBtm',computed_expend,'customTable']"
                        :row-key="computed_rowKey"
                        :data="computed_data"
                        ref="multipleTable"
                        :id="computed_id"
                        :height="computed_Bs"
                        :row-class-name="rowClassName"
                        :row-style="setTableRowStyle"
                        :cell-style="setTableCellStyle"
                        :header-row-style="setHeaderRowStyle"
                        :header-cell-style="setHeaderCellStyle"
                        :show-summary="computed_sum"
                        :summary-method="custColSum"
                        :expand-row-keys="info.ds_expand_row_keys"
                        :border="info.ds_grid_isShowBorder"
                        :show-header="computed_isShowHeader"
                        highlight-current-row
                        tooltip-effect="light"
                        :empty-text="info.ds_grid_empty_text"
                        :span-method="objectSpanMethod"
                        :indent="info.ds_tree_grid_indent"
                        @select-all="selectAll"
                        @cell-click="cellClick"
                        @row-click="clickGridRow"
                        @row-dblclick="dblclickGridRow"
                        @select="selectRow"
                        @selection-change="selectionChange"
                        @row-contextmenu="rowContextmenu"
                        @sort-change="sortChange"
                        @header-contextmenu="headerContextmenu"
                        @header-click="headerClick">


                    <!-- 展开行  -->
                    <el-table-column type="expend" v-if="info.ds_expendCols.length>0">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-form label-position="left" inline class="grid-table-expand">
                                    <el-form-item
                                            v-for="(item, index) in info.ds_expendCols"
                                            :label="item.label"
                                            :style="computed_expendStyle(item)"
                                            :key="'scope.$index'+index+'item.prop'">
                                        <span>{{ scope.row[item.prop] }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <!--行号列-->
                    <el-table-column v-if="computed_shworownumber"
                                     align="center"
                                     type="index"
                                     :width="computed_indexWidth"
                                     :min-width="computed_indexPerWidth"
                                     :fixed="computed_indexFixed">
                        <template slot="header" slot-scope="scope">
                            <div class="center breakcell" :style="computed_indexStyle">序号</div>
                        </template>
                    </el-table-column>
                    <!--复选框列-->
                    <el-table-column class="text-cc"
                                     v-if="info.ds_showcheckbox"
                                     type="selection"
                                     :selectable="Selectable"
                                     width="50"
                                     :reserve-selection="info.ds_grid_isCurrentRow_reload"
                                     :fixed="computed_indexFixed">
                    </el-table-column>

                    <my-column
                            v-if="hackReset"
                            v-for="(item, index) in computed_columns"
                            :col="item"
                            class="aaa"
                            :currColField="currColField"
                            :currRowIndex="currRowIndex"
                            :info="info"
                            :currScope="currScope"
                            :rowKey="rowKey"
                            :key="index">
                    </my-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page="currentPage"
                        :page-sizes="info.ds_page_size_arr"
                        :page-size="info.ds_page_size" layout="total, sizes, prev, pager, next, jumper"
                        :total="dataTotal"
                        v-if="info.ds_pagination">
                </el-pagination>
                <my_rowcontextmenu :info="info" :contextMenuCurRow="contextMenuCurRow"
                                   :contextMenuCurCol="contextMenuCurCol" v-if="info.ds_grid_isOpenRowContextmenu"
                                   ref="rowcontextmenuRef"></my_rowcontextmenu>


                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--表格列递归组件-->
<script id="my_column" class="templete" type="text/html">

    <el-table-column v-if="computed_fieldShowType"
                     :prop="col.prop"
                     :label="col.label"
                     :column-key="col.id"
                     :key="col.id"
                     :width="col.width"
                     :min-width="col.perwidth"
                     :align="col.align"
                     header-align="center"
                     :fixed="col.fixed"
                     ref="cols"
                     sortable
                     show-overflow-tooltip>
        <template slot="header" slot-scope="scope">
            <div class="center breakcell" v-html="col.label"></div>
        </template>
        <template slot-scope="scope">

            <!--输入框-->
            <el-input v-if="isShowEditComp('input',scope,col,currColField, currRowIndex)"
                      :class="['hh']"
                      :style="cellWidthWithTreegrid(scope,currRowIndex)"
                      v-model="scope.row[col.prop]"
                      @change="(value)=>cellValChange(value,scope)"
                      @blur="loseInputFcous(scope)"
                      @focus="getInputFocus(scope)"
                      @input="(value)=>{cellInput(value,scope)}">

            </el-input>
            <!--下拉列表-->
            <el-select v-else-if="isShowEditComp('select',scope,col,currColField, currRowIndex)"
                       :class="['ww','hh']" clearable
                       filterable
                       :multiple="col.isMultiple"
                       filterable
                       @visible-change="(value)=>cellVisibleChange(value,scope)"
                       @change="(value)=>cellValChange(value,scope)"
                       v-model="scope.row[col.prop]">
                <el-option
                        v-for="(item,index) in computed_options(col,scope.row)"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <!--开关-->
            <el-switch
                    v-else-if="isShowEditComp('switch',scope,col,currColField, currRowIndex)"
                    :class="['ww','hh','center']" active-value="1" inactive-value="0"
                    @change="(value)=>cellValChange(value,scope)"
                    v-model="scope.row[col.prop]"
            ></el-switch>
            <!--日期选择器-->
            <el-date-picker
                    v-else-if="isShowEditComp('date-picker',scope,col,currColField, currRowIndex)"
                    :class="['hh']" :type="col.dateType"
                    @focus="getDateFocus"
                    @change="(value)=>cellValChange(value,scope)"
                    @blur="loseDateFocus"
                    v-model="scope.row[col.prop]"
                    :picker-options="computed_datePicker"
                    :value-format="computed_dateFormat(col)">
            </el-date-picker>
            <!--单选框组-->
            <el-radio-group
                    v-else-if="isShowEditComp('radio',scope,col,currColField, currRowIndex)"
                    :class="['ww','hh']"
                    @change="(value)=>cellValChange(value,scope)"
                    v-model="scope.row[col.prop]">
                <el-radio :disabled="radioDisable(scope,option,index)" v-for="(option, index) in col.options"
                          :key="index" :label="option.value">{{option.label}}
                </el-radio>
            </el-radio-group>
            <!--普通单元格-->
            <span v-else v-html="cellFormat(scope.row[col.prop],col,scope)"></span>
        </template>

        <template v-if="col.children&&col.children.length>0">
            <my-column v-for="(item, index) in col.children"
                       :col="item"
                       :currColField="currColField"
                       :currRowIndex="currRowIndex"
                       :info="info"
                       :key="index">
            </my-column>
        </template>

    </el-table-column>
</script>
<%--表格右键菜单--%>
<script id="my_rowcontextmenu" class="templete" type="text/html">
    <div :id="info.ds_id+'_rowcontextmenu'" class="tableContextMenu" style="display:none" v-show="menuVisible">
        <li v-for="(item) in computed_menuItem" @click="contextMenuClick(item.type)">
            <div class="gridMenuTitle"><i :class="item.icon"></i><span>{{item.title}}</span></div>
        </li>
    </div>
</script>

<!--自定义div-->
<script id="drag_listview" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="listview"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl',info.ds_style,'unfocus-bordered','rowHolder','float-l']"
         :draggable="computed_drag"
         @click="changeCurrId"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         :style="[computed_position,computed_hw]">
        <div :class="['ds-form-item','ds-form-item-medium','hh','ww','otherContent']">

            <div :class="['ds-form-item-content','hh','ww']"
                 :style="{width:'100%',marginLeft:'0rem'}">

                <div :class="computed_listView_twoBtn_class"
                     :style="computed_listView_leftBtn_style"
                     @click="leftBtn_click(this)">
                    <i :class="info.ds_leftBtn_icon"></i>
                </div>

                <div :class="computed_listView_twoBtn_class"
                     :style="computed_listView_rightBtn_style"
                     @click="rightBtn_click(this)">
                    <i :class="info.ds_rightBtn_icon"></i>
                </div>

                <div :class="['otherTop','ww','text-cl',hide]" :style="computed_listview_Ts">{{computed_labelname}}
                </div>

                <div :class="['ww','otherBtm','findYou']"
                     :style="computed_listviewstyle"
                     @mouseover="listviewMouseOver"
                     @mouseleave="listviewMouseLeave">
                    <div :id="info.ds_id+'_outer'" :style="computed_list_style">
                        <div v-for="(item,index) in computed_data"
                             :style="computed_inDiv_style(item)"
                             v-html="computed_html(item)"
                             @click="pushParam(item)"
                             :key="index">
                        </div>
                    </div>
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>

            </div>
        </div>
    </div>

</script>


<!--导航栏-->
<script id="drag_menu" class="templete" type="text/html">
    <div :id="info.ds_id"
         v-cloak
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="menu"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop','ww','text-cl',hide]" :style="computed_Ts">{{computed_menuName}}</div>

                <el-menu :class="['ww' ,'hh', 'over-a' ,'otherBtm',computed_collapse]"
                         :mode="info.ds_menu_mode"
                         :background-color="info.ds_menu_background_color"
                         :text-color="info.ds_menu_text_color"
                         :active-text-color="computed_activeColor"
                         :default-active="info.ds_menu_default_active"
                         :default-openeds="info.ds_menu_default_openeds"
                         :unique-opened="info.ds_menu_unique_opened"
                         :menu-trigger="info.ds_menu_trigger"
                         :collapse="info.ds_menu_collapse_transition"
                         :style="computed_outerstyle"
                         @select="(index,indexPath)=>{menuClick(index,indexPath,'select')}"
                         @open="(index,indexPath)=>{menuClick(index,indexPath,'open')}"
                         @close="(index,indexPath)=>{menuClick(index,indexPath,'close')}">

                    <navigation-item v-for="menu in computed_data" :key="menu.ID" :item="menu" ref="navigationItem"
                                     :info="info">
                    </navigation-item>

                </el-menu>
                <div :id="computed_outClickId" @click="outclick" v-show="false"></div>

                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>


<script id="navigation_item" class="templete" type="text/html">
    <div>
        <template v-if="!item.children||(item.children&&item.children.length==0)">

            <el-menu-item :index="item.ID.toString()"
                          :class="[info.ds_id+'_menuCls']"
                          :style="computed_style(item.ID)">
                <i :class="[computed_icon(item)]"></i>
                <span v-if="info.ds_menu_collapse_transition&&item.SHORTNAME">{{item.SHORTNAME}}</span>
                <span v-else>{{item.NAME}}</span>
                <div :URL="item.URL" :id="info.ds_id+'_'+item.ID"></div>
            </el-menu-item>
        </template>


        <el-submenu v-else
                    :index="item.ID.toString()"
                    sub="true"
                    :class="[info.ds_id+'_menuCls']"
                    :style="computed_style(item.ID)">

            <template slot="title">
                <i :class="[computed_icon(item)]"></i>
                <span v-if="info.ds_menu_collapse_transition&&item.SHORTNAME">{{item.SHORTNAME}}</span>
                <span v-else>{{item.NAME}}</span>
                <div :URL="item.URL" :id="info.ds_id+'_'+item.ID"></div>
            </template>
            <template v-for="child in item.children">
                <navigation-item v-if="child.children&&child.children.length>0"
                                 :item="child"
                                 :key="child.ID"
                                 :info="info">
                </navigation-item>

                <el-menu-item v-else
                              :key="child.ID"
                              :index="child.ID.toString()"
                              :class="[info.ds_id+'_menuCls']"
                              :style="computed_style(child.ID)">
                    <i :class="[computed_icon(child)]"></i>
                    <span v-if="info.ds_menu_collapse_transition&&item.SHORTNAME">{{child.SHORTNAME}}</span>
                    <span v-else>{{child.NAME}}</span>
                    <div :URL="item.URL" :id="info.ds_id+'_'+child.ID"></div>
                </el-menu-item>
            </template>
        </el-submenu>
    </div>
</script>


<!--iframe -->
<script id="drag_iframe" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="iframe"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_iframeName}}</div>
                <iframe :id="info.ds_id+'_iframe'"
                        :class="['ww','otherBtm']"
                        :iframe="info.ds_ctrlname"
                        :style="computed_style"
                        :src="computed_iframeSrc">
                </iframe>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--timeline-->
<script id="drag_timeline" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="timeline"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_timelineName}}</div>
            <div :class="['ds-form-item-content','hh','over-a']"
                 :style="computed_outerstyle">
                <el-timeline :reverse="info.ds_timeline_reverse"
                             :style="computed_position">
                    <el-timeline-item
                            v-for="(item, index) in computed_timeline"
                            :timestamp="item.timestamp"
                            :hide-timestamp="info.ds_timeline_hide_timestamp"
                            :placement="info.ds_timeline_placement"
                            :type="item.type"
                            :color="item.color"
                            :size="item.size"
                            :icon="item.icon"
                            :key="index">
                        <div v-html="computed_content(item)"></div>
                    </el-timeline-item>
                </el-timeline>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--step -->
<script id="drag_step" class="templete" type="text/html">
    <div :id="info.ds_id"
         v-cloak
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="step"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         ref="tabsRef"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_stepName}}</div>
                <el-steps :class="['ww','otherBtm']"
                          :style="computed_style"
                          :active="info.ds_step_active"
                          :simple="info.ds_step_simple"
                          :space="info.ds_step_space"
                          :align-center="info.ds_step_align_center"
                          :direction="info.ds_step_direction"
                          :process-status="info.ds_step_process_status"
                          :finish-status="info.ds_step_finish_status">
                    <el-step v-for="(item, index) in computed_step"
                             :sid="info.ds_id"
                             :sindex="index"
                             :description="item.description"
                             :title="item.title"
                             :icon="item.icon"
                             :status="item.status"
                             :style="computed_innerstyle"
                             :key="index">
                    </el-step>
                </el-steps>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--tabs-->
<script id="drag_tabs" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="tabs"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="computed_position"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_tabsname}}</div>
                <el-tabs :style="computed_tabstyle"
                         ref="tabsRef"
                         v-model="info.ds_tabs_editableTabsValue"
                         :type="info.ds_tabs_type"
                         :closable="info.ds_tabs_closable"
                         :tab-position="info.ds_tabs_tabposition"
                         :stretch="info.ds_tabs_stretch"
                         :before-leave="beforeLeave"
                         @tab-click="tabClick"
                         @tab-remove="tabRemove">
                    <el-tab-pane class="ww hh"
                                 v-for="(item, index) in computed_data"
                                 :key="item.tabIndex"
                                 :lazy="item.lazy"
                                 :name="item.tabIndex.toString()">
                        <span :style="item.textColor" slot="label"><i :class="item.iconClass"></i> {{item.title}}</span>
                        <iframe :id="info.ds_id+'_iframe_'+ item.tabIndex" :iframe="item.title" class="ww hh"
                                :src="item.content"></iframe>
                    </el-tab-pane>
                </el-tabs>
                <tabs-more :info="info"></tabs-more>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<script id="tabs-more" class="templete" type="text/html">

    <div :id="info.ds_id+'_tabsMoreGrid'"
         :style=computed_tabMoreStyle>
        <div class="ww" style="border-bottom:1px solid #e6ebee ;height: 5%">
            <span class="hh float-r" style="width: 2rem">
                <i id="closeShowMore" class="el-icon-close ww hh " style="line-height: 100%" @click="showMoreClose"></i>
            </span>
        </div>
        <div class="ww" style="height: 95%">
            <div>
                <el-input v-model="searchKey" style="height: 2.5rem" @focus="searchInputFocus" @input="searchTab"
                          @change="searchTab"></el-input>
            </div>

            <div style="height: calc(100% - 2.5rem);overflow-x:hidden " class="ww"
                 v-if="computed_data&&computed_data.length>0">
                <li v-for="item in computed_data" class="tabItem ww text-p"
                    :tabIndex="item.tabIndex"
                    :key="item.tabIndex"
                    :title="item.title"
                    @click="tabGridClick"
                    :style="computed_itemStyle">{{item.title}}
                </li>
            </div>
            <div v-else
                 style="color:#7e848a;height: calc(100% - 2.5rem);display:flex;justify-content:center;align-items:center"
                 class="ww">无数据
            </div>
        </div>
    </div>
</script>

<!--transfer-->
<script id="drag_transfer" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="transfer"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="computed_position"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['hh','ww']"
                 :style="computed_outerstyle">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_transfer}}</div>
                <el-transfer v-model="computed_val"
                             :data="computed_data"
                             @change="change"
                             @left-check-change="leftCheckChange"
                             @right-check-change="rightCheckChange"
                             :left-panel-style="computed_left_panel_style"
                             :right-panel-style="computed_right_panel_style"
                             :filterable="info.ds_filterable"
                             :filter-placeholder="info.ds_filter_placeholder"
                             :filter-method="filterMethod"
                             :target-order="info.ds_target_order"
                             :titles="info.ds_titles"
                             :button-texts="info.ds_button_texts"
                             :render-content="renderTransferContent"
                             :format="computed_format"
                             :left-default-checked="info.ds_left_default_checked"
                             :right-default-checked="info.ds_right_default_checked">
                </el-transfer>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--饼状图-->

<script id="drag_pie" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="pie"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_piename}}</div>

                <div :id="info.ds_id+'_pie'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize"
                >
                </div>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--折线图-->

<script id="drag_line" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="line"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_linename}}</div>

                <div :id="info.ds_id+'_line'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--柱状图-->
<script id="drag_bar" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="bar"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl', hide]" :style="computed_Ts">{{computed_barname}}</div>

                <div :id="info.ds_id+'_bar'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" class="drawing-item-copy"><i
                        class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" class="drawing-item-delete"><i
                        class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--仪表盘-->
<script id="drag_gauge" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="gauge"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl', hide]" :style="computed_Ts">{{computed_gaugename}}</div>

                <div :id="info.ds_id+'_gauge'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" class="drawing-item-copy"><i
                        class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" class="drawing-item-delete"><i
                        class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--混合图-->
<script id="drag_mix" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="mix"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','barContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl', hide]" :style="computed_Ts">{{computed_mixname}}</div>

                <div :id="info.ds_id+'_mix'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" class="drawing-item-copy"><i
                        class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" class="drawing-item-delete"><i
                        class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--散点图-->

<script id="drag_scatter" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="scatter"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_scattername}}</div>

                <div :id="info.ds_id+'_scatter'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--地图-->
<script id="drag_map" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="map"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','barContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl', hide]" :style="computed_Ts">{{computed_mapname}}</div>

                <div :id="info.ds_id+'_map'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" class="drawing-item-copy"><i
                        class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" class="drawing-item-delete"><i
                        class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--树图-->
<script id="drag_treechart" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="treechart"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','rowHolder','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl',hide]" :style="computed_Ts">{{computed_treechartname}}</div>

                <div :id="info.ds_id+'_treechart'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>
                <span @click="$emit('copy-ctrl')" title="复制" :class="['drawing-item-copy',hide]">
                    <i class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" :class="['drawing-item-delete',hide]">
                    <i class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--关系图-->
<script id="drag_graph" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="graph"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','barContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop', 'ww' ,'text-cl', hide]" :style="computed_Ts">{{computed_graphname}}</div>

                <div :id="info.ds_id+'_graph'" :style="computed_style"
                     :option="computed_option"
                     :resize="computed_resize">
                </div>

                <span @click="$emit('copy-ctrl')" title="复制" class="drawing-item-copy"><i
                        class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" class="drawing-item-delete"><i
                        class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>

<!--视频-->
<script id="drag_video" class="templete" type="text/html">
    <div :id="info.ds_id"
         :ctrlname="info.ds_ctrlname"
         :refdate="refdate"
         ctrltype="video"
         :ispro="info.ds_ispro"
         :class="[computed_show,'ds_ctrl','ds-col',info.ds_style,'unfocus-bordered','float-l']"
         :draggable="computed_drag"
         :style="{minHeight: info.ds_height,width:info.ds_width,height:info.ds_height}"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"
         @click="changeCurrId">
        <div :class="['ds-form-item','ds-form-item-medium','otherContent','hh']">
            <div :class="['ds-form-item-content','hh']"
                 :style="{width:'100%',marginLeft:'0rem'}">
                <div :class="['otherTop','ww','text-cl',hide]" :style="computed_Ts">{{computed_videoname}}</div>
                <video :id="info.ds_id+'_video'" :style="computed_style"
                       class="video-js vjs-big-play-centered"
                       :poster="info.ds_video_poster"
                       controls
                       :muted="computed_muted"
                       preload="auto"
                       data-setup="{}"
                       @loadstart="loadstart"
                       @firstplay="firstplay"
                       @play="play"
                       @pause="pause"
                       @ended="ended">
                    <source :src="computed_video_url" :type="info.ds_video_type">
                    <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web
                        browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5
                            video</a></p>
                </video>
                <span @click="$emit('copy-ctrl')" title="复制" class="drawing-item-copy"><i
                        class="el-icon-copy-document"></i></span>
                <span @click="$emit('del-ctrl')" title="删除" class="drawing-item-delete"><i
                        class="el-icon-delete"></i></span>
            </div>
        </div>
    </div>
</script>
<!--控件注册-->
<script id="drag_comp" class="templete" type="text/html">
    <!--输入框-->
    <drag_input v-if="data.type=='drag_input'" v-model="data" :info="data.info"
                v-on:copy-ctrl="copyCtrl"
                v-on:del-ctrl="delCtrl">
    </drag_input>
    <!--文本框-->
    <drag_textarea v-else-if="data.type=='drag_textarea'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_textarea>
    <!--密码框-->
    <drag_password v-else-if="data.type=='drag_password'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl"></drag_password>
    <!--数值输入框-->
    <drag_inputnumber v-else-if="data.type=='drag_inputnumber'" :info="data.info"
                      v-on:copy-ctrl="copyCtrl"
                      v-on:del-ctrl="delCtrl">
    </drag_inputnumber>
    <!--Tree-->
    <drag_tree v-else-if="data.type=='drag_tree'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_tree>

    <!--下拉框-->
    <drag_select v-else-if="data.type=='drag_select'" :info="data.info"
                 v-on:copy-ctrl="copyCtrl"
                 v-on:del-ctrl="delCtrl">
    </drag_select>
    <!--级联选择-->
    <drag_cascader v-else-if="data.type=='drag_cascader'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_cascader>
    <!--单选框组-->
    <drag_radio v-else-if="data.type=='drag_radio'" :info="data.info"
                v-on:copy-ctrl="copyCtrl"
                v-on:del-ctrl="delCtrl">
    </drag_radio>
    <!--多选框组-->
    <drag_checkbox v-else-if="data.type=='drag_checkbox'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_checkbox>
    <!--开关-->
    <drag_switch v-else-if="data.type=='drag_switch'" :info="data.info"
                 v-on:copy-ctrl="copyCtrl"
                 v-on:del-ctrl="delCtrl">
    </drag_switch>
    <!--滑动条-->
    <drag_slider v-else-if="data.type=='drag_slider'" :info="data.info"
                 v-on:copy-ctrl="copyCtrl"
                 v-on:del-ctrl="delCtrl">
    </drag_slider>
    <!--时间选择-->
    <drag_time v-else-if="data.type=='drag_time'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_time>
    <!--时间范围-->
    <drag_timerange v-else-if="data.type=='drag_timerange'" :info="data.info"
                    v-on:copy-ctrl="copyCtrl"
                    v-on:del-ctrl="delCtrl">
    </drag_timerange>
    <!--日期选择-->
    <drag_date v-else-if="data.type=='drag_date'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_date>
    <!--日期范围-->
    <drag_daterange v-else-if="data.type=='drag_daterange'" :info="data.info"
                    v-on:copy-ctrl="copyCtrl"
                    v-on:del-ctrl="delCtrl">
    </drag_daterange>
    <!--评分-->
    <drag_rate v-else-if="data.type=='drag_rate'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_rate>
    <!--颜色-->
    <drag_color v-else-if="data.type=='drag_color'" :info="data.info"
                v-on:copy-ctrl="copyCtrl"
                v-on:del-ctrl="delCtrl">
    </drag_color>
    <!--上传-->
    <drag_upload v-else-if="data.type=='drag_upload'" :info="data.info"
                 v-on:copy-ctrl="copyCtrl"
                 v-on:del-ctrl="delCtrl">
    </drag_upload>
    <!--DIV自定义-->
    <drag_listview v-else-if="data.type=='drag_listview'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_listview>
    <!--容器-->
    <drag_row v-else-if="data.type=='drag_row'" :info="data.info"
              v-on:copy-ctrl="copyCtrl"
              v-on:del-ctrl="delCtrl">
    </drag_row>
    <!--按钮-->
    <drag_button v-else-if="data.type=='drag_button'" :info="data.info"
                 v-on:copy-ctrl="copyCtrl"
                 v-on:del-ctrl="delCtrl">
    </drag_button>
    <!--下拉菜单-->
    <drag_dropdown v-else-if="data.type=='drag_dropdown'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_dropdown>
    <!--编辑器-->
    <drag_rich v-else-if="data.type=='drag_rich'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_rich>
    <!--JS编辑器-->
    <drag_jseditor v-else-if="data.type=='drag_jseditor'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_jseditor>
    <!--html编辑器-->
    <drag_htmleditor v-else-if="data.type=='drag_htmleditor'" :info="data.info"
                     v-on:copy-ctrl="copyCtrl"
                     v-on:del-ctrl="delCtrl">
    </drag_htmleditor>
    <!-- css编辑器-->
    <drag_csseditor v-else-if="data.type=='drag_csseditor'" :info="data.info"
                    v-on:copy-ctrl="copyCtrl"
                    v-on:del-ctrl="delCtrl">
    </drag_csseditor>
    <!--标签-->
    <drag_label v-else-if="data.type=='drag_label'" :info="data.info"
                v-on:copy-ctrl="copyCtrl"
                v-on:del-ctrl="delCtrl">
    </drag_label>
    <!--导航栏-->
    <drag_menu v-else-if="data.type=='drag_menu'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_menu>
    <!--表格-->
    <drag_grid v-else-if="data.type=='drag_grid'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_grid>
    <!--iframe-->
    <drag_iframe v-else-if="data.type=='drag_iframe'" :info="data.info"
                 v-on:copy-ctrl="copyCtrl"
                 v-on:del-ctrl="delCtrl">
    </drag_iframe>
    <!--step-->
    <drag_step v-else-if="data.type=='drag_step'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_step>
    <!--tabs-->
    <drag_tabs v-else-if="data.type=='drag_tabs'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_tabs>
    <!--transfer-->
    <drag_transfer v-else-if="data.type=='drag_transfer'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_transfer>
    <!--progress-->
    <drag_progress v-else-if="data.type=='drag_progress'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_progress>
    <!--timeline-->
    <drag_timeline v-else-if="data.type=='drag_timeline'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_timeline>
    <!--弹出树-->
    <drag_poptree v-else-if="data.type=='drag_poptree'" :info="data.info"
                  v-on:copy-ctrl="copyCtrl"
                  v-on:del-ctrl="delCtrl">
    </drag_poptree>
    <!--饼状图-->
    <drag_pie v-else-if="data.type=='drag_pie'" :info="data.info"
              v-on:copy-ctrl="copyCtrl"
              v-on:del-ctrl="delCtrl">
    </drag_pie>
    <!--折线图-->
    <drag_line v-else-if="data.type=='drag_line'" :info="data.info"
               v-on:copy-ctrl="copyCtrl"
               v-on:del-ctrl="delCtrl">
    </drag_line>
    <!--柱状图-->
    <drag_bar v-else-if="data.type=='drag_bar'" :info="data.info"
              v-on:copy-ctrl="copyCtrl"
              v-on:del-ctrl="delCtrl">
    </drag_bar>
    <!--混合图-->
    <drag_mix v-else-if="data.type=='drag_mix'" :info="data.info"
              v-on:copy-ctrl="copyCtrl"
              v-on:del-ctrl="delCtrl">
    </drag_mix>
    <!--散点图-->
    <drag_scatter v-else-if="data.type=='drag_scatter'" :info="data.info"
                  v-on:copy-ctrl="copyCtrl"
                  v-on:del-ctrl="delCtrl">
    </drag_scatter>
    <!--视频-->
    <drag_video v-else-if="data.type=='drag_video'" :info="data.info"
                v-on:copy-ctrl="copyCtrl"
                v-on:del-ctrl="delCtrl">
    </drag_video>
    <%--地图--%>
    <drag_map v-else-if="data.type=='drag_map'" :info="data.info"
              v-on:copy-ctrl="copyCtrl"
              v-on:del-ctrl="delCtrl">
    </drag_map>
    <!--树图-->
    <drag_treechart v-else-if="data.type=='drag_treechart'" :info="data.info"
                    v-on:copy-ctrl="copyCtrl"
                    v-on:del-ctrl="delCtrl">
    </drag_treechart>

    <%--关系图--%>
    <drag_graph v-else-if="data.type=='drag_graph'" :info="data.info"
                v-on:copy-ctrl="copyCtrl"
                v-on:del-ctrl="delCtrl">
    </drag_graph>

    <!--轮播图-->
    <drag_carousel v-else-if="data.type=='drag_carousel'" :info="data.info"
                   v-on:copy-ctrl="copyCtrl"
                   v-on:del-ctrl="delCtrl">
    </drag_carousel>
    <!--仪表盘-->
    <drag_gauge v-else-if="data.type=='drag_gauge'" :info="data.info"
                v-on:copy-ctrl="copyCtrl"
                v-on:del-ctrl="delCtrl">
    </drag_gauge>
</script>
<!--图标模板-->
<script id="drag_iconholder" class="templete" type="text/html">
    <ul data-v-3ba3d51c="" class="icon-ul">
        <li data-v-3ba3d51c="" v-for="(item, index) in icon"
            class="ellipsis_o"
            @click="chooseIcon(item.name)"
            style="width:10rem;margin-left: 2rem"
            :title="item.name"
            :key="index">
            <i data-v-3ba3d51c="" :class="item.value"></i>
            <div data-v-3ba3d51c="">{{item.name}}</div>
        </li>
    </ul>
</script>
</html>
