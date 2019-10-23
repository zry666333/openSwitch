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

export function getData () {
  return dataA
}
