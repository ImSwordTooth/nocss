<template>
  <li id="fontstyle">
    <span class="operateTitle"><i class="iconfont iconfontstyle"></i>字形</span>
    <div>
      <div class="group">
        <i class="iconfont iconbold" :class="{'active':Weight==='bold'}" data-weight="bold" @click="fontWeight($event)" title="粗体"></i>
        <i class="iconfont iconlighter" :class="{'active':Weight==='lighter'}"  data-weight="lighter" @click="fontWeight($event)" title="细体"></i>
      </div>
      <div class="group">
        <i class="iconfont iconitalic" :class="{'active':Style==='italic'}" data-style="italic" @click="fontStyle($event)" title="斜体"></i>
      </div>
      <div class="group">
        <i class="iconfont iconlinethrough" :class="{'active':Decoration==='line-through'}" data-decoration="line-through" @click="textdecoration($event)" title="删除线"></i>
        <i class="iconfont iconlinetop" :class="{'active':Decoration==='overline'}" data-decoration="overline" @click="textdecoration($event)" title="上划线"></i>
        <i class="iconfont iconlinebottom" :class="{'active':Decoration==='underline'}" data-decoration="underline" @click="textdecoration($event)" title="下划线"></i>
      </div>
    </div>
  </li>
</template>

<script>
    export default {
        name: "fontstyle",
      props:["now"],
      data(){
          return{
            Weight:'normal',
            Style:'normal',
            Decoration:'none'
          }
      },
      computed:{
        getfontweight(){
          let codes = this.$store.getters.getCodes;
          let reg = /(?<=\bfont-weight:).+(?=;)/g;
          if ( codes.match(/\bfont-weight\b/g)) {
            let result = reg.exec(codes);
            return result[0];
          }else {
            return null;
          }
        },
        getfontstyle(){
          let codes = this.$store.getters.getCodes;
          let reg = /(?<=\bfont-style:).+(?=;)/g;
          if ( codes.match(/\bfont-style\b/g)) {
            let result = reg.exec(codes);
            return result[0];
          }else {
            return null;
          }
        },
        gettextdecoration(){
          let codes = this.$store.getters.getCodes;
          let reg = /(?<=\btext-decoration:).+(?=;)/g;
          if ( codes.match(/\btext-decoration\b/g)) {
            let result = reg.exec(codes);
            return result[0];
          }else {
            return null;
          }
        },
        isBold(){
            return this.getfontweight === 'bold';
        },
        isLighter(){
            return this.getfontweight === 'lighter'
        },
        isItalic(){
            return this.getfontstyle === 'italic'
        },
        isLineThrough(){
          return this.gettextdecoration === 'line-through'
        },
        isLineTop(){
          return this.gettextdecoration === 'overline'
        },
        isLineBottom(){
          return this.gettextdecoration === 'underline'
        }

      },
      methods:{
        fontWeight(event){

          let fontweight = event.currentTarget.dataset.weight;
          this.Weight = this.Weight===fontweight?'normal':fontweight;
          this.submit('font-weight',this.now,this.Weight);
        },
        fontStyle(event){
          let fontstyle = event.currentTarget.dataset.style;
          this.Style = this.Style===fontstyle?'normal':fontstyle;
          this.submit('font-style',this.now,this.Style);
        },
        textdecoration(event){
          let decoration = event.currentTarget.dataset.decoration;
          this.Decoration = this.Decoration===decoration?'none':decoration;
          this.submit('text-decoration',this.now,this.Decoration);
        },
      }
    }
</script>

<style scoped>
  .group{
    display: inline-block;
    padding: 0 5px 0 0;
    border-right: solid 1px #bcbcbc;
    cursor: url("../../assets/cursor/pen.png"),pointer;
  }
  #fontstyle .group i{
    border: solid 1px transparent;
  }
  #fontstyle .group i:hover{
    background-color: #dedede;
  }
  #fontstyle .group i.active{
    border: solid 1px #ccc;
    background-color: #eee;
  }
</style>
