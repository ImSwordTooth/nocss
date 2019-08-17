<template>
    <li>
      <span class="operateTitle" @click.ctrl="del" v-tooltip.top="'ctrl+单击变化类型以删除该项'"><i class="iconfont iconfilter"></i>滤镜</span>
      <div>
        <div v-for="(fi,index) in list" class="listDiv" :key="index">
          <span class="info">函数：</span>
          <span v-if="fi.filterName!=='请选择'" class="filterName" @click.ctrl="spliceList(index)">{{fi.filterName}}()</span>
          <div class="chooseContainer" v-if="fi.filterName==='请选择'" :class="{'tttop':isShow}" @click="choose($event)" v-clickoutside="hideChoose">{{fi.filterName}}
            <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
            <ul v-show="isShow" :class="{'showTop':showTop}">
              <li @click="changeFilterName($event,index)" data-type="blur"><i class="iconfont iconblur"></i>高斯模糊<span class="en">blur()</span></li>
              <li @click="changeFilterName($event,index)" data-type="brightness"><i class="iconfont iconbrightness"></i>亮度<span class="en">brightness()</span></li>
              <li @click="changeFilterName($event,index)" data-type="contrast"><i class="iconfont iconcontrast"></i>对比度<span class="en">contrast()</span></li>
              <li @click="changeFilterName($event,index)" data-type="grayscale"><i class="iconfont icongrayscale"></i>灰度<span class="en">grayscale()</span></li>
              <li @click="changeFilterName($event,index)" data-type="opacity"><i class="iconfont iconopacity"></i>透明度<span class="en">opacity()</span></li>
              <li @click="changeFilterName($event,index)" data-type="sepia"><i class="iconfont iconsepia"></i>褐度<span class="en">sepia()</span></li>
              <li @click="changeFilterName($event,index)" data-type="saturate"><i class="iconfont iconsaturate"></i>饱和度<span class="en">saturate()</span></li>
              <li @click="changeFilterName($event,index)" data-type="hue-rotate"><i class="iconfont iconhuerotate"></i>色相旋转<span class="en">hue-rotate()</span></li>
              <li @click="changeFilterName($event,index)" data-type="invert"><i class="iconfont iconinvert"></i>反转输出<span class="en">invert()</span></li>
              <li @click="changeFilterName($event,index)" data-type="drop-shadow"><i class="iconfont icondropshadow"></i>阴影<span class="en">drop-shadow()</span></li>
            </ul>
          </div>
          <div class="content" v-if="fi.filterName==='blur'">
            <span class="info">模糊度：</span><input type="text" class="operateText" v-model="fi.blur"><span class="unit">px</span>
          </div>
          <div class="content" v-if="fi.filterName==='brightness'">
            <span class="info">亮度：</span><input type="text" class="operateText" v-model="fi.brightness"><span class="unit">%</span>
          </div>
          <div class="content" v-if="fi.filterName==='contrast'">
            <span class="info">对比度：</span><input type="text" class="operateText" v-model="fi.contrast"><span class="unit">%</span>
          </div>
          <div class="content" v-if="fi.filterName==='grayscale'">
            <span class="info">灰度：</span><input type="range" min="1" max="100" step="1" v-model="fi.grayscale"><span>{{fi.grayscale}}%</span>
          </div>
          <div class="content" v-if="fi.filterName==='opacity'">
            <span class="info">透明度：</span><input type="range" min="1" max="100" step="1" v-model="fi.opacity"><span>{{fi.opacity}}%</span>
          </div>
          <div class="content" v-if="fi.filterName==='sepia'">
            <span class="info">褐度：</span><input type="range" min="1" max="100" step="1" v-model="fi.sepia"><span>{{fi.sepia}}%</span>
          </div>
          <div class="content" v-if="fi.filterName==='saturate'">
            <span class="info">饱和度：</span><input type="text" class="operateText" v-model="fi.saturate"><span class="unit">%</span>
          </div>
          <div class="content" v-if="fi.filterName==='hue-rotate'">
            <span class="info">色相旋转：</span><input type="range" style="width: 300px" min="1" max="360" step="1" v-model="fi.huerotate"><span>{{fi.huerotate}}deg</span>
          </div>
          <div class="content" v-if="fi.filterName==='invert'">
            <span class="info">反转输出：</span><input type="range" min="1" max="100" step="1" v-model="fi.invert"><span>{{fi.invert}}%</span>
          </div>
          <div class="content" v-if="fi.filterName==='drop-shadow'">
            <ul class="shadow">
              <li>
                <span class="info">颜色</span>
                <div>
                  <span class="color" :class="{'tttop':isShowColor}" @click="isShowColor = true" v-clickoutside="hideColorPicker">
                    <span class="currentColor" :style="{'background':rgba(index)}"></span>
                    <span class="currentColorText">{{colorText(index)}}</span>
                    <chrome-picker class="colorPicker" v-if="isShowColor" v-model="fi.color"></chrome-picker>
                  </span>
                </div>
              </li>
              <li>
                <span class="info">x轴：</span>
                <div>
                  <input type="range" min="-20" max="20" step="1" v-model="fi.x"><span>{{fi.x}}px</span>
                </div>
              </li>
              <li>
                <span class="info">y轴：</span>
                <div>
                  <input type="range" min="-20" max="20" step="1" v-model="fi.y"><span>{{fi.y}}px</span>
                </div>
              </li>
              <li>
                <span class="info">模糊：</span>
                <div>
                  <input type="range" min="1" max="20" step="1" v-model="fi.shadowblur"><span>{{fi.shadowblur}}px</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button class="add" @click="addList" v-show="isShowAdd"><i class="iconfont iconadd"></i></button>
      </div>
    </li>
</template>

<script>
import {Chrome} from 'vue-color'

export default {
  name: 'my-filter',
  props: ['now'],
  data () {
    return {
      isShow: false, // 控制滤镜函数的下拉框
      isShowColor: false,
      showTop: false,
      list: [ // 滤镜列表
        {
          filterName: '请选择', // 滤镜函数名
          blur: 0, // 高斯模糊
          brightness: 100, // 亮度
          contrast: 100, // X轴缩放量
          grayscale: 0, // Y轴缩放量
          opacity: 100, // 旋转角度
          sepia: 0, // X轴倾斜角度
          saturate: 100, // Y轴倾斜角度
          huerotate: 0,
          invert: 0,
          x: 0,
          y: 0,
          shadowblur: 0,
          color: {
            rgba: { r: 0, g: 0, b: 0, a: 0 },
            a: 1
          }
        }
      ]
    }
  },
  created () {
    this.$watch('$data.list', function () {
      this.prepareSubmit()
    }, {immediate: this.isMed, deep: true})
  },
  components: {
    'chrome-picker': Chrome
  },
  computed: {
    rgba () { // 计算属性传参，用闭包
      return function (index) {
        let rgba = this.list[index].color.rgba
        if (rgba.a === 0) { // 透明度为0时，用斜纹代替颜色，表示透明
          return `linear-gradient(45deg, rgba(0, 0, 0, 0.15) 25%, transparent 25%, rgba(0, 0, 0, 0.15) 50%, transparent 50%, rgba(0, 0, 0, 0.15) 75%, transparent 75%, rgba(0, 0, 0, 0.15))`
        } else { // 其他情况下显示正常颜色
          return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        }
      }
    },
    colorText () {
      return function (index) {
        let rgba = this.list[index].color.rgba
        if (rgba.a === 0) { // 透明度为0时，颜色为“无”
          return '无'
        } else { // 其他情况下显示正常颜色文本
          return rgba.a === 1 ? this.list[index].color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        }
      }
    },
    isShowAdd () { // 当变化类型没有是“请选择”的时候才显示添加按钮（其实并不好）
      return !this.list.some(function (item) {
        return item.filterName === '请选择'
      })
    },
    isMed () {
      return this.now !== 'standard'
    }
  },
  methods: {
    choose (e) {
      this.isShow = !this.isShow
      this.showTop = window.innerHeight - e.clientY < 238
    },
    // 隐藏滤镜函数的下拉框
    hideChoose () {
      this.isShow = false
    },
    hideColorPicker () {
      this.isShowColor = false
    },
    changeFilterName (e, index) {
      this.list[index].filterName = e.currentTarget.dataset.type
    },
    prepareSubmit () {
      let replaceStr = '' // 由于有四种情况，所以要提前确认代替的字符串
      this.list.forEach(item => {
        let x = ''
        let filterName = item.filterName
        switch (filterName) {
          case 'blur':x = `${filterName}(${item.blur}px)`; break
          case 'brightness':x = `${filterName}(${item.brightness}%)`; break
          case `contrast`:x = `${filterName}(${item.contrast}%)`; break
          case `grayscale`:x = `${filterName}(${item.grayscale}%)`; break
          case `opacity`:x = `${filterName}(${item.opacity}%)`; break
          case `sepia`:x = `${filterName}(${item.sepia}%)`; break
          case `saturate`:x = `${filterName}(${item.saturate}%)`; break
          case `hue-rotate`:x = `${filterName}(${item.huerotate}deg)`; break
          case `invert`:x = `${filterName}(${item.invert}%)`; break
          case `drop-shadow`:
            let rgba = item.color.rgba
            let currentColor = rgba.a === 1 ? item.color.hex : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
            x = `${filterName}(${item.x}px ${item.y}px ${item.shadowblur}px ${currentColor})`; break
        }
        replaceStr += ` ${x}` // 前面有个小小的空格，不能删
      })
      this.submit('filter', this.now, replaceStr)
    },
    spliceList (index) {
      this.list.splice(index, 1)
      this.prepareSubmit()
      if (this.list.length === 0) {
        this.list.push({
          filterName: '请选择', // 滤镜函数名
          blur: 0, // 高斯模糊
          brightness: 100, // 亮度
          contrast: 100, // X轴缩放量
          grayscale: 0, // Y轴缩放量
          opacity: 100, // 旋转角度
          sepia: 0, // X轴倾斜角度
          saturate: 100, // Y轴倾斜角度
          huerotate: 0,
          invert: 0,
          x: 0,
          y: 0,
          shadowblur: 0,
          color: {
            rgba: { r: 0, g: 0, b: 0, a: 0 },
            a: 1
          }
        })
      }
    },
    addList () {
      this.list.push({
        filterName: '请选择', // 滤镜函数名
        blur: 0, // 高斯模糊
        brightness: 100, // 亮度
        contrast: 100, // X轴缩放量
        grayscale: 0, // Y轴缩放量
        opacity: 100, // 旋转角度
        sepia: 0, // X轴倾斜角度
        saturate: 100, // Y轴倾斜角度
        huerotate: 0,
        invert: 0,
        x: 0,
        y: 0,
        shadowblur: 0,
        color: {
          rgba: { r: 0, g: 0, b: 0, a: 0 },
          a: 1
        }
      })
    },
    del () {
      this.submit('filter', this.now, '')
    }
  }
}
</script>

<style scoped>
  .listDiv{
    /*display: inline-block;*/
    margin-bottom: 10px;
  }
  .listDiv:nth-last-of-type(1){
    margin-bottom: 0;
  }
  .filterName{
    background-color: #efefef;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    border: solid 1px #cccccc;
  }
  .content{
    display: inline-flex;
    margin-left: 30px;
    align-items: center;
  }
  .add{
    position: absolute;
    right: 5%;
    top: 5%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: url("../../assets/cursor/pen.png"),auto;
    outline: none;
  }
  .shadow{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .shadow li{
    margin-bottom: 10px;
    position: relative;
  }
  .shadow li > .info{
    position: absolute;
    left: 0;
  }
  .shadow li > div{
    padding-left: 50px;
  }
  .color{
    position: relative;
    cursor: url("../../assets/cursor/brush.png"),auto;
  }
  .colorPicker{
    position: absolute;
    left: 0;
  }
  .currentColor{
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: black;
  }
  .currentColorText{
    font-weight: lighter;
    font-size: 16px;
  }
</style>
