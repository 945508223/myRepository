//===================================调整========================================================================
//===================================资金比例调整==================================================================
if(buttonInfo.all=="2"){
    var inputValue=$DV.getForm("资金比例调整1");
    if(inputValue) {
        inputValue = $DV.div((parseFloat(inputValue.split("%")[0])),100);
    }
    var sumValue=0;
    if(inputValue!=0){
        sumValue=$DV.div($DV.mul(budgetall,inputValue),10000)
        sumValue=(parseFloat(sumValue).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }
    $DV.setForm("调整后金额总数",sumValue+"万元")
}
//===================================调整初始化===================================================================
debugger
var budgetall=$DV.getCell("budgetall","CNUM");//本级安排资金
var budgetsan=$DV.getCell("budgetsan","PAY_MUBIAO");//三公经费
var buttonInfo={
    all:"1",//1按总数|2按比例
    san:"2"//1按总数|2按比例
};
var _date=$DV.pms("PUBDATE_YEARMONTH",202009)+"01"
var sumSan=0;
var tableData=$DV.getDS("三公经费明细");
//获取保存详细数据
var dataSource=$($DV.getEl("三公经费明细")).attr("datasource");
if(dataSource)
    dataSource=JSON.parse(dataSource)
var sql="SELECT * FROM DW_DS_TREECON2 where REF_T_DATEID=TO_CHAR(ADD_MONTHS(TO_DATE("+_date+",'yyyymmdd'),+12),'yyyymmdd')"
var result=$DV.commonSelect([{name:"selectAll",sql:sql}],(dataSource)?dataSource.sbtid:"");
if(result&&result["selectAll"]&&result["selectAll"].length>0){
    result=result["selectAll"];
    outer: for(var r=0;r<result.length;r++){
        for(var t=0;t<tableData.length;t++){
            if(result[r].DEP_BGT_ECO_NAME==tableData[t].DEP_BGT_ECO_NAMENAME){
                tableData[t].PAY_TIAOZHENG=result[r].PAY_TIAOZHENG;
                continue outer;
            }
        }
    }
    //tableData=result["selectAll"];
    setTableData($DV.getEl("三公经费明细"));
}else{
    var sumInterval=setInterval(function () {
        if($DV.isLoaded()){
            sumSan=getSumData();
            setSanVal();
            window.clearInterval(sumInterval);
        }
    },1000)
}
//获取保存本级资金数据
var pdate=parseInt($DV.pms("PUBDATE_YEAR",new Date().getFullYear()))+1;
sql="SELECT * FROM DW_DS_BUGDET_TOTAL_NEW where set_year= "+pdate+" and fundtype='本级资金'";
var sresult=$DV.commonSelect([{name:"selectAll",sql:sql}],(dataSource)?dataSource.sbtid:"");
if(sresult&&sresult["selectAll"]&&sresult["selectAll"].length>0){
    sresult=sresult["selectAll"][0];
    if(sresult.TYPECODE){
        if(sresult.TYPECODE=="1"){//按总数
            btn1Click();
            var CNUM_TIAOZHENG=sresult.CNUM_TIAOZHENG;
            if(CNUM_TIAOZHENG){
                CNUM_TIAOZHENG=parseFloat($DV.div(CNUM_TIAOZHENG,10000)).toFixed("2")+"万元"
                $DV.setForm("调整后金额总数",CNUM_TIAOZHENG);
            }else{
                $DV.setForm("调整后金额总数","0万元")
            }
        }else{//按比例
            btn2Click();
            var rate=sresult.ADJUST;
            if(rate){
                $DV.setForm("资金比例调整1",rate);
                $($DV.getEl("资金比例调整1")).find("input").removeAttr("readonly");
                $($DV.getEl("调整后金额总数")).find("input").attr("readonly",true);
                rate=$DV.div(rate,100);
                $DV.setForm("调整后金额总数",parseFloat($DV.div($DV.mul(budgetall,rate),10000)).toFixed("2")+"万元");
            }else{
                $DV.setForm("调整后金额总数","0万元")
            }
        }
    }
}else{
    $DV.setForm("调整后金额总数","0万元")
}

/**
 * 获取求和数据
 */
function getSumData() {
    debugger
    sumSan=0
    for(var t=0;t<tableData.length;t++){
        if(tableData[t].PAY_TIAOZHENG)
            sumSan=sumSan+parseFloat(tableData[t].PAY_TIAOZHENG);
    }
    return sumSan;
}

/**
 * 根据比例批量设置表格数据
 */
function dealTableDataByRate(element) {
    var rate=$DV.getForm("资金比例调整2");
    if(rate){
        rate=parseFloat(rate.split("%")[0])
        rate=$DV.div(rate,100);
        for(var t=0;t<tableData.length;t++){
            var PAY_MUBIAO=tableData[t].PAY_MUBIAO;
            tableData[t].PAY_TIAOZHENG=$DV.mul(PAY_MUBIAO,rate);
        }
    }
    setTableData(element);
}

/**
 * 设置表格数据
 */
function setTableData(element) {
    debugger
    var loadInterval=setInterval(function () {
        if($DV.isLoaded()){
            element=$(element);
            var key = element.attr("id") + "||dv_dim";
            //取维度
            var _dimItems = getOrderItems(dragDatas[key]);
            //取度量
            var _measureItems = getOrderItems(getShowMeasure(element));
            var option = easygrid.getOptionByData(element, deepClone(tableData), _dimItems, _measureItems);
            options[element.attr("id")]=option;
            easygrid.load(element);
            sumSan=getSumData();
            setSanVal();
            window.clearInterval(loadInterval);
        }
    },1000)
}


/**
 * 设置表格数据
 */
function setDefaultData(element) {
    debugger
    var loadInterval=setInterval(function () {
        if($DV.isLoaded()){
            for (let i = 0; i < 2; i++) {
                debugger
                resetGridByType("简单表格1", "average")
            }
            window.clearInterval(loadInterval);
        }
    },1000)
}






/**
 * 设置三公经费调整合计
 */
function setSanVal() {
    var value=0;
    if(sumSan){
        value=parseFloat($DV.div(sumSan,10000)).toFixed(2);
    }
    var value=value+"万元"
    $DV.setForm("调整后三公经费",value);
    changeRate(sumSan)
}




//===================================失去焦点事件=================================================================
//blurEvent("调整后金额总数");
//blurEvent("调整后三公经费");
/**
 * 失去焦点事件
 */
function blurEvent(ctrlname) {
    debugger
    var inputValue=$DV.getForm(ctrlname);
    if(inputValue){
        inputValue=inputValue.replaceAll(",","");
        if(inputValue.indexOf("万元")!=-1){
            inputValue=inputValue.split("万元")[0];
        }else {
            inputValue=$DV.div(inputValue,10000);
        }
        inputValue=(parseFloat(inputValue).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        $($DV.getEl(ctrlname)).find("input").val(inputValue+"万元");
    }
}

/**
 * 计算占比
 */
function formulaValue(){
    debugger
    var input1=$DV.getForm("调整后金额总数");
    var input2=$DV.getForm("调整后三公经费");
    if(input1){
        input1=$DV.mul(input1.split("万元")[0].replaceAll(",",""),10000)
    }else{
        input1=0;
    }
    if(input2){
        input2=$DV.mul(input2.split("万元")[0].replaceAll(",",""),10000)
    }else{
        input2=0;
    }
    if(!input1){
        return false;
    }
    var number=getFullNum($DV.div(input2,input1))
    if(number){
        number=number.toFixed(4);
        var proportion=$DV.mul(number,100)+"%"
        $DV.setForm("调整后占比",proportion)
    }
}

/**
 * 修改变动率
 * @param value
 */
function changeRate(value){
    debugger
    var rate = $DV.div($DV.sub(value,budgetsan),budgetsan);
    rate=$DV.mul(rate,100);
    rate=parseFloat(rate).toFixed(2)+"%";
    $DV.setForm("三公变动率",rate);
    //$($($DV.getEl("三公变动率")).children()[0]).html("变动率:"+rate);
}

/**
 * 科学计数法转数字
 * @param num
 * @returns {string|*}
 */
function getFullNum(num){
    //处理非数字
    if(isNaN(num)){return num};
    //处理不需要转换的数字
    var str = ''+num;
    if(!/e/i.test(str)){return num;};
    return (num).toFixed(18).replace(/.?0+$/,"");
}
//======================================================================================================
/**
 * 结束编辑事件
 * @param index
 * @param row
 * @param chang
 */
function onAfterEdit(index, row, change,element){
    debugger
    var PAY_TIAOZHENG=row["PAY_TIAOZHENG"];
    if(PAY_TIAOZHENG){
        PAY_TIAOZHENG=PAY_TIAOZHENG.replaceAll(",","");
        PAY_TIAOZHENG=$DV.mul(PAY_TIAOZHENG,10000);
    }else{
        PAY_TIAOZHENG=0;
    }
    tableData[index]["PAY_TIAOZHENG"]=PAY_TIAOZHENG;
    setTableData($DV.getEl("三公经费明细"));
}

/**
 *
 * 重置
 * @param msg
 * @returns {boolean}
 */
function reset(msg) {
    //先执行删除
    var delTemp = {
        tablename: "DW_DS_BUGDET_TOTAL_NEW",
        sbtid:(dataSource)?dataSource.sbtid:"",
        keyfields: [{
            fieldname:"SET_YEAR",
            value:pdate,
            defaultvalue: "",
            fieldType: "string"
        },{
            fieldname:"FUNDTYPE",
            value:"本级资金",
            defaultvalue: "",
            fieldType: "string"
        }],
        columns: []
    };
    var delresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
    if (delresult.isError) {
        if(!msg)msg="删除失败";
        alert(msg);
        return false;
    } else {
        //保存明细
        var date=$DV.pms("PUBDATE_YEARMONTH",202109)+"01";
        //先执行删除
        var delTemp = {
            tablename: "DW_DS_TREECON2",
            sbtid:(dataSource)?dataSource.sbtid:"",
            keyfields: [{
                fieldname:"REF_T_DATEID",
                value:date,
                defaultvalue: "",
                fieldType: "number"
            }],
            columns: []
        };
        var delresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
        if (delresult.isError) {
            alert(delresult.errMsg);
            return false;
        }else{
            return true;
        }
    }
}
/**
 * 保存
 */
function saveSanData() {
    debugger
    //保存本级
    var TYPECODE=buttonInfo.all;
    var ADJUST=0;
    if(TYPECODE=="2"){
        if($DV.getForm("资金比例调整1"))
            ADJUST=$DV.getForm("资金比例调整1").split("%")[0];
    }
    var CNUM_TIAOZHENG=0;
    CNUM_TIAOZHENG=$DV.getForm("调整后金额总数")
    if(CNUM_TIAOZHENG){
        CNUM_TIAOZHENG=CNUM_TIAOZHENG.split("万元")[0];
        CNUM_TIAOZHENG=CNUM_TIAOZHENG.replaceAll(",","");
        CNUM_TIAOZHENG=$DV.mul(CNUM_TIAOZHENG,10000);
    }
    //先执行删除
    reset("保存失败!");
    //保存
    var dataRow = {
        tablename: "DW_DS_BUGDET_TOTAL_NEW",
        sbtid:(dataSource)?dataSource.sbtid:"",
        keyfields: [],
        columns: [{
            fieldname:"SET_YEAR",
            value:pdate
        },{
            fieldname:"FUNDTYPE",
            value:"本级资金"
        },{
            fieldname:"TYPECODE",
            value:TYPECODE
        },{
            fieldname:"CNUM",
            value:budgetall
        },{
            fieldname:"CNUM_TIAOZHENG",
            value:CNUM_TIAOZHENG
        },{
            fieldname:"ADJUST",
            value:ADJUST
        }]
    };
    var saveresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonSave", {jsonstr: JSON.stringify([dataRow])});
    if (saveresult.isError) {
        alert(saveresult.errMsg);
        return false;
    } else {
        //保存明细
        var date=(parseInt($DV.pms("PUBDATE_YEAR",2020))+1)+$DV.pms("PUBDATE_MONTH","09")+"01";
        //保存明细数据
        var dataRowTemp = {
            tablename: "DW_DS_TREECON2",
            sbtid:(dataSource)?dataSource.sbtid:"",
            keyfields: [],
            columns: []
        };
        var PAY_TIAOZHENG=0;
        dataRowTemp=JSON.stringify(dataRowTemp);
        var jsonArr=[];
        for(var d=0;d<tableData.length;d++){
            tableData[d]["PAY_TIAOZHENG"]=(tableData[d]["PAY_TIAOZHENG"])?parseFloat(tableData[d]["PAY_TIAOZHENG"]):0
            PAY_TIAOZHENG=tableData[d]["PAY_TIAOZHENG"];
            var dataRow=JSON.parse(dataRowTemp);
            dataRow.columns.push({
                fieldname:"REF_T_DATEID",
                value:date
            },{
                fieldname:"DEP_BGT_ECO_NAME",
                value:tableData[d]["DEP_BGT_ECO_NAMENAME"]
            },{
                fieldname:"PAY_MUBIAO",
                value:tableData[d]["PAY_MUBIAO"]
            },{
                fieldname:"PAY_TIAOZHENG",
                value:PAY_TIAOZHENG
            },{
                fieldname:"DEP_BGT_ECO_CODE_R",
                value:tableData[d]["DEP_BGT_ECO_NAMEORDERID"]
            })
            jsonArr.push(dataRow);
        }
        var saveresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonSave", {jsonstr: JSON.stringify(jsonArr)});
        if (saveresult.isError) {
            alert(saveresult.errMsg);
            return false;
        } else {
            saveresult = saveresult.result;
            if (saveresult) {
                alert("保存成功!")
            }
        }
    }
}

/**
 * 按金额点击事件
 */
function btn1Click() {
    debugger
    $($DV.getEl("调整后金额总数")).find("input").removeAttr("readonly");
    $($DV.getEl("资金比例调整1")).find("input").attr("readonly",true);
    $DV.setForm("资金比例调整1","");
    buttonInfo.all="1";
}

/**
 * 按比例点击事件
 */
function btn2Click() {
    debugger
    $($DV.getEl("资金比例调整1")).find("input").removeAttr("readonly");
    $($DV.getEl("调整后金额总数")).find("input").attr("readonly",true);
    buttonInfo.all="2";
}

/**
 * 空刷新
 */
function reload() {
    btn1Click();
    $DV.setForm("资金比例调整1","");
    $DV.setForm("资金比例调整2","");
    $DV.setForm("调整后占比","");
    $DV.setForm("三公变动率","");
    $DV.setForm("调整后金额总数","0万元");
    $DV.setForm("调整后三公经费","0万元");
    $DV.loadEl("三公经费明细");
    for(var t=0;t<tableData.length;t++ ){
        tableData[t]["PAY_TIAOZHENG"]=0;
    }
}
//===============================保存备份============================================================
/**
 * 保存
 */
function saveSanData() {
    debugger
    //保存本级
    var TYPECODE=buttonInfo.all;
    var ADJUST=0;
    if(TYPECODE=="2"){
        if($DV.getForm("资金比例调整1"))
            ADJUST=$DV.getForm("资金比例调整1").split("%")[0];
    }
    var CNUM_TIAOZHENG=0;
    CNUM_TIAOZHENG=$DV.getForm("调整后金额总数")
    if(CNUM_TIAOZHENG){
        CNUM_TIAOZHENG=CNUM_TIAOZHENG.split("万元")[0];
        CNUM_TIAOZHENG=CNUM_TIAOZHENG.replaceAll(",","");
        CNUM_TIAOZHENG=$DV.mul(CNUM_TIAOZHENG,10000);
    }
    //先执行删除
    var delTemp = {
        tablename: "DW_DS_BUGDET_TOTAL_NEW",
        sbtid:(dataSource)?dataSource.sbtid:"",
        keyfields: [{
            fieldname:"SET_YEAR",
            value:pdate,
            defaultvalue: "",
            fieldType: "string"
        },{
            fieldname:"FUNDTYPE",
            value:"本级资金",
            defaultvalue: "",
            fieldType: "string"
        }],
        columns: []
    };
    var delresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
    if (delresult.isError) {
        alert(delresult.errMsg);
        return false;
    } else {
        //保存
        var dataRow = {
            tablename: "DW_DS_BUGDET_TOTAL_NEW",
            sbtid:(dataSource)?dataSource.sbtid:"",
            keyfields: [],
            columns: [{
                fieldname:"SET_YEAR",
                value:pdate
            },{
                fieldname:"FUNDTYPE",
                value:"本级资金"
            },{
                fieldname:"TYPECODE",
                value:TYPECODE
            },{
                fieldname:"CNUM",
                value:budgetall
            },{
                fieldname:"CNUM_TIAOZHENG",
                value:CNUM_TIAOZHENG
            },{
                fieldname:"ADJUST",
                value:ADJUST
            }]
        };
        var saveresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonSave", {jsonstr: JSON.stringify([dataRow])});
        if (saveresult.isError) {
            alert(saveresult.errMsg);
            return false;
        } else {
            //保存明细
            var date=$DV.pms("PUBDATE_YEARMONTH",202109)+"01";
            //先执行删除
            var delTemp = {
                tablename: "DW_DS_TREECON2",
                sbtid:(dataSource)?dataSource.sbtid:"",
                keyfields: [{
                    fieldname:"REF_T_DATEID",
                    value:date,
                    defaultvalue: "",
                    fieldType: "number"
                }],
                columns: []
            };
            var delresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonDel", {jsonstr: JSON.stringify([delTemp])});
            if (delresult.isError) {
                alert(delresult.errMsg);
                return false;
            } else {
                //保存明细数据
                var dataRowTemp = {
                    tablename: "DW_DS_TREECON2",
                    sbtid:(dataSource)?dataSource.sbtid:"",
                    keyfields: [],
                    columns: []
                };
                var PAY_TIAOZHENG=0;
                dataRowTemp=JSON.stringify(dataRowTemp);
                var jsonArr=[];
                for(var d=0;d<tableData.length;d++){
                    tableData[d]["PAY_TIAOZHENG"]=(tableData[d]["PAY_TIAOZHENG"])?parseFloat(tableData[d]["PAY_TIAOZHENG"]):0
                    PAY_TIAOZHENG=tableData[d]["PAY_TIAOZHENG"];
                    var dataRow=JSON.parse(dataRowTemp);
                    dataRow.columns.push({
                        fieldname:"REF_T_DATEID",
                        value:date
                    },{
                        fieldname:"DEP_BGT_ECO_NAME",
                        value:tableData[d]["DEP_BGT_ECO_NAMENAME"]
                    },{
                        fieldname:"PAY_MUBIAO",
                        value:tableData[d]["PAY_MUBIAO"]
                    },{
                        fieldname:"PAY_TIAOZHENG",
                        value:PAY_TIAOZHENG
                    },{
                        fieldname:"DEP_BGT_ECO_CODE_R",
                        value:tableData[d]["DEP_BGT_ECO_NAMEORDERID"]
                    })
                    jsonArr.push(dataRow);
                }
                var saveresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonSave", {jsonstr: JSON.stringify(jsonArr)});
                if (saveresult.isError) {
                    alert(saveresult.errMsg);
                    return false;
                } else {
                    saveresult = saveresult.result;
                    if (saveresult) {
                        alert("保存成功!")
                    }
                }
            }

        }
    }
}