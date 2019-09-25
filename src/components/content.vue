<template>
  <el-container >
  <el-main v-if="staticId == 1 ">
    <Sf/>
    <!--<Component :is="Sf"></Component>-->
  </el-main>
    <el-main v-if="staticId == 2 ">
      <Sfc/>
    </el-main>
    <el-main v-if="staticId == 3 ">
     <Rsp/>
    </el-main>
    <el-main v-if="staticId == 4 ">
      <Classifer/>
    </el-main>
  </el-container>
</template>

<script>
// import Sf from './module/sf.vue'
import Sfc from './module/sfc.vue'
import Rsp from './module/rsp.vue'
import Classifer from './module/classifer.vue'
export default {
  name: 'content.vue',
  components: {
    // Sf,
    Sf: () => import('./module/sf.vue'),
    Sfc,
    Rsp,
    Classifer
  },
  computed: {
    // Sf: function () {
    //   var myComponent = () => import('./module/sf.vue')
    //   return myComponent
    // }
  },
  data () {
    return {
      // 默认展示第一个侧边栏
      staticId: 1
    }
  },
  methods: {
    initMain () {
      this.bus.$on('sendId', (id) => {
        console.log('this', this)
        this.staticId = id
      })
    }
  },
  created () {
    this.initMain()
  }
}
</script>

<style scoped>

</style>
