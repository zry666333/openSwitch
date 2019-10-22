<template>
  <div class="main">
    <h2 class="title" >网络功能配置</h2>
    <el-row :gutter="10" id="network">
      <el-collapse v-model="activeNames">
          <el-col :span="8">
            <el-collapse-item  title="路由器"  name="1">
            <Route></Route>
            </el-collapse-item>
          </el-col>
          <el-col :span="8">
            <el-collapse-item   title="防火墙" name="2">
            <FireWall></FireWall>
            </el-collapse-item>
          </el-col>

        <el-col :span="8">
          <el-collapse-item  title="桥" name="3">
          <Bridge></Bridge>
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
import Panel from './panel'
import Route from './network/route'
import FireWall from './network/fireWall'
import Bridge from './network/bridge'

export default {
  name: 'networkFunction',
  components: {
    Panel,
    Route,
    FireWall,
    Bridge
  },
  data () {
    return {
      activeNames: ['1', '2', '3']
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
