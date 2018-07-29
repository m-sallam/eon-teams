<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" >
      <lists/>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" >
      <router-view></router-view>
    </el-col>
  </el-row>   
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
