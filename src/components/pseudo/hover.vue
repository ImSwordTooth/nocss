<template>
  <div class="pseudoList">
      <p class="title">{{pseudoName}}</p>
      <span class="chooseContainer" @click="isShow = !isShow" v-clickoutside="hideBox">添加
          <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
          <ul v-show="isShow">
            <li @click="add($event)" data-type="color"><i class="iconfont iconcolor"></i>颜色</li>
            <li @click="add($event)" data-type="fontsize"><i class="iconfont iconfontsize"></i>字体大小</li>
            <li @click="add($event)" data-type="border"><i class="iconfont iconborder"></i>边框</li>
            <li @click="add($event)" data-type="fontstyle"><i class="iconfont iconfontstyle"></i>字形</li>
            <li @click="add($event)" data-type="backgroundcolor"><i class="iconfont iconbackgroundcolor"></i>背景色</li>
            <li @click="add($event)" data-type="padding"><i class="iconfont iconpadding"></i>内边距</li>
            <li @click="add($event)" data-type="textshadow"><i class="iconfont icontextshadow"></i>字体阴影</li>
            <li @click="add($event)" data-type="boxshadow"><i class="iconfont iconboxshadow"></i>盒子阴影</li>
            <li @click="add($event)" data-type="transform"><i class="iconfont icontransform"></i>变形</li>
            <li @click="add($event)" data-type="transite"><i class="iconfont icontransition"></i>过渡</li>
            <li @click="add($event)" data-type="outline"><i class="iconfont iconoutline"></i>轮廓线</li>
          </ul>
      </span>
      <ul class="operationUl">
        <component v-for="(item,index) in pseudoClass" :key="index" :is="item" :now="pseudoName"></component>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "hover",
      props:['pseudoName'],
      data() {
        return {
          isShow:false
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
            if (!this.pseudoClass.includes(data.default)){
              this.pseudoClass.push(data.default)
            }
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
  .chooseContainer{
    position: static;
  }

</style>



