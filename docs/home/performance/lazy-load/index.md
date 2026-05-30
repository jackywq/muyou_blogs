# 懒加载

## 什么是懒加载

懒加载（Lazy Loading）是一种延迟加载技术，只在需要时才加载资源。

### 优势

- 减少初始加载时间
- 节省带宽
- 提升用户体验

---

## 图片懒加载

### 原生支持

```html
<img src="image.jpg" loading="lazy" alt="懒加载" />
<iframe src="video.html" loading="lazy"></iframe>
```

### loading 属性值

- `lazy`：懒加载
- `eager`：立即加载（默认）
- `auto`：浏览器决定

---

## Intersection Observer

### 基础实现

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

// 使用
document.querySelectorAll('img[data-src]').forEach((img) => {
  observer.observe(img);
});
```

### HTML 结构

```html
<img data-src="image.jpg" alt="懒加载" />
```

### 配置选项

```javascript
const observer = new IntersectionObserver(callback, {
  root: null, // 视口
  rootMargin: '50px 0px', // 提前50px加载
  threshold: 0.1, // 10%可见时加载
});
```

---

## React 懒加载

### 组件懒加载

```javascript
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => /* import('./Component') */);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 路由懒加载

```javascript
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => /* import('./Home') */);
const About = lazy(() => /* import('./About') */);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## 图片懒加载库

### 成熟库推荐

```bash
# 如需使用，可单独安装
npm install react-lazyload
npm install react-lazy-load-image-component
```

---

## 视频懒加载

### 原生方法

```html
<video controls preload="none" poster="poster.jpg">
  <source src="video.mp4" type="video/mp4" />
</video>
```

### Intersection Observer

```javascript
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = entry.target;
      video.src = video.dataset.src;
      videoObserver.unobserve(video);
    }
  });
});
```

---

## 无限滚动

### 基本实现

```javascript
function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastItemRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const loadMore = async () => {
    const newItems = await fetchData(page + 1);
    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} ref={index === items.length - 1 ? lastItemRef : null}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

---

## 成熟库推荐

```bash
# 如需使用，可单独安装
npm install react-infinite-scroll-component
```

---

## 预加载策略

### 临界预加载

```javascript
const observer = new IntersectionObserver(callback, {
  rootMargin: '200px 0px', // 提前200px加载
});
```

### 鼠标悬停预加载

```javascript
function Link({ to, children }) {
  const handleMouseEnter = () => {
    // 预加载组件
    // import('./LazyComponent');
  };

  return (
    <a href={to} onMouseEnter={handleMouseEnter}>
      {children}
    </a>
  );
}
```

---

## 总结

懒加载要点：

1. ✅ 使用原生 loading="lazy"
2. ✅ Intersection Observer API
3. ✅ React.lazy + Suspense
4. ✅ 无限滚动实现
5. ✅ 合理的预加载策略
6. ✅ 使用成熟库简化实现
