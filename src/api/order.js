import {request} from "../utils/request";
export function getList(data) {
  return request({
    url: '/api/Order/getList',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/api/Order/getInfo',
    method: 'post',
    data
  })
}
export function saveOrder(data) {
  return request({
    url: '/api/Order/saveOrder',
    method: 'post',
    data
  })
}
//取消订单，等待处理
export function cancelOrder(data) {
  return request({
    url: '/api/Order/cancelOrder',
    method: 'post',
    data
  })
}
export function deleteOrder(data) {
  return request({
    url: '/api/Order/deleteOrder',
    method: 'post',
    data
  })
}
export function updateOrder(data) {
  return request({
    url: '/api/Order/updateOrder',
    method: 'post',
    data
  })
}