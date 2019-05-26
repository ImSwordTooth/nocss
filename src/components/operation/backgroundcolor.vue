<template>
  <li id="backgroundcolor">
    <span class="operateTitle" v-tooltip.top="'该项与“渐变”互斥'"><i class="iconfont iconbackgroundcolor"></i>背景色</span>
    <div>
      <span class="color" @click="isShow = true" v-clickoutside="hideColorPicker">
        <span class="currentColor" :style="{'background':rgba}"></span>
        <span class="currentColorText">{{colorText}}</span>
        <chrome-picker class="colorPicker" v-if="isShow" v-model="color"></chrome-picker>
      </span>
    </div>
  </li>
</template>

<script>
  import { Chrome } from 'vue-color'
  export default {
    name: "backgroundcolor",
    components:{
      'chrome-picker': Chrome,
    },
    data(){
      return{
        color:{
          rgba: { r: 0, g: 0, b: 0, a: 0 },
          a: 0
        },
        isShow:false,
      }
    },
    methods:{
      hideColorPicker(){
        this.isShow = false
      }
    },
    computed:{
      rgba(){
        let rgba = this.color.rgba;
        if(rgba.a === 0){
          return `linear-gradient(45deg, rgba(0, 0, 0, 0.15) 25%, transparent 25%, rgba(0, 0, 0, 0.15) 50%, transparent 50%, rgba(0, 0, 0, 0.15) 75%, transparent 75%, rgba(0, 0, 0, 0.15))`
        }
        else {
          return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        }
      },
      colorText(){
        let rgba = this.color.rgba;
        if (rgba.a === 0){
          return "无"
        } else {
          return rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        }
      }
    },
    watch:{
      color:function () {
        let codes = this.$store.getters.getCodes;
        let rgba = this.color.rgba;
        let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
        if ( codes.match(/\bbackground-color\b/g)){
          codes = codes.replace(/(?<=\bbackground-color:).+(?=;)/g,currentColor)
        }else {
          codes = codes.replace(/}/g,`\tbackground-color:${currentColor};\n}`)
        }
        this.$store.dispatch('changeCodes',codes)
      }
    }
  }
</script>

<style scoped>
  .color{
    position: relative;
    cursor: url("../../assets/cursor/pen.png"),pointer;
    z-index: 8;
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
