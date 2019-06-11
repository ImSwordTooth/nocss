<template>
  <li id="padding">
    <span class="operateTitle"><i class="iconfont iconpadding"></i>内边距</span>
    <div>
      <span class="info">上：</span><input type="text" maxlength="3" v-model="paddingTop" @input="changePadding"><span class="unit">px</span>
      <span class="info">右：</span><input type="text" maxlength="3" v-model="paddingRight" @input="changePadding"><span class="unit">px</span>
      <span class="info">下：</span><input type="text" maxlength="3" v-model="paddingBottom" @input="changePadding"><span class="unit">px</span>
      <span class="info">左：</span><input type="text" maxlength="3" v-model="paddingLeft" @input="changePadding"><span class="unit">px</span>
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
  .info{
    font-size: 14px;
    color: #909090;
  }
  input[type=text]{
    border-radius: 2px;
    line-height: normal;
    white-space: nowrap;
    font-size: 14px;
    padding: 5px 2px;
    text-align: center;
    color: #000;
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #f3f3f3;
    width: 30px;
    -webkit-box-shadow: 0 1px 2px -1px rgba(255,255,255,0.5) inset, 0 -2px 0 0 rgba(0,0,0,0.1) inset;
    outline: none;
    vertical-align: middle;
  }
  input[type=text]:focus{
    background-color: #d4ecfd;
  }
  .unit{
    margin:0 20px 0 5px;
    font-size: 12px;
  }
</style>
