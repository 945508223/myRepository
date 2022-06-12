let pageInfo_ = {
    //保民生
    BMS:'/dv_designer/dw/sharereport.jsp?pageId=D41E466CDFC13132E0538217780ABD18',
    //保工资
    BGZ:'/dv_designer/dw/sharereport.jsp?pageId=D42C15179ED8E113E0538217780A8F80'
}

/**
 * 转移支付树点击事件
 */
debugger
var treeDom = $DV.getEl("树图1");
var ctrlName = $(treeDom).attr("dv_ctrlname");
//为树添加鼠标悬浮高亮显示
var option =  options[treeDom.id];
option['series'][0]['itemStyle']['emphasis'] = {
    color: "#325e74",
    borderWidth: "2",
    borderColor: "#06F8FB"
};
var myChart = echarts.init(treeDom);
myChart.setOption(option);
myChart.on('click', function (params) {
    debugger
    console.log("点击数据:" + JSON.stringify(params.data));
    //节点带url的点击跳转事件
    if (params.data) {
        //点击效果
        params.color = "#325e74";
        //myChart.refresh();

        var node = params.data;
        //当点击的节点是第4级节点时 ,点击
        if (node.levels == '4') {
            var params = {};
            for (var key in node){
                var value = (node[key]+"").replaceAll("&nbsp;","");
                params[ctrlName + "_" + key] = value;
            }
            if (Object.keys(params).length>0) {
                parent.batPutParam(params,true);
                //重新加载接受参数的表格
                var gridId = "ctrl_829120-175316786";
                //loadDataById(gridId);
                parent.$DV.loadEl("简单表格1");
            }

        }
        changeParentIframe(params)
    }
});

//修改父页iframe路径以及标签
function changeParentIframe(params) {
    //保民生

    if(parent.$DV.getEl('左下_表格')&&$(parent.$DV.getEl('左下_表格'))){
        let iframe = $(parent.$DV.getEl('左下_表格')).find('iframe');
        let label = $(parent.$DV.getEl('左下_表格标题')).find('p span');
        //保民生
        if(params.data.id=='3'){
            iframe.attr('src',pageInfo_.BMS);
            label.text('保基本民生预算编制')
        }
        //报工资
        else if(params.data.id=='2'){
            iframe.attr('src',pageInfo_.BGZ);
            label.text('保工资、保运转预算编制')
        }
    }
}
