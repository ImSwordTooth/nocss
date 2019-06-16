import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
  toolType: '',                             //控件类型
  tagInfo:'',                               //控件的默认标签
  tagText:'文本',                           //展示区内控件中的文字
  inputType:'text',                         //input的type
  operate_head:[],                          //操作类型
  standardList:[],                          //基本操作列表
  pseudoClass:[],                           //伪类列表
  percentList:[{name:'0%',content:[]},{name:'100%',content:[]}],
  activeHead:'standard',                    //当前使用的操作类型
  codes:`.nocss {\n}`,        //代码
  hoverCodes:``,                            //hover时的代码
  animationCodes:``,                          //动画所用代码
  isAlive:true,                              //控制组件刷新

};

const getters = {   //实时监听state值的变化(最新状态)
  getToolType(state) {
    return state.toolType
  },
  getTagInfo(state){
    return state.tagInfo
  },
  getTagText(state){
    return state.tagText
  },
  getInputType(state){
    return state.inputType
  },
  getOperateHead(state){
    return state.operate_head;
  },
  getStandardList(state){
    return state.standardList;
  },
  getPseudoClass(state){
    return state.pseudoClass;
  },
  getPercentList(state){
    return state.percentList;
  },
  getActiveHead(state){
    return state.activeHead;
  },
  getCodes(state){
    return state.codes;
  },
  getHoverCodes(state){
    return state.hoverCodes;
  },
  getAnimationCodes(state){
    return state.animationCodes;
  },
  getIsAlive(state){
    return state.isAlive;
  }
};

const mutations = {
  changeToolType(state,type) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.toolType = type;
  },
  changeTagInfo(state,tag) {
    state.tagInfo = tag;
  },
  changeTagText(state,text) {
    state.tagText = text;
  },
  changeInputType(state,type){
    state.inputType = type;
  },
  changeOperateHead(state,head){
    state.operate_head = head;
  },
  changeStandardList(state,list){
    state.standardList = list;
  },
  changePseudoClass(state,list){
    state.pseudoClass = list;
  },
  changePercentList(state,list){
    state.percentList = list;
  },
  changeActiveHead(state,head){
    state.activeHead = head;
  },
  changeOperation(state,operation){
    state.operation = operation;
  },
  changeCodes(state,codes){
    state.codes = codes;
  },
  changeHoverCodes(state,codes){
    state.hoverCodes = codes;
  },
  changeAnimationCodes(state,codes){
    state.animationCodes = codes;
  },
  changeIsAlive(state,is){
    state.isAlive = is;
  },


};

const actions = {
  changeToolType(context,type) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('changeToolType',type);
  },
  changeTagInfo(context,tag){
    context.commit('changeTagInfo',tag)
  },
  changeTagText(context,text){
    context.commit('changeTagText',text)
  },
  changeInputType(context,type='text'){
    context.commit('changeInputType',type)
  },
  changeOperateHead(context, head) {
    context.commit('changeOperateHead',head)
  },
  changeStandardList(context,list){
    context.commit('changeStandardList',list);
  },
  changePseudoClass(context,list){
    context.commit('changePseudoClass',list);
  },
  changePercentList(context,list){
    context.commit('changePercentList',list)
  },
  changeActiveHead(context,head){
    context.commit('changeActiveHead',head)
  },
  changeOperation(context, operation) {
    context.commit('changeOperation',operation)
  },
  changeCodes(context,codes){
    context.commit('changeCodes',codes)
  },
  changeHoverCodes(context,codes){
    context.commit('changeHoverCodes',codes)
  },
  changeAnimationCodes(context,codes){
    context.commit('changeAnimationCodes',codes)
  },
  changeIsAlive(context, is) {
    context.commit('changeIsAlive',is)
  },


};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
export default store;


