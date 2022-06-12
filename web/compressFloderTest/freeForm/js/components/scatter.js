var $scatter={type:"drag_scatter",dataType:"allData",uuid:Date.parse(new Date),isCanvas:true,getConfig:getScatterConfig,register:registerScatter,showProperty:showPropertyScatter,setData:setScatterData,getData:getScatterVal,getDefaultData:getDefaultScatterData,clearData:clearScatterVal};function getScatterConfig(){let e=chartsBaseConfig.getBaseConfigByNames(["title","legend","tooltip","toolbox","xAxis","yAxis","grid","dataZoom","axisPointer"]);let s={ds_id:"",ds_ctrlname:"SCATTER_"+$scatter.uuid++,ds_show:true,ds_showCondition:"",ds_width:"100%",ds_height:"25rem",ds_innerwidth:"calc(100% - 2rem)",ds_style:"drawing-item",ds_datasource:"",ds_name:"",ds_group_fields:[],ds_group_cfg:[],ds_showlable:true,ds_isrequired:false,ds_param:"",ds_backParamCondition:"",ds_trigger:"",ds_loading:"normal",ds_out_padding:"0rem",ds_out_margin:"0rem",ds_ispro:false,ds_pid:"",ds_draggable:"true",ds_isEchart:true,ds_isRefresh_onTime:false,ds_refresh_onTime_frequency:5e3,ds_data_limit_before:"",ds_data_limit_after:"",ds_data_condition:[],ds_dimToMeasure:true,ds_selectcolumns:[],ds_scatter:[],ds_columns:[],ds_labeltxt:"散点图",ds_animation:true,ds_series_animationDuration:1e3,ds_series_animationEasing:"cubicOut",ds_series_hoverAnimation:true,ds_chartsColor:["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],ds_background_color:"",ds_series_name:"访问来源",ds_series_type:"scatter",ds_series_symbol:"circle",ds_series_symbolSize:"4",ds_series_symbolRotate:"0",ds_series_avoidLabelOverlap:"true",ds_custom_data:"",ds_series_itemStyle_opacity:1,ds_series_itemStyle_borderWidth:0,ds_series_itemStyle_borderColor:"#000",ds_series_itemStyle_borderType:"solid",ds_series_itemStyle_shadowBlur:0,ds_series_itemStyle_shadowColor:"#333",ds_series_itemStyle_shadowOffsetX:0,ds_series_itemStyle_shadowOffsetY:0,ds_series_label_show:true,ds_series_label_position:"top",ds_series_label_distance:5,ds_series_label_customPosition:"",ds_series_label_fontStyle:"normal",ds_series_label_fontWeight:"normal",ds_series_label_fontFamily:"",ds_series_label_fontSize:12,ds_series_label_color:["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],ds_series_label_align:"auto",ds_series_label_verticalAlign:"auto",ds_series_label_formatter:"",ds_series_label_rich:"",ds_isDynamic:false,ds_rollDataNum:3,ds_changeTimes:3e3,ds_direct:"toRight",ds_before_setOption:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:图形配置项",ds_load_success:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_scatter_click:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",ds_scatter_dbclick:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据"};return $.extend(e,s)}function registerScatter(){Vue.component("drag_scatter",{props:["type","info"],created:function(){this.$nextTick(function(){addListener(this);if(!this.info.ds_ispro)temporary.loadRegister[this.info.ds_id]=true;VUECFG.$refs[this.info.ds_id]=this})},watch:{computed_resize(e,s){var d=temporary[this.info.ds_id+"_dsChart"];setTimeout(function(){d.resize()},10)}},data:function(){return{isFirstCreated:true,multiple:this.info.ds_multiple,hide:"y-hide",refdate:Date.parse(new Date)}},computed:{computed_resize:function(){return{height:this.info.ds_height,width:this.info.ds_width}},computed_option:function(){var e=$DS.echart.buildBaseOption(getScatterModel(),this.info,"scatter",this.info.ds_scatter);e=handleScatterOption(e,this.info);this.$nextTick(function(){if(this.isFirstCreated===true){this.isFirstCreated=false;temporary[this.info.ds_id+"_dsChart"]=echarts.init(document.getElementById(this.info.ds_id+"_scatter"));$(`#${this.info.ds_id}_scatter`).removeAttr("_echarts_instance_");bindScatterEvent(temporary[this.info.ds_id+"_dsChart"],this.info)}if(this.info.ds_before_setOption){$DS.eval(this.info.ds_before_setOption,this.info,e)}temporary[this.info.ds_id+"_computedOption"]=e;temporary[this.info.ds_id+"_dsChart"].clear();temporary[this.info.ds_id+"_dsChart"].setOption(e);console.log(JSON.stringify(e));$DS.echart.setTimeRefresh(this.info);$DS.echart.dynamicLoad(this.info)});return""},computed_scattername:function(){if(!VUECFG.viewStatu)return this.info.ds_ctrlname;return""},computed_show:function(){var e=`${this.refdate}_change`;if(!VUECFG.viewStatu){return this.info.ds_ispro&&!this.info.ds_show?"y-hide":"y-show"}else{return this.info.ds_show?"y-show":"y-hide"}},computed_drag:function(){if(VUECFG.viewStatu)return false;return this.info.ds_draggable},computed_Ts:function(){if(!this.info.ds_showTitTip&&VUECFG.viewStatu){return{height:"0rem"}}},computed_style:function(){var e={height:"100%",width:"100%",padding:this.info.ds_out_padding,margin:this.info.ds_out_margin};return e},computed_padding:function(){if(this.info.ds_ispro===true){return"1rem 0px"}},computed_marginleft:function(){return this.info.ds_showlable?this.info.ds_labelwidth+"rem":"0rem"}},methods:{changeCurrId:changeCurrId,mouseOver:ctrlMouseOver,mouseLeave:ctrlMouseLeave,selectScatterBySource:selectScatterBySource},template:util.getModelHtml("drag_scatter")})}function bindScatterEvent(e,s){e.on("click",function(e){if(s.ds_scatter_click){delete e.event;$DS.eval(s.ds_scatter_click,s,e);$DS.dealPms(s,[e]);if(s.ds_trigger&&s.ds_trigger.length>0){let e=s.ds_trigger.filter(e=>e!==s.ds_id);triggerComps(e,$DS.getCtrlType(s.ds_id),s.ds_id)}}});e.on("dblclick",function(e){delete e.event;if(s.ds_scatter_dbclick){$DS.eval(s.ds_scatter_dbclick,s,e)}$DS.dealPms(s,[e]);if(s.ds_trigger&&s.ds_trigger.length>0){let e=s.ds_trigger.find(e=>e===s.ds_id);if(e)temporary[s.ds_id+"_loadSelf"]=true;triggerComps(s.ds_trigger,$DS.getCtrlType(s.ds_id),s.ds_id)}})}function scatterColors(e,s){var d=e.ds_input;if(d&&d.length>0){var t=new Base64;for(let e=0;e<d.length;e++){if(d[e].content&&isBase64Code(d[e].content)){d[e].content=t.decode(d[e].content)}}}$DS.openCfgTable([{field:"color",title:"散点颜色",width:.5,codeType:"color",defaultval:"#5470c6"}],d,function(s,d){s=JSON.parse(s);var t=[];for(var r in s){t.push(s[r].color)}$DS.getCtrlById(e.ds_pid).info.ds_chartsColor=t;e.ds_input=s},"90%","80%","选择颜色",{id:e.ds_pid})}function areaColors(e,s){var d=e.ds_input;var t="标签颜色";if(d&&d.length>0){var r=new Base64;for(let e=0;e<d.length;e++){if(d[e].content&&isBase64Code(d[e].content)){d[e].content=r.decode(d[e].content)}}}$DS.openCfgTable([{field:"color",title:t,width:1,codeType:"color",defaultval:"#5470c6"}],d,function(s,d){s=JSON.parse(s);var t=[];for(var r in s){t.push(s[r].color)}$DS.getCtrlById(e.ds_pid).info[e.ds_id]=t;e.ds_input=s},"90%","80%","选择颜色",{id:e.ds_pid})}function selectScatterBySource(e){var s=$DS.getCtrlById(e.ds_pid).info;if(!s.ds_datasource){$("#"+e.ds_id).find("input").blur();console.error("未设置数据源");if(e&&e.stopPropagation){e.stopPropagation()}else{e.cancelBubble=true}}else{s.ds_columns=$DS.getSourceById(s.ds_datasource).columns;var d=$DS.util.clone(s.ds_columns);var t=$DS.util.clone(s.ds_selectcolumns);var r=Date.parse(new Date);var a={sourceCols:d,selectCols:t,ctrlId:s.ds_id,ctrlCols:t};window.top[r]=a;var l=$DS.util.getProjectName()+"/freeForm/manage/condi/selectEchartsColumns.html?sid="+r;var _={hideTit:false,time:"",beginClose:"",callBack:function(){if(temporary.echarsCtrlDM){temporary.echarsCtrlDM={}}debugger;$DS.loadCtrl($DS.getCtrlById(VUECFG.ctrlId).info.ds_ctrlname)}};$DS.showPage(l,"选择字段","90%","90%",_,false)}}function changeLabelPosition(e,s){var d=e.ds_pid;if(s===true){$DS.setRightProShow(d,{ds_series_label_customPosition:s});return}$DS.setRightProShow(d,{ds_series_label_customPosition:false})}function setScatterData(e,s,d){var t=getSourceById(VUECFG.groupObj[e]);var r=$DS.getCtrlById(e).info;if(s){if(r.ds_group_fields&&r.ds_group_fields.length>0&&r.ds_group_cfg&&r.ds_group_cfg.length>0){s=$DS.util.buildGroupData($DS.util.clone(s.rows?s.rows:s),r.ds_group_fields,r.ds_group_cfg)}r["ds_scatter"]="";r["ds_scatter"]=s.rows?s.rows:s;if(t){if(r["ds_sourceId"]&&r["ds_sourceId"]!=t.sourceId){r["ds_selectcolumns"]=[];if(temporary.echarsCtrlDM){delete temporary.echarsCtrlDM[r.ds_id]}}r["ds_sourceId"]=t.sourceId;r["ds_columns"]=$DS.util.clone(t.columns)}}else{r["ds_columns"]=[];r["ds_scatter"]=[];r["ds_selectcolumns"]=[]}}function getScatterVal(e){var s=$DS.getCtrlById(e);if(!s)console.error("【ID为"+e+"】的控件不存在!");return s.info.ds_scatter}function clearScatterVal(e){e.info.ds_scatter="";e.info.ds_columns=[];e.info.ds_selectcolumns=[];e.info.ds_custom_data=""}function getDefaultScatterData(){return{xAxis_data:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],yAxis_data:[{type:"value"}],legend_data:[{name:"YEAR"}],series_data:[{data:[820,932,901,934,1290,1330,1320],name:"YEAR",type:"scatter"}]}}function dataLimitChange(e,s){let d=$DS.getCtrlById(e.ds_pid).info;let t="ds_data_limit_before";let r="ds_data_limit_after";if(e.ds_id=="ds_data_limit_after"){t=e.ds_id;r="ds_data_limit_before"}if(s&&(isNaN(parseInt(s))||!$DS.util.isNumber(parseInt(s)))){alert("请输入数字!");return false}if(d[r]&&$DS.util.isNumber(parseInt(d[r]))&&$DS.util.isNumber(parseInt(s))){alert("两个限制条件只能设置一个!");return false}}function getScatterModel(){let e=chartsBaseModel.getEchartsModelByName(["title","legend","tooltip","toolbox","xAxis","yAxis","grid","axisPointer"]);let s={ds_isDynamic:"ds_isDynamic|BOOLEAN",ds_rollDataNum:"ds_rollDataNum|NUMBER",ds_changeTimes:"ds_changeTimes|NUMBER",ds_direct:"ds_direct|STRING",backgroundColor:"ds_background_color|STRING",series:[{animation:"ds_animation|BOOLEAN",animationDuration:"ds_series_animationDuration|NUMBER",animationEasing:"ds_series_animationEasing|STRING",type:"scatter",hoverAnimation:"ds_series_hoverAnimation|BOOLEAN",name:"ds_series_name",avoidLabelOverlap:"ds_series_avoidLabelOverlap|BOOLEAN",symbol:"ds_series_symbol",symbolSize:"ds_series_symbolSize|NUMBER",symbolRotate:"ds_series_symbolRotate|NUMBER",label:{show:"ds_series_label_show|BOOLEAN",position:"ds_series_label_position|STRING",distance:"ds_series_label_distance|NUMBER",color:"ds_series_label_color|ARRAY",fontSize:"ds_series_label_fontSize|NUMBER",fontStyle:"ds_series_label_fontStyle|STRING",fontWeight:"ds_series_label_fontWeight|STRING",fontFamily:"ds_series_label_fontFamily|STRING",align:"ds_series_label_align|STRING",verticalAlign:"ds_series_label_verticalAlign|STRING",formatter:"ds_series_label_formatter|FUNCTION",rich:"ds_series_label_rich|OBJECT"},itemStyle:{borderWidth:"ds_series_itemStyle_borderWidth|NUMBER",borderColor:"ds_series_itemStyle_borderColor|STRING",borderType:"ds_series_itemStyle_borderType|STRING",color:"ds_chartsColor|ARRAY",shadowBlur:"ds_series_itemStyle_shadowBlur|NUMBER",shadowColor:"ds_series_itemStyle_shadowColor|STRING",shadowOffsetX:"ds_series_itemStyle_shadowOffsetX|NUMBER",shadowOffsetY:"ds_series_itemStyle_shadowOffsetY|NUMBER",opacity:"ds_series_itemStyle_opacity|FLOAT"}}],ds_dimToMeasure:"ds_dimToMeasure|BOLLEAN",ds_isRefresh_onTime:"ds_isRefresh_onTime|BOOLEAN",ds_refresh_onTime_frequency:"ds_refresh_onTime_frequency|NUMBER"};return $.extend(e,s)}function handleScatterOption(e,s){e=$DS.echart.handleDataZoom(e,s);return e}function showPropertyScatter(e){var s=[];var d=getProInfoByObj("select",{ds_id:"type",ds_pid:VUECFG.ctrlId,ds_labeltxt:"组件类型",ds_placeholder:"组件类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:true,ds_options:getAllCtrl(),ds_select:$scatter.type,ds_select_change:"changeFormCtrl",ds_name:"type",ds_ispro:true});s.push(d);var t=getProInfoByObj("input",{ds_id:"ds_ctrlname",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件名",ds_placeholder:"控件名",ds_input:VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,ds_input_blur:"checkDuplication",ds_name:"ds_ctrlname",ds_ispro:true});s.push(t);var r=getProInfoByObj("input",{ds_id:"ds_width",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件宽度",ds_placeholder:"控件宽度",ds_input:"100%",ds_name:"ds_width",ds_ispro:true});s.push(r);var a=getProInfoByObj("input",{ds_id:"ds_height",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"控件高度",ds_placeholder:"控件高度",ds_input:"25rem",ds_name:"ds_height",ds_ispro:true});s.push(a);var l=getProInfoByObj("color",{ds_id:"ds_background_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"背景颜色",ds_name:"ds_background_color",ds_ispro:true,ds_show_alpha:true,ds_color:"rgba(128, 128, 128,0)"});s.push(l);var _=getProInfoByObj("select",{ds_id:"ds_trigger",ds_pid:VUECFG.ctrlId,ds_labeltxt:"触发刷新控件",ds_placeholder:"请选择触发刷新控件",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:[],ds_select_visible_change:"getAllPageCtrl",ds_select:"",ds_name:"ds_trigger",ds_ispro:true,ds_multiple:true});s.push(_);var o=getProInfoByObj("select",{ds_id:"ds_loading",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载机制",ds_placeholder:"请选择加载机制",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"first",label:"优先加载"},{value:"normal",label:"正常加载"},{value:"lazy",label:"懒加载"}],ds_select:"normal",ds_select_change:"changeCtrlLoading",ds_name:"ds_loading",ds_ispro:true});s.push(o);var i=getProInfoByObj("select",{ds_id:"ds_datasource",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据源",ds_placeholder:"数据源",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasource(),ds_select:"",ds_select_change:"changeDataSourceForCtrl",ds_select_visible_change:"changeDatasourceOption",ds_name:"ds_datasource",ds_ispro:true,group1:"数据源",group2:""});s.push(i);var n=getProInfoByObj("input",{ds_id:"ds_selectcolumns",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"选择字段",ds_placeholder:"点击选择字段",ds_input:"",ds_name:"ds_selectcolumns",ds_input_focus:"selectScatterBySource",ds_readonly:true,ds_ispro:true,group1:"数据源",group2:""});s.push(n);var c=getProInfoByObj("switch",{ds_id:"ds_dimToMeasure",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"末级维度不作为度量",ds_name:"ds_dimToMeasure",ds_switch:true,ds_ispro:true,group1:"数据源",group2:""});s.push(c);var u=getProInfoByObj("select",{ds_id:"ds_group_fields",ds_pid:VUECFG.ctrlId,ds_labeltxt:"数据分组主键",ds_placeholder:"数据分组主键",ds_style:"ds-mt-1",ds_draggable:"false",ds_options:getAllDatasourceField(),ds_select:"",ds_select_visible_change:"changeFieldOption",ds_select_change:"loadChartsCtrl",ds_name:"ds_group_fields",ds_multiple:true,ds_ispro:true,ds_isrequired:true,group1:"数据分组",group2:""});s.push(u);var p=getProInfoByObj("input",{ds_id:"ds_group_cfg",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"数据分组配置",ds_placeholder:"点击配置数据分组",ds_input:"",ds_name:"ds_group_cfg",ds_input_focus:"dataGroupCfg",ds_readonly:true,ds_ispro:true,ds_valformat:"JSON",group1:"数据分组",group2:""});s.push(p);var g=getProInfoByObj("input",{ds_id:"ds_data_limit_before",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"前n条",ds_placeholder:"输入数字",ds_input:"",ds_name:"ds_data_limit_before",ds_ispro:true,ds_valformat:"NUMBER",ds_input_change:"dataLimitChange",group1:"数据显示限制条数",group2:""});s.push(g);var f=getProInfoByObj("input",{ds_id:"ds_data_limit_after",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"后n条",ds_placeholder:"输入数字",ds_input:"",ds_name:"ds_data_limit_after",ds_ispro:true,ds_valformat:"NUMBER",ds_input_change:"dataLimitChange",group1:"数据显示限制条数",group2:""});s.push(f);var b=getProInfoByObj("input",{ds_id:"ds_data_condition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示条件",ds_placeholder:"点击设置显示条件",ds_input:"",ds_name:"ds_data_condition",ds_ispro:true,ds_valformat:"JSON",ds_input_focus:"dataCondition",group1:"数据显示限制条数",group2:""});s.push(b);var m=getProInfoByObj("switch",{ds_id:"ds_isRefresh_onTime",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"是否定时刷新",ds_name:"ds_isRefresh_onTime",ds_switch:false,ds_ispro:true,group1:"定时刷新",group2:""});s.push(m);var h=getProInfoByObj("input",{ds_id:"ds_refresh_onTime_frequency",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"定时刷新频率",ds_placeholder:"输入数字,单位毫秒,默认5000",ds_input:"5000",ds_name:"ds_refresh_onTime_frequency",ds_ispro:true,ds_valformat:"NUMBER",ds_input_change:"changeRefreshFrequency",group1:"定时刷新",group2:""});s.push(h);var y=getProInfoByObj("input",{ds_id:"ds_param",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"推送参数名",ds_placeholder:"控件推送参数名",ds_input:"",ds_name:"ds_param",ds_ispro:true,group1:"参数推送",group2:""});s.push(y);var v=getProInfoByObj("input",{ds_id:"ds_backParamCondition",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"撤销推送条件",ds_placeholder:"推送参数名.A=='a'||推送参数名.A=='b'",ds_input:"",ds_name:"ds_backParamCondition",ds_ispro:true,group1:"参数推送",group2:""});s.push(v);var I=getProInfoByObj("input",{ds_id:"ds_out_padding",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"内边距大小",ds_placeholder:"内边距大小",ds_input:"0rem",ds_name:"ds_out_padding",ds_ispro:true,group1:"组件布局",group2:""});s.push(I);var C=getProInfoByObj("input",{ds_id:"ds_out_margin",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"外边距大小",ds_placeholder:"外边距大小",ds_input:"0rem",ds_name:"ds_out_margin",ds_ispro:true,group1:"组件布局",group2:""});s.push(C);s=chartsBasePro.getBaseTitlePro(s);s=chartsBasePro.getBaseLegendPro(s);s=chartsBasePro.getBaseTooltipPro(s);s=chartsBasePro.getBaseToolboxPro(s);s=chartsBasePro.getBaseAxisPointerPro(s);s=chartsBasePro.getBaseDataZoomPro(s);s=chartsBasePro.getBaseGridPro(s);s=chartsBasePro.getBaseXaxisPro(s);s=chartsBasePro.getBaseYaxisPro(s);var S=getProInfoByObj("input",{ds_id:"ds_chartsColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"散点颜色",ds_placeholder:"散点颜色",ds_input:[{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#5470c6"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#91cc75"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#fac858"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#ee6666"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#73c0de"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#3ba272"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#fc8452"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#9a60b4"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"#ea7ccc"}],ds_name:"ds_chartsColor",ds_ispro:true,ds_input_focus:"scatterColors",ds_valformat:"JSON",ds_show_alpha:true,group1:"图形属性",group2:"节点"});s.push(S);var B=getProInfoByObj("input",{ds_id:"ds_series_itemStyle_opacity",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点透明度",ds_placeholder:"0~1",ds_input:"1",ds_name:"ds_series_itemStyle_opacity",ds_ispro:true,ds_valformat:"FLOAT",group1:"图形属性",group2:"节点"});s.push(B);var O=getProInfoByObj("select",{ds_id:"ds_series_symbol",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"散点图节点图标",ds_placeholder:"散点图节点图标",ds_input:"emptyCircle",ds_name:"ds_series_symbol",ds_options:[{value:"circle",label:"circle"},{value:"rect",label:"rect"},{value:"roundRect",label:"roundRect"},{value:"triangle",label:"triangle"},{value:"diamond",label:"diamond"},{value:"pin",label:"pin"},{value:"arrow",label:"arrow"},{value:"none",label:"none"}],ds_ispro:true,group1:"图形属性",group2:"节点"});s.push(O);var E=getProInfoByObj("input",{ds_id:"ds_series_symbolSize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点图标大小",ds_placeholder:"节点图标大小",ds_input:"4",ds_valformat:"NUMBER",ds_name:"ds_series_symbolSize",ds_ispro:true,group1:"图形属性",group2:"节点"});s.push(E);var w=getProInfoByObj("input",{ds_id:"ds_series_symbolRotate",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点图标旋转角度",ds_placeholder:"节点图标旋转角度",ds_input:"0",ds_name:"ds_series_symbolRotate",ds_valformat:"NUMBER",ds_ispro:true,group1:"图形属性",group2:"节点"});s.push(w);var P=getProInfoByObj("select",{ds_id:"ds_series_itemStyle_borderType",ds_pid:VUECFG.ctrlId,ds_labeltxt:"节点描边类型",ds_placeholder:"节点描边类型",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"solid",label:"实线"},{value:"left",label:"虚线"},{value:"right",label:"点"}],ds_select:"top",ds_name:"ds_series_itemStyle_borderType",ds_ispro:true,group1:"图形属性",group2:"节点"});s.push(P);var U=getProInfoByObj("input",{ds_id:"ds_series_itemStyle_borderWidth",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点描边宽度",ds_placeholder:"节点描边宽度",ds_input:0,ds_name:"ds_series_itemStyle_borderWidth",ds_valformat:"NUMBER",ds_ispro:true,group1:"图形属性",group2:"节点"});s.push(U);var F=getProInfoByObj("color",{ds_id:"ds_series_itemStyle_borderColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"散点节点描边颜色",ds_name:"ds_series_itemStyle_borderColor",ds_ispro:true,ds_show_alpha:true,ds_color:"rgba(0, 0, 0,1)",group1:"图形属性",group2:"节点"});s.push(F);var x=getProInfoByObj("input",{ds_id:"ds_series_itemStyle_shadowBlur",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点阴影宽度",ds_placeholder:"节点阴影宽度",ds_input:"",ds_name:"ds_series_itemStyle_shadowBlur",ds_ispro:true,ds_valformat:"NUMBER",group1:"图形属性",group2:"节点"});s.push(x);var j=getProInfoByObj("color",{ds_id:"ds_series_itemStyle_shadowColor",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点阴影颜色",ds_placeholder:"",ds_color:"",ds_name:"ds_series_itemStyle_shadowColor",ds_show_alpha:true,ds_ispro:true,group1:"图形属性",group2:"节点"});s.push(j);var G=getProInfoByObj("input",{ds_id:"ds_series_itemStyle_shadowOffsetX",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点阴影水平偏移",ds_placeholder:"节点阴影水平偏移",ds_input:"",ds_name:"ds_series_itemStyle_shadowOffsetX",ds_ispro:true,ds_valformat:"NUMBER",group1:"图形属性",group2:"节点"});s.push(G);var T=getProInfoByObj("input",{ds_id:"ds_series_itemStyle_shadowOffsetY",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"节点阴影阴影垂直偏移",ds_placeholder:"节点阴影阴影垂直偏移",ds_input:"",ds_name:"ds_series_itemStyle_shadowOffsetY",ds_ispro:true,ds_valformat:"NUMBER",group1:"图形属性",group2:"节点"});s.push(T);var V=getProInfoByObj("switch",{ds_id:"ds_series_hoverAnimation",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"拐点动画效果",ds_name:"ds_series_hoverAnimation",ds_switch:true,ds_ispro:true,group1:"图形属性",group2:"节点"});s.push(V);var D=getProInfoByObj("switch",{ds_id:"ds_series_label_show",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"显示散点图标签",ds_name:"ds_series_label_show",ds_switch:true,ds_ispro:true,group1:"图形属性",group2:"标签"});s.push(D);var R=getProInfoByObj("input",{ds_id:"ds_series_label_color",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标签颜色",ds_placeholder:"标签颜色",ds_input:[{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(84, 112, 198, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(145, 204, 117, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(250, 200, 88, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(238, 102, 102, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(115, 192, 222, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(59, 162, 114, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(252, 132, 82, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(154, 96, 180, 0.5)"},{field:"color",title:"数据颜色",width:.2,codeType:"color",color:"rgba(234, 124, 204, 0.5)"}],ds_name:"ds_series_label_color",ds_ispro:true,ds_input_focus:"areaColors",ds_valformat:"ARRAY",ds_show_alpha:true,group1:"图形属性",group2:"标签"});s.push(R);var N=getProInfoByObj("select",{ds_id:"ds_series_label_position",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标签位置",ds_placeholder:"标签位置",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"top",label:"顶部"},{value:"left",label:"居左"},{value:"right",label:"居右"},{value:"bottom",label:"底部"},{value:"insideLeft",label:"内侧居左"},{value:"insideRight",label:"内侧居右"},{value:"insideTop",label:"内侧居上"},{value:"insideBottom",label:"内侧居下"},{value:"insideTopLeft",label:"内侧左上"},{value:"insideBottomLeft",label:"内侧左下"},{value:"insideTopRight",label:"内侧右上"},{value:"insideBottomRight",label:"内侧右下"}],ds_select:"top",ds_name:"ds_series_label_position",ds_select_change:"changeLabelPosition",ds_ispro:true,group1:"图形属性",group2:"标签"});s.push(N);var A=getProInfoByObj("input",{ds_id:"ds_series_label_distance",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标签距离图形元素距离",ds_placeholder:"",ds_input:"5",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_name:"ds_series_label_distance",ds_valformat:"NUMBER",ds_ispro:true,group1:"图形属性",group2:"标签"});s.push(A);var M=getProInfoByObj("switch",{ds_id:"ds_series_avoidLabelOverlap",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标签防重叠",ds_name:"ds_series_avoidLabelOverlap",ds_switch:true,ds_ispro:true,group1:"图形属性",group2:"标签"});s.push(M);var L=getProInfoByObj("select",{ds_id:"ds_series_label_fontFamily",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标签字体",ds_placeholder:"标签字体",ds_options:[{value:"Arial",label:"Arial"},{value:"Courier New",label:"Courier New"},{value:"serif",label:"serif"},{value:"sans-serif",label:"sans-serif"},{value:"monospace",label:"monospace"},{value:"Microsoft YaHei",label:"微软雅黑"},{value:"KaiTi",label:"楷体"},{value:"SimSun",label:"宋体"},{value:"SimHei",label:"黑体"},{value:"STSong",label:"华文宋体"}],ds_select:"sans-serif",ds_group:false,ds_valformat:"STRING",ds_name:"ds_series_label_fontFamily",ds_ispro:true,group1:"图形属性",group2:"标签字体"});s.push(L);var k=getProInfoByObj("select",{ds_id:"ds_series_label_fontStyle",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标签字体样式",ds_placeholder:"标签字体样式",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"normal",label:"普通"},{value:"italic",label:"斜体"},{value:"oblique",label:"倾斜"}],ds_select:"normal",ds_name:"ds_series_label_fontStyle",ds_ispro:true,group1:"图形属性",group2:"标签字体"});s.push(k);var z=getProInfoByObj("select",{ds_id:"ds_series_label_fontWeight",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标签字体粗细",ds_placeholder:"标签字体粗细",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"lighter",label:"细体"},{value:"normal",label:"普通"},{value:"bold",label:"粗体"},{value:"bolder",label:"加粗"}],ds_select:"normal",ds_name:"ds_series_label_fontWeight",ds_ispro:true,group1:"图形属性",group2:"标签字体"});s.push(z);var Y=getProInfoByObj("input",{ds_id:"ds_series_label_fontSize",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标签字体大小",ds_placeholder:"标签字体大小",ds_input:"12",ds_name:"ds_series_label_fontSize",ds_valformat:"NUMBER",ds_ispro:true,group1:"图形属性",group2:"标签字体"});s.push(Y);var W=getProInfoByObj("select",{ds_id:"ds_series_label_align",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标签文本对齐",ds_placeholder:"标签文本对齐",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"left",label:"左对齐"},{value:"center",label:"居中"},{value:"right",label:"右对齐"}],ds_select:"",ds_name:"ds_series_label_align",ds_ispro:true,group1:"图形属性",group2:"标签字体"});s.push(W);var q=getProInfoByObj("select",{ds_id:"ds_series_label_verticalAlign",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标签文本垂直对齐",ds_placeholder:"标签文本垂直对齐",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"top",label:"置顶"},{value:"middle",label:"居中"},{value:"bottom",label:"置底"}],ds_select:"",ds_name:"ds_series_label_verticalAlign",ds_ispro:true,group1:"图形属性",group2:"标签字体"});s.push(q);var J=getProInfoByObj("jseditor",{ds_id:"ds_series_label_formatter",ds_pid:VUECFG.ctrlId,ds_labeltxt:"标签富文本",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"/**\n支持使用字符串模板以及回调函数方式。\n"+"字符串模板:\n"+"{a}：系列名。\n"+"{b}：数据名。\n"+"{c}：数据值。\n"+"{@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。\n"+"{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。\n"+"回调函数方式(此方式不支持同时使用字符串模板):例:\n"+"funName = function(param){\n"+"  //参数:param 包含各项数据,如value:当前数据值,name:当前数据名称 ,seriesType:当前series类型等\n"+"  return '数据名:'+param.name+'数据值:'+param.value\n"+"}\n"+"**/",ds_prepend:"富文本回调函数",ds_jseditor_change:"",ds_name:"ds_series_label_formatter",ds_ispro:true,ds_savedb:false,group1:"图形属性",group2:"标签富文本"});s.push(J);var X=getProInfoByObj("textarea",{ds_id:"ds_series_label_rich",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"标签富文本样式",ds_placeholder:'{"a":{"color":"red"}}',ds_input:"",ds_name:"ds_series_label_rich",ds_ispro:true,ds_valformat:"JSON",group1:"图形属性",group2:"标签富文本"});s.push(X);var H=getProInfoByObj("switch",{ds_id:"ds_animation",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"动画效果",ds_name:"ds_animation",ds_echarts_data_formatter:"ARRY",ds_switch:true,ds_ispro:true,group1:"动态效果",group2:"初始化动画"});s.push(H);var Z=getProInfoByObj("input",{ds_id:"ds_series_animationDuration",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"动画时长",ds_placeholder:"动画时长",ds_input:1e3,ds_name:"ds_series_animationDuration",ds_ispro:true,group1:"动态效果",group2:"初始化动画"});s.push(Z);var K=getProInfoByObj("select",{ds_id:"ds_series_animationEasing",ds_pid:VUECFG.ctrlId,ds_labeltxt:"动画效果",ds_placeholder:"动画效果",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"linear"},{value:"cubicOut"},{value:"quinticInOut"},{value:"quadraticInOut"},{value:"sinusoidalOut"},{value:"elasticInOut"},{value:"exponentialOut"},{value:"bounceIn"},{value:"bounceInOut"}],ds_select:"cubicOut",ds_name:"ds_series_animationEasing",ds_ispro:true,group1:"动态效果",group2:"初始化动画"});s.push(K);var Q=getProInfoByObj("switch",{ds_id:"ds_isDynamic",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"开启轮播",ds_name:"ds_isDynamic",ds_switch:false,ds_ispro:true,group1:"动态效果",group2:"轮播"});s.push(Q);var ee=getProInfoByObj("input",{ds_id:"ds_rollDataNum",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"轮播数量",ds_placeholder:"轮播数量",ds_input:3,ds_name:"ds_rollDataNum",ds_ispro:true,group1:"动态效果",group2:"轮播"});s.push(ee);var se=getProInfoByObj("input",{ds_id:"ds_changeTimes",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"轮播频率",ds_placeholder:"轮播频率",ds_input:3e3,ds_name:"ds_changeTimes",ds_ispro:true,group1:"动态效果",group2:"轮播"});s.push(se);var de=getProInfoByObj("select",{ds_id:"ds_direct",ds_pid:VUECFG.ctrlId,ds_labeltxt:"轮播方向",ds_style:"ds-mt-1",ds_draggable:"false",ds_group:false,ds_options:[{value:"toRight",label:"右"},{value:"toLeft",label:"左"}],ds_select:"toRight",ds_name:"toLeft",ds_ispro:true,group1:"动态效果",group2:"轮播"});s.push(de);var te=getProInfoByObj("textarea",{ds_id:"ds_custom_data",ds_pid:VUECFG.ctrlId,ds_draggable:"false",ds_style:"ds-mt-1",ds_labeltxt:"自定义数据",ds_placeholder:'{"xAxis_data": [{\n'+'"type": "category",\n'+'"data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]\n'+"}],\n"+'"yAxis_data": [{\n'+'"type": "value"\n'+"}],\n"+'"series_data": [{\n'+'"data": [120, {\n'+'"value": 200,\n'+'"itemStyle": {\n'+'"color": "#a90000"\n'+"}\n"+"}, 150, 80, 70, 110, 130],\n"+'"type": "bar"\n'+"}]\n"+"}",ds_textarea:"",ds_name:"ds_custom_data",ds_valformat:"JSON",ds_ispro:true,group1:"自定义数据",group2:""});s.push(te);var re=getProInfoByObj("jseditor",{ds_id:"ds_scatter_click",ds_pid:VUECFG.ctrlId,ds_labeltxt:"点击事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_scatter_click",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(re);var ae=getProInfoByObj("jseditor",{ds_id:"ds_scatter_dbclick",ds_pid:VUECFG.ctrlId,ds_labeltxt:"双击事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:选中的数据",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_scatter_dbclick",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(ae);var le=getProInfoByObj("jseditor",{ds_id:"ds_before_setOption",ds_pid:VUECFG.ctrlId,ds_labeltxt:"设置option前事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//val:图形配置项",ds_prepend:"fn(obj,val){",ds_jseditor_change:"",ds_name:"ds_before_setOption",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(le);var _e=getProInfoByObj("jseditor",{ds_id:"ds_load_success",ds_pid:VUECFG.ctrlId,ds_labeltxt:"加载完成事件",ds_placeholder:"脚本",ds_style:"ds-mt-1",ds_draggable:"false",ds_jseditor:"//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",ds_prepend:"fn(obj,trigger){",ds_jseditor_change:"",ds_name:"ds_load_success",ds_ispro:true,ds_savedb:false,group1:"事件",group2:""});s.push(_e);if(VUECFG.proObj[VUECFG.ctrlId]&&!e){var oe=VUECFG.proObj[VUECFG.ctrlId];for(var ie=0;ie<s.length;ie++){for(var ne=0;ne<oe.length;ne++){if(s[ie].info.ds_name==oe[ne].info.ds_name){var d=s[ie].type.split("drag_")[1];s[ie].info["ds_"+d]=oe[ne].info["ds_"+d];if(!$DS.util.isUndefined(oe[ne].info["ds_show"]))s[ie].info["ds_show"]=oe[ne].info["ds_show"]}}}}VUECFG.proObj[VUECFG.ctrlId]=[];VUECFG.proArr=formatterCtrlProCfg(s);VUECFG.proObj[VUECFG.ctrlId]=s;$("#templetePro").click()}