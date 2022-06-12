var subArr = [];
var arr = [70, 75, 80, 85, 90, 95];
for (let i = 0; i <= arr.length; i++) {
    var str = "";
    if (i == 0) {
        str = "p.data<" + arr[i]
        subArr.push(str)
    } else if (i == arr.length) {
        str = "p.data>" + arr[i - 1]
        subArr.push(str)
    } else {
        str = "p.data>" + arr[i - 1] + "&& p.data<" + arr[i];
        subArr.push(str)
    }
}
console.log(subArr)

/*

color: function(p) {
    for (let i = 0; i < subArr.length; i++) {


        if (eval(subArr[i])) {
            console.log(myColor[i])
            return myColor[i]
        }
    }
},*/
