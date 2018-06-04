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