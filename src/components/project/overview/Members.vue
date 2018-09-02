<template>
<div>
  <vs-card>
    <div slot="header">
      <h3>Members</h3>
    </div>
    <div>
      <vue-perfect-scrollbar style="height: 270px">
        <vs-list>
          <vs-list-item v-for="member in project.members" :key="member.username" :title="member.name" :subtitle="member.username">
            <template slot="avatar">
              <vs-avatar v-if="member.picture === 'none'" size="33px" :text="member.name"/>
              <vs-avatar v-else  size="33px" :src="member.picture"/>
            </template>
            <vs-button v-if="project.owner.username === user.username" @click="removeMember(member.username)"
            style="border-radius: 50%" vs-type="flat" vs-icon="remove" vs-color="danger">

            </vs-button>
          </vs-list-item>
        </vs-list>
      </vue-perfect-scrollbar>
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end">
        <vs-dropdown vs-trigger-click>
          <vs-button style="border-radius: 50%" vs-color="#455A64" vs-icon="more_vert"></vs-button>
          <vs-dropdown-menu vs-color="#455A64" style="width:200px;">
            <vs-dropdown-item  v-if="project.owner.username === user.username" style="text-align: center" @click="promptOn = !promptOn">
              Add Member
            </vs-dropdown-item>
            <vs-dropdown-item  v-else style="text-align: center" @click="leaveProject">
              Leave Project
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>  
      </vs-row>
    </div>
  </vs-card>
  <vs-prompt vs-color="dark" :vs-buttons-hidden="true" vs-title="Add Member" :vs-active.sync="promptOn">
      <form @submit.prevent="addMember">
        <vs-input required vs-color="#455A64" placeholder="Member Username" v-model="newMemberUsername" style="width: 100%"/>
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
        promptOn: false,
        newMemberUsername: ''
      }
    },
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
        this.promptOn = false
        this.$vs.loading({
          color: '#455A64',
          scale: 0.7,
          type: 'sound'
        })
        let { status, message } = await this.$store.dispatch('addMember', this.newMemberUsername)
        await this.$store.dispatch('getProject', this.$route.params.id)
        this.newMemberUsername = ''
        this.$vs.loading.close()
        if (status) {
          this.$vs.notify({ text: 'Member Added!', color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({ text: message, color: 'danger', position: 'top-center' })
        }
      },
      async removeMember (username) {
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Remove Member`,
          text: 'Remove Member ' + username + ' from the project?',
          acceptText: 'Remove',
          accept: async () => {
            this.$vs.loading({
              color: '#455A64',
              scale: 0.7,
              type: 'sound'
            })
            let { status, message } = await this.$store.dispatch('removeMember', username)
            await this.$store.dispatch('getProject', this.$route.params.id)
            this.$vs.loading.close()
            if (status) {
              this.$vs.notify({ text: 'Member Removed!', color: 'primary', position: 'top-center' })
            } else {
              this.$vs.notify({ text: message, color: 'danger', position: 'top-center' })
            }
          }
        })
      },
      async leaveProject () {
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Leave Project`,
          text: 'Are you sure?',
          acceptText: 'Leave',
          accept: async () => {
            this.$vs.loading({
              color: '#455A64',
              scale: 0.7,
              type: 'sound'
            })
            let { status, message } = await this.$store.dispatch('leaveProject')
            if (status) {
              this.$router.push('/')
            } else {
              this.$vs.loading.close()
              this.$vs.notify({ text: message, color: 'danger', position: 'top-center' })
            }
          }
        })
      }
    },
    components: {
      VuePerfectScrollbar
    }
  }
</script>
  
      