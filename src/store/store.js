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
  receiveSfData (state, data) {
    state.sfTableData = data.tableData
  },
  receiveSfcData (state, data) {
    state.sfcTableData = data.tableData
  },
  receiveRspData (state, data) {
    state.rspTableData = data.tableData
  },
  receiveClassiferData (state, data) {
    state.classiferTableData = data.tableData
  },
  receiveTableData (state, data) {
    state.tableData.push(data.tableData)
    console.log('-tableData-', state.tableData)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
