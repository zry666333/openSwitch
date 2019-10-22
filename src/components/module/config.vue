<template>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <RouteOption></RouteOption>
        </el-col>
        <el-col :span="12">
          <FireWall></FireWall>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import RouteOption from './config/routeOption'
import FireWall from './config/fireWallOption'

export default {
  name: 'config',
  components: {
    RouteOption,
    FireWall
  }
}
</script>

<style scoped>

</style>
