<template>
  <li>
    <span class="operateTitle"><i class="iconfont icontextshadow"></i>字体阴影</span>
    <div>
      <div class="item">
        <span class="color" :class="{'tttop':isShow}" @click="isShow = true" v-clickoutside="hideColorPicker">
          <span class="currentColor" :style="{'background':rgba}"></span>
          <span class="currentColorText">{{colorText}}</span>
          <chrome-picker class="colorPicker" v-if="isShow" v-model="textshadow.color"></chrome-picker>
        </span>
      </div>
      <div class="item">
        <span class="info">x：</span>
        <input type="range" min="-10" max="10" step="1" v-model="textshadow.offsetX">
        <span>{{textshadow.offsetX}}px</span>
      </div>
      <div class="item">
        <span class="info">y：</span>
        <input type="range" min="-10" max="10" step="1" v-model="textshadow.offsetY">
        <span>{{textshadow.offsetY}}px</span>
      </div>
      <div class="item">
        <span class="info">模糊量：</span>
        <input type="range" min="0" max="20" step="1" v-model="textshadow.blur">
        <span>{{textshadow.blur}}px</span>
      </div>
    </div>
  </li>
</template>

<script>
  import {Chrome} from 'vue-color'

  export default {
      name: "my-textshadow",
      props:["now"],
      data(){
        return{
          textshadow:{
            offsetX:0,
            offsetY:0,
            blur:0,
            color:{
              rgba: { r: 0, g: 0, b: 0, a: 0 },
              a: 1
            },
          },
          isShow:false,
        }
      },
      components:{
        'chrome-picker': Chrome,
      },
      created(){
          this.$watch('$data.textshadow',function () {
            this.prepareSubmit()
          },{immediate:this.isMed,deep:true})
      },
      computed:{
        rgba(){
          let rgba = this.textshadow.color.rgba;
          if(rgba.a === 0){
            return `linear-gradient(45deg, rgba(0, 0, 0, 0.15) 25%, transparent 25%, rgba(0, 0, 0, 0.15) 50%, transparent 50%, rgba(0, 0, 0, 0.15) 75%, transparent 75%, rgba(0, 0, 0, 0.15))`
          }
          else {
            return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
          }
        },
        colorText(){
          let rgba = this.textshadow.color.rgba;
          if (rgba.a === 0){
            return "无"
          } else {
            return rgba.a === 1 ? this.textshadow.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
          }
        },
        isMed(){
          return this.now !== 'standard'
        }
      },
      methods:{
        hideColorPicker(){
          this.isShow = false
        },
        prepareSubmit(now){
          let x = this.textshadow.offsetX;
          let y = this.textshadow.offsetY;
          let blur = this.textshadow.blur;
          let rgba = this.textshadow.color.rgba;
          let currentColor = rgba.a === 1 ? this.textshadow.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          this.submit('text-shadow',this.now,`${x}px ${y}px ${blur}px ${currentColor}`)
        }
      }
    }
</script>

<style scoped>
  .item{
    display: inline-block;
    margin-right: 20px;
  }
  input[type=range]{
    width: 80px;
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
</style>
