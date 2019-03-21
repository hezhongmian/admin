import Cookies from 'js-cookie'

export default {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'), // 判断左侧栏显示方式
      withoutAnimation: false
    }
  },
  actions: {
    // 切换左侧栏的方式
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    }
  },
  mutations: {
    // 切换左侧栏的方式
    TOGGLE_SIDEBAR(state) {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);        
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  }
}