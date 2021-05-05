/*
 * @Descripttion:购物车状态模块
 */

export default {
  state: {
    shoppingCart: [],
    check:[]
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
        totalNum += temp.num
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
          totalNum += temp.num
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
          totalPrice += temp.discount_price * temp.num
        }
      }
      return totalPrice
    }
  },
  mutations: {
    setShoppingCart(state, data) {
      // 设置购物车状态
      state.shoppingCart = data
    },
    setChecked(state,data){
      state.check.push(data)
    },
    addShoppingCart(state, data) {
      // 添加购物车
      // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (data.GoodsId==temp.GoodsId) {
          if(temp.Num<temp.MaxNum){
            return state.shoppingCart[i].Num++
          }else {
            return '该商品数量已经达到上限'
          }
        }
      }
      state.shoppingCart.push(data)
    },
    updateShoppingCart(state, payload) {
      // 更新购物车
      // 可更新商品数量和是否勾选
      // 用于购物车点击勾选及加减商品数量
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (payload.Id==temp.Id) {
          state.shoppingCart[i].Num=payload.Num
        }
      }
    },
    deleteShoppingCart(state, id) {
      // 根据购物车id删除购物车商品
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i]
        if (temp.product_id == id) {
          state.shoppingCart.splice(i, 1)
        }
      }
    },
    checkAll(state, data) {
      // 点击全选按钮，更改每个商品的勾选状态
      for (let i = 0; i < state.shoppingCart.length; i++) {
        state.shoppingCart[i].check = data
      }
    }
  },
  actions: {
    setShoppingCart({ commit }, data) {
      commit('setShoppingCart', data)
    },
    addShoppingCart({ commit }, data) {
      commit('addShoppingCart', data)
    },
    updateShoppingCart({ commit }, payload) {
      commit('updateShoppingCart', payload)
    },
    deleteShoppingCart({ commit }, id) {
      commit('deleteShoppingCart', id)
    },
    checkAll({ commit }, data) {
      commit('checkAll', data)
    }
  }
}