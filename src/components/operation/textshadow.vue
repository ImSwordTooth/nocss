<template>
  <li id="textshadow">
    <span class="operateTitle"><i class="iconfont icontextshadow"></i>字体阴影</span>
    <div>
      <div class="item">
        <span class="color" :class="{'tttop':isShow}" @click="isShow = true" v-clickoutside="hideColorPicker">
          <span class="currentColor" :style="{'background':rgba}"></span>
          <span class="currentColorText">{{colorText}}</span>
          <chrome-picker class="colorPicker" v-if="isShow" v-model="color"></chrome-picker>
        </span>
      </div>
      <div class="item">
        <span class="info">x：</span>
        <input type="range" min="-10" max="10" step="1" v-model="offsetX">
        <span>{{offsetX}}</span>
      </div>
      <div class="item">
        <span class="info">y：</span>
        <input type="range" min="-10" max="10" step="1" v-model="offsetY">
        <span>{{offsetY}}</span>
      </div>
      <div class="item">
        <span class="info">blur：</span>
        <input type="range" min="0" max="20" step="1" v-model="blur">
        <span>{{blur}}</span>
      </div>
    </div>
  </li>
</template>

<script>
  import {Chrome} from 'vue-color'

  export default {
      name: "textshadow",
      props:["now"],
      data(){
        return{
          offsetX:0,
          offsetY:0,
          blur:0,
          color:{
            rgba: { r: 0, g: 0, b: 0, a: 0 },
            a: 0
          },
          isShow:false,
        }
      },
      components:{
        'chrome-picker': Chrome,
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
      methods:{
        hideColorPicker(){
          this.isShow = false
        },
        prepareSubmit(now){
          let x = this.offsetX;
          let y = this.offsetY;
          let blur = this.blur;
          let rgba = this.color.rgba;
          let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          this.submit('text-shadow',this.now,`${x}px ${y}px ${blur}px ${currentColor}`)
        }
      },
      watch:{
        offsetX:function () {
          this.prepareSubmit()
        },
        offsetY:function () {
          this.prepareSubmit()
        },
        blur:function(){
          this.prepareSubmit()
        },
        color:function () {
          this.prepareSubmit()
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
  .info{
    font-size: 14px;
    color: #909090;
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
