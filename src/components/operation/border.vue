<template>
  <li id="border">
    <span class="operateTitle"><i class="iconfont iconborder"></i>边框</span>
    <div>
      <div class="item">
        <input type="range" min="0" max="10" step="1" v-model="borderWeight">
        <span class="borderWeightText">{{borderWeight}}</span>
      </div>
      <div class="item">
        <span class="currentBorderStyle" @click="isShowBorderStyle = !isShowBorderStyle" v-clickoutside="hideBorderStyle">{{borderStyle}}
          <i class="iconfont" :class="{'iconuparrow':isShowBorderStyle,'icondownarrow':!isShowBorderStyle}"></i>
          <ul class="borderStyleUl" v-show="isShowBorderStyle">
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
  import { Chrome } from 'vue-color'
    export default {
      name: "border",
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
        submit(){
          let codes = this.$store.getters.getCodes;
          let weight = this.borderWeight;
          let style = this.borderStyle;
          let rgba = this.color.rgba;
          let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          if ( codes.match(/\bborder\b/g)){
            if (weight == 0 && rgba.a == 0){
              codes = codes.replace(/\n\tborder:.+;/g,'');
            }else {
              codes = codes.replace(/(?<=\bborder:).+(?=;)/g,`${weight}px ${style} ${currentColor}`)
            }
          }else {
            codes = codes.replace(/}/g,`\tborder:${weight}px ${style} ${currentColor};\n}`)
          }
          this.$store.dispatch('changeCodes',codes)
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
          this.submit()
        },
        borderStyle:function () {
          this.submit()
        },
        color:function () {
          this.submit()
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
  .borderWeightText{
    background-color: #e8e8e8;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: 1px 1px 1px 0px #b1b1b1
  }
  .borderWeightText:after{
    content:'px'
  }
  .currentBorderStyle{
    position: relative;
    display: inline-block;
    line-height: 10px;
    cursor: url("../../assets/cursor/pen.png"),pointer;
    padding: 5px;
    font-size: 12px;
    border-radius: 5px;
    z-index: 7;
    background-color: #e8e8e8;
    box-shadow: 1px 1px 1px 0 #b1b1b1
  }
  /*.currentBorderStyle>i{*/
    /*padding-right: 5px;*/
    /*border-radius: 5px;*/
  /*}*/
  .borderStyleUl{
    position: absolute;
    padding: 0;
    margin: 0;
    list-style: none;
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 1px 1px 4px 1px #e2e2e2;
  }
  .borderStyleUl li{
    padding: 3px 8px;
    border-bottom: solid 1px #e2e2e2;
    cursor: url("../../assets/cursor/pen.png"),pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 25px;
  }
  .borderStyleUl li:nth-last-child(1){
    border-radius: 0 0 5px 5px;
  }
  .borderStyleUl li:nth-child(1){
    border-radius: 5px 5px 0 0;
  }
  .borderStyleUl li:hover{
    background-color: #5a5a5a;
    color: #fbdf0c;
    transition: background-color .5s;
  }
  .color{
    position: relative;
    cursor: url("../../assets/cursor/pen.png"),pointer;
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
</style>
