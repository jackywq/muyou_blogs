# React 系列面试题

## React 基础

### React18 新特性

> 并发渲染

核心价值：让 React 可以 "中断、暂停、恢复、放弃" 渲染，优先保证页面不卡顿

> 新的根节点创建方式：createRoot（替代 ReactDOM.render）

React 18 推荐使用 `createRoot` 替代传统的 `ReactDOM.render`，这是启用并发渲染的前提。

```javascript
// React 17 及之前的写法
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// React 18 新写法
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />); // 支持多次调用（比如路由切换时重新渲染）
```

> useTransition

`useTransition` 是 React 18 专为**并发渲染**设计的核心 Hook，核心价值是**区分「紧急更新」和「非紧急更新」**，让高优先级的用户交互（输入、点击、滚动）不被低优先级的耗时渲染阻塞。

**核心适用场景：**耗时的列表筛选 / 搜索

```javascript
import { useState, useTransition } from 'react';

// 模拟生成10000条测试数据
const generateBigList = () => {
  return Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: `商品 ${index + 1}: ${Math.random().toString(36).slice(2, 8)}`
  }));
};

function BigListSearch() {
  // 原始大数据列表
  const [bigList] = useState(generateBigList());
  // 输入框值（紧急更新）
  const [searchValue, setSearchValue] = useState('');
  // 筛选后的列表（非紧急更新）
  const [filteredList, setFilteredList] = useState(bigList);
  // useTransition：isPending标记是否在处理非紧急更新
  const [isPending, startTransition] = useTransition({
    timeoutMs: 1000 // 超时时间：1秒后强制执行更新
  });

  // 处理输入变化
  const handleSearch = (e) => {
    const value = e.target.value;
    // 1. 紧急更新：输入框值（优先执行，不卡顿）
    setSearchValue(value);

    // 2. 非紧急更新：列表筛选（可被中断，不阻塞输入）
    startTransition(() => {
      const filtered = bigList.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredList(filtered);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>大数据列表筛选（10000条）</h3>
      {/* 输入框：紧急更新，流畅响应 */}
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="输入关键词筛选商品..."
        style={{ width: '300px', padding: '8px', marginBottom: '16px' }}
      />

      {/* 加载状态提示 */}
      {isPending && <div style={{ color: '#666' }}>筛选中，请稍候...</div>}

      {/* 筛选后的列表 */}
      <div style={{
        height: '400px',
        overflow: 'auto',
        border: '1px solid #eee',
        padding: '8px'
      }}>
        {filteredList.map(item => (
          <div key={item.id} style={{ padding: '4px 0' }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BigListSearch;
```

> useDeferredValue：延迟更新值

`useDeferredValue` 是 `useTransition` 的 "值版本"，用于延迟更新某个值，返回一个 "延迟的副本"。

**适用场景:** 文本框搜索联想列表

**目的：**避免 "高频状态" 持续触发，导致渲染成本变高

```javascript
import { useState, useDeferredValue } from 'react';

function Search() {
  const [input, setInput] = useState('');
  // 延迟更新 input 的值，优先保证输入流畅
  const deferredInput = useDeferredValue(input, { timeoutMs: 500 });

  // 基于延迟值渲染联想列表（耗时操作）
  const suggestions = deferredInput
    ? Array(10000).fill(deferredInput)
    : [];

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="搜索..."
      />
      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

**useDeferredValue 和 useTransition 区别?**

`useDeferredValue` 是**值层面的延迟**

`useTransition` 是**更新层面的延迟**

---

## React 进阶

### React19 新特性

> useActionState

自动管理 pending/error/重置

> 新增 useEvent hooks

解决**事件函数引用不稳定**的核心 Hook

> 新增 useErrorBoundary hooks

简化错误捕获和处理逻辑

> 服务器组件 RSC

服务器组件**仅在服务端执行**，生成纯 HTML 发送到客户端

只要组件文件中**没有写 `'use client'`**，React 就会将其视为服务器组件，仅在服务端执行；不能使用任何 hooks 以及浏览器 API

**解决问题：**首屏加载慢的问题

服务器组件可**直接访问数据库 / 内部服务**，跳过客户端请求 API 的步骤

```
服务器组件 → 直接查数据库 → 渲染 HTML → 发送到客户端
```

---

## React 核心原理

### setState 到底是异步还是同步?

setState 是一个异步操作，会将更新放到一个队列里面，而不是立即执行它

### React 组件通信如何实现?

1. props 父子组件传值;
2. 通过 Context 实现跨层级通信；
3. 可以借助 Redux 或者 Mobx 等全局状态管理工具维护一个全局的 store;
4. 使用 ref 绑定的自定义事件进行通信；

### React 中的 keys 有什么作用？

1. 保证在同级元素中的唯一性
2. 更高效的更新组件树，减少不必要的元素渲染
3. 当一个列表里面，只是元素顺序发生改变，如果都有 key 的话，只是移动元素；如果没有 key, 就会销毁创建元素，改动真实 DOM 了，效率会很慢

**提出问题：**React 中的 key 可以用 index 作为标识么？

**答：** 不能，当一个 list 有增删操作时，索引其实已经发生改变，无法确定当前节点的唯一性。

### 调用 setState 之后发生了什么？

1. react 会将传入的参数与当前的状态合并
2. 会根据最新的状态构建元素树
3. 通过 react diff 算法计算每个元素节点差异，并对界面进行最小化渲染

### 为什么虚拟 dom 会提高性能?（必考）

1. 减少直接操作 DOM 的次数
2. 通过高效的 diff 算法比较新旧虚拟 DOM 树，只对改变的节点进行渲染，实现增量更新
3. 批量更新：将多次 state 合并成一次 DOM 操作

---

## React 生态

### redux 的工作流？

**简介：** 首先 redux 是一个单向数据流框架，主要是为了解决组件间状态共享问题

**核心：** redux 主要有 action、store、reducer 这三个核心文件；

**工作流：**

1. action 主要作用是将视图层或者接口的数据通过 dispatch 方式传给 reducer
2. reducer 是一个纯函数，它会根据 type 来存储数据并将最新的 state 数据传递给 store
3. store 是一个状态树，它通过 connect 方法将数据分发给要接收的视图层

---

## React 高级概念

### react diff 原理

当组件的状态或属性发生变化时，React 会创建一个新的虚拟 DOM 树，并与旧的虚拟 DOM 树进行比较，只对需要更新的部分来进行真实 DOM 的渲染。

- 同层比较：React 只会在同一层级的节点进行比较，对于不同层级的节点，react 是直接替换；
- 元素类型比较：React 组件是通过 babel 转换成虚拟 dom 的，如果两个元素的类型不同（例如，一个是 `<div>`，另一个是 `<span>`），React 会销毁旧的 DOM 节点并创建新的节点。
- 如果元素类型一样，可以根据 key 属性，来判断元素需要新增、删除还是移动；

### react fiber 原理？

**解决问题：** 在 react16 之前的版本，使用递归的方式处理 DOM 树更新，中间没有中断机制，长时间的更新会阻塞主线程，造成页面的卡死；react fiber 通过增量渲染机制实现中断，不会一次性执行所有的渲染，而是将大的任务拆分小的分片可中断任务来更新的

**工作原理：**

react fiber 分为 调和(Reconciliation) 和 提交(commit) 两个阶段，调和阶段任务可中断、可恢复、不操作 DOM；提交阶段不可中断，一次性更新所有阶段到真实 DOM;

1. 调和阶段：调度器（Scheduler）：

   - 首先有一个优先级分层，按照 Lane 优先级模型排序，高优先级任务优先执行；
   - 然后进行时间切片：将大的任务单元切分为动态阈值（动态阈值 = min(当前帧剩余时间固定, 5ms)）的小任务单元，当前任务单元的执行时间未超时，则调度器继续处理下一个小任务单元；如果超时了，则需要将主线程的控制权交给浏览器（避免长时间占用主线程造成卡顿）；等浏览器空闲后，再从中断的 Fiber 节点继续执行;
   - 如果此时有高优先级任务插入进来（比如鼠标滚动事件）则主线程会优先执行高优先任务，等浏览器空闲后，再从中断的 Fiber 节点继续执行；

2. fiber 节点中断与恢复原理：react fiber 本身是一个链表结构，通过 sibling, child, return 这些指针进行相互连接，形成一个 fiber 树，有一个`nextUnitOfWork` 变量记录遍历断点，时间切片时间一到就中断，待浏览器空闲从断点处恢复执行；

3. 双缓存机制：两棵 Fiber 树：`current Fiber`树和`workInProgress Fiber`树, `current Fiber` 表示当前页面上显示内容的树，`workInProgress Fiber`表示正在构建的更新树，组件更新中，此时页面上显示的是`current Fiber` 树，页面更新完成后会一次性切换成 `workInProgress Fiber` 树，目的就是页面不闪烁，没有中间态；

---

## React 性能优化

### react 的性能优化有哪些？

**hooks 组件:**

1. React.memo 减少不必要的渲染
2. useMemo、useCallback 缓存函数和计算结果，减少下次渲染时重新创建

**class 组件：**

1. PureComponent, shouldComponentUpdate() 减少不必要的渲染

**密集型计算：**

使用 web workers 来计算一些复杂性的逻辑，避免阻塞 UI 渲染

**useMemo 和 useCallback 区别？**

useMemo 缓存的是计算结果、useCallback 缓存的是函数；

---

## React 实战问题

### react 竞态问题如何处理？

场景：一个输入框输入不同的值，接口返回的时间不一样，输入 1 时接口返回 20s, 输入 12 接口返回 2s, 如何保证生成的数据和输入框的值是匹配的

解决方案：防抖 + 取消旧请求（最完美，企业级首选）

1. 防抖：减少频繁请求（输入停顿 300ms 再发请求）
2. 取消：发起新请求时，主动取消上一个未完成的旧请求，旧请求永远不会触发渲染

```javascript
import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  // 存储取消令牌，用于取消旧请求
  const cancelTokenRef = useRef(null);

  // 防抖请求函数：停顿300ms再发送
  const fetchData = useCallback(
    debounce(async (inputValue) => {
      try {
        // 1. 取消上一个请求
        if (cancelTokenRef.current) {
          cancelTokenRef.current.cancel('取消旧请求');
        }

        // 2. 创建新的取消令牌
        const cancelToken = axios.CancelToken.source();
        cancelTokenRef.current = cancelToken;

        // 3. 发送请求
        const res = await axios.get('/api/search', {
          params: { keyword: inputValue },
          cancelToken: cancelToken.token,
        });

        // 4. 只有请求成功才更新数据
        setResult(res.data);
      } catch (err) {
        // 忽略主动取消的请求报错
        if (!axios.isCancel(err)) {
          console.error('请求失败', err);
        }
      }
    }, 300),
    []
  );

  // 输入变化
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    // 触发防抖请求
    fetchData(inputValue);
  };

  return (
    <div>
      <input value={value} onChange={handleChange} placeholder="输入搜索" />
      <div>结果：{result}</div>
    </div>
  );
};

export default SearchInput;
```

### 受控组件和非受控组件的区别？

受控和非受控组件主要是针对表单的；

- 受控组件：是通过 state 状态值来实现更新
- 非受控组件：是通过操作真实 DOM 来实现更新

---

## 框架对比

### 框架相对于原生开发有哪些优势?

1. 组件化开发，使得工程更易维护；
2. 原生开发会频繁操作真实 DOM, 而操作真实 DOM 对触发页面的重绘，针对复杂业务场景可能会出现性能问题；而框架开发都是采用虚拟 DOM，使用 diff 算法来一次性批量更新 DOM, 提高性能；
3. 原生开发状态处理混乱，它的状态和 DOM 视图层是分离的，当数据变化时，需要手动更新到 DOM 元素上，代码会变得臃肿且复杂；而框架开发，以 react 为例，针对单个模块状态维护一个 state 或者一个 hook, 全局状态使用全局状态管理工具 redux, zustand;
4. 框架能够提供统一的开发规范，比如 Vue 的单文件组件，react 组件化开发；而原生开发只能让成员约定遵守规范，没法从技术层面强行约束；
5. 周边生态比较好，比如一些 vue-router, react-router, antd-design, vuex, redux，ahooks, webpack, vite 都比较成熟，避免重复造轮子；

---

## 生命周期

### React 父子组件生命周期执行顺序总结:

父子组件的生命周期是交替执行，有一个地方需要注意，当第一次加载时，父组件 componentDidMount 要晚于子组件 componentDidMount 执行

> 父子组件第一次渲染加载时，执行顺序为：

**问：** 为什么父组件的 componentDidMount 晚于子组件 componentDidMount 执行?

**答：** 因为父组件的 componentDidMount 方法的含义就是等所有子节点都挂载上才被执行

- Parent 组件： constructor()
- Parent 组件： getDerivedStateFromProps()
- Parent 组件： render()
- Child 组件： constructor()
- Child 组件： getDerivedStateFromProps()
- Child 组件： render()
- Child 组件： componentDidMount()
- Parent 组件： componentDidMount()

> 卸载子组件，执行顺序为：

**问：** 为什么父组件的 componentDidUpdate 方法在最后执行?

**答：** 因为 componentDidUpdate 方法的含义就是等其所有子节点都更新后才被执行

- Parent 组件： getDerivedStateFromProps()
- Parent 组件： shouldComponentUpdate()
- Parent 组件： render()
- Parent 组件： getSnapshotBeforeUpdate()
- Child 组件： componentWillUnmount()
- Parent 组件： componentDidUpdate()
