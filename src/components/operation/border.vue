<template>
  <li id="border">
    <span class="operateTitle"><i class="iconfont iconborder"></i>边框</span>
    <div>
      <div class="item">
        <input type="range" min="0" max="10" step="1" v-model="borderWeight">
        <span class="borderWeightText">{{borderWeight}}</span>
      </div>
      <div class="item">
        <span class="chooseContainer" :class="{'tttop':isShowBorderStyle}" @click="isShowBorderStyle = !isShowBorderStyle" v-clickoutside="hideBorderStyle">{{borderStyle}}
          <i class="iconfont" :class="{'iconuparrow':isShowBorderStyle,'icondownarrow':!isShowBorderStyle}"></i>
          <ul v-show="isShowBorderStyle">
            <li @click="changeBorderStyle($event)"><i class="iconfont iconsolid"></i>solid</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icondashed"></i>dashed</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icondouble"></i>double</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icondotted"></i>dotted</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont iconinset"></i>inset</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont iconoutset"></i>outset</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icongroove"></i>groove</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont iconridge"></i>ridge</li>
          </ul>
        </span>
      </div>
      <div class="item">
        <span class="color" @click="isShow = true" v-clickoutside="hideColorPicker">
          <span class="currentColor" :style="{'background':rgba}"></span>
          <span class="currentColorText">{{colorText}}</span>
          <chrome-picker class="colorPicker" v-if="isShow" v-model="color"></chrome-picker>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
  import {Chrome} from 'vue-color'

  export default {
      name: "border",
      props:["now"],
      data(){
        return{
          borderWeight:0,
          borderStyle:'solid',
          color:{
            rgba: { r: 0, g: 0, b: 0, a: 0 },
            a: 0
          },
          isShow:false,
          isShowBorderStyle:false
        }
      },
      components:{
        'chrome-picker': Chrome,
      },
      methods:{
        hideColorPicker(){
          this.isShow = false
        },
        hideBorderStyle(){
          this.isShowBorderStyle = false
        },
        changeBorderStyle(event){
          this.borderStyle = event.currentTarget.innerText;
        },
        prepareSubmit(now){
          let weight = this.borderWeight;
          let style = this.borderStyle;
          let rgba = this.color.rgba;
          let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          this.submit('border',now,`${weight}px ${style} ${currentColor}`)
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
        borderWeight:function () {
          this.prepareSubmit(this.now)
        },
        borderStyle:function () {
          this.prepareSubmit(this.now)
        },
        color:function () {
          this.prepareSubmit(this.now)
        }
      }
    }
</script>

<style scoped>
  /*.icon { width: 2.4em; height: 2.4em; vertical-align: -0.15em; fill: currentColor; overflow: hidden;}*/
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
    z-index: 7;
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
