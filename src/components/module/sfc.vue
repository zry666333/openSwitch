<template>
  <div class="sfc">
    <div class="sfcLayout">
      <el-transfer
      :titles="['主机', '安全池']"
      filterable
      filter-placeholder="请输入城市拼音"
      v-model="value"
      :data="data"
      >
    </el-transfer>
    </div>
    <div  class="sfcLayout">
      <el-button @click="addRsp">应用</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sfc.vue',
  data () {
    const generateData = _ => {
      const data = []
      const tableDatas = this.$store.state.sfTableData
      tableDatas.forEach((item) => {
        data.push({
          label: item.name,
          key: JSON.stringify({name: item.name, safeSort: item.safeSort, ip: item.ipAddress})
        })
      })
      return data
    }
    return {
      data: generateData(),
      value: [],
      temp: [],
      tableData: []
    }
  },
  computed: {
  },
  methods: {
    addRsp () {
      this.value.forEach((item) => {
        this.tableData.push(JSON.parse(item))
      })
      this.$store.commit('receiveSfcData', {tableData: this.tableData})
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.sfc{
  .sfcLayout{
    display: flex;
    justify-content: center;
  }
}

</style>
