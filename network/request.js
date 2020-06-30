import {baseUrl, timeout} from "./config";

function request(option) {
  function loading() {
    wx.showLoading({
      title: '加载中ing !',
    });
  }
  function loadingEnd() {
    wx.hideLoading();
  }
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + option.url,
      timeout,
      data: option.data,
      method: option.method || 'GET',
      success(res) {
        loadingEnd();
        resolve(res.data);
      },
      fail: reject
    });
  })
};

export default request;