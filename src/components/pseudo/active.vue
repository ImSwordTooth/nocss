<template>
  <div class="pseudoList">
    <p class="title">{{pseudoName}}</p>
    <span class="chooseContainer" @click="isShow = !isShow" v-clickoutside="hideBox">添加
          <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
          <ul v-show="isShow">
            <li @click="add($event)" data-type="color" :class="{'checked':isTaped('color')}"><i class="iconfont iconcolor"></i>颜色<span class="en">color</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="fontsize" :class="{'checked':isTaped('fontsize')}"><i class="iconfont iconfontsize"></i>字体大小<span class="en">font-size</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="border" :class="{'checked':isTaped('border')}"><i class="iconfont iconborder"></i>边框<span class="en">border</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="fontstyle" :class="{'checked':isTaped('fontstyle')}"><i class="iconfont iconfontstyle"></i>字形<span class="en">font相关</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="backgroundcolor" :class="{'checked':isTaped('backgroundcolor')}"><i class="iconfont iconbackgroundcolor"></i>背景色<span class="en">border-color</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="padding" :class="{'checked':isTaped('padding')}"><i class="iconfont iconpadding"></i>内边距<span class="en">padding</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="textshadow" :class="{'checked':isTaped('textshadow')}"><i class="iconfont icontextshadow"></i>字体阴影<span class="en">font-shadow</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="boxshadow" :class="{'checked':isTaped('boxshadow')}"><i class="iconfont iconboxshadow"></i>盒子阴影<span class="en">box-shadow</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="transform" :class="{'checked':isTaped('transform')}"><i class="iconfont icontransform"></i>变形<span class="en">transform</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="transition" :class="{'checked':isTaped('transition')}"><i class="iconfont icontransition"></i>过渡<span class="en">transition</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="outline" :class="{'checked':isTaped('outline')}"><i class="iconfont iconoutline"></i>轮廓线<span class="en">outline</span><i class="iconfont iconok"></i></li>
          </ul>
          </span>
    <ul class="operationUl">
      <component v-for="(item,index) in pseudoClass" :key="index" :is="item" :now="pseudoName"></component>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'active',
  props: ['pseudoName'],
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    pseudoClass () {
      let list = this.$store.getters.getPseudoClass
      for (let i = 0; i < list.length; i++) {
        if (list[i].name === this.pseudoName) {
          return list[i].content
        }
      }
    },
    isTaped () {
      return function (type) { // 用闭包给计算属性添加参数
        return this.pseudoClass.some(item => { // 如果动态加载的属性组件里有指定的名字的组件，就返回true，为true就添加了checked类，展示为已选中
          return item.name === `my-${type}`
        })
      }
    }
  },
  methods: {
    hideBox () {
      this.isShow = false
    },
    add (event) {
      let hoverCodes = this.$store.getters.getHoverCodes
      if (hoverCodes === '') {
        hoverCodes = `.nocss:hover {\n}`
        this.$store.dispatch('changeHoverCodes', hoverCodes)
      }
      let type = event.currentTarget.dataset.type
        import(`../operation/my-${type}`).then((data) => {
          this.pseudoClass.push(data.default)
        })
    }
  }
}
</script>

<style scoped>
  .pseudoList{
    margin: 20px 0 0 0;
  }
  .title{
    display: inline-block;
    background-color: #f1f1f1;
    padding: 7px 10px;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 20px 0;
    box-shadow: inset 4px 4px 5px 1px #b9b9b97a;
    border-radius: 0 5px 5px 0;
  }
  .chooseContainer{
    position: static;
  }

</style>
