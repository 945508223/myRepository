
var tableInit = table.render({
    elem: '#tbtxrz'
    , method: 'post'
    , data: jsonData
    , height: "auto"
    , id: "tbtxrz"
    , text: {none: '暂无相关数据'}
    , toolbar: toolbartxrz
    , cols: [[
        {//设置表格中部分字体的颜色
            field: "number", title: "序号", width: 60, align: "left", templet: function (data) {
                return data.LAY_INDEX
            }
        }
        , {field: "ID", title: "ID", align: "left", hide: true}
        , {field: "sjbs", title: "sjbs", align: "left", hide: true}
        , {field: "xh", title: "xh", align: "left", hide: true}
        , {field: "action", title: "action", align: "left", hide: true}
        , {field: "txmc", title: "<span style='color:#c00'></span>体系名称", width: 140, align: "left", edit: 'text'}
        , {field: "rztxmc", title: "<span style='color:#c00'>*</span>认证体系名称", width: 140, align: 'left', edit: 'text'}
        , {
            field: "rzrq", title: "认证日期", width: 160, align: 'left',event: 'editStartDate',data_field:'rzrq'
            /*    templet: function (d) {
                    return ' <input type="text" name="rzrq" class="layui-input layui-input-date" value="' + d.rzrq + '" id="txrzrq'+d['LAY_TABLE_INDEX'] +'">'
                }*/
        }
        , {field: "rzjg", title: "<span style='color:#c00'>*</span>认证机构", width: 140, align: 'left', edit: 'text'}
        , {
            field: "zsdqsj", title: "<span style='color:#c00'>*</span>证书到期时间", width: 160, align: 'left',event: 'editzsdqsj',data_field:'zsdqsj'
            /*  templet: function (d) {
                  return ' <input type="text" name="zsdqsj" class="layui-input layui-input-date"  value="' + d.zsdqsj + '" id="test2">'
              }*/

        }
        , {field: "rzfgcp", title: "认证覆盖产品", width: 140, align: 'left', edit: 'text'}
        , {
            field: "jhrzsj", title: "若无，计划认证时间", width: 160, align: 'left', edit: 'select',

        }
        , {field: "ywjm", title: "原文件名", width: 140, align: 'left'}
        , {
            field: '操作', title: '操作', width: '10%', unresize: true, templet: function (res) {
                return '<button type="button" class="layui-btn layui-btn-xs" data-type="' + res['LAY_TABLE_INDEX'] + '" id="uploadFile' + res['LAY_TABLE_INDEX'] + '" lay-event="upload"><i class="layui-icon layui-icon-upload-drag"></i></button> <button type="button" class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del"><i class="layui-icon layui-icon-delete"></i></button>';
            }
        }
        , {field: "pc", title: "批次", align: 'left', hide: true}
        , {field: "cdmc", title: "cdmc", align: 'left', hide: true}
        , {field: "scsj", title: "scsj", align: 'left', hide: true}
        , {field: "ccm", title: "ccm", align: 'left', hide: true}
        , {field: "xg", title: "xg", align: 'left', hide: true}
        , {field: "fjm", title: "fjm", align: 'left', hide: true}
        , {field: "fjID", title: "fjID", align: 'left', hide: true}
    ]]
    , done: function (res, curr, count) {
        //日期控件
        //  上传文件
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
            var elem = '#uploadFile' + i;
            //循环初始上传组件
            var uploadInst = upload.render({
                elem: elem //绑定元素
                , url: $("#contextpath").val() + '/upload/uploadFile2.do' //上传接口
                , field: 'files'
                , auto: true
                , accept: 'file'
                // ,exts: 'xls|xlsx|csv'
                //添加上传额外参数
                , data: {
                    sjbs: function () {
                        var sjbs = $("#sjbs").val();
                        var logId = $("#logId").val();
                        if (sjbs !== null && sjbs.length > 0) {
                            sjbs = sjbs;
                        } else {
                            sjbs = $("#sjbs").attr('name') + new Date().getTime();//设置每次新增的批次
                            $("#sjbs").val($("#sjbs").attr('name') + new Date().getTime());//如果没有创建时间标识，就自己新增
                        }
                        mcs.setSjbs(sjbs);
                        return sjbs;
                    }
                }
                //文件上传前回调
                , before: function (obj) {
                    //开启加载
                    layer.load(2, {time: 10 * 1000, offset: '200px'});
                    //从表格缓存中获取table指定行数据
                    updateRow = tableRowTool.data;
                    var files = this.files = obj.pushFile();
                    obj.preview(function (index, file, result) {
                        updateRow['scsj'] = new Date(new Date()).format("yyyy-MM-dd hh:mm:ss");
                        updateRow['ywjm'] = file.name;
                        updateRow['xg'] = 1;
                        //  updateRow['wjdx'] = (file.size/1024).toFixed(1) +'kb';
                    })
                }
                //上传成功后回调
                , done: function (res, index, upload) {
                    txrzxg = true;
                    layer.closeAll();
                    if (res.status === "Y") {
                        updateRow['ccm'] = res.fileName;
                        updateRow['sjbs'] = res.sjbs;
                        //文件上传成功，更新表格数据
                        tableRowTool.update(updateRow);
                        //文件上传成功后，去掉.layui-table-click Table选中行状态
                        tableRowTool.tr.prop("class", "");
                        layer.msg(res.msg, {
                            icon: 1
                            , time: 2000
                            , offset: '200px'
                        }, function () {

                        })
                    } else {
                        layer.msg(res.msg, {
                            icon: 5
                            , time: 2000
                            , offset: '200px'
                        })
                    }
                    //删除文件队列已经上传成功的文件
                    return delete this.files[index];
                }
                //上传错误回调
                , error: function () {
                    layer.closeAll();
                    //请求异常回调
                }
            });
        }
        layer.closeAll();
    }

})


//监听行工具事件
table.on('tool(tbtxrz)', function (obj) {
    var data = obj.data;
    if(obj.event === 'editStartDate'){
        var field = $(this).data('field');
        laydate.render({
            elem: this.firstChild
            , show: true //直接显示
            , closeStop: this
            , done: function (value, date) {
                data[field] = value;
                obj.update(data);
            }
        });
    }
    else if (obj.event='editzsdqsj'){
        var field = $(this).data('field');
        laydate.render({
            elem: this.firstChild
            , show: true //直接显示
            , closeStop: this
            , done: function (value, date) {
                data[field] = value;
                obj.update(data);
            }});
    }

});