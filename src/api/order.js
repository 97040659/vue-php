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
export function getCount(data) {
  return request({
    url: '/api/Order/getCount',
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
export function dealOrder(data) {
  return request({
    url: '/api/Order/dealOrder',
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