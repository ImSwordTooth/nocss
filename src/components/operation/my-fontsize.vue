<template>
  <li>
    <span  class="operateTitle" @click.ctrl="del"><i class="iconfont iconfontsize"></i>字体大小</span>
    <div>
      <input type="range" min="12" max="100" step="1" v-model="fontsize">
      <span>{{fontsize}}px</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'my-fontsize',
  props: ['now'],
  data () {
    return {
      fontsize: 12 // 字体大小
    }
  },
  created () {
    this.$watch('$data.fontsize', function () {
      this.submit('font-size', this.now, `${this.fontsize}px`)
    }, {immediate: this.isMed})
  },
  computed: {
    isMed () {
      return this.now !== 'standard'
    }
  },
  methods: {
    del () {
      this.submit('font-size', this.now, '')
    }
  }
}
</script>

<style scoped>
  input[type=range]{
    width: 200px;
  }
</style>
