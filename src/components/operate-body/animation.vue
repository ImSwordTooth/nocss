<template>
  <div class="animation">
    <div class="add">
      <button v-show="!isInputMove" :class="{'move':isButtonMove,'normal':!isButtonMove}" @click="add">+</button>
      <div class="setting" v-show="isInputMove" :class="{'showInput':isInputMove}" >
        <input type="text" class="animationName" placeholder="动画名称">
        <input type="range" class="animationDuring">
        <span class="chooseContainer" :class="{'tttop':isShowEasing}" @click="isShowEasing = !isShowEasing" v-clickoutside="hideEasing">{{borderStyle}}
          <i class="iconfont" :class="{'iconuparrow':isShowEasing,'icondownarrow':!isShowEasing}"></i>
          <ul v-show="isShowEasing">
            <li @click="changeEasing($event)"><i class="iconfont iconsolid"></i>linear</li>
            <li @click="changeEasing($event)"><i class="iconfont icondashed"></i>ease</li>
            <li @click="changeEasing($event)"><i class="iconfont icondouble"></i>ease-in</li>
            <li @click="changeEasing($event)"><i class="iconfont icondotted"></i>ease-out</li>
            <li @click="changeEasing($event)"><i class="iconfont iconinset"></i>ease-in-out</li>
          </ul>
        </span>
      </div>

    </div>

    <div class="content">
      <div v-for="(percent,index) in percentList">
        <component :is="xx" :percentName="percent.name"></component>
      </div>
      <button @click="addPercent">添加节点</button>
      <span @click="back">恢复</span>
    </div>


  </div>
</template>

<script>
  import Hover from "../pseudoClasses/hover";
  import Color from "../operation/color"

  export default {
        name: "animation",
      components: {Hover,Color},
      data(){
          return{
            isButtonMove:false,
            isInputMove:false,
            // isShow:false,
            xx:null,
            isShowEasing:false
          }
      },
      computed:{
        percentList(){
          return this.$store.getters.getPercentList;
        }
      },
      mounted(){
        import('../pseudo/percent').then(res=>{
          this.xx = res.default;
        })
      },
      methods:{
          choose(i){
            this.percentList[i].isShow = !this.percentList[i].isShow;
            // x = !x;
          },
        hideEasing(){
            this.isShowEasing = false
        },
        hideBox(){

          // this.percentList[i].isShow = false
          // let status = false;
          // this.percentList.forEach(item=>{
          //   if (item.isShow){
          //     status = true;
          //   }
          // })
          // if (!status){
          //   console.log("cc")
          //   return;
          // }else {
          //   console.log("xx")
            this.percentList.forEach(item=>{
              item.isShow = false
            })
          // }
        },
        addPercent(){
            let list = this.percentList;
            list.push({name:'75%',iconName:'icon75',content:[]})
            this.$store.dispatch('changePercentList',list);

        },
          back(){
            this.isButtonMove = false;
            this.isInputMove = false;
          },
          add(){
            let that = this;
            that.isButtonMove = !that.isButtonMove;
            setTimeout(function () {
              that.isInputMove = true;
            },400)
  //           let x = document.styleSheets[0];
  //           x.insertRule(` @keyframes jump {
  //   0% {
  //     -webkit-transform: translate(0, 0);
  //     transform: translate(0, 0); }
  //   50% {
  //     -webkit-transform: translate(0, 10px);
  //     transform: translate(0, 20px); }
  //   100% {
  //     -webkit-transform: translate(0, 0);
  //     transform: translate(0, 0); }
  // }`)
          }
      }
    }
</script>

<style scoped>
  .add{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .add button{
    width: 60px;
    height: 60px;
    border-radius: 100%;
    font-size: 32px;
    line-height: 60px;
    border: solid 1px #ccc;
    outline: none;
    margin-top: 50px;
  }
  .add .normal{
    position: absolute;
    animation: jump 2s infinite;
    left: 50%;
  }
  .add .move{
    position: absolute;
    left: 0;
    animation: moveLeft .4s ease-in;
  }
  .setting{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100px;
  }
  .setting .animationName{
    position: relative;
    /*left: 10px;*/
    top: 0;
    padding: 10px 5px;
    border-radius: 5px;
    font-size: 18px;
    border: solid 1px #ccc;
    width: 120px;
    margin-top: 25px;
    outline: solid 1px rgba(18, 150, 219, 0);
    outline-offset: 15px;
    background-color: #ebebeb;
    font-weight: bold;
  }
  .setting .animationDuring{
    position: relative;
    /*left: 200px;*/
  }


  @keyframes moveLeft {
    0%{
      left: 50%;
    }
    100%{
      left: 0;
    }
  }
  .showInput{
    animation: input .4s ease-out!important;
  }

  @keyframes input {
    0%{
      width: 80%;
      outline-offset: 0;
      outline-color: rgba(90, 90, 101, 0.51);
    }
    100%{
      width: 100%;
      outline-offset: 15px;
      outline-color: rgba(18, 150, 219, 0);
    }
  }
  @keyframes jump {
    0% {
      transform: translate(0, 0); }
    50% {
      transform: translate(0, 20px); }
    100% {
      transform: translate(0, 0); }
  }
  .content{
    position: relative;
    top: 80px;
  }
  .chooseContainer{
    position: absolute;
    left: 12%;
  }
  .percent{
    display: inline-flex;
    align-items: center;
  }
  .percent i{
    color: #56a1ea;
    font-size: 28px;
  }
  .percent span{
    font-weight: lighter;
  }
</style>
