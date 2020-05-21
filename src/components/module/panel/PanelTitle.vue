<template>
    <div>
      <h3 class="header" @click="handleClick">
        服务功能链
      </h3>
      <el-dialog
        title="网络功能流量监控"
        :visible.sync="modal"
        width="30%"
      >
        <div class="block">
          <div class="wrapper" :style="styles" v-for="item in data " :key="item.service_id" >
            <div class="item">
            <div class="title">{{item.name}}</div>
            <div class="content">
              <div class="attr">
                <span>service_id:</span>
                <span>{{item.service_id}}</span>
              </div>
              <div class="attr">
                <span>接收速率:</span>
                <span>{{item.RX}}</span>
              </div>
              <div class="attr">
                <span>发送速率:</span>
                <span>{{item.TX}}</span>
              </div>
              <div class="attr">
                <span>接收丢包速率:</span>
                <span>{{item.RX_Drop_Rate}}</span>
              </div>
              <div class="attr">
                <span>发送丢包速率:</span>
                <span>{{item.TX_Drop_Rate}}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="modal = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>

export default {
  name: 'PanelTitle',
  data () {
    return {
      data1: [],
      data2: [],
      data: [],
      timer: '',
      modal: false
    }
  },
  computed: {
    styles () {
      return {
        boxSizing: 'border-box',
        width: 100 / Object.keys(this.data).length + '%'
      }
    }
  },
  watch: {
    modal (newValue) {
      if (newValue === true) {
        this.loopData()
      } else if (newValue === false && !!this.timer) {
        clearInterval(this.timer)
      }
    }
  },
  methods: {
    objectToArray (obj) {
      let arr = []
      for (let key in obj) {
        arr.push(obj[key])
      }
      return arr
    },
    getData () {
      const pro1 = new Promise((resolve, reject) => {
        this.$Http.readNf().then(res => {
          resolve(res)
        })
      })
      const pro2 = new Promise((resolve, reject) => {
        this.$Http.flow_monitoring().then(res => {
          resolve(res)
        })
      })
      Promise.all([pro1, pro2]).then((arr) => {
        const res1 = arr[1]
        const res2 = arr[0]
        if (res1) {
          this.data1 = this.objectToArray(res1['onvm_nf_stats'])
        } else {
          clearInterval(this.timer)
        }
        if (res2) {
          this.data2 = res2
        }
        for (let item1 of this.data2) {
          for (let item2 of this.data1) {
            if (item1.service_id + '' === item2.service_id + '') {
              item2.name = item1.name
              break
            }
          }
        }
        this.data = this.data1
      })

      // const res1 = {
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
      //     },
      //     'NF 3': {
      //       'core': 3,
      //       'instance_id': 2,
      //       'TX_Drop_Rate': 0,
      //       'service_id': 2,
      //       'RX': 43064200,
      //       'RX_Drop_Rate': 0,
      //       'Label': 'NF 3',
      //       'TX': 43064200
      //     },
      //     'NF 4': {
      //       'core': 3,
      //       'instance_id': 2,
      //       'TX_Drop_Rate': 0,
      //       'service_id': 3,
      //       'RX': 43064200,
      //       'RX_Drop_Rate': 0,
      //       'Label': 'NF 2',
      //       'TX': 43064200
      //     }
      //   }
      // }
      // const res2 = [
      //   {
      //     name: 'AES解密',
      //     'nexthop_id': '2',
      //     'service_id': '1'
      //   },
      //   {
      //     name: 'AES解密',
      //     'nexthop_id': '3',
      //     'service_id': '2'
      //   }
      // ]
    },
    loopData () {
      this.timer = setInterval(this.getData, 3000)
    },
    handleClick () {
      this.getData()
      this.modal = true
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }

}
</script>

<style lang="scss" scoped>
.block {
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right:-10px;
  .wrapper {
    line-height: 30px;
    padding: 0 10px;
    .item {
      padding:0 5px;
      border:1px solid #ccc
    }
  }
}
</style>
<style>
  * {
    box-sizing: border-box;
  }
</style>
