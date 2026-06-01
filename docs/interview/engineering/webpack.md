# Webpack 核心概念

| 概念 | 说明 |
|------|------|
| `Entry` | 入口文件，Webpack 从这里开始打包 |
| `Output` | 输出配置，打包后文件存放位置 |
| `Loader` | 模块转换器，处理非 JS 文件 |
| `Plugin` | 插件，执行更广泛的任务 |
| `Mode` | 模式，`development` / `production` |

### 简单配置
```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js", // 入口
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "bundle.js", // 输出文件名
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.js$/, use: "babel-loader" },
    ],
  },
  plugins: [],
  mode: "development",
};
```

---

## 2. 常用 Loader

| Loader | 作用 |
|--------|------|
| `style-loader` | 将 CSS 插入到 style 标签 |
| `css-loader` | 处理 CSS 文件 |
| `less-loader` / `sass-loader` | 预处理 CSS |
| `babel-loader` | 转译 ES6+ |
| `file-loader` | 处理图片、字体等文件 |
| `url-loader` | 类似 file-loader，小文件转 base64 |

---

## 3. 常用 Plugin

| Plugin | 作用 |
|--------|------|
| `HtmlWebpackPlugin` | 自动生成 HTML 并引入打包后的 JS |
| `MiniCssExtractPlugin` | 提取 CSS 到单独文件 |
| `CleanWebpackPlugin` | 清理 dist 目录 |
| `DefinePlugin` | 注入全局常量 |
| `HotModuleReplacementPlugin` | 热更新 |

---

## 4. 模块打包流程

1. **解析入口**：找到入口文件
2. **构建依赖图**：递归找出所有依赖
3. **转换模块**：使用 Loader 转换文件
4. **生成 Chunk**：将模块分组
5. **输出文件**：生成最终的 Bundle

---

## 5. Tree Shaking

Tree Shaking 用于删除未使用的代码。

**前提条件**：
- 使用 ES6 模块化（import/export）
- `mode: "production"`

```javascript
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// main.js
import { add } from "./math.js";
console.log(add(1, 2));
// multiply 会被 Tree Shaking 掉
```

---

## 6. 代码分割

### 方式 1：入口分割
```javascript
entry: {
  main: "./src/main.js",
  vendor: "./src/vendor.js",
}
```

### 方式 2：动态 import
```javascript
button.onclick = () => {
  import("./module.js").then((module) => {
    module.doSomething();
  });
};
```

### 方式 3：SplitChunksPlugin
```javascript
optimization: {
  splitChunks: {
    chunks: "all",
  },
}
```

---

## 7. Webpack 热更新（HMR）原理

1. Webpack 监听文件变化，重新编译
2. 新模块通过 websocket 发送给浏览器
3. 浏览器接收更新，替换旧模块
4. 无需刷新页面，保持应用状态

---

## 8. 常见优化策略

- **代码分割**：按需加载
- **Tree Shaking**：删除无用代码
- **缓存**：利用 `cache-loader` 和文件哈希
- **多进程打包**：`thread-loader`
- **压缩**：`terser-webpack-plugin`、`css-minimizer-webpack-plugin`
- **CDN**：通过 `externals` 或 `publicPath`
