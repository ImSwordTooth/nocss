<template>
  <div class="showItems">
    <div class="Title">
      <div>
        <i class="iconfont iconitems"></i>展示
      </div>
      <div class="toolsBtn">
        <input type="text" class="text" @input="changeText($event)" placeholder="自定义文本">
        <ul v-if="tagInfo === 'input'">
          <li v-for="type in types" :title="type" @click="changeType($event)" :class="{'active':type === inputType}"><i class="iconfont" :class="`icon${type}`"></i></li>
        </ul>
        <ul v-if="tagInfo === 'table'">
          <li title="行列数"><i class="iconfont icontablerowandcol"></i></li>
        </ul>
        <code>&lt;{{tagInfo}}&gt;</code>
        <i class="iconfont iconhelp"></i>
      </div>
    </div>
    <article>
      <codes :style="itemStyle" @mouseenter.native="hoverFn" @mouseout.native="outFn"></codes>
    </article>
  </div>
</template>

<script>
    export default {
      name: "itembox",
      data(){
        return{
          types:['input','checkbox','radio','range'],
          isHover:false
        }
      },
      computed:{
        classObject(){
          return{

          }
        },
        tagInfo(){
          return this.$store.getters.getTagInfo
        },
        inputType(){
            return this.$store.getters.getInputType
        },
        itemStyle(){
          let style = this.$store.getters.getCodes;
          style = style.replace(/.+(?={)/g,"").replace(/[{|}]/g,'');
          let Hoverstyle = this.$store.getters.getHoverCodes;
          Hoverstyle = Hoverstyle.replace(/.+(?={)/g,"").replace(/[{|}]/g,'');
            if (this.isHover) {
              return style+Hoverstyle;

            }else {
              return style;
            }
        }
      },
      components:{
        'codes':{
          render(createElement, context) {
            let tag = this.$store.getters.getTagInfo;
            let type = this.$store.getters.getInputType;
            let image = require('../assets/logo.png');
            let text = this.$store.getters.getTagText;
            console.log(type)
            switch (tag) {
              case 'p':return createElement(tag,text);
              case 'button':return createElement(tag,text);
              case 'div':return createElement(tag,text);
              case 'a':return createElement(tag,{attrs:{href:'#'}},text);
              case 'input':
                if (type === 'text'){
                  return createElement(tag,{attrs:{type:type,value:text}});
                } else if (type === 'range'){                               //range的以后再想
                  return createElement(tag,{attrs:{type:type,value:text}});
                } else {
                  return createElement('div',[
                    createElement(tag,{attrs:{type:type,value:text}}),
                    createElement('i')
                  ]);
                }
              case 'img':return createElement(tag,{attrs:{src:image}});
              case 'table':return createElement(tag,{attrs:{border:1}},[
                createElement('tr',[createElement('td','哈哈哈'),createElement('td','哈哈哈'),createElement('td','哈哈哈')]),
                createElement('tr',[createElement('td','哈哈哈')]),
                createElement('tr',[createElement('td','哈哈哈')])
              ]);
              case 'ul':return createElement('ul',[
                createElement('li',{style:this.itemStyle},'第一项'),
                createElement('li','第二项'),
                createElement('li','第三项'),
              ]);

            }
          }
        },
      },
      methods:{
        changeType:function (event) {
          let title = event.currentTarget.title;
          this.$store.dispatch('changeInputType',title)
        },
        changeText:function (event) {
          let text = event.currentTarget.value;
          text = text === ''?'文本':text;
          this.$store.dispatch('changeTagText',text)
        },
        hoverFn(){
          this.isHover = true
        },
        outFn(){
          this.isHover = false;
        }
      }
    }
</script>

<style scoped>
  .showItems{
    grid-row: 2/3;
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
  }
  .showItems article{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
  .showItems article input{
    width: 80%;
  }
  .text{
    width: 100px;
    border-radius: 2px;
    line-height: normal;
    white-space: nowrap;
    font-size: 14px;
    padding: 4.5px 2px;
    text-align: center;
    color: #737373;
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #e6e6e6;
    box-shadow:inset 1px 1px 3px 0 #c7c7c7;;
    outline: none;
    vertical-align: middle;
  }
</style>
