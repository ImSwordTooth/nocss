<template>
  <li id="color">
    <span class="operateTitle"><i class="iconfont iconcolor"></i>颜色</span>
    <div>
      <span class="color" @click="isShow = true" v-clickoutside="hideColorPicker">
        <span class="currentColor" :style="{'backgroundColor':rgba}"></span>
        <span class="currentColorText">{{colorText}}</span>
        <chrome-picker class="colorPicker" v-if="isShow" v-model="color"></chrome-picker>
      </span>
    </div>
  </li>
</template>

<script>
  import {Chrome} from 'vue-color'

  export default {
      name: "color",
      props:["now"],
      components:{
        'chrome-picker': Chrome,
      },
      data(){
          return{
            color:{
              hex: '#000000',
              hsl: { h: 150, s: 0, l: 0, a: 1 },
              hsv: { h: 150, s: 0, v: 0, a: 1 },
              rgba: { r: 0, g: 0, b: 0, a: 1 },
              a: 1
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
          return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        },
        colorText(){
          let rgba = this.color.rgba;
          return rgba.a === 1 ? this.color.hex:`rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        }
      },
      watch:{
        color:function () {
          let rgba = this.color.rgba;
          let currentColor = rgba.a === 1 ? this.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
          switch (this.now) {
              case 'standard': {
                let codes = this.$store.getters.getCodes;
                if ( codes.match(/\t\bcolor\b/g)){
                  codes = codes.replace(/(?<=\t\bcolor:).+(?=;)/g,currentColor)
                }else {
                  codes = codes.replace(/}/g,`\tcolor:${currentColor};\n}`)
                }
                this.$store.dispatch('changeCodes', codes);
                break;
              }
              case 'hover':{
                let codes = this.$store.getters.getHoverCodes;
                if ( codes.match(/\bcolor\b/g)){
                  codes = codes.replace(/(?<=\bcolor:).+(?=;)/g,currentColor)
                }else {
                  codes = codes.replace(/}/g,`\tcolor:${currentColor};\n}`)
                }
                this.$store.dispatch('changeHoverCodes', codes);
                break;
              }
            }

          }
      }
    }
</script>

<style scoped>
  .color{
    position: relative;
    cursor: url("../../assets/cursor/brush.png"),auto;
    z-index: 9;
  }
  .colorPicker{
    position: absolute;
    left: 0;
  }
  .currentColor{
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: black;
  }
  .currentColorText{
    font-weight: lighter;
    font-size: 16px;
  }
</style>
