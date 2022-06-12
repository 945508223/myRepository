$tabs.getSubWindow("TAB",1).winload(val.INDI_DETAILID);

//修改表格高度
function changeTableHeight() {
    var ctrl = $DS.getCtrl("表格");
    if ($DS.getPms("URL_hideBtn"))
        ctrl.info.ds_height = "100%"
}

var INDI_DETAILID;
//加载表格
function winload(indi_detailid) {
    debugger
    INDI_DETAILID = indi_detailid;
    $DS.putPms("INDI_DETAILID", indi_detailid);
    $DS.loadCtrl("GRID_项目列表");
}

//查看附件
function ckfj(dom) {
    debugger
    var url = $(dom).attr('url');
    var fastDfsUrl = $DS.FASTDFSURL
    $DS.util.getTopWin("window").$DS.showPage(fastDfsUrl + url, '查看附件', '80%', '90%', {});
}

//删除单个附件
function delfile(dom) {
    if (confirm("您确认要删除此附件吗？")) {
        debugger;
        var url = $(dom).attr('url');
        var guid = $(dom).attr('guid');
        var fastDfsUrl = $DS.FASTDFSURL;
        //删除附件文件
        var msg = $DS.delFromFastDFS(url);
        if (msg != "") {
            alert("删除文件失败,失败原因：" + msg);
            return;
        }

        //删除附件记录
        var result = $DS.deleteByPageSource("右侧表格", guid);
        if (!result.isError) {
            $DS.loadCtrl('表格');
            alert("删除成功！");
        } else {
            alert("删除失败，失败原因：" + result.errMsg);
        }


    }
}

//上传按钮--上传成功事件
//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//upresult:{response:返回结果,file:文件,fileList:文件列表}
function btn_upsucceed(obj, upresult) {
    if (!INDI_GUID) {
        $DS.util.alert("请选择要上传的指标数据")
    } else {
        var info = $DS.getCtrl("表格").info;
        var source = $DS.getSourceById(info.ds_datasource);

        if (upresult.response.isError) {
            $DS.util.alert(upresult.response.errMsg)
        } else {
            var fieldName = upresult.response.result.fileName;
            var fileUrl = upresult.response.result.fileUrl;
            var result = $DS.saveTable(VUECFG.appId, "add", {
                INDI_ID: INDI_GUID,
                PRO_NAME: fieldName,
                POLURL: fileUrl
            }, source.tableName, source.keyField);
            if (!result.isError) {
                $DS.loadCtrl("表格");
            } else {
                $DS.delFromFastDFS(fileUrl);
                alert("上传文件失败！");
            }
        }
    }
}
