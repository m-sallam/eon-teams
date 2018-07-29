<template>
  <vue-perfect-scrollbar style="height: 47vh">
    <el-collapse style=" margin: 0 10px;" >
      <el-collapse-item v-for="task in tasks" :title="task.title" :key="task._id">
        <div style="word-break: break-all;"><strong>Description: </strong> {{task.description}}</div>
        <div v-if="task.deadline"><strong>Deadline: </strong> {{new Date(task.deadline).toDateString()}}</div>
        <div v-if="task.users.length > 0" style="word-break: break-all;"><strong>Assigned Users: </strong> <span v-for="user in task.users">{{user.username}}</span></div>
        <div v-if="task.attachments.length > 0" style="word-break: break-all;">
          <strong>Attachments: </strong> 
          <span v-for="attachment in task.attachments">
            <a :href="attachment.url" target="_blank">{{attachment.name}}</a>
          </span>
        </div>
        <div style="float: right; margin-right: 10px;">
          <el-button @click="mark(task)" type="text" color="red">Mark as {{state==='completed' ? 'active' : 'completed'}}</el-button>
          <el-button @click="deleteTask(task._id)" type="text" color="red">Delete</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </vue-perfect-scrollbar> 
</template>
  
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  export default {
    components: {
      VuePerfectScrollbar
    },
    methods: {
      async deleteTask (taskId) {
        try {
          await this.$confirm('Delete List?', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
          this.$store.dispatch('enableGlobalLoading')
          let { status, message } = await this.$store.dispatch('deleteTask', {listId: this.$route.params.listId, taskId})
          if (status) {
            await this.$store.dispatch('getProject', this.$route.params.id)
            this.$message({type: 'success', message: 'Task deleted!'})
            this.$store.dispatch('disableGlobalLoading')
          } else {
            this.$message({type: 'error', message})
            this.$store.dispatch('disableGlobalLoading')
          }
        } catch (err) {
          console.log(err)
        }
      },
      async mark (task) {
        this.$store.dispatch('enableGlobalLoading')
        let { status, message } = await this.$store.dispatch('markTask', {listId: this.$route.params.listId, task})
        if (status) {
          await this.$store.dispatch('getProject', this.$route.params.id)
          this.$store.dispatch('disableGlobalLoading')
        } else {
          this.$message({type: 'error', message})
          this.$store.dispatch('disableGlobalLoading')
        }
      }
    },
    props: ['tasks', 'state']
  }
</script>
  