<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <AclOp></AclOp>
      </el-col>
      <el-col :span="12">
        <ClassiferOp></ClassiferOp>
      </el-col>
      <!--<el-col :span="8">-->
        <!--<Test></Test>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
import AclOp from './acl-op'
import ClassiferOp from './classifer-op'
// import Test from './test'

export default {
  name: 'classifer',
  components: {
    AclOp,
    ClassiferOp
    // Test
  }
}
</script>

<style lang="scss" scoped>
  .grid-content {
    background-color: red;
  }
</style>
