<template>
    <div class="Title">
      <div>
        <i class="iconfont iconoperations"></i>操作
      </div>
      <div class="toolsBtn">
        <i class="iconfont iconreset" v-tooltip.bottom.end="'Ctrl+单击来重置所有项'" @click.ctrl="reload"></i>
      </div>
    </div>
</template>

<script>
    export default {
      name: "operate",
      props:{
        onsubmit:{
          type:Function,
          default:null
        }
      },
      methods:{
        reload(){
              this.$store.dispatch('changeIsAlive',false);
              this.$store.dispatch('changeCodes',`.nocss {\n}`);
          }
      }
    }
</script>

<style scoped>

</style>
