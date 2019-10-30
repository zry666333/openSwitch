<template>
  <div class="common_block">
    <!--<h4>路由器</h4>-->
    <div class="demo-image">
      <div class="block">
        <span class="iconfont icon-luyouqi" style="font-size: 80px;"></span>
      </div>
    </div>
    <el-form :model="routeForm" ref="routeForm" :rules="rule1">
      <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id">
        <el-input type="number" v-model.number="routeForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="dst_ip" :label-width="formLabelWidth" prop="dst_ip" v-if="false">
        <el-input type="number" v-model.number="routeForm.dst_ip" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="to_service_id" :label-width="formLabelWidth" prop="to_service_id" v-if="false">
        <el-input type="number" v-model.number="routeForm.to_service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item class="newBtn">
        <el-button type="primary" @click="newRoute('routeForm')">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {isRepeat} from '../../../utils/validate'

export default {
  name: 'route',
  data () {
    return {
      validateTable: [],
      routeForm: {
        name: '路由器',
        ico: 'iconfont icon-luyouqi'
      },
      formLabelWidth: '80px',
      rule1: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
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
  watch: {
    tableData: {
      handle (newValue, oldValue) {
        this.validateTable = newValue
      },
      deep: true
    }
  },
  methods: {
    // 创建路由器配置
    newRoute (formname) {
      let copy
      this.$refs[formname].validate(async valid => {
        if (valid) {
          // 数据深拷贝
          copy = JSON.parse(JSON.stringify(this.$refs[formname].model))
          if (!isRepeat(copy, this.validateTable, 'service_id')) {
            let res = await this.$Http.newNetWork(this.routeForm, true)
            // let res = await this.$post('/nf_router/', this.routeForm, true)
            if (res.Result === 'success') {
              this.$message({
                message: res.Message,
                type: 'success'
              })
              this.$emit('newData1', '1')
              this.$refs[formname].resetFields()
            } else if (res.Result === 'false') {
              this.$message({
                message: res.Message,
                type: 'error'
              })
            }
            this.$refs[formname].resetFields()
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
