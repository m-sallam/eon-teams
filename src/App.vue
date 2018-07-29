<template>
  <div v-loading.fullscreen.lock="globalLoading">
    <el-container v-if="ready">
      <el-header>
        <top-menu/>
      </el-header>     
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import topMenu from '@/components/TopMenu.vue'

  export default {
    name: 'app',
    components: {
      topMenu
    },
    computed: {
      globalLoading () {
        return this.$store.state.global.globalLoading
      },
      ready () {
        return this.$store.state.global.ready
      }
    }
  }
  </script>

  <style>
    .el-card {
      margin: 5px;
    }
  </style>