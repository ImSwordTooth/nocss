<template>
    <div>
      <component v-for="(item,index) in list" :key="index" :is="item" :pseudoName="item.name"></component>
      <!--<div v-for="(classes,index) in pseudoClass" class="pseudoList">-->
        <!--<p class="title">{{classes.name}}</p>-->
        <!--<span class="add" @click="hideIndex(index)" v-clickoutside="hide()">添加-->
          <!--<i class="iconfont" :class="{'iconuparrow':classes.isShow,'icondownarrow':!classes.isShow}"></i>-->
          <!--<ul class="typeUl" v-show="isShow[index]">-->
            <!--<li @click="add($event)" :data-index="index" data-type="color"><i class="iconfont iconcolor"></i>颜色</li>-->
            <!--<li @click="add($event)" :data-index="index" data-type="fontsize"><i class="iconfont iconfontsize"></i>字体大小</li>-->
            <!--<li @click="add($event)" :data-index="index" data-type="border"><i class="iconfont iconborder"></i>边框</li>-->
            <!--<li @click="add($event)" :data-index="index" data-type="fontstyle"><i class="iconfont iconfontstyle"></i>字形</li>-->
            <!--<li @click="add($event)" :data-index="index" data-type="backgroundcolor"><i class="iconfont iconbackgroundcolor"></i>背景色</li>-->
            <!--<li @click="add($event)" :data-index="index" data-type="textshadow"><i class="iconfont icontextshadow"></i>字体阴影</li>-->
            <!--<li @click="add($event)" :data-index="index" data-type="boxshadow"><i class="iconfont iconboxshadow"></i>盒子阴影</li>-->
          <!--</ul>-->
          <!--</span>-->
        <!--<ul class="operationUl">-->
          <!--<component v-for="(x,idx) in classes.content" :key="idx" :is="x" :now="classes.name"></component>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
</template>

<script>
    export default {
      name: "pseudoClass",
      data(){
          return{
            list:[]
          }
      },
      created(){
        this.list = [];
        this.pseudoList.forEach(data=>{
          import(`../pseudo/${data.name}`).then((res)=>{
            this.list.push(res.default)
          })
        })
      },
      computed:{
        pseudoList(){
          return this.$store.getters.getPseudoClass;
        },
      },
      watch:{
        pseudoList(){
          this.list = [];
          this.pseudoList.forEach(data=>{
            import(`../pseudo/${data.name}`).then((res)=>{
              this.list.push(res.default)
            })
          })
        }
      }
    }
</script>
