# Leetcode

## 算法刷题记录

---

## 刷题进度

- [ ] 已完成：0 / 100 题
- [ ] 简单题：0
- [ ] 中等题：0
- [ ] 困难题：0

---

## 数据结构

### 数组

- 双指针技巧
- 滑动窗口
- 前缀和

### 链表

- 快慢指针
- 链表反转
- 合并链表

### 栈与队列

- 单调栈
- 优先队列
- 括号匹配

### 哈希表

- 哈希冲突
- 前缀哈希
- LRU 缓存

---

## 算法类型

### 排序

```javascript
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

### 搜索

- 二分查找
- BFS / DFS
- 回溯算法

### 动态规划

```javascript
// 斐波那契
function fib(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
```

### 贪心算法

- 局部最优
- 全局最优
- 区间覆盖

---

## 高频题目

### 数组类

1. [两数之和](https://leetcode.cn/problems/two-sum/)
2. [三数之和](https://leetcode.cn/problems/3sum/)
3. [接雨水](https://leetcode.cn/problems/trapping-rain-water/)
4. [最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

### 链表类

1. [反转链表](https://leetcode.cn/problems/reverse-linked-list/)
2. [合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)
3. [环形链表](https://leetcode.cn/problems/linked-list-cycle/)

### 树类

1. [二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
2. [二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
3. [对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

### 动态规划

1. [爬楼梯](https://leetcode.cn/problems/climbing-stairs/)
2. [最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
3. [最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)

---

## 学习方法

### 1. 按分类刷题

- 先掌握常见数据结构
- 按题型分类练习
- 总结通用模板

### 2. 循序渐进

- 先简单，后中等
- 困难题量力而行
- 重复刷经典题

### 3. 解题思路

- 理解题目要求
- 想暴力解法
- 寻找优化空间
- 编写并测试代码
- 查看优秀题解

---

## 时间复杂度速查

| 算法     | 时间复杂度 |
| -------- | ---------- |
| 二分查找 | O(log n)   |
| 快速排序 | O(n log n) |
| 归并排序 | O(n log n) |
| 冒泡排序 | O(n²)      |
| 选择排序 | O(n²)      |
| 插入排序 | O(n²)      |

---

## 空间复杂度速查

| 操作     | 空间复杂度 |
| -------- | ---------- |
| 递归深度 | O(n)       |
| 数组存储 | O(n)       |
| 哈希表   | O(n)       |
| 栈/队列  | O(n)       |

---

## 刷题计划

### 第 1 周 - 数组与链表

- 两数之和
- 反转链表
- 合并两个有序链表

### 第 2 周 - 栈与队列

- 有效的括号
- 最小栈
- 用栈实现队列

### 第 3 周 - 树

- 二叉树的最大深度
- 二叉树的前中后序遍历
- 对称二叉树

### 第 4 周 - 动态规划

- 爬楼梯
- 最大子数组和
- 最长递增子序列
