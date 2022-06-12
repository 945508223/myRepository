//
let pageInfo_ = {
    gridId: '',
    ctrlName: '右下表格'
};

function initGridDataForChangeAdmdiv() {
    try {
        debugger
        pageInfo_.gridId = F_tableArgs.divId;
        let allData = deepClone_(F_tableArgs.data);
        for (let row of allData) {
            let codeKey = row.MOF_DIV_NAMEORDERID.substr(0, 4);
            if (!pageInfo_[codeKey])
                pageInfo_[codeKey] = [];
            pageInfo_[codeKey].push(row);
        }
    } catch (e) {
        console.error(e)
    }
}

//变更更数据
function changeDataByCode(code) {
    debugger
    $('#' + pageInfo_.gridId).datagrid('loadData', pageInfo_[code] && pageInfo_[code].length > 0 ? pageInfo_[code] : []);
    let id = $DV.getEl(pageInfo_.ctrlName).id;
    $("#" + id).find(".datagrid-header td, .datagrid-body td, .datagrid-footer td").each(function () {
        $(this).css("border-width");
    });
}

function deepClone_(obj) {
    /**
     * 判别类型
     * @param {} o
     * @return {String}
     */
    function isClass(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    var result, oClass = isClass(obj);
    // 确定result的类型
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);// 递归调用
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}