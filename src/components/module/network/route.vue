<template>
  <div class="common_block">
    <!--<h4>路由器</h4>-->
    <div class="demo-image">
      <div class="block">
        <!--<el-image-->
          <!--style="width: 80px; height: 80px"-->
          <!--:src="url1"-->
        <!--&gt;</el-image>-->
        <span class="iconfont icon-luyouqi" style="font-size: 80px;"></span>
      </div>
    </div>
    <el-form :model="routeForm" ref="routeForm" :rules="rule1">
      <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id">
        <el-input type="number" v-model.number="routeForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="dst_ip" :label-width="formLabelWidth" prop="dst_ip">
        <el-input type="number" v-model.number="routeForm.dst_ip" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="to_service_id" :label-width="formLabelWidth" prop="to_service_id">
        <el-input type="number" v-model.number="routeForm.to_service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item class="newBtn">
        <el-button type="primary" @click="newRouteOp('routeForm')">创建</el-button>
        <div style="margin-bottom: 20px;"></div>
        <el-button type="primary" @click="newNetworkFun('routeForm')">下发</el-button>
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
      // 临时数据，模仿后台获得的路由配置文件
      temp: [],
      url1: require('../../../assets/route.png'),
      routeForm: {
        name: '路由器',
        ico: 'iconfont icon-luyouqi'
      },
      formLabelWidth: '80px',
      tableData: [],
      rule1: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 创建路由器配置
    newRouteOp (formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          this.temp.push(JSON.parse(JSON.stringify(this.routeForm)))
          let res = await this.$Http.newRouteOp(this.routeForm, true)
          if (res.Result === 'success') {
            this.$message({
              message: res.Message,
              type: 'success'
            })
          } else if (res.Result === 'false') {
            this.$message({
              message: res.Message,
              type: 'error'
            })
          }
          this.$refs.routeForm.resetFields()
        } else {
          return false
        }
      })
    },
    // 启动路由器
    async newNetworkFun (formname) {
      let copy
      // 数据深拷贝
      copy = JSON.parse(JSON.stringify(this.$refs[formname].model))
      const list = this.getRouteOp()
      copy.list = list
      // copy.list = this.temp
      console.log('==temp==', this.temp)
      console.log('==list==', this.list)
      if (!isRepeat(copy, this.tableData, 'service_id')) {
        let res = await this.$Http.newNetWork(this.routeForm, true)
        if (res.Result === 'success') {
          this.$message({
            message: res.Message,
            type: 'success'
          })
          this.$store.commit('receiveTableData', {tableData: copy})
        } else if (res.Result === 'false') {
          this.$message({
            message: res.Message,
            type: 'error'
          })
        }
        this.$refs.routeForm.resetFields()
      } else {
        this.$message({
          message: 'service_id已存在',
          type: 'warning'
        })
      }
    },
    // 获取路由配置
    async getRouteOp () {
      let res = await this.$Http.getRouteOp()
      if (res.Result === 'success') {
        console.log('获取路由配置成功')
      } else if (res.Result === 'false') {
        console.log('获取路由配置失败')
      }
      return res
    }
  }
}
</script>

<style scoped>

</style>
