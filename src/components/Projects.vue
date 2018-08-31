<template>
<div style="margin: 50px;width:100%">
  <vs-card id="projectsCard">
    <div slot="header">
      <vs-row vs-w="12">
        <vs-col vs-lg="4" vs-sm="4" vs-xs="4">
          <h3 style="margin: 3px 0 0 3px;">Projects</h3>
        </vs-col>
        <vs-col vs-lg="8" vs-sm="8" vs-xs="8">
          <vs-input v-model="filter" placeholder="Filter"  vs-icon="search" style="width: 100%;"></vs-input> 
        </vs-col>
      </vs-row>        
    </div>
    <div>
      <vue-perfect-scrollbar style="height: 400px">
        <vs-button v-for="project in filteredProjects" :key="project._id" @click="$router.push('/projects/' + project._id )"
          style="width: 100%" vs-type="flat" vs-color="dark" vs-size="large">
          {{ project.title }}
        </vs-button>
      </vue-perfect-scrollbar>  
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end" >
        <vs-button @click="promptOn = !promptOn" style="border-radius: 50%" vs-color="#455A64" vs-icon="add"></vs-button>
      </vs-row>
    </div>
  </vs-card>
  <vs-prompt vs-color="dark" :vs-buttons-hidden="true" vs-title="New Project" :vs-active.sync="promptOn">
      <form @submit.prevent="addProject">
        <vs-input required vs-color="#455A64" placeholder="Project Title" v-model="newProjectTitle" style="width: 100%"/>
        <vs-button vs-color="#455A64" style="float: right;">Create</vs-button>
      </form>
     </vs-prompt>
  </div>
</template>
  
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  export default {
    data () {
      return {
        filter: '',
        promptOn: false,
        newProjectTitle: ''
      }
    },
    computed: {
      filteredProjects () {
        return this.$store.state.project.projects.filter(i => i.title.toLowerCase().includes(this.filter.toLowerCase()))
      }
    },
    methods: {
      async addProject () {
        try {
          this.$vs.loading({ container: 'body',scale: 0.7,type: 'sound' })
          this.promptOn = false
          let {status, message, json} = await this.$store.dispatch('newProject', {title: this.newProjectTitle})
          this.$vs.loading.close('body > .con-vs-loading')
          if (status) {
            this.$router.push('/projects/' + json.id)
          } else {
            this.$vs.notify({ text:message, color:'danger', position: 'top-center' })
          }
        } catch (err) {
          console.log(typeof 'err')
        }
      }
    },
    async created () {
      let {status, message} = await this.$store.dispatch('getProjects')
      if (!status) {
        this.$vs.notify({ text:message, color:'danger', position: 'top-center' })
      }
    },
    components: {
      VuePerfectScrollbar
    }
  }
</script>
  