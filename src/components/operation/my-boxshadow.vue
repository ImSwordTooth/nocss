<template>
  <li>
    <span class="operateTitle" @click.ctrl="del"><i class="iconfont iconboxshadow"></i>盒子阴影</span>
    <div>
      <div class="oneline">
        <!--<div v-for="(item,index) in list">-->
          <div class="item">
          <span class="color" :class="{'tttop':isShow}" @click="isShow = true" v-clickoutside="hideColorPicker">
            <!--{{item.isShow}}-->
            <span class="currentColor" :style="{'background':rgba}"></span>
            <span class="currentColorText">{{colorText}}</span>
            <chrome-picker class="colorPicker" v-if="isShow" v-model="boxshadow.color"></chrome-picker>
          </span>
          </div>
        <!--</div>-->

        <div class="item">
          <span class="info">样式：</span>
          <span class="chooseContainer" :class="{'tttop':isShowType}" @click="choose($event)" v-clickoutside="hideType">{{boxshadow.type}}
            <i class="iconfont" :class="{'iconuparrow':isShowType,'icondownarrow':!isShowType}"></i>
            <ul v-show="isShowType" :class="{'showTop':showTop}">
              <li @click="changeType($event)" data-type="inset"><i class="iconfont iconinset"></i>内阴影<span class="en">inset</span></li>
              <li @click="changeType($event)" data-type="outset"><i class="iconfont iconoutset"></i>外阴影<span class="en">outset</span></li>
            </ul>
          </span>
        </div>
      </div>
      <div class="item">
        <span class="info">x：</span>
        <input type="range" min="-10" max="10" step="1" v-model="boxshadow.offsetX">
        <span>{{boxshadow.offsetX}}px</span>
      </div>
      <div class="item">
        <span class="info">y：</span>
        <input type="range" min="-10" max="10" step="1" v-model="boxshadow.offsetY">
        <span>{{boxshadow.offsetY}}px</span>
      </div>
      <div class="item">
        <span class="info">模糊：</span>
        <input type="range" min="0" max="20" step="1" v-model="boxshadow.blur">
        <span>{{boxshadow.blur}}px</span>
      </div>
      <div class="item">
        <span class="info">扩散：</span>
        <input type="range" min="0" max="20" step="1" v-model="boxshadow.spread">
        <span>{{boxshadow.spread}}px</span>
      </div>
      <!--<button class="operate_btn" @click="addAlready">添加</button>-->
    </div>
  </li>
</template>

<script>
import {Chrome} from 'vue-color'

export default {
  name: 'my-boxshadow',
  props: ['now'],
  data () {
    return {
      alreadyShadow: [],
      boxshadow: {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        spread: 0,
        color: {
          rgba: { r: 0, g: 0, b: 0, a: 0 },
          a: 1
        },
        type: 'outset'
      },
      isShow: false,
      isShowType: false,
      showTop: false,
      list: [
        {
          isShow: false
        }, {
          isShow: false
        }
      ]
    }
  },
  components: {
    'chrome-picker': Chrome
  },
  created () {
    this.$watch('$data.boxshadow', function () {
      this.prepareSubmit()
    }, {immediate: this.isMed, deep: true}
    )
  },
  computed: {
    rgba () {
      let rgba = this.boxshadow.color.rgba
      if (rgba.a === 0) {
        return `linear-gradient(45deg, rgba(0, 0, 0, 0.15) 25%, transparent 25%, rgba(0, 0, 0, 0.15) 50%, transparent 50%, rgba(0, 0, 0, 0.15) 75%, transparent 75%, rgba(0, 0, 0, 0.15))`
      } else {
        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    },
    colorText () {
      let rgba = this.boxshadow.color.rgba
      if (rgba.a === 0) {
        return '无'
      } else {
        return rgba.a === 1 ? this.boxshadow.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    },
    isMed () {
      return this.now !== 'standard'
    }
  },
  methods: {
    choose (e) {
      this.isShowType = !this.isShowType
      this.showTop = window.innerHeight - e.clientY < 238
    },
    hideColorPicker () {
      this.isShow = false
      // if( this.list.every(function(item){
      //   console.log("sss")
      //  return !item.isShow
      // })){
      //   return false;
      // }else {
      //   this.list.forEach(item=>{
      //     item.isShow = false
      //   })
      // }
    },

    hideType () {
      this.isShowType = false
    },
    changeType (event) {
      this.boxshadow.type = event.currentTarget.dataset.type
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
    prepareSubmit () {
      let rgba = this.boxshadow.color.rgba
      let type = this.boxshadow.type === 'inset' ? this.boxshadow.type : ''
      let x = this.boxshadow.offsetX
      let y = this.boxshadow.offsetY
      let blur = this.boxshadow.blur
      let spread = this.boxshadow.spread
      let currentColor = rgba.a === 1 ? this.boxshadow.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      this.submit('box-shadow', this.now, `${x}px ${y}px ${blur}px ${spread}px ${type} ${currentColor}`)
    },
    del () {
      this.submit('box-shadow', this.now, '')
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
