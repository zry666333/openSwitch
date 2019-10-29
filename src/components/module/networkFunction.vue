<template>
  <div class="main">
    <h2 class="title" >网络功能配置</h2>
    <el-row :gutter="10" id="network">
      <el-collapse v-model="activeNames">
          <el-col :span="5">
            <el-collapse-item  title="路由器"  name="1">
            <Route></Route>
            </el-collapse-item>
          </el-col>
          <el-col :span="5">
            <el-collapse-item   title="防火墙" name="2">
            <FireWall></FireWall>
            </el-collapse-item>
          </el-col>
        <el-col :span="5">
          <el-collapse-item  title="AES加密" name="3">
            <AESCode></AESCode>
          </el-collapse-item>
        </el-col>
        <el-col :span="5">
          <el-collapse-item  title="AES解密" name="4">
            <AESDecode></AESDecode>
          </el-collapse-item>
        </el-col>
        <el-col :span="4">
          <el-collapse-item  title="桥" name="5">
          <Bridge></Bridge>
          </el-collapse-item>
        </el-col>
      </el-collapse>
    </el-row>
    <el-row class="card">
      <div class="card-header"  style="position: relative;">
        <strong>已创建网络功能</strong>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="service_id"
          label="service_id"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          prop="nexthop_id"
          label="nexthop_id">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-if="false">
      <Panel></Panel>
    </el-row>
  </div>
</template>

<script>
import Panel from './panel'
import Route from './network/route'
import FireWall from './network/fireWall'
import Bridge from './network/bridge'
import AESCode from './network/aesCode'
import AESDecode from './network/aesDecode'

export default {
  name: 'networkFunction',
  components: {
    Panel,
    Route,
    FireWall,
    Bridge,
    AESCode,
    AESDecode
  },
  computed: {
    tableData: {
      get () {
        return this.$store.state.tableData
      },
      set (value) {

      }
    }
  },
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5']
    }
  },
  methods: {
    deleteData (index, row) {
      let res
      this.$alertMsgBox().then(async () => {
        res = await this.$Http.deleteNf(row, true)
        if (res.Result === 'success') {
          this.$message({
            message: res.Message,
            type: 'success'
          })
          this.$store.state.tableData.splice(index, 1)
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
      height:400px;
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
  .el-input__inner{
    padding:0 6px;
  }
    .el-form-item__content{
      .el-input{
        margin-left:10px;
      }
    }
</style>
