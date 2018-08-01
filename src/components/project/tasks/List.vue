<template>
  <el-card v-if="list">
    <div slot="header">
      <span>Tasks</span>
      <el-button @click="filterOn = !filterOn" style="float: right; padding: 3px 0px" type="text" icon="el-icon-search"></el-button>
      <el-button @click="addDialog = true" style="float: right; padding: 3px 10px" type="text" icon="el-icon-plus"></el-button>
      <el-button @click="deleteList" style="float: right; padding: 3px 0px" type="text" icon="el-icon-delete"></el-button>
    </div>
    <el-input v-model="filter" v-if="filterOn" placeholder="Filter" clearable ></el-input> 
    <el-tabs type="card" >
      <el-tab-pane label="Active">
        <tasks :tasks="activeTasks" state="active" />
      </el-tab-pane>
      <el-tab-pane label="Completed">
        <tasks :tasks="completedTasks" state="completed" />
      </el-tab-pane>
      <el-tab-pane label="Missed">
        <tasks :tasks="missedTasks" state="missed" />
      </el-tab-pane>
    </el-tabs>
    
    <add-task :visible.sync="addDialog" />
  </el-card>
</template>

<script>
  import tasks from './tasks'
  import addTask from './AddTask.vue'

  export default {
    data () {
      return {
        filterOn: false,
        filter: '',
        addDialog: false
      }
    },
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      list () {
        return this.project.lists.find(l => l._id === this.$route.params.listId)
      },
      activeTasks () {
        return this.list.tasks.filter(t => t.title.toLowerCase().includes(this.filter.toLowerCase()) && t.state === 'active')
      },
      completedTasks () {
        return this.list.tasks.filter(t => t.title.toLowerCase().includes(this.filter.toLowerCase()) && t.state === 'completed')
      },
      missedTasks () {
        return this.list.tasks.filter(t => t.title.toLowerCase().includes(this.filter.toLowerCase()) && t.state === 'missed')
      }
    },
    components: {
      tasks,
      addTask
    },
    methods: {
      async deleteList () {
        try {
          await this.$confirm('Are you sure?', 'Delete List?', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
          this.$store.dispatch('enableGlobalLoading')
          let {status, message} = await this.$store.dispatch('deleteList', this.list._id)
          this.$store.dispatch('disableGlobalLoading')
          if (status) {
            this.$router.push('/projects/' + this.project._id + '/lists')
          } else {
            this.$message({type: 'error', message})
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>
