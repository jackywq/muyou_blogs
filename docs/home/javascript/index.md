# JavaScript 系列面试题

## JS 数据类型

### JS 基本类型 (7 种)

```javascript
undefined、number、string、null、boolean、ES6新增Symbol、BigInt
```

### JS 引用类型 (5 种)

```
object、Array、function、RegExp、date
```

### 基本类型和引用类型的区别？

基本类型：存在栈内存里面

引用类型：存在堆内存里面

### 几种判断数据类型的方法

```
typeof、instanceof、Object.prototype.toString.call()
```

> 各自的优缺点

- typeof

  ```
  优点：能够快速区分基本数据类型
  缺点：不能将Object、Array和Null区分，都返回object
  ```

- instanceof

  ```
  优点：能够区分Array、Object和Function，适合用于判断自定义的类实例对象
  缺点：Number，Boolean，String基本数据类型不能判断
  ```

- Object.prototype.toString.call()

  ```
  优点：精准判断数据类型
  缺点：写法繁琐不容易记，推荐进行封装后使用
  ```

### 对象的深浅拷贝

> 深拷贝、浅拷贝的几种实现方式，简单介绍一下？

- 深拷贝

  ```
  1. JSON.parse(JSON.stringify()) // JSON序列化/反序列化
  2. 用递归去复制所有层级属性
  ```

- 浅拷贝

  ```
  Object.assign(target, ...sources)
  ```

---

## ES6 基础

### ES6 有哪些新特性

```
1. let/const
2. 字符串模板
3. 变量的结构赋值、数组，函数、对象的扩展
4. 箭头函数
5. Promise
6. module语法，export default
7. class的继承 extends
```

### var、let、const 区别？

| **区别**           | **var** | **let** | **const** |
| ------------------ | ------- | ------- | --------- |
| 是否有块级作用域   | ×       | ✔️      | ✔️        |
| 是否存在变量提升   | ✔️      | ×       | ×         |
| 是否添加全局属性   | ✔️      | ×       | ×         |
| 能否重复声明变量   | ✔️      | ×       | ×         |
| 是否存在暂时性死区 | ×       | ✔️      | ✔️        |
| 是否必须设置初始值 | ×       | ×       | ✔️        |
| 能否改变指针指向   | x       | ✔️      | ×         |

---

## JS 执行机制

### JS 为什么要设计成异步的？

首先 JS 是一门单线程语言，它是运行在浏览器的渲染主线程中，而渲染主线程只有一个；渲染主线程包含诸多工作，比如解析 HTML、CSS、执行 JS，以及页面绘制布局等等；

假如 JS 被设计成同步，当出现一些耗时任务，比如 setTimeout、网络请求等，就会造成渲染主线程阻塞，从而导致页面不能及时更新，造成页面卡死现象，影响用户体验；

JS 是异步，当出现 setTimeout、网络请求等耗时任务，会将这些任务放到其他线程上去处理，渲染主线程继续执行后续代码，当耗时任务执行完成后，将对应的回调函数包装成任务放在消息队列的末尾进行排序，等待渲染主线程的调度执行；

这样一来，渲染主线程就会永不堵塞，从而保证页面的流畅运行；

### 什么是闭包？

闭包的定义是一个外部函数 return 一个内部函数，内部函数可以使用外部函数的变量，形成一个私有化的作用域，保护变量不受外界干扰，还有一个能对变量进行缓存，在实际的应用场景中：比如防抖节流就是用到闭包这个特性。

### 问下 JS 的执行机制？

> js 是单线程、还是多线程？

```
单线程
```

**提问：** JS 为什么要被设计成单线程？

**答：** 如果是多线程会造成一些同步问题，如果对一个 DOM 同时操作，一个是删除，一个是修改，这样就会出问题

> js 的执行机制是什么？

---

## JS 核心概念

### 原型和原型链

- **原型：** 每个函数都有一个 prototype 属性，指向一个对象，这个对象就是原型对象
- **原型链：** 当访问一个对象的属性时，如果该对象本身没有这个属性，就会去它的原型对象中找，直到找到或到 null

### this 指向

- 普通函数调用：this 指向全局对象（浏览器中是 window）
- 对象方法调用：this 指向该对象
- 构造函数调用：this 指向新创建的实例
- 箭头函数：this 指向外层作用域（词法作用域）
- call/apply/bind：this 指向指定的对象

### 事件循环（Event Loop）

1. 同步代码在主线程执行栈中执行
2. 异步任务放入任务队列
3. 执行栈清空后，从任务队列中读取任务
4. 微任务先执行，再执行宏任务

### 防抖和节流

**防抖：** 事件触发后延迟 n 秒执行，如果在 n 秒内再次触发则重新计时

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
```

**节流：** 事件触发后 n 秒内只执行一次，避免频繁触发

```javascript
function throttle(fn, delay) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last > delay) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}
```

---

## JS 进阶

### 继承的实现方式

1. 原型链继承
2. 构造函数继承
3. 组合继承
4. 寄生组合继承
5. ES6 class extends

### 深浅拷贝

**浅拷贝：** 只复制对象的引用，新旧对象共享同一块内存

**深拷贝：** 完全复制对象及其所有嵌套对象，新旧对象互不影响

```javascript
// 深拷贝实现
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  let clone = new obj.constructor();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
```

### 函数柯里化

把接受多个参数的函数变换成接受一个单一参数的函数

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}
```
