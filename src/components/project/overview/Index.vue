<template>
    <div >
      <vs-row vs-w="12" style="padding: 60px 0px">
        <vs-col vs-lg="8" vs-sm="12" vs-xs="12" style="padding: 0px 30px;">
          <activity/>
        </vs-col>
        <vs-col vs-lg="4" vs-sm="12" vs-xs="12" style="padding: 0px 30px;">
          <owner/>
          <members/>
        </vs-col>
      </vs-row> 
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
