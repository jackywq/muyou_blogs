# ES6 系列面试题

## let 和 const

### let/const 的特点

- **块级作用域**：只在声明所在的块级作用域内有效
- **不存在变量提升**：声明前访问会报错
- **暂时性死区**：声明前的区域无法访问变量
- **不允许重复声明**：同一作用域内不能重复声明同一变量

### var 和 let/const 的区别

| 特性       | var        | let        | const      |
| ---------- | ---------- | ---------- | ---------- |
| 作用域     | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升   | 有         | 无         | 无         |
| 重复声明   | 可以       | 不可以     | 不可以     |
| 重新赋值   | 可以       | 可以       | 不可以     |
| 暂时性死区 | 无         | 有         | 有         |

---

## 变量解构赋值

### 数组解构

```javascript
const [a, b, c] = [1, 2, 3];
// a=1, b=2, c=3

const [, , third] = [1, 2, 3];
// third=3

const [head, ...tail] = [1, 2, 3, 4];
// head=1, tail=[2,3,4]
```

### 对象解构

```javascript
const { name, age } = { name: '张三', age: 18 };
// name='张三', age=18

const { name: myName } = { name: '张三' };
// myName='张三'

const { x = 10 } = { x: undefined };
// x=10
```

### 函数参数解构

```javascript
function add([a, b]) {
  return a + b;
}
add([1, 2]); // 3

function fn({ x, y = 0 }) {
  return x + y;
}
fn({ x: 1 }); // 1
```

---

## 箭头函数

### 箭头函数特点

```javascript
const sum = (a, b) => a + b;

const fn = (x) => x * x; // 单个参数可以省略括号

const obj = {
  name: '张三',
  sayHi() {
    setTimeout(() => {
      console.log(this.name); // this指向obj
    }, 1000);
  },
};
```

### 箭头函数和普通函数的区别

1. **this 指向**：箭头函数的 this 是继承外层作用域，普通函数 this 指向调用者
2. **arguments**：箭头函数没有 arguments 对象
3. **new**：箭头函数不能作为构造函数使用
4. **prototype**：箭头函数没有 prototype 属性
5. **yield**：箭头函数不能用作 Generator 函数

---

## 模板字符串

### 基本用法

```javascript
const name = '张三';
const age = 18;
const str = `我叫${name}，今年${age}岁`;
```

### 多行字符串

```javascript
const str = `
  第一行
  第二行
  第三行
`;
```

### 标签模板

```javascript
function tag(strings, ...values) {
  console.log(strings); // ['我叫', '，今年', '岁']
  console.log(values); // ['张三', 18]
}
tag`我叫${'张三'}，今年${18}岁`;
```

---

## 函数扩展

### 参数默认值

```javascript
function fn(x = 0, y = 0) {
  return x + y;
}
fn(); // 0
fn(1); // 1
fn(1, 2); // 3
```

### rest 参数

```javascript
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6
```

### 扩展运算符

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr = [...arr1, ...arr2]; // [1,2,3,4,5,6]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj = { ...obj1, ...obj2 }; // {a:1,b:2,c:3,d:4}
```

---

## 数组扩展

### Array.from

```javascript
Array.from('hello'); // ['h','e','l','l','o']
Array.from([1, 2, 3], (x) => x * x); // [1,4,9]
```

### Array.of

```javascript
Array.of(1, 2, 3); // [1,2,3]
Array.of(undefined); // [undefined]
```

### 数组方法

- **find**：找出第一个符合条件的元素
- **findIndex**：找出第一个符合条件的元素的索引
- **includes**：判断数组是否包含某个值
- **flat**：数组扁平化
- **flatMap**：先映射再扁平化

```javascript
[1, 2, 3, 4].find((n) => n > 2); // 3
[1, 2, 3, 4].findIndex((n) => n > 2); // 2
[1, 2, 3].includes(2); // true
[1, [2, [3, 4]]].flat(2); // [1,2,3,4]
[1, 2, 3].flatMap((x) => [x, x * 2]); // [1,2,2,4,3,6]
```

---

## 对象扩展

### 属性简写

```javascript
const name = '张三';
const obj = { name }; // {name: '张三'}
```

### 方法简写

```javascript
const obj = {
  sayHi() {
    console.log('hi');
  },
};
```

### 计算属性名

```javascript
const key = 'name';
const obj = {
  [key]: '张三',
};
// {name: '张三'}
```

### 对象方法

- **Object.assign**：对象合并
- **Object.keys**：获取所有键
- **Object.values**：获取所有值
- **Object.entries**：获取键值对数组

```javascript
Object.assign({ a: 1 }, { b: 2 }); // {a:1,b:2}
Object.keys({ a: 1, b: 2 }); // ['a','b']
Object.values({ a: 1, b: 2 }); // [1,2]
Object.entries({ a: 1, b: 2 }); // [['a',1],['b',2]]
```

---

## Symbol

### 基本用法

```javascript
const s1 = Symbol();
const s2 = Symbol('foo');
const s3 = Symbol('foo');
s2 === s3; // false
```

### Symbol.for 和 Symbol.keyFor

```javascript
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');
s1 === s2; // true

Symbol.keyFor(s1); // 'foo'
```

---

## Set 和 Map

### Set

```javascript
const set = new Set([1, 2, 3, 3]);
set.size; // 3
set.has(2); // true
set.add(4);
set.delete(1);
set.forEach((value) => console.log(value));
```

### Map

```javascript
const map = new Map();
map.set('name', '张三');
map.get('name'); // '张三'
map.has('name'); // true
map.delete('name');
map.size; // 0
map.forEach((value, key) => console.log(key, value));
```

---

## Promise

### 基本用法

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

promise.then((value) => console.log(value));
```

### Promise.all

```javascript
Promise.all([promise1, promise2, promise3]).then((values) => console.log(values));
```

### Promise.race

```javascript
Promise.race([promise1, promise2, promise3]).then((value) => console.log(value));
```

### Promise.allSettled

```javascript
Promise.allSettled([promise1, promise2]).then((results) => console.log(results));
```

---

## async/await

### 基本用法

```javascript
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

---

## Class

### 基本用法

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const person = new Person('张三');
person.sayHi();
```

### 继承

```javascript
class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is studying`);
  }
}
```

### 静态方法

```javascript
class Person {
  static sayHello() {
    console.log('Hello');
  }
}
Person.sayHello();
```

---

## Module

### export

```javascript
// 逐个导出
export const name = '张三';
export function sayHi() {}

// 统一导出
const name = '张三';
function sayHi() {}
export { name, sayHi };

// 默认导出
export default function () {}
```

### import

```javascript
// 命名导入
import { name, sayHi } from './module';

// 重命名导入
import { name as myName } from './module';

// 默认导入
import myModule from './module';

// 整体导入
import * as module from './module';
```
