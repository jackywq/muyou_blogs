# CSS 系列面试题

## CSS 选择器

### 选择器类型

- **id 选择器**：`#id`
- **class 选择器**：`.class`
- **标签选择器**：`div`
- **属性选择器**：`[attr=value]`
- **伪类选择器**：`:hover`, `:active`, `:focus`, `:nth-child()`
- **伪元素选择器**：`::before`, `::after`, `::first-line`, `::first-letter`
- **后代选择器**：`div p`
- **子选择器**：`div > p`
- **相邻兄弟选择器**：`div + p`
- **通用兄弟选择器**：`div ~ p`

### 选择器优先级

```
!important > 内联样式 > id选择器 > class/属性/伪类选择器 > 标签/伪元素选择器
```

### 计算规则

- **!important**：无穷大
- **内联样式**：1000
- **id 选择器**：100
- **class/属性/伪类**：10
- **标签/伪元素**：1

---

## 盒模型

### 标准盒模型和 IE 盒模型

```css
/* 标准盒模型 */
box-sizing: content-box;
/* width = content */

/* IE盒模型 */
box-sizing: border-box;
/* width = content + padding + border */
```

### 盒模型计算

- **标准盒模型**：总宽度 = width + padding + border + margin
- **IE 盒模型**：总宽度 = width + margin（width 包含 content+padding+border）

---

## 居中布局

### 水平居中

```css
/* 块级元素 */
margin: 0 auto;

/* 行内元素 */
text-align: center;

/* 绝对定位 */
position: absolute;
left: 50%;
transform: translateX(-50%);

/* flex */
display: flex;
justify-content: center;
```

### 垂直居中

```css
/* 行内元素 */
line-height: height;

/* 绝对定位 */
position: absolute;
top: 50%;
transform: translateY(-50%);

/* flex */
display: flex;
align-items: center;

/* table */
display: table-cell;
vertical-align: middle;
```

### 水平垂直居中

```css
/* flex */
display: flex;
justify-content: center;
align-items: center;

/* 绝对定位 + margin */
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;

/* 绝对定位 + transform */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

/* grid */
display: grid;
place-items: center;
```

---

## Flex 布局

### 容器属性

```css
.container {
  display: flex;
  flex-direction: row; /* row | row-reverse | column | column-reverse */
  flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */
  align-content: flex-start; ; /* flex-s
  align-items: stretch; ween | space-around */
  align-items: stretch; /* stretch
  justify-content: flex-start; d | baseline */
  align-content: flex-start; /* 多轴线对齐 */
}
```

### 子项属性

```css
.item {
  flex: 0 1 auto; /* flex-grow flex-shrink flex-basis */
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 1;
  align-self: auto; self: auto; /* auto | flex-start | center | flex-end
  order: 0;
}
```

---

## Grid 布局

### 容器属性

```css
.container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
```

### 子项属性

```css
.item {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  align-self: center;
  justify-self: center;
}
```

---

## 定位

### position 属性

```css
/* 静态定位（默认） */
position: static;

/* 相对定位 */
position: relative;
/* 相对于自身原来位置 */

/* 绝对定位 */
position: absolute;
/* 相对于最近的非static定位的祖先元素 */

/* 固定定位 */
position: fixed;
/* 相对于视口 */

/* 粘性定位 */
position: sticky;
/* 相对滚动位置 */
```

---

## BFC

### 什么是 BFC

BFC（Block Formatting Context）块级格式化上下文，是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

### 如何创建 BFC

- `overflow: hidden/auto/scroll`
- `float: left/right`
- `display: inline-block/flex/grid`
- `position: absolute/fixed`

### BFC 的作用

1. 清除浮动
2. 阻止外边距折叠
3. 阻止元素被浮动元素覆盖

---

## 浮动和清除

### 浮动

```css
.float {
  float: left; /* left | right | none */
}
```

### 清除浮动

```css
/* 方法1：clearfix */
.clearfix::after {
  display: block;
  clear: both;
  content: '';
}

/* 方法2：overflow */
.parent {
  overflow: hidden;
}

/* 方法3：创建BFC */
.parent {
  display: flow-root;
}
```

---

## CSS 变量

### 定义和使用

```css
:root {
  --primary-color: #007bff;
  --font-size: 16px;
}

.element {
  color: var(--primary-color);
  font-size: var(--font-size);
}
```

---

## 响应式设计

### 媒体查询

```css
/* 移动优先 */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

/* Desktop优先 */
.container {
  width: 1170px;
}

@media (max-width: 992px) {
  .container {
    width: 970px;
  }
}
```

### rem 和 vw/vh

```css
html {
  font-size: 16px;
}

/* 使用rem */
.element {
  width: 10rem; /* 160px */
}

/* 使用vw/vh */
.element {
  width: 50vw; /* 视口宽度的50% */
  height: 50vh; /* 视口高度的50% */
}
```

---

## 性能优化

### CSS 优化

1. 避免通配符选择器
2. 避免过度使用层级选择器
3. 使用简写属性
4. 避免使用!important
5. 使用 transform 和 opacity 做动画（触发 GPU 加速）
6. 减少重绘和回流

### 减少重绘和回流

- 使用`transform`代替`left/top`
- 使用`opacity`代替`visibility`
- 避免频繁操作 DOM
- 使用`requestAnimationFrame`
- 对频繁重绘的元素使用`will-change`

---

## CSS3 新特性

### 过渡

```css
.transition {
  transition: all 0.3s ease;
  transition: property duration timing-function delay;
}
```

### 动画

```css
@keyframes example {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}

.animation {
  animation: example 1s ease infinite;
}
```

### 阴影

```css
.box-shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
```

### 渐变

```css
.linear-gradient {
  background: linear-gradient(to right, red, blue);
}

.radial-gradient {
  background: radial-gradient(circle, red, blue);
}
```

---

## CSS 预处理器

### Sass/Less

```scss
// 变量
$primary-color: #007bff;

// 嵌套
.container {
  .item {
    color: $primary-color;
  }
}

// 混合
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 继承
.error {
  color: red;
}

.danger {
  @extend .error;
  border: 1px solid red;
}
```
