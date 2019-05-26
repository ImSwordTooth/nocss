<template>
    <div>
      <ul class="operationUl">
        <color v-if="isAlive" now="standard"></color>
        <fontsize v-if="isAlive"></fontsize>
        <fontstyle v-if="isAlive"></fontstyle>
        <backgroundcolor v-if="isAlive"></backgroundcolor>
        <border v-if="isAlive"></border>
        <padding v-if="isAlive"></padding>
        <textshadow v-if="isAlive"></textshadow>
        <boxshadow v-if="isAlive"></boxshadow>
      </ul>
    </div>
</template>

<script>
    import Color from "../operation/color";
    import Fontsize from "../operation/fontsize";
    import Fontstyle from "../operation/fontstyle";
    import Backgroundcolor from "../operation/backgroundcolor";
    import Border from "../operation/border";
    import Padding from "../operation/padding";
    import Textshadow from "../operation/textshadow";
    import Boxshadow from "../operation/boxshadow";
    export default {
        name: "standard",
      computed:{
        isAlive(){
          return this.$store.getters.getIsAlive;
        }
      },
      components: {Boxshadow, Textshadow, Padding, Border, Backgroundcolor, Fontstyle, Fontsize, Color},
      watch:{
          isAlive(){
            this.$nextTick(()=>(this.$store.dispatch('changeIsAlive',true)))
          }
      }
    }
</script>

<style scoped>
@import "../../css/operate_body.css";
</style>
