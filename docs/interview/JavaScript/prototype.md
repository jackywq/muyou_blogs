# 原型与继承

## 什么是原型链？

每个对象都有一个 `__proto__` 属性，指向它的原型对象。当访问一个对象的属性时，如果该对象没有这个属性，就会去它的原型对象中找，直到找到 `null` 为止，这就是原型链。

```javascript
function Person() {}
const person = new Person();

person.__proto__ === Person.prototype; // true
Person.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
```

---

## 2. `__proto__` 和 `prototype` 的区别？

| 特性 | `__proto__` | `prototype` |
|------|-------------|-------------|
| 所属 | 对象的属性 | 构造函数的属性 |
| 作用 | 指向该对象的原型 | 指向实例对象的原型对象 |
| 关系 | `实例.__proto__ === 构造函数.prototype` | - |

```javascript
function Foo() {}
const foo = new Foo();

foo.__proto__ === Foo.prototype; // true
Foo.prototype.constructor === Foo; // true
```

---

## 3. 如何实现继承？

### 方式 1: 原型链继承
```javascript
function Parent() {
  this.name = "Parent";
}
Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child() {}
Child.prototype = new Parent(); // 核心

const child = new Child();
child.sayName(); // "Parent"
```
**缺点**：引用类型属性会被所有实例共享。

### 方式 2: 构造函数继承
```javascript
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name); // 核心
}

const child = new Child("Child");
console.log(child.name); // "Child"
```
**优点**：可以传参，避免引用属性共享；**缺点**：无法继承原型方法。

### 方式 3: 组合继承（最常用）
```javascript
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 继承属性
  this.age = age;
}
Child.prototype = new Parent(); // 继承方法
Child.prototype.constructor = Child; // 修正构造函数

const child = new Child("Tom", 18);
child.sayName(); // "Tom"
```

### 方式 4: ES6 class 继承
```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 必须调用 super
    this.age = age;
  }
}

const child = new Child("Tom", 18);
child.sayName(); // "Tom"
```

---

## 4. `new` 操作符做了什么？

1. 创建一个空对象 `{}`
2. 将空对象的 `__proto__` 指向构造函数的 `prototype`
3. 执行构造函数，`this` 绑定到空对象
4. 如果构造函数返回对象，就返回该对象；否则返回创建的空对象

```javascript
// 模拟 new
function myNew(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, args);
  return typeof result === "object" ? result : obj;
}
```

---

## 5. `instanceof` 的原理？

`instanceof` 判断构造函数的 `prototype` 是否出现在对象的原型链上。

```javascript
// 模拟 instanceof
function myInstanceof(left, right) {
  let proto = left.__proto__;
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = proto.__proto__;
  }
}
```
