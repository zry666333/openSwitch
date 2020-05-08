<template>
  <div class="block">
    <div class="outer_block" :style="img">
      <h2 class="title">ACL配置</h2>
      <el-row  style="height:444px;">
        <div class="common_block">
          <el-form :model="form" ref="form" :rules="rule" label-position="top">
            <el-form-item label="ACL名" :label-width="formLabelWidth" prop="acl_name">
              <el-input v-model.number="form.acl_name" autocomplete="false" placeholder="例：2001"></el-input>
            </el-form-item>
            <el-form-item label="规则允许" :label-width="formLabelWidth" prop="rule">
              <el-select v-model="form.rule" clearable placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="源ip" :label-width="formLabelWidth" prop="ip" v-show="form.rule == 'ip'">
              <el-input v-model ="form.ip" autocomplete="off" placeholder="例：192.168.1.0" @keyup.native="form.ip=form.ip.replace(/[^0-9\.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="通配符" :label-width="formLabelWidth" prop="mask" v-show="form.rule == 'ip'">
              <el-input v-model ="form.mask" autocomplete="off" placeholder="例：0.0.0.255" @keyup.native="form.mask=form.mask.replace(/[^0-9\.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item class="newBtn">
              <template slot-scope="scope">
                <el-button type="primary" @click="newAclOp('form')">确定</el-button>
              </template>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
    </div>
    <div class="table_block" :style="tableImg">
      <el-row class="card" style="margin-top: 15px;">
        <div class="card-header"  style="position: relative;">
          <strong>已添加的ACL</strong>
        </div>
        <el-table
          :data="
          tableData"
          style="width: 100%">
          <el-table-column
            prop="acl_name"
            label="ACL名"
          >
          </el-table-column>
          <el-table-column
            prop="rule"
            label="允许规则"
          >
          </el-table-column>
          <el-table-column
            prop="ip"
            label="源ip地址">
          </el-table-column>
          <el-table-column
            prop="mask"
            label="通配符"
          >
          </el-table-column>
          <el-table-column label="操作">
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
  name: 'acl-op',
  data () {
    return {
      img: {
        backgroundImage: 'url(' + require('../../../assets/images/outer_block.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      },
      tableImg: {
        backgroundImage: 'url(' + require('../../../assets/images/table_block.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      },
      options: [{
        value: 'any',
        label: 'any'
      }, {
        value: 'ip',
        label: 'ip'
      }],
      form: {},
      formLabelWidth: '120px',
      tableData: [],
      rule: {
        acl_name: [
          {required: true, message: '请输入ACL名', trigger: 'blur'},
          { type: 'number', max: 2999, min: 2000, message: '请输入2000-2999的整数', trigger: 'blur' }
        ],
        rule: [
          {required: true, message: '请输入规则', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 新建
    newAclOp (formname) {
      let res
      if (this.form.rule === 'ip') {
        this.rule['ip'] = [{required: true, message: '请输入源ip', trigger: 'blur'}]
        this.rule['mask'] = [{required: true, message: '请输入通配符', trigger: 'blur'}]
      }
      this.$refs[formname].validate(async valid => {
        if (valid) {
          res = await this.$Http.newAclOp(this.form, true)
          if (res.Result === 'success') {
            this.$message({
              message: res.Message,
              type: 'success'
            })
            this.tableData.push(this.form)
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
        res = await this.$Http.deleteAclOp(row, true)
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
  },
  mounted () {
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
          .el-button {
            background-image: linear-gradient(90deg, #42E3E1 0%, #33D0E5 100%);
            border-radius: 3px;
            width: 96px;
            height: 35px;
            padding: 0;
            /deep/ span {
              font-size: 16px;
              color: #292E30;
            }
          }
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
          top:10%;
          bottom:10%;
        }
        background-image: linear-gradient(-180deg, rgba(119,243,242,0.00) 70%, rgba(66,227,225,0.15) 100%);
      }
    }
  }
</style>
