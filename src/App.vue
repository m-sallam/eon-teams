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
     @font-face {
      font-family: Diodrum;
      src: url('./assets/Diodrum Regular.otf');
    }
    body {
      margin: 0;
      font-family: 'Diodrum';
      background: url("./assets/tasks.png") top left no-repeat;
      background-size: 50vh;
    }
  </style>