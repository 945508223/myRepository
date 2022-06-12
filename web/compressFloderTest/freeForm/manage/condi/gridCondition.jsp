<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="../../css/pubcss/font-awesome.css"/>
    <link rel="stylesheet" type="text/css" href="../../../static/pubcss/common.css">
    <link rel="stylesheet" href="../../css/pubcss/base.css"/>
    <link rel="stylesheet" href="../../css/pubcss/base/loding.css "/>
    <link rel="stylesheet" href="../../css/pubcss/layui.css">
    <script type="text/javascript" src="../../../static/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../../../static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="../../../static/pubjs/common.js"></script>
    <script type="text/javascript" src="../../../static/jqueryUI1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../../js/pub/pub.js"></script>
    <link rel="stylesheet" href="../../../static/jquery-plugin/loading/loading.css">
    <script src="../../../static/jquery-plugin/loading/loading.js"></script>
    <script src="../../../static/layui2.4.2/layui.all.js"></script>
    <script type="text/javascript" src="../../../static/pinyinjs-master/dict/pinyin_dict_withtone.js"></script>
    <script type="text/javascript" src="../../../static/pinyinjs-master/dict/pinyin_dict_polyphone.js"></script>
    <script type="text/javascript" src="../../../static/pinyinjs-master/pinyinUtil.js"></script>
    <link rel="stylesheet" href="../../css/pubcss/font-awesome/css/font-awesome.css"/>
    <link rel="stylesheet" href="../../../static/jquery-plugin/Picker/colpick.css" type="text/css"/>
    <script src="../../../static/jquery-plugin/Picker/colpick.js"></script>
    <script type="text/javascript" src="../../js/form_common.js"></script>
    <script type="text/javascript" src="gridCondition.js"></script>

    <title></title>
    <style>
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
            height: 100%;
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
            height: calc(100% - 40px);
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

        .ycdpw-footer-content {
            display: inline-block;
            position: absolute;
            top: 11px;
            right: calc(50% - 75px);
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
            padding-right: 30px !important;
        }

        .layui-btn-container {
            float: right;
            margin-right: 4rem;
        }
        .layui-form-label {
            float: left;
            display: block;
            padding: 0px 0px;
            padding-top: 6px;
            padding-right: 15px !important;
            width: 150px;
            font-weight: 400;
            line-height: 20px;
            text-align: right;
            color: #0b99ec;
            font-size: 14px;
            font-weight: bold;
        }

        .layui-table-body {
            height: 400px !important;
        }
    </style>
</head>
<body style="background-color:#f6f7fd;">
	<div id="contentDiv" style="overflow: auto;background-color: #f6f7fd;width: 100%;" class="layui-col-md10">
        <div class="layui-form">
            <div style="height: 21%" class="layui-form-item">
                <div class="layui-form-item layui-inline" style="width: 60%">
                    <label class="layui-form-label">条件引用字段:</label>
                    <div class="layui-input-block">
                        <%-- <input id="measureField" type="text" name="title" lay-verify="title" autocomplete="off" readonly="readonly" class="layui-input">--%>
                        <select id="actionField" name="actionField" lay-verify="required"></select>
                    </div>
                </div>

                <div class="layui-form-item layui-inline" >
                    <label class="layui-form-label">区间个数:</label>
                    <div class="layui-input-block">
                        <input id="trNum" type="text" autocomplete="off" onBlur="changeAlert()" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">条件格式:</label>
                    <div class="layui-input-block">
                        <textarea id="formatter" name="formatter" placeholder="" class="layui-textarea" style="width: 100%" readonly ></textarea>
                    </div>
                </div>
            </div>
        </div>
		<div id="left_Table" style="height: 72%;position: relative;overflow: hidden;">
			<table id="mainTable" lay-filter="tableEvent"></table>
		</div>
	</div>
    <div id="main1"></div>
</body>
<script type="text/html" id="jsonToolbar">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm" lay-event="toTop">上移</button>
        <button class="layui-btn layui-btn-sm" lay-event="toBottom">下移</button>
        <button class="layui-btn layui-btn-sm" lay-event="insertData">增加</button>
        <button class="layui-btn layui-btn-sm" lay-event="delData">删除</button>
    </div>
</script>
<script type="text/html" id="toolbar">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm" lay-event="toTop">上移</button>
        <button class="layui-btn layui-btn-sm" lay-event="toBottom">下移</button>
        <button class="layui-btn layui-btn-sm" lay-event="add">增加</button>
        <button class="layui-btn layui-btn-sm" lay-event="delData">删除</button>
    </div>
</script>
</html>