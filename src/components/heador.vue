<template>
  <div>
  <h2 class="title">
    <img src='../assets/images/logo.svg' style="position:absolute;left: 20px;top:50%;margin-top:-8px;"/>
    <i @click="open" style="position:absolute" class="icon el-icon-picture-outline-round"></i>
    PML网关安全系统
  </h2>
  <Dialog :dialogVisible="dialog" @dialog="close"></Dialog>
  </div>
</template>

<script>
import Dialog from './module/dialog/index'

export default {
  name: 'heador',
  data () {
    return {
      dialog: false
    }
  },
  components: {
    Dialog
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
  .title{
    line-height: 55px;
    z-index:101;
    position:relative;
    color: #FFFFFF;
    letter-spacing: 0;
    font-size: 16px;
    height:55px;
    background: #143542;
    line-height:50px;
    padding-left:2%;
  }
  .icon {
    cursor: pointer;
    position: absolute;
    right: 5%;
    top: 50%;
    font-size: 30px;
    margin-top: -15px;
    color: #42E3E1;
  }
</style>
