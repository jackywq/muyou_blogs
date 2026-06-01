# 为什么需要 Composition API？

Options API 的问题：
- 相关逻辑分散在不同选项（data、methods、computed）中
- 代码复用困难（mixins 容易命名冲突）
- TypeScript 支持不够友好

Composition API 的优势：
- 相关逻辑聚合在一起
- 更好的代码复用（自定义 Hook）
- 更好的 TypeScript 支持

---

## 2. 常用 Composition API

### `ref` - 基本类型响应式
```vue
<script setup>
import { ref } from "vue";

const count = ref(0); // 返回 Ref 对象

const increment = () => {
  count.value++; // .value 访问值
};
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

### `reactive` - 对象类型响应式
```vue
<script setup>
import { reactive } from "vue";

const state = reactive({
  name: "Vue",
  age: 20,
});

const updateName = () => {
  state.name = "Vue3"; // 不需要 .value
};
</script>

<template>
  <div>{{ state.name }}</div>
</template>
```

### `computed` - 计算属性
```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("张");
const lastName = ref("三");

const fullName = computed(() => {
  return firstName.value + lastName.value;
});
</script>
```

### `watch` - 监听单个数据
```vue
<script setup>
import { ref, watch } from "vue";

const count = ref(0);

watch(count, (newVal, oldVal) => {
  console.log(`从 ${oldVal} 变成 ${newVal}`);
});
</script>
```

### `watchEffect` - 自动监听依赖
```vue
<script setup>
import { ref, watchEffect } from "vue";

const count = ref(0);

watchEffect(() => {
  console.log("count 变成了", count.value); // 自动追踪 count
});
</script>
```

### `toRef` / `toRefs` - 解构保持响应式
```vue
<script setup>
import { reactive, toRef, toRefs } from "vue";

const state = reactive({ name: "Vue", age: 20 });

// toRef：单个属性
const name = toRef(state, "name");

// toRefs：所有属性
const { age } = toRefs(state);
</script>
```

---

## 3. 自定义 Hook

```js
// useCounter.js
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initialValue);

  return { count, increment, decrement, reset };
}
```

```vue
<!-- 使用 -->
<script setup>
import { useCounter } from "./useCounter";

const { count, increment, decrement, reset } = useCounter(10);
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="reset">重置</button>
</template>
```
