<template>
    <div>
      <el-col :span="8">
        <el-collapse-item  title="路由器"  name="1">
          <Route></Route>
        </el-collapse-item>
      </el-col>
      <el-col :span="8">
        <el-collapse-item   title="防火墙" name="2">
          <FireWall></FireWall>
        </el-collapse-item>
      </el-col>
      <el-col :span="8">
        <el-collapse-item  title="网桥" name="3">
          <Bridge></Bridge>
        </el-collapse-item>
      </el-col>
    </div>
</template>

<script>
import Route from './network/route'
import FireWall from './network/fireWall'
import Bridge from './network/bridge'

export default {
  name: 'network',
  components: {
    Route,
    FireWall,
    Bridge
  }
}
</script>

<style scoped>

</style>
