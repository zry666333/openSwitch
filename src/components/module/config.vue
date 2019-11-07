<template>
    <div>
      <el-row :gutter="20">
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

<style lang="scss" scoped>

</style>
