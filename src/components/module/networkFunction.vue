<template>
  <div class="main">
    <h2 class="title" >网络功能配置</h2>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="common_block">
          <h4>路由器</h4>
          <el-form :model="routeForm" ref="routeForm" :rules="rule1">
            <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id">
              <el-input type="number" v-model.number="routeForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
            </el-form-item>
            <el-form-item class="newBtn">
              <el-button type="primary" @click="newNetworkFun('routeForm')">创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="common_block">
          <h4>防火墙</h4>
          <el-form :model="fireWallForm"  ref="fireWallForm" :rules="rule2">
            <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id">
              <el-input v-model.number="fireWallForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
            </el-form-item>
            <el-form-item label="nexthop_id" :label-width="formLabelWidth" prop="nexthop_id">
              <el-input v-model.number="fireWallForm.nexthop_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
            </el-form-item>
            <el-form-item class="newBtn">
              <el-button type="primary" @click="newNetworkFun('fireWallForm')">创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="common_block">
          <h4>桥</h4>
          <el-form :model="brigdeForm" ref="brigdeForm" :rules="rule3">
            <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id">
              <el-input v-model.number="brigdeForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
            </el-form-item>
            <el-form-item  class="newBtn">
              <el-button type="primary" @click="newNetworkFun('brigdeForm')">创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <h2 class="subtitle">已创建网络功能</h2>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="state"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="service_id"
        label="service_id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nexthop_id"
        label="nexthop_id"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteData">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'networkFunction',
  data () {
    return {
      routeForm: {state: '路由器'},
      fireWallForm: {state: '防火墙'},
      brigdeForm: {state: '路由器'},
      formLabelWidth: '80px',
      tableData: [],
      rule1: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      },
      rule2: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ],
        nexthop_id: [
          {required: true, message: '请输入nexthop_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      },
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
      this.$refs[formname].validate(valid => {
        if (valid) {
          const copy = JSON.parse(JSON.stringify(this.$refs[formname].model))
          this.tableData.push(copy)
          this.$refs[formname].resetFields()
        } else {
          return false
        }
      })
    },
    deleteData (index) {
      this.$alertMsgBox().then(() => {
        this.tableData.splice(index, 1)
      })
    }
  }
}
</script>

<style>

</style>

<style lang="scss">
  .main{
    background:#ccc;
    border: 0.8px solid gray;
    padding:10px;
    .common_block{
      height:300px;
      padding:6px 20px 6px 6px;
      text-align: center;
      position:relative;
      h4{
        text-align:center;
        padding:15px 0;
      }
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .title{
    text-align: center;
    margin-top: 20px;
    margin-bottom:20px;
  }
  .subtitle{
    margin-top:30px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .newBtn{
    position: absolute;
    bottom: 0px;
    left: 50%;
    right: 50%;
    margin-left: -35px;
  }
</style>
