import { resetRouter } from '@/router'

const state = {
  name: '',
  number: '',
  loginName: '',
  phone: '',
  email: '',
  authorities: [],
  menus: undefined
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_NUMBER: (state, number) => {
    state.number = number
  },
  SET_LOGINNAME: (state, loginName) => {
    state.loginName = loginName
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_AUTHORITIES: (state, authorities) => {
    state.authorities = authorities
  },
  SET_MENU: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', '')
      commit('SET_NUMBER', '')
      commit('SET_LOGINNAME', '')
      commit('SET_PHONE', '')
      commit('SET_EMAIL', '')
      commit('SET_AUTHORITIES', [])
      commit('SET_MENU', undefined)
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

