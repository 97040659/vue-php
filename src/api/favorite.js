import {request} from "../utils/request";
export function getList(data) {
  return request({
    url: '/api/favorite/getList',
    method: 'post',
    data
  })
}
export function isFavorite(data) {
  return request({
    url: '/api/favorite/isFavorite',
    method: 'post',
    data
  })
}
export function favoriteCount(data) {
  return request({
    url: '/api/favorite/favoriteCount',
    method: 'post',
    data
  })
}
export function saveFavorite(data) {
  return request({
    url: '/api/favorite/saveFavorite',
    method: 'post',
    data
  })
}
export function deleteFavorite(data) {
  return request({
    url: '/api/favorite/deleteFavorite',
    method: 'post',
    data
  })
}