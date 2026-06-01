# Vue 2 生命周期

| 阶段 | 钩子函数 | 说明 |
|------|----------|------|
| 创建 | `beforeCreate` | 实例创建前，data、methods 还不能用 |
| 创建 | `created` | 实例创建完成，data、methods 已初始化 |
| 挂载 | `beforeMount` | 挂载前，模板编译完成但未挂载 |
| 挂载 | `mounted` | 挂载完成，DOM 已渲染 |
| 更新 | `beforeUpdate` | 数据更新前 |
| 更新 | `updated` | 数据更新后，DOM 已更新 |
| 卸载 | `beforeDestroy` | 实例销毁前 |
| 卸载 | `destroyed` | 实例销毁后 |

---

## 2. Vue 3 生命周期

| Vue 2 | Vue 3 | 说明 |
|-------|-------|------|
| `beforeCreate` | `setup()` | 组件创建前 |
| `created` | `setup()` | 组件创建完成 |
| `beforeMount` | `onBeforeMount` | 挂载前 |
| `mounted` | `onMounted` | 挂载完成 |
| `beforeUpdate` | `onBeforeUpdate` | 更新前 |
| `updated` | `onUpdated` | 更新后 |
| `beforeDestroy` | `onBeforeUnmount` | 卸载前 |
| `destroyed` | `onUnmounted` | 卸载后 |

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("组件已挂载");
});

onUnmounted(() => {
  console.log("组件已卸载");
});
</script>
```

---

## 3. 父子组件生命周期执行顺序

### 挂载
```
父 beforeCreate → 父 created → 父 beforeMount 
→ 子 beforeCreate → 子 created → 子 beforeMount → 子 mounted
→ 父 mounted
```

### 更新
```
父 beforeUpdate → 子 beforeUpdate → 子 updated → 父 updated
```

### 卸载
```
父 beforeUnmount → 子 beforeUnmount → 子 unmounted → 父 unmounted
```
