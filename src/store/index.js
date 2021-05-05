import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/buyer'
import business from './modules/business'
import cart from './modules/cart'
import click from "./modules/click";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    business,
    cart,
    click
  }
})
