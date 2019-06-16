<template>
  <div class="animation">
    <div class="setting" >
      <div>
        <div class="item">
          <input type="text" class="animationName operateText" placeholder="动画名称">
        </div>
        <div class="item">
          <span class="info">过渡动画：</span>
          <span class="chooseContainer chooseEasing" :class="{'tttop':isShowEasing}" @click="isShowEasing = !isShowEasing" v-clickoutside="hideEasing">{{easing}}
            <i class="iconfont" :class="{'iconuparrow':isShowEasing,'icondownarrow':!isShowEasing}"></i>
            <ul v-show="isShowEasing">
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'linear':isActive==='linear'}"></i></div>linear</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease':isActive==='ease'}"></i></div>ease</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-in':isActive==='ease-in'}"></i></div>ease-in</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-out':isActive==='ease-out'}"></i></div>ease-out</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-in-out':isActive==='ease-in-out'}"></i></div>ease-in-out</li>
            </ul>
          </span>
        </div>
        <div class="item">
          <span class="info">过渡时间：</span>
          <input type="text" class="operateText" maxlength="3" v-model="during"><span class="unit">s</span>
        </div>
      </div>
      <div class="add">
        <span class="chooseContainer" @click="isShow = !isShow" v-clickoutside="hideBox">添加项
          <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
          <ul v-show="isShow">
            <li @click="add($event)" data-type="color"><i class="iconfont iconcolor"></i>颜色</li>
            <li @click="add($event)" data-type="fontsize"><i class="iconfont iconfontsize"></i>字体大小</li>
            <li @click="add($event)" data-type="border"><i class="iconfont iconborder"></i>边框</li>
            <li @click="add($event)" data-type="fontstyle"><i class="iconfont iconfontstyle"></i>字形</li>
            <li @click="add($event)" data-type="backgroundcolor"><i class="iconfont iconbackgroundcolor"></i>背景色</li>
            <li @click="add($event)" data-type="textshadow"><i class="iconfont icontextshadow"></i>字体阴影</li>
            <li @click="add($event)" data-type="boxshadow"><i class="iconfont iconboxshadow"></i>盒子阴影</li>
          </ul>
         </span>
        <label class="addPercent">
          <input type="number" @input="sliceTwo()" v-model="addPercentValue"><span>%</span>
          <button @click="addPercent">添加节点</button>
        </label>
      </div>
    </div>
    <div class="content">
      <div v-for="(percent,index) in percentList">
        <component :is="tools" :percentName="percent.name"></component>
      </div>

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
            tools:null,
            isShowEasing:false,
            isShow:false,
            easing:"ease",
            isActive:null,
            during:0,
            addPercentValue:''          //新增节点的值
          }
      },
      computed:{
        percentList(){
          //后面的sort是根据节点的百分比进行排序
          return this.$store.getters.getPercentList;
          // return this.$store.getters.getPercentList.sort((a,b)=>(Number(a.name.slice(0,a.name.length-1)-Number(b.name.slice(0,b.name.length-1)))));
        }
      },
      mounted(){
        import('../pseudo/percent').then(res=>{
          this.tools = res.default;
        })
      },
      methods:{
        changeActive(e){
          this.isActive = e.currentTarget.innerText
        },
        deleteActive(){
          this.isActive = null
        },
        changeEasing(e){
          this.easing = e.currentTarget.innerText;
        },
        choose(i){
          this.percentList[i].isShow = !this.percentList[i].isShow;
        },
        hideEasing(){
            this.isShowEasing = false
        },
        hideBox(){
          this.isShow = false
        },
        //限制数字文本框只能输入两位数
        sliceTwo(){
          if (this.addPercentValue.length > 2) {
            this.addPercentValue = this.addPercentValue.slice(0,2);
          }
        },
        addPercent(){
          let list = this.percentList;
          let con = Object.assign([],list[0].content);                     //由于每个百分比节点的“内容”都是一样的,此处要用浅拷贝
          let arr = [];                                 //现有百分比节点列表
          list.forEach(item=>{
            arr.push(Number(item.name.slice(0,item.name.length-1)))
          });

          if (!arr.includes(Number(this.addPercentValue))) {                  //列表里没有才添加，防止重复
            arr.push(Number(this.addPercentValue));
            arr.sort((a,b)=>a-b);
            let index = arr.indexOf(Number(this.addPercentValue));
            list.splice(index,0,{name:`${this.addPercentValue}%`,content:con})
              // list.push({name:`${this.addPercentValue}%`,content:con})
          }
          this.$store.dispatch('changePercentList',list);
          this.addPercentValue =''
        },
        add(e){
          let animationCodes = this.$store.getters.getAnimationCodes;
          if (animationCodes==='') {
            animationCodes = `@keyframes css {\n}`;
            this.$store.dispatch("changeAnimationCodes", animationCodes)
          }
          let value = e.currentTarget.dataset.type;
          let list = this.$store.getters.getPercentList;
          for (let i=0; i<list.length; i++){
            list[i].content.push(value)
          }
          // list.forEach(item=>{
          //   item.content.push(value)
          // });
          this.$store.dispatch("changePercentList",list)
        }

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
</script>

<style scoped>
  .setting{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .setting .animationName{
    position: relative;
    top: 0;
    padding: 10px 5px;
    border-radius: 5px;
    font-size: 18px;
    border: solid 1px #ccc;
    width: 120px;
    outline: solid 1px rgba(18, 150, 219, 0);
    outline-offset: 15px;
    background-color: #ebebeb;
    font-weight: bold;
  }
  .chooseEasing>ul li div{
    position: relative;
    display: inline-flex;
    width: 100px;
    height: 34px;
    justify-items: center;
  }
  .chooseEasing>ul li i{
    position: absolute;
    left: 0;
    padding-top: 3px;
  }
  .addPercent{
    position: relative;
  }
  .addPercent input{
    width: 70px;
    outline: none;
    height: 30px;
    font-weight: bold;
    line-height: 30px;
    padding: 3px 45px 3px 10px;
    border: solid 1px rgba(0, 0, 0, 0.22);
    background-color: rgba(28, 27, 26, 0.12);
    color: black;
    font-size: 1.1em;
    font-style: italic;
    box-shadow: 2px 1px 5px 1px rgba(54, 54, 54, 0.18);
    transition: border-radius 2s,border 2s;
    border-radius: 0 10px 10px 0;
  }
  .addPercent input:focus{
    border: solid 1px #00000094;
    border-radius: 10px;
    transition: border-radius 2s,border 2s;
  }
  .addPercent span{
    position: absolute;
    right: 78px;
    top: -3px;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;

  }
  .addPercent button{
    position: absolute;
    height: 40px;
    top: -9px;
    right: 0;
    background-color: #3279c1;
    border: solid 1px #5a5a5a;
    color: #ffffff;
    outline: solid 1px transparent;
  }
  .addPercent button:hover{
    box-shadow: 1px 1px 3px 1px #a7a7a7fa;
  }
  .linear{
    animation: l 1s linear;
  }
  .ease{
    animation: l 1s ease;
  }
  .ease-in{
    animation: l 1s ease-in;
  }
  .ease-out{
    animation: l 1s ease-out;
  }
  .ease-in-out{
    animation: l 1s ease-in-out;
  }
  @keyframes l {
    0%{
      left: 0%;
    }
    100%{
      left: 70%;
    }
  }
  .content{
    position: relative;
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
