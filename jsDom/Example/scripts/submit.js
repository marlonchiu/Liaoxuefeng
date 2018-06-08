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
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }

  // 收集到的数据用&拼接起来
  var data = dataParts.join('&');
  // 向原始表单的action属性指定的处理函数发送POST请求
  request.open('POST', whichform.getAttribute("action"), true);
  // 在请求中添加application/x-www-form-urlencoded头部
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {

        // 正则表达式 /<article>([\s\S]+)<\/article>/ 表示<article>开头结尾 中间跟一个或者多个空或者非空白字符
        var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
        if (matches.length > 0) {
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