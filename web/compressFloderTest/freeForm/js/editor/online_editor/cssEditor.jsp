<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <meta charset="utf-8"/>
    <!--引入编辑器样式-->
    <link rel="stylesheet" href="../../../../static/online_editor/css/Editor.css">
    <!-- code mirror的样式 -->
    <link rel="stylesheet" href="../../../../static/online_editor/css/codemirror.css"/>
    <!-- 主题的样式 -->
    <link rel="stylesheet" href="../../../../static/online_editor/theme/3024-day.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/3024-night.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/abcdef.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/ambiance.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/base16-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/bespin.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/base16-light.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/blackboard.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/cobalt.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/colorforth.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/dracula.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/duotone-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/duotone-light.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/eclipse.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/elegant.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/erlang-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/gruvbox-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/hopscotch.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/icecoder.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/isotope.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/lesser-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/liquibyte.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/lucario.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/material.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/mbo.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/mdn-like.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/midnight.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/monokai.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/neat.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/neo.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/night.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/nord.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/oceanic-next.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/panda-syntax.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/paraiso-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/paraiso-light.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/pastel-on-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/railscasts.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/rubyblue.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/seti.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/shadowfox.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/solarized.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/the-matrix.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/tomorrow-night-bright.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/tomorrow-night-eighties.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/ttcn.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/twilight.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/vibrant-ink.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/xq-dark.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/xq-light.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/yeti.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/idea.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/darcula.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/yonce.css">
    <link rel="stylesheet" href="../../../../static/online_editor/theme/zenburn.css">

    <!-- 代码折叠时的样式 -->
    <link rel="stylesheet" href="../../../../static/online_editor/css/foldgutter.css"/>

    <!-- 唤出来的提示代码的样式 -->
    <link rel="stylesheet" href="../../../../static/online_editor/css/show-hint.css"/>

    <link rel="stylesheet" href="../../../../static/online_editor/css/jqx.base.css"/>
    <link rel="stylesheet" href="../../../../static/online_editor/css/jqx.base.css"/>
    <link rel="stylesheet" href="../../../css/pubcss/font-awesome.css"/>
    <link rel="stylesheet" type="text/css" href="../../../../static/pubcss/common.css">
    <link rel="stylesheet" href="../../../css/pubcss/base.css"/>
    <link rel="stylesheet" href="../../../../static/layui2.4.2/css/layui.css">
    <link rel="stylesheet" type="text/css" href="../../../../static/easyUI1.5.1/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../../../static/easyUI1.5.1/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="../../../css/pubcss/css/public.css">
    <link rel="stylesheet" href="../../../css/pubcss/css/public.css"/>
    <link rel="stylesheet" href="../css/jsEditor.css"/>

    <script src="../../../../static/online_editor/js/jquery-3.4.1.min.js"></script>
    <script src="../../../../static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="../../../../static/easyUI1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../../../static/easyUI1.5.1/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="../../../../static/pubjs/common.js"></script>
    <script src="../../../../static/layui2.4.2/layui.all.js"></script>
    <script type="text/javascript" src="../../../js/pub/pub.js"></script>
    <!-- code mirror核心代码 -->
    <script src="../../../../static/online_editor/js/codemirror.js"></script>

    <!-- 可以设置代码提示 -->
    <script src="../../../../static/online_editor/js/anyword-hint.js"></script>
    <script src="../../../../static/online_editor/js/show-hint.js"></script>

    <script src="../../../../static/online_editor/js/dialog.js"></script>
    <!-- 代码折叠 -->
    <script src="../../../../static/online_editor/js/brace-fold.js"></script>
    <script src="../../../../static/online_editor/js/foldcode.js"></script>
    <script src="../../../../static/online_editor/js/foldgutter.js"></script>

    <!-- 搜索完成后光标会消失 -->
    <script src="../../../../static/online_editor/js/searchcursor.js"></script>
    <!-- 给编辑器添加搜索功能 -->
    <script src="../../../../static/online_editor/js/search.js"></script>
    <!-- 使用后编写css会有各种高亮颜色提示 -->
    <script src="../../../../static/online_editor/js/css.js"></script>
    <!-- html中混合使用css和js时也会有样式适配  -->
    <script src="../../../../static/online_editor/js/htmlmixed.js"></script>
    <!-- 允许textarea中使用placeholder -->
    <script src="../../../../static/online_editor/js/placeholder.js"></script>
    <!-- 使用后html代码会有各种颜色提示 -->
    <script src="../../../../static/online_editor/js/xml.js"></script>
    <!-- 自动闭合标签 -->
    <script src="../../../../static/online_editor/js/closetag.js"></script>
    <!-- 自动闭合括号 -->
    <script src="../../../../static/online_editor/js/closebrackets.js"></script>
    <!-- 光标放在括号右边时，自动高亮对应的括号 -->
    <script src="../../../../static/online_editor/js/matchbrackets.js"></script>

    <!-- 高亮光标所在的行 -->
    <script src="../../../../static/online_editor/js/active-line.js"></script>
    <!-- 公共js -->

    <script src="../../../../static/online_editor/js/commonTemplate.js"></script>
</head>
<body>

<div id="content" class="ww">
    <form id="form" class="hh">
        <textarea id="code-css" name="code" class="form-control"></textarea>
    </form>
</div>

<div id="toobar" class="text-cc">
    <a id="sure" class="easyui-linkbutton">保存</a>
    <a id="cancle" class="easyui-linkbutton">取消</a>
</div>
</body>
<script src="cssEditor.js"></script>
</html>
