<template>
    <div>
      <el-dialog
        title="服务器状态信息监控"
        :visible.sync="dialogVisible"
        width="50%"
       >
        <el-row :gutter="20">
          <el-col :span="8">cpu_utilization(%)</el-col>
          <el-col :span="16">{{formItem['cpu_utilization(%)']}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">user_info</el-col>
          <el-col :span="16">{{formItem['user_info']}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">time_info(%)</el-col>
          <el-col :span="16">{{formItem['time_info']}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">cpu_info</el-col>
          <el-col :span="16">{{formItem['cpu_info']}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">swap_info(MB)</el-col>
          <el-col :span="16">{{formItem['swap_info(MB)']}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">mem_info(MB)</el-col>
          <el-col :span="16">{{formItem['mem_info(MB)']}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">disk_info</el-col>
          <el-col :span="16"><el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formItem.disk_info"
            readonly
            autosize
          >
          </el-input></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="fn">取 消</el-button>
          <el-button type="primary" @click="fn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // formItem: {
      //   'cpu_utilization(%)': 8.3,
      //   'user_info': 'hyd      tty7         :0               Sat May  9 06:20    gone - no logout\nreboot   system boot  4.4.0-178-generi Sat May  9 06:20   still running\n\nwtmp begins Sat May  9 06:20:20 2020',
      //   'time_info': '2020-05-11 15:46:53',
      //   'cpu_info': '4  Intel(R) Core(TM) i5-8259U CPU @ 2.30GHz',
      //   'disk_info': 'Filesystem     Type      Size  Used Avail Use% Mounted on\nudev           devtmpfs  2.0G     0  2.0G   0% /dev\ntmpfs          tmpfs     394M   37M  357M  10% /run\n/dev/sda1      ext4       55G   22G   31G  42% /\ntmpfs          tmpfs     2.0G   22M  1.9G   2% /dev/shm\ntmpfs          tmpfs     5.0M  4.0K  5.0M   1% /run/lock\ntmpfs          tmpfs     2.0G     0  2.0G   0% /sys/fs/cgroup\ncgmfs          tmpfs     100K     0  100K   0% /run/cgmanager/fs\ntmpfs          tmpfs     394M  1.8M  392M   1% /run/user/1000\n',
      //   'swap_info(MB)': '1114/4093',
      //   'mem_info(MB)': '3564/3934'
      // }
      formItem: {}
    }
  },
  methods: {
    fn () {
      this.$emit('dialogVisible', false)
    },
    async getData () {
      const res = await this.$Http.system_monitoring()
      if (res) {
        this.formItem = res
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
