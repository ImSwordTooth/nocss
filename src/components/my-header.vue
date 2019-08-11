<template>
  <header>
    <!--<img src="../assets/222.png" alt="欢迎" class="logo">-->

    <h1>!css</h1>
    <a href="#" class="active">制作</a>
    <a href="#">别人家的</a>
    <a href="#">别人家的</a>
  </header>
</template>

<script>
    export default {
        name: "my-header"
    }
</script>

<style scoped>
  header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 5px;
    /*background:url("../assets/8.jpg");*/
    box-shadow: 0 0 5px 1px #7e8990;
    z-index: 3;
  }
  header .logo{
    height: 40px;
    margin-left: 10px;
    cursor: url("../assets/cursor/pen.png"),pointer;
  }
  header a{
    display: inline-block;
    margin:0 0 0 30px;
    padding-bottom: 5px;
    cursor: url("../assets/cursor/pen.png"),pointer;
    color: rgb(212, 186, 90);
    font-size: 14px;
    text-decoration: none;
  }
  header a:hover{
    color: #d2a80f;
    transition:color 1s
  }
  header a.active{
    border-bottom: solid 2px #f5ba71;
    color: #fbdf09;
  }
  @font-face {
    font-family: logo;
    src: url("../assets/Pervitina-Dex-FFP.ttf");
  }
  h1{
    font-family: logo;
    font-size: 45px;
    font-weight: lighter;
  }

</style>
