## 开发选择库的几点考虑
* 是否具备所需要的功能？
* 库的功能是否比你想要的还多？
* 库是否是模块化的？
* 库的支持情况如何？（是否有活跃的维护社区）
* 有文档吗？（这里特指官方文档）
* 该库的许可合适吗？?

## 有代表性的库
* jQuery
* Dojo Toolkit
  节省时间、性能优异，开发工程收放自如
* MooTools

## 名词
内容分发网络 （CDN, Content Delevery Network）

## jQuery的一些常用语法
### CSS选择器
* `$('#id')`
* `$('.className')`
* `$('tag')`
* `$('*')`
* `$('tagA tagB')`  tagA后代的所有tagB元素
* `$('tagA,tagB,tagC')`  所有的tagA元素,tagB元素和tagC元素
* `$('tag#id')` ID为id且标签为tag的元素
* `$('tag.className')` 类名为className且标签为tag的元素

### 属性选择器
* `$('tag[attr]')`  
  选择所有带有attr属性的tag元素
* `$('tag[attr=value]')`  
  选择所有attr属性值恰好等于value的tag元素
* `$('tag[attr*=value]')`
  选择所有attr属性值包含字符串value的tag元素
* `$('tag[attr~=value]')`
  选择所有attr属性值为空格分隔的多个字符串且其中一个字符串等于value的tag元素
* `$('tag[attr^=value]')`
  选择所有attr属性值以value开头的tag元素
* `$('tag[attr$=value]')`
  选择所有attr属性值以value结尾的tag元素
* `$('tag[attr|=value]')`
  选择所有attr属性值为字符串分隔的字符串且该字符串以value开头的tag元素
* `$('tag[attr!=value]')`
  选择所有attr属性值不等于value的tag元素

### 子选择器或同辈选择器
* `$('tagA > tagB')`
  选择作为tagA元素子元素的所有tagB元素
* `$('tagA + tagB')`
  选择紧邻tagA元素且位于其后的tagB元素
* `$('tagA ~ tagB')`
  选择作为tagA同辈元素且位于其后的所有tagB元素

### 伪类和伪元素选择器
* `$('tag:toot')`
  选择作为文档根元素的tag元素
* `$('tag:nth-child(n)')`
  选择作为其父元素正数第n个子元素的所有tag元素
* `$('tag:nth-last-child(n)')`
  选择作为其父元素倒数第n个子元素的所有tag元素
* `$('tag:nth-of-type(n)')`
  选择几个同辈tag元素中的正数第n个
* `$('tag:nth-last-of-type(n)')`
  选择几个同辈tag元素中的倒数第n个
* `$('tag:first-child(n)')`
  选择作为其父元素第一个子元素的tag元素
* `$('tag:last-child(n)')`
  选择作为其父元素最后一个子元素的tag元素
* `$('tag:first-of-type')`
  选择几个同辈tag元素中的第一个
* `$('tag:last-of-type')`
  选择几个同辈tag元素中的最后一个
* `$('tag:only-child')`
  选择作为其父元素唯一子元素的tag元素
* `$('tag:only-of-type')`
  选择同辈元素中唯一一个标签为tag的元素
* `$('tag:empty')`
  选择所有没有子元素的tag元素
* `$('tag:enabled')`
  选择界面元素中所有已经启用的tag元素
* `$('tag:disabled')`
  选择界面元素中所有已经禁用的tag元素
* `$('tag:checked')`
  选择界面元素中所有已经被选中的tag元素
* `$('tag:not(s)')`
  选择与选择器s不匹配的所有tag元素
  
### 专有选择器
* `$('tag:even')`
  选择匹配元素集中的偶数个元素
* `$('tag:odd')`
  选择匹配元素集中的奇数个元素
* `$('tag:eq(0)')` 和 `$('tag:nth(0)')`
  选择匹配元素集中的第n个元素
* `$('tag:gt(n)')`
  选择匹配元素集中索引值大于n的所有元素
* `$('tag:lt(n)')`
  选择匹配元素集中索引值小于n的所有元素
* `$('tag:first)`
  选择匹配元素集中的第一个元素
* `$('tag:last)`
  选择匹配元素集中的最后一个元素
* `$('tag:parent)`
  选择匹配元素集中包含子元素（文本节点也算）的所有元素
* `$('tag:contains('test'))`
  选择匹配元素集中包含指定文本的所有元素
* `$('tag:visible)`
  选择匹配元素集中所有可见的元素
* `$('tag:hidden)`
  选择匹配元素集中所有隐藏的元素
  
### 表单元素选择器
* `:input`
  选择表单中的所有元素（input、select、textarea、button）
* `:text`
  选择所有文本字段（type='text'）
* `:password`
  选择所有密码字段（type='password'）
* `:radio`
  选择所有单选按钮（type='radio'）
* `:checkbox`
  选择所有复选框（type='checkbox'）
* `:submit`
  选择所有提交按钮（type='submit'）
* `:image`
  选择所有表单图像（type='image'）
* `:reset`
  选择所有重置按钮（type='reset'）
* `:button`
  选择所有其他按钮（type='button'）
