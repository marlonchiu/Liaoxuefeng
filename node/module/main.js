"use strict";
// 引入hello模块用Node提供的require函数
/*
* 引入的模块作为变量保存在greet变量中，
* 变量greet就是在hello.js中我们用module.exports = greet;输出的greet函数。
* 所以，main.js就成功地引用了hello.js模块中定义的greet()函数，接下来就可以直接使用它了。
* 在使用require()引入模块的时候，请注意模块的相对路径。
* */
var greet = require('./hello');

var s = 'Marlon';
greet(s);