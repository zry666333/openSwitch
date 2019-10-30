<template>
  <div class="common_block">
    <!--<h4>网桥</h4>-->
    <div class="demo-image">
      <div class="block">
        <span class="iconfont icon-qiao" style="font-size: 80px"></span>
      </div>
    </div>
    <el-form :model="brigdeForm" ref="brigdeForm" :rules="rule3">
      <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id">
        <el-input v-model.number="brigdeForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item  class="newBtn">
        <el-button type="primary" @click="newNetworkFun('brigdeForm')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {isRepeat} from '../../../utils/validate'

export default {
  name: 'bridge',
  data () {
    return {
      brigdeForm: {
        name: '网桥',
        ico: 'iconfont icon-qiao'
      },
      formLabelWidth: '80px',
      tableData: [],
      rule3: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    newNetworkFun (formname) {
      let copy
      this.$refs[formname].validate(async valid => {
        // 数据校验
        if (valid) {
          // 数据深拷贝
          copy = JSON.parse(JSON.stringify(this.$refs[formname].model))
          if (!isRepeat(copy, this.$store.state.tableData, 'service_id')) {
            let res = await this.$Http.newBridge(copy, true)
            if (res.Result === 'success') {
              this.$message({
                message: res.Message,
                type: 'success'
              })
              this.$emit('newData5', '5')
              this.$store.commit('receiveTableData', {tableData: copy})
              this.$refs[formname].resetFields()
            } else if (res.Result === 'false') {
              this.$message({
                message: res.Message,
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: 'service_id已存在',
              type: 'warning'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
