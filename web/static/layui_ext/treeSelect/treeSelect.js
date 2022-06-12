/**
 * 下拉树--start
 * 
 * @param {}
 *         id dom元素ID
 * @param {}
 *         zNodes 节点数据
 * @param {}
 *         lay_verify 校验
 */
function initSelectTree(id, zNodes, lay_verify) {
	var setting = {
		view : {
			dblClickExpand : false,
			showLine : false
		},
		data : {
			key : {
				name : "NAME"
			},
			simpleData : {
				enable : true,
				idKey : "ID",
				pIdKey : "PID",
				rootPId : "#"
			}
		},
		check : {
			enable : false
		},
		callback : {
			onClick : onClick,
			onCheck : onCheck
		},
		view : {
			showIcon : false
		}
	};
	var html = '<div class = "layui-select-title" >' + '<input id="' + id + 'Show" ' + lay_verify
	 + ' type = "text"   readonly    placeholder = "请选择" value = "" class = "layui-input" >'
	 + '<i class= "layui-edge" ></i>' + '</div>';
	$("#" + id).append(html);
	$("#" + id).parent().append('<div class="tree-content scrollbar" style="display:none;">' + '<input hidden id="' + id
	 + 'Hide" ' + 'name="' + $(".select-tree").attr("id") + '">' + '<ul id="' + id
	 + 'Tree" class="ztree scrollbar" style="margin-top:0;"></ul>' + '</div>');
	$("#" + id).bind("click", function() {
		 if ($(this).parent().find(".tree-content").css("display") !== "none") {
			 hideMenu()
		 } else {
			 $(this).addClass("layui-form-selected");
			 var width = $(this).width() - 2;
			 var h = $(this).height();
			 // var h = $(this).parent().find(".tree-content").height();//弹窗的高
			 $(this).parent().find(".tree-content").css({
				  zIndex : '999',
				  position : 'absolute',
				  left : "0px",
				  top : h + "px"
			  }).show();
			 $(this).parent().find(".tree-content").css({
				  width : width
			  });
			 $(this).parent().find(".tree-content").addClass("layui-anim layui-anim-upbit");
			 $("body").bind("mousedown", onBodyDown);
		 }
	 });

	$.fn.zTree.init($("#" + id + "Tree"), setting, zNodes);

}

function onClick(event, treeId, treeNode) {
	onClick0(event, treeId, treeNode);
}
function onClick0(event, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	if (zTree.setting.check.enable == true) {
		zTree.checkNode(treeNode, !treeNode.checked, false)
		assignment(treeId, zTree.getCheckedNodes());
	} else {
		assignment(treeId, zTree.getSelectedNodes());
		hideMenu();
	}
}

function onCheck(event, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	assignment(treeId, zTree.getCheckedNodes());
}

function hideMenu() {
	$(".select-tree").removeClass("layui-form-selected");
	$(".tree-content").fadeOut('fast');
	$("body").unbind("mousedown", onBodyDown);
}

function assignment(treeId, nodes) {
	refFactorId = treeId.substring(0, treeId.length - 4);
	var names = "";
	var ids = "";
	for (var i = 0, l = nodes.length; i < l; i++) {
		names += nodes[i].NAME + ",";
		ids += nodes[i].ID + ",";
	}
	if (names.length > 0) {
		names = names.substring(0, names.length - 1);
		ids = ids.substring(0, ids.length - 1);
	}
	treeId = treeId.substring(0, treeId.length - 4);
	$("#" + treeId + "Show").attr("value", names);
	$("#" + treeId + "Hide").attr("value", ids);
	$("#" + refFactorId).attr("value", ids);
}

function initTreeSelectData(treeId, id, name) {
	// 获取中文名
	var mytreeObj = $.fn.zTree.getZTreeObj(treeId + "Tree");
	var nodes = mytreeObj.getNodesByParam("ID", id, null);
	if (nodes != null && nodes.length > 0) {
		$("#" + treeId + "Show").attr("value", nodes[0].NAME);
		$("#" + treeId + "Hide").attr("value", id);
		$("#" + treeId).attr("value", id);
	}
}

function onBodyDown(event) {
	if ($(event.target).parents(".tree-content").html() == null) {
		hideMenu();
	}
}
// 下拉树--end
