<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>添加/修改码表分类窗口</title>

    <script type="text/javascript" src="../../static/jquery/jquery-2.0.js"></script>
    <script language="javascript" src="../../static/pubjs/ycdcommon.js"></script>
    <script language="javascript" src="../../static/pubjs/common.js"></script>
    <link rel="stylesheet" href="../../static/layui2.4.2/css/layui.css" media="all"/>
    <script src="../../static/layui2.4.2/layui.all.js"></script>
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

        #CODECATE {
            width: 100%;
            height: 100%;
        }

        #codeCatePage {
            margin-left: 20% !important;
            margin-right: 20% !important;
            margin-top: 5% !important;
        }

    </style>
</head>

<body><%-- onload="init()"--%>
<div id="CODECATE">
    <template>
        <div id="codeCatePage">
            <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="110px">
                <el-form-item label="分类基本编码" prop="BASENAME">
                    <el-input v-model="formData.BASENAME" placeholder="请输入码表基本名称" :disabled="disabled" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="分类中文名" prop="CATENAME">
                    <el-input v-model="formData.CATENAME" placeholder="请输入码表分类中文名" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="顺序号" prop="CORDER">
                    <el-input v-model="formData.CORDER" placeholder="请输入顺序号" clearable :style="{width: '100%'}">
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
        el: "#CODECATE",
        components: {},
        props: [],
        data() {
            return {
                isUpdate:false,
                disabled:false,
                formData: {
                    CATENAME: '',
                    CORDER: '',
                    BASENAME: "",
                    GUID:""
                },
                rules: {
                    BASENAME: [{
                        required: true,
                        message: '请输入码表编码',
                        trigger: 'blur'
                    }],
                    CATENAME: [{
                        required: true,
                        message: '请输入编码中文名',
                        trigger: 'blur'
                    }],
                    CORDER: [{
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
            var addOrUpdate=YCDCommon.Win.getUrlParam("update");
            var baseName = YCDCommon.Win.getUrlParam("baseName");
            this.formData.GUID = YCDCommon.Win.getUrlParam("guid");
            this.formData.BASENAME = baseName;
            if (addOrUpdate === "update") {
                //修改前回显控件数据
                this.isUpdate = true;
                this.updateBeforeShow(this.formData.GUID);
            }else
                this.isUpdate = false;

        },
        mounted() {
        },
        methods: {
            submitForm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return;

                    var optType = (this.isUpdate) ? "edit" : "add";
                    //确认增加的码表分类名不重复
                    if (optType === "add") {
                        var result = $DS.selectBySql("select * from dm_form_codecate where basename='" + this.formData.BASENAME + "'", true);
                        if (result && result.length > 0) {
                            this.$message.error("基本编码重复!");
                            return;
                        }
                    }
                    //通用保存
                    $DS.saveTable(optType, this.formData, "dm_form_codecate", "GUID", function (result) {
                        //保存成功回调方法
                        parent.alert("保存成功");
                        //刷新类别树
                        parent.initListCrtlTree();
                        v.closeWindow();

                    });
                })
            },
            updateBeforeShow(guid) {
                var data = $DS.selectBySql("select * from dm_form_codecate where guid ='" + guid + "'",true);
                if (!data[0]) return;
                this.formData.GUID = data[0].GUID;
                this.formData.BASENAME = data[0].BASENAME;
                this.formData.CATENAME = data[0].CATENAME;
                this.formData.CORDER = data[0].CORDER;
                //回显禁止更改分类基本编码
                this.disabled =true;
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