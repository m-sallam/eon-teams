<template>
  <div>
    <vs-card>
    <div slot="header">
      <vs-row vs-w="12">
        <vs-col vs-lg="4" vs-sm="4" vs-xs="4">
          <h3 style="margin: 3px 0 0 3px;">Lists</h3>
        </vs-col>
        <vs-col vs-lg="8" vs-sm="8" vs-xs="8">
          <vs-input v-model="filter" placeholder="Filter"  vs-icon="search" style="width: 100%;"></vs-input> 
        </vs-col>
      </vs-row>        
    </div>
    <div>
      <vue-perfect-scrollbar style="height: 400px">
        <vs-sidebar-item style="width:99%;" v-for="list in lists" :key="list._id" 
        @click="$router.push(`/projects/${project._id}/lists/${list._id}`)" :vs-active="$route.params.listId==list._id">
          {{list.title}}
        </vs-sidebar-item>
      </vue-perfect-scrollbar>
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end" >
        <vs-button @click="promptOn = !promptOn" style="border-radius: 50%" vs-color="#455A64" vs-icon="add"></vs-button>
      </vs-row>
    </div>
  </vs-card>
  <vs-prompt vs-color="dark" :vs-buttons-hidden="true" vs-title="New List" :vs-active.sync="promptOn">
      <form @submit.prevent="addList">
        <vs-input required vs-color="#455A64" placeholder="List Title" v-model="newListTitle" style="width: 100%"/>
        <vs-button vs-color="#455A64" style="float: right;">Add</vs-button>
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
        newListTitle: ''
      }
    },
    computed: {
      lists () {
        return this.project.lists.filter(i => i.title.toLowerCase().includes(this.filter.toLowerCase()))
      },
      project () {
        return this.$store.state.project.currentProject
      }
    },
    methods: {
      async addList () {
        this.promptOn = false
        this.$vs.loading({
          color: '#455A64',
          scale: 0.7,
          type: 'sound'
        })
        let { status, message, json } = await this.$store.dispatch('addList', { title: this.newListTitle })
        if (status) {
          this.$router.push('/projects/' + this.project._id + '/lists/' + json.listId)
        } else {
          this.$vs.loading.close()
          this.$vs.notify({ text: message, color: 'danger', position: 'top-center' })
        }
      }
    },
    components: {
      VuePerfectScrollbar
    }
  }
</script>
