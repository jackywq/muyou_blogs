# 设计模式系列面试题

## 设计模式概述

### 什么是设计模式

设计模式是软件设计中常见问题的通用解决方案，是经过验证的最佳实践。

### 设计模式分类

1. **创建型模式**：对象创建机制
2. **结构型模式**：对象组合方式
3. **行为型模式**：对象间通信

---

## 创建型模式

### 单例模式

确保一个类只有一个实例，并提供全局访问点。

```javascript
class Singleton {
  static instance;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

// 使用
const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // true
```

### 工厂模式

定义一个创建对象的接口，但由子类决定要实例化的类。

```javascript
// 简单工厂
class Factory {
  createProduct(type) {
    switch (type) {
      case 'A':
        return new ProductA();
      case 'B':
        return new ProductB();
    }
  }
}
```

### 原型模式

通过复制现有对象来创建新对象。

```javascript
class Prototype {
  clone() {
    return Object.create(this);
  }
}
```

---

## 结构型模式

### 装饰器模式

动态地给对象添加职责，比继承更灵活。

```javascript
class Coffee {
  cost() {
    return 10;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 2;
  }
}

const coffee = new MilkDecorator(new Coffee());
```

### 适配器模式

将一个类的接口转换成客户希望的另一个接口。

```javascript
class Adaptee {
  specificRequest() {
    return 'Adaptee request';
  }
}

class Adapter {
  constructor() {
    this.adaptee = new Adaptee();
  }

  request() {
    return this.adaptee.specificRequest();
  }
}
```

### 代理模式

为其他对象提供一种代理以控制对这个对象的访问。

```javascript
class RealSubject {
  request() {
    console.log('RealSubject');
  }
}

class Proxy {
  constructor() {
    this.realSubject = new RealSubject();
  }

  request() {
    console.log('Proxy before');
    this.realSubject.request();
    console.log('Proxy after');
  }
}
```

---

## 行为型模式

### 观察者模式

定义对象间的一对多依赖关系。

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('Received:', data);
  }
}
```

### 策略模式

定义一系列算法，把它们一个个封装起来，并且使它们可相互替换。

```javascript
class Strategy {
  execute(a, b) {}
}

class AddStrategy extends Strategy {
  execute(a, b) {
    return a + b;
  }
}

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  executeStrategy(a, b) {
    return this.strategy.execute(a, b);
  }
}
```

### 迭代器模式

提供一种方法顺序访问一个聚合对象中的各个元素。

```javascript
class Iterator {
  constructor(collection) {
    this.collection = collection;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.collection.length;
  }

  next() {
    return this.collection[this.index++];
  }
}
```

---

## 前端常用设计模式

### 发布-订阅模式

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}
```

### 中间件模式

```javascript
class Middleware {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  execute(context) {
    const dispatch = (index) => {
      if (index === this.middlewares.length) return;
      const fn = this.middlewares[index];
      fn(context, () => dispatch(index + 1));
    };
    dispatch(0);
  }
}
```

---

## MVC / MVVM

### MVC 模式

Model（模型）、View（视图）、Controller（控制器）

```javascript
// Model
class Model {
  constructor() {
    this.data = [];
  }

  addData(item) {
    this.data.push(item);
  }
}

// View
class View {
  render(data) {
    console.log('Render:', data);
  }
}

// Controller
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.render(this.model.data);
  }
}
```

### MVVM 模式

Model（模型）、View（视图）、ViewModel（视图模型）

Vue.js 和 React 都采用类似 MVVM 思想。

```javascript
// ViewModel
class ViewModel {
  constructor() {
    this.data = '';
    this.observers = [];
  }

  setData(value) {
    this.data = value;
    this.notify();
  }

  notify() {
    this.observers.forEach((observer) => observer(this.data));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
}
```

---

## 设计原则

### SOLID 原则

1. **S**ingle Responsibility Principle：单一职责原则
2. **O**pen/Closed Principle：开闭原则
3. **L**iskov Substitution Principle：里氏替换原则
4. **I**nterface Segregation Principle：接口隔离原则
5. **D**ependency Inversion Principle：依赖倒置原则

### 其他原则

- DRY（Don't Repeat Yourself）
- KISS（Keep It Simple, Stupid）
- YAGNI（You Aren't Gonna Need It）

---

## 设计模式选择指南

### 何时使用

1. **单例模式**：需要唯一实例
2. **工厂模式**：创建对象需要灵活配置
3. **观察者模式**：事件系统
4. **装饰器模式**：动态添加功能
5. **代理模式**：控制访问

### 常见陷阱

- 过度使用设计模式
- 不理解模式就使用
- 为了模式而模式

---

## 实际应用示例

### 状态管理

Redux 使用了观察者模式。

### 事件系统

DOM 事件系统使用发布-订阅模式。

### 组件库

许多 UI 组件库使用组合模式。

### 插件系统

Webpack 插件系统使用 Tapable（发布-订阅模式。
