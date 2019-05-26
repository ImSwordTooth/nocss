<template>
  <li id="fontsize">
    <span  class="operateTitle"><i class="iconfont iconfontsize"></i>字体大小</span>
    <div>
      <input class="opacityChoose" type="range" min="12" max="100" step="1" v-model="fontsize">
      <label>
        <input type="text" v-model="fontsize">
        <span>px</span>
      </label>
    </div>
  </li>
</template>

<script>
    export default {
        name: "fontsize",
      data(){
          return{
            fontsize:12
          }
      },
      watch:{
          fontsize:function () {
            let codes = this.$store.getters.getCodes;
            codes = codes.replace(/(?<=\bfont-size:).+(?=;)/g,this.fontsize+'px');
            this.$store.dispatch('changeCodes',codes)
          }
      }
    }
</script>

<style scoped>
  input[type=range]{
    width: 200px;
  }
  .fontsizetext{
    background-color: #e8e8e8;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: 1px 1px 1px 0px #b1b1b1
  }
  .fontsizetext:after{
    content:'px'
  }
</style>
