<template>
  <div class="sfc">
    <el-row>
      <el-transfer
      :titles="['主机', '安全池']"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      v-model="value"
      :data="data">
    </el-transfer>
      <el-button>应用</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'sfc.vue',
  data () {
    const generateData = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      data: generateData(),
      value: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  },
  methods: {
    init () {
      console.log('-sfc-挂载')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  /*.sfc{*/
    /*/deep/ .el-checkbox__input{*/
      /*left:20px;*/
    /*}*/
    /*/deep/ .el-checkbox-group.el-transfer-panel__list.is-filterable{*/
      /*label{*/
      /*width:136px;*/
    /*}*/
    /*}*/
  /*}*/

</style>
