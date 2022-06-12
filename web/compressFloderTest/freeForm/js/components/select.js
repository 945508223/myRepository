var $select={type:"drag_select",dataType:"singeleData",uuid:Date.parse(new Date),getConfig:getSelectConfig,register:registerSelect,showProperty:showPropertySelect,setData:setSelectVal,getData:getSelectVal,clearData:clearSelectVal};function getSelectConfig(){return{ds_id:"",ds_ctrlname:"SELECT_"+$select.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"5rem",ds_labelwidth:"10",ds_labelcolor:"#606266",ds_labelfontweight:"bold",ds_labelfontfamily:"微软雅黑",ds_labelfontsize:"1",ds_innerwidth:"calc(100% - 2rem)",ds_style:"drawing-item",ds_datasource:"",ds_refdatasource:"",ds_refdatasource_filter:"",ds_name:"",ds_showlable:true,ds_isrequired:false,ds_param:"",ds_backParamCondition:"",ds_trigger:"",ds_loading:"normal",ds_out_padding:"1rem",ds_out_margin:"0rem",ds_ispro:false,ds_pid:"",ds_draggable:"true",ds_defaultval:"",ds_labeltxt:"下拉选择",ds_placeholder:"",ds_group:false,ds_options:[{value:"0",label:"选项1"},{value:"1",label:"选项2"}],ds_select:"",ds_clearable:false,ds_disabled:false,ds_filterable:true,ds_allow_create:false,ds_multiple:false,ds_select_data:"",ds_select_ext_data:[],ds_title:"",ds_inner_color:"",ds_inner_bordercolor:"",ds_inner_fontsize:"",ds_inner_fontfamily:"",ds_option_color:"",ds_option_fontsize:"",ds_option_fontfamily:"",ds_select_default:false,ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_select_change:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_select_visible_change:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:状态(true/false 显示/隐藏)",ds_select_remove_tag:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_select_clear:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}",ds_select_blur:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//event:事件对象",ds_select_focus:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//event:事件对象"}}function registerSelect(){Vue.component("drag_select",{props:["type","info"],created:function(){this.$nextTick(function(){addListener(this);if(this.info.ds_select_default){if(this.info.ds_options.length>0){this.info.ds_select=this.info.ds_options[0].value;this.selectChange(this.info.ds_options[0].value)}}if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;VUECFG.$refs[this.info.ds_id]=this})},data:function(){return{hide:"y-hide",refdate:Date.parse(new Date)}},computed:{computed_options:function(){if(this.info.ds_select_ext_data){if($DS.util.isString(this.info.ds_select_ext_data)){var s=[];try{s=JSON.parse(this.info.ds_select_ext_data)}catch(e){s=[]}return this.info.ds_options.concat(s)}else{return this.info.ds_options.concat(this.info.ds_select_ext_data)}}else{return this.info.ds_options}},computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_outerstyle:function(){if(this.info.ds_ispro===true){return{padding:"1rem 0px"}}return{padding:this.info.ds_out_padding,margin:this.info.ds_out_margin}},computed_width:function(){return this.info.ds_showlable?"calc("+this.info.ds_innerwidth+" - "+this.info.ds_labelwidth+"rem)":this.info.ds_innerwidth},computed_show:function(){var refdateStr=`${this.refdate}_change`;if(!VUECFG.viewStatu){return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{if(this.info.ds_showCondition){var str=$DS.util.replace(this.info.ds_showCondition);return eval(str)?"y-show":"y-hide"}return this.info.ds_show?"y-show":"y-hide"}},computed_marginleft:function(){return this.info.ds_showlable?this.info.ds_labelwidth+"rem":"0rem"},computed_isrequired:function(){return this.info.ds_isrequired?"ds_isrequired":""},computed_title:function(){return this.info.ds_title},computed_labelstyle:function(){return{width:this.info.ds_labelwidth+"rem",color:this.info.ds_labelcolor,fontWeight:!this.info.ds_ispro?this.info.ds_labelfontweight:"normal",fontFamily:this.info.ds_labelfontfamily,fontSize:this.info.ds_labelfontsize}},computed_innerStyle:function(){this.$nextTick(function(){if(this.info.ds_inner_color){$(`#${this.info.ds_id} .el-input__inner`).css("color",this.info.ds_inner_color)}if(this.info.ds_inner_bordercolor){$(`#${this.info.ds_id} .el-input__inner`).css("border-color",this.info.ds_inner_bordercolor)}if(this.info.ds_inner_fontsize){$(`#${this.info.ds_id} .el-input__inner`).css("font-size",this.info.ds_inner_fontsize)}if(this.info.ds_inner_fontfamily){$(`#${this.info.ds_id} .el-input__inner`).css("font-family",this.info.ds_inner_fontfamily)}});return{color:this.info.ds_inner_color,borderColor:this.info.ds_inner_bordercolor,"font-size":this.info.ds_inner_fontsize,"font-family":this.info.ds_inner_fontfamily,display:"none"}},computed_optionStyle:function(){return{color:this.info.ds_option_color,"font-size":this.info.ds_option_fontsize,"font-family":this.info.ds_option_fontfamily}}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,selectChange:selectChange,visibleChange:visibleChange,selectRemoveTag:selectRemoveTag,selectClear:selectClear,selectBlur:selectBlur,selectFocus:selectFocus},template:util.getModelHtml("drag_select")})}function loadSuccess(s,e){debugger;var d=this.info;if(d.ds_options.length>0){if(d.ds_select_default)d.ds_select=d.ds_options[0].label}$DS.eval(d.ds_load_success,d)}function selectChange(s){debugger;var e=this.info;if(e.ds_param){var d=getSelectLabelVal(this.info,s);$DS.dealPms({ds_id:e.ds_id,ds_backParamCondition:e.ds_backParamCondition,ds_param:e.ds_param+"_TEXT"},d);e.ds_select_curText=d}$DS.eval(e.ds_select_change,e,s);if(e.ds_param)$DS.dealPms(e,s);if(e.ds_trigger&&e.ds_trigger.length>0){triggerComps(e.ds_trigger,$DS.getCtrlType(e.ds_id))}if(e.ds_ispro){if(e.ds_pid=="PAGE"){$page.onchage(e,s);return}var t=VUECFG.formObj[e.ds_pid];t.info[e.ds_name]=s;VUECFG.$refs[e.ds_pid].refdate++}else{var _=VUECFG.proObj[e.ds_id];if(_){for(var l=0;l<_.length;l++){if(_[l].info.ds_name=="ds_select"){VUECFG.proObj[e.ds_id][l].info.ds_input=s+"";if(VUECFG.proArr[l])VUECFG.proArr[l].info.ds_input=s+""}}}}}function getSelectLabelVal(s,e){var d="";if($DS.util.isArray(e)){d=[];for(let t=0;t<=e.length-1;t++){s.ds_options.find(s=>{if(s.value==e[t]){d.push(s.label)}})}}else{s.ds_options.find(s=>{if(s.value==e){d=s.label}})}return d}function visibleChange(s){var e=this.info;if(!e.ds_ispro){changeCurrId({currentTarget:$(`#${e.ds_id}`)[0],id:e.ds_id})}$DS.eval(e.ds_select_visible_change,e,s)}function selectRemoveTag(s){var e=this.info;if(!e.ds_ispro){changeCurrId({currentTarget:$(`#${e.ds_id}`)[0],id:e.ds_id})}$DS.eval(e.ds_select_remove_tag,e,s)}function selectClear(){var s=this.info;if(!s.ds_ispro){changeCurrId({currentTarget:$(`#${s.ds_id}`)[0],id:s.ds_id})}$DS.eval(s.ds_select_clear,s,null)}function selectBlur(s){var e=this.info;$DS.eval(e.ds_select_blur,e,null,s)}function selectFocus(s){var e=this.info;$DS.eval(e.ds_select_focus,e,null,s)}function showPropertySelect(s){var e=[];var d=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$select.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});e.push(d);var t=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true});e.push(t);var _=getProInfoByObj("input",{ds_id:"ds_labeltxt",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题",ds_placeholder:"标题",ds_input:"下拉选择",ds_name:"ds_labeltxt",ds_ispro:true});e.push(_);var l=getProInfoByObj("input",{ds_id:"ds_placeholder",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"占位提示",ds_placeholder:"占位提示",ds_input:"请选择",ds_name:"ds_placeholder",ds_ispro:true});e.push(l);var r=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true,ds_isrequired:false});e.push(r);var a=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"5rem",ds_name:"ds_height",ds_ispro:true});e.push(a);var i=getProInfoByObj("input",{ds_id:"ds_select",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认值",ds_placeholder:"默认值",ds_input:"",ds_name:"ds_select",ds_ispro:true});e.push(i);var o=getProInfoByObj("select",{ds_id:"ds_datasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据源",ds_placeholder:"数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_datasource",ds_ispro:true,group1:"数据源",group2:""});e.push(o);var n=getProInfoByObj("select",{ds_id:"ds_name",ds_pid:VUECFG.ctrlId,ds_labeltxt:"字段名",ds_placeholder:"字段名",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_change:"changeFieldNameForCtrl",ds_select_visible_change:"changeFieldOption",ds_name:"ds_name",ds_ispro:true,group1:"数据源",group2:""});e.push(n);var c=getProInfoByObj("select",{ds_id:"ds_refdatasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"引用数据源",ds_placeholder:"引用数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeRefDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_refdatasource",ds_ispro:true,group1:"数据源",group2:"引用数据源"});e.push(c);var p=getProInfoByObj("textarea",{ds_id:"ds_refdatasource_filter",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"引用过滤条件",ds_placeholder:"普通过滤条件: AND GUID=\\${V.URL_GUID,''}###撤销参数条件: AND=>[AND]或者OR=>[OR]###参数表达式:\\${V.参数池中参数名,'缺省值'}",ds_textarea:"",ds_name:"ds_refdatasource_filter",ds_ispro:true,group1:"数据源",group2:"引用数据源"});e.push(p);var u=getProInfoByObj("input",{ds_id:"ds_innerwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"组件宽度",ds_placeholder:"组件宽度",ds_input:"calc(100% - 2rem)",ds_name:"ds_innerwidth",ds_ispro:true,group1:"属性",group2:"组件布局"});e.push(u);var f=getProInfoByObj("input",{ds_id:"ds_out_padding",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"内边距大小",ds_placeholder:"内边距大小",ds_input:"1rem",ds_name:"ds_out_padding",ds_ispro:true,group1:"属性",group2:"组件布局"});e.push(f);var g=getProInfoByObj("input",{ds_id:"ds_out_margin",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外边距大小",ds_placeholder:"外边距大小",ds_input:"0rem",ds_name:"ds_out_margin",ds_ispro:true,group1:"属性",group2:"组件布局"});e.push(g);var h=getProInfoByObj("input",{ds_id:"ds_labelwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题宽度",ds_placeholder:"标题宽度",ds_input:"10",ds_name:"ds_labelwidth",ds_ispro:true,ds_append:"rem",group1:"属性",group2:"标题样式"});e.push(h);var b=getProInfoByObj("color",{ds_id:"ds_labelcolor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题颜色",ds_name:"ds_labelcolor",ds_ispro:true,ds_show_alpha:true,ds_color:"#606266",group1:"属性",group2:"标题样式"});e.push(b);var m=getProInfoByObj("select",{ds_id:"ds_labelfontweight",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体加粗",ds_placeholder:"标题字体加粗",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontWeight(),ds_select:"bold",ds_name:"ds_labelfontweight",ds_ispro:true,group1:"属性",group2:"标题样式"});e.push(m);var y=getProInfoByObj("select",{ds_id:"ds_labelfontfamily",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体样式",ds_placeholder:"标题字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontFamily(),ds_select:"微软雅黑",ds_name:"ds_labelfontfamily",ds_ispro:true,group1:"属性",group2:"标题样式"});e.push(y);var v=getProInfoByObj("input",{ds_id:"s_labelfontsize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题字体大小",ds_placeholder:"标题字体大小",ds_input:"1rem",ds_name:"ds_labelfontsize",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"标题样式"});e.push(v);var C=getProInfoByObj("color",{ds_id:"ds_inner_bordercolor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"输入框颜色",ds_name:"ds_inner_bordercolor",ds_ispro:true,ds_show_alpha:true,ds_color:"#DCDFE6",group1:"属性",group2:"组件样式"});e.push(C);var I=getProInfoByObj("color",{ds_id:"ds_inner_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"输入字体颜色",ds_name:"ds_inner_color",ds_ispro:true,ds_show_alpha:true,ds_color:"#606266",group1:"属性",group2:"组件字体"});e.push(I);var j=getProInfoByObj("input",{ds_id:"ds_inner_fontsize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"输入框字体大小",ds_placeholder:"输入框字体大小",ds_input:"1rem",ds_name:"ds_inner_fontsize",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"组件字体"});e.push(j);var F=getProInfoByObj("select",{ds_id:"ds_inner_fontfamily",ds_pid:VUECFG.ctrlId,ds_labeltxt:"输入框字体样式",ds_placeholder:"输入框字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontFamily(),ds_select:"宋体",ds_name:"ds_inner_fontfamily",ds_ispro:true,group1:"属性",group2:"组件字体"});e.push(F);var V=getProInfoByObj("color",{ds_id:"ds_option_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉框字体颜色",ds_name:"ds_option_color",ds_ispro:true,ds_show_alpha:true,ds_color:"#606266",group1:"属性",group2:"组件字体"});e.push(V);var w=getProInfoByObj("input",{ds_id:"ds_option_fontsize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉框字体大小",ds_placeholder:"下拉框字体大小",ds_input:"1rem",ds_name:"ds_option_fontsize",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"组件字体"});e.push(w);var E=getProInfoByObj("select",{ds_id:"ds_option_fontfamily",ds_pid:VUECFG.ctrlId,ds_labeltxt:"下拉框字体样式",ds_placeholder:"下拉框字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontFamily(),ds_select:"宋体",ds_name:"ds_option_fontfamily",ds_ispro:true,group1:"属性",group2:"组件字体"});e.push(E);var U=getProInfoByObj("switch",{ds_id:"ds_clearable",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"能否清空",ds_name:"ds_clearable",ds_switch:false,ds_ispro:true,ds_switch_change:"disabledClear",group1:"属性",group2:"组件属性"});e.push(U);var G=getProInfoByObj("switch",{ds_id:"ds_filterable",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"能否搜索",ds_name:"ds_filterable",ds_switch_change:"showAllowCreated",ds_switch:true,ds_ispro:true,group1:"属性",group2:"组件属性"});e.push(G);var O=getProInfoByObj("switch",{ds_id:"ds_allow_create",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否可创建选项",ds_name:"ds_allow_create",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});e.push(O);var x=getProInfoByObj("switch",{ds_id:"ds_multiple",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否多选",ds_name:"ds_multiple",ds_switch_change:"disableDsSwitch",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});e.push(x);var P=getProInfoByObj("switch",{ds_id:"ds_isrequired",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否必填",ds_name:"ds_isrequired",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});e.push(P);var S=getProInfoByObj("switch",{ds_id:"ds_disabled",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否禁用",ds_name:"ds_disabled",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});e.push(S);var B=getProInfoByObj("textarea",{ds_id:"ds_select_data",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"自定义数据",ds_placeholder:'[{"value":"0","label":"选项1"},{"value":"1","label":"选项2"}]',ds_textarea:"",ds_name:"ds_select_data",ds_valformat:"JSON",ds_ispro:true,ds_textarea_change:"changeSelectCustomData",group1:"属性",group2:"组件属性"});e.push(B);var D=getProInfoByObj("textarea",{ds_id:"ds_select_ext_data",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"扩展选项",ds_placeholder:'[{"value":"0","label":"选项1"},{"value":"1","label":"选项2"}]',ds_textarea:"[]",ds_name:"ds_select_ext_data",ds_valformat:"JSON",ds_ispro:true,group1:"属性",group2:"组件属性"});e.push(D);var A=getProInfoByObj("input",{ds_id:"ds_title",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"提示内容",ds_placeholder:"提示内容",ds_input:"",ds_name:"ds_title",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"提示信息"});e.push(A);var z=getProInfoByObj("input",{ds_id:"ds_defaultval",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"缺省值",ds_placeholder:"${V.参数,'缺省值'}",ds_input:"",ds_name:"ds_defaultval",ds_ispro:true,group1:"缺省值",group2:""});e.push(z);var T=getProInfoByObj("input",{ds_id:"ds_param",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"推送参数名",ds_placeholder:"控件推送参数名",ds_input:"",ds_name:"ds_param",ds_ispro:true,group1:"参数推送",group2:""});e.push(T);var q=getProInfoByObj("input",{ds_id:"ds_backParamCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"撤销推送条件",ds_placeholder:"推送参数名.A=='a'||推送参数名.A=='b'",ds_input:"",ds_name:"ds_backParamCondition",ds_ispro:true,group1:"参数推送",group2:""});e.push(q);var R=getProInfoByObj("select",{ds_id:"ds_trigger",ds_pid:VUECFG.ctrlId,ds_labeltxt:"触发刷新控件",ds_placeholder:"请选择触发刷新控件",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:[],ds_select_visible_change:"getAllPageCtrl",ds_select:"",ds_name:"ds_trigger",ds_ispro:true,ds_multiple:true,group1:"控件加载",group2:""});e.push(R);var k=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true,group1:"控件加载",group2:""});e.push(k);var L=getProInfoByObj("switch",{ds_id:"ds_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示控件",ds_name:"ds_show",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});e.push(L);var N=getProInfoByObj("input",{ds_id:"ds_showCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",ds_input:"",ds_name:"ds_showCondition",ds_ispro:true,group1:"显示设置",group2:""});e.push(N);var J=getProInfoByObj("switch",{ds_id:"ds_showlable",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示标题",ds_name:"ds_showlable",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});e.push(J);var M=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});e.push(M);var W=getProInfoByObj("jseditor",{ds_id:"ds_select_change",ds_pid:VUECFG.ctrlId,ds_labeltxt:"选项改变事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_select_change",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});e.push(W);var H=getProInfoByObj("jseditor",{ds_id:"ds_select_visible_change",ds_pid:VUECFG.ctrlId,ds_labeltxt:"下拉框状态变更",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:状态(true/false 显示/隐藏)",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_select_visible_change",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});e.push(H);var X=getProInfoByObj("jseditor",{ds_id:"ds_select_remove_tag",ds_pid:VUECFG.ctrlId,ds_labeltxt:"移除选项(多选)",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_select_remove_tag",ds_ispro:true,ds_savedb:false,ds_disabled:false,ds_show:false,group1:"事件",group2:""});e.push(X);var K=getProInfoByObj("jseditor",{ds_id:"ds_select_clear",ds_pid:VUECFG.ctrlId,ds_labeltxt:"清除选项事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}",ds_prepend:"fn(obj){",ds_jseditor_change:"",ds_name:"ds_select_clear",ds_ispro:true,ds_savedb:false,ds_disabled:false,ds_show:false,group1:"事件",group2:""});e.push(K);var Q=getProInfoByObj("jseditor",{ds_id:"ds_select_blur",ds_pid:VUECFG.ctrlId,ds_labeltxt:"失去焦点事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//event:事件对象",ds_prepend:"fn(obj,event){",ds_jseditor_change:"",ds_name:"ds_select_blur",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});e.push(Q);var Y=getProInfoByObj("jseditor",{ds_id:"ds_select_focus",ds_pid:VUECFG.ctrlId,ds_labeltxt:"获得焦点事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//event:事件对象",ds_prepend:"fn(obj,event){",ds_jseditor_change:"",ds_name:"ds_select_focus",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});e.push(Y);var Z=getProInfoByObj("switch",{ds_id:"ds_select_default",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否默认选中第一项",ds_name:"ds_select_default",ds_switch_change:"selectDefault",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});e.push(Z);if(VUECFG.proObj[VUECFG.ctrlId]&&!s){var ss=VUECFG.proObj[VUECFG.ctrlId];for(var es=0;es<e.length;es++){for(var ds=0;ds<ss.length;ds++){if(e[es].info.ds_name==ss[ds].info.ds_name){var d=e[es].type.split("drag_")[1];e[es].info["ds_"+d]=ss[ds].info["ds_"+d];if(!$DS.util.isUndefined(ss[ds].info["ds_show"]))e[es].info["ds_show"]=ss[ds].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(e);VUECFG.proObj[VUECFG.ctrlId]=e;$("#templetePro").click()}function selectDefault(s){debugger;var e=$DS.getCtrlById(s.ds_pid);if(e.info.ds_options.length>0){if(!e.info.ds_select_default){e.info.ds_select=e.info.ds_options[0].label}else e.info.ds_select=""}}function disableDsSwitch(s,e){var d=VUECFG.proObj[s.ds_pid];for(var t=0;t<d.length;t++){if(d[t].info.ds_name=="ds_select"){VUECFG.formObj[s.ds_pid].info.ds_select=null;VUECFG.proObj[s.ds_pid][t].info.ds_input="";VUECFG.proObj[s.ds_pid][t].info.ds_readonly=e}if(VUECFG.proObj[s.ds_pid][t].info.ds_name==="ds_select_remove_tag"){VUECFG.proObj[s.ds_pid][t].info.ds_show=e}}$DS.refPro()}function disabledClear(s,e){$DS.setRightProShow(s.ds_pid,{ds_select_clear:e})}function changeSelectCustomData(s,e){util.tryCatch(function(){e=JSON.parse(e);$DS.getCtrlById(s.ds_pid).info.ds_options=e},function(){e=[]},"JSON格式化错误,请检查值格式是否符合规则!")}function getAllPageCtrl(s,e){var d=[];if(!e)return d;var t=$DS.getCtrlById(s.ds_pid).info;$("#dropArea .ds_ctrl").each(function(){if(this.id!=VUECFG.ctrlId||t.ds_isEchart){var s=$DS.getCtrlById(this.id);d.push({label:s.info.ds_ctrlname,value:this.id})}});s.ds_options=d}function setSelectVal(s,e,d){var t=$DS.getCtrlById(s);var _=getSourceById(VUECFG.groupObj[s]);if(_){if(!e&&t.info.ds_name&&$DS.getSourceData(_,d)){e=$DS.getSourceData(_,d)[t.info.ds_name]}t.info.ds_select=e}else{t.info.ds_select=e?e:""}if(e){var l=getSelectLabelVal(t.info,e);t.info.ds_select_curText=l}else{t.info.ds_select_curText=""}}function getSelectVal(s){var e=$DS.getCtrlById(s);if(!e)console.error("【ID为"+s+"】的控件不存在!");return e.info.ds_select}function clearSelectVal(s){s.info.ds_select=""}function showAllowCreated(s,e){var d=$DS.getCtrlById(s.ds_pid);$DS.setRightProShow(s.ds_pid,{ds_allow_create:e})}