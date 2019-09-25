<template>
  <div class="aside">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu default-active="1">
        <el-menu-item @click="Click(item.index)" :index="item.index" v-for="item in option" :key="item.index">
          <span><i :class="item.icon"></i>{{item.value}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
export default {
  name: 'aside.vue',
  props: {
    option: {
      type: Array,
      required: true
    }
  },
  methods: {
    Click (id) {
      this.bus.$emit('sendId', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.aside{
  text-align: center;
}
</style>
