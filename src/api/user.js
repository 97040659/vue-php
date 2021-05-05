import {request} from "../utils/request";
export function getInfo(data) {
  return request({
    url: '/api/Login/getInfo',
    method: 'post',
    data
  })
}
export function Login(data) {
  return request({
    url: '/api/Login/login',
    method: 'post',
    data
  })
}
export function Register(data) {
  return request({
    url: '/api/Login/register',
    method: 'post',
    data
  })
}
export function Update(data) {
  return request({
    url: '/api/Login/updatePassword',
    method: 'post',
    data
  })
}
export function Logout(data) {
  return request({
    url: '/api/Login/logout',
    method: 'post',
    data
  })
}
// import axios from 'axios'
//
// const getInfo = () =>
//   axios.get('http://www.phpdemo.com/api/Login/login').then(res => res.data)
// export{
//   getInfo
// }