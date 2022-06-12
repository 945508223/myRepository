<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../../../static/pubcss/common.css">
    <link rel="stylesheet" href="../../css/pubcss/base.css"/>
    <link rel="stylesheet" href="../../css/pubcss/loding.css "/>
    <link rel="stylesheet" href="../../css/pubcss/layui.css">
    <script type="text/javascript" src="../../../static/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../../../static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="../../../static/pubjs/common.js"></script>
    <script type="text/javascript" src="../../../static/jqueryUI1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../pub/pub.js"></script>
    <link rel="stylesheet" href="../../../static/jquery-plugin/loading/loading.css">
    <script src="../../../static/jquery-plugin/loading/loading.js"></script>
    <link rel="stylesheet" href="../../../static/jquery-plugin/Picker/colpick.css" type="text/css"/>
    <script src="../../../static/jquery-plugin/Picker/colpick.js"></script>
    <script src="../../../static/layui2.4.2/layui.all.js"></script>
    <script type="text/javascript" src="../../../static/pinyinjs-master/dict/pinyin_dict_withtone.js"></script>
    <script type="text/javascript" src="../../../static/pinyinjs-master/dict/pinyin_dict_polyphone.js"></script>
    <script type="text/javascript" src="../../../static/pinyinjs-master/pinyinUtil.js"></script>
    <link rel="stylesheet" href="../../css/pubcss/font-awesome/css/font-awesome.css"/>
    <link rel="stylesheet" href="../../../static/vue/elementui/elementui.css"/>
    <link rel="stylesheet" href="../../../freeForm/css/icons/iconfont.css"/>
    <script type="text/javascript" src="../../../static/vue/vue.js"></script>
    <script type="text/javascript" src="../../../static/vue/elementui/elementui.js"></script>


    <script type="text/javascript" src="commonTable.js"></script>
    <title></title>
    <style>
        /*超出点显示*/
        .ellipsis_o{
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .dateInput {
            height: 100%;
            width: 100%;
            border: 1px rgb(95, 184, 120) solid;
        }
        /*隐藏*/
        [v-cloak] {
            display: none;
        }

        .y-hide {
            display: none;
        }

        /*显示*/
        .y-show {
            display: block;
        }

        .layui-layer-dialog .layui-layer-padding {
            min-height: 50px !important;
        }

        /* 防止下拉框的下拉列表被隐藏---必须设置--- */
        /*.layui-table-cell {
            overflow: visible !important;
        }*/

        /* 使得下拉框与单元格刚好合适 */
        td .layui-form-select {
            margin-top: -10px;
            margin-left: -15px;
            margin-right: -15px;
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

        .layui-layer-dialog .layui-layer-padding {
            min-height: 50px !important;
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
        }

        /*图标相关*/
        .icon-ul[data-v-3ba3d51c] {
            margin: 0;
            padding: 0;
            font-size: 0;
            overflow-x: auto;
            width: 100%;
            height: 100%;
        }

        .icon-ul li[data-v-3ba3d51c] {
            list-style-type: none;
            text-align: center;
            font-size: 14px;
            display: inline-block;
            width: 16.66%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 108px;
            padding: 15px 6px 6px 6px;
            cursor: pointer;
            overflow: hidden;
        }

        .icon-ul li > i[data-v-3ba3d51c] {
            font-size: 30px;
            line-height: 50px;
        }

        #iconselect [class*=" el-icon-"], #iconselect [class^=el-icon-] {
            font-family: element-icons !important;
            speak: none;
            font-style: normal;
            font-weight: 400;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: baseline;
            display: inline-block;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        [class*=" icon-"],[class^=icon-]  {
            font-family: "iconfont" !important;
            font-size: 16px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .icon-ul li[data-v-3ba3d51c] {
            list-style-type: none;
            text-align: center;
            font-size: 14px;
            display: inline-block;
            width: 16.66%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 108px;
            padding: 15px 6px 6px 6px;
            cursor: pointer;
            overflow: hidden;
        }

        #iconselect {
            position: absolute;
            width: 80%;
            height: 70%;
            left: 10%;
            top: 15%;
            padding: 0rem;
            background: #E6EEF8;
            z-index: 99999;
        }

        #iconTitle {
            height: 3rem;
            width: 100%;
        }

        #iconInfo {
            height: calc(100% - 3rem);
            width: 100%;
        }

        #closeIcon {
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
            font-size: 20px;
            line-height: 20px;
        }
        #colorselect {
            position: absolute;
            width: 5%;
            height: 9%;
            left: 30%;
            top: 30%;
            padding: 0rem;
            background: #E6EEF8;
            z-index: 99999;
        }
        #closeColor {
            position: absolute;
            right: 0.5rem;
            top: 1rem;
            font-size: 20px;
            line-height: 20px;
        }
    </style>
</head>
<body style="background-color:#f6f7fd;">
<div id="contentDiv" style="overflow: auto;background-color: #f6f7fd;" class="layui-col-md10">
    <div id="left_Table" style="width: calc(100%);float: left; position: relative;">
        <div style='float:left;position: absolute;left: 10px;top: 10px;z-index: 999999999999;'><h3></h3></div>
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
</body>
<script type="text/html" id="jsonToolbar">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm" lay-event="getJson">获取数据</button>
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
<script type="text/html" id="model_switch">
    <input type="checkbox" name="{name}" value="{val}" uuid="{uuid}" lay-skin="switch" lay-text="{text}"
           lay-filter="{name}" {checked}>
</script>
<script type="text/html" id="model_select">
    <select name="{name}" uuid="{uuid}" lay-verify="" value="{value}" lay-search="" field="{name}">
        {option}
    </select>
</script>
<script type="text/html" id="model_option">
    <option value="{value}" {checked}>{text}</option>
</script>

<script type="text/html" id="model_date">
    <div value="{value}" name="{name}" uuid="{uuid}" class="model_date"></div>
</script>

<script type="text/html" id="model_html">
    <div value="{value}" name="{name}" uuid="{uuid}"></div>
</script>

<%--vue 图标选择--%>
<script id="iconCom" type="text/html">
    <ul data-v-3ba3d51c="" class="icon-ul">
        <li data-v-3ba3d51c="" v-for="(item, index) in icon"
            class=""
            @click="chooseIcon(item.name)"
            :key="index">
            <i data-v-3ba3d51c="" :class="item.value"></i>
            <div data-v-3ba3d51c="">{{item.name}}</div>
        </li>
    </ul>
</script>

<div id="app">
    <div id="iconselect" v-cloak :class="isshow">
        <div id="iconTitle"></div>
        <icon-com id="iconInfo" :icon="icon" ref="iconCom"></icon-com>
        <i id="closeIcon" data-v-3ba3d51c="" class="el-icon-close" @click="closeIcon"></i>
    </div>
</div>


<script>
    var iconCom = Vue.component("icon-com", {
        template: '#iconCom',
        props: ["icon", "isshow"],
        data() {
            return {}
        },
        methods: {
            chooseIcon: choseIcon
        }
    });

    var iconSelect = new Vue({
        el: '#app',
        data: {
            icon: parent.window.commonIcon,
            isshow: "y-hide",
            cellObj: {},
            $cell:{},//jq单元格对象
        },
        methods: {
            closeIcon() {
                this.isshow = "y-hide";
            }
        }
    })
</script>
<%--vue 颜色选择--%>
<script id="colorCom" type="text/html">
        <el-color-picker  v-model="color1"
            class=""
            @change="chooseColor" show-alpha>
        </el-color-picker>
</script>

<div id="app2">
    <div id="colorselect" v-cloak :class="isshow">
        <div id="colorTitle"></div>
        <color-com id="colorInfo"  ref="colorCom"></color-com>
        <i id="closeColor" data-v-3ba3d51c="" class="el-icon-close" @click="closeColor"></i>
    </div>
</div>

<script>
    var colorCom = Vue.component("color-com", {
        template: '#colorCom',
        data() {
            return {color1:null}
        },
        methods: {
            chooseColor: chooseColor
        }
    });

    var colorSelect = new Vue({
        el: '#app2',
        data: {
            isshow: "y-hide",
            cellObj: {},
            $cell:{},//jq单元格对象
        },
        methods: {
            closeColor() {
                this.isshow = "y-hide";
            }
        }
    })
</script>

</html>