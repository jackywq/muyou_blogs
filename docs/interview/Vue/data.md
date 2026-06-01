# Vue 2.x 响应式原理

Vue 2 使用 `Object.defineProperty()` 实现响应式。

```javascript
// 简化版实现
function defineReactive(obj, key, val) {
  // 递归处理子属性
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      console.log("读取", key);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        console.log("设置", key, "为", newVal);
        val = newVal;
        observe(val); // 新值也要响应式
        // 通知视图更新
        notify();
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) return;
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

// 测试
const data = { name: "Vue", info: { age: 20 } };
observe(data);
data.name; // 读取 name
data.name = "Vue3"; // 设置 name 为 Vue3
data.info.age; // 读取 age
```

### Vue 2 的问题

1. **无法监听对象新增/删除属性**
```javascript
this.obj.newKey = "value"; // 不是响应式的
// 解决方法
this.$set(this.obj, "newKey", "value");
```

2. **无法监听数组索引和长度**
```javascript
this.arr[0] = "new"; // 不是响应式的
this.arr.length = 0; // 不是响应式的
// 解决方法
this.$set(this.arr, 0, "new");
```

---

## 2. Vue 3.x 响应式原理

Vue 3 使用 `Proxy` 实现响应式，解决了 Vue 2 的问题。

```javascript
// 简化版实现
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log("读取", key);
      // 收集依赖
      track(target, key);
      // 递归代理
      const res = Reflect.get(target, key);
      return typeof res === "object" ? reactive(res) : res;
    },
    set(target, key, value) {
      console.log("设置", key, "为", value);
      const res = Reflect.set(target, key, value);
      // 触发更新
      trigger(target, key);
      return res;
    },
    deleteProperty(target, key) {
      console.log("删除", key);
      const res = Reflect.deleteProperty(target, key);
      trigger(target, key);
      return res;
    },
  });
}

// 测试
const state = reactive({ name: "Vue3", list: [1, 2, 3] });
state.name; // 读取 name
state.name = "Vue4"; // 设置 name 为 Vue4
state.list[0] = 100; // 设置 0 为 100 (Vue3 支持！)
delete state.name; // 删除 name (Vue3 支持！)
```

### Proxy 优势

- 可以监听**对象新增/删除**属性
- 可以监听**数组索引**和**长度**变化
- 支持 Map、Set、WeakMap、WeakSet
- 性能更好（不需要一开始就递归所有属性）

---

## 3. 依赖收集与派发更新

### 核心概念
- **Dep**：依赖收集器，每个属性对应一个 Dep，存放 Watcher
- **Watcher**：观察者，数据变化时触发更新

### 流程
1. **依赖收集**：`getter` 时，Dep 收集当前 Watcher
2. **派发更新**：`setter` 时，Dep 通知所有 Watcher 更新
