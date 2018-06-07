"use strict";

var s = "hello";
function greet(name) {
    console.log(s + ',' + name + '!');
}

// 把函数greet作为模块的输出暴露出去
module.exports = greet;