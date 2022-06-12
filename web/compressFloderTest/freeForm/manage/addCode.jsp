<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>添加/修改码表窗口</title>

    <script type="text/javascript" src="../../static/jquery/jquery-2.0.js"></script>
    <script language="javascript" src="../../static/pubjs/ycdcommon.js"></script>
    <script language="javascript" src="../../static/pubjs/common.js"></script>
    <link rel="stylesheet" href="../../static/layui2.4.2/css/layui.css" media="all"/>
    <script src="../../static/layui2.4.2/layui.all.js"></script>
    <!-- easyUI -->
    <%--<script type="text/javascript" src="../../static/easyUI1.5.1/jquery.easyui.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../../static/easyUI1.5.1/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../static/easyUI1.5.1/themes/icon.css">--%>
    <!-- Ztree -->
    <link rel="stylesheet" href="../../static/jquery-plugin/ztree/css/zTreeStyle/default/zTreeStyle.css">
    <script type="text/javascript" src="../../static/jquery-plugin/ztree/js/jquery.ztree.all-3.5.js"></script>

    <!--vue-->
    <script type="text/javascript" src="../../static/vue/vue.js"></script>
    <!--elementui-->
    <script type="text/javascript" src="../../static/vue/elementui/elementui.js"></script>
    <link rel="stylesheet" href="../../static/vue/elementui/elementui.css"/>
    <!-- 表单通用js -->
    <script type="text/javascript" src="../js/form_common.js"></script>
    <style type="text/css">
        #bottombut{
            position: fixed;bottom: 0;width: 100%;height:60px;line-height:40px;text-align:center;
        }
        #bt1 {
            width: 115px;
            background-color: #fff;
            border: 1px solid #95B8E7;
            color: #000;
        }

        #bt2 {
            width: 115px;
            margin-left: 40px;
        }
        #CODE{
            width: 100%;height: 100%;
        }
        #codePage {
            margin-left: 20% !important;
            margin-right: 20% !important;
            margin-top: 5% !important;
        }

    </style>
</head>

<body><%-- onload="init()"--%>
<div id="CODE">
    <template>
        <div id="codePage">
            <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
                <el-form-item label="码表编码" prop="CODEN">
                    <el-input v-model="formData.CODEN" placeholder="请输入码表编码" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="编码中文名" prop="CNAME">
                    <el-input v-model="formData.CNAME" placeholder="请输入编码中文名" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="顺序号" prop="PORDER">
                    <el-input v-model="formData.PORDER" placeholder="请输入顺序号" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </template>
    <div id="bottombut">
        <input id="bt1" type="button" value="提交" class="layui-btn layui-btn-sm ycd_btn_base"
               @click="submitForm"/>
        <input id="bt2" type="button" value="取消" class="layui-btn layui-btn-sm layui-btn-primary ycd_btn_base"
               @click="closeWindow" />
    </div>

</div>

</body>
<script>
   var v = new Vue({
        el: "#CODE",
        components: {},
        props: [],
        data() {
            return {
                isUpdate:false,
                formData: {
                    CODEN: "",
                    CNAME: undefined,
                    PORDER: undefined,
                    BASENAME: "",
                    GUID:"",
                    CODECATEID:""
                },
                rules: {
                    CODEN: [{
                        required: true,
                        message: '请输入码表编码',
                        trigger: 'blur'
                    }],
                    CNAME: [{
                        required: true,
                        message: '请输入编码中文名',
                        trigger: 'blur'
                    }],
                    PORDER: [{
                        pattern: /^[0-9]*$/,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                },
            }
        },
        computed: {},
        watch: {},
        created() {
            debugger
            var addOrUpdate = YCDCommon.Win.getUrlParam("addOrUpdate");
            var baseName = YCDCommon.Win.getUrlParam("baseName");
            var codeCateId = YCDCommon.Win.getUrlParam("categuid");
            var GUID = YCDCommon.Win.getUrlParam("guid");

            this.formData.CODECATEID = codeCateId;
            this.formData.GUID = GUID;
            this.formData.BASENAME = baseName;
            if (addOrUpdate === "update") {
                //修改前回显控件数据
                this.isUpdate = true;
                this.updateBeforeShow(GUID);
            }else
                this.isUpdate = false;

        },
        mounted() {
        },
        methods: {
            submitForm() {
                this.$refs['elForm'].validate(valid => {
                    debugger
                    if (!valid) return
                    var optType = (this.isUpdate) ? "edit" : "add";
                    //通用保存
                    $DS.saveTable(optType, this.formData, "dm_form_code", "GUID", function (result) {
                        //保存成功回调方法
                        parent.alert("保存成功");
                        //刷新码表列表
                        parent.loadCodeGrid(v.formData.BASENAME);
                        v.closeWindow();

                    });
                })
            },
            updateBeforeShow(GUID){
                var data = $DS.selectBySql("select * from dm_form_code where guid ='" + GUID + "'", true);
                if (!data[0]) return;

                this.formData.CODEN = data[0].CODEN;
                this.formData.CNAME = data[0].CNAME;
                this.formData.PORDER = data[0].PORDER;
                this.formData.BASENAME = data[0].BASENAME;
                this.formData.GUID = data[0].GUID;
            },
            deleteComponent(){

            },


            closeWindow(){
                var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
                parent.layer.close(index); // 再执行关闭
            },
            resetForm() {
                this.$refs['elForm'].resetFields()
            },
        }
    })
</script>
</html>