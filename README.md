# nocss
### BUG
1. 代码区动画节点顺序可能不正确，如：一开始是0%、100%，新增一个50%，会跑到100%的后面
2. 添加多个盒子阴影时，用list的话，只能设置一次颜色。但是不用list的话，由于全局的点击外部隐藏选择框方法，多个选择框会冲突，导致一个都显示不出来。同理还有text-shadow等存在多个值且有颜色选择器的属性
3. transition属性没有transition-delay
4. 有种直觉，这个bug改不了。设置为固定宽度可以解决，但是固定宽度显然不行，因此失彼

 

### 待修改

1. ~submit()删除某个css键值对的正则~
2. 小看了text-decoration，其功能远不止如此
3. input内值为空时对应值应该置为0
4. 部分.vue代码没有格式化处理，因为代码需要修改，如box-shadow、text-shadow、outline等
5. 添加动画节点时的错误反馈，如已添加，不符合规范的文本等（要禁止粘贴事件吗？）
6. 现在重置只能重置基本，不能重置伪类和动画
7. 有“已选择”的下拉框在动画中还没实装
给表单组件中的checkbox和radio添加样式，暂时没有研究range，如果麻烦的话直接放弃
8.	如果用户选择checkbox ，就在input后面添加一个i元素，展示区
9.	i元素的样式可以根据vuex中的数据来变化，所以要添加新的code，vue.prototype.submit也要添加新的case，这个是代码区，可以实现
10.	:checked也可以加，再加一个code呗，但是如何监听checkbox已经被check，并且将:checked中的样式放到i里
11. 变形，删除子项时，删到只剩一个的时候，会留下`transform`:，如果用户此时不进行操作的话，这个显然错误的代码会一直留着。


 
### 新点子

1. letter-spacing属性
2. border-radius属性
3. 单位可选，px、em等
4. border-image
5. 动画节点处添加吸顶锚点
