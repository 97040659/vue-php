import {request} from "../utils/request";
export function getList(data) {
  return request({
    url: '/api/appraise/getList',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/api/appraise/getInfo',
    method: 'post',
    data
  })
}
export function saveAppraise(data) {
  return request({
    url: '/api/appraise/saveAppraise',
    method: 'post',
    data
  })
}
export function giveLike(data) {
  return request({
    url: '/api/appraise/giveLike',
    method: 'post',
    data
  })
}