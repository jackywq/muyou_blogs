# 事件循环

## JavaScript 是单线程还是多线程？

JavaScript 是**单线程**的，但浏览器/Node.js 是多线程的，它们提供了 Web APIs（如定时器、DOM 事件、网络请求）。

---

## 什么是事件循环（Event Loop）？

事件循环是 JavaScript 处理异步操作的机制。

### 核心概念

- **调用栈 (Call Stack)**：执行同步代码
- **任务队列 (Task Queue)**：存放异步回调
  - **宏任务 (Macro Task)**：`setTimeout`/`setInterval`、I/O、DOM 事件、`requestAnimationFrame`
  - **微任务 (Micro Task)**：`Promise.then/catch/finally`、`async/await`、`process.nextTick` (Node)

### 执行顺序

1. 执行同步代码（调用栈）
2. 执行所有微任务
3. 执行一个宏任务
4. 再次执行所有微任务
5. 循环...

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// 输出：1, 4, 3, 2
```

**解析**：
1. 同步执行：输出 "1"、"4"
2. 执行微任务：Promise.then 输出 "3"
3. 执行宏任务：setTimeout 输出 "2"

---

## 3. 进阶题目

### 题目 1
```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

async1();

new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});

console.log("script end");
```

**输出**：
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

---

## 4. Node.js 事件循环

Node.js 的事件循环比浏览器更复杂，分为 6 个阶段：

1. **timers**：执行 `setTimeout`/`setInterval`
2. **pending callbacks**：执行 I/O 回调
3. **idle, prepare**：内部使用
4. **poll**：获取新的 I/O 事件
5. **check**：执行 `setImmediate`
6. **close callbacks**：关闭回调

Node 独有：`process.nextTick` 在每个阶段之间执行，优先级比微任务更高。
