<template>
  <div>
    <h5>默认颜色</h5>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo">
      <draggable v-model="list" @end="addNode" @choose="move">
        <el-menu-item :index="item.index"  v-for="item in list" :key="item.index">
          <!--<i :class="item.ico"></i>-->
          <span :class="item.ico"></span>
          <span>{{item.name}}</span>
          <span>&nbsp;service_id:{{item.service_id}}</span>
        </el-menu-item>
      </draggable>
    </el-menu>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
var mousePosition = {
  left: -1,
  top: -1
}

export default {
  name: 'aside-menu',
  components: {
    draggable
  },
  data () {
    return {
      nodeMenu: {}
      // list: [
      //   {
      //   index: '-1',
      //   ico: 'el-icon-user-solid',
      //   name: '入端口',
      //   service_id: '-1'
      // }, {
      //   index: '1',
      //   ico: 'el-icon-location',
      //   name: '路由器',
      //   service_id: ''
      // }, {
      //   index: '2',
      //   ico: 'el-icon-menu',
      //   name: '防火墙',
      //   service_id: ''
      // }, {
      //   index: '3',
      //   ico: 'el-icon-document',
      //   name: '桥',
      //   service_id: ''
      // }, {
      //   index: '0',
      //   ico: 'el-icon-goods',
      //   name: '出端口',
      //   service_id: '0'
      // }
      // ]
    }
  },
  computed: {
    list: {
      get () {
        return this.$store.state.tableData
      },
      set (data) {}
    }
  },
  methods: {
    // 根据类型获取左侧菜单对象
    getMenu (type) {
      for (var i = 0; i < this.list.length; i++) {
        let son = this.list[i]
        if (son.ico === type) {
          return son
        }
      }
    },
    // 添加节点
    addNode (evt, e) {
      this.$emit('addNode', evt, this.nodeMenu, mousePosition)
    },
    move (evt) {
      var child = evt.item.children[0]
      this.nodeMenu = this.getMenu(child.className)
    }
  }
}
</script>

<style scoped>

</style>
