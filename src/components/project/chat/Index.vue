<template>
  <div>
    <el-card>
      <vue-perfect-scrollbar id="box" style="height: 50vh">
        <ul>
          <li v-for="(message,index) in messages" :key="index">
            <el-card class="message" shadow="hover" >
              <img v-if="message.user.picture === 'none'" :src="`https://ui-avatars.com/api/?size=33&name=${message.user.name}&rounded=true`" align="middle">
              <img v-else :src="message.user.picture" align="middle" width="20" height="20"  style=" object-fit: cover; border-radius:50%">
              {{message.content}}
            </el-card>
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
        typedMessage: '',
        allMessages: []
      }
    },
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      messages () {
        return this.allMessages
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
          user: this.user
        }
        this.allMessages.push(message)
        this.typedMessage = ''
      }
    },
    updated () {
      const box = this.$el.querySelector('#box')
      box.scrollTop = box.scrollHeight
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
    Justify-content: center;
  }
  li {
    display: flex;
    justify-content: end;
  }
</style>