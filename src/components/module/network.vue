<template>
  <div class="networkClass">
    <el-row :gutter="20">
      <el-col :span="8"><NetworkFunction></NetworkFunction></el-col>
      <el-col :span="8"><RouteOption></RouteOption></el-col>
      <el-col :span="8"><FireWall></FireWall></el-col>
    </el-row>
  </div>
</template>

<script>
import NetworkFunction from './networkFunction'
import RouteOption from './routeOption'
import FireWall from './fireWall'

export default {
  name: 'network',
  components: {
    NetworkFunction,
    RouteOption,
    FireWall
  }
}
</script>

<style lang="scss" scoped>
  .grid-content {
    background-color: red;
  }
</style>
