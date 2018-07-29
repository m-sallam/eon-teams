<template>
    <div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <activity/>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <owner/>
          <members/>
        </el-col>
      </el-row>    
    </div>
  </template>
  
<script>
  import activity from './Activity.vue'
  import owner from './Owner.vue'
  import members from './Members.vue'

  export default {
    components: {
      activity,
      owner,
      members
    }
  }
</script>
