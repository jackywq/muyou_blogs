# 进阶

## 前端架构设计

### 组件设计原则

- 单一职责
- 开闭原则
- 依赖倒置
- 接口隔离

### 状态管理

- React Context
- Redux / MobX
- Zustand / Jotai
- Pinia / Vuex

---

## 性能优化

### 1. 渲染优化

```javascript
// React.memo - 避免不必要重渲染
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// useMemo - 缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback - 缓存函数
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 2. 资源加载

- 代码分割 Code Splitting
- 懒加载 Lazy Loading
- 图片优化
- 字体预加载

### 3. 网络优化

- 资源压缩
- CDN 加速
- HTTP/2
- 缓存策略

---

## 前端安全

### 常见攻击

1. **XSS - 跨站脚本攻击**

   - 输入过滤
   - 输出转义
   - Content Security Policy

2. **CSRF - 跨站请求伪造**

   - Token 验证
   - SameSite Cookie

3. **SQL 注入**

   - 参数化查询
   - ORM 框架

4. **点击劫持**
   - X-Frame-Options
   - frame-ancestors

---

## 前端工程化

### 构建工具

- Webpack
- Vite
- Rollup
- esbuild

### 代码质量

- ESLint 代码检查
- Prettier 格式化
- TypeScript 类型检查
- 单元测试 / E2E 测试

---

## 浏览器原理

### 渲染流程

1. HTML 解析构建 DOM 树
2. CSS 解析构建 CSSOM 树
3. 合并为 Render 树
4. 布局 Layout
5. 绘制 Paint
6. 合成 Composite

### 重绘与回流

- 回流：布局变化触发
- 重绘：样式变化触发
- 优化：避免频繁操作

---

## 性能监控

### Web Vitals

- **LCP** (Largest Contentful Paint) - 最大内容绘制
- **FID** (First Input Delay) - 首次输入延迟
- **CLS** (Cumulative Layout Shift) - 累积布局偏移

### 监控指标

- 页面加载时间
- API 响应时间
- 错误率
- 用户交互数据

---

## 前端测试

### 测试类型

- **单元测试** - 测试函数/组件
- **集成测试** - 测试模块间交互
- **E2E 测试** - 端到端用户流程

### 测试工具

- Jest / Vitest
- React Testing Library
- Cypress / Playwright
- Puppeteer

---

## 设计模式

### 常用模式

1. **单例模式** - 唯一实例
2. **工厂模式** - 创建对象
3. **观察者模式** - 事件监听
4. **策略模式** - 算法封装
5. **装饰器模式** - 功能增强
6. **适配器模式** - 接口转换

---

## 服务端渲染

### SSR 框架

- Next.js (React)
- Nuxt.js (Vue)
- SvelteKit

### 优势

- 更好的 SEO
- 更快的首屏加载
- 更好的用户体验

---

## 微前端

### 架构方案

- 单一 SPA
- Module Federation
- qiankun
- MicroApp

### 核心价值

- 独立部署
- 技术栈无关
- 增量升级

---

## 前沿技术

### Web3

- 区块链基础
- 智能合约
- DApp 开发

### WebAssembly

- 高性能计算
- 复杂应用
- 多语言支持

### AI 前端

- 机器学习应用
- 自然语言处理
- 计算机视觉

---

## 学习路径

### 第一阶段 - 基础

- JavaScript 深入
- DOM/BOM 原理
- CSS 高级技巧

### 第二阶段 - 框架

- React / Vue 原理
- 状态管理
- 路由原理

### 第三阶段 - 工程化

- 构建工具
- CI/CD
- 性能优化

### 第四阶段 - 架构

- 系统设计
- 团队协作
- 技术决策
