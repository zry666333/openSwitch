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
    console.log('-tableData-', state.tableData)
  },
  removeTableData (state, data) {
    state.tableData = state.tableData.filter(function (item) {
      console.log('item', item)
      console.log('service_id', data.tableData.service_id)
      //
      // this.data.lineList = this.data.lineList.filter(function (line) {
      //   return line.from !== from && line.to !== to
      // })

      return item.service_id !== data.tableData.service_id
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
