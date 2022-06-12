/**
 * 编辑sql
 * @param dom
 */
function editSql(dom){
    debugger
    setTimeout(function () {
        let gridInfo = $DS.getCtrl('GRID_SQL表格').info;
        let row =  window[gridInfo.ds_id+'_gridRef'].currScope.row;
        let key = Date.parse(new Date());
        window.top[key] = {content: row.content, dom: dom};
        window.top[key].win = window.open('bmp_portal' + `/report/reportdesigner/editor/jsEditor.jsp?key=${key}&openType=open`)
    })
}

//编辑器保存回调
function callBackJsEditor(key) {
    debugger
    let newContent = window.top[key].content;
    let dom = $(window.top[key].dom);
    let guid = dom.attr("GUID");
}