var btnHtml = "<ul>" +
    "   <li onclick='passAudit()'>审核通过</li>" +
    "   <li onclick='reviewRejected()'>审核驳回</li>" +
    "</ul>";
$("#toobar_right").innerHTML(btnHtml);


function passAudit() {
    alert("审核通过")
}

function reviewRejected() {
    alert("审核驳回")
}