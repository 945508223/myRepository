<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <!-- 页面meta -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>添加/修改属性窗口</title>
    <!-- bootstrap -->
    <link rel="stylesheet" href="../../static/bootstrap/bootstrap.css"/>
    <!--layui-->
    <link rel="stylesheet" href="../../static/layui2.4.2/css/layui.css"/>
    <script type="text/javascript" src="../../static/layui2.4.2/layui.js"></script>
    <script type="text/javascript" src="../../static/layui2.4.2/layui.all.js"></script>
    <!--elementui-->
    <link rel="stylesheet" href="../../static/vue/elementui/elementui.css"/>
    <!--css-->
    <link rel="stylesheet" href="css/addCProperty.css"/>
    <link rel="stylesheet" href="../css/pubcss/css/public.css"/>
    <!--jquery-->
    <script type="text/javascript" src="../../static/jquery/jquery-1.10.2.min.js"></script>

    <!--common-->
    <script type="text/javascript" src="../../static/pubjs/ycdcommon.js"></script>
    <script type="text/javascript" src="../../static/pubjs/common.js"></script>
    <!--vue-->
    <script type="text/javascript" src="../../static/vue/vue.js"></script>
    <!--elementui-->
    <script type="text/javascript" src="../../static/vue/elementui/elementui.js"></script>
    <!-- 表单通用js -->
    <script type="text/javascript" src="../js/form_common.js"></script>

</head>

<body class="hold-transition">
<div id="formCP" class="ww hh">
    <el-form v-model="p"  id="propertyForm">
        <input v-model="p.CTRLNAME" id="ctrlname" type="text" name="CTRLNAME"/>
        <input v-model="p.GUID" id="p_guid" type="text" name="guid"/>
        <div id="page">
            <table id="mytable">
                <tr>
                    <td align="right">属性名：</td>
                    <td>
                        <el-input type="text" v-model="p.PNAME" id="pname" name="PNAME" placeholder="按要求给属性命名" prop="pname"
                                  onkeyup="value=value.replace(/[^\a-\z\_]/g,'')"
                                  onpaste="value=value.replace(/[^\a-\z\_]/g,'')"
                                  oncontextmenu="value=value.replace(/[^\a-\z\_]/g,'')" />
                    </td>

                    <td align="right">中文名：</td>
                    <td>
                        <el-input v-model="p.PCNAME" placeholder="输入文本"></el-input>
                    </td>

                    <td align="right">属性类型：</td>
                    <td>
                        <el-select v-model="p.PTYPE" id="ptype" name="PTYPE" clearable>
                            <el-option v-for="item in ptypes" :key="item.VALUE" :label="item.LABEL"
                                       :value="item.VALUE"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td align="right">一级分类：</td>
                    <td>
                        <el-input type="text" v-model="p.GROUPNAME" id="groupname" name="GROUPNAME" placeholder="输入文本"
                        />
                    </td>

                    <td align="right">二级分类：</td>
                    <td>
                        <el-input type="text" v-model="p.SECONDLEVEL" id="secondlevel" name="SECONDLEVEL"
                                  placeholder="输入文本"
                        />
                    </td>

                    <td align="right">对应属性：</td>
                    <td>
                        <el-input type="text" v-model="p.MAPPROPERTY" id="mapproperty" name="MAPPROPERTY"
                                  placeholder="输入文本"
                        />
                    </td>
                </tr>
                <tr>
                    <td align="right">缺省值：</td>
                    <td>
                        <el-input v-model="p.DEFAULTVAL" type="text" id="defaultval" name="DEFAULTVAL"
                                  placeholder="输入文本"/>
                    </td>

                    <td align="right">格式化类型：</td>
                    <td>
                        <el-select v-model="p.PARSETYPE" id="parsetype" name="PARSETYPE" clearable>
                            <el-option v-for="(item,index) in parseList" :value="item.VALUE" :kek="index" :label="item.LABEL"></el-option>
                        </el-select>
                    </td>
                    <td align="right">编辑器：</td>
                    <td>
                        <el-select v-model="p.EDITOR" id="editor" name="EDITOR" clearable>
                            <el-option v-for="item in editors" :value="item.VALUE" :label="item.LABEL"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td align="right">码表类别：</td>
                    <td>
                        <el-select v-model="p.LISTCODE" id="listcode" name="LISTCODE" clearable>
                            <el-option v-for="item in codeList" :value="item.VALUE" :label="item.LABEL"></el-option>
                        </el-select>
                    </td>

                    <td align="right">顺序号：</td>
                    <td>
                        <el-input id="porder" name="PORDER" v-model.number="p.PORDER"
                                  data-options="required:true,missingMessage:'请输入数字！'"
                                  onkeyup="value=value.replace(/[^0-9]/g,'')"
                                  onpaste="value=value.replace(/[^0-9]/g,'')"
                                  oncontextmenu="value=value.replace(/[^0-9]/g,'')" type="text" placeholder="请输入数字！"
                        />
                    </td>
                </tr>
                <tr>
                    <td>扩展属性:</td>
                    <td colspan="3">
                        <el-input type="textarea" v-model="p.EXTINFO" id="extinfo" name="EXTINFO" maxlength="1000"></el-input>
                    </td>
                    <td align="right">禁用控件:</td>
                    <td>
                        <el-input type="textarea" v-model="p.DISABLESCOPE" id="disablescope" name="DISABLESCOPE"
                                  maxlength="1000"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>属性描述:</td>
                    <td colspan="5">
                        <el-input type="textarea" v-model="p.PDESCR" id="pdescr" name="PDESCR" maxlength="1000"></el-input>
                    </td>
                </tr>

                <tr>
                    <td align="right">是否只读：</td>
                    <td>
                            <el-radio v-model="p.READONLY" label="1">只读</el-radio>
                            <el-radio v-model="p.READONLY" label="0">可写</el-radio>
                    </td>

                    <td align="right">是否显示：</td>
                    <td>
                        <el-radio v-model="p.ISSHOW" label="1">显示</el-radio>
                        <el-radio v-model="p.ISSHOW" label="0">隐藏</el-radio>
                    </td>

                   <%-- <td align="right">是否样式属性：</td>
                    <td>
                        <el-switch v-model="p.isstyle"  active-color="#13ce66" active-value="1" inactive-value="0">
                        </el-switch>
                    </td>--%>
                </tr>
            </table>
        </div>

    </el-form>
    <div class="ycdpw-footer-main">
        <div class="ycdpw-footer-content">
            <button class="ycdpw-footer-button" @click="saveProperty"><i class="ycd-icon-ok"></i>确定
            </button>
            <button class="ycdpw-footer-button" @click="closeWindow"><i class="ycd-icon-cancel"></i>取消
            </button>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="addCProperty.js"></script>
</html>
