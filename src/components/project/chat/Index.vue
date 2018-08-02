<template>
  <div>
    <el-card>
      <vue-perfect-scrollbar id="box" style="height: 50vh">
        <ul>
          <li :class="message.user.username === user.username ? 'sent' : 'received'" v-for="(message,index) in messages" :key="index">
            <el-tooltip :placement="message.user.username === user.username ? 'left' : 'right'">
              <div slot="content">{{message.user.username}}<br/>{{new Date(message.time).toDateString()}}</div>
              <el-card class="message" shadow="hover" :body-style="{padding: '10px'}">
                <div v-if="message.user.username !== user.username" style="display: inline;">
                  <img v-if="message.user.picture === 'none'" :src="`https://ui-avatars.com/api/?size=20&name=${message.user.name}&rounded=true`" align="top">
                  <img v-else :src="message.user.picture" align="top" width="20" height="20"  style=" object-fit: cover; border-radius:50%">
                </div> 
                <span style="display: inline;"> {{message.content}}</span>
              </el-card>     
            </el-tooltip> 
          </li>
        </ul>        
      </vue-perfect-scrollbar>  
    </el-card>
    <el-card>
      <el-input v-model="typedMessage" @keyup.enter.native="sendMessage" placeholder="type something">
        <el-button @click="sendMessage" slot="append" icon="el-icon-arrow-right"></el-button>
      </el-input>
    </el-card>
  </div>
  
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