import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  state: {
    roles: [], // 登录信息
    token: '', // token信息
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
          const tokenStr = data.tokenHead + data.tokenHead
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
    }
  }
}