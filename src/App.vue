<template>
  <div id="app" class="container">
    <myheader></myheader>
    <myaside></myaside>

        <div class="prompt" v-if="toolType === ''">选择要操作的控件以开始</div>

          <myitembox></myitembox>
          <mycodebox></mycodebox>

        <div class="operateContainer">
          <myoperate></myoperate>
          <article class="operations">
            <operate_head></operate_head>
            <div class="operate">
              <keep-alive>
                <component :is="operateHead"></component>
              </keep-alive>
            </div>
          </article>
        </div>
  </div>
</template>

<script>
  import myheader from './components/my-header';
  import myaside from './components/my-aside';
  import myitembox from './components/itembox';
  import mycodebox from './components/codebox';
  import myoperate from './components/operate'
  import operate_head from './components/operate_head';
  import standard from './components/operate-body/standard'
  import pseudoClass from './components/operate-body/pseudoClass'
  import animation from './components/operate-body/animation'

  export default {
  name: 'App',
  components: {
    myheader,
    myaside,
    myitembox,
    mycodebox,
    myoperate,
    operate_head,
    standard,
    pseudoClass,
    animation
  },
  computed:{
    toolType(){
      return this.$store.getters.getToolType
    },
    operateHead(){
      return this.$store.getters.getActiveHead
    }
  },

}
</script>

<style>
  @import "iconfont.css";
  /*@import "css/app.css";*/
  @import "css/otherApp.css";
</style>

