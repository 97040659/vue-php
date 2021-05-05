import {request} from "../utils/request";
export function getCategory() {
  return request({
    url: '/api/Category/getCategory',
    method: 'post',
  })
}
export function saveCategory(data) {
  return request({
    url: '/api/Category/saveCategory',
    method: 'post',
    data
  })
}
export function updateCategory(data) {
  return request({
    url: '/api/Category/updateCategory',
    method: 'post',
    data
  })
}
export function deleteCategory(data) {
  return request({
    url: '/api/Category/deleteCategory',
    method: 'post',
    data
  })
}