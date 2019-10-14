<template>
    <div>
      <PmlTable title="配置ABC" formLabelWidth="120px" :items="items" tableTitle="已配置的ABC"></PmlTable>
    </div>
</template>

<script>
import PmlTable from '../public/pml-table'

export default {
  name: 'test',
  components: {
    PmlTable
  },
  data () {
    return {
      items: [{
        label: '姓名',
        name: 'name'
      }, {
        label: '年龄',
        name: 'age'
      }]
    }
  }
}
</script>

<style scoped>

</style>
