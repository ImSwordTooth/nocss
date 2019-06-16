// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
//代码高亮
import VueHighlightJS from 'vue-highlightjs'
//弹出框
import 'x0popup/dist/x0popup.min.css'
//提示
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';
//复制
import VueClipboard from 'vue-clipboard2'


// import $ from 'jQuery'
// Vue.use($)
Vue.use(VueHighlightJS);

Vue.use(Tooltip);

Vue.use(VueClipboard);

//把目录下的所有.vue文件变成组件
const requireComponent_operation = require.context('./components/operation',false,/\w+\.(vue|js)$/)
requireComponent_operation.keys().forEach(fileName => {
  const componentConfig = requireComponent_operation(fileName);
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/,'$1');

  Vue.component(
    componentName,componentConfig.default||componentConfig
  )
});

const requireComponent_pseudo = require.context('./components/pseudo',false,/\w+\.(vue|js)$/)
requireComponent_pseudo.keys().forEach(fileName => {
  const componentConfig = requireComponent_pseudo(fileName);
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/,'$1');

  Vue.component(
    componentName,componentConfig.default||componentConfig
  )
});


// 自定义全局指令，用于颜色选择后点击其他地方隐藏颜色选择窗口
const clickoutside = {
  bind(el, binding, vnode) {                               // 初始化指令
    function documentHandler(e) {
      if (el.contains(e.target)) {                        // 这里判断点击的元素是否是本身，是本身，则返回
        return false;
      }
      if (binding.expression) {                            // 判断指令中是否绑定了函数
        binding.value(e);                                  // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
      }
    }
    el.__vueClickOutside__ = documentHandler;               // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__);               // 解除事件监听
    delete el.__vueClickOutside__;
  },
};
Vue.directive('clickoutside',clickoutside);

new Vue({
  el: '#app',
  components: { App },
  store,
  template: '<App/>'
});

/*
*@param {String}name  css属性名
*@param {String}type  基础、伪类、或者动画节点
*@param {String}replaceStr  css属性值
*
*
* */
Vue.prototype.submit = function (name,type,replaceStr) {
  let codes = this.$store.getters.getCodes;                                             //基础
  let hoverCodes = this.$store.getters.getHoverCodes;                                   //hover
  let animationCodes =this.$store.getters.getAnimationCodes;
  let patt = new RegExp(`\\t\\b${name}\\b`,'g');           //判断是否有此项
  let pattHave = new RegExp(`(?<=\\t\\b${name}:).+(?=;)`,'g');         //有此项，需要替换冒号后面的值
  let pattHaveNot = new RegExp(`}$`,'g');         //没有此项，需要替换花括号
  let pattPercent = new RegExp(`${type} {`,"g");                     //百分比：：判断是否有这个节点，没有的话就新增
  let pattP = new RegExp(`(?<=\\b${type} {).*[.\\w\\W]*?${name}:`);        //百分比：：判断是否有此项
  let pattPercentHave = new RegExp(`(?<=\\b${type}.*[.\\w\\W]*?${name}:).*(?=;)`);         //百分比：：有此项，需要替换冒号后面的值
  let pattPercentHaveNot = new RegExp(`(?<=\\b${type}.*[.\\w\\W]*?)}`);         //百分比：：没有此项，需要替换花括号
  switch (type) {
    case 'standard':{
      if (patt.test(codes)) {
        codes = codes.replace(pattHave,replaceStr);
      }else {
        codes = codes.replace(pattHaveNot,`\t${name}:${replaceStr};\n}`)
      }
      this.$store.dispatch('changeCodes', codes);
      break;
    }
    case 'hover':{
      if (patt.test(hoverCodes)) {
        hoverCodes = hoverCodes.replace(pattHave,replaceStr);
      }else {
        hoverCodes = hoverCodes.replace(pattHaveNot,`\t${name}:${replaceStr};\n}`)
      }
      this.$store.dispatch('changeHoverCodes', hoverCodes);
      break;
    }
    default:{                                               //此处用于匹配动画中的类似0%、100%
      if (pattPercent.test(animationCodes)){
        if (pattP.test(animationCodes)){
          animationCodes = animationCodes.replace(pattPercentHave,replaceStr);
        }else {
          animationCodes = animationCodes.replace(pattPercentHaveNot,`\n\t\t${name}:${replaceStr};\n\t}`);
        }
      }else {
        animationCodes = animationCodes.replace(pattHaveNot,`\t${type} {\n\t\t${name}:${replaceStr};\n\t}\n}`);
      }
      this.$store.dispatch('changeAnimationCodes', animationCodes);
    }
  }
};
