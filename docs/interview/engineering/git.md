# Git 常用命令

### 基础命令
```bash
git init                    # 初始化仓库
git clone <url>             # 克隆远程仓库
git status                  # 查看状态
git add .                   # 添加所有文件
git add <file>              # 添加指定文件
git commit -m "message"     # 提交
git push                    # 推送到远程
git pull                    # 拉取远程代码
git fetch                   # 获取远程更新但不合并
```

### 分支命令
```bash
git branch                  # 查看分支
git branch <name>           # 创建分支
git checkout <name>         # 切换分支
git checkout -b <name>      # 创建并切换分支
git merge <name>            # 合并分支
git branch -d <name>        # 删除分支
```

### 查看历史
```bash
git log                     # 查看提交历史
git log --oneline           # 简洁查看
git reflog                  # 查看所有操作历史
```

### 撤销与回退
```bash
git reset --soft <commit>   # 回退，保留修改
git reset --hard <commit>   # 回退，丢弃修改
git checkout -- <file>      # 撤销工作区修改
git stash                   # 暂存修改
git stash pop               # 恢复暂存
```

---

## 2. Git 工作区、暂存区、版本库

```
工作区 → git add → 暂存区 → git commit → 版本库
```

- **工作区**：你看到的文件夹
- **暂存区**：`.git/index`，临时保存改动
- **版本库**：`.git`，保存所有历史

---

## 3. Git Flow 工作流

| 分支 | 说明 |
|------|------|
| `master` | 主分支，稳定可发布 |
| `develop` | 开发分支 |
| `feature/*` | 功能分支 |
| `release/*` | 发布分支 |
| `hotfix/*` | 热修复分支 |

### 工作流程
1. 从 `develop` 创建 `feature` 分支开发功能
2. 功能完成后合并回 `develop`
3. 从 `develop` 创建 `release` 分支准备发布
4. 发布后合并回 `master` 和 `develop`
5. 紧急修复从 `master` 创建 `hotfix`，修复后合并回 `master` 和 `develop`

---

## 4. 其他工作流

### GitHub Flow
更简单的工作流：
1. 从 `main` 创建分支
2. 提交更改
3. 发起 Pull Request
4. 代码审查
5. 合并到 `main`
6. 部署

### GitLab Flow
基于 GitHub Flow，增加了环境分支（如 `staging`、`production`）

---

## 5. Git 合并策略

### merge vs rebase

| 特性 | merge | rebase |
|------|-------|--------|
| 历史 | 保留完整历史，有 merge 节点 | 线性历史，更清晰 |
| 适用场景 | 公共分支 | 个人分支 |
| 风险 | 低 | 高（不要 rebase 公共分支） |

```bash
git merge dev    # 合并，保留历史
git rebase dev   # 变基，线性历史
```

---

## 6. Git 常见问题

### 场景 1：提交信息写错了
```bash
git commit --amend -m "新的提交信息"
```

### 场景 2：把不该提交的文件提交了
```bash
git reset --soft HEAD~1  # 回退到上一次，保留修改
# 然后重新 add 和 commit
```

### 场景 3：合并冲突
```bash
# 1. 打开冲突文件，手动修改
# 2. git add 冲突文件
# 3. git commit
```

### 场景 4：后悔 push 了
```bash
git reset --hard <commit>
git push --force
# 注意：会覆盖远程记录，谨慎使用！
```
