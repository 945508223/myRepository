//左侧树加载完成事件
function initAD_PAGECATTreeData() {
    var params = {
        sql: "select * from AD_PAGECAT",
        dbSource: ""
    }
    var url = "http://182.92.155.2:8080/dv_designer/sysconfig/frame/execBySql";
    try {
        var result = YCDCommon.Ajax.syncAjax(url, params);
        console.log(result);
    } catch (e) {
        console.error(e);
    }
}

$.ajax({
    type: 'GET',
    url: 'http://182.92.155.2:8080/dv_designer/sysconfig/frame/getTableData',
    dataType: 'jsonp',
    jsonp: "callback",
    data: {
        tableName: "AD_PAGES",
        columns: "GUID,ITEMNAME,CURSERNAME,CUSERGUID,CTIME,PAGECAT",
        keyField: "GUID",
        filter: "%7B%22filter1%22:%22AND%20PAGECAT='#'%22%7D",
        order: "",
        customcolumns: "",
        dbSource: "",
    },
    success: function (data) {
        console.log(data);
    },
    error: function (error) {
        console.log(error);
    }
});
[{"value":"all","text":"全选"},{"value":"cancleAll","text":"取消全选"}]

console.log(JSON.stringify([{value:"all",lalel:"全选"},{value:"cancleAll",label:"取消全选"}]))