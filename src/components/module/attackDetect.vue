<template>
  <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" style="text-align: center;color:white;font-size: 16px;">
              <span>域名服务器</span>
            </div>
            <div class="card-content">
              <div class="card-head">
                <div class="card-tip1">
                  <p>收到攻击次数</p>
                  <p>251145</p>
                </div>
                <div class="card-tip2">
                  <p>攻击成功次数</p>
                  <p>0</p>
                </div>
              </div>
              <div ref="pieChart1" id="pieChart1" style="height:300px;background-color: transparent"></div>
              <div class="card-list">
                <div class="card-list-header">
                  <span>攻击详细列表</span>
                </div>
                <div class="card-list-content">
                  <div class="header">
                    <div>攻击ip</div>
                    <div>攻击手段</div>
                    <div>攻击来源</div>
                    <div>攻击地区</div>
                  </div>
                  <div class="List" >
                    <div class="allData" ref="slide">
                      <ul v-for="(item,id) in items" v-bind:key="id" ref="slide1">
                        <li>{{item.trade}}</li>
                        <li>{{item.price}}</li>
                        <li>{{item.riseFall}}</li>
                        <li>{{item.volume}}</li>
                      </ul>
                      <ul v-for="(item,id) in items" v-bind:key="id" ref="slide2">
                        <li>{{item.trade}}</li>
                        <li>{{item.price}}</li>
                        <li>{{item.riseFall}}</li>
                        <li>{{item.volume}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>路由器</span>
            </div>
            <p>内容1</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>分布式存储</span>
            </div>
            <p>内容1</p>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import echarts from 'echarts' // echarts theme

var durColor = ['#ffe67a', '#ffa468', '#ff5469', '#fe2c59', '#defffd', '#02e8ff']
var durTimeData = ['DNS劫持', '域名劫持', 'sdfsdf', 'aaaaa', 'DNS DDoS攻击', '恶意文件攻击']
var data2 = [50, 47, 45, 36, 30, 29, 23]
var all = 260
var getDurData = function (data) {
  var result = []
  for (var i in data) {
    var opt = {
      left: -100,
      name: durTimeData[i],
      type: 'pie',
      z: i + 1,
      clockWise: false,
      // center: ['45%', '47%'],
      // itemStyle : dataStyle,
      label: {
        position: 'outside',
        formatter: '{d}%{a}',
        alignTo: 'edge',
        margin: '50',
        distanceToLabelLine: 50
      },
      labelLine: {
        length: 0,
        length2: 10
      },
      hoverAnimation: false,
      data: [
        {
          value: data[i],
          itemStyle: {
            color: durColor[i]
          }
        },
        {
          value: all - data[i],
          itemStyle: {
            normal: {
              color: '#ccc'
            }
          },
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          tooltip: {
            show: false,
            formatter: function () {
              return ''
            }
          }
        }
      ]
    }
    var max = data.length * 10 - i * 8
    opt.radius = [(max - 16) + '%', (max - 10) + '%']
    result.push(opt)
  }
  return result
}
var option = {
  title: {
    textStyle: {
      color: '#fff'
    },
    text: '攻击手法占比'
  },
  color: durColor,
  tooltip: {
    show: true,
    formatter: '{a} <br/> {c}人 ({d}%)'
  },
  series: getDurData(data2)
}

export default {
  name: 'attackDetect',
  data () {
    return {
      chart: null,
      interval: null,
      time: '',
      num: '',
      items: [
        {
          trade: 'a1',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a2',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a3',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a4',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a5',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a6',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a7',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a8',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a9',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a10',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        },
        {
          trade: 'a11',
          price: 'aaaaaaaaaaaaaaa',
          riseFall: 'ddddddddddddd',
          volume: 'cccccccccccccccccc'
        }
      ],
      id: 0

    }
  },
  // computed: {
  //   top: function () {
  //     return -this.id * 47 + 'px'
  //   }
  // },
  methods: {
    // forbidden: function () {
    //   clearInterval(this.time)
    // },
    // start: function () {
    //   this.time = setInterval(_ => {
    //     console.log('d', this.id, this.num)
    //     if (this.id < this.num) {
    //       this.id += 1
    //       this.items.push(this.items[this.id - 1])
    //     } else {
    //       for (let i = 0; i < this.items.length - 1; i++) {
    //         this.items.splice(this.items[i], 1)
    //       }
    //       console.log('items:', this.items)
    //       this.id = this.id
    //     }
    //   }, 1500)
    // },
    init () {
      this.num = this.items.length
      this.chart = echarts.init(this.$refs.pieChart1)
      this.setOptions()
    },
    setOptions () {
      this.chart.setOption(option)
    }
  },
  mounted () {
    this.init()
    // this.time = setInterval(_ => {
    //   console.log('d', this.id, this.num)
    //   if (this.id < this.num) {
    //     this.id += 1
    //     this.items.push(this.items[this.id - 1])
    //   } else {
    //     for (let i = 0; i < this.items.length - 1; i++) {
    //       this.items.splice(this.items[i], 1)
    //     }
    //     console.log('items:', this.items)
    //     this.id = 0
    //   }
    // }, 1500)
  },
  destroyed () {
    clearInterval(this.time)
    this.time = null
  }
}
</script>
<style lang="scss">
  .el-card {
    background-color: transparent;
    .el-card__header {
      border-bottom: none;
    }
  }
  .card-content {
    background-color: transparent;
    .card-head {
      overflow: hidden;
      .card-tip1,.card-tip2 {
        p:nth-child(1) {
          padding: 5px 0;
          font-weight: bold;
          height: 30px;
          line-height: 20px;
          color: white;
          border-bottom: 2px solid white;
        }
        p:nth-child(2) {
          padding: 5px 0;
          color: white;
          text-align: right;
        }
      }
      .card-tip1 {
        float: left;
      }
      .card-tip2 {
        float: right;
      }
    }
    .card-list {
      background-color: transparent;
      .card-list-header {
        height: 30px;
        line-height: 30px;
        font-weight: bold;
        font-size: 20px;
        color: #ffffff;
        span {
          border-bottom: 2px solid #15F0FA;
        }
      }
      .card-list-content {
        .header {
          div {
            color: #ffffff;
            display: inline-block;
            box-sizing: border-box;
            width: 120px;
            font-size: 16px;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
  }

  .List {
    width: 100%;
    height: 329px;
    overflow: hidden;
    position: relative;
    .allData {
      transition: top 1.5s;
      width: 100%;
      position: absolute;
      top: 0;
      :hover {
        background-color: #15F0FA;
      }
      ul {
        width: 100%;
        height: 46px;
        border-bottom: 1px solid #15F0FA;
        li {
          color: #ffffff;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          float: left;
          width: 25%;
          text-align: center;
          font-size: 16px;
          line-height: 46px;
        }
      }
    }
  }
</style>
