import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/buyer/layout/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/register'),
  },
  {
    path: '/buyer',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        name: 'Buyer',
        component: () => import('@/views/buyer/index'),
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/buyer/test'),
      },
    ],
  },
  {
    path: '/business',
    name: 'Business',
    redirect: '',
    component: () => import('@/views/business/index'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/business/Home'),
      },
      {
        path: '/update',
        name: 'Update',
        component: () => import('@/views/business/update'),
      },
      {
        path: '/delete',
        name: 'Delete',
        component: () => import('@/views/business/delete'),
      },
      {
        path: '/address',
        name: 'Address',
        component: () => import('@/views/business/address/index'),
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  if(to.path==='/'){
    next('/login')
  }
  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }
  const token = window.sessionStorage.getItem('token')
  if (!token || token == '' || token == null || token == undefined) {
    next('/login')
    return
  }
  next()
})
/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
