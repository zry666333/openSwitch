var dataA = {
  name: '流程A',
  nodeList: [
    {
      id: '-1',
      name: '入端口',
      left: '26px',
      top: '200px',
      ico: 'rukou.svg',
      service_id: '-1',
      show: true
    },
    {
      id: '0',
      name: '出端口',
      right: '10px',
      top: '200px',
      ico: 'chukou.svg',
      service_id: '0',
      show: true
    }
  ],
  lineList: []
}

export function getData () {
  return dataA
}
