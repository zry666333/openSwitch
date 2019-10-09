<template>
  <div class="networkClass">
    <el-row :gutter="10">
      <el-col :span="10"><NetworkFunction></NetworkFunction></el-col>
      <el-col :span="7"><RouteOption></RouteOption></el-col>
      <el-col :span="7"><FireWall></FireWall></el-col>
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
