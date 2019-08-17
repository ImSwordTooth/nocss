// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
// 代码高亮
import VueHighlightJS from 'vue-highlightjs'
// 弹出框
import 'x0popup/dist/x0popup.min.css'
// 提示
import Tooltip from 'vue-directive-tooltip'
// import 'vue-directive-tooltip/css/index.css';
// 复制
import VueClipboard from 'vue-clipboard2'

// import $ from 'jquery'
// import $ from 'jQuery'
// Vue.use($)
Vue.use(VueHighlightJS)

Vue.use(Tooltip)

Vue.use(Tooltip, {
  // fontSize:80
  // delay: 500,
  // placement: 'right',
  class: 'tooltip-red'
  // triggers: ['hover'],
  // offset: 0
})

Vue.use(VueClipboard)

// 把目录下的所有.vue文件变成组件
const requireComponentOperation = require.context('./components/operation', false, /\w+\.(vue|js)$/)
requireComponentOperation.keys().forEach(fileName => {
  const componentConfig = requireComponentOperation(fileName)
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

  Vue.component(
    componentName, componentConfig.default || componentConfig
  )
})

const requireComponentPseudo = require.context('./components/pseudo', false, /\w+\.(vue|js)$/)
requireComponentPseudo.keys().forEach(fileName => {
  const componentConfig = requireComponentPseudo(fileName)
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

  Vue.component(
    componentName, componentConfig.default || componentConfig
  )
})

// 自定义全局指令，用于颜色选择后点击其他地方隐藏颜色选择窗口
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () {},
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
Vue.directive('clickoutside', clickoutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  template: '<App/>'
})

/*
*@param {String}name  css属性名
*@param {String}type  基础、伪类、或者动画节点
*@param {String}replaceStr  css属性值
*
*
* */
Vue.prototype.submit = function (name, type, replaceStr) {
  let codes = this.$store.getters.getCodes// 基础
  let hoverCodes = this.$store.getters.getHoverCodes// hover
  let animationCodes = this.$store.getters.getAnimationCodes// 动画
  let patt = new RegExp(`\\t\\b${name}\\b`, 'g')// 判断是否有此项
  let pattHave = new RegExp(`(?<=\\t\\b${name}:).+(?=;)`, 'g')// 有此项，需要替换冒号后面的值
  let pattHaveNot = new RegExp(`}$`, 'g')// 没有此项，需要替换花括号
  let pattPercent = new RegExp(`\\b${type} {`, 'g')// 百分比：：判断是否有这个节点，没有的话就新增
  let pattP = new RegExp(`(?<=\\b${type} {).*[.\\w\\W]*?${name}:`)// 百分比：：判断是否有此项
  let pattPercentHave = new RegExp(`(?<=\\b${type}.*[.\\w\\W]*?${name}:).*(?=;)`)// 百分比：：有此项，需要替换冒号后面的值
  let pattPercentHaveNot = new RegExp(`(?<=\\b${type}.*[.\\w\\W]*?)}`)// 百分比：：没有此项，需要替换花括号
  let pattDelete = new RegExp(`\\n\\t\\b${name}:.+;`, 'g')// 删除属性
  let pattPercentDelete = new RegExp(`(?<=\\b${type} {).*[\\w\\W]*?\\b${name}:.+;(?=[\\w\\W]+})`, 'g')// 删除百分比中的属性
  switch (type) {
    case 'standard': {
      if (replaceStr === '') {
        if (patt.test(codes)) {
          codes = codes.replace(pattDelete, '')
        }
      } else {
        if (patt.test(codes)) {
          codes = codes.replace(pattHave, replaceStr)
        } else {
          codes = codes.replace(pattHaveNot, `\t${name}:${replaceStr};\n}`)
        }
      }
      this.$store.dispatch('changeCodes', codes)
      break
    }
    case 'hover': {
      if (replaceStr === '') {
        if (patt.test(hoverCodes)) {
          hoverCodes = hoverCodes.replace(pattDelete, '')
        }
      } else {
        if (patt.test(hoverCodes)) {
          hoverCodes = hoverCodes.replace(pattHave, replaceStr)
        } else {
          hoverCodes = hoverCodes.replace(pattHaveNot, `\t${name}:${replaceStr};\n}`)
        }
      }
      this.$store.dispatch('changeHoverCodes', hoverCodes)
      break
    }
    // 此处用于匹配动画中的类似0%、100%
    default: {
      if (pattPercent.test(animationCodes)) {
        if (replaceStr === '') {
          if (pattP.test(animationCodes)) {
            animationCodes = animationCodes.replace(pattPercentDelete, '')
          }
        } else {
          if (pattP.test(animationCodes)) {
            animationCodes = animationCodes.replace(pattPercentHave, replaceStr)
          } else {
            animationCodes = animationCodes.replace(pattPercentHaveNot, `\t${name}:${replaceStr};\n\t}`)
          }
        }
      } else {
        animationCodes = animationCodes.replace(pattHaveNot, `\t${type} {\n\t\t${name}:${replaceStr};\n\t}\n}`)
      }
      this.$store.dispatch('changeAnimationCodes', animationCodes)
      let css = document.styleSheets[0]
      css.deleteRule(0)
      css.insertRule(animationCodes, 0)
    }
  }
}
