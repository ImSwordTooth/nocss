<template>
  <li id="textshadow">
    <span class="operateTitle"><i class="iconfont iconboxshadow"></i>盒子阴影</span>
    <div>
      <!--<p class="already" v-if="alreadyShadow.length > 0" v-for="shadow in alreadyShadow">{{shadow}}</p>-->
      <div class="oneline">
        <div class="item">
          <span class="color" @click="isShow = true" v-clickoutside="hideColorPicker">
            <span class="currentColor" :style="{'background':rgba}"></span>
            <span class="currentColorText">{{colorText}}</span>
            <chrome-picker class="colorPicker" v-if="isShow" v-model="color"></chrome-picker>
          </span>
        </div>
        <div class="item">
          <span class="currentType" @click="isShowType = !isShowType" v-clickoutside="hideType">{{type}}
            <i class="iconfont" :class="{'iconuparrow':isShowType,'icondownarrow':!isShowType}"></i>
            <ul class="currentTypeUl" v-show="isShowType">
              <li @click="changeType($event)"><i class="iconfont iconinset"></i>inset</li>
              <li @click="changeType($event)"><i class="iconfont iconoutset"></i>outset</li>
            </ul>
          </span>
        </div>
      </div>
      <div class="item">
        <span class="info">x：</span>
        <input type="range" min="-10" max="10" step="1" v-model="offsetX">
        <span class="rangeText">{{offsetX}}</span>
      </div>
      <div class="item">
        <span class="info">y：</span>
        <input type="range" min="-10" max="10" step="1" v-model="offsetY">
        <span class="rangeText">{{offsetY}}</span>
      </div>
      <div class="item">
        <span class="info">blur：</span>
        <input type="range" min="0" max="20" step="1" v-model="blur">
        <span class="rangeText">{{blur}}</span>
      </div>
      <div class="item">
        <span class="info">spread：</span>
        <input type="range" min="0" max="20" step="1" v-model="spread">
        <span class="rangeText">{{spread}}</span>
      </div>
      <!--<button class="operate_btn" @click="addAlready">添加</button>-->
    </div>
  </li>
</template>

<script>
  import { Chrome } from 'vue-color'
    export default {
        name: "boxshadow",
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
            a: 0
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
        submit(){
          let codes = this.$store.getters.getCodes;
          let rgba = this.color.rgba;
          let type = this.type === 'inset' ? this.type : '';
          let x = this.offsetX;
          let y = this.offsetY;
          let blur = this.blur;
          let spread = this.spread;
          let currentColor = rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          if ( codes.match(/\bbox-shadow\b/g)){
            if (blur === 0 && spread === 0 && currentColor.a === 0){
              codes = codes.replace(/\n\tbox-shadow:.+;/g,'');
            }else {
              codes = codes.replace(/(?<=\bbox-shadow:).+(?=;)/g,`${x}px ${y}px ${blur}px ${spread}px ${type} ${currentColor}`)
            }
          }else {
            codes = codes.replace(/}/g,`\tbox-shadow:${x}px ${y}px ${blur}px ${spread}px ${type} ${currentColor};\n}`)
          }
          this.$store.dispatch('changeCodes',codes)
        }
      },
      watch:{
        color:function () {
          this.submit()
        },
        type:function(){
          this.submit()
        },
        offsetX:function () {
          this.submit()
        },
        offsetY:function () {
          this.submit()
        },
        blur:function(){
          this.submit()
        },
        spread:function () {
          this.submit()
        }
      }
    }
</script>

<style scoped>
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
  .info{
    font-size: 14px;
    color: #909090;
  }
  .rangeText{
    background-color: #e8e8e8;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: 1px 1px 1px 0 #b1b1b1
  }
  .rangeText:after{
    content:'px'
  }
  .color{
    position: relative;
    cursor: url("../../assets/cursor/brush.png"),pointer;
    z-index: 5;
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
  .currentType{
    position: relative;
    display: inline-block;
    line-height: 10px;
    cursor: url("../../assets/cursor/pen.png"),pointer;
    padding: 5px;
    font-size: 12px;
    border-radius: 5px;
    z-index: 5;
    background-color: #e8e8e8;
    box-shadow: 1px 1px 1px 0px #b1b1b1
  }
  .currentTypeUl{
    position: absolute;
    padding: 0;
    margin: 0;
    list-style: none;
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 1px 1px 4px 1px #e2e2e2;
  }
  .currentTypeUl li{
    padding: 3px 8px;
    border-bottom: solid 1px #e2e2e2;
    cursor: url("../../assets/cursor/pen.png"),pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 25px;
  }
  .currentTypeUl li:nth-last-child(1){
    border-radius: 0 0 5px 5px;
  }
  .currentTypeUl li:nth-child(1){
    border-radius: 5px 5px 0 0;
  }
  .currentTypeUl li:hover{
    background-color: #5a5a5a;
    color: #fbdf0c;
    transition: background-color .5s;
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
