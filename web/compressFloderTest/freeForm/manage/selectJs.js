var pubId=YCDCommon.Win.getUrlParam("pubId");var cvalue=pubId?pubId.split(","):[];var cobj={};for(var c=0;c<cvalue.length;c++){cobj[cvalue[c]]=cvalue[c]}var showData="";var showName="";var tableIns2;var JsTextInfoArr={};var table;var layTableId="layTable";$(document).ready(function(){var e=new Array;e.push({name:"确定",onclick:"save",classname:"ycd-icon-ok"});e.push({name:"关闭",onclick:"close_",classname:"ycd-icon-cancel"});YCDComponents.toolbar.formToolbar("main1",e);layui.use(["jquery","table","layer"],function(){var e=layui.$,a=layui.table;form=layui.form;layer=layui.layer;var t=e("#left_Table").width();var r=getJsText();showdata2=[];for(var l=0;l<r.length;l++){var n=r[l];if(n){var i={numbers:l,ISON:"",ITEMCODE:n.ITEMCODE,ITEMNAME:n.ITEMNAME,GUID:n.GUID,_UUID:n.GUID};showdata2.push(i)}}var o="layTable";tableIns2=a.render({elem:"#leftTable",id:o,data:showdata2,height:"full-41",title:"",toolbar:"#jsonToolbar",defaultToolbar:["filter",{title:"提示",layEvent:"LAYTABLE_TIPS",icon:"layui-icon-tips"}],page:false,limit:1e21,cols:[[{type:"checkbox",width:.1*t-12},{type:"numbers",title:"序号",width:.1*t},{field:"ITEMCODE",title:"文本编码",width:.3*t,align:"center"},{field:"ITEMNAME",title:"文本名称",width:.3*t,align:"center"},{field:"GUID",title:"GUID",hide:true},{field:"ISON",title:"操作",width:.2*t-1,align:"center",templet:"#collection"},{field:"_UUID",title:"UUID",hide:true}]],done:function(a,t,r){var l=a.data;if(l){for(var n=0;n<l.length;n++){if(cobj[l[n].GUID]){a.data[n]["LAY_CHECKED"]="true";var i=a.data[n]["LAY_TABLE_INDEX"];e("tr[data-index="+i+'] input[type="checkbox"]').prop("checked",true);e("tr[data-index="+i+'] input[type="checkbox"]').next().addClass("layui-form-checked")}}}}});a.on("toolbar(leftTable)",function(e){var t=a.checkStatus(e.config.id);switch(e.event){case"insertData":var r=a.cache[o];var l={numbers:r.length,ISON:"",ITEMCODE:"",ITEMNAME:"",GUID:"",_UUID:generateUUID()};r.push(l);tableIns2.reload({data:r});break;case"delData":var r=a.cache[o];var n=t.data;e:for(var i=r.length-1,s;i>=0;i--){for(j=0;j<n.length;j++){if(r[i]._UUID==n[j]._UUID){r.splice(i,1);continue e}}}tableIns2.reload({data:r});break;case"toTop":var r=a.cache[o];var n=t.data;if(n.length>1){alert("只能选择一项!");return false}if(n.length==0){alert("请选择一项!");return false}var u=true;for(var i=0;i<r.length;i++){if(r[i]._UUID==n[0]._UUID){if(r[i-1]&&u){var I=null;I=r[i];r[i]=r[i-1];r[i-1]=I;u=false}}}tableIns2.reload({data:r});break;case"toBottom":var r=a.cache[o];var n=t.data;if(n.length>1){alert("只能选择一项!");return false}if(n.length==0){alert("请选择一项!");return false}var u=true;for(var i=0;i<r.length;i++){if(r[i]._UUID==n[0]._UUID){if(r[i+1]&&u){var I=null;I=r[i];r[i]=r[i+1];r[i+1]=I;u=false}}}tableIns2.reload({data:r});break;case"getJson":n=getJsonData();if(n||n.length==0)alert(n);break}loadTableFilter()});a.on("edit(leftTable)",function(e){});tableTrClick();loadTableFilter()})});function getJsText(){debugger;var e=[];var a=["GUID","ITEMCODE","ITEMNAME","CTIME"];var t={filter1:"AND TYPE='"+"pubjs"+"'"};var r=parent.$DS.selectAll(parent.VUECFG.appId,"DM_FORM_PAGEJS",a,"GUID",t,"CTIME","","","");if(r.isError){alert(r.errMsg);return false}else{e=r.result.rows}return e}function editJsText(e){debugger;var a=saveJsText(e,true);if(!a)return false;var t=$(e).attr("uuid");var r=null;var l=layui.table.cache[layTableId];for(var n=0;n<l.length;n++){if(l[n].GUID==t){r=l[n]}}var i=parent.$DS.util.getProjectName(parent.VUECFG.appId);window.open(encodeURI(getProjectName()+"/freeForm/js/editor/online_editor/jsEditor.jsp?GUID="+r.GUID+"&type=pubjs&ITEMCODE="+r.ITEMCODE+"&ITEMNAME="+r.ITEMNAME+"&appPath="+i),`pubjs_${r.GUID}`)}var saveFlag=true;function saveJsText(e,a){saveFlag=false;var t=$(e).attr("uuid");var r=null;var l=layui.table.cache[layTableId];var n={};for(var i=0;i<l.length;i++){n[l[i].ITEMCODE]=n[l[i].ITEMCODE]?n[l[i].ITEMCODE]+1:1;if(l[i]._UUID==t){r=l[i]}}if(!r){alert("请先保存!");return false}if(n[r.ITEMCODE]>1){alert("文本编码不能重复!");return false}var o=r.GUID?"update":"add";var s={ITEMNAME:r.ITEMNAME,ITEMCODE:r.ITEMCODE,GUID:r.GUID};var u=parent.$DS.saveTable(parent.VUECFG.appId,o,s,"DM_FORM_PAGEJS","GUID",function(){},"保存JS脚本失败");if(u.isError){alert(u.errMsg);return false}var I=getJsText();var f=[];for(var c=0;c<I.length;c++){f.push({numbers:c,ISON:"",ITEMCODE:I[c].ITEMCODE,ITEMNAME:I[c].ITEMNAME,GUID:I[c].GUID,_UUID:I[c].GUID});JsTextInfoArr[I[c].GUID]=I[c]}tableIns2.reload({data:f});if(!a){saveFlag=true;alert("保存成功!")}loadTableFilter();return true}function delJsText(e){var a=$(e).attr("uuid");var t=null;var r=layui.table.cache[layTableId];for(var l=0;l<r.length;l++){if(r[l]._UUID==a){t=r[l]}}layer.confirm("正在删除JS文本【"+t.ITEMNAME+"】,</br>是否继续?",{icon:3,title:"提示"},function(e){var a=parent.$DS.deleteById(parent.VUECFG.appId,"DM_FORM_PAGEJS","GUID",t.GUID,function(){});if(a.isError){alert(a.errMsg);return false}var r=getJsText();var l=[];for(var n=0;n<r.length;n++){l.push({numbers:n,ISON:"",ITEMCODE:r[n].ITEMCODE,ITEMNAME:r[n].ITEMNAME,GUID:r[n].GUID,_UUID:r[n].GUID});JsTextInfoArr[r[n].GUID]=r[n]}tableIns2.reload({data:l});layer.close(e);alert("删除成功!");loadTableFilter()},function(e){return})}var initArr={add:false,edit:false,dalete:false};function getJsonData(){var e=layui.table.checkStatus(layTableId);var a=e.data;if(!a)return"";var t=[];var r=[];var l=[];for(var n=0;n<a.length;n++){t.push(a[n].GUID);r.push(a[n].ITEMCODE);l.push(a[n].ITEMNAME)}showData=r.join(",");showName=l.join(",");return t.join(",")}var saveflag=true;function save(){if(saveflag){saveflag=false;var e=new Loading;e.init({target:document.body});e.start();setTimeout(function(){try{var a=getJsonData();if(a||a.length==0){parent.setPubjs(a,showData,showName);close_();parent.alert("请保存报告!</br>否则设置的JS文本将不会生效!")}}catch(e){parent.alert("设置失败!");console.log(e)}saveflag=true;e.stop()},10)}}function loadTableFilter(){var e=layui.tableFilter;var a=e.render({elem:"#leftTable",mode:"local",filters:[{field:"ITEMCODE",name:"文本编码",type:"input"},{field:"ITEMNAME",name:"文本名称",type:"input"}],done:function(e){}})}