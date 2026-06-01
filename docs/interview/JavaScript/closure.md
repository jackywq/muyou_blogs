# 作用域与闭包

## 什么是作用域？

作用域是变量和函数的可访问范围。JavaScript 中有三种作用域：

- **全局作用域**：最外层的作用域
- **函数作用域**：函数内部的作用域
- **块级作用域**：`{}` 内部（ES6 `let`/`const`）

---

## 什么是闭包？

**闭包**是指有权访问另一个函数作用域中变量的函数。

### 闭包形成的条件
1. 函数嵌套函数
2. 内部函数引用外部函数的变量
3. 内部函数被返回到外部

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2 (count 被保存了)
```

### 闭包的应用场景

1. **数据私有化**
```javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => count++,
    decrement: () => count--,
    getCount: () => count,
  };
}
const counter = createCounter();
counter.increment();
counter.getCount(); // 1
```

2. **函数柯里化**
```javascript
function add(a) {
  return function(b) {
    return a + b;
  };
}
add(1)(2); // 3
```

3. **模块模式**
```javascript
const module = (function() {
  let privateVar = "私有变量";
  return {
    getVar: () => privateVar,
  };
})();
module.getVar(); // "私有变量"
```

---

## 3. 经典闭包面试题

### 题目 1
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 输出：3, 3, 3
```
**原因**：`var` 是函数作用域，循环结束后 `i` 是 3。

**解决方案 1**：使用 `let`
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 输出：0, 1, 2
```

**解决方案 2**：使用闭包
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j);
    }, 0);
  })(i);
}
```

---

## 4. 闭包的优缺点

| 优点 | 缺点 |
|------|------|
| 可以封装私有变量 | 内存泄漏（闭包会持有外部变量，不会被 GC） |
| 延长变量生命周期 | 过度使用会导致内存占用过大 |
| 实现函数柯里化等高级功能 | - |
