/*
 * @Descripttion:商家登录状态模块
 */

export default {
  state: {
    business: {} // 登录的用户
  },
  getters: {
    getBusiness(state) {
      return state.business
    }
  },
  mutations: {
    setBusiness(state, data) {
      state.business = data
    }
  },
  actions: {
    setBusiness({ commit }, data) {
      commit('setBusiness', data)
      console.log(data)
    }
  }
}