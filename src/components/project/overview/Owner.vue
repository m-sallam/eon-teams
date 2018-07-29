<template>
  <el-card>
      <div slot="header">
        <span>Project Owner</span>
        <el-button v-if="project.owner.username === user.username" @click="deleteProject" style="float: right; padding: 3px 0" type="text" icon="el-icon-delete"></el-button>
      </div>
      <el-table :data="[project.owner]" :show-header="false">
        <el-table-column width="50">
          <template slot-scope="props">
            <img v-if="props.row.picture === 'none'" :src="`https://ui-avatars.com/api/?size=33&name=${props.row.name}&rounded=true`" align="middle">
            <img v-else :src="props.row.picture" align="middle" width="33" height="33"  style=" object-fit: cover; border-radius:50%">
          </template>
        </el-table-column>
        <el-table-column prop="username">
        </el-table-column>
      </el-table>
    </el-card>
  </template>
    
<script>
  export default {
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      user () {
        return this.$store.state.user.user
      }
    },
    methods: {
      async deleteProject () {
        try {
          let input = await this.$prompt('Enter Project Title', 'Delete Project', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            inputPattern: /\S/,
            inputErrorMessage: 'Project Title is requeried'
          })
          if (input.value === this.project.title) {
            this.$store.dispatch('enableGlobalLoading')
            let {status, message} = await this.$store.dispatch('deleteProject')
            this.$store.dispatch('disableGlobalLoading')
            if (status) {
              this.$router.push('/')
            } else {
              this.$message({type: 'error', message})
            }
          } else {
            this.$message({type: 'error', message: 'Invalid Project Title'})
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>

    