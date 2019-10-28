<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <AclOp></AclOp>
      </el-col>
      <el-col :span="12">
        <ClassiferOp></ClassiferOp>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AclOp from './classifer/acl-op'
import ClassiferOp from './classifer/classifer-op'

export default {
  name: 'classifer',
  components: {
    AclOp,
    ClassiferOp
  }
}
</script>

<style lang="scss" scoped>
  .grid-content {
    background-color: red;
  }
</style>
