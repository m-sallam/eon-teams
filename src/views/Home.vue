<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
      <projects/>
    </el-col>
  </el-row>
</template>
  
<script>
  import projects from '@/components/Projects.vue'
  
  export default {
    components: {
      projects
    }
  }
</script>
  