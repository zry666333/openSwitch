<template>
  <div>
    <el-row  ref="panel">
      <!--<el-col :span="3" ref="flowTool">-->
        <!--<FlowTool @addNode="addNode"></FlowTool>-->
      <!--</el-col>-->
      <el-col :span="24">
        <!--<el-row>-->
          <!--<div>-->
            <!--<el-button type="primary" @click="dataInfo">流程信息</el-button>-->
            <!--<el-button type="primary" @click="changeLabel">设置线条</el-button>-->
          <!--</div>-->
        <!--</el-row>-->
        <el-row ref="flowContainer">
          <div id="flowContainer" class="container" ref="flowContainer">
            <template v-for="node in data.nodeList" >
              <FlowNode :id="node.id" :title="node.name" :datatype="node.service_id" v-show="node.show" :key="node.id" :node="node" @changeNodeSite="changeNodeSite" @editNode="editNode"></FlowNode>
            </template>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <FlowInfo v-if="flowInfoVisable" ref="flowInfo" :data="data"></FlowInfo>
    <FlowNodeForm v-if="nodeFormVisible" ref="nodeForm"></FlowNodeForm>
  </div>
</template>

<script>
import FlowTool from './flow/flow-tool'
import FlowNode from './flow/flow-node'
import {jsPlumb} from 'jsplumb'
import {getData} from './flow/data_A.js'
import FlowInfo from './flow/flow-info'
import FlowNodeForm from './flow/flow-node-form'

export default {
  name: 'panel',
  data () {
    return {
      nodeFormVisible: false,
      flowInfoVisable: false,
      jsPlumb: null,
      index: 1,
      number: 1,
      // 是否加载完毕
      loadEasyFlowFinish: false,
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
        PaintStyle: {stroke: 'black', strokeWidth: 3},
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
    FlowTool,
    FlowNode,
    FlowInfo,
    FlowNodeForm
  },
  methods: {
    jsPlumbInit () {
      const _this = this
      this.jsPlumb.ready(function () {
        // 导入默认配置
        _this.jsPlumb.importDefaults(_this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘
        _this.jsPlumb.setSuspendDrawing(false, true)
        // 初始化节点
        _this.loadEasyFlow()
        // 当点击了连接线
        // _this.jsPlumb.bind('click', function (conn, originalEvent) {
        //   _this.$confirm('确定删除所点击的连接线吗？', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     _this.jsPlumb.deleteConnection(conn)
        //   }).catch(() => {
        //   })
        // })
        // 连线
        // _this.jsPlumb.bind('connection', async function (evt) {
        //   let fromId = evt.source.id
        //   let toId = evt.target.id
        //   const from = evt.source.innerText.split(/\n/g)
        //   const to = evt.target.innerText.split(/\n/g)
        //   if (evt.source.title === '防火墙' && evt.target.title === '网桥') {
        //     // 格式化请求参数
        //     const data = {
        //       service_id: from[1].split(':')[1],
        //       nexthop_id: to[1].split(':')[1]
        //     }
        //     let res = await _this.$Http.newFireWall(data, true)
        //     if (res.Result === 'success') {
        //       if (_this.loadEasyFlowFinish) {
        //         _this.data.lineList.push({
        //           from: fromId,
        //           to: toId
        //         })
        //       }
        //       this.$message({
        //         message: res.Message,
        //         type: 'success'
        //       })
        //     } else if (res.Result === 'false') {
        //       this.$message({
        //         message: res.Message,
        //         type: 'error'
        //       })
        //     }
        //   } else if (evt.source.title === '网桥' && evt.target.title === '出端口') {
        //     // 格式化请求参数
        //     const data = {
        //       service_id: from[1].split(':')[1]
        //     }
        //     let res = await _this.$Http.newBridge(data, true)
        //     if (res.Result === 'success') {
        //       if (_this.loadEasyFlowFinish) {
        //         _this.data.lineList.push({
        //           from: fromId,
        //           to: toId
        //         })
        //       }
        //       this.$message({
        //         message: res.Message,
        //         type: 'success'
        //       })
        //     } else if (res.Result === 'false') {
        //       this.$message({
        //         message: res.Message,
        //         type: 'error'
        //       })
        //     }
        //   }
        // })
        // _this.jsPlumb.bind('beforeDrop', function (evt) {
        //   let from = evt.sourceId
        //   let to = evt.targetId
        //   if (from === to) {
        //     _this.$message.error('不能连接自己')
        //     return false
        //   }
        //   if (_this.hasLine(from, to)) {
        //     _this.$message.error('不能重复连线')
        //     return false
        //   }
        //   return true
        // })
        // 删除连线
        // _this.jsPlumb.bind('connectionDetached', function (evt) {
        //   _this.deleteLine(evt.sourceId, evt.targetId)
        // })
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
      this.$nextTick(function () {
        this.loadEasyFlowFinish = true
      })
    },
    // addNode (evt, nodeMenu, mousePosition) {
    //   let width = this.$refs.flowTool.$el.clientWidth
    //   if (evt.originalEvent.layerX > width) {
    //     const index = this.index++
    //     let nodeId = 'node' + index
    //     var left = mousePosition.left
    //     var top = mousePosition.top
    //     if (mousePosition.left < 0) {
    //       left = evt.originalEvent.layerX - width
    //     }
    //     if (mousePosition.top < 0) {
    //       let network = document.getElementById('network')
    //       top = evt.originalEvent.pageY - network.scrollHeight - 50 - 61 - 40 - 11 - 44 - 20 - 60
    //     }
    //     var node
    //     if (nodeMenu.name === '网桥') {
    //       node = {
    //         id: 'node' + index,
    //         name: nodeMenu.name,
    //         service_id: nodeMenu.service_id,
    //         left: left + 'px',
    //         top: top + 'px',
    //         ico: nodeMenu.ico,
    //         show: true
    //       }
    //       this.data.nodeList.push(node)
    //     } else if (nodeMenu.name === '防火墙') {
    //       node = {
    //         id: 'node' + index,
    //         name: nodeMenu.name,
    //         service_id: nodeMenu.service_id,
    //         rule_name: nodeMenu.rule_name,
    //         depth: nodeMenu.depth,
    //         src_ip: nodeMenu.src_ip,
    //         action: nodeMenu.action,
    //         left: left + 'px',
    //         top: top + 'px',
    //         ico: nodeMenu.ico,
    //         show: true
    //       }
    //       this.data.nodeList.push(node)
    //     } else if (nodeMenu.name === '路由器') {
    //       node = {
    //         id: 'node' + index,
    //         name: nodeMenu.name,
    //         service_id: nodeMenu.service_id,
    //         left: left + 'px',
    //         top: top + 'px',
    //         ico: nodeMenu.ico,
    //         show: true,
    //         list: nodeMenu.list
    //       }
    //       this.data.nodeList.push(node)
    //       this.$nextTick(() => {
    //         for (var i = 0; i < this.data.nodeList.length; i++) {
    //           let item = this.data.nodeList[i]
    //           for (var j = 0; j < node.list.length; j++) {
    //             if (node.list[j].to_service_id === item.service_id) {
    //               this.jsPlumb.connect({
    //                 source: node.id,
    //                 target: this.data.nodeList[i].id
    //               })
    //             }
    //           }
    //         }
    //       })
    //     }
    //     this.$nextTick(function () {
    //       this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)
    //       this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
    //       this.jsPlumb.draggable(nodeId, {
    //         containment: 'parent'
    //       })
    //     })
    //   }
    //   this.$store.commit('removeTableData', {tableData: node})
    // },
    // 改变节点位置
    changeNodeSite (data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        if (node.id === data.nodeId) {
          node.left = data.left
          node.top = data.top
        }
      }
    },
    // deleteLine (from, to) {
    //   this.data.lineList = this.data.lineList.filter(function (line) {
    //     return line.from !== from && line.to !== to
    //   })
    // },
    hasLine (from, to) {
      for (var i = 0; i < this.data.lineList.length; i++) {
        let line = this.data.lineList[i]
        if (line.from === from && line.to === to) {
          return true
        }
      }
      return false
    },
    editNode (nodeId) {
      this.nodeFormVisible = true
      this.$nextTick(function () {
        this.$refs.nodeForm.init(this.data, nodeId)
      })
    },
    // deleteNode (nodeId) {
    //   this.$confirm(`确定要删除节点${nodeId}?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.data.nodeList = this.data.nodeList.filter((node) => {
    //       return node.id !== nodeId
    //     })
    //     this.$nextTick(function () {
    //       this.jsPlumb.removeAllEndpoints(nodeId)
    //     })
    //   }).catch()
    //   return true
    // },
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
    dataLoad (data) {
      this.data = data
      this.$nextTick(() => {
        this.jsPlumbInit()
      })
    },
    async getRouteOp () {
      // const res = [{
      //   'dst_ip': '12.0.0.1',
      //   'to_service_Id': '2'
      // }, {
      //   'dst_ip': '30.0.0.1',
      //   'to_service_Id': '2'
      // }, {
      //   'dst_ip': '40.0.0.1',
      //   'to_service_Id': '3'
      // }]
      let res = await this.$Http.getRouteOp()
      return res
    },
    async initData () {
      // 路由器节点
      var routeNode = []
      // 防火墙节点
      var fireWallNode = []
      // 网桥节点
      var bridgeNode = []
      // 初始路由器高度
      var routeTop = 100
      // 初始防火墙高度
      var fireWallTop = 200
      // 初始网桥高度
      var bridgeTop = 200
      // 路由器连接防火墙/网桥
      var linkRoute = []
      // 防火墙连接网桥
      var linkFireWall = []
      // 读取初始化数据
      let defaultData = {}
      // 读取网络功能节点
      var data = JSON.parse(JSON.stringify(this.$store.state.tableData))
      routeNode = data.filter(item => {
        return item.name === '路由器'
      })
      fireWallNode = data.filter(item => {
        return item.name === '防火墙'
      })
      bridgeNode = data.filter(item => {
        return item.name === '网桥'
      })
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
        if (routeNode[i].name === '路由器' && routeNode[i].service_id === 1) {
          linkRoute.push({
            from: '-1',
            to: routeNode[i].service_id + ''
          })
        }
        for (let j = 0; j < res.length; j++) {
          linkRoute.push({
            from: routeNode[i].service_id + '',
            to: res[j].to_service_Id + ''
          })
        }
      }
      for (let i = 0; i < fireWallNode.length; i++) {
        for (let j = 0; j < bridgeNode.length; j++) {
          if (bridgeNode[j].name === '网桥') {
            linkFireWall.push({
              from: bridgeNode[j].service_id + '',
              to: '0'
            })
          }
          if (fireWallNode[i].name === '防火墙' && bridgeNode[j].name === '网桥') {
            if (fireWallNode[i].nexthop_id === bridgeNode[j].service_id) {
              linkFireWall.push({
                from: fireWallNode[i].service_id + '',
                to: bridgeNode[j].service_id + ''
              })
            }
          }
        }
      }
      defaultData = JSON.parse(JSON.stringify(getData()))
      defaultData.nodeList = [...defaultData.nodeList, ...data]
      defaultData.lineList = [...linkRoute, ...linkFireWall]
      this.dataLoad(defaultData)
    }
  },
  mounted () {
    this.jsPlumb = jsPlumb.getInstance()
    this.$nextTick(() => {
      this.initData()
    })
  },
  destroyed () {
    this.jsPlumb = null
  }
}
</script>

<style lang="scss" scoped>
#flowContainer{
  height:500px;
  position: relative;
  background-color:rgb(251,251,251);
}
</style>
