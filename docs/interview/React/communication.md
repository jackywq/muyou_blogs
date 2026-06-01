# 组件通信方式

### 父组件 → 子组件：Props
```jsx
function Parent() {
  const message = "Hello from Parent";
  return <Child message={message} />;
}

function Child({ message }) {
  return <div>{message}</div>;
}
```

### 子组件 → 父组件：回调函数
```jsx
function Parent() {
  const handleChildClick = (data) => {
    console.log("收到子组件数据：", data);
  };
  return <Child onSendData={handleChildClick} />;
}

function Child({ onSendData }) {
  return <button onClick={() => onSendData("Hello from Child")}>发送</button>;
}
```

### 跨组件通信：Context
```jsx
import { createContext, useContext } from "react";

const DataContext = createContext();

function Parent() {
  const data = "共享数据";
  return (
    <DataContext.Provider value={data}>
      <Child />
    </DataContext.Provider>
  );
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  const data = useContext(DataContext);
  return <div>{data}</div>;
}
```

### 兄弟组件通信
通过共同的父组件作为桥梁：
```jsx
function Parent() {
  const [sharedState, setSharedState] = useState("");
  return (
    <div>
      <ComponentA setSharedState={setSharedState} />
      <ComponentB sharedState={sharedState} />
    </div>
  );
}
```

### 全局状态管理
- Redux
- MobX
- Zustand
- Jotai
- Recoil

---

## 2. props 传递数据的注意事项

1. **props 是只读的**：组件不能修改自己接收的 props
2. **单项数据流**：数据只能从父组件流向子组件
3. **默认值**：
```jsx
function Component({ name = "默认值" }) {
  return <div>{name}</div>;
}
```
4. **类型检查**：使用 `prop-types` 或 TypeScript
