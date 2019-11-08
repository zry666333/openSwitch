<template>
  <div style="min-height:900px; height:1000px">
    <div id="particles-js"></div>
  </div>
</template>

<script>
/* eslint-disable */
import particlesJs from 'particles.js'
import particlesConfig from './particles.json'
export default {
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      particlesJS('particles-js', particlesConfig)
      document.body.style.overflow = 'hidden'
    }
  }
}
</script>
<style scoped>
  @import "./style.css";
</style>
