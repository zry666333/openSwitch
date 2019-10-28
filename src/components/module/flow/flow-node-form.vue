<template>
  <div>
    <el-dialog title="节点信息" :visible.sync="dialogFormVisible">
      <el-form :model="node" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="node.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="service_id">
          <el-input v-model="node.service_id" readonly></el-input>
        </el-form-item>
        <el-form-item label="规则名" v-show="node.name === '防火墙'">
          <el-input v-model="node.rule_name" autocomplete="false" placeholder="例：rule1" readonly></el-input>
        </el-form-item>
        <el-form-item label="src_ip"  v-show="node.name === '防火墙'">
          <el-input v-model="node.src_ip" autocomplete="false" placeholder="例：10.0.0.1" readonly  @keyup.native="form.src_ip=form.src_ip.replace(/[^0-9\.]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="depth"  v-show="node.name === '防火墙'">
          <el-input v-model.number="node.depth" autocomplete="off" placeholder="输入1至32整数" readonly></el-input>
        </el-form-item>
        <el-form-item label="action"  v-show="node.name === '防火墙'">
          <!--<el-input v-model="form.action" autocomplete="off" placeholder="例：20.0.0.1"></el-input>-->

          <el-select v-model="node.action" clearable placeholder="请选择" style="width: 100%;" readonly>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'flow-node-form',
  data () {
    return {
      options: [{
        value: '0',
        label: '通过'
      }, {
        value: '1',
        label: '丢弃'
      }],
      dialogFormVisible: false,
      node: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    init (data, id) {
      this.dialogFormVisible = true
      data.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = node
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
