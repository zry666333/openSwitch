<template>
  <div class="common_block">
    <!--<h4>网桥</h4>-->
    <div class="demo-image">
      <div class="block">
      </div>
    </div>
    <el-form :model="brigdeForm" ref="brigdeForm" :rules="rule3" label-position="top">
      <el-form-item label="service_id" :label-width="formLabelWidth" prop="service_id">
        <el-input v-model.number="brigdeForm.service_id" autocomplete="false" placeholder="输入1至32整数"></el-input>
      </el-form-item>
      <el-form-item  class="newBtn">
        <el-button type="primary" @click="newNetworkFun('brigdeForm')">创&nbsp;建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {isRepeat} from '../../../utils/validate'

export default {
  name: 'bridge',
  data () {
    return {
      validateTable: [],
      brigdeForm: {
        name: '网桥',
        ico: 'iconfont icon-qiao'
      },
      formLabelWidth: '80px',
      rule3: {
        service_id: [
          {required: true, message: '请输入service_id', trigger: 'blur'},
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
            let res = await this.$Http.newBridge(copy, true)
            if (res.Result === 'success') {
              this.$message({
                message: res.Message,
                type: 'success'
              })
              this.$emit('newData5', '5')
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
    height:157px;
    position:relative;
    padding:0px 20px 0px 20px;
    .el-form-item{
      /deep/ .el-form-item__label {
        padding:0 0 0;
        font-size: 14px;
        color: #42E3E1;
        letter-spacing: 0;
      }
      .el-input{
        margin-left:0px;
        /deep/ .el-input__inner {
          background: rgba(66,227,225,0.10) !important;
          border: 1px solid #42E3E1;
          border-radius: 4px;
          font-size: 14px;
          color: #93D4D5 !important;
        }
      }
    }
    .newBtn{
      margin-top: 20px;
      .el-button {
        width:96px;
        height:35px;
        text-align: center;
        background-image: linear-gradient(90deg, #42E3E1 0%, #33D0E5 100%);
        border-radius: 3px;
        color:#000;
      }
    }
  }
</style>
