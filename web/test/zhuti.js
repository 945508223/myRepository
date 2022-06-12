
var pageCfg_ = {
    gridId:'xxx'
}
//搜索
function searchPeople(keyword) {
    debugger
    let source = $DS.getSource('DS_单位人员基本信息');
    let filter = "AND ISDC<>'1' [and] year = '${V.USER_currentyear}'  AND PERSONSTATUS NOT IN ('3 ','9') [AND] AGENCYID <> '${V.URL_agencyId}'";
    if (keyword || keyword == 0) {
        source.filter = filter + ` and IDNO like '${keyword}' `;
    } else {
        source.filter = filter;
    }
    //注意搜索时将页码重新设置为第一页
    $grid.setCurrentPage(pageCfg_.gridId,1);
    $DS.loadCtrl('GRID_单位基本工资表');

}