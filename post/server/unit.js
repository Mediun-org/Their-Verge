exports.test1 = (name) => {
    return "haha " + name;
}
const func1 = function(num1, num2) {
    return num1 + num2;
}
const func2 = function(num1, num2, num3) {
    var x = func1(num1, num2);
    return x * num3;
}
exports.func2 = func2;