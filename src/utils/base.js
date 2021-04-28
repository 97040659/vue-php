import { Loading, Message, MessageBox, Notification } from 'element-ui'
const base = (Vue, opts = {}) => {
  Vue.prototype.$baseMessage = (message, type) => {
    Message({
      offset: 60,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: 1000
    })
  }
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
}
export default base