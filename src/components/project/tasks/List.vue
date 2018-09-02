<template>
  <div>
    <vs-card>
      <div slot="header">
        <vs-row vs-w="12">
          <vs-col vs-lg="4" vs-sm="4" vs-xs="4">
            <h3 style="margin: 3px 0 0 3px;">Tasks</h3>
          </vs-col>
          <vs-col vs-lg="8" vs-sm="8" vs-xs="8">
            <vs-input v-model="filter" placeholder="Filter" vs-color="#455A64" vs-icon="search" style="width: 100%;"></vs-input> 
          </vs-col>
        </vs-row>        
      </div>
      <div>
        <vs-tabs :vs-color="tabColor" vs-alignment="fixed">
          <vs-tab vs-label="Active" @click="tabColor = 'primary'">
            <tasks :tasks="activeTasks" state="active" />
          </vs-tab>
          <vs-tab vs-label="Completed" @click="tabColor = 'success'">
            <tasks :tasks="completedTasks" state="completed" />
          </vs-tab>
          <vs-tab vs-label="Missed" @click="tabColor = 'danger'">
            <tasks :tasks="missedTasks" state="missed" />
          </vs-tab>
        </vs-tabs>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end" >
          <vs-button @click="dialogOn = !dialogOn" style="border-radius: 50%" vs-color="#455A64" vs-icon="add"></vs-button>
          <vs-dropdown vs-color="#455A64" vs-trigger-click>
            <vs-button style="border-radius: 50%" vs-color="#455A64" vs-icon="more_vert"></vs-button>
            <vs-dropdown-menu style="width:200px;">
              <vs-dropdown-item style="text-align: center" @click="deleteList">
                Delete List
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>  
        </vs-row>
      </div>
    </vs-card>
    <add-task :visible.sync="dialogOn"></add-task>
  </div>
</template>

<script>
  import tasks from './tasks'
  import addTask from './AddTask.vue'

  export default {
    data () {
      return {
        filter: '',
        dialogOn: false,
        tabColor: 'primary'
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
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Delete List`,
          text: 'Are you sure?',
          acceptText: 'Delete',
          accept: async () => {
            this.$vs.loading({
              color: '#455A64',
              scale: 0.7,
              type: 'sound'
            })
            let { status, message } = await this.$store.dispatch('deleteList', this.list._id)
            if (status) {
              this.$router.push('/projects/' + this.project._id + '/lists')
            } else {
              this.$vs.loading.close()
              this.$message({ type: 'error', message })
            }
          }
        })
      }
    }
  }
</script>
