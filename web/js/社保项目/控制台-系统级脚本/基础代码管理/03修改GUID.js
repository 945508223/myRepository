function save_() {
    debugger
    let app = $DS.getPms('URL_CURRAPP');
    let oldGUID = $DS.getPms('URL_CODEID');
    let newGUID = $DS.getCtrl('INPUT_新GUID').info.ds_input;
    let result = $DS.exeFormSql(app, VUECFG.pageId, 'updateGUID', {oldGUID, newGUID})
    if(result.isError){
        alert('修改失败:'+result.errMsg)
    }else{
        parent.$DS.loadCtrl('GRID_代码表');
        $DS.util.close();
    }
}