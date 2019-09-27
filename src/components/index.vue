<template>
  <el-container style="height: 600px; border: 1px solid #eee">
    <Aside :option="this.option"/>
    <Content/>
  </el-container>
</template>

<script>
import Aside from './aside'
import Content from './content'
export default {
  name: 'index',
  components: {
    Aside,
    Content
  },
  data () {
    return {
      option: [{
        index: '1',
        icon: 'el-icon-message',
        name: 'sf'
      }, {
        index: '2',
        icon: 'el-icon-menu',
        name: 'sfc'
      }, {
        index: '3',
        icon: 'el-icon-setting',
        name: 'rsp'
      }, {
        index: '4',
        icon: 'el-icon-menu',
        name: 'classifer'
      }]
    }
  }
}
</script>

<style scoped>

</style>
