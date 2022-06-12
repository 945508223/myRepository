let pageInfo_ = {
    '0DD053F2C52248DC88FA49B14E382485':
        [
            '65D53F6F5701487A9235118871D70EC7',//5-4-1
            '81C0C7A6DA4F484786A7D8D8EDF17112',//5-4-2
        ],
    'C53630762C3646C8A074AA6D481529F9':
        [
            '65D53F6F5701487A9235118871D70EC7',//5-4-1
            '313F7CADA9D841D8B2777C5E01D26CA4',//5-4-3
        ]
}

//加载完成事件 加载数据 取顶层页面表格数据
function loadAfterInitTreeData_(info) {
    debugger
    let topWin = $DS.util.getTopWin('window');
    let gridDSata = topWin.$DS.getCtrl('GRID_下达区划列表').info.ds_grid;
    let treeData = $DS.util.clone(gridDSata);
    treeData.forEach(node => {
        node.ID = node.TASKID;
        node.NAME = node.TASKNAME;
    })
    info.ds_tree = treeData;
}

//执行批量导出
function doBatchexport_() {
    debugger
    let pageInfo_ = {
        '0DD053F2C52248DC88FA49B14E382485':
            [
                '65D53F6F5701487A9235118871D70EC7',//5-4-1
                '81C0C7A6DA4F484786A7D8D8EDF17112',//5-4-2
            ],
        'C53630762C3646C8A074AA6D481529F9':
            [
                '65D53F6F5701487A9235118871D70EC7',//5-4-1
                '313F7CADA9D841D8B2777C5E01D26CA4',//5-4-3
            ]
    }
    var topWin = $DS.util.getTopWin("window");
    let checkedTask = topWin.$DS.getPms("grid_node_val");
    if (!checkedTask) {
        alert('请选择导出的任务!');
        return;
    }
    let urls = pageInfo_[checkedTask.TASKTYPE].map(rptId => `/report/reportdesigner/lookreport/reportView.jsp?reportid=${rptId}&TASKID=${checkedTask.TASKID}`);


    try {
        topWin.$DS.loading(true);
        $DS.util.exportMergeReportExcel(urls, checkedTask.TASKNAME);
        setTimeout(() => {
            window.top["btn_batchExportTimeKey"] = setInterval(() => {
                if (window.top.exportMergeObj["URLARR"].length == 0) {
                    clearInterval(window.top["btn_batchExportTimeKey"]);
                    topWin.$DS.loading(false);
                    delete window.top["btn_batchExportTimeKey"]
                }
            })
        })
    } catch (e) {
        console.error(e);
        topWin.$DS.loading(false)
    }
}



//执行批量导出
function doBatchexport_() {
    debugger

    let checkedTasks = $tree.getCheckedNodes($DS.getCtrl('TREE_选择任务').info.ds_id);
    if (checkedTasks?.length == 0) {
        alert('请选择导出的任务!');
        return;
    }
    let urls = [];
    var topWin = $DS.util.getTopWin("window");
    checkedTasks.forEach(node => {
        pageInfo_[node.TASKTYPE].forEach(rptId => {
            let url = `/report/reportdesigner/lookreport/reportView.jsp?reportid=${rptId}&TASKID=${node.TASKID}`;
            urls.push(url);
        })
    })

    try {
        topWin.$DS.loading(true);
        $DS.util.exportMergeReportExcel(/*reportsId*/urls, "测试");
        window.top["btn_batchExportTimeKey"] = setInterval(function () {
            setTimeout(() => {
                if (window.top.exportMergeObj["URLARR"].length == 0) {
                    clearInterval(window.top["btn_batchExportTimeKey"]);
                    topWin.$DS.loading(false);
                    delete window.top["btn_batchExportTimeKey"]
                }
            })

        })
    } catch (e) {
        console.error(e);
        topWin.$DS.loading(false)
    }
}