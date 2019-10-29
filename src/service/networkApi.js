const NETWORK_API = {
  // 新建路由器
  newNetWork: {
    method: 'post',
    url: '/nf_router/'
  },
  // 新建防火墙
  newFireWall: {
    method: 'post',
    url: '/firewall/'
  },
  // 新建桥
  newBridge: {
    method: 'post',
    url: '/bridge/'
  },
  // 网络功能删除接口
  deleteNf: {
    method: 'post',
    url: '/del_nf/'
  },
  // 获取路由配置
  getRouteOp: {
    method: 'get',
    url: '/read_nf_router_conf/'
  },
  // 新建路由配置
  newRouteOp: {
    method: 'post',
    url: '/nf_router_conf/'
  },
  // 删除路由配置
  deleteRouteOP: {
    method: 'post',
    url: '/del_nf_router_conf/'
  },
  // 新建防火墙配置
  newFireWallOp: {
    method: 'post',
    url: '/firewall_conf/'
  },
  // 删除防火墙配置
  deleteFireWallOp: {
    method: 'post',
    url: '/del_firewall_conf/'
  },
  // 获取防火墙配置
  getFireWallOp: {
    method: 'get',
    url: '/read_firewall_conf'
  },
  // 新建ACL配置
  newAclOp: {
    method: 'post',
    url: '/set_acl/'
  },
  // 删除ACL配置
  deleteAclOp: {
    method: 'post',
    url: '/del_acl/'
  },
  // 新建Classifer配置
  newClassiferOp: {
    method: 'post',
    url: '/set_classifer/'
  },
  // 删除Classifer配置
  deleteClassiferOp: {
    method: 'post',
    url: '/del_classifer/'
  },
  // AES加密创建接口
  aesEncrypt: {
    method: 'post',
    url: '/aes_encrypt/'
  },
  // AES解密创建接口
  aesDecrypt: {
    method: 'post',
    url: '/aes_decrypt/'
  }
}
export default NETWORK_API
