<template>
  <div v-loading.fullscreen.lock="globalLoading">
    <top-menu/>
    <router-view/>
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
    body {
      margin: 0;
      font-family: 'Dosis';
    }
    @font-face {
      font-family: Dosis;
      src: url(./assets/Dosis-Regular.ttf);
    }
  </style>