import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  state: {
    roles: [], // 登录信息
    token: getToken(), // token信息
    avatar: '', // 头像
    name: '', // 用户名
  },
  actions: {
    /**
     * 获取用户信息
     */
    GetInfo({ commit, state }) {
      // 返回一个promise
      return new Promise(( resolve, reject ) => {
        // 发送获取用户信息请求
        getInfo().then(response => {
          const data = response.data;
          // 验证返回的roles是否是一个非空数组
          if (data.roles &&　data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {  
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_NAME', data.username);
          commit('SET_AVATAR', data.icon);
          resolve(response);
        }).catch(e => {
          reject(e);
        })
      })
    },
    /**
     * 登录
     */
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          const tokenStr = data.tokenHead + data.token
          // 在cookei中设置token
          setToken(tokenStr);
          commit('SET_TOKEN', tokenStr);
          resolve();
        }).catch(e => {
          reject(e);
        })
      })
    }
  },
  mutations: {
    // 将token存入vuex中
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    // 存储用户信息
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    // 存储用户名
    SET_ROLES: (state, name) => {
      state.name = name;
    },
    // 存储用户头像?
    SET_ROLES: (state, avatar) => {
      state.avatar = avatar;
    }
  }
}