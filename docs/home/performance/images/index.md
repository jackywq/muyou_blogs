# 图片优化

## 图片格式选择

### JPEG

- 适用于照片、渐变图像
- 支持压缩，有损压缩
- 不支持透明度

```html
<img src="photo.jpg" alt="照片" />
```

### PNG

- 支持透明度
- 无损压缩
- 文件较大

```html
<img src="icon.png" alt="图标" />
```

### WebP

- 比 JPEG 更小（25-35%）
- 支持透明度
- 支持动画

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="回退" />
</picture>
```

### AVIF

- 比 WebP 更小（20%+）
- 最新格式

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="回退" />
</picture>
```

---

## 响应式图片

### srcset

```html
<img
  srcset="image-300.jpg 300w, image-600.jpg 600w, image-900.jpg 900w"
  sizes="(max-width: 600px) 300px,
         (max-width: 900px) 600px,
         900px"
  src="image-600.jpg"
  alt="响应式图片"
/>
```

### picture 元素

```html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg" />
  <source media="(min-width: 400px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="响应式" />
</picture>
```

---

## 图片懒加载

### 原生懒加载

```html
<img src="image.jpg" loading="lazy" alt="懒加载" />
<iframe src="video.html" loading="lazy"></iframe>
```

### Intersection Observer

```javascript
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imgObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach((img) => {
  imgObserver.observe(img);
});
```

### 使用示例

```html
<img data-src="image.jpg" alt="懒加载" />
```

---

## 占位图

### 低质量占位图（LQIP）

```html
<img src="placeholder-blur.jpg" data-src="full-quality.jpg" alt="占位" />
```

### SVG 占位

```html
<img src="data:image/svg+xml,..." data-src="image.jpg" alt="SVG占位" />
```

### 骨架屏

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

---

## 压缩工具

### 在线工具

- TinyPNG
- Squoosh
- ImageOptim

### 构建工具

```javascript
// imagemin
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['images/*.{jpg,png}'], {
  destination: 'build/images',
  plugins: [imageminPngquant({ quality: [0.6, 0.8] })],
});
```

### Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb内联
          },
        },
      },
    ],
  },
};
```

---

## 图片 CDN

### 自动格式转换

```html
<img src="https://cdn.example.com/image.jpg?format=webp" alt="CDN" />
```

### 自动尺寸调整

```html
<img src="https://cdn.example.com/image.jpg?w=300&h=200" alt="调整" />
```

### 质量控制

```html
<img src="https://cdn.example.com/image.jpg?quality=80" alt="质量" />
```

---

## 总结

图片优化要点：

1. ✅ 选择合适的图片格式（WebP/AVIF 优先）
2. ✅ 使用响应式图片
3. ✅ 实现图片懒加载
4. ✅ 使用占位图提升体验
5. ✅ 压缩图片文件大小
6. ✅ 使用图片 CDN
