<template>
  <li>
    <span class="operateTitle" @click.ctrl="del"><i class="iconfont iconborder"></i>边框</span>
    <div>
      <div class="item">
        <span class="info">宽度：</span>
        <input type="range" min="0" max="10" step="1" v-model="border.borderWeight">
        <span class="borderWeightText">{{border.borderWeight}}px</span>
      </div>
      <div class="item">
        <span class="info">样式：</span>
        <div class="chooseContainer" :class="{'tttop':isShowBorderStyle}" @click="choose($event)" v-clickoutside="hideBorderStyle">{{border.borderStyle}}
          <i class="iconfont" :class="{'iconuparrow':isShowBorderStyle,'icondownarrow':!isShowBorderStyle}"></i>
          <ul v-show="isShowBorderStyle" :class="{'showTop':showTop}">
            <li @click="changeBorderStyle($event)" data-type="solid"><i class="iconfont iconsolid"></i>实线<span class="en">solid</span></li>
            <li @click="changeBorderStyle($event)" data-type="dashed"><i class="iconfont icondashed"></i>虚线<span class="en">dashed</span></li>
            <li @click="changeBorderStyle($event)" data-type="double"><i class="iconfont icondouble"></i>双线<span class="en">double</span></li>
            <li @click="changeBorderStyle($event)" data-type="dotted"><i class="iconfont icondotted"></i>点状<span class="en">dotted</span></li>
            <li @click="changeBorderStyle($event)" data-type="inset"><i class="iconfont iconinset"></i>内阴影<span class="en">inset</span></li>
            <li @click="changeBorderStyle($event)" data-type="outset"><i class="iconfont iconoutset"></i>外阴影<span class="en">outset</span></li>
            <li @click="changeBorderStyle($event)" data-type="groove"><i class="iconfont icongroove"></i>3D凹槽<span class="en">groove</span></li>
            <li @click="changeBorderStyle($event)" data-type="ridge"><i class="iconfont iconridge"></i>3D垄状<span class="en">ridge</span></li>
          </ul>
        </div>
      </div>
      <div class="item">
        <span class="color" :class="{'tttop':isShow}" @click="isShow = true" v-clickoutside="hideColorPicker">
          <span class="currentColor" :style="{'background':rgba}"></span>
          <span class="currentColorText">{{colorText}}</span>
          <chrome-picker class="colorPicker" v-if="isShow" v-model="border.color"></chrome-picker>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import {Chrome} from 'vue-color'

export default {
  name: 'my-border',
  props: ['now'],
  data () {
    return {
      border: {
        borderWeight: 0, // 边框宽度
        borderStyle: 'solid', // 边框样式
        color: { // 边框颜色
          rgba: { r: 0, g: 0, b: 0, a: 0 },
          a: 1
        }
      },
      isShow: false, // 控制颜色选择框的显示
      isShowBorderStyle: false, // 控制边框样式下拉框的显示
      showTop: false
    }
  },
  components: {
    'chrome-picker': Chrome
  },
  created () {
    this.$watch('$data.border', function () {
      this.prepareSubmit()
    }, {immediate: this.isMed, deep: true}
    )
  },
  methods: {
    choose (e) {
      this.isShowBorderStyle = !this.isShowBorderStyle
      this.showTop = window.innerHeight - e.clientY < 238
    },
    // 隐藏颜色选择框
    hideColorPicker () {
      this.isShow = false
    },
    // 隐藏边框样式下拉框
    hideBorderStyle () {
      this.isShowBorderStyle = false
    },
    // 改变边框样式下拉框
    changeBorderStyle (event) {
      this.border.borderStyle = event.currentTarget.dataset.type
    },
    // 准备提交
    prepareSubmit () {
      let weight = this.border.borderWeight
      let style = this.border.borderStyle
      let rgba = this.border.color.rgba
      let currentColor = rgba.a === 1 ? this.border.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      this.submit('border', this.now, `${weight}px ${style} ${currentColor}`)
    },
    del () {
      this.submit('border', this.now, '')
    }
  },
  computed: {
    rgba () {
      let rgba = this.border.color.rgba
      if (rgba.a === 0) { // 透明度为0时，用斜纹代替颜色，表示透明
        return `linear-gradient(45deg, rgba(0, 0, 0, 0.15) 25%, transparent 25%, rgba(0, 0, 0, 0.15) 50%, transparent 50%, rgba(0, 0, 0, 0.15) 75%, transparent 75%, rgba(0, 0, 0, 0.15))`
      } else { // 其他情况下显示正常颜色
        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    },
    colorText () {
      let rgba = this.border.color.rgba
      if (rgba.a === 0) { // 透明度为0时，颜色为“无”
        return '无'
      } else { // 其他情况下显示正常颜色文本
        return rgba.a === 1 ? this.border.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    },
    isMed () {
      return this.now !== 'standard'
    }
  }
}
</script>

<style scoped>
  input[type=range]{
    width: 50px;
  }
  .item{
    display: inline-block;
    margin-right: 20px;
  }
  .color{
    position: relative;
    cursor: url("../../assets/cursor/brush.png"),pointer;
  }
  .colorPicker{
    position: absolute;
    left: 0;
  }
  .currentColor{
    display: inline-block;
    width: 15px;
    height: 15px;
  }
  .currentColorText{
    font-weight: lighter;
    font-size: 16px;
  }
  .chooseContainer{
    padding: 6px 8px;
  }
</style>
