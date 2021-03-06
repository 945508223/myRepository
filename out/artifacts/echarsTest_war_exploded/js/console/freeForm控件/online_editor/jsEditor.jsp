<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>在线编辑器</title>

    <!--引入编辑器样式-->
    <link rel="stylesheet" href="css/Editor.css">
    <!-- code mirror的样式 -->
    <link rel="stylesheet" href="css/codemirror.css" />
    <!-- 主题的样式 -->
    <link rel="stylesheet" href="theme/3024-day.css">
    <link rel="stylesheet" href="theme/3024-night.css">
    <link rel="stylesheet" href="theme/abcdef.css">
    <link rel="stylesheet" href="theme/ambiance.css">
    <link rel="stylesheet" href="theme/base16-dark.css">
    <link rel="stylesheet" href="theme/bespin.css">
    <link rel="stylesheet" href="theme/base16-light.css">
    <link rel="stylesheet" href="theme/blackboard.css">
    <link rel="stylesheet" href="theme/cobalt.css">
    <link rel="stylesheet" href="theme/colorforth.css">
    <link rel="stylesheet" href="theme/dracula.css">
    <link rel="stylesheet" href="theme/duotone-dark.css">
    <link rel="stylesheet" href="theme/duotone-light.css">
    <link rel="stylesheet" href="theme/eclipse.css">
    <link rel="stylesheet" href="theme/elegant.css">
    <link rel="stylesheet" href="theme/erlang-dark.css">
    <link rel="stylesheet" href="theme/gruvbox-dark.css">
    <link rel="stylesheet" href="theme/hopscotch.css">
    <link rel="stylesheet" href="theme/icecoder.css">
    <link rel="stylesheet" href="theme/isotope.css">
    <link rel="stylesheet" href="theme/lesser-dark.css">
    <link rel="stylesheet" href="theme/liquibyte.css">
    <link rel="stylesheet" href="theme/lucario.css">
    <link rel="stylesheet" href="theme/material.css">
    <link rel="stylesheet" href="theme/mbo.css">
    <link rel="stylesheet" href="theme/mdn-like.css">
    <link rel="stylesheet" href="theme/midnight.css">
    <link rel="stylesheet" href="theme/monokai.css">
    <link rel="stylesheet" href="theme/neat.css">
    <link rel="stylesheet" href="theme/neo.css">
    <link rel="stylesheet" href="theme/night.css">
    <link rel="stylesheet" href="theme/nord.css">
    <link rel="stylesheet" href="theme/oceanic-next.css">
    <link rel="stylesheet" href="theme/panda-syntax.css">
    <link rel="stylesheet" href="theme/paraiso-dark.css">
    <link rel="stylesheet" href="theme/paraiso-light.css">
    <link rel="stylesheet" href="theme/pastel-on-dark.css">
    <link rel="stylesheet" href="theme/railscasts.css">
    <link rel="stylesheet" href="theme/rubyblue.css">
    <link rel="stylesheet" href="theme/seti.css">
    <link rel="stylesheet" href="theme/shadowfox.css">
    <link rel="stylesheet" href="theme/solarized.css">
    <link rel="stylesheet" href="theme/the-matrix.css">
    <link rel="stylesheet" href="theme/tomorrow-night-bright.css">
    <link rel="stylesheet" href="theme/tomorrow-night-eighties.css">
    <link rel="stylesheet" href="theme/ttcn.css">
    <link rel="stylesheet" href="theme/twilight.css">
    <link rel="stylesheet" href="theme/vibrant-ink.css">
    <link rel="stylesheet" href="theme/xq-dark.css">
    <link rel="stylesheet" href="theme/xq-light.css">
    <link rel="stylesheet" href="theme/yeti.css">
    <link rel="stylesheet" href="theme/idea.css">
    <link rel="stylesheet" href="theme/darcula.css">
    <link rel="stylesheet" href="theme/yonce.css">
    <link rel="stylesheet" href="theme/zenburn.css">

    <!-- 代码折叠时的样式 -->
    <link rel="stylesheet" href="css/foldgutter.css" />
    <!-- 唤出来的提示代码的样式 -->
    <link rel="stylesheet" href="css/show-hint.css" />

    <link rel="stylesheet" href="css/jqx.base.css" />

    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="../../../static/pubjs/ycdcommon.js"></script>

    <!-- code mirror核心代码 -->
    <script src="js/codemirror.js"></script>
    <!-- javascript代码高亮样式 -->
    <script src="js/javascript.js"></script>
    <!-- 可以设置代码提示 -->
    <script src="js/anyword-hint.js"></script>
    <script src="js/show-hint.js"></script>

    <script src="js/dialog.js"></script>
    <!-- 代码折叠 -->
    <script src="js/brace-fold.js"></script>
    <script src="js/foldcode.js"></script>
    <script src="js/foldgutter.js"></script>

    <!-- 搜索完成后光标会消失 -->
    <script src="js/searchcursor.js"></script>
    <!-- 给编辑器添加搜索功能 -->
    <script src="js/search.js"></script>
    <!-- 自动闭合括号 -->
    <script src="js/closebrackets.js"></script>
    <!-- 光标放在括号右边时，自动高亮对应的括号 -->
    <script src="js/matchbrackets.js"></script>
    <!-- 高亮光标所在的行 -->
    <script src="js/active-line.js"></script>

    <!-- 用于分割页面 -->
    <script src="js/jqxcore.js"></script>
    <script src="js/jqxsplitter.js"></script>
    <!--公用js-->
    <script src="js/commonTemplate.js"></script>
</head>
<body>
<div class="tool-group">
    <span style="margin-right: 15px;">JS在线编辑器</span>

    <input type="checkbox" value="" id="isautorun" style="display: none">
    <span style="margin-left: 20px;">切换主题</span>
    <select id="select" onchange="selectTheme(event)">
        <option>default</option>
        <option>3024-day</option>
        <option>3024-night</option>
        <option>abcdef</option>
        <option>ambiance</option>
        <option>base16-dark</option>
        <option>base16-light</option>
        <option>bespin</option>
        <option>blackboard</option>
        <option>cobalt</option>
        <option>colorforth</option>
        <option>darcula</option>
        <option selected>dracula</option>
        <option>duotone-dark</option>
        <option>duotone-light</option>
        <option>eclipse</option>
        <option>elegant</option>
        <option>erlang-dark</option>
        <option>gruvbox-dark</option>
        <option>hopscotch</option>
        <option>icecoder</option>
        <option>idea</option>
        <option>isotope</option>
        <option>lesser-dark</option>
        <option>liquibyte</option>
        <option>lucario</option>
        <option>material</option>
        <option>mbo</option>
        <option>mdn-like</option>
        <option>midnight</option>
        <option>monokai</option>
        <option>neat</option>
        <option>neo</option>
        <option>night</option>
        <option>nord</option>
        <option>oceanic-next</option>
        <option>panda-syntax</option>
        <option>paraiso-dark</option>
        <option>paraiso-light</option>
        <option>pastel-on-dark</option>
        <option>railscasts</option>
        <option>rubyblue</option>
        <option>seti</option>
        <option>shadowfox</option>
        <option>solarized dark</option>
        <option>solarized light</option>
        <option>the-matrix</option>
        <option>tomorrow-night-bright</option>
        <option>tomorrow-night-eighties</option>
        <option>ttcn</option>
        <option>twilight</option>
        <option>vibrant-ink</option>
        <option>xq-dark</option>
        <option>xq-light</option>
        <option>yeti</option>
        <option>yonce</option>
        <option>zenburn</option>
    </select>
    <div id="right_btn" style="margin-left: 60%">
        <select id="t" onchange="selectTemplate(event)">
            <option >模板选择</option>
            <option>template1</option>
            <option>template2</option>
        </select>
        <button onclick="submitTryit()" class="btn btn-primary btn-sm" style="margin-right:15px;display:none">执行代码</button>
        <button id="sure">保存代码</button>
    </div>
    <div class="file-btn">
        <input type="file" id="file" class="inputfile" onchange="addLibJs(event)"/>
        <label for="file">添加库</label>
        <span class="inner"></span>
    </div>
    <div class="error-tip" style="display: none;margin-left: 20px;"><span ></span></div>
</div>
<div id="splitContainer">
    <div>
        <div id="leftSplitter" style="height:43.5rem">
            <div style="height:100%">
                <textarea placeholder="输入 JavaScript 代码……" id="code-js" class="form-control" name="code" rows="10"></textarea>
            </div>
        </div>
    </div>
    <!--<div>
        <div id="rightSplitter" style="height:100%">
            <div id="output" style="height:100%">
            </div>
        </div>
    </div>-->
</div>
<script type="text/javascript">
    $(() => {
        let winHeight = 0;
        if(window.innerHeight) {
            winHeight = window.innerHeight
        }else if((document.body) && document.body.clientHeight) {
            winHeight = document.body.clientHeight;
        }
        if(document.documentElement && document.documentElement.clientHeight) {
            winHeight = document.documentElement.clientHeight;
        }
        $('#isautorun').prop('checked',true);	// 是否在写代码时自动运行代码
        let height = (winHeight - 60) * 0.86;
        // 分割html、css、js代码区
        $('#splitContainer').jqxSplitter({ height: height, width: '100%', orientation: 'vertical', panels: [{ size: '50%' }, { size: '50%' }] });
        $('#leftSplitter').jqxSplitter({ height: '100%', width: '100%', orientation: 'horizontal',  panels: [{ size: '50%' }, { size: '50%'}] });
        $('#rightSplitter').jqxSplitter({ height: '100%', width: '100%', orientation: 'horizontal',  panels: [{ size: '50%' }, { size: '50%'}] });
    });
    // 使用code mirror生成编辑器时配置
    let cm_opt = {
        mode: 'text/html',	// 模式，表示对那种类型的代码进行样式渲染
        gutter: false,
        lineNumbers: true,	// 行号
        autoCloseBrackets:true,	// 是否自动闭合括号
        styleActiveLine: true,	// 高亮当前行
        theme:"dracula",	// 编辑器主题
        lineWrapping: true,	// 是否换行
        foldGutter: true,		// 是否能折叠代码
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {"Alt-/": "autocomplete"},	// 使用alt+/唤出代码提示
        matchBrackets: true,	// 是否能匹配成对的括号
        matchTags: {bothTags: true},	// 鼠标点击时匹配成对的标签
        autoCloseTags:true	// 是否自动闭合标签
    }

    Object.assign(cm_opt,{mode: 'text/javascript'});
    let js_editor = CodeMirror.fromTextArea(document.getElementById("code-js"),cm_opt);
    js_editor.on('change',function(inst,changes) {
        if($('#isautorun').prop('checked')) {
            submitTryit();
        }
    })
    var ptype="add";
    var data;
    var type = YCDCommon.Win.getUrlParam("type");
    if(!type)type="private"
    //GUID:加载页面js,如果为页面级js需要从数据库中取
    var guid = YCDCommon.Win.getUrlParam("GUID");
    //ID:加载事件js,事件js直接从当前页面id对应的对象中找
    var id = YCDCommon.Win.getUrlParam("ds_id");
    var name = YCDCommon.Win.getUrlParam("ds_name");
    var ispro = YCDCommon.Win.getUrlParam("ispro");
    var js_Text =(id)?parent.VUECFG.formObj[id].info[name]:null;

    if(guid){
        getJsValueByGuid()
    }else {
        if(js_Text)
            js_editor.setValue(js_Text);    //给代码框赋值
    }
    $('#sure').bind('click', function(){
        save_js();
    });
    //查询页面脚本js
    function getJsValueByGuid(){
        debugger
        var col="GUID,JS_TEXT";
        if(type==="pubjs"){
            var filter="AND GUID='"+guid+"'";
            data=parent.parent.$DS.select(parent.parent.VUECFG.appId,col,"DM_FORM_PAGEJS",filter);
        }else {
            var filter="AND ITEMCODE='"+guid+"'";
            data=parent.$DS.select(parent.VUECFG.appId,col,"DM_FORM_PAGEJS",filter);
        }

        if(data){
            ptype="edit"
            var base = new Base64();
            var jsValue=(data.JS_TEXT)?base.decode(data.JS_TEXT):"";
            if(jsValue&&jsValue!=""){
                editor.setValue(jsValue);    //给代码框赋值
            }
        }

    }
    //保存js
    function save_js(){
        debugger
        var base = new Base64();
        var jsValue=js_editor.getValue();
        if(guid&&type==="private"){
            var pageName=parent.VUECFG.pageName;
            if(pageName.length>25){
                pageName=pageName.substring(0,25);
            }
            var datas={
                ITEMCODE:guid,
                ITEMNAME:pageName,
                JS_TEXT:base.encode(jsValue),
                TYPE:type
            };
            if(ptype=="edit"){
                datas["GUID"]=data.GUID;
            }
            parent.$DS.saveTable(parent.VUECFG.appId,ptype,datas,"DM_FORM_PAGEJS","GUID",function (data) {
                debugger
                parent.$DS.setPro("PAGE","ds_pagejs","jseditor", "【脚本】")
                close_();
                parent.alert("保存成功!")
            })
        }else if(guid&&type==="pubjs"){
            debugger
            var datas={
                ITEMCODE:YCDCommon.Win.getUrlParam("ITEMCODE"),
                ITEMNAME:YCDCommon.Win.getUrlParam("ITEMNAME"),
                JS_TEXT:base.encode(jsValue),
                TYPE:"pubjs",
                GUID:guid
            };

            parent.parent.$DS.saveTable(parent.parent.VUECFG.appId,ptype,datas,"DM_FORM_PAGEJS","GUID",function (data) {
                debugger
                close_();
                parent.parent.alert("保存成功!")
            })
        }
        else{
            parent.$DS.setPro(id,name,(ispro=="true")?"jseditor":"input",jsValue);
            close_();
            parent.alert("请保存设计界面!</br>否则设置的JS文本将不会加载!");
        }
    }



    // 获取上传文件的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjcectURL != undefined) {
            url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    function addLibJs(e) {
        let _file = e.target.files[0];
        //实例化fileReader,
        let fd = new FileReader();
        //获取当前选择文件的类型
        let fileType = _file.type;
        //调它的readAsDataURL并把原生File对象传给它，
        fd.readAsDataURL(_file);
        let html = html_editor.getValue();
        fd.onload = function() {
            if(html && /^text\/javascript$/.test(fileType)) {
                $('.inner').text(_file.name);
                let url = getObjectURL(_file);
                let extra = `<!-- ${_file.name} -->\r\n<script src="${url}"><\/script>\r\n`;
                html = extra + html;
                html_editor.setValue(html);
            }
        }
    }
    // 执行所有编辑器的代码生成页面,代码可自己调试查看结果
    function submitTryit() {
        // 获取编辑器内容
        let html = "";
        let js = js_editor.getValue();

        let src = html;
        let array_matches_head_tag = null;
        let array_matches_body_tag = null;

        if(js) {
            js = '<script>'+js+'<\/script>';
            if(array_matches_body_tag) {
                src = src.replace('</body>',js+'</body>');
            }else {
                src += js;
            }
        }

        let text = src;
        let ifr = document.createElement('iframe');
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("id", "iframeResult");
        document.getElementById("output").innerHTML = "";
        document.getElementById("output").appendChild(ifr);
        var ifrw = (ifr.contentWindow) ? ifr.contentWindow: (ifr.contentDocument.document) ? ifr.contentDocument.document: ifr.contentDocument;
        ifrw.document.open();
        ifrw.document.write(text);
        ifrw.document.close();
        autodivheight();
    }
    // 生成默认的js模板
    function generateJsTemplate() {
        let js_code = "document.write();"
        //submitTryit();
        js_editor.getDoc().setValue(js_code);
    }

    window.addEventListener("resize", autodivheight);
    function autodivheight(){
        var winHeight=0;
        if (window.innerHeight) {
            winHeight = window.innerHeight;
        } else if ((document.body) && (document.body.clientHeight)) {
            winHeight = document.body.clientHeight;
        }
        //通过深入Document内部对body进行检测，获取浏览器窗口高度
        if (document.documentElement && document.documentElement.clientHeight) {
            winHeight = document.documentElement.clientHeight;
        }
        height = height = (winHeight - 60) * 0.86;
        document.getElementById("splitContainer").style.height= height +"px";
    }

    // 切换主题
    function selectTheme(e) {
        js_editor.setOption('theme',e.target.value);
    }
    //选择模板
    function selectTemplate(e) {
        debugger
        var value=e.target.value;
        setCommonTemplete(js_editor,value)
    }

</script>
<script id="template1">
    document.write();
</script>
<script id="template2">
    console.log();
</script>
</body>
</html>
