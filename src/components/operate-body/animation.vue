<template>
  <div class="animation">
    <div>
      <div>0%<button>添加动画</button></div>
    </div>
    <button>添加节点</button>
    <div>
      <div>100%<button>添加动画</button></div>
    </div>
    <!--<div class="add">-->
      <!--<button>+</button>-->
      <!--<p>点击添加动画</p>-->
    <!--</div>-->
  </div>
</template>

<script>
    export default {
        name: "animation"
    }
</script>

<style scoped>
  .animation{
  }
  .add{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .add button{
    width: 60px;
    height: 60px;
    border-radius: 100%;
    font-size: 32px;
    line-height: 60px;
    border: solid 1px #ccc;
    animation: jump 2s infinite;
    margin-top: 40px;
  }
  @keyframes jump {
    0% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0); }
    50% {
      -webkit-transform: translate(0, 10px);
      transform: translate(0, 20px); }
    100% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0); }
  }
</style>
