<template>
  <div class="block">
    <div class="outer_block" :style="img">
    <h2 class="title">路由配置</h2>
    <el-row style="height:444px;">
      <div class="common_block">
        <el-form :model="form"  ref="form" :rules="rule" label-position="top">
          <el-form-item label="Service Id" :label-width="formLabelWidth" prop="service_id">
            <el-input :disabled="true" v-model="form.service_id"></el-input>
          </el-form-item>
          <el-form-item label="dst_ip" :label-width="formLabelWidth" prop="dst_ip">
            <el-input v-model="form.dst_ip" autocomplete="false" placeholder="例：10.0.0.1" @keyup.native="form.dst_ip=form.dst_ip.replace(/[^0-9\.]/g,'')"></el-input>
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
    </div>
    <div class="table_block" :style="tableImg">
    <el-row class="card" style="margin-top: 15px;">
      <div class="card-header" style="position: relative;">
        <strong>已添加的路由配置</strong>
        <span class="refresh" size="small" @click="getRouteOp ()">刷新</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="dst_ip"
          label="dst_ip"
          >
        </el-table-column>
        <el-table-column
          prop="to_service_Id"
          label="to_service_Id"
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
  </div>
</template>

<script>
export default {
  name: 'routeOption',
  data () {
    return {
      img: {
        backgroundImage: 'url(' + require('@/assets/images/outer_block.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      },
      tableImg: {
        backgroundImage: 'url(' + require('@/assets/images/table_block.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      },
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
    deleteData (index, row) {
      this.$alertMsgBox().then(async () => {
        let res = await this.$Http.deleteRouteOP(row, true)
        if (res.Result === 'success') {
          this.$message({
            message: res.Message,
            type: 'success'
          })
          // this.tableData.splice(index, 1)
          this.getRouteOp()
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
    async newRouteOp () {
      const res = await this.$Http.newRouteOp(this.form, true)
      if (res.Result === 'success') {
        this.$message({
          message: res.Message,
          type: 'success'
        })
        this.getRouteOp()
      } else if (res.Result === 'false') {
        this.$message({
          message: res.Message,
          type: 'error'
        })
      }
    },
    async getRouteOp () {
      // const res = [{
      //   'dst_ip': '11.0.0.17',
      //   'to_service_Id': '2'
      // }, {
      //   'dst_ip': '11.0.0.18',
      //   'to_service_Id': '3'
      // }]
      let res = await this.$Http.getRouteOp()
      // let res = await this.$get('/read_nf_router_conf/')
      this.tableData = res
    }
  },
  mounted () {
    this.getRouteOp()
  }
}
</script>

<style lang="scss" scoped>
  .block {
    .outer_block {
      position: relative;
      background-image: linear-gradient(0deg, rgba(45,101,119,0.30) 0%, #143542 24%);
      .common_block{
        padding-left:20px;
        padding-right:30px;
        .newBtn{
          position: absolute;
          bottom: 51px;
          left: 50%;
          right: 50%;
          margin-left: -35px;
        }
      }
      .title{
        padding-left: 20px;
        height: 56px;
        line-height: 56px;
        font-size: 16px;
        color: #42E3E1;
        letter-spacing: 0;
      }
    }
    .table_block {
      padding:0 5px;
      .card {
        strong {
          font-size: 16px;
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
        background-image: linear-gradient(-180deg, rgba(119,243,242,0.00) 70%, rgba(66,227,225,0.15) 100%);
      }
    }
  }
</style>
