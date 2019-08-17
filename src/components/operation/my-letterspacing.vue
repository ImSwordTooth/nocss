<template>
    <li>
      <span class="operateTitle" @click.ctrl="del"><i class="iconfont iconletterspacing"></i>字体间距</span>
      <div>
        <input type="range" min="0" max="50" step="1" v-model="letterspacing">
        <span>{{letterspacing}}px</span>
      </div>
    </li>
</template>

<script>
export default {
  name: 'my-letterspacing',
  props: ['now'],
  data () {
    return {
      letterspacing: 0
    }
  },
  created () {
    this.$watch('$data.letterspacing', function () {
      this.submit('letter-spacing', this.now, `${this.letterspacing}px`)
    }, {immediate: this.isMed})
  },
  computed: {
    isMed () {
      return this.now !== 'standard'
    }
  },
  methods: {
    del () {
      this.submit('letter-spacing', this.now, '')
    }
  }
}
</script>

<style scoped>
  input[type=range]{
    width: 200px;
  }
</style>
