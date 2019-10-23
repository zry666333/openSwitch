var dataA = {
  name: '流程A',
  nodeList: [
    {
      id: 'node-enter',
      name: '入端口',
      left: '26px',
      top: '250px',
      ico: 'iconfont icon-rukou',
      service_id: '-1',
      show: true
    },
    {
      id: 'node-exit',
      name: '出端口',
      left: '1400px',
      top: '250px',
      ico: 'iconfont icon-chukou',
      service_id: '0',
      show: true
    }
  ],
  lineList: []
}
// const _this = this
export function getData () {
  // console.log('-vue-', _this)
  // data = this.$store.state.tableData
  return dataA
}
