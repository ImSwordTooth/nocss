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
  activeHead:'standard',                    //当前使用的操作类型
  codes:`.nocss {\n\tcolor: #000000;\n\tfont-size: 12px;\n}`,        //代码
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
  getActiveHead(state){
    return state.activeHead;
  },
  getCodes(state){
    return state.codes;
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
  changeActiveHead(state,head){
    state.activeHead = head;
  },
  changeOperation(state,operation){
    state.operation = operation;
  },
  changeCodes(state,codes){
    state.codes = codes;
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
  changeActiveHead(context,head){
    context.commit('changeActiveHead',head)
  },
  changeOperation(context, operation) {
    context.commit('changeOperation',operation)
  },
  changeCodes(context,codes){
    context.commit('changeCodes',codes)
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


