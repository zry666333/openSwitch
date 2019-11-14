<template>
  <div ref="node" :style="flowNodeContainer" @mouseenter="showDelete" @mouseleave="hideDelete" @mouseup="changeNodeSite">
    <el-tooltip class="item" effect="dark"  placement="right">
      <div id="div" slot="content" v-html="tooltipContent"></div>
      <div>
        <!--<span :class="node.ico" style="font-size: 40px;"></span>-->
        <img :src="require('../../../assets/images/' + node.ico)" style="width:30px;height: 30px;" />
    <!--<div class="flow-node-header" >-->
      <!--<i :class="nodeClass"></i><span>{{node.name}}</span>-->
      <!--&lt;!&ndash;<div v-show="mouseEnter" style="position:absolute;top:0px;right:0px;line-height:25px">&ndash;&gt;-->
        <!--&lt;!&ndash;<a @click="editNode"><img src="../../../assets/edit.png"></a>&nbsp;&ndash;&gt;-->
        <!--&lt;!&ndash;<a @click="deleteNode"><img src="../../../assets/delete.png"></a>&nbsp;&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <!--<div class="flow-node-body">-->
      <!--service_id:{{node.service_id}}-->
    <!--</div>-->
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'flow-node',
  data () {
    return {
      tooltipContent: '',
      mouseEnter: false
    }
  },
  props: {
    node: Object
  },
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get () {
        return {
          position: 'absolute',
          // width: '200px',
          top: this.node.top,
          left: this.node.left,
          backgroundColor: 'transparent',
          boxShadow: this.mouseEnter ? '#66a6e0 0px 0px 12px 0px' : ''
        }
      }
    },
    nodeClass: {
      get () {
        var nodeclass = {}
        nodeclass[this.node.ico] = true
        // nodeclass['flow-node-drag'] = true
        return nodeclass
      }
    }
  },
  methods: {
    showDelete () {
      this.tooltipContent = ''
      for (let i in this.node) {
        this.tooltipContent += `${i}:${this.node[i]}<br/>`
      }
      this.mouseEnter = true
    },
    hideDelete () {
      this.mouseEnter = false
    },
    // 鼠标移动后抬起
    changeNodeSite () {
      if (this.node.left === this.$refs.node.style.left && this.node.top === this.$refs.node.style.top) {
        return
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top
      })
    },
    editNode () {
      this.$emit('editNode', this.node.id)
    },
    deleteNode () {
      this.$emit('deleteNode', this.node.id)
    }
  }
}
</script>

<style scoped>
  .flow-node-body{
    background-color:white;
    text-align: center;
    cursor:pointer;
    height:25px;
    line-height:25px;
    border-bottom-left-radius:6px;
    border-bottom-right-radius:6px;
  }
  .flow-node-header{
    background-color: #66a6e0;
    height:25px;
    cursor:pointer;
    border-top-left-radius:6px;
    border-top-right-radius:6px;
  }
</style>
