<template>
  <div class="showCodes">
    <div class="Title">
      <div>
        <i class="iconfont iconcodes"></i>代码
      </div>
      <div class="toolsBtn">
        <i class="iconfont iconcopy" v-tooltip.bottom="'复制'" v-clipboard:copy="codes" v-clipboard:success="onCopy"></i>
      </div>
    </div>
    <pre v-highlightjs="codes" class="pre">
      <code class="css"></code>
    </pre>
  </div>

</template>

<script>
    export default {
      name: "codebox",
      data(){
          return{
            markdownhtml:`flex: .4;\nborder-top: solid 1px #c1c1c1;`
          }
      },
      computed:{
          codes(){
            return this.$store.getters.getCodes+'\n'+this.$store.getters.getHoverCodes+'\n'+this.$store.getters.getAnimationCodes;
          },
      },
      methods: {
        onCopy: function (e) {
          this.iscopyd = '复制成功'
        },
        onError: function (e) {
          alert('Failed to copy texts')
        }
      }
    }
</script>

<style scoped>
  @import "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/vs.min.css";
  .showCodes{
    grid-row: 3/4;
    grid-column: 2/3;
    border-top: solid 1px #c1c1c1;
  }
  .pre{
    white-space: pre-wrap;
  }
</style>
