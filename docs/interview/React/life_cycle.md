# 函数组件生命周期（Hooks 方式）

| 阶段 | Hook | 说明 |
|------|------|------|
| 挂载 | `useEffect(() => {}, [])` | 第一次渲染后执行 |
| 更新 | `useEffect(() => {}, [dep])` | 依赖变化时执行 |
| 卸载 | `useEffect(() => () => { ... }, [])` | 组件卸载前执行清理 |

### 挂载
```jsx
useEffect(() => {
  console.log("组件已挂载");
  // 发起网络请求、订阅事件等
}, []);
```

### 更新
```jsx
useEffect(() => {
  console.log("count 已更新");
}, [count]);
```

### 卸载
```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => {
    console.log("组件将卸载，清理资源");
    clearInterval(timer); // 清理定时器
  };
}, []);
```

---

## 2. Class 组件生命周期（了解即可）

### 挂载阶段
1. `constructor()` - 构造函数
2. `static getDerivedStateFromProps()`
3. `render()` - 渲染
4. `componentDidMount()` - 已挂载（发起网络请求）

### 更新阶段
1. `static getDerivedStateFromProps()`
2. `shouldComponentUpdate()` - 是否更新（性能优化）
3. `render()` - 渲染
4. `getSnapshotBeforeUpdate()`
5. `componentDidUpdate()` - 已更新

### 卸载阶段
1. `componentWillUnmount()` - 将卸载（清理资源）
