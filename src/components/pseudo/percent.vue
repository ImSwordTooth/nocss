<template>
  <div class="pseudoList">
    <p class="title">{{percentName}}</p>
    <!--<span class="chooseContainer" @click="isShow = !isShow" v-clickoutside="hideBox">添加-->
          <!--<i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>-->
          <!--<ul v-show="isShow">-->
            <!--<li @click="add($event)" data-type="color"><i class="iconfont iconcolor"></i>颜色</li>-->
            <!--<li @click="add($event)" data-type="fontsize"><i class="iconfont iconfontsize"></i>字体大小</li>-->
            <!--<li @click="add($event)" data-type="border"><i class="iconfont iconborder"></i>边框</li>-->
            <!--<li @click="add($event)" data-type="fontstyle"><i class="iconfont iconfontstyle"></i>字形</li>-->
            <!--<li @click="add($event)" data-type="backgroundcolor"><i class="iconfont iconbackgroundcolor"></i>背景色</li>-->
            <!--<li @click="add($event)" data-type="textshadow"><i class="iconfont icontextshadow"></i>字体阴影</li>-->
            <!--<li @click="add($event)" data-type="boxshadow"><i class="iconfont iconboxshadow"></i>盒子阴影</li>-->
          <!--</ul>-->
      <!--</span>-->
    <ul class="operationUl">
      <component v-for="(item,index) in PercentList.content" :key="index" :is="item" :now=PercentList.name></component>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "percent",
    props:['percentName'],
    data() {
      return {
        isShow:false
      }
    },
    computed:{
      PercentList(){
        let list = this.$store.getters.getPercentList;
        for (let i=0;i<list.length;i++){
          if (list[i].name===this.percentName) {
            return list[i];
          }
        }
      }
    },
    methods:{
      hideBox(){
        this.isShow = false
      },
      // add(event){
      //   let codes = this.$store.getters.getAnimationCodes;
      //   if (codes==='') {
      //     codes = `@keyframes css {\n}`;
      //     this.$store.dispatch("changeAnimationCodes", codes)
      //   }
      //   let type = event.currentTarget.dataset.type;
      //   let list = this.$store.getters.getPercentList;
      //   import(`../operation/${type}`).then((data) => {
      //     if (!this.PercentList.content.includes(data.default)){
      //       for (let i=0;i<list.length;i++){
      //         list[i].content.push(data.default)
      //       }
      //     }
      //   });
      // }
    }
  }
</script>

<style scoped>
  .pseudoList{
    margin: 20px 0 0 0;
  }
  .title{
    display: inline-block;
    background-color: #e8f6ff;
    /*padding: 7px 10px;*/
    font-size: 12px;
    /*font-weight: bold;*/
    margin: 0 0 20px 0;
    box-shadow: inset 4px 4px 5px 1px #b9b9b98a, 1px 2px 6px 0px #a5a5a5;
    /*border-radius: 0 5px 5px 0;*/
    width: 40px;
    height: 40px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    line-height: 40px;
    text-align: center;
  }
  .chooseContainer{
    position: static;
  }

</style>



