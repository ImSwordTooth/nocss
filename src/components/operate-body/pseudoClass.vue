<template>
    <div>
      <!--循环伪类列表-->
      <component v-for="(item,index) in list" :key="index" :is="item" :pseudoName="item.name"></component>
    </div>
</template>

<script>
    export default {
      name: "pseudoClass",
      data(){
        return{
          list:[]                       //伪类列表
        }
      },
      created(){
        this.list = [];                 //重置伪类列表
        this.pseudoList.forEach(data=>{                     //动态导入伪类列表
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
        pseudoList(){                                       //监测伪类列表的变化
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
