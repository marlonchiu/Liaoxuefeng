JavaScript DOM编程艺术(中文第2版)一书中的综合实例练习

为一个乐队建立网站
* [网站](https://domscripting.com/domsters/index.html)
* [创建一个网站需要的注意点](https://blog.csdn.net/qq_38409944/article/details/79323660)
* [JavaScript DOM 编程艺术一书综合示例](https://blog.csdn.net/watermelonbig/article/details/78768905)

按照课本的教材复原了代码但是效果不出来的啊，尤其是contact页面
* 使用placeholder， 文本获取焦点失去焦点
* 发送ajax请求的逻辑

scripts中的功能函数：
* addLoadEvent(func)，设置随浏览器自动加载指定函数
* addClass(element,value)，添加新的样式类
* insertAfter(newElement,targetElement)，在指定元素后插入新元素
* highlightPage(href)，突出当前页面链接的显示，同时为几个超链接页面的body元素添加id属性，以支持为每个页面应用不同的样式
* moveElement(elementID,final_x,final_y,interval)，实现js动画效果的函数
* prepareSlideshow()，准备幻灯片元素并准备相应链接
* showSection(id)，根据指定的id显示相应的<section>，同时隐藏其它部分
* prepareInternalnav()，在article元素中的nav所包含的链接被单击时调用showSection函数
* showPic(whichpic)，在占位符位置上显示相应链接的图片
* preparePlaceholder()，创建和配置图片占位符
* prepareGallery()，创建和配置图片库
* stripeTables()，为表格增加斑马纹
* highlightRows()，高亮当前选择的行
* displayAbbreviations()，将缩略语显示为一个列表
* focusLabels()，点击label时自动将焦点定位到相应的表单元素上
* resetFields(whichform)，重置表单元素初始值
* validateForm(whichform)，表单元素检验函数
* isFilled(field)，检验表单元素是否填写
* isEmail(field)，检查是否是有效的邮件信息
* prepareForms()，设置和处理表单
* getHTTPObject()，获取一个XMLHttpRequest对象
* displayAjaxLoading(element)，显示一个正在加载的图片
* submitFormWithAjax(whichform,thetarget)，
  调用displayAjaxLoading函数，删除目标元素的子元素，并添加loading.gif图像；
  把表单的值组织成URL编码的字符串，以便通过Ajax请求发送；
  创建方法为POST的Ajax请求，把表单的值发送给submit.html； 
  如果请求成功，解析响应并在目标元素中显示结果； 
  如果请求失败，显示错误消息。
  
  
其他
* 在使用HTML5元素时，建议在文档的<head>元素中包含Modernizer库，用来对浏览器是否支持H5标签进行检验
* 取得当前页面的URL，可以使用 `window.location.href` 。
* HTML DOM中的每个表单元素都是一个form对象，
每个form对象都有一个form.elements.length属性，需要注意的是这个属性返回的是表单中包含的表单元素的个数（不等同的所包含的节点个数）。
element.value可得到表单元素的当前值。
* 在通过POST请求发送数据时，需要将表单中每个字段的值都编码为数据字符串（name=value&name2=value2），
是使用javascript的encodeURIComponent函数把这些值编码成URL安全的字符串。这会把有歧义的字符转换为对应的ASCII编码。
* `var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);`  正则中使用了捕获组的定义。
匹配结果是一个数组，第一个数组元素是与整个模式完整匹配的部分；
匹配结果数组的第二个元素（索引为1），是responseText中与捕获组中的模式匹配的部分； 
因为本例中只定义了一个捕获组，所以matches也只包含两个元素。