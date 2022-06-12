/**
 * 刷新iframe
 */
function reloadIframe_role() {
    debugger
    let id = $DS.getCtrl("IFRAME_角色").info.ds_id;
    let src = $(`#${id}_iframe`).attr("src");
    setTimeout(function () {
        $(`#${id}_iframe`).attr("src",src);
    })
}
