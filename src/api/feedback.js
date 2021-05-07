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
export function saveFeedback(data) {
  return request({
    url: '/api/feedback/saveFeedback',
    method: 'post',
    data
  })
}
export function dealFeedback(data) {
  return request({
    url: '/api/feedback/dealFeedback',
    method: 'post',
    data
  })
}