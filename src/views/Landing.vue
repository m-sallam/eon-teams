<template>
  <div class="landing">
    <vs-topbar vs-color="#455A64" style="position: fixed; width: auto; right: 7%">
      <vs-button @click="activeCard = 'login'" vs-color-text="FFFFFF" vs-color="rgba(255, 255, 255, 0)" vs-type="line" >Login</vs-button>
      <vs-button @click="activeCard = 'register'" vs-color-text="FFFFFF" vs-color="rgba(255, 255, 255, 0)" vs-type="line" >Register</vs-button>
    </vs-topbar>
    <vs-row vs-w="12" style="min-height: 100vh; margin:0px">
      <vs-col id="leftCol" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="7" vs-sm="12" vs-xs="12">
        <div style="text-align: center;">
          <img src="../assets/tasks.png" alt="">
          <h1>EON-TEAMS</h1>
          <br>
          <h3>A Teams Collaboration App</h3>
          <br>
          <h2>
            <ul style="text-align: left">
              <li>
                Create unlimited projects, lists, and tasks.
              </li>
              <li>
                Invite members to your project and collaborate.
              </li>
              <li>
                Chat with your project members.
              </li>
            </ul>
          </h2>
        </div>
      </vs-col>
      <vs-col id="rightCol" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12" >
        <login v-if="activeCard === 'login'"/>
        <register v-if="activeCard === 'register'"/>
      </vs-col>
      
    </vs-row>
  </div>
</template>
  
<script>
  import login from '@/components/index/Login.vue'
  import register from '@/components/index/Register.vue'

  export default {
    name: 'landing',
    data () {
      return {
        activeCard: 'login'
      }
    },
    components: {
      login,
      register
    }
  }
</script>
  
<style scoped>
  .landing {
    background: whitesmoke;
    min-height: 100vh;
  }
  #leftCol {
    background: white;
  }
  h1 {
    font-size: 60px;
  }
  h3 {
    color: grey;
  }
</style>
