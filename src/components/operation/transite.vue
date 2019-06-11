<template>
  <li id="transition">
    <span class="operateTitle" v-tooltip.top="'仅支持当前css代码中已出现的属性'"><i class="iconfont icontransition"></i>过渡</span>
    <div>
      看你的了
      <span class="chooseContainer" :class="{'tttop':isShowBorderStyle}" @click="isShowBorderStyle = !isShowBorderStyle" v-clickoutside="hideBorderStyle">{{borderStyle}}
          <i class="iconfont" :class="{'iconuparrow':isShowBorderStyle,'icondownarrow':!isShowBorderStyle}"></i>
          <ul v-show="isShowBorderStyle">
            <li @click="changeBorderStyle($event)"><i class="iconfont iconsolid"></i>solid</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icondashed"></i>dashed</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icondouble"></i>double</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icondotted"></i>dotted</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont iconinset"></i>inset</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont iconoutset"></i>outset</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont icongroove"></i>groove</li>
            <li @click="changeBorderStyle($event)"><i class="iconfont iconridge"></i>ridge</li>
          </ul>
        </span>
    </div>
  </li>
</template>

<script>
    export default {
        name: "transite"
    }
</script>

<style scoped>
  /*.icon { width: 2.2em; height: 2.2em; }*/
</style>
