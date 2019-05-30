<template>
  <div class="nav">
    <ul>
      <li v-for="head in operateHead" @click="changeActive($event)" :data-head="head.class" :class="{'active':head.class === activeHead}"><i class="iconfont" :class="`icon${head.class}`"></i>{{head.name}}</li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "operate_head",
      computed:{
          operateHead(){
            return this.$store.getters.getOperateHead
          },
        activeHead(){
            return this.$store.getters.getActiveHead
        }
      },
      methods:{
        changeActive(event){
          let head = event.currentTarget.dataset.head;
          this.$store.dispatch('changeActiveHead',head)
        }
      }
    }
</script>

<style scoped>
  .nav{
    width: 100%;
  }
  .nav ul{
    display: inline-flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .nav ul li{
    background-color: #f5f5f5;
    border: solid 1px #c3c3c375;
    border-left: none;
    padding: 5px 20px;
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    cursor: url("../assets/cursor/pen.png"),pointer;
  }
  .nav ul li.active{
    border-bottom: none;
    background-color: transparent;
  }
  .nav ul i{
    margin: 0 2px;
  }
  .iconanimation{animation: rotate infinite 2s linear}
  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
