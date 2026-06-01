# HTTP 方法

| 方法 | 说明 | 幂等 |
|------|------|------|
| `GET` | 获取资源 | ✅ |
| `POST` | 创建资源 | ❌ |
| `PUT` | 更新资源（完整替换） | ✅ |
| `PATCH` | 更新资源（部分更新） | ❌ |
| `DELETE` | 删除资源 | ✅ |
| `HEAD` | 获取头部 | ✅ |
| `OPTIONS` | 获取支持的方法 | ✅ |

---

## 2. HTTP 状态码

| 分类 | 说明 |
|------|------|
| `1xx` | 信息响应 |
| `2xx` | 成功 |
| `3xx` | 重定向 |
| `4xx` | 客户端错误 |
| `5xx` | 服务端错误 |

### 常见状态码

| 状态码 | 说明 |
|--------|------|
| `200 OK` | 请求成功 |
| `201 Created` | 创建成功 |
| `301 Moved Permanently` | 永久重定向 |
| `302 Found` | 临时重定向 |
| `304 Not Modified` | 资源未修改，使用缓存 |
| `400 Bad Request` | 客户端请求错误 |
| `401 Unauthorized` | 未授权 |
| `403 Forbidden` | 禁止访问 |
| `404 Not Found` | 资源不存在 |
| `500 Internal Server Error` | 服务器内部错误 |
| `502 Bad Gateway` | 网关错误 |
| `503 Service Unavailable` | 服务不可用 |

---

## 3. HTTP 和 HTTPS 的区别

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 安全性 | 明文传输，不安全 | TLS/SSL 加密，安全 |
| 端口 | 80 | 443 |
| 证书 | 不需要 | 需要 CA 证书 |
| 性能 | 稍快 | 稍慢（需要加密解密） |

### HTTPS 工作流程

1. 客户端发起 HTTPS 请求
2. 服务器返回公钥证书
3. 客户端验证证书
4. 客户端生成随机密钥，用公钥加密发给服务器
5. 服务器用私钥解密，得到密钥
6. 双方使用对称密钥加密通信

---

## 4. HTTP 缓存

### 强制缓存
| 头字段 | 说明 |
|--------|------|
| `Expires` | 过期时间（绝对时间，有问题） |
| `Cache-Control` | 缓存控制（相对时间，推荐） |

```
Cache-Control: max-age=3600
Cache-Control: no-cache  // 协商缓存
Cache-Control: no-store  // 不缓存
```

### 协商缓存
| 头字段 | 说明 |
|--------|------|
| `Last-Modified` / `If-Modified-Since` | 最后修改时间 |
| `ETag` / `If-None-Match` | 资源标识（优先级更高） |

### 缓存流程
1. 浏览器请求资源
2. 检查强制缓存是否命中 → 命中则直接使用
3. 未命中则发起请求，检查协商缓存
4. 协商缓存命中则返回 304，使用缓存
5. 否则返回新资源

---

## 5. Cookie 和 Session

| 特性 | Cookie | Session |
|------|--------|---------|
| 存储位置 | 客户端 | 服务端 |
| 容量 | 约 4KB | 无限制 |
| 安全性 | 相对低 | 相对高 |
| 存储内容 | 字符串 | 任意类型 |

### Cookie 属性
```
Set-Cookie: name=value; Expires=Date; Max-Age=seconds; Domain=domain; Path=path; Secure; HttpOnly; SameSite=Strict
```

---

## 6. 跨域

### 同源策略
协议、域名、端口，三者必须一致。

### 解决跨域的方法

1. **CORS**（推荐）
```javascript
// 服务端设置
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

2. **JSONP**（只支持 GET）
```html
<script src="http://api.com/data?callback=handleData"></script>
<script>
function handleData(data) {
  console.log(data);
}
</script>
```

3. **代理**（Nginx / webpack devServer）
```nginx
location /api {
  proxy_pass http://backend.com;
}
```

4. **postMessage**
5. **WebSocket**
6. **document.domain**

---

## 7. HTTP/1.1 vs HTTP/2 vs HTTP/3

| 特性 | HTTP/1.1 | HTTP/2 | HTTP/3 |
|------|----------|--------|--------|
| 协议 | 文本 | 二进制 | UDP (QUIC) |
| 多路复用 | ❌ | ✅ | ✅ |
| 头部压缩 | ❌ | ✅ HPACK | ✅ QPACK |
| 服务端推送 | ❌ | ✅ | - |
| 队头阻塞 | ✅ | ❌ | ❌ |
