<template>
  <el-card :loading="loading">
    <div slot="header">
      <span>Projects</span>
      <el-button @click="addProject" style="float: right; padding: 3px 10px" type="text" icon="el-icon-plus"></el-button>
      <el-button @click="filterOn = !filterOn" style="float: right; padding: 3px 0px" type="text" icon="el-icon-search"></el-button>
    </div>
    <el-input v-model="filter" v-if="filterOn" placeholder="Filter" clearable ></el-input> 
    <vue-perfect-scrollbar style="height: 400px">
      <el-menu style="border:0" router>
        <el-menu-item exact :index="'/projects/' + project._id " v-for="project in projects" :key="project._id">
          {{project.title}}
        </el-menu-item>
      </el-menu>
    </vue-perfect-scrollbar>  
  </el-card>
</template>
  
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  export default {
    data () {
      return {
        filter: '',
        filterOn: false,
        loading: true
      }
    },
    computed: {
      projects () {
        return this.$store.state.project.projects.filter(i => i.title.toLowerCase().includes(this.filter.toLowerCase()))
      }
    },
    methods: {
      async addProject () {
        try {
          let input = await this.$prompt('Enter project title', 'New Project', {
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel',
            inputPattern: /\S/,
            inputErrorMessage: 'Project Title is requeried'
          })
          this.$store.dispatch('enableGlobalLoading')
          let {status, message, json} = await this.$store.dispatch('newProject', {title: input.value})
          this.$store.dispatch('disableGlobalLoading')
          if (status) {
            this.$router.push('/projects/' + json.id)
          } else {
            this.$message({type: 'error', message})
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    async created () {
      let {status, message} = await this.$store.dispatch('getProjects')
      if (status) {
        this.$router.push('/')
      } else {
        this.$message({ showClose: true, message, type: 'error' })
      }
      this.loading = false
    },
    components: {
      VuePerfectScrollbar
    }
  }
</script>
  