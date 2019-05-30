<template>
    <div>
      <ul class="operationUl">
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
        isAlive(){
          return this.$store.getters.getIsAlive;
        },
        standardList(){
          return this.$store.getters.getStandardList;
        }
      },
      watch:{
        isAlive(){
          this.$nextTick(()=>(this.$store.dispatch('changeIsAlive',true)))
        },
        standardList(){
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
@import "../../css/operate_body.css";
</style>
