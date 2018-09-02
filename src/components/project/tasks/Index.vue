<template>
  <vs-row vs-w="12" style="padding: 60px 0px">
    <vs-col vs-lg="4" vs-sm="12" vs-xs="12" style="padding: 0px 30px;">
      <lists/>
    </vs-col>
    <vs-col vs-lg="8" vs-sm="12" vs-xs="12" style="padding: 0px 30px;">
      <router-view></router-view>
    </vs-col>
  </vs-row> 
</template>

<script>
  import Lists from './Lists.vue'
  
  export default {
    computed: {
      project () {
        return this.$store.state.project.currentProject
      }
    },
    components: {
      Lists
    }
  }
</script>
