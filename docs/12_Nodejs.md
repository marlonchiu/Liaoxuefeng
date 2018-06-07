# 廖雪峰的JavaScript教程

在线教程地址：[JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

## Node.js
* 在Node上运行的JavaScript相比其他后端开发语言有何优势？
   最大的优势是借助JavaScript天生的事件驱动机制加V8高性能引擎，使编写高性能Web服务轻而易举。
   其次，JavaScript语言本身是完善的函数式语言，在前端开发时，开发人员往往写得比较随意，让人感觉JavaScript就是个“玩具语言”。
   但是，在Node环境下，通过模块化的JavaScript代码，加上函数式编程，并且无需考虑浏览器兼容性问题，直接使用最新的ECMAScript 6标准，可以完全满足工程上的需求。

* Node的交互模式和直接运行.js文件有什么区别呢？
   直接输入node进入交互模式，相当于启动了Node解释器，但是等待你一行一行地输入源代码，每输入一行就执行一行。
   直接运行node hello.js文件相当于启动了Node解释器，然后一次性把hello.js文件的源代码给执行了，你是没有机会以交互的方式输入源代码的。
   
### 模块

* 加载模块  -- CommonJS规范
   * 在这个规范下，每个.js文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，
     例如，hello.js和main.js都申明了全局变量var s = 'xxx'，但互不影响。
   * 一个模块想要对外暴露变量（函数也是变量），可以用 `module.exports = variable;`，
     一个模块要引用其他模块暴露的变量，用 `var ref = require('module_name');`(注意相对路径)就拿到了引用模块的变量。
     
      ```javascript
      // --------------------------hello.js-----------------
      
      "use strict";
      
      var s = "hello";
      function greet(name) {
          console.log(s + ',' + name + '!');
      }
      
      // 把函数greet作为模块的输出暴露出去
      module.exports = greet;
      
      
      // --------------------------main.js-----------------
      
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
      ```

* 模块使用总结
   * 要在模块中对外输出变量，用：

      ```javascript
      module.exports = variable;
      ```
      
      输出的变量可以是任意对象、函数、数组等等。

   * 要引入其他模块输出的对象，用：

      ```javascript
      var foo = require('other_module');
      ```

      引入的对象具体是什么，取决于引入模块输出的对象。
