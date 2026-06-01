# React Hooks

## 为什么需要 Hooks？

Hooks 是 React 16.8 引入的特性，解决了以下问题：

- **组件之间复用状态逻辑困难**：之前需要 render props 或高阶组件（HOC）
- **复杂组件难以理解**：生命周期函数中混杂不相关逻辑
- **class 语法学习成本高**：this 指向问题

---

## 常用 Hooks 有哪些？

### `useState` - 状态管理
```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

### `useEffect` - 副作用
```javascript
import { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
    // 清理函数
    return () => {
      console.log("组件卸载或依赖变化时执行");
    };
  }, [count]); // 依赖数组

  return <button onClick={() => setCount(count + 1)}>Click {count}</button>;
}
```

| 依赖数组 | 执行时机 |
|----------|----------|
| 不传 | 每次渲染后都执行 |
| `[]` | 只在第一次渲染后执行（相当于 componentDidMount） |
| `[a, b]` | 第一次或 `a`/`b` 变化时执行 |

### `useContext` - 跨组件通信
```javascript
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function Child() {
  const theme = useContext(ThemeContext);
  return <div>当前主题：{theme}</div>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}
```

### `useReducer` - 复杂状态管理
```javascript
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

### `useCallback` - 缓存函数
```javascript
import { useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // 只有 count 变化时才重新创建函数
  const handleClick = useCallback(() => {
    console.log(count);
  }, [count]);

  return <Child onClick={handleClick} />;
}
```

### `useMemo` - 缓存计算结果
```javascript
import { useMemo } from "react";

function ExpensiveComponent({ a, b }) {
  // 只有 a 或 b 变化时才重新计算
  const expensiveValue = useMemo(() => {
    return a + b; // 假设这是一个耗时计算
  }, [a, b]);

  return <div>结果：{expensiveValue}</div>;
}
```

### `useRef` - 持久化引用
```javascript
import { useRef, useEffect } from "react";

function Example() {
  const inputRef = useRef(null);
  const previousCount = useRef(0);

  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
    </div>
  );
}
```

---

## 3. 自定义 Hook

自定义 Hook 是以 "use" 开头的函数，可以调用其他 Hook。

```javascript
import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

// 使用
function App() {
  const { width, height } = useWindowSize();
  return (
    <div>
      宽度：{width}，高度：{height}
    </div>
  );
}
```

---

## 4. Hooks 使用规则

1. **只在顶层调用 Hooks**：不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hooks**：只能在函数组件或自定义 Hook 中调用
