# Vue 系列面试题

## Vue2 核心原理

### vue2 双向数据绑定原理？

1. 是基于 Object.defineProperty 来实现的，将 data 数据属性转化为 getter/setter 形式
2. 当数据属性发生改变时，会自动触发 setter 方法，从而通知依赖该数据的地方进行更新
3. 当数据发生改变时，内部有一套 diff 算法，来遍历比较新旧树的节点，只对有改变的 DOM 元素的视图进行更新

### vue2 通信方式？

1. props:父组件传递数据到子组件
2. $emit: 子组件触发自定义事件，通知父组件
3. ref: 父组件直接访问子组件的属性和方法
4. eventBus 通信: 非关系组件间的轻量级通信

```javascript
// src/utils/eventBus.js
import Vue from 'vue';
// 创建空的Vue实例作为事件总线
export default new Vue();
```

```javascript
<template>
  <div class="sender">
    <h4>发送事件的组件</h4>
    <button @click="sendEvent">发送全局事件</button>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'
export default {
  methods: {
    sendEvent() {
      // 触发全局事件，可传递参数
      EventBus.$emit('global-event', '我是EventBus传递的消息', 666)
    }
  }
}
</script>
```

5. Vuex: 全局状态管理，适用于复杂关系的组件数据传递
6. Provide / Inject: 用于父组件提供数据，子组件注入数据，跨多层级组件通信。

```javascript
<!-- 祖先组件 Ancestor.vue -->
<template>
  <div class="ancestor">
    <h3>祖先组件</h3>
    <Child />
  </div>
</template>

<script>
import Child from './Child.vue'
export default {
  components: { Child },
  // 提供数据/方法给后代组件
  provide() {
    return {
      ancestorMsg: '我是祖先组件的消息',
      ancestorMethod: this.ancestorMethod // 传递方法
    }
  },
  methods: {
    ancestorMethod() {
      alert('祖先组件的方法被调用了！')
    }
  }
}
</script>

<!-- 子组件 Child.vue（中间层，无需处理） -->
<template>
  <div class="child">
    <h4>子组件</h4>
    <GrandChild />
  </div>
</template>

<script>
import GrandChild from './GrandChild.vue'
export default {
  components: { GrandChild }
}
</script>

<!-- 孙组件 GrandChild.vue（后代组件） -->
<template>
  <div class="grand-child">
    <h5>孙组件</h5>
    <p>接收祖先组件的消息：{{ ancestorMsg }}</p>
    <button @click="ancestorMethod">调用祖先组件的方法</button>
  </div>
</template>

<script>
export default {
  // 注入祖先组件提供的数据/方法
  inject: ['ancestorMsg', 'ancestorMethod']
}
</script>
```

7. $parent / $children: 通过原型链方式访问父组件实例或子组件实例数组。

---

## Vue2 常用特性

### vue2 常见的修饰符有哪些？

事件修饰符：.stop, .prevent, .once

按键修饰符：.enter, .page-down

.number: 数值类型

.trim: 去空格

.sync: 双向绑定

### watch 和 computed 计算属性有什么区别？

1.computed 计算属性会自动使用缓存计算，除非依赖发生改变，watch 监听无缓存 2.computed 不支持异步，watch 支持异步 3.computed 多次调用执行一次，watch 多次调用执行多次 4.应用场景不同：computed 主要是针对数据格式化、以及数据逻辑计算；watch 主要是针对异步操作处理（比如某个数据改变要调用接口请求等）

### 页面初始化，父子组件嵌套下生命周期的顺序？

父组件 created -> 子组件 created -> 子组件 mounted -> 父组件 mounted

---

## Vue2 响应式系统

### Vue 2 如何解决 `Object.defineProperty` 的局限性：

**历史原因：**

`Object.defineProperty` 的核心局限有 3 个：

1. 无法监听**属性新增**（如 `vm.newKey = 123`）；
2. 无法监听**属性删除**（如 `delete vm.key`）；
3. 无法监听**数组下标修改 / 长度修改**（如 `arr[0] = 1`、`arr.length = 0`）。

**解决：**提供 `$set` 和 `$delete` 调用 API 时手动为新属性添加 `getter/setter`，并触发依赖更新

### vue2 生命周期：

1. **beforeCreate**：在实例初始化之后被立即调用，此时不能访问 `data`、`computed`、`methods` 等属性。
2. **created**：实例创建完成后被调用，此时可以访问 `data`、`computed`、`methods` 等属性，但尚未挂载到 DOM。
3. **beforeMount**：在挂载开始之前被调用，相关的 render 函数首次被调用。
4. **mounted**：实例挂载到 DOM 后调用，此时可以访问到 DOM，也可以执行依赖于 DOM 的操作。
5. **beforeUpdate**：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
6. **updated**：由于数据更改导致的虚拟 DOM 重新渲染和打补丁后被调用。
7. **beforeDestroy**：实例销毁之前调用，此时可以执行一些清理工作，比如取消计时器、事件监听等。
8. **destroyed**：实例销毁后调用，所有的事件监听器会被移除，所有的子组件也会被销毁。

---

## Vue3 新特性

### vue3 相对于 vue2 有哪些优势？

Vue3 相对于 Vue2 其实并非一次简单迭代，而是一次底层逻辑的重构了；

1.响应式方案不同：

- vue3 的响应式是使用 Proxy, Proxy 是对整个对象监听，Proxy 能够监听属性的读取、修改、新增、删除；
- vue2 使用的是 Object.defineProperty，只能监听已有属性，无法监听属性新增、删除；（vue2 是怎么处理的呢，通过手动调用 `$set/$delete` 处理新增 / 删除属性；）

  2.生命周期钩子不同

Vue2 钩子 beforeCreate, created 由 Vue3 setup 替代；最直观的变化是：Vue3 不用 export default 一个对象

```javascript
<!-- Vue 2 写法 -->
<script>
export default {
  beforeCreate() {
    console.log('Vue2：实例即将创建')
    this.initData() // 此时 data 尚未初始化，无法访问
  },
  created() {
    console.log('Vue2：实例创建完成')
    this.initData() // 可访问 data/methods
  },
  data() {
    return { count: 0 }
  },
  methods: {
    initData() {
      this.count = 10
    }
  }
}
</script>
```

```javascript
<!-- Vue 3 Composition API 写法（推荐） -->
<script setup>
import { ref, onMounted } from 'vue'
// setup 内直接写初始化逻辑（替代 beforeCreate + created）
console.log('Vue3：setup 执行（等同于 beforeCreate + created）')
const count = ref(0) // 初始化响应式数据
const initData = () => {
  count.value = 10 // 直接操作，无需 this
}
initData() // 立即执行初始化

// 其他生命周期需显式导入调用
onMounted(() => {
  console.log('Vue3：挂载完成')
})
</script>
```

- vue3 引入的是 composition api，逻辑比较集中，可读性更强；
- vue2 options api, 通过 this 来调用组件的实例和方法，逻辑比较分散、可读性不强，复杂组件难以维护；(vue2 组件复用使用 mixins, 命名冲突直接覆盖，多个 mixins 混用找问题会很麻烦；而 vue3 的组件复用使用 hooks 组件，逻辑清晰)

  3.typescript 支持

- vue3 原生就支持
- vue2 需要借助于第三方插件支持

4. **重点：** vue3 重写了虚拟 DOM 的实现，在编译阶段和运行节点都做了大幅优化，性能上远超 vue2;

**虚拟 DOM 优化**：

- Vue 2 全量对比虚拟 DOM，存在大量无效对比；
- Vue 3 引入 **静态标记**，仅对比带有动态标记的节点，跳过静态节点 (`<div>静态文本</div>`);

**Diff 算法优化：**

- Vue 2 列表 Diff 采用简单双端对比存在；
- Vue 3 引入**最长递增子序列**，减少列表节点移动次数；

**静态提升**：Vue 3 编译时将静态节点提升到渲染函数外，缓存复用，避免每次渲染重新创建；

**更小的打包体积**：Vue 3 支持 Tree-Shaking，按需引入功能，打包体积比 Vue 2 小约 40%；

**响应式系统优化**：懒代理减少初始化递归开销，内存占用更低。

---

## Diff 算法

### vue2 和 vue3 Diff 算法比较？

**相同点：** 都是对比新旧虚拟 DOM 差异，最小化修改真实 DOM；并且都是同级节点比较，不同级节点直接替换；

**差异点：** Vue3 引入「静态标记」和「最长递增子序列」算法；

**Vue2:** 双端对比算法：头尾两个指针向中间靠拢，当节点列表为 "长列表" 或 "节点位置大幅变动" 时，移动操作开销较大

**Vue3:**

1.静态提升：编译时将静态节点从渲染函数中提取出来，缓存到内存中，每次渲染时直接复用，无需重新创建虚拟 DOM 节点，减少内存占用和创建开销； 2.静态标记：会给动态节点加上 PatchFlags, Diff 阶段只遍历带有 PatchFlags 标记的动态节点，直接跳过所有静态节点，大幅减少对比次数。 3.基于最长递增子序列（贪心 + 二分法）的列表 Diff，最小化 DOM 移动

#### vue2 diff 算法：

基于 **"同层节点列表全量比对"**，采用双向指针的方式遍历

Vue 组件创建和更新时都会执行 update 函数，该函数用 render 生成的虚拟 DOM，通过 diff（对比差异）更新真实 DOM，而 diff 由 patch 函数完成。

1. **核心流程**

- Vue 通过**update 函数**触发 DOM 更新，依赖 render 生成的虚拟 DOM 树。
- 虚拟 DOM 的差异对比（即**diff**）由内部**patch 函数**执行，采用**深度优先、逐层比较**的方式。

2. **节点判断与处理**

- 判断两个虚拟节点是否相同，主要依据**key**和**tag**。
- 根节点相同：复用旧节点关联的真实 DOM，更新属性后继续对比子节点。
- 根节点不同：按新节点递归创建真实 DOM，同时移除旧 DOM。

3. **子节点数组对比**

- 对比子节点时，使用**头尾两个指针向中间靠拢**的方式。
- 目的是最大化复用真实 DOM，减少销毁与创建操作。
- 若节点相同则递归对比，不同则移动真实 DOM 到正确位置。

**局限性**：

- 当节点列表为 **"长列表"** 或 **"节点位置大幅变动"** 时，可能需要多次移动 / 删除 / 创建节点，效率较低；
- 比对过程中需要频繁操作指针和遍历，时间复杂度为 **O(n²)**（最坏情况）。

#### Vue 3 diff 算法：

采用 **分区比对（最长递增子序列）**，核心逻辑如下:

1. **预处理**：先处理新旧列表中 **前缀相同** (从头部开始连续匹配的节点) 和 **后缀相同** 的节点（直接复用，无需移动）；
2. **核心比对**：对剩余的中间 "差异区" 节点，通过 key 建立映射关系，确定需要新增、删除或移动的节点；
3. **移动优化**：通过计算差异区中 **新列表节点在旧列表中的索引序列** 的最长递增子序列，确定可保持不动的节点，其余节点只需按顺序移动即可，避免了大量 DOM 操作。

**优势**：

- 时间复杂度优化为 **O(n log n)**（主要来自 LIS 计算），相对于 vue2 时间复杂度会降低；
- 减少了不必要的 DOM 移动，尤其适合长列表或节点位置频繁变动的场景。

---

## Vue2 常见问题

### 为什么 vue2 中 this.list[0] = 100; 视图不更新；而使用 this.list.splice(0, 1, 100)就更新了？

**答案：**`Object.defineProperty()` 无法监听数组的下标。对于数组，Vue2 只能通过重写 `push/pop/shift/unshift/splice/sort/reverse` 这 7 个方法实现响应式

```javascript
// Vue2 示例：数组索引修改无响应式
export default {
  data() {
    return {
      list: [1, 2, 3],
    };
  },
  methods: {
    changeItem() {
      this.list[0] = 100; // 视图不更新
      // 必须用 this.list.splice(0, 1, 100) 才生效
    },
  },
};
```

### vue2 中 nextTick 作用？

`nextTick` 是 Vue 提供的一个异步方法，它的核心作用是：**在下次 DOM 更新循环结束之后执行延迟回调**。换句话说，当你在响应式数据变化后、**想立即拿到更新后的 DOM**，就必须把代码包进 `nextTick`，否则读到的还是旧 DOM。

实际案例：修改响应式数据后，通过 nextTick 获取该元素最新的 textContent

```javascript
async updateData() {
  this.count = 100
  await this.$nextTick() // 等待 DOM 更新完成
  console.log(document.getElementById('count-box').textContent) // 100
}
```
