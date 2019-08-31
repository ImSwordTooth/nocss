<template>
  <div class="left" :class="{'zoom':isZoomIn}">
    <div class="Title">
      <div>
        <i class="iconfont icontools"></i>工具箱
      </div>
      <div class="toolsBtn">
        <i class="iconfont iconzoomout" @click="isZoomIn = !isZoomIn" title="缩小"></i>
      </div>
    </div>
    <ul class="tools">
      <li @click="chooseTool($event)" data-default="p" :class="{'active':activeLi==='p'}"><i class="iconfont icontext"></i><span>文本</span></li>
      <li @click="chooseTool($event)" data-default="a" :class="{'active':activeLi==='a'}"><i class="iconfont iconanchor"></i><span>超链接</span></li>
      <li @click="chooseTool($event)" data-default="input" :class="{'active':activeLi==='input'}"><i class="iconfont iconinput"></i><span>表单组件</span></li>
      <li @click="chooseTool($event)" data-default="button" :class="{'active':activeLi==='button'}"><i class="iconfont iconbtn"></i><span>按钮</span></li>
      <li @click="chooseTool($event)" data-default="div" :class="{'active':activeLi==='div'}"><i class="iconfont icondiv"></i><span>盒子</span></li>
      <li @click="chooseTool($event)" data-default="img" :class="{'active':activeLi==='img'}"><i class="iconfont iconimage"></i><span>图片</span></li>
      <li @click="chooseTool($event)" data-default="table" :class="{'active':activeLi==='table'}"><i class="iconfont icontable"></i><span>表格</span></li>
      <li @click="chooseTool($event)" data-default="ul" :class="{'active':activeLi==='ul'}"><i class="iconfont iconlist"></i><span>列表</span></li>
    </ul>
    <p class="more">开发中...</p>
  </div>
</template>

<script>
import * as x0popup from 'x0popup'

export default {
  name: 'my-aside',
  data () {
    return {
      activeLi: null,
      isZoomIn: false
    }
  },
  methods: {
    chooseTool: function (event) {
      let text = event.currentTarget.innerText
      let tag = event.currentTarget.dataset.default
      // this.activeLi = tag;
      let type = this.$store.getters.getToolType
      let codes = this.$store.getters.getCodes
      if (type !== '' && codes !== '.nocss {\n}') {
        x0popup('确定要切换标签吗？', '确定要切换标签吗？当前所有样式将不会保存', 'warning', button => {
          if (button === 'warning') {
            this.activeLi = tag
            this.$store.dispatch('changeCodes', `.nocss {\n}`)
            this.$store.dispatch('changeHoverCodes', '')
            this.$store.dispatch('changeAnimationCodes', '')
            this.$store.dispatch('changeIsAlive', false)
            this.submit(text, tag)
          }
        })
      } else {
        this.activeLi = tag
        this.submit(text, tag)
      }
    },
    submit (text, tag) {
      this.$store.dispatch('changeToolType', text)
      this.$store.dispatch('changeTagInfo', tag)
      switch (text) {
        case '文本':
          this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'pseudoClass', name: '伪类'}, {class: 'animation', name: '动画'}])
          this.$store.dispatch('changeStandardList', ['color', 'fontsize', 'fontstyle', 'backgroundcolor', 'border', 'padding', 'textshadow', 'boxshadow', 'transition', 'transform', 'outline', 'letterspacing'])
          this.$store.dispatch('changePseudoClass', [{name: 'hover', content: []}, {name: 'active', content: []}])
          break
        case '超链接':
          this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'pseudoClass', name: '伪类'}, {class: 'animation', name: '动画'}])
          this.$store.dispatch('changeStandardList', ['color', 'fontsize', 'fontstyle', 'backgroundcolor', 'border', 'padding', 'textshadow', 'boxshadow', 'transition', 'transform', 'outline', 'letterspacing'])
          this.$store.dispatch('changePseudoClass', [{name: 'hover', content: []}])
          break
        case '表单组件': this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'pseudoClass', name: '伪类'}, {class: 'animation', name: '动画'}, {class: 'after', name: '+ i'}]); break
        case '按钮': this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'pseudoClass', name: '伪类'}, {class: 'animation', name: '动画'}]); break
        case '盒子': this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'pseudoClass', name: '伪类'}, {class: 'animation', name: '动画'}]); break
        case '图片':
          this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'animation', name: '动画'}])
          this.$store.dispatch('changeStandardList', ['border', 'filter', 'boxshadow', 'transition', 'transform', 'outline', 'objectfit'])
          break
        case '表格': this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'pseudoClass', name: '伪类'}]); break
        case '列表': this.$store.dispatch('changeOperateHead', [{class: 'standard', name: '基本'}, {class: 'pseudoClass', name: '伪类'}]); break
      }
    },
    zoom (event) {

    }
  }
}
</script>

<style scoped>
  .left .tools{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .tools>li{
    position: relative;
    display: flex;
    padding: 1.6rem 0;
    align-items: center;
    flex-wrap: wrap;
    cursor: url("../assets/cursor/pen.png"),pointer;
    transition: all .3s;
  }
  .tools>li.active{
    background-color: #464646;
    color: wheat;
    box-shadow: inset 5px 0 #deca8e;
    transition: background-color .5s;
  }

  .tools>li>i{
    position: absolute;
    left: 20px;
  }
  .tools>li span{
    width: 100%;
    padding-left: 70px;
  }

  .tools>li:not([class='active']):hover{
    background-color: rgba(236, 236, 236, 0.98);
    box-shadow: 5px 9px 5px 0 rgba(228, 228, 228, 0.25);
    transition: all .6s;
  }
  .more{
    display: flex;
    color: gray;
    font-style: oblique;
    justify-content: center;
    margin-right: 20px;
    font-size: 18px;
    cursor: url("../assets/cursor/wait.png"),not-allowed;
  }

</style>
