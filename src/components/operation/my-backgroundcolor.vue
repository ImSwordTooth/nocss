<template>
  <li>
    <span class="operateTitle" @click.ctrl="del" v-tooltip.top="'该项与“渐变”互斥'" title="background-color"><i class="iconfont iconbackgroundcolor"></i>背景色</span>
    <div class="content">
      <span class="color" :class="{'tttop':isShow}" @click="isShow = true" v-clickoutside="hideColorPicker">
        <span class="currentColor" :style="{'background':rgba}"></span>
        <span class="currentColorText">{{colorText}}</span>
        <chrome-picker class="colorPicker" v-if="isShow" v-model="color"></chrome-picker>
      </span>
    </div>
  </li>
</template>

<script>
import {Chrome} from 'vue-color'

export default {
  name: 'my-backgroundcolor',
  props: ['now'],
  components: {
    'chrome-picker': Chrome
  },
  data () {
    return {
      color: { // 颜色
        rgba: { r: 0, g: 0, b: 0, a: 0 },
        a: 1
      },
      isShow: false // 控制颜色选择框的显示
    }
  },
  created () {
    this.$watch('$data.color', function () {
      let rgba = this.color.rgba
      let currentColor = rgba.a === 1 ? this.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      this.submit('background-color', this.now, currentColor)
    }, {immediate: this.isMed})
  },
  computed: {
    rgba () {
      let rgba = this.color.rgba
      if (rgba.a === 0) { // 透明度为0时，用斜纹代替颜色，表示透明
        return `linear-gradient(45deg, rgba(0, 0, 0, 0.15) 25%, transparent 25%, rgba(0, 0, 0, 0.15) 50%, transparent 50%, rgba(0, 0, 0, 0.15) 75%, transparent 75%, rgba(0, 0, 0, 0.15))`
      } else { // 其他情况下显示正常颜色
        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    },
    colorText () {
      let rgba = this.color.rgba
      if (rgba.a === 0) { // 透明度为0时，颜色为“无”
        return '无'
      } else { // 其他情况下显示正常颜色文本
        return rgba.a === 1 ? this.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    },
    isMed () {
      return this.now !== 'standard'
    }
  },
  methods: {
    // 隐藏颜色选择框
    hideColorPicker () {
      this.isShow = false
    },
    del () {
      this.submit('background-color', this.now, '')
    }
  }
}
</script>

<style scoped>
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
</style>
