# CICD

## 什么是 CI/CD

**CI (Continuous Integration) - 持续集成 **CD (Continuous Deployment) - 持续部署

---

## GitHub Actions 入门

### 基础概念

- **Workflow** - 工作流，自动化流程
- **Jobs** - 任务，一个或多个步骤
- **Steps** - 步骤，执行具体命令
- **Actions** - 动作，可复用的单元

---

## 前端项目部署示例

### 基本工作流配置

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
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
        run: npm run docs:build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 常用 CI/CD 平台

### 1. GitHub Actions

- 与 GitHub 深度集成
- 免费额度充足
- YAML 配置简洁

### 2. GitLab CI

- 自托管选项
- 功能强大
- 与 GitLab 集成

### 3. Jenkins

- 高度可定制
- 插件生态丰富
- 适合复杂场景

---

## 最佳实践

### 1. 快速反馈

- 保持构建时间 < 10 分钟
- 并行化任务
- 缓存依赖

### 2. 安全实践

- 密钥管理
- 环境隔离
- 权限最小化

### 3. 部署策略

- 蓝绿部署
- 灰度发布
- 回滚机制

---

## 常用 Actions 示例

### 自动格式化检查

```yaml
name: Lint

on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run lint
```

### 自动运行测试

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm test
```

---

## 环境变量与 Secrets

### 使用 Secrets

在仓库设置中配置 Secrets，然后在 workflow 中引用：

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### 环境变量

```yaml
env:
  NODE_ENV: production
  DEBUG: false
```

---

## 工作流触发方式

| 触发事件          | 描述            |
| ----------------- | --------------- |
| push              | 代码推送时      |
| pull_request      | PR 创建或更新时 |
| schedule          | 定时触发        |
| release           | 发布时          |
| workflow_dispatch | 手动触发        |
