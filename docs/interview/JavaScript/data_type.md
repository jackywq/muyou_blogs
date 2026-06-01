# JavaScript 数据类型

## JavaScript 有哪些数据类型？

JavaScript 分为 **基本类型** 和 **引用类型**：

### 基本类型（7种）
- `undefined`
- `null`
- `boolean`
- `number`
- `string`
- `symbol` (ES6)
- `bigint` (ES2020)

### 引用类型
- `Object`
- `Array`
- `Function`
- `Date`
- `RegExp`
- 等...

---

## `null` 和 `undefined` 的区别？

| 特性 | `null` | `undefined` |
|------|--------|-------------|
| 含义 | 表示"没有对象"，即该处不应该有值 | 表示"缺少值"，即该处应该有值，但还没有定义 |
| 类型 | `object` (历史遗留 bug) | `undefined` |
| 转数字 | `0` | `NaN` |

```javascript
typeof null;      // "object" (历史 bug)
typeof undefined; // "undefined"

Number(null);     // 0
Number(undefined);// NaN
```

---

## 如何判断数据类型？

### 方法 1: `typeof`
```javascript
typeof 1;           // "number"
typeof "hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof Symbol();    // "symbol"
typeof 1n;          // "bigint"
typeof {};          // "object"
typeof [];          // "object" (问题：无法区分数组)
typeof function(){};// "function"
typeof null;        // "object" (问题)
```

### 方法 2: `instanceof`
```javascript
[] instanceof Array;         // true
{} instanceof Object;        // true
function(){} instanceof Function; // true
```

### 方法 3: `Object.prototype.toString.call()` (最准确)
```javascript
Object.prototype.toString.call(1);           // "[object Number]"
Object.prototype.toString.call("hello");     // "[object String]"
Object.prototype.toString.call(true);        // "[object Boolean]"
Object.prototype.toString.call(undefined);   // "[object Undefined]"
Object.prototype.toString.call(null);        // "[object Null]"
Object.prototype.toString.call([]);          // "[object Array]"
Object.prototype.toString.call({});          // "[object Object]"
Object.prototype.toString.call(function(){});// "[object Function]"
```

### 方法 4: `Array.isArray()` (专门判断数组)
```javascript
Array.isArray([]);  // true
Array.isArray({});  // false
```

---

## 什么是堆和栈？

### 栈 (Stack)
- 存储**基本类型**的值
- 空间较小，由操作系统自动分配释放
- 存取速度快

### 堆 (Heap)
- 存储**引用类型**的值（实际数据）
- 空间较大，由开发者分配释放（或 GC 回收）
- 存取速度相对较慢

```javascript
let a = 10;     // a 存在栈中，值是 10
let b = a;      // b 存在栈中，复制 a 的值 10
b = 20;
console.log(a); // 10 (互不影响)

let obj1 = { x: 10 }; // obj1 引用存在栈中，指向堆中的对象
let obj2 = obj1;      // obj2 引用复制 obj1 的引用
obj2.x = 20;
console.log(obj1.x);  // 20 (都指向同一个堆对象)
```

---

## `==` 和 `===` 的区别？

| 运算符 | 说明 |
|--------|------|
| `==` | 抽象相等，会进行**类型转换**后再比较 |
| `===` | 严格相等，**不进行类型转换**，类型不同直接返回 false |

```javascript
// == 的例子
1 == "1";         // true (字符串转数字)
true == 1;        // true (布尔转数字)
null == undefined;// true (特殊规则)
0 == false;       // true
0 == "";          // true

// === 的例子
1 === "1";        // false (类型不同)
true === 1;       // false
null === undefined;// false
```

### 经典面试题
```javascript
[] == ![]; // true (![] 是 false，[] == false → 0 == 0)
[] === []; // false (不同对象引用)
{} === {}; // false (不同对象引用)
```
