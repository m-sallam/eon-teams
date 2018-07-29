<template>
  <el-card>
    <div slot="header">
      <span>Lists</span>
      <el-button @click="filterOn = !filterOn" style="float: right; padding: 3px 0px" type="text" icon="el-icon-search"></el-button>
      <el-button @click="addList" style="float: right; padding: 3px 10px" type="text" icon="el-icon-plus"></el-button>     
    </div>
    <el-input v-model="filter" v-if="filterOn" placeholder="Filter" clearable ></el-input>   
    <vue-perfect-scrollbar style="height: 55vh">
      <el-menu router :default-active="$route.path" style="border:0px">
        <el-menu-item exact :index="`/projects/${project._id}/lists/${list._id}`" v-for="list in lists" :key="list._id">
          {{list.title}}
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
        filterOn: false,
        filter: ''
      }
    },
    computed: {
      lists () {
        return this.project.lists.filter(i => i.title.includes(this.filter))
      },
      project () {
        return this.$store.state.project.currentProject
      }
    },
    methods: {
      async addList () {
        try {
          let input = await this.$prompt('Enter list title', 'Add List', {
            confirmButtonText: 'Add',
            cancelButtonText: 'Cancel',
            inputPattern: /\S/,
            inputErrorMessage: 'List Title is requeried'
          })
          this.$store.dispatch('enableGlobalLoading')
          let {status, message, json} = await this.$store.dispatch('addList', {title: input.value})
          this.$store.dispatch('disableGlobalLoading')
          if (status) {
            this.$router.push('/projects/' + this.project._id + '/lists/' + json.listId)
          } else {
            this.$message({type: 'error', message})
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    components: {
      VuePerfectScrollbar
    }
  }
</script>
