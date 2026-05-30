# 虚拟滚动

## 什么是虚拟滚动

虚拟滚动只渲染可见区域的元素，大幅减少 DOM 节点数量。

### 传统渲染问题

```javascript
// ❌ 渲染所有元素 - 性能差
{
  Array(10000)
    .fill()
    .map((_, i) => <div key={i}>Item {i}</div>);
}
```

### 虚拟滚动优势

- 只渲染可见项
- 内存占用低
- 滚动流畅

---

## 自定义实现

### 基础版本

```javascript
function VirtualScroll({ items, height = 600, itemHeight = 50 }) {
  const [scrollTop, setScrollTop] = useState(0);

  const itemCount = items.length;
  const totalHeight = itemCount * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight) + 2;
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  return (
    <div style={{ height, overflow: 'auto' }} onScroll={(e) => setScrollTop(e.target.scrollTop)}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 使用示例

```javascript
function App() {
  const items = Array(10000)
    .fill()
    .map((_, i) => `Item ${i}`);
  return <VirtualScroll items={items} />;
}
```

---

## 性能优化

### 窗口大小

```javascript
// 渲染比可见区域多一些的元素
const visibleCount = Math.ceil(height / itemHeight) + 2;
```

### 滚动节流

```javascript
const handleScroll = useCallback(
  throttle((e) => {
    setScrollTop(e.target.scrollTop);
  }, 16),
  [],
);
```

### 复用 DOM

```javascript
// 使用key复用DOM
function Example() {
  return <div key={startIndex + index} />;
}
```

---

## 虚拟表格

```javascript
function VirtualTable({ data, columns }) {
  const [scrollTop, setScrollTop] = useState(0);
  const rowHeight = 50;
  const visibleRows = Math.ceil(400 / rowHeight) + 2;
  const startRow = Math.floor(scrollTop / rowHeight);
  const visibleData = data.slice(startRow, startRow + visibleRows);

  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: data.length * rowHeight, position: 'relative' }}>
        {visibleData.map((row, index) => (
          <div
            key={startRow + index}
            style={{
              position: 'absolute',
              top: (startRow + index) * rowHeight,
              display: 'flex',
            }}
          >
            {columns.map((col) => (
              <div key={col.key} style={{ width: col.width }}>
                {row[col.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 成熟库推荐

### react-window

```bash
# 如需使用，可单独安装
npm install react-window
```

### react-virtualized

```bash
# 如需使用，可单独安装
npm install react-virtualized
```

---

## 总结

虚拟滚动要点：

1. ✅ 只渲染可见区域
2. ✅ 使用自定义实现或成熟库
3. ✅ 预渲染相邻元素
4. ✅ 优化滚动性能
5. ✅ 适当的窗口大小
