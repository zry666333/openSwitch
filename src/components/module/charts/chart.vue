<template>
    <div ref="chart"></div>
</template>

<script>

export default {
  name: 'chart.vue',
  data () {
    return {}
  },
  methods: {
    initCharts () {
      let myChart = this.$echarts.init(this.$refs.chart)
      console.log(this.$refs.chart)
      // 绘制图表
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  },
  mounted () {
    this.initCharts()
  }
}
</script>

<style scoped>

</style>
