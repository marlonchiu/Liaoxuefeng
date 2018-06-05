# 廖雪峰的JavaScript教程

在线教程地址：[JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

## 操作DOM
* 查找DOM
   * `document.getElementById()`
   * `document.getElementsByTagName()`
   * `document.getElementsByClassName()`
   * `querySelector()`
   * `querySelectorAll()`
   * 低版本的IE<8不支持`querySelector` 和 `querySelectorAll`。IE8仅有限支持。
   
* 更新DOM
   在依据上述方法拿到一个DOM节点后，就可以对它进行更新。
   * 可以直接修改节点的文本，方法有两种：
      * 一种是修改 `innerHTML` 属性。不但可以改变DOM节点的文本内容，还可以改变节点的内部结构
      * 二种是修改 `innerText` 或 `textContent` 属性，这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签。
        两者的区别在于读取属性时，`innerText` 不返回隐藏元素的文本，而 `textContent` 返回所有文本。
        注意IE<9不支持textContent
      
   * 修改CSS也是经常需要的操作。
      * DOM节点的`style`属性对应所有的`CSS`，可以直接获取或设置。
      * 因为CSS允许`font-size`这样的名称，需要在JavaScript中改写为`驼峰式命名fontSize`

* 插入DOM
   * 对于空节点，可以使用 `innerHTML`,
   * `appendChild`，把一个子节点添加到父节点的最后一个子节点；
   * `insertBefore`，语法 `parentElement.insertBefore(newElement, referenceElement)`，子节点会插入到 `referenceElement`之前。

* 删除DOM
   * `removeChild` : 语法 `parentNode.removeChild(deleteNode)`;
   * 删除多个节点时，要注意 `children` 属性时刻都在变化;
   
    ```html
    <!-- HTML结构 -->
    <ul id="test-list">
        <li>JavaScript</li>
        <li>Swift</li>
        <li>HTML</li>
        <li>ANSI C</li>
        <li>CSS</li>
        <li>DirectX</li>
    </ul>
    
    //  把与Web开发技术不相关的节点删掉
    var parent = document.getElementById('test-list');
    for (var i = 1;i<4;i++){
        parent.removeChild(parent.children[i]);
    }
    
    // 上述思路比较巧妙，借助了删除节点导致元素的索引值也会因此产生变化
    ```
   
## 操作表单
* 获取值
   * 获得一个 `<input>`节点的引用，可直接调用value获得对应的用户输入值：`input.value`
      * 适用于 `text` 、 `password` 、 `hidden` 以及 `select`
      * 对于 `radio` 和 `checkbox`，`value`属性返回的永远是HTML预设的值，应该用checked判断：`xxx.checked`

* 设置值
   * 对于 `text` 、 `password` 、 `hidden` 以及 `select`，直接设置value就可以
   * 对于 `radio` 和 `checkbox`，设置 `checked` 为 `true或false` 即可
   
* HTML5控件
   * HTML5新增了大量标准控件，常用的包括`date` 、 `datetime` 、 `datetime-local` 、 `color`等，它们都使用`<input>`标签.

      ```html
      <input type="date" value="2015-07-01">
      <input type="datetime-local" value="2015-07-01T02:03:04">
      <input type="color" value="#ff0000">
      ```

   * 不支持HTML5的浏览器无法识别新的控件，会把它们当做 `type="text"` 来显示。支持HTML5的浏览器将获得格式化的字符串
      
* 提交表单
   * 方式一是通过 `<form>` 元素的 `submit()` 方法提交一个表单
   * 安全考虑，MD5加密

      ```html
      // 把用户输入的明文变为MD5:
      md5_pwd.value = toMD5(input_pwd.value);
      ```

* 操作文件
   * 在HTML表单中，可以上传文件的唯一控件就是 `<input type="file">` 。
   * 注意：当一个表单包含 `<input type="file">` 时，表单的 `enctype` 必须指定为 `multipart/form-data` ，`method` 必须指定为 `post` ，
   浏览器才能正确编码并以 `multipart/form-data` 格式发送表单的数据。
   * 出于安全考虑，浏览器只允许用户点击 `<input type="file">` 来选择本地文件，用JavaScript对 `<input type="file">` 的value赋值是没有任何效果的。
    当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径：
   
   * 通常，上传的文件都由后台服务器处理，JavaScript可以在提交表单时对文件扩展名做检查，以便防止用户上传无效格式的文件：
     
      ```javascript
      var f = document.getElementById('test-file-upload');
      var filename = f.value; // 'C:\fakepath\test.png'
      if (!filename || !(filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
         alert('Can only upload image file.');
         return false;
      }
      ```
### File API
* HTML5新增的File API允许JavaScript读取文件内容，获得更多的文件信息
* HTML5的File API提供了 `File` 和 `FileReader` 两个主要对象，可以获得文件信息并读取文件。

* 实例演示如何读取用户选取的图片文件，并在一个 `<div>` 中预览图像

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>fileAPI调用图片</title>
    <style>
      #test-image-preview {
        width: 500px;
        height: 350px;
        border: 1px #000000 solid;
      }
    </style>
  </head>
  <body>
  <div id="test-image-preview"></div>
  <input type="file" id="test-image-file">
  <div id="test-file-info"></div>
  
  <script type="text/javascript">
    var
      fileInput = document.getElementById('test-image-file'),
      info = document.getElementById('test-file-info'),
      preview = document.getElementById('test-image-preview');
  
    // 监听change事件:
    fileInput.addEventListener('change', function () {
  
      // 清除背景图片:
      preview.style.backgroundImage = '';
      // 检查文件是否选择:
      if (!fileInput.value) {
        info.innerHTML = '没有选择文件';
        return;
      }
  
      // 获取File引用:
      var file = fileInput.files[0];
      // 获取File信息:
      info.innerHTML = '文件: ' + file.name + '<br>' +
        '大小: ' + file.size + '<br>' +
        '修改: ' + file.lastModifiedDate;
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效的图片文件!');
        return;
      }
  
      // 读取文件:
      var reader = new FileReader();
      reader.onload = function(e) {
        
        var data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...' 
        preview.style.backgroundImage = 'url(' + data + ')';
      };
  
      // 以DataURL的形式读取文件:
      reader.readAsDataURL(file);
    });
  </script>
  </body>
  </html>
  ```
  
  显示效果：  
  ![TIM图片20180605111814.png](https://i.loli.net/2018/06/05/5b16014ad8098.png)
  
* 上述代码演示了如何通过HTML5的File API读取文件内容。
  以DataURL的形式读取到的文件是一个字符串，
  类似于 `data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...`，常用于设置图像。
  如果需要服务器端处理，把字符串 `base64` ,后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容。