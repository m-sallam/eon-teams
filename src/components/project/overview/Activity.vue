<template>
  <el-card>
    <div slot="header">
      <span>Recent Activities</span>
    </div>
    <vue-perfect-scrollbar style="height: 350px">
      <el-alert v-for="index in 30" :key="index" :title="index.toString()" type="info" :closable="false"></el-alert>
    </vue-perfect-scrollbar>
  </el-card> 
</template>
  
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

  export default {
    computed: {
      project () {
        return this.$store.state.project.currentProject
      }
    },
    components: {
      VuePerfectScrollbar
    }
  }
</script>

<style scoped>
  .el-alert {
    margin-bottom: 20px;
  }
</style>
  