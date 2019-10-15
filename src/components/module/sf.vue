<template>
  <div class="sfClass">
  <el-button @click="dialogFormVisible = true">创建</el-button>
    <el-dialog title="新建主机" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新建主机名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="false"></el-input>
        </el-form-item>
        <el-form-item label="安全类型" :label-width="formLabelWidth">
          <el-select v-model="form.safeSort" autocomplete="false"  style="width: 800px;" placeholder="请选择安全类型">
            <el-option label="防火墙" value="fanghuoqiang"></el-option>
            <el-option label="入侵检测" value="ruqinjiance"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新建主机ip地址" :label-width="formLabelWidth">
          <el-input v-model="form.ipAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <div style="text-align: center">
  <el-table :data="tableData" width="100%">
    <el-table-column prop="name" label="主机名称" >
    </el-table-column>
    <el-table-column prop="safeSort" label="安全类型" >
    </el-table-column>
    <el-table-column prop="ipAddress" label="主机ip地址" >
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)">开启</el-button>
        <el-button @click="handleClose(scope.$index, scope.row)">关闭</el-button>
        <el-button @click="handleRemove(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <div class="block">
      <el-pagination large :page-count="7"
        layout="prev, pager, next"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'sf.vue',
  data () {
    return {
      tableData: this.$store.state.sfTableData,
      dialogFormVisible: false,
      form: {
        name: '',
        safeSort: '',
        ipAddress: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    add () {
      this.tableData.push({
        name: this.form.name,
        safeSort: this.form.safeSort,
        ipAddress: this.form.ipAddress
      })
      this.$store.commit('receiveSfData', {tableData: this.tableData})

      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
    },
    handleClose (index, row) {
    },
    handleRemove (index, row) {
      this.$alertMsgBox().then().catch()
    },
    init () {
    }

  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.sfClass{
  .block{
    text-align: center;
  }
  div{
    margin-bottom: 20px;
  }
}
</style>
