<template>
  <li>
    <span class="operateTitle" @click.ctrl="del" v-tooltip.top="'这个特殊，三个一下都删除^_^'"><i class="iconfont iconfontstyle"></i>字形</span>
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
  name: 'my-fontstyle',
  props: ['now'],
  data () {
    return {
      Weight: 'normal', // 字体宽度
      Style: 'normal', // 字体样式
      Decoration: 'none' // 字体修饰线
    }
  },
  created () {
    this.$watch('$data.Weight', function () {
      this.submit('font-weight', this.now, this.Weight)
    }, {immediate: this.isMed})
    this.$watch('$data.Style', function () {
      this.submit('font-style', this.now, this.Style)
    }, {immediate: this.isMed})
    this.$watch('$data.Decoration', function () {
      this.submit('text-decoration', this.now, this.Decoration)
    }, {immediate: this.isMed})
  },
  computed: {
    isMed () {
      return this.now !== 'standard'
    }
  },
  methods: {
    fontWeight (event) {
      let fontweight = event.currentTarget.dataset.weight
      this.Weight = this.Weight === fontweight ? 'normal' : fontweight
    },
    fontStyle (event) {
      let fontstyle = event.currentTarget.dataset.style
      this.Style = this.Style === fontstyle ? 'normal' : fontstyle
    },
    textdecoration (event) {
      let decoration = event.currentTarget.dataset.decoration
      this.Decoration = this.Decoration === decoration ? 'none' : decoration
    },
    del () {
      this.submit('font-weight', this.now, '')
      this.submit('font-style', this.now, '')
      this.submit('text-decoration', this.now, '')
    }
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
  .group i{
    border: solid 1px transparent;
  }
  .group i:hover{
    background-color: #dedede;
  }
  .group i.active{
    border: solid 1px #ccc;
    background-color: #eee;
  }
</style>
