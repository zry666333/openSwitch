<template>
  <div class="common_block">
    <!--<h4>防火墙</h4>-->
    <div class="demo-image">
      <div class="block">
        <span class="iconfont icon-jiemi" style="font-size: 80px;"></span>
      </div>
    </div>
    <el-form :model="decodeForm"  ref="decodeForm" :rules="rule2">
      <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id" class="input">
        <el-input v-model.number="decodeForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="nexthop_id" :label-width="formLabelWidth" prop="nexthop_id" class="input">
        <el-input v-model.number="decodeForm.nexthop_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item class="newBtn">
        <el-button type="primary" @click="newNetworkFun('decodeForm')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {isRepeat} from '../../../utils/validate'

export default {
  name: 'aesDecode',
  data () {
    return {
      decodeForm: {
        name: 'AES解密',
        ico: 'iconfont icon-jiemi'
      },
      formLabelWidth: '80px',
      rule2: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ],
        nexthop_id: [
          {required: true, message: '请输入nexthop_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
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
            let res = await this.$Http.aesDecrypt(copy, true)
            if (res.Result === 'success') {
              this.$message({
                message: res.Message,
                type: 'success'
              })
              this.$emit('newData4', '4')
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
