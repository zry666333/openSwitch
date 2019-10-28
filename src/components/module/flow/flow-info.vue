<template>
  <div>
    <el-dialog :visible.sync="dialogVisable" width="70%">
      <codemirror :value="flowData" :options="options" class="code">

      </codemirror>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import {codemirror} from 'vue-codemirror'
require('codemirror/mode/javascript/javascript.js')
export default {
  name: 'flow-info',
  components: {
    codemirror
  },
  data () {
    return {
      dialogVisable: false,
      options: {
        mode: {name: 'javascript', json: true},
        lineNumber: true
      }
    }
  },
  props: {
    data: Object
  },
  computed: {
    flowData () {
      return JSON.stringify(this.data, null, 4).toString()
    }
  },
  methods: {
    init () {
      this.dialogVisable = true
    }
  }
}
</script>

<style scoped>
</style>
