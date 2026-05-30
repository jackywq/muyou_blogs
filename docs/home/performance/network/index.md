# 网络优化

## HTTP 优化

### HTTP/1.1 问题

- 队头阻塞
- 连接数限制
- Header 未压缩

### HTTP/2 优势

- 二进制分帧
- 多路复用
- Header 压缩
- 服务器推送

```nginx
# Nginx配置
server {
  listen 443 ssl http2;
}
```

### HTTP/3 特性

- 基于 QUIC
- 更快的握手
- 连接迁移

---

## DNS 优化

### DNS 预解析

```html
<link rel="dns-prefetch" href="//api.example.com" />
<link rel="dns-prefetch" href="//cdn.example.com" />
```

### 减少 DNS 查询

- 减少域名数量
- 使用 CDN 统一域名
- 合理使用子域名

---

## CDN 加速

### CDN 工作原理

1. 用户请求资源
2. DNS 解析到最近的 CDN 节点
3. CDN 节点有缓存直接返回
4. 没有缓存则回源

### CDN 配置

```javascript
// webpack配置
output: {
  publicPath: 'https://cdn.example.com/';
}
```

### 常用 CDN

- 阿里云 CDN
- 腾讯云 CDN
- Cloudflare
- Fastly

---

## 减少 HTTP 请求

### 资源合并

```javascript
// webpack配置
entry: {
  main: './src/main.js',
  vendor: ['react', 'react-dom']
}
```

### CSS Sprite

```css
.icon {
  background: url(sprite.png) no-repeat;
}
.icon-home {
  background-position: 0 0;
}
```

### 内联小资源

```html
<script>
  // 内联关键JS
</script>
<style>
  /* 内联关键CSS */
</style>
```

---

## 请求优化

### GET vs POST

- **GET**：获取数据，可缓存
- **POST**：提交数据，不可缓存

### 请求合并

```javascript
// ❌ 多次请求
fetch('/api/user/1');
fetch('/api/user/2');
fetch('/api/user/3');

// ✅ 合并请求
fetch('/api/users?ids=1,2,3');
```

### 数据缓存

```javascript
// 使用localStorage缓存
const cacheKey = 'api-data';
let data = localStorage.getItem(cacheKey);
if (!data) {
  data = await fetch('/api/data');
  localStorage.setItem(cacheKey, data);
}
```

---

## 连接优化

### 预连接

```html
<link rel="preconnect" href="https://api.example.com" />
<link rel="preconnect" href="https://cdn.example.com" />
```

### 持久连接

```http
Connection: keep-alive
Keep-Alive: timeout=5, max=100
```

---

## 压缩优化

### Gzip

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
gzip_comp_level 6;
```

### Brotli

```nginx
brotli on;
brotli_types text/plain text/css application/json application/javascript;
brotli_comp_level 6;
```

### 对比

| 压缩方式 | 压缩率 | 速度 |
| -------- | ------ | ---- |
| Gzip     | 中等   | 快   |
| Brotli   | 更高   | 稍慢 |

---

## 图片优化

见 [图片优化](/home/performance/images) 章节

---

## 缓存策略

### 强缓存

```http
Cache-Control: public, max-age=31536000
Expires: Tue, 10 May 2027 10:00:00 GMT
```

### 协商缓存

```http
ETag: "abc123"
Last-Modified: Tue, 10 May 2026 10:00:00 GMT

If-None-Match: "abc123"
If-Modified-Since: Tue, 10 May 2026 10:00:00 GMT
```

### Service Worker

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
```

---

## API 优化

### 数据按需加载

```javascript
// ❌ 加载所有数据
const data = await fetch('/api/all-data');

// ✅ 分页加载
const page1 = await fetch('/api/data?page=1&pageSize=20');
const page2 = await fetch('/api/data?page=2&pageSize=20');
```

### 字段筛选

```javascript
// 只请求需要的字段
const data = await fetch('/api/user?fields=id,name,avatar');
```

---

## 总结

网络优化要点：

1. ✅ 使用 HTTP/2 或 HTTP/3
2. ✅ DNS 预解析
3. ✅ CDN 加速
4. ✅ 减少 HTTP 请求
5. ✅ 请求合并与缓存
6. ✅ 启用 Gzip/Brotli 压缩
7. ✅ 合理的缓存策略
