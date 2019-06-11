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

// import submit from './js/submit'
// Vue.use(submit)

// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
//   modules: {
//     store
//   }
// });

// import $ from 'jQuery'
// Vue.use($)
Vue.use(VueHighlightJS);

Vue.use(Tooltip);

Vue.use(VueClipboard)

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
  // methods:{
  //   submit(name,type,replaceStr) {
  //     let codes = this.$store.getters.getCodes;                                             //基础
  //     let hoverCodes = this.$store.getters.getHoverCodes;                                   //hover
  //     let animationCodes =this.$store.getters.getAnimationCodes;                            //动画
  //
  //     let patt = new RegExp(`\b${name}\b`,'g');           //判断是否有此项
  //     let pattHave = new RegExp(`(?<=\\b${name}:).+(?=;)`,'g');         //有此项，需要替换冒号后面的值
  //     let pattHaveNot = new RegExp(`}`,'g');         //没有此项，需要替换花括号
  //
  //     switch (type) {
  //       case 'standard':{
  //         if (codes.match(patt)) {
  //           codes = codes.replace(pattHave,replaceStr);
  //         }else {
  //           codes = codes.replace(pattHaveNot,`\t${name}:${replaceStr};\n`)
  //         }
  //       }
  //         this.$store.dispatch('changeCodes', codes);
  //         break;
  //     }
  //
  //   }
  //
  // }
})

Vue.prototype.submit = function (name,type,replaceStr) {
  let codes = this.$store.getters.getCodes;                                             //基础
  let hoverCodes = this.$store.getters.getHoverCodes;                                   //hover
  let animationCodes =this.$store.getters.getAnimationCodes;
  let patt = new RegExp(`\\b${name}\\b`,'g');           //判断是否有此项
  let pattHave = new RegExp(`(?<=\\b${name}:).+(?=;)`,'g');         //有此项，需要替换冒号后面的值
  let pattHaveNot = new RegExp(`}$`,'g');         //没有此项，需要替换花括号
  let pattPercent = new RegExp(`${type} {`,"g");                     //百分比
  let pattP = new RegExp(`(?<=\\b${type} {)\\w+|\\s+\\b${name}\\b`,'g');
  switch (type) {
    case 'standard':{
      if (codes.match(patt)) {
        codes = codes.replace(pattHave,replaceStr);
      }else {
        codes = codes.replace(pattHaveNot,`\t${name}:${replaceStr};\n}`)
      }
      this.$store.dispatch('changeCodes', codes);
      break;
    }
    case 'hover':{
      if (hoverCodes.match(patt)) {
        hoverCodes = hoverCodes.replace(pattHave,replaceStr);
      }else {
        hoverCodes = hoverCodes.replace(pattHaveNot,`\t${name}:${replaceStr};\n}`)
      }
      this.$store.dispatch('changeHoverCodes', hoverCodes);
      break;
    }
    default:{                                               //此处用于匹配动画中的类似0%、100%
      if (animationCodes.match(pattPercent)){
        console.log(patt.exec(/\b0% {.+|s+}/g))
        if (pattP.test(animationCodes)){

          console.log("you")
        }else {
          console.log('mei')
        }


      }else {
        animationCodes = animationCodes.replace(pattHaveNot,`\t${type} {\n\t\t${name}:${replaceStr};\t}\n}`);
        this.$store.dispatch('changeAnimationCodes', animationCodes);
      }
    }

  }

}
