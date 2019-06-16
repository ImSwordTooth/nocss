<template>
  <li id="textshadow">
    <span class="operateTitle"><i class="iconfont iconboxshadow"></i>盒子阴影</span>
    <div>
      <!--<p class="already" v-if="alreadyShadow.length > 0" v-for="shadow in alreadyShadow">{{shadow}}</p>-->
      <div class="oneline">
        <div class="item">
          <span class="color" :class="{'tttop':isShow}" @click="isShow = true" v-clickoutside="hideColorPicker">
            <span class="currentColor" :style="{'background':rgba}"></span>
            <span class="currentColorText">{{colorText}}</span>
            <chrome-picker class="colorPicker" v-if="isShow" v-model="color"></chrome-picker>
          </span>
        </div>
        <div class="item">
          <span class="info">样式：</span>
          <span class="chooseContainer" :class="{'tttop':isShowType}" @click="isShowType = !isShowType" v-clickoutside="hideType">{{type}}
            <i class="iconfont" :class="{'iconuparrow':isShowType,'icondownarrow':!isShowType}"></i>
            <ul v-show="isShowType">
              <li @click="changeType($event)"><i class="iconfont iconinset"></i>inset</li>
              <li @click="changeType($event)"><i class="iconfont iconoutset"></i>outset</li>
            </ul>
          </span>
        </div>
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
        <span class="info">模糊量：</span>
        <input type="range" min="0" max="20" step="1" v-model="blur">
        <span>{{blur}}</span>
      </div>
      <div class="item">
        <span class="info">尺寸：</span>
        <input type="range" min="0" max="20" step="1" v-model="spread">
        <span>{{spread}}</span>
      </div>
      <!--<button class="operate_btn" @click="addAlready">添加</button>-->
    </div>
  </li>
</template>

<script>
  import {Chrome} from 'vue-color'

  export default {
    name: "boxshadow",
      props:["now"],
      data(){
        return{
          alreadyShadow:[],
          offsetX:0,
          offsetY:0,
          blur:0,
          spread:0,
          type:'outset',
          color:{
            rgba: { r: 0, g: 0, b: 0, a: 0 },
            a: 1
          },
          isShow:false,
          isShowType:false
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
        hideType(){
          this.isShowType = false
        },
        changeType(event){
          this.type= event.currentTarget.innerText;
        },
        // addAlready(){
        //   let rgba = this.color.rgba;
        //   let type = this.type === 'inset' ? this.type : '';
        //   let x = this.offsetX;
        //   let y = this.offsetY;
        //   let blur = this.blur;
        //   let spread = this.spread;
        //   let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a}),`;
        //   this.alreadyShadow.push(`${x}px ${y}px ${blur}px ${spread}px ${type} ${currentColor}`);
        // },
        prepareSubmit(now){
          let rgba = this.color.rgba;
          let type = this.type === 'inset' ? this.type : '';
          let x = this.offsetX;
          let y = this.offsetY;
          let blur = this.blur;
          let spread = this.spread;
          let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          this.submit('box-shadow',now,`${x}px ${y}px ${blur}px ${spread}px ${type} ${currentColor}`)
        }
      },
      watch:{
        color:function () {
          this.prepareSubmit(this.now)
        },
        type:function(){
          this.prepareSubmit(this.now)
        },
        offsetX:function () {
          this.prepareSubmit(this.now)
        },
        offsetY:function () {
          this.prepareSubmit(this.now)
        },
        blur:function(){
          this.prepareSubmit(this.now)
        },
        spread:function () {
          this.prepareSubmit(this.now)
        }
      }
    }
</script>

<style scoped>
  .listDiv{
    /*display: inline-block;*/
    margin-bottom: 10px;
  }
  .listDiv:nth-last-of-type(1){
    margin-bottom: 0;
  }
  .item{
    display: inline-block;
    margin-right: 20px;
    line-height: 24px;
  }
  .oneline{
    margin-bottom: 5px;
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
  .chooseContainer{
    padding: 6px 8px;
  }
  @keyframes ss {
    0%{
      transform: scale(1.1,1);
    }
    100%{
      transform: scale(1,1);
    }
  }
  .operate_btn{
    color:#3698CA;
    font-size:14px;
    border:1px solid #c5c5c5;
    background-color:rgba(0,0,0,0);
    cursor: url("../../assets/cursor/pen.png"),pointer;
    transition: background-color 1s;
    outline: none;
  }
  .operate_btn:hover{
    background-color: #3698CA;
    color: white;
    transition: background-color 1s;
  }
  .already{
    margin: 5px 0;
    font-size: 14px;
    color: #444444;
    font-weight: bold;
  }
</style>
