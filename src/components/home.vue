<template>
<div style="z-index:100;">
  <h2 class="title" style="position:relative;line-height: 55px;z-index:101">
    <img src='../assets/images/logo.svg' style="position:absolute;left: 20px;top:50%;margin-top:-8px;"/>
    PML网关安全系统</h2>
  <el-menu :default-active="activeIndex" class="header" mode="horizontal" @select="handleSelect">
    <el-menu-item index="networkFunction">网络功能</el-menu-item>
    <el-menu-item index="config">路由/防火墙配置</el-menu-item>
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
      activeIndex: 'networkFunction',
      componentName: 'networkFunction'
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

<style lang="scss" scoped>
  .title{
    color: #FFFFFF;
    letter-spacing: 0;
    font-size: 16px;
    height:55px;
    background: #143542;
    line-height:50px;
    padding-left:2%;
  }
.header {
  background-color:transparent;
  background-image: linear-gradient(0deg, rgba(51,208,229,0.37) 0%, rgba(49,49,49,0.00) 100%);
  border-bottom: none;
  /deep/ .el-menu-item {
    color:#93D4D5
  }
  /deep/ .el-menu-item:hover {
    background-color:transparent!important;
    color:#15F0FA !important;
  }
  /deep/ .el-menu-item.is-active {
    background-color:transparent;
    color:#15F0FA !important;
    border-bottom: 2px solid #15F0FA;
    /*border-bottom: #15F0FA !important;*/
  }
}
</style>
