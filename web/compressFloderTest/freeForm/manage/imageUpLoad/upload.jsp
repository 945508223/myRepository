<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>文件上传</title>
<script type="text/javascript" src="../../../static/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../../../static/pubjs/ycdcommon.js"></script>
<script type="text/javascript" src="../../../static/pubjs/common.js"></script>
<link rel="stylesheet" href="../../css/pubcss/font-awesome/css/font-awesome.css" />
<link rel="stylesheet" href="../../../static/bootstrap/bootstrap.css">
<script src="../../../static/jquery-plugin/loading/loading.js"></script>


<%--引入css样式--%>
<link href="../../../static/webuploader/dist/webuploader.css" rel="stylesheet" type="text/css"/>
<%--引入文件上传插件--%>
<script type="text/javascript" src="../../../static/webuploader/dist/webuploader.min.js"></script>
<script type="text/javascript" src="../../../static/webuploader/dist/webuploader.js"></script>

<style type="text/css">
</style>

</head>

<body style="overflow: hidden;">
<div id="uploader" class="wu-example">
    <!--用来存放文件信息-->
    <div id="thelist" class="uploader-list" style="overflow: auto;"></div>
      <div id="lbl_msg" style="height: 25px; text-align: right; background-color: #efefef;color:Red;">
        注：建议上传文件大小不要超过1G（1024M）。
        </div>
    <div id="div_Button" style="height: 47px; text-align: right; background-color: #dcdcdc;">
            <table style="width: 100%;">
                <tr>
                    <td style="width: 50%; height: 37px; text-align: center;" id='pk'>
                        <div id="picker" style="width: 90px; float: left; background-color: #00B7EE; color: White;
                            cursor: pointer; height: 37px; line-height: 37px;" onmouseover="this.style.backgroundColor='#00A2D4'"
                            onmouseout="this.style.backgroundColor='#00B7EE'" onclick="uploadImage()">
                            选择文件</div>
                    </td>
                    <td style="width: 50%; height: 37px; text-align: center;">
                        <div id="ctlBtn" style="width: 90px; float: left; background-color: #00B7EE; color: White;
                            cursor: pointer; height: 37px; line-height: 37px;" onmouseover="this.style.backgroundColor='#00A2D4'"
                            onmouseout="this.style.backgroundColor='#00B7EE'">
                            开始上传</div>
                    </td>
                </tr>
            </table>
        </div>
</div>






</body>

    
<script>
var selcount = 0;
var $list = $('#thelist');
var $btn = $('#ctlBtn');
var state = 'pending';
var basePath=getProjectName();
var m_succedevent="";
var m_failevent="";
function upload(succedevent,failevent,fileType,maxFileSize,auto){
	try{
		debugger
		m_succedevent = succedevent;
    	m_failevent = failevent;
    	var accept=[];
    	var mimeTypes="";
		var ftype=fileType.split(",");
		for(i in ftype){
			(i==ftype.length-1)?mimeTypes+="."+ftype[i]:mimeTypes+="."+ftype[i]+","
		}
    	if(fileType!=""){
    		accept=[{
		    	title: 'file',
	    	    extensions: fileType,
	    	    mimeTypes: mimeTypes
		    }]
    	}
    	$("#pk").html('<div id="picker" style="width: 90px; float: left; background-color: #00B7EE; color: White;'
        				+'cursor: pointer; height: 37px; line-height: 37px;" onmouseover="this.style.backgroundColor=\'#00A2D4\'"'
        				+'onmouseout="this.style.backgroundColor=\'#00B7EE\'" onclick="uploadImage()">选择文件</div>');
    	debugger
		var uploader = WebUploader.create({
		    // swf文件路径
		    swf: basePath + '/static/webuploader/dist/Uploader.swf',
	
		    // 文件接收服务端。
		    server: basePath+'/frame/upload?maxFileSize='+maxFileSize,
	
		    // 选择文件的按钮。可选。
		    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
		    pick: {
		    	id:'#picker',
		    	multiple:true
		    },
		    accept:accept, 
		    auto:true,//不需要手动调用上传
	
		    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		    resize: false
		});
		window.setTimeout("autosubmit();", 1000);
		// 当有文件被添加进队列的时候
		uploader.on( 'fileQueued', function( file ) {
			 selcount++;
			$list.append("<div id='" + file.id + "' class='item'><table style='width:100%;'><tr><td style='width:70%;'><h4 class='info' style='line-height: 25px;'>" + selcount + "." + file.name + "</h4></td><td><p class='state'>等待上传...</p></td></tr></table></div>");
			parent.toLoding("文件上传中，请稍后...",true);
	    	});
		// 文件上传过程中创建进度条实时显示。
		uploader.on( 'uploadProgress', function( file, percentage ) {
			
		    var $li = $( '#'+file.id ),
		        $percent = $li.find('.progress .progress-bar');
	
		    // 避免重复创建
		    if ( !$percent.length ) {
		        $percent = $('<div class="progress progress-striped active">' +
		          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
		          '</div>' +
		        '</div>').appendTo( $li ).find('.progress-bar');
		    }
	
		    $li.find('p.state').text('上传中');
	
		    $percent.css( 'width', percentage * 100 + '%' );
		});
		
		
		uploader.on( 'uploadSuccess', function( file,result ) {
	 		var json=result.result;
		 	if (result.isError){
		 		$( '#'+file.id ).find('p.state').text(result.errMsg);
		    	window.parent[m_failevent](result.errMsg);
		 	}else{
		    	$( '#'+file.id ).find('p.state').text('已上传');
		    	window.parent[m_succedevent](json.fileName,json.inFileName,json.savepath,json.fileSize);
		 		
		 	}
		});
	
		uploader.on( 'uploadError', function( file,result ) {
		    $( '#'+file.id ).find('p.state').text('上传出错');
		});
		//不管成功或者失败，文件上传完成时触发。
		uploader.on( 'uploadComplete', function( file ) {
		    $( '#'+file.id ).find('.progress').fadeOut();
		});
		
		uploader.on('all', function (type) {
	        if (type === 'startUpload') {
	            state = 'uploading';
	        } else if (type === 'stopUpload') {
	            state = 'paused';
	        } else if (type === 'uploadFinished') {
	            state = 'done';
	            //window.parent.allFileUploadComplete();
	        }
	
	        if (state === 'uploading') {
	            $btn.text('暂停上传');
	        } else {
	            $btn.text('开始上传');
	        }
	    });
	
	    $btn.on('click', function () {
	        if (state === 'uploading') {
	            uploader.stop();
	        } else {
	            uploader.upload();
	        }
	    });
	}catch(e){
		console.log(e);
		//document.getElementById("scro")[0].style.display="none";
	}
	
}
var clickFlag=true;
function autosubmit(){
	
	clickFlag=false;
	document.getElementsByName("file")[0].click();
	clickFlag=true;
	
}	
function uploadImage(){
	upload("upload_succeed", "upload_fail","",1024,false)
	
}
    

</script>
</html>