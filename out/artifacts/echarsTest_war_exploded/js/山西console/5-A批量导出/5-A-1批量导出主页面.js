//构建导出数据
function batch_export_buildData(cfg) {
    debugger
    let taskGrid = $DS.getCtrl("GRID_下达区划列表").info;
    let reportGrid = $DS.getCtrl("GRID_采集表选择").info;
    let taskData = $grid.getData(taskGrid.ds_id);
    let reportData = $grid.getData(reportGrid.ds_id);
    if (!taskData || taskData.length == 0) {
        alert("请选择区划!");
        return;
    }
    if (!reportData || reportData.length == 0) {
        alert("请选择要导出的采集表!");
        return;

    }
    //获取要导出的采集表报表id

    let exportObj = {};
    for (let task of taskData) {
        exportObj[task.GUID] = {
            admdivName: task.TASKSHOWNAME,
            reportArr: []
        };

        for (let report of reportData) {
            if (report.MODELTYPE == "R") {
                let url = `/report/reportdesigner/lookreport/reportView.jsp?reportid=${report.MODELID}&TASKID=${task.TASKID}`;
                exportObj[task.GUID].reportArr.push(url);
            }
        }
    }
    // $DS.loadingFun("batch_export_export", {exportData: exportObj})
    batch_export_export(exportObj, cfg)
}


//执行导出
function batch_export_export(data, cfg) {

    //初始导出状态为start
    let queue = [];
    for (let key in data) {
        queue.push(key);
    }
    window.top["exportMergeStatus"] = {
        status: "start",
        exporting: "",
        exportQueue: queue,
        timeKey: ''
    };
    window.top.exportMergeObj = {
        FLAG: true,//放置数据标识
        REOPRTNAME: '',//文件名
        JSON: [],//放置的JSON数据
        URLARR: [],//需要合并的报表页面URL
        exportStatus: "START",
        exportCfg: {backColor: cfg.color == "1" ? true : false, changeUnit: cfg.unit == "1" ? true : false}
    }

    $DS.loadingFun("intervalExport", {"exportData": data,"cfg":cfg}, getUrlWin(), true)

    //intervalExport({exportData:data})
}

function intervalExport(data) {
    debugger
    let cfg = data.cfg;
    // topWin.$DS.loading(true);
    let typeName = $DS.getCtrl("SELECT_任务下拉").info.ds_select_curText;
    window.top["exportMergeStatus"]["timeKey"] = setInterval(function () {

        try {
            //开始导出
            if (window.top.exportMergeObj.URLARR.length == 0 && window.top["exportMergeStatus"].status == "start" && window.top["exportMergeStatus"].exportQueue.length > 0) {
                console.log("开始导出")
                let queueKey = window.top["exportMergeStatus"].exportQueue[0];
                let item = data.exportData[queueKey];
                window.top["exportMergeStatus"].status = "exporting";
                window.top["exportMergeStatus"].exporting = `${item.admdivName}-${typeName}`;
                $DS.util.exportMergeReportExcel(item.reportArr, `${item.admdivName}-${typeName}`, {backColor: cfg.color == "1" ? true : false, changeUnit: cfg.unit == "1" ? true : false});
                console.log(item);
            }
            //导出一张结束
            else if (window.top.exportMergeObj.EXPORTSTATUS == "END" && window.top["exportMergeStatus"].exportQueue.length > 0 && window.top.exportMergeObj.URLARR.length == 0 && window.top.exportMergeStatus.exporting == window.top.exportMergeObj.REOPRTNAME) {
                window.top["exportMergeStatus"].status = "start";
                window.top.exportMergeObj.EXPORTSTATUS = "START";
                window.top["exportMergeStatus"].exportQueue.splice(0, 1);
                console.log("结束一张");
                console.log(data.exportData[window.top["exportMergeStatus"].exportQueue[0]]);
            }
            //全部结束
            else if (window.top["exportMergeStatus"].exportQueue.length == 0) {
                clearInterval(window.top["exportMergeStatus"].timeKey);
                let topWin = getUrlWin();
                topWin.$DS.loading(false)
            }
        } catch (e) {
            console.error(e);
            clearInterval(window.top["exportMergeStatus"].timeKey);
            let topWin = getUrlWin();
            topWin.$DS.loading(false)
        }
    }, 500);
}