var $slider={type:"drag_slider",dataType:"singeleData",uuid:Date.parse(new Date),getConfig:getSliderConfig,register:registerSlider,showProperty:showPropertySlider,setData:setSliderVal,getData:getSliderVal,clearData:clearSliderVal};function getSliderConfig(){return{ds_id:"",ds_ctrlname:"SLIDER_"+$slider.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"5rem",ds_labelwidth:"10",ds_labelcolor:"#606266",ds_labelfontweight:"bold",ds_labelfontfamily:"微软雅黑",ds_labelfontsize:"1",ds_innerwidth:"calc(100% - 2rem)",ds_style:"drawing-item",ds_datasource:"",ds_name:"",ds_showlable:true,ds_isrequired:false,ds_param:"",ds_backParamCondition:"",ds_trigger:"",ds_loading:"normal",ds_out_padding:"1rem",ds_out_margin:"0rem",ds_ispro:false,ds_pid:"",ds_draggable:"true",ds_defaultval:"",ds_labeltxt:"滑块",ds_slider:0,ds_show_tooltip:true,ds_format_tooltip:null,ds_range:false,ds_vertical:false,ds_min:0,ds_max:100,ds_step:1,ds_show_stops:false,ds_show_input:false,ds_marks:{},ds_disabled:false,ds_title:"",ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_slider_change:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_slider_input:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值"}}function registerSlider(){Vue.component("drag_slider",{props:["type","info"],created:function(){this.$nextTick(function(){addListener(this);if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;VUECFG.$refs[this.info.ds_id]=this})},data:function(){return{hide:"y-hide",refdate:Date.parse(new Date)}},computed:{computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_outerstyle:function(){if(this.info.ds_ispro===true){return{padding:"1rem 0px"}}return{padding:this.info.ds_out_padding,margin:this.info.ds_out_margin}},computed_width:function(){return this.info.ds_showlable?"calc("+this.info.ds_innerwidth+" - "+this.info.ds_labelwidth+"rem)":this.info.ds_innerwidth},computed_height:function(){return this.info.ds_height+"rem"},computed_show:function(){var refdateStr=`${this.refdate}_change`;if(!VUECFG.viewStatu){return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{if(this.info.ds_showCondition){var str=$DS.util.replace(this.info.ds_showCondition);return eval(str)?"y-show":"y-hide"}return this.info.ds_show?"y-show":"y-hide"}},computed_marginleft:function(){return this.info.ds_showlable?this.info.ds_labelwidth+"rem":"0rem"},computed_isrequired:function(){return this.info.ds_isrequired?"ds_isrequired":""},computed_title:function(){return this.info.ds_title},computed_labelstyle:function(){return{width:this.info.ds_labelwidth+"rem",color:this.info.ds_labelcolor,fontWeight:!this.info.ds_ispro?this.info.ds_labelfontweight:"normal",fontFamily:this.info.ds_labelfontfamily,fontSize:this.info.ds_labelfontsize}}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,sliderChange:sliderChange,sliderInput:sliderInput},template:util.getModelHtml("drag_slider")})}function loadSuccess(s,d){var e=this.info;$DS.eval(e.ds_load_success,e)}function sliderChange(s){var d=this.info;$DS.eval(d.ds_slider_change,d,s);$DS.dealPms(d,s);if(d.ds_trigger&&d.ds_trigger.length>0){triggerComps(d.ds_trigger,$DS.getCtrlType(d.ds_id))}if(d.ds_ispro){if(d.ds_pid=="PAGE"){$page.onchage(d,s);return}var e=VUECFG.formObj[d.ds_pid];e.info[d.ds_name]=s;VUECFG.$refs[d.ds_pid].refdate++}else{var r=VUECFG.proObj[VUECFG.ctrlId];for(var t=0;t<r.length;t++){if(r[t].info.ds_name=="ds_slider"){VUECFG.proObj[VUECFG.ctrlId][t].info.ds_input=[s].join("");if(VUECFG.proArr[t]&&VUECFG.proArr[t].info)VUECFG.proArr[t].info.ds_input=[s].join("")}}}}function sliderInput(s){var d=this.info;$DS.eval(d.ds_slider_input,d,s);if(d.ds_ispro){if(d.ds_pid=="PAGE"){$page.onchage(d,s);return}var e=VUECFG.formObj[d.ds_pid];e.info[d.ds_name]=s;VUECFG.$refs[d.ds_pid].refdate++}else{var r=VUECFG.proObj[d.ds_id];for(var t=0;t<r.length;t++){if(r[t].info.ds_name=="ds_slider"){if(VUECFG.proObj[VUECFG.ctrlId])VUECFG.proObj[VUECFG.ctrlId][t].info.ds_input=[s].join("");if(VUECFG.proArr[t]&&VUECFG.proArr[t].info)VUECFG.proArr[t].info.ds_input=[s].join("")}}}}function showPropertySlider(s){var d=[];var e=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$slider.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});d.push(e);var r=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true});d.push(r);var t=getProInfoByObj("input",{ds_id:"ds_labeltxt",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题",ds_placeholder:"标题",ds_input:"滑块",ds_name:"ds_labeltxt",ds_ispro:true});d.push(t);var _=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true,ds_isrequired:false});d.push(_);var l=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"5rem",ds_name:"ds_height",ds_ispro:true});d.push(l);var i=getProInfoByObj("input",{ds_id:"ds_slider",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认值",ds_placeholder:"默认值",ds_input:"",ds_valformat:"NUMBER",ds_name:"ds_slider",ds_ispro:true});d.push(i);var a=getProInfoByObj("select",{ds_id:"ds_datasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据源",ds_placeholder:"数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_datasource",ds_ispro:true,group1:"数据源",group2:""});d.push(a);var o=getProInfoByObj("select",{ds_id:"ds_name",ds_pid:VUECFG.ctrlId,ds_labeltxt:"字段名",ds_placeholder:"字段名",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_change:"changeFieldNameForCtrl",ds_select_visible_change:"changeFieldOption",ds_name:"ds_name",ds_ispro:true,group1:"数据源",group2:""});d.push(o);var n=getProInfoByObj("input",{ds_id:"ds_innerwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"组件宽度",ds_placeholder:"组件宽度",ds_input:"calc(100% - 2rem)",ds_name:"ds_innerwidth",ds_ispro:true,group1:"属性",group2:"组件布局"});d.push(n);var p=getProInfoByObj("input",{ds_id:"ds_out_padding",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"内边距大小",ds_placeholder:"内边距大小",ds_input:"1rem",ds_name:"ds_out_padding",ds_ispro:true,group1:"属性",group2:"组件布局"});d.push(p);var u=getProInfoByObj("input",{ds_id:"ds_out_margin",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外边距大小",ds_placeholder:"外边距大小",ds_input:"0rem",ds_name:"ds_out_margin",ds_ispro:true,group1:"属性",group2:"组件布局"});d.push(u);var g=getProInfoByObj("input",{ds_id:"ds_labelwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题宽度",ds_placeholder:"标题宽度",ds_input:"10",ds_name:"ds_labelwidth",ds_ispro:true,ds_append:"rem",group1:"属性",group2:"标题样式"});d.push(g);var f=getProInfoByObj("color",{ds_id:"ds_labelcolor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题颜色",ds_name:"ds_labelcolor",ds_ispro:true,ds_show_alpha:true,ds_color:"#606266",group1:"属性",group2:"标题样式"});d.push(f);var c=getProInfoByObj("select",{ds_id:"ds_labelfontweight",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体加粗",ds_placeholder:"标题字体加粗",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontWeight(),ds_select:"bold",ds_name:"ds_labelfontweight",ds_ispro:true,group1:"属性",group2:"标题样式"});d.push(c);var h=getProInfoByObj("select",{ds_id:"ds_labelfontfamily",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体样式",ds_placeholder:"标题字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontFamily(),ds_select:"微软雅黑",ds_name:"ds_labelfontfamily",ds_ispro:true,group1:"属性",group2:"标题样式"});d.push(h);var b=getProInfoByObj("input",{ds_id:"s_labelfontsize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题字体大小",ds_placeholder:"标题字体大小",ds_input:"1rem",ds_name:"ds_labelfontsize",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"标题样式"});d.push(b);var m=getProInfoByObj("inputnumber",{ds_id:"ds_min",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"最小值",ds_placeholder:"最小值",ds_inputnumber:0,ds_name:"ds_min",ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(m);var y=getProInfoByObj("inputnumber",{ds_id:"ds_max",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"最大值",ds_placeholder:"最大值",ds_inputnumber:100,ds_name:"ds_max",ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(y);var C=getProInfoByObj("inputnumber",{ds_id:"ds_step",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"步长",ds_placeholder:"步长",ds_inputnumber:1,ds_min:1,ds_name:"ds_step",ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(C);var I=getProInfoByObj("switch",{ds_id:"ds_show_stops",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示间断点",ds_name:"ds_show_stops",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(I);var v=getProInfoByObj("switch",{ds_id:"ds_show_tooltip",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"开启提示",ds_name:"ds_show_tooltip",ds_switch:true,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(v);var F=getProInfoByObj("switch",{ds_id:"ds_show_input",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示输入框",ds_name:"ds_show_input",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(F);var V=getProInfoByObj("switch",{ds_id:"ds_range",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"范围选择",ds_switch_change:"changeSliderArr",ds_name:"ds_range",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(V);var E=getProInfoByObj("switch",{ds_id:"ds_disabled",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否禁用",ds_name:"ds_disabled",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(E);var G=getProInfoByObj("switch",{ds_id:"ds_isrequired",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否必填",ds_name:"ds_isrequired",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(G);var U=getProInfoByObj("input",{ds_id:"ds_title",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"提示内容",ds_placeholder:"提示内容",ds_input:"",ds_name:"ds_title",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"提示信息"});d.push(U);var j=getProInfoByObj("input",{ds_id:"ds_defaultval",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"缺省值",ds_placeholder:"${V.参数,'缺省值'}",ds_input:"",ds_name:"ds_defaultval",ds_ispro:true,group1:"缺省值",group2:""});d.push(j);var w=getProInfoByObj("input",{ds_id:"ds_param",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"推送参数名",ds_placeholder:"控件推送参数名",ds_input:"",ds_name:"ds_param",ds_ispro:true,group1:"参数推送",group2:""});d.push(w);var O=getProInfoByObj("input",{ds_id:"ds_backParamCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"撤销推送条件",ds_placeholder:"推送参数名.A=='a'||推送参数名.A=='b'",ds_input:"",ds_name:"ds_backParamCondition",ds_ispro:true,group1:"参数推送",group2:""});d.push(O);var P=getProInfoByObj("select",{ds_id:"ds_trigger",ds_pid:VUECFG.ctrlId,ds_labeltxt:"触发刷新控件",ds_placeholder:"请选择触发刷新控件",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:[],ds_select_visible_change:"getAllPageCtrl",ds_select:"",ds_name:"ds_trigger",ds_ispro:true,ds_multiple:true,group1:"控件加载",group2:""});d.push(P);var x=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true,group1:"控件加载",group2:""});d.push(x);var B=getProInfoByObj("switch",{ds_id:"ds_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示控件",ds_name:"ds_show",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});d.push(B);var S=getProInfoByObj("input",{ds_id:"ds_showCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",ds_input:"",ds_name:"ds_showCondition",ds_ispro:true,group1:"显示设置",group2:""});d.push(S);var D=getProInfoByObj("switch",{ds_id:"ds_showlable",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示标题",ds_name:"ds_showlable",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});d.push(D);var A=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});d.push(A);var q=getProInfoByObj("jseditor",{ds_id:"ds_slider_change",ds_pid:VUECFG.ctrlId,ds_labeltxt:"松开滑块触发",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_slider_change",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});d.push(q);var k=getProInfoByObj("jseditor",{ds_id:"ds_slider_input",ds_pid:VUECFG.ctrlId,ds_labeltxt:"拖拽滑块触发",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_slider_input",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});d.push(k);if(VUECFG.proObj[VUECFG.ctrlId]&&!s){var z=VUECFG.proObj[VUECFG.ctrlId];for(var L=0;L<d.length;L++){for(var M=0;M<z.length;M++){if(d[L].info.ds_name==z[M].info.ds_name){var e=d[L].type.split("drag_")[1];d[L].info["ds_"+e]=z[M].info["ds_"+e];if(!$DS.util.isUndefined(z[M].info["ds_show"]))d[L].info["ds_show"]=z[M].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(d);VUECFG.proObj[VUECFG.ctrlId]=d;$("#templetePro").click()}function changeSliderArr(s,d){var e=VUECFG.ctrlId;var r=VUECFG.formObj[e].info.ds_slider;var t=VUECFG.formObj[e].info.ds_max;if(s){VUECFG.formObj[e].info.ds_slider=[r,t]}else{VUECFG.formObj[e].info.ds_slider=r[0]}var _=VUECFG.proObj[e];for(var l=0;l<_.length;l++){if(_[l].info.ds_name=="ds_slider"){_[l].info.ds_input=[VUECFG.formObj[e].info.ds_slider].join("")}if(_[l].info.ds_name=="ds_range"){_[l].info.ds_input=s}}}function setSliderVal(s,d,e){var r=$DS.getCtrlById(s);var t=getSourceById(VUECFG.groupObj[s]);if(t){if(!d&&r.info.ds_name&&$DS.getSourceData(t,e)){d=$DS.getSourceData(t,e)[r.info.ds_name]}r.info.ds_slider=d}else{r.info.ds_slider=d?d:""}}function getSliderVal(s){var d=$DS.getCtrlById(s);if(!d)console.error("【ID为"+s+"】的控件不存在!");return d.info.ds_slider}function clearSliderVal(s){s.info.ds_slider=0}