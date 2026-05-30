# 微前端系列面试题

## 微前端概述

### 什么是微前端

微前端是一种将前端应用拆分为更小、更易管理的独立模块的架构风格，每个模块可以独立开发、测试和部署。

### 微前端的核心思想

- **独立开发和部署**：每个子应用独立开发部署
- **技术栈无关**：可以使用不同技术栈
- **独立运行时**：子应用之间隔离运行
- **增量升级**：可以逐步迁移旧项目

---

## 微前端方案对比

### 主流方案

| 方案                  | 优势                   | 劣势             | 适用场景     |
| --------------------- | ---------------------- | ---------------- | ------------ |
| **iframe**            | 实现简单，隔离性好     | 通信复杂，体验差 | 简单集成     |
| **qiankun**           | 完整解决方案，社区活跃 | 学习成本高       | 大型复杂项目 |
| **Module Federation** | Webpack5 原生，灵活    | 需要统一构建     | Webpack 项目 |
| **Single SPA**        | 框架无关，成熟         | 配置复杂         | 多框架共存   |

---

## qiankun

### 快速开始

```bash
# 安装
npm install qiankun
```

### 主应用配置

```javascript
import { registerMicroApps, start } from 'qiankun';

// 注册子应用
registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:3001',
    container: '#container',
    activeRule: '/app1',
  },
  {
    name: 'app2',
    entry: '//localhost:3002',
    container: '#container',
    activeRule: '/app2',
  },
]);

// 启动
start();
```

### 子应用配置

```javascript
// public-path.js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// main.js
import './public-path';
import { createApp } from 'vue';
import App from './App.vue';

let app = null;

function render(props = {}) {
  const { container } = props;
  app = createApp(App);
  app.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出生命周期
export async function bootstrap() {
  console.log('app1 bootstraped');
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  app?.unmount();
}
```

### 通信机制

```javascript
import { initGlobalState } from 'qiankun';

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: null,
});

// 监听变化
onGlobalStateChange((state, prev) => {
  console.log('state:', state, prev);
});

// 更新状态
setGlobalState({
  user: { name: '张三' },
});
```

---

## Module Federation

### 配置示例

```javascript
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
};
```

### 使用远程模块

```javascript
// 主应用中
import { lazy, Suspense } from 'react';

const RemoteButton = lazy(() => import('app1/Button'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteButton />
    </Suspense>
  );
}
```

---

## Single SPA

### 配置示例

```javascript
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'app1',
  app: () => import('./app1'),
  activeWhen: ['/app1'],
});

start();
```

---

## 样式隔离

### 方案一：CSS Module

```css
/* button.module.css */
.button {
  color: red;
}
```

### 方案二：Scoped CSS

Vue scoped 或 CSS-in-JS

```javascript
import styled from 'styled-components';

const Button = styled.button`
  color: red;
`;
```

### 方案三：Shadow DOM

```javascript
const shadow = element.attachShadow({ mode: 'open' });
shadow.innerHTML = '<style>...</style>';
```

---

## 应用间通信

### 方案一：Props

```javascript
// 主应用传递props
registerMicroApps([
  {
    name: 'app1',
    props: {
      sharedData: { foo: 'bar' },
    },
  },
]);

// 子应用接收
function mount(props) {
  console.log(props.sharedData);
}
```

### 方案二：EventBus

```javascript
// 主应用
import EventBus from './EventBus';

EventBus.emit('message', { data: 'hello' });

// 子应用
EventBus.on('message', (data) => {
  console.log(data);
});
```

### 方案三：Global State

```javascript
const state = {
  user: null,
  listeners: [],
};

export function setState(newState) {
  Object.assign(state, newState);
  state.listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  state.listeners.push(fn);
  return () => {
    state.listeners = state.listeners.filter((l) => l !== fn);
  };
}
```

---

## 路由管理

### 主应用路由

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app1/*" element={<MicroApp name="app1" />} />
        <Route path="/app2/*" element={<MicroApp name="app2" />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 子应用路由

```javascript
// 子应用路由配置
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();

  const handleNavigate = () => {
    if (window.__POWERED_BY_QIANKUN__) {
      // 在qiankun环境中使用主应用路由
    } else {
      history.push('/path');
    }
  };
}
```

---

## 性能优化

### 资源预加载

```javascript
// 预加载子应用资源
function preloadMicroApp(app) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = app.entry;
  document.head.appendChild(link);
}
```

### 按需加载

```javascript
// 按需加载子应用
const { loadMicroApp } = require('qiankun');

// 需要时才加载
loadMicroApp({
  name: 'app1',
  entry: '//localhost:3001',
  container: '#container',
});
```

### 共享依赖

```javascript
// webpack.config.js
externals: {
  react: 'React',
  'react-dom': 'ReactDOM'
}
```

---

## 常见问题

### 样式隔离

- 使用 CSS Module、Scoped CSS
- 使用 PostCSS 前缀处理
- 使用 Shadow DOM

### 跨域问题

- 配置 CORS
- 使用代理
- 同域部署

### 资源加载

- 配置 publicPath
- 使用相对路径
- CDN 部署

### 状态同步

- 使用全局状态管理
- 事件通信
- Props 传递

---

## 最佳实践

### 1. 合理划分应用

- 按业务域划分
- 避免过细或过粗
- 保持独立部署能力

### 2. 统一开发规范

- 代码规范
- 接口规范
- 组件规范

### 3. 监控和调试

- 错误监控
- 性能监控
- 日志系统

### 4. 测试策略

- 单元测试
- 集成测试
- E2E 测试

---

## 未来趋势

1. **Web Components**：原生组件化
2. **WASM**：性能优化
3. **Edge Computing**：边缘计算
4. **AI 辅助**：智能开发
