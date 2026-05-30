# Webpack 系列面试题

## Webpack 核心概念

### 核心概念

- **Entry**：入口，Webpack 构建的起点
- **Output**：输出，打包后的文件输出位置
- **Loader**：模块转换器，用于将非 JavaScript 文件转换为有效模块
- **Plugin**：插件，执行范围更广的任务（打包优化、资源管理、注入环境变量等）
- **Module**：模块，Webpack 中一切皆模块
- **Chunk**：代码块，一个 Chunk 由多个模块组成
- **Bundle**：打包后的输出文件

### 配置文件结构

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [],
  },
  plugins: [],
  mode: 'development', // development | production | none
};
```

---

## 常用 Loader

### Loader 的作用

Loader 用于对模块的源代码进行转换，可以在 import 或 "加载" 模块时预处理文件。

### 常用 Loader

```javascript
module: {
  rules: [
    // 处理js文件
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    // 处理css文件
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    // 处理less文件
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    },
    // 处理图片
    {
      test: /\.(png|jpg|gif)$/,
      type: 'asset/resource',
    },
    // 处理字体
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
    },
  ];
}
```

### Loader 执行顺序

```javascript
// 从右到左，从下到上
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader']
  // 先执行 postcss-loader，再 css-loader，最后 style-loader
}
```

---

## 常用 Plugin

### Plugin 的作用

Plugin 用于执行范围更广的任务，包括：打包优化、资源管理、注入环境变量等。

### 常用 Plugin

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    // 生成HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // 提取CSS到单独文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    // 清理输出目录
    new CleanWebpackPlugin(),
  ],
};
```

---

## 模块解析

### resolve 配置

```javascript
resolve: {
  // 模块别名
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  // 自动解析的扩展名
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  // 告诉webpack解析模块时应该搜索的目录
  modules: ['node_modules']
}
```

---

## 代码分割

### 为什么需要代码分割

- 避免重复依赖
- 并行加载资源
- 控制资源加载优先级

### 代码分割方式

```javascript
// 1. 多入口
module.exports = {
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js',
  },
};

// 2. 动态导入
import('./module').then((module) => {
  // 使用module
});

// 3. SplitChunksPlugin
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
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

## Tree Shaking

### Tree Shaking 是什么

Tree Shaking 是指移除 JavaScript 上下文中的未引用代码（dead-code）。

### 如何启用

```javascript
// mode: 'production' 自动启用
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
  },
};
```

### 需要注意的点

- 使用 ES6 模块语法（import/export）
- 确保没有 sideEffects，或在 package.json 中配置 sideEffects

---

## 热更新

### 配置

```javascript
const webpack = require('webpack');

module.exports = {
  devServer: {
    hot: true,
    port: 3000,
    open: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
```

### HMR 原理

1. 监听文件变化
2. 编译变化的模块
3. 通过 websocket 通知浏览器
4. 浏览器更新相应模块

---

## 构建优化

### 优化构建速度

```javascript
module.exports = {
  // 缓存loader处理结果
  cache: {
    type: 'filesystem',
  },
  // 多线程处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'thread-loader',
      },
    ],
  },
  // 缩小搜索范围
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
};
```

### 优化打包体积

```javascript
module.exports = {
  // 启用压缩
  optimization: {
    minimize: true,
  },
  // 代码分割
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  // Tree Shaking
  mode: 'production',
};
```

---

## Source Map

### Source Map 类型

```javascript
module.exports = {
  // 开发环境
  devtool: 'eval-cheap-module-source-map',
  // 生产环境
  devtool: 'source-map',
};
```

### 常用 Source Map 选项

| devtool                      | 构建速度 | 生产环境 | 说明                      |
| ---------------------------- | -------- | -------- | ------------------------- |
| eval                         | 很快     | 否       | 生成 eval 格式            |
| source-map                   | 慢       | 是       | 完整的 source map         |
| cheap-source-map             | 较快     | 否       | 忽略列信息                |
| cheap-module-source-map      | 较快     | 否       | 包含 loader 的 source map |
| eval-cheap-module-source-map | 很快     | 否       | 开发环境推荐              |

---

## Webpack5 新特性

### 新特性

1. **持久化缓存**：提升二次构建速度
2. **更好的 Tree Shaking**：更多优化
3. **模块联邦**：Module Federation
4. **新的资源模块**：取代 file-loader/url-loader
5. **更好的长期缓存**：contenthash
6. **优化的 SplitChunks**

### 资源模块

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource', // 发送一个单独的文件并导出 URL
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/inline', // 导出一个资源的 data URI
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
      {
        test: /\.txt$/,
        type: 'asset/source', // 导出资源的源代码
      },
      {
        test: /\.jpg$/,
        type: 'asset', // 在导出一个 data URI 和发送一个单独的文件之间自动选择
      },
    ],
  },
};
```

---

## 性能调优

### 优化建议

1. **缩小查找范围**：配置 `resolve.modules` 和 `resolve.extensions`
2. **使用缓存**：`cache: { type: 'filesystem' }`
3. **并行处理**：使用 `thread-loader` 或 `happypack`
4. **代码分割**：减少单文件体积
5. **合理使用 loader**：只处理必要的文件，exclude 不需要的
6. **DllPlugin**：预编译第三方库
7. **长期缓存**：使用 contenthash

---

## 常用工具

### webpack-dev-server

```javascript
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
```

### webpack-merge

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
});
```
