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
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .title{
    color: #fff;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 30px;
    text-align: center;
    height:50px;
    background-color:#2c3742;
    line-height:50px;
  }
}
</style>
