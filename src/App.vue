<template>
  <div id="app" class="app">
    <h2 class="title" style="position:relative;line-height: 55px;box-shadow: 0 0 6px 0 #CFD2DD;z-index:101">
      <img src='./assets/images/logo.svg' style="position:absolute;left: 20px;top:50%;margin-top:-8px;"/>
      PML网关安全系统</h2>
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
    color: #4A4A4A;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 16px;
    height:55px;
    font-family: PingFangSC-Semibold;
    background-color:#FFFFFF ;
    line-height:50px;
    padding-left:2%;
    background: #FFFFFF;
    box-shadow: 0 0 6px 0 #CFD2DD;
  }
}
</style>
