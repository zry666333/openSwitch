<template>
  <div class="networkClass">
        <NetworkFunction></NetworkFunction>
  </div>
</template>

<script>
import NetworkFunction from './networkFunction'

export default {
  name: 'network',
  components: {
    NetworkFunction
  }
}
</script>

<style lang="scss" scoped>
  .grid-content {
    background-color: red;
  }
</style>
