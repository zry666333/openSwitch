<template>
  <div id="app" class="app">
    <h2 class="title">PML网关安全系统</h2>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
.app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  .title{
  font-size: 60px;
  margin-bottom:20px;
    text-align: center;
  }
}
</style>
