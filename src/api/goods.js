import {request} from "@/utils/request";
export function getGoods(data) {
  return request({
    url: '/api/Goods/getGoods',
    method: 'post',
    data
  })
}export function getList(data) {
  return request({
    url: '/api/Goods/getList',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/api/Goods/getInfo',
    method: 'post',
    data
  })
}
export function getCarousels(data) {
  return request({
    url: '/api/Goods/getCarousels',
    method: 'post',
    data
  })
}
export function saveGoods(data) {
  return request({
    url: '/api/Goods/saveGoods',
    method: 'post',
    data
  })
}
export function updateClick(data) {
  return request({
    url: '/api/Goods/updateClick',
    method: 'post',
    data
  })
}
export function deleteGoods(data) {
  return request({
    url: '/api/Goods/deleteGoods',
    method: 'post',
    data
  })
}