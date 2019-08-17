<template>
  <div class="showItems">
    <div class="Title">
      <div>
        <i class="iconfont iconitems"></i>展示
      </div>
      <div class="toolsBtn">
        <input type="text" class="text" @input="changeText($event)" placeholder="自定义文本">
        <ul v-if="tagInfo === 'input'" v-tooltip.top="'这功能不想要了'">
          <li v-for="(type,index) in types" :key="index" :title="type" @click="changeType($event)" :class="{'active':type === inputType}"><i class="iconfont" :class="`icon${type}`"></i></li>
        </ul>
        <code>&lt;{{tagInfo}}&gt;</code>
        <i v-if="tagInfo === 'img'" class="iconfont iconupload" v-tooltip.bottom="{html:'tooltipContent'}" @click="clickFile()"></i>
        <!--下面一行的代码只用于上方v-tooltip中的内容-->
        <span id="tooltipContent" v-show="tagInfo === 'img'">点击上传图片<br><i>or</i><br>拖动一个图片到下方矩形中</span>
        <i v-if="tagInfo === 'table'" class="iconfont icontablerowandcol" title="行列数"></i>
        <i class="iconfont iconhelp"></i>
        <input type="file" hidden @change="uploadImg()" id="upload" accept="image/*">
      </div>
    </div>
    <article id="article">
      <codes :style="itemStyle" @mouseenter.native="hoverFn" @mouseout.native="outFn"></codes>
    </article>
  </div>
</template>

<script>
import * as x0popup from 'x0popup'
export default {
  name: 'itembox',
  data () {
    return {
      types: ['input', 'checkbox', 'radio', 'range'],
      isHover: false,
      uploadContent: null
    }
  },
  mounted () {
    ['dragleave', 'drop', 'dragenter', 'dragover'].forEach(e => { // 阻止浏览器默认的拖拽时事件，测试阻止这几个就够了，不放心就全阻止一遍吧
      this.preventDefaultEvent(e)
    })
    this.addDropSupport() // 为<article>添加拖拽事件
  },
  computed: {
    classObject () {
      return {

      }
    },
    tagInfo () {
      return this.$store.getters.getTagInfo
    },
    inputType () {
      return this.$store.getters.getInputType
    },
    itemStyle () {
      let style = this.$store.getters.getCodes
      style = style.replace(/.+(?={)/g, '').replace(/[{|}]/g, '')
      let Hoverstyle = this.$store.getters.getHoverCodes
      Hoverstyle = Hoverstyle.replace(/.+(?={)/g, '').replace(/[{|}]/g, '')
      if (this.isHover) {
        return style + Hoverstyle
      } else {
        return style
      }
    }
  },
  components: {
    'codes': {
      render (createElement, context) {
        let tag = this.$store.getters.getTagInfo
        let type = this.$store.getters.getInputType
        let image = require('../assets/logo.png')
        let text = this.$store.getters.getTagText
        switch (tag) {
          case 'p':return createElement(tag, text)
          case 'button':return createElement(tag, text)
          case 'div':return createElement(tag, text)
          case 'a':return createElement(tag, {attrs: {href: '#'}}, text)
          case 'input':
            if (type === 'text') {
              return createElement(tag, {attrs: {type: type, value: text}})
            } else if (type === 'range') { // range的以后再想
              return createElement(tag, {attrs: {type: type, value: text}})
            } else {
              return createElement('div', [
                createElement(tag, {attrs: {type: type, value: text}}),
                createElement('i')
              ])
            }
          case 'img':return createElement(tag, {attrs: {src: image, id: 'uploadedImg'}})
          case 'table':return createElement(tag, {attrs: {border: 1}}, [
            createElement('tr', [createElement('td', '哈哈哈'), createElement('td', '哈哈哈'), createElement('td', '哈哈哈')]),
            createElement('tr', [createElement('td', '哈哈哈')]),
            createElement('tr', [createElement('td', '哈哈哈')])
          ])
          case 'ul':return createElement('ul', [
            createElement('li', {style: this.itemStyle}, '第一项'),
            createElement('li', '第二项'),
            createElement('li', '第三项')
          ])
        }
      }
    }
  },
  methods: {
    // 禁用某些事件
    preventDefaultEvent (eventName) {
      document.addEventListener(eventName, function (e) {
        e.preventDefault()
      }, false)
    },
    changeType: function (event) {
      let title = event.currentTarget.title
      this.$store.dispatch('changeInputType', title)
    },
    changeText: function (event) {
      let text = event.currentTarget.value
      text = text === '' ? '文本' : text
      this.$store.dispatch('changeTagText', text)
    },
    hoverFn () {
      this.isHover = true
    },
    outFn () {
      this.isHover = false
    },
    // 通过js点击上传按钮
    clickFile () {
      document.getElementById('upload').click()
    },
    // 上传图片
    uploadImg () {
      let file = document.getElementById('upload').files[0]
      if (!file || !window.FileReader) { // 看支持不支持FileReader
        // TODO 这里加一些提示
        return
      }
      if (/^image/.test(file.type)) {
        var reader = new FileReader() // 创建一个reader
        reader.readAsDataURL(file) // 将图片将转成 base64 格式
        reader.onloadend = function () { // 读取成功后的回调
          document.getElementById('uploadedImg').src = this.result
        }
      }
    },
    // 拖动上传图片
    addDropSupport () {
      let BOX = document.getElementById('article')
      BOX.addEventListener('drop', (e) => {
        e.preventDefault()
        // dataTransfer承载拖拽数据
        let fileList = e.dataTransfer.files // 其实这就是文件对象列表了
        if (fileList.length === 0) { // 总得拖一个文件吧
          return false
        }
        if (fileList[0].type.indexOf('image') === -1) { // 格式限制
          x0popup('发生错误', '请选择图片文件', 'error')
          return false
        }
        if (fileList.length > 1) { // 这次限制下只能拖一个文件
          x0popup('发生错误', '暂不支持多文件', 'error')
          return false
        }
        var reader = new FileReader()
        reader.readAsDataURL(fileList[0])
        reader.onloadend = function () {
          document.getElementById('uploadedImg').src = this.result
        }
      })
    }

  }
}
</script>

<style scoped>
  .showItems{
    grid-row: 2/3;
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
  }
  .showItems article{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
  .showItems article input{
    max-width: 80%;
  }
  .showItems article img{
    max-width: 80%;
    max-height: 300px;
  }
  .text{
    width: 100px;
    border-radius: 2px;
    line-height: normal;
    white-space: nowrap;
    font-size: 14px;
    padding: 4.5px 2px;
    text-align: center;
    color: #737373;
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #e6e6e6;
    box-shadow:inset 1px 1px 3px 0 #c7c7c7;;
    outline: none;
    vertical-align: middle;
  }
  #tooltipContent i{
    font-size: 14px;
    font-weight: bold;
  }
  #tooltipContent i:before,
  #tooltipContent i:after{
    content: '---';
    font-weight: lighter;
  }
</style>
