<template>
      <el-row>
        <el-col :span="12">
          <line-chart :chartData="chartData.port0"></line-chart>
        </el-col>
        <el-col :span="12">
          <line-chart :chartData="chartData.port1"></line-chart>
        </el-col>
      </el-row>
</template>

<script>
import LineChart from '../charts/lineChart'

export default {
  name: 'chart',
  components: {
    LineChart
  },
  data () {
    return {
      timer: null,
      chartData: {
        port0: {
          title: '入端口流量监控',
          labelData: [],
          txData: [],
          rxData: []
        },
        port1: {
          title: '出端口流量监控',
          labelData: [],
          txData: [],
          rxData: []
        }
      }
    }
  },
  methods: {
    init () {
      this.loopData()
    },
    // 循环请求
    loopData () {
      this.timer = setInterval(this.getData, 3000)
    },
    // 清理数组，保持数组长度为6
    clearChartData () {
      if (this.chartData.port0.labelData.length > 5) {
        this.chartData.port0.labelData.shift()
        this.chartData.port0.txData.shift()
        this.chartData.port0.rxData.shift()
      }
      if (this.chartData.port1.labelData.length > 5) {
        this.chartData.port1.labelData.shift()
        this.chartData.port1.txData.shift()
        this.chartData.port1.rxData.shift()
      }
    },
    // 格式化图表数据
    async getData () {
      const res = await this.$Http.flow_monitoring()
      // let res = {
      //   'onvm_port_stats': {
      //     'Port 1': {
      //       'RX': 7,
      //       'Label': 'Port 1',
      //       'TX': 8
      //     },
      //     'Port 0': {
      //       'RX': 4,
      //       'Label': 'Port 0',
      //       'TX': 9
      //     }
      //   },
      //   'last_updated': 'Fri May 1 16:52:48 2020\n',
      //   'onvm_nf_stats': {
      //     'NF 2': {
      //       'core': 3,
      //       'instance_id': 2,
      //       'TX_Drop_Rate': 0,
      //       'service_id': 1,
      //       'RX': 43064200,
      //       'RX_Drop_Rate': 0,
      //       'Label': 'NF 2',
      //       'TX': 43064200
      //     }
      //   }
      // }
      this.formData(res)
    },
    formData (res) {
      if (res) {
        this.clearChartData()
        this.chartData.port0.labelData.push(res.last_updated)
        this.chartData.port0.txData.push(res.onvm_port_stats['Port 0'].TX)
        this.chartData.port0.rxData.push(res.onvm_port_stats['Port 0'].RX)
        this.chartData.port1.labelData.push(res.last_updated)
        this.chartData.port1.txData.push(res.onvm_port_stats['Port 1'].TX)
        this.chartData.port1.rxData.push(res.onvm_port_stats['Port 1'].RX)
      } else {
        clearInterval(this.timer)
      }
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>
