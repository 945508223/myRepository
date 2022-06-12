<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- css -->
    <link rel="stylesheet" href="../../css/pubcss/font-awesome.css"/>
    <link rel="stylesheet" type="text/css" href="../../../static/pubcss/common.css">
    <link rel="stylesheet" href="../../css/pubcss/base.css"/>
    <link rel="stylesheet" href="../../css/pubcss/loding.css "/>
    <link rel="stylesheet" href="../../css/pubcss/layui.css">
    <link rel="stylesheet" href="../../css/pubcss/css/public.css">
    <link rel="stylesheet" href="../../../static/jquery-plugin/loading/loading.css">
    <!-- js -->
    <script type="text/javascript" src="../../../static/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../../../static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="../../../static/pubjs/common.js"></script>
    <script src="../../../static/jquery-plugin/loading/loading.js"></script>
    <!-- UE Editor -->
    <script type="text/javascript" charset="utf-8" src="../../../static/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="../../../static/ueditor/_examples/editor_api.js"></script>
    <script type="text/javascript" charset="utf-8" src="../../../static/ueditor/lang/zh-cn/zh-cn.js"></script>
    <!-- jquery UI -->
    <link rel="stylesheet" href="../../../static/jqueryUI1.12.1/jquery-ui.min.css" type="text/css"/>
    <script src="../../../static/jqueryUI1.12.1/jquery-ui.min.js"></script>

    <!-- 配置js优先加载 -->
    <script type="text/javascript" src="wordConfig.js"></script>
    <script type="text/javascript" charset="utf-8" src="htmlEditor.js"></script>
    <title></title>
    <style>
        div {
            width: 100%;

        }

        html {
            height: calc(100%) !important;
        }

        #edui1_toolbarboxouter {
            background: #fff !important;
        }

        .ycdpw-footer-content {
            display: inline-block;
            position: absolute;
            top: 11px;
            right: 0%;
            width: 100% !important;
        }

        .ycdpw-footer-main {
            background-color: #f6f7fd;
            width: 100%;
            height: 45px;
            position: fixed;
            bottom: 0px;
            margin: 0;
            padding: 0;
            border: 0;
        }

        .ycdpw-footer-button {
            -webkit-user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            user-select: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            transition: all .3s;
            -webkit-transition: all .3s;
            border: 1px solid #ABC7F9;
            background-color: #f3f6fc;
            margin: 0;
            padding: 4px 13px;
            font-size: 12px;
            cursor: pointer;
            min-width: 80px;
            height: 26px;
            line-height: 26px;
            font-weight: normal;
            border-radius: 3px;
            color: #6EA0F5;
            outline: none;
        }

        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar {
            width: 3px;
            height: 1px;
            background-color: #e6ebf5;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            background-color: #e6ebf5;
        }

        /*定义滑块 内阴影+圆角*/
        ::-webkit-scrollbar-thumb {
            border-radius: 15px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #c3c3c3;
        }

        fieldset {
            width: 80%;
            margin: auto !important;
        }

        #titl {
            color: black;
            font-weight: bolder;
            font-size: 18px;
        }

        #editor {
            height: calc(100%) !important;
        }

        .edui-editor {
            height: calc(100%) !important;
        }

        .edui-default .edui-editor {
            border: 0px solid #d4d4d4 !important;
            background-color: white;
            position: relative;
            overflow: visible;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }

        #edui1 {
            height: calc(100%) !important;
        }

        .view {
            padding: 0;
            word-wrap: break-word;
            cursor: text;
            height: 100% !important;
        }

        /*#edui1_iframeholder {
            height: 90% !important;
            background-color: #fff;
        }*/

        #save {
            margin-left: 50%;
        }
    </style>

</head>

<body style="height: calc(100%) !important;">
<div style="height: calc(100% - 0px) !important;">
    <script id="editor" type="text/plain" style="width:calc(100%);height:calc(100% - 40px);"></script>
</div>
<div id="main1"></div>
<!-- <div id="btns">
    <div>
        <button onclick="getAllHtml()">获得整个html的内容</button>
        <button onclick="getContent()">获得内容</button>
        <button onclick="setContent()">写入内容</button>
        <button onclick="setContent(true)">追加内容</button>
        <button onclick="getContentTxt()">获得纯文本</button>
        <button onclick="getPlainTxt()">获得带格式的纯文本</button>
        <button onclick="hasContent()">判断是否有内容</button>
        <button onclick="setFocus()">使编辑器获得焦点</button>
        <button onmousedown="isFocus(event)">编辑器是否获得焦点</button>
        <button onmousedown="setblur(event)" >编辑器失去焦点</button>

    </div>
    <div>
        <button onclick="getText()">获得当前选中的文本</button>
        <button onclick="insertHtml()">插入给定的内容</button>
        <button id="enable" onclick="setEnabled()">可以编辑</button>
        <button onclick="setDisabled()">不可编辑</button>
        <button onclick=" UE.getEditor('editor').setHide()">隐藏编辑器</button>
        <button onclick=" UE.getEditor('editor').setShow()">显示编辑器</button>
        <button onclick=" UE.getEditor('editor').setHeight(300)">设置高度为300默认关闭了自动长高</button>
    </div>

    <div>
        <button onclick="getLocalData()" >获取草稿箱内容</button>
        <button onclick="clearLocalData()" >清空草稿箱</button>
    </div>

</div> -->
<!-- <div>
    <button onclick="createEditor()">
    创建编辑器</button>
    <button onclick="deleteEditor()">
    删除编辑器</button>
</div> -->

</body>
<script type="text/javascript">

</script>
</html>