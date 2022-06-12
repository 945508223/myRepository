var $poptree={type:"drag_poptree",dataType:"singeleData",uuid:Date.parse(new Date),getConfig:getPoptreeConfig,register:registerPoptree,showProperty:showPropertyPoptree,setData:setPoptreeVal,getData:getPoptreeVal,clearData:clearPoptreeVal};function getPoptreeConfig(){return{ds_id:"",ds_ctrlname:"POPTREE_"+$poptree.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"5rem",ds_labelwidth:"10",ds_labelcolor:"#606266",ds_labelfontweight:"bold",ds_labelfontfamily:"微软雅黑",ds_labelfontsize:"1",ds_innerwidth:"calc(100% - 2rem)",ds_style:"drawing-item",ds_name:"",ds_datasource:"",ds_refdatasource:"",ds_refdatasource_filter:"",ds_options:[],ds_showlable:true,ds_isrequired:false,ds_param:"",ds_backParamCondition:"",ds_trigger:"",ds_loading:"normal",ds_out_padding:"1rem",ds_out_margin:"0rem",ds_ispro:false,ds_pid:"",ds_draggable:"true",ds_poptree:"",ds_poptree_node:[],ds_poptree_title:"选择节点",ds_poptree_width:"60%",ds_poptree_height:"80%",ds_poptree_showCheckbox:false,ds_poptreee_indent:16,ds_poptree_default_expand_all:false,ds_poptree_check_strictly:false,ds_poptree_filterFields:[],ds_poptree_rootId:"#",ds_poptree_expend_on_click_node:false,ds_poptree_current_node_key:"",ds_poptree_default_checked_keys:[],ds_poptree_default_expanded_keys:[],ds_defaultval:"",ds_labeltxt:"弹出树",ds_placeholder:"请点选择树节点",ds_prepend:"",ds_append:"",ds_maxlength:"",ds_clearable:false,ds_readonly:true,ds_disabled:false,ds_title:"",ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_poptree_selectCallback:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:回调节点数据",ds_poptree_change:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值"}}function registerPoptree(){Vue.component("drag_poptree",{props:["type","info"],created:function(){this.$nextTick(function(){addListener(this);window.top[this.info.ds_id+"popTreeRef"]=this;if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;VUECFG.$refs[this.info.ds_id]=this})},destroyed:function(){delete window.top[this.info.ds_id+"popTreeRef"]},data:function(){return{hide:"y-hide",refdate:Date.parse(new Date)}},computed:{computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_outerstyle:function(){if(this.info.ds_ispro===true){return{padding:"1rem 0px"}}return{padding:this.info.ds_out_padding,margin:this.info.ds_out_margin}},computed_width:function(){return this.info.ds_showlable?"calc("+this.info.ds_innerwidth+" - "+this.info.ds_labelwidth+"rem)":this.info.ds_innerwidth},computed_show:function(){var refdateStr=`${this.refdate}_change`;if(!VUECFG.viewStatu){if(this.info.ds_showCondition){var str=$DS.util.replace(this.info.ds_showCondition);return eval(str)?"y-show":"y-hide"}return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{return this.info.ds_show?"y-show":"y-hide"}},computed_marginleft:function(){return this.info.ds_showlable?this.info.ds_labelwidth+"rem":"0rem"},computed_isrequired:function(){return this.info.ds_isrequired?"ds_isrequired":""},computed_poptree:function(){if(this.info.ds_poptree&&this.info.ds_options&&this.info.ds_options.length>0){let e=this.info.ds_poptree.split(",");let d=[];let s=$DS.util.childrenToList(this.info.ds_options,"children",[]);this.info.ds_poptree_node=s.filter(s=>{if(e.indexOf(s.ID)!=-1){d.push(s.NAME);return s}});this.info.ds_poptree_default_expanded_keys=e;if(this.info.ds_poptree_showCheckbox){this.info.ds_poptree_default_checked_keys=e}else this.info.ds_poptree_current_node_key=e[0];this.info.ds_poptree=d.join(",")}return this.info.ds_poptree},computed_title:function(){return this.info.ds_title},computed_labelstyle:function(){return{width:this.info.ds_labelwidth+"rem",color:this.info.ds_labelcolor,fontWeight:!this.info.ds_ispro?this.info.ds_labelfontweight:"normal",fontFamily:this.info.ds_labelfontfamily,fontSize:this.info.ds_labelfontsize}},computed_poptreeTreeId:function(){return this.info.ds_id+"_poptreeTreeId"}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,showPoptree:showPoptree,poptreeInputChange:poptreeInputChange},template:util.getModelHtml("drag_poptree")})}function loadSuccess(e,d){var s=this.info;$DS.eval(s.ds_load_success,s)}function poptreeInputChange(e,d){debugger;$DS.eval(e.ds_poptree_change,e,e.ds_poptree_node);$DS.dealPms(e,e.ds_poptree_node);if(e.ds_trigger&&e.ds_trigger.length>0){triggerComps(e.ds_trigger,$DS.getCtrlType(e.ds_id))}if(e.ds_ispro){if(e.ds_pid=="PAGE"){$page.onchage(e,d);return}var s=VUECFG.formObj[e.ds_pid];s.info[e.ds_name]=d;VUECFG.$refs[e.ds_pid].refdate++}else{if(VUECFG.ctrlId){var t=VUECFG.proObj[VUECFG.ctrlId];for(var _=0;_<t.length;_++){if(t[_].info.ds_name=="ds_poptree"){VUECFG.proObj[VUECFG.ctrlId][_].info.ds_input=[d].join("");if(VUECFG.proArr[_]&&VUECFG.proArr[_].info)VUECFG.proArr[_].info.ds_input=[d].join("")}}}}}function changePoptreeRootId(e,d){debugger;var s=$DS.getCtrlById(e.ds_pid).info;var t=$DS.getSourceById(s.ds_datasource);var _=s.ds_poptree_rootId?s.ds_poptree_rootId:"#";var r=" and "+t.treePid+"='"+_+"'";t.filter=t.filter.replace(r,"");$DS.getCtrlById(e.ds_pid).info.ds_poptree_rootId=d}function isshowCheckStrictly(e,d){$DS.setRightProShow(e.ds_pid,{ds_poptree_check_strictly:d,ds_poptree_default_checked_keys:d})}function showPoptree(){debugger;var e=this.info;if(!this.info.ds_ispro){changeCurrId({currentTarget:$(`#${e.ds_id}`)[0],id:e.ds_id})}var d={ctrlId:e.ds_ispro?e.ds_pid:e.ds_id,ispro:e.ds_ispro,node_key:"ID",props:{label:"NAME",children:"children"},default_expand_all:e.ds_poptree_default_expand_all,indent:e.ds_poptreee_indent,show_checkbox:e.ds_poptree_showCheckbox,check_strictly:e.ds_poptree_check_strictly,filterFields:e.ds_poptree_filterFields,check_on_click_node:false,expand_on_click_node:e.ds_poptree_expend_on_click_node,current_node_key:e.ds_poptree_current_node_key,default_checked_keys:e.ds_poptree_default_checked_keys,default_expanded_keys:e.ds_poptree_default_expanded_keys};var s=e.ds_options;$DS.openCfgTree(d,s,function(d,s){var t=$DS.eval(e.ds_poptree_selectCallback,e,d);if(!t){return}if(d){e.ds_poptree_node=d;if(e.ds_poptree_showCheckbox==true){e.ds_poptree="";var _=[];for(let s=0;s<d.length;s++){if(s==d.length-1){e.ds_poptree+=d[s]["ID"]}else{e.ds_poptree+=d[s]["ID"]+","}_.push(d[s]["ID"])}e.ds_poptree_default_checked_keys=_}else{e.ds_poptree=d["ID"];e.ds_poptree_current_node_key=d["ID"];e.ds_poptree_default_expanded_keys=[];e.ds_poptree_default_expanded_keys.push(d["ID"])}}poptreeInputChange(e,e.ds_poptree)},e.ds_poptree_width,e.ds_poptree_height,e.ds_poptree_title)}function changePoptreeTreeSource(e,d){changeRefDataSourceForCtrl(e,d);var s=$DS.getCtrlById(e.ds_pid).info;s.ds_poptree_node=[];s.ds_poptree=""}function selectPoptreeCurrentNodeKey(e){var d=$DS.getCtrlById(e.ds_pid).info;if(e.ds_id==="ds_poptree_default_checked_keys"&&!d.ds_poptree_showCheckbox){alert("请先开启控件的复选框!");return}if(d.ds_refdatasource){var s=d.ds_options;var t={node_key:"ID",props:{label:"NAME",children:"children"},check_strictly:d.ds_poptree_check_strictly,show_checkbox:e.ds_id==="ds_poptree_current_node_key"?false:true,filterFields:["NAME"],expand_on_click_node:d.ds_poptree_expend_on_click_node,default_expanded_keys:d.ds_poptree_default_expanded_keys,default_checked_keys:d.ds_poptree_default_checked_keys,current_node_key:d.ds_poptree_current_node_key};$DS.openCfgTree(t,s,function(s,t){debugger;if(s){e.ds_input="";d.ds_poptree_default_expanded_keys=[];var _="ID";if(e.ds_id==="ds_poptree_default_checked_keys"){d.ds_poptree_default_checked_keys=[];for(let t=0;t<s.length;t++){d.ds_poptree_default_checked_keys.push(s[t][_]);d.ds_poptree_default_expanded_keys.push(s[t][_]);if(t===s.length-1){e.ds_input+=s[t][_]}else{e.ds_input+=s[t][_]+","}}}else{e.ds_input=s["ID"];d.ds_poptree_current_node_key=s[_];if(d.ds_poptree_showCheckbox){d.ds_poptree_default_expanded_keys=d.ds_poptree_default_checked_keys}if(d.ds_poptree_default_expanded_keys.indexOf(s[_])===-1){d.ds_poptree_default_expanded_keys.push(s[_])}}}},"50%","70%","设置默认选中节点")}else{alert("未设置树数据源!")}}function changePopTreeFieldOption(e,d){if(d){e.ds_options=getTreeSourceField(e.ds_pid)}}function getTreeSourceField(e){var d="";if(!e){d=$DS.getCtrlById(VUECFG.ctrlId).info}else{d=$DS.getCtrlById(e).info}var s=[];var t=d.ds_refdatasource;var _=$DS.getSourceById(t);if(_){var r=_.fieldInfo;for(var o in r){s.push({label:r[o].FIELD_NAMECN,value:o})}}return s}function setPoptreeVal(e,d,s){var t=$DS.getCtrlById(e);var _=getSourceById(VUECFG.groupObj[e]);if(_){if(!d&&t.info.ds_name&&$DS.getSourceData(_,s)){d=$DS.getSourceData(_,s)[t.info.ds_name]}t.info.ds_poptree=d}else{if(d){t.info.ds_poptree=d}else{t.info.ds_poptree="";t.info.ds_poptree_node=[];t.info.ds_poptree_filterFields=[]}}}function getPoptreeVal(e){var d=$DS.getCtrlById(e);if(!d)console.error("【ID为"+e+"】的控件不存在!");var s="ID";if(d.info.ds_poptree_node&&$DS.util.isArray(d.info.ds_poptree_node)&&d.info.ds_poptree_node.length>0){var t="";for(let e=0;e<d.info.ds_poptree_node.length;e++){if(e===d.info.ds_poptree_node.length-1){t+=d.info.ds_poptree_node[e][s]}else{t+=d.info.ds_poptree_node[e][s]+","}}return t}else if(d.info.ds_poptree_node){return d.info.ds_poptree_node[s]}return false}function clearPoptreeVal(e){e.info.ds_poptree="";e.info.ds_poptree_node=[];e.info.ds_poptree_filterFields=[]}function showPropertyPoptree(e){var d=[];var s=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$poptree.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});d.push(s);var t=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true});d.push(t);var _=getProInfoByObj("input",{ds_id:"ds_labeltxt",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题",ds_placeholder:"标题",ds_input:"弹出树",ds_name:"ds_labeltxt",ds_ispro:true});d.push(_);var r=getProInfoByObj("input",{ds_id:"ds_placeholder",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"占位提示",ds_placeholder:"占位提示",ds_input:"点击选择树节点",ds_name:"ds_placeholder",ds_ispro:true});d.push(r);var o=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true,ds_isrequired:false,group1:"",group2:""});d.push(o);var l=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"5rem",ds_name:"ds_height",ds_ispro:true});d.push(l);var p=getProInfoByObj("input",{ds_id:"ds_poptree",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认值",ds_placeholder:"默认值",ds_input:"",ds_name:"ds_poptree",ds_ispro:true});d.push(p);var a=getProInfoByObj("select",{ds_id:"ds_datasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据源",ds_placeholder:"数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_datasource",ds_ispro:true,group1:"数据源",group2:""});d.push(a);var i=getProInfoByObj("select",{ds_id:"ds_name",ds_pid:VUECFG.ctrlId,ds_labeltxt:"字段名",ds_placeholder:"字段名",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_change:"changeFieldNameForCtrl",ds_select_visible_change:"changeFieldOption",ds_name:"ds_name",ds_ispro:true,group1:"数据源",group2:""});d.push(i);var n=getProInfoByObj("select",{ds_id:"ds_refdatasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"引用数据源",ds_placeholder:"引用数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changePoptreeTreeSource",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_refdatasource",ds_ispro:true,group1:"数据源",group2:"引用数据源"});d.push(n);var u=getProInfoByObj("textarea",{ds_id:"ds_refdatasource_filter",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"引用过滤条件",ds_placeholder:"普通过滤条件: AND GUID=\\${V.URL_GUID,''}###撤销参数条件: AND=>[AND]或者OR=>[OR]###参数表达式:\\${V.参数池中参数名,'缺省值'}",ds_textarea:"",ds_name:"ds_refdatasource_filter",ds_ispro:true,group1:"数据源",group2:"引用数据源"});d.push(u);var c=getProInfoByObj("input",{ds_id:"ds_innerwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"组件宽度",ds_placeholder:"组件宽度",ds_input:"calc(100% - 2rem)",ds_name:"ds_innerwidth",ds_ispro:true,group1:"属性",group2:"组件布局"});d.push(c);var g=getProInfoByObj("input",{ds_id:"ds_out_padding",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"内边距大小",ds_placeholder:"内边距大小",ds_input:"1rem",ds_name:"ds_out_padding",ds_ispro:true,group1:"属性",group2:"组件布局"});d.push(g);var f=getProInfoByObj("input",{ds_id:"ds_out_margin",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外边距大小",ds_placeholder:"外边距大小",ds_input:"0rem",ds_name:"ds_out_margin",ds_ispro:true,group1:"属性",group2:"组件布局"});d.push(f);var h=getProInfoByObj("input",{ds_id:"ds_labelwidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题宽度",ds_placeholder:"标题宽度",ds_input:"10",ds_name:"ds_labelwidth",ds_ispro:true,ds_append:"rem",group1:"属性",group2:"标题样式"});d.push(h);var b=getProInfoByObj("color",{ds_id:"ds_labelcolor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题颜色",ds_name:"ds_labelcolor",ds_ispro:true,ds_show_alpha:true,ds_color:"#606266",group1:"属性",group2:"标题样式"});d.push(b);var y=getProInfoByObj("select",{ds_id:"ds_labelfontweight",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体加粗",ds_placeholder:"标题字体加粗",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontWeight(),ds_select:"bold",ds_name:"ds_labelfontweight",ds_ispro:true,group1:"属性",group2:"标题样式"});d.push(y);var m=getProInfoByObj("select",{ds_id:"ds_labelfontfamily",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标题字体样式",ds_placeholder:"标题字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getFontFamily(),ds_select:"微软雅黑",ds_name:"ds_labelfontfamily",ds_ispro:true,group1:"属性",group2:"标题样式"});d.push(m);var I=getProInfoByObj("input",{ds_id:"ds_labelfontsize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标题字体大小",ds_placeholder:"标题字体大小",ds_input:"1rem",ds_name:"ds_labelfontsize",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"标题样式"});d.push(I);var C=getProInfoByObj("input",{ds_id:"ds_poptree_rootId",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"根节点ID",ds_placeholder:"默认为 '#'",ds_input:"#",ds_name:"ds_poptree_rootId",ds_ispro:true,ds_show:false,ds_input_blur:"changePoptreeRootId",group1:"属性",group2:"弹出树属性"});d.push(C);var v=getProInfoByObj("input",{ds_id:"ds_poptree_title",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"弹出树标题",ds_placeholder:"弹出树标题",ds_input:"",ds_name:"ds_poptree_title",ds_ispro:true,group1:"属性",group2:"弹出树属性"});d.push(v);var F=getProInfoByObj("input",{ds_id:"ds_poptree_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"弹出树宽度",ds_placeholder:"弹出树宽度",ds_input:"60%",ds_name:"ds_poptree_width",ds_ispro:true,group1:"属性",group2:"弹出树属性"});d.push(F);var x=getProInfoByObj("input",{ds_id:"ds_poptree_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"弹出树高度",ds_placeholder:"弹出树高度",ds_input:"80%",ds_name:"ds_poptree_height",ds_ispro:true,group1:"属性",group2:"弹出树属性"});d.push(x);var w=getProInfoByObj("input",{ds_id:"ds_poptreee_indent",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点缩进",ds_placeholder:"相邻级节点间的水平缩进",ds_input:16,ds_name:"ds_poptreee_indent",ds_ispro:true,ds_valformat:"NUMBER",group1:"属性",group2:"弹出树属性"});d.push(w);var k=getProInfoByObj("select",{ds_id:"ds_poptree_filterFields",ds_pid:VUECFG.ctrlId,ds_labeltxt:"过滤字段",ds_show:true,ds_placeholder:"默认为节点名称",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getTreeSourceField(),ds_select:"",ds_select_visible_change:"changePopTreeFieldOption",ds_name:"ds_poptree_filterFields",ds_ispro:true,ds_multiple:true,group1:"属性",group2:"弹出树属性"});d.push(k);var P=getProInfoByObj("radio",{ds_id:"ds_poptree_expend_on_click_node",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"展开方式",ds_name:"ds_poptree_expend_on_click_node",ds_radio:false,ds_options:[{value:true,text:"点击节点"},{value:false,text:"点击箭头"}],ds_radiobtn:true,ds_ispro:true,group1:"属性",group2:"弹出树属性"});d.push(P);var V=getProInfoByObj("input",{ds_id:"ds_poptree_current_node_key",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认选中的节点",ds_placeholder:"",ds_input:"",ds_name:"ds_poptree_current_node_key",ds_ispro:true,ds_input_focus:"selectPoptreeCurrentNodeKey",group1:"属性",group2:"弹出树属性"});d.push(V);var E=getProInfoByObj("input",{ds_id:"ds_poptree_default_checked_keys",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"默认勾选的节点",ds_placeholder:"",ds_input:"",ds_name:"ds_poptree_default_checked_keys",ds_ispro:true,ds_input_focus:"selectPoptreeCurrentNodeKey",ds_show:false,group1:"属性",group2:"弹出树属性"});d.push(E);var U=getProInfoByObj("switch",{ds_id:"ds_poptree_showCheckbox",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否开启复选框",ds_name:"ds_poptree_showCheckbox",ds_switch:false,ds_ispro:true,ds_active_value:true,ds_inactive_value:false,ds_switch_change:"isshowCheckStrictly",group1:"属性",group2:"弹出树属性"});d.push(U);var j=getProInfoByObj("switch",{ds_id:"ds_poptree_check_strictly",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"父子节点不关联",ds_name:"ds_poptree_check_strictly",ds_switch:false,ds_ispro:true,ds_active_value:true,ds_inactive_value:false,ds_show:false,group1:"属性",group2:"弹出树属性"});d.push(j);var G=getProInfoByObj("switch",{ds_id:"ds_poptree_default_expand_all",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"展开所有节点",ds_name:"ds_poptree_default_expand_all",ds_switch:false,ds_ispro:true,group1:"属性",group2:"弹出树属性"});d.push(G);var O=getProInfoByObj("switch",{ds_id:"ds_readonly",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否只读",ds_name:"ds_readonly",ds_switch:true,ds_ispro:true,group1:"属性",group2:"弹出树属性"});d.push(O);var D=getProInfoByObj("switch",{ds_id:"ds_disabled",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否禁用",ds_name:"ds_disabled",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(D);var B=getProInfoByObj("switch",{ds_id:"ds_isrequired",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否必填",ds_name:"ds_isrequired",ds_switch:false,ds_ispro:true,group1:"属性",group2:"组件属性"});d.push(B);var S=getProInfoByObj("input",{ds_id:"ds_maxlength",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"最多输入",ds_placeholder:"最多输入",ds_input:"",ds_name:"ds_maxlength",ds_ispro:true,ds_append:"个字符",group1:"属性",group2:"数值格式"});d.push(S);var A=getProInfoByObj("input",{ds_id:"ds_prepend",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"前缀",ds_placeholder:"前缀",ds_input:"",ds_name:"ds_prepend",ds_ispro:true,group1:"属性",group2:"前后缀"});d.push(A);var T=getProInfoByObj("input",{ds_id:"ds_append",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"后缀",ds_placeholder:"后缀",ds_input:"",ds_name:"ds_append",ds_ispro:true,group1:"属性",group2:"前后缀"});d.push(T);var N=getProInfoByObj("input",{ds_id:"ds_title",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"提示内容",ds_placeholder:"提示内容",ds_input:"",ds_name:"ds_title",ds_ispro:true,ds_isrequired:false,group1:"属性",group2:"提示信息"});d.push(N);var R=getProInfoByObj("input",{ds_id:"ds_defaultval",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"缺省值",ds_placeholder:"${V.参数,'缺省值'}",ds_input:"",ds_name:"ds_defaultval",ds_ispro:true,group1:"缺省值",group2:""});d.push(R);var q=getProInfoByObj("input",{ds_id:"ds_param",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"推送参数名",ds_placeholder:"控件推送参数名",ds_input:"",ds_name:"ds_param",ds_ispro:true,group1:"参数推送",group2:""});d.push(q);var M=getProInfoByObj("input",{ds_id:"ds_backParamCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"撤销推送条件",ds_placeholder:"推送参数名.A=='a'||推送参数名.A=='b'",ds_input:"",ds_name:"ds_backParamCondition",ds_ispro:true,group1:"参数推送",group2:""});d.push(M);var L=getProInfoByObj("select",{ds_id:"ds_trigger",ds_pid:VUECFG.ctrlId,ds_labeltxt:"触发刷新控件",ds_placeholder:"请选择触发刷新控件",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:[],ds_select_visible_change:"getAllPageCtrl",ds_select:"",ds_name:"ds_trigger",ds_ispro:true,ds_multiple:true,group1:"控件加载",group2:""});d.push(L);var z=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true,group1:"控件加载",group2:""});d.push(z);var K=getProInfoByObj("switch",{ds_id:"ds_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示控件",ds_name:"ds_show",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});d.push(K);var W=getProInfoByObj("input",{ds_id:"ds_showCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",ds_input:"",ds_name:"ds_showCondition",ds_ispro:true,group1:"显示设置",group2:""});d.push(W);var H=getProInfoByObj("switch",{ds_id:"ds_showlable",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示标题",ds_name:"ds_showlable",ds_switch:true,ds_ispro:true,group1:"显示设置",group2:""});d.push(H);var J=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});d.push(J);var Q=getProInfoByObj("jseditor",{ds_id:"ds_poptree_selectCallback",ds_pid:VUECFG.ctrlId,ds_labeltxt:"节点选中后",ds_placeholder:"",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:回调节点数据",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_poptree_selectCallback",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});d.push(Q);var X=getProInfoByObj("jseditor",{ds_id:"ds_poptree_change",ds_pid:VUECFG.ctrlId,ds_labeltxt:"变更事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更值",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_poptree_change",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});d.push(X);if(VUECFG.proObj[VUECFG.ctrlId]&&!e){var Y=VUECFG.proObj[VUECFG.ctrlId];for(var Z=0;Z<d.length;Z++){for(var ee=0;ee<Y.length;ee++){if(d[Z].info.ds_name==Y[ee].info.ds_name){var s=d[Z].type.split("drag_")[1];d[Z].info["ds_"+s]=Y[ee].info["ds_"+s];if(!$DS.util.isUndefined(Y[ee].info["ds_show"]))d[Z].info["ds_show"]=Y[ee].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(d);VUECFG.proObj[VUECFG.ctrlId]=d;$("#templetePro").click()}