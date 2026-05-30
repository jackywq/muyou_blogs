# Docker 部署项目

## 什么是 Docker

Docker 是一个开源的容器化平台，用于开发、交付和运行应用程序。

---

## 基础命令

### 镜像操作

```bash
docker images                # 查看本地镜像
docker pull nginx            # 拉取镜像
docker rmi image_name        # 删除镜像
docker build -t name:tag .   # 构建镜像
```

### 容器操作

```bash
docker ps                    # 查看运行中的容器
docker ps -a                 # 查看所有容器
docker run -d -p 80:80 nginx # 运行容器
docker stop container_id     # 停止容器
docker start container_id    # 启动容器
docker rm container_id       # 删除容器
docker logs container_id     # 查看日志
docker exec -it id /bin/bash # 进入容器
```

---

## Dockerfile 示例

### Node.js 应用

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Nginx 静态文件

```dockerfile
FROM nginx:alpine

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## Docker Compose

### 基础配置

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production

  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
    depends_on:
      - web
```

### 常用命令

```bash
docker-compose up -d         # 后台启动
docker-compose down          # 停止并删除
docker-compose logs -f       # 查看日志
docker-compose restart       # 重启服务
```

---

## 多阶段构建

### 优化镜像大小

```dockerfile
# 构建阶段
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 网络配置

### 端口映射

```bash
docker run -p 8080:80 nginx
# 主机8080端口 -> 容器80端口
```

### 数据卷

```bash
docker run -v /host/path:/container/path image
# 挂载数据卷
```

---

## 最佳实践

### 1. 镜像优化

- 使用 Alpine 基础镜像
- 多阶段构建
- 合并 RUN 命令
- .dockerignore 文件

### 2. 安全实践

- 不要以 root 用户运行
- 定期更新基础镜像
- 扫描镜像漏洞

### 3. 日志管理

- 输出到 stdout/stderr
- 使用日志驱动
- 日志轮转

---

## 常用镜像

| 镜像     | 说明           |
| -------- | -------------- |
| nginx    | Web 服务器     |
| node     | Node.js 运行时 |
| mysql    | MySQL 数据库   |
| redis    | Redis 缓存     |
| mongo    | MongoDB        |
| postgres | PostgreSQL     |

---

## 实战部署流程

### 1. 准备 Dockerfile

创建适合你项目的 Dockerfile

### 2. 构建镜像

```bash
docker build -t myapp:v1 .
```

### 3. 测试运行

```bash
docker run -d -p 3000:3000 myapp:v1
```

### 4. 使用 Compose 管理

```bash
docker-compose up -d
```
