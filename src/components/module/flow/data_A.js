var dataA = {
  name: '流程A',
  nodeList: [
    {
      id: 'node-enter',
      name: '入端口',
      left: '26px',
      top: '161px',
      ico: 'el-icon-user-solid',
      service_id: '-1',
      show: true
    },
    {
      id: 'node-exit',
      name: '出端口',
      left: '926px',
      top: '161px',
      ico: 'el-icon-goods',
      service_id: '0',
      show: true
    },
    {
      id: 'nodeA',
      name: '路由器',
      left: '426px',
      top: '461px',
      ico: 'el-icon-location',
      service_id: '1',
      show: true
    },
    {
      id: 'nodeB',
      name: '防火墙',
      left: '340px',
      top: '161px',
      ico: 'el-icon-menu',
      service_id: '2',
      show: true
    },
    {
      id: 'nodeC',
      name: '桥',
      left: '639px',
      top: '161px',
      ico: 'el-icon-document',
      service_id: '3',
      show: true
    }
  ],
  lineList: [{
    from: 'nodeA',
    to: 'nodeB'
  }, {
    from: 'nodeB',
    to: 'nodeC'
  }, {
    from: 'node-enter',
    to: 'nodeA'
  }, {
    from: 'nodeC',
    to: 'node-exit'
  }]
}

export function getDataA () {
  return dataA
}
