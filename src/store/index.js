import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

// eslint-disable-next-line camelcase
const Token_Key = 'TouTiao_User'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(localStorage.getItem(Token_Key))
    user: getItem(Token_Key)
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      // 为了防止刷新丢失，我们需要把数据放到本地存储中
      // localStorage.setItem(Token_Key, JSON.stringify(state.user))
      setItem(Token_Key, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
