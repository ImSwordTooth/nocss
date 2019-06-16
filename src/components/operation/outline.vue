<template>
    <li id="outline">
      <span class="operateTitle"><i class="iconfont iconoutline"></i>轮廓线</span>
      <div>
        <div class="item">
          <input type="range" min="0" max="10" step="1" v-model="outlineWeight">
          <span class="borderWeightText">{{outlineWeight}}</span>
        </div>
        <div class="item">
          <span class="info">样式：</span>
          <span class="chooseContainer" :class="{'tttop':isShowOutlineStyle}" @click="isShowOutlineStyle = !isShowOutlineStyle" v-clickoutside="hideOutlineStyle">{{outlineStyle}}
            <i class="iconfont" :class="{'iconuparrow':isShowOutlineStyle,'icondownarrow':!isShowOutlineStyle}"></i>
            <ul v-show="isShowOutlineStyle">
              <li @click="changeOutlineStyle($event)"><i class="iconfont iconsolid"></i>solid</li>
              <li @click="changeOutlineStyle($event)"><i class="iconfont icondashed"></i>dashed</li>
              <li @click="changeOutlineStyle($event)"><i class="iconfont icondouble"></i>double</li>
              <li @click="changeOutlineStyle($event)"><i class="iconfont icondotted"></i>dotted</li>
              <li @click="changeOutlineStyle($event)"><i class="iconfont iconinset"></i>inset</li>
              <li @click="changeOutlineStyle($event)"><i class="iconfont iconoutset"></i>outset</li>
              <li @click="changeOutlineStyle($event)"><i class="iconfont icongroove"></i>groove</li>
              <li @click="changeOutlineStyle($event)"><i class="iconfont iconridge"></i>ridge</li>
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
        <div class="offsetDiv">
          <span class="info">偏移量：</span>
          <input type="range" min="0" max="20" step="1" v-model="outlineOffset">
          <span class="borderWeightText">{{outlineOffset}}</span>
        </div>
        <label>

          <input type="checkbox">
          <span></span>
          是否为空
        </label>

      </div>
    </li>

</template>

<script>
  import {Chrome} from 'vue-color'

  export default {
        name: "outline",
      props:['now'],
      data(){
          return{
            outlineWeight:0,
            isShowOutlineStyle:false,
            isShow:false,
            outlineStyle:'solid',
            outlineOffset:0,
            color:{
              rgba: { r: 0, g: 0, b: 0, a: 0 },
              a: 0
            },
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
        hideOutlineStyle(){
          this.isShowOutlineStyle = false
        },
        hideColorPicker(){
          this.isShow = false
        },
        changeOutlineStyle(e){
          this.outlineStyle = e.currentTarget.innerText;
        },
        prepareCommit(){
          let rgba = this.color.rgba;
          let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          this.submit('outline',this.now,`${this.outlineWeight}px ${this.outlineStyle} ${currentColor}`);
        }
      },
      watch:{
        outlineWeight(){
          this.prepareCommit();
        },
        outlineStyle(){
          this.prepareCommit();
        },
        color(){
            this.prepareCommit();
        },
        outlineOffset(){
          this.submit("outline-offset",this.now,`${this.outlineOffset}px`)
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
  .offsetDiv{
    display: inline-block;
    margin-left: 20px;
  }
  .offsetDiv input{
    width: 100px;
  }
</style>
