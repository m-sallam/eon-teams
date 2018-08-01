<template>
  <el-card>
    <div slot="header">
      <span>Recent Activities</span>
    </div>
    <vue-perfect-scrollbar style="height: 350px">
      <el-alert v-for="activity in activities" :key="activity.time" :title="activity.content"
       :description="new Date(activity.time).toDateString()" type="info" :closable="false"></el-alert>
    </vue-perfect-scrollbar>
  </el-card> 
</template>
  
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

  export default {
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      activities () {
        return this.project.activities.reverse()
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
  