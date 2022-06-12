<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <title>数据集市管理</title>
    <script language="javascript"
            src="../static/jquery/jquery-1.10.2.min.js"></script>
    <link rel="stylesheet" href="../Assets/css/base.css">
    <link rel="stylesheet" href="../Assets/css/storelist.css"/>
    <link rel="stylesheet" href="../static/layui2.4.2/css/layui.css">
    <link rel="stylesheet" type="text/css"
          href="../static/easyUI1.5.1/themes/icon.css">
    <script type="text/javascript"
            src="../static/easyUI1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript"
            src="../static/easyUI1.5.1/locale/easyui-lang-zh_CN.js"></script>
    <link rel="stylesheet"
          href="../static/jquery-plugin/ztree/css/zTreeStyle/default/zTreeStyle.css"/>
    <script
            src="../static/jquery-plugin/ztree/js/jquery.ztree.all-3.5.min.js"></script>
    <link rel="stylesheet"
          href="../static/jquery-plugin/loading/loading.css">
    <script src="../static/jquery-plugin/loading/loading.js"></script>
    <script language="javascript" src="../static/pubjs/ycdcommon.js"></script>
    <script language="javascript" src="../static/pubjs/common.js"></script>
    <script language="javascript" src="../js/ztree.js"></script>
    <script src="../static/layer/layer.js"></script>
    <script language="javascript" src="dataMhouse.js"></script>
    <link href="../Assets/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="../Assets/css/twostorelist.css">
    <script type="text/javascript"
            src="../static/InsdepUI/insdep.extend.min.js"></script>
    <link rel="stylesheet" href="warehouse/css/dataMhouse2.css">
    <%--  <link rel="stylesheet" href="../static/bootstrap/bootstrap.css">--%>
    <link rel="stylesheet" href="../CSS/css/public.css">
    <%--<link rel="stylesheet" type="text/css"
          href="warehouse/css/neweasycustom.css">--%>
    <link rel="stylesheet" href="../mfbi/css/bootstrap.css">
    <style type="text/css">
        /* 父盒子 */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body style="overflow: auto;">

<div id='jqxWidget' class=".container nav">
    <div class="row hh" id="topRow">
        <%--左侧树菜单--%>
        <div id="leftMenu" class="mcol col-lg-2 col-md-2 col-sm-12 hh ww" style="background-color: rgb(246, 250, 252)">
            <div class="hh ww" style="padding-left:1.5rem;padding-top:2rem;padding-bottom:1rem">
                <div class="bg-f hh ww">
                    <%--头部标题--%>
                    <div id="menuTitle" class="menuTitle text-cc">
                        <p class="menuTitleFont">
                            <span class="titleImg" style="cursor: auto">数据仓库分类</span>
                        </p>
                    </div>
                    <%--头部按钮--%>
                    <div class="butBorder">
                        <div id="menuBut" class="addBut text-cc">
                            <img class="addButImg" src="../Assets/imagesnew/treeaddimg.png" alt=""/>
                            <span id="addDataCategory" style="cursor:pointer">添加</span>
                        </div>
                    </div>

                    <%--<div id="btnArea">
                <div id="addModelList" class="text-cc leftBtn">
                    <a href="javascript:;" id="addIcon" aname="a"><span>添加</span></a>
                </div>
            </div>--%>
                    <%--树--%>
                    <div id="sidebarscroll" class="treeScrollbar" style="vertical-align: top;">
                        <div id="treeDemo" class="ztree nl-main-1"></div>
                    </div>
                </div>
            </div>
        </div>

        <%--右侧表格--%>
        <div id="rigthGrid" class="col-lg-10 col-md-10 col-sm-12  hh ww"
             style=" background-color: rgb(246, 250, 252);">
            <div class="ww hh" style="padding-left:0rem;padding-top:2rem;padding-bottom:1rem;padding-right:1.5rem">
                <div class="bg-f ww hh">
                    <table id="resourceGrid" class="easyui-datagrid table"></table>
                </div>
            </div>
        </div>
    </div>

</div>


</body>

</html>