<template>
  <div class="common_block">
    <h4>桥</h4>
    <div class="demo-image">
      <div class="block">
        <el-image
          style="width: 80px; height: 80px"
          :src="url3"
        ></el-image>
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
      url3: require('../../../assets/bridge.png'),
      brigdeForm: {
        name: '网桥',
        ico: 'el-icon-document'
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
          if (!isRepeat(copy, this.tableData, 'service_id')) {
            this.$store.commit('receiveTableData', {tableData: copy})
          //   let res
          //   res = await this.$Http.newBridge(copy, true)
          //   if (res.Result === 'success') {
          //     this.$message({
          //       message: res.Message,
          //       type: 'success'
          //     })
          //     this.tableData.push(copy)
          //     this.$refs[formname].resetFields()
          //   } else if (res.Result === 'false') {
          //     this.$message({
          //       message: res.Message,
          //       type: 'error'
          //     })
          //   }
          // } else {
          //   this.$message({
          //     message: 'service_id已存在',
          //     type: 'warning'
          //   })
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
