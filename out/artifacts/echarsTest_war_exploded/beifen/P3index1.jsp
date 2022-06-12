<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"  style="overflow:scroll;overflow-x:hidden; overflow-y:hidden; ">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>预算绩效评价管理</title>
    <link rel="icon" href="logo.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="biShow/base.css" />
    <link rel="stylesheet" href="css/storelist.css" />
    <link rel="stylesheet" href="css/font-awesome/css/font-awesome.css" />
    <link rel="stylesheet" type="text/css" href="dm/model/css/layui.css">
    <script src="static/jquery/jquery-1.10.2.min.js"></script>

    <link rel="stylesheet" href="static/layui2.4.2/css/layui.css" />
    <script src="static/layui2.4.2/layui.js"></script>
    <script src="static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="static/pubjs/common.js"></script>
    <script src="Copybishowdetail.js"></script>
    <link rel="stylesheet" href="static/bootstrap/bootstrap.css">
    <!-- easyui -->
    <link rel="stylesheet" type="text/css" href="dm/model/css/demo.css">
    <link rel="stylesheet" type="text/css" href="dm/model/css/easyui.css">
    <link rel="stylesheet" type="text/css" href="static/easyUI1.5.1/themes/icon.css">
    <script type="text/javascript" src="static/easyUI1.5.1/jquery.easyui.min.js"></script>

    <style type="text/css">
        /* 父盒子 */

        html,body{
            height: 100%;
            margin: 0;padding: 0;
            background-image:url('./images/P3/bg_01png.png');
            background-repeat:no-repeat;
        }
        .tabs-header, .tabs-tool {
            /*margin-left: 16px !important;*/
            /*width: calc(100% - 16px) !important;*/
        }
        .tabs-header, .tabs-tool {
            background-color: transparent;
        }
        .tabs-p-tool a:hover, .tabs li a:hover.tabs-close, .tabs-scroller-over {
            background-color: #162440;
        }
        .tabs li {
            margin: 32px 0px 0px 1px;
        }
        .tabs li:nth-child(1) {
            margin-left: 268px;
        }
        .tabs li a.tabs-inner {
            display: inline-block;
            text-decoration: none;
            margin: 0;
            padding: 0px 15px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            white-space: nowrap;
            border-width: 0px;
            border-style: solid;
            -moz-border-radius: 5px 5px 0 0;
            -webkit-border-radius: 5px 5px 0 0;
            border-radius: 5px 0px 0 0;
        }
        .tabs li a.tabs-inner:hover {
            background-color: #162440;
            color: #ffffff;
            filter: none;
        }
        .tabs li a.tabs-inner {
            background: #162440;
            color: #ffffff;
            filter: none;
        }
        .tabs li.tabs-selected a.tabs-inner {
            font-weight: normal;
            outline: none;
        }
        .tabs-title {
            font: 300 13px "Alibaba-PuHuiTi-B","Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Heiti,"黑体",sans-serif;
            letter-spacing: 0.8px;
            line-height: 26px;
        }
        .tabs-closable {
            display: inline-block;
            padding-right: 12px;
            line-height: 32px;
            border-left: 1px solid #395275;
        }
        .tabs-panels {
            margin: 0px;
            padding: 0px;
            border-style: solid;
            border-width: 0px;
            overflow: hidden;
            /*background-image: url(./images/P3/bg_01png.png) ;*/
            /*background-size: 100% 100%;*/
        }
        .tabs-header {
            border-left-width: 0px !important;
            border-width: 1px;
            border-style: solid;
            border-bottom-width: 0;
            position: relative;
            padding: 0;
            overflow: hidden;
            border-top-width: 0px !important;
        }
        .tabs-scroller-left, .tabs-scroller-right {
            position: absolute;
            top: auto;
            bottom: 0;
            width: 18px;
            font-size: 1px;
            display: none;
            cursor: pointer;
            border-width: 1px;
            border-style: solid;
            z-index: 998;
        }

        .tabs-scroller-right {
            background: #162440 url(images/tabs_icons.png) no-repeat -15px center;
            height: 30px !important;
            border: 1px solid #162440;
        }
        .tabs li a.tabs-close {
            width: 13px;
            right: 1px;
            opacity: 0.6;
            filter: alpha(opacity=60);
            margin-right: 7px;
        }
        .tabs li a.tabs-close, .tabs-p-tool {
            position: absolute;
            font-size: 1px;
            display: block;
            height: 18px;
            padding: 0;
            top: 40%;
            margin-top: -6px;
            overflow: hidden;
        }
        .tabs-scroller-left {
            background: #162440 url(images/tabs_icons.png) no-repeat 1px center;
            height: 30px !important;
            border: 1px solid #162440;
        }
        .tabs li a.tabs-close {
            background: url(images/tabs_icons.png) no-repeat -34px center;
            background-size: auto;
        }

        .tabs li.tabs-selected a.tabs-inner {
            display: inline-block;
            background: transparent;
            /*color: #58a9ff;*/
            color: #06f1f6;
            display: block;
            padding-top: 0px;
            font-size: 6px;
            /*background: #223e65;*/
            /*border-bottom: none;*/
            /* background: -webkit-linear-gradient(top,#EFF5FF 0,#ffffff 100%);
            background: -moz-linear-gradient(top,#EFF5FF 0,#ffffff 100%);
            background: -o-linear-gradient(top,#EFF5FF 0,#ffffff 100%);
            background-repeat: repeat-x;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#EFF5FF,endColorstr=#ffffff,GradientType=0);*/
        }
        .tabs li.tabs-selected a.tabs-inner {
            border-bottom: 0px solid #ffffff;
        }
        .tabs {
            font: 400 12px "Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Heiti,"黑体",sans-serif;
            list-style-type: none;
            height: 30px;
            margin: 0px;
            padding: 0px;
            padding-left: 4px;
            width: 50000px;
            border-style: solid;
            border-width: 0 0 0px 0;
        }
        .tabs-inner {
            margin-top: 0px !important;
            height: 30px !important;
            line-height: 30px !important;
        }
        /*.tabs-header, .tabs-tool {*/
        /*    background-color: #edeffd;*/
        /*    height: 30px;*/
        /*}*/
        .tabs{
            height: 40px !important;
            /*background-color: #071036;*/
            z-index: 1;
        }


        .box {
            width: 100%;
            height: 100%;
            background: url(../../im/ages/mallbj1.png) no-repeat center;
            background-size: 100% 100%;
        }
        .layui-nav-child>dd {
            position: relative;
            padding-left: 30px;
        }

        #header{
            width: 100%;
            height: 50px;
            background-image: url(./images/P3/bg_czsr.png);
            background-repeat: no-repeat;
            background-position: 0px 18px;
            background-size: 95% 30px;

        }
        .row {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: 0px;
            margin-left: 0px;
            display: inline-block;
        }
        .top_login{
            position: fixed;
            top: 2px;
            right: 191px;
            width: 90px;
            z-index: 999;
            font-size: 12px;
            color: #06F8FB;
        }
        .top_time{
            position: fixed;
            top: 1px;
            right: 18px;
            width: 150px;
            z-index: 999;
            font-size: 14px;
            color: #06F8FB;
        }
        #left_div{
            position: fixed;
            top: 65px;
            left: 15px;
            width: 0px;
            float: left;
            height: 86.2%;
            z-index: 999;
            background-color: #071036;
            background-image: url(./images/P3/bg_zc.png);
            background-repeat: no-repeat;
            background-repeat: no-repeat;
            background-size: 99.4% 99.2%;
        }
        #left_select{
            background-position: center 0;
            background-size: cover;
            width: 98.4%;
            height: 86%;
            display:none;
            margin-left: 1px;
        }
        #open_left{
            background: #162440 url(images/P3/btn_zk.png) no-repeat;
            background-size: 21px;
            width: 22px;
            height: 35px;
            position: absolute;
            left: -13px;
            cursor:pointer;
            border-bottom-right-radius: 10px;
        }
        #close_left{
            background: url(images/P3/btn_sl.png) no-repeat;
            background-size: 21px;
            width: 9%;
            height: 6%;
            position: absolute;
            top: 6%;
            left: 90%;
            margin-top: -13%;
            display: none;
            cursor: pointer;
        }
        .header-left-p{
            padding-top: 8px;
            margin-left: 20%;
        }
        #right_div {
            width: 100% !important;
            float: left;
            height: 95%;
            position: relative;
            /*background-image: url(./images/P3/bg_yc.png);*/
            /*background-repeat: no-repeat;*/
            /*background-position: 231px 3px;*/
            /*background-size: 100% 99%;*/
        }
        .easyui-tabs{
            background-image: url(./images/P3/bg_yc.png);
            background-repeat: no-repeat;
            background-position: 238px 20px;
            background-size: 100% 97%;
        }
        .header-left{
            width:100%;
            height:50px;
        }
        #select{

        }
        #myself_select{
            width: 100%;
            text-align: center;
        }
        #myself_select>div{
            height: 50px;
            line-height: 50px;
            color: aliceblue;
            font: szie 1.5em;
        }
        #select>div{
            float: left;
            margin: auto;
            text-align: center;
            color: white;
            font-size: 0.7em;
            width: 90%;
            height:40px;
        }
        .select_div{
            width: 100%;
            text-align: center;
        }
        .select_div>div{
            font-size: 1.5em;
            color: aliceblue;

        }
        .hr-ul {
            height:40px;
        }
        .hr-ul>li{
            margin-top:8px;
            margin-left:5px;
            margin-right:5px;
        }
        .hr-ul>div{
            margin-top:2px;
        }
        .hr-ul>li:first-child{
            color: aliceblue;
            margin-left:10px;
        }
        .hr-ul>li:last-child{
            margin-left: 15px;
        }
        #nav-item{
            width:100%;
            height:50px;
            overflow: hidden;
            position: relative;
        }
        #nav-item>div>div{
            width:16.666666%;
            height: 60px;
            float:left;
            transition: width 2s;
            -moz-transition: width 2s;	/* Firefox 4 */
            -webkit-transition: width 2s;	/* Safari 和 Chrome */
            -o-transition: width 2s;
        }
        #nav-item>div>div:hover{
            /*background-color:#3e7cf4;*/
            height:60px;
            cursor:pointer;
        }
        #nav-item>div>div:active{
            background-color:#407ff6;
            height:60px;
        }
        #nav-item>div>div{
            padding-top: 4px;
        }
        .position_leftspan{
            display: none;
            width: 4%;
            float: left;
            height: 40px;
            line-height: 40px;
        }
        .position_rightspan{
            display: none;
            width: 5%;
            float: left;
            height: 40px;
            line-height: 40px;
        }
        .position_leftspan>img{
            margin-top:12px;
        }
        .position_rightspan>img{
            margin-top: 12px;
            margin-left: 10px;
        }
        p {
            margin-top: 0;
            margin-bottom: 0 !important;
        }
        /* #first_select{
            width: 100%;
            height: 45px;
            line-height: 45px;
            font-size: 1.5em;
            color: aliceblue;
            text-align: center;
        }
        #first_option>div{
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 1em;
            color: aliceblue;
        } */
        .layui-nav .layui-nav-more {
            content: '';
            width: 0;
            height: 0;
            /* border-style: solid dashed dashed;
            /* border-color: #fff transparent transparent; */
            overflow: hidden;
            cursor: pointer;
            transition: all .2s;
            -webkit-transition: all .2s;
            /* position: absolute; */
            /* top: 50%; */
            /* right: 6px; */
            /* margin-top: -3px; */
            border-width: 0px;
            /* border-top-color: rgba(255, 255, 255, .7); */
        }
        .layui-nav .layui-nav-child a {
            color: #fff;
            background-color: rgba(0, 0, 0, 0);
        }
        .layui-nav-tree {

        }
        .layui-nav-tree li a {
            background-image: url(./images/P3/bg_border.png);
            /* background-repeat: no-repeat; */
            /* background-position: 0px 18px; */
            background-size: 110% 102%;
        }
        .layui-nav-tree .layui-nav-item dd:hover {
            /*background-color:#0045a5;*/
        }
        .layui-nav-tree .layui-nav-item a:hover {
            /*background:transparent ;*/
            color: #06F8FB;
            background-image: url(./images/P3/bg_border.png);
            /* background-repeat: no-repeat; */
            /* background-position: 0px 18px; */
            background-size: 110% 102%;
        }
        .active{
            background:url(images/newimg/cblxz.png) no-repeat center center;
            background-size: cover;
            background-color: rgba(0, 0, 0, 0);
        }
        .fontColor{
            color:red;
        }
        tree .layui-nav-child dd.layui-this a, .layui-nav-tree .layui-this, .layui-nav-tree .layui-this>a, .layui-nav-tree .layui-this>a:hover {

            color: #fff;
            text-decoration: none !important;
        }
        a:hover{
            text-decoration: none !important;

        }
        #user_name{
            color: #fff;
            margin-left:15px;
            font-size: 12px;
        }
        .zhankai{
            right: 10%;

            top:48%;

        }
        .layui-nav-tree .layui-nav-item a {
            position: relative;
            height: 50px;
            line-height: 50px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding-right: 40px;
            padding-left: 22px;
            font-size: 15px;
            color: #58A9FF;
        }
        dd {
            margin-bottom: 0rem !important;
            margin-left: 0;
        }
        dd>a{
            text-align: left;
        }
        ul, dl {
            margin-top: 0;
            margin-bottom: 0rem !important;
        }

        .layui-tab-title .layui-this {

            background-color: white;
            color: #427cfe;

        }
        .layui-tab-title li {
            background-coloR:#d7e2fb;
            color: #758293;
            height: 30px;
            line-height: 30px;
        }
        .layui-tab-title li:first-child{
            border-top-left-radius: 5px;

        }
        .layui-tab-title li:last-child{
            border-top-left-radius: 5px;

        }
        .layui-tab-card>.layui-tab-title li {
            margin-right: 1px;
            margin-left: 1px;
        }
        .layui-tab-title {
            position: relative;
            left: 0;
            height: 34px;
            white-space: nowrap;
            font-size: 0;
            margin-top: 15px;
            /* border-bottom-width: 1px; */
            /* border-bottom-style: solid; */
            transition: all .2s;
            -webkit-transition: all .2s;
        }
        .layui-tab-content {
            height: 100%;
            background-color: white;
            width: 100%;
        }
        .layui-tab {
            margin: 0;
            text-align: left !important;
            height: calc(100% - 90px);
            width: 98%;
            margin: auto;
            position: relative;
        }
        .layui-tab-title .layui-this:after {
            position: absolute;
            left: 0;
            top: 0;
            content: '';
            width: 100%;
            height: 30px;
            border-width: 1px;
            border-style: solid;
            border-bottom-color: #fff;
            border-radius: 2px 2px 0 0;
            box-sizing: border-box;
            pointer-events: none;
        }
        .layui-tab-title li{
            margin-left: 5px;
        }
        .layui-tab-title li:first-child{
            margin-left: 0px !important;
        }
        .layui-show {
            display: block !important;
            height: 100%;
            /*background-image: url(./images/P3/bg_yc.png);*/
            /*background-repeat: no-repeat;*/
            /*background-position: 231px 3px;*/
            /*background-size: 100% 99%;*/
        }
        .layui-nav-itemed>.layui-nav-child {
            display: block;
            padding: 0;
            background-color: rgba(0, 0, 0, 0) !important;
        }
        #gncd{
            width: 97.8%;
            margin-top: 1px;
            margin-left: 2px;
            padding-left: 10px;
            padding-top: 4px;
            height: 7.8%;
            background-color: #162440;
            background-size: cover;
            display: none;
            background-image: linear-gradient(270deg, #006BA6 0%, #050F47 100%);
        }
        .layui-tab-card>.layui-tab-title {
            background-color: transparent;
        }
        .layui-nav-tree>li>a>img:first-child{
            position: absolute;
            top: 11px;
            left: 10px;
        }

        .layui-nav-tree .layui-nav-child dd.layui-this, .layui-nav-tree .layui-nav-child dd.layui-this a, .layui-nav-tree .layui-this, .layui-nav-tree .layui-this>a, .layui-nav-tree .layui-this>a:hover {
            background-color: #0742a6;
            color: #fff;
        }
        #gridDiv>div:first-child{
            border: 1px solid #ccc;
        }
        .layui-tab-content {
            padding: 10px;
            padding-left: 0px !important;
            background:url(images/newimg/basemap.png) no-repeat;
            background-size:cover;
        }
        .nav .nav-subnav {
            width: 100%;
            right: 0px !important;
            top: 0;
        }
        .ztree {
            padding-left: 0px !important;
        }
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar {
            width: 0px;
            height: 4px;
            background-color: white !important;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
            border-radius: 15px;
            background-color: white !important;
        }

        /*定义滑块 内阴影+圆角*/
        ::-webkit-scrollbar-thumb {
            border-radius: 15px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
            background-color: #c3c3c3 !important;
        }
        .layui-tab-bar {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 0;
            width: 0;
            height: 39px;
            line-height: 39px;
            border-width: 1px;
            border-style: solid;
            border-radius: 2px;
            text-align: center;
            background-color: #fff;
            cursor: pointer;
        }
        .layui-tab-bar .layui-icon {
            position: relative;
            display: none;
            top: 3px;
            transition: all .3s;
            -webkit-transition: all .3s;
        }
        .layui-tab ul.layui-tab-title li:nth-child(1) i { display: none;} /*第一个不可删除*/

        .top_tit{
            background-color:#3e7cf4;
        }
        #open_navselect{
            width:100px;
            height:40px;
            position:absolute;
            top:0px;
            right:0px;
            background-color:blue;
        }
        #close_navselect{
            width:100px;
            height:40px;
            position:absolute;
            top:0px;
            right:0px;
            background-color:blue;
            display:none;
        }
        #navselect{
            width:150px;
            height:500px;
            position:absolute;
            top: 50px;
            right: 0px;
            background-color: red;
            z-index: 999;
            display:none;
        }
        #navselect>ul{
            width:100%;
            height:100%;
        }
        .layui-nav-itemed>a:first-child{
            color:#00fbff !important;
        }
        .header_col{
            -webkit-box-flex: 0;
            -ms-flex: 0 0 20%;
            flex: 0 0 20%;
            max-width: 20%;
        }
        .col-lg-3 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 30%;
            flex: 0 0 30%;
            max-width: 30%;
        }
        #niandu_father{
            width: 25%;
            height:40px;
            float:left;
        }
        #niandu{
            width: 100%;
            height: 30px;
            cursor: pointer;
            margin-top: 5px;
            background-color: #154eb7;
            border-radius: 15px;
        }

        #niandu>span{
            display: block;
            float: left;
            height: 15px;
            color: #ffffff;
            font-size: 14px;
            line-height: 15px;
            margin-left: 8px;
            margin-top: 8px;
        }
        #niandu_select_father{
            width:100%;
            border-radius:10px;
            height:150px;
            border-radius:10px;
            background:url(images/newimg/niandu_select.png);
            background-size:cover;
            z-index:99999;
            position:relative;
            display:none;
        }
        #niandu_select{
            width:100%;
            height:130px;
            position:absolute;
            top:10px;
            z-index:99999;
            margin:auto;
            overflow-y: auto;
            transition:all 1s linear;
        }
        #niandu_select>div{
            height:30px;
            width:100%;
        }
        #niandu_select>option:hover{
            background-color:#044abb;
            border-radius:5px;
            color:#ffffff;
        }
        #niandu_select::-webkit-scrollbar{
            width:2px;
            height:5px;
        }
        #niandu_select::-webkit-scrollbar-track{

            border-radius:2px;

        }
        #niandu_select::-webkit-scrollbar-track-piece{
            background:lightblue;
        }
        #niandu_select>option{
            color:#fff;
            text-align:center;
            cursor:pointer;
            font-size: 14px;
            display:block;
            width:100%;
        }
        #userName{
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        #agencyName{
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .layui-layer-btn a {
            height: 28px;
            line-height: 27px !important;
            margin: 5px 5px 0;
            padding: 0 15px;
            border: 1px solid #dedede;
            background-color: #fff;
            color: #333;
            border-radius: 2px;
            font-weight: 300;
            cursor: pointer;
            font-size: 12px !important;
            text-decoration: none;
        }


        .datagrid-header-row td {
            background-color: transparent ！important;
            font-size: 12px;
            color: #758293;
            font-weight: 800;
            height: 35px;
            vertical-align: middle;
            position: relative;
        }

        /*平行四边形 边框 开始↓*/
        #TAB li>a {
            display: inline-block;
            margin: 0 10px;
            padding: 0px 26px;
            height: 12px;
            line-height: 12px;
            position: relative;
            transform: skew(-14deg);
        }
        #TAB li>a::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            transform: skew(-21deg);
            /*border: 2px solid #58a9ff;*/
            border: 2px solid #06f1f6;
            border-top: none;
        }
        #TAB li>a:nth-child(1) {
            margin-left: 5px;
        }
        /*平行四边形 边框 结束↑*/
        #niandu_select::-webkit-scrollbar-track-piece
    </style>

</head>

<body class="layui-layout-body">
<!-- <div class="box layui-layout layui-layout-admin">
    <div class="header-maindata header layui-header">
        顶部导航栏
        一
        <div class="header-left">
            <p class="header-left-p">财政数据分析平台</p>
        </div>
        二
        <div class="header-center">
            <ul id="SecondMenu" class="hc-ul layui-nav layui-layout-left">
            </ul>
            <div id="currentMenuDiv">
                <ul>
                     <li class="notEdit layui-nav-item hc-li"><a id="currentMenu" href="javascript:;" class="hc-li-a hc-li-maindata" style="color : #fff;"></a>
                </li>
                </ul>
            </div>
        </div>
        三

        <div class="header-right">
            <ul class="hr-ul">
                <li class="hr-li"><a href="javascript:;" class="hr-li-a" onclick="logout()"><img src="CSS/img/zytp_03.png" alt="" /><span>退出</span></a></li>
                <li class="hr-li"><a href="javascript:;" class="hr-li-a"><img src="CSS/img/usertp1_03.png" alt="" /><span id="lbl_username">测试用户</span></a></li>
            </ul>
        </div>
    </div> -->

<!--顶部导航栏-->


</div>

<div class=".container">
    <div class="row" id="header" >
        <div class="header_col" style="width:20%">
            <div class="header-left"  >
                <img class="header-left-p" src="./images/P3/title.png" alt="">
            </div>
            <div class="top_login">登录名：XXX</div>
            <div class="top_time">2020-06-06 18：00：00</div>
        </div>
        <div class="col-lg-6 col-md-6"  id="select" >
					<span class="position_leftspan" onmousemove='over3(this)' onmouseout='move3(this)'>
							<img src="images/newimg/dblzf.png" alt="" onclick="leftbutton()" id="left_button" >
					</span>
            <div id="nav-item">
                <div style="width:100%" id='top_Menu'>
                    <div id="navchild">

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>





                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>

                </div>

            </div>


            <span class="position_rightspan" onmousemove='over3(this)' onmouseout='move3(this)'>
								<img src="images/newimg/dblyf.png" alt=""  id="right_button" onclick="rightbutton()" >
						</span>
        </div>

        <!-- header的第三部分 -->
        <div class="col-lg-3 col-md-3" style="width:30%;padding:0px">
            <div class="header-right" style="display:none;">
                <div id="niandu_father">
                    <div id="niandu" >
                        <!-- 年度    -->
                        <span><img src="images/newimg/niandu_search.png" alt=""/></span>
                        <span id="CURRENTYEAR"></span>
                        <span id=""><img src="images/newimg/niandu_xiala.png" alt="" style="margin-top: 5px;"></span>
                    </div>
                    <div id="niandu_select_father">
                        <div id="niandu_select">
                            <!-- 此处生成年度select选项  -->
                            <!-- <option>123455<option>
                            <option>123455<option>
                            <option>123455<option>
                            <option>123455<option>
                            <option>123455<option>
                            <option>123455<option>
                            <option>123455<option>
                            <option>123455<option>
                            <option>123455<option> -->

                        </div>
                    </div>
                </div>
                <ul class="hr-ul" style="width:70%;margin-left:5%;float:left;height:60px;display:flex">
                    <li class="hr-li"><a href="javascript:;" class="hr-li-a" style="display:none;" ><img src="images/newimg/dblgly.png" alt="" />

                        <!-- <span id="lbl_username">测试用户</span> -->

                    </a></li>

                    <div id="user_name" style="display:none;" >
                        <div id="userName" title="qwe"></div>
                        <div id="agencyName" title="qwes"></div>
                    </div>


                    <li class="hr-li"><a href="javascript:;" class="hr-li-a" onclick="logout()"><img src="images/newimg/dbltc.png" alt="" />
                        <span style="color:#ffffff;font-size:12px;">退出</span>



                    </a></li>
                </ul>
            </div>
        </div>
        <!-- header的第三部分 -->
    </div>
</div>


</div>
<div style="width: 100%;    height: calc(100% - 30px);background: url(./images/P3/bg_01png.png) no-repeat ;background-size:cover;">
    <!-- 左边的下拉列表块 -->
    <div id="left_div">
        <div id="gncd">
						 <span style="color:white;font-size:15px;margin-left:10px;line-height:40px;float:left">
							财政收入分析
						</span>
        </div>

        <div id="left_select" >

            <ul  class="layui-nav layui-nav-tree " id="left_Menu" lay-filter="test" style="width: 100%" lay-shrink=all>

                <li class="layui-nav-item layui-nav-itemed">

                    <a href="javascript:;">
                        <img src="images/newimg/leftMenu_0.png" alt="" style="display:none;">
                        财政收入分析总览
                        <img src="images/newimg/cbxl.png" alt="" id="zhankai"  style="display:none; position: absolute">
                    </a>

                    <dl class="layui-nav-child">
                        <dd><a href="javascript:;" id="create_element">项目绩效目标申报</a></dd>
                        <dd><a href="javascript:;">项目目标申报审核</a></dd>

                    </dl>
                </li>

                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <img src="images/newimg/leftMenu_1.png" alt="" style="display:none;">
                        财政收入分析总览
                        <img src="images/newimg/cbxl.png" alt="" id="zhankai" style="display:none; position: absolute">
                    </a>
                    <dl class="layui-nav-child">
                        <dd><a href="">单位填报自评</a></dd>
                        <dd><a href="">专家评价设置</a></dd>
                        <dd><a href="">项目部门评价设置</a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <img src="images/newimg/leftMenu_2.png" alt="" style="display:none;">
                        收入地区分析
                        <img src="images/newimg/cbxl.png" alt="" id="zhankai"  style="display:none; position: absolute">
                    </a>
                    <dl class="layui-nav-child">
                        <dd><a href="">单位填报自评-任务</a></dd>
                        <dd><a href="">单位填报自评-项目</a></dd>
                        <dd><a href="">单位填报自评审核</a></dd>
                        <dd><a href="">专家评价</a></dd>
                        <dd><a href="">项目部门绩效评价</a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <img src="images/newimg/leftMenu_3.png" alt="" style="display:none;">
                        税收收入分析
                        <img src="images/newimg/cbxl.png" alt="" id="zhankai"  style="display:none; position: absolute">
                    </a>
                    <dl class="layui-nav-child">
                        <dd><a href="">项目评价结果发布</a></dd>

                    </dl>
                </li>
                <li class="layui-nav-item"><a href="">非税收入分析</a></li>
                <li class="layui-nav-item"><a href="" style="display:none;">项目目标申报审核</a></li>
            </ul>
            <div id="first_select" style="display:none;">
                <span><img src="images/newimg/侧边栏icon项目报告.png" alt=""></span>
                <span>项目申报</span>
                <span><img src="images/newimg/侧边栏下拉icon.png" alt=""></span>
            </div>
            <div id="first_option" style="display:none;" >
                <div>项目绩效目标申报</div>
                <div>项目目标申报审核</div>
            </div>

        </div>


        <div id="close_left" onclick="CloseLeft()"></div>
        <div id="open_left" onclick="OpenLeft()"> </div>
    </div>
    <!-- 右边的iframe -->
    <div id="right_div">

        <!-- <div class="layui-tab"  lay-allowClose="true">
                <ul class="layui-tab-title" id="TAB">
                  <li class="layui-this">首页111</li>
                  <li>基础信息采集1</li>
                  <li>高后果区识别</li>
                  <li>高后果区查询</li>
                </ul>
                <div class="layui-tab-content" id="TAB_content">
                  < div class="layui-tab-item layui-show">
                      <iframe src="dm/modelChange/L_R_layout.jsp" style="width:100%;height:100%"></iframe>
                  </div>
                  <div class="layui-tab-item">

                  </div>
                  <div class="layui-tab-item">内容3</div>
                  <div class="layui-tab-item">内容4</div>
                  <div class="layui-tab-item">内容5</div>
                </div>
        </div> -->
        <!-- <div class="layui-tab layui-tab-card" lay-filter="tab" lay-allowClose="true" >

            下拉按钮
            <div id="open_navselect">打开隐藏</div>
            <div id="close_navselect">关闭隐藏</div>
            下拉框
            <div id="navselect">
                <ul>

                </ul>
            </div>


            选项卡
          <ul class="layui-tab-title" id="TAB">
                  <li class="layui-this" id="top" lay-id="999">首页</li>
          </ul>
          <div class="layui-tab-content" id="TAB_content">
                <div class="layui-tab-item layui-show">
                      <iframe src="" style="width:100%;height:100%"></iframe>
                  </div>
          </div>
        </div> -->

        <div id="TAB" class="easyui-tabs" data-options="tools:'#tab-tools'" style="width:100%;height:100%">
            <div title="财政收入分析总览" data-options="closable:false"  >
                <div class='layui-tab-item layui-show'>
                    <iframe id='mainIframe' name='mainIframe' src='' style='width:100%;height:100%;overflow: hidden;'  frameborder='0' scrolling='auto'></iframe>
                </div>
            </div>
        </div>
    </div>
</div>
<script>

    /* var open_navselect=document.getElementById("open_navselect");
    var close_navselect=document.getElementById("close_navselect");
    var navselect=document.getElementById("navselect");
    open_navselect.onclick=function(){
          console.log("打开")
        open_navselect.style.display="none";
            close_navselect.style.display="block";
            navselect.style.display="block";
    }

    close_navselect.onclick=function(){
      console.log("关闭")
        close_navselect.style.display="none";
        open_navselect.style.display="block";
            navselect.style.display="none";
    } */

</script>


<script>
    /* 	//获取元素节点
    var Ali=document.getElementById('menu').getElementsByTagName('li');
    var ds=document.getElementById('conter').getElementsByTagName('div');
    //保存索引号
    var index=0;
    for(var i=0;i<Ali.length;i++){
        Ali[i]._index=i;//给对象添加一个属性  保存索引号用

        //  li 点击事件
        Ali[i].onclick=function(){
            Ali[index].className="";//清除之前的样式
            ds[index].className="";//清除内容区域的样式

            this.className='action';//改变当前的样式
            ds[this._index].className='ac';//改变当前的样式

            index=this._index;//当前的索引号    把索引号赋值给index
        };
    }*/
</script>
















<script>
    $(document).ready(function (){

        left=document.getElementById("left_button");
        right=document.getElementById("right_button");

        NavChild=document.getElementById("navchild")

    });
    var open_left=document.getElementById("open_left");
    var right_div=document.getElementById("right_div");
    var close_left=document.getElementById("close_left")
    var left_select=document.getElementById("left_select");
    var gncd=document.getElementById("gncd");
    function CloseLeft(){
        gncd.style.display="none";
        left_div.style.width="0px";
        left_select.style.display="none";
        close_left.style.display="none";
        open_left.style.display="block";
        var widt=document.documentElement.clientWidth-15;
        right_div.style.width=widt+"px";
        // right_div.style.width="95%";
        // right_div.style.marginLeft="14px"
    }
    function OpenLeft(){
        gncd.style.display="block";
        left_div.style.width="13.5%";
        left_select.style.display="block";
        close_left.style.display="block"
        open_left.style.display="none"

    }

    /* var first_select=document.getElementById("first_select");
    first_select.onclick=function(){
        console.log("收回")
    } */
</script>


<script>
    /*  const	create_element=document.getElementById("create_element");
     const   value=create_element.innerHTML;
     const   TAB=document.getElementById("TAB");
     const   TAB_content=document.getElementById("TAB_content");
     const   lastChild=TAB.lastChild;
     console.log(lastChild)
     create_element.onclick=function(){
         const newelement=document.createElement("li");
         const new_content=document.createElement("div");
         newelement.innerHTML=value;
         TAB.appendChild(newelement)
         TAB_content	.appendChild(new_content)
     } */
</script>


<!-- 以下下是年度的下拉的两种功能plan     -->
<script>
    //
    var ninadu=document.getElementById("niandu");
    var niandu_select=document.getElementById("niandu_select");
    var niandu_select_father=niandu_select=document.getElementById("niandu_select_father");
    function openniandu(){
        if($('#niandu_select_father').css("display")=="block"){
            niandu_select_father.style.display="none";
        }else if($('#niandu_select_father').css("display")=="none"){
            niandu_select_father.style.display="block";
        }
    }
    function close_niandu(){
        var ninadu=document.getElementById("niandu");
        niandu_select.style.display="none";
    }
    $(document).mouseup(function(e){
        var _con = $("#niandu_father");   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            close_niandu();
        }
    });
    function  colse_son_select(e){
        var _con = $("#niandu_father");   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            close_niandu(e);
        }
    }

    niandu.addEventListener("click",openniandu,false);
    //document.addEventListener("click",closedate,false);
</script>
<!-- <script>

	function _openniandu(){

		var basePath=getProjectName();
		//title|width|height|url|回调函数|是否显示表头
		showMyDialog("请输入年度", "290px", "250px", basePath+'/year_annual.jsp?', null,false);
	}
</script> -->

<!-- 主题导航栏 点击变色  开始 -->


<!-- 顶部导航栏 点击变色  结束 -->

</body>

</html>