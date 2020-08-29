import request from './request';

//请求轮播图
export function getMultiData() {
  return request({
    url: '/home/getMultiData'
  })
} 
// export function getSwiper() {
//   return request({url: '/home/getSwiper'});
// }
//请求产品信息
export function postProduct(data) {
  return request({url: '/home/postProduct', data, method: 'POST'});
}