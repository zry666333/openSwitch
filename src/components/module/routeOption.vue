<template>
  <div class="main">
    <h2 class="title">路由配置</h2>
    <div class="common_block">
      <el-form :model="form"  ref="form" :rules="rule">
        <el-form-item label="dst_ip" :label-width="formLabelWidth" prop="dst_ip">
          <el-input v-model.number="form.dst_ip" autocomplete="false" placeholder="输入1至32整数"></el-input>
        </el-form-item>
        <el-form-item label="to_service_Id" :label-width="formLabelWidth" prop="to_service_Id">
          <el-input v-model.number="form.to_service_Id" autocomplete="false" placeholder="输入1至32整数"></el-input>
        </el-form-item>
        <el-form-item class="newBtn">
          <el-button type="primary" @click="newRouteOp('form')">创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <h2 class="subtitle">已添加的路由配置</h2>
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
          {required: true, message: '请输入dst_ip', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
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
      let res
      this.$refs[formname].validate(async valid => {
        if (valid) {
          this.tableData.push({
            dst_ip: this.form.dst_ip,
            to_service_Id: this.form.to_service_Id
          })
          res = await this.$Http.newRouteOp({
            dst_ip: this.form.dst_ip,
            to_service_Id: this.form.to_service_Id
          })
        } else {
          return false
        }
      })
      console.log(res)
    },
    deleteData (index, row) {
      let res
      this.$alertMsgBox().then(async () => {
        this.tableData.splice(index, 1)
        res = await this.$Http.deleteRouteOP(row)
      })
      console.log(res)
    }
  }
}
</script>

<style>

</style>
