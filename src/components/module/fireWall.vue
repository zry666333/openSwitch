<template>
  <div class="main">
    <h2 class="title">防火墙配置</h2>
    <div class="common_block">
      <el-form :model="form"  class="formClass">
        <el-form-item label="规则名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="false"></el-input>
        </el-form-item>
        <el-form-item label="src_ip" :label-width="formLabelWidth">
          <el-input v-model="form.src_ip" autocomplete="false"></el-input>
        </el-form-item>
        <el-form-item label="depth" :label-width="formLabelWidth">
          <el-input v-model="form.depth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="action" :label-width="formLabelWidth">
          <el-input v-model="form.action" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createfireWall()">创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <h2 class="subtitle">已添加的防火墙配置</h2>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
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
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'frieWall',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        src_ip: '',
        depth: '',
        action: ''
      },
      formLabelWidth: '120px',
      tableData: [
        {
          name: ''
        }
      ]
    }
  },
  methods: {
    createfireWall () {

    }
  }
}
</script>

<style scoped>
.common_block{
  height:320px;
}
</style>
