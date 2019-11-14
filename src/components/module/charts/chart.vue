<template>
    <div ref="chart"></div>
</template>

<script>

export default {
  name: 'chart.vue',
  data () {
    return {
      chartSeries: []
    }
  },
  props: {
    series: {
      type: Array,
      default () {
        return []
      }
    },
    legend: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    series: {
      handler (newValue, oldValue) {
        console.log('-new-', newValue)
        this.chartSeries = newValue
        this.initCharts()
      },
      deep: true
    }
  },
  methods: {
    initCharts () {
      let myChart = this.$echarts.init(this.$refs.chart)
      var option = {
        backgroundImage: 'linearGradient(0deg, rgba(45,101,119,0.55) 0%, #143542 44%)',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        legend: this.legend,
        xAxis: {
          type: 'category',
          data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
          axisLine: {
            lineStyle: {
              color: 'white'

            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        },

        yAxis: {
          type: 'value',
          max: '1200',
          axisLine: {
            show: false,
            lineStyle: {
              color: 'white'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          },
          axisLabel: {}
        },
        'dataZoom': [{
          'show': true,
          'height': 12,
          'xAxisIndex': [
            0
          ],
          bottom: '8%',
          'start': 10,
          'end': 90,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'},
          borderColor: '#90979c'
        }, {
          'type': 'inside',
          'show': true,
          'height': 15,
          'start': 1,
          'end': 35
        }],
        series: this.chartSeries
      }

      var app = {
        currentIndex: -1
      }
      setInterval(function () {
        var dataLen = option.series[0].data.length

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        app.currentIndex = (app.currentIndex + 1) % dataLen
        // console.log(app.currentIndex);
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
      }, 1000)

      myChart.setOption(option)
    }
  },
  mounted () {
    // this.initCharts()
  }
}
</script>

<style scoped>

</style>
