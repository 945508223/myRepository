//========================================初始化=====================================================================
//存储原始src和pageid
debugger
var iframeElement=$DV.getEl("网页框1")
var oldSrc=$(iframeElement).find("iframe").attr("src");
var oldPageId=oldSrc.split("pageId=")[1].split("&")[0];
var pageInfo={
    iframeElement:iframeElement,
    oldSrc:oldSrc,
    oldPageId:oldPageId,
    type:"old",
    pageId:oldPageId,
    currMonth:$DV.pms("PUBDATE_YEARMONTH")//获取当前月份
}

var sql="select id from DV_PAGESNAPSHOT where fromid='"+pageInfo.oldPageId+"' and exe1='"+pageInfo.currMonth+"'";
var selectResult=$DV.commonSelect([{name:"selectSnapshot",sql:sql}]);
//如果数据存在,执行更新操作
if(selectResult&&selectResult["selectSnapshot"]&&selectResult["selectSnapshot"].length>0){
    var guid=selectResult["selectSnapshot"][0].ID;
    if(guid){
        pageInfo.type="new";
        pageInfo.pageId=guid;
        changeSrc();
    }
}
//===========================================修改iframe路径===================================================================
/**
 * 修改iframe路径
 */
function changeSrc() {
    debugger
    var newSrc=oldSrc.split("?")[0]+"?pageId="+pageInfo.pageId+"&cachemode=1"
    $(iframeElement).find("iframe").attr("src",newSrc);
}
//==========================================隐藏输入框=================================================================
/**
 * 隐藏输入框
 * @param name
 * @param type
 */
function displayCtrl(name,display) {
    debugger
    if(!display){
        display=$($DV.getEl(name)).css("display");
        display=(display=="block")?"none":"block"
    }
    $($DV.getEl(name)).css("display",display);
}
//===========================================重置============================================================
/**
 * 重置
 * @param ctrlname
 */
function reloadTable(ctrlname) {
    debugger
    var element=$DV.getEl(ctrlname);
    $(element).find("iframe").attr("src",pageInfo.oldSrc);
}
//============================================保存===============================================================
/**
 * 保存数据
 */

function saveTable() {
    debugger
    //保存数据
    var saveData={};
    saveData["page"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.page;
    saveData["html"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.$("#box").prop("outerHTML");
    saveData["options"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.options;
    saveData["dragDatas"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.dragDatas;
    saveData["cacheResultData"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.cacheResultData;
    saveData["chartLinks"] = $(pageInfo.iframeElement).find("iframe")[0].contentWindow.chartLinks;

    //数据保存到表
    var data=$(pageInfo.iframeElement).find("iframe")[0].contentWindow.cacheResultData[$($(pageInfo.iframeElement).find("iframe")[0].contentWindow.$DV.getEl("执行率表格")).attr("id")];
    var dataSource=$($(pageInfo.iframeElement).find("iframe")[0].contentWindow.$DV.getEl("执行率表格")).attr("datasource");
    if(dataSource)dataSource=JSON.parse(dataSource);
    //先执行删除
    var delTemp = {
        tablename: "DW_DS_BUDGET_PER11",
        sbtid:(dataSource)?dataSource.sbtid:"",
        keyfields: [{
            fieldname:"REF_T_DATEID",
            value:$DV.pms("PUBDATE_YEARMONTH")+"01",
            defaultvalue: "",
            fieldType: "number"
        },{
            fieldname:"TYPECODE",
            value:"02",
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
        //保存
        var dataRowTemp = {
            tablename: "DW_DS_BUDGET_PER11",
            sbtid:(dataSource)?dataSource.sbtid:"",
            keyfields: [],
            columns: []
        };
        var PAY_TIAOZHENG=0;
        dataRowTemp=JSON.stringify(dataRowTemp);
        var jsonArr=[];
        for(var d=0;d<data.length;d++){
            data[d]["PAY_TIAOZHENG"]=(data[d]["PAY_TIAOZHENG"])?parseFloat(data[d]["PAY_TIAOZHENG"]):0;
            PAY_TIAOZHENG=PAY_TIAOZHENG+data[d]["PAY_TIAOZHENG"];
            var dataRow=JSON.parse(dataRowTemp);
            dataRow.columns.push({
                fieldname:"REF_T_DATEID",
                value:$DV.pms("PUBDATE_YEARMONTH")+"01"
            },{
                fieldname:"AGENCY_NAME",
                value:data[d]["CW_MD_REF_T_BUD_AGENCYNAME"]
            },{
                fieldname:"CW_MD_REF_T_BUD_AGENCYID",
                value:data[d]["CW_MD_REF_T_BUD_AGENCYID"]
            },{
                fieldname:"PAY_MUBIAO",
                value:data[d]["PAY_MUBIAO"]
            },{
                fieldname:"PAY_TIAOZHENG",
                value:data[d]["PAY_TIAOZHENG"]
            },{
                fieldname:"PAY_YEAR",
                value:data[d]["PAY_YEAR"]
            },{
                fieldname:"TYPECODE",
                value:"02"
            },{
                fieldname:"TYPENAME",
                value:"测算值"
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
                //求和保存
                return saveSum(parseFloat($DV.mul(PAY_TIAOZHENG,10000)),dataSource,saveData);


            }
        }

    }
}
window.top.saveTable=saveTable;

/**
 * 保存求和数据
 * @param PAY_TIAOZHENG
 * //SELECT * FROM DW_DS_BUDGET_PER10 where REF_T_DATEID=TO_CHAR(ADD_MONTHS(TO_DATE(20170201,'yyyymmdd'),-1),'yyyymmdd')
 */
function saveSum(PAY_TIAOZHENG,dataSource,saveData) {
    debugger
    var sum={};
    //先执行删除
    var delTemp = {
        tablename: "DW_DS_BUDGET_PER10",
        sbtid:(dataSource)?dataSource.sbtid:"",
        keyfields: [{
            fieldname:"REF_T_DATEID",
            value:$DV.pms("PUBDATE_YEARMONTH")+"01",
            defaultvalue: "",
            fieldType: "number"
        },{
            fieldname:"TYPECODE",
            value:"02",
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
        //执行查询
        var sql="SELECT * FROM DW_DS_BUDGET_PER10 where REF_T_DATEID=TO_CHAR(ADD_MONTHS(TO_DATE("+$DV.pms("PUBDATE_YEARMONTH")+"01"+",'yyyymmdd'),-1),'yyyymmdd')"
        var result=$DV.commonSelect([{name:"selectSum",sql:sql}],(dataSource)?dataSource.sbtid:"");
        if(result&&result["selectSum"]&&result["selectSum"].length>0){
            sum=result["selectSum"][0];
            //执行保存
            var dataRow = {
                tablename: "DW_DS_BUDGET_PER10",
                sbtid:(dataSource)?dataSource.sbtid:"",
                keyfields: [],
                columns: []
            };
            sum["REF_T_DATEID"]=$DV.pms("PUBDATE_YEARMONTH")+"01";
            sum["PAY_TIAOZHENG"]=PAY_TIAOZHENG;
            sum["TYPECODE"]="02";
            sum["TYPENAME"]="测算值";
            for(var s in sum){
                dataRow.columns.push({
                    fieldname:s,
                    value:sum[s]
                })
            }
            var saveresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonSave", {jsonstr: JSON.stringify([dataRow])});
            if (saveresult.isError) {
                alert(saveresult.errMsg);
                return false;
            } else {
                saveScore(PAY_TIAOZHENG,sum,saveData)

            }
        }else{
            alert("保存失败!");
            return false;
        }
    }
}

/**
 * 保存得分数据
 * @param PAY_TIAOZHENG
 * @param dataSource
 */
function saveScore(PAY_TIAOZHENG,sum,saveData) {
    debugger
    var dataSource=$("#box").attr("datasource");
    if(dataSource)dataSource=JSON.parse(dataSource);
    var DW_ND_KPI00ID=$DV.pms("url_DW_ND_KPI00ID");
    var KPICODE_R=$DV.pms("url_KPICODE_R");
    var KPINAME=$DV.pms("url_KPINAME");
    if(!DW_ND_KPI00ID) {
        alert("保存失败!")
        return false;
    }
    var SCORE_A=parseFloat($DV.div($DV.add(sum.PAY_YEAR,sum.PAY_TIAOZHENG),sum.PAY_MUBIAO)).toFixed(6);
    SCORE_A=$DV.mul(SCORE_A,100);
    var SCORE_B=$DV.mul($DV.mul(parseInt($DV.pms("PUBDATE_MONTH")),8.33),0.99);
    var SCORE=($DV.sub(SCORE_A,SCORE_B)>0)?1:0;
    //先执行删除
    var delTemp = {
        tablename: "DW_CF_KPIPROVNNOW",
        sbtid:(dataSource)?dataSource.sbtid:"",
        keyfields: [{
            fieldname:"REF_T_DATEID",
            value:$DV.pms("PUBDATE_YEARMONTH")+"01",
            defaultvalue: "",
            fieldType: "number"
        },{
            fieldname:"DW_ND_KPI00ID",
            value:DW_ND_KPI00ID,
            defaultvalue: "",
            fieldType: "number"
        },{
            fieldname:"KPICODE_R",
            value:KPICODE_R,
            defaultvalue: "",
            fieldType: "string"
        },{
            fieldname:"TYPECODE",
            value:"02",
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
        //执行查询cid
        var sql="select max(cid) as cid from DW_CF_KPIPROVNNOW";
        var result=$DV.commonSelect([{name:"selectCid",sql:sql}],(dataSource)?dataSource.sbtid:"");
        if(result&&result["selectCid"]&&result["selectCid"].length>0){
            var CID=result["selectCid"][0].CID;
            //保存
            var dataRow = {
                tablename: "DW_CF_KPIPROVNNOW",
                sbtid:(dataSource)?dataSource.sbtid:"",
                keyfields: [],
                columns: [{
                    fieldname:"REF_T_DATEID",
                    value:$DV.pms("PUBDATE_YEARMONTH")+"01"
                },{
                    fieldname:"CID",
                    value:parseInt(CID)+1
                },{
                    fieldname:"BID",
                    value:parseInt(CID)+1
                },{
                    fieldname:"DW_ND_KPI00ID",
                    value:DW_ND_KPI00ID
                },{
                    fieldname:"TYPECODE",
                    value:"02"
                },{
                    fieldname:"TYPENAME",
                    value:"测算得分"
                },{
                    fieldname:"KPICODE_R",
                    value:KPICODE_R
                },{
                    fieldname:"KPINAME",
                    value:KPINAME
                },{
                    fieldname:"SCORE",
                    value:SCORE
                }]
            };
            var saveresult = YCDCommon.Ajax.syncAjax(getProjectName()+"/meta/commJsonSave", {jsonstr: JSON.stringify([dataRow])});
            if (saveresult.isError) {
                alert(saveresult.errMsg);
                return false;
            } else {
                //存储表格镜像
                saveTableSna(saveData,"EXE1")
                alert("保存成功!")
            }
        }else{

            alert("保存失败!")
            return false;
        }

    }
}

/**
 * 存储表格镜像
 * @param saveData
 */
function saveTableSna(saveData,type) {
    //存储表格镜像
    var params={};
    params[type]=pageInfo.currMonth;
    if(pageInfo.type=="old"){
        var savePageId=$DV.saveWord(pageInfo.oldPageId,params,saveData,null,"all");
        pageInfo.type="new";
    }else{
        params["saveup"]=true;
        var savePageId=$DV.saveWord(pageInfo.oldPageId,params,saveData,null,"update",pageInfo.pageId);
    }
    pageInfo.pageId=savePageId;
    //变更src
    changeSrc();
    //重新加载外侧页面数据
    changeOuterLabel();
}
/**
 * 修改外侧标签
 */
function changeOuterLabel(){
    debugger
    parent.parent.$DV.loadEl("总分");
    parent.parent.$DV.loadEl("测算总分");
    parent.parent.$DV.loadEl("得分");
    var scoreIframe=parent.parent.$DV.getEl("网页框2");
    $(scoreIframe).find("iframe")[0].contentWindow.$DV.loadEl("柱状图1");
}








