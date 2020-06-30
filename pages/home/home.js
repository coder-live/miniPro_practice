// pages/home/home.js
import {getSwiper, postProduct} from '../../network/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    productList: [],
    allProduct: {
      types: ['pop', 'hot', 'recommend'],
      currentType: 'pop',
      products: {
        pop: {skip: 0, limit: 2, list: []},
        hot: {skip: 0, limit: 2, list: []},
        recommend: {skip: 0, limit: 2, list: []}
      }
    },
    //滚动
    topPosition: 0,
    istoTop: false
  },
  //自定义事件 --> 导航点击后产生的类别
  typeClick(ev) {
    let idx = ev.detail.currentIdx
    //改变现有的商品类别 根据序号
    this.data.allProduct.currentType = this.data.allProduct.types[idx];
    // console.log(this.data.allProduct.currentType)
    this.getProduct(this.data.allProduct.currentType, false);
    this.setData({
      topPosition: 250
    })
  },
  handleScroll(ev) {
    console.log(ev.detail.scrollTop)
  },
  loadMore() {
    // 页面滚动底部
    console.log(66)
    this.getProduct(this.data.allProduct.currentType);
  },
  //-------------------网络请求---------------------------------------
  //请求轮播图
  getSwiper() {
    getSwiper().then(res => {
      // console.log(res.code);
      if(res.code === 0) {
        this.setData({
          swiperList : res.data[0].swiper
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  //请求主要商品信息
  getProduct(currentType, isUpdate = true) {
    //获取当前选中的商品类型
    let allProduct = this.data.allProduct;
    //获取当前的商品
    let product = allProduct.products[currentType];
    // console.log(product)
    let type = currentType;
    let skip = product.skip;
    let limit = product.limit;
    //再对原数组中的skip 进行叠加
    // console.log(isUpdate)
    product.skip = isUpdate ? skip + limit : 0;
    let option = {type, skip, limit};

    // console.log(option)
    postProduct(option).then(res => {
      // console.log(res);
      if(res.code === 0) {
        let list = product.list;
        isUpdate ? list.push(...res.data) : list = res.data;
        // console.log(list,res.data);
        this.setData({
          productList : list
        })
      }
    }).catch(err => {
      console.log(err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSwiper();
    // console.log(this)
    this.getProduct(this.data.allProduct.currentType, true);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})