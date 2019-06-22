<template>
    <div>
      <ul class="operationUl">
        <!--循环渲染属性列表-->
        <component v-for="(item,index) in list" :key="index" :is="item" v-if="isAlive" now="standard"></component>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "standard",
      data(){
        return{
          list:[]
        }
      },
      computed:{
        //控制组件刷新
        isAlive(){
          return this.$store.getters.getIsAlive;
        },
        standardList(){
          return this.$store.getters.getStandardList;
        }
      },
      watch:{
        isAlive(){                                                   //点击刷新时，把isAlive变成false，这里对isAlive进行监测，一旦变化就把它置为true，完成刷新功能
          this.$nextTick(()=>(this.$store.dispatch('changeIsAlive',true)))
        },
        standardList(){                                             //监测属性列表的变化
          this.list = [];
          this.standardList.forEach(data=>{
            import(`../operation/${data}`).then((res)=>{
              this.list.push(res.default)
            })
          })
        }
      }
    }
</script>

<style scoped>

</style>
