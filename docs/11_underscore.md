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


### Arrays
underscore为Array提供了许多工具类方法，可以更方便快捷地操作Array。

* `first / last`
   顾名思义，这两个函数分别取第一个和最后一个元素：

    ```javascript
    var arr = [2, 4, 6, 8];
    _.first(arr); // 2
    _.last(arr); // 8
    ```

* `flatten`
  `flatten()` 接收一个Array，无论这个Array里面嵌套了多少个Array，`flatten()` 最后都把它们变成一个一维数组：

    ```javascript
    _.flatten([1, [2], [3, [[4], [5]]]]); // [1, 2, 3, 4, 5]
    ```

* `zip / unzip`
   * zip()把两个或多个数组的所有元素按索引对齐，然后按索引合并成新数组。
     例如，你有一个Array保存了名字，另一个Array保存了分数，现在，要把名字和分数给对上，用zip()轻松实现：

      ```javascript
      var names = ['Adam', 'Lisa', 'Bart'];
      var scores = [85, 92, 59];
      _.zip(names, scores);
      // [['Adam', 85], ['Lisa', 92], ['Bart', 59]]
      ```
      
   * unzip()则是反过来：

      ```javascript
      var namesAndScores = [['Adam', 85], ['Lisa', 92], ['Bart', 59]];
      _.unzip(namesAndScores);
      // [['Adam', 'Lisa', 'Bart'], [85, 92, 59]]
      ```



* `object`
   与其用zip()，为啥不把名字和分数直接对应成Object呢？别急，object()函数就是干这个的：

    ```javascript
    var names = ['Adam', 'Lisa', 'Bart'];
    var scores = [85, 92, 59];
    _.object(names, scores);
    // {Adam: 85, Lisa: 92, Bart: 59}
    ```

注意 `_.object()` 是一个函数，不是JavaScript的Object对象。


* `range`
  `range()` 让你快速生成一个序列，不再需要用for循环实现了：

    ```javascript
    // 从0开始小于10:
    _.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    // 从1开始小于11：
    _.range(1, 11); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    // 从0开始小于30，步长5:
    _.range(0, 30, 5); // [0, 5, 10, 15, 20, 25]
    
    // 从0开始大于-10，步长-1:
    _.range(0, -10, -1); // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
    ```
 
* `uniq`
   数组元素去重
   
    ```javascript
    // 请根据underscore官方文档，使用_.uniq对数组元素进行不区分大小写去重：
      var arr = ['Apple', 'orange', 'banana', 'ORANGE', 'apple', 'PEAR'];
    
      var result = _.uniq(arr, (x) => x.toLowerCase());
      console.log(result);  // (4) ["Apple", "orange", "banana", "PEAR"]
    ```  
     
* 更多完整的函数请参考underscore的文档：http://underscorejs.org/#arrays


### Functions

* `bind`
  `bind()` 可以帮我们把s对象直接绑定在 `fn()` 的 `this` 指针上，以后调用 `fn()` 就可以直接正常调用了：

    ```javascript
    'use strict';
    
    var s = ' Hello  ';
    var fn = _.bind(s.trim, s);
    fn();
    // 输出Hello
    ```

   结论：当用一个变量 `fn` 指向一个对象的方法时，直接调用 `fn()` 是不行的，因为丢失了this对象的引用。用bind可以修复这个问题。
   
* `partial`
  `partial()` 就是为一个函数创建偏函数
  创建偏函数的目的是将原函数的某些参数固定住，可以降低新函数调用的难度.
  
    ```javascript
    // 假设我们经常计算2ⁿ，每次都写Math.pow(2, n)就比较麻烦，
    // 如果创建一个新的函数能直接这样写pow2N(y)就好了，
    // 这个新函数pow2N(y)就是根据Math.pow(x, y)创建出来的偏函数，它固定住了原函数的第一个参数（始终为2）：
    
    var pow2N = _.partial(Math.pow, 2);
    pow2N(3); // 8
    pow2N(5); // 32
    pow2N(10); // 1024
    
    // 如果想固定第二个参数,如希望创建一个偏函数cube(x)，计算x³，可以用_作占位符，固定住第二个参数：
    
    var cube = _.partial(Math.pow, _, 3);
    cube(3); // 27
    cube(5); // 125
    cube(10); // 1000
    
    ```
    
* `memoize`
  用 `memoize()` 就可以自动缓存函数计算的结果
  
    ```javascript
    var factorial = _.memoize(function(n) {
        console.log('start calculate ' + n + '!...');
        var s = 1, i = n;
        while (i > 1) {
          s = s * i;
          i --;
        }
        console.log(n + '! = ' + s);
        return s;
      });
    
    // 第一次调用:
    factorial(10); // 3628800
    // 注意控制台输出:
    // start calculate 10!...
    // 10! = 3628800
    
    // 第二次调用:
    factorial(10); // 3628800
    // 控制台没有输出
    
    // 对于相同的调用，比如连续两次调用factorial(10)，第二次调用并没有计算，而是直接返回上次计算后缓存的结果。不过，当你计算factorial(9)的时候，仍然会重新计算
    ```

  改进 `factorial()`，让其递归调用：
  
    ```javascript
    var factorial = _.memoize(function(n) {
        console.log('start calculate ' + n + '!...');
        if (n < 2) {
            return 1;
        }
        return n * factorial(n - 1);
    });
    
    factorial(10); // 3628800
    // 输出结果说明factorial(1)~factorial(10)都已经缓存了:
    // start calculate 10!...
    // start calculate 9!...
    // start calculate 8!...
    // start calculate 7!...
    // start calculate 6!...
    // start calculate 5!...
    // start calculate 4!...
    // start calculate 3!...
    // start calculate 2!...
    // start calculate 1!...
    
    factorial(9); // 362880
    // console无输出
    ```


* `once`
  `once()` 保证某个函数执行且仅执行一次。保证函数仅调用一次，无论用户点击多少次
  
    ```javascript
    var register = _.once(function () {
        alert('Register ok!');
    });

    // 测试效果:
    register();
    register();
    register();   // 只弹出一次 “Register ok!”
    ```
  
* `delay`
  `delay()` 可以让一个函数延迟执行，效果和 `setTimeout()` 是一样的
  
    ```javascript
    var log = _.bind(console.log, console);
    _.delay(log, 2000, 'Hello,', 'world!');
    // 2秒后打印'Hello, world!':
    ```
    
* 更多完整的函数请参考underscore的文档：http://underscorejs.org/#functions

### Objects

* `keys / allKeys`
   * `keys()` 可以非常方便地返回一个object自身所有的key，但不包含从原型链继承下来的
   * `allKeys()` 除了object自身的key，还包含从原型链继承下来的：
   
      ```javascript
      function Student(name, age) {
          this.name = name;
          this.age = age;
      }
      Student.prototype.school = 'No.1 Middle School';
      var xiaoming = new Student('小明', 20);
      _.keys(xiaoming); // ['name', 'age']
      _.allKeys(xiaoming); // ['name', 'age', 'school']
      _.values(obj); // ['小明', 20]
      ```

* `values`
   * 和 `keys()` 类似，`values()` 返回object自身但不包含原型链继承的所有值
   * 没有 `allValues()`
   
* `mapObject`
  `mapObject()` 就是针对object的map版本：

    ```javascript
    var obj = { a: 1, b: 2, c: 3 };
    // 注意传入的函数签名，value在前，key在后:
    _.mapObject(obj, (v, k) => 100 + v); // { a: 101, b: 102, c: 103 }
    ```

* `invert`
  `invert()` 把object的每个key-value来个交换，key变成value，value变成key：

    ```javascript
    var obj = {
        Adam: 90,
        Lisa: 85,
        Bart: 59
    };
    _.invert(obj); // { '59': 'Bart', '85': 'Lisa', '90': 'Adam' }
    ```
    
* `extend / extendOwn`
   * `extend()` 把多个object的 `key-value` 合并到第一个object并返回：
     如果有相同的key，后面的object的value将覆盖前面的object的value。
   * `extendOwn()` 和 `extend()` 类似，但获取属性时忽略从原型链继承下来的属性。
   
      ```javascript
      var a = {name: 'Bob', age: 20};
      _.extend(a, {age: 15}, {age: 88, city: 'Beijing'}); // {name: 'Bob', age: 88, city: 'Beijing'}
      
      // 变量a的内容也改变了：
      a; // {name: 'Bob', age: 88, city: 'Beijing'}
      ```

* `clone`
   * `clone()` 把原有对象的所有属性都复制到新的对象中 

        ```javascript
        var source = {
            name: '小明',
            age: 20,
            skills: ['JavaScript', 'CSS', 'HTML']
        };
        var copied = _.clone(source);
        console.log(JSON.stringify(copied, null, '  '));
        
         // 输出结果如下
         {
           "name": "小明",
           "age": 20,
           "skills": [
             "JavaScript",
             "CSS",
             "HTML"
           ]
         }
        ``` 
  
   * 补充说明：
    `JSON.stringify(value[, replacer [, space]])` : 一个表示给定值的JSON字符串。
       - value
         将要序列化成 一个JSON 字符串的值。
       - replacer [可选]
         如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
         如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
         如果该参数为null或者未提供，则对象所有的属性都会被序列化；
       - space [可选]
         指定缩进用的空白字符串，用于美化输出（pretty-print）；
         如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；
         如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
         如果该参数没有提供（或者为null）将没有空格。

   * `clone()` 是“浅复制”。所谓“浅复制”就是说，两个对象相同的key所引用的value其实是同一对象
   
      ```javascript
      source.skills === copied.skills; // true
      // 也就是说，修改source.skills会影响copied.skills。
      ```

* `isEqual`
  `isEqual()` 对两个 `object、array` 进行深度比较，如果内容完全相同，则返回true：
  
```javascript
// 比较对象
var o1 = { name: 'Bob', skills: { Java: 90, JavaScript: 99 }};
var o2 = { name: 'Bob', skills: { JavaScript: 99, Java: 90 }};

o1 === o2; // false
_.isEqual(o1, o2); // true


// 比较数组
var a1 = ['Bob', { skills: ['Java', 'JavaScript'] }];
var a2 = ['Bob', { skills: ['Java', 'JavaScript'] }];

a1 === a2; // false
_.isEqual(a1, a2); // true
```

* 更多完整的函数请参考underscore的文档：http://underscorejs.org/#objects


### `Chain`
  链式调用：underscore提供了把对象包装成能进行链式调用的方法，就是 `chain()` 函数
  每一步返回的都是包装对象，所以最后一步的结果需要调用 `value()` 获得最终结果。
  
```javascript
var r = _.chain([1, 4, 9, 16, 25])
         .map(Math.sqrt)
         .filter(x => x % 2 === 1)
         .value();

console.log(r); // [1, 3, 5]
```