// ajax
function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
      catch (e) {}
      return false;
    }
  return new XMLHttpRequest();
}


function displayAjaxLoading(element) {
  // Remove the existing content.
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
  //  Create a loading image.
  var content = document.createElement("img");
  content.setAttribute("src","images/loading.gif");
  content.setAttribute("alt","Loading...");
  // Append the loading element.
  element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {
  // 调用displayAjaxLoading函数，删除目标元素的子元素，并添加loading.gif图像
  // 把表单的值组织成URL编码的字符串，以便通过Ajax请求发送
  // 创建方法为POST的Ajax请求，把表单的值发送给submit.html
  // 如果请求成功，解析响应并在目标元素中显示结果
  // 如果请求失败，显示错误消息
  var request = getHTTPObject();
  if (!request) { return false; }

  // Display a loading message.
  displayAjaxLoading(thetarget);

  // Collect the data.
  // encodeURIComponent 把值编码成URL安全的字符  会把有歧义的字符转成对应的ASCII编码
  var dataParts = [];
  var element;
  for (var i = 0; i < whichform.elements.length; i++) {
    element = whichform.elements[i];
    // 将表单元素拼成URL中传递的信息，同时对表单元素的值进行了适用于URL的转码
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }

  // 收集到的数据用&拼接起来
  var data = dataParts.join('&');
  // 向原始表单的action属性指定的处理函数发送POST请求
  request.open('POST', whichform.getAttribute("action"), true);
  // 在请求中添加application/x-www-form-urlencoded头部
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    // 当访问请求处理完成，接收响应也完成后
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
        // 注意下面正则中使用了捕获组的定义
        // 正则表达式 /<article>([\s\S]+)<\/article>/ 表示<article>开头结尾 中间跟一个或者多个空或者非空白字符
        var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
        if (matches.length > 0) {
          // 匹配结果是一个数组，第一个数组元素是与整个模式完整匹配的部分
          // 匹配结果数组的第二个元素（索引为1），是responseText中与捕获组中的模式匹配的部分。
          // 因为本例中只定义了一个捕获组，所以matches也只包含两个元素。
          thetarget.innerHTML = matches[1];
        } else {
          thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
        }
      } else {
        thetarget.innerHTML = '<p>' + request.statusText + '</p>';
      }
    }
  };

  request.send(data);
  return true;
};