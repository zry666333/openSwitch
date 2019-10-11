<template>
  <div class="main">
    <h2 class="title" >网络功能配置</h2>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="common_block">
          <h4>路由器</h4>
          <div class="demo-image">
            <div class="block">
              <el-image
                style="width: 80px; height: 80px"
                :src="url1"
              ></el-image>
            </div>
          </div>
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
          <div class="demo-image">
            <div class="block">
              <el-image
                style="width: 80px; height: 80px"
                :src="url2"
              ></el-image>
            </div>
          </div>
          <el-form :model="fireWallForm"  ref="fireWallForm" :rules="rule2">
            <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id" class="input">
              <el-input v-model.number="fireWallForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
            </el-form-item>
            <el-form-item label="nexthop_id" :label-width="formLabelWidth" prop="nexthop_id" class="input">
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
      </el-col>
    </el-row>
    <el-row class="card">
      <div class="card-header">
        <strong>已创建网络功能</strong>
      </div>
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
            <el-button @click="deleteData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'networkFunction',
  data () {
    return {
      url1: require('../../assets/route.png'),
      url3: require('../../assets/bridge.png'),
      url2: require('../../assets/firewall.png'),
      routeForm: {state: '路由器'},
      fireWallForm: {state: '防火墙'},
      brigdeForm: {state: '网桥'},
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
      let copy
      this.$refs[formname].validate(async valid => {
        // 数据校验
        if (valid) {
          // 数据深拷贝
          copy = JSON.parse(JSON.stringify(this.$refs[formname].model))
          this.tableData.push(copy)
          this.$refs[formname].resetFields()
          console.log('-copy-', copy)
          console.log('-tableData-', this.tableData)
          let res
          if (copy.state === '路由器') {
            res = await this.$Http.newNetWork(copy, true)
          } else if (copy.state === '防火墙') {
            res = await this.$Http.newFireWall(copy, true)
          } else {
            res = await this.$Http.newBridge(copy, true)
          }
          console.log(res)
        } else {
          return false
        }
      })
    },
    deleteData (index, row) {
      let res
      console.log('-row-', row)
      this.$alertMsgBox().then(async () => {
        this.tableData.splice(index, 1)
        res = await this.$Http.deleteNf(row, true)
      })
      console.log('=res=', res)
    },
    // 校验service_id的唯一性
    validate (serviceId, array) {

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

<style lang="scss">
  .main{
    background:#ffffff;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    border-right: 2px solid #eee;
    border-bottom: 2px solid #eee;
    border-radius: 10px;
    padding:10px;
    .common_block{
      border-left: 1px solid #eee;
      border-top: 1px solid #eee;
      border-right: 2px solid #eee;
      border-bottom: 2px solid #eee;
      border-radius: 10px;
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
  .card{
    border: 1px solid rgba(0,0,0,.125);
    .card-header{
      /*margin-top:30px;*/
      /*margin-bottom: 20px;*/
      /*font-weight: bold;*/
      padding:12px 20px;
      background: rgba(0,0,0,.03);
    }
    strong{
      font-weight: bolder;
    }
  }
  .newBtn{
    position: absolute;
    bottom: 0px;
    left: 50%;
    right: 50%;
    margin-left: -35px;
  }
  .el-row{
    margin-bottom: 20px;
  }
  .el-button--primary{
    background-color: #428bca;
    border-color:#357ebd;
  }
  /*.el-form-item__content{*/
    /*margin-left:90px !important;*/
  /*}*/
  .el-input__inner{
    padding:0 6px;
  }
    .el-form-item__content{
      .el-input{
        margin-left:10px;
      }
    }
</style>
