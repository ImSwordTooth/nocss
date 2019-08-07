<template>
    <li>
      <span class="operateTitle" @click.ctrl="del" v-tooltip.top="'ctrl+单击<变化类型>以删除该子项'"><i class="iconfont icontransform"></i>变形</span>
      <div>
        <div v-for="(tr,index) in list" class="listDiv">
          <span class="info">变化类型：</span>
          <span v-if="tr.transformName!=='请选择'" class="transName" @click.ctrl="spliceList(index)">{{tr.transformName}}</span>
          <div class="chooseContainer" v-if="tr.transformName==='请选择'" :class="{'tttop':isShow}" @click="choose($event)" v-clickoutside="hideChoose">{{tr.transformName}}
            <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
            <ul v-show="isShow" :class="{'showTop':showTop}">
              <li @click="changeTransformName($event,index)" data-type="translate"><i class="iconfont icontranslate"></i>平移<span class="en">translate</span></li>
              <li @click="changeTransformName($event,index)" data-type="scale"><i class="iconfont iconscale"></i>缩放<span class="en">scale</span></li>
              <li @click="changeTransformName($event,index)" data-type="rotate"><i class="iconfont iconrotate"></i>旋转<span class="en">rotate</span></li>
              <li @click="changeTransformName($event,index)" data-type="skew"><i class="iconfont iconskew"></i>倾斜<span class="en">skew</span></li>
            </ul>
          </div>
          <div class="content" v-if="tr.transformName==='translate'">
            <span class="info">左右：</span><input type="text" class="operateText" v-model="tr.translateX"><span class="unit">px</span>
            <span class="info">上下：</span><input type="text" class="operateText" v-model="tr.translateY"><span class="unit">px</span>
          </div>
          <div class="content" v-if="tr.transformName==='scale'">
            <span class="info">横向：</span><input type="text" class="operateText" v-model="tr.scaleX"><span class="unit">倍</span>
            <span class="info">纵向：</span><input type="text" class="operateText" v-model="tr.scaleY"><span class="unit">倍</span>
          </div>
          <div class="content" v-if="tr.transformName==='rotate'">
            <span class="info">角度：</span><input type="text" class="operateText" v-model="tr.rotateDeg"><span class="unit">deg</span>
          </div>
          <div class="content" v-if="tr.transformName==='skew'">
            <span class="info">横向：</span><input type="text" class="operateText" v-model="tr.skewX"><span class="unit">deg</span>
            <span class="info">纵向：</span><input type="text" class="operateText" v-model="tr.skewY"><span class="unit">deg</span>
          </div>
        </div>
        <button class="add" @click="addList" v-show="isShowAdd"><i class="iconfont iconadd"></i></button>
      </div>
    </li>
</template>

<script>
    export default {
      name: "my-transform",
      props:['now'],
      data(){
        return{
          isShow:false,                                                     //控制变化类型的下拉框
          list:[                                                            //变形列表
            {
              transformName:'请选择',                                            //变形类型
              translateX:0,                                                         //X轴平移量
              translateY:0,                                                         //Y轴平移量
              scaleX:1,                                                             //X轴缩放量
              scaleY:1,                                                             //Y轴缩放量
              rotateDeg:0,                                                          //旋转角度
              skewX:0,                                                              //X轴倾斜角度
              skewY:0,                                                              //Y轴倾斜角度
            }
          ],
          showTop:false
        }
      },
      created(){
        this.$watch('$data.list',function () {
          this.prepareSubmit();
        },{immediate:this.isMed,deep:true})
      },
      computed:{
        isShowAdd(){                                                            //当变化类型没有是“请选择”的时候才显示添加按钮（其实并不好）
          return !this.list.some(function (item) {
            return item.transformName==='请选择'
          })
        },
        isMed(){
          return this.now !== 'standard'
        }
      },
      methods:{
        choose(e){
          this.isShow = !this.isShow;
          this.showTop = window.innerHeight - e.clientY < 238;
        },
        //隐藏变化类型下拉框
        hideChoose(){
          this.isShow = false
        },
        //改变变形类型
        changeTransformName(e,index){
          this.list[index].transformName = e.currentTarget.dataset.type;
        },
        prepareSubmit(){
            let replaceStr = '';                                                //由于有四种情况，所以要提前确认代替的字符串
            this.list.forEach(item=>{
              let x = '';
              let transformName = item.transformName;
              switch (transformName) {
                case 'translate':x = `${transformName}(${item.translateX}px,${item.translateY}px)`;break;
                case 'scale':x = `${transformName}(${item.scaleX},${item.scaleY})`;break;
                case `rotate`:x = `${transformName}(${item.rotateDeg}deg)`;break;
                case `skew`:x = `${transformName}(${item.skewX}deg,${item.skewY}deg)`;break;
              }
              replaceStr += ` ${x}`
            });
          this.submit('transform',this.now,replaceStr);
        },
        spliceList(index){
            this.list.splice(index,1);
            this.prepareSubmit();
            if (this.list.length === 0){
              this.list.push({
                transformName:'请选择',
                translateX:0,
                translateY:0,
                scaleX:1,
                scaleY:1,
                rotateDeg:0,
                skewX:0,
                skewY:0
              });

            }
        },
        addList(){
          this.list.push({
            transformName:'请选择',
            translateX:0,
            translateY:0,
            scaleX:1,
            scaleY:1,
            rotateDeg:0,
            skewX:0,
            skewY:0
          })
        },
        del(){
          this.submit('transform',this.now,'')
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
  .transName{
    background-color: #efefef;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    border: solid 1px #cccccc;
  }
  .unit{
    margin:0 20px 0 5px;
    font-size: 12px;
  }
  .content{
    display: inline-block;
    margin-left: 30px;
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
