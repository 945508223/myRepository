<%--
  Created by IntelliJ IDEA.
  User: 94550
  Date: 2020/6/17
  Time: 15:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>dataZoom</title>
    <script src="../echars/echarts.js"></script>
    <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
</head>
<body>
<div id="main" style="width: 1000px;height:600px;"></div>



<div ctrlname="LABEL" cnname="标签" ctrltype="base" class="formitem ui-draggable ui-draggable-handle deactive" tag="1" id="ctrl_624120-175534446" name="ctrl_624120-175534446" dv_id="" dv_ctrlname="标签1" dv_text="<p>146,234,320</p>" dv_editroles="" dv_dim="请拖入维度" dv_measure="请拖入度量" dv_filter="过滤条件" dv_background="" dv_width="39.6%" dv_height="14.16%" dv_position="none" dv_bgcolor="#0d1a55" dv_left="30%" dv_top="40.59%" dv_font="自定义" dv_lineheight="15px" dv_text-align="left" dv_border="无" dv_opacity="0%" dv_background_size="100% 100%" dv_overflow="hidden" dv_zindex="" dv_transform="" datasource="{&quot;sbtid&quot;:139,&quot;factid&quot;:190,&quot;cubetype&quot;:&quot;fact&quot;}" dv_opacity_text="0%" holderid="ctrl_623120-1263351" style="z-index: 999; float: left; left: 30%; top: 40.66%; position: absolute; width: 39.73%; height: 13.96%; background-color: rgba(13, 26, 85, 0); line-height: 15px; text-align: left; opacity: 1; background-size: 100% 100%; overflow: hidden; font-size: 12px; color: rgb(206, 243, 255); font-family: 黑体, sans-serif; letter-spacing: 2px;" dv_text_text="146,234,320" label_ctrl_623120-154444953="<p>一般公共预算</p>" dv_font_text="自定义" dv_text-align_text="left" label_ctrl_624120-143823440="<p>146,234,320</p>" dv_left_text="30%" dv_top_text="40.59%" dv_width_text="39.6%" dv_height_text="14.16%" label_ctrl_624120-175534446="<p>146,234,320</p>" text-align="left"><div style="width:100%;height:100%;"><p>146,234,320</p></div></div>



<script type="text/javascript">

    var chart = echarts.init(document.getElementById('main'));


    var option = {
            xAxis: {
                type: 'category',
                data:["1","2","3","4","5","6"]

                //
            },
            yAxis: [{
                type: 'value',

            }],
            dataZoom: [{
                type: 'slider',
                show:true,
                start: 0,
                end: 10,
                yAxisIndex:0,
                // xAxisIndex:0,
                // orient:'horizontal',

                /*start: 0,
                end: 10,
                handleSize: '80%',
                handleStyle: {

                }*/
            }],
            series: [
                {

                    type: 'bar',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',

                    data: [1,2,3,4,5,6]
                }
            ]

    };


    //渲染地图
    chart.setOption(option);


</script>

</body>
</html>
