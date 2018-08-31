import {req} from '../request'

const state = {
  projects: [],
  currentProject: {},
  chat: [],
  newMessages: false
}

const getters = {

}

const mutations = {
  updateProjects (state, projects) {
    state.projects = projects
  },
  updateCurrentProject (state, project) {
    state.currentProject = project
  },
  addMessage (state, {message, route}) {
    state.chat.push(message)
    state.newMessages = !route.path.includes('chat')
  },
  updateChat (state, chat) {
    state.chat = chat
  },
  clearNewMessages (state) {
    state.newMessages = false
  }
}

const actions = {
  async getProjects ({commit, state, rootState}) {
    let res = await req('/projects', 'GET', undefined, rootState.user.token)
    if (res.status) {
      commit('updateProjects', res.json.projects)
    }
    return res
  },
  async newProject ({commit, state, rootState}, project) {
    let res = await req('/projects', 'POST', JSON.stringify(project), rootState.user.token)
    return res
  },
  async getProject ({commit, state, rootState}, id) {
    let res = await req('/projects/' + id, 'GET', undefined, rootState.user.token)
    if (res.status) {
      commit('updateCurrentProject', res.json.project)
    }
    return res
  },
  async updateProfile ({commit, state, rootState}, {src, ext}) {
    let res = await req('/profile', 'PUT', JSON.stringify({user: rootState.user.user, src, ext}), rootState.user.token)
    if (res.status) {
      commit('updateUser', res.json.user)
      return {status: true}
    }
    return res
  },
  async addMember ({commit, state, rootState}, username) {
    let res = await req(`/projects/${state.currentProject._id}/members`, 'POST', JSON.stringify({username}), rootState.user.token)
    return res
  },
  async removeMember ({commit, state, rootState}, username) {
    let res = await req(`/projects/${state.currentProject._id}/members?action=remove`, 'DELETE', JSON.stringify({username}), rootState.user.token)
    return res
  },
  async leaveProject ({commit, state, rootState}) {
    let res = await req(`/projects/${state.currentProject._id}/members?action=leave`, 'DELETE', undefined, rootState.user.token)
    return res
  },
  async deleteProject ({commit, state, rootState}) {
    let res = await req(`/projects/${state.currentProject._id}`, 'DELETE', undefined, rootState.user.token)
    return res
  },
  async addList ({commit, state, rootState}, title) {
    let res = await req(`/projects/${state.currentProject._id}/lists`, 'POST', JSON.stringify(title), rootState.user.token)
    return res
  },
  async deleteList ({commit, state, rootState}, listId) {
    let res = await req(`/projects/${state.currentProject._id}/lists/${listId}`, 'DELETE', undefined, rootState.user.token)
    return res
  },
  async addTask ({commit, state, rootState}, {task, listId}) {
    let res = await req(`/projects/${state.currentProject._id}/lists/${listId}/tasks`, 'POST', JSON.stringify(task), rootState.user.token)
    return res
  },
  async deleteTask ({commit, state, rootState}, {listId, taskId}) {
    let res = await req(`/projects/${state.currentProject._id}/lists/${listId}/tasks/${taskId}`, 'DELETE', undefined, rootState.user.token)
    return res
  },
  async markTask ({commit, state, rootState}, {listId, task}) {
    let res = await req(`/projects/${state.currentProject._id}/lists/${listId}/tasks/${task._id}/mark`, 'POST', JSON.stringify({task}), rootState.user.token)
    return res
  },
  async addMessageToChat ({commit, state, rootState}, {message, route}) {
    commit('addMessage', {message, route})
  },
  async getChat ({commit, state, rootState}) {
    let res = await req(`/projects/${state.currentProject._id}/chat`, 'GET', undefined, rootState.user.token)
    commit('updateChat', res.json.chat)
    return res
  },
  async noNewMessages ({commit, state, rootState}) {
    commit('clearNewMessages')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
