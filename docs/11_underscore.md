# 廖雪峰的JavaScript教程

在线教程地址：[JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

## underscore
相较于jQuery统一了不同浏览器之间的DOM操作的差异，让我们可以简单地对DOM进行操作，
`underscore` 则提供了一套完善的函数式编程的接口，让我们更方便地在JavaScript中实现函数式编程。

jQuery在加载时，会把自身绑定到唯一的全局变量 `$` 上；
underscore与其类似，会把自身绑定到唯一的全局变量 `_`上，这也是为啥它的名字叫underscore的原因。

```javascript
// 需要提前引入 underscore.js

'use strict';
_.map([1, 2, 3], (x) => x * x); // [1, 4, 9]

_.map({ a: 1, b: 2, c: 3 }, (v, k) => k + '=' + v); // ['a=1', 'b=2', 'c=3']
```

### Collections
underscore为集合类对象提供了一致的接口。集合类是指Array和Object，暂不支持Map和Set。

* `map / filter`
  和 `Array` 的 `map()` 与 `filter()` 类似，但是 underscore 的 `map()` 和 `filter()` 可以作用于Object。
  当作用于Object时，传入的函数为 `function (value, key)` ，第一个参数接收 `value` ，第二个参数接收 `key` ：
      
    ```javascript
    var obj = {
        name: 'bob',
        school: 'No.1 middle school',
        address: 'xueyuan road'
    };
    
    var upper = _.map(obj, function (value, key) {
        return value.toUpperCase();
    });
    console.log(JSON.stringify(upper));  // ["BOB","NO.1 MIDDLE SCHOOL","XUEYUAN ROAD"]
    
    var upper2 = _.mapObject(obj, function (value, key) {
        return value.toUpperCase();
    });
    console.log(JSON.stringify(upper2)); // {"name":"BOB","school":"NO.1 MIDDLE SCHOOL","address":"XUEYUAN ROAD"}
    ```

* `every / some`
当集合的所有元素都满足条件时， `_.every()` 函数返回true;
当集合的至少一个元素满足条件时， `_.some()` 函数返回true。

    ```javascript
    // 所有元素都大于0？
    _.every([1, 4, 7, -3, -9], (x) => x > 0); // false
    // 至少一个元素大于0？
    _.some([1, 4, 7, -3, -9], (x) => x > 0); // true
    ```
    
* `max / min`
  直接返回集合中最大和最小的数：

    ```javascript
    'use strict';
    var arr = [3, 5, 7, 9];
    _.max(arr); // 9
    _.min(arr); // 3
    
    // 空集合会返回-Infinity和Infinity，所以要先判断集合不为空：
    _.max([])
    -Infinity
    _.min([])
    Infinity
    ```
   如果集合是Object，`max()` 和 `min()` 只作用于 `value` ，忽略掉 `key` ：

    ```javascript
    _.max({ a: 1, b: 2, c: 3 }); // 3
    ```

* `groupBy`
  `groupBy()` 把集合的元素按照 `key` 归类，`key` 由传入的函数返回.常用来进行分组
  
  ```javascript
  var scores = [20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99];
  var groups = _.groupBy(scores, function (x) {
      if (x < 60) {
          return 'C';
      } else if (x < 80) {
          return 'B';
      } else {
          return 'A';
      }
  });
  // 结果:
  // {
  //   A: [81, 91, 88, 99],
  //   B: [75, 77, 66, 72],
  //   C: [20, 40, 59]
  // }
  ```


* `shuffle / sample`
   * `shuffle()` 用洗牌算法随机打乱一个集合：

      ```javascript
      // 注意每次结果都不一样：
      _.shuffle([1, 2, 3, 4, 5, 6]); // [3, 5, 4, 6, 2, 1]
      ```

   * `sample()` 则是随机选择一个或多个元素：

      ```javascript
      // 注意每次结果都不一样：
      // 随机选1个：
      _.sample([1, 2, 3, 4, 5, 6]); // 2
      // 随机选3个：
      _.sample([1, 2, 3, 4, 5, 6], 3); // [6, 1, 4]
      ```

* 更多完整的函数请参考underscore的文档：http://underscorejs.org/#collections