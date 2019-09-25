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
        value: 'SF'
      }, {
        index: '2',
        icon: 'el-icon-menu',
        value: 'SFC'
      }, {
        index: '3',
        icon: 'el-icon-setting',
        value: 'RSP'
      }, {
        index: '4',
        icon: 'el-icon-menu',
        value: 'Classifer'
      }]
    }
  }
}
</script>

<style scoped>

</style>
