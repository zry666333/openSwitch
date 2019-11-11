import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: '',
  // 初始化talbe数据
  tableData: []
}

const getters = {
  getUser (state) {
    let userInfo = state.userInfo || window.localStorage.getItem('user')
    return userInfo
  }
}

const mutations = {
  login (state, v) {
    window.localStorage.setItem('user', v)
    state.userInfo = v
  },
  receiveTableData (state, data) {
    state.tableData.push(data.tableData)
  },
  removeTableData (state, data) {
    state.tableData = state.tableData.filter(function (item) {
      return item.service_id !== data.tableData.service_id
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
