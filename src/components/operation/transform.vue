<template>
    <li id="transform">
      <span class="operateTitle" v-tooltip.top="'ctrl+单击变化类型以删除该项'"><i class="iconfont icontransform"></i>变形</span>
      <div>
        <div v-for="(tr,index) in list" class="listDiv">
          <span class="info">变化类型：</span>
          <span v-if="tr.transformName!=='请选择'" class="transName" @click.ctrl="spliceList(index)">{{tr.transformName}}</span>
          <span class="chooseContainer" v-if="tr.transformName==='请选择'" :class="{'tttop':isShow}" @click="isShow = !isShow" v-clickoutside="hideChoose">{{tr.transformName}}
          <i class="iconfont" :class="{'iconuparrow':isShow,'icondownarrow':!isShow}"></i>
          <ul v-show="isShow">
            <li @click="changeTransformName($event,index)" data-type="translate"><i class="iconfont icontranslate"></i>平移</li>
            <li @click="changeTransformName($event,index)" data-type="scale"><i class="iconfont iconscale"></i>缩放</li>
            <li @click="changeTransformName($event,index)" data-type="rotate"><i class="iconfont iconrotate"></i>旋转</li>
            <li @click="changeTransformName($event,index)" data-type="skew"><i class="iconfont iconskew"></i>倾斜</li>
          </ul>
        </span>
          <div class="content" v-show="tr.transformName==='translate'">
            <span class="info">左右：</span><input type="text" class="operateText" maxlength="3" v-model="tr.translateX" @input="changeValue(index)"><span class="unit">px</span>
            <span class="info">上下：</span><input type="text" class="operateText" maxlength="3" v-model="tr.translateY" @input="changeValue(index)"><span class="unit">px</span>
          </div>
          <div class="content" v-show="tr.transformName==='scale'">
            <span class="info">横向：</span><input type="text" class="operateText" maxlength="3" v-model="tr.scaleX" @input="changeValue(index)"><span class="unit">倍</span>
            <span class="info">纵向：</span><input type="text" class="operateText" maxlength="3" v-model="tr.scaleY" @input="changeValue(index)"><span class="unit">倍</span>
          </div>
          <div class="content" v-show="tr.transformName==='rotate'">
            <span class="info">角度：</span><input type="text" class="operateText" maxlength="3" v-model="tr.rotateDeg" @input="changeValue(index)"><span class="unit">deg</span>
          </div>
          <div class="content" v-show="tr.transformName==='skew'">
            <span class="info">横向：</span><input type="text" class="operateText" maxlength="3" v-model="tr.skewX" @input="changeValue(index)"><span class="unit">deg</span>
            <span class="info">纵向：</span><input type="text" class="operateText" maxlength="3" v-model="tr.skewY" @input="changeValue(index)"><span class="unit">deg</span>
          </div>
        </div>
        <button class="add" @click="addList" v-show="isShowAdd"><i class="iconfont iconadd"></i></button>
      </div>
    </li>
</template>

<script>
    export default {
        name: "transform",
      props:['now'],
      data(){
          return{
            isShow:false,
            list:[
              {
                transformName:'请选择',
                translateX:0,
                translateY:0,
                scaleX:1,
                scaleY:1,
                rotateDeg:0,
                skewX:0,
                skewY:0
              }
              ],
          }
      },
      computed:{
          isShowAdd(){
            return !this.list.some(function (item) {
              return item.transformName==='请选择'
            })
          }
      },
      methods:{
          hideChoose(){
            this.isShow = false
          },
        changeTransformName(e,index){
          this.list[index].transformName = e.currentTarget.dataset.type;
        },
        changeValue(index){
            if (index){
              let translateX = this.list[index].translateX,
                translateY = this.list[index].translateY,
                scaleX = this.list[index].scaleX,
                scaleY = this.list[index].scaleY,
                rotateDeg = this.list[index].rotateDeg,
                skewX = this.list[index].skewX,
                skewY = this.list[index].skewY;
            }
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
            this.changeValue();
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
              })
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
        }
      },
      watch:{
        list(){
          console.log('gg')
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
