<template>
  <div class="common_block">
    <!--<h4>防火墙</h4>-->
    <div class="demo-image">
      <div class="block">
      </div>
    </div>
    <el-form :model="fireWallForm"  ref="fireWallForm" :rules="rule2" label-position="top">
      <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id" class="input">
        <el-input v-model.number="fireWallForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="nexthop_id" :label-width="formLabelWidth" prop="nexthop_id" class="input">
        <el-input v-model.number="fireWallForm.nexthop_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="规则名" v-if="false" :label-width="formLabelWidth" prop="rule_name">
        <el-input v-model="fireWallForm.rule_name" autocomplete="false" placeholder="例：rule1"></el-input>
      </el-form-item>
      <el-form-item label="src_ip" v-if="false" :label-width="formLabelWidth" prop="src_ip" >
        <el-input v-model="fireWallForm.src_ip" autocomplete="false" placeholder="例：10.0.0.1"  @keyup.native="fireWallForm.src_ip=fireWallForm.src_ip.replace(/[^0-9\.]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="depth" v-if="false" :label-width="formLabelWidth" prop="depth">
        <el-input v-model.number="fireWallForm.depth" autocomplete="off" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item label="action" v-if="false" :label-width="formLabelWidth" prop="action">
        <el-select v-model="fireWallForm.action" clearable placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item class="newBtn">
        <el-button type="primary" @click="newNetworkFun('fireWallForm')">创&nbsp;建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {isRepeat} from '../../../utils/validate'

export default {
  name: 'fireWall',
  data () {
    return {
      validateTable: [],
      options: [{
        value: '0',
        label: '通过'
      }, {
        value: '1',
        label: '丢弃'
      }],
      fireWallForm: {
        name: '防火墙',
        ico: 'iconfont icon-fanghuoqiang'
      },
      formLabelWidth: '80px',
      rule2: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ],
        nexthop_id: [
          {required: true, message: '请输入nexthop_id', trigger: 'blur'},
          { type: 'number', max: 32, min: 0, message: '请输入小于32的整数', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    tableData: {
      handler (newValue, oldValue) {
        this.validateTable = newValue
      },
      deep: true
    }
  },
  methods: {
    newNetworkFun (formname) {
      let copy
      this.$refs[formname].validate(async valid => {
        // 数据校验
        if (valid) {
          // 数据深拷贝
          copy = JSON.parse(JSON.stringify(this.$refs[formname].model))
          if (!isRepeat(copy, this.validateTable, 'service_id')) {
            let res = await this.$Http.newFireWall(copy, true)
            if (res.Result === 'success') {
              this.$message({
                message: res.Message,
                type: 'success'
              })
              this.$emit('newData2', '2')
              this.$refs[formname].resetFields()
            } else if (res.Result === 'false') {
              this.$message({
                message: res.Message,
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: 'service_id已存在',
              type: 'warning'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .common_block{
    background-color: transparent;
    height:230px;
    position:relative;
    padding:0px 20px;
    .newBtn{
      margin-top: 20px;
    }
  }
</style>
