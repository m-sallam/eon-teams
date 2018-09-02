<template>
  <vue-perfect-scrollbar style="height: 365px; padding: 20px;">
    <vs-card v-for="task in tasks" :key="task._id">
      <div slot="header">
        <vs-row vs-w="12">
          <vs-col vs-lg="11" vs-sm="11" vs-xs="11" vs-type="flex" vs-align="center"> 
            <h4 >{{task.title}}</h4>
          </vs-col>
          <vs-col vs-lg="1" vs-sm="1" vs-xs="1" vs-type="flex" vs-justify="flex-end" vs-align="center">
            <vs-button @click="deleteTask(task._id)" vs-color="danger" vs-type="flat" vs-icon="delete" style="left:0%"></vs-button>
          </vs-col>
        </vs-row>     
      </div>
      <div>
        <vs-row vs-w="12">
          <vs-col vs-lg="3">
            <strong>Description: </strong>
          </vs-col>
          <vs-col vs-lg="9">
            <div style="word-break: break-all;">{{task.description}}</div>
          </vs-col>
        </vs-row>
        <vs-row v-if="task.deadline" vs-w="12">
          <vs-col vs-lg="3">
            <strong>Deadline: </strong>
          </vs-col>
          <vs-col vs-lg="9">
            {{new Date(task.deadline).toDateString()}}
          </vs-col>
        </vs-row>
        <vs-row v-if="task.users.length > 0" vs-w="12">
          <vs-col vs-lg="3">
            <strong>Assigned Users: </strong>
          </vs-col>
          <vs-col vs-lg="9">
             <div style="word-break: break-all;">
                <span v-for="user in task.users" :key="user.username">{{user.username}} </span>
              </div>
          </vs-col>
        </vs-row>
        <vs-row v-if="task.attachments.length > 0" vs-w="12">
          <vs-col vs-lg="3">
            <strong>Attachments: </strong>
          </vs-col>
          <vs-col vs-lg="9">
            <div style="word-break: break-all;">
              <span v-for="attachment in task.attachments" :key="attachment.url">
                <a :href="attachment.url" target="_blank">{{attachment.name}}</a>
              </span>
            </div>
          </vs-col>
        </vs-row>
        <br>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-checkbox :value="task.state === 'completed'" @click="mark(task)"></vs-checkbox>
        </vs-row>
      </div>
    </vs-card>
    <!-- <vs-alert v-for="task in tasks" :title="task.title" :key="task._id" active="true" color="success">
      <div style="word-break: break-all;"><strong>Description: </strong> {{task.description}}</div>
        <div v-if="task.deadline"><strong>Deadline: </strong> {{new Date(task.deadline).toDateString()}}</div>
        <div v-if="task.users.length > 0" style="word-break: break-all;"><strong>Assigned Users: </strong> <span v-for="user in task.users">{{user.username}} </span></div>
        <br>
        <br>
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
    </vs-alert> -->
  </vue-perfect-scrollbar>
  <!-- <vue-perfect-scrollbar style="height: 47vh">
    <el-collapse style=" margin: 0 10px;" >
      <el-collapse-item v-for="task in tasks" :title="task.title" :key="task._id">
        <div style="word-break: break-all;"><strong>Description: </strong> {{task.description}}</div>
        <div v-if="task.deadline"><strong>Deadline: </strong> {{new Date(task.deadline).toDateString()}}</div>
        <div v-if="task.users.length > 0" style="word-break: break-all;"><strong>Assigned Users: </strong> <span v-for="user in task.users">{{user.username}} </span></div>
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
  </vue-perfect-scrollbar>  -->
</template>
  
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  export default {
    components: {
      VuePerfectScrollbar
    },
    methods: {
      async deleteTask (taskId) {
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Delete Task`,
          text: 'Are you sure?',
          acceptText: 'Delete',
          accept: async () => {
            this.$vs.loading({
              color: '#455A64',
              scale: 0.7,
              type: 'sound'
            })
            let { status, message } = await this.$store.dispatch('deleteTask', { listId: this.$route.params.listId, taskId })
            if (status) {
              await this.$store.dispatch('getProject', this.$route.params.id)
              this.$vs.notify({ text: 'Task Deleted!', color: 'primary', position: 'top-center' })
              this.$vs.loading.close()
            } else {
              this.$vs.loading.close()
              this.$vs.notify({ text: message, color: 'danger', position: 'top-center' })
            }
          }
        })
      },
      async mark (task) {
        let { status, message } = await this.$store.dispatch('markTask', { listId: this.$route.params.listId, task })
        if (status) {
          await this.$store.dispatch('getProject', this.$route.params.id)
        } else {
          this.$vs.notify({ text: message, color: 'danger', position: 'top-center' })
        }
      }
    },
    props: ['tasks', 'state']
  }
</script>
  