<template>
  <div class="block">
    <div class="outer_block" :style="img">
    <h2 class="title">防火墙配置</h2>
    <el-row style="height:444px;">
      <div class="common_block">
        <el-form :model="form" ref="form" :rules="rule" label-position="top">
          <el-form-item label="规则名" :label-width="formLabelWidth" prop="rule_name">
            <el-input v-model="form.rule_name" autocomplete="false" placeholder="例：rule1"></el-input>
          </el-form-item>
          <el-form-item label="src_ip" :label-width="formLabelWidth" prop="src_ip" >
            <el-input v-model="form.src_ip" autocomplete="false" placeholder="例：10.0.0.1"  @keyup.native="form.src_ip=form.src_ip.replace(/[^0-9\.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="depth" :label-width="formLabelWidth" prop="depth">
            <el-input v-model.number="form.depth" autocomplete="off" placeholder="输入1至32整数"></el-input>
          </el-form-item>
          <el-form-item label="action" :label-width="formLabelWidth" prop="action">
            <el-select v-model="form.action" clearable placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item class="newBtn">
            <template slot-scope="scope">
              <el-button type="primary" @click="newfireWallOp('form')">创建</el-button>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    </div>
    <div class="table_block" :style="tableImg">
    <el-row class="card" style="margin-top: 15px;">
      <div class="card-header"  style="position: relative;">
        <strong>已添加的防火墙配置</strong>
        <span class="refresh" size="small" @click="getFireWallOp ()">刷新</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="rule_name"
          label="规则名"
        >
        </el-table-column>
        <el-table-column
          prop="src_ip"
          label="src_ip"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          prop="depth"
          label="depth">
        </el-table-column>
        <el-table-column
          prop="action"
          label="action"
          :formatter="format"
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
  name: 'frieWall',
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
      options: [{
        value: '0',
        label: '通过'
      }, {
        value: '1',
        label: '丢弃'
      }],
      form: {},
      formLabelWidth: '120px',
      tableData: [],
      rule: {
        rule_name: [
          {required: true, message: '请输入规则名', trigger: 'blur'}
        ],
        src_ip: [
          {required: true, message: '请输入src_ip', trigger: 'blur'}
        ],
        depth: [
          {required: true, message: '请输入depth', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ],
        action: [
          {required: true, message: '请输入action', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 新建
    newfireWallOp (formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          const res = await this.$Http.newFireWallOp(this.form, true)
          if (res.Result === 'success') {
            this.$message({
              message: res.Message,
              type: 'success'
            })
            this.tableData.push(this.form)
            this.getFireWallOp()
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
        res = await this.$Http.deleteFireWallOp(row, true)
        if (res.Result === 'success') {
          this.$message({
            message: res.Message,
            type: 'success'
          })
          this.getFireWallOp()
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
    async getFireWallOp () {
      // const res = [{
      //   'rule_name': '规则1',
      //   'src_ip': '211.113.323.232',
      //   'depth': '34',
      //   'action': '0'
      // }, {
      //   'rule_name': '规则1',
      //   'src_ip': '3',
      //   'depth': '1.0.0.2',
      //   'action': '1'
      // }]
      const res = await this.$Http.getFireWallOp()
      this.tableData = res
    },
    // 格式化action
    format (row, column, cellValue, index) {
      if (cellValue === '0') {
        return '通过'
      } else if (cellValue === '1') {
        return '丢弃'
      }
    }
  },
  mounted () {
    this.getFireWallOp()
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
