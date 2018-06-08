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
  for (var i = 0; i<labels.length; i++) {
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

// function resetFields(whichform) {
//   if(Modernizr.input.placeholder) return;
//   console.log("1111");
//   for (var i = 0; i < whichform.elements.length; i++) {
//     var element = whichform.elements[i];
//     if (element.type == "submit") continue;
//     var check = element.placeholder || element.getAttribute("placeholder");
//     if(!check) continue;  // 去掉了 <fieldset> </fieldset>
//     element.onfocus = function() {
//       var text = this.placeholder || this.getAttribute("placeholder");
//       if (this.value == text) {
//         this.className = '';
//         this.value = "";
//       }
//     }
//     element.onblur = function() {
//       if (this.value == "") {
//         this.className = 'placeholder';
//         this.value = this.placeholder || this.getAttribute("placeholder");
//       }
//     }
//     element.onblur();
//   }
// }

function resetFields(whichform) {
  for (var i = 0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.defaultValue) continue;
    element.onfocus = function() {
      if (this.value == this.defaultValue) {
        this.value = "";
      }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.defaultValue;
      }
    }
  }
}


/*
*  表单验证
*     1 循环遍历表单的elements数组
*     2 如果发现required 属性，把相应的元素传递给isFilled 函数
*     3 如果isFilled函数返回false，显示警告信息，并且validateForm函数返回false
*     4 如果找到email类型的字段，把相应的元素传递给isEmail函数
*     5 如果isEmail函数返回false，显示警告信息，并且validateForm函数返回false
*     6 否则 validateForm函数返回true
* */
function validateForm(whichform) {
  for (var i = 0; i < whichform.elements.length; i++) {
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
// function validateForm(whichform) {
//   for (var i = 0; i < whichform.elements.length; i++) {
//     var element = whichform.elements[i];
//     if (element.required == 'required') {
//       if (!isFilled(element)) {
//         alert("Please fill in the "+ element.name+" field.");
//         return false;
//       }
//     }
//     if (element.type = 'email') {
//       if (!isEmail(element)) {
//         alert("The "+element.name+" field must be a valid email address.");
//         return false;
//       }
//     }
//   }
//   return true;
// }

// 文本输入验证
function isFilled(field) {
  if (field.value.length < 1 || field.value == field.defaultValue) {
    return false;
  } else {
    return true;
  }
}
// function isFilled(field) {
//   if (field.value.replace(' ','').length == 0 ) return false;
//   var placeholder = field.placeholder || field.getAttribLocation('placeholder');
//   return (field.value != placeholder)
// }

// 邮件地址验证(有@ 有.)
function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}


// 循环遍历所有form对象，并将每一个form对象传给resetFields函数
/*
*  如果表单没有验证通过，返回false，不能提交表单
*  如果submitFormWithAjax函数成功发送了ajax请求返回true，
*      则让submit事件处理函数返回false，以便阻止浏览器重复提交表单
*  如果submitFormWithAjax函数没有成功发送ajax请求，
*      则让submit事件处理函数返回true，让表单继续通过页面提交
*
* */
function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      if(!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      // 如果submitFormWithAjax函数成功发送了Ajax请求并返回true，则让submit事件处理函数返回false，以便阻止浏览器重复提交表单
      if (submitFormWithAjax(this, article)) return false;
      // 否则，说明submitFormWithAjax没有发送成功Ajax请求，因而让submit事件处理函数返回true，让表单像什么都没有发生一样继续通过页面提交
      return true;
    }
  }
}

addLoadEvent(focusLabels);
addLoadEvent(prepareForms);