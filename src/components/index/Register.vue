<template>
  <vs-card style="margin: 50px;">
    <div slot="header">
      <h3>Register</h3>
    </div>
    <form @submit.prevent="submitForm">
      <div>
        <vs-input required="true" style="width: 100%" placeholder="Username" vs-color="#455A64" v-model="registerForm.username"/>
        <br>
        <vs-input required="true" style="width: 100%" type="email" placeholder="Email" vs-color="#455A64" v-model="registerForm.email"/>
        <br>
        <vs-input required="true" style="width: 100%" placeholder="Name" vs-color="#455A64" v-model="registerForm.name"/>
        <br>
        <vs-input required="true" style="width: 100%" type="password" vs-color="#455A64" placeholder="Password" v-model="registerForm.password"/>
        <br>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button vs-color="#455A64">SUBMIT</vs-button>
        </vs-row>
      </div>
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
          color: '#455A64',
          scale: 0.7,
          type: 'sound'
        })
        let {status, message} = await this.$store.dispatch('register', this.registerForm)
        if (status) {
          this.$router.push('/')
        } else {
          this.$vs.loading.close()
          this.$vs.notify({ text:message, color:'danger', position: 'top-center' })
        }
      }
    }
  }
  </script>
  