import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    MUT_loading: (state, payload) => {
      state.loading = payload.loading
    }
  },
  modules: modules.default
})

export default store
