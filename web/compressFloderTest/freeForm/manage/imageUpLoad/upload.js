var key=YCDCommon.Win.getUrlParam("key");var domm=window.top[key];var basePath=YCDCommon.Win.getUrlParam("basePath");if(!basePath)basePath=getProjectName();var pageId=YCDCommon.Win.getUrlParam("pageId");var type=YCDCommon.Win.getUrlParam("type");var ctrlId=YCDCommon.Win.getUrlParam("ctrlId");var ctrlType=YCDCommon.Win.getUrlParam("ctrlType");var richId=YCDCommon.Win.getUrlParam("richId");var callBack=YCDCommon.Win.getUrlParam("callBack");var maxFileSize="";var _upLoadFailEvent="imgUploadFail";var _upLoadSucceedEvent="imgUploadSucceed";var fileType="jpg,png,gif";var failCount=0;var successCount=0;var currPicture=null;var folderId=0;var uploader;var FASTDFSURL="";var result=YCDCommon.Ajax.syncAjax(getProjectName()+"/sysconfig/frame/getFastDFSUrl");if(!result||result.isError){console.error("【 获取fastDFSUrl地址失败!】")}else{FASTDFSURL="http://"+result.result}var tabIndex=0;(function(e){initTableAll();e(function(){layui.use(["layer","element"],function(){var e=layui.jquery,a=layui.element;layer=layui.layer;a.on("tab",function(e){tabIndex=e.index;if(e.index==0){initTableAll()}else if(e.index==1){initTableAll2()}})});var a=e("#uploader"),t=e('<ul class="filelist"></ul>').appendTo(a.find(".queueList")),r=a.find(".statusBar"),i=r.find(".info"),n=a.find(".uploadBtn"),o=a.find(".placeholder"),l=r.find(".progress").hide(),s=0,d=0,c=window.devicePixelRatio||1,u=110*c,p=110*c,f="pedding",m={},v=function(){var e=new Image;var a=true;e.onload=e.onerror=function(){if(this.width!=1||this.height!=1){a=false}};e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";return a}(),h=function(){var e;try{e=navigator.plugins["Shockwave Flash"];e=e.description}catch(a){try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(a){e="0.0"}}e=e.match(/\d+/g);return parseFloat(e[0]+"."+e[1],10)}(),g=function(){var e=document.createElement("p").style,a="transition"in e||"WebkitTransition"in e||"MozTransition"in e||"msTransition"in e||"OTransition"in e;e=null;return a}();if(!WebUploader.Uploader.support("flash")&&WebUploader.browser.ie){if(h){(function(e){window["expressinstallcallback"]=function(e){switch(e){case"Download.Cancelled":alert("您取消了更新！");break;case"Download.Failed":alert("安装失败");break;default:alert("安装已成功，请刷新！");break}delete window["expressinstallcallback"]};var a="./expressInstall.swf";var t='<object type="application/'+'x-shockwave-flash" data="'+a+'" ';if(WebUploader.browser.ie){t+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '}t+='width="100%" height="100%" style="outline:0">'+'<param name="movie" value="'+a+'" />'+'<param name="wmode" value="transparent" />'+'<param name="allowscriptaccess" value="always" />'+"</object>";e.html(t)})(a)}else{a.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>')}return}else if(!WebUploader.Uploader.support()){alert("Web Uploader 不支持您的浏览器！");return}uploader=WebUploader.create({pick:{id:"#filePicker",label:"点击选择图片"},formData:{uid:123},dnd:"#uploader .queueList",paste:"#uploader",swf:basePath+"/static/webuploader/dist/Uploader.swf",chunked:false,chunkSize:512*1024,resize:false,auto:false,server:basePath+"/sysconfig/frame/uploadFastDFS?maxFileSize="+maxFileSize,disableGlobalDnd:true,fileNumLimit:300,fileSizeLimit:200*1024*1024,fileSingleSizeLimit:50*1024*1024});uploader.on("dndAccept",function(e){var a=false,t=e.length,r=0,i="text/plain;application/javascript ";for(;r<t;r++){if(~i.indexOf(e[r].type)){a=true;break}}return!a});uploader.on("dialogOpen",function(){});uploader.addButton({id:"#filePicker2",label:"继续添加"});uploader.on("ready",function(){window.uploader=uploader});function b(a){var r=e('<li id="'+a.id+'">'+'<p class="title">'+a.name+"</p>"+'<p class="imgWrap"></p>'+'<p class="progress"><span></span></p>'+"</li>"),i=e('<div class="file-panel">'+'<span class="cancel">删除</span>'+'<span class="rotateRight">向右旋转</span>'+'<span class="rotateLeft">向左旋转</span></div>').appendTo(r),n=r.find("p.progress span"),o=r.find("p.imgWrap"),l=e('<p class="error"></p>'),s=function(e){switch(e){case"exceed_size":text="文件大小超出";break;case"interrupt":text="上传暂停";break;default:text="上传失败，请重试";break}l.text(text).appendTo(r)};if(a.getStatus()==="invalid"){s(a.statusText)}else{o.text("预览中");uploader.makeThumb(a,function(a,t){var r;if(a){o.text("不能预览");return}if(v){r=e('<img src="'+t+'">');o.empty().append(r)}else{e.ajax("../../../static/webuploader/server/preview.php",{method:"POST",data:t,dataType:"json"}).done(function(a){if(a.result){r=e('<img src="'+a.result+'">');o.empty().append(r)}else{o.text("预览出错")}})}},u,p);m[a.id]=[a.size,0];a.rotation=0}a.on("statuschange",function(e,t){if(t==="progress"){n.hide().width(0)}else if(t==="queued"){r.off("mouseenter mouseleave");i.remove()}if(e==="error"||e==="invalid"){console.log(a.statusText);s(a.statusText);m[a.id][1]=1}else if(e==="interrupt"){s("interrupt")}else if(e==="queued"){l.remove();n.css("display","block");m[a.id][1]=0}else if(e==="progress"){l.remove();n.css("display","block")}else if(e==="complete"){}r.removeClass("state-"+t).addClass("state-"+e)});r.on("mouseenter",function(){i.stop().animate({height:30})});r.on("mouseleave",function(){i.stop().animate({height:0})});i.on("click","span",function(){var t=e(this).index(),r;switch(t){case 0:uploader.removeFile(a);return;case 1:a.rotation+=90;break;case 2:a.rotation-=90;break}if(g){r="rotate("+a.rotation+"deg)";o.css({"-webkit-transform":r,"-mos-transform":r,"-o-transform":r,transform:r})}else{o.css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation="+~~(a.rotation/90%4+4)%4+")")}});r.appendTo(t)}function y(a){var t=e("#"+a.id);delete m[a.id];D();t.off().find(".file-panel").off().end().remove()}function D(){var a=0,t=0,r=l.children(),i;e.each(m,function(e,r){t+=r[0];a+=r[0]*r[1]});i=t?a/t:0;r.eq(0).text(Math.round(i*100)+"%");r.eq(1).css("width",Math.round(i*100)+"%");C()}function C(){var e="",a;if(f==="ready"){e="选中"+s+"张图片，共"+WebUploader.formatSize(d)+"。"}else if(f==="confirm"){a=uploader.getStats();if(successCount){e="已成功上传"+successCount+"张照片，"+failCount+'张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'}}else{e="共"+s+"张（"+WebUploader.formatSize(d)+"），已成功上传"+successCount+"张照片";if(failCount>0){e+="，"+failCount+'张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片'}}i.html(e)}function x(a){var i,s;if(a===f){return}n.removeClass("state-"+f);n.addClass("state-"+a);f=a;switch(f){case"pedding":o.removeClass("element-invisible");t.hide();r.addClass("element-invisible");uploader.refresh();break;case"ready":o.addClass("element-invisible");e("#filePicker2").removeClass("element-invisible");t.show();r.removeClass("element-invisible");uploader.refresh();break;case"uploading":e("#filePicker2").addClass("element-invisible");l.show();n.text("暂停上传");break;case"paused":l.show();n.text("继续上传");break;case"confirm":l.hide();e("#filePicker2").removeClass("element-invisible");n.text("开始上传");s=uploader.getStats();if(s.successNum&&!s.uploadFailNum){x("finish");return}break;case"finish":s=uploader.getStats();if(s.successNum){}else{f="done";location.reload()}break}C()}uploader.onUploadProgress=function(a,t){var r=e("#"+a.id),i=r.find(".progress span");i.css("width",t*100+"%");m[a.id][1]=t;D()};uploader.onFileQueued=function(e){s++;d+=e.size;if(s===1){o.addClass("element-invisible");r.show()}b(e);x("ready");D()};uploader.onFileDequeued=function(e){s--;d-=e.size;if(!s){x("pedding")}y(e);D()};uploader.on("all",function(e){var a;switch(e){case"uploadFinished":x("confirm");break;case"startUpload":x("uploading");break;case"stopUpload":x("paused");break}});uploader.onError=function(e){alert("Eroor: "+e)};uploader.on("uploadSuccess",function(a,t){var r=e("#"+a.id);var i=r.find("p.progress span");var n=e('<p class="error"></p>');var o=t.result;console.log(JSON.stringify(o));if(t.isError){failCount++;C();window.parent[_upLoadFailEvent](t.errMsg);n.text(t.errMsg).appendTo(r);m[a.id][1]=1}else{i.hide().width(0);r.append('<span class="success"></span>');successCount++;if(window.parent[_upLoadSucceedEvent])window.parent[_upLoadSucceedEvent](o);C()}});n.on("click",function(){if(e(this).hasClass("disabled")){return false}if(f==="ready"){uploader.upload()}else if(f==="paused"){uploader.upload()}else if(f==="uploading"){uploader.stop()}});i.on("click",".retry",function(){uploader.retry()});i.on("click",".ignore",function(){alert("todo")});n.addClass("state-"+f);D()})})(jQuery);function iniPhoto(e){var a=120;var t=$("#photo").width();var r=Math.floor(floatDiv(t,a));if(e){var i=YCDCommon.Ajax.syncAjax(basePath+"/sysconfig/frame/getPhotoList?folderid="+e)}else{var i=YCDCommon.Ajax.syncAjax(basePath+"/sysconfig/frame/getPhotoList")}if(i.isError){alert(i.errMsg);return}else{i=i.result}var n=i.length;var o=Math.ceil(floatDiv(n,r));var l="";for(var s=0;s<o;s++){for(var d=0;d<r;d++){var c=r*s+d;if(c>=n)continue;if(d==0){l+="<ul>"}var u=FASTDFSURL+i[c].FILEURL;l+='<li class="pic" onclick="setPs(this)" uri="'+u+'" style="position:relative;float:left;width: 108px;height:138px;margin-right: 10px;margin-bottom: 20px;" onmouseover="overDel(this)" onmouseout="outDel(this)">'+"<div style=\"width: 100%;height: 108px;background: url('"+u+'\');background-size:100% 100%; "  title="'+i[c].FILENAME+'" ></div>'+'<div class="filePanel" style="position: absolute;width: 100%;top: 0;left: 0;height: 0px;">'+'<span class="showCancle"  id="'+i[c].GUID+'" folderid="'+i[c].FOLDERID+'"  group="'+i[c].GROUPID+'" uri="'+i[c].FILEURL+'" filepath="'+i[c].FILEPATH+'" filesize="'+i[c].FILESIZE+'" onclick="delPhoto(this)">删除</span>'+"</div>"+'<div style="width: 100%;overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px;height: 30px;padding-top: 5px;text-align: center;font-weight: bold;">'+i[c].FILENAME+"</div>"+"</li>";if(d==r-1){l+="</ul>"}}}$("#photo").html(l)}function delPhoto(e){var a=$(e).attr("id");var t=$(e).attr("group");var r=$(e).attr("filepath");var i=$(e).attr("folderid");layer.confirm("确认删除当前图片吗?",{icon:3,title:"提示"},function(e){var n=YCDCommon.Ajax.syncAjax(basePath+"/sysconfig/frame/delPhoto",{GUID:a,GROUP:t,FILEPATH:r});if(n.isError){alert(n.errMsg);return}else{alert("删除成功!");iniPhoto(i)}layer.close(e)},function(e){return})}function overDel(e){$(e).find(".filePanel").height("30px")}function outDel(e){$(e).find(".filePanel").height("0px")}function setPs(e){$(".pic").each(function(e,a){$(a).removeClass("ps")});$(e).addClass("ps");currPicture=$(e)}function setPhoto(){if(callBack){if(parent[callBack]){parent[callBack](currPicture);close_();return}if(window.top[callBack]){window.top[callBack](currPicture);close_();return}}if(domm){parent[domm.functionName](currPicture.attr("uri"),domm.doc,domm.obj);close_()}else if(parent.VUECFG.ctrlId&&parent.VUECFG.ctrlId.indexOf("rich")!=-1||richId){let a=richId=richId?richId:parent.VUECFG.ctrlId;var e=[{src:currPicture.attr("uri"),_src:currPicture.attr("uri"),width:"100",height:"100",border:"",floatStyle:"",vspace:"",title:"image_"+getGuid(),alt:"",ctrlname:"IMAGE",style:"width:100px;height:100px;"}];parent.$("#"+a).find("iframe")[0].contentWindow.insertImg(e);close_()}else if(ctrlId&&ctrlType&&(ctrlType==="label"||ctrlType==="row"||ctrlType==="page"||ctrlType==="listview")){if(currPicture){if(ctrlType==="page"){for(var a=0;a<parent.VUECFG.pageArr.length;a++){if(parent.VUECFG.pageArr[a].info.ds_name=="ds_page_background_image"){parent.VUECFG.pageArr[a].info.ds_input="url("+currPicture.attr("uri")+")";continue}}}else{var t=parent.VUECFG.formObj[ctrlId];t.info["ds_"+ctrlType+"_background_image"]="url("+currPicture.attr("uri")+")";setInputVal("url("+currPicture.attr("uri")+")")}close_()}else{layer.confirm("未选择图片,是否取消当前元素背景图?",{icon:3,title:"提示"},function(e){if(ctrlType!=="page"){var a=parent.VUECFG.formObj[ctrlId];a.info["ds_"+ctrlType+"_background_image"]="";setInputVal("")}else{for(var t=0;t<parent.VUECFG.pageArr.length;t++){if(parent.VUECFG.pageArr[t].info.ds_name=="ds_page_background_image"){parent.VUECFG.pageArr[t].info.ds_input="";continue}}}layer.close(e);close_()},function(e){return false})}}else{alert("请选择一个控件!");return false}}function setInputVal(e){parent.$DS.setPro(ctrlId,"ds_"+ctrlType+"_background_image","input",e)}function initTableAll(){var e={data:{key:{name:"NAME"},simpleData:{enable:true,idKey:"ID",pIdKey:"PID",rootPId:"root"}},view:{selectedMulti:true,addHoverDom:addHoverDom,removeHoverDom:removeHoverDom},callback:{beforeClick:zTreeBeforeClick,onClick:zTreeOnClick,beforeDrop:zTreeBeforeDrop},edit:{enable:true,drag:{isCopy:false,isMove:true,prev:false,next:true,inner:true},showRenameBtn:false,renameTitle:"修改分类名称",showRemoveBtn:false,removeTitle:"删除分类"}};var a=YCDCommon.Ajax.syncAjax(basePath+"/sysconfig/frame/getFolderList",{}).result;if(!a){a=[]}else{$.each(a,function(e,a){a.ID=a.GUID})}a.push({ID:"root",NAME:"所有分类"});a=sortList(a);$.fn.zTree.init($("#tableAll"),e,a);var t=$.fn.zTree.getZTreeObj("tableAll");t.expandAll(true)}function initTableAll2(){var e={data:{key:{name:"NAME"},simpleData:{enable:true,idKey:"ID",pIdKey:"PID",rootPId:"root"}},view:{selectedMulti:true,addHoverDom:addHoverDom,removeHoverDom:removeHoverDom},callback:{beforeClick:zTreeBeforeClick,onClick:zTreeOnClick,beforeDrop:zTreeBeforeDrop},edit:{enable:true,drag:{isCopy:false,isMove:true,prev:false,next:true,inner:true},showRenameBtn:false,renameTitle:"修改分类名称",showRemoveBtn:false,removeTitle:"删除分类"}};var a=YCDCommon.Ajax.syncAjax(basePath+"/sysconfig/frame/getFolderList",{}).result;if(!a){a=[]}else{$.each(a,function(e,a){a.ID=a.GUID})}a.push({ID:"root",NAME:"所有分类"});a=sortList(a);$.fn.zTree.init($("#tableAll2"),e,a);var t=$.fn.zTree.getZTreeObj("tableAll2");t.expandAll(true);var r=t.getNodes();if(r.length>0&&r[0].children&&r[0].children.length>0){var i=t.getNodesByParam("ID",r[0].children[0].ID,null);t.selectNode(i[0]);iniPhoto(r[0].children[0].ID)}}function addHoverDom(e,a){var t=$("#"+a.tId+"_a");if($("#diyBtn_add_"+a.ID).length>0||$("#diyBtn_edit_"+a.ID).length>0)return;var r="";if(a.ID=="root"){r="<span id='diyBtn_add_"+a.ID+"' class='button' title='添加分类' "+"style='margin-right: 2px;background-position: -144px 0px;vertical-align: top;'></span>";t.append(r);$("#diyBtn_add_"+a.ID).bind("click",function(){addOrEditCat("add",a.ID)})}else{r="<span id='diyBtn_add_"+a.ID+"' class='button' title='添加分类' "+"style='margin-right: 2px;background-position: -144px 0px;vertical-align: top;'></span>"+"<span id='diyBtn_edit_"+a.ID+"' class='button edit' title='修改分类名称'></span>"+"<span id='diyBtn_remove_"+a.ID+"' class='button remove' title='删除分类'></span>";t.append(r);$("#diyBtn_add_"+a.ID).bind("click",function(){addOrEditCat("add",a.ID)});$("#diyBtn_edit_"+a.ID).bind("click",function(){addOrEditCat("edit",a.ID,a.NAME)});$("#diyBtn_remove_"+a.ID).bind("click",function(){removeCat(a)})}}function removeHoverDom(e,a){$("#diyBtn_add_"+a.ID).unbind().remove();$("#diyBtn_edit_"+a.ID).unbind().remove();$("#diyBtn_remove_"+a.ID).unbind().remove()}function zTreeBeforeClick(e,a,t){if(a.ID=="root")return false}function zTreeBeforeDrop(e,a,t,r){return false}function zTreeOnClick(e,a,t){folderId=t.ID;uploader.stop();uploader.options.server=basePath+"/sysconfig/frame/uploadFastDFS?maxFileSize="+maxFileSize+"&FOLDERID="+folderId;if(a=="tableAll2"){iniPhoto(folderId)}}function addOrEditCat(e,a,t){var r=e=="add"?"新增":"修改";layer.open({type:1,title:r+"分类",skin:"layui-layer-lan",area:["420px","240px"],btn:["确认","关闭"],yes:function(t,i){var n=$("#catname").val();if(n){addOrEditCat_save(t,n,e,r,a)}else{alert("请输入分类名称！");return}},btn2:function(e,a){layer.close(e)},content:'<div style="height: 30px;margin-top: 10%;">'+'<span style="font-size: 16px;margin: 0 10px 0 42px;">分类名称:</span>'+'<input id="catname" type="text" style="border: 1px solid #666666;\n'+"    width: calc(100% - 190px);\n"+'    height: 20px;"/>'+"</div>"});if(e=="edit"){$("#catname").val(t)}}function addOrEditCat_save(e,a,t,r,i){var n=YCDCommon.Ajax.syncAjax(basePath+"/sysconfig/frame/addOrEditFolderName",{catName:a,type:t,catId:i});if(n.isError){alert(n.errMsg);return}layer.close(e);if(tabIndex==0){initTableAll()}else{initTableAll2()}alert(r+"成功！")}function removeCat(e){if(e.isParent){alert("当前分类存在下级数据,不能删除!");return}var a=e.NAME;var t=e.ID;layer.confirm("【"+a+"】确认删除当前分类？",{btn:["确认","取消"]},function(e){var r=YCDCommon.Ajax.syncAjax(basePath+"/sysconfig/frame/deleteFolderCat",{catId:t});if(r.isError){alert(r.errMsg);return}if(tabIndex==0){initTableAll()}else{initTableAll2()}alert("成功删除分类【"+a+"】")},function(){})}function getGuid(){var e,a="";e=new Date;a+=e.getMonth()+1+""+e.getDate()+""+e.getYear()+"-";a+=e.getHours()+""+e.getMinutes()+""+e.getSeconds()+""+e.getMilliseconds();return a}function sortList(e){e=e.sort(function(e,a){return e.NAME.localeCompare(a.NAME,"zh-CN",{numeric:true})});return e}