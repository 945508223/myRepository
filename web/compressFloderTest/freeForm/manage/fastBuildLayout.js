var modelObj={};var layCard=getLayCard();window.onload=function(){YCDCommon.loading("on_load")};function on_load(){registerParent()}function registerParent(){window.vm=new Vue({el:"#fastbuild",data:{laycard:layCard,currModel:""},created:function(){},computed:{computed_style:function(){var r={padding:"0rem"};return r}},watch:{},methods:{commonFunction:$DS.util.commonFunction,sure:sure,close:$DS.util.close,clickModel:function(r){this.currModel=r;$(".card").removeClass("cardActive");$("#"+r).addClass("cardActive")},deleteModel:function(r){$DS.util.confirm(this,"是否确认删除当前模板?",function(r,e){var a=parent.$DS.deleteById(parent.VUECFG.appId,"DM_FORM_MODELPAGE","GUID",e,function(r,e){if(r)alert(r);for(var a=0;a<layCard.length;a++){if(layCard[a].GUID==e){layCard.splice(a,1)}}window.vm.$data.laycard=layCard},null,"删除模板信息失败!",e);if(a.isError){alert(a.errMsg);return false}},"已取消删除",r)}}})}function getLayCard(){var r=parent.$DS.selectAll(parent.VUECFG.appId,"DM_FORM_MODELPAGE",["MIMG","MNAME","MDESCRIPT"],"GUID","","","","查询模板信息失败!");if(r.isError){alert(r.errMsg);return false}else{r=r.result}modelObj={};if(r&&r.rows)r=r.rows;else r=[];for(var e=0;e<r.length;e++){modelObj[r[e].GUID]=r[e]}return r}function sure(){$DS.util.confirm(this,"该操作将清空所有画布元素,重新构建表单,是否继续?",function(r){if(!r.currModel||!modelObj[r.currModel]){alert("请选择一项!")}var e=modelObj[r.currModel].GUID;parent.fastBuildLayout(e);r.close()},"已取消该操作!")}