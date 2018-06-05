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
   * `GET` 请求不需要参数，`POST` 请求需要把body部分以字符串或者FormData对象传进去。