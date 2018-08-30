<template>
  <vs-card id="loginCard" style="margin: 50px;background: white">
    <form @submit.prevent="submitForm">
      <vs-card-header vs-background-color="#455A64" vs-title="LOGIN" vs-icon="account_circle" ></vs-card-header>
      <vs-card-body>
        <vs-input required="true" style="width: 100%" placeholder="Username" v-model="loginForm.username"/>
        <br>
        <vs-input required="true" style="width: 100%" type="password" placeholder="Password" v-model="loginForm.password"/>
        <br>
        <vs-button style="width: 100%" vs-color="#455A64">Login</vs-button>
      </vs-card-body>
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
          container: '#loginCard',
           scale: 0.7,
           type: 'sound'
        })
        let {status, message} = await this.$store.dispatch('login', this.loginForm)
        this.$vs.loading.close('#loginCard > .con-vs-loading')
        if (status) {
          this.$router.push('/')
        } else {
          this.$message({ showClose: true, message, type: 'error' })
        }
      }
    }
  }
</script>