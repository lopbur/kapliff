import AuthService from '@/services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))
const _isAdmin = user
  ? Array.from(user.roles).some(v => v === 'ROLE_ADMIN')
  : false
const initialState = user
  ? { status: { loggedIn: true }, user, isAdmin: _isAdmin }
  : { status: { loggedIn: false }, user: null, isAdmin: _isAdmin }

export default {
  namespaced: true,
  state: {
    ...initialState,
    accountUi: false
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(response => {
        if (response.data.success) {
          const flag = Array.from(response.data.user.roles).some(
            v => v === 'ROLE_ADMIN'
          )
          commit('isAdmin', flag)

          commit('loginSuccess', response.data.user)
          return Promise.resolve(response.data)
        } else {
          commit('loginFailure')
          return Promise.reject(response.data)
        }
      })
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register({ commit }, user) {
      return AuthService.register(user).then(response => {
        if (response.data.success) {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        } else {
          commit('registerFailure')
          return Promise.reject(response.data)
        }
      })
    },
    handleUi({ commit }, flag) {
      commit('accountUi', flag)
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
      state.isAdmin = false
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    },
    isAdmin(state, val) {
      state.isAdmin = val
    },
    accountUi(state, flag) {
      state.accountUi = flag
    }
  }
}
