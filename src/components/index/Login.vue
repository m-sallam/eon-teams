<template>
  <vs-card style="margin: 50px;">
    <div slot="header">
      <h3>Login</h3>
    </div>
    <form @submit.prevent="submitForm">
      <div>
        <vs-input required="true" style="width: 100%" placeholder="Username" vs-color="#455A64" v-model="loginForm.username"/>
        <br>
        <vs-input required="true" style="width: 100%" type="password" placeholder="Password" vs-color="#455A64" v-model="loginForm.password"/>
        <br>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button vs-color="#455A64" vs-icon="lock">LOGIN</vs-button>
        </vs-row>
      </div>
    </form> 
  </vs-card>
</template>
  
<script>
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async submitForm () {
        this.$vs.loading({
          color:'#455A64',
          scale: 0.7,
          type: 'sound'
        })
        let {status, message} = await this.$store.dispatch('login', this.loginForm)
        this.$vs.loading.close()
        if (status) {
          this.$router.push('/')
        } else {
          this.$vs.notify({ text:message, color:'danger', position: 'top-center' })
        }
      }
    }
  }
</script>