<template>
  <li id="padding">
    <span class="operateTitle"><i class="iconfont iconpadding"></i>内边距</span>
    <div>
      <span class="info">上：</span><input type="text" class="operateText" maxlength="3" v-model="padding.paddingTop"><span class="unit">px</span>
      <span class="info">右：</span><input type="text" class="operateText" maxlength="3" v-model="padding.paddingRight"><span class="unit">px</span>
      <span class="info">下：</span><input type="text" class="operateText" maxlength="3" v-model="padding.paddingBottom"><span class="unit">px</span>
      <span class="info">左：</span><input type="text" class="operateText" maxlength="3" v-model="padding.paddingLeft"><span class="unit">px</span>
    </div>
  </li>
</template>

<script>
    export default {
      name: "padding",
      props:['now'],
      data(){
        return{
          padding:{
            paddingTop:0,                                                       //内边距~上
            paddingRight:0,                                                     //内边距~右
            paddingBottom:0,                                                    //内边距~下
            paddingLeft:0                                                      //内边距~左
          }
        }
      },
      created(){
        this.$watch('$data.padding',function () {
          let codes = this.$store.getters.getCodes;
          let top = this.padding.paddingTop;
          let right = this.padding.paddingRight;
          let bottom = this.padding.paddingBottom;
          let left = this.padding.paddingLeft;
          this.submit('padding',this.now,`${top}px ${right}px ${bottom}px ${left}px`);
        },{immediate:this.isMed,deep:true})
      },
      computed:{
        isMed(){
          return this.now !== 'standard'
        }
      }
    }
</script>

<style scoped>

</style>
