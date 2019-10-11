<template>
  <div class="main">
    <h2 class="title">路由配置</h2>
    <el-row>
      <div class="common_block">
        <el-form :model="form"  ref="form" :rules="rule">
          <el-form-item label="dst_ip" :label-width="formLabelWidth" prop="dst_ip">
            <el-input v-model="form.dst_ip" autocomplete="false" placeholder="例：10.0.0.1" @keyup.native="form.src_ip=form.src_ip.replace(/[^0-9\.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="to_service_Id" :label-width="formLabelWidth" prop="to_service_Id">
            <el-input v-model.number="form.to_service_Id" autocomplete="false" placeholder="输入1至32整数"></el-input>
          </el-form-item>
          <el-form-item class="newBtn">
            <el-button type="primary" @click="newRouteOp('form')">创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <el-row class="card">
      <div class="card-header">
        <strong>已添加的路由配置</strong>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="dst_ip"
          label="dst_ip"
          width="180">
        </el-table-column>
        <el-table-column
          prop="to_service_Id"
          label="to_service_Id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'routeOption',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      tableData: [],
      rule: {
        dst_ip: [
          {required: true, message: '请输入dst_ip', trigger: 'blur'}
          // { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ],
        to_service_Id: [
          {required: true, message: '请输入to_service_Id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    newRouteOp (formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          let res = await this.$Http.newRouteOp(this.form, true)
          if (res.Result === 'success') {
            this.$message({
              message: res.Message,
              type: 'success'
            })
            this.tableData.push(this.form)
          } else if (res.Result === 'false') {
            this.$message({
              message: res.Message,
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    deleteData (index, row) {
      this.$alertMsgBox().then(async () => {
        let res = await this.$Http.deleteRouteOP(row, true)
        if (res.Result === 'success') {
          this.$message({
            message: res.Message,
            type: 'success'
          })
          this.tableData.splice(index, 1)
        } else if (res.Result === 'false') {
          this.$message({
            message: res.Message,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title{
    text-align: center;
    margin-top: 20px;
    margin-bottom:20px;
  }
</style>
