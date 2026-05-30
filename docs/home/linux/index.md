# Linux 技术大全

## 文件目录操作

### 基本命令

```bash
ls -la                    # 查看目录详细信息
pwd                       # 显示当前路径
cd /path/to/directory     # 切换目录
mkdir directory_name      # 创建目录
rm -rf file_or_directory  # 删除文件或目录
cp source target          # 复制文件
mv source target          # 移动/重命名文件
```

### 文件查找

```bash
find /path -name "*.js"   # 按名称查找
grep -r "text" /path      # 递归搜索文本内容
locate filename           # 快速定位文件
```

---

## 系统管理

### 进程管理

```bash
ps aux                    # 查看所有进程
top                       # 实时监控进程
kill -9 PID               # 强制终止进程
pkill process_name        # 按名称终止进程
```

### 系统信息

```bash
uname -a                  # 系统信息
df -h                     # 磁盘使用情况
free -h                   # 内存使用情况
uptime                    # 系统运行时间
```

---

## 网络相关

### 网络操作

```bash
ifconfig                  # 查看网络配置
ping host                 # 测试网络连通性
netstat -tuln            # 查看端口监听
curl url                  # 发送 HTTP 请求
wget url                 # 下载文件
```

### SSH 连接

```bash
ssh user@host            # 远程连接
scp file user@host:/path # 远程文件传输
```

---

## 权限管理

### 文件权限

```bash
chmod 755 file           # 修改文件权限
chown user:group file    # 修改文件所有者
chmod +x script.sh       # 添加执行权限
```

### 权限说明

- **r (4)** - 读权限
- **w (2)** - 写权限
- **x (1)** - 执行权限

---

## Shell 脚本

### 基础脚本示例

```bash
#!/bin/bash
echo "Hello, Linux!"

for i in {1..5}; do
  echo "Number: $i"
done
```

### 条件判断

```bash
if [ -f file.txt ]; then
  echo "文件存在"
fi
```

---

## 常用工具

### 文本处理

```bash
cat file.txt             # 查看文件内容
head -n 10 file.txt      # 查看前10行
tail -n 10 file.txt      # 查看后10行
wc -l file.txt           # 统计行数
```

### 压缩解压

```bash
tar -zxvf file.tar.gz    # 解压 tar.gz
zip -r archive.zip dir   # 压缩目录
unzip archive.zip        # 解压 zip
```

---

## 快捷键

| 快捷键 | 功能           |
| ------ | -------------- |
| Ctrl+C | 终止当前命令   |
| Ctrl+D | 退出当前 Shell |
| Ctrl+L | 清屏           |
| Ctrl+R | 搜索历史命令   |
| Tab    | 自动补全       |
