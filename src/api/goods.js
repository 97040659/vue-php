import {request} from "@/utils/request";
export function getGoods(data) {
  return request({
    url: '/api/Goods/getGoods',
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
export function saveGood(data) {
  return request({
    url: '/api/Goods/saveGood',
    method: 'post',
    data
  })
}
export function updateGood(data) {
  return request({
    url: '/api/Goods/updateGood',
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
export function deleteGood(data) {
  return request({
    url: '/api/Goods/deleteGood',
    method: 'post',
    data
  })
}