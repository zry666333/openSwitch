var dataA = {
  name: '流程A',
  nodeList: [
    {
      id: 'node-enter',
      name: '入端口',
      left: '26px',
      top: '250px',
      ico: 'el-icon-user-solid',
      service_id: '-1',
      show: true
    },
    {
      id: 'node-exit',
      name: '出端口',
      left: '1400px',
      top: '250px',
      ico: 'el-icon-goods',
      service_id: '0',
      show: true
    }
  ],
  lineList: []
}

export function getData () {
  return dataA
}
