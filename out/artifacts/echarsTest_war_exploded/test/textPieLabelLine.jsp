<%--
  Created by IntelliJ IDEA.
  User: 94550
  Time: 15:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>labelTest</title>
<%--    <script language="javascript" src="../layer/layer.js"></script>--%>
    <script language="javascript" src="../static/jquery/jquery-2.0.js"></script>
    <link rel="stylesheet" href="../static/layui2.4.2/css/layui.css" media="all"/>
    <script language="javascript" src="../layui/layui.js"></script>
    <script language="javascript" src="../layui/layui.all.js"></script>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
</head>
<body>



<label id="test" onmouseover="show('test')">
    你瞅啥！？过来试试！
</label>

<div  onclick="layer.tips('已编辑百科，请先删除专题',this, {tips: [4,'#5FB878']});">点点点</div>

<div class="site-demo-button" id="layerDemo" style="margin-bottom: 0;">
    <blockquote class="layui-elem-quote layui-quote-nm">
        Tips：为了更清晰演示，每触发下述一个例子之前，都会关闭所有已经演示的层
    </blockquote>
    <button data-method="setTop" class="layui-btn">多窗口模式，层叠置顶</button>
    <button data-method="confirmTrans" class="layui-btn">配置一个透明的询问框</button>
    <button data-method="notice" class="layui-btn">示范一个公告层</button>

</div>

<!-- 示例-970 -->
<ins class="adsbygoogle" style="display:inline-block;width:970px;height:90px" data-ad-client="ca-pub-6111334333458862" data-ad-slot="3820120620"></ins>

<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
    <legend>再次温馨提醒</legend>
</fieldset>


<!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->
<script>
var str = "注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的"+'\n'+"上述js路径需要改成你本地的"

    function show(id) {
        layer.tips(str,"#"+id+"", {
            tips: [1,"#4794ec"],// 1 2 3 4 提示框方向 背景颜色
           // area:  ['500px', '600px'] //提示框宽高
            time:3000,//提示框显示时间 单位毫秒
            anim: 1 //提示框出现动画

        });
    }



function showTips(element,pvalue,mark) {

    var title = $(element).attr("dv_title");
    if(mark=="title"){
        title = pvalue;
        if($(element).attr("dv_tipBackColor")){
            tipBackColor = $(element).attr("dv_tipBackColor")
        }
    }
    var tipBackColor = $(element).attr("dv_tipBackColor");
    //默认提示框背景颜色
    if(!tipBackColor){
        tipBackColor = "#4794ec"
    }

    if(mark=="tipBackColor"){
        tipBackColor = pvalue;
        title= $(element).attr("dv_title")
    }

    var tips;
    $(element).on({
        mouseenter: function () {
            tips = layer.tips(title, this,
                {
                    tips: [2, tipBackColor],
                    time: 5000,
                    area: 'auto',
                    //maxWidth: 500
                });

        },
        mouseleave: function () {
            layer.close(tips);

        }
    });

}


</script>


</body>
</html>
