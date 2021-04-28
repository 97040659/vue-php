import {request} from "../utils/request";
export function getList(data) {
  return request({
    url: '/api/Address/getList',
    method: 'post',
    data
  })
}
export function deleteAddress(data) {
  return request({
    url: '/api/Address/deleteAddress',
    method: 'post',
    data
  })
}
export function save(data) {
  return request({
    url: '/api/Address/save',
    method: 'post',
    data
  })
}
