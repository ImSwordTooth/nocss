<template>
  <div class="animation">
    <div class="setting" >
      <!--css中animation属性的设置-->
      <div>
        <div class="item">
          <input type="text" class="animationName operateText" v-model="keyframesName" placeholder="动画名称"><button @click="deleteKeyframes" v-show="isShowDelete">删除</button>
        </div>
        <div class="item">
          <span class="info">过渡动画：</span>
          <div class="chooseContainer chooseEasing" :class="{'tttop':isShowEasing}" @click="isShowEasing = !isShowEasing" v-clickoutside="hideEasing">{{easing}}
            <i class="iconfont" :class="{'iconuparrow':isShowEasing,'icondownarrow':!isShowEasing}"></i>
            <ul v-show="isShowEasing">
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'linear':isActive==='linear'}"></i></div>linear</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease':isActive==='ease'}"></i></div>ease</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-in':isActive==='ease-in'}"></i></div>ease-in</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-out':isActive==='ease-out'}"></i></div>ease-out</li>
              <li @click="changeEasing($event)" @mouseenter="changeActive($event)" @mouseleave="deleteActive()"><div><i class="iconfont iconball" :class="{'ease-in-out':isActive==='ease-in-out'}"></i></div>ease-in-out</li>
            </ul>
          </div>
        </div>
        <div class="item">
          <span class="info">过渡时间：</span>
          <input type="text" class="operateText" maxlength="3" v-model="during"><span class="unit">s</span>
        </div>
        <div class="item">
          <label class="checkbox" v-tooltip.top="'由于“非无限”会导致动画只播放一次，因此建议一直开启“无限”以查看效果，实际情况下由您定制'">
            <input type="checkbox" v-model="isChecked">
            <i class="iconfont" :class="{'iconcheckboxnotchecked':!isChecked,'iconcheckboxchecked':isChecked}"></i>
            无限
          </label>
        </div>
      </div>
      <!--设置结束-->
      <div class="add">
        <div class="chooseContainer" @click="isShow = !isShow" v-clickoutside="hideBox">添加项
          <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
          <ul v-show="isShow">
            <li @click="add($event)" data-type="my-color" :class="{'checked':isTaped('color')}"><i class="iconfont iconcolor"></i>颜色<span class="en">color</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-fontsize" :class="{'checked':isTaped('fontsize')}"><i class="iconfont iconfontsize"></i>字体大小<span class="en">font-size</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-border" :class="{'checked':isTaped('border')}"><i class="iconfont iconborder"></i>边框<span class="en">border</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-fontstyle" :class="{'checked':isTaped('fontstyle')}"><i class="iconfont iconfontstyle"></i>字形<span class="en">font相关</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-backgroundcolor" :class="{'checked':isTaped('backgroundcolor')}"><i class="iconfont iconbackgroundcolor"></i>背景色<span class="en">border-color</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-padding" :class="{'checked':isTaped('padding')}"><i class="iconfont iconpadding"></i>内边距<span class="en">padding</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-textshadow" :class="{'checked':isTaped('textshadow')}"><i class="iconfont icontextshadow"></i>字体阴影<span class="en">font-shadow</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-boxshadow" :class="{'checked':isTaped('boxshadow')}"><i class="iconfont iconboxshadow"></i>盒子阴影<span class="en">box-shadow</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-transform" :class="{'checked':isTaped('transform')}"><i class="iconfont icontransform"></i>变形<span class="en">transform</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-transition" :class="{'checked':isTaped('transition')}"><i class="iconfont icontransition"></i>过渡<span class="en">transition</span><i class="iconfont iconok"></i></li>
            <li @click="add($event)" data-type="my-outline" :class="{'checked':isTaped('outline')}"><i class="iconfont iconoutline"></i>轮廓线<span class="en">outline</span><i class="iconfont iconok"></i></li>
          </ul>
         </div>
        <label class="addPercent">
          <!--type为input时，不支持自动屏蔽非数字，type为number时不支持最大长度，我选择number+input方法剪切长度-->
          <input type="number" @input="sliceTwo()" v-model="addPercentValue"><span>%</span>
          <button @click="addPercent">添加节点</button>
        </label>
      </div>
    </div>
    <!--循环渲染出各个节点-->
    <div class="content">
      <div v-for="(percent,index) in percentList">
        <component :is="tools" :percentName="percent.name"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import Hover from "../pseudoClasses/hover";
  import Color from "../operation/my-color"

  export default {
    name: "animation",
    components: {Hover,Color},
    data(){
      return{
        tools:null,                  //节点组件列表
        isShowEasing:false,          //控制easing下拉框的显示
        isShow:false,                //控制添加项下拉框的显示
        keyframesName:"",             //animation中keyframes的名字
        easing:"ease",                //animation中easing参数
        during:0,                     ///animation中during参数，持续时间
        isActive:null,                //控制easing选择框中哪个小球应该运动
        addPercentValue:'',          //新增节点的值
        isChecked:true               //是否无限循环，即infinite
      }
    },
    //页面加载时动态导入各个百分比节点的组件
    mounted(){
      import('../pseudo/percent').then(res=>{
        this.tools = res.default;
      })
    },
    computed:{
      // 百分比节点列表
      percentList(){
        //后面的sort是根据节点的百分比进行排序
        return this.$store.getters.getPercentList;
        // return this.$store.getters.getPercentList.sort((a,b)=>(Number(a.name.slice(0,a.name.length-1)-Number(b.name.slice(0,b.name.length-1)))));
      },
      isShowDelete(){
        return this.$store.getters.getPercentList[0].content.length !== 0;
      },
      isTaped(){
        return function (type){
          //用闭包给计算属性添加参数
          return this.percentList.some(item=>{                      //如果动态加载的属性组件里有指定的名字的组件，就返回true，为true就添加了checked类，展示为已选中
            return item.content.includes(`my-${type}`)
          })
        }
      }
    },
    methods:{
      //添加百分比节点
      addPercent(){
        let list = this.percentList;
        let con = Object.assign([],list[0].content);                     //由于每个百分比节点的“内容”都是一样的,此处要用浅拷贝
        let arr = [];                                 //现有百分比节点列表
        list.forEach(item=>{
          arr.push(Number(item.name.slice(0,item.name.length-1)))
        });
        if (!arr.includes(Number(this.addPercentValue))) {                  //现有百分比节点列表里没有才添加，防止重复
          arr.push(Number(this.addPercentValue));
          arr.sort((a,b)=>a-b);                                             //按顺序添加
          let index = arr.indexOf(Number(this.addPercentValue));
          list.splice(index,0,{name:`${this.addPercentValue}%`,content:con})
        }
        this.$store.dispatch('changePercentList',list);
        this.addPercentValue =''                                           //添加完成后重置文本框
      },
      //给每个节点添加属性
      add(e){
        let animationCodes = this.$store.getters.getAnimationCodes;
        let codes = this.$store.getters.getCodes;
        let keyframesName = this.keyframesName===""?"css":this.keyframesName;           //@keyframes动画名字默认是css
        let isInfinite = this.isChecked?"infinite":"";
        let str = `${keyframesName} ${this.easing} ${this.during}s ${isInfinite}`;                              //这里是假的，后面再加
        if (animationCodes==='') {                                                      //如果动画代码是空的
          animationCodes = `@keyframes css {\n}`;                                       //1.初始化动画代码
          this.$store.dispatch("changeAnimationCodes", animationCodes);
          this.submit("animation","standard",str);                                      //2.给css添加动画属性
          let css = document.styleSheets[0];
          css.insertRule(animationCodes,0)                                                //3.插入@keyframes规则
        }
        let property = e.currentTarget.dataset.type;
        let list = this.$store.getters.getPercentList;
        if (!list[0].content.includes(property)) {
          for (let i=0; i<list.length; i++){                                              //循环百分比节点
            list[i].content.push(property)                                                //每个节点都要有这个属性
          }
        }
        this.$store.dispatch("changePercentList",list)
      },
      //删除@keyframes规则
      deleteKeyframes(){
        let css = document.styleSheets[0];
        css.deleteRule(0)
      },
      //限制数字文本框只能输入两位数
      sliceTwo(){
        if (this.addPercentValue.length > 2) {
          this.addPercentValue = this.addPercentValue.slice(0,2);
        }
      },
      // 改变小球运动对象
      changeActive(e){
        this.isActive = e.currentTarget.innerText
      },
      //鼠标移出时删除小球运动对象
      deleteActive(){
        this.isActive = null
      },
      //改变easing
      changeEasing(e){
        this.easing = e.currentTarget.innerText;
      },
      //关闭easing下拉框
      hideEasing(){
        this.isShowEasing = false
      },
      //关闭添加项的下拉框
      hideBox(){
        this.isShow = false
      },
      //准备提交
      prepareSubmit(){
        let keyframesName = this.keyframesName===""?"css":this.keyframesName;
        let isInfinite = this.isChecked?"infinite":"";
        this.submit("animation","standard",`${keyframesName} ${this.easing} ${this.during}s ${isInfinite} `)
      },
    },
    watch:{
      keyframesName(){
        this.prepareSubmit();
      },
      easing(){
        this.prepareSubmit();
      },
      during(){
        this.prepareSubmit();
      },
      isChecked(){
        this.prepareSubmit();
      }
    }
  }
</script>

<style scoped>
  .setting{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .setting .animationName{
    position: relative;
    top: 0;
    padding: 10px 5px;
    border-radius: 5px;
    font-size: 18px;
    border: solid 1px #ccc;
    width: 120px;
    outline: solid 1px rgba(18, 150, 219, 0);
    outline-offset: 15px;
    background-color: #ebebeb;
    font-weight: bold;
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
    left: 0;
    padding-top: 3px;
  }
  .addPercent{
    position: relative;
  }
  .addPercent input{
    width: 70px;
    outline: none;
    height: 30px;
    font-weight: bold;
    line-height: 30px;
    padding: 3px 45px 3px 10px;
    border: solid 1px rgba(0, 0, 0, 0.22);
    background-color: rgba(148, 144, 140, 0.12);
    color: black;
    font-size: 1.1em;
    font-style: italic;
    box-shadow: 2px 1px 5px 1px rgba(54, 54, 54, 0.18);
    transition: border-radius 2s,border 2s;
    border-radius: 0 10px 10px 0;
  }
  .addPercent input:focus{
    border: solid 1px #00000094;
    border-radius: 10px;
    transition: border-radius 2s,border 2s;
  }
  .addPercent span{
    position: absolute;
    right: 78px;
    top: -3px;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
  }
  .addPercent button{
    position: absolute;
    height: 40px;
    top: -9px;
    right: 0;
    background-color: #3279c1;
    border: solid 1px #5a5a5a;
    color: #ffffff;
    outline: solid 1px transparent;
  }
  .addPercent button:hover{
    box-shadow: 1px 1px 3px 1px #a7a7a7fa;
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
      left: 0;
    }
    100%{
      left: 70%;
    }
  }
  .content{
    position: relative;
    /*overflow: auto;*/
  }
  .percent{
    display: inline-flex;
    align-items: center;
  }
  .percent i{
    color: #56a1ea;
    font-size: 28px;
  }
  .percent span{
    font-weight: lighter;
  }
</style>
