<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="../css/pubcss/font-awesome.css"/>
    <link rel="stylesheet" type="text/css" href="../../static/pubcss/common.css">
    <link rel="stylesheet" href="../css/pubcss/base.css"/>
    <link rel="stylesheet" href="../css/pubcss/loding.css "/>
    <link rel="stylesheet" href="../css/pubcss/layui.css">
    <link rel="stylesheet" href="../../static/layui_ext/tableFilter/tableFilter.css">
    <script type="text/javascript" src="../../static/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../../static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="../../static/pubjs/common.js"></script>
    <script type="text/javascript" src="../../static/jqueryUI1.12.1/jquery-ui.min.js"></script>

    <script type="text/javascript" src="../js/pub/pub.js"></script>
    <link rel="stylesheet" href="../../static/jquery-plugin/loading/loading.css">
    <script src="../../static/jquery-plugin/loading/loading.js"></script>
    <script src="../../static/layui2.4.2/layui.all.js"></script>
    <script type="text/javascript" src="../../static/pinyinjs-master/dict/pinyin_dict_withtone.js"></script>
    <script type="text/javascript" src="../../static/pinyinjs-master/dict/pinyin_dict_polyphone.js"></script>
    <script type="text/javascript" src="../../static/pinyinjs-master/pinyinUtil.js"></script>
    <link rel="stylesheet" href="../css/pubcss/font-awesome/css/font-awesome.css"/>
    <link rel="stylesheet" href="../../static/jquery-plugin/Picker/colpick.css" type="text/css"/>
    <script src="../../static/jquery-plugin/Picker/colpick.js"></script>
    <script src="../../static/layui_ext/tableFilter/tableFilter.js"></script>

    <%------------------------------------------------------------------------------------------%>
    <link rel="stylesheet" type="text/css" href="../../static/easyUI1.5.1/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../static/easyUI1.5.1/themes/icon.css">
    <script type="text/javascript" src="../../static/easyUI1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../static/easyUI1.5.1/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet" href="../../static/online_editor/theme/idea.css">
    <!-- code mirror的样式 -->
    <link rel="stylesheet" href="../../static/online_editor/css/codemirror.css"/>
    <!-- 代码折叠时的样式 -->
    <link rel="stylesheet" href="../../static/online_editor/css/foldgutter.css"/>
    <!-- 唤出来的提示代码的样式 -->
    <link rel="stylesheet" href="../../static/online_editor/css/show-hint.css"/>
    <link rel="stylesheet" href="../../static/online_editor/css/jqx.base.css"/>
    <link rel="stylesheet" href="../css/pubcss/css/public.css"/>
    <link rel="stylesheet" href="../js/editor/css/jsEditor.css"/>
    <!-- code mirror核心代码 -->
    <script src="../../static/online_editor/js/codemirror.js"></script>
    <!-- javascript代码高亮样式 -->
    <script src="../../static/online_editor/js/javascript.js"></script>
    <!-- 可以设置代码提示 -->
    <script src="../../static/online_editor/js/anyword-hint.js"></script>
    <script src="../../static/online_editor/js/show-hint.js"></script>


    <script src="../../static/online_editor/js/dialog.js"></script>
    <!-- 代码折叠 -->
    <script src="../../static/online_editor/js/brace-fold.js"></script>
    <script src="../../static/online_editor/js/foldcode.js"></script>
    <script src="../../static/online_editor/js/foldgutter.js"></script>

    <!-- 搜索完成后光标会消失 -->
    <script src="../../static/online_editor/js/searchcursor.js"></script>
    <!-- 给编辑器添加搜索功能 -->
    <script src="../../static/online_editor/js/search.js"></script>
    <!-- 自动闭合括号 -->
    <script src="../../static/online_editor/js/closebrackets.js"></script>
    <!-- 光标放在括号右边时，自动高亮对应的括号 -->
    <script src="../../static/online_editor/js/matchbrackets.js"></script>
    <!-- 高亮光标所在的行 -->
    <script src="../../static/online_editor/js/active-line.js"></script>
    <!--公用js-->
    <script src="../../static/online_editor/js/commonTemplate.js"></script>
    <script type="text/javascript" src="formSqlMange.js"></script>
    <title>表单预定义Sql管理</title>
    <style>
        .CodeMirror-wrap {
            height: 100%
        }

        .layui-table-cell {
            overflow: visible !important;
        }

        td .layui-form-select {
            margin-top: -10px;
            margin-left: -15px;
            margin-right: -15px;
        }

        .layui-layer-dialog .layui-layer-padding {
            min-height: 50px !important;
        }

        .ui-draggable-handle {
            -ms-touch-action: none;
            touch-action: none;
        }

        .layui-table tr {
            -webkit-transition: none;
            transition: none;
        }

        .layui-table-view {
            margin-top: 0px;
            margin-bottom: 0px;
            border-bottom: 0px;
        }

        .gray {
            background-color: #f8f9fa;
            color: gray;
        }

        .panel {
            height: 140px;
            overflow: scroll !important;
        }

        .layui-input-block {
            margin-left: 150px;
            margin-right: 15%;
        }

        #contentDiv {
            width: 100%;
            height: calc(100%);
            border-bottom: 1px solid #e6e6e6;
        }

        .box {
            width: 200px;
            height: 200px;
            position: fixed;
            background-color: #ccc;
            border-radius: 50%;
            left: calc(50% - 100px);
            top: calc(50% - 100px);
            display: none;
        }

        .num {
            position: absolute;
            top: 50%;
            left: 50%;
            background: #fff;
            border-radius: 50%;
            width: 180px;
            height: 180px;
            transform: translate(-50%, -50%);
            text-align: center;
            line-height: 180px;
            font-size: 32px;
            box-sizing: border-box;
        }


        .clip {
            width: 200px;
            height: 200px;
            position: absolute;
            border: 10px solid #ccc;
            border-radius: 50%;
            clip: rect(0, 200px, 200px, 100px);
            box-sizing: border-box;
        }

        .left {
            width: 200px;
            height: 200px;
            position: absolute;
            border: 10px solid lightblue;
            border-radius: 50%;
            clip: rect(0 100px 200px 0);
            top: -10px;
            left: -10px;
            box-sizing: border-box;
        }

        .right {
            width: 200px;
            height: 200px;
            position: absolute;
            border: 10px solid lightblue;
            border-radius: 50%;
            clip: rect(0 200px 200px 100px);
            top: -10px;
            left: -10px;
            box-sizing: border-box;
        }

        .width-none {
            width: 0;
        }

        .auto {
            clip: auto;

        }


        .ycdpw-footer-main {
            background-color: #f6f7fd;
            width: 100%;
            height: 40px;
            position: fixed;
            bottom: 0px;
            margin: 0;
            padding: 0;
            border: 0;
            display: none;
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
            width: 5px;
            height: 7px;
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

        .layui-table-cell {
            height: 28px;
            line-height: 28px;
            padding: 0 15px;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            font-size: 12px;
        }

        .layui-table-tool {
            min-height: 40px !important;
            padding-top: 4px;
            padding-bottom: 0px;
        }

        .layui-table-tool-self {
            position: absolute;
            right: 17px;
            top: 6px !important;
        }

        .layui-table-cell .layui-form-checkbox[lay-skin=primary] {
            top: 4px !important;
            padding: 0;
        }

        .layui-table-tool-temp {
            padding-right: 66px !important;
        }

        .layui-btn-container {
            float: right;
        }

        .ycdpw-footer-content {
            display: inline-block;
            position: absolute;
            top: 11px;
            right: calc(50% - 75px);
        }

        .layui-table-filter i {
            font-size: 16px !important;
        }

        #param_div {
            display: none;
            line-height: 1.5rem;
            font-family: "宋体";
            position: absolute;
            left: 50rem;
            bottom: 5rem;
            z-index: 2000;
            background-color:#ffffff;
            border: 1px solid #7dc6fff0;
            border-radius: 4px;
            box-shadow: 4px 4px 5px #999;
            height: 30rem;
            overflow: auto;
        }
        #param_div li {
            color: #303133;
            border-bottom: 1px solid #e8f1fd;height: 2rem;
            padding: 0.3rem 0.5rem;
        }
    </style>
</head>
<body style="background-color:#f6f7fd;">
<div style="width:100%;height:calc(100% - 3.75rem)"><%--//ss--%>
    <div id="contentDiv" style="overflow: auto;background-color: #f6f7fd;" class="layui-col-md10">
        <div id="left_Table" style="width: calc(100%);float: left; position: relative;">
            <!-- <div style='float:left;position: absolute;left: 10px;top: 10px;z-index: 99998;'><h3>已选择文本:</h3></div> -->
            <table id="leftTable" lay-filter="leftTable"></table>
        </div>

        <div class="loading" id="scro">
            <div style="position: fixed;margin: auto;top: calc(50% - 63px);left: calc(50% - 103px)">
                <h2 id="titl">请稍后...</h2>
                <span></span> <span></span> <span></span> <span></span> <span></span>
                <span></span> <span></span>
            </div>
        </div>
    </div>
    <div id="main1"></div>
</div>
<div style="width:100%;height: 3.75rem">
    <%--<iframe style="width:100%;height:100%" id="iframe_sql" src=""></iframe>--%>
    <%-- <div id="content" class="ww">
         <form id="form" class="hh">
             <textarea id="code-js" name="code" class="form-control"></textarea>
         </form>
     </div>--%>
  <%--    <div id="param_div">
          <li>$USERID$,用户ID</li>
          <li>$USERNAME$, 用户姓名</li>

          &lt;%&ndash;$FINYEAR$,预算年度,<br>
          $DISTRICTID$,用户所在区划ID,<br>
          $DISTRICTCODE$,用户所在区划编码,<br>
          $DISTRICTNAME$,用户所在区划名称,<br>
          $DIVID$,用户所在单位ID,<br>
          $DIVNAME$,用户所在单位名称,<br>
          $UPDIVID$,用户提升级次单位ID,<br>
          $UPDIVNAME$,用户提升级次单位名称,<br>
          $DEPTID$,用户所在处室ID,<br>
          $DEPTNAME$,用户所在处室名称,<br>
          $CURRENTDATE$,当前日期,<br>
          $INITSYSDATE$,系统日期,<br>
          $USERTYPE$,用户类型,<br>
          $GUID$,新GUID,<br>
          $USERDIVLEVEL$,用户行政级别,<br>
          $CURRENTYEAR$,当前年度,<br>
          $DEPTPRIORITY$, 特殊处室,<br>
          $ADMDIVLEVEL$,用户所属级次<br>&ndash;%&gt;
      </div>--%>
    <div id="param_div"></div>
    <div id="toobar" class="text-cc">
        <a id="sure_sql" onclick="close_()" class="easyui-linkbutton">关闭</a>
        <a id="param_sql" onclick="disParamDiv()" class="easyui-linkbutton">常用参数</a>
    </div>
</div>
</body>
<script type="text/html" id="jsonToolbar">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm" lay-event="insertData">新增</button>
        <button style="display: none" class="layui-btn layui-btn-sm" lay-event="getJson">获取数据</button>
    </div>
</script>
<script type="text/html" id="jsonToolbar2">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm" lay-event="toTop">上移</button>
        <button class="layui-btn layui-btn-sm" lay-event="toBottom">下移</button>
        <button class="layui-btn layui-btn-sm" lay-event="insertData">新增</button>
        <button class="layui-btn layui-btn-sm" lay-event="delData">删除</button>
    </div>
</script>
<script type="text/html" id="splitToolbar">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm" lay-event="getJson">获取数据</button>
        <button class="layui-btn layui-btn-sm" lay-event="toTop">上移</button>
        <button class="layui-btn layui-btn-sm" lay-event="toBottom">下移</button>
        <button class="layui-btn layui-btn-sm" lay-event="delData">删除</button>
    </div>
</script>
<script type="text/html" id="colorEditor">
    <div style="width:100%;height:100%;">
        <div class="C_COLOR" uuid="{{d._UUID}}" style="width:100%;height:100%;background:{{d.color}}"></div>
    </div>
</script>
<script type="text/html" id="colorShow">
    <div style="width:100%;height:100%;">
        <div style="width:100%;height:100%;background:{{d.color}}"></div>
    </div>
</script>
<script type="text/html" id="collection">
    <a class="layui-btn layui-btn-sm" lay-event="edit" uuid="{{d._UUID}}" onClick="saveFormSql(this)">保存</a>
    <a class="layui-btn layui-btn-sm" lay-event="edit" uuid="{{d.GUID}}" onClick="editFormSqlNew(this)">编辑SQL</a>
    <a class="layui-btn layui-btn-sm" lay-event="edit" uuid="{{d._UUID}}" onClick="delFormSql(this)">删除</a>
</script>
<script type="text/html" id="cancleCollection">
    <a class="layui-btn layui-btn-sm" lay-event="edit" uuid="{{d._UUID}}" onClick="delJsText(this)">删除</a>
</script>
<script type="text/html" id="switch">
    <input type="checkbox" name="ISON" lay-filter="ISON" lay-skin="switch" uuid='{{d._UUID}}' lay-text="收藏|未收藏"
           value="0" {{(d.ISON==0)?"":'checked'}}>
</script>
<script type="text/html" id="model_select">
    <select name="{name}" uuid="{uuid}" lay-verify="" value="{value}" lay-search="" field="{name}"
            lay-filter="{layFilter}">
        {option}
    </select>
</script>
<script type="text/html" id="model_option">
    <option value="{value}" {checked}>{text}</option>
</script>

</html>