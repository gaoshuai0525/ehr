import { login, logout, getUserInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { getToken, setToken, removeToken, getInfo, setUserInfo, removeUserInfo } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: '',

    user: '',
    status: '',
    code: '',
    introduction: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token) // 登录成功后将token存储在cookie之中
          setUserInfo(data.data)
          commit('SET_TOKEN', data.token)
          commit('SET_INTRODUCTION', data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          console.log('userInfo',data)
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.data.roles)
          } else {
            reject('getUserInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.data.user)
          commit('SET_INTRODUCTION', data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_INTRODUCTION', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserInfo()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_INTRODUCTION', '')
        removeToken()
        removeUserInfo()
        resolve()
      })
    }
  }
}

export default user
