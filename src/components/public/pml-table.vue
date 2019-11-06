<template>
  <div class="main">
    <h2 class="title">{{title}}</h2>
    <el-row>
      <div class="common_block">
        <el-form :items="items" :form="form">
          <el-form-item :label="item.label" v-for="item in items"  :label-width="formLabelWidth" :prop="item.value" :key="item.label">
            <el-input v-model="form[item.value]" autocomplete="false"></el-input>
          </el-form-item>
          <el-form-item class="newBtn">
            <template slot-scope="scope">
              <el-button type="primary" @click="newData(form)">创建</el-button>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <el-row class="card">
      <div class="card-header"  style="position: relative;">
        <strong>{{tableTitle}}</strong>
        <el-button style="position: absolute;right:5%;top:10%;bottom:10%;" size="small">刷新</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          :prop="item.name"
          :label="item.label"
          :key="item.label"
          v-for="item in items"
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
  name: 'pml-table',
  data () {
    return {
      form: {},
      tableData: []
    }
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    formLabelWidth: {
      type: String,
      default: '120px'
    },
    items: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    tableTitle: {
      type: String,
      default: '表格标题'
    }
  },
  methods: {
    // 新建
    newData (formname) {
      console.log('-formname-', formname)
    },
    // 删除
    deleteData (index, row) {
      let res
      this.$alertMsgBox().then(async () => {
        res = await this.$Http.deleteData(row, true)
        if (res.Result === 'success') {
          this.$message({
            message: res.Message,
            type: 'success'
          })
          this.getData()
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
    async getData () {
      const res = await this.$Http.getData()
      this.tableData = res
    }
  },
  mounted () {
    // this.getData()
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
