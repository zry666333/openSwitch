<template>
  <div class="main">
    <h2 class="title" >网络功能配置</h2>
    <el-row>
      <el-col :span="8">
        <el-form :model="form" class="formClass">
        <el-form-item label="service id" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="false"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" class="createBtn">创建</el-button>
      </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :model="form"  class="formClass">
          <el-form-item label="service id" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="false"></el-input>
          </el-form-item>
          <el-form-item label="nexthop id" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="false"></el-input>
          </el-form-item>
          <el-button type="primary" class="createBtn" size="small">创建</el-button>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :model="form"  class="formClass">
          <el-form-item label="service id" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="false"></el-input>
          </el-form-item>
          <el-button type="primary" class="createBtn" size="small">创建</el-button>
        </el-form>
      </el-col>
    </el-row>
    <h2 class="subtitle">已创建网络功能</h2>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'networkFunction',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        safeSort: '',
        ipAddress: ''
      },
      formLabelWidth: '80px',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped>

</style>

<style lang="scss">
  .title{
    text-align: center;
    margin-top: 20px;
    margin-bottom:20px;
  }
  .formClass{
    text-align: center;
    height:280px;
    position:relative;
  }
  .subtitle{
    margin-top:30px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .main{
    border: 0.8px solid gray;
    padding:10px;
  }
  .createBtn{
    position: absolute;
    bottom: 0px;
  }
</style>
