<template>
    <div class="rspClass">
      <div>
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="服务功能链名称" width="140">
        </el-table-column>
        <el-table-column prop="safeSort" label="服务功能链类型" width="120">
        </el-table-column>
        <el-table-column prop="ipAddress" label="安全池子地址">
        </el-table-column>
        <el-table-column label="输入路径id">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleOperation(scope.$index, scope.row)">应用</el-button>
            <el-button @click="handleRemove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <div class="block">
      <el-pagination large
                     layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>
    </div>
</template>

<script>
export default {
  name: 'rsp.vue',
  data () {
    return {
      tableData: [{
        name: '2016-05-03',
        safeSort: '王小虎',
        ipAddress: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '2016-05-02',
        safeSort: '王小虎',
        ipAddress: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '2016-05-04',
        safeSort: '王小虎',
        ipAddress: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '2016-05-01',
        safeSort: '王小虎',
        ipAddress: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '2016-05-08',
        safeSort: '王小虎',
        ipAddress: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    handleOperation (index, row) {
      console.log('-index-', index, '=row=', row)
    },
    handleRemove (index, row) {
      console.log('-index-', index, '=row=', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.rspClass{
  .block{
    text-align: center;
  }
  div{
    margin-bottom: 20px;
  }
}
</style>
