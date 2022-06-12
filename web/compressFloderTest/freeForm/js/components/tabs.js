var $tabs={type:"drag_tabs",dataType:"allData",uuid:Date.parse(new Date),getConfig:getTabsConfig,register:registerTabs,showProperty:showPropertyTabs,load:loadTabs,getSubWindow:getSubWindow,buildTabsCfg:buildTabsCfg,setTabsSelectWin:setTabsSelectWin,getTabsInfo:getTabsInfo,deleteTabsIndex:deleteTabsIndex,insertTabsIndex:insertTabsIndex,updateTabsIndex:updateTabsIndex,loadTabsIndex:loadTabsIndex,createDiyTabs:createDiyTabs,setData:setTabsData,getData:getTabsData};function getTabsConfig(){return{ds_id:"",ds_ctrlname:"TABS_"+$tabs.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"18rem",ds_style:"drawing-item",ds_loading:"normal",ds_out_padding:"0rem",ds_out_margin:"0rem",ds_ispro:false,ds_pid:"",ds_draggable:"true",ds_datasource:"",ds_param:"",ds_backParamCondition:"",ds_out_borderWidth:"0rem",ds_out_borderColor:"#606266",ds_out_borderStyle:"solid",ds_tabs:[],ds_tabs_contentField:"",ds_tabs_titleField:"",ds_tabs_iconField:"",ds_tabs_paramsField:"",ds_tabs_lazy:false,ds_tabs_tabIndex:2,ds_tabs_editableTabsValue:"1",ds_tabs_editableTabs:JSON.stringify([{title:"标签1",tabIndex:"1",content:""},{title:"标签2",tabIndex:"2",content:""}]),ds_tabs_type:"card",ds_tabs_closable:true,ds_tabs_addable:true,ds_tabs_tabposition:"top",ds_tabs_stretch:false,ds_tabs_float:"left",ds_tabs_arrowColor:"#909399",ds_tabs_moreBtnColor:"#909399",ds_tabs_moreBtnBorderColor:"#909399",ds_tabs_showMore:false,ds_tabs_showMoreWidth:"20rem",ds_tabs_showMoreHeight:"25rem",ds_tabs_showMoreFontColor:"#7e848a",ds_tabs_showMoreCurrentColor:"#f0f7ff",ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_tabs_beforeLeave:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:{activeName, oldActiveName}",ds_tabs_tabClick:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val 被选中的标签 tab 实例",ds_tabs_tabRemove:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val 被删除的标签的 name",ds_tabs_tabAdd:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}"}}function registerTabs(){Vue.component("drag_tabs",{props:["type","info"],created:function(){this.info.ds_tabs_lazy=this.info.ds_loading=="lazy"?true:false;if(this.info.ds_tabs_editableTabs&&this.info.ds_tabs_editableTabs.length>0){var s=this.info.ds_tabs_editableTabs;for(let t=0;t<s.length;t++){s[t]["lazy"]=true}this.info.ds_tabs_editableTabs=s}this.$nextTick(function(){$(`#${this.info.ds_id} .el-tabs__nav`).css("float",this.info.ds_tabs_float);addListener(this);if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;window[`${this.info.ds_id}_tabsRef`]=this;VUECFG.$refs[this.info.ds_id]=this})},destroyed:function(){delete window[`${this.info.ds_id}_tabsRef`]},mounted:function(){debugger;this.$nextTick(function(){this.showMoreBtn()})},data:function(){return{hide:"y-hide",count:0,refdate:Date.parse(new Date)}},computed:{computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_position:function(){var s={minHeight:this.info.ds_height,height:this.info.ds_height,width:this.info.ds_width};return s},computed_show:function(){var refdateStr=`${this.refdate}_change`;if(!VUECFG.viewStatu){return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{if(this.info.ds_showCondition){var str=$DS.util.replace(this.info.ds_showCondition);return eval(str)?"y-show":"y-hide"}return this.info.ds_show?"y-show":"y-hide"}},computed_tabsname:function(){if(!VUECFG.viewStatu)return this.info.ds_ctrlname;return""},computed_Ts:function(){if(!VUECFG.viewStatu){return{height:"0rem"}}},computed_tabstyle:function(){debugger;this.$nextTick(function(){let s=this;setTimeout(function(){$(`#${s.info.ds_id} .el-icon-arrow-left`).css("color",s.info.ds_tabs_arrowColor);$(`#${s.info.ds_id} .el-icon-arrow-right`).css("color",s.info.ds_tabs_arrowColor);$(`#${s.info.ds_id} .el-icon-more`).css("color",s.info.ds_tabs_moreBtnColor);$(`#${s.info.ds_id} .moreBtn`).css("border-color",s.info.ds_tabs_moreBtnBorderColor)},200)});var s={height:"100% !important",padding:this.info.ds_out_padding,margin:this.info.ds_out_margin,borderWidth:this.info.ds_out_borderWidth,borderColor:this.info.ds_out_borderColor,borderStyle:this.info.ds_out_borderStyle,arrowColor:this.info.ds_tabs_arrowColor,moreBtnColor:this.info.ds_tabs_moreBtnColor,moreBtnBorderColor:this.info.ds_tabs_moreBtnBorderColor};return s},computed_data:function(){if(!this.info.ds_tabs_editableTabs&&!this.info.ds_tabs){return[]}var s=[];if(this.info.ds_tabs_editableTabs&&this.info.ds_tabs_editableTabs.length>0){s=this.info.ds_tabs_editableTabs;if($DS.util.isString(this.info.ds_tabs_editableTabs)){s=$DS.util.clone(JSON.parse(this.info.ds_tabs_editableTabs))}s=$DS.util.clone(s);for(var t=0;t<s.length;t++){if(s[t].content&&VUECFG.viewStatu){s[t].tabIndex=s[t].tabIndex+"";if(this.info.ds_tabs_lazy){s[t].content=""}else{var e=$DS.util.getProjectName(VUECFG.appId);if(!e)e="";var d=e+s[t].content;var a=s[t].params;if(a){a=$DS.util.replace(a);d=d+"&"+a}s[t].content=encodeURI(d+"&$count="+this.count)}}else{s[t].content=""}this.count++;if(s[t]["textColor"])s[t]["textColor"]=`color:${s[t]["textColor"]}`}}var o=[];if(this.info.ds_tabs&&this.info.ds_tabs.length>0){var r=this.info.ds_tabs_contentField?this.info.ds_tabs_contentField:"content";var i=this.info.ds_tabs_titleField?this.info.ds_tabs_titleField:"title";var _=this.info.ds_tabs_iconField?this.info.ds_tabs_iconField:"class";var l=this.info.ds_tabs_paramsField?this.info.ds_tabs_paramsField:"params";o=$tabs.buildTabsCfg(this.info.ds_tabs,r,i,_,l,s.length)}s=s.concat(o);this.info["ds_tabs_allCfg"]=s;return s}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,beforeLeave:beforeLeave,tabClick:tabClick,tabRemove:tabRemove,showMoreBtn:showMoreBtn},template:util.getModelHtml("drag_tabs")});Vue.component("tabs-more",{props:["info"],data:function(){return{showHeader:false,searchData:"",searchKey:""}},created:function(){this.$nextTick(function(){window[`${this.info.ds_id}_tabGridRef`]=this})},destroyed:function(){this.searchData="";this.searchKey="";delete window[`${this.info.ds_id}_tabGridRef`]},computed:{computed_data:function(){if(this.searchData){return this.searchData}else{let s=$DS.util.clone(this.$parent.computed_data);return s}},computed_tabMoreStyle:function(){return{zIndex:99,padding:"0.5rem",background:"#ffffff",boxShadow:"4px 4px 5px #999",display:"none",width:this.info.ds_tabs_showMoreWidth,height:this.info.ds_tabs_showMoreHeight,position:"fixed",top:"0",left:"50%",border:"1px solid #d0cfde",borderRadius:"5px"}},computed_itemStyle:function(){return{height:"2.5rem",lineHeight:"2.5rem",color:this.info.ds_tabs_showMoreFontColor,fontSize:"1.1rem",cursor:"pointer",padding:"0.2rem",borderRadius:"2px",whiteSpace:"nowrap"}}},methods:{showMoreClose:function(s){let t=$(`#${this.info.ds_id}_tabsMoreGrid`);t.css("display","none");this.searchData="";this.searchKey="";document.removeEventListener("click",this.showMoreClose)},openMore:function(){let s=$(`#${this.info.ds_id}_tabsMoreGrid`);s.css("display","block");this.searchData="";this.searchKey=""},searchInputFocus:function(s){$DS.util.stopEvent(s)},tabGridClick:function(s){$(`#${this.info.ds_id} .tabItem`).each(function(){$(this).css("background-color","")});$(s.currentTarget).css("background-color",this.info.ds_tabs_showMoreCurrentColor);this.info.ds_tabs_editableTabsValue=$(s.currentTarget).attr("tabIndex");$DS.util.stopEvent(s)},searchTab:function(s){debugger;let t=[];if(s==""){t=this.$parent.computed_data;this.searchData=""}else{let e=this.$parent.computed_data;for(let d=0;d<e.length;d++){if(e[d].title.indexOf(s)!==-1){t.push(e[d])}}this.searchData=t}}},template:util.getModelHtml("tabs-more")})}function loadTabs(s){var t=$DS.getCtrlById(s).info;t.ds_tabs_lazy=true;t.ds_tabs_lazy=false}function loadSuccess(s,t){var e=this.info;$DS.eval(e.ds_load_success,e)}function beforeLeave(s,t){var e=this.info;var d={activeName:s,oldActiveName:t};$DS.eval(e.ds_tabs_beforeLeave,e,d);$(`#${e.ds_id} .tabItem`).each(function(){if(s==$(this).attr("tabIndex")){$(this).css("background-color",e.ds_tabs_showMoreCurrentColor)}else{$(this).css("background-color","")}});return true}function tabClick(s){var t=this.info;$DS.eval(t.ds_tabs_tabClick,t,s)}function tabRemove(s){var t=this.info;$DS.eval(t.ds_tabs_tabRemove,t,s);let e=this.info.ds_tabs_editableTabs;if($DS.util.isString(e)){try{e=JSON.parse(e)}catch(s){e=[]}}let d=this.info.ds_tabs_editableTabsValue;if(d===s){e.forEach((t,a)=>{if(t.tabIndex===s){let s=e[a+1]||e[a-1];if(s){d=s.name}}})}this.info.ds_tabs_editableTabsValue=d;this.info.ds_tabs_editableTabs=e.filter(t=>t.tabIndex!==s)}function editTabs(){var s=[{edit:"text",field:"title",title:"标签名",width:.25},{field:"textColor",title:"标签颜色",width:.124,codeType:"color"},{edit:"text",field:"iconClass",title:"图标",width:.25,codeType:"icon"},{field:"content",title:"引用路径",width:.25,edit:"text"},{field:"params",title:"参数:A=a&B=b(支持表达式)",width:.25,edit:"text"}];var t=$DS.getCtrlById(VUECFG.ctrlId).info.ds_tabs_editableTabs;if(t&&typeof t==="string"){t=JSON.parse(t)}$DS.openCfgTable(s,t,function(s,t){var e=$DS.getCtrlById(VUECFG.ctrlId).info;if(typeof s==="string"){s=JSON.parse(s)}if(s.length<=0){e.ds_tabs_tabIndex=0+"";e.ds_tabs_editableTabs=[]}else{e.ds_tabs_tabIndex=s.length;for(let t=0;t<s.length;t++){s[t]["tabIndex"]=t+1+""}e.ds_tabs_editableTabs=s}$DS.setPro(VUECFG.ctrlId,"ds_tabs_editableTabs","input",JSON.stringify(s))},"80%","80%","编辑标签页")}function tabAdd(){var s=this.info;$DS.eval(s.ds_tabs_tabAdd,s,null);let t=++this.info.ds_tabs_tabIndex+"";this.info.ds_tabs_editableTabs.push({title:"New Tab",tabIndex:t,content:""});this.info.ds_tabs_editableTabsValue=t}function showPropertyTabs(s){var t=[];var e=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$tabs.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});t.push(e);var d=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true});t.push(d);var a=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true});t.push(a);var o=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"15rem",ds_name:"ds_height",ds_ispro:true});t.push(o);var r=getProInfoByObj("select",{ds_id:"ds_datasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据源",ds_placeholder:"数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_datasource",ds_ispro:true,group1:"数据源",group2:""});t.push(r);var i=getProInfoByObj("input",{ds_id:"ds_out_borderWidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外框边框宽度",ds_placeholder:"外框边框宽度",ds_input:"0rem",ds_name:"ds_out_borderWidth",ds_ispro:true,group1:"属性",group2:"组件样式"});t.push(i);var _=getProInfoByObj("color",{ds_id:"ds_out_borderColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外框边框颜色",ds_name:"ds_out_borderColor",ds_ispro:true,ds_show_alpha:true,ds_color:"#606266",group1:"属性",group2:"组件样式"});t.push(_);var l=getProInfoByObj("select",{ds_id:"ds_out_borderStyle",ds_pid:VUECFG.ctrlId,ds_labeltxt:"外框边框类型",ds_placeholder:"外框边框类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"solid",label:"实线"},{value:"dashed",label:"虚线"},{value:"dotted",label:"点状"}],ds_select:"solid",ds_name:"ds_out_borderStyle",ds_ispro:true,group1:"属性",group2:"组件样式"});t.push(l);var n=getProInfoByObj("select",{ds_id:"ds_tabs_contentField",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"引用路径字段",ds_placeholder:"引用路径字段",ds_select:"",ds_name:"ds_tabs_contentField",ds_options:getTabsSourceFieldOption(),ds_ispro:true,group1:"数据构建",group2:""});t.push(n);var b=getProInfoByObj("select",{ds_id:"ds_tabs_titleField",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题字段",ds_placeholder:"标题字段",ds_select:"",ds_name:"ds_tabs_titleField",ds_options:getTabsSourceFieldOption(),ds_ispro:true,group1:"数据构建",group2:""});t.push(b);var u=getProInfoByObj("select",{ds_id:"ds_tabs_iconField",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"图标字段",ds_placeholder:"图标字段",ds_select:"",ds_name:"ds_tabs_iconField",ds_options:getTabsSourceFieldOption(),ds_ispro:true,group1:"数据构建",group2:""});t.push(u);var c=getProInfoByObj("select",{ds_id:"ds_tabs_paramsField",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"参数字段",ds_placeholder:"参数字段",ds_select:"",ds_name:"ds_tabs_paramsField",ds_options:getTabsSourceFieldOption(),ds_ispro:true,group1:"数据构建",group2:""});t.push(c);var f=getProInfoByObj("input",{ds_id:"ds_out_padding",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"内边距大小",ds_placeholder:"内边距大小",ds_input:"0rem",ds_name:"ds_out_padding",ds_ispro:true,group1:"属性",group2:"组件布局"});t.push(f);var p=getProInfoByObj("input",{ds_id:"ds_out_margin",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外边距大小",ds_placeholder:"外边距大小",ds_input:"0rem",ds_name:"ds_out_margin",ds_ispro:true,group1:"属性",group2:"组件布局"});t.push(p);var h=getProInfoByObj("input",{ds_id:"ds_tabs_editableTabs",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"编辑选项卡",ds_placeholder:"编辑选项卡",ds_input:JSON.stringify([{title:"标签1",tabIndex:"1",content:""},{title:"标签2",tabIndex:"2",content:""}]),ds_name:"ds_tabs_editableTabs",ds_ispro:true,ds_input_focus:"editTabs",ds_valformat:"JSON",ds_readonly:true});t.push(h);var g=getProInfoByObj("input",{ds_id:"ds_tabs_editableTabsValue",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认选中标签页",ds_placeholder:"标签页序号",ds_input:"1",ds_name:"ds_tabs_editableTabsValue",ds_ispro:true,group1:"属性",group2:"默认选中"});t.push(g);var m=getProInfoByObj("radio",{ds_id:"ds_tabs_type",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"选项卡风格",ds_name:"ds_tabs_type",ds_radio:"card",ds_options:[{value:"card",text:"card"},{value:"border-card",text:"border-card"}],ds_radiobtn:true,ds_ispro:true,group1:"属性",group2:"组件样式"});t.push(m);var C=getProInfoByObj("radio",{ds_id:"ds_tabs_tabposition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"选项卡位置",ds_name:"ds_tabs_tabposition",ds_radio:"top",ds_options:[{value:"top",text:"上"},{value:"bottom",text:"下"},{value:"left",text:"左"},{value:"right",text:"右"}],ds_radiobtn:true,ds_radio_change:"changeTabPostionPro",ds_ispro:true,group1:"属性",group2:"组件样式"});t.push(C);var v=getProInfoByObj("radio",{ds_id:"ds_tabs_float",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"选项卡浮动",ds_name:"ds_tabs_float",ds_radio:"left",ds_options:[{value:"left",text:"左"},{value:"right",text:"右"},{value:"none",text:"无"}],ds_radiobtn:true,ds_ispro:true,ds_radio_change:"changeTabsFloat",group1:"属性",group2:"组件样式"});t.push(v);var y=getProInfoByObj("switch",{ds_id:"ds_tabs_stretch",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标签宽度自适应",ds_name:"ds_tabs_stretch",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件样式"});t.push(y);var w=getProInfoByObj("switch",{ds_id:"ds_tabs_closable",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否可关闭",ds_name:"ds_tabs_closable",ds_switch:true,ds_ispro:true,group1:"属性",group2:"组件样式"});t.push(w);var I=getProInfoByObj("switch",{ds_id:"ds_tabs_showMore",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示更多",ds_name:"ds_tabs_showMore",ds_switch:false,ds_ispro:true,ds_switch_change:"changeShowMorePro",group1:"属性",group2:"显示更多设置"});t.push(I);var S=getProInfoByObj("input",{ds_id:"ds_tabs_showMoreWidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"弹框宽度",ds_placeholder:"",ds_input:"20rem",ds_name:"ds_tabs_showMoreWidth",ds_ispro:true,group1:"属性",group2:"显示更多设置"});t.push(S);var T=getProInfoByObj("input",{ds_id:"ds_tabs_showMoreHeight",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"弹框高度",ds_placeholder:"",ds_input:"25rem",ds_name:"ds_tabs_showMoreHeight",ds_ispro:true,group1:"属性",group2:"显示更多设置"});t.push(T);var x=getProInfoByObj("color",{ds_id:"ds_tabs_showMoreFontColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"字体颜色",ds_name:"ds_tabs_showMoreFontColor",ds_ispro:true,ds_show_alpha:true,ds_color:"#909399",group1:"属性",group2:"显示更多设置"});t.push(x);var F=getProInfoByObj("color",{ds_id:"ds_tabs_showMoreCurrentColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"选中行颜色",ds_name:"ds_tabs_showMoreCurrentColor",ds_ispro:true,ds_show_alpha:true,ds_color:"#f0f7ff",group1:"属性",group2:"显示更多设置"});t.push(F);var D=getProInfoByObj("color",{ds_id:"ds_tabs_arrowColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"箭头颜色",ds_name:"ds_tabs_arrowColor",ds_ispro:true,ds_show_alpha:true,ds_color:"#909399",group1:"属性",group2:"显示更多设置"});t.push(D);var B=getProInfoByObj("color",{ds_id:"ds_tabs_moreBtnColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"更多按钮颜色",ds_name:"ds_tabs_moreBtnColor",ds_ispro:true,ds_show_alpha:true,ds_color:"#909399",group1:"属性",group2:"显示更多设置"});t.push(B);var G=getProInfoByObj("color",{ds_id:"ds_tabs_moreBtnBorderColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"更多按钮边框颜色",ds_name:"ds_tabs_moreBtnBorderColor",ds_ispro:true,ds_show_alpha:true,ds_color:"#909399",group1:"属性",group2:"显示更多设置"});t.push(G);var V=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true,group1:"控件加载",group2:""});t.push(V);var E=getProInfoByObj("input",{ds_id:"ds_param",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"推送参数名",ds_placeholder:"控件推送参数名",ds_input:"",ds_name:"ds_param",ds_ispro:true,group1:"参数推送",group2:""});t.push(E);var j=getProInfoByObj("input",{ds_id:"ds_backParamCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"撤销推送条件",ds_placeholder:"推送参数名.A=='a'||推送参数名.A=='b'",ds_input:"",ds_name:"ds_backParamCondition",ds_ispro:true,group1:"参数推送",group2:""});t.push(j);var U=getProInfoByObj("switch",{ds_id:"ds_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示控件",ds_name:"ds_show",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});t.push(U);var O=getProInfoByObj("input",{ds_id:"ds_showCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",ds_input:"",ds_name:"ds_showCondition",ds_ispro:true,group1:"显示设置",group2:""});t.push(O);var P=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});t.push(P);var M=getProInfoByObj("jseditor",{ds_id:"ds_tabs_tabRemove",ds_pid:VUECFG.ctrlId,ds_labeltxt:"关闭标签事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:被删除的标签的 name",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_tabs_tabRemove",ds_ispro:true,ds_savedb:false,ds_disabled:false,ds_show:true,group1:"事件",group2:""});t.push(M);var k=getProInfoByObj("jseditor",{ds_id:"ds_tabs_beforeLeave",ds_pid:VUECFG.ctrlId,ds_labeltxt:"切换标签事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{activeName:当前标签name,oldActiveName:上一个标签name}",ds_prepend:"fn(obj, val){",ds_jseditor_change:"",ds_name:"ds_tabs_beforeLeave",ds_ispro:true,ds_savedb:false,ds_disabled:false,ds_show:true,group1:"事件",group2:""});t.push(k);var R=getProInfoByObj("jseditor",{ds_id:"ds_tabs_tabClick",ds_pid:VUECFG.ctrlId,ds_labeltxt:"选中标签事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:被选中的标签 tab 实例",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_tabs_tabClick",ds_ispro:true,ds_savedb:false,ds_disabled:false,ds_show:true,group1:"事件",group2:""});t.push(R);if(VUECFG.proObj[VUECFG.ctrlId]&&!s){var N=VUECFG.proObj[VUECFG.ctrlId];for(var A=0;A<t.length;A++){for(var W=0;W<N.length;W++){if(t[A].info.ds_name==N[W].info.ds_name){var e=t[A].type.split("drag_")[1];t[A].info["ds_"+e]=N[W].info["ds_"+e];if(!$DS.util.isUndefined(N[W].info["ds_show"]))t[A].info["ds_show"]=N[W].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(t);VUECFG.proObj[VUECFG.ctrlId]=t;$("#templetePro").click()}function getSubWindow(s,t){var e=$DS.getCtrl(s).info.ds_id;var d={};try{d=$("#"+e).find("#"+e+"_iframe_"+t)[0].contentWindow}catch(s){d={}}return d}function setTabsData(s,t,e){var d=$DS.getCtrlById(s);var a=getSourceById(VUECFG.groupObj[s]);if(a){if(!t&&d.info.ds_name&&$DS.getSourceData(a,e)){t=$DS.getSourceData(a,e)}d.info.ds_tabs=t.rows}else{d.info.ds_tabs=t?t.rows:[]}}function getTabsData(s){var t=$DS.getCtrlById(s);if(!t)console.error("【ID为"+s+"】的控件不存在!");return t.info.ds_tabs_allCfg}function buildTabsCfg(s,t,e,d,a,o){var r=s.map((s,r)=>{var i={};if(s[t])i["content"]=s[t];if(s[e])i["title"]=s[e];if(s[d])i["iconField"]=s[d];if(s[a])i["params"]=s[a];if(s[e]){if(o){i["tabIndex"]=r+1}else{i["tabIndex"]=o++}}if(JSON.stringify(i)!=="{}"){return i}});r=r.filter(s=>{if(s){return s}});return r}function getTabsSourceFieldOption(){var s=[{label:"无",value:""}];if(VUECFG.ctrlId){var t=$DS.getCtrlById(VUECFG.ctrlId).info;if(t.ds_datasource){var e=$DS.getSourceById(t.ds_datasource).columns;if(e){e.map(t=>{var e={};e["label"]=t.FIELD_NAMECN;e["value"]=t.FIELD_NAME;s.push(e)})}}}return s}function setTabsSelectWin(s,t){if($DS.getCtrl(s)){$DS.getCtrl(s).info.ds_tabs_editableTabsValue=t.toString()}}function getTabsInfo(s,t,e){if($DS.getCtrl(s)){if(e){return $DS.getCtrl(s).info.ds_tabs_editableTabs}else{return $DS.getCtrl(s).info.ds_tabs_editableTabs[t]}}}function createDiyTabs(s,t){if($DS.getCtrl(s)){var e=[];for(let s=0;s<t.lnegth;s++){let d={};d.tabIndex=(s+1).toString();d.name=s+1;d.iconClass=t[s]["iconClass"]?t[s]["iconClass"]:"";d.title=t[s]["title"]?t[s]["title"]:"";d.lazy=t[s]["lazy"]?t[s]["lazy"]:false;d.content=t[s]["content"]?t[s]["content"]:"";e.push(d)}$DS.getCtrl(s).info.ds_tabs_editableTabs=e}}function deleteTabsIndex(s,t){if($DS.getCtrl(s)){var e=$DS.getCtrl(s).info.ds_tabs_editableTabs;var d=e.splice(t-1,1);$DS.getCtrl(s).info.ds_tabs_editableTabs=e;return d}}function insertTabsIndex(s,t,e){if($DS.getCtrl(s)){if(!t)return;e=e||$DS.getCtrl(s).info.ds_tabs_editableTabs.length+1;var d=$DS.util.clone($DS.getCtrl(s).info.ds_tabs_editableTabs);d.splice(e-1,0,t);for(let s=0;s<d.length;s++){d[s]["tabIndex"]=(s+1).toString();d[s]["name"]=(s+1).toString()}$DS.getCtrl(s).info.ds_tabs_editableTabs=d}}function updateTabsIndex(s,t,e){if($DS.getCtrl(s)){$DS.getCtrl(s).info.ds_tabs_editableTabs[t-1]["content"]="";$DS.getCtrl(s).info.ds_tabs_editableTabs[t-1]["content"]=e}}function loadTabsIndex(s,t){if($DS.getCtrl(s)){var e=$DS.getCtrl(s).info.ds_tabs_editableTabs[t-1]["content"];$DS.getCtrl(s).info.ds_tabs_editableTabs[t-1]["content"]="";$DS.getCtrl(s).info.ds_tabs_editableTabs[t-1]["content"]=e}}function changeTabsFloat(s){var t=$DS.getCtrlById(s.ds_pid);$(`#${t.info.ds_id} .el-tabs__nav`).css("float",s.ds_radio)}function changeShowMorePro(s,t){if(t==undefined)t=false;window[`${s.ds_pid}_tabsRef`].info.ds_tabs_showMore=t;window[`${s.ds_pid}_tabsRef`].showMoreBtn()}function changeTabPostionPro(s,t){window[`${s.ds_pid}_tabsRef`].info.ds_tabs_tabposition=t;window[`${s.ds_pid}_tabsRef`].showMoreBtn("postionChange")}function showMoreBtn(s){let t=this;let e=this.info.ds_tabs_showMore;let d=this.info.ds_tabs_tabposition;let a={};setTimeout(function(){let d=t.$el.querySelector(`.el-tabs__header`);let a=t.$el.querySelector(`.el-tabs__nav-next`);let o=t.$el.querySelector(`.el-tabs__nav-wrap`);let r=t.$el.querySelector(`.el-tabs__nav-prev`);let i=t.$el.querySelector(`.moreBtn`);if(i){i.remove()}if(e||s){i=`<span tabindex="0" class="el-tabs__new-tab moreBtn" tabId="${t.info.ds_id}" onclick="showMoreGrid(this)"><i class="el-icon-more"></i></span>`;$(d).prepend(i)}})}function showMoreGrid(s){debugger;let t=$(s).attr("tabId");let e=$(`#${t}_tabsMoreGrid`);let d=e.css("display");let a=window[`${t}_tabsRef`].info;if(d=="none"){$(`#${a.ds_id} .tabItem`).each(function(){if(a.ds_tabs_editableTabsValue==$(this).attr("tabIndex")){$(this).css("background-color",a.ds_tabs_showMoreCurrentColor)}else{$(this).css("background-color","")}});let t=$(window).height();let d=$(window).width();let o=$(s).offset().top;let r=$(s).offset().left;let i=$(s).width();let _=$(s).height();let l=e.height();let n=e.width();let b=0;let u=0;if(d-n-r-i-20>0){b=r+i}else{b=r-n-20}if(t-o>l+20){u=o}else{u=o-(l-(t-o))-20}e.css("left",b);e.css("top",u);document.addEventListener("click",window[`${a.ds_id}_tabGridRef`].showMoreClose);window[`${a.ds_id}_tabGridRef`].openMore();$DS.util.stopEvent(event)}else{window[`${a.ds_id}_tabGridRef`].searchData="";window[`${a.ds_id}_tabGridRef`].searchData.searchKey="";window[`${a.ds_id}_tabGridRef`].showMoreClose()}}