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
    },
  },
  mutations: {
    setClick(state, payload) {
      payload.Click++
      for (let i = 0; i < state.click.length; i++) {
        const temp = state.click[i]
        if (payload.GoodsId==temp.GoodsId) {
          console.log(state.click[i])
          return state.click[i].Click++
        }
      }
      state.click.push(payload)
      console.log(state.click)
    },
    getClickById(state,GoodsId) {
      for (let i = 0; i < state.click.length; i++) {
        const temp = state.click[i]
        if (GoodsId===temp.GoodsId) {
          console.log(temp)
          return temp.Click
        }
      }
    }
  },
  actions: {
    setClick({ commit }, payload) {
      commit('setClick', payload)
    },
    async getClickById({ commit }, GoodsId) {
      commit('getClickById', GoodsId)
    }
  }
}