<template>
  <el-dialog :close-on-press-escape="false" :show-close="false" fullscreen center title="Add Task" :visible.sync="visible">
    <el-form :label-position="''" label-width="120px">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" >
          <el-form-item label="Title">
            <el-input v-model="task.title"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input type="textarea" :rows="4" v-model="task.description"></el-input>
          </el-form-item>
          <el-form-item label="Deadline">
            <el-date-picker v-model="task.deadline" type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="Assign Users">
            <el-select v-model="task.users" filterable multiple placeholder="Select">
              <el-option
                v-for="member in project.members"
                :key="member.username"
                :label="member.username"
                :value="member.username">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" >
          <el-form-item label="Attachments" >
            <el-upload 
            multiple  
            ref="upload"
            :auto-upload="false"
            :action="`${root}/projects/${project._id}/lists/${list._id}/tasks/files`"
            :headers = "{'Authorization': $store.state.user.token}"
            :data="uploadData"
            :on-change="onChange"
            :on-success="onSuccess"
            :on-error="onError">
              <el-button size="small" type="text">Upload</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>   
    </el-form> 
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import {root} from '@/store/request'
  
  export default {
    data () {
      return {
        task: {
          title: '',
          description: '',
          deadline: '',
          users: []
        },
        fileList: [],
        root: root,
        uploadData: {}
      }
    },
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      list () {
        return this.project.lists.find(l => l._id === this.$route.params.listId)
      }
    },
    components: {
      VuePerfectScrollbar
    },
    methods: {
      async submitForm () {
        try {
          this.$store.dispatch('enableGlobalLoading')
          let {status, message, json} = await this.$store.dispatch('addTask', {task: this.task, listId: this.list._id})
          if (status) {
            if (this.fileList.length > 0) {
              this.uploadData = {taskId: json.taskId}
              setTimeout(() => {
                this.$refs.upload.submit()
              }, 1000)
            } else {
              this.$store.dispatch('disableGlobalLoading')
              this.$store.dispatch('getProject', this.project._id)
              this.$emit('update:visible', false)
              this.clearForm()
              this.$message({type: 'success', message: 'Task Added!'})
            }
          } else {
            this.$store.dispatch('disableGlobalLoading')
            this.$message({type: 'error', message})
          }
        } catch (err) {
          console.log(err)
        }
      },
      onChange (file, list) {
        this.fileList = list
      },
      onSuccess () {
        this.$store.dispatch('disableGlobalLoading')
        this.$store.dispatch('getProject', this.project._id)
        this.$emit('update:visible', false)
        this.clearForm()
        this.$message({type: 'success', message: 'Task Added!'})
      },
      onError () {
        this.$store.dispatch('disableGlobalLoading')
        this.$message({type: 'error', message: 'An error occured! make sure you are uploading files with the allowed extensions'})
      },
      clearForm () {
        this.task = {
          title: '',
          description: '',
          deadline: '',
          users: []
        }
        this.fileList = []
        this.uploadData = {}
        this.$refs.upload.clearFiles()
      },
      cancel () {
        this.$emit('update:visible', false)
        this.clearForm()
      }
    },
    props: ['visible']
}
</script>
