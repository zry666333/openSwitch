<template>
  <div id="app" class="app">
    <h2 class="title" style="position:relative;line-height: 55px;z-index:101">
      <img src='./assets/images/logo.svg' style="position:absolute;left: 20px;top:50%;margin-top:-8px;"/>
      PML网关安全系统</h2>
    <!--<router-view/>-->
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .title{
    color: #FFFFFF;
    letter-spacing: 0;
    font-size: 16px;
    height:55px;
    background: #143542;
    line-height:50px;
    padding-left:2%;
  }
}
</style>
