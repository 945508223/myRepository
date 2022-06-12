var rMenu, zTree;
$(document).ready(function () {
    var pageId = YCDCommon.Win.getUrlParam("pageId");
    /*	var height_ = parent.document.getElementById('mainIframe').clientHeight - 60;
        $("#grid_div").css("height",height_);*/
    loadGridData(pageId);
});


function loadGridData(pageId) {
    $("#pages_grid").datagrid({
        width: "100%",
        height: "100%",
        //view : scrollview,
        url: "../meta/ds/getPageDetail.do?ID=" + pageId, //添加过滤条件 只要报告 PAGETYPE=2
        pageSize: 50,
        fitColumns: true,
        scrollbarSize: 0,
        //rownumbers : true,
        singleSelect: true,
        /* columns:[[
             {field:"PAGETITLE",title:"报告名称",halign: 'center',width:300},
             {field:"FACTNAME",title:"相关事实",halign: 'center',width:200},
             {field:"SBTNAME",title:"所属主题",halign: 'center',width:200},
             {field:"CUID",title:"创建人",halign: 'center',width:200},
             {field:"CTIME",title:"创建时间",halign: 'center',width:200}
            ]]*/
        columns: [[

            {
                field: "PAGETYPE",
                title: "报告类别",
                halign: 'center',
                width: 100,
                formatter: function (value, row, index) {
                    debugger
                    var img="";
                    if(value=="1"){
                        img="<div style='width:100%;height:100%;'><img src='../images/designer/excelicon.png' title='"+((row.PAGETYPE=="1")?"图表":"报告")+"' style='width:20px;height:20px;border:0;padding: 0 0px;margin:auto;'></img></div>";
                    }else{
                        img="<div style='width:100%;height:100%;'><img src='../images/designer/wordicon.png' title='"+((row.PAGETYPE=="1")?"图表":"报告")+"' style='width:20px;height:20px;border:0;padding: 0 0px;margin:auto;'></img></div>";
                    }
                    return img;

                }
            },
            {field: "PAGETITLE", title: "报告名称", halign: 'center', width: 300},
            {field: "FACTNAME", title: "相关事实", halign: 'center', width: 200},
            {field: "SBTNAME", title: "所属主题", halign: 'center', width: 200},
            {field: "CUID", title: "创建人", halign: 'center', width: 200},
            {field: "CTIME", title: "更新时间", halign: 'center', width: 200},
            /*  {field:"REMARK",title:"备注",halign: 'center',width:200,formatter:function (value,row,index) {
                  value = (value==undefined)?'':value;
                  return "<div title='"+value+"' style='width:100%;height:100%;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;'>"+value+"</div>"
                  }},*/
            {
                field: "PAGEOPT", title: "操作", halign: 'center', width: 150, formatter: function (value, row, index) {
                    return "<img src='../images/designer/editor.png' title='" + ((row.PAGETYPE == "1") ? "图表" : "报告") + "编辑' style='width:16px;height:16px;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;' onclick='edit_newWin(" + index + ")'></img>"
                        + "<img src='../images/designer/search.png' title='" + ((row.PAGETYPE == "1") ? "图表" : "报告") + "预览' style='width:16px;height:16px;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;' onclick='showPage(" + index + ")'></img>"
                        + "<img src='../images/designer/shuoming.png' title='" + ((row.PAGETYPE == "1") ? "图表" : "报告") + "说明' style='width:16px;height:16px;border:0;padding: 0 0px;margin-right:10px;cursor: pointer;float:left;margin-right:10px;' onclick='showRemark(" + index + ")'></img>"
                }
            }
        ]]/*,

		/*,
	    onClickCell : clickCell*/
    });

}
debugger;
var a = " '2'";
putParam("FUNCTYPE",a,true);

var comparison2 = getElByName("一般公共预算")
console.log(this)
$(this).find("span").css("color","#06F8FB")
//$(this).css("color","#06F8FB")
$(this).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/04/wKgBV18LeN2AauPKAAAHDiF9csM612.png)")
$(comparison2).css("color","#58A9FF")
$(comparison2).css("background-image","url(http://"+FASTDFSURL.result+"/group1/M00/00/06/wKgBWF8LeN2AN3nwAAAGs7HlZyI537.png)")





