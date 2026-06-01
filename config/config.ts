import { defineConfig } from 'dumi';

export default defineConfig({
  title: '牧游博客',
  favicon: '/images/muyou.png',
  logo: '/images/muyou.png',
  outputPath: 'dist',
  mode: 'site',
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  dynamicImport: {},
  manifest: {},
  hash: true,
  resolve: {
    includes: ['docs'],
  },
  navs: [
    // null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '首页',
      path: '/home',
    },
    {
      title: '面试题库',
      path: '/interview',
    },
    {
      title: '其他网站',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: 'github', path: 'https://github.com/jackywq' },
        { title: '稀土掘金', path: 'https://juejin.cn/user/747323636066125/posts' },
      ],
    },
  ],

  menus: {
    '/home': [
      {
        title: '高频面试题',
        children: [
          {
            title: 'react系列',
            path: '/home/react',
          },
          {
            title: 'vue系列',
            path: '/home/vue',
          },
          {
            title: 'javascript系列',
            path: '/home/javascript',
          },
          {
            title: 'es6系列',
            path: '/home/es6',
          },
          {
            title: 'css系列',
            path: '/home/css',
          },
          {
            title: 'webpack系列',
            path: '/home/webpack',
          },
          {
            title: '前端工程化系列',
            path: '/home/engineering',
          },
          {
            title: '常见设计模式系列',
            path: '/home/design',
          },
          {
            title: '微前端系列',
            path: '/home/microfrontend',
          },
        ],
      },
      {
        title: '工程化',
        children: [
          {
            title: 'CICD',
            path: '/home/cicd',
          },
          {
            title: 'Docker部署',
            path: '/home/docker',
          },
        ],
      },

      {
        title: '算法',
        children: [
          {
            title: 'leetcode',
            path: '/home/leetcode',
          },
        ],
      },

      {
        title: '性能优化',
        children: [
          {
            title: '加载性能',
            path: '/home/performance/loading',
          },
          {
            title: '渲染性能',
            path: '/home/performance/rendering',
          },
          {
            title: '网络优化',
            path: '/home/performance/network',
          },
          {
            title: '图片优化',
            path: '/home/performance/images',
          },
          {
            title: 'Web Vitals',
            path: '/home/performance/web-vitals',
          },
          {
            title: '虚拟滚动',
            path: '/home/performance/virtual-scroll',
          },
          {
            title: '懒加载',
            path: '/home/performance/lazy-load',
          },
        ],
      },

      {
        title: '进阶',
        children: [
          {
            title: '进阶',
            path: '/home/forward',
          },
        ],
      },
    ],
    '/interview': [
      {
        title: 'JavaScript',
        children: [
          { title: '数据类型', path: '/interview/java-script/data_type' },
          { title: '原型与继承', path: '/interview/java-script/prototype' },
          { title: '作用域与闭包', path: '/interview/java-script/closure' },
          { title: '事件循环', path: '/interview/java-script/event_loop' },
        ],
      },
      {
        title: 'React',
        children: [
          { title: 'React Hooks', path: '/interview/react/react_hooks' },
          { title: '组件通信', path: '/interview/react/communication' },
          { title: '生命周期', path: '/interview/react/life_cycle' },
        ],
      },
      {
        title: 'Vue',
        children: [
          { title: '响应式原理', path: '/interview/vue/data' },
          { title: '生命周期', path: '/interview/vue/lifecycle' },
          { title: 'Vue3 Composition API', path: '/interview/vue/composition' },
        ],
      },
      {
        title: '前端工程化',
        children: [
          { title: 'Webpack', path: '/interview/engineering/webpack' },
          { title: 'HTTP', path: '/interview/engineering/http' },
          { title: 'Git', path: '/interview/engineering/git' },
        ],
      },
    ],
  },
});
