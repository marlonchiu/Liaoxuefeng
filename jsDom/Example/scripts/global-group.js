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
  
function insertAfter(newElement,targetElement) {  
    var parent = targetElement.parentNode;  
    if (parent.lastChild == targetElement) {  
        parent.appendChild(newElement);  
    } else {  
        parent.insertBefore(newElement,targetElement.nextSibling);  
    }     
}  
// 突出当前页面链接的显示，同时为几个超链接页面的body元素添加id属性，以支持为每个页面应用不同的样式  
function highlightPage(href) {  
    if (!document.getElementsByTagName) return false;  
    if (!document.getElementById) return false;  
    var headers = document.getElementsByTagName('header');  
    if (headers.length == 0) return false;  
    var navs = headers[0].getElementsByTagName('nav');  
    if (navs.length == 0) return false;  
    var links = navs[0].getElementsByTagName("a");  
    var linkurl;  
    for (var i=0; i<links.length; i++) {  
        linkurl = links[i].getAttribute("href");  
        // 将超链接的url和页面当前的url进行比较，以判定这个超链接是否属于当前页面  
        if (window.location.href.indexOf(linkurl) != -1) {            
            links[i].className = "here";  
            var linktext = links[i].lastChild.nodeValue.toLowerCase();  
            document.body.setAttribute("id",linktext);  
        }  
    }  
}  
addLoadEvent(highlightPage);  
  
function moveElement(elementID,final_x,final_y,interval) {  
    if (!document.getElementById) return false;  
    if (!document.getElementById(elementID)) return false;  
    var elem = document.getElementById(elementID);  
    //在移动位置前先判断下元素的movement属性是否存在有效值，是则代表正在移动中  
    if (elem.movement) {  
        clearTimeout(elem.movement);  
    }  
    //判断下emem元素是否设置了元素位置的初始值，没有的话则主动指定一个  
    if (!elem.style.left) {  
        elem.style.left = "0px";  
    }  
    if (!elem.style.top) {  
        elem.style.top = "0px";  
    }  
    //因为接下来要基于位置进行计算，所以需要先转换为整数  
    var xpos = parseInt(elem.style.left);  
    var ypos = parseInt(elem.style.top);  
    var dist = 0;  
    //如果已经移动到目标位置，则退出并返回true  
    if (xpos == final_x && ypos == final_y) {  
        return true;  
    }  
    if (xpos < final_x) {  
        dist = Math.ceil((final_x - xpos)/10);  
        xpos = xpos + dist;  
    }  
    if (xpos > final_x) {  
        dist = Math.ceil((xpos - final_x)/10);  
        xpos = xpos - dist;  
    }  
    if (ypos < final_y) {  
        dist = Math.ceil((final_y - ypos)/10);  
        ypos = ypos + dist;  
    }  
    if (ypos > final_y) {  
        dist = Math.ceil((ypos - final_y)/10);  
        ypos = ypos - dist;  
    }  
    //设置elem元素的  
    elem.style.left = xpos + "px";  
    elem.style.top = ypos + "px";  
    //迭代调用函数自身，一直循环到满足函数开头的退出条件为止  
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";  
    elem.movement = setTimeout(repeat,interval);  
}  
  
function prepareSlideshow() {  
    // 实现幻灯片功能  
    if (!document.getElementsByTagName) return false;  
    if (!document.getElementById) return false;  
    if (!document.getElementById("intro")) return false;  
    var intro = document.getElementById("intro");   
    var slideshow = document.createElement("div");  
    slideshow.setAttribute("id","slideshow");  
    var frame = document.createElement("img");  
    frame.setAttribute("src","images/frame.gif");  
    frame.setAttribute("alt","");  
    frame.setAttribute("id","frame");  
    slideshow.appendChild(frame);  
    var preview = document.createElement("img");  
    preview.setAttribute("src","images/slideshow.gif");  
    preview.setAttribute("alt","a glimpse of what awaits you");  
    preview.setAttribute("id","preview");  
    slideshow.appendChild(preview);  
    insertAfter(slideshow,intro);  
    var links = document.getElementsByTagName("a");  
    var destination;  
    for (var i=0; i<links.length; i++) {  
        links[i].onmouseover = function() {  
            destination = this.getAttribute("href");  
            if (destination.indexOf("index.html") != -1) {  
                moveElement("preview",0,0,5);  
            }  
            if (destination.indexOf("about.html") != -1) {  
                moveElement("preview",-150,0,5);  
            }  
            if (destination.indexOf("photos.html") != -1) {  
                moveElement("preview",-300,0,5);  
            }  
            if (destination.indexOf("live.html") != -1) {  
                moveElement("preview",-450,0,5);  
            }  
            if (destination.indexOf("contact.html") != -1) {  
                moveElement("preview",-600,0,5);  
            }  
        }  
    }  
}  
addLoadEvent(prepareSlideshow);  
  
function showSection(id) {  
    // 根据指定id显示相应的section  
  var sections = document.getElementsByTagName("section");  
  for (var i=0; i<sections.length; i++ ) {  
    if (sections[i].getAttribute("id") != id) {  
      sections[i].style.display = "none";  
    } else {  
      sections[i].style.display = "block";  
    }  
  }  
}  
function prepareInternalnav() {  
    // 在article元素中的nav所包含的链接被单击时调用showSection函数  
  if (!document.getElementsByTagName) return false;  
  if (!document.getElementById) return false;  
  var articles = document.getElementsByTagName("article");  
  if (articles.length == 0) return false;  
  var navs = articles[0].getElementsByTagName("nav");  
  if (navs.length == 0) return false;  
  var nav = navs[0];  
  var links = nav.getElementsByTagName("a");  
  for (var i=0; i<links.length; i++ ) {  
    var sectionId = links[i].getAttribute("href").split("#")[1];  
    if (!document.getElementById(sectionId)) continue;  
    document.getElementById(sectionId).style.display = "none";  
    links[i].destination = sectionId;  
    links[i].onclick = function() {  
      showSection(this.destination);  
      return false;  
    }  
  }  
}  
addLoadEvent(prepareInternalnav);  
  
function showPic(whichpic) {  
  if (!document.getElementById("placeholder")) return true;  
  var source = whichpic.getAttribute("href");  
  var placeholder = document.getElementById("placeholder");  
  placeholder.setAttribute("src",source);  
  if (!document.getElementById("description")) return false;  
  if (whichpic.getAttribute("title")) {  
    var text = whichpic.getAttribute("title");  
  } else {  
    var text = "";  
  }  
  var description = document.getElementById("description");  
  if (description.firstChild.nodeType == 3) {  
    description.firstChild.nodeValue = text;  
  }  
  return false;  
}  
  
function preparePlaceholder() {  
  if (!document.createElement) return false;  
  if (!document.createTextNode) return false;  
  if (!document.getElementById) return false;  
  if (!document.getElementById("imagegallery")) return false;  
  var placeholder = document.createElement("img");  
  placeholder.setAttribute("id","placeholder");  
  placeholder.setAttribute("src","images/placeholder.gif");  
  placeholder.setAttribute("alt","my image gallery");  
  var description = document.createElement("p");  
  description.setAttribute("id","description");  
  var desctext = document.createTextNode("Choose an image");  
  description.appendChild(desctext);  
  var gallery = document.getElementById("imagegallery");  
  insertAfter(description,gallery);  
  insertAfter(placeholder,description);  
}  
  
function prepareGallery() {  
  if (!document.getElementsByTagName) return false;  
  if (!document.getElementById) return false;  
  if (!document.getElementById("imagegallery")) return false;  
  var gallery = document.getElementById("imagegallery");  
  var links = gallery.getElementsByTagName("a");  
  for ( var i=0; i < links.length; i++) {  
    links[i].onclick = function() {  
      return showPic(this);  
    }  
  }  
}  
  
addLoadEvent(preparePlaceholder);  
addLoadEvent(prepareGallery);  
  
function stripeTables() {  
  if (!document.getElementsByTagName) return false;  
  var tables = document.getElementsByTagName("table");  
  for (var i=0; i<tables.length; i++) {  
    var odd = false;  
    var rows = tables[i].getElementsByTagName("tr");  
    for (var j=0; j<rows.length; j++) {  
      if (odd == true) {  
        addClass(rows[j],"odd");  
        odd = false;  
      } else {  
        odd = true;  
      }  
    }  
  }  
}  
  
function highlightRows() {  
  if(!document.getElementsByTagName) return false;  
  var rows = document.getElementsByTagName("tr");  
  for (var i=0; i<rows.length; i++) {  
    rows[i].oldClassName = rows[i].className  
    rows[i].onmouseover = function() {  
      addClass(this,"highlight");  
    }  
    rows[i].onmouseout = function() {  
      this.className = this.oldClassName  
    }  
  }  
}  
  
function displayAbbreviations() {  
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;  
  var abbreviations = document.getElementsByTagName("abbr");  
  if (abbreviations.length < 1) return false;  
  var defs = new Array();  
  for (var i=0; i<abbreviations.length; i++) {  
    var current_abbr = abbreviations[i];  
    if (current_abbr.childNodes.length < 1) continue;  
    var definition = current_abbr.getAttribute("title");  
    var key = current_abbr.lastChild.nodeValue;  
    defs[key] = definition;  
  }  
  var dlist = document.createElement("dl");  
  for (key in defs) {  
    var definition = defs[key];  
    var dtitle = document.createElement("dt");  
    var dtitle_text = document.createTextNode(key);  
    dtitle.appendChild(dtitle_text);  
    var ddesc = document.createElement("dd");  
    var ddesc_text = document.createTextNode(definition);  
    ddesc.appendChild(ddesc_text);  
    dlist.appendChild(dtitle);  
    dlist.appendChild(ddesc);  
  }  
  if (dlist.childNodes.length < 1) return false;  
  var header = document.createElement("h3");  
  var header_text = document.createTextNode("Abbreviations");  
  header.appendChild(header_text);  
  var container = document.getElementById("content");  
  container.appendChild(header);  
  container.appendChild(dlist);  
}  
  
addLoadEvent(stripeTables);  
addLoadEvent(highlightRows);  
addLoadEvent(displayAbbreviations);  
  
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
  
function resetFields(whichform) {  
  for (var i=0; i<whichform.elements.length; i++) {  
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
  
function prepareForms() {  
  for (var i=0; i<document.forms.length; i++) {  
    var thisform = document.forms[i];  
    resetFields(thisform);  
    thisform.onsubmit = function() {  
        if (!validateForm(this)) return false;  
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
    while (element.hasChildNodes()) {  
        element.removeChild(element.lastChild);  
    }  
    var content = document.createElement("img");  
    content.setAttribute("src","images/loading.gif");  
    content.setAttribute("alt","Loading...");  
    element.appendChild(content);  
}  
  
function submitFormWithAjax(whichform,thetarget) {  
    // 调用displayAjaxLoading函数，删除目标元素的子元素，并添加loading.gif图像  
    // 把表单的值组织成URL编码的字符串，以便通过Ajax请求发送  
    // 创建方法为POST的Ajax请求，把表单的值发送给submit.html  
    // 如果请求成功，解析响应并在目标元素中显示结果  
    // 如果请求失败，显示错误消息  
    var request = getHTTPObject();  
    if (!request) { return false; }  
    displayAjaxLoading(thetarget);  
    var dataParts = [];  
    var element;  
    for (var i=0; i<whichform.elements.length; i++) {  
        element = whichform.elements[i];  
        // 将表单元素拼成URL中传递的信息，同时对表单元素的值进行了适用于URL的转码  
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);  
    }  
    // 将数组内容拼接起来  
    var data = dataParts.join('&');  
    // 发起异步POST方式的访问  
    request.open('POST', whichform.getAttribute("action"), true);  
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
    request.onreadystatechange = function() {  
        // 当访问请求处理完成，接收响应也完成后  
        if (request.readyState == 4) {  
            if (request.status == 200 || request.status == 0) {  
                // 注意下面正则中使用了捕获组的定义  
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