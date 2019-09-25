<template>
    <div class="classifer">
      <el-row>
        <el-col :span="8">
          <el-input>
            <template slot="prepend">源ip地址</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input>
            <template slot="prepend">SFC ID</template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button>下发</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" border>
          <el-table-column prop="name" label="已下发Classifer" width="280">
          </el-table-column>
          <el-table-column prop="safeSort" label="源ip" width="280">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleRemove(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'classifer.vue',
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
    handleRemove (index, row) {
      console.log('--index--')
    }
  }
}
</script>

<style lang="scss" scoped>
  .classifer{
    .el-row {
      margin-bottom: 20px;
      /*.el-input{*/
        /*width:80%;*/
        /*.el-button{*/
          /*width:20%;*/
        /*}*/
    /*}*/
      /deep/.el-table{
        font-size:60px;
        /deep/.cell{
          background:red;
          text-align:center;
        }
      }
  }
}
</style>
