# 加载性能优化

## 页面加载流程

### 浏览器渲染流程

1. **DNS 解析**：域名 → IP 地址
2. **TCP 连接**：建立连接
3. **HTTP 请求**：发送请求
4. **响应**：服务器返回数据
5. **解析 HTML**：构建 DOM 树
6. **解析 CSS**：构建 CSSOM 树
7. **布局**：计算位置和大小
8. **绘制**：渲染到屏幕

### 关键渲染路径

```
HTML → DOM
             \
              → Render Tree → Layout → Paint
             /
CSS  → CSSOM
```

---

## 代码分割

### 动态导入

```javascript
// 路由层面
const Home = lazy(() => /* import('./Home') */);
const About = lazy(() => /* import('./About') */);

// 组件层面
const HeavyComponent = lazy(() => /* import('./HeavyComponent') */);
```

### React.lazy + Suspense

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

### 按路由分割

```javascript
// webpack配置
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

---

## 资源压缩

### Webpack 压缩

```javascript
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
```

### Gzip 压缩

```nginx
# Nginx配置
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### Brotli 压缩

比 Gzip 压缩效率更高！

```nginx
brotli on;
brotli_types text/plain text/css application/json application/javascript;
```

---

## 缓存策略

### 浏览器缓存

```javascript
// HTTP响应头
Cache-Control: public, max-age=31536000, immutable
ETag: "abc123"
Last-Modified: Tue, 10 May 2026 10:00:00 GMT
```

### Service Worker

```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/', '/index.html']);
    }),
  );
});
```

### 持久化缓存

```javascript
// Webpack配置
output: {
  filename: '[name].[contenthash].js';
}
```

---

## 预加载与预获取

### preload

```html
<!-- 提前加载关键资源 -->
<link rel="preload" href="critical.js" as="script" />
<link rel="preload" href="font.woff2" as="font" crossorigin />
```

### prefetch

```html
<!-- 预获取未来可能需要的资源 -->
<link rel="prefetch" href="next-page.js" as="script" />
```

### preconnect

```html
<!-- 提前建立连接 -->
<link rel="preconnect" href="https://api.example.com" />
```

---

## 首屏优化

### 内联关键 CSS

```html
<style>
  /* 内联首屏关键CSS */
  .header {
    ...;
  }
  .hero {
    ...;
  }
</style>
```

### 骨架屏

```javascript
function Skeleton() {
  return (
    <div>
      <div className="skeleton-header"></div>
      <div className="skeleton-content"></div>
    </div>
  );
}
```

### 服务端渲染(SSR)

```javascript
// Next.js 示例
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

---

## 优化工具

### 性能分析

- **Lighthouse**：综合性能分析
- **WebPageTest**：详细性能测试
- **Chrome DevTools**：实时性能分析

### Bundle 分析

```javascript
// webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

---

## 总结

加载性能优化要点：

1. ✅ 代码分割，按需加载
2. ✅ 资源压缩（Gzip/Brotli）
3. ✅ 合理的缓存策略
4. ✅ 预加载关键资源
5. ✅ 优化首屏渲染
6. ✅ 使用性能工具监控
