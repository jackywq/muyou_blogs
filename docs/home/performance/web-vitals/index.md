# Web Vitals

## 核心指标

### LCP (Largest Contentful Paint)

最大内容绘制 - 衡量加载性能

**目标**：< 2.5s

**影响因素**：

- 服务器响应时间
- 资源加载时间
- 渲染时间

**优化方法**：

- 优化服务器
- 预加载关键资源
- 优化图片
- 使用 CDN

### FID (First Input Delay)

首次输入延迟 - 衡量交互性能

**目标**：< 100ms

**影响因素**：

- 长任务
- JavaScript 执行时间
- 主线程繁忙

**优化方法**：

- 代码分割
- 使用 Web Worker
- 减少长任务

### CLS (Cumulative Layout Shift)

累计布局偏移 - 衡量视觉稳定性

**目标**：< 0.1

**影响因素**：

- 无尺寸图片
- 动态插入内容
- 广告加载

**优化方法**：

- 图片设置尺寸
- 预留广告位
- 避免动态插入

---

## 测量方法

### Lighthouse

```bash
# 使用Lighthouse
lighthouse https://example.com --view
```

### Chrome DevTools

- Performance 面板
- Lighthouse 面板
- Web Vitals 扩展

### 真实用户监控(RUM)

```javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
  // 发送到分析服务
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

---

## LCP 优化

### 优化方案

```html
<!-- 预加载关键资源 -->
<link rel="preload" href="hero.jpg" as="image" />

<!-- 使用WebP -->
<picture>
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="Hero" />
</picture>
```

### 服务器优化

```nginx
# 启用HTTP/2
listen 443 ssl http2;

# 缓存
expires 1y;
```

---

## FID 优化

### 减少 JavaScript 执行时间

```javascript
// 代码分割
const HeavyComponent = lazy(() => /* import('./HeavyComponent') */);

// 使用requestIdleCallback
requestIdleCallback(() => {
  nonCriticalWork();
});
```

### Web Worker

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage(data);

// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};
```

---

## CLS 优化

### 图片尺寸

```html
<!-- 设置图片尺寸 -->
<img src="image.jpg" width="800" height="600" alt="图片" />

<!-- 使用aspect ratio -->
<div style="aspect-ratio: 4/3;">
  <img src="image.jpg" alt="图片" />
</div>
```

### 预留空间

```css
.ad-container {
  min-height: 250px;
}
```

---

## 其他指标

### TTFB (Time to First Byte)

首字节时间

**目标**：< 800ms

### FCP (First Contentful Paint)

首次内容绘制

**目标**：< 1.8s

### TTI (Time to Interactive)

可交互时间

**目标**：< 3s

---

## 监控工具

### Lighthouse

综合性能分析工具

### Web Vitals Chrome 扩展

实时查看指标

### 自定义监控

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry);
  }
});
observer.observe({ entryTypes: ['largest-contentful-paint'] });
```

---

## 总结

Web Vitals 优化要点：

1. ✅ LCP < 2.5s - 优化加载
2. ✅ FID < 100ms - 优化交互
3. ✅ CLS < 0.1 - 避免布局跳动
4. ✅ 定期使用 Lighthouse 检查
5. ✅ 监控真实用户数据
