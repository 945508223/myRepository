var $htmleditor={type:"drag_htmleditor",dataType:"singeleData",uuid:Date.parse(new Date),getConfig:getHtmlEditorConfig,register:registerHtmlEditor,showProperty:showPropertyHtmlEditor,setData:setHtmlEditorVal,getData:getHtmlEditorVal,clearData:clearHtmlEditorVal};function getHtmlEditorConfig(){return{ds_id:"",ds_ctrlname:"HTMLEDITOR"+$htmleditor.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"5rem",ds_labelwidth:"10",ds_labelcolor:"#606266",ds_labelfontweight:"bold",ds_labelfontfamily:"微软雅黑",ds_labelfontsize:"1",ds_innerwidth:"calc(100% - 2rem)",ds_style:"drawing-item",ds_name:"",ds_datasource:"",ds_showlable:true,ds_isrequired:false,ds_param:"",ds_backParamCondition:"",ds_trigger:"",ds_loading:"normal",ds_out_padding:"1rem",ds_out_margin:"0rem",ds_ispro:false,ds_pid:"",ds_draggable:"true",ds_defaultval:"",ds_labeltxt:"HTML编辑器",ds_placeholder:"请点击编辑HTML",ds_htmleditor:"",ds_prepend:"",ds_append:"",ds_maxlength:"",ds_theme:"idea",ds_clearable:false,ds_readonly:true,ds_disabled:false,ds_title:"",ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_htmleditor_change:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值"}}function registerHtmlEditor(){Vue.component("drag_htmleditor",{props:["type","info"],created:function(){this.$nextTick(function(){addListener(this);if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;VUECFG.$refs[this.info.ds_id]=this})},data:function(){return{hide:"y-hide",refdate:Date.parse(new Date)}},computed:{computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_outerstyle:function(){if(this.info.ds_ispro===true){return{padding:"1rem 0px"}}return{padding:this.info.ds_out_padding,margin:this.info.ds_out_margin}},computed_width:function(){return this.info.ds_showlable?"calc("+this.info.ds_innerwidth+" - "+this.info.ds_labelwidth+"rem)":this.info.ds_innerwidth},computed_show:function(){var refdateStr=`${this.refdate}_change`;if(!VUECFG.viewStatu){return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{if(this.info.ds_showCondition){var str=$DS.util.replace(this.info.ds_showCondition);return eval(str)?"y-show":"y-hide"}return this.info.ds_show?"y-show":"y-hide"}},computed_marginleft:function(){return this.info.ds_showlable?this.info.ds_labelwidth+"rem":"0rem"},computed_isrequired:function(){return this.info.ds_isrequired?"ds_isrequired":""},computed_title:function(){return this.info.ds_title},computed_labelstyle:function(){return{width:this.info.ds_labelwidth+"rem",color:this.info.ds_labelcolor,fontWeight:!this.info.ds_ispro?this.info.ds_labelfontweight:"normal",fontFamily:this.info.ds_labelfontfamily,fontSize:this.info.ds_labelfontsize}}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,htmlEditorChange:htmlEditorChange,showHtmlEditor:showHtmlEditor},template:util.getModelHtml("drag_htmleditor")})}function loadSuccess(d,s){var e=this.info;$DS.eval(e.ds_load_success,e)}function htmlEditorChange(d){var s=this.info;$DS.eval(s.ds_htmleditor_change,s,null);$DS.dealPms(s,d);if(s.ds_trigger&&s.ds_trigger.length>0){triggerComps(s.ds_trigger,$DS.getCtrlType(s.ds_id))}if(s.ds_ispro){if(s.ds_pid=="PAGE"){$page.onchage(s,d);return}var e=VUECFG.formObj[s.ds_pid];e.info[s.ds_name]=d;VUECFG.$refs[s.ds_pid].refdate++}else{var t=VUECFG.proObj[VUECFG.ctrlId];for(var r=0;r<t.length;r++){if(t[r].info.ds_name=="ds_htmleditor"){VUECFG.proObj[VUECFG.ctrlId][r].info.ds_input=[d].join("");if(VUECFG.proArr[r]&&VUECFG.proArr[r].info)VUECFG.proArr[r].info.ds_input=[d].join("")}}}}function showPropertyHtmlEditor(d){var s=[];var e=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$htmleditor.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});s.push(e);var t=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true});s.push(t);var r=getProInfoByObj("input",{ds_id:"ds_labeltxt",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题",ds_placeholder:"标题",ds_input:"HTML编辑器",ds_name:"ds_labeltxt",ds_ispro:true});s.push(r);var l=getProInfoByObj("input",{ds_id:"ds_placeholder",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"占位提示",ds_placeholder:"占位提示",ds_input:"请点击编辑HTML",ds_name:"ds_placeholder",ds_ispro:true});s.push(l);var i=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true,ds_isrequired:false,group1:"",group2:""});s.push(i);var a=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"5rem",ds_name:"ds_height",ds_ispro:true});s.push(a);var _=getProInfoByObj("input",{ds_id:"ds_htmleditor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认值",ds_placeholder:"默认值",ds_input:"",ds_name:"ds_htmleditor",ds_ispro:true});s.push(_);var o=getProInfoByObj("select",{ds_id:"ds_datasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据源",ds_placeholder:"数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_datasource",ds_ispro:true,group1:"数据源",group2:""});s.push(o);var n=getProInfoByObj("select",{ds_id:"ds_name",ds_pid:VUECFG.ctrlId,ds_labeltxt:"字段名",ds_placeholder:"字段名",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_change:"changeFieldNameForCtrl",ds_select_visible_change:"changeFieldOption",ds_name:"ds_name",ds_ispro:true,group1:"数据源",group2:""});s.push(n);var p=getProInfoByObj("input",{ds_id:"ds_innerwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"组件宽度",ds_placeholder:"组件宽度",ds_input:"calc(100% - 2rem)",ds_name:"ds_innerwidth",ds_ispro:true,group1:"属性",group2:"组件布局"});s.push(p);var g=getProInfoByObj("input",{ds_id:"ds_out_padding",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"内边距大小",ds_placeholder:"内边距大小",ds_input:"1rem",ds_name:"ds_out_padding",ds_ispro:true,group1:"属性",group2:"组件布局"});s.push(g);var u=getProInfoByObj("input",{ds_id:"ds_out_margin",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外边距大小",ds_placeholder:"外边距大小",ds_input:"0rem",ds_name:"ds_out_margin",ds_ispro:true,group1:"属性",group2:"组件布局"});s.push(u);var h=getProInfoByObj("input",{ds_id:"ds_labelwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题宽度",ds_placeholder:"标题宽度",ds_input:"10",ds_name:"ds_labelwidth",ds_ispro:true,ds_append:"rem",group1:"属性",group2:"标题样式"});s.push(h);var c=getProInfoByObj("color",{ds_id:"ds_labelcolor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题颜色",ds_name:"ds_labelcolor",ds_ispro:true,ds_show_alpha:true,ds_color:"#606266",group1:"属性",group2:"标题样式"});s.push(c);var f=getProInfoByObj("select",{ds_id:"ds_labelfontweight",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体加粗",ds_placeholder:"标题字体加粗",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontWeight(),ds_select:"bold",ds_name:"ds_labelfontweight",ds_ispro:true,group1:"属性",group2:"标题样式"});s.push(f);var m=getProInfoByObj("select",{ds_id:"ds_labelfontfamily",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体样式",ds_placeholder:"标题字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontFamily(),ds_select:"微软雅黑",ds_name:"ds_labelfontfamily",ds_ispro:true,group1:"属性",group2:"标题样式"});s.push(m);var b=getProInfoByObj("input",{ds_id:"s_labelfontsize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标签题字体大小",ds_placeholder:"标题字体大小",ds_input:"1rem",ds_name:"ds_labelfontsize",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"标题样式"});s.push(b);var y=getProInfoByObj("select",{ds_id:"ds_theme",ds_pid:VUECFG.ctrlId,ds_labeltxt:"编辑器皮肤",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[],ds_select:"idea",ds_name:"ds_theme",ds_select_visible_change:"getThemes",ds_ispro:true,group1:"属性",group2:"组件样式"});s.push(y);var C=getProInfoByObj("input",{ds_id:"ds_prepend",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"前缀",ds_placeholder:"前缀",ds_input:"",ds_name:"ds_prepend",ds_ispro:true,group1:"属性",group2:"组件属性"});s.push(C);var v=getProInfoByObj("input",{ds_id:"ds_append",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"后缀",ds_placeholder:"后缀",ds_input:"",ds_name:"ds_append",ds_ispro:true,group1:"属性",group2:"组件属性"});s.push(v);var I=getProInfoByObj("input",{ds_id:"ds_maxlength",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"最多输入",ds_placeholder:"最多输入",ds_input:"",ds_name:"ds_maxlength",ds_ispro:true,ds_append:"个字符",group1:"属性",group2:"组件属性"});s.push(I);var E=getProInfoByObj("switch",{ds_id:"ds_disabled",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否禁用",ds_name:"ds_disabled",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});s.push(E);var F=getProInfoByObj("switch",{ds_id:"ds_isrequired",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否必填",ds_name:"ds_isrequired",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});s.push(F);var w=getProInfoByObj("input",{ds_id:"ds_title",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"提示内容",ds_placeholder:"提示内容",ds_input:"",ds_name:"ds_title",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"提示信息"});s.push(w);var V=getProInfoByObj("input",{ds_id:"ds_defaultval",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"缺省值",ds_placeholder:"${V.参数,'缺省值'}",ds_input:"",ds_name:"ds_defaultval",ds_ispro:true,group1:"缺省值",group2:""});s.push(V);var j=getProInfoByObj("input",{ds_id:"ds_param",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"推送参数名",ds_placeholder:"控件推送参数名",ds_input:"",ds_name:"ds_param",ds_ispro:true,group1:"参数推送",group2:""});s.push(j);var G=getProInfoByObj("input",{ds_id:"ds_backParamCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"撤销推送条件",ds_placeholder:"推送参数名.A=='a'||推送参数名.A=='b'",ds_input:"",ds_name:"ds_backParamCondition",ds_ispro:true,group1:"参数推送",group2:""});s.push(G);var U=getProInfoByObj("select",{ds_id:"ds_trigger",ds_pid:VUECFG.ctrlId,ds_labeltxt:"触发刷新控件",ds_placeholder:"请选择触发刷新控件",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:[],ds_select_visible_change:"getAllPageCtrl",ds_select:"",ds_name:"ds_trigger",ds_ispro:true,ds_multiple:true,group1:"控件加载",group2:""});s.push(U);var x=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true,group1:"控件加载",group2:""});s.push(x);var O=getProInfoByObj("switch",{ds_id:"ds_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示控件",ds_name:"ds_show",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});s.push(O);var P=getProInfoByObj("input",{ds_id:"ds_showCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",ds_input:"",ds_name:"ds_showCondition",ds_ispro:true,group1:"显示设置",group2:""});s.push(P);var B=getProInfoByObj("switch",{ds_id:"ds_showlable",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示标题",ds_name:"ds_showlable",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});s.push(B);var D=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(D);var H=getProInfoByObj("jseditor",{ds_id:"ds_htmleditor_change",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"脚本变更事件",ds_name:"ds_htmleditor_change",ds_prepend:"fn(obj,val){",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_switch:false,ds_ispro:true,group1:"事件",group2:""});s.push(H);if(VUECFG.proObj[VUECFG.ctrlId]&&!d){var k=VUECFG.proObj[VUECFG.ctrlId];for(var S=0;S<s.length;S++){for(var A=0;A<k.length;A++){if(s[S].info.ds_name==k[A].info.ds_name){var e=s[S].type.split("drag_")[1];s[S].info["ds_"+e]=k[A].info["ds_"+e];if(!$DS.util.isUndefined(k[A].info["ds_show"]))s[S].info["ds_show"]=k[A].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(s);VUECFG.proObj[VUECFG.ctrlId]=s;$("#templetePro").click()}function showHtmlEditor(){var d=this.info;if(!this.info.ds_ispro){changeCurrId({currentTarget:$(`#${d.ds_id}`)[0],id:d.ds_id})}var s=this.info.ds_id;var e="ds_htmleditor";var t="false";if(this.info.ds_pid){s=this.info.ds_pid;e=this.info.ds_name;t="true"}showMyDialog("编辑HTML","95%","95%",getProjectName()+"/freeForm/js/editor/online_editor/htmlEditor.jsp?ds_id="+s+"&ds_name="+e+"&ispro="+t,function(){})}var themeArr=["default","3024-day","3024-night","abcdef","ambiance","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","lesser-dark","liquibyte","lucario","material","mbo","mdn-like","midnight","monokai","neat","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized dark","solarized light","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"];function getThemes(d,s){var e=[];for(let d=0;d<themeArr.length;d++){var t={};t["value"]=themeArr[d];t["label"]=themeArr[d];e.push(t)}d.ds_options=e}function setHtmlEditorVal(d,s,e){var t=$DS.getCtrlById(d);var r=getSourceById(VUECFG.groupObj[d]);if(r){if(!s&&t.info.ds_name&&$DS.getSourceData(r,e)){s=$DS.getSourceData(r,e)[t.info.ds_name]}t.info.ds_htmleditor=s}else{t.info.ds_htmleditor=s?s:""}}function getHtmlEditorVal(d){var s=$DS.getCtrlById(d);if(!s)console.error("【ID为"+d+"】的控件不存在!");return s.info.ds_htmleditor}function clearHtmlEditorVal(d){d.info.ds_htmleditor=""}