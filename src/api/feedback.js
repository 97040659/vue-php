import {request} from "../utils/request";
export function getList(data) {
  return request({
    url: '/api/feedback/getList',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/api/feedback/getInfo',
    method: 'post',
    data
  })
}