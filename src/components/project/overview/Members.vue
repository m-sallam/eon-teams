<template>
  <el-card>
    <div slot="header">
      <span>Project Members</span>
      <el-button v-if="project.owner.username === user.username" @click="addMember" style="float: right; padding: 3px 0" type="text" icon="el-icon-plus"></el-button>
      <el-button v-if="project.owner.username === user.username" @click="removeMember" style="float: right; padding: 3px 10px" type="text" icon="el-icon-minus"></el-button>
      <el-button v-else @click="leaveProject" style="float: right; padding: 3px 0" type="text" icon="el-icon-close"></el-button>
    </div>
    <vue-perfect-scrollbar style="height: 190px">
      <el-table v-if="project.members.length > 0" :data="project.members" :show-header="false">
        <el-table-column width="50">
          <template slot-scope="props">
            <img v-if="props.row.picture === 'none'" :src="`https://ui-avatars.com/api/?size=33&name=${props.row.name}&rounded=true`" align="middle">
            <img v-else :src="props.row.picture" align="middle" width="33" height="33"  style=" object-fit: cover; border-radius:50%">
          </template>
        </el-table-column>
        <el-table-column prop="username">
        </el-table-column>
      </el-table>
    </vue-perfect-scrollbar>
  </el-card>
</template>
      
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

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
      async addMember () {
        try {
          let input = await this.$prompt('Enter Username', 'Add Member', {
            confirmButtonText: 'Add',
            cancelButtonText: 'Cancel',
            inputPattern: /\S/,
            inputErrorMessage: 'Username is requeried'
          })
          this.$store.dispatch('enableGlobalLoading')
          let {status, message} = await this.$store.dispatch('addMember', input.value)
          await this.$store.dispatch('getProject', this.$route.params.id)
          this.$store.dispatch('disableGlobalLoading')
          if (status) {
            this.$message({type: 'success', message: 'Member Added!'})
          } else {
            this.$message({type: 'error', message})
          }
        } catch (err) {
  
        }
      },
      async removeMember () {
        try {
          let input = await this.$prompt('Enter Username', 'Remove Member', {
            confirmButtonText: 'Remove',
            cancelButtonText: 'Cancel',
            inputPattern: /\S/,
            inputErrorMessage: 'Username is requeried'
          })
          this.$store.dispatch('enableGlobalLoading')
          let {status, message} = await this.$store.dispatch('removeMember', input.value)
          await this.$store.dispatch('getProject', this.$route.params.id)
          this.$store.dispatch('disableGlobalLoading')
          if (status) {
            this.$message({type: 'success', message: 'Member Removed!'})
          } else {
            this.$message({type: 'error', message})
          }
        } catch (err) {
          console.log(err)
        }
      },
      async leaveProject () {
        try {
          await this.$confirm('Are you sure?', 'Leave Project?', {
            confirmButtonText: 'Leave',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
          this.$store.dispatch('enableGlobalLoading')
          let {status, message} = await this.$store.dispatch('leaveProject')
          this.$store.dispatch('disableGlobalLoading')
          if (status) {
            this.$router.push('/')
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
  
      