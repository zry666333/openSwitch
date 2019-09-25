<template>
  <div class="home">
  <el-row>
    <el-col :offset="8" :span="8">
      <el-image :src="src"></el-image>
      <el-button class="initBtn" type="text" @click="init()">初始化</el-button>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'home.vue',
  data () {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  methods: {
    init () {
      setTimeout(() => {
        this.$message('初始化成功')
        this.$router.push('./index')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
      text-align: center;
}
</style>
