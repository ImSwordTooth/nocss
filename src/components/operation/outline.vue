<template>
    <li id="outline">
      <span class="operateTitle"><i class="iconfont iconoutline"></i>轮廓线</span>
      <div>
        <div class="item">
          <input type="range" min="0" max="10" step="1" v-model="outline.outlineWeight">
          <span class="borderWeightText">{{outline.outlineWeight}}</span>
        </div>
        <div class="item">
          <span class="info">样式：</span>
          <div class="chooseContainer" :class="{'tttop':isShowOutlineStyle}" @click="isShowOutlineStyle = !isShowOutlineStyle" v-clickoutside="hideOutlineStyle">{{outline.outlineStyle}}
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
          </div>
        </div>
        <div class="item">
          <span class="color" @click="isShow = true" v-clickoutside="hideColorPicker">
            <span class="currentColor" :style="{'background':rgba}"></span>
            <span class="currentColorText">{{colorText}}</span>
            <chrome-picker class="colorPicker" v-if="isShow" v-model="outline.color"></chrome-picker>
          </span>
        </div>
        <div class="offsetDiv">
          <span class="info">偏移量：</span>
          <input type="range" min="0" max="20" step="1" v-model="outlineOffset">
          <span class="borderWeightText">{{outlineOffset}}</span>
        </div>
        <label class="checkbox">
          <input type="checkbox" v-model="isChecked">
          <i class="iconfont" :class="{'iconcheckboxnotchecked':!isChecked,'iconcheckboxchecked':isChecked}"></i>
          为空
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
            outline:{
              outlineWeight:0,
              outlineStyle:'solid',
              color:{
                rgba: { r: 0, g: 0, b: 0, a: 0 },
                a: 1
              }
            },
            isShowOutlineStyle:false,
            isShow:false,
            outlineOffset:0,
            isChecked:false
          }
      },
      components:{
        'chrome-picker': Chrome,
      },
      created(){
        this.$watch('$data.outline',function () {
          this.prepareCommit();
        },{immediate:this.isMed,deep:true});
        this.$watch('$data.outlineOffset',function () {
          this.submit("outline-offset",this.now,`${this.outline.outlineOffset}px`)
        },{immediate:this.isMed});
        this.$watch('$data.isChecked',function () {
          if (this.isChecked){
            this.submit("outline",this.now,"none");
          }else {
            this.prepareCommit();
          }
        },{immediate:this.isMed});
      },
      computed:{
        rgba(){
          let rgba = this.outline.color.rgba;
          if(rgba.a === 0){
            return `linear-gradient(45deg, rgba(0, 0, 0, 0.15) 25%, transparent 25%, rgba(0, 0, 0, 0.15) 50%, transparent 50%, rgba(0, 0, 0, 0.15) 75%, transparent 75%, rgba(0, 0, 0, 0.15))`
          }
          else {
            return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
          }
        },
        colorText(){
          let rgba = this.outline.color.rgba;
          if (rgba.a === 0){
            return "无"
          } else {
            return rgba.a === 1 ? this.outline.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
          }
        },
        isMed(){
          return this.now !== 'standard'
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
          this.outline.outlineStyle = e.currentTarget.innerText;
        },
        prepareCommit(){
          let rgba = this.outline.color.rgba;
          let currentColor = rgba.a === 1 ? this.outline.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          this.submit('outline',this.now,`${this.outline.outlineWeight}px ${this.outline.outlineStyle} ${currentColor}`);
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

  .checkbox{
    float: right;
    margin-right: 30px;
  }
</style>
