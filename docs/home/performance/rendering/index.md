# 渲染性能优化

## 重绘与回流

### 回流（Reflow）

当元素的几何属性发生变化时，浏览器需要重新计算元素的布局。

**触发回流的操作**：

- 改变 width/height/margin/padding/border
- 改变 display/position/float
- 添加/删除 DOM 节点
- 内容变化（文本、图片等）

### 重绘（Repaint）

元素的样式改变但不影响布局时，浏览器只需要重新绘制元素。

**触发重绘的操作**：

- 改变 color/background-color
- 改变 visibility/opacitiy
- 改变 box-shadow

### 减少重绘回流

```javascript
// ❌ 不好的做法 - 多次触发回流
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// ✅ 好的做法 - 一次性修改
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// ✅ 更好的做法 - 使用class
element.classList.add('box-style');
```

### 使用 documentFragment

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // 只触发一次回流
```

---

## React 渲染优化

### React.memo

```javascript
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

### useMemo

```javascript
const expensiveValue = useMemo(() => {
  return data.map((item) => item * 2);
}, [data]);
```

### useCallback

```javascript
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 避免内联函数

```javascript
// ❌ 每次渲染都创建新函数
function BadExample() {
  return <Button onClick={() => handleClick(id)} />;
}

// ✅ 使用useCallback
function GoodExample() {
  const handleButtonClick = useCallback(() => {
    handleClick(id);
  }, [id]);

  return <Button onClick={handleButtonClick} />;
}
```

---

## 列表渲染优化

### key 的正确使用

```javascript
// ❌ 不要用index作为key
function BadKeyExample({ items }) {
  return (
    <>
      {items.map((item, index) => (
        <Item key={index} data={item} />
      ))}
    </>
  );
}

// ✅ 使用唯一的id
function GoodKeyExample({ items }) {
  return (
    <>
      {items.map((item) => (
        <Item key={item.id} data={item} />
      ))}
    </>
  );
}
```

### 虚拟化列表

当列表数据量大时，使用虚拟滚动只渲染可见区域。

```javascript
// 虚拟列表示例（需要安装 react-window）
const VirtualList = ({ items }) => (
  <div style={{ height: 600, overflow: 'auto' }}>
    {items.map((item, index) => (
      <div key={index} style={{ height: 50 }}>
        {item}
      </div>
    ))}
  </div>
);
```

---

## GPU 加速

### 使用 transform

```css
/* ❌ 触发回流 */
.animate {
  top: 100px;
  left: 100px;
}

/* ✅ 使用transform，触发GPU加速 */
.animate {
  transform: translate(100px, 100px);
}
```

### will-change

```css
/* 提前告诉浏览器哪些元素会变化 */
.box {
  will-change: transform;
}
```

---

## 避免强制同步布局

```javascript
// ❌ 先读再写 - 强制同步布局
function update() {
  const height = element.offsetHeight; // 读
  element.style.height = `${height + 10}px`; // 写
}

// ✅ 先写后读 - 批量操作
function update() {
  element.style.height = `${element.offsetHeight + 10}px`;
}
```

---

## 防抖与节流

### 防抖（debounce）

```javascript
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 使用
const handleSearch = debounce((query) => {
  searchApi(query);
}, 300);
```

### 节流（throttle）

```javascript
function throttle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}

// 使用
const handleScroll = throttle(() => {
  console.log('Scrolling');
}, 300);
```

---

## 事件委托

```javascript
// ❌ 给每个子元素添加事件
buttons.forEach((btn) => {
  btn.addEventListener('click', handler);
});

// ✅ 事件委托到父元素
parent.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    handler(e);
  }
});
```

---

## Intersection Observer

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

observer.observe(element);
```

---

## Web Workers

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};
```

---

## 性能监控

### Performance API

```javascript
// 测量函数执行时间
performance.mark('start');
doSomething();
performance.mark('end');
performance.measure('doSomething', 'start', 'end');
const measure = performance.getEntriesByName('doSomething')[0];
console.log(measure.duration);
```

### requestAnimationFrame

```javascript
// 使用requestAnimationFrame进行动画
function animate() {
  requestAnimationFrame(animate);
  // 更新动画
}
animate();
```

---

## 总结

渲染性能优化要点：

1. ✅ 减少重绘回流
2. ✅ 使用 React.memo/useMemo/useCallback
3. ✅ 虚拟列表渲染大数据
4. ✅ 使用 transform 进行动画
5. ✅ 防抖节流优化高频操作
6. ✅ 事件委托减少事件监听器
7. ✅ Web Workers 处理耗时计算
