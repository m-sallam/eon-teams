<template>
  <vs-card >
    <div slot="header">
      <h3>Recent Activities</h3>
    </div>
    <div>
      <vue-perfect-scrollbar style="height: 450px">
        <vs-list>
          <vs-list-item v-for="activity in activities" :key="activity.time" :title="activity.content" :subtitle="new Date(activity.time).toDateString()">
          </vs-list-item>
        </vs-list>
      </vue-perfect-scrollbar> 
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end" >
        <br>
        <br>
      </vs-row>
    </div>
  </vs-card>
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
  