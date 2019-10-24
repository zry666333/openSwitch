import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 初始化talbe数据
  sfTableData: [],
  sfcTableData: [],
  rspTableData: [],
  classiferTableData: [],
  tableData: []
}

const mutations = {
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
  mutations
})
