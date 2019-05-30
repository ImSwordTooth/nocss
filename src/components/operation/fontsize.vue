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
      props:["now"],
      data(){
          return{
            fontsize:12
          }
      },
      watch:{
          fontsize:function () {
            switch (this.now) {
              case 'standard':
                let codes = this.$store.getters.getCodes;
                if ( codes.match(/\bfont-size\b/g)){
                  codes = codes.replace(/(?<=\bfont-size:).+(?=;)/g,this.fontsize+'px')
                }else {
                  codes = codes.replace(/}/g,`\tfont-size:${this.fontsize}px;\n}`)
                }
                this.$store.dispatch('changeCodes',codes);
                break;
              case 'hover':
                let hoverCodes = this.$store.getters.getHoverCodes;
                if ( hoverCodes.match(/\bfont-size\b/g)){
                  hoverCodes = hoverCodes.replace(/(?<=\bfont-size:).+(?=;)/g,this.fontsize+'px')
                }else {
                  hoverCodes = hoverCodes.replace(/}/g,`\tfont-size:${this.fontsize}px;\n}`)
                }
                this.$store.dispatch('changeHoverCodes',hoverCodes);
                break;
            }
          }
      }
    }
</script>

<style scoped>
  input[type=range]{
    width: 200px;
  }
</style>
