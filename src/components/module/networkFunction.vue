<template>
  <div class="main">
    <h2 class="title" >网络功能配置</h2>
    <el-row :gutter="10" id="network">
      <el-collapse v-model="activeNames">
          <el-col :span="8">
            <el-collapse-item  title="路由器"  name="1">
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
                <el-form-item label="dst_ip" :label-width="formLabelWidth" prop="dst_ip">
                  <el-input type="number" v-model.number="routeForm.dst_ip" autocomplete="false" placeholder="输入1至32整数"></el-input>
                </el-form-item>
                <el-form-item label="to_service_id" :label-width="formLabelWidth" prop="to_service_id">
                  <el-input type="number" v-model.number="routeForm.to_service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
                </el-form-item>
                <el-form-item class="newBtn">
                  <el-button type="primary" @click="newNetworkFun('routeForm')">创建</el-button>
                </el-form-item>
              </el-form>
            </div>
            </el-collapse-item>
          </el-col>
          <el-col :span="8">
            <el-collapse-item   title="防火墙" name="2">
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
                <el-form-item label="规则名" :label-width="formLabelWidth" prop="rule_name">
                  <el-input v-model="fireWallForm.rule_name" autocomplete="false" placeholder="例：rule1"></el-input>
                </el-form-item>
                <el-form-item label="src_ip" :label-width="formLabelWidth" prop="src_ip" >
                  <el-input v-model="fireWallForm.src_ip" autocomplete="false" placeholder="例：10.0.0.1"  @keyup.native="fireWallForm.src_ip=fireWallForm.src_ip.replace(/[^0-9\.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="depth" :label-width="formLabelWidth" prop="depth">
                  <el-input v-model.number="fireWallForm.depth" autocomplete="off" placeholder="输入1至32整数"></el-input>
                </el-form-item>
                <el-form-item label="action" :label-width="formLabelWidth" prop="action">
                  <el-select v-model="fireWallForm.action" clearable placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                </el-form-item>
                <el-form-item class="newBtn">
                  <el-button type="primary" @click="newNetworkFun('fireWallForm')">创建</el-button>
                </el-form-item>
              </el-form>
            </div>
            </el-collapse-item>
          </el-col>

        <el-col :span="8">
          <el-collapse-item  title="桥" name="3">
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
          </el-collapse-item>
        </el-col>
      </el-collapse>
    </el-row>
    <el-row>
      <Panel></Panel>
    </el-row>
  </div>
</template>

<script>
import {isRepeat} from '../../utils/validate'
import Panel from './panel'

export default {
  name: 'networkFunction',
  components: {
    Panel
  },
  data () {
    return {
      activeNames: ['1', '2', '3'],
      url1: require('../../assets/route.png'),
      url3: require('../../assets/bridge.png'),
      url2: require('../../assets/firewall.png'),
      options: [{
        value: '0',
        label: '通过'
      }, {
        value: '1',
        label: '丢弃'
      }],
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
          if (!isRepeat(copy, this.tableData, 'service_id')) {
            let res
            if (copy.state === '路由器') {
              res = await this.$Http.newNetWork(copy, true)
            } else if (copy.state === '防火墙') {
              res = await this.$Http.newFireWall(copy, true)
            } else {
              res = await this.$Http.newBridge(copy, true)
            }
            if (res.Result === 'success') {
              this.$message({
                message: res.Message,
                type: 'success'
              })
              this.tableData.push(copy)
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
    },
    deleteData (index, row) {
      let res
      this.$alertMsgBox().then(async () => {
        res = await this.$Http.deleteNf(row, true)
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
      height:500px;
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
