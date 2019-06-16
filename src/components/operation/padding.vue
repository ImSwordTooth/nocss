<template>
  <li id="padding">
    <span class="operateTitle"><i class="iconfont iconpadding"></i>内边距</span>
    <div>
      <span class="info">上：</span><input type="text" class="operateText" maxlength="3" v-model="paddingTop" @input="changePadding"><span class="unit">px</span>
      <span class="info">右：</span><input type="text" class="operateText" maxlength="3" v-model="paddingRight" @input="changePadding"><span class="unit">px</span>
      <span class="info">下：</span><input type="text" class="operateText" maxlength="3" v-model="paddingBottom" @input="changePadding"><span class="unit">px</span>
      <span class="info">左：</span><input type="text" class="operateText" maxlength="3" v-model="paddingLeft" @input="changePadding"><span class="unit">px</span>
    </div>
  </li>
</template>

<script>
    export default {
        name: "padding",
      props:['now'],
      data(){
        return{
          paddingTop:0,
          paddingRight:0,
          paddingBottom:0,
          paddingLeft:0,
        }
      },
      methods:{
        changePadding(){
          let codes = this.$store.getters.getCodes;
          let top = this.paddingTop;
          let right = this.paddingRight;
          let bottom = this.paddingBottom;
          let left = this.paddingLeft;
          this.submit('padding',this.now,`${top}px ${right}px ${bottom}px ${left}px`);
        }
      }
    }
</script>

<style scoped>
  .unit{
    margin:0 20px 0 5px;
    font-size: 12px;
  }
</style>
