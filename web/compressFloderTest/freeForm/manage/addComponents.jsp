<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>添加控件窗口</title>

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

    <script type="text/javascript" src="../js/form_common.js"></script>

    <style type="text/css">
        #bottombut {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 60px;
            line-height: 40px;
            text-align: center;
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

        #page {
            overflow: hidden;
        }

        #page .el-row {
            margin-left: 3% !important;
            margin-right: -21% !important;
            margin-top: 3%;
        }

    </style>
</head>

<body>
<div id="CP" style="width: 100%;height: 100%;">

    <template>
        <div id="page">
            <el-row :gutter="15">
                <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                    <el-col :span="9">
                        <el-form-item label="控件名" prop="CTRLNAME">
                            <el-input v-model="formData.CTRLNAME" placeholder="请输入英文控件名" show-word-limit
                                      clearable prefix-icon='el-icon-mobile' :disabled="disabled"
                                      :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="中文名" prop="CNNAME">
                            <el-input v-model="formData.CNNAME" placeholder="请输入中文名" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="基类控件" prop="BASECTRL">
                            <el-select v-model="formData.BASECTRL" placeholder="请选择基类控件" clearable
                                       :style="{width: '100%'}">
                                <el-option v-for="(item, index) in BASECTRLOptions" :key="index" :label="item.LABEL"
                                           :value="item.VALUE" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="所属分组" prop="GROUPNAME">
                            <el-select v-model="formData.GROUPNAME" placeholder="请选择所属分组" clearable
                                       :style="{width: '100%'}">
                                <el-option v-for="(item, index) in GROUPNAMEOptions" :key="index" :label="item.LABEL"
                                           :value="item.VALUE" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="控件类型" prop="CTRLTYPE">
                            <el-select v-model="formData.CTRLTYPE" placeholder="控件类型" clearable
                                       :style="{width: '100%'}">
                                <el-option v-for="(item, index) in CTRLTYPEOptions" :key="index" :label="item.LABEL"
                                           :value="item.VALUE" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="顺序号" prop="CORDER">
                            <el-input v-model="formData.CORDER" placeholder="请输入顺序号" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="图标" prop="ICONURL">
                            <el-input v-model="formData.ICONURL" placeholder="请输入图标" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="是否显示" prop="ISSHOW">
                            <el-switch v-model="formData.ISSHOW" active-value="1" inactive-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <%--    <el-col :span="24">
                            <el-form-item size="large">
                                <el-button type="primary" @click="submitForm">提交</el-button>
                                <el-button @click="resetForm">重置</el-button>
                            </el-form-item>
                        </el-col>--%>
                </el-form>
            </el-row>
        </div>
    </template>
    <div id="bottombut">
        <input id="bt1" type="button" value="提交" class="layui-btn layui-btn-sm ycd_btn_base"
               @click="submitForm"/>
        <input id="bt2" type="button" value="放弃" class="layui-btn layui-btn-sm layui-btn-primary ycd_btn_base"
               @click="closeWindow"/>
    </div>

</div>

</body>
<script>
    var v = new Vue({
        el: "#CP",
        components: {},
        props: [],
        data() {
            return {
                isUpdate: false,
                disabled: false,//是否禁用控件名输入框
                formData: {
                    CTRLNAME: undefined,
                    CNNAME: undefined,
                    BASECTRL: 'drag_public',
                    GROUPNAME: 'group_input',
                    CTRLTYPE: 'singeleData',
                    CORDER: undefined,
                    ICONURL: undefined,
                    ISSHOW: "1",
                    GUID: undefined
                },
                rules: {
                    CTRLNAME: [{
                        required: true,
                        message: '请输入控件名',
                        trigger: 'blur'
                    }/*, {
                        pattern: /[A-Z]$/,
                        message: '请输入大写字母',
                        trigger: 'blur'
                    }*/],
                    CNNAME: [{
                        required: true,
                        message: '请输入中文名',
                        trigger: 'blur'
                    }],
                  /*  CTRLTYPE: [{
                        required: true,
                        message: '控件类型',
                        trigger: 'change'
                    }],*/
                    CORDER: [{
                        required: true,
                        message: '请输入顺序号',
                        trigger: 'blur'
                    }, {
                        pattern: /^[0-9]*$/,
                        message: '请输入数字',
                        trigger: 'blur'
                    }],
                    /* ICONURL: [{
                         required: true,
                         message: '请输入图标',
                         trigger: 'blur'
                     }]*/
                },
                BASECTRLOptions: [{
                    "LABEL": "无",
                    "VALUE": ''
                }],
                GROUPNAMEOptions: [{
                    "LABEL": "分组一",
                    "VALUE": "group1"
                }, {
                    "LABEL": "分组二",
                    "VALUE": "分组2"
                }],
                CTRLTYPEOptions: [{
                    "LABEL": "类型一",
                    "VALUE": "type1"
                }, {
                    "LABEL": "类型二",
                    "VALUE": "type2"
                }]
            }
        },
        computed: {},
        watch: {},
        created() {
            var update = YCDCommon.Win.getUrlParam("update");
            var guid = YCDCommon.Win.getUrlParam("guid");

            this.formData.GUID = guid;
            this.initData();//初始化下拉选项数据
            if (update === "update") {
                //修改前回显控件数据
                this.isUpdate = true;
                this.updateBeforeShow(guid);
            } else
                this.isUpdate = false;

        },
        mounted() {
        },
        methods: {
            //初始化下拉选项数据
            initData() {

                //基类控件
                var sql = "select t.coden value,t.cname label from dm_form_code t where t.basename='baseCtrl'";
                var baseCtrls = $DS.selectBySql(sql, true);
                //分组
                var sql1 = "select t.coden value,t.cname label from dm_form_code t where t.basename='form_ctrlgroup'";
                var groups = $DS.selectBySql(sql1, true);
                //控件类型
                var sql2 = "select t.coden value,t.cname label from dm_form_code t where t.basename='dm_form_ctrltypes'";
                var types = $DS.selectBySql(sql2, true);
                this.BASECTRLOptions = baseCtrls;
                this.GROUPNAMEOptions = groups;
                this.CTRLTYPEOptions = types;

            },
            submitForm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return;
                    var optType = this.isUpdate ? "edit" : "add";
                    //确认增加的控件名不重复
                    if (optType === "add") {
                        var result = $DS.selectBySql("select * from dm_form_components where ctrlname='" + this.formData.CTRLNAME + "'", true);
                        if (result && result.length > 0) {
                            this.$message.error("控件名重复!");
                            return;
                        }
                    }
                    $DS.saveTable(optType, this.formData, "dm_form_components", "GUID", function (result) {
                        //刷新控件树
                        parent.initListCrtlTree()
                        parent.alert("保存成功");
                        v.closeWindow();

                    });

                })
            },
            updateBeforeShow(guid) {

                var data = $DS.selectBySql("select * from dm_form_components where guid ='" + guid + "'", true);
                if (!data[0]) return;
                this.formData.CTRLNAME = data[0].CTRLNAME;
                this.formData.CNNAME = data[0].CNNAME;
                this.formData.BASECTRL = data[0].BASECTRL;
                this.formData.GROUPNAME = data[0].GROUPNAME;
                this.formData.CTRLTYPE = data[0].CTRLTYPE;
                this.formData.CORDER = data[0].CORDER;
                this.formData.ICONURL = data[0].ICONURL;
                this.formData.ISSHOW = data[0].ISSHOW;
                this.formData.GUID = data[0].GUID;
                this.disabled = true;
            },
            deleteComponent() {

            },


            closeWindow() {
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