/**
 * grid(表格组件)
 * @type {{}}
 */
var $grid = {
    type: "drag_grid",//类型标识
    dataType: "allData",//数据类型(singeleData 单数据;allData 多数据,levelData 层级数据)
    uuid: Date.parse(new Date()),//唯一id
    isCanvas: true,//是否处理为Canvas画布
    getConfig: getGridConfig,//获取基本配置对象
    register: registerGrid,//注册组件
    showProperty: showPropertyGrid,//展示右侧属性
    level: 1,  //表格的层级
    optTypeOut: '',//表格操作类型标识 ==>用于外部控件调用当前表格实例的 点击触发方法

    //=================对外提供方法======================

    //-----------------获取设置数据相关-------------------
    getAllData: getAllGridVal,//获取表格所有数据
    setData: setGridData,  //为控件数据源设置数据
    getData: getSelectGridVal,//获取选中数据(用于架构内统一处理参数推送 冗余)
    clearData: clearGridVal,//清空数据
    setOneRowData: setOneRowData,//修改某一行的数据

    //--------------选中获取选中相关------------------------
    getCheckedNodes: getSelectGridVal,//获取选中数据
    setCheckedNodes: toggleRowSelection,//参数1:设置选中行 单选传 String 多选 Array 或传条件 row.字段名=="xxx"  |参数2:设置的勾选状态 true/false
    selectRow: toggleRowSelection,//(与setCheckedNodes方法相同,冗余存规整方法名称)
    clearCheckedNode: clearCheckedNode,//用于单选表格 清空选中行
    clearCheckedNodes: clearSelection,//用于多选表格，清空用户的选择
    clearSelection: clearSelection,//(冗余存 规整方法名称 同clearCheckedNode)

    //---------------可编辑表格相关--------------------
    getEditRows: getEditRows,//获取编辑过的行数据
    setEditRows: setEditRows,//设置编辑过的行数据
    save: saveForOut,//编辑保存
    insertRow: insertRowForOut,//编辑插入
    deleteRow: deleteRowForOut,//编辑删除
    clearEditRows: clearEditRows,//清空编辑过的行数据
    renderGrid: renderGrid,//刷新表格布局 不刷新数据

    //---------------分页--------------------------
    getCurrentPage: getCurrentPage,//获取当前页码
    setCurrentPage: setCurrentPage,//设置当前页码

    //===============表格自身调用====================================
    search: searchForOut,//搜索功能
    expendTreeGridNodes: expendTreeGridNodeForOut,//展开节点

}

/**
 * 配置对象
 */
function getGridConfig() {
    return {
        /*公共*/
        ds_id: "",//id
        ds_ctrlname: "GRID_" + $grid.uuid++,//控件名
        ds_show: true,//显示隐藏
        ds_showCondition: "",//显示条件
        ds_width: "100%",//控件宽度
        ds_height: "100%",//控件高度
        ds_style: "drawing-item",//自定义样式
        ds_name: "",//name
        ds_datasource: "",//数据源
        ds_param: "",//推送参数名
        ds_backParamCondition: "",//撤销推送条件
        ds_trigger: "",//触发控件刷新
        ds_loading: "normal",//加载机制 first:优先加载 normal:正常加载 lazy:懒加载
        ds_out_padding: "0rem",//内边距
        ds_out_margin: "0rem", //外边距
        /*属性相关*/
        ds_ispro: false,//是否作为属性
        ds_pid: "",//作为某个控件的属性
        ds_draggable: "true",//是否拖动
        /*私有*/
        ds_selectcolumns: [],//根据数据源选择表字段
        ds_grid: [],//表格数据
        ds_grid_filterFiled: [],//表格过滤字段
        /*树形数据相关属性*/
        ds_tree_grid: false,//开启树行结构表格
        ds_tree_grid_indent: 16,//属性表格缩进
        ds_tree_grid_onlyEditEnd: false,//仅末级节点可编辑
        /*分层汇总*/
        ds_divided_into_summary: false,//分层汇总
        ds_divided_into_summary_rowColor: "rgba(234, 238, 249, 1)",//分层汇总合计行颜色
        ds_divided_into_summary_fontColor: "rgba(0, 0, 0, 1)",//分层汇总合计行字体颜色
        ds_divided_into_summary_fontSize: "1.1rem",
        ds_row_key: "",//行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
        ds_row_id: "",//构建树数据id字段
        ds_row_pid: "",//上级id
        ds_expand_row_keys: [],//树形结构 默认展开得节点
        ds_expandFirst: false,//默认展开第一个节点
        ds_expandAll: false,//默认展开所有节点
        ds_grid_zeroNotShow: false,//为0不显示
        ds_endNode_notShowFields: "",//不显示字段
        ds_showDataCondition: "",//数据显示条件
        ds_columns: [],//数据源列数据
        ds_pagedata: [],//分页数据
        ds_showrownumbers: false,//显示行号列
        ds_showcheckbox: false,//显示选择框
        ds_showcheckbox_radio: false,//开启复选框仅单选
        ds_choseMidOnly: false,//多选且是层级数据是 是否只选择中间级
        ds_tree_grid_check_strictly: false,//关闭父子级关联
        ds_tree_grid_reverseCheck: false,//反选
        ds_checkbox_disableCondition: "",//复选框禁用条件
        ds_isedit: false,//是否可编辑
        ds_row_CannotEditorCondition: "",//行不可编辑条件
        ds_showeditbutton: false,//是否显示编辑按钮
        ds_pagination: false,//是否开启分页
        ds_page_size: 10,//当前分页条数
        ds_page_size_arr: [10, 20, 50, 100],//分页条数
        ds_grid_SummarPostion: "bottom",
        ds_enablesearch: false,//是否开启关键字搜索
        ds_enablecondition: false,//是否可以右键打开条件格式设置
        ds_grid_isOpenRowContextmenu: false,//是否可以右键打开菜单
        ds_highlightword: '',//高亮显示关键字--根据关键字高亮显示一行
        ds_highrowcolor: 'rgb(85,254,255)',//高亮行颜色
        /*空值提示*/
        ds_grid_empty_text: "暂无数据",//空数据显示文本
        /*固定列*/
        ds_fixed_cols_left: [],//左侧固定列
        ds_fixed_cols_right: [],//右侧固定列

        ds_expendCols: [],//展开行
        ds_grid_clickRowSelectCheckbox: false,//点击行勾选复选框
        ds_grid_autoContrast: false,//自动对照
        ds_grid_dependContrastField: "",//对照依据字段
        ds_grid_needContrastField: "",//需要对照的字段

        ds_grid_isShowBorder: true,//是否显示竖向表格边框
        ds_grid_isShowCrosswiseBorder: true,//显示横向边框
        ds_grid_isShowStripe: true,//是否显示斑马纹
        ds_grid_body_stripeColor: "#FAFAFA",//斑马纹颜色
        ds_grid_show_header: true,//显示表头
        ds_grid_head_backgroundColor: "#eaeef9",//表头背景颜色
        ds_grid_head_fontColor: "#000000",//表头字体颜色
        ds_grid_head_fontSize: "1.2rem",//表头字体大小
        ds_grid_head_height: "2rem",//表头行高
        ds_grid_body_fontColor: "#000000",//表内容字体颜色
        ds_grid_body_fontSize: "1.1rem",//表格内容字体大小
        ds_grid_body_rowColor: "#FFFFFF",//行颜色
        ds_grid_body_height: "2rem",//表格行高
        ds_grid_body_hoverRowColor: "#A8EAF7",//hover颜色
        ds_grid_body_currentRowColor: "#a8eaf7",//选中行颜色
        /*合计行*/
        ds_showsum: false,//是否在表尾显示合计行
        ds_sumrow_backgroundColor: "#eaeef9",//合计行背景色
        ds_sumrow_fontColor: "#000000",//合计行字体颜色
        ds_sumrow_fontSize: "1.1rem",//合计行字体大小
        ds_sumrow_height: "2rem",//合计行行高
        //序号列
        ds_index_width: "50",//序号列宽度

        ds_dataCarousel: false,//是否轮播数据
        ds_dataCarousel_amplitude: "2rem",//轮播辐度
        ds_dataCarousel_frequency: "1",//轮播频率 单位秒

        ds_grid_isCurrentRow_reload: true,//刷新表格是否选中上次选中行

        /*列设置*/
        ds_colSetting_date: [],//日期列
        ds_colSetting_refData: [],//引用数据列
        ds_colSetting_editCol: [],

        /*控制*/
        ds_render: true,//控制表格重新加载,用以触发组件的重新渲染
        //-------事件----------
        ds_grid_row_click: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:行数据",//行点击事件
        ds_rowchange: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:行数据",//行变更事件
        ds_gridselect: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:所有选择的行{selection,row}",//行选择事件
        ds_gridselectChange: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:所有选择的行",//行选择变更事件
        ds_cellclick: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row, column, cell, event}",//单元格点击事件
        ds_edit_change: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{value, scope,fuScope}变更的值",//单元格变更事件
        ds_edit_after: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:事件对象scope",//编辑后事件
        ds_load_success: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",//加载完成事件
        ds_grid_getInputFocus: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:事件对象scope",//单元格获取焦点事件
        ds_grid_cellInput: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:变更的值",
        ds_grid_rowContextmenu: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row://行数据, col:列信息, event}",
        ds_grid_filterColOption: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row://行数据, col:列信息,options:原始引用数据}",
        ds_grid_customColOption: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row://行数据, col:列信息,options:原始引用数据}",
        ds_grid_searchComplete: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:搜索到的数据"
    }
}

/**
 * 组件注册
 */
function registerGrid() {
    Vue.component('drag_grid', {
        props: ["type", "info"],
        created: function () {
            this.expendTreeGridNode(this.info);
            //更新引用

            this.$nextTick(function () {

                window[this.info.ds_id + "_gridRef"] = this;
                //添加监听
                addListener(this);
                //轮播multipleTable
                if (this.info.ds_dataCarousel) {
                    setDataCarousel(this.info, true);
                }
                //开启复选框以及树且关闭单选时 列头复选框绑定事件
                if (this.info.ds_showcheckbox && this.info.ds_tree_grid && !this.info.ds_showcheckbox_radio) {
                    let _this = this;
                    $(`#${_this.info.ds_id} .has-gutter .el-checkbox__input input`).bind('click', function () {
                        let isCheck = true;
                        let spanDom = $(this).parent().parent();
                        if (spanDom.attr("class").indexOf("is-indeterminate") == -1 && spanDom.attr("class").indexOf("is-checked") == -1) {
                            isCheck = false;
                        }
                        //取消全选
                        let topRow = [];
                        let rowKey = _this.info.ds_row_key ? _this.info.ds_row_key : (_this.info.ds_row_id ? _this.info.ds_row_id : "index");
                        for (let row of _this.computed_data) {
                            topRow.push(row[rowKey]);
                        }
                        let data = $DS.util.childrenToList(_this.computed_data, "children", []);
                        for (let row of data) {
                            //过滤顶层行
                            if (topRow.indexOf(row[rowKey]) == -1) {
                                if (isCheck && row.treegrid_ischecked == true) {
                                    row.treegrid_ischecked = false;
                                    _this.$refs.multipleTable.toggleRowSelection(row, false)
                                } else if (!isCheck && row.treegrid_ischecked == false) {
                                    row.treegrid_ischecked = true;
                                    _this.$refs.multipleTable.toggleRowSelection(row, true)
                                }
                            }
                        }
                    })
                }
                //注册加载完成
                if (!this.info.ds_ispro)
                    temporary.loadRegister[this.info.ds_id] = true;
                //添加实例
                VUECFG.$refs[this.info.ds_id] = this;
            })
        },
        destroyed: function () {
            if (window[this.info.ds_id + "_gridRef"]) {
                delete window[this.info.ds_id + "_gridRef"];
            }
        },
        mounted: function () {
            this.showSummariesPosition(this.info);
        },
        data: function () {
            return {
                hide: "y-hide",
                refdate: Date.parse(new Date()),
                //-------------------
                currRowIndex: -1,
                currColField: "",
                currScope: null,
                //-------分页---------
                currentPage: 1,//当前页
                //pageSize: 10,  //每页条数
                hackReset: true, //更改后重置,用于清空组件缓存
                //------查询------
                keyWord: "",//搜索关键字
                columns: this.computed_columns,

            }
        },
        //计算属性
        computed: {
            computed_drag: function () {
                if (VUECFG.viewStatu) return false;
                return this.info.ds_draggable;
            },
            computed_data: function () {
                this.info['ds_grid'].forEach((row,index)=>row.INDEX = index)
                let ref = this.refdate++;
                //清除数据历史
                if (!temporary.gridShowData) {
                    temporary.gridShowData = {};
                }

                this.currScope = null;

                //层级表格 构建层级数据
                if (this.info.ds_tree_grid && this.info.ds_grid) {
                    var rowId = this.info.ds_row_id ? this.info.ds_row_id : (this.info.ds_row_key ? this.info.ds_row_key : "index");
                    var rowPid = this.info.ds_row_pid;
                    this.info.ds_grid = $DS.util.children(this.info.ds_grid, rowId, rowPid, "children");
                    if (this.info.ds_divided_into_summary == true) {
                        dividedSummary(this.info, true)
                    }
                }

                if (this.info.ds_pagination && this.info.ds_grid && this.info.ds_grid.length > 0) {//开启分页
                    this.currentChangePage(this.currentPage);
                    temporary.gridShowData[this.info.ds_id] = this.info.ds_pagedata;//存放当前显示的data到组件info
                    //todo 切换分页 设置勾选状态
                    return this.info.ds_pagedata;
                } else if (this.info.ds_enablesearch && this.info.ds_searchdata) {
                    //如果开启关键字搜索,并且有返回数据
                    temporary.gridShowData[this.info.ds_id] = this.info.ds_searchdata;
                    $DS.eval(this.info.ds_grid_searchComplete, this.info, this.info.ds_searchdata);
                    return this.info.ds_searchdata;
                } else if (this.info.ds_grid && typeof (this.info.ds_grid) == 'string') { //自定义的
                    temporary.gridShowData[this.info.ds_id] = JSON.parse(this.info.ds_grid);
                    return JSON.parse(this.info.ds_grid);
                } else {

                    temporary.gridShowData[this.info.ds_id] = (this.info.ds_grid) ? deepClone(this.info.ds_grid) : [];
                    return (this.info.ds_grid) ? deepClone(this.info.ds_grid) : [];
                }
            },
            computed_columns: function () {

                if (!temporary.gridCols) {
                    temporary.gridCols = {};
                }
                if (!temporary.gridColsObj) {
                    temporary.gridColsObj = {};
                }
                //每次重新计算列 重置列对象
                temporary.gridColsObj[this.info.ds_id] = "";

                var info = this.info;
                if (info.ds_datasource) {
                    var source = $DS.getSourceById(info.ds_datasource);
                    info.ds_fieldinfo = source.fieldInfo;
                    //切换数据源 控件已选择的列置空 并重新设置列信息
                    if (info['ds_sourceId'] !== null && info['ds_sourceId'] !== undefined && info['ds_sourceId'] != source.sourceId) {
                        info['ds_selectcolumns'] = [];
                        info.ds_columns = source.columns;
                    }
                    info['ds_sourceId'] = source.sourceId;

                }
                //手动录入列信息
                else if (info.ds_columns) {
                    //数据源不存在 置空
                    info.ds_fieldinfo = {};
                    info['ds_sourceId'] = "";
                    var cols = $DS.util.clone(info.ds_columns);
                    if ($DS.util.isString(cols)) {
                        cols = JSON.parse(cols);
                    }
                    cols = setColsWidth(cols, info);
                    cols = setExpendCols(cols, info);
                    cols = getLevelCols(cols, info);
                    temporary.gridCols[info.ds_id] = info.ds_realcols;
                    return cols;
                }

                // 兼容旧版数据
                if (info.ds_selectcolumns && info.ds_selectcolumns.length > 0 && info.ds_selectcolumns[0].id && info.ds_selectcolumns[0].prop && info.ds_selectcolumns[0].label) {
                    temporary.gridCols[info.ds_id] = info.ds_selectcolumns;
                    return info.ds_selectcolumns;
                }
                var cols = buildColumns(info);
                temporary.gridCols[info.ds_id] = info.ds_realcols;
                return cols;
            },
            computed_total: function () {
                let data;
                if (this.info.ds_enablesearch && this.info.ds_searchdata)
                    data = this.info.ds_searchdata;
                else if (this.info.ds_grid && typeof (this.info.ds_grid) == 'string')
                    data = JSON.parse(this.info.ds_grid).length;
                else
                    data = (this.info.ds_grid) ? this.info.ds_grid : [];
                return data.length;
            },
            computed_show: function () {
                var refdateStr = `${this.refdate}_change`;
                ;
                if (!VUECFG.viewStatu) {
                    return (this.info.ds_ispro && !this.info.ds_show) ? "y-hide" : "y-show";
                } else {
                    if (this.info.ds_showCondition) {
                        var str = $DS.util.replace(this.info.ds_showCondition);
                        return (eval(str)) ? "y-show" : "y-hide";
                    }
                    return (this.info.ds_show) ? "y-show" : "y-hide";
                }
            },
            computed_marginleft: function () {
                return {
                    "width": "100%",
                    "marginLeft": "0rem"
                }
            },
            computed_isrequired: function () {
                return (this.info.ds_isrequired) ? "ds_isrequired" : "";
            },
            computed_gridname: function () {
                if (!VUECFG.viewStatu) return this.info.ds_ctrlname;
                return "";
            },
            computed_outerstyle: function () {
                var stylePro = {
                    "padding": this.info.ds_out_padding,
                    "margin": this.info.ds_out_margin,
                }
                return stylePro;
            },
            computed_Ts: function () {
                if (!VUECFG.viewStatu) {
                    return {
                        height: "0rem"
                    }
                }
            },
            computed_Bs: function () {

                return "calc(100% - " + this.computedTableHeight() + "rem)"
            },
            computed_id: function () {
                return this.info.ds_id + "_grid"
            },
            computed_positionid: function () {//引入外部控件操作表格的定位 div
                return this.info.ds_id + "_position"
            },
            computed_sum: function () {//合计行

                if (this.info.ds_showsum) {
                    this.$nextTick(function () {
                        var rNum = $grid.level * 2.5 + 2.5;
                        $("#" + this.info.ds_id).find(".el-table__body-wrapper").height("calc(100% - " + rNum + "rem)");
                        this.$refs.multipleTable.doLayout();
                    });
                }
                return this.info.ds_showsum;
            },
            computed_TBHeight: function () {

                var sumH = this.computedTableHeight();
                return "calc(100% - " + sumH + "rem)"
            },
            computed_showHead: function () {
                // if (this.info.ds_enablesearch || (this.info.ds_isedit && this.info.ds_showeditbutton)) {//取消搜索栏，不显示头
                if (this.info.ds_isedit && this.info.ds_showeditbutton) {
                    return true
                } else
                    return false
            },
            computed_indexFixed: function () {

                if (this.info.ds_fixed_cols_left && this.info.ds_fixed_cols_left.length > 0) {
                    return "left";
                } else {
                    return false;
                }
            },

            computed_shworownumber: function () {
                this.$nextTick(function () {
                    this.$refs.multipleTable.doLayout();
                })
                return this.info.ds_showrownumbers;
            },
            computed_expend: function () {
                if (this.info.ds_expendCols.length > 0) {
                    return "expendStyle";
                }
                return "";
            },

            computed_Style: function () {
                let a = this.refshStyle;
                a++;
                //表头样式
                var headHeight = this.info.ds_grid_head_height;
                //表格体样式
                var isShowCrosswiseBorder = this.info.ds_grid_isShowCrosswiseBorder;
                //合计行
                this.setSumRowStyle(this.info);
                this.$nextTick(function () {
                    //表头行高
                    $("#" + this.info.ds_id + " th .cell").each(function () {
                        $(this).css("height", headHeight);
                    });
                    //单元格边框设置
                    if (isShowCrosswiseBorder) {
                        $("#" + this.info.ds_id + " td").each(function () {
                            $(this).css("border-bottom", "1px dotted #a8d0e6");
                        })
                    } else {
                        $("#" + this.info.ds_id + " td").each(function () {
                            $(this).css("border-bottom", "0px");
                        })
                    }
                });
                return {}
            },
            computed_isShowHeader: function () {
                this.$nextTick(function () {
                    this.$refs.multipleTable.doLayout();
                });
                return this.info.ds_grid_show_header;
            },
            computed_indexWidth: function () {

                if (this.info.ds_index_width && this.info.ds_index_width.indexOf("%") != -1) {
                    return "";
                }
                if (this.info.ds_index_width && this.info.ds_index_width.indexOf("rem") != -1) {
                    let srceenWidth = document.documentElement.clientWidth || document.body.clientWidth;
                    return (((srceenWidth / 1140) < 1) ? 1 : (srceenWidth / 1140)) * 12 * this.info.ds_index_width.split("rem")[0] + 'px';
                } else if (this.info.ds_index_width) {
                    return this.info.ds_index_width;
                } else {
                    return "50"
                }
            },
            computed_indexPerWidth: function () {

                if (this.info.ds_index_width && this.info.ds_index_width.indexOf("%") != -1) {
                    return this.info.ds_index_width;
                } else {
                    return "";
                }
            },
            computed_indexStyle: function () {
                return {}
            }
        },
        methods: {
            //------事件-----------
            changeCurrId: changeCurrId,//点击事件
            mouseOver: ctrlMouseOver,//复制删除按钮鼠标移出入
            mouseLeave: ctrlMouseLeave,//复制删除按钮鼠标移出
            cellClick: cellClick,//单元格点击事件
            clickGridRow: clickGridRow,//行点击事件
            selectRow: selectRowEvent,//行选择事件
            selectionChange: selectionChangeEvent,//当选择项发生变化时会触发该事件
            rowContextmenu: rowContextmenu,//当某一行被鼠标右键点击时会触发该事件
            //loseInputFcous: loseInputFcous,//单元格输入框失去焦点事件,
            headerContextmenu: headerContextmenu,//鼠标右键列表头事件
            positionClick: positionClick,//外部控件调用当前表格实例的 点击触发方法
            sortChange: sortChange,
            //------分页------------
            handleSizeChange: handleSizeChange,//每页条数切换
            handleCurrentChange: handleCurrentChange,//页码切换
            currentChangePage: currentChangePage, //分页切换事件
            //------方法-----------
            getSelectRows: getSelectRows,//获取选中行
            rowClassName: rowClassName,//行的 className 的回调方法
            setTableRowStyle: setTableRowStyle,//设置行样式
            setTableCellStyle: setTableCellStyle, //自定义统一设置表格样式
            setHeaderRowStyle: setHeaderRowStyle,//设置表头样式
            setHeaderCellStyle: setHeaderCellStyle,//设置表头单元格样式
            custColSum: custColSum,//自定义汇总方法
            updateFu: updateFu,//子组件更新父组件数据,触发方法
            search: search,//关键字搜索
            setAllEditRows: setAllEditRows,//获取操作过的行数据 用于保存
            editSave: editSave,//编辑保存事件
            insertEditRow: insertEditRow,
            deleteEditRow: deleteEditRow,
            clearAllEditRows: clearAllEditRows,//清空编辑过的行数据
            reLoadGrid: reLoadGrid,//重新渲染表格
            computedTableHeight: computedTableHeight,//计算tableHeight
            selectColBySource: selectColBySource,//表格根据数据源选择字段
            checkRowSelection: checkRowSelection,//设置多选表格勾选
            clearAllCheck: clearAllCheck,//清空多选表格的勾选
            Selectable: Selectable,// 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选	Function(row, index)
            getAllGridData: getAllGridData,//获取表格所有数据
            computed_rowKey: computed_rowKey,//设置row-key
            objectSpanMethod: objectSpanMethod,//合并行列
            showSummariesPosition: showSummariesPosition,//合计行位置设置
            setSumRowStyle: setSumRowStyle,//合计行样式
            computed_expendStyle: computed_expendStyle,//展开行样式
            setOneRowDataByIndex: setOneRowDataByIndex,//设置表个某一行数据
            expendTreeGridNode: expendTreeGridNode,//设置展开
            clearCheckNodeForOut: clearCheckNodeForOut,//清除单选表格选中行
            //setDefaultValueForSR: setDefaultValueForSR
        },
        watch: {
            computed_sum(val) {

                if (val) {
                    //一级表格 -5rem 二级表格 -7.5rem 三级 -10rem  每多一级增加2.5rem
                    var rNum = $grid.level * 2.5 + 2.5;
                    $("#" + VUECFG.ctrlId).find(".el-table__body-wrapper").height("calc(100% - " + rNum + "rem)");
                } else
                    $("#" + VUECFG.ctrlId).find(".el-table__body-wrapper").height("calc(100% - 2.5rem)");
            },
            computed_columns(val) {//如果数据源发生改变 ,手动重置组件,清空缓存
                this.hackReset = false//定义方法，调动让他销毁掉
                this.$nextTick(() => {
                    this.hackReset = true
                })
            },
            computed_TBHeight(newval, oldval) {
                //对表格高度做监听

            },

        },
        template: util.getModelHtml("drag_grid"),
    })

    //注册 my_column 表格列递归子组件
    Vue.component('my-column', {
        props: ["col", "info", "currColField", "currRowIndex", "currScope", "columns"],
        // props: {col: {type: Object, default: () => ({})}, info: {type: Object, default: () => ({})},currColField: {type: String, default: ""},currRowIndex: {type: Number, default: -1}},
        data() {
            return {}
        },
        computed: {
            //子组件绑定的值 主要用于处理开关 单选 等的默认值

            computed_fieldShowType: function () {
                if ((this.col.fieldShowType == "hidden" || this.col.fieldShowType == "none") && !this.col.isexpend) {
                    return false;
                }
                return true;
            },
            computed_datePicker: function () {
                let _this = this;
                return {
                    disabledDate(time) {
                        if (_this.col.disableddate && _this.col.disableddate !== 'none') {
                            switch (_this.col.disableddate) {
                                case 'prv':
                                    return time.getTime() < Date.now();
                                    break;
                                case 'next':
                                    return time.getTime() > Date.now();
                                    break;
                                case 'prvByField':
                                    if (!_this.col.disableddatefield) {
                                        console.error(`日期列${_this.currColField}未设置关联字段`)
                                    } else if (_this.currScope.row[_this.col.disableddatefield]) {
                                        return time.getTime() < new Date(_this.currScope.row[_this.col.disableddatefield])
                                    }
                                    break;
                                case 'nextByField':
                                    if (!_this.col.disableddatefield) {
                                        console.error(`日期列${_this.currColField}未设置关联字段`)
                                    } else if (_this.currScope.row[_this.col.disableddatefield]) {
                                        return time.getTime() > new Date(_this.currScope.row[_this.col.disableddatefield])
                                    }
                                    break;
                            }
                        }
                    }
                };
            }
        },

        methods: {
            cellValChange: cellValChange,//单元格 值变更事件
            loseInputFcous: loseInputFcous,//单元格输入框失去焦点事件,
            getInputFocus: getInputFocus,//单元格获取焦点事件
            cellInput: cellInput,//单元格input事件
            loseDateFocus: loseDateFocus,//日期框失去焦点事件
            getDateFocus: getDateFocus,//日期获取焦点
            cellFormat: cellFormat, //单元格内容格式化
            cellVisibleChange: cellVisibleChange, //下拉列表展开和隐藏时触发事件
            computed_treeGridIsedit: computed_treeGridIsedit,//多选表格时 且为层级 仅末级节点可编辑时
            computed_rowIsEditor: computed_rowIsEditor,//行不可编辑条件
            renderHeader: renderHeader,//渲染行头
            computed_dateFormat: computed_dateFormat,//日期的格式化
            //引用数据
            computed_options: filterOptionsByRow,//过滤引用数据
            isShowEditComp: isShowEditComp,//可编辑状态下 是否显示为对应组件
            cellWidthWithTreegrid: cellWidthWithTreegrid,//处理树形表格首列箭头引起的样式问题
        },
        template: util.getModelHtml("my_column")
    })

    //右键菜单
    Vue.component('my_rowcontextmenu', {
        props: ["info"],
        data() {
            return {
                menuVisible: false,
            }
        },
        computed: {
            computed_menuItem: function () {
                return [
                    {type: "beforeInsert", title: "向前插入行", icon: "el-icon-upload2"},
                    {type: "afterInsert", title: "向后插入行", icon: "el-icon-download"},
                    {type: "childInsert", title: "添加子节点", icon: "el-icon-s-unfold"},
                    {type: "del", title: "删除行", icon: "el-icon-delete"},
                ]
            }
        },
        methods: {
            getContextMenu:getContextMenu,
            closeRowContextMenu(clear) {

                //关闭菜单
                this.menuVisible = false;
                if (clear) {
                    //清除数据
                    this.$parent.contextMenuCurCol = null;
                    this.$parent.contextMenuCurRow = null;
                }
                // 及时关掉监听
                document.removeEventListener('click', this.closeRowContextMenu);
            },
            contextMenuClick: contextMenuClick,//菜单选项点击事件
            rowContextmenu_del: rowContextmenu_del,//删除行
            rowContextmenu_insert: rowContextmenu_insert,//插入行
        },
        template: util.getModelHtml("my_rowcontextmenu")
    })
}


function computed_dateFormat(col) {

    if (col.fieldType == "008") {
        return col.date_formater ? col.date_formater : "yyyy-MM-dd";

    } else if (col.fieldType == "009") {
        return col.date_formater ? col.date_formater : "yyyy-MM-dd HH:mm:ss";
    } else {
        return "yyyy-MM-dd HH:mm:ss";
    }
}


//展开行样式
function computed_expendStyle(item) {
    return {width: item.expendWidth}
}

//修改合计行位置
function showSummariesPosition(info, val, doLayout) {

    if (!info.ds_showsum) {
        return;
    }
    var factVal = "";
    if (val) {
        factVal = val;
    } else {
        factVal = info.ds_grid_SummarPostion;
    }
    const table = document.querySelector('#' + info.ds_id + ' .customTable');  // customTable这个是在el-table定义的类名
    const footer = document.querySelector('#' + info.ds_id + ' .customTable .el-table__footer-wrapper');
    const body = document.querySelector('#' + info.ds_id + ' .customTable .el-table__body-wrapper');


    if (factVal == "top") {
        table.insertBefore(footer, body); // 把合计行插入到表格body的上面
        //开启了固定列
        this.$nextTick(function () {
            if (info.ds_fixed_cols_left.length > 0 || info.ds_fixed_cols_right.length > 0) {
                var headHeight = $('#' + info.ds_id + ' .customTable .el-table__fixed-header-wrapper').css("height");
                var footHeight = $('#' + info.ds_id + ' .customTable .el-table__fixed-footer-wrapper td .cell').css("height");
                var top = $DS.util.add(headHeight.split("px")[0], footHeight.split("px")[0]);
                $('#' + info.ds_id + ' .customTable .el-table__fixed-footer-wrapper').css("top", headHeight);
                setTimeout(function () {
                    $('#' + info.ds_id + ' .customTable .el-table__fixed-body-wrapper').css("top", top + "px");
                })

            }
            if (doLayout) {
                this.$refs.multipleTable.doLayout();
            }
        });
    } else {
        table.insertBefore(body, footer);
    }
    this.setSumRowStyle(info);
}


//设置合计行样式
function setSumRowStyle(info) {

    //合计行样式
    var sumrowHeight = info.ds_sumrow_height;//合计行行高
    var sumrowBackgroundColor = info.ds_sumrow_backgroundColor;//合计行背景色
    var sumrowFontSize = info.ds_sumrow_fontSize;//合计行字体颜色
    var sumrowFontColor = info.ds_sumrow_fontColor;//合计行字体大小
    //合计行
    this.$nextTick(function () {
        $("#" + info.ds_id + " .el-table__footer-wrapper .cell").each(function () {
            $(this).css("height", sumrowHeight).css("line-height", sumrowHeight).css("background-color", sumrowBackgroundColor).css("color", sumrowFontColor).css("font-size", sumrowFontSize);
        });
        //固定列
        $("#" + info.ds_id + " .el-table__fixed-footer-wrapper .cell").each(function () {
            $(this).css("height", sumrowHeight).css("line-height", sumrowHeight).css("background-color", sumrowBackgroundColor).css("color", sumrowFontColor).css("font-size", sumrowFontSize);
        });
    })
}

function renderHeader(h, para) {

    return h('div', {
        attrs: {
            class: 'center breakcell',
        },
        domProps: {
            innerHTML: para.column.label
        }
    })
}


//获取列信息对象
function getColObj(id) {
    if (!temporary.gridColsObj) temporary.gridColsObj = {};
    var cols = temporary.gridCols[id];
    if (!temporary.gridColsObj[id]) {
        temporary.gridColsObj[id] = {};
        for (var c = 0; c < cols.length; c++) {
            temporary.gridColsObj[id][cols[c].prop] = cols[c];
        }
    }
    return temporary.gridColsObj[id];
}


/**
 *  合并单元格
 * @param row
 * @param column
 * @param rowIndex
 * @param columnIndex
 */
function objectSpanMethod({row, column, rowIndex, columnIndex}) {

    //映射列信息
    if (!temporary.gridColsObj) temporary.gridColsObj = {};
    var cols = temporary.gridCols[this.info.ds_id]
    if (!temporary.gridColsObj[this.info.ds_id]) {
        temporary.gridColsObj[this.info.ds_id] = {};
        for (var c = 0; c < cols.length; c++) {
            temporary.gridColsObj[this.info.ds_id][cols[c].prop] = cols[c];
        }
    }
    var colObj = temporary.gridColsObj[this.info.ds_id];
    //单元格span信息
    var spanObj = {
        rowspan: 1,
        colspan: 1
    };
    //处理列合并
    if (colObj[column.columnKey] && colObj[column.columnKey].ISMERGECOL) {
        spanObj.rowspan = getGridRowSpan(this, {
            row,
            column,
            rowIndex,
            columnIndex,
            "columnObj": colObj[column.columnKey]
        });
    }
    return spanObj;
}

/**
 * 合并列
 */
function getGridRowSpan(vue, obj) {
    obj = $DS.util.clone(obj);
    if (!temporary.gridSpan || !temporary.gridSpan[vue.info.ds_id] || !temporary.gridSpan[vue.info.ds_id][obj.column.columnKey]) {
        $DS.util.setObjVal(temporary, ["gridSpan", vue.info.ds_id, obj.column.columnKey], 1)
    }
    if (temporary.gridSpan[vue.info.ds_id][obj.column.columnKey] > 1) {
        temporary.gridSpan[vue.info.ds_id][obj.column.columnKey]--;
        return 0;
    } else {
        var data = vue.getAllGridData();
        while (data[obj.rowIndex + 1] && (data[obj.rowIndex][obj.column.columnKey] === data[obj.rowIndex + 1][obj.column.columnKey]) && obj.rowIndex < data.length) {
            obj.rowIndex++;
            temporary.gridSpan[vue.info.ds_id][obj.column.columnKey]++;
        }
        return temporary.gridSpan[vue.info.ds_id][obj.column.columnKey];
    }
}

/**
 * 设置row-key
 * @param r
 * @returns {*}
 */
function computed_rowKey(row) {
    return this.info.ds_row_key ? row[this.info.ds_row_key] : (this.info.ds_row_id ? row[this.info.ds_row_id] : row.index);
}

/**
 * 行不可编辑条件
 * @param scop
 * @returns {boolean}
 */
function computed_rowIsEditor(scop) {
    if (this.info.ds_row_CannotEditorCondition) {
        let row = scop.row;
        return eval(this.info.ds_row_CannotEditorCondition) ? false : true;
    }
    return true;
}

/**
 * 多选表格时 且为层级 仅末级节点可编辑时
 * @param scop
 */
function computed_treeGridIsedit(scop) {

    if (this.info.ds_tree_grid && this.info.ds_tree_grid_onlyEditEnd && scop.row.children && scop.row.children.length > 0) {
        return false;
    }
    return true;
}

/**
 * 计算tableHeight
 */
function computedTableHeight() {
    //考虑搜索框和分页插件的高度 ,之后如果还有影响table高度的变量 ,往下追加即可
    //var sh = (this.info.ds_enablesearch || (this.info.ds_isedit && this.info.ds_showeditbutton)) ? 3 : 0;//取消搜索栏
    var sh = (this.info.ds_isedit && this.info.ds_showeditbutton) ? 3 : 0;//编辑栏
    var ph = this.info.ds_pagination ? 3 : 0;//分页

    var sumH = sh + ph;

    this.$nextTick(function () {
        $("#" + this.computed_id).height("calc(100% - " + sumH + "rem)")
    });
    return sumH;
}


/*
单选表格清除选中行 并清除推送的参数
 */
function clearCheckNodeForOut() {
    this.$refs.multipleTable.setCurrentRow();
    if (this.info.ds_param) {
        $DS.putPms(this.info.ds_param, "");
    }
}


//展开节点
function expendTreeGridNode(ctrl, nodeIds) {

    this.$nextTick(function () {
        if (nodeIds) {
            ctrl.ds_expand_row_keys = nodeIds;
            return;
        }
        ctrl.ds_expand_row_keys = [];

        var rowKey = ctrl.ds_row_key ? ctrl.ds_row_key : (ctrl.ds_row_id ? ctrl.ds_row_id : "index");
        //默认展开第一个节点
        if (ctrl.ds_expandFirst && ctrl.ds_tree_grid && ctrl.ds_grid && ctrl.ds_grid.length > 0) {
            var key = ctrl.ds_grid[0][rowKey];
            ctrl.ds_expand_row_keys.push(key);
            //表格第一次加载 设置默认选中 并推参数 或 未开启刷新表格选中上次所选行
            if (!temporary.loadRegister || !temporary.loadRegister[this.info.ds_id] || !this.info.ds_grid_isCurrentRow_reload) {
                //$grid.setCheckedNodes(this.info.ds_id, key, true);
                this.$refs.multipleTable.setCurrentRow(ctrl.ds_grid[0]);
                if (!this.currScope) {
                    this.currScope = {};
                }
                this.currScope["row"] = ctrl.ds_grid[0];
                temporary[this.info.ds_id + "_tempDataForReload"] = [ctrl.ds_grid[0]];
            }

        }
        //默认展开所有节点
        if (ctrl.ds_expandAll && ctrl.ds_tree_grid && ctrl.ds_grid && ctrl.ds_grid.length > 0) {
            let data = $DS.util.childrenToList(ctrl.ds_grid, "children", []);
            ctrl.ds_expand_row_keys = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].children && data[i].children.length > 0) {
                    ctrl.ds_expand_row_keys.push(data[i][rowKey]);
                }
            }
        }
        //this.reLoadGrid(this.info.ds_id, this)
    })

}


/**
 * 构建列信息
 * @param info
 */

function buildColumns(info) {

    var fieldInfo = info.ds_fieldinfo;
    var cols = [];  //列数据
    var columns = [];
    info.ds_expendCols = [];
    //ds_columns  不为string 不为空 ; ds_selectcolumns为空 使用原始列信息构造列
    if (info.ds_datasource && info.ds_columns && !$DS.util.isString(info.ds_columns) && info.ds_columns.length > 0 && (!info.ds_selectcolumns || info.ds_selectcolumns.length === 0)) {
        columns = info.ds_columns;
    }

    //ds_columns  不为string 不为空 ; ds_selectcolumns不为空 使用ds_selectcolumns构造列
    else if (info.ds_datasource && info.ds_columns && !$DS.util.isString(info.ds_columns) && info.ds_columns.length > 0 && info.ds_selectcolumns && info.ds_selectcolumns.length > 0) {
        columns = info.ds_selectcolumns;
    }
    //ds_columns  为string 手工录入 将ds_selectcolumns置空
    else if (!info.ds_datasource && info.ds_columns && $DS.util.isString(info.ds_columns)) {
        //info.ds_selectcolumns = [];
        columns = JSON.parse(info.ds_columns);
    } else {
        return [];
    }
    var zdycol = [];
    //构造列
    for (let i = 0; i < columns.length; i++) {
        var fieldName = columns[i].FIELD_NAME;
        var oneInfo = fieldInfo[fieldName];
        if (!oneInfo) zdycol.push(fieldName);
        var perWidth = "";
        if (columns[i].SHOW_WIDTH && columns[i].SHOW_WIDTH.indexOf("%") != -1) {
            perWidth = columns[i].SHOW_WIDTH;
        }

        var addThousands = false;
        if (columns[i].ADD_THOUSANDS !== undefined && columns[i].ADD_THOUSANDS !== null) {
            addThousands = columns[i].ADD_THOUSANDS;
        } else if (oneInfo && (oneInfo.FIELD_TYPE == "001" || oneInfo.FIELD_TYPE == "002")) {
            addThousands = true;
        }
        var col = {
            id: columns[i].FIELD_NAME,
            prop: columns[i].FIELD_NAME,
            label: columns[i].FIELD_NAMECN,//"换行\n测试",
            width: perWidth ? "" : columns[i].SHOW_WIDTH,
            perwidth: perWidth ? perWidth : "",
            isexpend: columns[i].ISEXPEND == undefined ? false : columns[i].ISEXPEND,//展开行
            expendWidth: columns[i].EXPENDWIDTH == undefined ? "100%" : columns[i].EXPENDWIDTH,
            ISMERGECOL: columns[i].ISMERGECOL == undefined ? false : columns[i].ISMERGECOL,//展开行
            isedit: columns[i].isedit == undefined ? true : columns[i].isedit,//是否可编辑
            fieldShowType: columns[i].SHOW_COMPONENT ? columns[i].SHOW_COMPONENT : (oneInfo ? oneInfo.SHOW_COMPONENT : ""),    //'input' 'select' 字段编辑时显示方式
            fieldType: columns[i].FIELD_TYPE ? columns[i].FIELD_TYPE : (oneInfo ? oneInfo.FIELD_TYPE : ""),//字段类型 001 整型  003 字符型
            align: columns[i].ALIGNTYPE ? columns[i].ALIGNTYPE : (oneInfo ? oneInfo.ALIGNTYPE : ""),//文字位置
            fieldDeclength: columns[i].FIELD_DECLENGTH ? columns[i].FIELD_DECLENGTH : (oneInfo ? oneInfo.FIELD_DECLENGTH : ""),//oneInfo ? oneInfo.FIELD_DECLENGTH : '',//小数位数
            isBDCol: oneInfo ? oneInfo.ISBDCOL : '',  //是否绑定列
            bdFiledName: oneInfo ? oneInfo.BDFIELDNAME : '',//绑定字段名
            bdShowFiledName: oneInfo ? oneInfo.BDSHOWFIELDNAME : '',//绑定显示字段名
            fixed: columns[i].fixed ? columns[i].fixed : false,//固定列
            defaultVal: columns[i].DEFAULT_VALUE ? columns[i].DEFAULT_VALUE : "",//缺省值

            addThousands: addThousands,//是否添加千分符
            issum: columns[i].ISSUM ? columns[i].ISSUM : (oneInfo ? oneInfo.ISSUM : "0"),//是否为合计列
            superFieldName: columns[i].SUPERFIELD_NAME ? columns[i].SUPERFIELD_NAME : (oneInfo ? oneInfo.SUPERFIELD_NAME : ''),  //上级字段名
            customHtml: columns[i].CUSTOMHTML ? columns[i].CUSTOMHTML : false,//自定义html
            fk_filter_sql: columns[i].FK_FILTER_SQL ? columns[i].FK_FILTER_SQL : null,//引用数据过滤条件 查询引用时的sql
            fk_filter_rowdata: columns[i].FK_FILTER_ROWDATA ? columns[i].FK_FILTER_ROWDATA : null,//根据行条件过滤引用数据
            checkregular: columns[i].CHECKREGULAR ? columns[i].CHECKREGULAR : null,//值变更正则校验
            /*日期列相关*/
            dateType: columns[i].DATETYPE ? columns[i].DATETYPE : "datetime",  //上级字段名
            date_formater: columns[i].DATE_FORMATER ? columns[i].DATE_FORMATER : "",//日期格式化
            disableddate: columns[i].DISABLEDDATE ? columns[i].DISABLEDDATE : '',//禁用范围
            disableddatefield: columns[i].DISABLEDDATEFIELD ? columns[i].DISABLEDDATEFIELD : '',//禁用范围关联字段
        };
        //显示控件 优先取数据源中的字段信息
        let conditions = ['none', 'hidden', ''];
        if (!conditions.includes(col.fieldShowType) && oneInfo && !conditions.includes(oneInfo.SHOW_COMPONENT) && oneInfo.SHOW_COMPONENT != col.fieldShowType) {
            col.fieldShowType = oneInfo.SHOW_COMPONENT;
            col.fieldType = oneInfo.FIELD_TYPE;
            columns[i].SHOW_COMPONENT = oneInfo.SHOW_COMPONENT;
            columns[i].FIELD_TYPE = oneInfo.FIELD_TYPE;
        }

        if (fieldInfo[col.prop] && VUECFG.viewStatu) {
            var dataSource = $DS.getSourceById(info.ds_datasource);
            var appId = dataSource.appId ? dataSource.appId : VUECFG.appId;
            var flag = buildColOptions(col, fieldInfo, appId);
            if (flag === false) {
                return false;
            }
        }
        cols.push(col);
    }
    cols = setColsWidth(cols, info);
    cols = setExpendCols(cols, info);
    cols = setTitleCol(cols, fieldInfo);
    cols = getLevelCols(cols, info);
    return cols;
}

//设置展开行
function setExpendCols(cols, info) {
    var newCols = [];
    for (let i = 0; i < cols.length; i++) {
        var col = cols[i];
        if (!col.isexpend) {
            newCols.push(col);
        } else {
            info.ds_expendCols.push(col);
        }
    }
    return newCols;
}

//设置列宽
function setColsWidth(cols, info) {
    for (let i = 0; i < cols.length; i++) {
        var col = cols[i];
        if (col.width && col.width.indexOf("rem") != -1) {
            let srceenWidth = document.documentElement.clientWidth || document.body.clientWidth;
            col.width = (((srceenWidth / 1140) < 1) ? 1 : (srceenWidth / 1140)) * 12 * col.width.split("rem")[0] + 'px';
        }
    }
    return cols;
}

/**
 * 构建列信息的options
 */
function buildColOptions(col, fieldInfo, appId) {
    //todo 设置引用数据过滤条件 同时添加根据行数据过滤引用数据
    var fieldType = col.fieldType;
    var isTree = col.fieldShowType === "tree" ? true : false;
    //单选引用和多选引用
    if (fieldType === '006' || fieldType === '011') {
        var fk_tableName = fieldInfo[col.prop].FK_TABLENAME //关联外键表
        var fk_fieldName = fieldInfo[col.prop].FK_FIELDNAME //关联外键字段
        var fk_txtName = fieldInfo[col.prop].FK_TXTNAME    //关联显示字段
        var fk_filter = fieldInfo[col.prop].FK_FILTER   //引用条件
        var fk_filter2 = fieldInfo[col.prop].FK_FILTER2   //引用条件

        var selectColumns = [fk_fieldName, fk_txtName];
        //引用数据过滤条件
        var colSqlFilter = col.fk_filter_sql ? $DS.util.replace(col.fk_filter_sql) : null;
        var result = $DS.selectRefFiled(appId, fieldInfo[col.prop], fk_txtName, fk_fieldName, false, isTree, false, colSqlFilter);
        if (result.isError) {
            console.error("【" + col.label + "】 列引用数据获取失败! 失败原因:" + result.errMsg);
            col["options"] = [];
        } else {
            result = result.result;
        }
        var options = [];
        if (result && !isTree) {
            //var rows = result.rows;
            for (let i = 0; i < result.length; i++) {
                var option = {value: result[i][fk_fieldName], label: result[i][fk_txtName]};
                options.push(option);
            }
        } else {
            options = result;
        }

        col.isMultiple = fieldType === '011' ? true : false;//是否多选
        col.options = options;
    }
}

//设置标题列
function setTitleCol(cols, fieldInfo) {
    //是否为标题列
    for (let i = 0; i < cols.length; i++) {
        var oneInfo = fieldInfo[cols[i].id];
        if ((!oneInfo || oneInfo.FIELD_TYPE == "004") && hasChildrenCol(cols[i], cols)) {
            cols[i]["isTitle"] = true;
        } else {
            cols[i]["isTitle"] = false;
        }
    }
    return cols;
}

//判断当前列是否有子列
function hasChildrenCol(curCol, cols) {
    for (let i = 0; i < cols.length; i++) {
        if (curCol.prop == cols[i].superFieldName) {
            return true;
        }
    }
    return false;
}

/**
 * 获取层级列信息
 */
function getLevelCols(cols, info) {
    $grid.level = 1;
    var newCols = [];//设置给表格的列
    var realCols = [];//真实有数据非标题列的列
    for (let i = 0; i < cols.length; i++) {
        cols[i].level = 1;
        if (cols[i].isTitle && cols[i].superFieldName === '#') {//一级标题列字段
            cols[i].align = 'center';
            buildChildrenCol(cols[i], cols);
        } else if (!cols[i].isTitle) {//非标题列 真实数据字段
            realCols.push(cols[i]);
        }

        if (hasTitleCol(cols[i], cols)) {//当前字段在选择字段中有其标题列
            continue;
        }

        newCols.push(cols[i]);
    }
    info.ds_realcols = realCols;
    return newCols;
}

function buildChildrenCol(curCol, cols) {
    var children = [];
    for (let c = 0; c < cols.length; c++) {
        if (cols[c].superFieldName === curCol.prop) {
            cols[c].level = curCol.level + 1;
            //设置最大层级
            $grid.level = cols[c].level > $grid.level ? cols[c].level : $grid.level;
            if (cols[c].isTitle) {
                cols[c].align = 'center';
                buildChildrenCol(cols[c], cols);
            }
            children.push(cols[c]);
        }
    }
    if (children.length > 0)
        curCol.children = children;

}

/**
 * 判断当前字段在选择字段中有没有其标题列
 * @param currCol
 * @param cols
 */
function hasTitleCol(currCol, cols) {
    for (let i = 0; i < cols.length; i++) {
        if (cols[i].isTitle && currCol.superFieldName === cols[i].prop)
            return true;
    }
    return false;
}

/**
 * 行点击事件 || 行变更事件
 * @param row
 * @param column
 * @param event
 */
function clickGridRow(row, column, event) {

    this.getIndex = row.index;
    if (this.info.ds_isedit)
        this.currRowIndex = row.index;
    var info = this.info;
    temporary[info.ds_id + "_tempDataForReload"] = row.treegrid_ischecked ? this.getSelectRows(row) : this.getSelectRows();
    //开启复选框 且开启点击行勾选复选框属性,点击行则复选框勾选或取消此行
    if (info.ds_showcheckbox && info.ds_tree_grid && info.ds_grid_clickRowSelectCheckbox) {
        var arr = [];
        arr.push(row[info.ds_row_key]);
        this.checkRowSelection(arr);
    } else if (info.ds_showcheckbox && info.ds_grid_clickRowSelectCheckbox) {
        this.$nextTick(function () {
            this.$refs.multipleTable.toggleRowSelection(row, row.treegrid_ischecked);
        })
        row.treegrid_ischecked = !row.treegrid_ischecked;
    }

    //自定义函数
    $DS.eval(info.ds_grid_row_click, info, row);
    if (!temporary["gridOldRow"]) {
        temporary["gridOldRow"] = {};
    }
    if (row != temporary["gridOldRow"][info.ds_id]) {//行变更事件
        $DS.eval(info.ds_rowchange, info, row);
        temporary["gridOldRow"][info.ds_id] = row;
    }
    //开启复选框 且未开启点击行勾选复选框 不推参数
    if (info.ds_showcheckbox && !info.ds_grid_clickRowSelectCheckbox) {
    }
    //推送参数
    else $DS.dealPms(this.info, row.treegrid_ischecked ? this.getSelectRows(row) : this.getSelectRows());
    //触发其他控件刷新数据
    if (info.ds_trigger && info.ds_trigger.length > 0) {
        triggerComps(info.ds_trigger, $DS.getCtrlType(info.ds_id));
    }
}

/**
 * 行选择事件 当前选择的某一行
 * @param selection 所有选择的行
 * @param row       当前选中的行
 */
function selectRowEvent(selection, row) {

    var info = this.info;
    if (!this.info.ds_ispro) {
        changeCurrId({currentTarget: $(`#${info.ds_id}`)[0], id: info.ds_id})
    }
    $DS.dealPms(info, selection);
    //自定义函数 行选择事件
    var res = $DS.eval(info.ds_gridselect, info, {selection, row});
    if (!res) return false;
    if (info.ds_tree_grid) {
        var rowKey = info.ds_row_key ? info.ds_row_key : "index";
        var arr = [];
        arr.push(row[rowKey]);
        this.checkRowSelection(arr);
    } else {
        row.treegrid_ischecked = !row.treegrid_ischecked;
    }
}


/**
 * 当选择项发生变化时会触发该事件
 * @param selection 所有选择的行
 */
function selectionChangeEvent(selection) {
    var info = this.info;
    info.ds_selectRows = selection;
    //自定义函数 行选择变更事件
    $DS.eval(info.ds_gridselectChange, info, selection);

}


/**
 * 单元格点击事件
 */
function cellClick(row, column, cell, event) {

    var info = this.info;
    var flag = $DS.eval(info.ds_cellclick, info, {row, column, cell, event});
    if (!flag) {
        return flag;
    }
    this.currColField = column.columnKey
    if (info.ds_isedit)
        row.seen = true;
    console.log("单元格点击:", row);
    this.currScope = {//记录当前数据==>用于传递给子组件使用
        column: column, row: row, $index: row.index, val: row[column.columnKey]
    }
    this.$nextTick(function () {
        if (info.ds_isedit) {//如果是编辑模式 ,输入框直接获取焦点,并绑定回车事件
            $(cell).find("input").focus();
            if ($(cell).find(".el-select").length != 0) {//下拉列表时 ,直接展开
                $(cell).find("input").click();
            }
            $(cell).find("input").keydown(function (e) {
                var curKey = e.which;
                if (curKey == 13) {
                    $(cell).find("input").blur();
                    row.seen = false;
                }
            });
        }
    });
}

/*
当某一行被鼠标右键点击时会触发该事件
 */
function rowContextmenu(row, column, event) {
    debugger
    var info = this.info;
    var flag = $DS.eval(info.ds_grid_rowContextmenu, info, {row: row, col: column, event: event});
    if (!flag) {
        return flag;
    }
    this["contextMenuCurRow"] = row;
    this["contextMenuCurCol"] = column;
    //打开菜单
    if (info.ds_grid_isOpenRowContextmenu) {
        event.preventDefault(); //阻止浏览器自带的右键菜单弹出
        let menu = $(`#${this.info.ds_id}_rowcontextmenu`);
        this.$refs.rowcontextmenuRef.closeRowContextMenu(false);
        this.$refs.rowcontextmenuRef.menuVisible = true;
        document.addEventListener('click', this.$refs.rowcontextmenuRef.closeRowContextMenu);
        setrowContextMenuPosition(menu, event);
    }
}

/**
 * 设置菜单显示以及位置
 * @param menu
 * @param event
 */
function setrowContextMenuPosition(menu, event) {
    let position = {
        left: event.clientX,
        top: event.clientY
    }
    //窗口宽高
    let winH = $(window).height();
    let winW = $(window).width();

    //菜单宽高
    let menuH = menu.height();
    let menuW = menu.width();

    //鼠标位置
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    if (winH - mouseY - menuH < 0) {
        position.top = winH - menuH;
    }
    if (winW - mouseX - menuW < 0) {
        position.left = winW - menuW;
    }
    menu.css("left", position.left);
    menu.css("top", position.top);
    menu.css("display", "block");
}

/**
 * 菜单点击事件
 * @param type
 */
function contextMenuClick(type) {
    debugger
    let row = this.$parent["contextMenuCurRow"];
    let col = this.$parent["contextMenuCurCol"];
    //删除行
    switch (type) {
        case "del":
            //合计行不允许后插入或删除
            if (row.isdividedSum) {
                alert("合计行不可删除!");
                return;
            }
            this.rowContextmenu_del(row, col);
            break;
        case "beforeInsert":
            this.rowContextmenu_insert(row, col, 'beforeInsert');
            break;
        case "afterInsert":
            //合计行不允许后插入或删除
            if (row.isdividedSum) {
                alert("合计行不可向后插入行!");
                return;
            }
            this.rowContextmenu_insert(row, col, 'afterInsert');
            break;
        case "childInsert" :
            if (row.isdividedSum) {
                alert("合计行不可添加子节点!");
                return;
            }
            this.rowContextmenu_insert(row, col, 'childInsert');
            break;
    }

    this.$parent.refshStyle++;
    this.$parent.$refs.multipleTable.doLayout();
    this.closeRowContextMenu(true);

}


function getContextMenu() {

}

/**
 * 菜单功能-删除行
 * @param row
 * @param col
 */
function rowContextmenu_del(row, col) {
    this.$confirm("是否确定删除该行", '提示', {type: 'warning'}).then(() => {

        var deleteRow = [];
        let rowKey = this.info.ds_row_key ? this.info.ds_row_key : (this.info.ds_row_id ? this.info.ds_row_id : "GUID");
        deleteRow = getDelAfterData(this.$parent.computed_data, [row], deleteRow, rowKey);

        if (deleteRow.length > 0) {
            if (!this.info.ds_deleteRows) {
                this.info.ds_deleteRows = [];
            }
            this.info.ds_deleteRows = this.info.ds_deleteRows.concat(deleteRow);
        }
    });
}

/**
 * 菜单功能-插入行
 * @param row
 * @param col
 * @param type 插入方式 向前插入 | 向后插入
 */
function rowContextmenu_insert(row, col, type) {
    // 新插入行 如果存在默认值 设置默认值 (cellformatter) 如果存在分层汇总 则插入到倒数第二行
    let rowKey = this.info.ds_row_key;
    let rowId = this.info.ds_row_id;
    let rowPid = this.info.ds_row_pid;
    let insertRow = {};
    insertRow[rowKey] = $DS.util.UUID().replaceAll("-", "").toUpperCase();
    insertRow['optType'] = 'inserted';
    let gridData = this.$parent.computed_data;

    //插入子集
    if (this.info.ds_tree_grid) {
        if (type == "childInsert") {
            insertRow[rowPid] = row[rowId];
        } else {
            insertRow[rowPid] = row[rowPid];
        }
        if (rowId != rowKey) {
            insertRow[rowId] = $DS.util.UUID().replaceAll("-", "").toUpperCase();
        }
    }
    rowContextmenu_insert_(gridData, type, row, rowKey, insertRow, this.info);

}

/**
 * 执行插入行
 * @param gridData
 * @param type
 * @param row
 * @param rowKey
 * @param insertRow
 * @private
 */
function rowContextmenu_insert_(gridData, type, row, rowKey, insertRow, info) {
    if (type == "childInsert") {
        if (!row.children) row.children = [];
        if (info.ds_divided_into_summary && row.children.length > 1) {
            row.children.splice(row.children.length - 1, 0, insertRow);
        } else {
            row.children.push(insertRow);
        }
    } else {
        for (let i = 0; i < gridData.length; i++) {
            if (row[rowKey] == gridData[i][rowKey]) {
                if (type == 'beforeInsert') {
                    if (i == 0) {
                        gridData.splice(0, 0, insertRow);
                    } else {
                        gridData.splice(i, 0, insertRow);
                    }
                } else if (type == 'afterInsert') {
                    gridData.splice(i + 1, 0, insertRow);
                }
                return;
            } else if (gridData[i].children) {
                rowContextmenu_insert_(gridData[i].children, type, row, rowKey, insertRow);
            }
        }
    }

}

/**
 * 子组件更新父组件数据,触发方法
 */
function updateFu(scope) {
    let info = this.info;

    if (this.info.ds_tree_grid == true) {
        let index = this.currRowIndex + 1;
        if (info.ds_ds_grid_show_header == false) {
            index = this.currRowIndex;
        }
        if (info.ds_showsum && info.ds_grid_SummarPostion == "top") {
            index++;
        }
        let cellDom = $(`.${scope.column.id}`)[index];
        let placeholderW = $(cellDom).find(".el-table__placeholder").attr("placeholderVal");
        $(cellDom).find(".el-table__placeholder").css("width", placeholderW);
        let indetnW = $(cellDom).find(".el-table__indent").attr("paddingVal");
        $(cellDom).find(".el-table__indent").css('padding-left', indetnW);
        $(cellDom).find(".el-table__expand-icon").css('display', "inline-block");
    }
    scope.row.seen = false;
    this.currRowIndex = -1;
    this.currColField = '';
    this.info.ds_isedit = false;
    this.info.ds_isedit = true;
}

//行的 className 的回调方法
function rowClassName({row, rowIndex}) {
    //把每一行的索引放进row
    row.index = rowIndex;

}

//设置表格体行样式
function setTableRowStyle({row, rowIndex}) {

    var rowStyle = {};
    //分层汇总的合计行颜色
    if (this.info.ds_divided_into_summary_rowColor && row.isdividedSum) {
        rowStyle["background-color"] = this.info.ds_divided_into_summary_rowColor;
    } else if (this.info.ds_grid_isShowStripe) {
        //隔行换色设置
        if (rowIndex % 2 == 0) {
            rowStyle["background-color"] = this.info.ds_grid_body_stripeColor;
        } else {
            rowStyle["background-color"] = this.info.ds_grid_body_rowColor;
        }
    } else {
        rowStyle["background-color"] = this.info.ds_grid_body_rowColor;
    }
    return rowStyle;
}


/**
 * 自定义统一设置表格样式
 * @param row
 * @param column
 * @param rowIndex
 * @param columnIndex
 * @returns {string}
 */
function setTableCellStyle({row, column, rowIndex, columnIndex}) {

    var cssText = "";
    var info = this.info;
    var fieldName = column.columnKey;
    if (!fieldName) return;
    var text = row[fieldName];

    /*条件格式*/
    /*条件格式优先级最高*/
    var condition = info.ds_condition;
    if (condition && condition[fieldName]) {
        var _colCondi = condition[fieldName];
        for (let i = 0; i < _colCondi.length; i++) {
            var condiItem = _colCondi[i];
            var actionField = condiItem.actionField;//条件作用字段(引用字段)
            var val = row[actionField];//条件作用字段的值
            var ranges = condiItem.ranges;
            var style = condiItem.style;
            var bgColor = '';
            if (condiItem.bgColor != '') {
                bgColor += "background-color: " + condiItem.bgColor + ";"
            }
            //条件处理器
            var handleFlag = conditionHandle(val, ranges, actionField, info);
            if (handleFlag) {
                cssText = style + bgColor;
                break;
            } else {
                cssText = setDefaultCellStyle(cssText, this.info, row);
            }
        }

    } else {
        cssText = setDefaultCellStyle(cssText, this.info, row);
    }

    /*高亮行*/
    var highRows = info.ds_highlightguids;//高亮显示行的guid
    var highRowColor = info.ds_highrowcolor;//高亮行的颜色
    if (highRows && highRows.includes(row.GUID)) {
        if (cssText.indexOf("background-color") === -1) {//当条件格式没有设置背景颜色时 高亮行背景颜色才生效 , 条件格式优先级最高
            cssText += 'background-color: ' + highRowColor + ";"
        }
    }

    return cssText;
}

//设置除条件选择选中意外的数据样式
function setDefaultCellStyle(cssText, info, row) {

    cssText = "height:" + info.ds_grid_body_height + ";";
    if (row.isdividedSum) {
        cssText += "color:" + info.ds_divided_into_summary_fontColor + ";font-size:" + info.ds_divided_into_summary_fontSize;
    } else {
        cssText += "color:" + info.ds_grid_body_fontColor + ";font-size:" + info.ds_grid_body_fontSize;
    }
    return cssText;
}


//设置表头行样式
function setHeaderRowStyle({row, rowIndex}) {
    var headRowStyle = {};
    headRowStyle["color"] = this.info.ds_grid_head_fontColor;
    return headRowStyle;
}

//设置表头单元格样式
function setHeaderCellStyle({row, rowIndex}) {

    var headCellStyle = {};
    headCellStyle["backgroundColor"] = this.info.ds_grid_head_backgroundColor;
    headCellStyle["height"] = this.info.ds_grid_head_height;
    return headCellStyle;
}


/**
 * 条件处理器
 * @param fieldValue      条件判断的 值
 * @param ranges          具体条件
 * @param actionField     当前作用字段
 * @returns {boolean} 返回是否执行
 */
function conditionHandle(fieldValue, ranges, actionField, info) {
    //当前作用字段文本类型
    var fieldInfo = info.ds_fieldinfo;
    var fieldType = (fieldInfo[actionField] && fieldInfo[actionField].FIELD_TYPE === '001') ? 'number' : 'char';
    if (fieldType === 'number')
        return handleForNumber(fieldValue, ranges, actionField, info);
    else
        return handleForChar(fieldValue, ranges);
}

/**
 * 字符类型条件处理
 * @param fieldValue
 * @param ranges
 * @returns {boolean}
 */
function handleForChar(fieldValue, ranges) {
    var handleFlag = false;
    var type = typeof fieldValue;
    var _ranges = [];
    if (ranges.indexOf(":") != -1)
        _ranges = ranges.split(":");
    else
        _ranges = [ranges + ""];

    var CTF = _ranges[0].toUpperCase();//条件判断====>标识
    var rValue = _ranges[2]; //替換值
    if (CTF == 'ALL') {//直接作用该字段所有数据
        handleFlag = true;
    } else if (type === 'string' && CTF === 'IN') { //文本包含
        if (fieldValue.indexOf(_ranges[1]) != -1)
            handleFlag = true;

    } else if (type === 'string' && CTF === 'BEGINWITH') { //以**开始
        if (fieldValue.startsWith(_ranges[1]))
            handleFlag = true;
    } else if (type === 'string' && CTF === 'ENDWITH') { //以**结束
        if (fieldValue.endsWith(_ranges[1]))
            handleFlag = true;
    } else {
        if (CTF === (fieldValue + "").toUpperCase())//精确匹配某个具体字符串 或数字
            handleFlag = true;
        if (CTF == '""' && !fieldValue) {
            handleFlag = true;
        }
    }
    return handleFlag;
}

/**
 * 数值类型条件处理
 */
function handleForNumber(fieldValue, ranges, actionField, info) {
    var handleFlag = false;
    var NRF = ranges.toUpperCase().split(":")[0];//条件标识符

    if (ranges.startsWith("[") && ranges.endsWith("]")) {
        var rangesValue = ranges.replaceAll(/\[/, "").replaceAll(/\]/, "").split(",");//预警范围
        var min = rangesValue[0];
        var max = rangesValue[1];
        var replaceValue = rangesValue[2];
        if (min == '' && max != '') {//小于
            if (fieldValue <= max)
                handleFlag = true;
        } else if (max == '' && min != '') {//大于
            if (fieldValue >= min)
                handleFlag = true;
        } else if (max == '' && min == '') {//都为空 , 直接作用该字段所有数据
            handleFlag = true;
        } else { //大于且小于
            if (fieldValue >= min && fieldValue <= max)
                handleFlag = true;
        }

    } else if (NRF == "ORDER") {//对具体第几名进行设置样式 ranges==>  order:1,2,3    -1:倒数第一
        var _orders = [];
        if (ranges.indexOf(":") != -1) {
            var r = ranges.split(":")[1];
            if (r.indexOf(",") != -1) {
                _orders = r.split(",");
            } else if (r.indexOf("前") != -1) {
                r = parseFloat(r.replace("前", ""));
                _orders = Array.from(Array(r), (v, k) => k + 1);
            } else if (r.indexOf("后") != -1) {
                r = parseFloat(r.replace("后", ""));
                _orders = Array.from(Array(r), (v, k) => -(k + 1))
            } else if (r != undefined) {
                _orders = [r];
            }

        }

        var replaceValue = ranges.split(":")[2];
        var orderData = info.ds_sortDataObj[actionField];//已排序的数据
        for (let o = 0; o < _orders.length; o++) {
            var or = parseFloat(_orders[o]);
            if (or < 0 - orderData.length || or > orderData.length || or == 0)
                continue;
            var oIndex = 0;
            if (or > 0) {
                oIndex = or - 1;
            } else {
                oIndex = orderData.length - Math.abs(or);
            }
            var odata = orderData[oIndex][actionField];
            if (fieldValue == odata)
                handleFlag = true;

        }
    } else if (NRF == "AVE") {//平均值
        // ave:more 平均值以上 ave:less 平均值以下
        var average = info.averageObj[actionField];
        var a = ranges.toUpperCase().split(":")[1];
        var rValue = ranges.toUpperCase().split(":")[2]; //替換值
        if (a == 'MORE') {
            if (fieldValue > average)
                handleFlag = true;
        } else if (a == 'LESS') {
            if (fieldValue < average)
                handleFlag = true;
        }


    } else if (NRF == "ALL") { //当输入all时 ,作用该字段全列
        handleFlag = true;
    } else {
        if (NRF == fieldValue)//当只输入一个数字 ,精确匹配
            handleFlag = true;

    }

    return handleFlag;

}


/**
 * 每页条数切换
 */
function handleSizeChange(pageSize) {
    this.info.ds_page_size = pageSize;
    this.handleCurrentChange(this.currentPage);
}

/**
 * 页码切换
 * @param currentPage 切换页
 */
function handleCurrentChange(currentPage) {

    this.currentPage = currentPage;
    this.currentChangePage(currentPage);
}

/**
 * 分页改变事件
 * @param list
 * @param currentPage
 */
function currentChangePage(currentPage) {

    let data = this.info.ds_grid;
    //如果开启关键字搜索,并且有返回数据
    if (this.info.ds_enablesearch && this.info.ds_searchdata) {
        data = this.info.ds_searchdata;
    }
    let start = (currentPage - 1) * this.info.ds_page_size;
    let end = currentPage * this.info.ds_page_size;
    var tempList = [];
    this.info.ds_pagecount = 0;
    for (; start < end; start++) {
        if (data[start]) {
            tempList.push(data[start]);
        }
    }
    this.info.ds_pagecount = Math.ceil(data.length / this.info.ds_page_size);
    this.info.ds_pagedata = tempList;
}


/**
 * 自定义 列汇总方法
 */
function custColSum({columns, data}) {

    const sums = [];
    var fieldInfo = this.info.ds_fieldinfo;
    var colObj = getColObj(this.info.ds_id);
    columns.forEach((column, index) => {
        if (column.type == "index") {
            sums[index] = '合计'
        } else if (colObj[column.columnKey]) {
            let isSum = colObj[column.columnKey].issum;
            if (isSum === '1') {
                if (this.info.ds_tree_grid) {
                    var _data = $DS.util.childrenToList(data, "children", []);
                    _data = _data.filter(item => !item.children && !item.isdividedSum)
                }
                var values = [];
                if (_data) {
                    values = _data.map(item => Number(item[column.property]));
                } else {
                    values = data.map(item => Number(item[column.property]));
                }

                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr
                        } else {
                            return prev
                        }
                    }, 0);
                    if (colObj[column.columnKey].addThousands && sums[index] != undefined && sums[index] != null && sums[index] != "") {
                        sums[index] = parseFloat(sums[index]).toFixed(colObj[column.columnKey].fieldDeclength).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    }
                } else {
                    sums[index] = '';
                }
            } else {
                sums[index] = ''
            }
        }
    })
    return sums;
}


//==========================对外提供api=========================================================================


//-----------------获取设置数据相关------------------------------------------------------------------------------
/**
 * 通过控件id 获取表格所有数据
 * @param id
 */
function getAllGridVal(id) {
    temporary.cacheSourceData["gridAllData"] = [];
    var ctrl = $DS.getCtrlById(id);
    if (!ctrl) {
        console.error("【ID为" + id + "】的控件不存在!");
        return
    }

    $grid.optTypeOut = 'getAllVal';
    $("#" + id + "_position").click();
    return temporary.cacheSourceData["gridAllData"];
}

/**
 * 设置表格数据
 * @param id
 */
function setGridData(id, val, cache) {

    //获取数据源信息
    var source = getSourceById(VUECFG.groupObj[id]);
    var ctrl = $DS.getCtrlById(id).info;
    ctrl.ds_searchdata = "";
    if (val) {
        ctrl['ds_grid'] = "";
        ctrl['ds_grid'] = (val.rows) ? (val.rows) : val;
    } else if (source) {
        //记录当前数据源id 切换数据源时修改 并置空 ds_selectcolumns
        if (ctrl['ds_sourceId'] && ctrl['ds_sourceId'] != source.sourceId) {
            ctrl['ds_selectcolumns'] = [];//控件已选择的列置空
        }
        ctrl['ds_sourceId'] = source.sourceId;
        //列信息
        ctrl['ds_columns'] = source.columns;
        //表格数据
        ctrl['ds_grid'] = source.sourceData.rows;

    } else {
        ctrl['ds_columns'] = [];//数据源列信息
        ctrl['ds_grid'] = [];//表格数据
        ctrl['ds_selectcolumns'] = [];//控件已选择的列置空
    }

    //清空编辑过的行数据
    if (ctrl.ds_editAllRows) {
        ctrl.ds_editAllRows = {};
    }
    if (ctrl.ds_deleteRows) {
        ctrl.ds_deleteRows = [];
    }

    //开关 radio 设置默认值
    setDefaultValueForSR(ctrl);

    //开启复选框 添加当前行是否选中的状态表示
    if (ctrl.ds_showcheckbox && ctrl.ds_grid) {
        ctrl.ds_grid = ctrl.ds_grid.map(item => {
            item["treegrid_ischecked"] = false;
            return item;
        })
    }

    if (window[ctrl.ds_id + "_gridRef"] && window[ctrl.ds_id + "_gridRef"].$refs) {
        window[ctrl.ds_id + "_gridRef"].$refs.multipleTable.setCurrentRow();
    }
    //触发展开节点
    $grid.expendTreeGridNodes(ctrl.ds_id);
    //表格,树 控件被触发刷新 选中刷新前节点
    if (ctrl.ds_grid_isCurrentRow_reload && temporary.loadRegister && temporary.loadRegister[ctrl.ds_id] == true && temporary[ctrl.ds_id + "_tempDataForReload"] && ctrl.ds_grid?.length > 0) {
        selectionNodeForReload(ctrl, temporary[ctrl.ds_id + "_tempDataForReload"]);
    }

}


/**
 * 表格控件被触发刷新 选中刷新前节点
 * @param info
 * @param data
 * @param type
 */
function selectionNodeForReload(info, data) {

    if (!data || (data && data.length <= 0)) return;
    let key = info.ds_row_key ? info.ds_row_key : (info.ds_row_id ? info.ds_row_id : "index");
    let gridRef = window[info.ds_id + "_gridRef"];
    /*let checkRow = info.ds_grid.find(item => item[key] === data[0][key]);
    $DS.util.setObjVal(gridRef, ['currScope', 'row'], checkRow);*/

    gridRef.$nextTick(function () {
        var gridData = this.computed_data;
        if (this.info.ds_tree_grid)
            gridData = $DS.util.childrenToList(gridData, "children", []);
        let checkRow = gridData.find(item => item[key] === data[0][key]);
        this.$refs.multipleTable.setCurrentRow(checkRow);
        $DS.util.setObjVal(gridRef, ['currScope', 'row'], checkRow);
    })
}


/**
 * 通过控件id 取当前选中的数据
 * @param id
 * @returns {*|string}
 */
function getSelectGridVal(id) {
    temporary.cacheSourceData["gridSelectData"] = []
    var ctrl = $DS.getCtrlById(id);
    if (!ctrl) {
        console.error("【ID为" + id + "】的控件不存在!");
        return
    }


    $grid.optTypeOut = 'getSelectVal';
    $("#" + id + "_position").click();
    return temporary.cacheSourceData["gridSelectData"];
}

/**
 * 清空表格数据
 * @param ctrl
 */
function clearGridVal(ctrl) {
    ctrl.info.ds_grid = [];
    ctrl.info.ds_columns = [];
    ctrl.info.ds_selectcolumns = [];
    if (temporary.gridShowData && temporary.gridShowData[ctrl.info.ds_id]) {
        temporary.gridShowData[ctrl.info.ds_id] = [];
    }
}

/**
 * 变更表格某一行的数据
 * @param id 控件id
 * @param newData 变更数据
 * @param index 行索引
 */
function setOneRowData(id, index, newData) {
    $grid["rowNewData"] = {newData: newData, index: index};
    $grid.optTypeOut = 'setOneRowData';
    $("#" + id + "_position").click();
    delete $grid["rowNewData"];
}


//--------------选中获取选中相关---------------------------------------------------------------------------------

/**
 * 外部调用 多选表格的勾选行
 * @param id
 * @param checkRows | 支持表达式 根据数据进行设置选中 例:row.FIELD=="xxx"
 * @param flag
 */
function toggleRowSelection(id, checkRows, flag) {
    $grid.optTypeOut = 'checkRow';
    $grid["checkRows"] = checkRows;
    $grid["checkFlag"] = flag;
    temporary[id + "_churrentRowForOut"] = {
        checkRows: checkRows,
        checkFlag: flag
    };
    //未设置rowkey 不执行
    var ctrl = $DS.getCtrlById(id);
    if (!ctrl || (ctrl && !ctrl.info.ds_row_key)) {
        console.error(`${ctrl.info.ds_ctrlname}控件未设置row-key属性! 设置选中行失败!`);
        return;
    }
    $("#" + id + "_position").click();
}


/*
单选表格 清除选中行
 */
function clearCheckedNode(id) {
    $grid.optTypeOut = 'clearCheckNode';
    $("#" + id + "_position").click();
}

/**
 * 外部调用清空多选表格的勾选
 * @param id
 */
function clearSelection(id) {
    $grid.optTypeOut = 'clearAllCheck';
    temporary[id + "_churrentRowForOut"] = {};
    $("#" + id + "_position").click();
}


//---------------可编辑表格相关--------------------------------------------------------------------------

function setEditRows(id) {
    $grid.optTypeOut = 'setEditRows';
    $("#" + id + "_position").click();
}

function getEditRows(id, isInfoData) {
    $grid.optTypeOut = 'setEditRows';
    $("#" + id + "_position").click();
    return $DS.getCtrlById(id).info.ds_editAllRows;
}

function clearEditRows(id) {
    $grid.optTypeOut = 'clearEditRows';
    $("#" + id + "_position").click();
}

//插入外部控件调用
function insertRowForOut(id) {
    $grid.optTypeOut = 'insert';
    $("#" + id + "_position").click();
    if (!temporary.gridInsertRow) temporary.gridInsertRow = {};
    return temporary.gridInsertRow[id];
}

//删除外部控件调用
function deleteRowForOut(id) {
    $grid.optTypeOut = 'delete';
    $("#" + id + "_position").click();
}

//保存外部控件调用
function saveForOut(id) {

    $grid.optTypeOut = 'save';
    $("#" + id + "_position").click();
}

/**
 * 重新渲染表格
 */
function renderGrid(id) {

    $grid.optTypeOut = 'reload';
    $("#" + id + "_position").click();
    //触发下方的reLoadGrid方法
}


//---------------分页--------------------------------------------------------------------------
//获取当前页码
function getCurrentPage(id) {
    $grid.optTypeOut = 'getCurrentPage';
    $("#" + id + "_position").click();
    return temporary[id + "_currentPage"];
}

//设置当前页码
function setCurrentPage(id, currentPage) {
    $grid["currentPage"] = currentPage;
    $grid.optTypeOut = 'setCurrentPage';
    $("#" + id + "_position").click();
    delete $grid["currentPage"];
}

//---------------表格自身调用--------------------------------------------------------------------------
/**
 * 搜索外部控件调用
 * @param id
 * @param val
 */
function searchForOut(id, val) {

    $grid.optTypeOut = 'search';
    $grid["checkSearch"] = val;
    $("#" + id + "_position").click();
}

//设置展开节点
function expendTreeGridNodeForOut(id, nodeIds) {
    $grid.optTypeOut = 'expendTreeGridNode';
    $grid.expendNodes = nodeIds;
    $("#" + id + "_position").click();
    delete $grid["expendNodes"];
}

//合计行位置radio值 变更
function changeSummarPostion(info, val) {
    $grid.optTypeOut = 'changeSummar';
    $grid["summarPostion"] = val;
    $("#" + info.ds_pid + "_position").click();
    delete $grid["summarPostion"];
}

//=============================部控件调用当前表格实例的 点击触发方法========================================================
/**
 * 外部控件调用当前表格实例的 点击触发方法
 */
function positionClick(event) {

    var info = this.info;
    switch ($grid.optTypeOut) {
        case"setEditRows":
            this.setAllEditRows();
            break;
        case "clearEditRows":
            this.clearAllEditRows();
            break;
        case "insert":
            this.insertEditRow();
            break;
        case "delete":
            this.deleteEditRow();
            break;
        case "save":
            this.editSave();
            break;
        case "reload":
            this.reLoadGrid(info.ds_id, this);
            break;
        case "selectColumns": //表格根据数据源选择字段
            this.selectColBySource(event);
            break;
        case "checkRow":
            this.checkRowSelection();
            break;
        case "search":
            this.search();
            break;
        case "clearAllCheck":
            this.clearAllCheck();
            break;
        case "getSelectVal":
            this.getSelectRows();
            break;
        case "getAllVal":
            this.getAllGridData();
            break;
        case "changeSummar":
            this.showSummariesPosition(info, $grid["summarPostion"], true);
            break;
        case "getCurrentPage":
            temporary[info.ds_id + "_currentPage"] = this.currentPage;
            break;
        case "setCurrentPage":
            this.currentPage = parseInt($grid.currentPage);
            break;
        case "setOneRowData":
            this.setOneRowDataByIndex($grid.rowNewData);
            break;
        case "expendTreeGridNode":
            this.expendTreeGridNode(this.info, $grid.expendNodes);
            break;
        case 'clearCheckNode':
            this.clearCheckNodeForOut();
            break;
        default:
            break;
    }

    $grid.optTypeOut = '';

}


//============================实际调用的方法==============================================================================================
/**
 * 外部获取表格数据
 * @returns {getAllGridData.info.ds_pagedata|getAllGridData.info.ds_searchdata|any|[]|getAllGridData.info.ds_tabs_editableTabs|getAllGridData.info.ds_tree}
 */
function getAllGridData() {
    temporary.cacheSourceData["gridAllData"] = this.computed_data;
    return this.computed_data;
}

/**
 * 获取选中的行  this调用
 * @returns {[]|*[]}
 *  row 点击的行数据
 */
function getSelectRows(row) {

    var info = this.info;
    var _selectData = [];
    //开启复选框 且点击行勾选复选框 返回勾选中的数据
    if (this.$refs && info.ds_showcheckbox && (info.ds_grid_clickRowSelectCheckbox || $grid.optTypeOut == "getSelectVal" || $grid.optTypeOut == "delete" || $grid.optTypeOut == "checkRow")) {
        _selectData = this.$refs.multipleTable.selection;
        if (row && !info.ds_tree_grid) {
            _selectData.push(row);
        }
        //只选择中间级别
        if (info.ds_choseMidOnly && info.ds_tree_grid) {
            _selectData = _selectData.filter(item => {
                if (!item.children) {
                    return item;
                }
            })
        }
        // 勾选的数据中去除删除的行数据
        if (info.ds_deleteRows && info.ds_deleteRows.length > 0) {
            _selectData = _selectData.filter(item => {
                if (!item.optType || item.optType !== "deleted") {
                    return item;
                }
            })
        }
        temporary.cacheSourceData["gridSelectData"] = _selectData;
        return _selectData;
    }

    var singleSelectData = [];
    //如果没有勾选 ,默认当前点击行
    if (_selectData.length == 0 && this.currScope && this.currScope.row) {
        singleSelectData.push(this.currScope.row);
    }
    var selectData = _selectData.length > 0 ? deepClone(_selectData) : deepClone(singleSelectData);
    temporary.cacheSourceData["gridSelectData"] = selectData;
    return selectData;
}


/**
 * 设置某一行数据
 * @param rowInfo
 */
function setOneRowDataByIndex(rowInfo) {

    //树形表格
    if (!this.info.ds_grid || this.info.ds_grid.length === 0) {
        return
    }
    if (this.info.ds_isedit && (!rowInfo.newData.optType || rowInfo.newData.optType == "updated")) {
        rowInfo.newData.optType = "updated";
    }

    if (this.info.ds_tree_grid) {
        let listData = $DS.util.childrenToList(this.info.ds_grid, "children", []);
        if (listData[rowInfo.index]) {
            listData[rowInfo.index] = rowInfo.newData;
        }
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].children) {
                delete listData[i].children;
            }
        }
        let rowId = this.info.ds_row_id ? this.info.ds_row_id : (this.info.ds_row_key ? this.info.ds_row_key : "index");
        this.info.ds_grid = listData; //$DS.util.children(listData, rowId, this.info.ds_row_pid, "children");
    } else if (this.info.ds_grid[rowInfo.index]) {
        this.$set(this.info.ds_grid, rowInfo.index, rowInfo.newData);
    }
}

//====================================设置带复选框树形结构表格 复选框勾选状态==============================================

/**
 * 开启复选框时 设置父子级的选中
 * toggleRowSelection: 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
 */
function checkRowSelection(checkRows, pageData) {

    var flag = $grid.checkFlag;
    var type = "inner";
    //如果是外部调用
    if (!checkRows) {
        checkRows = $grid.checkRows;
        type = "outer"
    }

    //根据条件设置选中
    if ($DS.util.isString(checkRows) && checkRows.indexOf("row.") != -1) {
        checkRowSelectionByCondition(pageData, checkRows, flag, this);
    } else {
        if ($DS.util.isString(checkRows)) {
            checkRows = checkRows.split(",");
        }
        if ($DS.util.isNumber(checkRows)) {
            checkRows = [checkRows];
        }

        var gridData = pageData ? pageData : this.computed_data;
        //将层级数据转为扁平数据
        var newData = gridChildrenToList(gridData, "children", []);
        var rowKey = this.info.ds_row_key ? this.info.ds_row_key : "index";
        //开启复选框 但是只能单选
        if (this.info.ds_showcheckbox && this.info.ds_showcheckbox_radio) {
            this.$refs.multipleTable.clearSelection();

            if ($DS.util.isArray(checkRows)) {
                checkRows = checkRows[0];
            }
            for (let j = 0; j < newData.length; j++) {
                if (newData[j][rowKey] === checkRows) {
                    checkRow = newData[j];
                    this.$nextTick(function () {
                        this.$refs.multipleTable.toggleRowSelection(checkRow, true);
                    });
                    break;
                }
            }
        }
        //多选 且为树
        else if (this.info.ds_tree_grid === true && this.info.ds_showcheckbox) {
            let setRows = [];
            for (let i = 0; i < checkRows.length; i++) {
                var checkRow = null;//当前选中节点的行数据
                for (let j = 0; j < newData.length; j++) {
                    if (newData[j][rowKey] === checkRows[i]) {
                        checkRow = newData[j];
                        setRows.push(checkRow);
                        break;
                    }
                }
            }
            this.$nextTick(function () {
                for (let checkRow of setRows) {
                    //设置节点自身选中状态
                    var status = checkRow.treegrid_ischecked == true ? true : false; //当前节点勾选状态
                    //外部调用设置勾选状态
                    checkRow.treegrid_ischecked = flag === undefined ? !status : flag;
                    //只选择中间级时 取消子父级的关联 或关闭父子级关联
                    if (this.info.ds_choseMidOnly == true) {
                        $DS.setPro(this.info.ds_id, "ds_tree_grid_check_strictly", "switch", true);
                    }
                    //父子级关联
                    if (!this.info.ds_tree_grid_check_strictly) {
                        //向下寻找子集 设置勾选状态
                        if (checkRow.children && checkRow.children.length > 0) {
                            setDownRowSelection(checkRow, !status, flag, this);
                        }
                        /* //如果开启反选 设置同级别节点选中状态 与自身相反
                         if (this.info.ds_tree_grid_reverseCheck) {
                             setReverseRowSelection(checkRow, checkRow[this.info.ds_row_pid], newData, flag === undefined ? status : flag, this);
                         }*/
                        //向上寻找父节点 设置勾选状态
                        setUpRowSelection(checkRow[this.info.ds_row_pid], newData, !status, flag, this);

                    }
                    this.$refs.multipleTable.toggleRowSelection(checkRow, (flag === undefined ? !status : flag));
                }
            })
        }
        //多选不是树
        else if (this.info.ds_showcheckbox && !this.info.ds_tree_grid) {
            let setRows = [];
            for (let i = 0; i < checkRows.length; i++) {
                for (let j = 0; j < newData.length; j++) {
                    if (checkRows[i] === newData[j][rowKey]) {
                        setRows.push(newData[j]);
                        break;
                    }
                }
            }

            this.$nextTick(function () {
                for (let row of setRows) {
                    this.$refs.multipleTable.toggleRowSelection(row, flag);
                }
            })
        }
        //单选表格 默认取传递的第一条数据
        else if (!this.info.ds_showcheckbox) {
            for (let j = 0; j < newData.length; j++) {
                if (checkRows[0] === newData[j][rowKey]) {
                    if (flag) {
                        // 如果是树 且为外部调用(type =outer) 展开所有父级节点
                        if (this.info.ds_tree_grid && type == "outer") {
                            let id = this.info.ds_row_id ? this.info.ds_row_id : this.info.ds_row_key;
                            let pid = this.info.ds_row_pid;
                            let pNodes = [];
                            for (let k = 0; k < newData.length; k++) {
                                let item = newData[k];
                                if (item[id] === newData[j][pid]) {
                                    pNodes.push(item[id]);
                                }
                            }
                            this.info.ds_expand_row_keys = pNodes.concat(this.info.ds_expand_row_keys);
                        }

                        this.$nextTick(function () {
                            this.$refs.multipleTable.setCurrentRow(newData[j]);
                            jumpToSelectRow(this.$refs.multipleTable.$el, newData[j]);
                            //this.$refs.multipleTable.doLayout();
                        })
                    } else {
                        this.$nextTick(function () {
                            this.$refs.multipleTable.setCurrentRow();
                        })
                    }

                    //推送参数存在 且 设置为选中
                    if (this.info.ds_param && flag) {
                        //推送参数
                        $DS.dealPms(this.info, [newData[j]]);
                    }
                    break;
                }
            }


        }
        //外部调用 推送参数
        if ($grid.checkRows) {
            //推送参数 多选 且选中
            if (this.info.ds_param && this.info.ds_showcheckbox && flag == true) {
                //推送参数
                this.$nextTick(function () {
                    $DS.dealPms(this.info, this.getSelectRows());
                });
            }
            //删除
            delete $grid.checkRows;
            delete $grid.checkFlag;
        }
    }
}


/**根据条件设置选中行
 * @param pageData 数据
 * @param condition 条件 字符串表达式 例:'row.GUID=="xxx"'
 * @param flag 是否选中 true|false
 * @param vm 表格vue实例
 */
function checkRowSelectionByCondition(pageData, condition, flag, vm) {
    var gridData = pageData ? pageData : vm.computed_data;
    if (vm.info.ds_tree_grid) {
        gridData = $DS.util.childrenToList(gridData, "children", []);
    }
    for (let i = 0; i < gridData.length; i++) {
        let row = gridData[i];
        if (eval(condition)) {
            if (!vm.info.ds_showcheckbox) {
                vm.$nextTick(function () {
                    if (flag) {
                        vm.$refs.multipleTable.setCurrentRow(row);
                        jumpToSelectRow(vm.$refs.multipleTable.$el, row);
                    } else vm.$refs.multipleTable.setCurrentRow();
                })
                //推送参数存在 且 设置为选中
                if (vm.info.ds_param && flag) {
                    //推送参数
                    $DS.dealPms(vm.info, [row]);
                }
                return;
            } else {
                this.$nextTick(function () {
                    vm.$refs.multipleTable.toggleRowSelection(row, flag);
                })
            }
            row["treegrid_ischecked"] = flag;
        }
    }
    delete $grid.checkRows;
    delete $grid.checkFlag;
}

/**
 * 单选 选中行 定位到该行
 * @param gridEl 表格元素
 * @param row 行数据
 */
function jumpToSelectRow(gridEl, row) {
    //计算滚动条的位置
    const targetTop = gridEl.querySelectorAll('.el-table__body tr')[row.index].getBoundingClientRect().top;
    const containerTop = gridEl.querySelector('.el-table__body').getBoundingClientRect().top;
    const scrollParent = gridEl.querySelector('.el-table__body-wrapper');
    scrollParent.scrollTop = targetTop - containerTop;
}

//--------------------------------设置反选------------------------------------------------------------------------------------
function setReverseRowSelection(checkrow, pid, newData, status, vue) {
    let rowKey = vue.info.ds_row_key ? vue.info.ds_row_key : (vue.info.ds_row_id ? vue.info.ds_row_id : "index");
    for (let row of newData) {
        if (row[vue.info.ds_row_id] == checkrow[vue.info.ds_row_pid]) {
            for (let childRow of row.children) {
                if (childRow[rowKey] !== checkrow[rowKey]) {
                    childRow.treegrid_ischecked = status;
                    vue.$refs.multipleTable.toggleRowSelection(childRow, status);
                }
            }
            break;
        }
    }
}

//-------------------------------向下寻找子集设置勾选状态---------------------------------------------------------------------------------------------------

/**
 * 父级勾选或不勾选 子集全部跟随父级

 */
function setDownRowSelection(selectRow, status, flag, vue) {
    for (let i = 0; i < selectRow.children.length; i++) {
        selectRow.children[i].treegrid_ischecked = flag === undefined ? status : flag;
        vue.$nextTick(function () {
            vue.$refs.multipleTable.toggleRowSelection(selectRow.children[i], flag === undefined ? status : flag);
        });

        if (selectRow.children[i].children && selectRow.children[i].children.length > 0) {
            setDownRowSelection(selectRow.children[i], status, flag, vue);
        }
    }
}


//---------------------------向上寻找父级 集设置勾选状态-------------------------------------------------------------------------------------------------------------


/*
子节点选中 同时选中父节点
当前节点如果设置为为选中 则 设置所有父节点状态为选中
               未选中 则
 */
function setUpRowSelection(pid, gridData, status, flag, vue) {
    let idField = vue.info.ds_row_id;
    var rowKey = vue.info.ds_row_key ? vue.info.ds_row_key : "index";
    for (let i = 0; i < gridData.length; i++) {

        if (flag === undefined ? status : flag) {
            //当前节点如果设置为选中 则 设置所有父节点状态为选中
            if (gridData[i][idField] === pid) {
                vue.$nextTick(function () {
                    vue.$refs.multipleTable.toggleRowSelection(gridData[i], true);
                })
                gridData[i].treegrid_ischecked = status;
                setUpRowSelection(gridData[i][vue.info.ds_row_pid], gridData, status, flag, vue);
            }
        } else {
            //当前节点设置为不选中 则 找到父节点判断其子集是否有选中的节点 如果有直接设置父节点为选中,如果没有再向上找父级
            if (gridData[i][idField] === pid) {
                var childStatus = getChildStatus(gridData[i], vue);
                //子集中有选中的节点
                vue.$nextTick(function () {
                    vue.$refs.multipleTable.toggleRowSelection(gridData[i], childStatus);
                })
                setUpRowSelection(gridData[i][vue.info.ds_row_pid], gridData, status, flag, vue);
            }
        }

    }
}

/**
 * 判断父的子集中是否有选中的节点
 * @param pid
 * @param pData
 * @param vue
 * @returns {boolean}
 */
function getChildStatus(pData) {

    if (pData.children && pData.children.length > 0) {
        for (let i = 0; i < pData.children.length; i++) {
            //存在选中的节点
            if (pData.children[i].treegrid_ischecked) {
                return true;
            } else if (pData.children[i].children && pData.children[i].children.length > 0) {
                var res = getChildStatus(pData.children[i].children)
                if (res) {
                    return res;
                }
            }

        }
    }

    return false;

}

/**
 * 层级数据转list
 * @param source
 * @param childField
 * @param listData
 * @returns {*}
 */
function gridChildrenToList(source, childField, listData) {
    for (let i = 0; i < source.length; i++) {
        listData.push(source[i]);
        source[i][childField] && source[i][childField].length > 0 ? childrenToList(source[i][childField], childField, listData) : ""// 子级递归
    }
    return listData;
}

/**
 * 设置操作过的行数据 保存到info中
 */
function setAllEditRows() {
    var info = this.info;
    if (!info.ds_isedit)
        return;
    var data = this.computed_data;
    var deleteRows = info.ds_deleteRows ? info.ds_deleteRows : [];
    //如果是树形结构表格 则递归
    var editRows = getEditRowsByData(data, {insertRows: [], updateRows: []});
    info["ds_editAllRows"] = {inserted: editRows.insertRows, updated: editRows.updateRows, deleted: deleteRows};
}

/**
 * 获取编辑过的行数据
 * @param data
 * @param editRows
 * @returns {*}
 */
function getEditRowsByData(data, editRows) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].optType && data[i].optType === 'inserted') {
            editRows.insertRows.push(data[i]);
        } else if (data[i].optType && data[i].optType === 'updated') {
            editRows.updateRows.push(data[i]);
        }

        if (data[i].children && data[i].children.length > 0) {
            getEditRowsByData(data[i].children, editRows)
        }
    }
    return editRows;
}

//清空编辑过的行数据
function clearAllEditRows() {
    var info = this.info;
    var data = this.computed_data;
    clearChildreEditRow(data);
    info.ds_editAllRows = {};
    info.ds_deleteRows = [];
}

function clearChildreEditRow(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].optType) {
            delete data[i].optType;
        }
        if (data[i].children && data[i].children.length > 0) {
            clearChildreEditRow(data[i].children)
        }
    }
}

/**
 * 清空多选表格勾选
 */
function clearAllCheck() {
    this.$refs.multipleTable.clearSelection();
}

/**
 * 编辑时 ,插入一行
 */
function insertEditRow() {
    debugger
    var info = this.info;
    if (!info.ds_isedit)
        return;
    var columns = temporary.gridCols[info.ds_id];
    var insertRow = {};
    for (let i = 0; i < columns.length; i++) {
        var fieldName = columns[i]['prop'];
        if (columns[i].defaultVal) {
            insertRow[fieldName] = $DS.util.replace(columns[i].defaultVal);
        }
    }
    let rowKey = info.ds_row_key ? info.ds_row_key : (info.ds_row_id ? info.ds_row_id : "GUID");
    insertRow[rowKey] = $DS.util.UUID().replaceAll("-", "").toUpperCase();
    insertRow['optType'] = 'inserted';
    this.computed_data.push(insertRow);//插入一行空数据
    if (!temporary.gridInsertRow) temporary.gridInsertRow = {};
    temporary.gridInsertRow[info.ds_id] = insertRow;
}

/**
 * 编辑时 ,删除一行
 */
function deleteEditRow() {

    var info = this.info;
    if (!info.ds_isedit) {
        alert('当前表格不可编辑')
        return;
    }

    var selectRows = this.getSelectRows();
    if (selectRows.length === 0) {
        this.$message.warning("请选择要删除的行!");
        return;
    }
    let msg = selectRows.find(item => item.children) ? '当前行存在下级,是否确定删除该行' : '是否确定删除该行';
    this.$confirm(msg, '提示', {type: 'warning'}).then(() => {
        var deleteRows = [];
        let rowKey = this.info.ds_row_key ? this.info.ds_row_key : (this.info.ds_row_id ? this.info.ds_row_id : "GUID");
        deleteRows = getDelAfterData(this.computed_data, selectRows, deleteRows, rowKey);

        if (deleteRows.length > 0) {
            if (!this.info.ds_deleteRows) {
                this.info.ds_deleteRows = [];
            }
            this.info.ds_deleteRows = this.info.ds_deleteRows.concat(deleteRows);
        }
        //this.$message.success("删除成功");
    });
}


/**
 * 编辑保存事件
 */
function editSave() {

    var info = this.info;
    this.setAllEditRows();
    var rows = info.ds_editAllRows;
    if (!temporary["forOutSaveResult"]) {
        temporary["forOutSaveResult"] = {};
    }

    if (rows) {
        if (rows.inserted.length === 0 && rows.updated.length === 0 && rows.deleted.length === 0) {
            this.$message("数据未发生更改");
            temporary.forOutSaveResult[this.info.ds_id] = {isError: false};
            return;
        }

        var source = $DS.getSourceById(VUECFG.groupObj[info.ds_id]);
        var result = $DS.saveGridSource(rows, source.sourceName);
        if (!result || result.isError) {
            this.$message.error(result.errMsg);
        } else {
            source = getSourceById(VUECFG.groupObj[info.ds_id]);
            this.info.ds_editAllRows = {};
            this.info.ds_deleteRows = [];
            $DS.setSourceVal(source, info.ds_id);
            this.$message.success("保存成功");
            this.clearAllEditRows();
        }
        temporary.forOutSaveResult[this.info.ds_id] = result;
    } else {
        temporary.forOutSaveResult[this.info.ds_id] = {isError: false};
    }
}

//获取删除行后的表格数据
function getDelAfterData(gridData, selectRows, deleteRows, rowKey) {
    for (let i = 0; i < gridData.length; i++) {
        for (let s = 0; s < selectRows.length; s++) {
            if (gridData[i][rowKey] === selectRows[s][rowKey]) {
                if (!gridData[i].optType || gridData[i].optType != "inserted") {
                    //如果不是新增行 或者 原始行
                    gridData[i].optType = 'deleted';
                    //层级数据 获取子集
                    if (gridData[i].children && gridData[i].children.length > 0) {
                        var list = getChildrenList(gridData[i].children);
                        for (let j = 0; j < list.length; j++) {
                            deleteRows.push(list[j]);
                        }
                    }
                    deleteRows.push(gridData[i]);
                }
                gridData.splice(i, 1);
                if (i !== 0) {
                    i--;
                }
            }
            // 层级数据
            else if (gridData[i].children && gridData[i].children.length > 0) {
                getDelAfterData(gridData[i].children, selectRows, deleteRows, rowKey);
            }
        }
    }
    return deleteRows;
}

//获取节点子集list数据
function getChildrenList(data) {
    var list = $DS.util.childrenToList(data, "children", []);
    for (let i = 0; i < list.length; i++) {
        delete list[i].children;
    }
    return list;
}


/**
 * 重新渲染表格
 * @param id
 * @param vue
 */
function reLoadGrid(id, vue) {

    var info = VUECFG.formObj[id].info;
    info.ds_render = false;
    this.$nextTick(() => {
        info.ds_render = true;
        //处理重新加载表格高度的问题
        if (vue && vue.computedTableHeight)
            vue.computedTableHeight();
        var time = setInterval(function () {
            try {
                if (vue.$refs.multipleTable) {
                    vue.showSummariesPosition(info);
                    vue.$refs.multipleTable.doLayout();
                }
                window.clearTimeout(time);
            } catch (e) {
                window.clearTimeout(time);
                console.error(e)
            }
        }, 100);

    })

}


/**
 * 关键字搜索
 */
function search() {

    var keyword = $grid.checkSearch;
    var info = this.info;
    var filterFileds = info.ds_grid_filterFiled;
    var realCols = this.info.ds_realcols;
    var colsObj = getColObj(info.ds_id);
    var searchData = [];
    var treeOn = info.ds_tree_grid;
    if (keyword == "" || keyword == undefined || keyword == null) {
        this.info.ds_searchdata = "";
        return;
    }
    if (info.ds_enablesearch === true && info.ds_grid && info.ds_grid.length > 0) {
        let data = $DS.util.childrenToList($DS.util.clone(info.ds_grid), "children", []);
        //未设置过滤字段
        if (!filterFileds || (filterFileds && filterFileds.length === 0)) {
            filterFileds = [];
            for (let col of realCols) {
                if (col.fieldShowType !== 'none' && col.fieldShowType !== 'hidden') {
                    filterFileds.push(col.id);
                }
            }
        }
        for (let row of data) {
            delete row.children;
            let rowStr = "";
            for (let filed of filterFileds) {
                //判断当前字段是否是引用数据
                if (colsObj[filed].options) {
                    let val = row[filed];
                    for (let option of colsObj[filed].options) {
                        if (option.value == val && option.label.indexOf(keyword) !== -1) {
                            rowStr += option.label + "";
                            break;
                        }
                    }
                } else {
                    rowStr += row[filed] + "";
                }
            }
            if (rowStr.indexOf(keyword) !== -1) {
                searchData.push(row);
            }

        }
    }

    if (treeOn) {
        searchData = $DS.util.children(searchData, this.info.ds_row_id, this.info.ds_row_pid, "children");
    }
    this.info.ds_searchdata = searchData;
    this.refdate++
}

/**
 * ds_checkbox_disableCondition row.FIELD=="xxx" 满足条件则禁用
 *
 * 仅对 type=selection 的列有效，类型为 Function，
 * Function 的返回值用来决定这一行的 CheckBox 是否可以勾选    Function(row, index)
 * @param row
 * @param index
 * @constructor
 */
function Selectable(row, index) {
    //开启只选择中间级 有自己的节点不选中
    if (this.info.ds_showcheckbox && this.info.ds_tree_grid && this.info.ds_choseMidOnly && row.children) {
        return false;
    }
    if (this.info.ds_checkbox_disableCondition && eval(this.info.ds_checkbox_disableCondition)) {
        return false;
    }
    return true;

}


/**
 * 鼠标右键列表头事件===>打开表格的条件设置界面
 */
function headerContextmenu(column, event) {
    debugger
    if (VUECFG.viewStatu) return false;
    event.preventDefault(); //阻止浏览器自带的右键菜单弹出

    var info = this.info;
    var realCols = info.ds_realcols;//真实有列数据的列
    if (!info.ds_enablecondition) //是否允许右键表头打开列条件设置页面
        return;
    var currColItem = realCols.find(item => item.prop === column.columnKey);
    if (!currColItem)
        return;
    //表格条件格式详细信息
    var conditions = info.ds_condition;
    var param = {
        sid: Date.parse(new Date()),
        ncode: currColItem.prop,
        ntype: currColItem.fieldType,//001 整型  003 字符型  默认除了number型 其它都是char型
        ntext: currColItem.label,
        activeElementId: "",
        realFields: realCols,
        conditions: (conditions && conditions[currColItem.prop]) ? conditions[currColItem.prop] : [],
        ctrlId: info.ds_id
    };
    window.top[param.sid] = param;
    var url = "/freeForm/manage/condi/gridCondition.jsp?sid=" + param.sid;
    showMyDialog("条件格式 ---" + param.ntext + "【" + param.ncode + "】", '60%', '80%', $DS.util.getProjectName() + url, function () {
    })
}


/**
 * 条件格式回调方法
 * @param id
 * @param data
 * @param currFiled
 */
function callBackGridCondiSetting(id, data, currFiled) {

    var info = $DS.getCtrlById(id).info;

    var condition = info.ds_condition != undefined ? info.ds_condition : {};
    condition[currFiled] = data;
    info.ds_condition = condition;


    //准备表格排序数据
    prepareSortData(info, condition);
    //准备表格列平均值
    prepareAverage(info, condition);
    //重新渲染表格
    renderGrid(id);

}

/**
 * 准备表格排序数据
 * @param info
 */
function prepareSortData(info, condition) {
    var sortDataObj = {};
    for (var key in condition) {
        var _conItem = condition[key];
        var _condi = _conItem.filter(item => item.ranges.indexOf('order') != -1);
        if (_condi.length > 0) {
            var data = deepClone(temporary.gridShowData[info.ds_id]);
            for (let r = 0; r < _condi.length; r++) {
                var actionField = _condi[r].actionField;
                var _data = data.filter(item => item[actionField] != undefined && item[actionField] != '');

                //排序处理(由大到小) ==>插入排序算法
                var current;
                for (let i = 0; i < _data.length - 1; i++) {
                    current = _data[i + 1];
                    var preIndex = i;
                    while (preIndex >= 0 && current[actionField] > _data[preIndex][actionField]) {
                        _data[preIndex + 1] = _data[preIndex];
                        preIndex--;
                    }
                    _data[preIndex + 1] = current;
                }
                sortDataObj[actionField] = _data
            }
        }
    }

    info.ds_sortDataObj = sortDataObj;
}

/**
 * 准备表格列平均值数据
 */
function prepareAverage(info, condition) {
    var averageObj = {};
    for (var key in condition) {
        var _conItem = condition[key];
        var _condi = _conItem.filter(item => item.ranges.indexOf('ave') != -1);
        if (_condi.length > 0) {
            var data = deepClone(temporary.gridShowData[info.ds_id]);
            for (let r = 0; r < _condi.length; r++) {
                var actionField = _condi[r].actionField;
                var _data = data.filter(item => item[actionField] != undefined && item[actionField] != '');

                var sum = 0;
                _data.forEach(item => {
                    sum = $DS.util.add(sum, item[actionField])
                })
                var ave = $DS.util.div(sum, _data.length);
                averageObj[actionField] = ave;
            }
        }
    }

    info.averageObj = averageObj;
}

/**
 * 排序变更事件
 */
function sortChange({column, prop, order}) {

}


/**
 *||||||||||||||||||||||||||||||||||||||||||||||||||
 *               my-column 组件方法
 *||||||||||||||||||||||||||||||||||||||||||||||||||
 */
/**
 * 输入框失去焦点事件
 */
function loseInputFcous(scope) {

    console.log("失去焦点 scope:", scope);

    var editValue = scope.row[scope.column.columnKey];
    var fuCurrScope = ziGetCurrScope(this);//子组件获取父组件的 currScope
    if (editValue != fuCurrScope.val) {//如果值发生了变更
        //如果不是新增行 或者 原始行 ,添加编辑标识
        if (!scope.row.optType || scope.row.optType != "inserted") {
            scope.row.optType = 'updated';
        }
        onAfterEdit(this.info, scope);
    }

    //子组件触发父组件事件,还原单元格
    restoreCell(this, scope);

}

/**
 * 编辑表格 单元格获取焦点事件
 * @param scope
 */
function getInputFocus(scope) {

    console.log("获取焦点 scope:", scope);
    var res = $DS.eval(this.info.ds_grid_getInputFocus, this.info, scope);
}

/**
 * 单元格input事件
 */
function cellInput(value, scope) {


    let colObj = getColObj(this.info.ds_id);
    let col = colObj[scope.column.property];
    var res = $DS.eval(this.info.ds_grid_cellInput, this.info, {value: value, scope: scope});
    if (res != false) {
        //分层汇总
        if (this.info.ds_divided_into_summary && col.issum) {
            //没有手动添加合计行的分层汇总
            setSumForCellInputForNotSumRow(scope.row, col, value, this)
        }
    }
}

//------------------------分层汇总--------------------------------------------
/**
 * 默认 非末级节点不可编辑
 * @param row
 * @param col
 * @param value
 * @param ctrlVm
 * @private
 */
function setSumForCellInputForNotSumRow(row, col, value, ctrlVm) {

    /**
     *  获取父级节点下所有的子集 求和
     *      变更所有关联的父级数据
     */
    let info = ctrlVm.info;
    let parentNode = getParentNode(row, ctrlVm.$parent.data, info);
    if (parentNode) {
        let values = parentNode.children.map(item => {
            if (item[info.ds_row_id] == row[info.ds_row_id])
                return value;
            else
                return item[col.id];
        })
        let sum = getSumByValues(values);
        parentNode[col.id] = sum;
        setSumForCellInputForNotSumRow(parentNode, col, sum, ctrlVm);
    }
}

//-----------------------------手动添加合计行的分层汇总----------------------------------------------------------

/**
 * 添加过合计行的分层汇总求和
 */
function setSumForCellInput(row, col, value, ctrlVm) {
    debugger
    let info = ctrlVm.info;
    let parentNode = getParentNode(row, ctrlVm.$parent.data, info);
    if (parentNode) {
        let dividedSumRow = null;
        let values = parentNode.children.map(item => {
            if (item.isdividedSum) {
                dividedSumRow = item;
                return 0;
            } else if (item[info.ds_row_id] == row[info.ds_row_id])
                return value;
            else
                return item[col.id];
        })
        let sum = getSumByValues(values);
        dividedSumRow[col.id] = sum;
        //parentNode[col.id] = sum;
        setUpParenteSum(parentNode, ctrlVm, col);
    }
}

/**
 * 设置父级节点的合计

 */
function setUpParenteSum(row, ctrlVm, col) {
    let dividedSumRow = null;
    let parentNode = getParentNode(row, ctrlVm.$parent.data, ctrlVm.info);
    if (parentNode) {
        let values = [];
        for (let child of parentNode.children) {
            if (child.isdividedSum) {
                dividedSumRow = child;
                continue;
            }
            if (child.children) {
                for (let child_ of child.children) {
                    if (child_.isdividedSum) {
                        values.push(child_[col.id]);
                        break;
                    }
                }
            } else {
                values.push(child[col.id]);
            }
        }
        let sum = getSumByValues(values);
        dividedSumRow[col.id] = sum;
        //parentNode[col.id] = sum;
        setUpParenteSum(parentNode, ctrlVm, col);
    }
}

/*
* 对数组求和
* */
function getSumByValues(values) {
    if (!values.every(value => isNaN(value))) {
        return values.reduce((prev, curr, index) => {
            const value = Number(curr);
            if (!isNaN(value)) {
                return prev + value
            } else {
                return prev
            }
        }, 0)
    } else {
        return "";
    }
}

/**
 * 获取父级节点数据
 * @param row
 * @param gridData
 * @param info
 */
function getParentNode(row, gridData, info) {
    let id = info.ds_row_id;
    let pid = info.ds_row_pid;

    return getGridParentNode(row, gridData, id, pid);

    function getGridParentNode(row, gridData, id, pid) {
        for (let item of gridData) {
            if (row[pid] == item[id]) {
                return item;
            } else if (item.children && item.children.length > 0) {
                let res = getGridParentNode(row, item.children, id, pid);
                if (res) {
                    return res;
                }
            }
        }
    }
}


/**
 * 单元格日期组件失去焦点事件
 */
function loseDateFocus() {
    var fuCurrScope = ziGetCurrScope(this);//子组件获取父组件的 currScope
    restoreCell(this, fuCurrScope);
}

//日期获取焦点 防止解析时间有误报错
function getDateFocus(vm) {
    var fuCurrScope = ziGetCurrScope(this);//子组件获取父组件的 currScope
    if (fuCurrScope.row[this.col.id])
        fuCurrScope.row[this.col.id] = $DS.util.timeFormate(new Date(fuCurrScope.row[this.col.id]), "yyyy-MM-dd hh:mm:ss")
}

/**
 * 子组件获取父组件的 currScope
 * @param vue
 * @returns {null}
 */
function ziGetCurrScope(vue) {
    if (vue.$parent.$parent.$options._componentTag === 'drag_grid') {
        return vue.$parent.$parent.currScope;
    } else {
        return ziGetCurrScope(vue.$parent.$parent);
    }
}

/**
 * 向父组件传递数据 ,还原单元格
 * @param vue
 */
function restoreCell(vue, scope) {
    if (vue.$options._componentTag != 'my-column')
        return;
    //传递给父控件
    if (vue.$parent.$parent.$options._componentTag === 'drag_grid') {
        vue.$parent.$parent.updateFu(scope);
    } else {
        restoreCell(vue.$parent.$parent, scope);
    }
}

/**
 * 结束编辑事件
 */
function onAfterEdit(info, scope) {

    var field = scope.column.columnKey;
    var editValue = scope.row[field];
    console.log("编辑值: " + editValue);
    scope.changes = {};
    scope.changes[field] = editValue;
    $DS.eval(info.ds_edit_after, info, scope);
}

/**
 * 单元格格式化
 * @param value
 * @param col
 * @returns {*}
 */
function cellFormat(value, col, scope) {

    var formatValue = '';
    //为0不显示
    if (parseFloat(value) == 0 && this.info.ds_grid_zeroNotShow) {
        return formatValue;
    }

    //满足不显示条件 返回空值
    if (showDataCondition(this.info, scope.row, col)) {
        return formatValue;
    }
    //参数推送设置 默认值
    if (col.defaultVal && (value == null || value == undefined || !value) && value != "0" && scope.row.optType != "inserted") {
        value = $DS.util.replace(col.defaultVal);
        scope.row[col.id] = value;
        if (this.info.ds_isedit) scope.row.optType = 'updated';
    }
    let customOption = $DS.eval(this.info.ds_grid_customColOption, this.info, {
        "row": scope.row,
        "col": col,
        "options": col.options
    });
    let options = (customOption && $DS.util.isArray(customOption)) ? customOption : col.options;

    //只有在表格初始化时才进行自动对照
    if (!scope.row.children && !value && this.info.ds_grid_autoContrast && options && col.prop == this.info.ds_grid_needContrastField) {
        formatValue = autoContrast(options, scope, this.info.ds_grid_dependContrastField, this.info.ds_grid_needContrastField, col.fieldShowType);
    } else if (value !== null && value !== undefined && !col.customHtml) {
        if (!options) options = [];
        if (col.fieldShowType === 'select' || col.fieldShowType === 'radio' || col.fieldShowType === 'checkbox' || col.fieldShowType === 'switch') {
            var cacheVal = [];
            for (var o = 0; o < options.length; o++) {
                if (value instanceof Array) {//多选
                    value.forEach(function (item) {
                        if (item === options[o].value)
                            cacheVal.push(options[o].label);
                    })
                } else {//单选
                    if (options[o].value == value) {
                        formatValue = options[o].label;
                        break;
                    }
                }
            }
            if (cacheVal.length != 0)
                formatValue = cacheVal.join(",");
        } else if (col.fieldShowType === 'date' && value) {
            var date = "";
            if (value instanceof Date) {
                date = value;
            } else {
                date = new Date(value);
            }

            if (col.fieldType == "008") {
                var formatter = col.date_formater ? col.date_formater : "yyyy-MM-dd";
                formatValue = formateDate2String(date, formatter);
            }
            if (col.fieldType == "009") {
                var formatter = col.date_formater ? col.date_formater : "yyyy-MM-dd HH:mm:ss";
                formatValue = formateDate2String(date, formatter);
            }
        } else if (col.fieldShowType == "tree" && options.length > 0) {
            //弹出树
            var valArr = value.split(",");
            var nameArr = [];
            var listOpts = $DS.util.childrenToList(options, "children", []);
            for (let i = 0; i < valArr.length; i++) {
                var name = getNodeNameByid(valArr[i], listOpts);
                if (name) {
                    nameArr.push(name);
                }
            }
            formatValue = nameArr.join(",");
        } else {
            formatValue = value;
        }
        //千分符
        if ((col.addThousands || col.fieldDeclength) && value != undefined && value != null && value != "") {

            if (col.fieldDeclength) {
                formatValue = parseFloat(formatValue).toFixed(col.fieldDeclength);
            }
            if (col.addThousands) {
                formatValue = formatValue + "";
                formatValue = formatValue.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            }
            // formatValue = parseFloat(formatValue).toFixed(col.fieldDeclength)
        }
    } else if (col.customHtml) {
        $DS.pageParams.customRow = scope.row;
        formatValue = $DS.util.replace(col.customHtml);
        delete $DS.pageParams.customRow;
    }

    return formatValue;
}


//设置开关 radio默认值
function setDefaultValueForSR(info) {
    debugger
    let time;
    try {
        time = setInterval(() => {
            if (window[info.ds_id + "_gridRef"]?.computed_columns) {
                let _this = window[info.ds_id + "_gridRef"];
                let settingCols = _this.computed_columns?.filter(col => col.fieldShowType == 'switch' || col.fieldShowType == 'radio')
                if (info.ds_grid?.length > 0 && settingCols?.length > 0) {
                    info.ds_grid.forEach(row => {
                        settingCols.forEach(col => {
                            if (col.defaultVal && (row[col.id] ?? '' == '') && row.optType != 'inserted') {
                                row[col.id] = $DS.util.replace(col.defaultVal);
                                if (info.ds_isedit) row.optType == 'updated';
                            }
                        })
                    })
                }
                clearInterval(time)
            }
        })
    } catch (e) {
        console.error('设置表格默认值异常' + e)
        clearInterval(time)
    }
}

/**
 * 根据行 数据过滤引用数据
 * @param col
 * @param row
 */
function filterOptionsByRow(col, row) {
    debugger
    let fk_filter_rowdata = col.fk_filter_rowdata;
    let jsFilter;
    try {
        jsFilter = $DS.eval(this.info.ds_grid_filterColOption, this.info, {
            col: col,
            row: row,
            options: col.options
        })
    } catch (e) {
        console.error(e);
        console.error("过滤引用数据异常");
        return col.options;
    }

    if (!fk_filter_rowdata && (!jsFilter || !$DS.util.isArray(jsFilter))) {
        return col.options;
    } else if (!fk_filter_rowdata && jsFilter && $DS.util.isArray(jsFilter)) {
        return jsFilter;
    } else if (fk_filter_rowdata) {
        $DS.putPms("row", row);
        let fk_filter_rowdata__ = $DS.util.replace(fk_filter_rowdata);

        try {
            // row.A- = - 1 | label(value) -in- 1 (value-sql-sqlebody //如果是查询sql 则中间设置为"sql",后面跟sql)
            let conditionArr = fk_filter_rowdata__.split("|")[0].split(",");
            let optionConditionArr = fk_filter_rowdata__.split("|")[1].split(",");

            //行条件过滤满足过滤数据 或者 条件不存在但是选项过滤表达式存在过滤数据
            if (conditionArr && conditionArr.length > 0 && conditionArr.every(item => item != "") && optionConditionArr && optionConditionArr.length > 0) {
                let flag = conditionArr.every(item => {
                    let rowVal = eval(item.split("-")[0]);
                    let condition = item.split("-")[1];
                    let tagVal = item.split("-")[2];
                    return rowDataSatisfy(condition, rowVal, tagVal);
                });

                if (flag) {
                    return filterOptionsByExpression(optionConditionArr, col);
                } else {
                    return col.options;
                }
            }
            //行条件不存在 直接过滤
            else if (optionConditionArr && optionConditionArr.length > 0) {
                //设置sql 直接查询 sql中设置label和value字段
                if (fk_filter_rowdata__.split("|")[1] && fk_filter_rowdata__.split("|")[1].split("-")[1] == "sql") {
                    return filterOptionsByExpression_Sql(fk_filter_rowdata__, row, this.info);
                } else {
                    return filterOptionsByExpression(optionConditionArr, col);
                }
            } else {
                return col.options;
            }
        } catch (e) {
            console.error(e);
            console.error("根据行数据过滤引用数据异常");
        }
    }
}

/**
 * 根据表达式过滤引用数据
 * @param optionConditionArr
 * @param col
 * @return {[]}
 */
function filterOptionsByExpression(optionConditionArr, col) {
    let filterArr = optionConditionArr.map(item => {
        let filterItem = {};
        filterItem["fieldname"] = item.split("-")[0];
        filterItem["condition"] = item.split("-")[1];
        filterItem["fieldvalue"] = item.split("-")[2];
        return filterItem;
    })
    return $DS.util.filterDataByCondition(col.options, filterArr);
}

/**
 * 根据表达式的sql过滤引用数据
 * @param expression
 * @param row
 * @param info
 * @return {*[]|*}
 */
function filterOptionsByExpression_Sql(expression, row, info) {
    let sql = expression.split("|")[1].split("-")[2];
    let result = $DS.selectBySql(VUECFG.appId, sql, `查询${info.ds_ctrlname}引用数据失败`);
    if (result.isError) {
        console.error(result.errMsg);
        console.error(`根据sql查询表格引用数据异常:sql: ${sql}`);
        return [];
    } else {
        let labelField = "LABEL";
        let valField = "VALUE";
        let flag = result.result.every(item => item.LABEL && item.VALUE);
        if (!flag) {
            labelField = "ITEMNAME";
            valField = "ITEMCODE";
        }

        return result.result.map(item => {
            let option = {};
            option.label = item[labelField];
            option.value = item[valField];
            return option;
        })
    }
}

/**
 * 行条件是否满足
 * @param condition
 * @param rowVal
 * @param tagVal
 * @return {boolean}
 */
function rowDataSatisfy(condition, rowVal, tagVal) {
    var flag = false;
    switch (condition) {
        case "=":
            flag = (rowVal) == tagVal ? true : false;
            break;
        case ">":
            flag = parseFloat(rowVal) > parseFloat(tagVal) ? true : false;
            break;
        case ">=":
            flag = parseFloat(rowVal) >= parseFloat(tagVal) ? true : false;
            break;
        case "<":
            flag = parseFloat(rowVal) < parseFloat(tagVal) ? true : false;
            break;
        case "<=":
            flag = parseFloat(rowVal) <= parseFloat(tagVal) ? true : false;
            break;
        case "!=":
            flag = (rowVal != tagVal) ? true : false;
            break;
        case "in":
            var fieldvalInArr = tagVal.split(",")
            flag = false;
            for (var fi = 0; fi < fieldvalInArr.length; fi++) {
                if ((rowVal + "") == fieldvalue[fi]) {
                    flag = true;
                    break;
                }
            }
            break;
        case "notin":
            var fieldvalNotInArr = tagVal.split(",")
            flag = false;
            for (var fn = 0; fn < fieldvalNotInArr.length; fn++) {
                if ((rowVal + "") != fieldvalNotInArr[fn]) {
                    flag = true;
                    break;
                }
            }
            break;
        case "like":
            flag = (rowVal.indexOf(tagVal) != -1) ? true : false;
            break;
        case "leftlike":
            flag = (rowVal.indexOf(tagVal) == 0) ? true : false;
            break;
        case "rightlike":
            flag = (rowVal.lastIndexOf(tagVal) == 0) ? true : false;
            break;
        default:
            flag = ((rowVal + "") == tagVal) ? true : false;
            break;
    }
    return flag;
}

/**
 * 可编辑表格 是否显示为对应显示控件
 * @param type
 * @param scope
 * @param col
 * @param currColField
 * @param currRowIndex
 * @returns {boolean}
 */
function isShowEditComp(type, scope, col, currColField, currRowIndex) {

    let info = this.info;
    let _this = this;
    switch (type) {
        case 'input':
            if (!col.isexpend && info.ds_isedit && scope.column.columnKey === currColField && (scope.$index === currRowIndex) && (col.fieldShowType === 'input' || col.fieldShowType === 'textarea' || col.fieldShowType === '') && col.isedit && this.computed_treeGridIsedit(scope) && !scope.row.isdividedSum && this.computed_rowIsEditor(scope)) {
                return true;
            } else {
                //isShowArrow(false);
                return false;
            }
            break;
        case 'select':
            if (!col.isexpend && info.ds_isedit && scope.column.columnKey === currColField && (scope.$index === currRowIndex) && col.fieldShowType === 'select' && col.isedit && this.computed_treeGridIsedit(scope) && !scope.row.isdividedSum && this.computed_rowIsEditor(scope))
                return true;
            else return false;
            break;
        case 'switch':
            if (!col.isexpend && info.ds_isedit /*&& scope.column.columnKey === currColField && (scope.$index === currRowIndex) */ && col.fieldShowType === 'switch' && col.isedit && this.computed_treeGridIsedit(scope) && !scope.row.isdividedSum && this.computed_rowIsEditor(scope))
                return true;
            else return false;
            break;
        case 'date-picker':
            if (!col.isexpend && info.ds_isedit && scope.column.columnKey === currColField && (scope.$index === currRowIndex) && col.fieldShowType === 'date' && col.isedit && this.computed_treeGridIsedit(scope) && !scope.row.isdividedSum && this.computed_rowIsEditor(scope))
                return true;
            else return false;
            break;
        case 'radio':
            if (!col.isexpend && info.ds_isedit /*&& scope.column.columnKey === currColField && (scope.$index === currRowIndex) */ && col.fieldShowType === 'radio' && col.isedit && this.computed_treeGridIsedit(scope) && !scope.row.isdividedSum && this.computed_rowIsEditor(scope))
                return true;
            else return false;
            break;
        /*case 'checkbox':
            if (!col.isexpend && info.ds_isedit && scope.column.columnKey === currColField && (scope.$index === currRowIndex) && col.fieldShowType === 'checkbox' && col.isedit && this.computed_treeGridIsedit(scope) && !scope.row.isdividedSum && this.computed_rowIsEditor(scope))
                return true;
            else return false;
            break;*/
    }
}

/**
 * 处理树形表格首列箭头引起的样式问题
 * @param scope
 * @param currRowIndex
 * @returns {{width: string}}
 */
function cellWidthWithTreegrid(scope, currRowIndex) {

    let info = this.info;
    let index = currRowIndex + $grid.level;
    if (info.ds_ds_grid_show_header == false) {
        index = currRowIndex;
    }
    if (info.ds_showsum && info.ds_grid_SummarPostion == "top") {
        index++
    }
    let cellDom = $(`.${scope.column.id}`)[index];
    if (info.ds_tree_grid == true) {
        $(cellDom).find(".el-table__placeholder").attr("placeholderVal", $(cellDom).find(".el-table__placeholder").css("width"));
        $(cellDom).find(".el-table__placeholder").css("width", 0);
        $(cellDom).find(".el-table__indent").attr("paddingVal", $(cellDom).find(".el-table__indent").css("padding-left"));
        $(cellDom).find(".el-table__indent").css("padding-left", 0);
        $(cellDom).find(".el-table__expand-icon").css('display', "none");
    }
    return {width: '100%'};
}


/**
 * 数据显示条件,满足条件不显示单元格数据
 */
function showDataCondition(info, row, col) {
    // 表达式 row.FIELD1==0||row.FIELD2==1
    //设置了不显示字段 以及条件才进行判断
    if (info.ds_showDataCondition && info.ds_endNode_notShowFields && info.ds_endNode_notShowFields.length > 0 && info.ds_endNode_notShowFields.indexOf(col.prop) != -1) {
        if (eval(info.ds_showDataCondition)) {
            return true;
        }
    }
    return false;
}

/**
 * 自动对照
 * @param options 引用数据
 * @param scope  当前行列数据
 * @param dependContrastField 做对照的依据字段
 * @param needContrastField 需要做对照的字段
 * @param fieldType 显示控件
 */
function autoContrast(options, scope, dependContrastField, needContrastField, fieldType) {
    var formatterVal = "";
    var dependContrastVal = scope.row[dependContrastField];
    if (dependContrastVal == undefined || dependContrastVal == null) {
        return formatterVal;
    }
    if (fieldType == "tree") {
        var _option = $DS.util.childrenToList($DS.util.clone(options), "children", []);
        formatterVal = checkAutoContrastVal(dependContrastVal, needContrastField, _option, {
            vaule: "ID",
            label: "NAME"
        }, scope)
    } else {
        formatterVal = checkAutoContrastVal(dependContrastVal, needContrastField, options, {
            value: "value",
            label: "label"
        }, scope)
    }
    return formatterVal;
}

function checkAutoContrastVal(dependContrastVal, needContrastField, options, field, scope) {
    for (let i = 0; i < options.length; i++) {
        if (dependContrastVal.indexOf(options[i][field.label]) !== -1) {
            scope.row[needContrastField] = options[i][field.value];
            scope.row["optType"] = 'updated';
            return options[i][field.label];
        }
    }
    return "";
}

/**
 * 根据节点id 获取自身 及父节点 节点名称
 * @param id
 * @param data
 * @param idField
 * @param nameField
 * @returns {undefined|*}
 */
function getNodeNameByid(id, data) {
    var nameArr = [];
    var pid = "";
    for (let i = 0; i < data.length; i++) {
        if (id == data[i].ID) {
            nameArr.push(data[i].NAME);
            pid = data[i].PID;
            break;
        }
    }
    if (pid) {
        nameArr = getParentNodeName(data, pid, nameArr);
    }
    nameArr.reverse();
    return nameArr.join("/");
}

//获取父节点名称
function getParentNodeName(data, pid, nameArr) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].ID == pid) {
            nameArr.push(data[i].NAME);
            if (data[i].PID) {
                getParentNodeName(data, data[i].PID, nameArr);
            }
        }
    }
    return nameArr;
}


/**
 * 单元格 值变更事件
 */
function cellValChange(value, scope) {

    //列表选择触发 与其相关绑定列的变更
    var showType = this.col.fieldShowType;
    var fuCurrScope, row;
    //change事件
    if (showType === 'switch') {
        //处理单元格为开关时 先触发变更 后触发单元格点击事件而获取不到fuCurrScope问题
        fuCurrScope = scope;
        row = scope.row;
    } else {
        fuCurrScope = ziGetCurrScope(this);
        row = fuCurrScope.row;
    }


    var columns = temporary.gridCols[this.info.ds_id];//this.info.ds_buildAfterCols;//this.info.ds_selectcolumns;
    //正则校验
    if (this.col.checkregular) {
        let res = checkRegular(this.info, this.col.checkregular, value);
        if (!res) {
            scope.row[this.col['prop']] = fuCurrScope.row[this.col['prop']];
            return;
        }
    }
    var flag = $DS.eval(this.info.ds_edit_change, this.info, {value: value, scope, fuScope: fuCurrScope});
    if (!flag) {
        return;
    }
    //设置被绑定列的值
    setValForBDCol(row, columns, this.col['prop'], value);

    switch (showType) {
        case "date":
        case "radio":
        case "switch":
            restoreCell(this, fuCurrScope);//向父组件传递消息 ,还原单元格
            break;
        default:
            break;
    }
    //如果不是新增行 或者 原始行 ,添加编辑标识
    if (!row.optType || row.optType != "inserted") {
        row.optType = 'updated';
    }
    //编辑后事件
    //onAfterEdit(this.info, fuCurrScope);
}

/**
 * 获取表格顶层父组件Vm实例
 * @param childVm
 * @returns {*}
 */
function getTopVm(childVm) {
    if (childVm.$parent.$parent.$options._componentTag === 'drag_grid') {
        return childVm.$parent.$parent;
    } else {
        return getTopVm(childVm.$parent.$parent);
    }
}

/**
 * 设置绑定列数据
 * @param row 当前行
 * @param columns 所有列信息
 * @param currColField 当前列字段
 * @param val 变更值
 */
function setValForBDCol(row, columns, currColField, val) { //考虑绑定列在多层中
    //获取绑定列
    var BDCols = columns.filter(item => item.isbdcol === "1" && item.bdfiledname === currColField);
    BDCols.forEach(function (item) {
        //修改绑定列值
        row[item.FIELD_NAME] = val
    })
}

/**
 * 下拉列表展开和隐藏时触发事件
 * @param val 展开 true  隐藏 false
 */
function cellVisibleChange(val) {

    if (val == false) {//下拉选项收起时 ,向父组件传递数据 ,还原单元格
        restoreCell(this, ziGetCurrScope(this));
    }
}

/**
 * 是否编辑开关变更事件
 */
function chaneEditSwitch(info, val) {
    var ctrlId = info.ds_pid;
    //控制右侧表格是否显示编辑按钮属性
    $DS.setRightProShow(ctrlId, {
        "ds_showeditbutton": val ? true : false,
        "ds_edit_after": val ? true : false,
        "ds_edit_change": val ? true : false
    });
}

/**
 *高亮行输入框值变更事件
 */
function highWordChange(obj, val) {

    var info = VUECFG.formObj[VUECFG.ctrlId].info;
    info.ds_highlightword = val;

    setHighLightWord();//根据关键字确定高亮的行
    //是否显示高亮颜色设置
    var ctrlId = obj.ds_pid;
    $DS.setRightProShow(ctrlId, {"ds_highrowcolor": val ? true : false})

}

/**
 *根据关键字确定高亮的行
 */
function setHighLightWord() {

    var info = VUECFG.formObj[VUECFG.ctrlId].info;
    var word = info.ds_highlightword
    if (!word || word === '') {
        info.ds_highlightguids = [];
    } else {
        var _highRowGUID = [];
        $.each(temporary.gridShowData[info.ds_id], function (index, item) {
            for (var key in item) {
                if (typeof item[key] === 'string' && key != 'GUID' && item[key].indexOf(word) != -1) {
                    _highRowGUID.push(item.GUID);
                    break;
                }
            }
        })
        info.ds_highlightguids = _highRowGUID;

    }
    //重新渲染表格
    renderGrid(info.ds_id);
}


/********************************************************************
 * *********    根据数据源来选择表格字段              *****************
 * ******************************************************************
 */
/**
 * 右侧属性点击选择字段事件
 */
function selectColEvent(obj, event) {

    $grid.optTypeOut = 'selectColumns';
    $("#" + VUECFG.ctrlId + "_position").click();
}


/**
 * 选择字段打开页面
 */
function selectColBySource(proInfo, event) {
    debugger
    var info = $DS.getCtrlById(proInfo.ds_pid).info;
    if (!info.ds_datasource) {
        $("#" + proInfo.ds_id).find("input").blur();
        console.error("未设置数据源");
    } else {
        let base64 = new Base64();
        var fielsInfo = info.ds_fieldinfo;
        info.ds_columns = $DS.getSourceById(info.ds_datasource).columns;//每次获取最新的列数据
        var sourceCols = $DS.util.clone(info.ds_columns);//数据源字段
        sourceCols = buildSourceCols(fielsInfo, sourceCols);
        var selectCols = info.ds_selectcolumns?.length > 0 ? $DS.util.clone(info.ds_selectcolumns) : $DS.util.clone(sourceCols);//当前控件已选择字段
        for (let i = 0; i < selectCols.length; i++) {
            if (selectCols[i].CUSTOMHTML && !$DS.util.isBase64Str(selectCols[i].CUSTOMHTML)) {
                selectCols[i].CUSTOMHTML = base64.encode(selectCols[i].CUSTOMHTML);
            }
        }

        var sid = Date.parse(new Date());
        var params = {
            sourceCols: sourceCols,
            selectCols: selectCols,
            ctrlId: info.ds_id
        };
        window.top[sid] = params;
        var url = $DS.util.getProjectName() + "/freeForm/manage/condi/selectGridColumns.jsp?sid=" + sid;
        var args = {
            hideTit: false, time: '', beginClose: '', callBack: function () {
            }
        }
        $DS.showPage(url, "选择字段", "90%", "90%", args, false);
    }

}

/**
 * 构建选择列属性的右侧表格数据
 * @param fieldInfo
 * @param sourceCols
 */
function buildSourceCols(fieldInfo, sourceCols) {
    sourceCols = sourceCols.map(item => {
        var info = fieldInfo[item.FIELD_NAME];
        if (info) {
            item["SHOW_COMPONENT"] = info.SHOW_COMPONENT;//显示控件
            item["ISEXPEND"] = info.ISEXPEND ? info.ISEXPEND : false;//是否展开
            item["isedit"] = info.isedit ? info.isedit : true;//是否可编辑
            item["FIELD_TYPE"] = info.FIELD_TYPE ? info.FIELD_TYPE : "";//字段类型
            item["ALIGNTYPE"] = info.ALIGNTYPE ? info.ALIGNTYPE : "";//文字对齐方式 居左居右居中
            item["FIELD_DECLENGTH"] = info.FIELD_DECLENGTH ? info.FIELD_DECLENGTH : 0;//保留小数位数
            item["DATE_FORMATER"] = info.FIELD_DECLENGTH ? info.FIELD_DECLENGTH : ""//日期格式化类型
            item["ISMERGECOL"] = info.ISMERGECOL ? info.ISMERGECOL : false;//是否合并列\
            item["ISSUM"] = info.ISSUM ? info.ISSUM : "0";//是否求和
        }
        return item;
    });
    return sourceCols;
}

/**
 * 根据数据源选择字段的回调方法
 * @param selectCols
 * @param id
 */
function callBackSelectGridField(selectCols, id) {

    let base64 = new Base64();
    var info = VUECFG.formObj[id].info;
    // var selectLevelCols = getLevelCols(selectCols, info);//如果是多层表格 ,构造含children的列数据
    info.ds_grid_filterFiled = [];
    for (var i = 0; i < selectCols.length; i++) {
        if (selectCols[i].ISFILTERED == true) {
            info.ds_grid_filterFiled.push(selectCols[i].FIELD_NAME)
        }
        if (selectCols[i].CUSTOMHTML && $DS.util.isBase64Str(selectCols[i].CUSTOMHTML)) {
            selectCols[i].CUSTOMHTML = base64.decode(selectCols[i].CUSTOMHTML);
        }
    }
    info.ds_selectcolumns = selectCols;
    renderGrid(info.ds_id);
}


/**
 * 设置树形结构表格
 * @param info
 * @param val
 */
function controlTreeGrid(info, val) {

    $DS.setRightProShow(info.ds_pid, {
        ds_divided_into_summary: val,
        ds_tree_grid_onlyEditEnd: val,
    });
    var pInfo = $DS.getCtrlById(info.ds_pid).info;
    //开启树形结构数据且开启复选框时 显示属性 只选择中间级别
    if (pInfo.ds_showcheckbox && val) {
        $DS.setRightProShow(info.ds_pid, {ds_choseMidOnly: true});
    } else {
        $DS.setRightProShow(info.ds_pid, {ds_choseMidOnly: false});
    }
    var rowKey = pInfo.ds_row_key ? pInfo.ds_row_key : "index";
    var rowPid = pInfo.ds_row_pid;
    if (!rowPid) {
        alert("未设置【 上级字段 】属性!");
        return;
    }
    if (!pInfo.ds_grid || pInfo.ds_grid <= 0) {
        return;
    }
    //组织树形结构数据
    if (val == true) {
        setTreeGridData(pInfo, rowKey, rowPid);
    } else {
        cancelTreeGridData(pInfo);
    }

    renderGrid(info.ds_pid);
}


/**
 * 设置 树形结构数据
 */
function setTreeGridData(info, rowKey, rowPid) {

    info.ds_grid = $DS.util.children(info.ds_grid, rowKey, rowPid, "children");
}

/**
 * 设置为普通表格
 * @param info
 */
function cancelTreeGridData(info) {

    var gridData = info.ds_grid;
    var newData = [];
    newData = getChildrenData(gridData, newData);
    info.ds_grid = newData;
}

function getChildrenData(gridData, newData) {

    for (let i = 0; i < gridData.length; i++) {
        if (!gridData[i].children) {
            newData.push(gridData[i])
        } else {
            var child = $DS.util.clone(gridData[i].children);
            delete gridData[i].children;
            newData.push(gridData[i]);
            getChildrenData(child, newData);
        }
    }
    return newData;
}

/**
 * 设置分层汇总
 * @param info
 * @param val
 */
function dividedSummary(info, val) {

    var gridData = $DS.util.clone(info.ds_grid);
    var gridCols = info.ds_realcols;
    var realcols = gridCols.filter(item => {
        if (item.fieldShowType != "none" && item.fieldShowType != "hidden") {
            return item;
        }
    });
    gridData = getdividedSummary(gridData, realcols, info, val);
    info.ds_grid = gridData;
}

/**
 * 添加合计行数据
 * @param gridData
 * @param gridCols
 * @param info
 * @returns {*}
 *  @param type
 */
function getdividedSummary(gridData, gridCols, info, type) {
    let data = $DS.util.childrenToList(gridData, "children", []);
    for (let i = data.length - 1; i >= 0; i--) {
        let row = data[i];
        if (!row.children) {
            continue;
        }
        if (row.children && row.children.length > 0) {
            var sumRow = getSum(row.children, gridCols, info);
            row = $.extend(row, sumRow);
            delete row.children
        }
    }
    var rowId = info.ds_row_id ? info.ds_row_id : (info.ds_row_key ? info.ds_row_key : "index");
    var rowPid = info.ds_row_pid;

    return $DS.util.children(data, rowId, rowPid, "children");
    /*for (let i = 0; i < gridData.length; i++) {
        if (gridData[i].children) {
            //求和
            if (type) {
                var sumRow = getSum(gridData[i].children, gridCols, info);
                //sumRow[info.ds_row_pid] = gridData[i].children[0][info.ds_row_pid];
                //gridData[i].children.push(sumRow);
                gridData[i] = $.extend(gridData[i], sumRow);
                getdividedSummary(gridData[i].children, gridCols, info, type);
            } /!*else {
                //还原
                gridData[i].children = gridData[i].children.filter(item => {
                    if (!item.isdividedSum) {
                        return item;
                    }
                });
                getdividedSummary(gridData[i].children, gridCols, info, type);
            }*!/
        }
    }*/
    return gridData;
}

/**
 * 计算分层汇总的合计数据
 * @param data
 * @param columns
 * @param info
 * @returns {{}}
 */
function getSum(data, columns, info) {
    var sums = {};
    var _data = data;
    /*if (_data[data.length - 1].isdividedSum) {
        _data.pop();
    }*/
    var fieldInfo = info.ds_fieldinfo;
    var colObj = getColObj(info.ds_id);
    columns.forEach((column, index) => {
        if (colObj[column.id]) {
            let isSum = colObj[column.id].issum;
            /* if (index === 0) {
                 //显示字段
                 sums[column.id] = '合计';
             } else*/
            if (isSum === '1') {
                const values = _data.map(item => Number(item[column.id]));
                if (!values.every(value => isNaN(value))) {
                    sums[column.id] = values.reduce((prev, curr, index) => {

                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr
                        } else {
                            return prev
                        }
                    }, 0)
                } else {
                    sums[column.id] = ''
                }
            } /*else {
                sums[column.id] = ''
            }*/
        }
    })
    sums["isdividedSum"] = true;
    //如果 不存在row-key 列 添加
    /*if (!sums[info.ds_row_key]) {
        sums[info.ds_row_key] = $DS.util.UUID().replaceAll("-", "").toUpperCase();
    }*/
    return sums;
}


/**
 * 获取数据源字段 option
 */
function getSourceFieldOption(info) {

    var ctrl = $DS.getCtrlById(info.ds_pid).info;
    var options = [{"label": "无", "value": ""}];
    if (ctrl && ctrl.ds_datasource) {
        var fieldinfo = (ctrl.ds_selectcolumns && ctrl.ds_selectcolumns.length > 0) ? ctrl.ds_selectcolumns : ctrl.ds_columns;//$DS.getCtrlById(VUECFG.ctrlId).info.ds_fieldinfo;
        if (fieldinfo) {
            for (let key in fieldinfo) {
                var item = {};
                item["label"] = fieldinfo[key].FIELD_NAMECN;
                item["value"] = fieldinfo[key].FIELD_NAME;
                options.push(item);
            }
        }
    }
    info.ds_options = options;
}


/**
 * 选择固定列
 * @param info
 * @param val
 */
function selectFixedCol(info, val) {

    var pInfo = $DS.getCtrlById(info.ds_pid).info;
    var cols = getGridCols(info.ds_pid);//原始列信息
    var _cols = [];//新的列信息
    var leftCols = info.ds_id === "ds_fixed_cols_left" ? val : pInfo.ds_fixed_cols_left;//固定在左侧的列
    var rightCols = info.ds_id === "ds_fixed_cols_right" ? val : pInfo.ds_fixed_cols_right;//固定在右侧的列
    //清空

    _cols = cols.map(item => {
        if (rightCols.indexOf(item.FIELD_NAME) === -1 && leftCols.indexOf(item.FIELD_NAME) === -1 && item.fixed) {
            delete item.fixed;
        } else if (rightCols.indexOf(item.FIELD_NAME) !== -1) {
            item["fixed"] = "right"
        } else if (leftCols.indexOf(item.FIELD_NAME) !== -1) {
            item["fixed"] = "left"
        }
        return item;
    })
    setGridCols(info.ds_pid, _cols);
    renderGrid(info.ds_pid);
}


/**
 * 设置表格列数据
 * @param id
 * @param cols
 */
function setGridCols(id, cols) {
    var info = $DS.getCtrlById(id).info;
    if (info.ds_columns && typeof (info.ds_columns) == 'string') {
        //手工输入的
        info.ds_columns = JSON.stringify(cols);
    } else if (info.ds_selectcolumns.length === 0) {
        info.ds_columns = cols;
    } else {
        //控件从数据源选择的列
        info.ds_selectcolumns = cols;
    }
}

/**
 * 获取表格列数据
 * @param id
 */
function getGridCols(id) {
    var info = $DS.getCtrlById(id).info;
    if (info.ds_columns && typeof (info.ds_columns) == 'string') {
        //手工输入的
        return JSON.parse(info.ds_columns);
    } else {
        //控件从数据源选择的列
        return (info.ds_selectcolumns.length === 0) ? info.ds_columns : info.ds_selectcolumns;
    }
}


function reloadGridForCheckChange(info, val) {

    var pInfo = $DS.getCtrlById(info.ds_pid).info;
    //开启树形结构数据且开启复选框时 显示属性 只选择中间级别
    if (pInfo.ds_tree_grid && val) {
        $DS.setRightProShow(info.ds_pid, {ds_choseMidOnly: true});
    } else {
        $DS.setRightProShow(info.ds_pid, {ds_choseMidOnly: false});
    }

    $DS.setRightProShow(info.ds_pid, {ds_grid_clickRowSelectCheckbox: val});
    $DS.setRightProShow(info.ds_pid, {ds_gridselect: val});

    renderGrid(info.ds_pid);
}

/**
 * 改变属性 重置数据是否选中的状态标志
 * @param info
 * @param val
 */
function clearCheckInfo(info, val) {

    var pinfo = $DS.getCtrlById(info.ds_pid).info;
    for (let i = 0; i < pinfo.ds_grid.length; i++) {
        pinfo["treegrid_ischecked"] = false;
    }
    $grid.clearSelection(info.ds_pid);
}

//显示合计行树形变更事件
function showSumChange(info, val) {
    renderGrid(info.ds_pid);
}

function isshowDividedSumPro(info, val) {
    $DS.setRightProShow(info.ds_pid, {
        ds_divided_into_summary_rowColor: val,
        ds_divided_into_summary_fontColor: val,
        ds_divided_into_summary_fontSize: val
    });
}


/**
 * 数据轮播属性状态变更
 * @param info
 * @param val
 */
function changeDataCarouselStatus(info, val) {

    var pinfo = $DS.getCtrlById(info.ds_pid).info;
    pinfo.ds_dataCarousel = val;
    setDataCarousel(pinfo, val)
}

/**
 * 修改轮播频率
 * @param info
 * @param val
 */
function changeAmplitude(info, val) {

    var pinfo = $DS.getCtrlById(info.ds_pid).info;
    if (pinfo.ds_dataCarousel) {
        if (temporary[pinfo.ds_id + "_dataCarousel"]) {
            window.clearInterval(temporary[pinfo.ds_id + "_dataCarousel"]);
        }
        pinfo.ds_dataCarousel_frequency = val;
        setDataCarousel(pinfo, true);
    }
}

/**
 * 设置轮播
 * @param info
 * @param val 是否轮播
 */
function setDataCarousel(info, val) {

    if (!info.ds_dataCarousel) {
        return;
    }

    var frequency = info.ds_dataCarousel_frequency ? parseInt(info.ds_dataCarousel_frequency) * 1000 : 1000;//滚动频率

    if (val == true) {
        try {
            temporary[info.ds_id + "_dataCarousel"] = setInterval(function () {
                var amplitude = "";//滚动辐度
                //默认滚一行高度
                if (info.ds_dataCarousel_amplitude) {
                    amplitude = info.ds_dataCarousel_amplitude;
                } else {
                    amplitude = $("#" + info.ds_id + " .el-table__body-wrapper tr").css("height");
                }

                var scroll = $("#" + info.ds_id + " .el-table__body-wrapper");
                if (scroll) {
                    var elHight = scroll[0].clientHeight;
                    var postion = parseInt(scroll[0].scrollHeight - scroll[0].scrollTop);
                    //取绝对值在2以内 滚动到底部
                    if (Math.abs(elHight - postion) <= 2) {
                        //如果开启分页 判断当前是否为最后一页 是跳转第一页 ,否则 切换下一页
                        if (info.ds_pagination) {
                            var currentPage = $grid.getCurrentPage(info.ds_id);
                            var pageSize = info.ds_pagecount;
                            if (currentPage == pageSize) {
                                $grid.setCurrentPage(info.ds_id, 1);
                            } else {
                                $grid.setCurrentPage(info.ds_id, currentPage + 1);
                            }
                        }
                        scroll.scrollTop(0);
                    } else {
                        scroll.scrollTop(scroll.scrollTop() + parseInt(amplitude));
                    }
                }
            }, frequency)
        } catch (e) {
            console.error(e);
            window.clearInterval(temporary[info.ds_id + "_dataCarousel"]);
        }
    } else {
        window.clearInterval(temporary[info.ds_id + "_dataCarousel"])
    }
}


//设置日期列相关配置
function setDateColCfg(info) {

    let gridInfo = $DS.getCtrlById(info.ds_pid).info;
    if (gridInfo.ds_selectcolumns.length == 0) {
        $("#" + info.ds_id).find("input").blur();
        alert('请先选择字段');
        return
    }


    let common_fields = [{
        field: "FIELD_NAME",
        title: "字段名",
        width: 0.15,
    }, {
        field: "FIELD_NAMECN",
        title: "字段中文名",
        width: 0.15,
    }, {
        field: "DATETYPE",
        title: "日期控件类型",
        width: 0.15,
        codeType: 'select',
        code: [
            {name: "datetime", value: "datetime"},
            {name: "year", value: "year"},
            {name: "month", value: "month"},
            {name: "date", value: "date"},
            {name: "week", value: "week"},
        ]
    }, {
        field: 'DATE_FORMATER',
        title: '格式化日期',
        align: 'center',
        edit: 'text',
        width: 0.2,
    }, {
        field: "DISABLEDDATE",
        title: "禁用范围",
        width: 0.1,
        codeType: 'select',
        code: [
            {name: "无", value: "none"},
            {name: "当前时间前", value: "prv"},
            {name: "当前时间后", value: "next"},
            {name: "关联字段前", value: "prvByField"},
            {name: "关联字段后", value: "nextByField"},
        ]
    }, {
        field: "DISABLEDDATEFIELD",
        title: "禁用范围关联字段",
        width: 0.25,
        codeType: 'select',
        code: gridInfo.ds_selectcolumns.map(item => {
            return {name: `${item.FIELD_NAMECN} (${item.FIELD_NAME})`, value: item.FIELD_NAME}
        })
    }]
    $DS.openCfgTable(common_fields, gridInfo.ds_selectcolumns.filter(item => item.SHOW_COMPONENT == 'date'), function (data) {

        if (data && JSON.parse(data)?.length > 0) {
            JSON.parse(data).forEach(dateCol => {
                let col = gridInfo.ds_selectcolumns.find(col => col.FIELD_NAME === dateCol.FIELD_NAME);
                common_fields.forEach(fieldCfg => col[fieldCfg.field] = dateCol[fieldCfg.field]);
            })
        }
    }, '90%', '90%', '日期列配置', {hiddenBtn: true})
}


//引用数据列 数据过滤配置
function setRefColCfg(info) {

    let gridInfo = $DS.getCtrlById(info.ds_pid).info;
    if (gridInfo.ds_selectcolumns.length == 0) {
        $("#" + info.ds_id).find("input").blur();
        alert('请先选择字段');
        return
    }

    let common_fields = [{
        field: "FIELD_NAME",
        title: "字段名",
        width: 0.15,
    }, {
        field: "FIELD_NAMECN",
        title: "字段中文名",
        width: 0.15,
    }, {
        field: 'FK_FILTER_SQL',
        title: '引用数据过滤条件(例: FIELDA>0 AND FIELDB>0)',
        width: 0.35,
        align: "center",
        edit: 'text'
    }, {
        field: 'FK_FILTER_ROWDATA',
        title: '根据行过滤引用数据(例: row.FIELDA-=-XXX1|label-like-XXX2)',
        width: 0.35,
        align: "center",
        edit: 'text'
    }
    ]
    let refCols = ['select', 'switch', 'radio'];
    $DS.openCfgTable(common_fields, gridInfo.ds_selectcolumns.filter(item => refCols.includes(item.SHOW_COMPONENT)), function (data) {

        if (data && JSON.parse(data)?.length > 0) {
            JSON.parse(data).forEach(refCol => {
                let col = gridInfo.ds_selectcolumns.find(col => col.FIELD_NAME === refCol.FIELD_NAME);
                common_fields.forEach(fieldCfg => col[fieldCfg.field] = refCol[fieldCfg.field]);
            })
        }
    }, '90%', '90%', '引用数据过滤', {hiddenBtn: true})
}


//展开行配置
function setExpendColCfg(info) {

    let gridInfo = $DS.getCtrlById(info.ds_pid).info;
    if (gridInfo.ds_selectcolumns.length == 0) {
        $("#" + info.ds_id).find("input").blur();
        alert('请先选择字段');
        return
    }

    let common_fields = [{
        field: "FIELD_NAME",
        title: "字段名",
        width: 0.15,
    }, {
        field: "FIELD_NAMECN",
        title: "字段中文名",
        width: 0.15,
    }, {
        field: 'ISEXPEND',
        title: '是否展开行',
        width: 0.35,
        align: "center",
        codeType: "switch",
        code: [{
            name: "是",
            value: true
        }, {
            name: "否",
            value: false
        }]
    }, {
        field: 'EXPENDWIDTH',
        title: '展开行宽度',
        width: 0.35,
        align: "center",
        edit: 'text',
    }]

    let refCols = ['hidden', 'none'];
    $DS.openCfgTable(common_fields, gridInfo.ds_selectcolumns.filter(item => !refCols.includes(item.SHOW_COMPONENT)), function (data) {

        if (data && JSON.parse(data)?.length > 0) {
            JSON.parse(data).forEach(expendCol => {
                let col = gridInfo.ds_selectcolumns.find(col => col.FIELD_NAME === expendCol.FIELD_NAME);
                common_fields.forEach(fieldCfg => col[fieldCfg.field] = expendCol[fieldCfg.field]);
            })
        }
    }, '90%', '90%', '展开行配置', {hiddenBtn: true})
}


//编辑配置
function setEditColCfg(info) {

    let gridInfo = $DS.getCtrlById(info.ds_pid).info;
    if (gridInfo.ds_selectcolumns.length == 0) {
        $("#" + info.ds_id).find("input").blur();
        alert('请先选择字段');
        return
    }

    let common_fields = [{
        field: "FIELD_NAME",
        title: "字段名",
        width: 0.15,
    }, {
        field: "FIELD_NAMECN",
        title: "字段中文名",
        width: 0.15,
    }, {
        field: 'isedit',
        title: '是否可编辑',
        width: 0.35,
        align: "center",
        codeType: "switch",
        code: [{
            name: "是",
            value: true
        }, {
            name: "否",
            value: false
        }]
    }, {
        field: 'CHECKREGULAR',
        title: '值变更校验',
        width: 0.35,
        codeType: 'commonTable',
        code: [{
            edit: "text",
            field: "expression",
            title: "正则表达式",
            width: 0.5
        }, {
            edit: "text",
            field: "errMsg",
            title: "错误提示",
            width: 0.5
        }]
    }]

    let refCols = ['hidden', 'none'];
    let settingCols = gridInfo.ds_selectcolumns.filter(item => !refCols.includes(item.SHOW_COMPONENT));
    $DS.openCfgTable(common_fields, settingCols, function (data) {
        debugger
        console.log(data)
        if (data && JSON.parse(data)?.length > 0) {
            JSON.parse(data).forEach(editCol => {
                let col = gridInfo.ds_selectcolumns.find(col => col.FIELD_NAME === editCol.FIELD_NAME);
                common_fields.forEach(fieldCfg => col[fieldCfg.field] = editCol[fieldCfg.field]);
            })
        }
    }, '90%', '90%', '展开行配置', {hiddenBtn: true})
}

//==============================属性============================================================

/**
 * 配置右侧属性
 */
function showPropertyGrid(change) {
    var cfg = [];
    //组件类型
    var type = getProInfoByObj("select", {
        ds_id: "type",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "组件类型",
        ds_placeholder: "组件类型",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: true,
        ds_options: getAllCtrl(),
        ds_select: $grid.type,
        ds_select_change: "changeFormCtrl",
        ds_name: "type",
        ds_ispro: true
    })
    cfg.push(type);

    //控件名
    var ds_ctrlname = getProInfoByObj("input", {
        ds_id: "ds_ctrlname",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件名",
        ds_placeholder: "控件名",
        ds_input: VUECFG.formObj[VUECFG.ctrlId].info.ds_ctrlname,
        ds_input_blur: "checkDuplication",
        ds_name: "ds_ctrlname",
        ds_ispro: true
    })
    cfg.push(ds_ctrlname);

    //控件宽度
    var ds_width = getProInfoByObj("input", {
        ds_id: "ds_width",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件宽度",
        ds_placeholder: "控件宽度",
        ds_input: "100%",
        ds_name: "ds_width",
        ds_ispro: true,
        ds_isrequired: false
    })
    cfg.push(ds_width);

    //控件高度
    var ds_height = getProInfoByObj("input", {
        ds_id: "ds_height",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "控件高度",
        ds_placeholder: "控件高度",
        ds_input: "100%",
        ds_name: "ds_height",
        ds_ispro: true,
    })
    cfg.push(ds_height);

    //数据源
    var ds_datasource = getProInfoByObj("select", {
        ds_id: "ds_datasource",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "数据源",
        ds_placeholder: "数据源",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: getAllDatasource(),
        ds_select: "",
        ds_select_change: "changeDataSourceForCtrl",
        ds_select_visible_change: "changeDatasourceOption",
        ds_name: "ds_datasource",
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(ds_datasource);

    //根据数据源选择表字段
    var ds_selectcolumns = getProInfoByObj("input", {
        ds_id: "ds_selectcolumns",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "选择字段",
        ds_placeholder: "点击选择字段",
        ds_input: "",
        ds_name: "ds_selectcolumns",
        ds_input_focus: "selectColBySource",
        ds_readonly: true,
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(ds_selectcolumns);

    //设置row-key字段
    var ds_row_key = getProInfoByObj("input", {
        ds_id: "ds_row_key",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "设置row-key字段",
        ds_placeholder: "设置row-key字段",
        ds_input: "",
        ds_name: "ds_row_key",
        ds_ispro: true,
        group1: "数据源",
        group2: ""
    })
    cfg.push(ds_row_key);


    var ds_colSetting_date = getProInfoByObj("input", {
        ds_id: "ds_colSetting_date",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "日期列设置",
        ds_placeholder: "日期列设置",
        ds_input: "",
        ds_name: "ds_colSetting_date",
        ds_ispro: true,
        ds_input_focus: 'setDateColCfg',
        group1: "列配置",
    })
    cfg.push(ds_colSetting_date);

    //引用数据列配置
    var ds_colSetting_refData = getProInfoByObj("input", {
        ds_id: "ds_colSetting_refData",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "引用数据过滤",
        ds_placeholder: "引用数据过滤",
        ds_input: "",
        ds_name: "ds_colSetting_refData",
        ds_ispro: true,
        ds_input_focus: 'setRefColCfg',
        group1: "列配置",
    })
    cfg.push(ds_colSetting_refData);

    //展开行配置
    var ds_colSetting_expendCol = getProInfoByObj("input", {
        ds_id: "ds_colSetting_expendCol",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "展开行配置",
        ds_placeholder: "展开行配置",
        ds_input: "",
        ds_name: "ds_colSetting_expendCol",
        ds_ispro: true,
        ds_input_focus: 'setExpendColCfg',
        group1: "列配置",
    })
    cfg.push(ds_colSetting_expendCol);
    //内边距大小
    var ds_out_padding = getProInfoByObj("input", {
        ds_id: "ds_out_padding",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "内边距大小",
        ds_placeholder: "内边距大小",
        ds_input: "0rem",
        ds_name: "ds_out_padding",
        ds_ispro: true,
        group1: "属性",
        group2: "组件布局"
    })
    cfg.push(ds_out_padding);

    //外边距大小
    var ds_out_margin = getProInfoByObj("input", {
        ds_id: "ds_out_margin",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "外边距大小",
        ds_placeholder: "外边距大小",
        ds_input: "0rem",
        ds_name: "ds_out_margin",
        ds_ispro: true,
        group1: "属性",
        group2: "组件布局"
    })
    cfg.push(ds_out_margin);

    //是否显示表格边框
    var ds_grid_isShowBorder = getProInfoByObj("switch", {
        ds_id: "ds_grid_isShowBorder",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示竖向边框",
        ds_name: "ds_grid_isShowBorder",
        ds_switch: true,
        ds_ispro: true,
        group1: "属性",
        group2: "组件样式"
    })
    cfg.push(ds_grid_isShowBorder);

    //显示横向边框
    var ds_grid_isShowCrosswiseBorder = getProInfoByObj("switch", {
        ds_id: "ds_grid_isShowCrosswiseBorder",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示横向边框",
        ds_name: "ds_grid_isShowCrosswiseBorder",
        ds_switch: true,
        ds_ispro: true,
        group1: "属性",
        group2: "组件样式"
    })
    cfg.push(ds_grid_isShowCrosswiseBorder);

    //是否显示表头
    var ds_grid_show_header = getProInfoByObj("switch", {
        ds_id: "ds_grid_show_header",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "显示表头",
        ds_name: "ds_grid_show_header",
        ds_ispro: true,
        ds_show: true,
        ds_switch: true,
        group1: "属性",
        group2: "表头样式"
    })
    cfg.push(ds_grid_show_header);

    //表头背景颜色
    var ds_grid_head_backgroundColor = getProInfoByObj("color", {
        ds_id: "ds_grid_head_backgroundColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "表头背景颜色",
        ds_name: "ds_grid_head_backgroundColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#eaeef9",
        ds_show: true,
        group1: "属性",
        group2: "表头样式"
    })
    cfg.push(ds_grid_head_backgroundColor);

    //表头字体颜色
    var ds_grid_head_fontColor = getProInfoByObj("color", {
        ds_id: "ds_grid_head_fontColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "表头字体颜色",
        ds_name: "ds_grid_head_fontColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#000000",
        ds_show: true,
        group1: "属性",
        group2: "表头样式"
    })
    cfg.push(ds_grid_head_fontColor);

    //表头字体大小
    var ds_grid_head_fontSize = getProInfoByObj("input", {
        ds_id: "ds_grid_head_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "表头字体大小",
        ds_placeholder: "表头字体大小",
        ds_input: "1.2rem",
        ds_name: "ds_grid_head_fontSize",
        ds_ispro: true,
        group1: "属性",
        group2: "表头样式"
    })
    cfg.push(ds_grid_head_fontSize);


    //表头行高
    var ds_grid_head_height = getProInfoByObj("input", {
        ds_id: "ds_grid_head_height",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "表头行高",
        ds_placeholder: "表头行高",
        ds_input: "2rem",
        ds_name: "ds_grid_head_height",
        ds_ispro: true,
        group1: "属性",
        group2: "表头样式"
    })
    cfg.push(ds_grid_head_height);


    //是否显示斑马纹
    var ds_grid_isShowStripe = getProInfoByObj("switch", {
        ds_id: "ds_grid_isShowStripe",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示斑马纹",
        ds_name: "ds_grid_isShowStripe",
        ds_switch: true,
        ds_ispro: true,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_isShowStripe);


    //斑马纹颜色
    var ds_grid_body_stripeColor = getProInfoByObj("color", {
        ds_id: "ds_grid_body_stripeColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "斑马纹颜色",
        ds_name: "ds_grid_body_stripeColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#FAFAFA",
        ds_show: true,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_body_stripeColor);

    //表格行颜色
    var ds_grid_body_rowColor = getProInfoByObj("color", {
        ds_id: "ds_grid_body_rowColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "表格行颜色",
        ds_name: "ds_grid_body_rowColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#ffffff",
        ds_show: true,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_body_rowColor);

    //表内容字体颜色
    var ds_grid_body_fontColor = getProInfoByObj("color", {
        ds_id: "ds_grid_body_fontColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "数据字体颜色",
        ds_name: "ds_grid_body_fontColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#000000",
        ds_show: true,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_body_fontColor);

    //表格内容字体大小
    var ds_grid_body_fontSize = getProInfoByObj("input", {
        ds_id: "ds_grid_body_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "数据字体大小",
        ds_placeholder: "表格数据字体大小",
        ds_input: "1.1rem",
        ds_name: "ds_grid_body_fontSize",
        ds_ispro: true,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_body_fontSize);

    //表格行高
    var ds_grid_body_height = getProInfoByObj("input", {
        ds_id: "ds_grid_body_height",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "表格行高",
        ds_placeholder: "表格行高",
        ds_input: "2rem",
        ds_name: "ds_grid_body_height",
        ds_ispro: true,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_body_height);


    //鼠标悬浮行颜色
    var ds_grid_body_hoverRowColor = getProInfoByObj("color", {
        ds_id: "ds_grid_body_hoverRowColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "鼠标悬浮行颜色",
        ds_name: "ds_grid_body_hoverRowColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#A8EAF7",
        ds_show: false,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_body_hoverRowColor);

    //选中行颜色
    var ds_grid_body_currentRowColor = getProInfoByObj("color", {
        ds_id: "ds_grid_body_currentRowColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "选中行颜色",
        ds_name: "ds_grid_body_currentRowColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#A8EAF7",
        ds_show: false,
        group1: "属性",
        group2: "表格体样式"
    })
    cfg.push(ds_grid_body_currentRowColor);

    //是否可编辑
    var ds_isedit = getProInfoByObj("switch", {
        ds_id: "ds_isedit",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否可编辑",
        ds_name: "ds_isedit",
        ds_switch: false,
        ds_switch_change: "chaneEditSwitch",
        ds_ispro: true,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_isedit);

    //编辑配置
    var ds_colSetting_editCol = getProInfoByObj("input", {
        ds_id: "ds_colSetting_editCol",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "编辑配置",
        ds_placeholder: "编辑配置",
        ds_name: "ds_colSetting_editCol",
        ds_input_focus: 'setEditColCfg',
        ds_ispro: true,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_colSetting_editCol);

    //根据数据源选择表字段
    var ds_row_CannotEditorCondition = getProInfoByObj("input", {
        ds_id: "ds_row_CannotEditorCondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "行不可编辑条件",
        ds_placeholder: "row.FIELD1=='0'",
        ds_name: "ds_row_CannotEditorCondition",
        ds_ispro: true,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_row_CannotEditorCondition);

    //是否显示编辑按钮
    var ds_showeditbutton = getProInfoByObj("switch", {
        ds_id: "ds_showeditbutton",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示编辑按钮",
        ds_name: "ds_showeditbutton",
        ds_switch: false,
        ds_show: false,
        ds_ispro: true,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_showeditbutton);

    //编辑 变更事件
    var ds_edit_change = getProInfoByObj("jseditor", {
        ds_id: "ds_edit_change",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "值变更事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{value:, scope}变更值//失去焦点或回车触发",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_edit_change",
        ds_ispro: true,
        ds_savedb: false,
        ds_show: false,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_edit_change);

    //编辑后事件
    var ds_edit_after = getProInfoByObj("jseditor", {
        ds_id: "ds_edit_after",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "编辑后事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:事件对象scope",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_edit_after",
        ds_ispro: true,
        ds_savedb: false,
        ds_show: false,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_edit_after);

    //获取焦点事件
    var ds_grid_getInputFocus = getProInfoByObj("jseditor", {
        ds_id: "ds_grid_getInputFocus",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "获取焦点事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:事件对象scope",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_grid_getInputFocus",
        ds_ispro: true,
        ds_savedb: false,
        ds_show: true,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_grid_getInputFocus);

    //在 Input 值改变时触发
    var ds_grid_cellInput = getProInfoByObj("jseditor", {
        ds_id: "ds_grid_cellInput",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "输入框值变更",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:输入的值//输入框值变更时触发",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_grid_cellInput",
        ds_ispro: true,
        ds_savedb: false,
        ds_show: true,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_grid_cellInput);

    //过滤列引用数据
    var ds_grid_filterColOption = getProInfoByObj("jseditor", {
        ds_id: "ds_grid_filterColOption",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "过滤列引用数据",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row, col}",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_grid_filterColOption",
        ds_ispro: true,
        ds_savedb: false,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_grid_filterColOption);

    //自定义列option
    var ds_grid_customColOption = getProInfoByObj("jseditor", {
        ds_id: "ds_grid_customColOption",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "自定义列选项(回显)",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row, col}",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_grid_customColOption",
        ds_ispro: true,
        ds_savedb: false,
        group1: "属性",
        group2: "编辑"
    })
    cfg.push(ds_grid_customColOption);

    //显示复选框
    var ds_showcheckbox = getProInfoByObj("switch", {
        ds_id: "ds_showcheckbox",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示复选框",
        ds_name: "ds_showcheckbox",
        ds_switch: false,
        ds_ispro: true,
        ds_switch_change: "reloadGridForCheckChange",
        group1: "属性",
        group2: "复选框"
    })
    cfg.push(ds_showcheckbox);

    //开启复选框 时只能单选
    var ds_showcheckbox_radio = getProInfoByObj("switch", {
        ds_id: "ds_showcheckbox_radio",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "仅单选",
        ds_name: "ds_showcheckbox_radio",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "复选框"
    })
    cfg.push(ds_showcheckbox_radio);

    //复选框禁用条件
    var ds_checkbox_disableCondition = getProInfoByObj("input", {
        ds_id: "ds_checkbox_disableCondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "复选框禁用条件",
        ds_placeholder: "row.字段名==\"xxx\"",
        ds_input: "",
        ds_name: "ds_checkbox_disableCondition",
        ds_ispro: true,
        group1: "属性",
        group2: "复选框"
    })
    cfg.push(ds_checkbox_disableCondition);

    //点击行勾选复选框
    var ds_grid_clickRowSelectCheckbox = getProInfoByObj("switch", {
        ds_id: "ds_grid_clickRowSelectCheckbox",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "点击行勾选复选框",
        ds_name: "ds_grid_clickRowSelectCheckbox",
        ds_switch: false,
        ds_show: false,
        ds_ispro: true,
        group1: "属性",
        group2: "复选框"
    })
    cfg.push(ds_grid_clickRowSelectCheckbox);

    //是否开启分页
    var ds_pagination = getProInfoByObj("switch", {
        ds_id: "ds_pagination",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "开启分页",
        ds_name: "ds_pagination",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "分页"
    })
    cfg.push(ds_pagination);

    //当前分页条数
    var ds_page_size = getProInfoByObj("input", {
        ds_id: "ds_page_size",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "当前分页条数",
        ds_placeholder: "当前分页条数",
        ds_input: "10",
        ds_valformat: "NUMBER",
        ds_name: "ds_page_size",
        ds_ispro: true,
        group1: "属性",
        group2: "分页"
    })
    cfg.push(ds_page_size);

    //分页条数
    var ds_page_size_arr = getProInfoByObj("input", {
        ds_id: "ds_page_size_arr",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "分页条数",
        ds_placeholder: "分页条数",
        ds_input: "10, 20, 50, 100",
        ds_valformat: "ARRAY",
        ds_name: "ds_page_size_arr",
        ds_ispro: true,
        group1: "属性",
        group2: "分页"
    })
    cfg.push(ds_page_size_arr);


    //左侧固定列
    var ds_fixed_cols_left = getProInfoByObj("select", {
        ds_id: "ds_fixed_cols_left",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "左侧固定列",
        ds_select: "",
        ds_name: "ds_fixed_cols_left",
        ds_options: [],//getSourceFieldOption(),
        ds_select_visible_change: "getSourceFieldOption",
        ds_select_change: "selectFixedCol",
        ds_ispro: true,
        ds_multiple: true,
        group1: "属性",
        group2: "固定列"
    })
    cfg.push(ds_fixed_cols_left);

    //右侧固定列
    var ds_fixed_cols_right = getProInfoByObj("select", {
        ds_id: "ds_fixed_cols_right",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "右侧固定列",
        ds_select: "",
        ds_name: "ds_fixed_cols_right",
        ds_options: [],//getSourceFieldOption(),
        ds_select_visible_change: "getSourceFieldOption",
        ds_select_change: "selectFixedCol",
        ds_multiple: true,
        ds_ispro: true,
        group1: "属性",
        group2: "固定列"
    })
    cfg.push(ds_fixed_cols_right);

    //表尾是否显示合计行
    var ds_showsum = getProInfoByObj("switch", {
        ds_id: "ds_showsum",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示合计行",
        ds_name: "ds_showsum",
        ds_switch: false,
        ds_ispro: true,
        ds_switch_change: "showSumChange",
        group1: "属性",
        group2: "合计行"
    })
    cfg.push(ds_showsum);

    //合计行位置
    var ds_grid_SummarPostion = getProInfoByObj("radio", {
        ds_id: "ds_grid_SummarPostion",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "合计行位置",
        ds_name: "ds_grid_SummarPostion",
        ds_radio: "bottom",
        ds_options: [{value: "top", text: "顶部"}, {value: "bottom", text: "底部"}],
        ds_radiobtn: true,
        ds_ispro: true,
        ds_radio_change: "changeSummarPostion",
        group1: "属性",
        group2: "合计行"
    });
    cfg.push(ds_grid_SummarPostion);

    //合计行背景色
    var ds_sumrow_backgroundColor = getProInfoByObj("color", {
        ds_id: "ds_sumrow_backgroundColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "合计行背景色",
        ds_name: "ds_sumrow_backgroundColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#eaeef9",
        ds_show: true,
        group1: "属性",
        group2: "合计行"
    })
    cfg.push(ds_sumrow_backgroundColor);

    //合计行字体颜色
    var ds_sumrow_fontColor = getProInfoByObj("color", {
        ds_id: "ds_sumrow_fontColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "合计行字体颜色",
        ds_name: "ds_sumrow_fontColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "#000000",
        ds_show: true,
        group1: "属性",
        group2: "合计行"
    })
    cfg.push(ds_sumrow_fontColor);

    //合计行字体大小
    var ds_sumrow_fontSize = getProInfoByObj("input", {
        ds_id: "ds_sumrow_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "合计行字体大小",
        ds_placeholder: "合计行字体大小",
        ds_input: "1.1rem",
        ds_name: "ds_sumrow_fontSize",
        ds_ispro: true,
        group1: "属性",
        group2: "合计行"
    })
    cfg.push(ds_sumrow_fontSize);

    //合计行行高
    var ds_sumrow_height = getProInfoByObj("input", {
        ds_id: "ds_sumrow_height",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "合计行行高",
        ds_placeholder: "合计行行高",
        ds_input: "2rem",
        ds_name: "ds_sumrow_height",
        ds_ispro: true,
        group1: "属性",
        group2: "合计行"
    })
    cfg.push(ds_sumrow_height);

    //表格刷新选中上次选中节点
    var ds_grid_isCurrentRow_reload = getProInfoByObj("switch", {
        ds_id: "ds_grid_isCurrentRow_reload",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "选中刷新前选中行",
        ds_name: "ds_grid_isCurrentRow_reload",
        ds_switch: true,
        ds_ispro: true,
        group1: "属性",
        group2: "选中设置"
    })
    cfg.push(ds_grid_isCurrentRow_reload);
    //开启树形结构表格
    var ds_tree_grid = getProInfoByObj("switch", {
        ds_id: "ds_tree_grid",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "开启树形结构表格",
        ds_name: "ds_tree_grid",
        ds_switch: false,
        ds_switch_change: "controlTreeGrid",
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_tree_grid);

    //ID字段
    var ds_row_id = getProInfoByObj("input", {
        ds_id: "ds_row_id",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "设置ID字段字段",
        ds_placeholder: "设置ID字段字段",
        ds_input: "",
        ds_name: "ds_row_id",
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_row_id);


    //上级字段
    var ds_row_pid = getProInfoByObj("input", {
        ds_id: "ds_row_pid",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "设置上级字段",
        ds_placeholder: "设置上级字段",
        ds_input: "",
        ds_name: "ds_row_pid",
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_row_pid);


    //展示树形数据时，树节点的缩进
    var ds_tree_grid_indent = getProInfoByObj("input", {
        ds_id: "ds_tree_grid_indent",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "树节点缩进",
        ds_placeholder: "树节点缩进",
        ds_input: "16",
        ds_valformat: "NUMBER",
        ds_name: "ds_tree_grid_indent",
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_tree_grid_indent);
    //默认展开第一个节点
    var ds_expandFirst = getProInfoByObj("switch", {
        ds_id: "ds_expandFirst",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "默认展开第一个节点",
        ds_name: "ds_expandFirst",
        ds_switch: false,
        ds_show: true,
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_expandFirst);

    var ds_expandAll = getProInfoByObj("switch", {
        ds_id: "ds_expandAll",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "默认展开所有节点",
        ds_name: "ds_expandAll",
        ds_switch: false,
        ds_show: true,
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_expandAll);


    //仅末级节点可编辑
    var ds_tree_grid_onlyEditEnd = getProInfoByObj("switch", {
        ds_id: "ds_tree_grid_onlyEditEnd",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "仅末级节点可编辑",
        ds_name: "ds_tree_grid_onlyEditEnd",
        ds_switch: false,
        ds_show: false,
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_tree_grid_onlyEditEnd);

    //只选择中间级
    var ds_choseMidOnly = getProInfoByObj("switch", {
        ds_id: "ds_choseMidOnly",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "仅末级节点可选",
        ds_name: "ds_choseMidOnly",
        ds_switch: false,
        ds_ispro: true,
        ds_switch_change: "clearCheckInfo",
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_choseMidOnly);

    //开启反选
    var ds_tree_grid_reverseCheck = getProInfoByObj("switch", {
        ds_id: "ds_tree_grid_reverseCheck",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "开启反选",
        ds_name: "ds_tree_grid_reverseCheck",
        ds_switch: false,
        ds_show: false,
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_tree_grid_reverseCheck);

    //关闭父子级关联
    var ds_tree_grid_check_strictly = getProInfoByObj("switch", {
        ds_id: "ds_tree_grid_check_strictly",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "父子节点不关联",
        ds_name: "ds_tree_grid_check_strictly",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_tree_grid_check_strictly);


    //分层汇总
    var ds_divided_into_summary = getProInfoByObj("switch", {
        ds_id: "ds_divided_into_summary",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "分层汇总",
        ds_name: "ds_divided_into_summary",
        ds_switch_change: "isshowDividedSumPro",
        ds_switch: false,
        ds_ispro: true,
        ds_show: false,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_divided_into_summary);

    //分层汇总 合计行颜色
    var ds_divided_into_summary_rowColor = getProInfoByObj("color", {
        ds_id: "ds_divided_into_summary_rowColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "合计行颜色",
        ds_name: "ds_divided_into_summary_rowColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "rgba(234, 238, 249, 1)",
        ds_show: false,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_divided_into_summary_rowColor);


    //分层汇总 合计行字体颜色
    var ds_divided_into_summary_fontColor = getProInfoByObj("color", {
        ds_id: "ds_divided_into_summary_fontColor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "合计行字体颜色",
        ds_name: "ds_divided_into_summary_fontColor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "rgba(0, 0, 0, 1)",
        ds_show: false,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_divided_into_summary_fontColor);

    //分层会中合计行 字体大小
    var ds_divided_into_summary_fontSize = getProInfoByObj("input", {
        ds_id: "ds_divided_into_summary_fontSize",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "合计行字体大小",
        ds_input: "1.1rem",
        ds_name: "ds_divided_into_summary_fontSize",
        ds_ispro: true,
        ds_show: false,
        group1: "属性",
        group2: "树形数据"
    })
    cfg.push(ds_divided_into_summary_fontSize);


    //是否开启关键字搜索
    var ds_enablesearch = getProInfoByObj("switch", {
        ds_id: "ds_enablesearch",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "开启关键字搜索",
        ds_name: "ds_enablesearch",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "关键字"
    })
    cfg.push(ds_enablesearch);


    //根据关键字高亮显示一行
    var ds_highlightword = getProInfoByObj("input", {
        ds_id: "ds_highlightword",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "行高亮显示",
        ds_placeholder: "请输入关键字",
        ds_input: "",
        ds_name: "ds_highlightword",
        ds_input_input: "highWordChange",
        ds_ispro: true,
        group1: "属性",
        group2: "关键字"
    })
    cfg.push(ds_highlightword);


    //在 Input 值改变时触发
    var ds_grid_searchComplete = getProInfoByObj("jseditor", {
        ds_id: "ds_grid_searchComplete",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "搜索完成事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:搜索到的数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_grid_searchComplete",
        ds_ispro: true,
        ds_savedb: false,
        ds_show: true,
        group1: "属性",
        group2: "关键字"
    })
    cfg.push(ds_grid_searchComplete);

    //高亮行颜色
    var ds_highrowcolor = getProInfoByObj("color", {
        ds_id: "ds_highrowcolor",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",//自定义样式
        ds_labeltxt: "高亮行颜色",
        ds_name: "ds_highrowcolor",
        ds_ispro: true,
        ds_show_alpha: true,//是否支持透明度
        ds_color: "rgb(85,254,255)",
        ds_show: false,
        group1: "属性",
        group2: "关键字"
    })
    cfg.push(ds_highrowcolor);

    //是否可以右键打开条件格式设置
    var ds_enablecondition = getProInfoByObj("switch", {
        ds_id: "ds_enablecondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "条件格式",
        ds_name: "ds_enablecondition",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "条件格式"
    })
    cfg.push(ds_enablecondition);


    //是否可以右键打开条件格式设置
    var ds_grid_isOpenRowContextmenu = getProInfoByObj("switch", {
        ds_id: "ds_grid_isOpenRowContextmenu",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "是否显示菜单",
        ds_name: "ds_grid_isOpenRowContextmenu",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "右键菜单"
    })
    cfg.push(ds_grid_isOpenRowContextmenu);

    //为0 不显示
    var ds_grid_zeroNotShow = getProInfoByObj("switch", {
        ds_id: "ds_grid_zeroNotShow",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "数据为0不显示",
        ds_name: "ds_grid_zeroNotShow",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "数据显示条件"
    })
    cfg.push(ds_grid_zeroNotShow);

    //不显示字段
    var ds_endNode_notShowFields = getProInfoByObj("select", {
        ds_id: "ds_endNode_notShowFields",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "不显示字段",
        ds_placeholder: "不显示字段",
        ds_select: "",
        ds_name: "ds_endNode_notShowFields",
        ds_ispro: true,
        ds_options: [],//getSourceFieldOption(),
        ds_select_visible_change: "getSourceFieldOption",
        ds_multiple: true,
        ds_show: true,
        group1: "属性",
        group2: "数据显示条件"
    })
    cfg.push(ds_endNode_notShowFields);

    //数据不显示条件
    var ds_showDataCondition = getProInfoByObj("input", {
        ds_id: "ds_showDataCondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "数据不显示条件",
        ds_placeholder: "row.FIELD1==0||row.FIELD2==1",
        ds_name: "ds_showDataCondition",
        ds_ispro: true,
        group1: "属性",
        group2: "数据显示条件"
    })
    cfg.push(ds_showDataCondition);

    //开启自动对照
    var ds_grid_autoContrast = getProInfoByObj("switch", {
        ds_id: "ds_grid_autoContrast",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "开启自动对照",
        ds_name: "ds_grid_autoContrast",
        ds_switch: false,
        ds_ispro: true,
        group1: "属性",
        group2: "自动对照"
    })
    cfg.push(ds_grid_autoContrast);

    //对照依据字段
    var ds_grid_dependContrastField = getProInfoByObj("select", {
        ds_id: "ds_grid_dependContrastField",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "设置对照依据字段",
        ds_placeholder: "设置对照依据字段",
        ds_select: "",
        ds_name: "ds_grid_dependContrastField",
        ds_options: [],//getSourceFieldOption(),
        ds_select_visible_change: "getSourceFieldOption",
        ds_ispro: true,
        group1: "属性",
        group2: "自动对照"
    })
    cfg.push(ds_grid_dependContrastField);

    //设置自动对照字段
    var ds_grid_needContrastField = getProInfoByObj("select", {
        ds_id: "ds_grid_needContrastField",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "设置自动对照字段",
        ds_placeholder: "设置自动对照字段",
        ds_select: "",
        ds_name: "ds_grid_needContrastField",
        ds_options: [],//getSourceFieldOption(),
        ds_select_visible_change: "getSourceFieldOption",
        ds_ispro: true,
        group1: "属性",
        group2: "自动对照"
    })
    cfg.push(ds_grid_needContrastField);

    //是否轮播数据
    var ds_dataCarousel = getProInfoByObj("switch", {
        ds_id: "ds_dataCarousel",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "开启数据轮播",
        ds_name: "ds_dataCarousel",
        ds_switch: false,
        ds_ispro: true,
        ds_switch_change: "changeDataCarouselStatus",
        group1: "属性",
        group2: "数据轮播"
    })
    cfg.push(ds_dataCarousel);

    //轮播辐度
    var ds_dataCarousel_amplitude = getProInfoByObj("input", {
        ds_id: "ds_dataCarousel_amplitude",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "轮播辐度",
        ds_input: "",
        ds_placeholder: "轮播辐度",
        ds_append: "px",
        ds_name: "ds_dataCarousel_amplitude",
        ds_ispro: true,
        group1: "属性",
        group2: "数据轮播"
    })
    cfg.push(ds_dataCarousel_amplitude);


    var ds_dataCarousel_frequency = getProInfoByObj("input", {
        ds_id: "ds_dataCarousel_frequency",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "轮播频率",
        ds_input: "1",
        ds_placeholder: "轮播频率",
        ds_name: "ds_dataCarousel_frequency",
        ds_input_change: "changeAmplitude",
        ds_append: "秒",
        ds_ispro: true,
        group1: "属性",
        group2: "数据轮播"
    })
    cfg.push(ds_dataCarousel_frequency);

    //空数据显示文本
    var ds_grid_empty_text = getProInfoByObj("input", {
        ds_id: "ds_grid_empty_text",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "空数据显示文本",
        ds_placeholder: "空数据显示文本",
        ds_input: "暂无数据",
        ds_name: "ds_grid_empty_text",
        ds_ispro: true,
        group1: "属性",
        group2: "自定义"
    })
    cfg.push(ds_grid_empty_text);

    //自定义数据
    var ds_grid = getProInfoByObj("textarea", {
        ds_id: "ds_grid",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "自定义数据",
        ds_placeholder: '[{"AAA":1,"BBB":1},{"AAA":2,"BBB":2},{"AAA":3,"BBB":3}]',
        ds_textarea: "",
        ds_name: "ds_grid",
        ds_valformat: "JSON",
        ds_ispro: true,
        group1: "属性",
        group2: "自定义"
    })
    cfg.push(ds_grid);

    //列数据
    var ds_columns = getProInfoByObj("textarea", {
        ds_id: "ds_columns",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "列数据",
        ds_placeholder: '[{"id":"AAA","prop":"AAA","label":"列1"},{"id":"BBB","prop":"BBB","label":"列2"}]',
        ds_textarea: '',
        ds_name: "ds_columns",
        ds_valformat: "JSON",
        ds_ispro: true,
        group1: "属性",
        group2: "自定义"
    })
    cfg.push(ds_columns);

    //设置参数名
    var ds_param = getProInfoByObj("input", {
        ds_id: "ds_param",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "推送参数名",
        ds_placeholder: "控件推送参数名",
        ds_input: "",
        ds_name: "ds_param",
        ds_ispro: true,
        group1: "参数推送",
        group2: ""
    })
    cfg.push(ds_param);

    //撤销推送条件
    var ds_backParamCondition = getProInfoByObj("input", {
        ds_id: "ds_backParamCondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "撤销推送条件",
        ds_placeholder: "推送参数名.A=='a'||推送参数名.A=='b'",
        ds_input: "",
        ds_name: "ds_backParamCondition",
        ds_ispro: true,
        group1: "参数推送",
        group2: ""
    })
    cfg.push(ds_backParamCondition);

    //触发刷新控件
    var ds_trigger = getProInfoByObj("select", {
        ds_id: "ds_trigger",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "触发刷新控件",
        ds_placeholder: "请选择触发刷新控件",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_options: [],
        ds_select_visible_change: "getAllPageCtrl",//选择框展开前后事件
        ds_select: "",
        ds_name: "ds_trigger",
        ds_ispro: true,
        ds_multiple: true,
        group1: "控件加载",
        group2: ""
    })
    cfg.push(ds_trigger);

    //加载机制 first:优先加载 normal:正常加载 lazy:懒加载
    var ds_loading = getProInfoByObj("select", {
        ds_id: "ds_loading",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "加载机制",
        ds_placeholder: "请选择加载机制",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_group: false,
        ds_options: [{
            value: "first",
            label: "优先加载"
        }, {
            value: "normal",
            label: "正常加载"
        }, {
            value: "lazy",
            label: "懒加载"
        }],
        ds_select: "normal",
        ds_select_change: "changeCtrlLoading",//变更事件
        ds_name: "ds_loading",
        ds_ispro: true,
        group1: "控件加载",
        group2: ""
    })
    cfg.push(ds_loading);

    //显示控件
    var ds_show = getProInfoByObj("switch", {
        ds_id: "ds_show",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示控件",
        ds_name: "ds_show",
        ds_switch: true,
        ds_ispro: true,
        group1: "显示设置",
        group2: ""
    })
    cfg.push(ds_show);

    //显示条件
    var ds_showCondition = getProInfoByObj("input", {
        ds_id: "ds_showCondition",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示条件",
        ds_placeholder: "${V.推送参数名.A}=='a'||${V.推送参数名.A}=='b'",
        ds_input: "",
        ds_name: "ds_showCondition",
        ds_ispro: true,
        group1: "显示设置",
        group2: ""
    })
    cfg.push(ds_showCondition);

    //显示行号列
    var ds_showrownumbers = getProInfoByObj("switch", {
        ds_id: "ds_showrownumbers",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "显示行号列",
        ds_name: "ds_showrownumbers",
        ds_switch: false,
        ds_ispro: true,
        group1: "显示设置",
        group2: ""
    })
    cfg.push(ds_showrownumbers);

    //序号列宽度
    var ds_index_width = getProInfoByObj("input", {
        ds_id: "ds_index_width",
        ds_pid: VUECFG.ctrlId,
        ds_draggable: "false",
        ds_style: "ds-mt-1",
        ds_labeltxt: "行号列宽度",
        ds_placeholder: "行号列宽度",
        ds_input: "50",
        ds_name: "ds_index_width",
        ds_ispro: true,
        group1: "显示设置",
        group2: ""
    })
    cfg.push(ds_index_width);

    //行点击事件
    var ds_grid_row_click = getProInfoByObj("jseditor", {
        ds_id: "ds_grid_row_click",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "行点击事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:行数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_grid_row_click",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_grid_row_click);

    //行变更事件
    var ds_rowchange = getProInfoByObj("jseditor", {
        ds_id: "ds_rowchange",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "行变更事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:行数据",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_rowchange",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_rowchange);

    //行选择事件
    var ds_gridselect = getProInfoByObj("jseditor", {
        ds_id: "ds_gridselect",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "行选择事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:所有选择的行",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_gridselect",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_gridselect);

    //行选择变更事件
    var ds_gridselectChange = getProInfoByObj("jseditor", {
        ds_id: "ds_gridselectChange",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "行选择变更事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:所有选择的行",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_gridselectChange",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_gridselectChange);

    //单元格点击事件
    var ds_cellclick = getProInfoByObj("jseditor", {
        ds_id: "ds_cellclick",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "单元格点击事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row, column, cell, event}",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_cellclick",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_cellclick);

    //鼠标右键点击行事件
    var ds_grid_rowContextmenu = getProInfoByObj("jseditor", {
        ds_id: "ds_grid_rowContextmenu",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "右键点击行事件",
        ds_placeholder: "",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称}//val:{row, column, event}",
        ds_prepend: "fn(obj,val){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_grid_rowContextmenu",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_grid_rowContextmenu);


    //加载完成事件
    var ds_load_success = getProInfoByObj("jseditor", {
        ds_id: "ds_load_success",
        ds_pid: VUECFG.ctrlId,
        ds_labeltxt: "加载完成事件",
        ds_placeholder: "脚本",
        ds_style: "ds-mt-1",
        ds_draggable: "false",
        ds_jseditor: "//obj:配置对象{ds_id:组件id,ds_ctrlname:组件名称},//trigger:是否触发控件刷新",
        ds_prepend: "fn(obj,trigger){",//前缀
        ds_jseditor_change: "",
        ds_name: "ds_load_success",
        ds_ispro: true,
        ds_savedb: false,
        group1: "事件",
        group2: ""
    })
    cfg.push(ds_load_success);

    if (VUECFG.proObj[VUECFG.ctrlId] && !change) {
        var proArr = VUECFG.proObj[VUECFG.ctrlId];
        for (var c = 0; c < cfg.length; c++) {
            for (var p = 0; p < proArr.length; p++) {
                if (cfg[c].info.ds_name == proArr[p].info.ds_name) {
                    var type = cfg[c].type.split("drag_")[1];
                    cfg[c].info["ds_" + type] = proArr[p].info["ds_" + type];
                    if (!$DS.util.isUndefined(proArr[p].info["ds_show"]))
                        cfg[c].info["ds_show"] = proArr[p].info["ds_show"];
                }
            }
        }
    }
    VUECFG.proObj[VUECFG.ctrlId] = [];
    //VUECFG.proArr = cfg;
    VUECFG.proArr = formatterCtrlProCfg(cfg);
    VUECFG.proObj[VUECFG.ctrlId] = cfg;
    $("#templetePro").click();
}


