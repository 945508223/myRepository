function setCommonTemplete(editor,params){
    debugger
    var model=YCDCommon.temp(params);
    editor.getDoc().setValue(editor.getDoc().getValue()+model);
}
