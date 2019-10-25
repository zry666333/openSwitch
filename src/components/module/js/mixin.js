export const commonMethods = {
  methods: {
    async newData (url, form, isFormData = false) {
      const res = await this.$post(url, form, isFormData)
      if (res.Result === 'success') {
        this.$message({
          message: res.Message,
          type: 'success'
        })
      } else if (res.Result === 'false') {
        this.$message({
          message: res.Message,
          type: 'error'
        })
      }
    }
  }
}

export default commonMethods
