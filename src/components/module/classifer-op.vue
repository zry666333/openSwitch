<template>
  <div class="main">
    <h2 class="title">流分类配置</h2>
    <el-row>
      <div class="common_block">
        <el-form :model="form" ref="form" :rules="rule">
          <el-form-item label="入端口" :label-width="formLabelWidth" prop="in_port">
            <el-select v-model="form.in_port" clearable placeholder="请选择" filterable  style="width: 100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="符合ACL" :label-width="formLabelWidth" prop="acl_name" >
            <el-input v-model.number="form.acl_name" autocomplete="false" placeholder="例：2001" ></el-input>
          </el-form-item>
          <el-form-item label="出端口" :label-width="formLabelWidth" prop="out_port">
            <el-select v-model="form.out_port" clearable placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in subOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="newBtn">
            <template slot-scope="scope">
              <el-button type="primary" @click="newClassiferOp('form')">确定</el-button>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <el-row class="card">
      <div class="card-header"  style="position: relative;">
        <strong>已添加的流分类配置</strong>
        <!--<el-button style="position: absolute;right:5%;top:10%;bottom:10%;" size="small" @click="getFireWallOp ()">刷新</el-button>-->
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="in_port"
          label="入端口"
        >
        </el-table-column>
        <el-table-column
          prop="acl_name"
          label="ACL"
        >
        </el-table-column>
        <el-table-column
          prop="out_port"
          label="重定向出端口">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import array from './js/commonData'

export default {
  name: 'classifer-op',
  data () {
    return {
      options: array,
      subOptions: array,
      form: {},
      formLabelWidth: '120px',
      tableData: [],
      rule: {
        in_port: [
          {required: true, message: '请输入入端口', trigger: 'blur'}
        ],
        acl_name: [
          {required: true, message: '请输入ACL名', trigger: 'blur'},
          { type: 'number', max: 2999, min: 2000, message: '请输入小于2000-2999的整数', trigger: 'blur' }
        ],
        out_port: [
          {required: true, message: '请输入出端口', trigger: 'blur'}
          // { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 新建
    newClassiferOp (formname) {
      let res
      this.$refs[formname].validate(async valid => {
        if (valid) {
          res = await this.$Http.newClassiferOp(this.form, true)
          if (res.Result === 'success') {
            this.$message({
              message: res.Message,
              type: 'success'
            })
            this.tableData.push(this.form)
            // this.getFireWallOp()
          } else if (res.Result === 'false') {
            this.$message({
              message: res.Message,
              type: 'error'
            })
          }
          this.form = {}
        } else {
          return false
        }
      })
    },
    // 删除
    deleteData (index, row) {
      let res
      this.$alertMsgBox().then(async () => {
        res = await this.$Http.deleteClassiferOp(row, true)
        if (res.Result === 'success') {
          this.$message({
            message: res.Message,
            type: 'success'
          })
          this.tableData.splice(index, 1)
          // this.getFireWallOp()
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
    // 查询
    // async getFireWallOp () {
    //   const res = await this.$Http.getFireWallOp()
    //   this.tableData = res
    // },
  },
  mounted () {
    // this.getFireWallOp()
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
