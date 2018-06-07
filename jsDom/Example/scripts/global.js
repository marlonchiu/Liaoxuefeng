// 页面加载函数（参见第6章）
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

// 插入节点函数（参见第7章）
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

// addClass函数（参见第9章）
function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}

/*
* 高亮选中的页面
*   取得导航列表中的所有链接
*   循环遍历链接
*   如果发现了与当前URL匹配的链接，为其添加here类
* */
function highlightPage() {
  if(!document.getElementsByTagName) {
    return false;
  }
  if(!document.getElementById) {
    return false;
  }

  var headers = document.getElementsByTagName('header');
  if(headers.length == 0) {
    return false;
  }
  var navs = headers[0].getElementsByTagName("nav");
  if(navs.length == 0) {
    return false;
  }
  
  // 取得导航链接，循环遍历
  var links = navs[0].getElementsByTagName("a");
  var linkurl;
  var currenturl;
  for (var i = 0; i < links.length; i++) {

    // 比较当前链接的URL与当前页面的URL
    // 获取当前页面的URL   window.location.href
    // string.indexOf(substring) 返回字符串第一次出现的位置  如果没有则返回-1
    linkurl = links[i].getAttribute("href");
    currenturl = window.location.href;
    if(currenturl.indexOf(linkurl) != -1) {
      links[i].className = "here";

      // 为每个页面添加唯一的属性id
      var linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute("id", linktext);
    }
  }
}

addLoadEvent(highlightPage);