import Vue from 'vue'

Vue.prototype.$alertMsgBox = function (msg = '确定要删除数据？', title = '提示', option = []) {
  Object.assign(option, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: true
  })
  return this.$confirm(msg, title, option)
}
