<template>
  <div class="main">
    <h2 class="title">防火墙配置</h2>
    <el-row>
      <div class="common_block">
        <el-form :model="form" ref="form" :rules="rule">
          <el-form-item label="规则名" :label-width="formLabelWidth" prop="rule_name">
            <el-input v-model="form.rule_name" autocomplete="false" placeholder="例：rule1"></el-input>
          </el-form-item>
          <el-form-item label="src_ip" :label-width="formLabelWidth" prop="src_ip">
            <el-input v-model.number="form.src_ip" autocomplete="false" placeholder="例：10.0.0.1"></el-input>
          </el-form-item>
          <el-form-item label="depth" :label-width="formLabelWidth" prop="depth">
            <el-input v-model.number="form.depth" autocomplete="off" placeholder="输入1至32整数"></el-input>
          </el-form-item>
          <el-form-item label="action" :label-width="formLabelWidth" prop="action">
            <!--<el-input v-model="form.action" autocomplete="off" placeholder="例：20.0.0.1"></el-input>-->

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
    <el-row class="card">
      <div class="card-header">
        <strong>已添加的防火墙配置</strong>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="rule_name"
          label="规则名"
        >
        </el-table-column>
        <el-table-column
          prop="src_ip"
          label="src_ip"
        >
        </el-table-column>
        <el-table-column
          prop="depth"
          label="depth">
        </el-table-column>
        <el-table-column
          prop="action"
          label="action"
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
</template>

<script>
export default {
  name: 'frieWall',
  data () {
    return {
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
          // { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
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
    newfireWallOp (formname) {
      let res
      this.$refs[formname].validate(async valid => {
        if (valid) {
          this.tableData.push({
            rule_name: this.form.rule_name,
            src_ip: this.form.src_ip,
            depth: this.form.depth,
            action: this.form.action
          })
          res = await this.$Http.deleteFireWallOp({
            rule_name: this.form.rule_name,
            src_ip: this.form.src_ip,
            depth: this.form.depth,
            action: this.form.action
          })
          this.form = {}
        } else {
          return false
        }
      })
      console.log(res)
    },
    deleteData (index, row) {
      let res
      this.$alertMsgBox().then(async () => {
        this.tableData.splice(index, 1)
        res = await this.$Http.deleteFireWallOp(row)
      })
      console.log(res)
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
