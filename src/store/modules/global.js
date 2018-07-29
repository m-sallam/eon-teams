const state = {
  ready: false,
  globalLoading: false
}

const getters = {

}

const mutations = {
  setReady (state) {
    state.ready = true
  },
  enableGlobalLoading (state) {
    state.globalLoading = true
  },
  disableGlobalLoading (state) {
    state.globalLoading = false
  }
}

const actions = {
  setReady ({commit}) {
    commit('setReady')
  },
  enableGlobalLoading ({commit}) {
    commit('enableGlobalLoading')
  },
  disableGlobalLoading ({commit}) {
    commit('disableGlobalLoading')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
