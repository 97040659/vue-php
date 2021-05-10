/*
 * @Descripttion:用户登录状态模块
 */

export default {
  state: {
    buyer: {} // 登录的用户
  },
  getters: {
    getBuyer(state) {
      return state.buyer
    },
    getUserId(state) {
      return state.buyer.UserId
    },
    getUserImg(state) {
      return state.buyer.HeadImg
    },
  },
  mutations: {
    setBuyer(state, data) {
      state.buyer = data
    }
  },
  actions: {
    setBuyer({ commit }, data) {
      commit('setBuyer', data)
      // console.log(data)
    }
  }
}