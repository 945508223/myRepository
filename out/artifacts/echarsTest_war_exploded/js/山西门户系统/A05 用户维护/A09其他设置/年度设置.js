function gridValChange_settingYear(newValue, oldValue, scope) {
    debugger
    var row = scope.row;
    var col = scope.column;
    switch (col.columnKey) {
        case 'YEAR':
            row.YEAR = newValue;
            break;
        case 'ISDEFAULT'://当前年度
        case 'ISBGT'://预算年度
            let current = col.columnKey == 'ISDEFAULT' ? 'ISDEFAULT' : 'ISBGT';
            let other = col.columnKey == 'ISDEFAULT' ? 'ISBGT' : 'ISDEFAULT';
            if (newValue == '1' && row[other] == '1') {
                row[current] = oldValue;
                alert('仅可选一个');
                return
            }
            break
    }
}