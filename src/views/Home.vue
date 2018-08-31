<template>
  <vs-row vs-w="12" style="padding: 30px;">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12" >
      <projects/>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12" >
    </vs-col>
  </vs-row>
</template>
  
<script>
  import projects from '@/components/Projects.vue'
  
  export default {
    components: {
      projects
    }
  }
</script>
  