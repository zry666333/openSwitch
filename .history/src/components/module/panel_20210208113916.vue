<template>
  <div id="panelClass">
    <div  class="header">
      <PanelTitle />
        <span class="generate" @click="generate()"><img src='../../assets/images/generate.svg'>生成</span>
    </div>
    <div class="moveArea">
          <div id="flowContainer" class="container" ref="flowContainer">
            <template v-for="node in data.nodeList" >
              <FlowNode @click.native="handleClick(node)" :id="node.id" :title="node.name" :datatype="node.service_id" v-show="node.show" :key="node.id" :node="node" @changeNodeSite="changeNodeSite"></FlowNode>
            </template>
          </div>
    </div>
    <FlowInfo v-if="flowInfoVisable" ref="flowInfo" :data="data"></FlowInfo>
    <FlowNodeForm v-if="nodeFormVisible" ref="nodeForm"></FlowNodeForm>
  </div>
</template>

<script>
import PanelTitle from './panel/PanelTitle'
import FlowTool from './flow/flow-tool'
import FlowNode from './flow/flow-node'
import {jsPlumb} from 'jsplumb'
import {getData} from './flow/data_A.js'
import FlowInfo from './flow/flow-info'
import FlowNodeForm from './flow/flow-node-form'
import { typeOf } from '../../utils/assist'

export default {
  name: 'panel',
  data () {
    return {
      modal: false,
      nodeFormVisible: false,
      flowInfoVisable: false,
      jsPlumb: null,
      index: 1,
      number: 1,
      data: {},
      // 默认设置参数
      jsplumbSetting: {
        // 动态锚点 位置自适应
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
        Container: 'flowContainer',
        // 连线的样式 StateMachine Flowchart
        Connector: 'Flowchart',
        // 鼠标不能拖动删除线
        ConnectionDetachable: false,
        // 删除线的时候节不能删除
        DeleteEndpointsOnDetach: false,
        // 连线的端点
        // Endpoint: ["Dot", {radius: 5}],
        Endpoint: ['Rectangle', {height: 10, width: 10}],
        // 线端点的样式
        EndpointStyle: {fill: 'rgba(255,255,255,0)', outlineWidth: 1},
        LogEnabled: true, // 是否打开jsPlumb的内部日志记录
        // 绘制线
        PaintStyle: {stroke: 'rgba(52,181,183)', strokeWidth: 3},
        // 绘制箭头
        Overlays: [['Arrow', {width: 12, length: 12, location: 1}]],
        RenderMode: 'svg'
      },
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点 提供了4个方向 Continuous AutoDefault
        anchor: 'Continuous'
      },
      jsplumbSourceOptions: {
        filter: '.flow-node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      },
      jsplumbTargetOptions: {
        filter: '.flow-node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      }
    }
  },
  components: {
    PanelTitle,
    FlowTool,
    FlowNode,
    FlowInfo,
    FlowNodeForm
  },
  methods: {
    handleClick (node) {
      console.log('node:', node)
    },
    jsPlumbInit () {
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘
        this.jsPlumb.setSuspendDrawing(false, true)
        // 初始化节点
        this.loadEasyFlow()
      })
    },
    // 加载流程图
    loadEasyFlow () {
      // 初始化节点
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
        // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
        this.jsPlumb.draggable(node.id, {
          containment: 'parent'
        })
      }
      // 初始化连线
      for (var j = 0; j < this.data.lineList.length; j++) {
        let line = this.data.lineList[j]
        this.jsPlumb.connect({
          source: line.from,
          target: line.to
        }, this.jsplumbConnectOptions)
      }
    },
    // 改变节点位置
    changeNodeSite (data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        if (node.id === data.nodeId) {
          node.left = data.left
          node.top = data.top
        }
      }
      this.jsPlumb.repaintEverything()
    },
    hasLine (from, to) {
      for (var i = 0; i < this.data.lineList.length; i++) {
        let line = this.data.lineList[i]
        if (line.from === from && line.to === to) {
          return true
        }
      }
      return false
    },
    async linkFireWallAndBridge (data) {
      let res
      res = await this.$Http.newFireWall(data, true)
      if (res.Result === 'success') {
        this.$message({
          message: res.Message,
          type: 'success'
        })
      } else if (res.Result === 'false') {
        this.$message({
          message: res.Message,
          type: 'error'
        })
      }
    },
    async getNetwork () {
      const res = await this.$Http.readNf()
      return res
    },
    async getRouteOp () {
      let res = await this.$Http.getRouteOp()
      return res
    },
    classifyNode (data, str) {
      if (data instanceof Array) {
        return data.filter(item => {
          return item.name === str
        })
      }
    },
    async initData () {
      // 路由器节点
      let routeNode = []
      // 防火墙节点
      let fireWallNode = []
      // 网桥节点
      let bridgeNode = []
      // AES加密节点
      let aescodeNode = []
      // AES解密节点
      let aesdecodeNode = []
      // 初始路由器高度
      let routeTop = 100
      // 初始AES加密高度
      let aescodeTop = 100
      // 初始AES解密高度
      let aesdecodeTop = 400
      // 初始防火墙高度
      let fireWallTop = 200
      // 初始网桥高度
      let bridgeTop = 200
      // 路由器连接防火墙/网桥/aes加密/aes解密
      let linkRoute = []
      // 网桥连接防火墙/AES加密/AES解密
      let linkBridge = []
      // 读取初始化数据
      let defaultData = {}
      // 读取网络功能节点
      let data = []
      const result = await this.getNetwork()
      if (result !== undefined) data = JSON.parse(JSON.stringify(result))
      data.forEach(item => {
        if (item.name === '路由器') {
          item['ico'] = 'luyouqi.svg'
        } else if (item.name === '防火墙') {
          item['ico'] = 'fanghuoqiang.svg'
        } else if (item.name === '网桥') {
          item['ico'] = 'wangqiao.svg'
        } else if (item.name === 'AES加密') {
          item['ico'] = 'jiami.svg'
        } else if (item.name === 'AES解密') {
          item['ico'] = 'jiemi.svg'
        }
      })
      routeNode = this.classifyNode(data, '路由器')
      fireWallNode = this.classifyNode(data, '防火墙')
      bridgeNode = this.classifyNode(data, '网桥')
      aescodeNode = this.classifyNode(data, 'AES加密')
      aesdecodeNode = this.classifyNode(data, 'AES解密')
      routeNode.forEach((item) => {
        item.left = '430px'
        item.top = routeTop + 'px'
        item.show = true
        item.id = item.service_id + ''
        this.number++
        routeTop += 150
      })
      fireWallNode.forEach((item) => {
        item.left = '840px'
        item.top = fireWallTop + 'px'
        item.show = true
        item.id = item.service_id + ''
        this.number++
        fireWallTop += 150
      })
      aesdecodeNode.forEach((item) => {
        item.left = '840px'
        item.top = aesdecodeTop + 'px'
        item.show = true
        item.id = item.service_id + ''
        this.number++
        aesdecodeTop += 150
      })
      aescodeNode.forEach((item) => {
        item.left = '840px'
        item.top = aescodeTop + 'px'
        item.show = true
        item.id = item.service_id + ''
        this.number++
        aescodeTop += 150
      })
      bridgeNode.forEach((item) => {
        item.left = '1200px'
        item.top = bridgeTop + 'px'
        item.show = true
        item.id = item.service_id + ''
        this.number++
        bridgeTop += 150
      })
      const res = await this.getRouteOp()
      for (let i = 0; i < routeNode.length; i++) {
        for (let j = 0; j < res.length; j++) {
          linkRoute.push({
            from: routeNode[i].service_id + '',
            to: res[j].to_service_Id + ''
          })
        }
      }
      linkBridge = this.link(data, data)
      for (let j = 0; j < bridgeNode.length; j++) {
        if (bridgeNode[j].name === '网桥') {
          linkBridge.push({
            from: bridgeNode[j].service_id + '',
            to: '0'
          })
        }
      }
      defaultData = JSON.parse(JSON.stringify(getData()))
      defaultData.nodeList = [...defaultData.nodeList, ...data]
      defaultData.lineList = [...linkRoute, ...linkBridge]
      this.data = defaultData
      this.$nextTick(() => {
        this.jsPlumbInit()
      })
    },
    link (list1, list2) {
      let arr = []
      if (list1 instanceof Array && list2 instanceof Array) {
        for (let i = 0; i < list1.length; i++) {
          if (list1[i].service_id === 1 + '') {
            arr.push({
              from: '-1',
              to: list1[i].service_id + ''
            })
          }
          for (let j = 0; j < list2.length; j++) {
            if (list1[i].nexthop_id === list2[j].service_id) {
              arr.push({
                from: list1[i].service_id + '',
                to: list2[j].service_id + ''
              })
            }
          }
        }
      }
      return arr
    },
    generate () {
      if (typeOf(this.jsPlumb) !== 'null') {
        let connections = this.jsPlumb.getAllConnections()
        while (connections.length !== 0) {
          this.jsPlumb.deleteConnection(connections[0])
        }
      }
      this.jsPlumb = jsPlumb.getInstance()
      this.$nextTick(() => {
        this.initData()
      })
    }
  },
  mounted () {
    this.generate()
  },
  destroyed () {
    this.jsPlumb = null
  }
}
</script>

<style lang="scss" scoped>
  #panelClass {
    width: 100%;
    height:100%;
    position:relative;
    .header {
      position:relative;
      background: rgba(8,74,100,0.45);;
      .generate {
        position:absolute;
        font-size:12px;
        color:#50E3C2 ;
        top:0;
        right:30px;
        cursor:pointer;
      }
      width: 100%;
      height:58px;
      padding-left:20px;
      box-sizing: border-box;
      line-height: 58px;
      font-size: 16px;
      color: #42E3E1;
      letter-spacing: 0;
    }
    .moveArea {
      position:absolute;
      top:58px;
      bottom:0;
      width:100%;
    }
    #flowContainer{
      width:100%;
      height:100%;
      position: relative;
    }
  }
</style>
