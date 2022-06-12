var chartsBaseModel={};chartsBaseModel.getEchartsBaseModel=function(){return{title:{text:"ds_title_text|STRING",subtext:"ds_title_subtext|STRING",left:"ds_title_left|STRING",top:"ds_title_top|STRING",show:"ds_title_show|BOOLEAN",link:"ds_title_link|STRING",sublink:"ds_title_sublink|STRING",padding:"ds_title_padding|NUMBER",textStyle:{fontStyle:"ds_title_textStyle_fontStyle|STRING",fontWeight:"ds_title_textStyle_fontWeight|STRING",fontFamily:"ds_title_textStyle_fontFamily|STRING",color:"ds_title_textStyle_color|STRING",fontSize:"ds_title_textStyle_fontSize|NUMBER"},subtextStyle:{fontStyle:"ds_title_subtextStyle_fontStyle|STRING",fontWeight:"ds_title_subtextStyle_fontWeight|STRING",fontFamily:"ds_title_subtextStyle_fontFamily|STRING",color:"ds_title_subtextStyle_color|STRING",fontSize:"ds_title_subtextStyle_fontSize|NUMBER"}},legend:{data:"ds_legend_data|ARRAY",type:"ds_legend_type|STRING",show:"ds_legend_show|BOOLEAN",orient:"ds_legend_orient|STRING",align:"ds_legend_align|STRING",left:"ds_legend_left|STRING",top:"ds_legend_top|STRING",padding:"ds_legend_padding|NUMBER",width:"ds_legend_width|STRING",height:"ds_legend_height|STRING",icon:"ds_legend_icon|STRING",borderWidth:"ds_legend_borderWidth|NUMBER",borderColor:"ds_legend_borderColor|STRING",itemGap:"ds_legend_itemGap|NUMBER",itemWidth:"ds_legend_itemWidth|NUMBER",itemHeight:"ds_legend_itemHeight|NUMBER",textStyle:{color:"ds_legend_textStyle_color|STRING",fontSize:"ds_legend_textStyle_fontSize|NUMBER",fontStyle:"ds_legend_textStyle_fontStyle|STRING",fontWeight:"ds_legend_textStyle_fontWeight|STRING",fontFamily:"ds_legend_textStyle_fontFamily|STRING"}},tooltip:{show:"ds_tooltip_show|BOOLEAN",formatter:"ds_tooltip_formatter|FUNCTION",trigger:"ds_tooltip_trigger|STRING",triggerOn:"ds_tooltip_triggerOn|STRING",backgroundColor:"ds_tooltip_backgroundColor|STRING",textStyle:{color:"ds_tooltip_textStyle_color|STRING",fontSize:"ds_tooltip_textStyle_fontSize|NUMBER",fontStyle:"ds_tooltip_textStyle_fontStyle|STRING",fontWeight:"ds_tooltip_textStyle_fontWeight|STRING",fontFamily:"ds_tooltip_textStyle_fontFamily|STRING"}},toolbox:{show:"ds_toolbox_show|BOOLEAN",left:"ds_toolbox_left|STRING",top:"ds_toolbox_top|STRING",orient:"ds_toolbox_orient|STRING",feature:{dataView:{show:true,readOnly:false},mark:{show:true},restore:{show:true},saveAsImage:{show:true}}},xAxis:[{data:[],show:"ds_xAxis_show|BOOLEAN",position:"ds_xAxis_position|STRING",offset:"ds_xAxis_offset|NUMBER",name:"ds_xAxis_name|ARRAY",nameLocation:"ds_xAxis_nameLocation|STRING",nameTextStyle:{color:"ds_xAxis_nameTextStyle_color|STRING",fontStyle:"ds_xAxis_nameTextStyle_fontStyle|STRING",fontWeight:"ds_xAxis_nameTextStyle_fontWeight|STRING",fontFamily:"ds_xAxis_nameTextStyle_fontFamily|STRING",fontSize:"ds_xAxis_nameTextStyle_fontSize|NUMBER",align:"ds_xAxis_nameTextStyle_align|STRING",verticalAlign:"ds_xAxis_nameTextStyle_verticalAlign|STRING",lineHeight:"ds_xAxis_nameTextStyle_lineHeight|NUMBER"},nameRotate:"ds_xAxis_nameRotate|NUMBER",inverse:"ds_xAxis_inverse|BOOLEAN",boundaryGap:"ds_xAxis_boundaryGap",nameGap:"ds_xAxis_nameGap|NUMBER",min:"ds_xAxis_min|ARRAY",max:"ds_xAxis_max|ARRAY",splitNumber:"ds_xAxis_splitNumber|NUMBER",axisLine:{show:"ds_xAxis_axisLine_show|BOOLEAN",symbol:"ds_xAxis_axisLine_symbol|STRING",lineStyle:{color:"ds_xAxis_axisLine_lineStyle_color|STRING",width:"ds_xAxis_axisLine_lineStyle_width|NUMBER",type:"ds_xAxis_axisLine_lineStyle_type|STRING"}},axisTick:{show:"ds_xAxis_axisTick_show|BOOLEAN",alignWithLabel:"ds_xAxis_axisTick_alignWithLabel|BOOLEAN",inside:"ds_xAxis_axisTick_inside|BOOLEAN",length:"ds_xAxis_axisTick_length|NUMBER",lineStyle:{color:"ds_xAxis_axisTick_lineStyle_color|STRING",width:"ds_xAxis_axisTick_lineStyle_width|NUMBER",type:"ds_xAxis_axisTick_lineStyle_type|STRING"}},minorTick:{show:"ds_xAxis_minorTick_show|BOOLEAN",splitNumber:"ds_xAxis_minorTick_splitNumber|NUMBER",length:"ds_xAxis_minorTick_length|NUMBER",lineStyle:{color:"ds_xAxis_minorTick_lineStyle_color|STRING",width:"ds_xAxis_minorTick_lineStyle_width|NUMBER",type:"ds_xAxis_minorTick_lineStyle_type|STRING"}},axisLabel:{show:"ds_xAxis_axisLabel_show|BOOLEAN",inside:"ds_xAxis_axisLabel_inside|BOOLEAN",rotate:"ds_xAxis_axisLabel_rotate|NUMBER",margin:"ds_xAxis_axisLabel_margin|STRING",color:"ds_xAxis_axisLabel_color|STRING",fontStyle:"ds_xAxis_axisLabel_fontStyle|STRING",fontWeight:"ds_xAxis_axisLabel_fontWeight|STRING",fontFamily:"ds_xAxis_axisLabel_fontFamily|STRING",fontSize:"ds_xAxis_axisLabel_fontSize|NUMBER",align:"ds_xAxis_axisLabel_align|STRING",verticalAlign:"ds_xAxis_axisLabel_verticalAlign|STRING",lineHeight:"ds_xAxis_axisLabel_lineHeight|NUMBER"},splitLine:{show:"ds_xAxis_splitLine_show|ARRAY|BOOLEAN",lineStyle:{color:"ds_xAxis_splitLine_lineStyle_color|STRING",width:"ds_xAxis_splitLine_lineStyle_width|NUMBER",type:"ds_xAxis_splitLine_lineStyle_type|STRING"}}}],yAxis:[{show:"ds_yAxis_show|BOOLEAN",position:"ds_yAxis_position|STRING",offset:"ds_yAxis_offset|NUMBER",name:"ds_yAxis_name|ARRAY",nameLocation:"ds_yAxis_nameLocation|STRING",nameTextStyle:{color:"ds_yAxis_nameTextStyle_color|STRING",fontStyle:"ds_yAxis_nameTextStyle_fontStyle|STRING",fontWeight:"ds_yAxis_nameTextStyle_fontWeight|STRING",fontFamily:"ds_yAxis_nameTextStyle_fontFamily|STRING",fontSize:"ds_yAxis_nameTextStyle_fontSize|NUMBER",align:"ds_yAxis_nameTextStyle_align|STRING",verticalAlign:"ds_yAxis_nameTextStyle_verticalAlign|STRING",lineHeight:"ds_yAxis_nameTextStyle_lineHeight|NUMBER"},nameGap:"ds_yAxis_nameGap|NUMBER",nameRotate:"ds_yAxis_nameRotate|NUMBER",min:"ds_yAxis_min|ARRAY",max:"ds_yAxis_max|ARRAY",inverse:"ds_yAxis_inverse|BOOLEAN",splitNumber:"ds_yAxis_splitNumber|NUMBER",axisLine:{show:"ds_yAxis_axisLine_show|BOOLEAN",lineStyle:{color:"ds_yAxis_axisLine_lineStyle_color|STRING",width:"ds_yAxis_axisLine_lineStyle_width|NUMBER",type:"ds_yAxis_axisLine_lineStyle_type|STRING"}},axisTick:{show:"ds_yAxis_axisTick_show|BOOLEAN",alignWithLabel:"ds_yAxis_axisTick_alignWithLabel|BOOLEAN",inside:"ds_yAxis_axisTick_inside|BOOLEAN",length:"ds_yAxis_axisTick_length|NUMBER",lineStyle:{color:"ds_yAxis_axisTick_lineStyle_color|STRING",width:"ds_yAxis_axisTick_lineStyle_width|NUMBER",type:"ds_yAxis_axisTick_lineStyle_type|STRING"}},minorTick:{show:"ds_yAxis_minorTick_show|BOOLEAN",splitNumber:"ds_yAxis_minorTick_splitNumber|NUMBER",length:"ds_yAxis_minorTick_length|NUMBER",lineStyle:{color:"ds_yAxis_minorTick_lineStyle_color|STRING",width:"ds_yAxis_minorTick_lineStyle_width|NUMBER",type:"ds_yAxis_minorTick_lineStyle_type|STRING"}},axisLabel:{show:"ds_yAxis_axisLabel_show|BOOLEAN",inside:"ds_yAxis_axisLabel_inside|BOOLEAN",rotate:"ds_yAxis_axisLabel_rotate|NUMBER",margin:"ds_yAxis_axisLabel_margin|STRING",color:"ds_yAxis_axisLabel_color|STRING",fontStyle:"ds_yAxis_axisLabel_fontStyle|STRING",fontWeight:"ds_yAxis_axisLabel_fontWeight|STRING",fontFamily:"ds_yAxis_axisLabel_fontFamily|STRING",fontSize:"ds_yAxis_axisLabel_fontSize|NUMBER",align:"ds_yAxis_axisLabel_align|STRING",verticalAlign:"ds_yAxis_axisLabel_verticalAlign|STRING",lineHeight:"ds_yAxis_axisLabel_lineHeight|NUMBER"},splitLine:{show:"ds_yAxis_splitLine_show|ARRAY|BOOLEAN",lineStyle:{color:"ds_yAxis_splitLine_lineStyle_color|STRING",width:"ds_yAxis_splitLine_lineStyle_width|NUMBER",type:"ds_yAxis_splitLine_lineStyle_type|STRING"}}}],grid:{show:"ds_grid_show|BOOLEAN",left:"ds_grid_left|NUMBER",top:"ds_grid_top|NUMBER",right:"ds_grid_right|NUMBER",bottom:"ds_grid_bottom|NUMBER",borderWidth:"ds_grid_borderWidth|NUMBER",borderColor:"ds_grid_borderColor|STRING",width:"ds_grid_width|NUMBER",height:"ds_grid_height|NUMBER"},axisPointer:{show:"ds_axisPointer_show|BOOLEAN",type:"ds_axisPointer_type|STRING"}}};chartsBaseModel.getDataZoomInsideModel=function(){return{type:"ds_dataZoom_type|ARRAY",filterMode:"ds_dataZoom_filterMode|STRING",start:"ds_dataZoom_start|NUMBER",end:"ds_dataZoom_end|NUMBER",throttle:"ds_dataZoom_throttle|NUMBER",orient:"ds_dataZoom_orient|STRING"}};chartsBaseModel.getDataZoomSliderModel=function(){return{type:"ds_dataZoom_type|ARRAY",show:"ds_dataZoom_show|BOOLEAN",brushSelect:false,filterMode:"ds_dataZoom_filterMode|STRING",start:"ds_dataZoom_start|NUMBER",end:"ds_dataZoom_end|NUMBER",startValue:"ds_dataZoom_startValue|NUMBER",endValue:"ds_dataZoom_endValue|NUMBER",height:"ds_dataZoom_height|NUMBER",width:"ds_dataZoom_width|STRING",orient:"ds_dataZoom_orient|STRING",zoomLock:"ds_dataZoom_zoomLock|BOOLEAN",left:"ds_dataZoom_left|STRING",top:"ds_dataZoom_top|STRING",right:"ds_dataZoom_right|STRING",bottom:"ds_dataZoom_bottom|STRING",handleSize:"ds_dataZoom_handleSize|STRING",handleStyle:{color:"ds_dataZoom_handleStyle_color|STRING"},backgroundColor:"ds_dataZoom_backgroundColor|STRING",showDetail:"ds_dataZoom_showDetail|BOOLEAN",fillerColor:"ds_dataZoom_fillerColor|STRING"}};chartsBaseModel.getEchartsModelByName=function(t){if(Object.prototype.toString.call(t)==="[object String]"){t=t.split(",")}let e=chartsBaseModel.getEchartsBaseModel();let i={};for(let _ of t){if(!e[_]){console.error(`获取【${_}】模板失败,请检查拼写是否正确`);continue}i[_]=deepClone(e[_])}return i};