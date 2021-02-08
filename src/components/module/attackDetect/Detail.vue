<template>
  <el-card class="box-card">
    <div slot="header" style="text-align: center;color: #00FFF0;font-size: 28px;">
      <h2>{{title}}</h2>
    </div>
    <div class="card-content">
      <div class="card-head">
        <div class="card-tip">
        <div class="card-tip1">
          <p>收到攻击次数</p>
          <p>{{number}}</p>
        </div>
        <div class="card-tip2">
          <p>攻击成功次数</p>
          <p>0</p>
        </div>
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
          <div class="List" ref="slide">
            <div class="allData" ref="slide1">
              <ul v-for="(item,id) in items" v-bind:key="id">
                <li>{{item.trade}}</li>
                <li>{{item.price}}</li>
                <li>{{item.riseFall}}</li>
                <li>{{item.volume}}</li>
              </ul>
            </div>
            <div class="allData" ref="slide2">
              <ul v-for="(item,id) in items" v-bind:key="id">
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
</template>

<script>
import echarts from 'echarts' // echarts theme

export default {
  props: {
    number: String,
    title: String,
    type: Array,
    data: Array,
    items: Array
  },
  data () {
    return {
      chart: null,
      interval: null,
      time: '',
      num: '',
      id: 0
    }
  },
  methods: {
    scrollTop () {
      let slide = this.$refs.slide
      let slide1 = this.$refs.slide1
      let slide2 = this.$refs.slide2
      if (slide.scrollTop === slide1.offsetHeight + slide2.offsetHeight - slide.offsetHeight) {
        slide.scrollTop -= slide1.offsetHeight
        // clearInterval(this.time)
      } else {
        slide.scrollTop++
      }
    },
    init () {
      this.items2 = this.items
      this.num = this.items.length
      this.chart = echarts.init(this.$refs.pieChart1)
      this.setOptions()
    },
    setOptions () {
      var durColor = ['#F7D400', '#728DFF', '#43E3E1', '#00FFBA ', '#2EA5FF', '#86FE06']
      var all = 260
      var getDurData = (data) => {
        var result = []
        for (var i in data) {
          var opt = {
            right: 0,
            name: this.type[i],
            type: 'pie',
            z: i + 1,
            clockWise: false,
            label: {
              lineHeight: 22,
              position: 'outside',
              formatter: '{d}%{a}',
              alignTo: 'edge',
              margin: '0',
              distanceToLabelLine: 50,
              fontSize: 16,
              padding: [20, 0, 10, 0]
            },
            labelLine: {
              length: 20,
              length2: 20
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
                    color: 'rgba(169,219,219,0.57)'
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
            color: '#00FFF0'
          },
          text: '攻击手法占比'
        },
        color: durColor,
        tooltip: {
          show: true,
          formatter: '{a} <br/> {c}人 ({d}%)'
        },
        series: getDurData(this.data)
      }
      this.chart.setOption(option)
    }
  },
  mounted () {
    this.init()
    this.time = setInterval(this.scrollTop, 10)
  },
  destroyed () {
    clearInterval(this.time)
    this.time = null
  }
}
</script>
<style lang="scss">
  .el-card {
    border: none;
    background-color: transparent;
    .el-card__header {
      border-bottom: none;
    }
  }
  .card-content {
    background-color: transparent;
    .card-head {
      height: 90px;
      overflow: hidden;
      background: #0B3F53;
      .card-tip {
        width: 400px;
        margin: auto;
        height: 90px;
        .card-tip1,.card-tip2 {
          padding: 5px 35px;
          height: 90px;
          line-height: 45px;
          margin: auto;
          color: #AFB6BF;
          width: 170px;
          p:nth-child(1) {
            text-align: center;
            font-weight: bold;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #AFB6BF ;
          }
          p:nth-child(2) {
            padding: 5px 0;
            text-align: center;
            font-size: 24px;
            color: #00FFF0;
          }
        }
        .card-tip1 {
          float: left;
        }
        .card-tip2 {
          float: left;
        }
      }
    }
    .card-list {
      background-color: transparent;
      .card-list-header {
        text-align: center;
        color: #00FFF0;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
        font-size: 20px;
      }
      .card-list-content {
        .header {
          div {
            color: #AFB6BF  ;
            display: inline-block;
            box-sizing: border-box;
            width: 24%;
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
    height: 300px;
    overflow: hidden;
    .allData {
      height: 400px;
      overflow: auto;
      transition: top 1.5s;
      width: 100%;
      top: 0;
      ul {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #15F0FA;
        &:hover {
          background-color: #15F0FA;
        }
        &:nth-child(odd) {
          background-color: rgba(0,0,0,0.2);
        }
        li {
          color: #00FFF0;
          font-size: 16px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          float: left;
          width: 25%;
          text-align: center;
          line-height: 46px;
        }
      }
    }
  }
</style>
