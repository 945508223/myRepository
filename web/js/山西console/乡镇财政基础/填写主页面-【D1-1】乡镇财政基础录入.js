let pageInfo_ = {
    tab1Ctrl: ['BUTTON_新增', 'BUTTON_删除', 'GRID_数据列表', 'BUTTON_保存']
}

//区划树点击事件 推送参数到顶层窗口
function putCheckNodeToTop(node) {
    let topWin = $DS.util.getTopWin('window');
    topWin.$DS.putPms('ADMDIVTREE', node);
    flashTabCtrl(node);
}

//刷新tab页控件
function flashTabCtrl(node) {
    debugger
    try {
        let iframeWin = $iframe.getSubWindow('IFRAME_数据列表');
        //if (iframeWin.$("#drag_tabs_1640160078000_iframe_2").length>0) {
            // let oldSrc = iframeWin.$("#drag_tabs_1640160078000_iframe_2").attr("src");
            iframeWin.$DS.loadCtrl('TABS_数据列表')
       // }
        //iframeWin.$DS.putPms('ADMDIVTREE', node)
        /*let tab1Win = iframeWin.$tabs.getSubWindow('TABS_数据列表', 1);
        if (tab1Win.$DS) {
            tab1Win.$DS.putPms('ADMDIVTREE', node);
            tab1Win.$DS.putPms('P_ADMDIVCODE', node.ITEMCODE.substr(0, 6));
            for (let ctrl of pageInfo_.tab1Ctrl) {
                tab1Win.$DS.loadCtrl(ctrl);
            }
        }*/
        //let tab2Win = iframeWin.$tabs.getSubWindow('TABS_数据列表', 2);

    } catch (e) {
        console.error(e)
    }

}