// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
// import $ from 'jquery'
import VueHighlightJS from 'vue-highlightjs'
import 'x0popup/dist/x0popup.min.css'
Vue.use(VueHighlightJS)

import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';
Vue.use(Tooltip);

Vue.config.productionTip = false

//把目录下的所有.vue文件变成组件
const requireComponent = require.context('./components/operation',false,/\w+\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/,'$1');

  Vue.component(
    componentName,componentConfig.default||componentConfig
  )
});

// 自定义全局指令，用于颜色选择后点击其他地方隐藏颜色选择窗口
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};
Vue.directive('clickoutside',clickoutside)

new Vue({
  el: '#app',
  components: { App },
  store,
  template: '<App/>',
})
