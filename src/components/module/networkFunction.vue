<template>
  <div>
    <el-container>
        <el-aside  style="height:650px;">
            <div class="main" style="background-color: #ffffff">
              <h2 class="title" >网络功能配置</h2>
              <el-collapse v-model="activeNames">
                <div style="position: relative;">
                  <el-collapse-item  title="路由器"  name="1">
                    <Route @newData1="getNetwork" :tableData="tableData"></Route>
                  </el-collapse-item>
                  <img src='../../assets/images/luyouqi.svg' style="position:absolute;top:15px;left:23px;margin-left: -10px;" />
                </div>
                <div style="position: relative;">
                  <el-collapse-item   title="防火墙" name="2">
                    <FireWall @newData2="getNetwork" :tableData="tableData"></FireWall>
                  </el-collapse-item>
                  <img src='../../assets/images/fanghuoqiang.svg' style="position:absolute;top:15px;left:23px;margin-left: -10px;" />
                </div>
                <div style="position: relative;">
                  <el-collapse-item  title="AES加密" name="3">
                    <AESCode @newData3="getNetwork" :tableData="tableData"></AESCode>
                  </el-collapse-item>
                  <img src='../../assets/images/jiami.svg' style="position:absolute;top:15px;left:23px;margin-left: -10px;" />
                </div>
                <div style="position: relative;">
                  <el-collapse-item  title="AES解密" name="4">
                    <AESDecode @newData4="getNetwork" :tableData="tableData"></AESDecode>
                  </el-collapse-item>
                  <img src='../../assets/images/jiemi.svg' style="position:absolute;top:15px;left:23px;margin-left: -10px;" />
                </div>
                <div style="position: relative;">
                  <el-collapse-item  title="网桥" name="5">
                    <Bridge @newData5="getNetwork" :tableData="tableData"></Bridge>
                  </el-collapse-item>
                  <img src='../../assets/images/wangqiao.svg' style="position:absolute;top:15px;left:23px;margin-left: -10px;" />
                </div>
              </el-collapse>
            </div>
        </el-aside>
      <el-container style="background-color:#ffffff;border: 1px solid #eee;height:740px;">
        <Panel></Panel>
      </el-container>
    <el-drawer
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <el-row class="card">
        <div class="card-header"  style="position: relative;">
          <strong>已添加网络功能</strong>
          <el-button style="position: absolute;right:2%;top:10%;bottom:10%;" size="small" @click="getNetwork ()">刷新</el-button>
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
    </el-drawer>
    </el-container>
    <div class="netBtn"  @click="table = true">
    <el-button  type="text">
      已创建网络功能
        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
    </el-button>
    </div>
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
  data () {
    return {
      table: false,
      activeNames: ['1', '2', '3', '4', '5'],
      tableData: []
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
          this.getNetwork()
          // this.$store.state.tableData.splice(index, 1)
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
    // 查询
    async getNetwork () {
      const res = await this.$Http.readNf()
      this.tableData = res
    }
  },
  mounted () {
    this.getNetwork()
  }
}
</script>

<style lang="scss" scoped>
  .main{
    line-height: 16px;
    background:#ffffff;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    border-right: 2px solid #eee;
    border-bottom: 2px solid #eee;
    padding-bottom:10px;
    .title {
      height:58px;
      background:#ffffff;
      font-size:16px;
      text-align: left;
      line-height: 58px;
      padding-left:20px;
    }
    .el-collapse-item{
      /deep/ .el-collapse-item__header{
          margin-left:47px;
        background-color: #ffffff;
        }
      /deep/ .el-collapse-item__content{
        padding-bottom:0px !important;
      }
      }
  }
  .netBtn {
    background-color:#ffffff;
    position:fixed;
    width:280px;
    height:63px;
    bottom:60px;
    left:20px;
    line-height:63px;
    .el-button {
      padding-left:20px;
      .el-collapse-item__arrow.el-icon-arrow-right {
        position: absolute;
        padding-right: 20px;
        right: 0px;
        padding-right: 0;
      }
    }
  }
</style>

<style lang="scss">
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
  .el-menu-item.is-active,.el-menu-item:hover {
      color:#409EFF!important;
  }
</style>
