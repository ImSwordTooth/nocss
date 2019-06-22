<template>
  <li id="fontsize">
    <span  class="operateTitle"><i class="iconfont iconfontsize"></i>字体大小</span>
    <div>
      <input class="opacityChoose" type="range" min="12" max="100" step="1" v-model="fontsize">
      <span>{{fontsize}}</span>
    </div>
  </li>
</template>

<script>
    export default {
      name: "fontsize",
      props:["now"],
      data(){
        return{
          fontsize:12                                                 //字体大小
        }
      },
      created(){
        this.$watch('$data.fontsize', function () {
          this.submit('font-size',this.now,`${this.fontsize}px`)
        },{immediate:this.isMed})
      },
      computed:{
        isMed(){
          return this.now !== 'standard'
        }
      }
    }
</script>

<style scoped>
  input[type=range]{
    width: 200px;
  }
</style>
