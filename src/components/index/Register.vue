<template>
  <vs-card  style="margin: 50px;background: white">
    <form id="registerCard" @submit.prevent="submitForm" >
      <vs-card-header vs-background-color="#455A64" vs-title="REGISTER" vs-icon="account_circle"></vs-card-header>
      <vs-card-body>
        <vs-input required="true" style="width: 100%" placeholder="Username" v-model="registerForm.username"/>
        <br>
        <vs-input required="true" style="width: 100%" type="email" placeholder="Email" v-model="registerForm.email"/>
        <br>
        <vs-input required="true" style="width: 100%" placeholder="Name" v-model="registerForm.name"/>
        <br>
        <vs-input required="true" style="width: 100%" type="password" placeholder="Password" v-model="registerForm.password"/>
        <br>
        <vs-button style="width: 100%" vs-color="#455A64">REGISTER</vs-button>
      </vs-card-body>
    </form> 
  </vs-card>
</template>
  
<script>
  export default {
    data () {
      return {
        registerForm: {
          username: '',
          email: '',
          name: '',
          password: ''
        }
      }
    },
    methods: {
      async submitForm () {
        this.$vs.loading({
          container: '#registerCard',
          scale: 0.7,
          type: 'sound'
        })
        let {status, message} = await this.$store.dispatch('register', this.registerForm)
        this.$vs.loading.close('#registerCard > .con-vs-loading')
        if (status) {
          this.$router.push('/')
        } else {
          this.$message({ showClose: true, message, type: 'error' })
        }
      }
    }
  }
  </script>
  