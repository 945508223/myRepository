var ztreeId;function init(){initListCrtlTree();$("#ctrlPropertyGrid").datagrid({height:420,singleSelect:true,striped:true,data:[],columns:[[{field:"GROUPNAME",title:"属性分组",halign:"center",width:120,height:50},{field:"PNAME",title:"属性名",halign:"center",width:120,height:50},{field:"PCNAME",title:"中文名",halign:"center",width:120,height:50},{field:"PTYPE",title:"属性类型",halign:"center",width:120,height:50},{field:"DEFAULTVAL",title:"缺省值",halign:"center",width:120,height:50},{field:"MAPPROPERTY",title:"对应属性",halign:"center",align:"right",width:120,height:50},{field:"CTRLNAME",title:"控件名",hidden:true}]]})}function initListCrtlTree(){var e={view:{selectedMulti:true},callback:{onClick:getSelectedNode,onAsyncSuccess:expandRootNode},data:{key:{name:"NAME"},simpleData:{enable:true,idKey:"ID",pIdKey:"PID",rootPId:null}}};var t=findAllNodes();var r=jQuery.fn.zTree.init($("#initListCtrlTreeId"),e,t);r.expandAll(true)}function findAllNodes(){var e="select t.guid as id,"+"       t.cnname   as name, t.ctrlname,"+"       t2.coden   as pid,"+"       CORDER     as orderno "+"  from dm_form_components t, dm_form_code t2"+" where 1 = 1"+"   and t.groupname = t2.coden "+" union "+"select coden as id, cname as name,null ctrlname, '#' as pid, 0 as orderno "+"  from dm_form_code "+" where basename = 'form_ctrlgroup' "+" order by pid, orderno";var t=$DS.selectBySql(null,e,"查询控件分类异常");if(t.isError){alert(t.errMsg);return false}else{return t.result}}function expandRootNode(e,t,r,l){var i=$.fn.zTree.getZTreeObj(t);var n=i.getNodes();if(n.length>0){for(var d=0;d<n.length;d++){i.expandNode(n[d],true,true,true)}}}function getSelectedNode(e,t,r){ztreeId=r.ID;var l=r.NAME;var i=r.getParentNode();loadPropertyTable(ztreeId,l,i)}function loadPropertyTable(e,t,r){var l=$.fn.zTree.getZTreeObj("initListCtrlTreeId");var i=l.getSelectedNodes();if(i[0].isParent){$("#ctrlPropertyGrid").datagrid("loadData",[])}else{loadCtrlPropertyGrid(i[0].CTRLNAME)}}function loadCtrlPropertyGrid(e){$("#ctrlPropertyGrid").empty();var t=$DS.selectBySql(null," select * from dm_form_cproperties t where t.ctrlname ='"+e+"' order by t.porder","控件管理查询控件信息异常");if(t.isError){alert(t.errMsg);return false}else{t=t.result}$("#ctrlPropertyGrid").datagrid({height:420,singleSelect:true,fitColumns:true,striped:true,data:t,columns:[[{field:"GROUPNAME",title:"属性分组",halign:"center",width:120,height:50},{field:"PNAME",title:"属性名",halign:"center",width:120,height:50},{field:"PCNAME",title:"中文名",halign:"center",width:120,height:50},{field:"PTYPE",title:"属性类型",halign:"center",width:120,height:50},{field:"DEFAULTVAL",title:"缺省值",halign:"center",width:120,height:50,formatter:function(e,t,r){if(typeof e=="string"&&e.indexOf("</")>-1)return'<input type="text" readonly="readonly" style="border:0px;background-color:rgba(0,0,0,0);filter:Alpha(opacity=0);" value="'+e+'" />';else return e}},{field:"MAPPROPERTY",title:"对应属性",halign:"center",align:"right",width:120,height:50},{field:"CTRLNAME",title:"控件名",hidden:true}]]})}function addCtrl(){var e=null;showMyDialog("添加控件",700,350,"addComponents.jsp?update="+e,function(){},"background-color: #fff;font-size:18px;color:#000;")}function updateCtrl(){var e=$.fn.zTree.getZTreeObj("initListCtrlTreeId");var t=e.getSelectedNodes();if(t[0]==undefined){alert("请选择要修改的节点！")}else{var r=t[0].ID;var l=t[0].getParentNode();if(l==null){alert("该节点不支持修改，请选择其子节点！")}else{var i="update";showMyDialog("修改控件",700,350,"addComponents.jsp?guid="+r+"&update="+i,function(){},"background-color: #fff;font-size:18px;color:#000;")}}}function deleteCtrl(){layer.confirm("确认删除？",{icon:3,title:"提示"},function(){var e=$.fn.zTree.getZTreeObj("initListCtrlTreeId");var t=e.getSelectedNodes();if(t.length==0||t[0].isParent){alert("该节点不支持删除，请选择其子节点！");return}var r=t[0].CTRLNAME;var l=$DS.selectBySql(null," select * from dm_form_cproperties t where t.ctrlname ='"+r+"'","查询控件下是否有属性时出现异常");if(l.isError){alert(l.errMsg);return false}else{l=l.result;if(l!=null&&l.length>0){alert("该控件下存在属性，不能删除！");return}}var i=$DS.deleteById(null,"dm_form_components","GUID",t[0].ID,function(e){initListCrtlTree();alert("删除成功!")});if(i.isError){alert(i.errMsg);return false}},function(){})}function addCtrlProperty(){var e=$.fn.zTree.getZTreeObj("initListCtrlTreeId");var t=e.getSelectedNodes();if(t[0]==undefined){alert("请选择要添加属性的节点！");return}else{var r=t[0].ID;var l=t[0].CTRLNAME;var i=t[0].getParentNode();if(i==null){alert("该节点不支持添加属性，请选择其子节点！");return}else{showMyDialog("添加属性",1e3,540,"addCProperty.jsp?ctrlname="+l+"&addOrUpdate=add",function(){},"background-color: #fff;font-size:18px;color:#000;")}}}function updateCtrlProperty(){var e=$("#ctrlPropertyGrid").datagrid("getSelected");var t=$.fn.zTree.getZTreeObj("initListCtrlTreeId");var r=t.getSelectedNodes();if(r[0]==undefined){alert("请选择要修改的节点！")}else{var l=r[0].CTRLNAME;var i=r[0].getParentNode();if(i==null){alert("该节点不支持修改，请选择其子节点！")}else{if(e!=null){var n=e.GUID;showMyDialog("修改属性",1e3,540,"addCProperty.jsp?ctrlname="+l+"&addOrUpdate=update"+"&guid="+n,function(){},"background-color: #fff;font-size:18px;color:#000;")}else{alert("请选择要修改的属性！")}}}}function deleteCtrlProperty(){layer.confirm("确认删除？",{icon:3,title:"提示"},function(e){layer.close(e);var t=$("#ctrlPropertyGrid").datagrid("getSelected");if(t){var r=$DS.deleteById(null,"dm_form_cproperties","GUID",t.GUID,function(e){loadCtrlPropertyGrid(t.CTRLNAME);alert("删除成功!")});if(r.isError){alert(r.errMsg);return false}}else{alert("请选择要修删除的节点！");return false}},function(){})}