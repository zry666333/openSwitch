<template>
  <div class="aside">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu default-active="1">
        <el-menu-item @click="Click(item.name)" :index="item.index" v-for="item in option" :key="item.index">
          <span><i :class="item.icon"></i>{{item.name}}</span>
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
    Click (name) {
      this.bus.$emit('sendName', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.aside{
  text-align: center;
}
</style>
