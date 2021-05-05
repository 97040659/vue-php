import {request} from "../utils/request";
export function getCart(data) {
  return request({
    url: '/api/Cart/getCart',
    method: 'post',
    data
  })
}
export function saveCart(data) {
  return request({
    url: '/api/Cart/saveCart',
    method: 'post',
    data
  })
}
export function deleteCart(data) {
  return request({
    url: '/api/Cart/deleteCart',
    method: 'post',
    data
  })
}