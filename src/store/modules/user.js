import {req} from '../request'

const state = {
  user: false,
  token: false
}

const getters = {
  isAuthenticated (state) {
    return state.token !== false
  }
}

const mutations = {
  updateUser (state, user) {
    state.user = user
    window.localStorage.setItem('user', JSON.stringify(user))
  },
  updateToken (state, token) {
    state.token = token
    let date = Date.now() + (7 * 24 * 60 * 60 * 1000)
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('expiresIn', date)
  },
  logout (state) {
    window.location = '/'
    state.user = false
    state.token = false
    window.localStorage.clear()
  }
}

const actions = {
  async register ({commit}, registerForm) {
    let res = await req('/register', 'POST', JSON.stringify(registerForm), false)
    if (res.status) {
      commit('updateToken', res.json.token)
      commit('updateUser', res.json.user)
    }
    return res
  },
  async login ({commit}, loginForm) {
    let res = await req('/login', 'POST', JSON.stringify(loginForm), false)
    if (res.status) {
      commit('updateToken', res.json.token)
      commit('updateUser', res.json.user)
    }
    return res
  },
  async logout ({commit}) {
    commit('logout')
    return {status: true}
  },
  async autoLogin ({commit}) {
    let response = {status: false, message: ''}

    let token = window.localStorage.getItem('token')
    let expiresIn = window.localStorage.getItem('expiresIn')
    if (!token || !expiresIn) return response

    let date = Date.now()
    if (expiresIn <= date) return commit('logout')

    let res = await req('/token/refresh', 'POST', JSON.stringify({token}), false)
    if (res.status) {
      commit('updateToken', res.json.token)
      let user = window.localStorage.getItem('user')
      commit('updateUser', JSON.parse(user))
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
