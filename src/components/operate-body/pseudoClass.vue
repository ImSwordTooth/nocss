<template>
    <div>
      <div v-for="classes in pseudoClass">
        <p class="title">{{classes.name}}<button class="add" @click="add">添加</button></p>
        <ul>
          <component :is="classes.content"></component>
        </ul>
      </div>

      <component v-for="x in xxx" :is="x"></component>
      https://gitee.com/Swordtooth/nocss.git
    </div>
</template>

<script>
    export default {
        name: "pseudoClass",
      data(){
          return{
            // x:[Color],
            pseudoClass:[
              {
                name:'hover',
                content:{
                  template:`<fontsize></fontsize>`
                }
              },
              {
                name:'active',
                content:{
                  template:`<color></color>`
                }
              }
              ],
            xxx:[{
              template:`<color></color>`
            }]
          }
      },
    computed:{
          tee(){
            return this.$store.getters.getHoverList;
          }
    },

      methods:{
          add(){
            import("../operation/border").then((data) => {
              console.log(data)
              this.xxx.push(data.default)
            });
          }
      }
    }
</script>

<style scoped>
  .title{
    background-color: #ddf3ff;
    padding: 5px 10px;
    margin: 0 0 20px 0;
  }
  .add{
    float: right;
    margin-right: 10px;
  }
</style>
