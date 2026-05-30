# 前端工程化系列面试题

## 工程化概述

### 什么是前端工程化

前端工程化是指将工程化的思想应用到前端开发中，通过规范化、标准化、自动化的手段，提升开发效率、代码质量和团队协作能力。

### 前端工程化的主要内容

- **模块化**：将代码拆分为独立的模块
- **组件化**：将 UI 拆分为可复用的组件
- **规范化**：代码规范、工作流程规范
- **自动化**：构建、测试、部署自动化

---

## 代码规范

### ESLint

ESLint 是一个 JavaScript/TypeScript 代码检查工具。

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
};
```

### Prettier

Prettier 是一个代码格式化工具。

```javascript
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### EditorConfig

EditorConfig 用于统一编辑器配置。

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

### Git Hooks

```bash
# .git/hooks/pre-commit
npm run lint
```

或使用 Husky：

```bash
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

---

## 构建工具

### 主流构建工具对比

| 工具    | 特点               | 适用场景     |
| ------- | ------------------ | ------------ |
| Webpack | 功能强大，生态丰富 | 大型复杂项目 |
| Vite    | 速度快，开箱即用   | 新项目推荐   |
| Rollup  | Tree Shaking 强大  | 库开发       |
| Parcel  | 零配置             | 快速原型开发 |

### Vite 配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

---

## CI/CD

### 什么是 CI/CD

- **CI**（Continuous Integration）：持续集成
- **CD**（Continuous Deployment）：持续部署

### GitHub Actions 示例

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 代码质量

### 单元测试

```javascript
// 示例：使用Jest
import { sum } from './math';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// React组件测试
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### E2E 测试

```javascript
// 示例：使用Playwright
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});
```

### 覆盖率

```bash
# package.json
{
  "scripts": {
    "test:coverage": "jest --coverage"
  }
}
```

---

## 版本管理

### 语义化版本

```
主版本号.次版本号.修订号

- 主版本号：不兼容的API修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正
```

### npm package 发布

```bash
npm login
npm publish
```

---

## 性能优化

### 前端性能指标

- **FCP**（First Contentful Paint）：首次内容绘制
- **LCP**（Largest Contentful Paint）：最大内容绘制
- **FID**（First Input Delay）：首次输入延迟
- **CLS**（Cumulative Layout Shift）：累积布局偏移

### 优化策略

1. **加载性能**

   - 资源压缩
   - 代码分割
   - 懒加载
   - CDN 加速

2. **渲染性能**
   - 减少重绘和回流
   - 使用虚拟列表
   - Web Worker

---

## 包管理

### npm vs yarn vs pnpm

| 特性     | npm  | yarn | pnpm |
| -------- | ---- | ---- | ---- |
| 速度     | 一般 | 快   | 很快 |
| 缓存     | 支持 | 支持 | 更好 |
| 安全     | 一般 | 更好 | 更好 |
| 磁盘占用 | 高   | 高   | 低   |

### package.json 配置

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "A package",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx",
    "test": "jest"
  },
  "dependencies": {},
  "devDependencies": {},
  "peerDependencies": {}
}
```

---

## 工作流

### Git 工作流

1. **Git Flow**：主分支、开发分支、功能分支、发布分支、热修复分支
2. **GitHub Flow**：简单的分支策略，主分支保持可发布状态
3. **Trunk Based**：频繁合并到主干

### 代码审查

- Pull Request / Merge Request
- 代码审查清单
- 自动化检查

---

## 文档化

### README.md

```markdown
# 项目名称

## 介绍

项目简介

## 安装

\`\`\`bash npm install \`\`\`

## 使用

\`\`\`javascript import { foo } from 'package'; \`\`\`

## 贡献

PR Welcome!

## License

MIT
```

### API 文档

- JSDoc
- TypeDoc
- Swagger

---

## 安全性

### XSS 防护

- 内容转义
- Content Security Policy (CSP)
- 使用 DOMPurify

### CSRF 防护

- CSRF Token
- SameSite Cookie
- 验证 Referer

### 依赖安全

```bash
npm audit
npm audit fix
```

使用 Snyk 或 Dependabot 监控依赖安全。

---

## 最佳实践

### 1. 规范先行

- 代码规范
- 提交规范
- 文档规范

### 2. 自动化

- 构建自动化
- 测试自动化
- 部署自动化

### 3. 持续改进

- 定期审查流程
- 引入新工具
- 技术债务管理
