<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input>
          <template slot="prepend">{{input1.label}}</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input>
          <template slot="prepend">{{input2.label}}</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button>{{button.label}}</el-button>
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
    name: 'pml-table'
  }
</script>

<style scoped>

</style>
