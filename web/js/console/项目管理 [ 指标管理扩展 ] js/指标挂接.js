debugger
var pageObj={};
/**
 * 初始化
 */
function init() {
    var PROJ=$DS.util.getTopWin("window").$DS.getPms("P_PROJGRID");
    if(!PROJ){
        PROJ=$DS.util.getTopWin('window').$DS.getPms("PROJ");
    }
    pageObj = {
        leftWidth: $DS.getCtrl("指标列表容器").info.ds_width,
        rightWidth: $DS.getCtrl("TAB页容器").info.ds_width,
        fastUrl: $DS.FASTDFSURL,
        PROJ:PROJ,//项目信息
        checkObj:{},//选中行对象
        resetArr:["CASCADER_资金分类","SWITCH_余额过滤"]//重置数组
    }
    $DS.putPms("PROJ",pageObj.PROJ);
    var result=$DS.getSourceData($DS.getSource("DS_项目指标挂接表"));
    if(result.isError){
        alert(result.errMsg)
        return false;
    }else{
        pageObj.deleted=result.rows;
    }
}
//======================================右箭头点击事件====================================================================
//点击右箭头
function clickRightArrow() {
    //点击收缩Tab页 指标容器扩容
    if(pageObj.rightWidth == "32rem"){
        pageObj.leftWidth = "calc(100% - 1rem)";
        pageObj.rightWidth = "0%";
    }else{
        pageObj.leftWidth = "calc(100% - 33rem)";
        pageObj.rightWidth = "32rem";
    }
    setTabRowWidth();
    setZbRowWidth();
    setRightArrowLabel();
}
//设置中间容器宽度
function setZbRowWidth() {
    $DS.getCtrl("指标列表容器").info.ds_width = pageObj.leftWidth;//左侧容器
}


//设置tab页宽度
function setTabRowWidth() {
    $DS.getCtrl("TAB页容器").info.ds_width = pageObj.rightWidth;
}
//设置右箭头图片
function setRightArrowLabel() {
    if(pageObj.rightWidth == "32rem"){
        $DS.getCtrl("右箭头").info.ds_label_background_image = "url("+pageObj.fastUrl+"/group1/M00/00/02/wKgBV2Ckx7eAJO_SAAAExA18tcQ098.png)";
    }else {
        $DS.getCtrl("右箭头").info.ds_label_background_image = "url('"+pageObj.fastUrl + "/group1/M00/00/08/wKgBWGCkxyOAUqYMAAAEwftMPyE830.png')";
    }
}
//=======================================================================================================
/**
 * 加载完成反选
 * @param obj
 */
function tableOnloadSuccess(obj) {
    debugger
    pageObj.checkObj={};
    var arr=[];
    var rows=pageObj.deleted;
    var data=obj.ds_grid;
    for(var r=0;r<rows.length;r++){
        rows[r].USE_PAGEAMOUNT=rows[r].AMOUNT;
        pageObj.checkObj[rows[r].INDI_ID]=rows[r];
        arr.push(rows[r].INDI_ID)
        for(var d=0;d<data.length;d++){
            if(rows[r].INDI_ID==data[d].INDI_ID){
                data[d].USE_PAGEAMOUNT=rows[r].USE_PAGEAMOUNT
            }
        }
    }
    obj.ds_grid=[];
    obj.ds_grid=data;
    $grid.selectRow(obj.ds_id,arr,true);
}
/**
 * 挂接金额变更
 * @param obj
 * @param val
 */
function moneyChange(obj,val) {
    debugger
    var row=val.scope.row;
    //挂接金额
    var USE_AMOUNT=getNum(val.value);
    //获取原始金额
    var BEFORE_AMOUNT=pageObj.checkObj[row.INDI_ID]? getNum(pageObj.checkObj[row.INDI_ID].USE_PAGEAMOUNT):0;
    //总金额
    var ALL_AMOUNT=getNum(row.REST_AMOUNT)+BEFORE_AMOUNT;
    //判断负数
    if(USE_AMOUNT<0){
        val.scope.row.USE_PAGEAMOUNT=0;
        val.scope.row.REST_AMOUNT=ALL_AMOUNT;
        val.val=0;
        alert("挂接金额不能是负数!")
        return false;
    }
    //可用余额
    row.REST_AMOUNT=ALL_AMOUNT-USE_AMOUNT;
    var REST_AMOUNT=row.REST_AMOUNT;
    //判断挂接金额是否大于可用余额
    if(USE_AMOUNT>ALL_AMOUNT){
        val.scope.row.USE_PAGEAMOUNT=0;
        val.scope.row.REST_AMOUNT=ALL_AMOUNT;
        val.val=0;
        alert("挂接金额大于可用余额!")
        return false;
    }
    //变更挂接金额后校验
    pageObj.checkObj[row.INDI_ID].REST_AMOUNT=ALL_AMOUNT-USE_AMOUNT;
    pageObj.checkObj[row.INDI_ID].USE_PAGEAMOUNT=val.value;
    var res=checkMount()
    if(!res){
        val.scope.row.USE_PAGEAMOUNT=0;
        val.scope.row.REST_AMOUNT=ALL_AMOUNT;
        val.val=0;
        pageObj.checkObj[row.INDI_ID].USE_PAGEAMOUNT=0;
        pageObj.checkObj[row.INDI_ID].REST_AMOUNT=ALL_AMOUNT
        return false;
    }
    val.scope.row.REST_AMOUNT=ALL_AMOUNT-USE_AMOUNT;
}

/**
 * 转数字
 * @param num
 */
function getNum(num) {
    num=num+"";
    return parseFloat(num.replaceAll(",",""))
}
/**
 * 设置选中行
 * @param obj
 * @param val{selection,row}
 */
function setCheckedRow(obj,val){
    debugger
    var row=val.row;
    if(!pageObj.checkObj[row.INDI_ID]){
        if(!checkMount("check")){
            $grid.selectRow(obj.ds_id,row.INDI_ID,false)
        }else{
            pageObj.checkObj[row.INDI_ID]=row;
        }
    } else{
        var ALL_AMOUNT=getNum(val.row.USE_PAGEAMOUNT)+getNum(val.row.REST_AMOUNT)
        val.row.USE_PAGEAMOUNT=0;
        val.row.REST_AMOUNT=ALL_AMOUNT;
        delete pageObj.checkObj[row.INDI_ID]
    }
}

/**
 * 校验超限
 * @returns {boolean}
 */
function checkMount(type) {
    //项目总金额
    var PROJMOUNT=pageObj.PROJ[0].PROJMOUNT;
    var obj=pageObj.checkObj;
    var amount=0;
    for(var key in obj){
        var num=parseFloat(obj[key].USE_PAGEAMOUNT);
        amount=$DS.util.add(amount,num)
    }
    if(type&&amount==PROJMOUNT){
        if(type=="equals")return true;
        alert("挂接金额已等于可用余额!")
        return false;
    }
    if(amount>PROJMOUNT){
        alert("挂接金额大于可用余额!")
        return false;
    }
    return true;
}

/**
 * 保存
 * @returns {boolean}
 */
function saveData() {
    debugger
    //保存前校验
    var flag=checkMount("equals")
    if(!flag){
        alert(`挂接金额必须小于或等于可用余额【${pageObj.PROJ[0].PROJMOUNT}】!`)
        return false;
    }
    //保存
    var data={
        inserted:[],
        updated:[],
        deleted:pageObj.deleted?pageObj.deleted:[],
    }
    for(var key in pageObj.checkObj){
        var amount=pageObj.checkObj[key].USE_PAGEAMOUNT;
        if(amount==0||amount==undefined){
            alert(`存在挂接金额为0的指标【${pageObj.checkObj[key].BGT_DOC_TITLE}】,请取消勾选!`)
            return false;
        };
        var obj={
            PROJ_ID:pageObj.PROJ[0].GUID,
            INDI_ID:pageObj.checkObj[key].INDI_ID,
            INDI_DETAILID:pageObj.checkObj[key].INDI_DETAILID,
            AMOUNT:amount
        };
        data.inserted.push(obj)
    }
    var result=$DS.saveGridSource(data,"DS_项目指标挂接表");
    if (result.isError){
        alert(result.errMsg);
    }else {
        alert("保存成功!")
        pageObj.deleted=data.inserted;
        //刷新表格
        $DS.util.getTopWin('window').$tabs.getSubWindow("挂接指标明细TAB页",0).$DS.loadCtrl("挂接指标列表")
    }
}

/**
 * 重置
 */
function reset() {
    var arr=pageObj.resetArr;
    for(var a=0;a<arr.length;a++){
        var ctrl=$DS.getCtrl(arr[a]);
        $DS.clearData(ctrl)
        $DS.delPms(ctrl.info.ds_param)
    }
    $DS.loadCtrl("指标列表")
}
init();