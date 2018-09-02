<template>
  <vs-row vs-w="12" style="padding: 50px;">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="12" vs-xs="12" >
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12" >
      <vs-card>
        <div slot="header">
          <h3>Chat</h3>  
        </div>
        <div>
          <vue-perfect-scrollbar id="box" style="height: 70vh">
            <ul>
              <li :class="message.user.username === user.username ? 'sent' : 'received'" v-for="(message,index) in messages" :key="index">
                <vs-tooltip :title="message.user.username" :text="new Date(message.time).toDateString()" :position="message.user.username === user.username ? 'left' : 'right'" >
                  <vs-chip :color="message.user.username === user.username ? 'dark' : ''">
                    <vs-avatar v-if="message.user.picture === 'none'" :text="message.user.name"/>
                    <vs-avatar v-else :src="message.user.picture"/>
                      {{message.content}}
                  </vs-chip >
                </vs-tooltip>
              </li>
            </ul>
          </vue-perfect-scrollbar>
          <br>
          <vs-row>
            <vs-col vs-lg="11" vs-sm="11" vs-xs="11">
               <vs-input @keyup.enter.native="sendMessage" v-model="typedMessage" vs-color="#455A64" style="width: 100%"></vs-input>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="flex-end" vs-lg="1" vs-sm="1" vs-xs="1">
             <vs-button @click="sendMessage" style="border-radius: 50%" vs-color="#455A64" vs-icon="send"></vs-button>
            </vs-col>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="12" vs-xs="12" >
    </vs-col>
  </vs-row>  
</template>
  
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

  export default {
    data () {
      return {
        typedMessage: ''
      }
    },
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      messages () {
        return this.$store.state.project.chat
      },
      user () {
        return this.$store.state.user.user
      }
    },
    components: {
      VuePerfectScrollbar
    },
    methods: {
      sendMessage () {
        if (this.typedMessage.trim() !== '') {
          let message = {
            content: this.typedMessage,
            time: new Date(),
            user: this.user,
            project: this.project,
            type: 'text'
          }
          this.$emit('message', message)
          this.typedMessage = ''
        }
      }
    },
    updated () {
      const box = this.$el.querySelector('#box')
      box.scrollTop = box.scrollHeight
    },
    async created () {
      await this.$store.dispatch('getChat')
      this.$store.dispatch('noNewMessages')
    }
  }
</script>
  
<style scoped>
  .message {
    max-width:60vw;
    word-break: break-all;
  }
  ul {
    Display: flex;
    Flex-direction: column;
    padding-left: 0;
  }
  .received {
    display: flex;
    justify-content: flex-start;
  }
  .sent {
    display: flex;
    justify-content: flex-end;
  }
</style>