import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import project from './modules/project'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    project,
    global
  }
})
