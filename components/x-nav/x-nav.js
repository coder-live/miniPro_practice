// components/x-nav/x-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    navList: [
      '流行',
      '热门',
      '推荐'
    ],
    currentIdx: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(ev) {
      // console.log(ev);
      //更改当前鼠标点击位置序号
      let currentIdx = ev.target.dataset.index;
      this.setData({
        currentIdx
      });
      //给父级传值
      this.triggerEvent('handelNavclick', {currentIdx}, {});
    }
  }
})
