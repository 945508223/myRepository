function initTree_AD(info) {
    let sql = `select * from `;
    var res = $DS.selectBySql(VUECFG.appId, sql, "查询分类数据失败!");

}

let a = "http://182.92.155:8080/dv_designer/freeForm/freeFromView.jsp?PAGEID=607ECD7126DD48B3A5AD2D263E0A835E&PAGETITLE=打开页面&APPID=DV&VUECFGURL=!report#reportAnalysis#json#saveRptAnyData.json&$type=open&_w=90%&_h=90%",
    b = "http://182.92.155:8080/dv_designer/freeForm/freeFromView.jsp?PAGEID=607ECD7126DD48B3A5AD2D263E0A835E&PAGETITLE=打开页面&APPID=DV&VUECFGURL=!report#reportAnalysis#json#saveRptAnyData.json&$type=open",
    c = "http://182.92.155:8080/dv_designer/freeForm/freeFromView.jsp?pageId=CE3CCF8D36CD61AFE053029B5CB6CA8E&pageName=即席分析测试&sbtId=1"


var xhr = new XMLHttpRequest();
xhr.setRequestHeader('X-Frame-Options', 'ALLOW-FORM uri:182.92.155:8080');


function handler() {
    debugger
    let url = "http://182.92.155:8080/dv_designer/freeForm/freeFromView.jsp?pageId=CE3CCF8D36CD61AFE053029B5CB6CA8E&pageName=即席分析测试&sbtId=1";
    if (this.readyState === this.DONE) {
        if (this.status === 200) {
            var data_url = URL.createObjectURL(this.response);
            document.querySelector('#output-frame-id').src = url;
        } else {
            console.error('no pdf :(');
        }
    }
}

let params_test = {
    sql: "select * from AD_PAGES",
    dbSource: ""
}
 $.ajax({
    type : "post",
    data:params_test,
    cache : false,
    url : 'http://182.92.155.2:8080/dv_designer/sysconfig/frame/selectBySql',
    async:false,
    beforeSend: function(xhr) {
        xhr.setRequestHeader( "access-control-allow-credentials", "true");
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://182.92.155.2:8080/');
    },
    success:function(_data){
       console.log(_data)
    }
});


http://182.92.155:8080/dv_designer/freeForm/freeFromView.jsp?pageId=CE3CCF8D36CD61AFE053029B5CB6CA8E&pageName=即席分析测试&sbtId=1

setTimeout(function(){

    let iframe = $("#drag_iframe_1634130756000_iframe")
    if(iframe.attachEvent){
        iframe.attachEvent('onload',function(){
            cros_test();
        })
    }else {
        iframe.onload = function(){
            cros_test();
        }
    }

    function cros_test() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 304 || xhr.status == 304){
                    console.log(xhr.responseText);
                }
            }
        }
        xhr.open('get', 'http://182.92.155:8080/dv_designer/freeForm/freeFromView.jsp?pageId=CE3CCF8D36CD61AFE053029B5CB6CA8E&pageName=即席分析测试&sbtId=1');
        xhr.send(null);
        iframe.attr("src",'http://182.92.155:8080/dv_designer/freeForm/freeFromView.jsp?pageId=CE3CCF8D36CD61AFE053029B5CB6CA8E&pageName=即席分析测试&sbtId=1');
    }
},5000)