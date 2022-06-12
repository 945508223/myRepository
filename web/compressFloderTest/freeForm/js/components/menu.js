var $menu={type:"drag_menu",dataType:"doubleData",uuid:Date.parse(new Date),getConfig:getMenuConfig,register:registerMenu,showProperty:showPropertyMenu,setData:setMenuVal,getData:getMenuVal,clearData:clearMenuVal,search:menuSearchForOut,changeCollapse:changeCollapse,isTrigger:isTrigger};function getMenuConfig(){return{ds_id:"",ds_ctrlname:"MENU_"+$menu.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"100%",ds_style:"drawing-item",ds_datasource:"",ds_param:"",ds_backParamCondition:"",ds_trigger:"",ds_loading:"normal",ds_out_padding:"0rem",ds_out_margin:"0rem",ds_ispro:false,ds_pid:"",ds_draggable:true,ds_menu:"",ds_menu_rootId:"",ds_menu_rootName:"",ds_menu_rootIcon:"",ds_menu_rootIconSize:"1.5rem",ds_menu_rootIconColor:"",ds_menu_levelData:false,ds_menu_url:"",ds_menu_name:"",ds_menu_shortName:"",ds_menu_submenuField:"children",ds_menu_pid:"",ds_menu_guid:"",ds_menu_url_sql:"",ds_menu_name_sql:"",ds_menu_shortName_sql:"",ds_menu_submenuField_sql:"children",ds_menu_pid_sql:"",ds_menu_guid_sql:"",ds_menu_iconField_sql:"",ds_menu_default_checkfirst:false,ds_menu_mode:"vertical",ds_menu_background_color:"",ds_menu_text_color:"#303133",ds_menu_active_background_color:"#ecf5ff",ds_menu_active_text_color:"#409EFF",ds_menu_fontSize:"1rem",ds_menu_itemHeight:"3rem",ds_menu_itemFontWeight:"normal",ds_menu_iconSetType:"iconClass",ds_menu_iconClass:"",ds_menu_iconField:"",ds_menu_default_active:"",ds_menu_default_openeds:[],ds_menu_unique_opened:false,ds_menu_trigger:"hover",ds_menu_collapse_transition:false,ds_menu_curr_data:null,ds_menu_filter:false,ds_menu_fiterData:false,ds_menu_filterField:[],ds_menu_iconSize:"1.5rem",ds_menu_iconColor:"",ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_menu_click:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{index: 选中菜单项的 index, indexPath: 选中菜单项的 index path,type:点击类型}"}}function registerMenu(){Vue.component("drag_menu",{props:["type","info"],created:function(){this.info.ds_menu_fiterData=false;this.info.ds_menu_curr_data=null;this.$nextTick(function(){addListener(this);if(this.info.ds_menu_default_checkfirst&&this.computed_data&&this.computed_data.length>0){temporary.firstTriggerObj[this.info.ds_id]=false;var e=this.computed_data[0].ID;this.info.ds_menu_default_active=e;this.info.ds_menu_curr_data=this.computed_data[0];if(e=="#")e="rootId";$("#"+this.info.ds_id+"_"+e).parent().click()}else if(!this.info.ds_menu_default_checkfirst){this.info.ds_menu_default_active=""}if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;VUECFG.$refs[this.info.ds_id]=this})},destroyed:function(){this.info.ds_menu_fiterData=false},watch:{},data:function(){return{hide:"y-hide",refdate:Date.parse(new Date)}},computed:{computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_data:function(){debugger;this.info.ds_menu_curr_data=[];var e=[];if($DS.util.isArray(this.info.ds_menu_fiterData)&&this.info.ds_menu_filter){return this.info.ds_menu_fiterData}else if(this.info.ds_menu){if($DS.util.isString(this.info.ds_menu)){this.info.ds_menu=JSON.parse(this.info.ds_menu);if(this.info.ds_menu_rootId&&this.info.ds_menu_rootName){e=addRootData(this.info,$DS.util.clone(this.info.ds_menu));temporary.menuContrast[this.info.ds_id]=e;return e}else{temporary.menuContrast[this.info.ds_id]=this.info.ds_menu;return this.info.ds_menu}}e=this.buildData();temporary.menuContrast[this.info.ds_id]=e;return e}else{temporary.menuContrast[this.info.ds_id]=e;return e}},computed_show:function(){var refdateStr=`${this.refdate}_change`;if(!VUECFG.viewStatu){return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{if(this.info.ds_showCondition){var str=$DS.util.replace(this.info.ds_showCondition);return eval(str)?"y-show":"y-hide"}return this.info.ds_show?"y-show":"y-hide"}},computed_menuName:function(){if(!VUECFG.viewStatu)return this.info.ds_ctrlname;return""},computed_Ts:function(){if(VUECFG.viewStatu){return{height:"0rem"}}},computed_Bs:function(){if(VUECFG.viewStatu){return{height:"calc(100% - 0rem)"}}},computed_outerstyle:function(){var e={padding:this.info.ds_out_padding,margin:this.info.ds_out_margin};return e},computed_activeColor:function(){return this.info.ds_menu_active_text_color},computed_backColr:function(){return this.info.ds_menu_background_color},computed_outClickId:function(){return this.info.ds_id+"_outclick"},computed_collapse:function(){clearFirstMenuData(this.info.ds_id);if(this.info.ds_menu_collapse_transition){return"menu_collapse"}}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,menuClick:menuClick,buildData:buildData,outclick:outclick,innerSearch:innerSearch,changeCollapseType:changeCollapseType},template:util.getModelHtml("drag_menu")});Vue.component("navigation-item",{props:["type","info","item"],data(){return{}},watch:{computed_itemStyle(e,s){var d=e;this.$nextTick(function(){$("#"+this.info.ds_id).find(".el-menu-item ").each(function(){$(this).css("display","flex").css("align-items","center").css("height",d)})})}},computed:{},methods:{computed_icon:computed_icon,computed_id:computed_id,computed_style:computed_style},template:util.getModelHtml("navigation_item")})}function computed_style(){var e=this.info.ds_id;var s=this.info.ds_menu_fontSize;var d=this.info.ds_menu_itemFontWeight;var t=this.info.ds_menu_iconSize;var _=this.info.ds_menu_iconColor;var r=this.info.ds_menu_itemHeight;var i=this.info.ds_menu_collapse_transition;var o=this.info.ds_menu_rootId=="#"?"rootId":this.info.ds_menu_rootId;var n=this.info.ds_menu_rootIconSize;var a=this.info.ds_menu_rootIconColor;var l=this.info.ds_menu_rootIcon;var u=getFirstMenuData(this.$parent.$parent.computed_data,i,this.info.ds_id);var c=u.map(e=>{return e.ID});this.$nextTick(function(){if(o&&l){$("#"+e).find("#"+e+"_"+o).parent().find(` .${l}`).css("font-size",n).css("color",a)}if($("#"+e).find(".el-submenu__title")&&$("#"+e).find(".el-submenu__title").length>0||$("#"+e).find(".el-menu-item")&&$("#"+e).find(".el-menu-item").length>0){$("#"+e).find(".el-submenu__title").each(function(){setMenuItemStyle($(this),{id:e,rootId:o,isCollapse:i,firstDataId:c,fontSize:s,itemHeight:r,fontWeight:d,iconSize:t,iconColor:_})});$("#"+e).find(".el-menu-item").each(function(){setMenuItemStyle($(this),{id:e,rootId:o,isCollapse:i,firstDataId:c,fontSize:s,itemHeight:r,fontWeight:d,iconSize:t,iconColor:_})})}});var p={fontSize:s};return p}function setMenuItemStyle(e,s){if($(e).find("div").attr("id")!==s.id+"_"+s.rootId){$(e).find("i").eq(0).css("font-size",s.iconSize).css("color",s.iconColor)}$(e).css("font-size",s.fontSize);$(e).css("height",s.itemHeight);$(e).css("font-weight",s.fontWeight);if(s.isCollapse&&s.firstDataId.indexOf($(e).find("div").eq(0).attr("id").split("_")[3])!==-1){var d=s.itemHeight.split("rem")[0]*2+"rem";var t=s.itemHeight.split("rem")[0]/2+"rem";$(e).css("height",d);$(e).css("line-height",s.itemHeight);$(e).find(".el-submenu__icon-arrow").css("display","none")}else{$(e).css("height",s.itemHeight);$(e).css("line-height",s.itemHeight);$(e).find(".el-submenu__icon-arrow").css("display","block")}}function getFirstMenuData(e,s,d){if(temporary&&temporary.menuFirstLevelData&&temporary.menuFirstLevelData[d]){return temporary.menuFirstLevelData[d]}if(s){setFirstMenuData(d,e);return e}else{var t=$DS.util.childrenToList(e,"children",[]);setFirstMenuData(d,t);return t}}function setFirstMenuData(e,s){if(temporary.menuFirstLevelData){temporary.menuFirstLevelData[e]=s}else{temporary.menuFirstLevelData={};temporary.menuFirstLevelData[e]=s}}function clearFirstMenuData(e){if(temporary.menuFirstLevelData){delete temporary.menuFirstLevelData[e]}}function computed_icon(e,s){if(this.info.ds_menu_rootId&&this.info.ds_menu_rootId==e.ID){return this.info.ds_menu_rootIcon}else if(this.info.ds_menu_iconSetType=="field"&&this.info.ds_menu_iconField||this.info.ds_menu_iconField_sql){if(this.info.ds_datasource&&$DS.getSourceById(this.info.ds_datasource)=="sqlData"){return e[this.info.ds_menu_iconField_sql]}else{return e[this.info.ds_menu_iconField]}}else if(this.info.ds_menu_iconSetType=="iconClass"&&this.info.ds_menu_iconClass){return this.info.ds_menu_iconClass}return""}function computed_id(e){if(this.item.ID==="#"){return this.info.ds_id+"_rootId"}return this.info.ds_id+"_"+this.item.ID}function buildData(){debugger;var e=$DS.getSourceById(this.info.ds_datasource);if(!e)return"";var s=e.sourceType==="sqlData"?this.info.ds_menu_submenuField_sql:this.info.ds_menu_submenuField;var d=e.sourceType==="sqlData"?this.info.ds_menu_guid_sql:this.info.ds_menu_guid;var t=e.sourceType==="sqlData"?this.info.ds_menu_pid_sql:this.info.ds_menu_pid;var _=e.sourceType==="sqlData"?this.info.ds_menu_name_sql:this.info.ds_menu_name;var r=e.sourceType==="sqlData"?this.info.ds_menu_shortName_sql:this.info.ds_menu_shortName;var i=e.sourceType==="sqlData"?this.info.ds_menu_url_sql:this.info.ds_menu_url;var o=$DS.util.clone(this.info.ds_menu);if(e&&e.sourceType==="levelData"&&o.length>0){o=addRootData(this.info,o);changeDataField(o,null,null,null,null,i,r)}else if(e&&(e.sourceType==="sqlData"||e.sourceType==="allData")&&o||!e&&o&&o.length>0){if(e&&e.sourceType==="allData"){o=o.rows}if(!this.info.ds_menu_levelData){if(!d){console.error("未设置唯一ID字段");o=[];return o}if(!_){console.error("未设置显示名称字段");o=[];return o}changeDataField(o,null,d,null,_,i,r);o=addRootData(this.info,o)}else if(this.info.ds_menu_levelData){o=buildLevelData(o,s,d,t,_,i,r,this.info)}}return o}function buildLevelData(e,s,d,t,_,r,i,o){if(!d){console.error("未设置唯一ID字段");return[]}if(!_){console.error("未设置显示名称字段");return[]}if(!t){console.error("未设置上级字段");return[]}if(!s){console.error("未设置子集字段");return[]}e=$DS.util.children(e,d,t,s);changeDataField(e,s,d,t,_,r,i);e=addRootData(o,e);return e}function changeDataField(e,s,d,t,_,r,i){for(let o=0;o<e.length;o++){if(d&&d!=="ID"){e[o]["ID"]=e[o][d]}if(t&&t!=="PID"){e[o]["PID"]=e[o][t]}if(_&&_!=="NAME"){e[o]["NAME"]=e[o][_]}if(r&&r!=="URL"){e[o]["URL"]=e[o][r]}if(i&&i!=="SHORTNAME"){e[o]["SHORTNAME"]=e[o][i]}if(e[o][s]&&e[o][s].length>0){if(s&&s!=="children"){e[o]["children"]=e[o][s]}changeDataField(e[o]["children"],s,d,t,_,r,i)}}}function addRootData(e,s){if(e.ds_menu_rootId&&e.ds_menu_rootName&&!e.ds_menu_collapse_transition){for(let d=0;d<s.length;d++){s[d]["PID"]=e.ds_menu_rootId=="#"?"rootId":e.ds_menu_rootId}var d=[];var t={ID:e.ds_menu_rootId=="#"?"rootId":e.ds_menu_rootId,NAME:e.ds_menu_rootName,children:s};if(e.ds_menu_iconField){t[e.ds_menu_iconField]=e.ds_menu_rootIcon}d.push(t);return d}return s}function menuClick(e,s,d){var t=this.info;var _=null;var r=e=="#"?"rootId":e;$(`.${t.ds_id}_menuCls`).each(function(){_=$(this);if(_.attr("sub"))_=$(this).children(":first");_.css("background-color",t.ds_menu_background_color);_.css("color",t.ds_menu_text_color)});_=$(`#${t.ds_id}_${r}`).parent();if($(`#${t.ds_id}_${r}`).attr("sub"))var _=$(`#${t.ds_id}_${r}`).children(":first");_.css("background-color",t.ds_menu_active_background_color);_.css("color",t.ds_menu_active_text_color);var i=$DS.util.getChildrenDataByVal(temporary.menuContrast[this.info.ds_id],"ID",e,true);var o={index:e,indexPath:s,data:i,type:d};this.ds_menu_curr_data=i;var n=$DS.eval(t.ds_menu_click,t,o);$DS.dealPms(this.info,o);if(this.info.ds_trigger&&this.info.ds_trigger.length>0){triggerComps(this.info.ds_trigger,$DS.getCtrlType(t.ds_id))}return n}function loadSuccess(e,s){var d=this.info;$DS.eval(d.ds_load_success,d)}function showPropertyMenu(e){var s=[];var d=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$menu.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});s.push(d);var t=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true});s.push(t);var _=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true,ds_isrequired:false});s.push(_);var r=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"100%",ds_name:"ds_height",ds_ispro:true});s.push(r);var i=getProInfoByObj("select",{ds_id:"ds_datasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据源",ds_placeholder:"数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_datasource",ds_ispro:true,group1:"数据源",group2:""});s.push(i);var o=getProInfoByObj("input",{ds_id:"ds_out_padding",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"内边距大小",ds_placeholder:"内边距大小",ds_input:"0rem",ds_name:"ds_out_padding",ds_ispro:true,group1:"属性",group2:"组件布局"});s.push(o);var n=getProInfoByObj("input",{ds_id:"ds_out_margin",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外边距大小",ds_placeholder:"外边距大小",ds_input:"0rem",ds_name:"ds_out_margin",ds_ispro:true,group1:"属性",group2:"组件布局"});s.push(n);var a=getProInfoByObj("input",{ds_id:"ds_menu_rootId",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"根节点ID",ds_placeholder:"根节点ID",ds_input:"",ds_name:"ds_menu_rootId",ds_ispro:true,group1:"属性",group2:"根节点"});s.push(a);var l=getProInfoByObj("input",{ds_id:"ds_menu_rootName",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"根节点名称",ds_placeholder:"根节点名称",ds_input:"",ds_name:"ds_menu_rootName",ds_ispro:true,group1:"属性",group2:"根节点"});s.push(l);var u=getProInfoByObj("input",{ds_id:"ds_menu_rootIcon",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"根节点图标",ds_placeholder:"请选择根节点图标名称",ds_input:"",ds_name:"ds_menu_rootIcon",ds_append:"选择",ds_input_appendclick:"clickChooseIcon",ds_ispro:true,group1:"属性",group2:"根节点"});s.push(u);var c=getProInfoByObj("input",{ds_id:"ds_menu_rootIconSize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"根节点图标大小",ds_input:"1.5rem",ds_name:"ds_menu_rootIconSize",ds_ispro:true,group1:"属性",group2:"根节点"});s.push(c);var p=getProInfoByObj("color",{ds_id:"ds_menu_rootIconColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"根节点图标颜色",ds_name:"ds_menu_rootIconColor",ds_ispro:true,ds_show_alpha:true,ds_color:"",group1:"属性",group2:"根节点"});s.push(p);var m=getProInfoByObj("select",{ds_id:"ds_menu_name",ds_pid:VUECFG.ctrlId,ds_labeltxt:"名称字段",ds_placeholder:"",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_name:"ds_menu_name",ds_show:false,ds_ispro:true,ds_multiple:false,ds_isrequired:true,group1:"数据源",group2:"数据构建"});s.push(m);var g=getProInfoByObj("select",{ds_id:"ds_menu_guid",ds_pid:VUECFG.ctrlId,ds_labeltxt:"唯一ID字段",ds_placeholder:"唯一ID字段",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_name:"ds_menu_guid",ds_ispro:true,ds_multiple:false,ds_show:false,ds_isrequired:true,group1:"数据源",group2:"数据构建"});s.push(g);var f=getProInfoByObj("select",{ds_id:"ds_menu_shortName",ds_pid:VUECFG.ctrlId,ds_labeltxt:"简称字段",ds_placeholder:"",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_name:"ds_menu_shortName",ds_show:false,ds_ispro:true,ds_multiple:false,group1:"数据源",group2:"数据构建"});s.push(f);var h=getProInfoByObj("select",{ds_id:"ds_menu_url",ds_pid:VUECFG.ctrlId,ds_labeltxt:"URL字段",ds_placeholder:"",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_name:"ds_menu_url",ds_show:false,ds_ispro:true,ds_multiple:false,group1:"数据源",group2:"数据构建"});s.push(h);var b=getProInfoByObj("input",{ds_id:"ds_menu_name_sql",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"名称字段",ds_placeholder:"名称字段",ds_input:"",ds_name:"ds_menu_name_sql",ds_show:false,ds_isrequired:true,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(b);var y=getProInfoByObj("input",{ds_id:"ds_menu_guid_sql",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"唯一ID字段",ds_placeholder:"唯一ID字段",ds_input:"",ds_name:"ds_menu_guid_sql",ds_show:false,ds_isrequired:true,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(y);var I=getProInfoByObj("input",{ds_id:"ds_menu_shortName_sql",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"简称字段",ds_placeholder:"简称字段",ds_input:"",ds_name:"ds_menu_shortName_sql",ds_show:false,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(I);var v=getProInfoByObj("input",{ds_id:"ds_menu_url_sql",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"URL字段",ds_placeholder:"URL字段",ds_input:"",ds_name:"ds_menu_url_sql",ds_show:false,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(v);var F=getProInfoByObj("radio",{ds_id:"ds_menu_iconSetType",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"图标设置方式",ds_name:"ds_menu_iconSetType",ds_radio:"iconClass",ds_options:[{value:"field",text:"依据数据字段"},{value:"iconClass",text:"选择图标"}],ds_radiobtn:true,ds_ispro:true,ds_radio_change:"changeMenuIconSetType",group1:"数据源",group2:"数据构建"});s.push(F);var C=getProInfoByObj("input",{ds_id:"ds_menu_iconClass",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点图标",ds_placeholder:"请选择节点图标",ds_input:"",ds_name:"ds_menu_iconClass",ds_append:"选择",ds_input_appendclick:"clickChooseIcon",ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(C);var D=getProInfoByObj("select",{ds_id:"ds_menu_iconField",ds_pid:VUECFG.ctrlId,ds_labeltxt:"菜单项图标字段",ds_placeholder:"",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_name:"ds_menu_iconField",ds_show:false,ds_ispro:true,ds_multiple:false,group1:"数据源",group2:"数据构建"});s.push(D);var S=getProInfoByObj("input",{ds_id:"ds_menu_iconField_sql",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"图标字段",ds_placeholder:"图标字段",ds_input:"",ds_name:"ds_menu_iconField_sql",ds_show:false,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(S);var x=getProInfoByObj("switch",{ds_id:"ds_menu_levelData",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"构建层级数据",ds_name:"ds_menu_levelData",ds_switch:false,ds_ispro:true,ds_switch_change:"isShowSetting",group1:"数据源",group2:"数据构建"});s.push(x);var w=getProInfoByObj("select",{ds_id:"ds_menu_pid",ds_pid:VUECFG.ctrlId,ds_labeltxt:"上级字段",ds_placeholder:"",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_name:"ds_menu_pid",ds_show:false,ds_ispro:true,ds_multiple:false,group1:"数据源",group2:"数据构建"});s.push(w);var V=getProInfoByObj("input",{ds_id:"ds_menu_submenuField",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"子集字段",ds_placeholder:"子集字段",ds_input:"children",ds_name:"ds_menu_submenuField",ds_show:false,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(V);var E=getProInfoByObj("input",{ds_id:"ds_menu_pid_sql",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"上级字段",ds_placeholder:"上级字段",ds_input:"",ds_name:"ds_menu_pid_sql",ds_show:false,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(E);var O=getProInfoByObj("input",{ds_id:"ds_menu_submenuField_sql",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"子集字段",ds_placeholder:"子集字段",ds_input:"",ds_name:"ds_menu_submenuField_sql",ds_show:false,ds_ispro:true,group1:"数据源",group2:"数据构建"});s.push(O);var U=getProInfoByObj("radio",{ds_id:"ds_menu_mode",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"导航栏布局方式",ds_name:"ds_menu_mode",ds_radio:"horizontal",ds_options:[{value:"vertical",text:"水平"},{value:"horizontal",text:"垂直"}],ds_radiobtn:true,ds_ispro:true,ds_show:false,group1:"属性",group2:"导航栏样式"});s.push(U);var P=getProInfoByObj("color",{ds_id:"ds_menu_background_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"菜单的背景色",ds_name:"ds_menu_background_color",ds_ispro:true,ds_show_alpha:true,ds_color:"",group1:"属性",group2:"导航栏样式"});s.push(P);var j=getProInfoByObj("color",{ds_id:"ds_menu_text_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"菜单的文字颜色",ds_name:"ds_menu_text_color",ds_ispro:true,ds_show_alpha:true,ds_color:"#303133",group1:"属性",group2:"导航栏样式"});s.push(j);var G=getProInfoByObj("input",{ds_id:"ds_menu_fontSize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"菜单的文字大小",ds_placeholder:"",ds_input:"1rem",ds_name:"ds_menu_fontSize",ds_show:true,ds_ispro:true,group1:"属性",group2:"导航栏样式"});s.push(G);var B=getProInfoByObj("input",{ds_id:"ds_menu_itemHeight",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"菜单项高度",ds_placeholder:"",ds_input:"3rem",ds_name:"ds_menu_itemHeight",ds_show:true,ds_ispro:true,group1:"属性",group2:"导航栏样式"});s.push(B);var q=getProInfoByObj("select",{ds_id:"ds_menu_itemFontWeight",ds_pid:VUECFG.ctrlId,ds_labeltxt:"菜单项字体加粗",ds_placeholder:"菜单项字体加粗",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontWeight(),ds_select:"normal",ds_name:"ds_menu_itemFontWeight",ds_ispro:true,group1:"属性",group2:"导航栏样式"});s.push(q);var k=getProInfoByObj("input",{ds_id:"ds_menu_itemBorderWidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"菜单项边框宽度",ds_placeholder:"顺序:上右下左;单位:px",ds_input:"1",ds_name:"ds_menu_itemBorderWidth",ds_ispro:true,ds_show:false,group1:"属性",group2:"导航栏样式"});s.push(k);var T=getProInfoByObj("radio",{ds_id:"ds_menu_itemBorderStyle",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"菜单项边框类型",ds_name:"ds_menu_itemBorderStyle",ds_radio:"solid",ds_options:[{value:"solid",text:"实线"},{value:"dashed",text:"虚线"},{value:"dotted",text:"点"}],ds_radiobtn:true,ds_ispro:true,ds_show:false,group1:"属性",group2:"导航栏样式"});s.push(T);var M=getProInfoByObj("color",{ds_id:"ds_menu_itemBorderColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"菜单项边框颜色",ds_name:"ds_menu_itemBorderColor",ds_ispro:true,ds_show_alpha:true,ds_color:"",ds_show:false,group1:"属性",group2:"导航栏样式"});s.push(M);var N=getProInfoByObj("input",{ds_id:"ds_menu_iconSize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"图标大小",ds_placeholder:"",ds_input:"1.5rem",ds_name:"ds_menu_iconSize",ds_ispro:true,group1:"属性",group2:"导航栏样式"});s.push(N);var z=getProInfoByObj("color",{ds_id:"ds_menu_iconColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"图标颜色",ds_name:"ds_menu_iconColor",ds_ispro:true,ds_show_alpha:true,ds_color:"",group1:"属性",group2:"导航栏样式"});s.push(z);var A=getProInfoByObj("color",{ds_id:"ds_menu_active_text_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"选中菜单的文字颜色",ds_name:"ds_menu_active_text_color",ds_ispro:true,ds_show_alpha:true,ds_color:"#409EFF",group1:"属性",group2:"导航栏选中样式"});s.push(A);var L=getProInfoByObj("color",{ds_id:"ds_menu_active_background_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"选中菜单的背景色",ds_name:"ds_menu_active_background_color",ds_ispro:true,ds_show_alpha:true,ds_color:"#ecf5ff",group1:"属性",group2:"导航栏选中样式"});s.push(L);var R=getProInfoByObj("switch",{ds_id:"ds_menu_default_checkfirst",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认选中第一个节点",ds_name:"ds_menu_default_checkfirst",ds_switch:false,ds_ispro:true,group1:"属性",group2:"默认选中"});s.push(R);var H=getProInfoByObj("switch",{ds_id:"ds_menu_unique_opened",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否只保持一个子菜单的展开",ds_name:"ds_menu_unique_opened",ds_switch:false,ds_ispro:true,group1:"属性",group2:"展开"});s.push(H);var W=getProInfoByObj("radio",{ds_id:"ds_menu_trigger",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"子菜单打开的触发方式",ds_name:"ds_menu_trigger",ds_radio:"hover",ds_options:[{value:"hover",text:"鼠标悬浮"},{value:"click",text:"鼠标点击"}],ds_radiobtn:true,ds_ispro:true,ds_show:false,group1:"属性",group2:"展开"});s.push(W);var J=getProInfoByObj("switch",{ds_id:"ds_menu_collapse_transition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否开启折叠",ds_name:"ds_menu_collapse_transition",ds_switch:false,ds_ispro:true,ds_show:true,group1:"属性",group2:"展开"});s.push(J);var K=getProInfoByObj("switch",{ds_id:"ds_menu_filter",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"开启过滤",ds_name:"ds_menu_filter",ds_switch:false,ds_ispro:true,ds_show:true,group1:"属性",group2:"过滤"});s.push(K);var Q=getProInfoByObj("select",{ds_id:"ds_menu_filterField",ds_pid:VUECFG.ctrlId,ds_labeltxt:"过滤字段",ds_show:true,ds_placeholder:"默认为节点名称",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_name:"ds_menu_filterField",ds_ispro:true,ds_multiple:true,group1:"属性",group2:"过滤"});s.push(Q);var X=getProInfoByObj("textarea",{ds_id:"ds_menu",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"自定义数据",ds_placeholder:"",ds_textarea:"",ds_name:"ds_menu",ds_valformat:"JSON",ds_ispro:true,group1:"属性",group2:"自定义数据"});s.push(X);var Y=getProInfoByObj("input",{ds_id:"ds_param",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"推送参数名",ds_placeholder:"控件推送参数名",ds_input:"",ds_name:"ds_param",ds_ispro:true,group1:"参数推送",group2:""});s.push(Y);var Z=getProInfoByObj("input",{ds_id:"ds_backParamCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"撤销推送条件",ds_placeholder:"推送参数名.A=='a'||推送参数名.A=='b'",ds_input:"",ds_name:"ds_backParamCondition",ds_ispro:true,group1:"参数推送",group2:""});s.push(Z);var ee=getProInfoByObj("select",{ds_id:"ds_trigger",ds_pid:VUECFG.ctrlId,ds_labeltxt:"触发刷新控件",ds_placeholder:"请选择触发刷新控件",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:[],ds_select_visible_change:"getAllPageCtrl",ds_select:"",ds_name:"ds_trigger",ds_ispro:true,ds_multiple:true,group1:"控件加载",group2:""});s.push(ee);var se=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true,group1:"控件加载",group2:""});s.push(se);var de=getProInfoByObj("switch",{ds_id:"ds_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示控件",ds_name:"ds_show",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});s.push(de);var te=getProInfoByObj("input",{ds_id:"ds_showCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",ds_input:"",ds_name:"ds_showCondition",ds_ispro:true,group1:"显示设置",group2:""});s.push(te);var _e=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(_e);var re=getProInfoByObj("jseditor",{ds_id:"ds_menu_click",ds_pid:VUECFG.ctrlId,ds_labeltxt:"菜单点击事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{index: 选中菜单项的 index, indexPath: 选中菜单项的 index path,type:点击类型}",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_menu_click",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(re);if(VUECFG.proObj[VUECFG.ctrlId]&&!e){var ie=VUECFG.proObj[VUECFG.ctrlId];for(var oe=0;oe<s.length;oe++){for(var ne=0;ne<ie.length;ne++){if(s[oe].info.ds_name==ie[ne].info.ds_name){var d=s[oe].type.split("drag_")[1];s[oe].info["ds_"+d]=ie[ne].info["ds_"+d];if(!$DS.util.isUndefined(ie[ne].info["ds_show"]))s[oe].info["ds_show"]=ie[ne].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(s);VUECFG.proObj[VUECFG.ctrlId]=s;$("#templetePro").click()}function isShowSetting(e,s){debugger;var d=$DS.getCtrlById(e.ds_pid).info;if(d.ds_datasource&&$DS.getSourceById(d.ds_datasource).sourceType=="sqlData"){$DS.setRightProShow(e.ds_pid,{ds_menu_submenuField_sql:s,ds_menu_pid_sql:s})}else{$DS.setRightProShow(e.ds_pid,{ds_menu_submenuField:s,ds_menu_pid:s})}}function menuSearchForOut(e,s){$menu["outType"]="search";$menu["inputVal"]=s;$("#"+e+"_outclick").click()}function changeCollapse(e,s){$menu["outType"]="changeCollapse";$menu["collapseType"]=s;$("#"+e+"_outclick").click()}function outclick(){var e=$menu["outType"];switch(e){case"search":this.innerSearch();break;case"changeCollapse":this.changeCollapseType();break}delete $menu["outType"]}function innerSearch(){var e=[];var s=$menu["inputVal"];var d=temporary.menuContrast[this.info.ds_id];if(s===""||s===undefined){this.info.ds_menu_fiterData=false}else{var t=$DS.util.clone(d);t=$DS.util.childrenToList(t,"children",[]);if(!this.info.ds_menu_filterField||this.info.ds_menu_filterField&&this.info.ds_menu_filterField.length==0){var _=this.info.ds_menu_name?this.info.ds_menu_name:"NAME";e=getFilterData(t,[_],e,s)}else{e=getFilterData(t,this.info.ds_menu_filterField,e,s)}e=$DS.util.children(e,"ID","PID","children");this.info.ds_menu_fiterData=e}if(e&&e.length>0){this.$nextTick(()=>{$("#"+this.info.ds_id+"_"+e[0].ID).parent().click()})}}function getFilterData(e,s,d,t){for(let _=0;_<e.length;_++){for(let r=0;r<s.length;r++){if(e[_][s[r]]&&e[_][s[r]].indexOf(t)!==-1){if(e[_].children){delete e[_].children}d.push(e[_])}}}return d}function changeCollapseType(){this.info.ds_menu_collapse_transition=$menu.collapseType;delete $menu.collapseType}function setMenuVal(e,s,d){var t=$DS.getCtrlById(e).info;t.ds_menu_fiterData=false;var _=getSourceById(VUECFG.groupObj[e]);if(_){if(!s&&t.ds_name&&$DS.getSourceData(_,d)){s=$DS.getSourceData(_,d)}changeMenuProForSqlData(t,_.sourceType);t.ds_menu=s}else{t.ds_menu=s?s:[]}}function getMenuVal(e){var s=$DS.getCtrlById(e);if(!s)console.error("【ID为"+e+"】的控件不存在!");return s.info.ds_menu_curr_data}function clearMenuVal(e){e.info.ds_menu_curr_data=[]}function changeMenuProForSqlData(e,s){debugger;var d=$DS.getCtrlType(e.ds_id);var t={};var _={};let r=true;if(s=="sqlData"){r=false}else{r=true}if(d=="menu"){t={ds_menu_url:r,ds_menu_name:r,ds_menu_shortName:r,ds_menu_submenuField:r,ds_menu_pid:r,ds_menu_guid:r,ds_menu_url_sql:!r,ds_menu_name_sql:!r,ds_menu_shortName_sql:!r,ds_menu_submenuField_sql:!r,ds_menu_pid_sql:!r,ds_menu_guid_sql:!r}}for(let e in t){_[e+"_sql"]=!r}$DS.setRightProShow(e.ds_id,t)}function isTrigger(e){if(!temporary.firstTriggerObj[e.ds_id]&&e.ds_menu_default_checkfirst){temporary.firstTriggerObj[e.ds_id]=true;return false}return true}function changeMenuIconSetType(e,s){if(s=="iconClass"){$DS.setRightProShow(e.ds_pid,{ds_menu_iconField:false,ds_menu_iconClass:true})}else{$DS.setRightProShow(e.ds_pid,{ds_menu_iconField:true,ds_menu_iconClass:false})}}