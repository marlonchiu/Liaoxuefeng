# 廖雪峰的JavaScript教程

在线教程地址：[JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

## AJAX
* AJAX主要依靠 `XMLHttpRequest` 对象：
* 发送一个ajax请求的代码实现：

  ```javascript
  function success(text) {
      var textarea = document.getElementById('test-response-text');
      textarea.value = text;
  }
  
  function fail(code) {
      var textarea = document.getElementById('test-response-text');
      textarea.value = 'Error code: ' + code;
  }
  
  var request;  // 新建XMLHttpRequest对象
  if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
  } else {
      request = new ActiveXObject('Microsoft.XMLHTTP');  // 兼容低版本IE
  }
  
  request.onreadystatechange = function () { // 状态发生变化时，函数被回调
      if (request.readyState === 4) { // 成功完成
          // 判断响应结果:
          if (request.status === 200) {
              // 成功，通过responseText拿到响应的文本:
              return success(request.responseText);
          } else {
              // 失败，根据响应码判断失败原因:
              return fail(request.status);
          }
      } else {
          // HTTP请求还在继续...
      }
  }
  
  // 发送请求:
  request.open('GET', '/api/categories');
  request.send();
  
  alert('请求已发送，请等待响应...');
  ```
  
* 实现原理分析：
   * 通过检测window对象是否有 `XMLHttpRequest` 属性来确定浏览器是否支持标准的 `XMLHttpRequest`。
   * 当创建了 `XMLHttpRequest` 对象后，要先设置 `onreadystatechange` 的回调函数。
     在回调函数中，通常我们只需通过 `readyState === 4` 判断请求是否完成，如果已完成，再根据 `status === 200` 判断是否是一个成功的响应。

   * `XMLHttpRequest` 对象的 `open()` 方法有3个参数，第一个参数指定是GET还是POST，第二个参数指定URL地址，第三个参数指定是否使用异步，默认是true，所以不用写。
     注意，千万不要把第三个参数指定为false，否则浏览器将停止响应，直到AJAX请求完成。
     如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。
   * 最后调用 `send()` 方法才真正发送请求。
   * **`GET` 请求不需要参数，`POST` 请求需要把body部分以字符串或者FormData对象传进去。**
   
* 同源策略
   * 满足协议名、域名、端口号都相同就是同源。特殊的 `localhost` 和 `127.0.0.0`也不是同一个
   * 处理跨域请求的方案：
      * 一是通过Flash插件发送HTTP请求，这种方式可以绕过浏览器的安全限制，但必须安装Flash，并且跟Flash交互（麻烦已不用）。
      * 二是通过在同源域名下架设一个代理服务器来转发，JavaScript负责把请求发送到代理服务器：
        代理服务器再把结果返回，这样就遵守了浏览器的同源策略。这种方式麻烦之处在于需要服务器端额外做开发。
      * `JSONP`

* JSONP 
   * 只能发送GET请求，利用某些标签不受跨域限制的要求，如 `script`；
   * 其结果通常以函数调用的形式返回。
   
      ```javascript
      function refreshPrice(data) {
          var p = document.getElementById('test-jsonp');
          p.innerHTML = '当前价格：' +
              data['0000001'].name +': ' + 
              data['0000001'].price + '；' +
              data['1399001'].name + ': ' +
              data['1399001'].price;
      }
      
      // 利用script标签发送AJAX请求
      function getPrice() {
          var
              js = document.createElement('script'),
              head = document.getElementsByTagName('head')[0];
          
          js.src = 'http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice';   // 请求 url + 'callback = func' 
          head.appendChild(js);
      }
      ```

* CORS
   * CORS全称 Cross-Origin Resource Sharing ，是HTML5规范定义的如何跨域访问资源。

   * Origin表示本域，也就是浏览器当前页面的域。当JavaScript向外域（如sina.com）发起请求后，
   浏览器收到响应后，首先检查Access-Control-Allow-Origin是否包含本域，
   如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。
   
   * 服务器端响应头设置：`Access-Control-Allow-Origin: *`
   * 跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的 `Access-Control-Allow-Origin`
   
## Promise
* `Promise.all()` -- 两个任务并行执行

    ```javascript
    var p1 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 500, 'P1');
    });
    var p2 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 600, 'P2');
    });
    // 同时执行p1和p2，并在它们都完成后执行then:
    Promise.all([p1, p2]).then(function (results) {
        console.log(results); // 获得一个Array: ['P1', 'P2']
    });
    ```
    
* `Promise.race()` -- 两个任务哪个先返回结果就停止(串行)

```javascript
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
});

// 由于p1执行较快，Promise的then()将获得结果'P1'。p2仍在继续执行，但执行结果将被丢弃。
```