<template>
  <li>
    <span class="operateTitle" @click.ctrl="del" v-tooltip.top="'仅支持当前css代码中已出现的属性'"><i class="iconfont icontransition"></i>过渡</span>
    <div class="content">
      <div v-for="(item,index) in list" class="listDiv" :key="index">
        <div class="item">
          <span class="info">过渡属性：</span>
          <span v-if="item.transitionName!=='请选择'" class="value" @click.ctrl="spliceList(index)">{{item.transitionName}}</span>
          <div v-if="item.transitionName==='请选择'" class="chooseContainer" @click="chooseName($event)" v-clickoutside="hideTransitionName">
            {{item.transitionName}}
            <i class="iconfont" :class="{'iconuparrow':isShowTransitionName,'icondownarrow':!isShowTransitionName}"></i>
            <ul v-show="isShowTransitionName" :class="{'showTop':showTop_Name}">
              <li @click="changeTransitionName($event,index)" data-type="all"><i class="iconfont iconall"></i>全部<span class="en">all</span></li>
              <li @click="changeTransitionName($event,index)" data-type="color"><i class="iconfont iconcolor"></i>颜色<span class="en">color</span></li>
              <li @click="changeTransitionName($event,index)" data-type="fontsize"><i class="iconfont iconfontsize"></i>字体大小<span class="en">font-size</span></li>
              <li @click="changeTransitionName($event,index)" data-type="border"><i class="iconfont iconborder"></i>边框<span class="en">border</span></li>
              <li @click="changeTransitionName($event,index)" data-type="fontstyle"><i class="iconfont iconfontstyle"></i>字形<span class="en">font相关</span></li>
              <li @click="changeTransitionName($event,index)" data-type="background-color"><i class="iconfont iconbackgroundcolor"></i>背景色<span class="en">border-color</span></li>
              <li @click="changeTransitionName($event,index)" data-type="padding"><i class="iconfont iconpadding"></i>内边距<span class="en">padding</span></li>
              <li @click="changeTransitionName($event,index)" data-type="textshadow"><i class="iconfont icontextshadow"></i>字体阴影<span class="en">text-shadow</span></li>
              <li @click="changeTransitionName($event,index)" data-type="boxshadow"><i class="iconfont iconboxshadow"></i>盒子阴影<span class="en">box-shadow</span></li>
              <li @click="changeTransitionName($event,index)" data-type="transform"><i class="iconfont icontransform"></i>变形<span class="en">transform</span></li>
              <li @click="changeTransitionName($event,index)" data-type="outline"><i class="iconfont iconoutline"></i>轮廓线<span class="en">outline</span></li>
            </ul>
          </div>
        </div>
        <div class="item">
          <span class="info">过渡动画：</span>
          <span v-if="item.easing!=='请选择'" class="value" @click.ctrl="spliceList(index)">{{item.easing}}</span>
          <div v-if="item.easing==='请选择'" class="chooseContainer chooseEasing" :class="{'tttop':isShowEasing}" @click="chooseEasing($event)" v-clickoutside="hideEasing">
            {{item.easing}}
            <i class="iconfont" :class="{'iconuparrow':isShowEasing,'icondownarrow':!isShowEasing}"></i>
            <ul v-show="isShowEasing" :class="{'showTop':showTop_Easing}">
              <li @click="changeEasing($event,index)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'linear':isActive==='linear'}"></i></div>linear</li>
              <li @click="changeEasing($event,index)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease':isActive==='ease'}"></i></div>ease</li>
              <li @click="changeEasing($event,index)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-in':isActive==='ease-in'}"></i></div>ease-in</li>
              <li @click="changeEasing($event,index)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-out':isActive==='ease-out'}"></i></div>ease-out</li>
              <li @click="changeEasing($event,index)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-in-out':isActive==='ease-in-out'}"></i></div>ease-in-out</li>
            </ul>
          </div>
        </div>
        <div class="item">
          <span class="info">过渡时间：</span>
          <input type="text" class="operateText" maxlength="3" v-model="item.during"><span class="unit">s</span>
        </div>
        <div class="item">
          <span class="info">延迟时间：</span>
          <input type="text" class="operateText" maxlength="3" v-model="item.delay"><span class="unit">s</span>
        </div>
      </div>

      <button class="add" @click="addList" v-show="isShowAdd"><i class="iconfont iconadd"></i></button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'my-transition',
  props: ['now'],
  data () {
    return {
      // easing:'ease',
      isShowEasing: false,
      isShowTransitionName: false,
      isActive: null,
      showTop_Name: false,
      showTop_Easing: false,
      // transitionName:'请选择',
      // during:0,
      list: [
        {
          transitionName: '请选择',
          easing: '请选择',
          during: 0,
          delay: 0
        }
      ]
    }
  },
  created () {
    this.$watch('$data.list', function () {
      this.prepareSubmit()
    }, {immediate: this.isMed, deep: true})
  },
  computed: {
    isShowAdd () {
      return !this.list.some(function (item) {
        return item.transitionName === '请选择' || item.easing === '请选择'
      })
    },
    isMed () {
      return this.now !== 'standard'
    }
  },
  methods: {
    chooseName (e) {
      this.isShowTransitionName = !this.isShowTransitionName
      this.showTop_Name = window.innerHeight - e.clientY < 238
    },
    chooseEasing (e) {
      this.isShowEasing = !this.isShowEasing
      this.showTop_Easing = window.innerHeight - e.clientY < 238
    },
    changeActive (e) {
      this.isActive = e.currentTarget.innerText
    },
    deleteActive () {
      this.isActive = null
    },
    hideEasing () {
      this.isShowEasing = false
    },
    hideTransitionName () {
      this.isShowTransitionName = false
    },
    changeEasing (e, i) {
      this.list[i].easing = e.currentTarget.innerText
    },
    changeTransitionName (e, i) {
      this.list[i].transitionName = e.currentTarget.dataset.type
    },
    prepareSubmit () {
      let replaceStr = ''
      this.list.forEach(item => {
        replaceStr += ` ${item.transitionName} ${item.easing} ${item.during}s ${item.delay}s,`
      })
      this.submit('transition', this.now, replaceStr.slice(0, replaceStr.length - 1))
    },
    addList () {
      this.list.push({
        transitionName: '请选择',
        easing: '请选择',
        during: 0
      })
    },
    spliceList (index) {
      this.list.splice(index, 1)
      // this.changeValue();
      if (this.list.length === 0) {
        this.list.push({
          transitionName: '请选择',
          easing: '请选择',
          during: 0,
          delay: 0
        })
      }
    },
    del () {
      this.submit('transition', this.now, '')
    }
  }
}
</script>

<style scoped>
  .listDiv{
    margin-bottom: 10px;
  }
  .listDiv:nth-last-of-type(1){
    margin-bottom: 0;
  }
  .chooseEasing>ul li div{
    position: relative;
    display: inline-flex;
    width: 100px;
    height: 34px;
    justify-items: center;
  }
  .chooseEasing>ul li i{
    position: absolute;
    left: 0%;
    padding-top: 3px;
  }
  .linear{
    animation: l 1s linear;
  }
  .ease{
    animation: l 1s ease;
  }
  .ease-in{
    animation: l 1s ease-in;
  }
  .ease-out{
    animation: l 1s ease-out;
  }
  .ease-in-out{
    animation: l 1s ease-in-out;
  }
  @keyframes l {
    0%{
      left: 0%;
    }
    100%{
      left: 70%;
    }
  }
  .value{
    background-color: #efefef;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    border: solid 1px #cccccc;
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

</style>
