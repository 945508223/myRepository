var sid=YCDCommon.Win.getUrlParam("sid");var _params=window.top[sid];var openNcode=_params.ncode;var openNtext=_params.ntext;var opennType=_params.ntype;var conditions=_params.conditions;var realFields=_params.realFields;var ctrlId=_params.ctrlId;var fastDfsURl;var activeElement;var actionField;var actionType;var tableIns2;var table;var layTableId="layTable";$(document).ready(function(){var e=new Array;e.push({name:"确定",onclick:"save",classname:"ycd-icon-ok"});e.push({name:"关闭",onclick:"close_",classname:"ycd-icon-cancel"});YCDComponents.toolbar.formToolbar("main1",e);layui.use(["jquery","table","layer"],function(){var e=layui.$,a=layui.table;form=layui.form;layer=layui.layer;initItemsSelect();initFormatter();var t=e("#left_Table").width();var l="layTable";tableIns2=a.render({elem:"#mainTable",id:l,data:[],height:"full-41",title:"",toolbar:"#jsonToolbar",defaultToolbar:["filter",{title:"提示",layEvent:"LAYTABLE_TIPS",icon:"layui-icon-tips"}],page:false,limit:1e21,cols:[[{type:"checkbox",width:.1*t-12},{field:"alertName",title:"取值条件描述",width:.2*t,align:"left",edit:"text"},{field:"ranges",title:"取值条件",width:.3*t,align:"left",edit:"text"},{field:"showFormatter",title:"显示格式",width:.2*t-1,align:"left",event:"setFormatter"},{field:"bgColor",title:"背景颜色",width:.2*t-1,align:"left",event:"setBColor"},{field:"style",title:"样式",hide:true},{field:"_UUID",title:"UUID",hide:true}]],done:function(e,a,t){showTableStyle(e)}});a.on("toolbar(tableEvent)",function(e){var t=a.checkStatus(e.config.id);var n=e.data;switch(e.event){case"insertData":var r=a.cache[l]!=undefined?a.cache[l]:[];var i={_UUID:generateUUID(),alertName:"",ranges:"",showFormatter:"",style:"",bgColor:""};r.push(i);tableIns2.reload({data:r});break;case"delData":var r=a.cache[l];var n=t.data;e:for(var o=r.length-1,s;o>=0;o--){for(j=0;j<n.length;j++){if(r[o]._UUID==n[j]._UUID){r.splice(o,1);continue e}}}tableIns2.reload({data:r});break;case"toTop":var r=a.cache[l];var n=t.data;if(n.length>1){alert("只能选择一项!");return false}if(n.length==0){alert("请选择一项!");return false}var d=true;for(var o=0;o<r.length;o++){if(r[o]._UUID==n[0]._UUID){if(r[o-1]&&d){var c=null;c=r[o];r[o]=r[o-1];r[o-1]=c;d=false}}}console.log("oldData:"+r);tableIns2.reload({data:r});break;case"toBottom":var r=a.cache[l];var n=t.data;if(n.length>1){alert("只能选择一项!");return false}if(n.length==0){alert("请选择一项!");return false}var d=true;for(var o=0;o<r.length;o++){if(r[o]._UUID==n[0]._UUID){if(r[o+1]&&d){var c=null;c=r[o];r[o]=r[o+1];r[o+1]=c;d=false}}}tableIns2.reload({data:r});break}});a.on("tool(tableEvent)",function(a){var t=a.data;if(a.event=="setFormatter"){var l="样例";var n="";activeElement=e(a.tr.find("div")[4]);showMyDialog("字体格式","75%","85%",$DS.util.getProjectName()+"/freeForm/manage/condi/fontSet.jsp",function(){n=activeElement[0].style.cssText;console.info(n);a.update({showFormatter:l,style:n})})}if(a.event=="setBColor"){var r=a.tr.find("div")[5];colpick(r,a)}});showOldData()})});function colpick(e,a){$(e).colpick({submitText:"确定",layout:"rgbhex",onSubmit:function(t,l,n){var r="rgb("+n.r+","+n.g+","+n.b+")";var i=rgb2hex(r);$(this)[0].el.value=i;e.style.backgroundColor=i;e.style.color=i;a.update({bgColor:i});$(e).colpickHide()}})}function rgb2hex(e){e=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);function a(e){return("0"+parseInt(e).toString(16)).slice(-2)}return"#"+a(e[1])+a(e[2])+a(e[3])}function initItemsSelect(){$("#actionField").empty();var e='<option value="">---请选择---</option>';for(var a=0;a<realFields.length;a++){var t=realFields[a].prop;var l=realFields[a].label;var n=realFields[a].fieldType;e+="<option value="+t+" ntype="+n+">"+l+"    [ "+t+" ]"+"</option>"}$("#actionField").append(e);if(conditions&&conditions.length>0&&conditions[0]["actionField"]){actionField=conditions[0]["actionField"];for(let e=0;e<realFields.length;e++){if(realFields[e].prop==actionField){actionType=realFields[e].fieldType=="001"?"001":"003";break}}$("#actionField").val(actionField)}else{actionField=openNcode;actionType=opennType;$("#actionField").val(actionField)}layui.form.render();layui.form.on("select",function(e){actionField=e.value;actionType=$("#actionField :selected").attr("ntype");initFormatter();tableIns2.reload({data:[]})})}function initFormatter(){var e="";if(actionType=="001"){e="按取值范围:  [min, max, replace]  ,min和max都为空时作用于所有数据\n"+"按名次:{\n"+"     order : 1,2,-1     表示第一名、第二名和倒数第一名\n"+"     order: 前3          作用前三名\n"+"     order: 后3          作用后三名\n"+"}\n"+"按平均值：{\n"+"    ave: more            作用平均值以上\n"+"    ave: less            作用平均值以下\n"+"}\n"+"直接输入数字：        表示精确匹配 \n"+"输入all:                  表示作用该列所有数据\n"+"添加替换值:           后追加 :替换值     $(value)代表原值"}else{e="按文本条件:{\n"+"    all                                作用于该字段所有数据 \n"+"    in: text                         作用于包含text的数据 \n"+"    beginwith: text             作用于以tex开始的数据 \n"+"    endwith: text                作用于以tex结束的数据 \n"+"    字符串                          精确匹配字符串 \n"+"}\n"+"如添加替换值,后追加 :替换值     $(value)代表原值"}$("#formatter").val(e)}function getJsonData(){var e=[];var a=layui.table.cache[layTableId];for(var t=0;t<a.length;t++){if(a[t]["ranges"]==""){alert("取值条件不能为空!!!");return}var l={};l["_UUID"]=a[t]["_UUID"];l["alertName"]=a[t]["alertName"];l["ranges"]=parseSaveRanges(a[t]["ranges"]);l["showFormatter"]=a[t]["showFormatter"];l["style"]=a[t]["style"];l["bgColor"]=a[t]["bgColor"];l["actionField"]=actionField;e.push(l)}return e}function parseSaveRanges(e){e=e.replaceAll(/&lt;/g,"<");if(fastDfsURl&&e.indexOf(fastDfsURl)!=-1){e=e.split("http://"+fastDfsURl).join("")}var a=e.toUpperCase().split(":")[0];var t;if(a=="LEVELS"||a=="BOTTOM"||a==""||a=="IN"||a=="BEGINWITH"||a=="ENDWITH"||a=="ORDER"||a=="AVE"){t=findIndex(e,":",2)}else if(e.startsWith("[")&&e.endsWith("]")){t=findIndex(e,",",2)}else t=findIndex(e,":",1);var l=e.substr(t+1);if(e.indexOf("<")!=-1&&e.indexOf(">")!=-1){l=l.replaceAll(/:/g,"@COLONSIGN@");l=l.replaceAll(/=/g,"@EQUALSIGN@")}e=e.substring(0,t+1).replaceAll(/\s+/g,"")+l;return e}var saveflag=true;function save(){if(saveflag){saveflag=false;var e=new Loading;e.init({target:document.body});e.start();setTimeout(function(){try{var a=getJsonData();if(a){parent.callBackGridCondiSetting(ctrlId,a,openNcode);close_()}}catch(e){parent.alert("设置失败!");console.log(e)}saveflag=true;e.stop()},10)}}function changeAlert(){var e=$("#trNum").val();if(e&&e!=""){e=parseInt(e);var a=[];var t=[];var l=layui.table;if(l.cache[layTableId]!=undefined){t=l.cache[layTableId]}var n=t.length;if(e<n){for(let a=0;a<n-e;a++){t.pop()}}else{for(let t=0;t<e-n;t++){a.push({_UUID:generateUUID(),alertName:"",ranges:"",showFormatter:"",style:"",bgColor:""})}}l.reload(layTableId,{data:t.concat(a)})}}function showTableStyle(e){var a=e.data;$("#left_Table tbody").find("tr").each(function(){var e=$(this).find("td");var a=e[5].innerText;$(e[3]).find("div")[0].style.cssText=a;$($(e[4]).find("div")[0]).css("background-color",e[4].innerText);$($(e[4]).find("div")[0]).css("color",e[4].innerText)})}function showOldData(){if(conditions&&conditions.length>0){for(let t=0;t<conditions.length;t++){var e=conditions[t].ranges;if(e.indexOf("@COLONSIGN@")!=-1)e=e.replaceAll(/@COLONSIGN@/g,":");if(e.indexOf("@EQUALSIGN@")!=-1)e=e.replaceAll(/@EQUALSIGN@/g,"=");if(e.indexOf("<img")!=-1&&fastDfsURl){var a=e.split('src="');e=a[0]+'src="http://'+fastDfsURl+a[1]}conditions[t].ranges=e.replaceAll(/</g,"&lt;")}console.log(conditions[0].ranges);layui.table.reload(layTableId,{data:conditions})}}function findIndex(e,a,t){var l=e.indexOf(a);var n=1;while(n<t){l=e.indexOf(a,l+1);n++}return l}