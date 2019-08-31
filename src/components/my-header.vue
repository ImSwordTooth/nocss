<template>
  <header class="header">
    <vue-typer text="!css" erase-style="backspace" class="logo"></vue-typer>
    <!--<a href="#" class="active">制作</a>-->
    <!--<a href="#">one</a>-->
    <!--<a href="#">two</a>-->
    <span class="right">欢迎向我的<a href="https://github.com/ImSwordTooth/nocss">github</a>提issue，或者直接Q我：2223133607</span>
  </header>
</template>

<script>
import {VueTyper} from 'vue-typer'
export default {
  name: 'my-header',
  components: {
    VueTyper
  }
}
</script>

<style scoped>
  .right{
    margin-right: 20px;
  }
  .right a{
    color: red;
  }
</style>
