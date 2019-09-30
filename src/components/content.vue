<template>
  <el-container >
  <el-main>
      <component :is="currentView" ></component>
  </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'content.vue',
  components: {},
  computed: {
    currentView: function () {
      const name = this.componentName
      var myComponent = () => import(`./module/${name}.vue`)
      return myComponent
    }
  },
  data () {
    return {
      // 默认加载的组件名称
      componentName: 'sf'
    }
  },
  methods: {
    initMain () {
      this.bus.$on('sendName', (name) => {
        this.componentName = name
      })
    }
  },
  created () {
    this.initMain()
  },
  beforeDestroy () {
    this.bus.$off('sendName', name)
  }
}
</script>

<style scoped>

</style>
