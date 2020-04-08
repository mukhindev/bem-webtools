import Vue from 'vue'
import Vuex from 'vuex'
import html from './modules/html'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    html
  }
})
