<template>
  <li>
    <span class="operateTitle" v-tooltip.top="'等会再写'"><i class="iconfont iconobjectfit"></i>object-fit</span>
    <div class="content">
      <span class="info">尺寸模式：</span>
      <div class="chooseContainer" :class="{'tttop':isShow}" @click="choose($event)" v-clickoutside="hideChoose">{{imageMood}}
        <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
        <ul v-show="isShow" :class="{'showTop':showTop}">
          <li v-tooltip.right.end="'保持原有尺寸'"><i class="iconfont iconnone"></i>none</li>
          <li v-tooltip.left="'将被缩放，保持其宽高比，如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。'"><i class="iconfont iconcontain"></i>contain</li>
          <li v-tooltip.right="'保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。'"><i class="iconfont iconcover"></i>cover</li>
          <li v-tooltip.right="'被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。'"><i class="iconfont iconfill"></i>fill</li>
          <li v-tooltip.right="'内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些'"><i class="iconfont iconscaledown"></i>scale-down</li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'my-objectfit',
  data () {
    return {
      isShow: false,
      imageMood: 'none',
      showTop: false
    }
  },
  methods: {
    choose (e) {
      this.isShow = !this.isShow
      this.showTop = window.innerHeight - e.clientY < 238
    },
    hideChoose () {
      this.isShow = false
    }
  }
}
</script>

<style scoped>

</style>
