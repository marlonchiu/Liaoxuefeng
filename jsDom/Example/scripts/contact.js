/*
* 点击label中的文本 获取焦点
*   1 取得文档中的label元素
*   2 如果label 有for属性，添加一个事件处理函数
*   3 在label被单击时，提取for 属性，这个值就是相应的字段的id值
*   4 确保存在相应的表单字段
*   5 让相应的表单字段获得焦点
* */


// 将表单的内容传递给一个地址 然后更新原地址的<article>属性  输入框不能为空  emil框得有@和.
function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i=0; i<labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}


/*
*  点击表单文本让placeholder 字段删除
*    1 检查浏览器是否支持placeholder属性，如果支持继续
*    2 循环遍历表单中的元素
*    3 如果当前元素是提交按钮 跳过
*    4 为元素获得焦点的事件添加一个处理函数。如果字段的值等于占位符文本，则将字段的值设置为空
*    5 再为元素失去焦点的事件添加一个处理函数。如果字段的值为空，则为其添加占位符文本
*    6 为了应用样式，在字段显示占位符的值的时候添加placeholder类
*
*
*   说明：
*       onfocus事件会在用户通过Tab键或者单击表单字段时触发
*       onblur 事件在用户移出表单字段时触发，此外onblur事件定义之后立即调用以便必要时应用占位符
* */

function resetFields(whichform) {
  if(Modernizr.input.placeholder) return;
  for (var i=0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    var check = element.placeholder || element.getAttribute("placeholder");
    if(!check) continue;

    element.onfocus = function() {
      var text = this.placeholder || this.getAttribute("placeholder");
      if (this.value == text) {
        this.className = '';
        this.value = "";
       }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.className = 'placeholder';
        this.value = this.placeholder || this.getAttribute("placeholder");
      }
    }
    element.onblur();
  }
}


function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.className.indexOf("required") != -1) {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.className.indexOf("email") != -1) {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function isFilled(field) {
  if (field.value.length < 1 || field.value == field.defaultValue) {
    return false;
  } else {
    return true;
  }
}

function isEmail(field) {
  if (field.value.indexOf("@") == -1 || field.value.indexOf(".") == -1) {
    return false;
  } else {
    return true;
  }
}


// 循环遍历所有form对象，并将每一个form对象传给resetFields函数
function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    // thisform.onsubmit = function() {
    //   return validateForm(this);
    // }
  }
}


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
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');

  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
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


addLoadEvent(focusLabels);
addLoadEvent(prepareForms);