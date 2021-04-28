import axios from 'axios'
import * as Loading from "./loading";
import {Message} from "element-ui";
export function request(config) {
  // 1.创建axios的实例
  // axios.create返回的是一个函数，当用小括号调用时，返回的是一个Promise
  const instance = axios.create({
    baseURL: 'http://www.phpdemo.com',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json;'
    },
  })

  // 2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    //拦截成功后需要用return返回config
    //往请求头header里添加token
    config.headers.token=window.sessionStorage.getItem('token')
    Loading.showFullScreenLoading()
    setTimeout(()=>{
      Loading.tryHideFullScreenLoading()
      Message.error("请求超时!");
      }, 10000);
    // console.log(config.headers)
    return config
  }, err => {
    console.log(err);
  })

  //2.2响应拦截
  instance.interceptors.response.use(res => {
    //关闭loading加载
    Loading.tryHideFullScreenLoading()
    //拦截后需要将res返回，如果不需要vue自动添加的东西，可以只返回data
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}