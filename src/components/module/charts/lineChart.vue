<template>
    <div :style="img" style="height: 280px"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  name: 'lineChart',
  props: {
    chartData: {
      type: Object
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  data () {
    return {
      myChart: null,
      img: {
        backgroundImage: 'url(' + require('../../../assets/images/chart.png') + ')',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  methods: {
    init () {
      this.myChart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions ({title, labelData, txData, rxData} = {}) {
      this.myChart.setOption({
        title: {
          text: title,
          left: 'center',
          bottom: '5%',
          textStyle: {
            color: '#42E3E1'
          }
        },
        xAxis: {
          type: 'category',
          data: labelData
        },
        yAxis: {
          name: '单位:pps',
          type: 'value'
        },
        legend: {
          data: [{
            name: 'RX',
            textStyle: {
              color: '#fff'
            }
          }, {
            name: 'TX',
            textStyle: {
              color: '#fff'
            }
          }]

        },
        series: [{
          name: 'RX',
          data: rxData,
          type: 'line',
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'TX',
          data: txData,
          type: 'line',
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        ]
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
