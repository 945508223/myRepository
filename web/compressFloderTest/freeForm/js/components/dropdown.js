var $dropdown={type:"drag_dropdown",dataType:"singeleData",uuid:Date.parse(new Date),getConfig:getDropdownConfig,register:registerDropdown,showProperty:showPropertyDropdown};function getDropdownConfig(){return{ds_id:"",ds_ctrlname:"DROPDOWN_"+$dropdown.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"5rem",ds_labelwidth:"10",ds_labelcolor:"#606266",ds_labelfontweight:"bold",ds_labelfontfamily:"微软雅黑",ds_labelfontsize:"1",ds_innerwidth:"calc(100% - 0rem)",ds_style:"drawing-item",ds_datasource:"",ds_name:"",ds_showlable:false,ds_isrequired:false,ds_param:"",ds_backParamCondition:"",ds_trigger:"",ds_loading:"normal",ds_out_margin:"0rem",ds_in_padding:"0.5rem 1rem",ds_ispro:false,ds_pid:"",ds_draggable:"true",ds_dropdown:"下拉菜单",ds_dropdown_size:"medium",ds_dropdown_disabled:false,ds_dropdown_trigger:"click",ds_dropdown_isNotHide:true,ds_dropdown_background_color:"",ds_dropdown_height:"100%",ds_dropdown_fontsize:"1rem",ds_dropdown_fontweight:"normal",ds_dropdown_fontfamily:"微软雅黑",ds_dropdown_color:"white",ds_dropdown_icon:"el-icon-search",ds_dropdown_content:[{command:"1",item_text:"内容1",isNotDisabled:false,isNotDivided:false,icon:"",URL:"",title:"",width:"",height:""},{command:"2",item_text:"内容2",isNotDisabled:false,isNotDivided:false,icon:"",URL:"",title:"",width:"",height:""}],ds_dropdown_borderwidth:"0px",ds_dropdown_bordercolor:"rgba(204, 204, 204, 1)",ds_dropdown_borderstyle:"solid",ds_dropdown_horizontally:"center",ds_dropdown_vertically:"center",ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_dropdown_click:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}",ds_dropdown_command:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称//val:{command:子内容的command属性}",ds_dropdown_change:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}"}}function registerDropdown(){Vue.component("drag_dropdown",{props:["type","info"],created:function(){this.$nextTick(function(){addListener(this);if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;VUECFG.$refs[this.info.ds_id]=this})},data:function(){return{hide:"y-hide",refdate:Date.parse(new Date)}},computed:{computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_flex:function(){var d={display:"flex",webkitDisplay:"flex",justifyContent:this.info.ds_dropdown_horizontally,alignItems:this.info.ds_dropdown_vertically};return d},computed_show:function(){var refdateStr=`${this.refdate}_change`;if(!VUECFG.viewStatu){return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{if(this.info.ds_showCondition){var str=$DS.util.replace(this.info.ds_showCondition);return eval(str)?"y-show":"y-hide"}return this.info.ds_show?"y-show":"y-hide"}},computed_marginleft:function(){if(this.info.ds_labelwidth=="0"){return{marginLeft:"1rem"}}return{marginLeft:this.info.ds_showlable?this.info.ds_labelwidth+"rem":"0rem"}},computed_isrequired:function(){return this.info.ds_isrequired?"ds_isrequired":""},computed_outerstyle:function(){var d=0;if(this.info.ds_labelwidth=="0"){d="calc("+this.info.ds_innerwidth+" - 1rem)"}else{d=this.info.ds_showlable?"calc("+this.info.ds_innerwidth+" - "+this.info.ds_labelwidth+"rem)":this.info.ds_innerwidth}var s={width:d,height:this.info.ds_height,lineHeight:this.info.ds_height,zIndex:this.info.ds_dropdown_zIndex,margin:this.info.ds_out_margin};return s},computed_style:function(){return{backgroundColor:this.info.ds_dropdown_background_color,height:this.info.ds_dropdown_height,fontSize:this.info.ds_dropdown_fontsize,fontWeight:this.info.ds_dropdown_fontweight,fontFamily:this.info.ds_dropdown_fontfamily,color:this.info.ds_dropdown_color,borderWidth:this.info.ds_dropdown_borderwidth,borderColor:this.info.ds_dropdown_bordercolor,borderStyle:this.info.ds_dropdown_borderstyle}},computed_item_data:function(){debugger;return this.info.ds_dropdown_content},computed_labelstyle:function(){return{width:this.info.ds_labelwidth+"rem",color:this.info.ds_labelcolor,fontWeight:!this.info.ds_ispro?this.info.ds_labelfontweight:"normal",fontFamily:this.info.ds_labelfontfamily,fontSize:this.info.ds_labelfontsize}}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,computed_process_data:computed_process_data,dropdownClick:dropdownClick,dropdownChange:dropdownChange,handleCommand:handleCommand},template:util.getModelHtml("drag_dropdown")})}function showPropertyDropdown(d){var s=[];var e=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$dropdown.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});s.push(e);var o=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true,ds_drag:false});s.push(o);var t=getProInfoByObj("input",{ds_id:"ds_dropdown",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉菜单名称",ds_placeholder:"下拉菜单名称",ds_input:"下拉菜单",ds_name:"ds_dropdown",ds_ispro:true});s.push(t);var r=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true,ds_isrequired:false,group1:"",group2:""});s.push(r);var i=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"5rem",ds_name:"ds_height",ds_ispro:true});s.push(i);var _=getProInfoByObj("input",{ds_id:"ds_dropdown_content",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉内容配置",ds_placeholder:"下拉内容配置",ds_input:[{command:"1",item_text:"内容1",URL:"",title:"",width:"",height:""},{command:"2",item_text:"内容2",URL:"",title:"",width:"",height:""}],ds_name:"ds_dropdown_content",ds_readonly:true,ds_input_focus:"dropdownCfg",ds_valformat:"JSON",ds_ispro:true,group1:"属性",group2:"下拉内容配置"});s.push(_);var l=getProInfoByObj("input",{ds_id:"ds_dropdown_icon",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"图标类名",ds_placeholder:"请输入图标类名",ds_input:"el-icon-search",ds_append:"选择",ds_input_appendclick:"clickChooseIcon",ds_name:"ds_dropdown_icon",ds_ispro:true,group1:"属性",group2:"组件样式"});s.push(l);var n=getProInfoByObj("radio",{ds_id:"ds_dropdown_size",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉菜单尺寸",ds_name:"ds_dropdown_size",ds_radio:"medium",ds_options:[{value:"medium",text:"中等"},{value:"small",text:"较小"},{value:"mini",text:"迷你"}],ds_radiobtn:true,ds_ispro:true,group1:"属性",group2:"组件样式"});s.push(n);var a=getProInfoByObj("radio",{ds_id:"ds_dropdown_trigger",ds_pid:VUECFG.ctrlId,ds_draggable:false,ds_style:"ds-mt-1",ds_labeltxt:"触发方式",ds_name:"ds_dropdown_trigger",ds_radio:"click",ds_options:[{value:"click",text:"click"},{value:"hover",text:"hover"}],ds_radiobtn:false,ds_ispro:true,group1:"属性",group2:"组件样式"});s.push(a);var p=getProInfoByObj("color",{ds_id:"ds_dropdown_background_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉框背景颜色",ds_name:"ds_dropdown_background_color",ds_ispro:true,ds_show_alpha:true,ds_color:"rgb(64, 158, 255)",group1:"属性",group2:"组件样式"});s.push(p);var u=getProInfoByObj("input",{ds_id:"ds_dropdown_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉框高度",ds_placeholder:"",ds_input:"100%",ds_name:"ds_dropdown_height",ds_ispro:true,group1:"属性",group2:"组件样式"});s.push(u);var c=getProInfoByObj("select",{ds_id:"ds_dropdown_fontfamily",ds_pid:VUECFG.ctrlId,ds_labeltxt:"下拉框字体样式",ds_placeholder:"下拉框字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontFamily(),ds_select:"微软雅黑",ds_name:"ds_dropdown_fontfamily",ds_ispro:true,group1:"属性",group2:"组件字体"});s.push(c);var g=getProInfoByObj("color",{ds_id:"ds_dropdown_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉框字体颜色",ds_name:"ds_dropdown_color",ds_ispro:true,ds_show_alpha:true,ds_color:"#FFF",group1:"属性",group2:"组件字体"});s.push(g);var h=getProInfoByObj("input",{ds_id:"ds_dropdown_fontsize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"下拉框字体大小",ds_placeholder:"",ds_input:"1rem",ds_name:"ds_dropdown_fontsize",ds_ispro:true,group1:"属性",group2:"组件字体"});s.push(h);var f=getProInfoByObj("select",{ds_id:"ds_dropdown_fontweight",ds_pid:VUECFG.ctrlId,ds_labeltxt:"下拉框字体粗细",ds_placeholder:"下拉框字体粗细",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontWeight(),ds_select:"normal",ds_name:"ds_dropdown_fontweight",ds_ispro:true,group1:"属性",group2:"组件字体"});s.push(f);var m=getProInfoByObj("input",{ds_id:"ds_dropdown_borderwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"边框宽度",ds_placeholder:"",ds_input:"0rem",ds_name:"ds_dropdown_borderwidth",ds_ispro:true,group1:"属性",group2:"边框"});s.push(m);var w=getProInfoByObj("radio",{ds_id:"ds_dropdown_borderstyle",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"边框类型",ds_name:"ds_dropdown_borderstyle",ds_radio:"solid",ds_options:[{value:"dashed",text:"虚线"},{value:"solid",text:"实线"},{value:"dotted",text:"点"}],ds_radiobtn:true,ds_ispro:true,group1:"属性",group2:"边框"});s.push(w);var b=getProInfoByObj("color",{ds_id:"ds_dropdown_bordercolor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"边框颜色",ds_name:"ds_dropdown_bordercolor",ds_ispro:true,ds_show_alpha:true,ds_color:"#CCC",group1:"属性",group2:"边框"});s.push(b);var y=getProInfoByObj("switch",{ds_id:"ds_dropdown_isNotHide",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否关闭下拉菜单",ds_name:"ds_dropdown_isNotHide",ds_switch:false,ds_active_value:true,ds_inactive_value:false,ds_ispro:true,group1:"属性",group2:"组件样式"});s.push(y);var v=getProInfoByObj("switch",{ds_id:"ds_dropdown_disabled",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否禁用",ds_name:"ds_dropdown_disabled",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});s.push(v);var C=getProInfoByObj("select",{ds_id:"ds_trigger",ds_pid:VUECFG.ctrlId,ds_labeltxt:"触发刷新控件",ds_placeholder:"请选择触发刷新控件",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:[],ds_select_visible_change:"getAllPageCtrl",ds_select:"",ds_name:"ds_trigger",ds_ispro:true,ds_multiple:true,group1:"控件加载",group2:""});s.push(C);var I=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true,group1:"控件加载",group2:""});s.push(I);var j=getProInfoByObj("switch",{ds_id:"ds_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示控件",ds_name:"ds_show",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});s.push(j);var x=getProInfoByObj("input",{ds_id:"ds_showCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",ds_input:"",ds_name:"ds_showCondition",ds_ispro:true,group1:"显示设置",group2:""});s.push(x);var F=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(F);var U=getProInfoByObj("jseditor",{ds_id:"ds_dropdown_command",ds_pid:VUECFG.ctrlId,ds_labeltxt:"下拉内容点击事件",ds_placeholder:"脚本编辑",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称//val:{command:子内容的command属性}",ds_prepend:"fn(obj){",ds_jseditor_change:"",ds_name:"ds_dropdown_command",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(U);var V=getProInfoByObj("jseditor",{ds_id:"ds_dropdown_click",ds_pid:VUECFG.ctrlId,ds_labeltxt:"下拉菜单点击事件",ds_placeholder:"脚本编辑",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}",ds_prepend:"fn(obj){",ds_jseditor_change:"",ds_name:"ds_dropdown_click",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(V);var E=getProInfoByObj("jseditor",{ds_id:"ds_dropdown_change",ds_pid:VUECFG.ctrlId,ds_labeltxt:"下拉菜单隐藏显示改变事件",ds_placeholder:"脚本编辑",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}",ds_prepend:"fn(obj){",ds_jseditor_change:"",ds_name:"ds_dropdown_change",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(E);if(VUECFG.proObj[VUECFG.ctrlId]&&!d){var G=VUECFG.proObj[VUECFG.ctrlId];for(var O=0;O<s.length;O++){for(var P=0;P<G.length;P++){if(s[O].info.ds_name==G[P].info.ds_name){var e=s[O].type.split("drag_")[1];s[O].info["ds_"+e]=G[P].info["ds_"+e];if(!$DS.util.isUndefined(G[P].info["ds_show"]))s[O].info["ds_show"]=G[P].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(s);VUECFG.proObj[VUECFG.ctrlId]=s;$("#templetePro").click()}function dropdownCfg(d,s){var e=d.ds_input;if(e&&e.length>0){var o=new Base64;for(let d=0;d<e.length;d++){if(e[d].content&&isBase64Code(e[d].content)){e[d].content=o.decode(e[d].content)}}}$DS.openCfgTable([{field:"command",title:"指令",width:.124,edit:"text"},{field:"item_text",title:"下拉内容",width:.124,edit:"text",defaultval:"内容N"},{field:"isNotDisabled",title:"是否禁用",width:.124,codeType:"switch",code:[{name:"禁用",value:false},{name:"不禁用",value:true}],defaultval:false},{field:"isNotDivided",title:"是否分隔",width:.124,codeType:"switch",code:[{name:"分隔",value:false},{name:"不分隔",value:true}],defaultval:false},{field:"icon",title:"图标",width:.165,edit:"text",codeType:"icon"},{field:"URL",title:"路径",width:.124,edit:"text"},{field:"title",title:"标题",width:.124,edit:"text"},{field:"width",title:"宽",width:.124,edit:"text"},{field:"height",title:"高",width:.124,edit:"text"}],e,function(s,e){s=JSON.parse(s);$DS.getCtrlById(d.ds_pid).info.ds_dropdown_content=s;d.ds_input=s},"95%","80%","下拉菜单内容配置",{id:d.ds_pid})}function loadSuccess(d,s){var e=this.info;$DS.eval(e.ds_load_success,e)}function handleCommand(d){debugger;console.log("dropdown点击了"+d);var s={};var e=this.info.ds_dropdown_content;for(let d=0;d<e.length;d++){s[e[d]["command"]]=e[d]}if(s[d]["URL"]){$DS.showPage($DS.util.replace(s[d]["URL"]),$DS.util.replace(s[d]["title"]||"标题"),s[d]["width"]||"80%",s[d]["height"]||"80%")}var o=true;var t={};t["command"]=d;o=$DS.eval(this.info.ds_dropdown_command,this.info,t);if(!o)return false}function dropdownClick(){console.log("触发下拉框点击事件");var d=true;d=$DS.eval(this.info.ds_dropdown_click,this.info,null);if(!d)return false}function dropdownChange(){console.log("触发下拉框出现隐藏改变事件");var d=true;d=$DS.eval(this.info.ds_dropdown_change,this.info,null);if(!d)return false}function computed_process_data(d){if(d==="false")d=false;if(d==="true")d=true;return d}