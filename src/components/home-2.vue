<template>
<div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="network">网络功能</el-menu-item>
    <el-menu-item index="classifer">流分类</el-menu-item>
  </el-menu>
  <el-main>
    <component :is="currentView" ></component>
  </el-main>
</div>
</template>

<script>
export default {
  name: 'home-2',
  data () {
    return {
      activeIndex: 'network',
      componentName: 'network'
    }
  },
  computed: {
    currentView: function () {
      const name = this.componentName
      var myComponent = () => import(`./module/${name}.vue`)
      return myComponent
    }
  },
  methods: {
    handleSelect (key) {
      this.componentName = key
    }
  }
}
</script>

<style scoped>

</style>
