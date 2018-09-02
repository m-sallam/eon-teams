<template>
  <div>
    <vs-topbar style="width: 60vw; left: 7%; position: fixed; z-index:4" vs-color="#455A64">
      <vs-button vs-icon="info" vs-type="line" vs-color-text="#FFFFFF" vs-color="rgba(255, 255, 255, 0)" 
      @click="$router.push('/projects/' + project._id)">
        Overview
      </vs-button>
      <vs-button vs-icon="playlist_add_check" vs-type="line" vs-color-text="#FFFFFF" vs-color="rgba(255, 255, 255, 0)" 
      @click="$router.push('/projects/' + project._id + '/lists')">
        Tasks
      </vs-button>
      <vs-button vs-icon="chat" vs-type="line" vs-color-text="#FFFFFF" vs-color="rgba(255, 255, 255, 0)" 
      @click="$router.push('/projects/' + project._id + '/chat')">
        Chat 
        <i v-if="newMessages" style="font-size: 14px; color: #1f74ff" class="material-icons">notifications_active</i>
      </vs-button>
    </vs-topbar>
    <router-view @message="message"/>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  const client = io(process.env.VUE_APP_ROOT)

  export default {
    data () {
      return {
      }
    },
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      newMessages () {
        return this.$store.state.project.newMessages
      }
    },
    mounted () {
      client.emit('join', this.project._id)
      client.on('message', message => {
        this.$store.dispatch('addMessageToChat', { message, route: this.$route })
      })
    },
    methods: {
      message (message) {
        client.emit('message', { message, room: this.project._id })
      }
    }
  }
</script>

<style>
</style>

