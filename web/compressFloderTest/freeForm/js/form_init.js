var $PAGETITLE="自由表单";getAllUrlParams();getUserParams();setPageTitle();window.onload=function(){$DS.loadingFun("on_load",null,getUrlWin())};function on_load(){initVueCfg();$DS.loadPageCssFile(VUECFG.pageArr);$DS.loadPageCss(VUECFG.pageId);$DS.loadPageJsFile(VUECFG.pageArr);$DS.loadPubJs(VUECFG.pageArr);$DS.loadJs(VUECFG.pageId);$DS.reloadDataSourceFieldInfo();registerDrag();registerIcon();registerDataSource();registerForm();registerParent();drag({dragArea:"dragArea",dropArea:"dropArea"});dragTool();$DS.initCtrl();$DS.refPagePro();$DS.refForm();$DS.refPro();$DS.refSource();$DS.refFieldRef();allLoadSuceess()}function initVueCfg(){var e="FORMID,FORMCONFIG";var r="AND FORMID='"+pageId+"'";var a=$DS.select($DS.getPms("URL_APPID"),e,"DM_FORM_PAGESDETAIL",r,"查询系统配置信息异常");var o=null;if(a.isError){alert(a.errMsg);return false}else{a=a.result;if(a&&a.FORMCONFIG){pageStatus="edit";o=JSON.parse(a.FORMCONFIG);o.pageInfoId=a.GUID}}if(o){for(c in o){VUECFG[c]=o[c]}}VUECFG.pageId=pageId;VUECFG.pageName=pageName}function saveVueCfg(e){var r=VUECFG.$refs;VUECFG.$refs=[];var a=$DS.util.clone(VUECFG);VUECFG.$refs=r;a=cleanDataSourceFieldInfo(a);a.lastTarget=null;a=cleanProData(a);a=cleanCtrlData(a);if(e.params){e.vue.$data.cfgJson=JSON.stringify(a);return false}var o={FORMID:pageId,FORMCONFIG:a};if(pageStatus=="edit"){o.GUID=VUECFG.pageInfoId}var t=$DS.saveTable($DS.getPms("URL_APPID"),pageStatus,o,"DM_FORM_PAGESDETAIL","GUID",function(r){pageStatus="edit";VUECFG.pageInfoId=r.GUID;if(e!="importCfg"){alert("保存成功!")}var a=$DS.exeSql(`update DM_FORM_PAGES set CTIME=sysdate where GUID='${VUECFG.pageInfoId}'`)},"保存配置信息异常");if(t.isError){alert(t.errMsg);return false}}function allLoadSuceess(){temporary.allLoadEvent=$DS.getPageProValByName("ds_page_allloadsuccess");var allLoadInterVal=setInterval(function(){if(!temporary.allLoadEvent)window.clearInterval(allLoadInterVal);if($DS.isAllLoaded()){eval(temporary.allLoadEvent);window.clearInterval(allLoadInterVal)}},500)}function getAllComponents(){var e=[];var r=$DS.selectBySql(null,"select t.* from dm_form_code t where t.basename='form_ctrlgroup' order by  t.porder","查询分组信息异常");if(r.isError){alert(r.errMsg);return false}else{r=r.result}var a=$DS.selectBySql(null,"select t.* from dm_form_components t where t.isshow = 1 order by corder ","查询控件信息异常");if(a.isError){alert(a.errMsg);return false}else{a=a.result}if(r&&a){for(let i=0;i<r.length;i++){if(r[i].CODEN==="group_base")continue;var o={};o.index=i;o.classify_id="#icon-component";o.classify_text=" "+r[i].CNAME+" ";var t=[];for(let e=0;e<a.length;e++){if(a[e].GROUPNAME===r[i].CODEN){var n={btn_id:a[e].ICONURL,btn_text:" "+a[e].CNNAME+" ",btn_ctrltype:a[e].CTRLNAME};t.push(n)}}o.dragDatas=t;e.push(o)}}return e}function cleanDataSourceFieldInfo(e){e.appObj={};var r=e.sourceArr;for(var a=0;a<r.length;a++){if(r[a].sourceType=="sqlData")continue;r[a].fieldInfo={};r[a].tableInfo=[];r[a].sourceData=null}return e}function cleanProData(e){e.ctrlId=null;e.ctrlType=null;e.proId=null;e.proType=null;e.proArr=[];for(var r in e.proObj){for(var a=0;a<e.proObj[r].length;a++){var o=e.proObj[r][a].type;if(o){o=o.split("drag_")[1];var t={};t["ds_name"]=e.proObj[r][a].info.ds_name;t["ds_pid"]=e.proObj[r][a].info.ds_pid;t["ds_"+o]=e.proObj[r][a].info["ds_"+o];if(e.proObj[r][a].info.ds_show)t["ds_show"]=e.proObj[r][a].info.ds_show;e.proObj[r][a].info=t}}}return e}function cleanCtrlData(e){e.formArr=[];for(var r in e.formObj){var a=e.formObj[r].info;var o=e.formObj[r].type.split("drag_")[1];if($DS.getDataSourceForCtrl(a.ds_id)){e.formObj[r].info["ds_"+o]=null}if(o=="cascader"&&(a.ds_name&&a.ds_datasource||a.ds_refdatasource)){e.formObj[r].info["ds_options"]=[]}if(o=="grid"&&a.ds_datasource){e.formObj[r].info["ds_pagedata"]=[]}if(o=="row"){e.formObj[r]=cleanRowData(e.formObj[r])}}return e}function cleanRowData(e){var r=e.info.ds_rowarr;for(var a=0;a<r.length;a++){var o=r[a].info;var t=r[a].type.split("drag_")[1];if($DS.getDataSourceForCtrl(o.ds_id)){e.info.ds_rowarr[a].info["ds_"+t]=null}if(t=="cascader"&&(o.ds_name&&o.ds_datasource||o.ds_refdatasource)){e.info.ds_rowarr[a].info["ds_options"]=[]}if(t=="grid"&&o.ds_datasource){e.info.ds_rowarr[a].info["ds_pagedata"]=[]}if(t=="row"){e.info.ds_rowarr[a]=cleanRowData(e.info.ds_rowarr[a])}}return e}function dragTool(){$(".ableDrag").draggable({cursor:"move",start:function(e,r){if(e.toElement.className.indexOf("el-slider")!="-1")e.preventDefault();if($(e.toElement).parent().parent().attr("isPro")=="true")e.preventDefault()}});$("#proTab").attr("draggable","false");$(".ableDrag").resizable({resize:function(e,r){}});$("#dropArea").droppable({drop:function(e,r){}})}function settingBtnClick(e){var r=e.vue;var a=e.params;switch(a){case"proBar":if(r.proBar=="y-show"){r.proBar="y-hide";changeBtnCss($("#"+a),false)}else{r.proBar="y-show";changeBtnCss($("#"+a),true)}break}}function settingMouseOver(e){var r=e.vue;var a=e.params;r[a]="y-show";changeBtnCss($("#"+a),true)}function settingMouseOut(e){var r=e.vue;var a=e.params;if(!event.toElement||!event.toElement.offsetParent)return false;if(event.toElement.id==a||event.toElement.offsetParent.id=="dragCtrl"){return false}r[a]="y-hide";changeBtnCss($("#"+a),false)}function changeBtnCss(e,r){if(r)$(e).addClass("leftBtnBarHover");else $(e).removeClass("leftBtnBarHover")}function openCtrlManage(e){showMyDialog("控件管理",1e3,575,"manage/componentsManage.jsp",function(){})}function openCodeManage(e){showMyDialog("码表管理",1e3,575,"manage/codeManage.jsp",function(){})}function openImageMange(e){showMyDialog("图片库","95%","95%","manage/imageUpLoad/upload.html?basePath="+$DS.util.getProjectName(VUECFG.appId),function(){})}function openPubjsMange(e){showMyDialog("公共脚本","95%","95%","manage/jsManage.jsp",function(){})}function openPageJs(e){let r=getProjectName(VUECFG.appId);let a=$DS.util.getProjectName(VUECFG.appId);let o=`${r}/freeForm/js/editor/online_editor/jsEditor.jsp?GUID=${VUECFG.pageId}&appId=${VUECFG.appId}&pageName=${VUECFG.pageName}&appPath=${a}`;window.open(encodeURI(o),`page_${VUECFG.pageId}`)}function openFormSqlMange(){let e=$DS.util.getProjectName(VUECFG.appId);let r=getProjectName(VUECFG.appId);showMyDialog("预定义SQL","95%","95%",`manage/formSqlMange.jsp?FORMID=${VUECFG.pageId}&PID=${VUECFG.appId}&basepath=${e}`,function(){})}function fastBuildOpenForm(){showMyDialog("快速构建表单","95%","95%","manage/fastBuildForm.jsp",function(){})}function fastBuildForm(e){VUECFG.sort=formModoJson.sort;VUECFG.formObj=formModoJson.formObj;VUECFG.proObj=formModoJson.proObj;VUECFG.formObj[VUECFG.sort[0]].info.ds_rowarr=[];VUECFG.normalObj={};for(var r=0;r<VUECFG.sort.length;r++){VUECFG.normalObj[VUECFG.sort[r]]=true}VUECFG.groupObj={};for(var a=0;a<VUECFG.sourceArr.length;a++){VUECFG.sourceArr[a].sourceGroup={};VUECFG.sourceArr[a].fieldMap={}}for(var o=0;o<e.length;o++){if(e[o].type){var t=e[o].type.split("drag_")[1];var n=getProInfoByObj(t,e[o]);n.inRow=VUECFG.sort[0];n.info.ds_id=e[o].type+"_"+$DS.util.UUID();delete n.info.type;delete n.info.UUID;VUECFG.formObj[VUECFG.sort[0]].info.ds_rowarr.push(n);VUECFG.formObj[n.info.ds_id]=n;VUECFG.normalObj[n.info.ds_id]=true;VUECFG.ctrlId=n.info.ds_id;VUECFG.ctrlType=$DS.getCtrlType(VUECFG.ctrlId);window["$"+t].showProperty();var i=VUECFG.proObj[VUECFG.ctrlId];for(var s=0;s<i.length;s++){if(i[s]&&i[s].type){if(!(e[o][i[s].info.ds_id]===undefined)){var f=i[s].type.split("drag_")[1];i[s].info["ds_"+f]=e[o][i[s].info.ds_id]}if(i[s].info.ds_id=="ds_datasource"){changeDataSourceForCtrl(i[s].info,e[o][i[s].info.ds_id])}}}for(var l=0;l<i.length;l++){if(i[l].info.ds_id=="ds_name")changeFieldNameForCtrl(i[l].info,e[o][i[l].info.ds_id])}}}$DS.refPagePro();$DS.refForm();$DS.refPro();$DS.refSource()}function fastBuildOpenLayout(){showMyDialog("快速构建布局","95%","95%","manage/fastBuildLayout.jsp",function(){})}function importPageCfg(e){var r=e.params;if(!r){return}try{if($DS.util.isString(r)){r=JSON.parse(r)}else{alert("配置数据有误,请检查!");e.vue.importCfg="";return false}var a=$DS.util.isObject(r);if(a===false){alert("配置数据有误,请检查!");e.vue.importCfg="";return false}var o=["pageId","pageName","pageInfoId","viewStatu","appId","appArr","appObj"];for(let a=0;a<o.length;a++){if(!r.hasOwnProperty(o[a])){alert(`配置数据有误,缺失【${o[a]}】属性!`);e.vue.importCfg="";return false}}$DS.util.confirm(window.vm,"注意:导入后将覆盖原页面!",function(){r.pageId=VUECFG.pageId;r.pageName=VUECFG.pageName;r.pageInfoId=VUECFG.pageInfoId;VUECFG=r;saveVueCfg("importCfg");window.location.reload()},"已取消导入",r,function(e){e.vue.importCfg=""})}catch(r){console.error(r);alert("配置数据有误,请检查!");e.vue.importCfg="";return false}}function fastBuildLayout(e){var r=$DS.select(VUECFG.appId,"GUID,MBODY","DM_FORM_MODELPAGE","AND GUID='"+e+"'","快速构建布局信息查询异常!");if(r.isError){alert(r.errMsg);return false}else{r=r.result}try{cfg=JSON.parse(r.MBODY)}catch(e){console.error("快速构建布局JSON格式解析异常!");cfg={}}for(var a in cfg){VUECFG[a]=cfg[a]}VUECFG.groupObj={};for(var o=0;o<VUECFG.sourceArr.length;o++){VUECFG.sourceArr[o].sourceGroup={};VUECFG.sourceArr[o].fieldMap={}}for(var t in VUECFG.formObj){var n=$DS.getCtrlType(t);VUECFG.ctrlId=t;VUECFG.ctrlType=n;var i=VUECFG.formObj[t].info;window["$"+n].showProperty();var s=VUECFG.proObj[t];for(var f=0;f<s.length;f++){if(s[f].info.ds_name=="ds_datasource"||s[f].info.ds_name=="ds_name"||s[f].info.ds_name=="type")continue;var l=s[f].type.split("drag_")[1];s[f].info["ds_"+l]=i[s[f].info.ds_name]}VUECFG.proObj[t]=s}$DS.refPagePro();$DS.refForm();$DS.refPro();$DS.refSource()}function editOuterHTML(){debugger;var e=VUECFG.ctrlId;var r=getCtrlById(e);if(r===false){alert("请选择控件");return}else{showMyDialog("HTML编辑器","95%","95%","js/editor/online_editor/htmlEditor.jsp?currid="+e)}}function setModelLayout(){showMyDialog("保存布局模板","80%","80%","manage/saveModelLayout.jsp",function(){})}function getPageParams(e){e.vue.$data.pms=$DS.util.json($DS.pageParams)}function viewPage(){window.open(encodeURI(getProjectName()+"/freeForm/freeFromView.jsp?PAGEID="+VUECFG.pageId+"&PAGETITLE="+VUECFG.pageName+"&APPID="+VUECFG.appId),VUECFG.pageId+"_view")}function imgUploadSucceed(e){}function imgUploadFail(e){}function registerMenu(){let e=VUECFG.menuId?"edit":"add";let r=`${getProjectName()}/freeForm/freeFromView.jsp?PAGEID=DAED805C78BF4BD98F34299FE82AD1F7&PAGETITLE=【Z802】注册菜单&APPID=CONSOLE&menuId=${VUECFG.menuId?VUECFG.menuId:""}&type=${e}`;$DS.showPage(r,"注册菜单","50%","70%")}function enterIframePage(){if(!VUECFG.ctrlId){alert("请选择控件!");return}let e=$DS.getCtrlById(VUECFG.ctrlId).info;if($DS.getCtrlType(e.ds_id)!="iframe"){alert("请选择网页框控件!");return}let r="";if(e.ds_iframe_setType=="poptree")r=e.ds_iframe_src?e.ds_iframe_src.replace("freeFromView.jsp","freeFrom.jsp"):"";else r=e.ds_iframe_src_input;window.open(r)}