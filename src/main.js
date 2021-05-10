import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/utils/index'
import '@/assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import {JSEncrypt} from "jsencrypt";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1, // 加载图片数量
  listenEvents: [
    'scroll',
    'wheel',
    'mousewheel',
    'resize',
    'animationend',
    'transitionend',
    'touchmove'
  ]
})

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
