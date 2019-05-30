<template>
  <div class="pseudoList">
    <p class="title">{{pseudoName}}</p>
    <span class="add" @click="isShow = !isShow" v-clickoutside="hideBox">添加
          <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
          <ul class="typeUl" v-show="isShow">
            <li @click="add($event)" data-type="color"><i class="iconfont iconcolor"></i>颜色</li>
            <li @click="add($event)" data-type="fontsize"><i class="iconfont iconfontsize"></i>字体大小</li>
            <li @click="add($event)" data-type="border"><i class="iconfont iconborder"></i>边框</li>
            <li @click="add($event)" data-type="fontstyle"><i class="iconfont iconfontstyle"></i>字形</li>
            <li @click="add($event)" data-type="backgroundcolor"><i class="iconfont iconbackgroundcolor"></i>背景色</li>
            <li @click="add($event)" data-type="textshadow"><i class="iconfont icontextshadow"></i>字体阴影</li>
            <li @click="add($event)" data-type="boxshadow"><i class="iconfont iconboxshadow"></i>盒子阴影</li>
          </ul>
          </span>
    <ul class="operationUl">
      <component v-for="(item,index) in pseudoClass" :key="index" :is="item" :now="pseudoName"></component>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "active",
    props:['pseudoName'],
    data() {
      return {
        isShow:true
      }
    },
    computed:{
      pseudoClass(){
        let list = this.$store.getters.getPseudoClass;
        for (let i=0;i<list.length;i++){
          if (list[i].name===this.pseudoName) {
            return list[i].content;
          }
        }
      }
    },
    methods:{
      hideBox(){
        this.isShow = false
      },
      add(event){
        let hoverCodes = this.$store.getters.getHoverCodes;
        if (hoverCodes==='') {
          hoverCodes = `.nocss:hover {\n}`;
          this.$store.dispatch("changeHoverCodes", hoverCodes)
        }
        let type = event.currentTarget.dataset.type;
        import(`../operation/${type}`).then((data) => {
          this.pseudoClass.push(data.default)
        });
      }
    }
  }
</script>

<style scoped>
  .pseudoList{
    margin: 20px 0 0 0;
  }
  .title{
    display: inline-block;
    background-color: #f1f1f1;
    padding: 7px 10px;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 20px 0;
    box-shadow: inset 4px 4px 5px 1px #b9b9b97a;
    border-radius: 0 5px 5px 0;
  }

  .add{
    /*position: relative;*/
    display: inline-block;
    font-weight: normal;
    line-height: 10px;
    cursor: url("../../assets/cursor/pen.png"),pointer;
    padding: 8px;
    font-size: 12px;
    border-radius: 5px;
    border: solid 1px #ccc;
    color: #5a5a5a;
    transition: background-color .6s;
  }
  .add:hover{
    border-color: #5a5a5a;
    background-color: #5a5a5a;
    color: #fbdf0c;
    transition: background-color .6s;
  }
  .typeUl{
    position: absolute;
    padding: 0;
    margin: 0;
    list-style: none;
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 1px 1px 4px 1px #e2e2e2;
    z-index: 999;
    color: #000;
  }
  .typeUl li{
    padding: 3px 8px;
    border-bottom: solid 1px #e2e2e2;
    cursor: url("../../assets/cursor/pen.png"),pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 28px;
  }
  .typeUl li:nth-last-child(1){
    border-radius: 0 0 5px 5px;
  }
  .typeUl li:nth-child(1){
    border-radius: 5px 5px 0 0;
  }
  .typeUl li:hover{
    background-color: #5a5a5a;
    color: #fbdf0c;
    transition: background-color .5s;
    animation: ss .6s ease-out;
  }
  @keyframes ss {
    0%{
      transform: scale(1.1,1);
    }
    100%{
      transform: scale(1,1);
    }
  }

</style>



