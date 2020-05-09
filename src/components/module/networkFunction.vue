<template>
  <div>
    <el-container direction="horizontal">
      <el-container style="width:20%;padding-right:1.3%;" direction="vertical">
        <div style="height:758px;" :style="img">
        <h2 class="title">网络功能配置</h2>
        <el-aside class="main" style="height: 90%;">
              <el-collapse v-model="activeNames">
                <div style="position: relative;">
                  <el-collapse-item  title="路由器"  name="1">
                    <Route @newData1="getNetwork" :tableData="tableData"></Route>
                  </el-collapse-item>
                  <img class="img" src='../../assets/images/luyouqi.svg'/>
                </div>
                <div style="position: relative;">
                  <el-collapse-item   title="防火墙" name="2">
                    <FireWall @newData2="getNetwork" :tableData="tableData"></FireWall>
                  </el-collapse-item>
                  <img src='../../assets/images/fanghuoqiang.svg' class="img" />
                </div>
                <div style="position: relative;">
                  <el-collapse-item  title="AES加密" name="3">
                    <AESCode @newData3="getNetwork" :tableData="tableData"></AESCode>
                  </el-collapse-item>
                  <img src='../../assets/images/jiami.svg' class="img" />
                </div>
                <div style="position: relative;">
                  <el-collapse-item  title="AES解密" name="4">
                    <AESDecode @newData4="getNetwork" :tableData="tableData"></AESDecode>
                  </el-collapse-item>
                  <img src='../../assets/images/jiemi.svg' class="img" />
                </div>
                <div style="position: relative;">
                  <el-collapse-item  title="网桥" name="5">
                    <Bridge @newData5="getNetwork" :tableData="tableData"></Bridge>
                  </el-collapse-item>
                  <img src='../../assets/images/wangqiao.svg' class="img" />
                </div>
              </el-collapse>
        </el-aside>
        </div>
          <el-footer class="netBtn">
            <div @click="table = true" style="position: relative;">
            <el-button  type="text">
              已创建网络功能
              <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
            </el-button>
            </div>
          </el-footer>
      </el-container>
      <el-container  direction="vertical" style="width:80%;background-color:transparent;">
        <Chart></Chart>
        <Panel :style="imgPanel" style="background-image: linear-gradient(0deg, rgba(45,101,119,0.36) 0%, #143542 35%);"></Panel>
      </el-container>
    <el-drawer
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <el-row class="card">
        <div class="card-header"  style="position: relative;">
          <strong>已添加网络功能</strong>
          <span class="refresh" size="small" @click="getNetwork ()">刷新</span>
        </div>
        <el-table
          :data="tableData"
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
  </div>
</template>

<script>
import Panel from './panel'
import Route from './network/route'
import FireWall from './network/fireWall'
import Bridge from './network/bridge'
import AESCode from './network/aesCode'
import AESDecode from './network/aesDecode'
import lineChart from './charts/lineChart'
import Chart from './networkFunction/chart'

export default {
  name: 'networkFunction',
  components: {
    Panel,
    Route,
    FireWall,
    Bridge,
    AESCode,
    AESDecode,
    lineChart,
    Chart
  },
  data () {
    return {
      img: {
        backgroundImage: 'url(' + require('../../assets/images/aside.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      },
      imgPanel: {
        backgroundImage: 'url(' + require('../../assets/images/panel.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      },
      imgDrawer: {
        backgroundImage: 'url(' + require('../../assets/images/drawer.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      },
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
  .img {
    position:absolute;
    top:15px;
    left:23px;
    margin-left: -10px;
    width:20px;
    height: 20px;
  }
  .title {
    height:58px;
    font-size:16px;
    text-align: left;
    line-height: 58px;
    padding-left:20px;
    color: #15F0FA;
    letter-spacing: 0;
  }
  .main{
    width:100% !important;
    height:40%;
    background-image: linear-gradient(0deg, rgba(45,101,119,0.53) 0%, #143542 16%);
    .el-collapse {
      border-top:none;
      border-bottom:none;
      .el-collapse-item{
        /deep/ .el-collapse-item__header{
          border-top: 1px solid #4FDCFD;
          border-bottom: 1px solid #4FDCFD;
          font-size:16px;
          padding-left:41px;
          color: #42E3E1;
          letter-spacing: 0;
          background: rgba(79,220,253,0.10);
        }
        /deep/ .el-collapse-item__wrap {
          background-color:transparent;
          border-bottom:none;
          .el-collapse-item__content{
            padding-bottom:0px !important;
          }
        }
      }
    }
  }
  .netBtn {
    background-image: linear-gradient(90deg, #42E3E1 0%, #33D0E5 100%);
    border-radius: 1px;
    margin-top:10%;
    height:63px;
    line-height:63px;
    .el-button {
      color: #292E30;
      font-size:16px;
      font-family: inherit;
      padding-left:20px;
      /deep/ span{
        font-weight: bold!important;
      }
      .el-collapse-item__arrow.el-icon-arrow-right {
        position: absolute;
        right: 0px;
      }
    }
  }
  .el-dialog__wrapper {
    /deep/ .el-drawer {
      background-color:#143542;
      .el-drawer__header {
        .el-drawer__close-btn {
          color:#42E3E1;
        }
      }
      .el-drawer__body {
      .card{
        .card-header {
          color: #42E3E1;
        }
        .refresh {
          background-color: transparent;
          border: none;
          color: #42E3E1;
          position: absolute;
          right:2%;
          top:50%;
          bottom:10%;
          margin-top:-8px;
          font-size: 14px;
          cursor: pointer;
        }
      }
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
    .card-header{
      padding:12px 20px;
    }
    strong{
      font-weight: bolder;
    }
  }
  .el-row{
    margin-bottom: 20px;
  }
</style>
