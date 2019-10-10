const NETWORK_API = {
  // 新建路由器
  newNetWork: {
    method: 'post',
    url: '/nf_router'
  },
  // 新建防火墙
  newFireWall: {
    method: 'post',
    url: '/firewall'
  },
  // 新建桥
  newBridge: {
    method: 'post',
    url: '/bridge'
  },
  // 网络功能删除接口
  deleteNf: {
    method: 'post',
    url: '/del_nf'
  },
  // 新建路由配置
  newRouteOp: {
    method: 'post',
    url: '/nf_router_conf'
  },
  // 删除路由配置
  deleteRouteOP: {
    method: 'post',
    url: '/del_nf_router_conf'
  },
  // 新建防火墙配置
  newFireWallOp: {
    method: 'post',
    url: 'firewall_conf'
  },
  // 删除防火墙配置
  deleteFireWallOp: {
    method: 'post',
    url: '/del_firewall_conf'
  }
}
export default NETWORK_API
