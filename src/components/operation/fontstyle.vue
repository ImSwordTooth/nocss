<template>
  <li id="fontstyle">
    <span class="operateTitle"><i class="iconfont iconfontstyle"></i>字形</span>
    <div>
      <div class="group">
        <i class="iconfont iconbold" :class="{'active':isBold}" data-weight="bold" @click="fontWeight($event)" title="粗体"></i>
        <i class="iconfont iconlighter" :class="{'active':isLighter}"  data-weight="lighter" @click="fontWeight($event)" title="细体"></i>
      </div>
      <div class="group">
        <i class="iconfont iconitalic" :class="{'active':isItalic}" data-style="italic" @click="fontStyle($event)" title="斜体"></i>
      </div>
      <div class="group">
        <i class="iconfont iconlinethrough" :class="{'active':isLineThrough}" data-decoration="line-through" @click="textdecoration($event)" title="删除线"></i>
        <i class="iconfont iconlinetop" :class="{'active':isLineTop}" data-decoration="overline" @click="textdecoration($event)" title="上划线"></i>
        <i class="iconfont iconlinebottom" :class="{'active':isLineBottom}" data-decoration="underline" @click="textdecoration($event)" title="下划线"></i>
      </div>
    </div>
  </li>
</template>

<script>
    export default {
        name: "fontstyle",
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
          let codes = this.$store.getters.getCodes;
          let fontweight = event.currentTarget.dataset.weight;
          if (fontweight === this.getfontweight){                               //切换
            codes = codes.replace(/\n\tfont-weight:\w+;/g,'');
          } else if ( codes.match(/\bfont-weight\b/g)){                         //有的话只改后面的值
            codes = codes.replace(/(?<=\bfont-weight:).+(?=;)/g,fontweight)
          }else {                                                               //没有的话直接添加
            codes = codes.replace(/}/g,`\tfont-weight:${fontweight};\n}`)
          }
          this.$store.dispatch('changeCodes',codes)
        },
        fontStyle(event){
          let codes = this.$store.getters.getCodes;
          let fontstyle = event.currentTarget.dataset.style;
          if (fontstyle === this.getfontstyle){                               //切换
            codes = codes.replace(/\n\tfont-style:\w+;/g,'');
          } else if ( codes.match(/\bfont-style\b/g)){                         //有的话只改后面的值
            codes = codes.replace(/(?<=\bfont-style:).+(?=;)/g,fontstyle)
          }else {                                                               //没有的话直接添加
            codes = codes.replace(/}/g,`\tfont-style:${fontstyle};\n}`)
          }
          this.$store.dispatch('changeCodes',codes)
        },
        textdecoration(event){
          let codes = this.$store.getters.getCodes;
          let decoration = event.currentTarget.dataset.decoration;
          if (decoration === this.gettextdecoration){                               //切换
            codes = codes.replace(/\n\ttext-decoration:.+;/g,'');
          } else if ( codes.match(/\btext-decoration\b/g)){                         //有的话只改后面的值
            codes = codes.replace(/(?<=\btext-decoration:).+(?=;)/g,decoration)
          }else {                                                               //没有的话直接添加
            codes = codes.replace(/}/g,`\ttext-decoration:${decoration};\n}`)
          }
          this.$store.dispatch('changeCodes',codes)
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
