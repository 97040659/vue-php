/*
 * @Descripttion:购物车状态模块
 */

export default {
  state: {
    shoppingCart: [],
  },
  getters: {
    getShoppingCart(state) {
      // 获取购物车状态
      return state.shoppingCart
    },
    getNum(state) {
      // 购物车商品总数量
      let totalNum = 0
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        totalNum += temp.Num
      }
      return totalNum
    },
    getIsAllCheck(state) {
      // 判断是否全选
      let isAllCheck = true
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        // 只要有一个商品没有勾选立即return false;
        if (!temp.check) {
          isAllCheck = false
          return isAllCheck
        }
      }
      return isAllCheck
    },
    getCheckGoods(state) {
      // 获取勾选的商品信息
      // 用于确认订单页面
      let checkGoods = []
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (temp.check) {
          checkGoods.push(temp)
        }
      }
      return checkGoods
    },
    getCheckNum(state) {
      // 获取购物车勾选的商品数量
      let totalNum = 0
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (temp.check) {
          totalNum += temp.Num
        }
      }
      return totalNum
    },
    getTotalPrice(state) {
      // 购物车勾选的商品总价格
      let totalPrice = 0
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (temp.check) {
          totalPrice += temp.Price * temp.Num
        }
      }
      return totalPrice
    }
  },
  mutations: {
    setShoppingCart(state, data) {
      // 设置购物车状态
      data.map(item => {
        item['check'] = false
      })
      state.shoppingCart = data
    },
    addShoppingCart(state, data) {
      // 添加购物车
      // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
      if (state.shoppingCart==[]||state.shoppingCart.length < 1) {
        return state.shoppingCart.push(data)
      }
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (temp.GoodsId === data.GoodsId) {
          if (data.Num < data.MaxNum) {
            state.shoppingCart[i].Num++
            return
          } else {
            this.$baseMessage('该商品数量已经达到上限', 'warning')
            return
          }
        }
      }
      state.shoppingCart.push(data)
      console.log(state.shoppingCart)
    },
    updateShoppingCart(state, payload) {
      // 更新购物车
      // 可更新商品数量和是否勾选
      // 用于购物车点击勾选及加减商品数量
      console.log(payload.key)
      if (payload.prop === 'Num') {
        if (payload.val < state.shoppingCart[payload.key].MaxNum && payload.val > 1) {
          state.shoppingCart[payload.key][payload.prop] = payload.val
          console.log(state.shoppingCart[payload.key])
          return
        }
      }
      if (payload.prop === 'check') {
        state.shoppingCart.forEach((item, i) => {
          let bool=payload.key.some((val, j) => {
            return item.GoodsId === val.GoodsId
          })
          if(bool==true){
            item.check=true
          }else {
            item.check=false
          }
          console.log(item)
        })
        return
      }
    },
    deleteShoppingCart(state, id) {
      // 根据购物车id删除购物车商品
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (temp.GoodsId == id) {
          state.shoppingCart.splice(i, 1)
        }
      }
      console.log(state.shoppingCart)
    },
    checkAll(state, data) {
      // 点击全选按钮，更改每个商品的勾选状态
      for (let i = 0; i < state.shoppingCart.length; i++) {
        state.shoppingCart[i].check = data
      }
    }
  },
  actions: {
    setShoppingCart({commit}, data) {
      commit('setShoppingCart', data)
    },
    addShoppingCart({commit}, data) {
      commit('addShoppingCart', data)
    },
    updateShoppingCart({commit}, payload) {
      commit('updateShoppingCart', payload)
    },
    deleteShoppingCart({commit}, id) {
      commit('deleteShoppingCart', id)
    },
    checkAll({commit}, data) {
      commit('checkAll', data)
    }
  }
}