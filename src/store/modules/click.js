/*
 * @Descripttion:商品浏览模块
 */

export default {
  state: {
    click: []
  },
  getters: {
    getClick(state) {
      return state.click
    }
  },
  mutations: {
    setClick(state, payload) {
      for (let i = 0; i < state.click.length; i++) {
        const temp = state.click[i]
        if (payload.GoodsId==temp.GoodsId) {
          return state.click[i].Click=payload.Click
        }
      }
      state.click.push(payload)
    }
  },
  actions: {
    setClick({ commit }, payload) {
      commit('setClick', payload)
    }
  }
}