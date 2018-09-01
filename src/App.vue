<template>
  <vue-perfect-scrollbar style="height: 100vh">
    <top-menu/>
    <router-view/>
  </vue-perfect-scrollbar>
</template>

<script>
  import topMenu from '@/components/TopMenu.vue'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

  export default {
    name: 'app',
    components: {
      topMenu,
      VuePerfectScrollbar
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
     @font-face {
      font-family: Diodrum;
      src: url('./assets/Diodrum Regular.otf');
    }
    body {
      margin: 0;
      font-family: 'Diodrum';
      background: url("./assets/tasks.png") top left no-repeat fixed;
      background-size: 50vh;
      overflow: hidden;
    }
  </style>